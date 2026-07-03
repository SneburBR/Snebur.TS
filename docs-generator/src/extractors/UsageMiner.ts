import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';
import { AttributeCatalog } from './AttributeExtractor';
import { HandlerExample, UsageExample } from '../models/ComponentMetadata';

export interface ParsedElement {
  tag: string; // lowercase, e.g. sn-botao
  attributes: { name: string; value: string }[];
  snippet: string; // full element (or open tag) as found in the template
  file: string;
  app: string;
}

export interface TagUsage {
  count: number;
  files: Set<string>;
  examples: UsageExample[];
  handlers: HandlerExample[];
}

export interface AttributeUsage {
  count: number;
  values: Map<string, number>;
  tags: Map<string, number>;
  responsiveCount: number; // times used with a --suffix
}

export interface UsageData {
  filesScanned: number;
  byTag: Map<string, TagUsage>;
  byAttribute: Map<string, AttributeUsage>; // keyed by base html name (suffix stripped)
}

const APP_PRIORITY: { [app: string]: number } = {
  'Zyoncore.Sigi.Online': 3,
  'Zyoncore.Sigi.WebAdmin': 2,
  'Zyoncore.Sigi.FotoAlbum.TS': 2,
  'Zyoncore.Sigi.FotoAlbum.Revisao': 2,
};

const RESPONSIVE_SUFFIXES = [
  '--celular',
  '--tablet',
  '--notebook',
  '--desktop',
  '--super-pequena-v',
  '--pequena-v',
  '--media-v',
  '--grande-v',
];

const MAX_EXAMPLES_PER_TAG = 3;
const MAX_SNIPPET_CHARS = 1400;

/**
 * Mines real-world component usage from the Sigi frontend .shtml templates and
 * event-handler implementations from the sibling .shtml.ts codebehind files.
 */
export class UsageMiner {
  constructor(
    private sigiFrontendRoot: string,
    private knownTags: Set<string>, // lowercase tags
    private catalog: AttributeCatalog,
  ) {}

  mine(): UsageData {
    const pattern = path.join(this.sigiFrontendRoot, '**/*.shtml').replace(/\\/g, '/');
    const files = globSync(pattern, {
      nocase: true,
      ignore: ['**/bin/**', '**/obj/**', '**/node_modules/**', '**/wwwroot/build/**'],
    });

    const data: UsageData = {
      filesScanned: files.length,
      byTag: new Map(),
      byAttribute: new Map(),
    };

    for (const file of files) {
      let content: string;
      try {
        content = fs.readFileSync(file, 'utf-8');
      } catch {
        continue;
      }
      const relative = path.relative(this.sigiFrontendRoot, file).replace(/\\/g, '/');
      const app = relative.split('/')[0] ?? '';

      for (const element of this.parseElements(content, relative, app)) {
        this.record(data, element, content, file);
      }
    }

    // Keep only the top examples per tag.
    for (const usage of data.byTag.values()) {
      usage.examples.sort((a, b) => b.score - a.score);
      usage.examples = this.dedupeExamples(usage.examples).slice(0, MAX_EXAMPLES_PER_TAG);
      usage.handlers = usage.handlers.slice(0, 3);
    }

    console.log(
      `[UsageMiner] Scanned ${files.length} .shtml files — ` +
        `${data.byTag.size} tags in use, ${data.byAttribute.size} attributes observed`,
    );
    return data;
  }

  // ---------------------------------------------------------------- parsing

