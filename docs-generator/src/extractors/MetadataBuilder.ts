import * as fs from 'fs';
import * as path from 'path';
import {
  AttributeMetadata,
  AttributeOnComponent,
  ComponentMetadata,
  DocumentationBundle,
  EnumMetadata,
} from '../models/ComponentMetadata';
import { RegistryExtractor, Registries } from './RegistryExtractor';
import { AttributeExtractor, AttributeCatalog } from './AttributeExtractor';
import { ControlScanner } from './ControlScanner';
import { EnumExtractor } from './EnumExtractor';
import { MapeamentoExtractor } from './MapeamentoExtractor';
import { SourceIndex } from './SourceIndex';
import { UsageMiner, UsageData } from './UsageMiner';
import { ATTR_DOCS, ENUM_DOCS, TAG_DOCS } from '../data/Descriptions';

export interface BuilderConfig {
  sneburSourceRoot: string; // .../Snebur.TS/src/Snebur.UI
  controlRegistryPath: string;
  componentRegistryPath: string;
  attributesPath: string;
  enumFiles: string[]; // generated *.Enums.ts files with enum definitions
  sigiFrontendRoot?: string; // .../Zyoncore/Sigi/src/frontend (optional usage mining)
  outputPath: string;
}

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

export class MetadataBuilder {
  constructor(private config: BuilderConfig) {}

  async build(): Promise<DocumentationBundle> {
    console.log('[MetadataBuilder] Starting documentation extraction...\n');

    const registries = new RegistryExtractor().extractBoth(
      this.config.controlRegistryPath,
      this.config.componentRegistryPath,
    );

    const catalog = new AttributeExtractor().extractAttributes(this.config.attributesPath);
    const enums = new EnumExtractor().extractFromFiles(this.config.enumFiles);
    const index = new SourceIndex(this.config.sneburSourceRoot);
    const scanner = new ControlScanner(index, catalog);
    const mapeamentos = new MapeamentoExtractor(index, catalog);

    this.applyAttributeDescriptions(catalog);
    this.linkEnums(catalog, enums);
    const universalEvents = this.extractUniversalEvents(catalog);

    // Usage mining (Sigi frontend)
    let usage: UsageData | undefined;
    if (this.config.sigiFrontendRoot) {
      const knownTags = new Set<string>();
      registries.controls.forEach((_, tag) => knownTags.add(tag.toLowerCase()));
      registries.components.forEach((_, tag) => knownTags.add(tag.toLowerCase()));
      usage = new UsageMiner(this.config.sigiFrontendRoot, knownTags, catalog).mine();
      this.applyAttributeUsage(catalog, usage);
    }

    const controls: ComponentMetadata[] = [];
    for (const [tag, reg] of registries.controls) {
      controls.push(
        this.buildMetadata(
          'control', tag, reg.className, registries, scanner, mapeamentos, usage, universalEvents,
          { htmlElement: reg.htmlElement },
        ),
      );
    }

    const components: ComponentMetadata[] = [];
    for (const [tag, reg] of registries.components) {
      components.push(
        this.buildMetadata(
          'component', tag, reg.className, registries, scanner, mapeamentos, usage, universalEvents,
        ),
      );
    }

    const sharedAttributes = Array.from(catalog.byHtmlName.values()).sort((a, b) =>
      a.htmlName.localeCompare(b.htmlName),
    );

    const bundle: DocumentationBundle = {
      generatedAt: new Date().toISOString(),
      version: '2.0.0',
      summary: {
        totalControls: controls.length,
        totalComponents: components.length,
        totalAttributes: sharedAttributes.length,
        totalEvents: sharedAttributes.filter((a) => a.kind === 'event').length,
        totalBinds: sharedAttributes.filter((a) => a.kind === 'bind').length,
        totalEnums: enums.size,
        shtmlFilesScanned: usage?.filesScanned ?? 0,
      },
      controls: controls.sort((a, b) => a.tag.localeCompare(b.tag)),
      components: components.sort((a, b) => a.tag.localeCompare(b.tag)),
      universalEvents: universalEvents.map((e) => e.htmlName),
      sharedAttributes,
      enums: Object.fromEntries(enums),
      registryMap: this.buildRegistryMap(registries),
    };

    console.log(
      `[MetadataBuilder] Done: ${bundle.summary.totalControls} controls, ` +
        `${bundle.summary.totalComponents} components, ${bundle.summary.totalAttributes} attributes, ` +
        `${bundle.summary.totalEnums} enums`,
    );
    return bundle;
  }

  // ------------------------------------------------------------------ build

