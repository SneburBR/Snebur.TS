import * as fs from 'fs';

export interface ControlRegistration {
  tag: string; // dictionary key used by the parser, e.g. SN-BOTAO
  className: string;
  htmlElement: string; // e.g. HTMLButtonElement
  domTag: string; // e.g. BUTTON / DIV
}

export interface ComponentRegistration {
  tag: string;
  className: string;
}

export interface Registries {
  controls: Map<string, ControlRegistration>;
  components: Map<string, ComponentRegistration>;
  /** className -> all tags registered for it (first one = canonical) */
  aliasesByClass: Map<string, string[]>;
}

export class RegistryExtractor {
  /** File content with commented-out lines removed (skips disabled registrations). */
  private readActive(filePath: string): string {
    return fs
      .readFileSync(filePath, 'utf-8')
      .split('\n')
      .filter((line) => !/^\s*(\/\/|\/\*|\*)/.test(line))
      .join('\n');
  }

  extractBoth(controlRegistryPath: string, componentRegistryPath: string): Registries {
    const controls = this.extractControls(controlRegistryPath);
    const components = this.extractComponents(componentRegistryPath);

    const aliasesByClass = new Map<string, string[]>();
    const collect = (tag: string, className: string) => {
      const list = aliasesByClass.get(className) ?? [];
      list.push(tag);
      aliasesByClass.set(className, list);
    };
    controls.forEach((r, tag) => collect(tag, r.className));
    components.forEach((r, tag) => collect(tag, r.className));

    return { controls, components, aliasesByClass };
  }

  private extractControls(filePath: string): Map<string, ControlRegistration> {
    const content = this.readActive(filePath);
    const result = new Map<string, ControlRegistration>();

    const pattern =
      /\$ElementosControle\.Add\(\s*"([A-Za-z0-9\-]+)"\s*,\s*new\s+RegistroElementoControle\(\s*"[A-Za-z0-9\-]+"\s*,\s*"([A-Za-z]+)"\s*,\s*([A-Za-z0-9_]+)\s*,\s*([A-Za-z0-9_]+)\s*\)/g;

    let match: RegExpExecArray | null;
    while ((match = pattern.exec(content)) !== null) {
      const tag = match[1].toUpperCase();
      if (result.has(tag)) continue;
      result.set(tag, {
        tag,
        domTag: match[2].toUpperCase(),
        className: match[3],
        htmlElement: match[4],
      });
    }

    console.log(`[RegistryExtractor] ${result.size} control registrations`);
    return result;
  }

  private extractComponents(filePath: string): Map<string, ComponentRegistration> {
    const content = this.readActive(filePath);
    const result = new Map<string, ComponentRegistration>();

    const pattern =
      /\$ComponentesApresentacao\.Add\(\s*"([A-Za-z0-9\-]+)"\s*,\s*new\s+RegistroComponenteApresentacao\(\s*"[A-Za-z0-9\-]+"\s*,\s*([A-Za-z0-9_]+)\s*\)/g;

    let match: RegExpExecArray | null;
    while ((match = pattern.exec(content)) !== null) {
      const tag = match[1].toUpperCase();
      if (result.has(tag)) continue;
      result.set(tag, { tag, className: match[2] });
    }

    console.log(`[RegistryExtractor] ${result.size} component registrations`);
    return result;
  }
}
