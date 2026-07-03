# `<sn-painel-lista-ordenacao>` — Sortable list panel

**Type:** Form control (`sn-`) | **Class:** `PainelListaOrdenacao` | **Extends:** `PainelLista` | **Rendered as:** `HTMLDivElement`

List panel with drag-and-drop reordering.

## Real-world examples

Extracted from the Sigi frontend (10 usages in 10 files).

```html
<sn-painel-lista-ordenacao
    sn-nome="PainelListaImagens"
    sn-bind-lista="{{Imagens}}, Origem=this"
    sn-sensibilidade-vertical="false"
    ap-tipo-painel="PilhaHorizontal"
    sn-is-animar-ordenacao="false"
    sn-entidade-ordenacao="this.RetornarEntidadeOrdenmacao"
    sn-visibilidade="{{IsPossuiImagens}}, Origem=this" class="sn-lista-imagens">
    ...
</sn-painel-lista-ordenacao>
```

*Source: `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/Compartilhado/Imagens/ControleListaImagens.shtml`*

```html
<sn-painel-lista-ordenacao
    ap-borda="1px 1px 1px 0px"
    ap-cor-borda="Cinza"
    ap-tonalidade-borda="Aplha20"
    ap-tipo-painel="PilhaVertical"
    sn-entidade-ordenacao="EntidadeOrdenacao"
    sn-is-animar-ordenacao="false"
    sn-bind-lista="{{GruposDesagrupadoGabaritoViewModel}}, Origem=this"
    sn-is-clone-global="false">
    ...
</sn-painel-lista-ordenacao>
```

*Source: `src/frontend/Zyoncore.Sigi.ZyonAdmin/Apresentacao/Cadastros/Gabarito/PaginaGabaritosVisualizacao.shtml`*

```html
<sn-painel-lista-ordenacao
    sn-nome="PainelListaLaminas"
    sn-bind-lista="{{LaminasBloco}}"
    ap-tipo-painel="PilhaHorizontalEmLinha"
    ap-altura="100%"
    sn-is-clone-global="false"
    sn-is-animar-ordenacao="false">
    ...
</sn-painel-lista-ordenacao>
```

*Source: `src/frontend/Zyoncore.Sigi.FotoAlbum.TS/Apresentacao/Montagem/Diagramador/Lamina/ControleLaminas.shtml`*

## Attributes

Configuration attributes specific to this control (own first, then inherited).

