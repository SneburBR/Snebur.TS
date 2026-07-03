import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';

export interface ClassEntry {
  className: string;
  filePath: string;
  parentClass?: string;
  content: string; // full file content (shared per file)
}

/**
 * Indexes every exported class in the Snebur.UI source tree so that class
 * lookups and inheritance chains never depend on file naming conventions.
 */
export class SourceIndex {
  private classes = new Map<string, ClassEntry>();
  private files = new Map<string, string>();

  constructor(private sourceRoot: string) {
    this.buildIndex();
  }

  private buildIndex(): void {
    const pattern = path.join(this.sourceRoot, 'src/**/*.ts').replace(/\\/g, '/');
    const files = globSync(pattern, { nocase: true });

    const classPattern =
      /export\s+(?:abstract\s+)?class\s+([A-Za-z0-9_]+)(?:<[^{]*?>)?\s+extends\s+([A-Za-z0-9_.]+)|export\s+(?:abstract\s+)?class\s+([A-Za-z0-9_]+)/g;

    for (const filePath of files) {
      let content: string;
      try {
        content = fs.readFileSync(filePath, 'utf-8');
      } catch {
        continue;
      }
      this.files.set(filePath, content);

      let match: RegExpExecArray | null;
      classPattern.lastIndex = 0;
      while ((match = classPattern.exec(content)) !== null) {
        const className = match[1] ?? match[3];
        const parentRaw = match[2];
        if (!className || this.classes.has(className)) {
          continue;
        }
        let parentClass: string | undefined;
        if (parentRaw) {
          // strip generics + namespace: Snebur.UI.BaseControle<T> -> BaseControle
          parentClass = parentRaw.split('<')[0].split('.').pop();
        }
        this.classes.set(className, { className, filePath, parentClass, content });
      }
    }

    console.log(`[SourceIndex] Indexed ${this.classes.size} classes from ${files.length} files`);
  }

  get(className: string): ClassEntry | undefined {
    return this.classes.get(className);
  }

  /** Inheritance chain starting with the class itself, walking up `extends`. */
  chain(className: string, maxDepth = 15): ClassEntry[] {
    const result: ClassEntry[] = [];
    let current: string | undefined = className;
    let depth = 0;
    while (current && depth < maxDepth) {
      const entry = this.classes.get(current);
      if (!entry) break;
      result.push(entry);
      current = entry.parentClass;
      depth++;
    }
    return result;
  }

  allFiles(): Map<string, string> {
    return this.files;
  }
}
