# `<sn-caixa-moeda>` — Currency box

**Type:** Form control (`sn-`) | **Class:** `CaixaMoeda` | **Extends:** `BaseCaixaTexto` | **Rendered as:** `HTMLDivElement`

Numeric input formatted as currency (pt-BR). Supports `sn-minimo`/`sn-maximo` and zero-value rules (`sn-is-nao-permitir-zero`).

## Real-world examples

Extracted from the Sigi frontend (41 usages in 36 files).

```html
<sn-caixa-moeda
        class="sn-esquerda"
        sn-rotulo="Desconto"
        sn-bind="{{ValorValePresente}}"
        ap-tipo-caixa="Delineada"
        ap-largura="100%"
        sn-passo="0.1"
        sn-tipo-entrada="Decimal"
        sn-is-rotulo-vazio="true"
        ap-icone="Percent"
        sn-marca-dagua="Digite aqui valor do presente, somente numeros">
    </sn-caixa-moeda>
```

*Source: `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/Promocao/Cadastro/Wizard/PaginaWizardPromocaoPeriodoValePresente.shtml`*

```html
<sn-caixa-moeda
        sn-is-rotulo-vazio="true"
        sn-bind="{{ValorGrupo}}"
        class="sn-sem-linha-horizontal"
        sn-bind-class="sn-preco-nao-configuradao={{IsPrecoNovo}},Origem=this"
        ap-largura="120px"
        sn-manter-espaco-mensagem-validacao="false"
        sn-somente-leitura="{{IsSomenteLeitura}}, Origem=this">
    </sn-caixa-moeda>
```

*Source: `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/Cobranca/TabelaPreco/Album/Album/ControlePrecoGrupoLaminaBloco.shtml`*

```html
<sn-caixa-moeda sn-is-rotulo-vazio="true"
                    sn-bind="{{ValorGrupo}}"
                    class="sn-sem-linha-horizontal"
                    ap-largura="80px"
                    sn-bind-class="sn-nenhum-valor-configurado={{IsValorConfigurado == false}}"
                    sn-manter-espaco-mensagem-validacao="false">
    </sn-caixa-moeda>
```

*Source: `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/Cobranca/TabelaPreco/Revelacao/ControlePrecoGrupoRevelacao.shtml`*

## Attributes

Configuration attributes specific to this control (own first, then inherited).