| Attribute | Type | Declared on | Description |
|-----------|------|-------------|-------------|
| `sn-entidade-ordenacao` | `String` | `PainelListaOrdenacao` | Entity/property that stores the order index. |
| `sn-is-animar-ordenacao` | `Boolean` | `PainelListaOrdenacao` | Animates items while reordering. |
| `sn-is-ativar-ordenacao` | `Boolean` | `PainelListaOrdenacao` | Enables column sorting on the data grid. |
| `sn-is-clone-global` | `Boolean` | `PainelListaOrdenacao` | Drags a global clone of the element (escapes overflow clipping). |
| `sn-is-salvar-ordenacao-automaticamente` | `Boolean` | `PainelListaOrdenacao` | Persists the new order automatically after a drag. |
| `sn-metodo-salvar-entidades-ordenada` | `String` | `PainelListaOrdenacao` | Codebehind method called to persist entities after drag-reordering. |
| `sn-passo` | `String` | `PainelListaOrdenacao` | Step increment of sliders/steppers. |
| `sn-sentido-ordenacao` | [`EnumSentidoOrdenacao`](../ENUMS.md#enumsentidoordenacao) | `PainelListaOrdenacao` | Sort direction: Crescente (ascending) or Decrescente (descending). |
| `sn-construtor` | `String` | `BaseUIElemento` *(inherited)* | Explicit constructor/class name to instantiate for this element (overrides the tag registry). |
| `sn-consulta` | `String` | `BaseControleLista` *(inherited)* | Name of the entity query (consulta) that supplies the items. |
| `sn-consulta-await` | `String` | `BaseControleLista` *(inherited)* | Async variant: awaits the named query before rendering. |
| `sn-consultar-tipo-automaticamente` | `String` | `BaseControleLista` *(inherited)* | Queries the item type automatically from the bind context. |
| `sn-controle` | `String` | `BaseControle` *(inherited)* | Name of the user-control class to host (used with `sn-controle-usuario`). |
| `sn-desabilitar` | `Boolean` | `ComponenteApresentacao` *(inherited)* | Disables the control (`true`/`false` or bind path). Disabled controls skip validation and events. |
| `sn-inicializacao-propriedades` | `String` | `BaseUIElemento` *(inherited)* | Inline property initialization expression(s) applied when the control is created. |
| `sn-is-async` | `Boolean` | `BaseControleLista` *(inherited)* | Loads/executes asynchronously. |
| `sn-is-marcar-item` | `Boolean` | `PainelLista` *(inherited)* | Debug: highlights the item under the cursor. |
| `sn-is-marcar-linha` | `Boolean` | `PainelLista` *(inherited)* | Debug: highlights the row under the cursor. |
| `sn-item-elemento` | `String` | `BaseUIElemento` *(inherited)* | Tag/element name to use for generated item elements. |
| `sn-legenda` | `String` | `BaseControle` *(inherited)* | Caption/help text shown with the control. |
| `sn-nome` | `String` | `BaseControle` *(inherited)* | Control name. Makes the control reachable from the codebehind (`this.RetornarControle("Nome")` / typed properties) and used in messages. |
| `sn-normalizar` | `String` | `BaseControleLista` *(inherited)* | Normalization applied to the typed text (trim, casing…). |
| `sn-parametros` | `String` | `BaseUIElemento` *(inherited)* | Parameters passed to the hosted control constructor (comma-separated / bind paths). |
| `sn-relacoes-aberta` | `String` | `BaseControleLista` *(inherited)* | Relations to eager-open (`.AbrirRelacao`) on the queried entities. |
| `sn-tipo` | `String` | `BaseControleLista` *(inherited)* | Domain type name used by the control (e.g. the enum type of a `sn-combobox-enum` or entity type of a query). |
| `sn-visibilidade` | [`EnumVisibilidade`](../ENUMS.md#enumvisibilidade) | `BaseControle` *(inherited)* | Visibility of the control: `Visivel`, `Invisivel` (keeps space) or `Oculto` (removed from layout). |

### Values for `sn-sentido-ordenacao` (`EnumSentidoOrdenacao`)

| Option | Description |
|--------|-------------|
| `Crescente` | Ascending. |
| `Decrescente` | Descending. |

```html
<sn-coluna-texto sn-sentido-ordenacao="Crescente"> ... </sn-coluna-texto>
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

## Data binding

Bind attributes take a **property path** on the current data source (e.g. `sn-bind="Usuario.Nome"` or `{{Caminho}}` interpolation), set via `sn-bind-data-source` or inherited from the parent control.

| Bind | Declared on | Description |
|------|-------------|-------------|
| `sn-bind-lista` | `BaseControleLista` *(inherited)* | Binds the item collection of a list control. |

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
<sn-painel-lista-ordenacao
    ap-visibilidade="Visivel"
    ap-visibilidade--celular="Oculto"
    ap-largura="50%"
    ap-largura--celular="100%">
    ...
</sn-painel-lista-ordenacao>
```

## Inheritance

`PainelListaOrdenacao` → `PainelLista` → `BaseControleLista` → `BaseControleApresentacaoFormulario` → `BaseControle` → `ComponenteApresentacaoConteudo` → `ComponenteApresentacao` → `BaseUIElemento`

## Usage in Sigi

Found **10** usages across **10** `.shtml` files in the Sigi frontend.

---
*Snebur.UI Framework — generated documentation. Do not edit manually.*
