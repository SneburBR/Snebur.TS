# `<sn-botao-logico>` — Toggle (boolean) button

**Type:** Form control (`sn-`) | **Class:** `BotaoLogico` | **Extends:** `Botao` | **Rendered as:** `HTMLButtonElement`

A two-state button bound to a boolean property via `sn-bind-valor-logico`. Applies `sn-css-class-botao-logico-verdadeiro`/`-falso` classes according to the current value.

## Real-world examples

Extracted from the Sigi frontend (13 usages in 4 files).

```html
<sn-botao-logico
        sn-nome="BtnNegrito"
        sn-legenda="Negrito"
        sn-tipo-botao="Icone"
        ap-icone="FormatBold"
        ap-cor-fundo="Branca"
        sn-bind="{{IsNegrito}}"
        sn-valor-alterado="BtnLogico_ValorAlterado">
    </sn-botao-logico>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Montagem/Texto/JanelaNovoTexto.shtml`*

```html
<sn-botao-logico
        sn-nome="BtnItalico"
        sn-tipo-botao="Icone"
        sn-legenda="Itálico"
        ap-icone="FormatItalic"
        ap-cor-fundo="Branca"
        sn-bind="{{IsItalico}}"
        sn-valor-alterado="BtnLogico_ValorAlterado">
    </sn-botao-logico>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Montagem/Texto/JanelaNovoTexto.shtml`*

```html
<sn-botao-logico
        sn-nome="BtnAlinharEsquerda"
        ap-cor-fundo="Branca"
        ap-tonalidade-fundo="T300"
        ap-icone="FormatAlignLeft"
        sn-grupo="Alinhamento"
        sn-legenda="Alinhar à esquerda"
        sn-valor="EnumAlinhamentoHorizontal.Esquerda"
        sn-valor-alterado="BtnAlinhamentoTexto_ValorAlterado">
    </sn-botao-logico>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Montagem/Texto/JanelaNovoTexto.shtml`*

## Attributes

Configuration attributes specific to this control (own first, then inherited).

