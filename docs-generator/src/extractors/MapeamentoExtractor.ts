import { AttributeCatalog } from './AttributeExtractor';
import { AttributeOnComponent } from '../models/ComponentMetadata';
import { SourceIndex } from './SourceIndex';

interface MapeamentoClass {
  name: string;
  parent?: string; // parent mapeamento class
  mapear: { property: string; propriedadeClass: string }[];
  remover: string[]; // property names removed
}

/**
 * Resolves which `ap-*` presentation attributes apply to a component/control.
 *
 * Chain: $MapeamentosPropriedades.Add(Class.GetType().Nome, new XMapeamento())
 *   -> XMapeamento.Inicializar() calls this.Mapear(x => x.Prop, new PropriedadeY())
 *   -> PropriedadeY constructor calls super(AtributosHtml.Const, ...optional)
 *   -> AtributosHtml.Const carries the html attribute name.
 *
 * A class without its own mapeamento uses the nearest mapped ancestor.
 */
export class MapeamentoExtractor {
  /** componentClassName -> mapeamento class name */
  private registrations = new Map<string, string>();
  /** mapeamento class name -> parsed body */
  private mapeamentos = new Map<string, MapeamentoClass>();
  /** Propriedade class name -> AtributosHtml constant names */
  private propriedadeAttrs = new Map<string, string[]>();

  constructor(private index: SourceIndex, private catalog: AttributeCatalog) {
    this.parseAll();
  }

  private parseAll(): void {
    for (const [, content] of this.index.allFiles()) {
      this.parseRegistrations(content);
      this.parsePropriedadeClasses(content);
      this.parseMapeamentoClasses(content);
    }
    console.log(
      `[MapeamentoExtractor] ${this.registrations.size} registrations, ` +
        `${this.mapeamentos.size} mapeamento classes, ${this.propriedadeAttrs.size} propriedade classes`,
    );
  }

  private parseRegistrations(content: string): void {
    const pattern =
      /\$MapeamentosPropriedades\.Add\(\s*([A-Za-z0-9_]+)\.GetType\(\)\.Nome\s*,\s*new\s+([A-Za-z0-9_]+)\(/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(content)) !== null) {
      this.registrations.set(match[1], match[2]);
    }
  }

  private parsePropriedadeClasses(content: string): void {
    // class Propriedade* { ... constructor { super(AtributosHtml.X, AtributosHtml.Y) } }
    const classPattern =
      /export\s+class\s+((?:Propriedade|Proprieade)[A-Za-z0-9_]*)[\s\S]*?super\(([^;]*?)\)/g;
    let match: RegExpExecArray | null;
    while ((match = classPattern.exec(content)) !== null) {
      const className = match[1];
      if (this.propriedadeAttrs.has(className)) continue;
      const constants: string[] = [];
      const refPattern = /AtributosHtml\.([A-Za-z0-9_]+)/g;
      let ref: RegExpExecArray | null;
      while ((ref = refPattern.exec(match[2])) !== null) {
        constants.push(ref[1]);
      }
      if (constants.length > 0) {
        this.propriedadeAttrs.set(className, constants);
      }
    }
  }

  private parseMapeamentoClasses(content: string): void {
    // Split per class declaration so Mapear calls attach to the right class.
    const classHeader =
      /export\s+class\s+([A-Za-z0-9_]+Mapeamento)(?:<[^{]*?>)?\s+extends\s+([A-Za-z0-9_]+)/g;
    const headers: { name: string; parent: string; start: number }[] = [];
    let match: RegExpExecArray | null;
    while ((match = classHeader.exec(content)) !== null) {
      headers.push({ name: match[1], parent: match[2].split('<')[0], start: match.index });
    }

    for (let i = 0; i < headers.length; i++) {
      const { name, parent, start } = headers[i];
      if (this.mapeamentos.has(name)) continue;
      const end = i + 1 < headers.length ? headers[i + 1].start : content.length;
      const body = content.slice(start, end);

      const mapear: { property: string; propriedadeClass: string }[] = [];
      const mapearPattern =
        /this\.Mapear(?:<[^>]+>)?\(\s*x\s*=>\s*x\.([A-Za-z0-9_]+)\s*,\s*new\s+([A-Za-z0-9_]+)\(/g;
      let m: RegExpExecArray | null;
      while ((m = mapearPattern.exec(body)) !== null) {
        mapear.push({ property: m[1], propriedadeClass: m[2] });
      }

      const remover: string[] = [];
      const removerPattern = /this\.Remover\(\s*x\s*=>\s*x\.([A-Za-z0-9_]+)/g;
      while ((m = removerPattern.exec(body)) !== null) {
        remover.push(m[1]);
      }

      this.mapeamentos.set(name, {
        name,
        parent: parent === 'MapeamentoPropriedadeApresentacao' ? undefined : parent,
        mapear,
        remover,
      });
    }
  }

  /**
   * Cumulative property map for a mapeamento class (parents applied first,
   * mirroring super.Inicializar() call order).
   */
  private resolveMapeamento(mapeamentoClass: string, depth = 0): Map<string, string> {
    const result = new Map<string, string>();
    if (depth > 10) return result;
    const map = this.mapeamentos.get(mapeamentoClass);
    if (!map) return result;

    if (map.parent) {
      for (const [prop, cls] of this.resolveMapeamento(map.parent, depth + 1)) {
        result.set(prop, cls);
      }
    }
    for (const { property, propriedadeClass } of map.mapear) {
      result.set(property, propriedadeClass);
    }
    for (const prop of map.remover) {
      result.delete(prop);
    }
    return result;
  }

  /**
   * Presentation attributes for a component class: walk its inheritance chain
   * to the nearest class with a registered mapeamento, then expand
   * Propriedade classes into html attributes.
   */
  presentationAttributesFor(className: string): AttributeOnComponent[] {
    const chain = this.index.chain(className);
    let mappedClass: string | undefined;
    let mapeamentoClass: string | undefined;

    for (const entry of chain) {
      const registered = this.registrations.get(entry.className);
      if (registered) {
        mappedClass = entry.className;
        mapeamentoClass = registered;
        break;
      }
    }

    if (!mapeamentoClass || !mappedClass) return [];

    const properties = this.resolveMapeamento(mapeamentoClass);
    const seen = new Map<string, AttributeOnComponent>();

    for (const [, propriedadeClass] of properties) {
      const constants = this.propriedadeAttrs.get(propriedadeClass);
      if (!constants) continue;
      for (const constant of constants) {
        const attr = this.catalog.byConstantName.get(constant);
        if (!attr || seen.has(attr.htmlName)) continue;
        seen.set(attr.htmlName, {
          attribute: attr,
          declaredOn: mappedClass,
          inherited: mappedClass !== className,
        });
      }
    }

    return Array.from(seen.values()).sort((a, b) =>
      a.attribute.htmlName.localeCompare(b.attribute.htmlName),
    );
  }
}