  private parseElements(content: string, file: string, app: string): ParsedElement[] {
    const result: ParsedElement[] = [];
    const tagPattern = /<((?:sn|ap)-[a-z0-9-]+)/gi;

    let match: RegExpExecArray | null;
    while ((match = tagPattern.exec(content)) !== null) {
      const tag = match[1].toLowerCase();
      if (!this.knownTags.has(tag)) continue;

      const openEnd = this.findTagEnd(content, match.index);
      if (openEnd < 0) continue;

      const openTag = content.slice(match.index, openEnd + 1);
      const selfClosed = content[openEnd - 1] === '/';

      let snippet: string;
      if (selfClosed) {
        snippet = this.reindent(openTag);
      } else {
        const closeIdx = this.findClosingTag(content, openEnd + 1, tag);
        if (closeIdx >= 0 && closeIdx - match.index < MAX_SNIPPET_CHARS) {
          snippet = this.reindent(content.slice(match.index, closeIdx));
        } else {
          snippet = `${this.reindent(openTag)}\n    ...\n</${tag}>`;
        }
      }

      result.push({
        tag,
        attributes: this.parseAttributes(openTag),
        snippet,
        file,
        app,
      });
    }
    return result;
  }

  /** Index of the '>' that ends the open tag, respecting quoted values. */
  private findTagEnd(content: string, start: number): number {
    let inQuote: string | null = null;
    for (let i = start; i < content.length; i++) {
      const ch = content[i];
      if (inQuote) {
        if (ch === inQuote) inQuote = null;
      } else if (ch === '"' || ch === "'") {
        inQuote = ch;
      } else if (ch === '>') {
        return i;
      }
    }
    return -1;
  }

  /** End index (exclusive) of the matching close tag, handling same-tag nesting. */
  private findClosingTag(content: string, from: number, tag: string): number {
    const open = new RegExp(`<${tag}(?=[\\s>/])`, 'gi');
    const close = new RegExp(`</${tag}\\s*>`, 'gi');
    let depth = 1;
    let cursor = from;

    while (depth > 0 && cursor < content.length) {
      open.lastIndex = cursor;
      close.lastIndex = cursor;
      const nextOpen = open.exec(content);
      const nextClose = close.exec(content);
      if (!nextClose) return -1;
      if (nextOpen && nextOpen.index < nextClose.index) {
        depth++;
        cursor = nextOpen.index + 1;
      } else {
        depth--;
        cursor = nextClose.index + nextClose[0].length;
        if (depth === 0) return cursor;
      }
    }
    return -1;
  }

