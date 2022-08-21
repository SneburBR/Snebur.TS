

namespace Snebur.UI
{
    export const $ElementosControle = new Snebur.DicionarioSimples<Snebur.UI.RegistroElementoControle>();
    export const TAG_CONTROLE_USUARIO: string = "SN-CONTROLE-USUARIO";

    //ControleUsuario
    $ElementosControle.Add("SN-CONTROLE-USUARIO", new RegistroElementoControle("SN-CONTROLE-USUARIO", "DIV", ControleUsuario, HTMLDivElement));

    //Outros
    $ElementosControle.Add("SN-NAVEGADOR", new RegistroElementoControle("SN-NAVEGADOR", "DIV", Navegador, HTMLDivElement));
    $ElementosControle.Add("SN-NAVEGADOR-PRINCIPAL", new RegistroElementoControle("SN-NAVEGADOR-PRINCIPAL", "DIV", NavegadorPrincipal, HTMLDivElement));

    //Comuns
    $ElementosControle.Add("SN-BOTAO", new RegistroElementoControle("SN-BOTAO", "BUTTON", Botao, HTMLButtonElement));
    $ElementosControle.Add("SN-BOTAO-LOGICO", new RegistroElementoControle("SN-BOTAO-LOGICO", "BUTTON", BotaoLogico, HTMLButtonElement));
    $ElementosControle.Add("SN-BOTAO-MENU", new RegistroElementoControle("SN-BOTAO-MENU", "BUTTON", BotaoMenu, HTMLDivElement));
    $ElementosControle.Add("SN-BOTAO-MENU-ITEM", new RegistroElementoControle("SN-BOTAO-MENU-ITEM", "BUTTON", BotaoMenuItem, HTMLDivElement));
    $ElementosControle.Add("SN-BOTAO-ICONE-DESCRICAO", new RegistroElementoControle("SN-BOTAO-ICONE-DESCRICAO", "BUTTON", BotaoIconeDescricao, HTMLButtonElement));

    $ElementosControle.Add("SN-PROGRESSO", new RegistroElementoControle("SN-PROGRESSO", "DIV", Progresso, HTMLDivElement));
    $ElementosControle.Add("SN-PROGRESSO-CIRCULO", new RegistroElementoControle("SN-PROGRESSO-CIRCULO", "DIV", ProgressoCirculo, HTMLDivElement));

    $ElementosControle.Add("SN-CONTROLE-IMAGEM", new RegistroElementoControle("SN-CONTROLE-IMAGEM", "DIV", ControleImagem, HTMLDivElement));
    $ElementosControle.Add("SN-CONTROLE-IMAGENS", new RegistroElementoControle("SN-CONTROLE-IMAGENS", "DIV", ControleImagens, HTMLDivElement));
    $ElementosControle.Add("SN-MENU", new RegistroElementoControle("SN-MENU", "DIV", Menu, HTMLDivElement));
    $ElementosControle.Add("SN-MENU-SANFONA", new RegistroElementoControle("SN-MENU-SANFONA", "DIV", MenuSanfona, HTMLDivElement));
    $ElementosControle.Add("SN-MENU-ITEM", new RegistroElementoControle("SN-MENU-ITEM", "DIV", MenuItem, HTMLDivElement));
    $ElementosControle.Add("SN-CAIXA-SELECAO-COR", new RegistroElementoControle("SN-CAIXA-SELECAO-COR", "DIV", CaixaSelecaoCor, HTMLDivElement));
    $ElementosControle.Add("SN-AJUDA-LEGENDA", new RegistroElementoControle("SN-AJUDA-LEGENDA", "div", AjudaLegenda, HTMLDivElement));
    

    $ElementosControle.Add("SN-EXIBIR-CODIGO", new RegistroElementoControle("SN-EXIBIR-CODIGO", "div", ExibirCodigo, HTMLDivElement));

