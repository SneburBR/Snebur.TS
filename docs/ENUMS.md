# Enums Reference

Enum-typed attributes accept the **option name** as the attribute value, e.g. `ap-visibilidade="Oculto"`.

## Enums used by attributes

### `EnumAlinhamentoHorizontal`

Horizontal alignment inside the parent. `*Absoluto` variants use absolute positioning.

Used by: `ap-alinhamento-horizontal`

| Option | Description |
|--------|-------------|
| `Esquerda` | Align left. |
| `Centro` | Center. |
| `Direita` | Align right. |
| `EsquerdaAbsoluto` | Pinned to the left edge (absolute). |
| `CentroAbsoluto` | Centered (absolute). |
| `DireitaAbsoluto` | Pinned to the right edge (absolute). |

```html
<ap-painel ap-alinhamento-horizontal="Centro"> ... </ap-painel>
```

### `EnumAlinhamentoTexto`

Text alignment.

Used by: `ap-alinhamento-texto`

| Option | Description |
|--------|-------------|
| `Esquerda` | Left. |
| `Centro` | Center. |
| `Direita` | Right. |
| `Justificado` | Justified. |

```html
<ap-bloco ap-alinhamento-texto="Direita"> ... </ap-bloco>
```

### `EnumAlinhamentoVertical`

Vertical alignment inside the parent. `*Absoluto` variants use absolute positioning.

Used by: `ap-alinhamento-vertical`

| Option | Description |
|--------|-------------|
| `Superior` | Align top. |
| `Centro` | Center. |
| `Inferior` | Align bottom. |
| `SuperiorAbsoluto` | Pinned to the top edge (absolute). |
| `CentroAbsoluto` | Centered (absolute). |
| `InferiorAbsoluto` | Pinned to the bottom edge (absolute). |

```html
<ap-painel ap-alinhamento-vertical="Centro"> ... </ap-painel>
```

### `EnumAltura`

Height presets: `Auto` or percentage steps (`_8P` = 8% … `_100P` = 100%). Also accepts any CSS length (`40px`, `100%`).

Used by: `ap-altura`, `ap-altura-minima`, `ap-altura-maxima`

| Option | Description |
|--------|-------------|
| `Auto` | Automatic height. |
| `_8P` | — |
| `_17P` | — |
| `_25P` | — |
| `_33P` | — |
| `_42P` | — |
| `_50P` | — |
| `_58P` | — |
| `_67P` | — |
| `_750P` | — |
| `_83P` | — |
| `_92P` | — |
| `_100P` | — |

```html
<ap-bloco ap-altura="100%"> ... </ap-bloco>
```

### `EnumAlturaLinha`

Line-height preset; also accepts CSS values.

Used by: `ap-altura-linha`

| Option | Description |
|--------|-------------|
| `Auto` | Automatic line height. |

```html
<ap-texto ap-altura-linha="28px"> ... </ap-texto>
```

### `EnumBarraRolagem`

Scrollbar behaviour.

Used by: `ap-barra-rolagem`, `ap-barra-rolagem-horizontal`, `ap-barra-rolagem-vertical`

| Option | Description |
|--------|-------------|
| `Oculta` | Never show a scrollbar (content clipped). |
| `Automatica` | Show when the content overflows (`auto`). |
| `Visivel` | Always visible (`scroll`). |
| `Transbordar` | Let content overflow without scrollbar (`visible`). |

```html
<ap-linha ap-barra-rolagem="Automatica"> ... </ap-linha>
```

### `EnumCor`

Framework color palette. `Sistema*` entries are semantic theme colors; the rest are literal Material palette colors.

Used by: `ap-cor-fundo`, `ap-cor-fundo-debug`, `ap-cor-texto`, `ap-cor-borda`, `sn-obsoleto-cor`, `sn-obsoleto-cor-fundo`, `sn-obsoleto-cor-texto`, `sn-obsoleto-cor-borda`, `sn-cor-personalizacao`