  private parseAttributes(openTag: string): { name: string; value: string }[] {
    const result: { name: string; value: string }[] = [];
    const pattern = /([a-zA-Z0-9-]+)\s*=\s*"([^"]*)"/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(openTag)) !== null) {
      result.push({ name: match[1].toLowerCase(), value: match[2] });
    }
    return result;
  }

  private reindent(snippet: string): string {
    const lines = snippet.split('\n');
    if (lines.length === 1) return snippet.trim();
    const rest = lines.slice(1);
    const indents = rest
      .filter((l) => l.trim().length > 0)
      .map((l) => l.match(/^\s*/)![0].length);
    const min = indents.length ? Math.min(...indents) : 0;
    return [
      lines[0].trim(),
      ...rest.map((l) => (l.trim().length > 0 ? '    ' + l.slice(min) : '')),
    ].join('\n');
  }

  // -------------------------------------------------------------- recording

  private record(data: UsageData, element: ParsedElement, content: string, file: string): void {
    const tagUsage = data.byTag.get(element.tag) ?? {
      count: 0,
      files: new Set<string>(),
      examples: [],
      handlers: [],
    };
    tagUsage.count++;
    tagUsage.files.add(element.file);

    let score = element.attributes.length + (APP_PRIORITY[element.app] ?? 0);
    let hasBind = false;
    let hasEvent = false;
    let hasResponsive = false;

    for (const { name, value } of element.attributes) {
      const { base, responsive } = this.stripSuffix(name);
      const attrMeta = this.catalog.byHtmlName.get(base);

      const attrUsage = data.byAttribute.get(base) ?? {
        count: 0,
        values: new Map<string, number>(),
        tags: new Map<string, number>(),
        responsiveCount: 0,
      };
      attrUsage.count++;
      if (responsive) attrUsage.responsiveCount++;
      attrUsage.tags.set(element.tag, (attrUsage.tags.get(element.tag) ?? 0) + 1);
      if (value && value.length <= 60) {
        attrUsage.values.set(value, (attrUsage.values.get(value) ?? 0) + 1);
      }
      data.byAttribute.set(base, attrUsage);

      if (responsive) hasResponsive = true;
      if (attrMeta?.kind === 'bind' || value.includes('{{')) hasBind = true;
      if (attrMeta?.kind === 'event') {
        hasEvent = true;
        if (tagUsage.handlers.length < 6 && /^[A-Za-z0-9_.]+$/.test(value)) {
          const handler = this.findHandler(file, base, value);
          if (handler && !tagUsage.handlers.some((h) => h.eventAttr === base)) {
            tagUsage.handlers.push(handler);
          }
        }
      }
    }

    score += (hasBind ? 3 : 0) + (hasEvent ? 2 : 0) + (hasResponsive ? 2 : 0);

    tagUsage.examples.push({
      snippet: element.snippet,
      file: element.file,
      app: element.app,
      score,
    });
    data.byTag.set(element.tag, tagUsage);
  }

  private stripSuffix(name: string): { base: string; responsive: boolean } {
    for (const suffix of RESPONSIVE_SUFFIXES) {
      if (name.endsWith(suffix)) {
        return { base: name.slice(0, -suffix.length), responsive: true };
      }
    }
    return { base: name, responsive: false };
  }

  private dedupeExamples(examples: UsageExample[]): UsageExample[] {
    const seen = new Set<string>();
    const result: UsageExample[] = [];
    for (const example of examples) {
      const signature = example.snippet.replace(/"[^"]*"/g, '""').replace(/\s+/g, ' ');
      if (seen.has(signature)) continue;
      seen.add(signature);
      result.push(example);
    }
    return result;
  }

  // --------------------------------------------------------------- handlers

  private handlerCache = new Map<string, string | null>();

  private findHandler(shtmlFile: string, eventAttr: string, methodName: string): HandlerExample | null {
    const codeBehind = `${shtmlFile}.ts`;
    const cacheKey = `${codeBehind}::${methodName}`;

    if (!this.handlerCache.has(cacheKey)) {
      this.handlerCache.set(cacheKey, this.extractMethod(codeBehind, methodName));
    }
    const snippet = this.handlerCache.get(cacheKey);
    if (!snippet) return null;

    return {
      eventAttr,
      methodName,
      snippet,
      file: path.relative(this.sigiFrontendRoot, codeBehind).replace(/\\/g, '/'),
    };
  }

  private extractMethod(filePath: string, methodName: string): string | null {
    if (!fs.existsSync(filePath)) return null;
    let content: string;
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch {
      return null;
    }

    const declPattern = new RegExp(
      `(?:private|protected|public)\\s+(?:async\\s+)?${methodName}\\s*(?:=|\\()`,
    );
    const match = declPattern.exec(content);
    if (!match) return null;

    const start = content.lastIndexOf('\n', match.index) + 1;
    const bodyStart = content.indexOf('{', match.index);
    if (bodyStart < 0) return null;

    let depth = 0;
    let end = -1;
    for (let i = bodyStart; i < content.length && i - bodyStart < 4000; i++) {
      if (content[i] === '{') depth++;
      else if (content[i] === '}') {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    if (end < 0) return null;

    let snippet = content.slice(start, end);
    const lines = snippet.split('\n');
    if (lines.length > 18) {
      snippet = [...lines.slice(0, 16), '        // ...', lines[lines.length - 1]].join('\n');
    }
    return this.reindentCode(snippet);
  }

  private reindentCode(code: string): string {
    const lines = code.split('\n');
    const indents = lines
      .filter((l) => l.trim().length > 0)
      .map((l) => l.match(/^\s*/)![0].length);
    const min = Math.min(...(indents.length ? indents : [0]));
    return lines.map((l) => l.slice(min)).join('\n');
  }
}
