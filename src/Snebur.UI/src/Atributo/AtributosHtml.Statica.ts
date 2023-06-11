namespace Snebur.UI
{
    export class AtributosHtml
    {
        
        //#region controle apresentação 
        //debug
        public static readonly IsPontilharAreas = new AtributoHtml("sn-is-pontilhar-areas", Boolean);
        
        public static readonly IsEditar = new AtributoHtml("sn-is-editar", Boolean);
        public static readonly IsMarcarLinha = new AtributoHtml("sn-is-marcar-linha", Boolean);
        public static readonly IsMarcarItem = new AtributoHtml("sn-is-marcar-item", Boolean);

        //#endregion

        //#region Compartilhado

        public static readonly PrefixoPropriedadeSnebur = new AtributoHtml("sn-prop-", Boolean);
        public static readonly Tags = new AtributoHtml("sn-tags", String);

        //#endregion

        //#region Componente apresentação

        //public static CorAP = new AtributoHtml("ap-cor", Snebur.UI.EnumCor);
        public static readonly CorFundoApresentacao = new AtributoHtml("ap-cor-fundo", Snebur.UI.EnumCor);
        public static readonly CorFundoDebugApresentacao = new AtributoHtml("ap-cor-fundo-debug", Snebur.UI.EnumCor);
        public static readonly CorTextoApresentacao = new AtributoHtml("ap-cor-texto", Snebur.UI.EnumCor);
        //public static readonly CorIconeApresentacao = new AtributoHtml("ap-cor-icone", Snebur.UI.EnumCor);
        public static readonly CorBordaApresentacao = new AtributoHtml("ap-cor-borda", Snebur.UI.EnumCor);

        //public static TonalidadeAP = new AtributoHtml("ap-tonalidade", Snebur.UI.EnumTonalidade);
        public static readonly TonalidadeFundoApresentacao = new AtributoHtml("ap-tonalidade-fundo", Snebur.UI.EnumTonalidade);
        public static readonly TonalidadeTextoApresentacao = new AtributoHtml("ap-tonalidade-texto", Snebur.UI.EnumTonalidade);
        //public static readonly TonalidadeIconeApresentacao = new AtributoHtml("ap-tonalidade-icone", Snebur.UI.EnumTonalidade);
        public static readonly TonalidadeBordaApresentacao = new AtributoHtml("ap-tonalidade-borda", Snebur.UI.EnumTonalidade);

        public static readonly LarguraApresentacao = new AtributoHtml("ap-largura", Snebur.UI.EnumLargura);
        public static readonly LarguraMinimaApresentacao = new AtributoHtml("ap-largura-minima", Snebur.UI.EnumLargura);
        public static readonly LarguraMaximaApresentacao = new AtributoHtml("ap-largura-maxima", Snebur.UI.EnumLargura);

        public static readonly AlturaApresentacao = new AtributoHtml("ap-altura", Snebur.UI.EnumAltura);
        public static readonly AlturaMinimaApresentacao = new AtributoHtml("ap-altura-minima", Snebur.UI.EnumAltura);
        public static readonly AlturaMaximaApresentacao = new AtributoHtml("ap-altura-maxima", Snebur.UI.EnumAltura);

        //public static LarguraBloco = new AtributoHtml("ap-largura-bloco", Snebur.UI.EnumLarguraBloco);
        public static readonly AlturaLinha = new AtributoHtml("ap-altura-linha", Snebur.UI.EnumAlturaLinha);

        public static readonly VisibilidadeApresentacao = new AtributoHtml("ap-visibilidade", Snebur.UI.EnumVisibilidade);

        //public static readonly Margem = new AtributoHtml("ap-margem", Snebur.UI.EnumDistanciaMargem);
        //public static readonly MargemInterna = new AtributoHtml("ap-margem-interna", Snebur.UI.EnumDistanciaMargem);
        public static readonly Margem = new AtributoHtml("ap-margem", String);
        public static readonly MargemInterna = new AtributoHtml("ap-margem-interna", String);

        public static readonly AlinhamentoHorizontal = new AtributoHtml("ap-alinhamento-horizontal", Snebur.UI.EnumAlinhamentoHorizontal);
        public static readonly AlinhamentoVertical = new AtributoHtml("ap-alinhamento-vertical", Snebur.UI.EnumAlinhamentoVertical);

        public static readonly Borda = new AtributoHtml("ap-borda", Snebur.UI.EnumDistanciaMargem);

        //painéis
        public static readonly TipoPainel = new AtributoHtml("ap-tipo-painel", Snebur.UI.EnumTipoPainel);

        public static readonly BarraRolagem = new AtributoHtml("ap-barra-rolagem", Snebur.UI.EnumBarraRolagem);
        public static readonly BarraRolagemHorizontal = new AtributoHtml("ap-barra-rolagem-horizontal", Snebur.UI.EnumBarraRolagem);
        public static readonly BarraRolagemVertical = new AtributoHtml("ap-barra-rolagem-vertical", Snebur.UI.EnumBarraRolagem);

        //tipografia
        public static readonly Mostrar = new AtributoHtml("ap-mostrar", Snebur.UI.EnumMostrar);
        public static readonly Tipografia = new AtributoHtml("ap-tipografia", Snebur.UI.EnumTipografia);
        public static readonly PesoFonte = new AtributoHtml("ap-peso-fonte", Snebur.UI.EnumPesoFonte);
        public static readonly Fonte = new AtributoHtml("ap-fonte", Snebur.UI.EnumFonte);
        public static readonly Quebrar = new AtributoHtml("ap-quebrar", Snebur.UI.EnumQuebrar);


        //texto
        public static readonly AlinhamentoTexto = new AtributoHtml("ap-alinhamento-texto", Snebur.UI.EnumAlinhamentoTexto);

        //ícone
        public static readonly Icone = new AtributoHtml("ap-icone", Snebur.UI.EnumIcone);
        public static readonly IconeCategoria = new AtributoHtml("ap-icone-categoria", Snebur.UI.EnumIconeCategoria);
        public static readonly TamanhoIcone = new AtributoHtml("ap-tamanho-icone", Snebur.UI.EnumTamanhoIcone);

        public static readonly IconeExpandir = new AtributoHtml("ap-icone-expandir", Snebur.UI.EnumIcone);
        public static readonly IconeEncolher = new AtributoHtml("ap-icone-encolher", Snebur.UI.EnumIcone);

        public static readonly TituloEncolher = new AtributoHtml("ap-titulo-encolher", Snebur.UI.EnumIcone);
        public static readonly TituloExpandir = new AtributoHtml("ap-titulo-expandir", Snebur.UI.EnumIcone);

        //controle apresentação
        public static readonly RotuloApresentacao = new AtributoHtml("ap-rotulo", String);

        //formulários
        public static readonly TipoCaixa = new AtributoHtml("ap-tipo-caixa", Snebur.UI.EnumTipoCaixa);
        public static readonly SkipTab = new AtributoHtml("sn-skip-tab", Snebur.UI.EnumTipoCaixa);

         
        //#endregion
         
        //public static Lacuna = new AtributoHtml("ap-lacuna", Snebur.UI.EnumDistanciaMargem);

        //cores
        public static readonly Cor = new AtributoHtml("sn-obsoleto-cor", Snebur.UI.EnumCor);
        public static readonly CorFundo = new AtributoHtml("sn-obsoleto-cor-fundo", Snebur.UI.EnumCor);
        public static readonly CorTexto = new AtributoHtml("sn-obsoleto-cor-texto", Snebur.UI.EnumCor);
        //public static readonly CorIcone = new AtributoHtml("sn-obsoleto-cor-icone", Snebur.UI.EnumCor);
        public static readonly CorBorda = new AtributoHtml("sn-obsoleto-cor-borda", Snebur.UI.EnumCor);

        public static readonly Tonalidade = new AtributoHtml("sn-obsoleto-tonalidade", Snebur.UI.EnumTonalidade);
        public static readonly TonalidadeFundo = new AtributoHtml("sn-obsoleto-tonalidade-fundo", Snebur.UI.EnumTonalidade);
        public static readonly TonalidadeTexto = new AtributoHtml("sn-obsoleto-tonalidade-texto", Snebur.UI.EnumTonalidade);
        //public static readonly TonalidadeIcone = new AtributoHtml("sn-obsoleto-tonalidade-icone", Snebur.UI.EnumTonalidade);
        public static readonly TonalidadeBorda = new AtributoHtml("sn-obsoleto-tonalidade-borda", Snebur.UI.EnumTonalidade);

        public static readonly Visibilidade = new AtributoHtml("sn-visibilidade", Snebur.UI.EnumVisibilidade);

        //public static readonly AlturaZS = new AtributoHtml("sn-obsoleto-altura", Number);
        //public static readonly LarguraZS = new AtributoHtml("sn-obsoleto-largura", Number);
         
        //Comuns
        public static readonly Nome = new AtributoHtml("sn-nome", String);
        //public static readonly NomeElemento = new AtributoHtml("sn-nome-elemento", String);
        public static readonly Construtor = new AtributoHtml("sn-construtor", String);
        public static readonly Tipo = new AtributoHtml("sn-tipo", String);
        public static readonly TipoItem = new AtributoHtml("sn-tipo-item", String);
        public static readonly Titulo = new AtributoHtml("sn-titulo", String);
        public static readonly Legenda = new AtributoHtml("sn-legenda", String);
        public static readonly Mensagem = new AtributoHtml("sn-mensagem", String);
        public static readonly Exibicao = new AtributoHtml("sn-exibicao", String);

        public static readonly LarguraItem = new AtributoHtml("sn-largura-item", String);

        //public static Orientacao = new AtributoHtml("sn-orientacao", Snebur.Dominio.EnumOrientacao)
        //public static CssClasse = new AtributoHtml("sn-css-class", String);

        //ROTULO
        public static readonly Rotulo = new AtributoHtml("sn-rotulo", String);
        public static readonly RotuloFlutuante = new AtributoHtml("sn-rotulo-flutuante", String);

        public static readonly IsRotuloVazio = new AtributoHtml("sn-is-rotulo-vazio", Boolean);
        public static readonly IsRotuloFlutuante = new AtributoHtml("sn-is-rotulo-flutuante", Boolean);
                 
        //validação
        public static readonly DestinoMensagemValidacao = new AtributoHtml("sn-destino-mensagem-validacao", String);
        public static readonly ManterEspacoMensagemValidacao = new AtributoHtml("sn-manter-espaco-mensagem-validacao", Boolean);
        public static readonly MensagemValidacaoFlutuante = new AtributoHtml("sn-mensagem-validacao-flutuante", Boolean);

        public static readonly Grupo = new AtributoHtml("sn-grupo", String);

        public static readonly PosicaoRotulo = new AtributoHtml("sn-posicao-rotulo", Snebur.UI.EnumPosicao);
        public static readonly Minimo = new AtributoHtml("sn-minimo", Number);
        public static readonly Maximo = new AtributoHtml("sn-maximo", Number);
        public static readonly MaxLength = new AtributoHtml("sn-maxlength", Number);
        public static readonly IsMostrarContadorCaracteres = new AtributoHtml("sn-is-mostrar-contador-caracteres", Boolean);
        public static readonly IsNaoPermitirValorZero = new AtributoHtml("sn-is-nao-permitir-zero", Boolean);
        public static readonly IsNaoFormatarValorVazio = new AtributoHtml("sn-is-nao-formatar-valor-vazio", Boolean);
         
        public static readonly Passo = new AtributoHtml("sn-passo", String);
        public static readonly PassoLargo = new AtributoHtml("sn-passo-largo", String);
        public static readonly MostrarValor = new AtributoHtml("sn-mostrar-valor", Boolean);
        public static readonly Parametros = new AtributoHtml("sn-parametros", String);
        public static readonly LarguraTextoValor = new AtributoHtml("sn-largura-texto-valor", String);

        public static readonly Consulta = new AtributoHtml("sn-consulta", String);
        public static readonly ConsultaAsync = new AtributoHtml("sn-consulta-await", String);
        public static readonly RelacoesAberta = new AtributoHtml("sn-relacoes-aberta", String);
        public static readonly Normalizar = new AtributoHtml("sn-normalizar", String);
        public static readonly ConultarTipoAutomaticamente = new AtributoHtml("sn-consultar-tipo-automaticamente", String);

        public static readonly MetodoSalvarEntidadesOrdenada = new AtributoHtml("sn-metodo-salvar-entidades-ordenada", String);
        

        //Controle
        public static readonly Controle = new AtributoHtml("sn-controle", String);
        public static readonly ItemElemento = new AtributoHtml("sn-item-elemento", String);
        public static readonly NaoEntrarArvore = new AtributoHtml("sn-nao-entrar-arvore", String);
        public static readonly IsControleFlutuante = new AtributoHtml("sn-is-controle-flutuante", String);
        public static readonly InicializacaoPropriedades = new AtributoHtml("sn-inicializacao-propriedades", String);
        public static readonly ControleGenerico = new AtributoHtml("sn-controle-generico", String);
        public static readonly Desabilitar = new AtributoHtml("sn-desabilitar", Boolean);
        public static readonly Selecionado = new AtributoHtml("sn-selecionado", Boolean);

        public static readonly ValidarSempre = new AtributoHtml("sn-validar-sempre", Boolean);
        public static readonly IsSenhaMd5 = new AtributoHtml("sn-is-senha-md5", Boolean);
        public static readonly IgnorarValidacao = new AtributoHtml("sn-ignorar-validacao", Boolean);
        public static readonly ValidarValorPropriedadeAlterado = new AtributoHtml("sn-validar-valor-propriedade-alterado", Boolean);
         
        //Controle flutuante
        public static readonly Flutuante = new AtributoHtml("sn-flutuante", Boolean);
        public static readonly DestinoControleFlutuante = new AtributoHtml("sn-destino-controle-flutuante", Snebur.UI.EnumDestinoControleFlutuante);

        //combobox readonly
        public static readonly PermitirLimpar = new AtributoHtml("sn-permitir-limpar", Boolean);

        public static readonly IsSomenteLeitura = new AtributoHtml("sn-somente-leitura", Boolean);
        public static readonly IsAtualizarDigitando = new AtributoHtml("sn-is-atualizar-digitando", Boolean);
        public static readonly DesativarAutoCompletar = new AtributoHtml("sn-desativar-auto-completar", Boolean);
         
        //Controle ordenação
        public static readonly SensibilidadeVertical = new AtributoHtml("sn-sensibilidade-vertical", Boolean);
        //public static AnimacaoOrdenacaoSimples = new AtributoHtml("sn-animacao-ordenacao-simples", Boolean);

        public static readonly SentidoOrdenacao = new AtributoHtml("sn-sentido-ordenacao", Snebur.Dominio.EnumSentidoOrdenacao);
        public static readonly IsSalvarOrdenacaoAutomaticamente = new AtributoHtml("sn-is-salvar-ordenacao-automaticamente", Boolean);
        public static readonly IsAnimarOrdenacao = new AtributoHtml("sn-is-animar-ordenacao", Boolean);
        public static readonly EntidadeOrdenacao = new AtributoHtml("sn-entidade-ordenacao", String);
        public static readonly IsAlvoOrdenacao = new AtributoHtml("sn-is-alvo-ordenacao", Boolean);
        public static readonly IsElementoPrincipalAlvoOrdenacao = new AtributoHtml("sn-is-elemento-principal-alvo-ordenacao", Boolean);
        public static readonly IsCloneGlobal = new AtributoHtml("sn-is-clone-global", Boolean);


        public static readonly CssClassElementoClonado = new AtributoHtml("sn-css-class-elemento-clonado", String);
        public static readonly FuncaoNormalizarElementoClonado = new AtributoHtml("sn-funcao-normalizar-elemento-clonado", String);
        public static readonly DebugNaoRemoverElementoCloando = new AtributoHtml("sn-debug-nao-remover-elemento-clonado", String);

        //abas
        public static readonly IsCarregarAbaInicial = new AtributoHtml("sn-carregar-aba-inicial", Boolean);
        public static readonly IsAbasCheia = new AtributoHtml("sn-is-abas-cheia", Boolean);
        public static readonly IsFuncaoPodeNavegarAba = new AtributoHtml("sn-funcao-is-pode-navegar-aba", String);
        public static readonly TipoPainelAba = new AtributoHtml("ap-tipo-painel-aba", EnumTipoPainelAba);
        
        //Botão
        public static readonly TipoBotao = new AtributoHtml("sn-tipo-botao", Snebur.UI.EnumTipoBotao);
        public static readonly Multiselecao = new AtributoHtml("sn-multiselecao", Boolean);
        public static readonly Accept = new AtributoHtml("sn-accept", String);
        public static readonly LinkRota = new AtributoHtml("sn-link-rota", String);

        //Botão logico

        public static readonly CssClassBotaoLogicoVerdadeiro = new AtributoHtml("sn-css-class-botao-logico-verdadeiro", Boolean);
        public static readonly CssClassBotaoLogicoFalso = new AtributoHtml("sn-css-class-botao-logico-falso", Boolean);
        public static readonly Valor = new AtributoHtml("sn-valor", String);

        //Imagem,
        public static readonly TamanhoImagem = new AtributoHtml("sn-tamanho-imagem", Snebur.Dominio.EnumTamanhoImagem);
        public static readonly PreenchimentoImagem = new AtributoHtml("sn-preenchimento-imagem", Snebur.Dominio.EnumPreenchimentoImagem);
        public static readonly FiltroImagem = new AtributoHtml("sn-filtro-imagem", Snebur.Dominio.EnumPreenchimentoImagem);
        public static readonly IsCache = new AtributoHtml("sn-is-cache", Boolean);

        public static readonly IsFuncaoPodeAtivar = new AtributoHtml("sn-funcao-is-pode-ativar", String);

        //public static CssClasseElementoImagem = new AtributoHtml("sn-css-class-elemento-imagem", String);

        //ControleLista
        public static readonly TagElementoItensColecao = new AtributoHtml("sn-tag-elemento-itens-colecao", String);
        public static readonly TagElementoItemTemplate = new AtributoHtml("sn-tag-elemento-item-template", String);
        public static readonly CssClassElementoItensColecao = new AtributoHtml("sn-css-class-elemento-itens-colecao", String);
        public static readonly Virtualizar = new AtributoHtml("sn-virtualizar", Boolean);
        /*public static readonly ClasseSeparadora = new AtributoHtml("sn-classe-separadora", Boolean);*/

        //Paginação
        public static readonly MaximoPaginas = new AtributoHtml("sn-maximo-paginas", String);
        public static readonly RegistroPorPagina = new AtributoHtml("sn-registros-por-pagina", String);
        public static readonly PaginacaoDescricaoItem = new AtributoHtml("sn-paginacao-descricao-item", String);
        public static readonly PaginacaoDescricaoItens = new AtributoHtml("sn-paginacao-descricao-itens", String);

        //DataLista
        public static readonly AtivarOrdenacao = new AtributoHtml("sn-ativar-ordenacao", Boolean);
        public static readonly DesativarEfeitoHover = new AtributoHtml("sn-desativar-efeito-hover", Boolean);
        public static readonly LinhaDetalhesExpandida = new AtributoHtml("sn-linha-detalhes-expandida", Event);
        public static readonly LinhaClick = new AtributoHtml("sn-linha-click", Event);

        //Expandir
        public static readonly ConteudoExpandido = new AtributoHtml("sn-conteudo-expandido", Event);

        //Eventos
        public static readonly Click = new AtributoHtml("sn-click", Event);
        public static readonly Enter = new AtributoHtml("sn-enter", Event);
        public static readonly ClickAsync = new AtributoHtml("sn-click-async", Event);
         
        //public static DuploClick = new AtributoHtml("sn-duplo-click", Event);
        public static readonly ItemClick = new AtributoHtml("sn-item-click", Event);

        public static readonly ValorAlterado = new AtributoHtml("sn-valor-alterado", Event);
        public static readonly ValorModificando = new AtributoHtml("sn-valor-modificando", Event);

        public static readonly Navegar = new AtributoHtml("sn-navegar", Event);
        public static readonly SelecionarArquivos = new AtributoHtml("sn-selecionar-arquivos", Event);
        public static readonly ArrastarArquivos = new AtributoHtml("sn-arrastar-arquivos", Event);
        public static readonly ItemSelecionadoAlterado = new AtributoHtml("sn-item-selecionado-alterado", Event);

        //Caixa Texto
        public static readonly TextoPesquisa = new AtributoHtml("sn-texto-pesquisa", Event);
        public static readonly MarcaDagua = new AtributoHtml("sn-marca-dagua", String);
        public static readonly TipoEntrada = new AtributoHtml("sn-tipo-entrada", Snebur.UI.EnumTipoEntrada);
        public static readonly Pattern = new AtributoHtml("sn-pattern", String);
        //caixa hora
        public static readonly TipoData = new AtributoHtml("sn-tipo-data", d.EnumTipoData);
        public static readonly IsHorasDia = new AtributoHtml("sn-is-hora-dia", String);
         
        //Binds-dom
        public static readonly BindTexto = new AtributoHtml("sn-bind-texto", String);
        public static readonly BindRotulo = new AtributoHtml("sn-bind-rotulo", String);
        public static readonly BindHora = new AtributoHtml("sn-bind-hora", String);
        public static readonly BindData = new AtributoHtml("sn-bind-data", String);
        public static readonly BindNumero = new AtributoHtml("sn-bind-numero", String);
        public static readonly BindSenha = new AtributoHtml("sn-bind-senha", String);
        public static readonly BindUrlImagem = new AtributoHtml("sn-bind-url-imagem", String);
        public static readonly BindEnum = new AtributoHtml("sn-bind-enum", String);
        public static readonly BindCssClasse = new AtributoHtml("sn-bind-css-classe", String);
        public static readonly BindClass = new AtributoHtml("sn-bind-class", String);
        public static readonly BindEstilo = new AtributoHtml("sn-bind-estilo", String);

        //Bind-controle
        public static readonly Bind = new AtributoHtml("sn-bind", String);
        public static readonly BindFormulario = new AtributoHtml("sn-bind-form", String);
        public static readonly BindDataSource = new AtributoHtml("sn-bind-data-source", String);
        public static readonly BindLista = new AtributoHtml("sn-bind-lista", String);
        /*public static readonly BindItems = new AtributoHtml("sn-bind-itens", String);*/
        public static readonly BindImagem = new AtributoHtml("sn-bind-imagem", String);
        public static readonly BindProgresso = new AtributoHtml("sn-bind-progresso", String);
        public static readonly BindItensSelecionado = new AtributoHtml("sn-bind-itens-selecionado", String);
        public static readonly BindPropriedade = new AtributoHtml("sn-bind-propriedade", String);
        public static readonly BindValorLogico = new AtributoHtml("sn-bind-valor-logico", String);
        public static readonly BindImagens = new AtributoHtml("sn-bind-imagens", String);
        public static readonly BindSelecaoCor = new AtributoHtml("sn-bind-selecao-cor", String);
        public static readonly BindSugestoes = new AtributoHtml("sn-bind-sugestoes", String);

        //Opções
        public static readonly OpcaoBindCssClasse = new AtributoHtml("sn-opcao-bind-css-classe", Snebur.UI.EnumOpcapBindCssClasse);
        public static readonly OpcaoBindCssclassePrefixoAlterar = new AtributoHtml("sn-opcao-bind-css-classe-prefixo-alterar", String);
        public static readonly IsPropagarEstilos = new AtributoHtml("sn-is-propagar-estilos", Boolean);

        public static readonly UrlImagemPendente = new AtributoHtml("sn-url-imagem-pendente", String);
        public static readonly NomePropriedadeSugestao = new AtributoHtml("sn-nome-propriedade-sugestao", String);
        

        //Mascara
        public static readonly Mascara = new AtributoHtml("sn-mascara", String);

        //Formatar
        public static readonly Formatar = new AtributoHtml("sn-formatar", Snebur.UI.EnumFormatacao);
         
        //Formatar função e formatar valor são utilizados na caixa slider para ter conflito com os bind        
        public static readonly FormatarFuncao = new AtributoHtml("sn-formatar-funcao", String);
        public static readonly FormatarValor = new AtributoHtml("sn-formatar-valor", Snebur.UI.EnumFormatacao);


        //AutoSalvar
        public static readonly IsAutoSalvar = new AtributoHtml("sn-is-auto-salvar", Boolean);

        //Navegador
        public static readonly TipoAnimacao = new AtributoHtml("ap-tipo-animacao", Snebur.UI.EnumTipoAnimacao );
        /*public static readonly NavegadorPrincipal = new AtributoHtml("sn-navegador-principal", Boolean);*/
        public static readonly IdentificadorNavegador = new AtributoHtml("sn-identificador-navegador", String);
        public static readonly PaginaInicial = new AtributoHtml("sn-pagina-inicial", String);
        public static readonly IsPropagarBindDataSource = new AtributoHtml("sn-is-propagar-bind-data-source", Boolean);
        public static readonly IsManterCache = new AtributoHtml("sn-is-manter-cache", Boolean);

        //HTML - Nativos
        public static readonly Disabled = new AtributoHtml("disabled", String);
        public static readonly Min = new AtributoHtml("min", String);
        public static readonly Max = new AtributoHtml("max", String);
        public static readonly Step = new AtributoHtml("step", String);

        //Outros
        public static readonly CorPersonalizacao = new AtributoHtml("sn-cor-personalizacao", Snebur.UI.EnumCor);
        //public static readonly TituloPersonalizacao = new AtributoHtml("sn-titulo", String);

        //#region Atributos 

        private static _atributos: DicionarioSimples<AtributoHtml>;

        public static get Atributos(): DicionarioSimples<AtributoHtml>
        {
            if (!u.ValidacaoUtil.IsDefinido(AtributosHtml._atributos))
            {
                AtributosHtml._atributos = new DicionarioSimples<AtributoHtml>();
                
                const chaves = Object.keys(AtributosHtml);
                for (const chave of chaves)
                {
                    const valor = (AtributosHtml as any)[chave];
                    if (valor instanceof AtributoHtml)
                    {
                        const atributo = (valor as AtributoHtml);
                        AtributosHtml._atributos.Add(atributo.Nome, atributo);
                    }
                }
            }
            return AtributosHtml._atributos;
        }
        //#endregion
    }
}