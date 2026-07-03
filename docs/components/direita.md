# `<ap-direita>` — Right region

**Type:** Layout component (`ap-`) | **Class:** `DireitaPainel` | **Extends:** `BaseColuna`

Right-docked region of `ap-painel-horizontal`.

## Real-world examples

Extracted from the Sigi frontend (19 usages in 13 files).

```html
<ap-direita
        sn-nome="ElementoDestinoRevelacaoConfiguracaoLateralModerno"
        ap-largura="110px"
        ap-largura--pequena-v="100px"
        ap-visibilidade--celular="Oculto"
        sn-visibilidade="{{IsModoProfissional  == false }}, Origem=this"
        class="sigi-cor-fundo">

        <!-- 
        <sn-controle-usuario
            sn-nome="RevelacaoConfiguracaoLateralModerno"
            sn-controle="RevelacaoConfiguracaoLateralModerno"
            sn-bind-data-source="{{.}}">
        </sn-controle-usuario>
        -->

    </ap-direita>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Revelacao/PaginaRevelacao.shtml`*

```html
<ap-direita
        sn-nome="ElementoDestinoRevelacaoConfiguracaoLateral"
        ap-largura="260px"
        class="sigi-cor-fundo"
        ap-visibilidade--celular="Oculto"
        sn-visibilidade="{{IsModoProfissional  }}, Origem=this">

        <!-- Lado direito-->

        <!--
        <sn-controle-usuario
            sn-nome="RevelacaoConfiguracaoLateral"
            sn-controle="RevelacaoConfiguracaoLateral"
            sn-bind-data-source="{{.}}">
        </sn-controle-usuario>
        -->

    </ap-direita>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Revelacao/PaginaRevelacao.shtml`*

```html
<ap-direita
        ap-largura="350px"
        ap-largura-notebook="250px"
        ap-largura-tablet="200px"
        ap-margem-interna="0px 8px 0px 8px"
        ap-margem-interna-pequena-v="0px 4px 0px 4px"
        ap-margem-interna-media-v="0px 6px 0px 6px">

        <sn-botao
            ap-cor-fundo="SistemaSucesso"
            ap-largura="100%"
            ap-cor-texto="Branca"
            ap-tipografia="SubTitulo"
            ap-tipografia-pequena-v="SubTitulo2"
            ap-tipografia-media-v="SubTitulo"
            sn-click="BtnFinalizarMontagem_Click">
            FINALIZAR MONTAGEM</sn-botao>

    </ap-direita>
```

*Source: `src/frontend/Zyoncore.Sigi.FotoAlbum.TS/Apresentacao/Montagem/Diagramador/DiagramadorEstojo/Usuario/JanelaDiagramadorEstojoUsuario.shtml`*

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
<ap-direita
    ap-visibilidade="Visivel"
    ap-visibilidade--celular="Oculto"
    ap-largura="50%"
    ap-largura--celular="100%">
    ...
</ap-direita>
```

## Inheritance

`DireitaPainel` → `BaseColuna` → `BasePainel` → `ComponenteApresentacaoConteudo` → `ComponenteApresentacao` → `BaseUIElemento`

## Usage in Sigi

Found **19** usages across **13** `.shtml` files in the Sigi frontend.

---
*Snebur.UI Framework — generated documentation. Do not edit manually.*
