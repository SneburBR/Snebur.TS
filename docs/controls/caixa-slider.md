# `<sn-caixa-slider>` — Slider

**Type:** Form control (`sn-`) | **Class:** `CaixaSlider` | **Extends:** `BaseControleFormulario` | **Rendered as:** `HTMLDivElement`

Range slider. Configure `sn-minimo`, `sn-maximo`, `sn-passo` (step) and value display/formatting (`sn-is-mostrar-valor`, `sn-formatar-valor`).

## Real-world examples

Extracted from the Sigi frontend (75 usages in 19 files).

```html
<sn-caixa-slider
        sn-is-rotulo-vazio="true"
        sn-is-mostrar-valor="false"
        sn-formatar-valor="Inteiro"
        sn-largura-texto-valor="32px"
        sn-minimo="-100"
        sn-maximo="100"
        sn-passo="1"
        sn-passo-largo="5"
        ap-largura="120px"
        sn-bind="{{Magenta}}, Converter=this.Ajuste100"
        sn-valor-alterado="Slider_ValorAlterado">
    </sn-caixa-slider>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Revelacao/Edicao/ControleRevelacaoAjustes.shtml`*

```html
<sn-caixa-slider
        sn-is-rotulo-vazio="true"
        sn-is-mostrar-valor="false"
        sn-formatar-valor="Inteiro"
        sn-largura-texto-valor="32px"
        sn-minimo="-100"
        sn-maximo="100"
        sn-passo="1"
        sn-passo-largo="5"
        ap-largura="120px"
        sn-bind="{{FiltroImagem.Magenta}}, Converter=this.Ajuste100"
        sn-valor-modificando="Slider_ValorAlterado">
    </sn-caixa-slider>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Edicao/ControleEdicaoAjustes.shtml`*

```html
<sn-caixa-slider
        sn-nome="SliderDesfoque"
        sn-is-mostrar-valor="true"
        sn-is-rotulo-vazio="true"
        sn-formatar-valor="Pixel"
        sn-minimo="0"
        sn-maximo="10"
        sn-passo="1"
        sn-passo-largo="1"
        ap-largura="70%"
        sn-bind="{{Desfoque}}, Converter=this.Ajuste100"
        sn-valor-alterado="Slider_ValorAlterado"
        sn-valor-modificando="Slider_ValorModificando">
    </sn-caixa-slider>
```

*Source: `src/frontend/Zyoncore.Sigi.FotoAlbum.TS/Apresentacao/Montagem/FerramentasFlutuante/ControleFerramentaAjustes.shtml`*

## Attributes

Configuration attributes specific to this control (own first, then inherited).

