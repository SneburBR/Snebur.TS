import {
  AttributeMetadata,
  AttributeOnComponent,
  ComponentMetadata,
  DocumentationBundle,
  EnumMetadata,
} from '../models/ComponentMetadata';
import { TAG_DOCS } from '../data/Descriptions';

export class MarkdownGenerator {
  /** '../' when generating pages inside controls/ or components/ subfolders. */
  private linkPrefix = '';

  constructor(private bundle: DocumentationBundle) {}

  // ------------------------------------------------------------- component

  generateComponentMarkdown(component: ComponentMetadata): string {
    this.linkPrefix = '../';
    const tag = component.tag.toLowerCase();
    const doc = TAG_DOCS[tag];
    const md: string[] = [];

    md.push(`# \`<${tag}>\`${doc?.title ? ` — ${doc.title}` : ''}`);
    md.push('');

    const headerParts = [
      `**Type:** ${component.type === 'control' ? 'Form control (`sn-`)' : 'Layout component (`ap-`)'}`,
      `**Class:** \`${component.className}\``,
    ];
    if (component.parentChain.length > 0) {
      headerParts.push(`**Extends:** \`${component.parentChain[0]}\``);
    }
    if (component.htmlElement) {
      headerParts.push(`**Rendered as:** \`${component.htmlElement}\``);
    }
    md.push(headerParts.join(' | '));
    md.push('');

    if (component.aliases?.length) {
      md.push(`> Also registered as: ${component.aliases.map((a) => `\`<${a.toLowerCase()}>\``).join(', ')}`);
      md.push('');
    }

    if (component.description) {
      md.push(component.description);
      md.push('');
    }

    this.appendExamples(md, component);
    this.appendAttributeSection(md, 'Attributes', component.attributes,
      'Configuration attributes specific to this control (own first, then inherited).');
    this.appendEnumDetails(md, component.attributes);
    this.appendEventsSection(md, component);
    this.appendBindsSection(md, component);
    this.appendAttributeSection(md, 'Validation attributes', component.validationAttrs,
      'Attributes controlling input validation behaviour.');
    this.appendPresentationSection(md, component);
    this.appendInheritance(md, component);
    this.appendUsageStats(md, component);

    md.push('---');
    md.push('*Snebur.UI Framework — generated documentation. Do not edit manually.*');
    md.push('');
    return md.join('\n');
  }

  // --------------------------------------------------------------- sections

  private appendExamples(md: string[], component: ComponentMetadata): void {
    if (component.examples.length === 0) return;
    md.push(`## Real-world examples`);
    md.push('');
    md.push(`Extracted from the Sigi frontend (${component.usageCount} usages in ${component.usageFileCount} files).`);
    md.push('');
    for (const example of component.examples) {
      md.push('```html');
      md.push(example.snippet);
      md.push('```');
      md.push('');
      md.push(`*Source: \`src/frontend/${example.file}\`*`);
      md.push('');
    }
  }

  private appendAttributeSection(
    md: string[],
    title: string,
    items: AttributeOnComponent[],
    intro: string,
  ): void {
    if (items.length === 0) return;
    md.push(`## ${title}`);
    md.push('');
    md.push(intro);
    md.push('');
    md.push('| Attribute | Type | Declared on | Description |');
    md.push('|-----------|------|-------------|-------------|');
    for (const item of items) {
      md.push(this.attributeRow(item));
    }
    md.push('');
  }

  private attributeRow(item: AttributeOnComponent): string {
    const attr = item.attribute;
    const declared = item.inherited ? `\`${item.declaredOn}\` *(inherited)*` : `\`${item.declaredOn}\``;
    return `| \`${attr.htmlName}\` | ${this.formatType(attr)} | ${declared} | ${this.describe(attr)} |`;
  }

  private appendEnumDetails(md: string[], items: AttributeOnComponent[]): void {
    const enumAttrs = items.filter(
      (i) =>
        i.attribute.enumName &&
        this.bundle.enums[i.attribute.enumName] &&
        this.enumTypeMatchesUsage(i.attribute),
    );
    if (enumAttrs.length === 0) return;

    for (const item of enumAttrs) {
      const attr = item.attribute;
      const enumMeta = this.bundle.enums[attr.enumName!];
      md.push(`### Values for \`${attr.htmlName}\` (\`${enumMeta.name}\`)`);
      md.push('');
      this.appendEnumTable(md, enumMeta);
      const example = this.enumExample(attr, enumMeta);
      if (example) {
        md.push('```html');
        md.push(example);
        md.push('```');
        md.push('');
      }
    }
  }

