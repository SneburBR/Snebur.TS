# Snebur.UI — Quick Start

Snebur.UI is the proprietary TypeScript UI framework used by the Sigi frontend applications.
Pages are `.shtml` templates with a `.shtml.ts` codebehind class; the markup is built from two
element families:

| Family | Prefix | What it is | Key capabilities |
|--------|--------|-----------|------------------|
| **Form controls** | `sn-` | Buttons, text boxes, comboboxes, lists, grids… | Attributes, **events**, **data binding**, validation |
| **Layout components** | `ap-` | Panels, blocks, text, icons… | Presentation attributes, **all responsive** |

Two rules that make everything click:

1. **`sn-` controls also accept `ap-*` presentation attributes** (width, margins, colors,
   visibility…) — layout is never done with raw CSS.
2. **Every `ap-*` attribute accepts responsive suffixes** (`ap-largura--celular`,
   `ap-visibilidade--tablet`, …) — see the breakpoints below.

## Documentation map

| File | Content |
|------|---------|
| [README.md](README.md) | Index of all 74 controls and 19 components |
| [controls/\*.md](controls/) | One page per `sn-` control: attributes, events, binds, real examples |
| [components/\*.md](components/) | One page per `ap-` component |
| [ATTRIBUTES.md](ATTRIBUTES.md) | Every attribute with type, description, usage stats and observed values |
| [ENUMS.md](ENUMS.md) | Every enum with all options described |
| `snebur-components-metadata.json` | Machine-readable bundle (MCP server / tooling) |

## Responsive breakpoints

Append a suffix to any `ap-*` attribute. Resolution priority: height suffix → width suffix → plain.

| Suffix | Applies when |
|--------|--------------|
| *(none)* | Default — all screens |
| `--celular` | Width ≤ 612px (phones) |
| `--tablet` | Width < 1024px (tablets) |
| `--notebook` | Width < 1440px (laptops) |
| `--desktop` | Width ≥ 1440px (desktops) |
| `--super-pequena-v` | Viewport height ≤ 512px |
| `--pequena-v` | Viewport height ≤ 712px |
| `--media-v` | Viewport height < 850px |
| `--grande-v` | Viewport height ≥ 850px |

> Note: the separator is always a **double dash** (`ap-altura--pequena-v`). A single dash
> (`ap-altura-pequena-v`) is silently ignored by the framework.

```html
<!-- Two columns on desktop, stacked full-width on phones -->
<ap-painel ap-tipo-painel="PilhaHorizontal">
    <ap-bloco ap-largura="50%" ap-largura--celular="100%"> ... </ap-bloco>
    <ap-bloco ap-largura="50%" ap-largura--celular="100%"
              ap-visibilidade--celular="Oculto"> ... </ap-bloco>
</ap-painel>
```

## Data binding

Bind attributes take a **property path** on the current data source (set with
`sn-bind-data-source` / `sn-bind-form`, or `Origem=this` for the codebehind itself).

```html
<ap-painel sn-bind-form="{{Cliente}}">
    <!-- two-way value bind; validation comes from the domain property -->
    <sn-caixa-texto sn-rotulo="Nome" sn-bind="{{Nome}}" ap-largura="100%"></sn-caixa-texto>

    <!-- one-way text interpolation -->
    <ap-texto>{{Nome}} — {{Email}}</ap-texto>

    <!-- lists -->
    <sn-controle-lista sn-bind-lista="{{Pedidos}}">
        <sn-item-template>
            <ap-texto sn-bind-texto="{{Descricao}}"></ap-texto>
        </sn-item-template>
    </sn-controle-lista>
</ap-painel>
```

Common binds: `sn-bind` (control value), `sn-bind-texto`, `sn-bind-lista`,
`sn-bind-valor-logico` (booleans), `sn-bind-imagem`, `sn-bind-css-classe`.
Full list in [ATTRIBUTES.md](ATTRIBUTES.md#data-binds-sn-bind).

## Events

The attribute value names a method in the codebehind (`*.shtml.ts`); the framework resolves it
up the parent-control chain.

```html
<sn-botao sn-tipo-botao="Flat" sn-click="BtnSalvar_Click">SALVAR</sn-botao>
```

```ts
// PaginaExemplo.shtml.ts
private BtnSalvar_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs): void
{
    // ...
}
```

Standard events (usable on any control): `sn-click`, `sn-enter`, `sn-valor-alterado`,
`sn-valor-modificando`, `sn-item-selecionado-alterado`, `sn-texto-pesquisa`,
`sn-selecionar-arquivos`, `sn-arrastar-arquivos`, `sn-navegar`,
`sn-linha-detalhes-expandida`, `sn-ordenacao-coluna-alterada`, `sn-conteudo-expandido`.

## Enum attribute values

Enum-typed attributes take the **option name**: `ap-visibilidade="Oculto"`,
`sn-tipo-botao="Icone"`, `ap-tipo-painel="PilhaVertical"`. All options are described in
[ENUMS.md](ENUMS.md). Size/spacing attributes (`ap-largura`, `ap-altura`, `ap-margem`…)
also accept plain CSS values (`270px`, `50%`, `8px 0px`) — that is the dominant real-world usage.

## Regenerating this documentation

```bash
cd Snebur.TS/docs-generator
npm install
npm run build
node dist/main.js            # extracts + mines Sigi usage + writes ../docs
node dist/main.js --no-usage # skip Sigi usage mining
```

Sources of truth: control registry (`ElementoControle.Registrar.ts`), component registry
(`ComponentesApresentacao.Registrar.ts`), attribute catalog (`AtributosHtml.Statica.ts`),
enums (`Snebur.Dominio.Enums.ts`), presentation mappings (`*.Mapeamento.ts`) and 817 `.shtml`
templates of the Sigi frontend. Descriptions live in `docs-generator/src/data/Descriptions.ts`.