| Attribute | Type | Declared on | Description |
|-----------|------|-------------|-------------|
| `max` | `String` | `CaixaSlider` | Native HTML `max` attribute (managed by the framework). |
| `min` | `String` | `CaixaSlider` | Native HTML `min` attribute (managed by the framework). |
| `sn-formatar` | [`EnumFormatacao`](../ENUMS.md#enumformatacao) | `CaixaSlider` | Formatting applied to the bound value for display (currency, date, CPF/CNPJ, percentage…). |
| `sn-formatar-funcao` | `String` | `CaixaSlider` | Name of a codebehind function that formats the value (custom formatting). |
| `sn-formatar-valor` | [`EnumFormatacao`](../ENUMS.md#enumformatacao) | `CaixaSlider` | Formatting of the value display in sliders (kept separate from binds). |
| `sn-is-mostrar-valor` | `Boolean` | `CaixaSlider` | Shows the current value next to the slider. |
| `sn-largura-texto-valor` | `String` | `CaixaSlider` | Width reserved for the slider value text. |
| `sn-maximo` | `Number` | `CaixaSlider` | Maximum numeric value accepted. |
| `sn-minimo` | `Number` | `CaixaSlider` | Minimum numeric value accepted. |
| `sn-passo` | `String` | `CaixaSlider` | Step increment of sliders/steppers. |
| `sn-passo-largo` | `String` | `CaixaSlider` | Large step increment (Page Up/Down or fast buttons). |
| `sn-posicao-rotulo` | [`EnumPosicao`](../ENUMS.md#enumposicao) | `CaixaSlider` | Position of the label relative to the control. |
| `step` | `String` | `CaixaSlider` | Native HTML `step` attribute (managed by the framework). |
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

### Values for `sn-formatar` (`EnumFormatacao`)

*63 options.* First examples: `Nenhuma`, `Bytes`, `Cep`, `Cpf`, `Cnpj`, `Telefone`, `Margem`, `Moeda`, `MoedaIgnorarSemValor`, `MoedaComSinal`, `Inteiro`, `Decimal`, `Decimal1`, `Decimal3`, `MelhorDecimal`, `Data`, `Hora`, `DataHora`, `HoraDescricao`, `HoraDescricaoMin`, `DataHoraSemantica`, `DataSemanticaHora`, `DataSemantica`, `Dias`, …

```html
<ap-texto sn-formatar="Moeda"> ... </ap-texto>
```

### Values for `sn-formatar-valor` (`EnumFormatacao`)

*63 options.* First examples: `Nenhuma`, `Bytes`, `Cep`, `Cpf`, `Cnpj`, `Telefone`, `Margem`, `Moeda`, `MoedaIgnorarSemValor`, `MoedaComSinal`, `Inteiro`, `Decimal`, `Decimal1`, `Decimal3`, `MelhorDecimal`, `Data`, `Hora`, `DataHora`, `HoraDescricao`, `HoraDescricaoMin`, `DataHoraSemantica`, `DataSemanticaHora`, `DataSemantica`, `Dias`, …

```html
<sn-caixa-slider sn-formatar-valor="Porcentagem"> ... </sn-caixa-slider>
```

### Values for `sn-posicao-rotulo` (`EnumPosicao`)

| Option | Description |
|--------|-------------|
| `Nenhum` | Not shown. |
| `Esquerda` | Left. |
| `Direita` | Right. |
| `Superior` | Above. |
| `Inferior` | Below. |
| `Tudo` | All sides / full. |

```html
<sn-caixa-texto sn-posicao-rotulo="Nenhum"> ... </sn-caixa-texto>
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

| Event | Source | Fires when |
|-------|--------|------------|
| `sn-valor-alterado` | *standard event* | Fires after the control value changes and is committed. |
| `sn-valor-modificando` | *standard event* | Fires while the value is being modified (before commit). |

> Standard events (`sn-click`, `sn-enter`, `sn-navegar`, `sn-selecionar-arquivos`, `sn-arrastar-arquivos`, `sn-texto-pesquisa`, `sn-item-selecionado-alterado`, `sn-valor-alterado`, `sn-valor-modificando`, `sn-linha-detalhes-expandida`, `sn-ordenacao-coluna-alterada`, `sn-conteudo-expandido`) are wired centrally and can be used on any control where they make sense — see [ATTRIBUTES.md](../ATTRIBUTES.md#events).

### Handler implementations (from Sigi codebehind)

**`sn-valor-modificando="Slider_ValorAlterado"`** — `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Revelacao/Edicao/ControleRevelacaoAjustes.shtml.ts`:

```ts
private Slider_ValorAlterado(provedor: ui.BaseUIElemento, e: ui.UIValorAlteradoEventArgs)
{
    const imagemRevelacaoVM = this.ImagemRevelacaoSelecionada;
    if (imagemRevelacaoVM instanceof ImagemRevelacaoViewModel)
    {
        imagemRevelacaoVM.NotificarEdicaoAlterada();
    }
    return new d.FiltroImagem();
}
```

**`sn-valor-alterado="Slider_ValorAlterado"`** — `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Revelacao/Edicao/ControleRevelacaoAjustes.shtml.ts`:

```ts
private Slider_ValorAlterado(provedor: ui.BaseUIElemento, e: ui.UIValorAlteradoEventArgs)
{
    const imagemRevelacaoVM = this.ImagemRevelacaoSelecionada;
    if (imagemRevelacaoVM instanceof ImagemRevelacaoViewModel)
    {
        imagemRevelacaoVM.NotificarEdicaoAlterada();
    }
    return new d.FiltroImagem();
}
```

## Data binding

Bind attributes take a **property path** on the current data source (e.g. `sn-bind="Usuario.Nome"` or `{{Caminho}}` interpolation), set via `sn-bind-data-source` or inherited from the parent control.

| Bind | Declared on | Description |
|------|-------------|-------------|
| `sn-bind-texto` | `CaixaSlider` | One-way bind that renders the value as the element text (also `{{path}}` in content). |
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
<sn-caixa-slider
    ap-visibilidade="Visivel"
    ap-visibilidade--celular="Oculto"
    ap-largura="50%"
    ap-largura--celular="100%">
    ...
</sn-caixa-slider>
```

## Inheritance

`CaixaSlider` → `BaseControleFormulario` → `ControleRotulo` → `BaseControle` → `ComponenteApresentacaoConteudo` → `ComponenteApresentacao` → `BaseUIElemento`

## Usage in Sigi

Found **75** usages across **19** `.shtml` files in the Sigi frontend.

---
*Snebur.UI Framework — generated documentation. Do not edit manually.*