    $ElementosControle.Add("SN-PAINEL-ABAS-HORIZONTAL", new RegistroElementoControle("SN-PAINEL-ABAS-HORIZONTAL", "div", PainelAbasHorizontal, HTMLDivElement));
    $ElementosControle.Add("SN-ABA", new RegistroElementoControle("SN-ABA", "div", Aba, HTMLDivElement));
     
    //expandir
    $ElementosControle.Add("SN-EXPANDIR", new RegistroElementoControle("SN-EXPANDIR", "div", Expandir, HTMLDivElement));
    $ElementosControle.Add("SN-EXPANDIR-TITULO", new RegistroElementoControle("SN-EXPANDIR-TITULO", "div", ExpandirTitulo, HTMLDivElement));
    $ElementosControle.Add("SN-EXPANDIR-CONTEUDO", new RegistroElementoControle("SN-EXPANDIR-CONTEUDO", "div", ExpandirConteudo, HTMLDivElement));
     
    //Template
    $ElementosControle.Add("SN-ITEM-TEMPLATE", new RegistroElementoControle("SN-ITEM-TEMPLATE", "DIV", ItemTemplate, HTMLDivElement));
    $ElementosControle.Add("SN-ITEM-TEMPLATE-SELECIONADO", new RegistroElementoControle("SN-ITEM-TEMPLATE-SELECIONADO", "DIV", ItemTemplateSelecionado, HTMLDivElement));
    $ElementosControle.Add("SN-ITEM-SELECIONADO-TEMPLATE", new RegistroElementoControle("SN-ITEM-SELECIONADO-TEMPLATE", "DIV", ItemTemplateSelecionado, HTMLDivElement));

    $ElementosControle.Add("SN-ITEM-TEMPLATE-SEPARADOR", new RegistroElementoControle("SN-ITEM-TEMPLATE-SEPARADOR", "DIV", SeparadorTemplate, HTMLDivElement));

    //Formulário
    $ElementosControle.Add("SN-CAIXA-TEXTO", new RegistroElementoControle("SN-CAIXA-TEXTO", "DIV", CaixaTexto, HTMLDivElement));
    $ElementosControle.Add("SN-CAIXA-AREA-TEXTO", new RegistroElementoControle("SN-CAIXA-AREA-TEXTO", "DIV", CaixaAreaTexto, HTMLDivElement));
    $ElementosControle.Add("SN-CAIXA-DATA", new RegistroElementoControle("SN-CAIXA-DATA", "DIV", CaixaData, HTMLDivElement));
    //$ElementosControle.Add("SN-CAIXA-INTERRUPTOR", new RegistroElementoControle("SN-CAIXA-INTERRUPTOR", "DIV", CaixaInterruptor, HTMLDivElement));
    $ElementosControle.Add("SN-CAIXA-MOEDA", new RegistroElementoControle("SN-CAIXA-MOEDA", "DIV", CaixaMoeda, HTMLDivElement));
    $ElementosControle.Add("SN-CAIXA-NUMERO", new RegistroElementoControle("SN-CAIXA-NUMERO", "DIV", CaixaNumero, HTMLDivElement));
    $ElementosControle.Add("SN-CAIXA-QUANTIDADE", new RegistroElementoControle("SN-CAIXA-QUANTIDADE", "DIV", CaixaQuantidade, HTMLDivElement));
    $ElementosControle.Add("SN-CAIXA-SENHA", new RegistroElementoControle("SN-CAIXA-SENHA", "DIV", CaixaSenha, HTMLDivElement));
    $ElementosControle.Add("SN-CAIXA-SENHA-AMOSTRA", new RegistroElementoControle("SN-CAIXA-SENHA-SIMPLES", "DIV", CaixaSenhaSimples, HTMLDivElement));
    $ElementosControle.Add("SN-CAIXA-SLIDER", new RegistroElementoControle("SN-CAIXA-SLIDER", "DIV", CaixaSlider, HTMLDivElement));
    