| Option | Description |
|--------|-------------|
| `Transparente` | Transparent. |
| `SistemaPadrao` | Theme default color. |
| `SistemaPrincipal` | Theme primary color. |
| `SistemaSecundaria` | Theme secondary color. |
| `SistemaSucesso` | Success (green) semantic color. |
| `SistemaFalha` | Failure/error (red) semantic color. |
| `SistemaInformacao` | Information (blue) semantic color. |
| `SistemaAlerta` | Warning (amber) semantic color. |
| `SistemaEditar` | Semantic color of edit actions. |
| `SistemaSalvar` | Semantic color of save actions. |
| `SistemaNovo` | Semantic color of create/new actions. |
| `SistemaExcluir` | Semantic color of delete actions. |
| `Vermelha` | — |
| `Rosa` | — |
| `Roxo` | — |
| `RoxoClaro` | — |
| `RoxoEscuro` | — |
| `Indigo` | — |
| `Azul` | — |
| `AzulClaro` | — |
| `Ciano` | — |
| `Turquesa` | — |
| `Verde` | — |
| `VerdeClaro` | — |
| `VerdeLima` | — |
| `Amarelo` | — |
| `AmareloMostarda` | — |
| `Laranja` | — |
| `LaranjaEscuro` | — |
| `Marron` | — |
| `Cinza` | — |
| `CinzaAzulado` | — |
| `Branca` | — |
| `Preta` | — |

```html
<sn-botao ap-cor-fundo="SistemaPrincipal"> ... </sn-botao>
```

### `EnumDestinoControleFlutuante`

Preferred placement of a floating control relative to its anchor.

Used by: `sn-destino-controle-flutuante`

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

### `EnumDistanciaMargem`

Spacing presets: percentage steps (`_8P` = 8%) and pixel steps (`_16px` = 16px). The margin attributes also accept full CSS shorthand strings.

Used by: `ap-borda`

| Option | Description |
|--------|-------------|
| `_8P` | — |
| `_17P` | — |
| `_25P` | — |
| `_33P` | — |
| `_42P` | — |
| `_50P` | — |
| `_58P` | — |
| `_67P` | — |
| `_750P` | — |
| `_83P` | — |
| `_92P` | — |
| `_100P` | — |
| `_4px` | — |
| `_8px` | — |
| `_16px` | — |
| `_20px` | — |
| `_24px` | — |
| `_28px` | — |
| `_32px` | — |
| `_36px` | — |
| `_40px` | — |
| `_44px` | — |
| `_48px` | — |
| `_60px` | — |
| `_80px` | — |
| `_96px` | — |
| `_112px` | — |
| `_128px` | — |
| `_144px` | — |
| `_160px` | — |
| `_192px` | — |
| `_224px` | — |
| `_256px` | — |
| `_512px` | — |

```html
<ap-coluna ap-borda="1px"> ... </ap-coluna>
```

### `EnumFonte`

Font family.

Used by: `ap-fonte`

| Option | Description |
|--------|-------------|
| `Roboto` | Roboto. |
| `RobotoCondensed` | Roboto Condensed. |

```html
<ap-painel ap-fonte="Roboto"> ... </ap-painel>
```

### `EnumFormatacao`

Display formatting applied to bound values (`sn-formatar`). Covers numbers, currency, dates/times, documents (CPF/CNPJ/CEP), text casing and more.

Used by: `sn-formatar`, `sn-formatar-valor`

*63 options.* First examples: `Nenhuma`, `Bytes`, `Cep`, `Cpf`, `Cnpj`, `Telefone`, `Margem`, `Moeda`, `MoedaIgnorarSemValor`, `MoedaComSinal`, `Inteiro`, `Decimal`, `Decimal1`, `Decimal3`, `MelhorDecimal`, `Data`, `Hora`, `DataHora`, `HoraDescricao`, `HoraDescricaoMin`, `DataHoraSemantica`, `DataSemanticaHora`, `DataSemantica`, `Dias`, …

```html
<ap-texto sn-formatar="Moeda"> ... </ap-texto>
```

