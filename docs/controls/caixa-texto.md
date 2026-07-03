# `<sn-caixa-texto>` — Text box

**Type:** Form control (`sn-`) | **Class:** `CaixaTexto` | **Extends:** `BaseCaixaTexto` | **Rendered as:** `HTMLDivElement`

Single-line text input with floating label (`sn-rotulo`), placeholder (`sn-marca-dagua`), masking (`sn-mascara`), max length and validation integration. Two-way bind the value with `sn-bind` (validation rules come from the bound domain property) or `sn-bind-texto`.

## Real-world examples

Extracted from the Sigi frontend (331 usages in 141 files).

```html
<sn-caixa-texto
        sn-nome="TxtEmail"
        sn-rotulo="Informe seu login (seu e-mail cadastrado)"
        sn-bind="{{Email}}"
        sn-tipo-entrada="Email"
        sn-mensagem-validacao-flutuante="true"
        sn-enter="TxtEmail_Enter"
        ap-largura="100%"
        ap-altura="70px"
        class="sn-password">
    </sn-caixa-texto>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Soliticacao/Login/PaginaLogin.shtml`*

```html
<sn-caixa-texto
        sn-bind="{{Pesquisa}}, Origem=this"
        ap-tipo-caixa="Delineada"
        ap-largura="300px"
        sn-is-rotulo-vazio="true"
        ap-tipografia="Corpo2"
        sn-is-atualizar-digitando="true"
        sn-texto-pesquisa="TxtPesquisa_Pesquisa"
        sn-desativar-auto-completar="true"
        sn-marca-dagua="Pesquise por nome">
    </sn-caixa-texto>
```

*Source: `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/Promocao/PaginaPromocoes.shtml`*

```html
<sn-caixa-texto
        sn-nome="TxtCodigoAtivacao"
        sn-bind="{{CodigoAtivacao}}, Origem=this"
        sn-is-rotulo-vazio="true"
        sn-maxlength="4"
        class="sn-caixa-alta"
        ap-margem="8px 0px 0px 0px"
        ap-margem--celular="0px"
        sn-is-rotulo-flutuante="false">
    </sn-caixa-texto>
```

*Source: `src/frontend/Zyoncore.Sigi.Online/Apresentacao/Principal/Soliticacao/Login/PaginaLoginConfirmacaoEmail.shtml`*

## Attributes

Configuration attributes specific to this control (own first, then inherited).