    $ElementosControle.Add("SN-CAIXA-PESQUISA", new RegistroElementoControle("SN-CAIXA-PESQUISA", "DIV", CaixaPesquisa, HTMLDivElement));

    $ElementosControle.Add("SN-CAIXA-HORA", new RegistroElementoControle("SN-CAIXA-HORA", "DIV", CaixaHora, HTMLDivElement));

    $ElementosControle.Add("SN-CAIXA-CARTAO-CREDITO", new RegistroElementoControle("SN-CAIXA-CARTAO-CREDITO", "DIV", CaixaCartaoCredito, HTMLDivElement));

    $ElementosControle.Add("SN-CAIXA-TEXTO-SUGESTAO", new RegistroElementoControle("SN-CAIXA-TEXTO-SUGESTAO", "DIV", CaixaTextoSugestao, HTMLDivElement));
    $ElementosControle.Add("SN-CAIXA-AREA-TEXTO-SUGESTAO", new RegistroElementoControle("SN-CAIXA-AREA-TEXTO-SUGESTAO", "DIV", CaixaAreaTextoSugestao, HTMLDivElement));

    $ElementosControle.Add("SN-CAIXA-ATIVACAO", new RegistroElementoControle("SN-CAIXA-ATIVACAO", "DIV", CaixaAtivacao, HTMLDivElement));
    $ElementosControle.Add("SN-CHECKBOX", new RegistroElementoControle("SN-CHECKBOX", "DIV", Checkbox, HTMLDivElement));

    //tipos complexos
    $ElementosControle.Add("SN-CAIXA-PRAZO-TEMPO", new RegistroElementoControle("SN-CAIXA-PRAZO-TEMPO", "DIV", CaixaPrazoTempo, HTMLDivElement));


    $ElementosControle.Add("SN-COMBOBOX", new RegistroElementoControle("SN-COMBOBOX", "DIV", ComboBox, HTMLDivElement));
    $ElementosControle.Add("SN-COMBOBOX-ITEM-SELECIONADO", new RegistroElementoControle("SN-COMBOBOX-ITEM-SELECIONADO", "DIV", ComboBoxItemSelecionado, HTMLDivElement));
    $ElementosControle.Add("SN-COMBOBOX-NN", new RegistroElementoControle("SN-COMBOBOX-NN", "DIV", ComboBoxNn, HTMLDivElement));
    $ElementosControle.Add("SN-COMBOBOX-NN-ITENS-SELECIONADO", new RegistroElementoControle("SN-COMBOBOX-NN-ITENS-SELECIONADO", "DIV", ComboBoxNnItensSelecionado, HTMLDivElement));
    $ElementosControle.Add("SN-COMBOBOX-ENUM", new RegistroElementoControle("SN-COMBOBOX-ENUM", "DIV", ComboBoxEnum, HTMLDivElement));
    $ElementosControle.Add("SN-RADIO", new RegistroElementoControle("SN-RADIO", "DIV", Radio, HTMLDivElement));

    //Formulários - TipoComplexao
    //$ElementosControle.Add("SN-CAIXA-TAMANHO", new RegistroElementoControle("SN-COMBOBOX-ENUM", "DIV", CaixaTamanho, HTMLDivElement));

    ////BaseControleLista
    $ElementosControle.Add("SN-PAGINACAO", new RegistroElementoControle("SN-PAGINACAO", "DIV", ControlePaginacao, HTMLDivElement));    
    $ElementosControle.Add("SN-PROXIMA-PAGINA", new RegistroElementoControle("SN-PROXIMA-PAGINA", "DIV", ControleProximaPagina, HTMLDivElement));
    $ElementosControle.Add("SN-CABECALHO", new RegistroElementoControle("SN-CABECALHO", "DIV", Cabecalho, HTMLDivElement));
    $ElementosControle.Add("SN-RODAPE", new RegistroElementoControle("SN-RODAPE", "DIV", Rodape, HTMLDivElement));