### `EnumIcone`

Material Symbols icon names (the full Google Material icon set, PascalCase). Value = icon name, e.g. `Search`, `Delete`, `ShoppingCart`, `ArrowBack`.

Used by: `ap-icone`, `ap-icone-expandir`, `ap-icone-encolher`, `ap-titulo-encolher`, `ap-titulo-expandir`

*2125 options.* First examples: `Search`, `Home`, `AccountCircle`, `Settings`, `Done`, `Info`, `CheckCircle`, `Delete`, `ShoppingCart`, `Visibility`, `Favorite`, `Logout`, `Description`, `FavoriteBorder`, `Lock`, `Schedule`, `Language`, `HelpOutline`, `Face`, `ManageAccounts`, `FilterAlt`, `Event`, `Fingerprint`, `Verified`, …

```html
<sn-botao ap-icone="Edit"> ... </sn-botao>
```

### `EnumIconeCategoria`

Material Symbols style family.

Used by: `ap-icone-categoria`

| Option | Description |
|--------|-------------|
| `Filled` | Filled style (default). |
| `Outlined` | Outlined style. |
| `Rounded` | Rounded style. |
| `Sharp` | Sharp style. |
| `TwoTone` | Two-tone style. |

```html
<sn-botao ap-icone-categoria="Outlined"> ... </sn-botao>
```

### `EnumLargura`

Width presets: `Auto` or percentage steps (`_8P` = 8%, `_50P` = 50%, `_100P` = 100%). In practice the attribute also accepts any CSS length (`270px`, `50%`), which is the most common usage.

Used by: `ap-largura`, `ap-largura-minima`, `ap-largura-maxima`

| Option | Description |
|--------|-------------|
| `Auto` | Automatic width. |
| `_8P` | — |
| `_17P` | — |
| `_25P` | — |
| `_33P` | — |
| `_42P` | — |
| `_50P` | — |
| `_58P` | — |
| `_67P` | — |
| `_750P` | — |
| `_83P` | — |
| `_92P` | — |
| `_100P` | — |

```html
<ap-bloco ap-largura="100%"> ... </ap-bloco>
```

### `EnumOpcapBindCssClasse`

How `sn-bind-css-classe` applies the resolved class.

Used by: `sn-opcao-bind-css-classe`

| Option | Description |
|--------|-------------|
| `Adicionar` | Add the class, keeping existing ones. |
| `Substituir` | Replace the element class attribute. |
| `Alterar` | Replace classes matching the configured prefix. |

```html
<ap-texto sn-opcao-bind-css-classe="Substituir"> ... </ap-texto>
```

### `EnumPesoFonte`

Font weight.

Used by: `ap-peso-fonte`

| Option | Description |
|--------|-------------|
| `SuperLeve` | Thin (100). |
| `Leve` | Light (300). |
| `Normal` | Regular (400). |
| `Negrito` | Bold (700). |
| `Pesado` | Heavy (800). |
| `SuperPesado` | Black (900). |

```html
<ap-texto ap-peso-fonte="Negrito"> ... </ap-texto>
```

### `EnumPosicao`

Position of an element (e.g. label) relative to its control.

Used by: `sn-posicao-rotulo`

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

### `EnumPreenchimentoImagem`

How the image fills its container (object-fit semantics).

Used by: `sn-preenchimento-imagem`, `sn-filtro-imagem`

| Option | Description |
|--------|-------------|
| `Nenhum` | No fitting (natural size). |
| `UniformeDentro` | Fit inside keeping aspect ratio (contain). |
| `UniformeFora` | Fill keeping aspect ratio, cropping overflow (cover). |
| `UniformeCheio` | Fill the box completely keeping ratio. |
| `Esticar` | Stretch to fill (ignores aspect ratio). |

```html
<sn-controle-imagem sn-preenchimento-imagem="UniformeDentro"> ... </sn-controle-imagem>
```

### `EnumQuebrar`

Text wrapping behaviour.

Used by: `ap-quebrar`

