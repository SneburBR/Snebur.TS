# Snebur.UI Framework Documentation

Reference documentation for **Snebur.UI**, the proprietary TypeScript UI framework used by the Sigi frontend applications.

There are two families of elements:

- **`sn-*` form controls** — buttons, text boxes, comboboxes, lists… They support configuration attributes, **events** (`sn-click`, `sn-valor-alterado`, …) and **data binding** (`sn-bind*`).
- **`ap-*` layout components** — panels, blocks, text, icons… Pure presentation. **Every `ap-*` attribute accepts responsive suffixes** (`--celular`, `--tablet`, `--notebook`, `--desktop` + height variants).

`sn-*` controls **also accept `ap-*` presentation attributes** (width, margins, visibility, …) through the shared presentation-mapping system.

## Summary

| Metric | Count |
|--------|-------|
| Form controls (`sn-`) | 72 |
| Layout components (`ap-`) | 19 |
| Attributes | 215 |
| Events | 14 |
| Bind attributes | 24 |
| Enums | 102 |
| Sigi templates scanned | 817 |

## Reference files

- [ATTRIBUTES.md](ATTRIBUTES.md) — every attribute with type, description and observed values
- [ENUMS.md](ENUMS.md) — every enum with all options
- [QUICKSTART.md](QUICKSTART.md) — hand-written getting-started guide
- `snebur-components-metadata.json` — machine-readable bundle (MCP/tooling)

## Form controls (`sn-*`)

| Tag | Purpose | Used in Sigi |
|-----|---------|--------------|
| [`<sn-aba>`](controls/aba.md) | Tab | 59× |
| [`<sn-ajuda-legenda>`](controls/ajuda-legenda.md) | Help caption | — |
| [`<sn-bloco-template>`](controls/bloco-template.md) | Block item template | 291× |
| [`<sn-bloco-template-selecionado>`](controls/bloco-template-selecionado.md) | Selected block template | 8× |
| [`<sn-bloco-template-separador>`](controls/bloco-template-separador.md) | Block separator template | 12× |
| [`<sn-botao>`](controls/botao.md) | Button | 1434× |
| [`<sn-botao-icone-descricao>`](controls/botao-icone-descricao.md) | Icon + description button | 53× |
| [`<sn-botao-logico>`](controls/botao-logico.md) | Toggle (boolean) button | 13× |
| [`<sn-botao-menu>`](controls/botao-menu.md) | Menu button | 9× |
| [`<sn-botao-menu-item>`](controls/botao-menu-item.md) | Menu item button | 28× |
| [`<sn-cabecalho>`](controls/cabecalho.md) | List header | 1× |
| [`<sn-caixa-area-texto>`](controls/caixa-area-texto.md) | Multi-line text box | 19× |
| [`<sn-caixa-area-texto-sugestao>`](controls/caixa-area-texto-sugestao.md) | Textarea with suggestions | — |
| [`<sn-caixa-ativacao>`](controls/caixa-ativacao.md) | Switch (activation) | — |
| [`<sn-caixa-cartao-credito>`](controls/caixa-cartao-credito.md) | Credit card box | — |
| [`<sn-caixa-data>`](controls/caixa-data.md) | Date box | 16× |
| [`<sn-caixa-hora>`](controls/caixa-hora.md) | Time box | 7× |
| [`<sn-caixa-moeda>`](controls/caixa-moeda.md) | Currency box | 41× |
| [`<sn-caixa-numero>`](controls/caixa-numero.md) | Number box | 80× |
| [`<sn-caixa-pesquisa>`](controls/caixa-pesquisa.md) | Search box | 7× |
| [`<sn-caixa-prazo-tempo>`](controls/caixa-prazo-tempo.md) | Time-span box | — |
| [`<sn-caixa-quantidade>`](controls/caixa-quantidade.md) | Quantity box | 15× |
| [`<sn-caixa-selecao-cor>`](controls/caixa-selecao-cor.md) | Color picker | 13× |
| [`<sn-caixa-senha>`](controls/caixa-senha.md) | Password box | 31× |
| [`<sn-caixa-senha-amostra>`](controls/caixa-senha-amostra.md) | Simple password box | — |
| [`<sn-caixa-slider>`](controls/caixa-slider.md) | Slider | 75× |
| [`<sn-caixa-texto>`](controls/caixa-texto.md) | Text box | 331× |
| [`<sn-caixa-texto-sugestao>`](controls/caixa-texto-sugestao.md) | Text box with suggestions | — |
| [`<sn-checkbox>`](controls/checkbox.md) | Checkbox | 298× |
| [`<sn-coluna-exibir-detalhes>`](controls/coluna-exibir-detalhes.md) | Details toggle column | 18× |
| [`<sn-coluna-personalizada>`](controls/coluna-personalizada.md) | Custom column | 535× |
| [`<sn-coluna-texto>`](controls/coluna-texto.md) | Text column | 213× |
| [`<sn-coluna-titulo>`](controls/coluna-titulo.md) | Column title | — |
| [`<sn-colunas>`](controls/colunas.md) | Grid column collection | 198× |
| [`<sn-combobox>`](controls/combobox.md) | Combobox (entity) | 132× |
| [`<sn-combobox-enum>`](controls/combobox-enum.md) | Combobox (enum) | 50× |
| [`<sn-combobox-item-selecionado>`](controls/combobox-item-selecionado.md) | Combobox selected-item area | — |
| [`<sn-combobox-nn>`](controls/combobox-nn.md) | Combobox N:N | 11× |
| [`<sn-combobox-nn-itens-selecionado>`](controls/combobox-nn-itens-selecionado.md) | Combobox N:N selected items | — |
| [`<sn-combobox-simples>`](controls/combobox-simples.md) | Simple combobox | — |
| [`<sn-controle-imagem>`](controls/controle-imagem.md) | Image control | 38× |
| [`<sn-controle-imagens>`](controls/controle-imagens.md) | Image list control | 16× |
| [`<sn-controle-lista>`](controls/controle-lista.md) | List control | 2× |
| [`<sn-controle-lista-ordenacao>`](controls/controle-lista-ordenacao.md) | Sortable list control | 6× |
| [`<sn-controle-paginacao>`](controls/controle-paginacao.md) | Pagination (alias) | — |
| [`<sn-controle-usuario>`](controls/controle-usuario.md) | User control host | 299× |
| [`<sn-data-lista>`](controls/data-lista.md) | Data grid | 146× |
| [`<sn-data-lista-ordenacao>`](controls/data-lista-ordenacao.md) | Data grid with row reordering | 52× |
| [`<sn-exibir-codigo>`](controls/exibir-codigo.md) | Code viewer | — |
| [`<sn-expandir>`](controls/expandir.md) | Expander | — |
| [`<sn-expandir-conteudo>`](controls/expandir-conteudo.md) | Expander content | — |
| [`<sn-expandir-titulo>`](controls/expandir-titulo.md) | Expander header | — |
| [`<sn-item-selecionado-template>`](controls/item-selecionado-template.md) | Selected-item template (alias) | 16× |
| [`<sn-item-template>`](controls/item-template.md) | Item template | 123× |
| [`<sn-item-template-selecionado>`](controls/item-template-selecionado.md) | Selected-item template | 10× |
| [`<sn-item-template-separador>`](controls/item-template-separador.md) | Item separator template | 1× |
| [`<sn-linha-detalhes>`](controls/linha-detalhes.md) | Row details template | 22× |
| [`<sn-menu>`](controls/menu.md) | Menu | 2× |
| [`<sn-menu-item>`](controls/menu-item.md) | Menu item | 103× |
| [`<sn-menu-sanfona>`](controls/menu-sanfona.md) | Accordion menu | 19× |
| [`<sn-navegador>`](controls/navegador.md) | Navigator (page host) | 29× |
| [`<sn-navegador-principal>`](controls/navegador-principal.md) | Main navigator | 3× |
| [`<sn-paginacao>`](controls/paginacao.md) | Pagination | 2× |
| [`<sn-painel-abas-horizontal>`](controls/painel-abas-horizontal.md) | Tab panel (horizontal) | 12× |
| [`<sn-painel-lista>`](controls/painel-lista.md) | List panel | 247× |
| [`<sn-painel-lista-ordenacao>`](controls/painel-lista-ordenacao.md) | Sortable list panel | 10× |
| [`<sn-painel-lista-selecao>`](controls/painel-lista-selecao.md) | Selection list panel | 2× |
| [`<sn-progresso>`](controls/progresso.md) | Progress bar | 8× |
| [`<sn-progresso-circulo>`](controls/progresso-circulo.md) | Circular progress | 3× |
| [`<sn-proxima-pagina>`](controls/proxima-pagina.md) | Next-page loader | — |
| [`<sn-radio>`](controls/radio.md) | Radio group | 110× |
| [`<sn-rodape>`](controls/rodape.md) | List footer | 1× |