  private appendEnumTable(md: string[], enumMeta: EnumMetadata): void {
    const members = enumMeta.members.filter((m) => !m.internal);

    // Very large enums (e.g. EnumIcone mirrors the Material Symbols set) are
    // summarized instead of tabulated.
    if (members.length > 60) {
      md.push(
        `*${members.length} options.* First examples: ` +
          members.slice(0, 24).map((m) => `\`${m.name}\``).join(', ') +
          ', …',
      );
      md.push('');
      return;
    }

    md.push('| Option | Description |');
    md.push('|--------|-------------|');
    for (const member of members) {
      md.push(`| \`${member.name}\` | ${this.escapeCell(member.description ?? '—')} |`);
    }
    md.push('');
  }

  /**
   * Some attributes are declared with a wrong/legacy enum type in the source
   * (e.g. sn-skip-tab typed as EnumTipoCaixa but used as boolean). When real
   * usage exists and none of the values are enum members, hide the enum table.
   */
  private enumTypeMatchesUsage(attr: AttributeMetadata): boolean {
    if (!attr.enumName || !attr.observedValues?.length) return true;
    const enumMeta = this.bundle.enums[attr.enumName];
    if (!enumMeta) return true;
    const members = new Set(enumMeta.members.map((m) => m.name));
    return attr.observedValues.some((v) => members.has(v.value));
  }

  private enumExample(attr: AttributeMetadata, enumMeta: EnumMetadata): string | null {
    const observed = attr.observedValues?.[0]?.value;
    const first = enumMeta.members.find((m) => !m.internal)?.name;
    const value = observed ?? first;
    if (!value) return null;
    const tag = attr.usedByTags?.[0] ?? (attr.htmlName.startsWith('ap-') ? 'ap-painel' : 'sn-caixa-texto');
    return `<${tag} ${attr.htmlName}="${value}"> ... </${tag}>`;
  }