| Option | Description |
|--------|-------------|
| `Quebrar` | Wrap normally. |
| `NaoQuebrar` | Single line, overflow shown with ellipsis (…). |
| `NaoQuebrarSemEllipsis` | Single line, clipped without ellipsis. |

```html
<ap-texto ap-quebrar="NaoQuebrar"> ... </ap-texto>
```

### `EnumSentidoOrdenacao`

Sort direction.

Used by: `sn-sentido-ordenacao`

| Option | Description |
|--------|-------------|
| `Crescente` | Ascending. |
| `Decrescente` | Descending. |

```html
<sn-coluna-texto sn-sentido-ordenacao="Crescente"> ... </sn-coluna-texto>
```

### `EnumTamanhoIcone`

Icon size presets, from small to large.

Used by: `ap-tamanho-icone`

| Option | Description |
|--------|-------------|
| `Padrao` | Default size. |
| `Pequeno` | Small. |
| `PequenoMedio` | Small-medium. |
| `MediodPequeno` | Medium-small. |
| `Medio` | Medium. |
| `MedioGrande` | Medium-large. |
| `Grande` | Large. |

```html
<sn-botao ap-tamanho-icone="Pequeno"> ... </sn-botao>
```

### `EnumTamanhoImagem`

Server-side image rendition to load.

Used by: `sn-tamanho-imagem`

| Option | Description |
|--------|-------------|
| `Miniatura` | Thumbnail. |
| `Pequena` | Small. |
| `Media` | Medium. |
| `Grande` | Large. |
| `Impressao` | Print quality (original). |

```html
<sn-controle-imagem sn-tamanho-imagem="Pequena"> ... </sn-controle-imagem>
```

### `EnumTipoAnimacao`

Navigator page-transition animation.

Used by: `ap-tipo-animacao`

| Option | Description |
|--------|-------------|
| `Nenhuma` | No animation. |
| `Deslizante` | Slide transition. |

```html
<sn-navegador ap-tipo-animacao="Deslizante"> ... </sn-navegador>
```

### `EnumTipoBotao`

Visual style of `sn-botao`.

Used by: `sn-tipo-botao`

| Option | Description |
|--------|-------------|
| `Normal` | Standard raised button. |
| `Flat` | Flat button (no elevation/background until hover). |
| `Circulo` | Circular button (icon only). |
| `MiniCirculo` | Small circular button. |
| `Icone` | Icon-only button, no background. |
| `Link` | Rendered as a text link. |
| `LinkDestaque` | Text link with emphasis color. |
| `Menu` | Menu-item styled button. |
| `FlatBox` | Flat button with a boxed/outlined area. |
| `Tab` | Tab-styled button. |

```html
<sn-botao sn-tipo-botao="Icone"> ... </sn-botao>
```

### `EnumTipoCaixa`

Visual style of input boxes.

Used by: `ap-tipo-caixa`, `sn-skip-tab`

| Option | Description |
|--------|-------------|
| `Padrao` | Default (filled/underline) style. |
| `Delineada` | Outlined style (border all around). |

```html
<sn-caixa-texto ap-tipo-caixa="Delineada"> ... </sn-caixa-texto>
```

### `EnumTipoData`

Semantic date category — drives validation range and calendar behaviour of `sn-caixa-data`.

Used by: `sn-tipo-data`

| Option | Description |
|--------|-------------|
| `Normal` | Any date. |
| `DataPassadoFuturoProximo` | Near past or near future. |
| `DataPassadoFuturo` | Past or future. |
| `DataNascimento` | Birth date (past, plausible age range). |
| `DataFuturaProxima` | Near future only. |
| `DataFutura` | Future only. |
| `DataMuitoFutura` | Far future allowed. |
| `DataPassadoRecente` | Recent past only. |
| `DataPassado` | Past only. |
| `DataMuitoPassado` | Far past allowed. |

```html
<sn-caixa-data sn-tipo-data="DataPassado"> ... </sn-caixa-data>
```

### `EnumTipoEntrada`