## Layout components (`ap-*`)

| Tag | Purpose | Used in Sigi |
|-----|---------|--------------|
| [`<ap-bloco>`](components/bloco.md) | Block | 4100× |
| [`<ap-bloco-animado>`](components/bloco-animado.md) | Animated block | 2× |
| [`<ap-bloco-cabecalho>`](components/bloco-cabecalho.md) | Block header | 2× |
| [`<ap-bloco-item>`](components/bloco-item.md) | Block item | 63× |
| [`<ap-bloco-lista-carregando>`](components/bloco-lista-carregando.md) | Loading-list block | 1× |
| [`<ap-bloco-lista-vazia>`](components/bloco-lista-vazia.md) | Empty-list block | 8× |
| [`<ap-cabecalho>`](components/cabecalho.md) | Header region | 348× |
| [`<ap-coluna>`](components/coluna.md) | Column | 318× |
| [`<ap-direita>`](components/direita.md) | Right region | 19× |
| [`<ap-esquerda>`](components/esquerda.md) | Left region | 17× |
| [`<ap-estilo-itens>`](components/estilo-itens.md) | Item styles | 28× |
| [`<ap-icone>`](components/icone.md) | Icon | 190× |
| [`<ap-linha>`](components/linha.md) | Row | 622× |
| [`<ap-painel>`](components/painel.md) | Panel | 2255× |
| [`<ap-painel-horizontal>`](components/painel-horizontal.md) | Horizontal panel | 123× |
| [`<ap-painel-vertical>`](components/painel-vertical.md) | Vertical panel | 446× |
| [`<ap-paragrafo>`](components/paragrafo.md) | Paragraph | 6× |
| [`<ap-rodape>`](components/rodape.md) | Footer region | 185× |
| [`<ap-texto>`](components/texto.md) | Text | 2749× |

---
*Generated 2026-07-03T01:24:23.349Z — Snebur.UI docs generator v2.0.0*