| Attribute | Type | Declared on | Description |
|-----------|------|-------------|-------------|
| `sn-mascara` | `String` | `CaixaTexto` | Input mask (e.g. `(00) 0000-0000`). Masked input keeps the raw value in the bind. |
| `sn-pattern` | `String` | `CaixaTexto` | Regular-expression pattern the value must match (native validation). |
| `sn-tipo-entrada` | [`EnumTipoEntrada`](../ENUMS.md#enumtipoentrada) | `CaixaTexto` | Virtual keyboard/input mode: text, number, decimal, phone, e-mail, URL, search. |
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

### Values for `sn-tipo-entrada` (`EnumTipoEntrada`)

| Option | Description |
|--------|-------------|
| `Nenhum` | No specific input mode. |
| `Texto` | Plain text. |
| `Decimal` | Decimal number keyboard. |
| `Numero` | Numeric keyboard. |
| `Telefone` | Telephone keyboard. |
| `Pesquisa` | Search keyboard (with search key). |
| `Email` | E-mail keyboard (@ key). |
| `Url` | URL keyboard. |

```html
<sn-caixa-texto sn-tipo-entrada="Numero"> ... </sn-caixa-texto>
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
| `sn-enter` | *standard event* | Fires when Enter is pressed inside the control. |
| `sn-texto-pesquisa` | *standard event* | Fires (debounced) when the search text changes. |
| `sn-valor-alterado` | *standard event* | Fires after the control value changes and is committed. |
| `sn-valor-modificando` | *standard event* | Fires while the value is being modified (before commit). |

> Standard events (`sn-click`, `sn-enter`, `sn-navegar`, `sn-selecionar-arquivos`, `sn-arrastar-arquivos`, `sn-texto-pesquisa`, `sn-item-selecionado-alterado`, `sn-valor-alterado`, `sn-valor-modificando`, `sn-linha-detalhes-expandida`, `sn-ordenacao-coluna-alterada`, `sn-conteudo-expandido`) are wired centrally and can be used on any control where they make sense — see [ATTRIBUTES.md](../ATTRIBUTES.md#events).

### Handler implementations (from Sigi codebehind)

**`sn-valor-alterado="TxtCep_ValorAlterado"`** — `src/frontend/Zyoncore.Sigi.ZyonAdmin/Apresentacao/Conta/JanelaCadastroLoja.shtml.ts`:

```ts
private async TxtCep_ValorAlterado(provedor: ui.BaseUIElemento, e: ValorAlteradoEventArgs<string>) 
{
    throw new ErroNaoImplementado();

    //if (u.ValidacaoUtil.IsCep(e.Valor))
    //{
    //    this.Ocupar();
    //    const cepNumeros = u.TextoUtil.RetornarSomenteNumeros(e.Valor);
    //    if (this.UltimoCepValido !== cepNumeros)
    //    {
    //        this.UltimoCepValido = cepNumeros;
    //        const endereco = await $ServicoEntrega.RetornarInfoCepAsync(cepNumeros);
    //        if (!endereco.IsCepNaoEncotrado)
    //        {
    //            this.LbCepNaoEncotrado.Visibilidade = EnumVisibilidade.Oculto;
    //            this.PainelEndereco.Visibilidade = EnumVisibilidade.Visivel;
// ...
}
```

**`sn-enter="BtnPesquisa_Click"`** — `src/frontend/Zyoncore.Sigi.ZyonAdmin/Apresentacao/Conta/JanelaBuscarUsuariosConta.shtml.ts`:

```ts
private async BtnPesquisa_Click(provedor: ui.BaseUIElemento, e: ui.TextoPesquisaEventArgs)
{
    const pesquisa = this.Pesquisa;
    if (!String.IsNullOrWhiteSpace(pesquisa))
    {
        throw new ErroNaoImplementado();
        //this.Ocupar();

        //const resultados = await $ServicoUsuarioZyonAdmin.RetornarUsuariosContaFiltroContaAsync(this.Conta, pesquisa);
        //this.Usuarios.AddRangeNew(resultados);
        //await this.DesocuparAsync();
    }
}
```

**`sn-texto-pesquisa="BtnPesquisa_Pesquisa"`** — `src/frontend/Zyoncore.Sigi.WebAdmin/Apresentacao/MenuLateral.shtml.ts`:

```ts
private BtnPesquisa_Pesquisa(provedor: ui.BaseUIElemento, e: ui.TextoPesquisaEventArgs)
{
    this.AtualizarPesquisa(e.Pesquisa);
}
```

## Data binding

Bind attributes take a **property path** on the current data source (e.g. `sn-bind="Usuario.Nome"` or `{{Caminho}}` interpolation), set via `sn-bind-data-source` or inherited from the parent control.

| Bind | Declared on | Description |
|------|-------------|-------------|
| `sn-bind-data` | `CaixaTexto` | Binds a date value rendered as text. |
| `sn-bind-texto` | `CaixaTexto` | One-way bind that renders the value as the element text (also `{{path}}` in content). |
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
<sn-caixa-texto
    ap-visibilidade="Visivel"
    ap-visibilidade--celular="Oculto"
    ap-largura="50%"
    ap-largura--celular="100%">
    ...
</sn-caixa-texto>
```

## Inheritance

`CaixaTexto` → `BaseCaixaTexto` → `BaseControleFormulario` → `ControleRotulo` → `BaseControle` → `ComponenteApresentacaoConteudo` → `ComponenteApresentacao` → `BaseUIElemento`

## Usage in Sigi

Found **331** usages across **141** `.shtml` files in the Sigi frontend.

---
*Snebur.UI Framework — generated documentation. Do not edit manually.*
