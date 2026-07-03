# `<ap-bloco>` — Block

**Type:** Layout component (`ap-`) | **Class:** `Bloco` | **Extends:** `BasePainel`

Simple block container (a styled `<div>`): background/tone, border, margins, size — all responsive. Use it wherever a plain wrapper is needed.

## Real-world examples

Extracted from the Sigi frontend (4100 usages in 555 files).

```html
<ap-bloco ap-altura="100%"
        ap-margem="16px 4px"
        ap-margem--celular="8px 4px"
        ap-largura="100%" sn-click="BtnLogo_Click"
        sn-bind-estilo="transform={{TransformLogo, Origem=this}}">

        <!--class=""-->
        <img class="sn-imagem-uniforme-vertical-centro"
            sn-bind-url-imagem="{{UrlLogo}}, Origem=this" style="position: absolute"
            sn-bind-estilo="margin-top={{LogoTop, Origem=this}}&
                            margin-left={{LogoLeft, Origem=this}}" />

    </ap-bloco>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Cabecalho/ControleMenuCabecalho.shtml`*

```html
<ap-bloco
    sn-nome="BlocoDestinoimagens"
    ap-altura="100%"
    ap-largura="100%"
    sn-arrastar-arquivos="BtnArrastarArquivos_Click"
    sn-multiselecao="true"
    ap-barra-rolagem-vertical="Automatica"
    ap-margem="8px 4px"
    ap-margem--celular="4px 0px">
    ...
</ap-bloco>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Revelacao/PaginaRevelacao.shtml`*

```html
<ap-bloco
    ap-cor-fundo="{{CorBotaoConferir}}, Origem=this"
    ap-cor-texto="{{CorTextoBotaoConferior}}, Origem=this"
    ap-margem-interna="8px 2px" ap-largura="240px"
    ap-altura="44px" class="sn-btn-conferir-pedido"
    sn-click="BtnConferirPedido_Click">
    ...
</ap-bloco>
```

*Source: `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/Pedidos/JanelaDetalhesPedido.shtml`*

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
| `sn-arrastar-arquivos` | *standard event* | Fires when files are dragged & dropped onto the control. |
| `sn-click` | *standard event* | Fires when the element is clicked/tapped. Value = codebehind method name. |

### Handler implementations (from Sigi codebehind)

**`sn-click="BtnConferirPedido_Click"`** — `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/Pedidos/JanelaDetalhesPedido.shtml.ts`:

```ts
public async BtnConferirPedido_Click(botao: ui.Botao, e: ui.UIEventArgs)
{
    const pedidoVM = this.PedidoViewModel;
    if (!pedidoVM.IsNaoConferido)
    {
        throw new Error("O pedido não pode ser conferido");
    }

    if (pedidoVM.IsAguardandoPagamento && pedidoVM.IsPodeEditar)
    {
        /*await PedidoUtil.ConfirmarPagamentoPedidoAsync(this, pedidoVM);*/
        const janela = new JanelaEditarPedido(this, pedidoVM, true);
        await janela.MostrarAsync();
        await pedidoVM.AtualizarStatusAsync();
        this.NotificarStatusAlterado();
        return;
// ...
}
```

**`sn-arrastar-arquivos="BtnArrastarArquivos_Click"`** — `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Revelacao/PaginaRevelacao.shtml.ts`:

```ts
private BtnArrastarArquivos_Click(provedor: ui.BaseUIElemento, e: ui.SelecionarArquivosEventoArgs)
{
    if (e.Arquivos.Count > 0)
    {
        this.CarregarArquivosAsync(e.Arquivos);
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
<ap-bloco
    ap-visibilidade="Visivel"
    ap-visibilidade--celular="Oculto"
    ap-largura="50%"
    ap-largura--celular="100%">
    ...
</ap-bloco>
```

## Inheritance

`Bloco` → `BasePainel` → `ComponenteApresentacaoConteudo` → `ComponenteApresentacao` → `BaseUIElemento`

## Usage in Sigi

Found **4100** usages across **555** `.shtml` files in the Sigi frontend.

---
*Snebur.UI Framework — generated documentation. Do not edit manually.*