  private buildMetadata(
    type: 'control' | 'component',
    tag: string,
    className: string,
    registries: Registries,
    scanner: ControlScanner,
    mapeamentos: MapeamentoExtractor,
    usage: UsageData | undefined,
    universalEvents: AttributeMetadata[],
    extra: Partial<ComponentMetadata> = {},
  ): ComponentMetadata {
    const { chain, attributes: scanned } = scanner.scan(className);
    const presentation = mapeamentos.presentationAttributesFor(className);

    const attributes: AttributeOnComponent[] = [];
    const events = new Map<string, AttributeOnComponent>();
    const binds: AttributeOnComponent[] = [];
    const validationAttrs: AttributeOnComponent[] = [];
    const presentationAttrs = new Map<string, AttributeOnComponent>();
    const skip = (a: AttributeMetadata) => a.deprecated || a.htmlName === 'sn-prop-';
    presentation.forEach((p) => {
      if (!skip(p.attribute)) presentationAttrs.set(p.attribute.htmlName, p);
    });

    for (const item of scanned) {
      if (skip(item.attribute)) continue;
      switch (item.attribute.kind) {
        case 'event':
          events.set(item.attribute.htmlName, item);
          break;
        case 'bind':
          binds.push(item);
          break;
        case 'validation':
          validationAttrs.push(item);
          break;
        case 'presentation':
          if (!presentationAttrs.has(item.attribute.htmlName)) {
            presentationAttrs.set(item.attribute.htmlName, item);
          }
          break;
        default:
          attributes.push(item);
      }
    }

    // Standard (centrally wired) events actually observed on this tag in Sigi.
    const lowerTag = tag.toLowerCase();
    for (const event of universalEvents) {
      if (events.has(event.htmlName)) continue;
      const stats = usage?.byAttribute.get(event.htmlName);
      if (stats?.tags.has(lowerTag)) {
        events.set(event.htmlName, {
          attribute: event,
          declaredOn: 'standard event',
          inherited: false,
        });
      }
    }

    const byName = (a: AttributeOnComponent, b: AttributeOnComponent) =>
      Number(a.inherited) - Number(b.inherited) ||
      a.attribute.htmlName.localeCompare(b.attribute.htmlName);

    const tagUsage = usage?.byTag.get(tag.toLowerCase());
    const aliases = (registries.aliasesByClass.get(className) ?? []).filter((t) => t !== tag);

    return {
      type,
      tag,
      aliases: aliases.length ? aliases : undefined,
      className,
      filePath: chain[0]?.filePath ?? '',
      parentChain: chain.slice(1).map((c) => c.className),
      htmlElement: extra.htmlElement,
      description: TAG_DOCS[tag.toLowerCase()]?.description,
      attributes: attributes.sort(byName),
      events: Array.from(events.values()).sort(byName),
      binds: binds.sort(byName),
      validationAttrs: validationAttrs.sort(byName),
      presentationAttrs: Array.from(presentationAttrs.values()).sort(byName),
      responsiveSupport: 'automatic', // ap-* attributes are responsive on controls too
      responsiveSuffixes: RESPONSIVE_SUFFIXES,
      usageCount: tagUsage?.count ?? 0,
      usageFileCount: tagUsage?.files.size ?? 0,
      examples: tagUsage?.examples ?? [],
      handlers: tagUsage?.handlers ?? [],
    };
  }

  /**
   * Events wired centrally in UIEventoUtil.RetornarUIEventos — available on
   * any control, regardless of class.
   */
  private extractUniversalEvents(catalog: AttributeCatalog): AttributeMetadata[] {
    const filePath = path.join(this.config.sneburSourceRoot, 'src/Utilidade/UIEventoUtil.ts');
    const result: AttributeMetadata[] = [];
    if (!fs.existsSync(filePath)) return result;

    const content = fs
      .readFileSync(filePath, 'utf-8')
      .split('\n')
      .filter((line) => !/^\s*(\/\/|\/\*|\*)/.test(line))
      .join('\n');

    const pattern = /RetornarUIEventosAtributo\(\s*controle\s*,\s*AtributosHtml\.([A-Za-z0-9_]+)/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(content)) !== null) {
      const attr = catalog.byConstantName.get(match[1]);
      if (attr && !result.includes(attr)) result.push(attr);
    }
    console.log(`[MetadataBuilder] ${result.length} universal events (UIEventoUtil)`);
    return result;
  }

  // ------------------------------------------------------------ enrichments

  private applyAttributeDescriptions(catalog: AttributeCatalog): void {
    for (const attr of catalog.byHtmlName.values()) {
      const doc = ATTR_DOCS[attr.htmlName];
      if (doc) attr.description = doc;
    }
  }

  private linkEnums(catalog: AttributeCatalog, enums: Map<string, EnumMetadata>): void {
    for (const attr of catalog.byHtmlName.values()) {
      if (!attr.enumName) continue;
      const enumMeta = enums.get(attr.enumName);
      if (!enumMeta) continue;
      enumMeta.usedByAttributes.push(attr.htmlName);
    }
    for (const enumMeta of enums.values()) {
      const doc = ENUM_DOCS[enumMeta.name];
      if (doc?.description) enumMeta.description = doc.description;
      if (doc?.members) {
        for (const member of enumMeta.members) {
          const memberDoc = doc.members[member.name];
          if (memberDoc) member.description = memberDoc;
        }
      }
    }
  }

  private applyAttributeUsage(catalog: AttributeCatalog, usage: UsageData): void {
    for (const [htmlName, stats] of usage.byAttribute) {
      const attr = catalog.byHtmlName.get(htmlName);
      if (!attr) continue;
      attr.usageCount = stats.count;
      attr.observedValues = Array.from(stats.values.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([value, count]) => ({ value, count }));
      attr.usedByTags = Array.from(stats.tags.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([t]) => t);
    }
  }

  private buildRegistryMap(registries: Registries) {
    const map: { [tag: string]: { className: string; type: 'control' | 'component' } } = {};
    registries.controls.forEach((reg, tag) => {
      map[tag] = { className: reg.className, type: 'control' };
    });
    registries.components.forEach((reg, tag) => {
      map[tag] = { className: reg.className, type: 'component' };
    });
    return map;
  }
}
