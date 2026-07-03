import * as fs from 'fs';
import * as path from 'path';
import { AttributeMetadata, AttributeKind } from '../models/ComponentMetadata';

export interface AttributeCatalog {
  byHtmlName: Map<string, AttributeMetadata>;
  byConstantName: Map<string, AttributeMetadata>;
}

/**
 * Parses AtributosHtml.Statica.ts — the single place where every framework
 * attribute is declared: `public static readonly Name = new AtributoHtml("html-name", Type);`
 */
export class AttributeExtractor {
  extractAttributes(filePath: string): AttributeCatalog {
    const content = fs.readFileSync(filePath, 'utf-8');
    const byHtmlName = new Map<string, AttributeMetadata>();
    const byConstantName = new Map<string, AttributeMetadata>();

    // Strip commented-out declarations so obsolete attributes are not documented.
    const active = content
      .split('\n')
      .filter((line) => !/^\s*(\/\/|\/\*|\*)/.test(line))
      .join('\n');

    const pattern =
      /public\s+static\s+readonly\s+([A-Za-z0-9_]+)\s*=\s*new\s+AtributoHtml\(\s*"([A-Za-z0-9\-]+)"\s*,\s*([A-Za-z0-9_.]+)/g;

    let match: RegExpExecArray | null;
    while ((match = pattern.exec(active)) !== null) {
      const constantName = match[1];
      const htmlName = match[2];
      const rawType = match[3];
      const shortType = rawType.split('.').pop() ?? rawType;
      const isEnum = shortType.startsWith('Enum');

      const meta: AttributeMetadata = {
        constantName,
        htmlName,
        type: isEnum ? `Enum (${shortType})` : shortType,
        enumName: isEnum ? shortType : undefined,
        kind: this.classifyKind(htmlName, shortType),
        deprecated: htmlName.startsWith('sn-obsoleto') || undefined,
      };

      byHtmlName.set(htmlName, meta);
      byConstantName.set(constantName, meta);
    }

    console.log(
      `[AttributeExtractor] Extracted ${byHtmlName.size} attributes from ${path.basename(filePath)}`,
    );
    return { byHtmlName, byConstantName };
  }

  private classifyKind(htmlName: string, shortType: string): AttributeKind {
    if (shortType === 'Event') return 'event';
    if (htmlName.startsWith('sn-bind') || htmlName.startsWith('ap-bind')) return 'bind';
    if (htmlName.includes('validacao') || htmlName.includes('validar')) return 'validation';
    if (htmlName.startsWith('ap-')) return 'presentation';
    return 'plain';
  }
}
