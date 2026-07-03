/**
 * Hand-authored documentation knowledge base.
 * Everything else in the pipeline is extracted from source; this file carries
 * the human-readable descriptions merged into the generated docs and JSON.
 *
 * Keys: lowercase tag names (sn-botao), html attribute names (sn-click),
 * enum type names (EnumVisibilidade).
 */

export interface TagDoc {
  /** Short English title, e.g. "Button" */
  title?: string;
  description: string;
}

export interface EnumDoc {
  description?: string;
  members?: Record<string, string>;
}

// --------------------------------------------------------------------- tags

export const TAG_DOCS: Record<string, TagDoc> = {
  // ---- Form controls (sn-*) ------------------------------------------------
  'sn-controle-usuario': {
    title: 'User control host',
    description:
      'Hosts a reusable user control (a `.shtml` + codebehind pair). The `sn-controle` attribute names the control class to instantiate; `sn-parametros` passes constructor parameters. This is the primary composition mechanism of the framework — pages are trees of user controls.',
  },
  'sn-navegador': {
    title: 'Navigator (page host)',
    description:
      'In-page navigation container that swaps child pages/controls, keeping an optional cache and applying transition animations (`ap-tipo-animacao`). Use `sn-pagina-inicial` for the initial page and `sn-identificador-navegador` to target it from links/buttons.',
  },
  'sn-navegador-principal': {
    title: 'Main navigator',
    description:
      'The application-level navigator bound to the browser history/route. There is one per app shell; buttons with `sn-link-rota` navigate through it.',
  },
  'sn-botao': {
    title: 'Button',
    description:
      'The standard button. Renders as a native `<button>`. Its look is chosen with `sn-tipo-botao` (normal, flat, circle, icon, link…), an optional icon via `ap-icone`, and it fires `sn-click`. `sn-link-rota` turns it into a route navigation button.',
  },
  'sn-botao-logico': {
    title: 'Toggle (boolean) button',
    description:
      'A two-state button bound to a boolean property via `sn-bind-valor-logico`. Applies `sn-css-class-botao-logico-verdadeiro`/`-falso` classes according to the current value.',
  },
  'sn-botao-menu': {
    title: 'Menu button',
    description:
      'Button that opens a floating menu of `sn-botao-menu-item` children. Position is controlled with `sn-destino-controle-flutuante`.',
  },
  'sn-botao-menu-item': {
    title: 'Menu item button',
    description:
      'An item inside a `sn-botao-menu` floating menu — icon + label, fires `sn-click` when chosen.',
  },
  'sn-botao-icone-descricao': {
    title: 'Icon + description button',
    description:
      'Button variant showing an icon with a text description below/next to it (used for dashboards and toolbars).',
  },
  'sn-progresso': {
    title: 'Progress bar',
    description:
      'Linear progress indicator. Bind the current value with `sn-bind-progresso` (a `Progresso` model with total/processed) or update it from code.',
  },
  'sn-progresso-circulo': {
    title: 'Circular progress',
    description: 'Circular/spinner variant of the progress indicator.',
  },
  'sn-controle-imagem': {
    title: 'Image control',
    description:
      'Displays a single image from a domain image model. `sn-bind-imagem` binds the image; `sn-tamanho-imagem` picks which server-side rendition (thumbnail…print) to load, `sn-preenchimento-imagem` how it fills the box, and `sn-url-imagem-pendente` a placeholder while loading.',
  },
  'sn-controle-imagens': {
    title: 'Image list control',
    description:
      'Displays a collection of images (gallery). Bind the collection with `sn-bind-imagens`.',
  },
  'sn-menu': {
    title: 'Menu',
    description:
      'Vertical navigation menu composed of `sn-menu-item` children (often inside the app shell sidebar).',
  },
  'sn-menu-sanfona': {
    title: 'Accordion menu',
    description: 'Menu with collapsible (accordion) sections.',
  },
  'sn-menu-item': {
    title: 'Menu item',
    description:
      'Item of a `sn-menu`: icon, label and either `sn-click` or `sn-link-rota` navigation.',
  },
  'sn-caixa-selecao-cor': {
    title: 'Color picker',
    description:
      'Input for choosing one of the framework palette colors. Bind with `sn-bind-selecao-cor`.',
  },
  'sn-ajuda-legenda': {
    title: 'Help caption',
    description:
      'Small “help” affordance that shows an explanatory caption/tooltip (`sn-legenda`) for the control it accompanies.',
  },
  'sn-exibir-codigo': {
    title: 'Code viewer',
    description: 'Renders a block of code/markup for display (used by internal demo/manual pages).',
  },
  'sn-painel-abas-horizontal': {
    title: 'Tab panel (horizontal)',
    description:
      'Horizontal tab strip hosting `sn-aba` children. `ap-tipo-painel-aba` switches the visual style; `sn-carregar-aba-inicial` controls whether the first tab loads eagerly and `sn-funcao-is-pode-navegar-aba` can veto tab changes.',
  },
  'sn-aba': {
    title: 'Tab',
    description:
      'One tab inside `sn-painel-abas-horizontal`: `sn-titulo` for the header, content inside. Content can be lazy-loaded.',
  },
  'sn-expandir': {
    title: 'Expander',
    description:
      'Collapsible section composed of a `sn-expandir-titulo` header and `sn-expandir-conteudo` body. Fires `sn-conteudo-expandido` when opened; icons via `ap-icone-expandir`/`ap-icone-encolher`.',
  },
  'sn-expandir-titulo': {
    title: 'Expander header',
    description: 'Clickable header of a `sn-expandir` section.',
  },
  'sn-expandir-conteudo': {
    title: 'Expander content',
    description: 'Collapsible body of a `sn-expandir` section.',
  },
  'sn-item-template': {
    title: 'Item template',
    description:
      'Template applied to every item of a list control (`sn-controle-lista`, `sn-painel-lista`, `sn-combobox`…). Inside it, bind item properties with `sn-bind-texto`, `{{...}}` paths, etc.',
  },
  'sn-item-template-selecionado': {
    title: 'Selected-item template',
    description:
      'Alternative template rendered for the currently selected item of a list/selection control.',
  },
  'sn-item-selecionado-template': {
    title: 'Selected-item template (alias)',
    description: 'Alias of `sn-item-template-selecionado`.',
  },
  'sn-item-template-separador': {
    title: 'Item separator template',
    description: 'Optional template rendered between list items (separator row).',
  },
  'sn-caixa-texto': {
    title: 'Text box',
    description:
      'Single-line text input with floating label (`sn-rotulo`), placeholder (`sn-marca-dagua`), masking (`sn-mascara`), max length and validation integration. Two-way bind the value with `sn-bind` (validation rules come from the bound domain property) or `sn-bind-texto`.',
  },
  'sn-caixa-area-texto': {
    title: 'Multi-line text box',
    description: 'Textarea variant of `sn-caixa-texto` for long text.',
  },
  'sn-caixa-data': {
    title: 'Date box',
    description:
      'Date input with calendar assistance. `sn-tipo-data` selects the accepted range semantics (birth date, past, future…).',
  },
  'sn-caixa-moeda': {
    title: 'Currency box',
    description:
      'Numeric input formatted as currency (pt-BR). Supports `sn-minimo`/`sn-maximo` and zero-value rules (`sn-is-nao-permitir-zero`).',
  },
  'sn-caixa-numero': {
    title: 'Number box',
    description:
      'Numeric input with min/max (`sn-minimo`/`sn-maximo`) and integer formatting options.',
  },
  'sn-caixa-quantidade': {
    title: 'Quantity box',
    description: 'Numeric stepper for quantities (+/- buttons, min/max limits).',
  },
  'sn-caixa-senha': {
    title: 'Password box',
    description:
      'Password input with show/hide toggle. `sn-is-senha-md5` hashes the value before binding (legacy flows).',
  },
  'sn-caixa-senha-amostra': {
    title: 'Simple password box',
    description: 'Reduced password input variant (no strength/extras).',
  },
  'sn-caixa-slider': {
    title: 'Slider',
    description:
      'Range slider. Configure `sn-minimo`, `sn-maximo`, `sn-passo` (step) and value display/formatting (`sn-is-mostrar-valor`, `sn-formatar-valor`).',
  },
  'sn-caixa-pesquisa': {
    title: 'Search box',
    description:
      'Text input specialized for filtering/searching lists — fires `sn-texto-pesquisa` as the user types (debounced).',
  },
  'sn-caixa-hora': {
    title: 'Time box',
    description: 'Time-of-day input (`HH:mm`).',
  },
  'sn-caixa-cartao-credito': {
    title: 'Credit card box',
    description: 'Credit-card number input with brand detection and formatting.',
  },
  'sn-caixa-texto-sugestao': {
    title: 'Text box with suggestions',
    description:
      'Autocomplete text input: suggestions come from `sn-bind-sugestoes` (+ `sn-nome-propriedade-sugestao` for the display property).',
  },
  'sn-caixa-area-texto-sugestao': {
    title: 'Textarea with suggestions',
    description: 'Multi-line variant of `sn-caixa-texto-sugestao`.',
  },
  'sn-caixa-ativacao': {
    title: 'Switch (activation)',
    description:
      'On/off switch bound to a boolean with `sn-bind-valor-logico`. Fires `sn-valor-alterado`.',
  },
  'sn-checkbox': {
    title: 'Checkbox',
    description:
      'Checkbox bound to a boolean with `sn-bind-valor-logico` (or used inside selection lists). Fires `sn-valor-alterado`.',
  },
  'sn-caixa-prazo-tempo': {
    title: 'Time-span box',
    description: 'Input for a time span / deadline (complex domain type `PrazoTempo`).',
  },
  'sn-combobox': {
    title: 'Combobox (entity)',
    description:
      'Dropdown for choosing an entity. Items come from `sn-bind-lista` (or an entity query via `sn-consulta`); the selection binds with `sn-bind`. Item appearance is customized with a nested `sn-item-template`, the selected-item area with `sn-combobox-item-selecionado`. Fires `sn-item-selecionado-alterado`.',
  },
  'sn-combobox-item-selecionado': {
    title: 'Combobox selected-item area',
    description:
      'Template/area of a `sn-combobox` showing the currently selected item (inside the closed box).',
  },
  'sn-combobox-nn': {
    title: 'Combobox N:N',
    description:
      'Multi-selection combobox for many-to-many relations: checked items are kept in the relation collection bound via `sn-bind-itens-selecionado`.',
  },
  'sn-combobox-nn-itens-selecionado': {
    title: 'Combobox N:N selected items',
    description: 'Area of `sn-combobox-nn` rendering the chips/list of selected items.',
  },
  'sn-combobox-enum': {
    title: 'Combobox (enum)',
    description:
      'Dropdown over the values of a domain enum. `sn-tipo` names the enum type; the numeric value binds with `sn-bind`.',
  },
  'sn-combobox-simples': {
    title: 'Simple combobox',
    description: 'Lightweight dropdown over simple values/options (no entity query machinery).',
  },
  'sn-radio': {
    title: 'Radio group',
    description:
      'Radio-button selection. Group options with `sn-grupo`; each option carries `sn-valor` and the selection binds via `sn-bind`.',
  },
  'sn-paginacao': {
    title: 'Pagination',
    description:
      'Pager for list controls: page numbers, next/previous, and per-page size (`sn-registros-por-pagina`, `sn-maximo-paginas`).',
  },
  'sn-controle-paginacao': {
    title: 'Pagination (alias)',
    description: 'Alias registration of `sn-paginacao`.',
  },
  'sn-proxima-pagina': {
    title: 'Next-page loader',
    description:
      '“Load more” control for infinite-scroll style lists — fetches the next page of the associated list control.',
  },
  'sn-cabecalho': {
    title: 'List header',
    description: 'Header area of a list control (title row above the items).',
  },
  'sn-rodape': {
    title: 'List footer',
    description: 'Footer area of a list control (below the items; totals, actions).',
  },
  'sn-controle-lista': {
    title: 'List control',
    description:
      'The core repeater: renders one `sn-item-template` per item of the collection bound via `sn-bind-lista` (an entity query, list bind or data source). Supports virtualization (`sn-virtualizar`), pagination, empty/loading blocks (`ap-bloco-lista-vazia`, `ap-bloco-lista-carregando`) and `sn-item-click`.',
  },
  'sn-controle-lista-ordenacao': {
    title: 'Sortable list control',
    description:
      'List control with drag-and-drop reordering. Persist order automatically with `sn-is-salvar-ordenacao-automaticamente` (uses the entity ordering property `sn-entidade-ordenacao`).',
  },
  'sn-data-lista': {
    title: 'Data grid',
    description:
      'Tabular list (grid) with typed columns declared in a nested `sn-colunas` collection (`sn-coluna-texto`, `sn-coluna-personalizada`, …). Supports column sorting (`sn-is-ativar-ordenacao`, `sn-ordenacao-coluna-alterada`), row click (`sn-linha-click`) and expandable detail rows (`sn-linha-detalhes`).',
  },
  'sn-data-lista-ordenacao': {
    title: 'Data grid with row reordering',
    description: 'Data grid variant whose rows can be drag-reordered.',
  },
  'sn-colunas': {
    title: 'Grid column collection',
    description: 'Container declaring the columns of a `sn-data-lista`.',
  },
  'sn-coluna-exibir-detalhes': {
    title: 'Details toggle column',
    description: 'Grid column with the expander button that shows the row `sn-linha-detalhes`.',
  },
  'sn-coluna-texto': {
    title: 'Text column',
    description:
      'Grid column rendering a bound text value (`sn-bind-texto` / `{{path}}`), with optional formatting (`sn-formatar`).',
  },
  'sn-coluna-personalizada': {
    title: 'Custom column',
    description: 'Grid column with free-form template content (buttons, images, …).',
  },
  'sn-coluna-titulo': {
    title: 'Column title',
    description: 'Header cell template of a grid column.',
  },
  'sn-linha-detalhes': {
    title: 'Row details template',
    description:
      'Expandable detail area rendered under a grid row; fires `sn-linha-detalhes-expandida` when opened.',
  },
  'sn-painel-lista': {
    title: 'List panel',
    description:
      'Repeater identical in spirit to `sn-controle-lista` but laid out as an `ap-` style panel; items use `sn-bloco-template`.',
  },
  'sn-painel-lista-ordenacao': {
    title: 'Sortable list panel',
    description: 'List panel with drag-and-drop reordering.',
  },
  'sn-painel-lista-selecao': {
    title: 'Selection list panel',
    description:
      'List panel where items can be selected; the selected item renders `sn-bloco-template-selecionado`.',
  },
  'sn-bloco-template': {
    title: 'Block item template',
    description: 'Item template used by `sn-painel-lista` (block/panel-shaped items).',
  },
  'sn-bloco-template-separador': {
    title: 'Block separator template',
    description: 'Separator between `sn-painel-lista` items.',
  },
  'sn-bloco-template-selecionado': {
    title: 'Selected block template',
    description: 'Template for the selected item of a `sn-painel-lista-selecao`.',
  },

  // ---- Layout components (ap-*) --------------------------------------------
  'ap-painel': {
    title: 'Panel',
    description:
      'General-purpose layout container. `ap-tipo-painel` selects the layout algorithm (block, horizontal/vertical stack, inline…); combine with alignment, spacing and size attributes. The workhorse of every page — and every attribute is responsive.',
  },
  'ap-painel-horizontal': {
    title: 'Horizontal panel',
    description:
      'Three-region horizontal layout: `ap-esquerda` (left), `ap-coluna` (center columns) and `ap-direita` (right).',
  },
  'ap-painel-vertical': {
    title: 'Vertical panel',
    description:
      'Vertical layout with `ap-cabecalho` (header), `ap-linha` rows and `ap-rodape` (footer) regions.',
  },
  'ap-coluna': {
    title: 'Column',
    description: 'Column region inside `ap-painel-horizontal`. Give it `ap-largura` (e.g. 50%).',
  },
  'ap-esquerda': {
    title: 'Left region',
    description: 'Left-docked region of `ap-painel-horizontal`.',
  },
  'ap-direita': {
    title: 'Right region',
    description: 'Right-docked region of `ap-painel-horizontal`.',
  },
  'ap-cabecalho': {
    title: 'Header region',
    description: 'Top-docked region of `ap-painel-vertical`.',
  },
  'ap-linha': {
    title: 'Row',
    description: 'Row region inside `ap-painel-vertical`.',
  },
  'ap-rodape': {
    title: 'Footer region',
    description: 'Bottom-docked region of `ap-painel-vertical`.',
  },
  'ap-bloco': {
    title: 'Block',
    description:
      'Simple block container (a styled `<div>`): background/tone, border, margins, size — all responsive. Use it wherever a plain wrapper is needed.',
  },
  'ap-bloco-item': {
    title: 'Block item',
    description: 'Block used as an item inside lists/menus (hover/selection styling).',
  },
  'ap-bloco-cabecalho': {
    title: 'Block header',
    description: 'Header block for cards/sections (title styling).',
  },
  'ap-bloco-animado': {
    title: 'Animated block',
    description: 'Block with enter/exit animation support.',
  },
  'ap-bloco-lista-vazia': {
    title: 'Empty-list block',
    description:
      'Placed inside a list control; shown automatically when the bound collection is empty (“no results” message).',
  },
  'ap-bloco-lista-carregando': {
    title: 'Loading-list block',
    description:
      'Placed inside a list control; shown while the bound query/collection is loading.',
  },
  'ap-icone': {
    title: 'Icon',
    description:
      'Renders a Material Symbols icon: `ap-icone` names the icon, `ap-icone-categoria` the style family (Filled, Outlined…), `ap-tamanho-icone` the size and `ap-cor-texto`/`ap-tonalidade-texto` the color.',
  },
  'ap-texto': {
    title: 'Text',
    description:
      'Inline text element. `ap-tipografia` picks the typography scale (Titulo, SubTitulo, Corpo…); supports bind interpolation in content and all responsive presentation attributes.',
  },
  'ap-paragrafo': {
    title: 'Paragraph',
    description: 'Paragraph text block — same features as `ap-texto` with block layout.',
  },
  'ap-estilo-itens': {
    title: 'Item styles',
    description:
      'Declares shared styles applied to the items of the parent list/menu (selection color, hover, spacing).',
  },
};