| Attribute | Type | Declared on | Description |
|-----------|------|-------------|-------------|
| `sn-css-class-botao-logico-falso` | `Boolean` | `BotaoLogico` | CSS class applied when the toggle-button value is false. |
| `sn-css-class-botao-logico-verdadeiro` | `Boolean` | `BotaoLogico` | CSS class applied when the toggle-button value is true. |
| `sn-grupo` | `String` | `BotaoLogico` | Logical group name (e.g. radio-button groups or validation groups). |
| `sn-valor` | `String` | `BotaoLogico` | Literal value carried by the option (radio items, simple options). |
| `disabled` | `String` | `Botao` *(inherited)* | Native HTML disabled attribute (managed by the framework). |
| `sn-construtor` | `String` | `BaseUIElemento` *(inherited)* | Explicit constructor/class name to instantiate for this element (overrides the tag registry). |
| `sn-controle` | `String` | `BaseControle` *(inherited)* | Name of the user-control class to host (used with `sn-controle-usuario`). |
| `sn-desabilitar` | `Boolean` | `ComponenteApresentacao` *(inherited)* | Disables the control (`true`/`false` or bind path). Disabled controls skip validation and events. |
| `sn-identificador-navegador` | `String` | `Botao` *(inherited)* | Name of the target navigator (for buttons/links that navigate). |
| `sn-inicializacao-propriedades` | `String` | `BaseUIElemento` *(inherited)* | Inline property initialization expression(s) applied when the control is created. |
| `sn-item-elemento` | `String` | `BaseUIElemento` *(inherited)* | Tag/element name to use for generated item elements. |
| `sn-legenda` | `String` | `BaseControle` *(inherited)* | Caption/help text shown with the control. |
| `sn-link-rota` | `String` | `Botao` *(inherited)* | Route/URL the button navigates to (turns the button into a navigation link). |
| `sn-nome` | `String` | `BaseControle` *(inherited)* | Control name. Makes the control reachable from the codebehind (`this.RetornarControle("Nome")` / typed properties) and used in messages. |
| `sn-parametros` | `String` | `BaseUIElemento` *(inherited)* | Parameters passed to the hosted control constructor (comma-separated / bind paths). |
| `sn-skip-tab` | [`EnumTipoCaixa`](../ENUMS.md#enumtipocaixa) | `Botao` *(inherited)* | Removes the control from the Tab navigation order. |
| `sn-visibilidade` | [`EnumVisibilidade`](../ENUMS.md#enumvisibilidade) | `BaseControle` *(inherited)* | Visibility of the control: `Visivel`, `Invisivel` (keeps space) or `Oculto` (removed from layout). |

### Values for `sn-visibilidade` (`EnumVisibilidade`)

| Option | Description |
|--------|-------------|
| `Visivel` | Visible (default). |
| `Invisivel` | Hidden but still occupies layout space (`visibility: hidden`). |
| `Oculto` | Removed from layout (`display: none`). |

```html
<ap-bloco sn-visibilidade="Oculto"> ... </ap-bloco>
```

## Events

Event attributes take the **name of a method** implemented in the page/control codebehind (`*.shtml.ts`). The framework resolves the method by walking up the parent-control chain.

| Event | Source | Fires when |
|-------|--------|------------|
| `sn-valor-alterado` | *standard event* | Fires after the control value changes and is committed. |

> Standard events (`sn-click`, `sn-enter`, `sn-navegar`, `sn-selecionar-arquivos`, `sn-arrastar-arquivos`, `sn-texto-pesquisa`, `sn-item-selecionado-alterado`, `sn-valor-alterado`, `sn-valor-modificando`, `sn-linha-detalhes-expandida`, `sn-ordenacao-coluna-alterada`, `sn-conteudo-expandido`) are wired centrally and can be used on any control where they make sense — see [ATTRIBUTES.md](../ATTRIBUTES.md#events).

### Handler implementations (from Sigi codebehind)

**`sn-valor-alterado="BtnLogico_ValorAlterado"`** — `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Montagem/Texto/JanelaNovoTexto.shtml.ts`:

```ts
private BtnLogico_ValorAlterado(botao: ui.BotaoLogico, e: ui.UIValorAlteradoEventArgs)
{
    this.AtualizarBotaoLogico(botao);
}
```

## Data binding

Bind attributes take a **property path** on the current data source (e.g. `sn-bind="Usuario.Nome"` or `{{Caminho}}` interpolation), set via `sn-bind-data-source` or inherited from the parent control.

| Bind | Declared on | Description |
|------|-------------|-------------|
| `sn-bind-valor-logico` | `BotaoLogico` | Binds a boolean value (checkbox, switch, toggle button). |

## Presentation attributes (`ap-*`)

Layout/visual attributes resolved through the presentation-mapping system. **Every attribute below also accepts responsive suffixes** — see the table at the end of this section.

| Attribute | Type | Description |
|-----------|------|-------------|
| `ap-alinhamento-horizontal` | [`EnumAlinhamentoHorizontal`](../ENUMS.md#enumalinhamentohorizontal) | Horizontal alignment of the element within its parent. |
| `ap-alinhamento-texto` | [`EnumAlinhamentoTexto`](../ENUMS.md#enumalinhamentotexto) | Text alignment (left, center, right, justified). |
| `ap-alinhamento-vertical` | [`EnumAlinhamentoVertical`](../ENUMS.md#enumalinhamentovertical) | Vertical alignment of the element within its parent. |
| `ap-altura` | [`EnumAltura`](../ENUMS.md#enumaltura) | Height — CSS length or `Auto`. Responsive. |
| `ap-altura-linha` | [`EnumAlturaLinha`](../ENUMS.md#enumalturalinha) | Line height of the text. Responsive. |
| `ap-altura-maxima` | [`EnumAltura`](../ENUMS.md#enumaltura) | Maximum height (CSS length). Responsive. |
| `ap-altura-minima` | [`EnumAltura`](../ENUMS.md#enumaltura) | Minimum height (CSS length). Responsive. |
| `ap-barra-rolagem` | [`EnumBarraRolagem`](../ENUMS.md#enumbarrarolagem) | Scrollbar behaviour (both axes): hidden, automatic, visible or overflow. |
| `ap-barra-rolagem-horizontal` | [`EnumBarraRolagem`](../ENUMS.md#enumbarrarolagem) | Horizontal scrollbar behaviour. |
| `ap-barra-rolagem-vertical` | [`EnumBarraRolagem`](../ENUMS.md#enumbarrarolagem) | Vertical scrollbar behaviour. |
| `ap-borda` | [`EnumDistanciaMargem`](../ENUMS.md#enumdistanciamargem) | Border width/preset around the element. Responsive. |
| `ap-cor-borda` | [`EnumCor`](../ENUMS.md#enumcor) | Border color from the framework palette. |
| `ap-cor-fundo` | [`EnumCor`](../ENUMS.md#enumcor) | Background color from the framework palette (`SistemaPrincipal`, `Azul`, …). |
| `ap-cor-fundo-debug` | [`EnumCor`](../ENUMS.md#enumcor) | Debug-only background color (ignored in production). |
| `ap-cor-texto` | [`EnumCor`](../ENUMS.md#enumcor) | Text color from the framework palette. |
| `ap-fonte` | [`EnumFonte`](../ENUMS.md#enumfonte) | Font family (Roboto, RobotoCondensed). |
| `ap-icone` | [`EnumIcone`](../ENUMS.md#enumicone) | Material Symbols icon name (e.g. `Search`, `Delete`, `ShoppingCart`). |
| `ap-icone-categoria` | [`EnumIconeCategoria`](../ENUMS.md#enumiconecategoria) | Icon style family: Filled, Outlined, Rounded, Sharp, TwoTone. |
| `ap-largura` | [`EnumLargura`](../ENUMS.md#enumlargura) | Width — CSS length (`100px`, `50%`) or `Auto`. Responsive. |
| `ap-largura-maxima` | [`EnumLargura`](../ENUMS.md#enumlargura) | Maximum width (CSS length). Responsive. |
| `ap-largura-minima` | [`EnumLargura`](../ENUMS.md#enumlargura) | Minimum width (CSS length). Responsive. |
| `ap-margem` | `String` | Outer margin — CSS shorthand (`8px 0px`, `0 4px 8px 4px`). Responsive. |
| `ap-margem-interna` | `String` | Inner padding — CSS shorthand. Responsive. |
| `ap-peso-fonte` | [`EnumPesoFonte`](../ENUMS.md#enumpesofonte) | Font weight: SuperLeve…SuperPesado. |
| `ap-quebrar` | [`EnumQuebrar`](../ENUMS.md#enumquebrar) | Text wrapping: wrap, no-wrap (ellipsis) or no-wrap without ellipsis. |
| `ap-rotulo` | `String` | Presentation label rendered by the component (responsive). |
| `ap-tamanho-icone` | [`EnumTamanhoIcone`](../ENUMS.md#enumtamanhoicone) | Icon size preset (Pequeno…Grande). |
| `ap-tipo-painel` | [`EnumTipoPainel`](../ENUMS.md#enumtipopainel) | Layout algorithm of the panel: block, vertical/horizontal stack, full-stack, inline stack. |
| `ap-tipografia` | [`EnumTipografia`](../ENUMS.md#enumtipografia) | Typography scale: h1–h7, Titulo, SubTitulo, Corpo, Descricao, BotaoCaixaAlta… |
| `ap-tonalidade-borda` | [`EnumTonalidade`](../ENUMS.md#enumtonalidade) | Tone/shade variation of the border color. |
| `ap-tonalidade-fundo` | [`EnumTonalidade`](../ENUMS.md#enumtonalidade) | Tone/shade variation of the background color (T100–T900, Alpha10–90). |
| `ap-tonalidade-texto` | [`EnumTonalidade`](../ENUMS.md#enumtonalidade) | Tone/shade variation of the text color. |
| `ap-visibilidade` | [`EnumVisibilidade`](../ENUMS.md#enumvisibilidade) | Visibility: `Visivel`, `Invisivel` (keeps space) or `Oculto` (display none). The go-to attribute for responsive show/hide. |
| `sn-tipo-botao` | [`EnumTipoBotao`](../ENUMS.md#enumtipobotao) | Visual style of the button: Normal, Flat, Circulo, Icone, Link, Menu, Tab… |

### Responsive suffixes

Append a suffix to any `ap-*` attribute to target a breakpoint. Resolution priority: height suffix → width suffix → plain attribute.

| Suffix | Applies when |
|--------|--------------|
| *(none)* | Default — all screens |
| `--celular` | Screen width ≤ 612px (phones) |
| `--tablet` | Width < 1024px (tablets) |
| `--notebook` | Width < 1440px (laptops) |
| `--desktop` | Width ≥ 1440px (desktops) |
| `--super-pequena-v` | Viewport height ≤ 512px |
| `--pequena-v` | Viewport height ≤ 712px |
| `--media-v` | Viewport height < 850px |
| `--grande-v` | Viewport height ≥ 850px |

```html
<sn-botao-logico
    ap-visibilidade="Visivel"
    ap-visibilidade--celular="Oculto"
    ap-largura="50%"
    ap-largura--celular="100%">
    ...
</sn-botao-logico>
```

## Inheritance

`BotaoLogico` → `Botao` → `ControleRotulo` → `BaseControle` → `ComponenteApresentacaoConteudo` → `ComponenteApresentacao` → `BaseUIElemento`

## Usage in Sigi

Found **13** usages across **4** `.shtml` files in the Sigi frontend.

---
*Snebur.UI Framework — generated documentation. Do not edit manually.*
