# Attributes Reference

Complete catalog of all **215** Snebur.UI attributes, extracted from `AtributosHtml.Statica.ts`.

Column notes: **Usage** counts instances found in the Sigi frontend `.shtml` templates; **Observed values** are the most frequent real values.

## Presentation attributes (`ap-*`)

Layout and visual styling. Apply to `ap-*` components **and** `sn-*` controls. **All support responsive suffixes** (`--celular`, `--tablet`, `--notebook`, `--desktop`, `--super-pequena-v`, `--pequena-v`, `--media-v`, `--grande-v`).

| Attribute | Type | Description | Usage | Observed values |
|-----------|------|-------------|-------|-----------------|
| `ap-alinhamento-horizontal` | [`EnumAlinhamentoHorizontal`](ENUMS.md#enumalinhamentohorizontal) | Horizontal alignment of the element within its parent. | 1111× | `Centro`, `Direita`, `Esquerda`, `EsquerdaAbsoluto` |
| `ap-alinhamento-texto` | [`EnumAlinhamentoTexto`](ENUMS.md#enumalinhamentotexto) | Text alignment (left, center, right, justified). | 77× | `Direita`, `Centro`, `Esquerda` |
| `ap-alinhamento-vertical` | [`EnumAlinhamentoVertical`](ENUMS.md#enumalinhamentovertical) | Vertical alignment of the element within its parent. | 543× | `Centro`, `Inferior`, `Superior`, `SuperiorAbsoluto` |
| `ap-altura` | [`EnumAltura`](ENUMS.md#enumaltura) | Height — CSS length or `Auto`. Responsive. | 1768× | `100%`, `40px`, `60px`, `50px` |
| `ap-altura-linha` | [`EnumAlturaLinha`](ENUMS.md#enumalturalinha) | Line height of the text. Responsive. | 420× | `28px`, `32px`, `24px`, `20px` |
| `ap-altura-maxima` | [`EnumAltura`](ENUMS.md#enumaltura) | Maximum height (CSS length). Responsive. | 3× | `100%`, `550px` |
| `ap-altura-minima` | [`EnumAltura`](ENUMS.md#enumaltura) | Minimum height (CSS length). Responsive. | 12× | `320px`, `50px`, `150px`, `70px` |
| `ap-barra-rolagem` | [`EnumBarraRolagem`](ENUMS.md#enumbarrarolagem) | Scrollbar behaviour (both axes): hidden, automatic, visible or overflow. | 5× | `Automatica` |
| `ap-barra-rolagem-horizontal` | [`EnumBarraRolagem`](ENUMS.md#enumbarrarolagem) | Horizontal scrollbar behaviour. | 3× | `Automatica` |
| `ap-barra-rolagem-vertical` | [`EnumBarraRolagem`](ENUMS.md#enumbarrarolagem) | Vertical scrollbar behaviour. | 317× | `Automatica`, `Transbordar`, `Visivel` |
| `ap-borda` | [`EnumDistanciaMargem`](ENUMS.md#enumdistanciamargem) | Border width/preset around the element. Responsive. | 66× | `1px`, `0px 0px 1px 0px`, `2px`, `1px 1px 1px 0px` |
| `ap-cor-borda` | [`EnumCor`](ENUMS.md#enumcor) | Border color from the framework palette. | 50× | `Cinza`, `SistemaPrincipal`, `Amarelo`, `CinzaAzulado` |
| `ap-cor-fundo` | [`EnumCor`](ENUMS.md#enumcor) | Background color from the framework palette (`SistemaPrincipal`, `Azul`, …). | 515× | `SistemaPrincipal`, `Cinza`, `Branca`, `AzulClaro` |
| `ap-cor-fundo-debug` | [`EnumCor`](ENUMS.md#enumcor) | Debug-only background color (ignored in production). | — | — |
| `ap-cor-texto` | [`EnumCor`](ENUMS.md#enumcor) | Text color from the framework palette. | 1452× | `Branca`, `SistemaFalha`, `Cinza`, `SistemaPrincipal` |
| `ap-fonte` | [`EnumFonte`](ENUMS.md#enumfonte) | Font family (Roboto, RobotoCondensed). | — | — |
| `ap-icone` | [`EnumIcone`](ENUMS.md#enumicone) | Material Symbols icon name (e.g. `Search`, `Delete`, `ShoppingCart`). | 1159× | `Edit`, `Delete`, `History`, `Warning` |
| `ap-icone-categoria` | [`EnumIconeCategoria`](ENUMS.md#enumiconecategoria) | Icon style family: Filled, Outlined, Rounded, Sharp, TwoTone. | 53× | `Outlined`, `Filled`, `Rounded`, `Sharp` |
| `ap-icone-encolher` | [`EnumIcone`](ENUMS.md#enumicone) | Icon shown when the expander is expanded (click to collapse). | — | — |
| `ap-icone-expandir` | [`EnumIcone`](ENUMS.md#enumicone) | Icon shown when the expander is collapsed (click to expand). | — | — |
| `ap-largura` | [`EnumLargura`](ENUMS.md#enumlargura) | Width — CSS length (`100px`, `50%`) or `Auto`. Responsive. | 2766× | `100%`, `50%`, `140px`, `200px` |
| `ap-largura-maxima` | [`EnumLargura`](ENUMS.md#enumlargura) | Maximum width (CSS length). Responsive. | 12× | `100%`, `300px`, `400px`, `600px` |
| `ap-largura-minima` | [`EnumLargura`](ENUMS.md#enumlargura) | Minimum width (CSS length). Responsive. | 3× | `140px`, `275px` |
| `ap-margem` | `String` | Outer margin — CSS shorthand (`8px 0px`, `0 4px 8px 4px`). Responsive. | 3755× | `8px 0px`, `16px 0px`, `0px 4px`, `0px 8px` |
| `ap-margem-interna` | `String` | Inner padding — CSS shorthand. Responsive. | 269× | `0px 0px 5px 0px`, `16px`, `10px 10px 10px 0px`, `8px 0px` |
| `ap-mensagem-info` | `String` | Informational message shown as an info affordance next to the element. | — | — |
| `ap-peso-fonte` | [`EnumPesoFonte`](ENUMS.md#enumpesofonte) | Font weight: SuperLeve…SuperPesado. | 165× | `Negrito`, `Leve`, `Normal`, `Pesado` |
| `ap-quebrar` | [`EnumQuebrar`](ENUMS.md#enumquebrar) | Text wrapping: wrap, no-wrap (ellipsis) or no-wrap without ellipsis. | 188× | `NaoQuebrar`, `Quebrar` |
| `ap-rotulo` | `String` | Presentation label rendered by the component (responsive). | 166× | `Descrição`, `Selecione`, `Ativado`, `Loja` |
| `ap-tamanho-icone` | [`EnumTamanhoIcone`](ENUMS.md#enumtamanhoicone) | Icon size preset (Pequeno…Grande). | 336× | `Pequeno`, `Medio`, `Padrao`, `PequenoMedio` |
| `ap-tipo-animacao` | [`EnumTipoAnimacao`](ENUMS.md#enumtipoanimacao) | Page-transition animation of the navigator: Nenhuma or Deslizante (slide). | 20× | `Deslizante` |
| `ap-tipo-caixa` | [`EnumTipoCaixa`](ENUMS.md#enumtipocaixa) | Input box visual style: Padrao (filled/underline) or Delineada (outlined). | 47× | `Delineada`, `Padrao` |
| `ap-tipo-painel` | [`EnumTipoPainel`](ENUMS.md#enumtipopainel) | Layout algorithm of the panel: block, vertical/horizontal stack, full-stack, inline stack. | 2621× | `PilhaVertical`, `PilhaHorizontal`, `PilhaHorizontalCheia`, `Bloco` |
| `ap-tipo-painel-aba` | [`EnumTipoPainelAba`](ENUMS.md#enumtipopainelaba) | Visual style of the tab strip: Padrao or MaterialDesign. | 10× | `MaterialDesign` |
| `ap-tipografia` | [`EnumTipografia`](ENUMS.md#enumtipografia) | Typography scale: h1–h7, Titulo, SubTitulo, Corpo, Descricao, BotaoCaixaAlta… | 1699× | `SubTitulo`, `Titulo`, `Descricao`, `Corpo` |
| `ap-titulo-encolher` | [`EnumIcone`](ENUMS.md#enumicone) | Tooltip/title for the collapse affordance. | — | — |
| `ap-titulo-expandir` | [`EnumIcone`](ENUMS.md#enumicone) | Tooltip/title for the expand affordance. | — | — |
| `ap-titulo-info` | `String` | Title of the informational popup (`ap-mensagem-info`). | — | — |
| `ap-tonalidade-borda` | [`EnumTonalidade`](ENUMS.md#enumtonalidade) | Tone/shade variation of the border color. | 21× | `Aplha20`, `Aplha10`, `Aplha50`, `T300` |
| `ap-tonalidade-fundo` | [`EnumTonalidade`](ENUMS.md#enumtonalidade) | Tone/shade variation of the background color (T100–T900, Alpha10–90). | 151× | `T300`, `Aplha30`, `T900`, `Aplha10` |
| `ap-tonalidade-texto` | [`EnumTonalidade`](ENUMS.md#enumtonalidade) | Tone/shade variation of the text color. | 19× | `T700`, `T300`, `T900`, `Aplha50` |
| `ap-visibilidade` | [`EnumVisibilidade`](ENUMS.md#enumvisibilidade) | Visibility: `Visivel`, `Invisivel` (keeps space) or `Oculto` (display none). The go-to attribute for responsive show/hide. | 200× | `Oculto`, `Visivel` |

## Control attributes (`sn-*`)

Behaviour/configuration attributes for form controls.

| Attribute | Type | Description | Usage | Observed values |
|-----------|------|-------------|-------|-----------------|
| `disabled` | `String` | Native HTML disabled attribute (managed by the framework). | — | — |
| `max` | `String` | Native HTML `max` attribute (managed by the framework). | — | — |
| `min` | `String` | Native HTML `min` attribute (managed by the framework). | — | — |
| `sn-accept` | `String` | File-type filter for file-picking buttons (native `accept` syntax, e.g. `image/*`). | 13× | `image/*`, `image/png`, `image/jpeg, image/png` |
| `sn-altura-item` | `Number` | Height in pixels of each dropdown item (drives list virtualization). | 5× | `29`, `30` |
| `sn-carregar-aba-inicial` | `Boolean` | Loads the initial tab content eagerly. | 1× | `false` |
| `sn-construtor` | `String` | Explicit constructor/class name to instantiate for this element (overrides the tag registry). | — | — |
| `sn-consulta` | `String` | Name of the entity query (consulta) that supplies the items. | — | — |
| `sn-consulta-await` | `String` | Async variant: awaits the named query before rendering. | — | — |
| `sn-consultar-tipo-automaticamente` | `String` | Queries the item type automatically from the bind context. | 1× | `true` |
| `sn-controle` | `String` | Name of the user-control class to host (used with `sn-controle-usuario`). | 299× | `ControleItemMenu`, `ControleProjetoLamina`, `ControleVisualizacaoLamina`, `ControleDescricaoAlbum` |
| `sn-controle-generico` | `String` | Generic-control class name to instantiate for template-generated content. | — | — |
| `sn-cor-personalizacao` | [`EnumCor`](ENUMS.md#enumcor) | Custom accent color for the control. | — | — |
| `sn-css-class-botao-logico-falso` | `Boolean` | CSS class applied when the toggle-button value is false. | 1× | `sn-botao-logico-falso` |
| `sn-css-class-botao-logico-verdadeiro` | `Boolean` | CSS class applied when the toggle-button value is true. | 1× | `sn-botao-logico-verdadeiro` |
| `sn-css-class-elemento-clonado` | `String` | CSS class applied to the drag clone. | — | — |
| `sn-css-class-elemento-itens-colecao` | `String` | CSS class applied to the items host element. | — | — |
| `sn-debug-nao-remover-elemento-clonado` | `String` | Debug: keeps the drag clone in the DOM after drop. | — | — |
| `sn-desabilitar` | `Boolean` | Disables the control (`true`/`false` or bind path). Disabled controls skip validation and events. | 118× | `true`, `{{IsEditando}}, Origem=this`, `{{IsEditando}}`, `{{IsPossuiPrazoAdicional === false}}, Origem=this` |
| `sn-desativar-auto-completar` | `Boolean` | Disables browser autocomplete on the input. | 4× | `true` |
| `sn-desativar-efeito-hover` | `Boolean` | Disables the row hover effect. | 1× | `true` |
| `sn-destino-controle-flutuante` | [`EnumDestinoControleFlutuante`](ENUMS.md#enumdestinocontroleflutuante) | Preferred position of the floating control relative to its anchor. | 10× | `Inferior`, `InferiorEsquerda` |
| `sn-entidade-ordenacao` | `String` | Entity/property that stores the order index. | 26× | `EntidadeOrdenacao`, `TamanhoAlbum`, `Gabarito`, `TipoEstojo` |
| `sn-exibicao` | `String` | Display expression/format for the item text. | 2× | `Nome` |
| `sn-filtro-imagem` | [`EnumPreenchimentoImagem`](ENUMS.md#enumpreenchimentoimagem) | Visual filter applied to the image. | 1× | `{{.}}` |
| `sn-flutuante` | `Boolean` | Renders the control floating over the page content. | 3× | `false` |
| `sn-formatar` | [`EnumFormatacao`](ENUMS.md#enumformatacao) | Formatting applied to the bound value for display (currency, date, CPF/CNPJ, percentage…). | 276× | `Moeda`, `DoisPontosFinal`, `DataHoraSemantica`, `QuebrarLinhasHtml` |
| `sn-formatar-funcao` | `String` | Name of a codebehind function that formats the value (custom formatting). | 11× | `this.FormatarAjuste200` |
| `sn-formatar-valor` | [`EnumFormatacao`](ENUMS.md#enumformatacao) | Formatting of the value display in sliders (kept separate from binds). | 55× | `Porcentagem`, `Centimetro`, `Inteiro`, `Grau` |
| `sn-funcao-is-pode-ativar` | `String` | — | — | — |
| `sn-funcao-is-pode-navegar-aba` | `String` | Codebehind predicate that can veto switching tabs (unsaved changes…). | 5× | `this.IsPodeNavegarAsync` |
| `sn-funcao-normalizar-elemento-clonado` | `String` | Codebehind function that adjusts the drag clone before showing it. | — | — |
| `sn-grupo` | `String` | Logical group name (e.g. radio-button groups or validation groups). | 85× | `RequerimentoGravacao`, `Alinhamento`, `GrupoTipoPromocao`, `TipoRegiao` |
| `sn-identificador-navegador` | `String` | Name of the target navigator (for buttons/links that navigate). | — | — |
| `sn-inicializacao-propriedades` | `String` | Inline property initialization expression(s) applied when the control is created. | 48× | `IsMostrarPrecoFinal=false`, `RotuloRevelacao=Revelação`, `IsMostrarNumeroQuadroFoto=true`, `IsPodeRemoverLamina=false` |
| `sn-is-abas-cheia` | `Boolean` | Stretches tabs to fill the full strip width. | 12× | `false` |
| `sn-is-alvo-ordenacao` | `Boolean` | Marks the element as a drop target for reordering. | 3× | `true` |
| `sn-is-animar-ordenacao` | `Boolean` | Animates items while reordering. | 8× | `false` |
| `sn-is-async` | `Boolean` | Loads/executes asynchronously. | 1× | `true` |
| `sn-is-ativar-ordenacao` | `Boolean` | Enables column sorting on the data grid. | 4× | `true`, `this.IsAtivarOrdenacao` |
| `sn-is-atualizar-digitando` | `Boolean` | Pushes the value to the bind on every keystroke (default: on blur/change). | 1× | `true` |
| `sn-is-auto-salvar` | `Boolean` | Automatically saves the bound entity when the value changes. | 10× | `true` |
| `sn-is-cache` | `Boolean` | Enables caching of the loaded image. | 6× | `false` |
| `sn-is-clone-global` | `Boolean` | Drags a global clone of the element (escapes overflow clipping). | 3× | `false` |
| `sn-is-controle-flutuante` | `String` | Marks the control as floating (rendered detached, positioned relative to its anchor). | — | — |
| `sn-is-editar` | `Boolean` | Debug/edit mode flag. | — | — |
| `sn-is-elemento-principal-alvo-ordenacao` | `Boolean` | Uses the main element as the drag target (instead of a handle). | — | — |
| `sn-is-formatar-inteiro` | `Number` | Formats the value as integer (no decimals). | 5× | `false` |
| `sn-is-hora-dia` | `String` | Restricts the time to day hours. | — | — |
| `sn-is-manter-cache` | `Boolean` | Keeps navigated pages cached (state preserved when returning). | 9× | `true`, `false` |
| `sn-is-marcar-item` | `Boolean` | Debug: highlights the item under the cursor. | 1× | `false` |
| `sn-is-marcar-linha` | `Boolean` | Debug: highlights the row under the cursor. | 3× | `False`, `false` |
| `sn-is-mostrar-contador-caracteres` | `Boolean` | Shows the “n/max” character counter under the box. | 13× | `true` |
| `sn-is-mostrar-valor` | `Boolean` | Shows the current value next to the slider. | 66× | `true`, `false` |
| `sn-is-nao-formatar-valor-vazio` | `Boolean` | Leaves the box empty instead of formatting an empty/zero value. | — | — |
| `sn-is-nao-permitir-zero` | `Boolean` | Rejects zero as a valid value. | — | — |
| `sn-is-negrito-valor-alterado` | `Boolean` | Renders the label/value bold when the value was modified (dirty indicator). | — | — |
| `sn-is-pontilhar-areas` | `Boolean` | Debug: outlines layout areas with dotted borders. | — | — |
| `sn-is-propagar-bind-data-source` | `Boolean` | Propagates the current data source to navigated pages. | 27× | `true`, `false` |
| `sn-is-propagar-estilos` | `Boolean` | Propagates presentation styles to generated children. | — | — |
| `sn-is-rotulo-flutuante` | `Boolean` | Enables/disables the floating-label behaviour. | 57× | `false`, `true` |
| `sn-is-rotulo-vazio` | `Boolean` | Reserves the label space even without label text (keeps forms aligned). | 258× | `true`, `false` |
| `sn-is-salvar-ordenacao-automaticamente` | `Boolean` | Persists the new order automatically after a drag. | 1× | `false` |
| `sn-is-senha-md5` | `Boolean` | Hashes the typed password with MD5 before binding (legacy authentication flows). | 11× | `false` |
| `sn-item-elemento` | `String` | Tag/element name to use for generated item elements. | 2× | `GrupoLaminaAdiconada`, `GrupoLaminaRemovida` |
| `sn-largura-item` | `String` | Width of each item (item-based layouts). | 14× | `100px`, `55px`, `150px`, `110px` |
| `sn-largura-texto-valor` | `String` | Width reserved for the slider value text. | 12× | `60px`, `32px` |
| `sn-legenda` | `String` | Caption/help text shown with the control. | 623× | `Editar`, `Remover`, `Histórico`, `Tamanhos suportados` |
| `sn-link-rota` | `String` | Route/URL the button navigates to (turns the button into a navigation link). | 1× | `{{Rota}}` |
| `sn-marca-dagua` | `String` | Placeholder (watermark) text shown while the box is empty. Exclusive to text-box family controls (`BaseCaixaTexto`). | 47× | `dd/mm/aaaa`, `Nome do álbum: ex  Minha viagem favorita`, `Digite aqui nome da sua promoção`, `Digite aqui o prazo para utilização do cupom` |
| `sn-mascara` | `String` | Input mask (e.g. `(00) 0000-0000`). Masked input keeps the raw value in the bind. | 39× | `telefone`, `cep`, `data`, `Telefone` |
| `sn-maximo` | `Number` | Maximum numeric value accepted. | 92× | `100`, `10`, `200`, `3` |
| `sn-maximo-paginas` | `String` | Maximum number of page buttons shown by the pager. | 5× | `5`, `7` |
| `sn-maxlength` | `Number` | Maximum number of characters accepted. | 17× | `500`, `100`, `300`, `4` |
| `sn-mensagem` | `String` | Message text displayed by the control. | — | — |
| `sn-metodo-salvar-entidades-ordenada` | `String` | Codebehind method called to persist entities after drag-reordering. | — | — |
| `sn-minimo` | `Number` | Minimum numeric value accepted. | 90× | `0`, `-100`, `1`, `2` |
| `sn-minLength` | `Number` | Minimum number of characters required. | — | — |
| `sn-multiselecao` | `Boolean` | Allows selecting multiple files (file-picking buttons). | 33× | `true`, `false` |
| `sn-nao-entrar-arvore` | `String` | Excludes the element from the control tree (children are not parsed as controls). | — | — |
| `sn-nome` | `String` | Control name. Makes the control reachable from the codebehind (`this.RetornarControle("Nome")` / typed properties) and used in messages. | 1272× | `DataLista`, `Navegador`, `PainelPrincipal`, `BtnSalvar` |
| `sn-nome-propriedade-sugestao` | `String` | Property of the suggestion objects to display/complete with. | — | — |
| `sn-normalizar` | `String` | Normalization applied to the typed text (trim, casing…). | — | — |
| `sn-opcao-bind-css-classe` | [`EnumOpcapBindCssClasse`](ENUMS.md#enumopcapbindcssclasse) | How `sn-bind-css-classe` applies the class: add, replace or alter prefix. | 122× | `Substituir`, `Alterar`, `Adicionar` |
| `sn-opcao-bind-css-classe-prefixo-alterar` | `String` | Prefix replaced when `sn-opcao-bind-css-classe="Alterar"`. | 38× | `sn-item-album--`, `prazo-producao--`, `peso--`, `espessura--` |
| `sn-pagina-inicial` | `String` | Initial page/control shown by the navigator. | 28× | `this.RetornarPaginaInicial`, `PaginaInicial`, `PaginaGabaritosVisualizacaoFiltro`, `PaginaAutenticacao` |
| `sn-paginacao-descricao-item` | `String` | Singular item label used by the pager summary (“1 cliente”). | 3× | `pedido`, `cliente` |
| `sn-paginacao-descricao-itens` | `String` | Plural items label used by the pager summary (“10 clientes”). | 3× | `pedidos`, `clientes` |
| `sn-parametros` | `String` | Parameters passed to the hosted control constructor (comma-separated / bind paths). | 143× | `IsPaginaBase=True`, `IsPaginaBase=true`, `IsPaginaBase=True&IsProduto=true`, `IsPaginaBase=True&IsProduto=false` |
| `sn-passo` | `String` | Step increment of sliders/steppers. | 157× | `1`, `0.1`, `0.01`, `0.001` |
| `sn-passo-largo` | `String` | Large step increment (Page Up/Down or fast buttons). | 80× | `5`, `0.1`, `10`, `1` |
| `sn-pattern` | `String` | Regular-expression pattern the value must match (native validation). | — | — |
| `sn-permitir-limpar` | `Boolean` | Shows a clear (×) affordance to unset the selection. | 162× | `false`, `true` |
| `sn-posicao-rotulo` | [`EnumPosicao`](ENUMS.md#enumposicao) | Position of the label relative to the control. | — | — |
| `sn-preenchimento-imagem` | [`EnumPreenchimentoImagem`](ENUMS.md#enumpreenchimentoimagem) | How the image fills its box (contain, cover, stretch…). | 37× | `UniformeDentro`, `UniformeFora`, `{{PreenchimentoImagem}}, Origem=this`, `Esticar` |
| `sn-prop-` | `Boolean` | Prefix for passing arbitrary properties to the control: `sn-prop-minha-prop="valor"` sets `MinhaProp`. | — | — |
| `sn-registros-por-pagina` | `String` | Page size (records per page). | 4× | `100`, `50, 100`, `50`, `25,50,100` |
| `sn-relacoes-aberta` | `String` | Relations to eager-open (`.AbrirRelacao`) on the queried entities. | — | — |
| `sn-rotulo` | `String` | Label text of the control (floating label on inputs). | 1844× | `Ações`, `Nome`, `Descrição`, `Mostrar deletados` |
| `sn-rotulo-flutuante` | `String` | Text of the floating label (when different from `sn-rotulo`). | 22× | `Opção de montagem`, `Estado`, `Identidade de gênero `, `Tipo gabarito` |
| `sn-selecionado` | `Boolean` | Initial/current selected state (selection controls). | 3× | `{{IsSelecionado}}`, `true` |
| `sn-sensibilidade-vertical` | `Boolean` | Vertical drag sensitivity for reordering. | 14× | `true`, `false` |
| `sn-sentido-ordenacao` | [`EnumSentidoOrdenacao`](ENUMS.md#enumsentidoordenacao) | Sort direction: Crescente (ascending) or Decrescente (descending). | 2× | `Crescente`, `Decrescente` |
| `sn-skip-tab` | [`EnumTipoCaixa`](ENUMS.md#enumtipocaixa) | Removes the control from the Tab navigation order. | 8× | `true` |
| `sn-somente-leitura` | `Boolean` | Read-only mode: value shown, editing blocked. | 41× | `true`, `{{IsEnderecoSomenteLeitura}}`, `{{IsBairroSomenteLeitura}}`, `{{IsPesquisaSomenteLeitura}}` |
| `sn-sub-titulo` | `String` | Subtitle text. | — | — |
| `sn-tag-elemento-item-template` | `String` | Tag name expected for the item template element. | — | — |
| `sn-tag-elemento-itens-colecao` | `String` | Tag name of the element that hosts the generated items. | — | — |
| `sn-tags` | `String` | Free-form tags attached to the control (comma separated) — queried from code. | 12× | `pedido, pedidos`, `precos`, `tipo de blocos, tipos de blocos`, `pagamentos, boleto, credito` |
| `sn-tamanho-imagem` | [`EnumTamanhoImagem`](ENUMS.md#enumtamanhoimagem) | Server-side rendition to load: Miniatura, Pequena, Media, Grande or Impressao. | 23× | `Pequena`, `Miniatura`, `Grande`, `Media` |
| `sn-tipo` | `String` | Domain type name used by the control (e.g. the enum type of a `sn-combobox-enum` or entity type of a query). | 141× | `d.EnumOrientacao`, `sigi.EnumOpcaoMontagem`, `sigi.EnumOrigemPedido`, `fotoAlbumE.Tema` |
| `sn-tipo-botao` | [`EnumTipoBotao`](ENUMS.md#enumtipobotao) | Visual style of the button: Normal, Flat, Circulo, Icone, Link, Menu, Tab… | 1094× | `Icone`, `LinkDestaque`, `Flat`, `FlatBox` |
| `sn-tipo-data` | [`EnumTipoData`](ENUMS.md#enumtipodata) | Semantic date range accepted (birth date, past only, near future…). Drives validation and the calendar UI. | 2× | `DataPassado` |
| `sn-tipo-entrada` | [`EnumTipoEntrada`](ENUMS.md#enumtipoentrada) | Virtual keyboard/input mode: text, number, decimal, phone, e-mail, URL, search. | 40× | `Numero`, `Decimal`, `Email`, `Pesquisa` |
| `sn-tipo-item` | `String` | Domain type of the items in a list/collection control. | 7× | `fotoAlbumE.TipoAcessorio`, `fotoAlbumE.EnumLocalRevestimentoEstojo`, `FotoViewModel`, `fotoAlbumE.EnumLocalRevestimentoCapa` |
| `sn-titulo` | `String` | Title text (tabs, windows, sections). | — | — |
| `sn-url-imagem-pendente` | `String` | Placeholder image URL shown while the real image loads. | 4× | `vazia` |
| `sn-valor` | `String` | Literal value carried by the option (radio items, simple options). | 24× | `2`, `1`, `3`, `webadmin.EnumTipoRelatorioPedido.Resumido` |
| `sn-virtualizar` | `Boolean` | Enables list virtualization (renders only visible items — required for large lists). | 1× | `true` |
| `sn-visibilidade` | [`EnumVisibilidade`](ENUMS.md#enumvisibilidade) | Visibility of the control: `Visivel`, `Invisivel` (keeps space) or `Oculto` (removed from layout). | 1455× | `Oculto`, `{{IsDeletado}}, Converter=ui.Converter.FalsoParaVisibilidade`, `{{Preco}}, Converter=MaiorZeroParaMostrar`, `{{IsDeletado === false}}, Converter=VerdadeiroParaMostrar` |
| `step` | `String` | Native HTML `step` attribute (managed by the framework). | — | — |

## Events

The attribute value is the name of a handler method implemented in the codebehind (`*.shtml.ts`); the framework resolves it up the parent-control chain. Standard events wired for every control: `sn-click`, `sn-enter`, `sn-navegar`, `sn-selecionar-arquivos`, `sn-arrastar-arquivos`, `sn-texto-pesquisa`, `sn-item-selecionado-alterado`, `sn-valor-alterado`, `sn-valor-modificando`, `sn-linha-detalhes-expandida`, `sn-ordenacao-coluna-alterada`, `sn-conteudo-expandido`.

| Attribute | Type | Description | Usage | Observed values |
|-----------|------|-------------|-------|-----------------|
| `sn-arrastar-arquivos` | `Event` | Fires when files are dragged & dropped onto the control. | 2× | `Bloco_ArrastarArquivos`, `BtnArrastarArquivos_Click` |
| `sn-click` | `Event` | Fires when the element is clicked/tapped. Value = codebehind method name. | 1630× | `BtnEditar_Click`, `BtnCancelar_Click`, `BtnSalvar_Click`, `BtnSelecionar_Click` |
| `sn-conteudo-expandido` | `Event` | Fires when the expander content is opened. | — | — |
| `sn-enter` | `Event` | Fires when Enter is pressed inside the control. | 10× | `BtnPesquisa_Click`, `BtnInicio_Enter`, `BtnFim_Enter`, `BtnPesquisa_Enter` |
| `sn-item-click` | `Event` | Fires when an item of the list is clicked (args carry the item). | — | — |
| `sn-item-selecionado-alterado` | `Event` | Fires when the selected item changes (comboboxes, selection lists). | 9× | `CmbTabelasPreco_ItemAlterado`, `ControleBairros_ItemSelecionadoAlterado`, `CmbFontesPadrao_ValorAlterado`, `CmbTemas_ValorAlterado` |
| `sn-linha-click` | `Event` | Fires when a grid row is clicked. | — | — |
| `sn-linha-detalhes-expandida` | `Event` | Fires when a grid row detail area is expanded. | 6× | `DataLista_LinhaDetalhesExpandida`, `DataListaPedidos_LinhaDetalhesExpandia`, `PainelItensGrupoRevelacao_LinhaDetalhesExpandida` |
| `sn-navegar` | `Event` | Fires when the navigator navigates (page changed). | 156× | `PaginaPromocoes`, `PaginaPromocaoCupons`, `PaginaConfiguracaoGeral`, `PaginaHistoricoTipoConfiguracao` |
| `sn-ordenacao-coluna-alterada` | `Event` | Fires when the grid sort column/direction changes. | 1× | `DataLista_OrdenacaoAlterada` |
| `sn-selecionar-arquivos` | `Event` | Fires when files are picked (file buttons); args carry the selected files. | 29× | `BtnSelecionarArquivo_Click`, `BtnSelecionar_SelecionarArquivos`, `BtnSelecionarArquivos_Click`, `BtnSelecionarArquivosGabarito_Click` |
| `sn-texto-pesquisa` | `Event` | Fires (debounced) when the search text changes. | 11× | `BtnPesquisa_Pesquisa`, `CaixaTextoPesquisaCidade_Pesquisa`, `CaixaTextoPesquisaEndereco_Pesquisa`, `TxtPesquisa_Pesquisa` |
| `sn-valor-alterado` | `Event` | Fires after the control value changes and is committed. | 174× | `Slider_ValorAlterado`, `RadioLacuna_ValorAlterado`, `RadioTipoCliente_ValorAlterado`, `RadioTipoPromocao_Alterado` |
| `sn-valor-modificando` | `Event` | Fires while the value is being modified (before commit). | 43× | `Slider_ValorAlterado`, `Slider_ValorModificando`, `TxtPesquisa_Alterado`, `CaixaSliderOpacidade_ValorModificando` |

## Data binds (`sn-bind*`)

The attribute value is a property path on the active data source (e.g. `Cliente.Nome`). Binds are two-way for input controls.

| Attribute | Type | Description | Usage | Observed values |
|-----------|------|-------------|-------|-----------------|
| `sn-bind` | `String` | Two-way bind of the control **value** to a property path of the data source (e.g. `Cliente.Nome`). Validation rules of the bound domain property are applied automatically. | 2409× | `{{Descricao}}`, `{{Nome}}`, `{{.}}`, `{{Quantidade}}` |
| `sn-bind-class` | `String` | Binds the element `class` attribute. | 128× | `sn-configuracao-deletada={{IsDeletado}}`, `sn-cor-texto--falha={{IsDeletado}}`, `sn-negrito={{IsExisteAlteracao}}`, `sn-configuracao-deletada={{Regiao.IsDeletado}}` |
| `sn-bind-css-classe` | `String` | Binds a CSS class from a value (see `sn-opcao-bind-css-classe`). | 91× | `{{.}}, Converter= webadmin.Converter.ClasseCssConfiguracao`, `{{.}}, Converter=webadmin.Converter.ClasseCssConfiguracao`, `{{.}}, Converter=this.RetornarClasseSelecionado`, `{{CssClasse}}` |
| `sn-bind-data` | `String` | Binds a date value rendered as text. | — | — |
| `sn-bind-data-source` | `String` | Sets the data-source object for this subtree (entity, view-model or query result). | 145× | `{{.}}`, `{{CadastroViewModel}}, Origem=this`, `{{GravacaoEstojoViewModel}}`, `{{GravacaoCapaViewModel}}` |
| `sn-bind-enum` | `String` | Binds an enum value (renders its label). | 57× | `{{.}}`, `{{Orientacao}}`, `{{Status}}`, `{{TamanhoImagem}}` |
| `sn-bind-estilo` | `String` | Binds inline CSS styles from a value. | 26× | `font-family={{Nome}}`, `background-color={{CorHexa}}`, `font-family={{NomeNegrito}}`, `background-color={{Cor}}` |
| `sn-bind-form` | `String` | Binds a form scope: children bind relative to this path, and the form tracks validation/dirty state. | 178× | `{{Entidade.Nome}}`, `{{Entidade.IsAtivo}}`, `{{TamanhoAlbumSuportado.IsQuadrado}}`, `{{TamanhoAlbumSuportado.IsHorizontal}}` |
| `sn-bind-hora` | `String` | Binds a time value rendered as text. | — | — |
| `sn-bind-imagem` | `String` | Binds a domain image object to an image control. | 22× | `{{Imagem}}`, `{{CorRevestimento.Imagem}}`, `{{.}}`, `{{Entidade.Imagem}}` |
| `sn-bind-imagens` | `String` | Binds a collection of domain images. | 16× | `{{Imagens}}`, `{{OpcaoAcessorio.Imagens}}`, `{{TipoGravacao.Imagens}}`, `{{TipoEstojo.Imagens}}` |
| `sn-bind-itens-selecionado` | `String` | Binds the collection of selected items (N:N combobox). | 36× | `{{TipoAcessorioSelecionado}}`, `{{OpcaoAcessorioSelecionado}}`, `{{TipoPapelSelecionado}}`, `{{TipoLaminacaoSelecionado}}` |
| `sn-bind-lista` | `String` | Binds the item collection of a list control. | 524× | `{{Itens}}, Origem=this`, `{{.}}`, `{{Entidades}}, Origem=this`, `{{TamanhosAlbumSuportadoViewModel}}` |
| `sn-bind-nome` | `String` | Binds the control name. | 1× | `{{Navegacao}}` |
| `sn-bind-numero` | `String` | Binds a numeric value rendered as text. | — | — |
| `sn-bind-progresso` | `String` | Binds a progress model (total/processed) to a progress control. | 6× | `{{Progresso}}`, `{{ProgressoMontagem}}` |
| `sn-bind-propriedade` | `String` | Binds an arbitrary control property: `Propriedade=Caminho`. | 3× | `Gabarito={{Gabarito}}` |
| `sn-bind-rotulo` | `String` | Binds the label text. | 7× | `{{.}}, Converter=this.RetornarRotuloRevestimentoEstojo`, `{{Descricao}}`, `{{RotuloBotaoCancelarVoltar}}`, `{{.}}, Converter=this.RetornarRotuloRevestimentoCapa` |
| `sn-bind-selecao-cor` | `String` | Binds the selected color of the color picker. | — | — |
| `sn-bind-senha` | `String` | Binds a password value. | — | — |
| `sn-bind-sugestoes` | `String` | Binds the suggestion list of autocomplete boxes. | — | — |
| `sn-bind-texto` | `String` | One-way bind that renders the value as the element text (also `{{path}}` in content). | 138× | `{{TamanhoAlbum.Nome}}`, `{{LinhaAlbum.Nome}}`, `{{TipoEstojo.Nome}}`, `{{Nome}}` |
| `sn-bind-url-imagem` | `String` | Binds an image URL to the element background/src. | 4× | `{{UrlImagemOrientacao}}`, `{{UrlImagem}}, Origem=this` |
| `sn-bind-valor-logico` | `String` | Binds a boolean value (checkbox, switch, toggle button). | — | — |

## Validation attributes

Control how and where validation messages are shown.

| Attribute | Type | Description | Usage | Observed values |
|-----------|------|-------------|-------|-----------------|
| `sn-destino-mensagem-validacao` | `String` | Name of the element/control where validation messages are rendered (instead of inline). | 3× | `TextoMensagemValidacaoMinimo`, `TextoMensagemValidacaoMaximo`, `TextoMensagemValidacaoPadrao` |
| `sn-ignorar-validacao` | `Boolean` | Skips this control during form validation. | 1× | `true` |
| `sn-manter-espaco-mensagem-validacao` | `Boolean` | Keeps the validation-message space reserved to avoid layout jumps. | 27× | `false`, `true` |
| `sn-mensagem-validacao-flutuante` | `Boolean` | Shows the validation message floating (tooltip style) instead of inline. | 16× | `false`, `true` |
| `sn-validar-sempre` | `Boolean` | Validates the control even when unchanged/hidden. | 1× | `false` |
| `sn-validar-valor-propriedade-alterado` | `Boolean` | Re-validates whenever the bound property changes (not only on user edit). | 7× | `false` |

## Deprecated attributes

Legacy attributes kept for backward compatibility — do not use in new code.

| Attribute | Type | Description | Usage | Observed values |
|-----------|------|-------------|-------|-----------------|
| `sn-obsoleto-cor` | [`EnumCor`](ENUMS.md#enumcor) | — | — | — |
| `sn-obsoleto-cor-borda` | [`EnumCor`](ENUMS.md#enumcor) | — | — | — |
| `sn-obsoleto-cor-fundo` | [`EnumCor`](ENUMS.md#enumcor) | — | — | — |
| `sn-obsoleto-cor-texto` | [`EnumCor`](ENUMS.md#enumcor) | — | — | — |
| `sn-obsoleto-tonalidade` | [`EnumTonalidade`](ENUMS.md#enumtonalidade) | — | — | — |
| `sn-obsoleto-tonalidade-borda` | [`EnumTonalidade`](ENUMS.md#enumtonalidade) | — | — | — |
| `sn-obsoleto-tonalidade-fundo` | [`EnumTonalidade`](ENUMS.md#enumtonalidade) | — | — | — |
| `sn-obsoleto-tonalidade-texto` | [`EnumTonalidade`](ENUMS.md#enumtonalidade) | — | — | — |

---
*Generated 2026-07-03T01:24:23.349Z*
