# `<ap-painel>` — Panel

**Type:** Layout component (`ap-`) | **Class:** `Painel` | **Extends:** `BasePainel`

General-purpose layout container. `ap-tipo-painel` selects the layout algorithm (block, horizontal/vertical stack, inline…); combine with alignment, spacing and size attributes. The workhorse of every page — and every attribute is responsive.

## Real-world examples

Extracted from the Sigi frontend (2255 usages in 640 files).

```html
<ap-painel
    ap-altura="80px"
    ap-margem="8px 0px 0px 0px"
    ap-margem-interna="0px 0px 0px 8px"
    ap-altura-pequena-v="60px"
    ap-margem-pequena-v="0px 4px 0px 0px"
    ap-margem-interna-pequena-v="0px 4px 0px 0px"
    ap-altura-media-v="75px"
    ap-margem-media-v="0px 4px 0px 0px"
    ap-margem-interna-media-v="0px 8px"
    ap-tipo-painel="PilhaVertical"
    sn-click="BtnNovaLamina_Click"
    sn-nome="NovaLamina">
    ...
</ap-painel>
```

*Source: `src/frontend/Zyoncore.Sigi.FotoAlbum.TS/Apresentacao/Montagem/Diagramador/Lamina/ControleLaminas.shtml`*

```html
<ap-painel
    ap-tipo-painel="PilhaVertical"
    sn-bind-css-classe="{{IsSelecionado}},Converter=this.RetornarCssClasseOrientacaoSelecionado"
    sn-opcao-bind-css-classe="Alterar"
    sn-opcao-bind-css-classe-prefixo-alterar="sn-item-album--"
    sn-click="BtnSelecionarOrientacao_Click"
    ap-alinhamento-horizontal="Centro"
    ap-cor-fundo="Branca"
    ap-largura="100%"
    class="sn-item-selecao-album">
    ...
</ap-painel>
```

*Source: `src/frontend/Zyoncore.Sigi.FotoAlbum.TS/Apresentacao/Configuracao/ConfiguracaoEstojo/02 - Tamanho/PaginaSelecaoTamanhoEstojo.shtml`*

```html
<ap-painel ap-tipo-painel="PilhaVertical"
               ap-margem="16px -24px 16px 0px"
               ap-largura="400px"
               ap-largura--celular="100%"
               ap-alinhamento-horizontal="Centro"
               ap-alinhamento-vertical="Centro"
               sn-visibilidade="{{IsSolicitarSemPossuiCupom}}, Origem=this">


        <ap-bloco>
            <sn-botao sn-tipo-botao="FlatBox"
                      ap-largura="100%"
                      sn-click="BtnIrParaValidacaoCupom_Click"
                      ap-cor-texto="SistemaPrincipal"
                      class="sn-borda-cor-principal">
                APLICAR CUPOM PROMOCIONAL
            </sn-botao>
        </ap-bloco>
        <ap-bloco ap-margem="0px 32px 0px 0px">
            <sn-botao ap-cor-fundo="SistemaPrincipal"
                      ap-cor-texto="Branca"
                      ap-largura="100%"
                      sn-click="BtnContinuarSemCupom_Click">
                CONTINUAR SEM CUPOM
            </sn-botao>
        </ap-bloco>
    </ap-painel>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Soliticacao/paginausocupom.shtml`*

## Attributes

Configuration attributes specific to this control (own first, then inherited).