// --------------------------------------------------------------- attributes

export const ATTR_DOCS: Record<string, string> = {
  // Identification / composition
  'sn-nome': 'Control name. Makes the control reachable from the codebehind (`this.RetornarControle("Nome")` / typed properties) and used in messages.',
  'sn-construtor': 'Explicit constructor/class name to instantiate for this element (overrides the tag registry).',
  'sn-controle': 'Name of the user-control class to host (used with `sn-controle-usuario`).',
  'sn-controle-generico': 'Generic-control class name to instantiate for template-generated content.',
  'sn-parametros': 'Parameters passed to the hosted control constructor (comma-separated / bind paths).',
  'sn-tipo': 'Domain type name used by the control (e.g. the enum type of a `sn-combobox-enum` or entity type of a query).',
  'sn-tipo-item': 'Domain type of the items in a list/collection control.',
  'sn-inicializacao-propriedades': 'Inline property initialization expression(s) applied when the control is created.',
  'sn-item-elemento': 'Tag/element name to use for generated item elements.',
  'sn-nao-entrar-arvore': 'Excludes the element from the control tree (children are not parsed as controls).',
  'sn-is-controle-flutuante': 'Marks the control as floating (rendered detached, positioned relative to its anchor).',
  'sn-flutuante': 'Renders the control floating over the page content.',
  'sn-destino-controle-flutuante': 'Preferred position of the floating control relative to its anchor.',
  'sn-tags': 'Free-form tags attached to the control (comma separated) — queried from code.',
  'sn-grupo': 'Logical group name (e.g. radio-button groups or validation groups).',
  'sn-exibicao': 'Display expression/format for the item text.',

  // Labels / captions / titles
  'sn-rotulo': 'Label text of the control (floating label on inputs).',
  'sn-rotulo-flutuante': 'Text of the floating label (when different from `sn-rotulo`).',
  'sn-is-rotulo-vazio': 'Reserves the label space even without label text (keeps forms aligned).',
  'sn-is-rotulo-flutuante': 'Enables/disables the floating-label behaviour.',
  'sn-posicao-rotulo': 'Position of the label relative to the control.',
  'sn-titulo': 'Title text (tabs, windows, sections).',
  'sn-sub-titulo': 'Subtitle text.',
  'sn-legenda': 'Caption/help text shown with the control.',
  'sn-mensagem': 'Message text displayed by the control.',
  'ap-mensagem-info': 'Informational message shown as an info affordance next to the element.',
  'ap-titulo-info': 'Title of the informational popup (`ap-mensagem-info`).',
  'ap-rotulo': 'Presentation label rendered by the component (responsive).',

  // Enable / visibility / state
  'sn-desabilitar': 'Disables the control (`true`/`false` or bind path). Disabled controls skip validation and events.',
  'sn-visibilidade': 'Visibility of the control: `Visivel`, `Invisivel` (keeps space) or `Oculto` (removed from layout).',
  'sn-selecionado': 'Initial/current selected state (selection controls).',
  'sn-somente-leitura': 'Read-only mode: value shown, editing blocked.',
  'sn-skip-tab': 'Removes the control from the Tab navigation order.',
  'disabled': 'Native HTML disabled attribute (managed by the framework).',

  // Validation
  'sn-validar-sempre': 'Validates the control even when unchanged/hidden.',
  'sn-ignorar-validacao': 'Skips this control during form validation.',
  'sn-validar-valor-propriedade-alterado': 'Re-validates whenever the bound property changes (not only on user edit).',
  'sn-destino-mensagem-validacao': 'Name of the element/control where validation messages are rendered (instead of inline).',
  'sn-manter-espaco-mensagem-validacao': 'Keeps the validation-message space reserved to avoid layout jumps.',
  'sn-mensagem-validacao-flutuante': 'Shows the validation message floating (tooltip style) instead of inline.',
  'sn-is-negrito-valor-alterado': 'Renders the label/value bold when the value was modified (dirty indicator).',

  // Text input specifics
  'sn-marca-dagua': 'Placeholder (watermark) text shown while the box is empty. Exclusive to text-box family controls (`BaseCaixaTexto`).',
  'sn-mascara': 'Input mask (e.g. `(00) 0000-0000`). Masked input keeps the raw value in the bind.',
  'sn-pattern': 'Regular-expression pattern the value must match (native validation).',
  'sn-tipo-entrada': 'Virtual keyboard/input mode: text, number, decimal, phone, e-mail, URL, search.',
  'sn-maxlength': 'Maximum number of characters accepted.',
  'sn-minLength': 'Minimum number of characters required.',
  'sn-is-mostrar-contador-caracteres': 'Shows the “n/max” character counter under the box.',
  'sn-is-atualizar-digitando': 'Pushes the value to the bind on every keystroke (default: on blur/change).',
  'sn-desativar-auto-completar': 'Disables browser autocomplete on the input.',
  'sn-is-senha-md5': 'Hashes the typed password with MD5 before binding (legacy authentication flows).',
  'sn-normalizar': 'Normalization applied to the typed text (trim, casing…).',

  // Numeric input specifics
  'sn-minimo': 'Minimum numeric value accepted.',
  'sn-maximo': 'Maximum numeric value accepted.',
  'sn-is-formatar-inteiro': 'Formats the value as integer (no decimals).',
  'sn-is-nao-permitir-zero': 'Rejects zero as a valid value.',
  'sn-is-nao-formatar-valor-vazio': 'Leaves the box empty instead of formatting an empty/zero value.',
  'sn-passo': 'Step increment of sliders/steppers.',
  'sn-passo-largo': 'Large step increment (Page Up/Down or fast buttons).',
  'sn-is-mostrar-valor': 'Shows the current value next to the slider.',
  'sn-largura-texto-valor': 'Width reserved for the slider value text.',
  'min': 'Native HTML `min` attribute (managed by the framework).',
  'max': 'Native HTML `max` attribute (managed by the framework).',
  'step': 'Native HTML `step` attribute (managed by the framework).',

  // Date/time specifics
  'sn-tipo-data': 'Semantic date range accepted (birth date, past only, near future…). Drives validation and the calendar UI.',
  'sn-is-hora-dia': 'Restricts the time to day hours.',

  // Formatting
  'sn-formatar': 'Formatting applied to the bound value for display (currency, date, CPF/CNPJ, percentage…).',
  'sn-formatar-valor': 'Formatting of the value display in sliders (kept separate from binds).',
  'sn-formatar-funcao': 'Name of a codebehind function that formats the value (custom formatting).',

  // Buttons
  'sn-tipo-botao': 'Visual style of the button: Normal, Flat, Circulo, Icone, Link, Menu, Tab…',
  'sn-link-rota': 'Route/URL the button navigates to (turns the button into a navigation link).',
  'sn-accept': 'File-type filter for file-picking buttons (native `accept` syntax, e.g. `image/*`).',
  'sn-multiselecao': 'Allows selecting multiple files (file-picking buttons).',
  'sn-css-class-botao-logico-verdadeiro': 'CSS class applied when the toggle-button value is true.',
  'sn-css-class-botao-logico-falso': 'CSS class applied when the toggle-button value is false.',
  'sn-valor': 'Literal value carried by the option (radio items, simple options).',
  'sn-is-funcao-pode-ativar': 'Codebehind predicate deciding whether the control can be activated/clicked.',

  // Images
  'sn-tamanho-imagem': 'Server-side rendition to load: Miniatura, Pequena, Media, Grande or Impressao.',
  'sn-preenchimento-imagem': 'How the image fills its box (contain, cover, stretch…).',
  'sn-filtro-imagem': 'Visual filter applied to the image.',
  'sn-is-cache': 'Enables caching of the loaded image.',
  'sn-url-imagem-pendente': 'Placeholder image URL shown while the real image loads.',

  // Combobox / selection
  'sn-permitir-limpar': 'Shows a clear (×) affordance to unset the selection.',
  'sn-altura-item': 'Height in pixels of each dropdown item (drives list virtualization).',
  'sn-largura-item': 'Width of each item (item-based layouts).',
  'sn-nome-propriedade-sugestao': 'Property of the suggestion objects to display/complete with.',

  // Entity queries
  'sn-consulta': 'Name of the entity query (consulta) that supplies the items.',
  'sn-consulta-await': 'Async variant: awaits the named query before rendering.',
  'sn-relacoes-aberta': 'Relations to eager-open (`.AbrirRelacao`) on the queried entities.',
  'sn-consultar-tipo-automaticamente': 'Queries the item type automatically from the bind context.',
  'sn-metodo-salvar-entidades-ordenada': 'Codebehind method called to persist entities after drag-reordering.',

  // Lists
  'sn-virtualizar': 'Enables list virtualization (renders only visible items — required for large lists).',
  'sn-tag-elemento-itens-colecao': 'Tag name of the element that hosts the generated items.',
  'sn-tag-elemento-item-template': 'Tag name expected for the item template element.',
  'sn-css-class-elemento-itens-colecao': 'CSS class applied to the items host element.',
  'sn-is-ativar-ordenacao': 'Enables column sorting on the data grid.',
  'sn-desativar-efeito-hover': 'Disables the row hover effect.',
  'sn-registros-por-pagina': 'Page size (records per page).',
  'sn-maximo-paginas': 'Maximum number of page buttons shown by the pager.',
  'sn-paginacao-descricao-item': 'Singular item label used by the pager summary (“1 cliente”).',
  'sn-paginacao-descricao-itens': 'Plural items label used by the pager summary (“10 clientes”).',

  // Drag-and-drop ordering
  'sn-sentido-ordenacao': 'Sort direction: Crescente (ascending) or Decrescente (descending).',
  'sn-is-salvar-ordenacao-automaticamente': 'Persists the new order automatically after a drag.',
  'sn-is-animar-ordenacao': 'Animates items while reordering.',
  'sn-entidade-ordenacao': 'Entity/property that stores the order index.',
  'sn-is-alvo-ordenacao': 'Marks the element as a drop target for reordering.',
  'sn-is-elemento-principal-alvo-ordenacao': 'Uses the main element as the drag target (instead of a handle).',
  'sn-sensibilidade-vertical': 'Vertical drag sensitivity for reordering.',
  'sn-is-clone-global': 'Drags a global clone of the element (escapes overflow clipping).',
  'sn-css-class-elemento-clonado': 'CSS class applied to the drag clone.',
  'sn-funcao-normalizar-elemento-clonado': 'Codebehind function that adjusts the drag clone before showing it.',
  'sn-debug-nao-remover-elemento-clonado': 'Debug: keeps the drag clone in the DOM after drop.',

  // Tabs
  'sn-carregar-aba-inicial': 'Loads the initial tab content eagerly.',
  'sn-is-abas-cheia': 'Stretches tabs to fill the full strip width.',
  'sn-funcao-is-pode-navegar-aba': 'Codebehind predicate that can veto switching tabs (unsaved changes…).',
  'ap-tipo-painel-aba': 'Visual style of the tab strip: Padrao or MaterialDesign.',

  // Navigator
  'ap-tipo-animacao': 'Page-transition animation of the navigator: Nenhuma or Deslizante (slide).',
  'sn-identificador-navegador': 'Name of the target navigator (for buttons/links that navigate).',
  'sn-pagina-inicial': 'Initial page/control shown by the navigator.',
  'sn-is-propagar-bind-data-source': 'Propagates the current data source to navigated pages.',
  'sn-is-manter-cache': 'Keeps navigated pages cached (state preserved when returning).',
  'sn-is-async': 'Loads/executes asynchronously.',

  // AutoSave
  'sn-is-auto-salvar': 'Automatically saves the bound entity when the value changes.',

  // Misc control behaviour
  'sn-is-propagar-estilos': 'Propagates presentation styles to generated children.',
  'sn-opcao-bind-css-classe': 'How `sn-bind-css-classe` applies the class: add, replace or alter prefix.',
  'sn-opcao-bind-css-classe-prefixo-alterar': 'Prefix replaced when `sn-opcao-bind-css-classe="Alterar"`.',
  'sn-cor-personalizacao': 'Custom accent color for the control.',
  'sn-prop-': 'Prefix for passing arbitrary properties to the control: `sn-prop-minha-prop="valor"` sets `MinhaProp`.',

  // Debug helpers
  'sn-is-pontilhar-areas': 'Debug: outlines layout areas with dotted borders.',
  'sn-is-editar': 'Debug/edit mode flag.',
  'sn-is-marcar-linha': 'Debug: highlights the row under the cursor.',
  'sn-is-marcar-item': 'Debug: highlights the item under the cursor.',
  'ap-cor-fundo-debug': 'Debug-only background color (ignored in production).',

  // ---- Events ----------------------------------------------------------------
  'sn-click': 'Fires when the element is clicked/tapped. Value = codebehind method name.',
  'sn-enter': 'Fires when Enter is pressed inside the control.',
  'sn-item-click': 'Fires when an item of the list is clicked (args carry the item).',
  'sn-valor-alterado': 'Fires after the control value changes and is committed.',
  'sn-valor-modificando': 'Fires while the value is being modified (before commit).',
  'sn-navegar': 'Fires when the navigator navigates (page changed).',
  'sn-selecionar-arquivos': 'Fires when files are picked (file buttons); args carry the selected files.',
  'sn-arrastar-arquivos': 'Fires when files are dragged & dropped onto the control.',
  'sn-item-selecionado-alterado': 'Fires when the selected item changes (comboboxes, selection lists).',
  'sn-texto-pesquisa': 'Fires (debounced) when the search text changes.',
  'sn-linha-detalhes-expandida': 'Fires when a grid row detail area is expanded.',
  'sn-ordenacao-coluna-alterada': 'Fires when the grid sort column/direction changes.',
  'sn-conteudo-expandido': 'Fires when the expander content is opened.',
  'sn-linha-click': 'Fires when a grid row is clicked.',

  // ---- Binds -----------------------------------------------------------------
  'sn-bind': 'Two-way bind of the control **value** to a property path of the data source (e.g. `Cliente.Nome`). Validation rules of the bound domain property are applied automatically.',
  'sn-bind-form': 'Binds a form scope: children bind relative to this path, and the form tracks validation/dirty state.',
  'sn-bind-data-source': 'Sets the data-source object for this subtree (entity, view-model or query result).',
  'sn-bind-lista': 'Binds the item collection of a list control.',
  'sn-bind-texto': 'One-way bind that renders the value as the element text (also `{{path}}` in content).',
  'sn-bind-rotulo': 'Binds the label text.',
  'sn-bind-numero': 'Binds a numeric value rendered as text.',
  'sn-bind-data': 'Binds a date value rendered as text.',
  'sn-bind-hora': 'Binds a time value rendered as text.',
  'sn-bind-senha': 'Binds a password value.',
  'sn-bind-enum': 'Binds an enum value (renders its label).',
  'sn-bind-url-imagem': 'Binds an image URL to the element background/src.',
  'sn-bind-imagem': 'Binds a domain image object to an image control.',
  'sn-bind-imagens': 'Binds a collection of domain images.',
  'sn-bind-progresso': 'Binds a progress model (total/processed) to a progress control.',
  'sn-bind-valor-logico': 'Binds a boolean value (checkbox, switch, toggle button).',
  'sn-bind-itens-selecionado': 'Binds the collection of selected items (N:N combobox).',
  'sn-bind-propriedade': 'Binds an arbitrary control property: `Propriedade=Caminho`.',
  'sn-bind-css-classe': 'Binds a CSS class from a value (see `sn-opcao-bind-css-classe`).',
  'sn-bind-class': 'Binds the element `class` attribute.',
  'sn-bind-estilo': 'Binds inline CSS styles from a value.',
  'sn-bind-selecao-cor': 'Binds the selected color of the color picker.',
  'sn-bind-sugestoes': 'Binds the suggestion list of autocomplete boxes.',
  'sn-bind-nome': 'Binds the control name.',

  // ---- Presentation (ap-*) ----------------------------------------------------
  'ap-largura': 'Width — CSS length (`100px`, `50%`) or `Auto`. Responsive.',
  'ap-largura-minima': 'Minimum width (CSS length). Responsive.',
  'ap-largura-maxima': 'Maximum width (CSS length). Responsive.',
  'ap-altura': 'Height — CSS length or `Auto`. Responsive.',
  'ap-altura-minima': 'Minimum height (CSS length). Responsive.',
  'ap-altura-maxima': 'Maximum height (CSS length). Responsive.',
  'ap-altura-linha': 'Line height of the text. Responsive.',
  'ap-margem': 'Outer margin — CSS shorthand (`8px 0px`, `0 4px 8px 4px`). Responsive.',
  'ap-margem-interna': 'Inner padding — CSS shorthand. Responsive.',
  'ap-borda': 'Border width/preset around the element. Responsive.',
  'ap-cor-fundo': 'Background color from the framework palette (`SistemaPrincipal`, `Azul`, …).',
  'ap-cor-texto': 'Text color from the framework palette.',
  'ap-cor-borda': 'Border color from the framework palette.',
  'ap-tonalidade-fundo': 'Tone/shade variation of the background color (T100–T900, Alpha10–90).',
  'ap-tonalidade-texto': 'Tone/shade variation of the text color.',
  'ap-tonalidade-borda': 'Tone/shade variation of the border color.',
  'ap-visibilidade': 'Visibility: `Visivel`, `Invisivel` (keeps space) or `Oculto` (display none). The go-to attribute for responsive show/hide.',
  'ap-alinhamento-horizontal': 'Horizontal alignment of the element within its parent.',
  'ap-alinhamento-vertical': 'Vertical alignment of the element within its parent.',
  'ap-alinhamento-texto': 'Text alignment (left, center, right, justified).',
  'ap-tipo-painel': 'Layout algorithm of the panel: block, vertical/horizontal stack, full-stack, inline stack.',
  'ap-barra-rolagem': 'Scrollbar behaviour (both axes): hidden, automatic, visible or overflow.',
  'ap-barra-rolagem-horizontal': 'Horizontal scrollbar behaviour.',
  'ap-barra-rolagem-vertical': 'Vertical scrollbar behaviour.',
  'ap-tipografia': 'Typography scale: h1–h7, Titulo, SubTitulo, Corpo, Descricao, BotaoCaixaAlta…',
  'ap-peso-fonte': 'Font weight: SuperLeve…SuperPesado.',
  'ap-fonte': 'Font family (Roboto, RobotoCondensed).',
  'ap-quebrar': 'Text wrapping: wrap, no-wrap (ellipsis) or no-wrap without ellipsis.',
  'ap-icone': 'Material Symbols icon name (e.g. `Search`, `Delete`, `ShoppingCart`).',
  'ap-icone-categoria': 'Icon style family: Filled, Outlined, Rounded, Sharp, TwoTone.',
  'ap-tamanho-icone': 'Icon size preset (Pequeno…Grande).',
  'ap-icone-expandir': 'Icon shown when the expander is collapsed (click to expand).',
  'ap-icone-encolher': 'Icon shown when the expander is expanded (click to collapse).',
  'ap-titulo-expandir': 'Tooltip/title for the expand affordance.',
  'ap-titulo-encolher': 'Tooltip/title for the collapse affordance.',
  'ap-tipo-caixa': 'Input box visual style: Padrao (filled/underline) or Delineada (outlined).',
};