  private appendEventsSection(md: string[], component: ComponentMetadata): void {
    const hasEvents = component.events.length > 0;
    const isControl = component.type === 'control';
    if (!hasEvents && !isControl) return;

    md.push('## Events');
    md.push('');
    md.push(
      'Event attributes take the **name of a method** implemented in the page/control codebehind ' +
        '(`*.shtml.ts`). The framework resolves the method by walking up the parent-control chain.',
    );
    md.push('');
    if (hasEvents) {
      md.push('| Event | Source | Fires when |');
      md.push('|-------|--------|------------|');
      for (const item of component.events) {
        const attr = item.attribute;
        const declared =
          item.declaredOn === 'standard event'
            ? '*standard event*'
            : item.inherited
              ? `\`${item.declaredOn}\` *(inherited)*`
              : `\`${item.declaredOn}\``;
        md.push(`| \`${attr.htmlName}\` | ${declared} | ${this.describe(attr)} |`);
      }
      md.push('');
    }
    if (isControl) {
      md.push(
        `> Standard events (${this.bundle.universalEvents.map((e) => `\`${e}\``).join(', ')}) ` +
          'are wired centrally and can be used on any control where they make sense — ' +
          `see [ATTRIBUTES.md](${this.linkPrefix}ATTRIBUTES.md#events).`,
      );
      md.push('');
    }

    if (component.handlers.length > 0) {
      md.push('### Handler implementations (from Sigi codebehind)');
      md.push('');
      for (const handler of component.handlers) {
        md.push(`**\`${handler.eventAttr}="${handler.methodName}"\`** — \`src/frontend/${handler.file}\`:`);
        md.push('');
        md.push('```ts');
        md.push(handler.snippet);
        md.push('```');
        md.push('');
      }
    }
  }

  private appendBindsSection(md: string[], component: ComponentMetadata): void {
    if (component.binds.length === 0) return;
    md.push('## Data binding');
    md.push('');
    md.push(
      'Bind attributes take a **property path** on the current data source ' +
        '(e.g. `sn-bind="Usuario.Nome"` or `{{Caminho}}` interpolation), set via `sn-bind-data-source` ' +
        'or inherited from the parent control.',
    );
    md.push('');
    md.push('| Bind | Declared on | Description |');
    md.push('|------|-------------|-------------|');
    for (const item of component.binds) {
      const attr = item.attribute;
      const declared = item.inherited ? `\`${item.declaredOn}\` *(inherited)*` : `\`${item.declaredOn}\``;
      md.push(`| \`${attr.htmlName}\` | ${declared} | ${this.describe(attr)} |`);
    }
    md.push('');
  }

  private appendPresentationSection(md: string[], component: ComponentMetadata): void {
    if (component.presentationAttrs.length === 0) return;
    md.push('## Presentation attributes (`ap-*`)');
    md.push('');
    md.push(
      'Layout/visual attributes resolved through the presentation-mapping system. ' +
        '**Every attribute below also accepts responsive suffixes** — see the table at the end of this section.',
    );
    md.push('');
    md.push('| Attribute | Type | Description |');
    md.push('|-----------|------|-------------|');
    for (const item of component.presentationAttrs) {
      const attr = item.attribute;
      md.push(`| \`${attr.htmlName}\` | ${this.formatType(attr)} | ${this.describe(attr)} |`);
    }
    md.push('');

    md.push('### Responsive suffixes');
    md.push('');
    md.push('Append a suffix to any `ap-*` attribute to target a breakpoint. Resolution priority: height suffix → width suffix → plain attribute.');
    md.push('');
    md.push('| Suffix | Applies when |');
    md.push('|--------|--------------|');
    md.push('| *(none)* | Default — all screens |');
    md.push('| `--celular` | Screen width ≤ 612px (phones) |');
    md.push('| `--tablet` | Width < 1024px (tablets) |');
    md.push('| `--notebook` | Width < 1440px (laptops) |');
    md.push('| `--desktop` | Width ≥ 1440px (desktops) |');
    md.push('| `--super-pequena-v` | Viewport height ≤ 512px |');
    md.push('| `--pequena-v` | Viewport height ≤ 712px |');
    md.push('| `--media-v` | Viewport height < 850px |');
    md.push('| `--grande-v` | Viewport height ≥ 850px |');
    md.push('');
    md.push('```html');
    md.push(`<${component.tag.toLowerCase()}`);
    md.push('    ap-visibilidade="Visivel"');
    md.push('    ap-visibilidade--celular="Oculto"');
    md.push('    ap-largura="50%"');
    md.push('    ap-largura--celular="100%">');
    md.push('    ...');
    md.push(`</${component.tag.toLowerCase()}>`);
    md.push('```');
    md.push('');
  }

  private appendInheritance(md: string[], component: ComponentMetadata): void {
    if (component.parentChain.length === 0) return;
    md.push('## Inheritance');
    md.push('');
    md.push(
      [`\`${component.className}\``, ...component.parentChain.map((c) => `\`${c}\``)].join(' → '),
    );
    md.push('');
  }

  private appendUsageStats(md: string[], component: ComponentMetadata): void {
    if (component.usageCount === 0) return;
    md.push('## Usage in Sigi');
    md.push('');
    md.push(
      `Found **${component.usageCount}** usages across **${component.usageFileCount}** ` +
        `\`.shtml\` files in the Sigi frontend.`,
    );
    md.push('');
  }

  // ------------------------------------------------------------------ index

  generateIndexMarkdown(): string {
    const b = this.bundle;
    const md: string[] = [];

    md.push('# Snebur.UI Framework Documentation');
    md.push('');
    md.push('Reference documentation for **Snebur.UI**, the proprietary TypeScript UI framework used by the Sigi frontend applications.');
    md.push('');
    md.push('There are two families of elements:');
    md.push('');
    md.push('- **`sn-*` form controls** — buttons, text boxes, comboboxes, lists… They support configuration attributes, **events** (`sn-click`, `sn-valor-alterado`, …) and **data binding** (`sn-bind*`).');
    md.push('- **`ap-*` layout components** — panels, blocks, text, icons… Pure presentation. **Every `ap-*` attribute accepts responsive suffixes** (`--celular`, `--tablet`, `--notebook`, `--desktop` + height variants).');
    md.push('');
    md.push('`sn-*` controls **also accept `ap-*` presentation attributes** (width, margins, visibility, …) through the shared presentation-mapping system.');
    md.push('');

    md.push('## Summary');
    md.push('');
    md.push(`| Metric | Count |`);
    md.push(`|--------|-------|`);
    md.push(`| Form controls (\`sn-\`) | ${b.summary.totalControls} |`);
    md.push(`| Layout components (\`ap-\`) | ${b.summary.totalComponents} |`);
    md.push(`| Attributes | ${b.summary.totalAttributes} |`);
    md.push(`| Events | ${b.summary.totalEvents} |`);
    md.push(`| Bind attributes | ${b.summary.totalBinds} |`);
    md.push(`| Enums | ${b.summary.totalEnums} |`);
    md.push(`| Sigi templates scanned | ${b.summary.shtmlFilesScanned} |`);
    md.push('');

    md.push('## Reference files');
    md.push('');
    md.push('- [ATTRIBUTES.md](ATTRIBUTES.md) — every attribute with type, description and observed values');
    md.push('- [ENUMS.md](ENUMS.md) — every enum with all options');
    md.push('- [QUICKSTART.md](QUICKSTART.md) — hand-written getting-started guide');
    md.push('- `snebur-components-metadata.json` — machine-readable bundle (MCP/tooling)');
    md.push('');

    md.push('## Form controls (`sn-*`)');
    md.push('');
    md.push('| Tag | Purpose | Used in Sigi |');
    md.push('|-----|---------|--------------|');
    for (const control of b.controls) {
      const tag = control.tag.toLowerCase();
      const doc = TAG_DOCS[tag];
      const purpose = doc?.title ? `${doc.title}` : '—';
      md.push(
        `| [\`<${tag}>\`](controls/${this.tagToFilename(control.tag)}.md) | ${purpose} | ${control.usageCount > 0 ? `${control.usageCount}×` : '—'} |`,
      );
    }
    md.push('');

    md.push('## Layout components (`ap-*`)');
    md.push('');
    md.push('| Tag | Purpose | Used in Sigi |');
    md.push('|-----|---------|--------------|');
    for (const comp of b.components) {
      const tag = comp.tag.toLowerCase();
      const doc = TAG_DOCS[tag];
      const purpose = doc?.title ? `${doc.title}` : '—';
      md.push(
        `| [\`<${tag}>\`](components/${this.tagToFilename(comp.tag)}.md) | ${purpose} | ${comp.usageCount > 0 ? `${comp.usageCount}×` : '—'} |`,
      );
    }
    md.push('');

    md.push('---');
    md.push(`*Generated ${b.generatedAt} — Snebur.UI docs generator v${b.version}*`);
    md.push('');
    return md.join('\n');
  }

  // ------------------------------------------------------------- attributes

  generateAttributesMarkdown(): string {
    this.linkPrefix = '';
    const b = this.bundle;
    const md: string[] = [];

    md.push('# Attributes Reference');
    md.push('');
    md.push(`Complete catalog of all **${b.summary.totalAttributes}** Snebur.UI attributes, extracted from \`AtributosHtml.Statica.ts\`.`);
    md.push('');
    md.push('Column notes: **Usage** counts instances found in the Sigi frontend `.shtml` templates; **Observed values** are the most frequent real values.');
    md.push('');

    const sections: { title: string; intro: string; filter: (a: AttributeMetadata) => boolean }[] = [
      {
        title: 'Presentation attributes (`ap-*`)',
        intro:
          'Layout and visual styling. Apply to `ap-*` components **and** `sn-*` controls. ' +
          '**All support responsive suffixes** (`--celular`, `--tablet`, `--notebook`, `--desktop`, `--super-pequena-v`, `--pequena-v`, `--media-v`, `--grande-v`).',
        filter: (a) => a.kind === 'presentation' && !a.deprecated,
      },
      {
        title: 'Control attributes (`sn-*`)',
        intro: 'Behaviour/configuration attributes for form controls.',
        filter: (a) => a.kind === 'plain' && !a.deprecated,
      },
      {
        title: 'Events',
        intro:
          'The attribute value is the name of a handler method implemented in the codebehind (`*.shtml.ts`); ' +
          'the framework resolves it up the parent-control chain. ' +
          `Standard events wired for every control: ${b.universalEvents.map((e) => `\`${e}\``).join(', ')}.`,
        filter: (a) => a.kind === 'event' && !a.deprecated,
      },
      {
        title: 'Data binds (`sn-bind*`)',
        intro:
          'The attribute value is a property path on the active data source (e.g. `Cliente.Nome`). ' +
          'Binds are two-way for input controls.',
        filter: (a) => a.kind === 'bind' && !a.deprecated,
      },
      {
        title: 'Validation attributes',
        intro: 'Control how and where validation messages are shown.',
        filter: (a) => a.kind === 'validation' && !a.deprecated,
      },
      {
        title: 'Deprecated attributes',
        intro: 'Legacy attributes kept for backward compatibility — do not use in new code.',
        filter: (a) => !!a.deprecated,
      },
    ];

    for (const section of sections) {
      const items = b.sharedAttributes.filter(section.filter);
      if (items.length === 0) continue;
      md.push(`## ${section.title}`);
      md.push('');
      md.push(section.intro);
      md.push('');
      md.push('| Attribute | Type | Description | Usage | Observed values |');
      md.push('|-----------|------|-------------|-------|-----------------|');
      for (const attr of items) {
        const usage = attr.usageCount ? `${attr.usageCount}×` : '—';
        const values = attr.observedValues?.length
          ? attr.observedValues.slice(0, 4).map((v) => `\`${this.escapeCell(v.value) || '""'}\``).join(', ')
          : '—';
        md.push(
          `| \`${attr.htmlName}\` | ${this.formatType(attr)} | ${this.describe(attr)} | ${usage} | ${values} |`,
        );
      }
      md.push('');
    }

    md.push('---');
    md.push(`*Generated ${b.generatedAt}*`);
    md.push('');
    return md.join('\n');
  }

  // ------------------------------------------------------------------ enums

  generateEnumsMarkdown(): string {
    this.linkPrefix = '';
    const b = this.bundle;
    const md: string[] = [];

    md.push('# Enums Reference');
    md.push('');
    md.push('Enum-typed attributes accept the **option name** as the attribute value, e.g. `ap-visibilidade="Oculto"`.');
    md.push('');

    const used = Object.values(b.enums)
      .filter((e) => e.usedByAttributes.length > 0)
      .sort((a, b2) => a.name.localeCompare(b2.name));

    md.push('## Enums used by attributes');
    md.push('');
    for (const enumMeta of used) {
      md.push(`### \`${enumMeta.name}\``);
      md.push('');
      if (enumMeta.description) {
        md.push(enumMeta.description);
        md.push('');
      }
      md.push(`Used by: ${enumMeta.usedByAttributes.map((a) => `\`${a}\``).join(', ')}`);
      md.push('');
      this.appendEnumTable(md, enumMeta);

      const attrName = enumMeta.usedByAttributes[0];
      const attr = this.bundle.sharedAttributes.find((a) => a.htmlName === attrName);
      if (attr) {
        const example = this.enumExample(attr, enumMeta);
        if (example) {
          md.push('```html');
          md.push(example);
          md.push('```');
          md.push('');
        }
      }
    }

    md.push('---');
    md.push(`*Generated ${b.generatedAt}*`);
    md.push('');
    return md.join('\n');
  }

  // ---------------------------------------------------------------- helpers

  private formatType(attr: AttributeMetadata): string {
    if (attr.enumName) {
      const known = this.bundle.enums[attr.enumName];
      return known
        ? `[\`${attr.enumName}\`](${this.linkPrefix}ENUMS.md#${attr.enumName.toLowerCase()})`
        : `\`${attr.enumName}\``;
    }
    return `\`${attr.type}\``;
  }

  private describe(attr: AttributeMetadata): string {
    return this.escapeCell(attr.description ?? '—');
  }

  private escapeCell(text: string): string {
    return text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
  }

  tagToFilename(tag: string): string {
    return tag.toLowerCase().replace(/^sn-|^ap-/, '');
  }
}