| Attribute | Type | Declared on | Description |
|-----------|------|-------------|-------------|
| `sn-construtor` | `String` | `BaseUIElemento` *(inherited)* | Explicit constructor/class name to instantiate for this element (overrides the tag registry). |
| `sn-desabilitar` | `Boolean` | `ComponenteApresentacao` *(inherited)* | Disables the control (`true`/`false` or bind path). Disabled controls skip validation and events. |
| `sn-inicializacao-propriedades` | `String` | `BaseUIElemento` *(inherited)* | Inline property initialization expression(s) applied when the control is created. |
| `sn-item-elemento` | `String` | `BaseUIElemento` *(inherited)* | Tag/element name to use for generated item elements. |
| `sn-legenda` | `String` | `ComponenteApresentacaoConteudo` *(inherited)* | Caption/help text shown with the control. |
| `sn-nome` | `String` | `ComponenteApresentacao` *(inherited)* | Control name. Makes the control reachable from the codebehind (`this.RetornarControle("Nome")` / typed properties) and used in messages. |
| `sn-parametros` | `String` | `BaseUIElemento` *(inherited)* | Parameters passed to the hosted control constructor (comma-separated / bind paths). |
| `sn-visibilidade` | [`EnumVisibilidade`](../ENUMS.md#enumvisibilidade) | `BaseUIElemento` *(inherited)* | Visibility of the control: `Visivel`, `Invisivel` (keeps space) or `Oculto` (removed from layout). |

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
| `sn-click` | *standard event* | Fires when the element is clicked/tapped. Value = codebehind method name. |

### Handler implementations (from Sigi codebehind)

**`sn-click="BtnSelecionar_Click"`** — `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/Compartilhado/Cep/ControleResultadoPesquisaEndereco.shtml.ts`:

```ts
private BtnSelecionar_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
{
    const enderecoVM = provedor.DataSource;
    if (enderecoVM instanceof EnderecoCepViewModel)
    {
        this.SelecionarInterno(enderecoVM);
    }
}
```

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
| `ap-largura` | [`EnumLargura`](../ENUMS.md#enumlargura) | Width — CSS length (`100px`, `50%`) or `Auto`. Responsive. |
| `ap-largura-maxima` | [`EnumLargura`](../ENUMS.md#enumlargura) | Maximum width (CSS length). Responsive. |
| `ap-largura-minima` | [`EnumLargura`](../ENUMS.md#enumlargura) | Minimum width (CSS length). Responsive. |
| `ap-margem` | `String` | Outer margin — CSS shorthand (`8px 0px`, `0 4px 8px 4px`). Responsive. |
| `ap-margem-interna` | `String` | Inner padding — CSS shorthand. Responsive. |
| `ap-peso-fonte` | [`EnumPesoFonte`](../ENUMS.md#enumpesofonte) | Font weight: SuperLeve…SuperPesado. |
| `ap-quebrar` | [`EnumQuebrar`](../ENUMS.md#enumquebrar) | Text wrapping: wrap, no-wrap (ellipsis) or no-wrap without ellipsis. |
| `ap-tipo-painel` | [`EnumTipoPainel`](../ENUMS.md#enumtipopainel) | Layout algorithm of the panel: block, vertical/horizontal stack, full-stack, inline stack. |
| `ap-tipografia` | [`EnumTipografia`](../ENUMS.md#enumtipografia) | Typography scale: h1–h7, Titulo, SubTitulo, Corpo, Descricao, BotaoCaixaAlta… |
| `ap-tonalidade-borda` | [`EnumTonalidade`](../ENUMS.md#enumtonalidade) | Tone/shade variation of the border color. |
| `ap-tonalidade-fundo` | [`EnumTonalidade`](../ENUMS.md#enumtonalidade) | Tone/shade variation of the background color (T100–T900, Alpha10–90). |
| `ap-tonalidade-texto` | [`EnumTonalidade`](../ENUMS.md#enumtonalidade) | Tone/shade variation of the text color. |
| `ap-visibilidade` | [`EnumVisibilidade`](../ENUMS.md#enumvisibilidade) | Visibility: `Visivel`, `Invisivel` (keeps space) or `Oculto` (display none). The go-to attribute for responsive show/hide. |

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
<ap-painel
    ap-visibilidade="Visivel"
    ap-visibilidade--celular="Oculto"
    ap-largura="50%"
    ap-largura--celular="100%">
    ...
</ap-painel>
```

## Inheritance

`Painel` → `BasePainel` → `ComponenteApresentacaoConteudo` → `ComponenteApresentacao` → `BaseUIElemento`

## Usage in Sigi

Found **2255** usages across **640** `.shtml` files in the Sigi frontend.

---
*Snebur.UI Framework — generated documentation. Do not edit manually.*