// -------------------------------------------------------------------- enums

export const ENUM_DOCS: Record<string, EnumDoc> = {
  EnumVisibilidade: {
    description: 'Element visibility.',
    members: {
      Visivel: 'Visible (default).',
      Invisivel: 'Hidden but still occupies layout space (`visibility: hidden`).',
      Oculto: 'Removed from layout (`display: none`).',
    },
  },
  EnumTipoPainel: {
    description: 'Layout algorithm applied by a panel to its children.',
    members: {
      Bloco: 'Normal block flow (children keep their own display).',
      BlocoVertical: 'Block flow, children stacked vertically.',
      BlocoPilha: 'Block-styled stack.',
      PilhaHorizontal: 'Horizontal stack (children side by side).',
      PilhaVertical: 'Vertical stack (children one under another).',
      PilhaHorizontalCheia: 'Horizontal stack stretched to fill the full width (children share it).',
      PilhaVerticalCheia: 'Vertical stack stretched to fill the full height.',
      PilhaHorizontalEmLinha: 'Inline horizontal stack (wraps like inline content).',
    },
  },
  EnumTipoBotao: {
    description: 'Visual style of `sn-botao`.',
    members: {
      Normal: 'Standard raised button.',
      Flat: 'Flat button (no elevation/background until hover).',
      Circulo: 'Circular button (icon only).',
      MiniCirculo: 'Small circular button.',
      Icone: 'Icon-only button, no background.',
      Link: 'Rendered as a text link.',
      LinkDestaque: 'Text link with emphasis color.',
      Menu: 'Menu-item styled button.',
      FlatBox: 'Flat button with a boxed/outlined area.',
      Tab: 'Tab-styled button.',
    },
  },
  EnumCor: {
    description:
      'Framework color palette. `Sistema*` entries are semantic theme colors; the rest are literal Material palette colors.',
    members: {
      Transparente: 'Transparent.',
      SistemaPadrao: 'Theme default color.',
      SistemaPrincipal: 'Theme primary color.',
      SistemaSecundaria: 'Theme secondary color.',
      SistemaSucesso: 'Success (green) semantic color.',
      SistemaFalha: 'Failure/error (red) semantic color.',
      SistemaInformacao: 'Information (blue) semantic color.',
      SistemaAlerta: 'Warning (amber) semantic color.',
      SistemaEditar: 'Semantic color of edit actions.',
      SistemaSalvar: 'Semantic color of save actions.',
      SistemaNovo: 'Semantic color of create/new actions.',
      SistemaExcluir: 'Semantic color of delete actions.',
    },
  },
  EnumTonalidade: {
    description:
      'Tone/shade of a palette color, Material style: `T100` (lightest) to `T900` (darkest), plus `AlphaNN` transparency variants.',
    members: {
      Padrao: 'Default tone of the color.',
    },
  },
  EnumAlinhamentoHorizontal: {
    description: 'Horizontal alignment inside the parent. `*Absoluto` variants use absolute positioning.',
    members: {
      Esquerda: 'Align left.',
      Centro: 'Center.',
      Direita: 'Align right.',
      EsquerdaAbsoluto: 'Pinned to the left edge (absolute).',
      CentroAbsoluto: 'Centered (absolute).',
      DireitaAbsoluto: 'Pinned to the right edge (absolute).',
    },
  },
  EnumAlinhamentoVertical: {
    description: 'Vertical alignment inside the parent. `*Absoluto` variants use absolute positioning.',
    members: {
      Superior: 'Align top.',
      Centro: 'Center.',
      Inferior: 'Align bottom.',
      SuperiorAbsoluto: 'Pinned to the top edge (absolute).',
      CentroAbsoluto: 'Centered (absolute).',
      InferiorAbsoluto: 'Pinned to the bottom edge (absolute).',
    },
  },
  EnumAlinhamentoTexto: {
    description: 'Text alignment.',
    members: {
      Esquerda: 'Left.',
      Centro: 'Center.',
      Direita: 'Right.',
      Justificado: 'Justified.',
    },
  },
  EnumLargura: {
    description:
      'Width presets: `Auto` or percentage steps (`_8P` = 8%, `_50P` = 50%, `_100P` = 100%). In practice the attribute also accepts any CSS length (`270px`, `50%`), which is the most common usage.',
    members: { Auto: 'Automatic width.' },
  },
  EnumAltura: {
    description:
      'Height presets: `Auto` or percentage steps (`_8P` = 8% … `_100P` = 100%). Also accepts any CSS length (`40px`, `100%`).',
    members: { Auto: 'Automatic height.' },
  },
  EnumAlturaLinha: {
    description: 'Line-height preset; also accepts CSS values.',
    members: { Auto: 'Automatic line height.' },
  },
  EnumDistanciaMargem: {
    description:
      'Spacing presets: percentage steps (`_8P` = 8%) and pixel steps (`_16px` = 16px). The margin attributes also accept full CSS shorthand strings.',
  },
  EnumBarraRolagem: {
    description: 'Scrollbar behaviour.',
    members: {
      Oculta: 'Never show a scrollbar (content clipped).',
      Automatica: 'Show when the content overflows (`auto`).',
      Visivel: 'Always visible (`scroll`).',
      Transbordar: 'Let content overflow without scrollbar (`visible`).',
    },
  },
  EnumTipografia: {
    description: 'Typography scale of the design system.',
    members: {
      h1: 'Heading 1 (largest).',
      h2: 'Heading 2.',
      h3: 'Heading 3.',
      h4: 'Heading 4.',
      h5: 'Heading 5.',
      h6: 'Heading 6.',
      h7: 'Heading 7 (smallest heading).',
      Titulo: 'Title.',
      SubTitulo: 'Subtitle.',
      SubTitulo2: 'Secondary subtitle.',
      Normal: 'Normal text.',
      Corpo: 'Body text.',
      Corpo2: 'Secondary body text.',
      Descricao: 'Description/caption text.',
      Descricao2: 'Secondary description text.',
      BotaoCaixaAlta: 'Button style, uppercase.',
      LinhaCaixaAlta: 'Line style, uppercase.',
    },
  },
  EnumPesoFonte: {
    description: 'Font weight.',
    members: {
      SuperLeve: 'Thin (100).',
      Leve: 'Light (300).',
      Normal: 'Regular (400).',
      Negrito: 'Bold (700).',
      Pesado: 'Heavy (800).',
      SuperPesado: 'Black (900).',
    },
  },
  EnumFonte: {
    description: 'Font family.',
    members: {
      Roboto: 'Roboto.',
      RobotoCondensed: 'Roboto Condensed.',
    },
  },
  EnumQuebrar: {
    description: 'Text wrapping behaviour.',
    members: {
      Quebrar: 'Wrap normally.',
      NaoQuebrar: 'Single line, overflow shown with ellipsis (…).',
      NaoQuebrarSemEllipsis: 'Single line, clipped without ellipsis.',
    },
  },
  EnumIcone: {
    description:
      'Material Symbols icon names (the full Google Material icon set, PascalCase). Value = icon name, e.g. `Search`, `Delete`, `ShoppingCart`, `ArrowBack`.',
  },
  EnumIconeCategoria: {
    description: 'Material Symbols style family.',
    members: {
      Filled: 'Filled style (default).',
      Outlined: 'Outlined style.',
      Rounded: 'Rounded style.',
      Sharp: 'Sharp style.',
      TwoTone: 'Two-tone style.',
    },
  },
  EnumTamanhoIcone: {
    description: 'Icon size presets, from small to large.',
    members: {
      Padrao: 'Default size.',
      Pequeno: 'Small.',
      PequenoMedio: 'Small-medium.',
      MediodPequeno: 'Medium-small.',
      Medio: 'Medium.',
      MedioGrande: 'Medium-large.',
      Grande: 'Large.',
    },
  },
  EnumTipoEntrada: {
    description: 'Input mode / virtual keyboard of a text box (`inputmode`).',
    members: {
      Nenhum: 'No specific input mode.',
      Texto: 'Plain text.',
      Decimal: 'Decimal number keyboard.',
      Numero: 'Numeric keyboard.',
      Telefone: 'Telephone keyboard.',
      Pesquisa: 'Search keyboard (with search key).',
      Email: 'E-mail keyboard (@ key).',
      Url: 'URL keyboard.',
    },
  },
  EnumTipoData: {
    description: 'Semantic date category — drives validation range and calendar behaviour of `sn-caixa-data`.',
    members: {
      Normal: 'Any date.',
      DataNascimento: 'Birth date (past, plausible age range).',
      DataPassadoFuturoProximo: 'Near past or near future.',
      DataPassadoFuturo: 'Past or future.',
      DataFuturaProxima: 'Near future only.',
      DataFutura: 'Future only.',
      DataMuitoFutura: 'Far future allowed.',
      DataPassadoRecente: 'Recent past only.',
      DataPassado: 'Past only.',
      DataMuitoPassado: 'Far past allowed.',
    },
  },
  EnumPosicao: {
    description: 'Position of an element (e.g. label) relative to its control.',
    members: {
      Nenhum: 'Not shown.',
      Esquerda: 'Left.',
      Direita: 'Right.',
      Superior: 'Above.',
      Inferior: 'Below.',
      Tudo: 'All sides / full.',
    },
  },
  EnumSentidoOrdenacao: {
    description: 'Sort direction.',
    members: {
      Crescente: 'Ascending.',
      Decrescente: 'Descending.',
    },
  },
  EnumTamanhoImagem: {
    description: 'Server-side image rendition to load.',
    members: {
      Miniatura: 'Thumbnail.',
      Pequena: 'Small.',
      Media: 'Medium.',
      Grande: 'Large.',
      Impressao: 'Print quality (original).',
    },
  },
  EnumPreenchimentoImagem: {
    description: 'How the image fills its container (object-fit semantics).',
    members: {
      Nenhum: 'No fitting (natural size).',
      UniformeDentro: 'Fit inside keeping aspect ratio (contain).',
      UniformeFora: 'Fill keeping aspect ratio, cropping overflow (cover).',
      UniformeCheio: 'Fill the box completely keeping ratio.',
      Esticar: 'Stretch to fill (ignores aspect ratio).',
    },
  },
  EnumDestinoControleFlutuante: {
    description: 'Preferred placement of a floating control relative to its anchor.',
    members: {
      Automatico: 'Choose the best position automatically.',
      Centro: 'Centered over the anchor.',
    },
  },
  EnumTipoAnimacao: {
    description: 'Navigator page-transition animation.',
    members: {
      Nenhuma: 'No animation.',
      Deslizante: 'Slide transition.',
    },
  },
  EnumTipoCaixa: {
    description: 'Visual style of input boxes.',
    members: {
      Padrao: 'Default (filled/underline) style.',
      Delineada: 'Outlined style (border all around).',
    },
  },
  EnumTipoPainelAba: {
    description: 'Tab strip visual style.',
    members: {
      Padrao: 'Default style.',
      MaterialDesign: 'Material Design style (ink bar).',
    },
  },
  EnumOpcapBindCssClasse: {
    description: 'How `sn-bind-css-classe` applies the resolved class.',
    members: {
      Adicionar: 'Add the class, keeping existing ones.',
      Substituir: 'Replace the element class attribute.',
      Alterar: 'Replace classes matching the configured prefix.',
    },
  },
  EnumFormatacao: {
    description:
      'Display formatting applied to bound values (`sn-formatar`). Covers numbers, currency, dates/times, documents (CPF/CNPJ/CEP), text casing and more.',
    members: {
      Nenhuma: 'No formatting.',
      Bytes: 'Byte size (KB, MB…).',
      Cep: 'Brazilian postal code (00000-000).',
      Cpf: 'CPF document (000.000.000-00).',
      Cnpj: 'CNPJ document (00.000.000/0000-00).',
      CpfCnpj: 'CPF or CNPJ depending on length.',
      Telefone: 'Phone number.',
      Moeda: 'Currency (R$).',
      MoedaIgnorarSemValor: 'Currency; empty when no value.',
      MoedaComSinal: 'Currency with explicit +/- sign.',
      Inteiro: 'Integer.',
      Decimal: 'Decimal (2 places).',
      Decimal1: 'Decimal (1 place).',
      Decimal3: 'Decimal (3 places).',
      MelhorDecimal: 'Shortest decimal that represents the value.',
      Data: 'Date (dd/MM/yyyy).',
      Hora: 'Time (HH:mm).',
      DataHora: 'Date and time.',
      DataSemantica: 'Semantic date (“hoje”, “ontem”…).',
      DataHoraSemantica: 'Semantic date with time.',
      DataSemanticaHora: 'Semantic date, then time.',
      HoraDescricao: 'Duration described (2h 30min).',
      HoraDescricaoMin: 'Duration in minutes.',
      Dias: 'Number of days.',
      DiasUteis: 'Number of business days.',
      SimNao: 'Boolean as “Sim”/“Não”.',
      Trim: 'Trim whitespace.',
      TamanhoArquivo: 'File size.',
      Titulo: 'Title case.',
      Porcentagem: 'Percentage.',
      Porcentagem1: 'Percentage (1 decimal).',
      Porcentagem2: 'Percentage (2 decimals).',
      NaoQuebrar: 'Prevent line wrapping.',
      Pixel: 'Pixel value (“px”).',
      Tempo: 'Elapsed time.',
      TempoSemantico: 'Semantic elapsed time (“há 2 dias”).',
      Milimetro: 'Millimeters.',
      Centimetro: 'Centimeters.',
      Grau: 'Degrees.',
      Grau1: 'Degrees (1 decimal).',
      Grau2: 'Degrees (2 decimals).',
      PrimeiraLetraMaiuscula: 'Capitalize first letter.',
      CaixaAlta: 'UPPERCASE.',
      CaixaBaixa: 'lowercase.',
      Dimensao: 'Dimension (width × height).',
      DimensaoCm: 'Dimension in centimeters.',
      DimensaoPixels: 'Dimension in pixels.',
      CartaoCredito: 'Credit card number.',
      Nome: 'Proper-name casing.',
      PositivoNegativo: 'Number with +/- sign.',
      PositivoNegativoDecimal: 'Decimal with +/- sign.',
      PorcentagemPositovoNegativo: 'Percentage with +/- sign.',
      Porcentagem1PositovoNegativo: 'Percentage (1 decimal) with +/- sign.',
      Absoluto: 'Absolute value.',
      EntreParentes: 'Wraps the value in parentheses.',
      QuebrarLinhasHtml: 'Converts line breaks to <br>.',
      Peso: 'Weight.',
      PesoKg: 'Weight in kg.',
      Prazo: 'Deadline/term.',
      DoisPontosFinal: 'Appends a colon (:).',
      OcultarEmail: 'Partially masks an e-mail address.',
      Senha: 'Masks the value as a password.',
      Margem: 'Margin value.',
    },
  },
};
