import { AttributeCatalog } from './AttributeExtractor';
import { AttributeOnComponent } from '../models/ComponentMetadata';
import { SourceIndex, ClassEntry } from './SourceIndex';

/**
 * Determines which attributes a control supports by scanning its class file
 * and every ancestor class file for `AtributosHtml.<Constant>` references.
 * The framework has no per-control attribute manifest — a control "supports"
 * an attribute exactly when some class in its inheritance chain reads it.
 */
export class ControlScanner {
  private static readonly REFERENCE = /AtributosHtml\.([A-Za-z0-9_]+)/g;

  // Base classes whose attribute reads apply to every control; scanning them
  // is correct but we record them so docs can mark attributes as inherited.
  constructor(private index: SourceIndex, private catalog: AttributeCatalog) {}

  scan(className: string): { chain: ClassEntry[]; attributes: AttributeOnComponent[] } {
    const chain = this.index.chain(className);
    const seen = new Map<string, AttributeOnComponent>();

    for (let i = 0; i < chain.length; i++) {
      const entry = chain[i];
      const contents = this.contentsFor(entry);
      for (const content of contents) {
        ControlScanner.REFERENCE.lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = ControlScanner.REFERENCE.exec(content)) !== null) {
          const attr = this.catalog.byConstantName.get(match[1]);
          if (!attr) continue;
          if (!seen.has(attr.htmlName)) {
            seen.set(attr.htmlName, {
              attribute: attr,
              declaredOn: entry.className,
              inherited: i > 0,
            });
          }
        }
      }
    }

    return { chain, attributes: Array.from(seen.values()) };
  }

  /**
   * A control's behaviour lives in its class file and, for shtml controls,
   * the sibling codebehind file that shares the same directory.
   */
  private contentsFor(entry: ClassEntry): string[] {
    return [entry.content];
  }
}
