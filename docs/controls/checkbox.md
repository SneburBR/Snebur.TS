# `<sn-checkbox>` — Checkbox

**Type:** Form control (`sn-`) | **Class:** `Checkbox` | **Extends:** `BaseControleFormulario` | **Rendered as:** `HTMLDivElement`

Checkbox bound to a boolean with `sn-bind-valor-logico` (or used inside selection lists). Fires `sn-valor-alterado`.

## Real-world examples

Extracted from the Sigi frontend (298 usages in 159 files).

```html
<sn-checkbox
        sn-bind="{{IsNaoMostrarNovamente}}"
        ap-alinhamento-vertical="Centro"
        ap-rotulo="não mostrar mais"
        ap-tipografia="Corpo"
        ap-tipografia--celular="Descricao">
    </sn-checkbox>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Notificacao/JanelaNotificacao.shtml`*

```html
<sn-checkbox
        sn-nome="CkbInscricaoEstadual"
        sn-bind="{{IsIsento}}, Origem=this"
        sn-rotulo="Isento"
        sn-valor-alterado="CkbInscricaoEstadual_ValorAlterado" ap-tipografia="Corpo2">
    </sn-checkbox>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Cadastro/ControleClientePessoaJuridica.shtml`*

```html
<sn-checkbox
        sn-nome="ChkBordaInterna"
        sn-rotulo="Borda interna"
        sn-valor-alterado="ChkBordaInterna_ValorAlterado"
        ap-margem="0px 4px 0px 8px"
        ap-tipografia="Corpo"
        sn-bind="{{Borda.IsInterna}}, Origem=this">
    </sn-checkbox>
```

*Source: `src/frontend/Zyoncore.Sigi.FotoAlbum.TS/Apresentacao/Configuracao/ConfiguracaoDiagramador/JanelaConfiguracaoPadraoBorda.shtml`*

## Attributes

Configuration attributes specific to this control (own first, then inherited).

| Attribute | Type | Declared on | Description |
|-----------|------|-------------|-------------|
| `disabled` | `String` | `BaseControleFormulario` *(inherited)* | Native HTML disabled attribute (managed by the framework). |
| `sn-construtor` | `String` | `BaseUIElemento` *(inherited)* | Explicit constructor/class name to instantiate for this element (overrides the tag registry). |
| `sn-controle` | `String` | `BaseControle` *(inherited)* | Name of the user-control class to host (used with `sn-controle-usuario`). |
| `sn-desabilitar` | `Boolean` | `ComponenteApresentacao` *(inherited)* | Disables the control (`true`/`false` or bind path). Disabled controls skip validation and events. |
| `sn-inicializacao-propriedades` | `String` | `BaseUIElemento` *(inherited)* | Inline property initialization expression(s) applied when the control is created. |
| `sn-is-auto-salvar` | `Boolean` | `BaseControleFormulario` *(inherited)* | Automatically saves the bound entity when the value changes. |
| `sn-is-negrito-valor-alterado` | `Boolean` | `BaseControleFormulario` *(inherited)* | Renders the label/value bold when the value was modified (dirty indicator). |
| `sn-item-elemento` | `String` | `BaseUIElemento` *(inherited)* | Tag/element name to use for generated item elements. |
| `sn-legenda` | `String` | `BaseControle` *(inherited)* | Caption/help text shown with the control. |
| `sn-nome` | `String` | `BaseControle` *(inherited)* | Control name. Makes the control reachable from the codebehind (`this.RetornarControle("Nome")` / typed properties) and used in messages. |
| `sn-parametros` | `String` | `BaseUIElemento` *(inherited)* | Parameters passed to the hosted control constructor (comma-separated / bind paths). |
| `sn-rotulo` | `String` | `BaseControleFormulario` *(inherited)* | Label text of the control (floating label on inputs). |
| `sn-skip-tab` | [`EnumTipoCaixa`](../ENUMS.md#enumtipocaixa) | `BaseControleFormulario` *(inherited)* | Removes the control from the Tab navigation order. |
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

**`sn-valor-alterado="ChkIsSelecionado_Alterado"`** — `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/MinhaConta/JanelaCadastroUsuario.shtml.ts`:

```ts
public ChkIsSelecionado_Alterado(checkbox: ui.Checkbox, e: ui.UIValorAlteradoEventArgs)
{
    const localRevelacaoVM = checkbox.DataSource;
    if (localRevelacaoVM instanceof LocalRevelacaoViewModel &&
        localRevelacaoVM.IsSelecionado)
    {
        if (!this.LocaisRevelacaoViewModel.Any(x => x.IsPadrao))
        {
            localRevelacaoVM.IsPadrao = true;
        }
    }
}
```

## Data binding

Bind attributes take a **property path** on the current data source (e.g. `sn-bind="Usuario.Nome"` or `{{Caminho}}` interpolation), set via `sn-bind-data-source` or inherited from the parent control.

| Bind | Declared on | Description |
|------|-------------|-------------|
| `sn-bind-texto` | `Checkbox` | One-way bind that renders the value as the element text (also `{{path}}` in content). |
| `sn-bind` | `BaseControleFormulario` *(inherited)* | Two-way bind of the control **value** to a property path of the data source (e.g. `Cliente.Nome`). Validation rules of the bound domain property are applied automatically. |
| `sn-bind-form` | `BaseControleFormulario` *(inherited)* | Binds a form scope: children bind relative to this path, and the form tracks validation/dirty state. |

## Validation attributes

Attributes controlling input validation behaviour.

| Attribute | Type | Declared on | Description |
|-----------|------|-------------|-------------|
| `sn-destino-mensagem-validacao` | `String` | `BaseControleFormulario` *(inherited)* | Name of the element/control where validation messages are rendered (instead of inline). |
| `sn-ignorar-validacao` | `Boolean` | `BaseControleFormulario` *(inherited)* | Skips this control during form validation. |
| `sn-manter-espaco-mensagem-validacao` | `Boolean` | `BaseControleFormulario` *(inherited)* | Keeps the validation-message space reserved to avoid layout jumps. |
| `sn-mensagem-validacao-flutuante` | `Boolean` | `BaseControleFormulario` *(inherited)* | Shows the validation message floating (tooltip style) instead of inline. |
| `sn-validar-sempre` | `Boolean` | `BaseControleFormulario` *(inherited)* | Validates the control even when unchanged/hidden. |
| `sn-validar-valor-propriedade-alterado` | `Boolean` | `BaseControleFormulario` *(inherited)* | Re-validates whenever the bound property changes (not only on user edit). |

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
| `ap-rotulo` | `String` | Presentation label rendered by the component (responsive). |
| `ap-tipo-caixa` | [`EnumTipoCaixa`](../ENUMS.md#enumtipocaixa) | Input box visual style: Padrao (filled/underline) or Delineada (outlined). |
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
<sn-checkbox
    ap-visibilidade="Visivel"
    ap-visibilidade--celular="Oculto"
    ap-largura="50%"
    ap-largura--celular="100%">
    ...
</sn-checkbox>
```

## Inheritance

`Checkbox` → `BaseControleFormulario` → `ControleRotulo` → `BaseControle` → `ComponenteApresentacaoConteudo` → `ComponenteApresentacao` → `BaseUIElemento`

## Usage in Sigi

Found **298** usages across **159** `.shtml` files in the Sigi frontend.

---
*Snebur.UI Framework — generated documentation. Do not edit manually.*
