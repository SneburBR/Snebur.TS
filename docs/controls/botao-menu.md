# `<sn-botao-menu>` — Menu button

**Type:** Form control (`sn-`) | **Class:** `BotaoMenu` | **Extends:** `ControleFlutuante` | **Rendered as:** `HTMLDivElement`

Button that opens a floating menu of `sn-botao-menu-item` children. Position is controlled with `sn-destino-controle-flutuante`.

## Real-world examples

Extracted from the Sigi frontend (9 usages in 7 files).

```html
<sn-botao-menu ap-margem="-35px 0px 0px 0px" sn-largura-item="110px">

        <sn-botao-menu-item sn-click="BtnMinhaConta_Click">
            Minha conta
        </sn-botao-menu-item>
        <sn-botao-menu-item sn-click="BtnSobre_Click">
            Sobre
        </sn-botao-menu-item>
        <sn-botao-menu-item sn-click="BtnSair_Click">
            Sair
        </sn-botao-menu-item>

    </sn-botao-menu>
```

*Source: `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/MenuAcao/MenuAcaoUsuario.shtml`*

```html
<sn-botao-menu sn-largura-item="90px" sn-destino-controle-flutuante="InferiorEsquerda">
        <sn-botao-menu-item sn-click="BtnConfiguracoes_Click">Capa</sn-botao-menu-item>
        <sn-botao-menu-item sn-click="BtnConfiguracoesBloco_Click">Bloco</sn-botao-menu-item>
    </sn-botao-menu>
```

*Source: `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/Encadernacao/Relacionamentos/Album/Capa/Relacionamentos/01-EstruturaCapa/ControleEstruturasCapa.shtml`*

```html
<sn-botao-menu sn-largura-item="200px" ap-margem="-50px 0px 0px 0px">

        <sn-botao-menu-item sn-click="BtnTabelaPrecoAlbum_Click">
            Lâmina ou pagina adicional
         </sn-botao-menu-item>
        <sn-botao-menu-item sn-click="BtnTabelaPreco_Click">
            Lamina ou página
         </sn-botao-menu-item>

    </sn-botao-menu>
```

*Source: `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/Encadernacao/Relacionamentos/Album/Bloco/02_AcabamentoPapel/controleacabamentospapelsuportado.shtml`*

## Attributes

Configuration attributes specific to this control (own first, then inherited).

| Attribute | Type | Declared on | Description |
|-----------|------|-------------|-------------|
| `sn-destino-controle-flutuante` | [`EnumDestinoControleFlutuante`](../ENUMS.md#enumdestinocontroleflutuante) | `BotaoMenu` | Preferred position of the floating control relative to its anchor. |
| `sn-largura-item` | `String` | `BotaoMenu` | Width of each item (item-based layouts). |
| `sn-construtor` | `String` | `BaseUIElemento` *(inherited)* | Explicit constructor/class name to instantiate for this element (overrides the tag registry). |
| `sn-controle` | `String` | `BaseControle` *(inherited)* | Name of the user-control class to host (used with `sn-controle-usuario`). |
| `sn-desabilitar` | `Boolean` | `ComponenteApresentacao` *(inherited)* | Disables the control (`true`/`false` or bind path). Disabled controls skip validation and events. |
| `sn-inicializacao-propriedades` | `String` | `BaseUIElemento` *(inherited)* | Inline property initialization expression(s) applied when the control is created. |
| `sn-is-controle-flutuante` | `String` | `ControleFlutuante` *(inherited)* | Marks the control as floating (rendered detached, positioned relative to its anchor). |
| `sn-is-pontilhar-areas` | `Boolean` | `ControleApresentacao` *(inherited)* | Debug: outlines layout areas with dotted borders. |
| `sn-item-elemento` | `String` | `BaseUIElemento` *(inherited)* | Tag/element name to use for generated item elements. |
| `sn-legenda` | `String` | `BaseControle` *(inherited)* | Caption/help text shown with the control. |
| `sn-nao-entrar-arvore` | `String` | `ControleFlutuante` *(inherited)* | Excludes the element from the control tree (children are not parsed as controls). |
| `sn-nome` | `String` | `BaseControle` *(inherited)* | Control name. Makes the control reachable from the codebehind (`this.RetornarControle("Nome")` / typed properties) and used in messages. |
| `sn-parametros` | `String` | `BaseUIElemento` *(inherited)* | Parameters passed to the hosted control constructor (comma-separated / bind paths). |
| `sn-visibilidade` | [`EnumVisibilidade`](../ENUMS.md#enumvisibilidade) | `BaseControle` *(inherited)* | Visibility of the control: `Visivel`, `Invisivel` (keeps space) or `Oculto` (removed from layout). |

### Values for `sn-destino-controle-flutuante` (`EnumDestinoControleFlutuante`)

| Option | Description |
|--------|-------------|
| `Automatico` | Choose the best position automatically. |
| `Esquerda` | — |
| `Superior` | — |
| `Direita` | — |
| `Inferior` | — |
| `InferiorCentro` | — |
| `InferiorEsquerda` | — |
| `InferiorDireita` | — |
| `SuperiorCentro` | — |
| `SuperiorEsquerda` | — |
| `SuperiorDireita` | — |
| `EsquerdaSuperior` | — |
| `EsquerdaCentro` | — |
| `EsquerdaInferior` | — |
| `DireitaSuperior` | — |
| `DireitaCentro` | — |
| `DireitaInferior` | — |
| `Centro` | Centered over the anchor. |

```html
<sn-controle-usuario sn-destino-controle-flutuante="Inferior"> ... </sn-controle-usuario>
```

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

> Standard events (`sn-click`, `sn-enter`, `sn-navegar`, `sn-selecionar-arquivos`, `sn-arrastar-arquivos`, `sn-texto-pesquisa`, `sn-item-selecionado-alterado`, `sn-valor-alterado`, `sn-valor-modificando`, `sn-linha-detalhes-expandida`, `sn-ordenacao-coluna-alterada`, `sn-conteudo-expandido`) are wired centrally and can be used on any control where they make sense — see [ATTRIBUTES.md](../ATTRIBUTES.md#events).

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
<sn-botao-menu
    ap-visibilidade="Visivel"
    ap-visibilidade--celular="Oculto"
    ap-largura="50%"
    ap-largura--celular="100%">
    ...
</sn-botao-menu>
```

## Inheritance

`BotaoMenu` → `ControleFlutuante` → `ControleApresentacao` → `BaseControleApresentacaoFormulario` → `BaseControle` → `ComponenteApresentacaoConteudo` → `ComponenteApresentacao` → `BaseUIElemento`

## Usage in Sigi

Found **9** usages across **7** `.shtml` files in the Sigi frontend.

---
*Snebur.UI Framework — generated documentation. Do not edit manually.*
