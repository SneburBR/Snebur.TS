export type ComponentType = 'control' | 'component';
export type AttributeKind = 'plain' | 'event' | 'bind' | 'validation' | 'presentation';
export type ResponsiveSupport = 'automatic' | 'none';

export interface EnumMember {
  name: string;
  value: string;
  description?: string;
  internal?: boolean; // Undefined / Vazio sentinels
}

export interface EnumMetadata {
  name: string;
  members: EnumMember[];
  description?: string;
  usedByAttributes: string[]; // html attribute names typed with this enum
}

export interface AttributeMetadata {
  constantName: string; // AtributosHtml.<constantName>
  htmlName: string; // e.g. "sn-marca-dagua"
  type: string; // String | Boolean | Number | Event | Enum<Name>
  enumName?: string; // when type is an enum, its short name (e.g. EnumVisibilidade)
  kind: AttributeKind;
  deprecated?: boolean;
  description?: string;
  // usage mining results
  usageCount?: number;
  observedValues?: { value: string; count: number }[];
  usedByTags?: string[];
}

export interface AttributeOnComponent {
  attribute: AttributeMetadata;
  declaredOn: string; // class in the inheritance chain that reads this attribute
  inherited: boolean;
}

export interface UsageExample {
  snippet: string;
  file: string; // repo-relative path in Sigi
  app: string; // e.g. Zyoncore.Sigi.Online
  score: number;
}

export interface HandlerExample {
  eventAttr: string; // e.g. sn-click
  methodName: string;
  snippet: string; // TypeScript code from the .shtml.ts codebehind
  file: string;
}

export interface ComponentMetadata {
  type: ComponentType;
  tag: string;
  aliases?: string[]; // other tags registered with the same class
  className: string;
  filePath: string;
  parentChain: string[]; // inheritance chain, closest first
  htmlElement?: string;

  description?: string;

  attributes: AttributeOnComponent[]; // plain sn- attributes
  events: AttributeOnComponent[];
  binds: AttributeOnComponent[];
  validationAttrs: AttributeOnComponent[];
  presentationAttrs: AttributeOnComponent[]; // ap-* attributes via Mapeamento resolution

  responsiveSupport: ResponsiveSupport;
  responsiveSuffixes?: string[];

  usageCount: number; // element instances found in Sigi frontend
  usageFileCount: number;
  examples: UsageExample[];
  handlers: HandlerExample[];
}

export interface DocumentationBundle {
  generatedAt: string;
  version: string;
  summary: {
    totalControls: number;
    totalComponents: number;
    totalAttributes: number;
    totalEvents: number;
    totalBinds: number;
    totalEnums: number;
    shtmlFilesScanned: number;
  };
  controls: ComponentMetadata[];
  components: ComponentMetadata[];
  /** Standard events wired centrally (UIEventoUtil) — usable on any control. */
  universalEvents: string[];
  sharedAttributes: AttributeMetadata[];
  enums: { [enumName: string]: EnumMetadata };
  registryMap: { [tag: string]: { className: string; type: ComponentType } };
}