Input mode / virtual keyboard of a text box (`inputmode`).

Used by: `sn-tipo-entrada`

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

### `EnumTipografia`

Typography scale of the design system.

Used by: `ap-tipografia`

| Option | Description |
|--------|-------------|
| `h1` | Heading 1 (largest). |
| `h2` | Heading 2. |
| `h3` | Heading 3. |
| `h4` | Heading 4. |
| `h5` | Heading 5. |
| `h6` | Heading 6. |
| `h7` | Heading 7 (smallest heading). |
| `Titulo` | Title. |
| `SubTitulo` | Subtitle. |
| `SubTitulo2` | Secondary subtitle. |
| `Normal` | Normal text. |
| `Corpo` | Body text. |
| `Corpo2` | Secondary body text. |
| `Descricao` | Description/caption text. |
| `Descricao2` | Secondary description text. |
| `BotaoCaixaAlta` | Button style, uppercase. |
| `LinhaCaixaAlta` | Line style, uppercase. |

```html
<ap-texto ap-tipografia="SubTitulo"> ... </ap-texto>
```

### `EnumTipoPainel`

Layout algorithm applied by a panel to its children.

Used by: `ap-tipo-painel`

| Option | Description |
|--------|-------------|
| `Bloco` | Normal block flow (children keep their own display). |
| `BlocoVertical` | Block flow, children stacked vertically. |
| `BlocoPilha` | Block-styled stack. |
| `PilhaHorizontal` | Horizontal stack (children side by side). |
| `PilhaVertical` | Vertical stack (children one under another). |
| `PilhaHorizontalCheia` | Horizontal stack stretched to fill the full width (children share it). |
| `PilhaVerticalCheia` | Vertical stack stretched to fill the full height. |
| `PilhaHorizontalEmLinha` | Inline horizontal stack (wraps like inline content). |

```html
<ap-painel ap-tipo-painel="PilhaVertical"> ... </ap-painel>
```

### `EnumTipoPainelAba`

Tab strip visual style.

Used by: `ap-tipo-painel-aba`

| Option | Description |
|--------|-------------|
| `Padrao` | Default style. |
| `MaterialDesign` | Material Design style (ink bar). |

```html
<sn-painel-abas-horizontal ap-tipo-painel-aba="MaterialDesign"> ... </sn-painel-abas-horizontal>
```

### `EnumTonalidade`

Tone/shade of a palette color, Material style: `T100` (lightest) to `T900` (darkest), plus `AlphaNN` transparency variants.

Used by: `ap-tonalidade-fundo`, `ap-tonalidade-texto`, `ap-tonalidade-borda`, `sn-obsoleto-tonalidade`, `sn-obsoleto-tonalidade-fundo`, `sn-obsoleto-tonalidade-texto`, `sn-obsoleto-tonalidade-borda`

| Option | Description |
|--------|-------------|
| `Padrao` | Default tone of the color. |
| `T100` | — |
| `T200` | — |
| `T300` | — |
| `T400` | — |
| `T500` | — |
| `T600` | — |
| `T700` | — |
| `T800` | — |
| `T900` | — |
| `Aplha10` | — |
| `Aplha20` | — |
| `Aplha30` | — |
| `Aplha40` | — |
| `Aplha50` | — |
| `Aplha60` | — |
| `Aplha70` | — |
| `Aplha80` | — |
| `Aplha90` | — |

```html
<ap-bloco ap-tonalidade-fundo="T300"> ... </ap-bloco>
```

### `EnumVisibilidade`

Element visibility.

Used by: `ap-visibilidade`, `sn-visibilidade`

| Option | Description |
|--------|-------------|
| `Visivel` | Visible (default). |
| `Invisivel` | Hidden but still occupies layout space (`visibility: hidden`). |
| `Oculto` | Removed from layout (`display: none`). |

```html
<ap-bloco ap-visibilidade="Oculto"> ... </ap-bloco>
```

---
*Generated 2026-07-03T01:24:23.349Z*