    //ControleLista
    $ElementosControle.Add("SN-CONTROLE-LISTA", new RegistroElementoControle("SN-CONTROLE-LISTA", "DIV", ControleLista, HTMLDivElement));
    $ElementosControle.Add("SN-CONTROLE-LISTA-ORDENACAO", new RegistroElementoControle("SN-CONTROLE-LISTA-ORDENACAO", "DIV", ControleListaOrdenacao, HTMLDivElement));

    //DATA-LISTA
    $ElementosControle.Add("SN-DATA-LISTA", new RegistroElementoControle("SN-DATA-LISTA", "DIV", DataLista, HTMLDivElement));
    $ElementosControle.Add("SN-DATA-LISTA-ORDENACAO", new RegistroElementoControle("SN-DATA-LISTA-ORDENACAO", "DIV", DataListaOrdenacao, HTMLDivElement));
    $ElementosControle.Add("SN-COLUNAS", new RegistroElementoControle("SN-COLUNAS", "DIV", TemplateColunasColecao, HTMLDivElement));

    $ElementosControle.Add("SN-COLUNA-EXIBIR-DETALHES", new RegistroElementoControle("SN-COLUNA-EXIBIR-DETALHES", "DIV", TemplateColunaExibirDetalhes, HTMLDivElement));
    $ElementosControle.Add("SN-COLUNA-TEXTO", new RegistroElementoControle("SN-COLUNA-TEXTO", "DIV", TemplateColunaTexto, HTMLDivElement));
    $ElementosControle.Add("SN-COLUNA-PERSONALIZADA", new RegistroElementoControle("SN-COLUNA-PERSONALIZADA", "DIV", TemplateColunaPersonalizada, HTMLDivElement));
    $ElementosControle.Add("SN-COLUNA-TITULO", new RegistroElementoControle("SN-COLUNA-TITULO", "DIV", TemplateTiluloColuna, HTMLDivElement));

    $ElementosControle.Add("SN-LINHA-DETALHES", new RegistroElementoControle("SN-LINHA-DETALHES", "DIV", TemplateLinhaDetalhes, HTMLDivElement));

    $ElementosControle.Add("SN-COMBOBOX-SIMPLES", new RegistroElementoControle("SN-COMBOBOX-SIMPLES", "DIV", ComboBoxSimples, HTMLDivElement));


    $ElementosControle.Add("SN-PAINEL-LISTA", new RegistroElementoControle("SN-PAINEL-LISTA", "DIV", PainelLista, HTMLDivElement));
    $ElementosControle.Add("SN-PAINEL-LISTA-ORDENACAO", new RegistroElementoControle("SN-PAINEL-LISTA-ORDENACAO", "DIV", PainelListaOrdenacao, HTMLDivElement));
    $ElementosControle.Add("SN-BLOCO-TEMPLATE", new RegistroElementoControle("SN-BLOCO-TEMPLATE", "DIV", BlocoTemplate, HTMLDivElement));
    $ElementosControle.Add("SN-BLOCO-TEMPLATE-SEPARADOR", new RegistroElementoControle("SN-BLOCO-TEMPLATE-SEPARADOR", "DIV", BlocoTemplateSeparador, HTMLDivElement));
    

    $ElementosControle.Add("SN-PAINEL-LISTA-SELECAO", new RegistroElementoControle("SN-PAINEL-LISTA", "DIV", PainelListaSelecao, HTMLDivElement));
    $ElementosControle.Add("SN-BLOCO-TEMPLATE-SELECIONADO", new RegistroElementoControle("SN-BLOCO-TEMPLATE-SELECIONADO", "DIV", BlocoTemplateSelecionado, HTMLDivElement));

    $ElementosControle.Add("SN-CONTROLE-PAGINACAO", new RegistroElementoControle("SN-CONTROLE-PAGINACAO", "DIV", ControlePaginacao, HTMLDivElement));

}
 