| Attribute | Type | Declared on | Description |
|-----------|------|-------------|-------------|
| `sn-is-nao-formatar-valor-vazio` | `Boolean` | `CaixaMoeda` | Leaves the box empty instead of formatting an empty/zero value. |
| `sn-is-nao-permitir-zero` | `Boolean` | `CaixaMoeda` | Rejects zero as a valid value. |
| `sn-mascara` | `String` | `CaixaMoeda` | Input mask (e.g. `(00) 0000-0000`). Masked input keeps the raw value in the bind. |
| `sn-maximo` | `Number` | `CaixaMoeda` | Maximum numeric value accepted. |
| `sn-minimo` | `Number` | `CaixaMoeda` | Minimum numeric value accepted. |
| `disabled` | `String` | `BaseControleFormulario` *(inherited)* | Native HTML disabled attribute (managed by the framework). |
| `sn-construtor` | `String` | `BaseUIElemento` *(inherited)* | Explicit constructor/class name to instantiate for this element (overrides the tag registry). |
| `sn-controle` | `String` | `BaseControle` *(inherited)* | Name of the user-control class to host (used with `sn-controle-usuario`). |
| `sn-desabilitar` | `Boolean` | `ComponenteApresentacao` *(inherited)* | Disables the control (`true`/`false` or bind path). Disabled controls skip validation and events. |
| `sn-desativar-auto-completar` | `Boolean` | `BaseCaixaTexto` *(inherited)* | Disables browser autocomplete on the input. |
| `sn-inicializacao-propriedades` | `String` | `BaseUIElemento` *(inherited)* | Inline property initialization expression(s) applied when the control is created. |
| `sn-is-atualizar-digitando` | `Boolean` | `BaseCaixaTexto` *(inherited)* | Pushes the value to the bind on every keystroke (default: on blur/change). |
| `sn-is-auto-salvar` | `Boolean` | `BaseControleFormulario` *(inherited)* | Automatically saves the bound entity when the value changes. |
| `sn-is-negrito-valor-alterado` | `Boolean` | `BaseControleFormulario` *(inherited)* | Renders the label/value bold when the value was modified (dirty indicator). |
| `sn-is-rotulo-flutuante` | `Boolean` | `BaseCaixaTexto` *(inherited)* | Enables/disables the floating-label behaviour. |
| `sn-item-elemento` | `String` | `BaseUIElemento` *(inherited)* | Tag/element name to use for generated item elements. |
| `sn-legenda` | `String` | `BaseControle` *(inherited)* | Caption/help text shown with the control. |
| `sn-marca-dagua` | `String` | `BaseCaixaTexto` *(inherited)* | Placeholder (watermark) text shown while the box is empty. Exclusive to text-box family controls (`BaseCaixaTexto`). |
| `sn-maxlength` | `Number` | `BaseCaixaTexto` *(inherited)* | Maximum number of characters accepted. |
| `sn-nome` | `String` | `BaseControle` *(inherited)* | Control name. Makes the control reachable from the codebehind (`this.RetornarControle("Nome")` / typed properties) and used in messages. |
| `sn-parametros` | `String` | `BaseUIElemento` *(inherited)* | Parameters passed to the hosted control constructor (comma-separated / bind paths). |
| `sn-rotulo` | `String` | `BaseControleFormulario` *(inherited)* | Label text of the control (floating label on inputs). |
| `sn-rotulo-flutuante` | `String` | `BaseCaixaTexto` *(inherited)* | Text of the floating label (when different from `sn-rotulo`). |
| `sn-skip-tab` | [`EnumTipoCaixa`](../ENUMS.md#enumtipocaixa) | `BaseControleFormulario` *(inherited)* | Removes the control from the Tab navigation order. |
| `sn-somente-leitura` | `Boolean` | `BaseCaixaTexto` *(inherited)* | Read-only mode: value shown, editing blocked. |
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

> Standard events (`sn-click`, `sn-enter`, `sn-navegar`, `sn-selecionar-arquivos`, `sn-arrastar-arquivos`, `sn-texto-pesquisa`, `sn-item-selecionado-alterado`, `sn-valor-alterado`, `sn-valor-modificando`, `sn-linha-detalhes-expandida`, `sn-ordenacao-coluna-alterada`, `sn-conteudo-expandido`) are wired centrally and can be used on any control where they make sense — see [ATTRIBUTES.md](../ATTRIBUTES.md#events).

## Data binding

Bind attributes take a **property path** on the current data source (e.g. `sn-bind="Usuario.Nome"` or `{{Caminho}}` interpolation), set via `sn-bind-data-source` or inherited from the parent control.

| Bind | Declared on | Description |
|------|-------------|-------------|
| `sn-bind-texto` | `CaixaMoeda` | One-way bind that renders the value as the element text (also `{{path}}` in content). |
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
<sn-caixa-moeda
    ap-visibilidade="Visivel"
    ap-visibilidade--celular="Oculto"
    ap-largura="50%"
    ap-largura--celular="100%">
    ...
</sn-caixa-moeda>
```

## Inheritance

`CaixaMoeda` → `BaseCaixaTexto` → `BaseControleFormulario` → `ControleRotulo` → `BaseControle` → `ComponenteApresentacaoConteudo` → `ComponenteApresentacao` → `BaseUIElemento`

## Usage in Sigi

Found **41** usages across **36** `.shtml` files in the Sigi frontend.

---
*Snebur.UI Framework — generated documentation. Do not edit manually.*
