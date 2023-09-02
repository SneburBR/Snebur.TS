namespace Snebur.UI
{

    export abstract class BaseBind extends BaseUIElemento
    {
        public readonly Priority: number = 0;

        public static readonly THIS = "this.";

        private readonly __ValorPropriedadeAlterado: PropriedadeAlteradaHandlder;
        private readonly __ValorPropriedadeOrigem_Alterado: PropriedadeAlteradaHandlder;
        private _valorPropriedade: any = undefined;
        private _propriedadeLigacao: r.Propriedade;
        private _tipoPrimarioProprieadeLigacao: r.EnumTipoPrimario;
        private _isAlertaFalhaBindMostrado: boolean;

        protected readonly AtributoHtml: AtributoHtml;
        protected readonly ValorAtributo: string;
        protected readonly Origem: any;
        protected readonly IsNaoPermitirValorZero: boolean;

        protected FuncaoConverter: (valor: any, dataSource: any, bind: BaseBind) => any;
        protected FuncaoExpressao: FuncaoBindExpressao;
        protected Formatar: string;
        protected MaximoCaracteres: number;
        protected ValorPadrao: any;

        protected IsValorNormalizado: boolean = false;

        protected PaiPropriedadeLigacao: ObjetoControladorPropriedade;

        protected readonly NomePropriedadeLigacao: string;
        protected readonly Opcoes: string;
        protected readonly ExpressaoBind: string;
        protected readonly CaminhoPropriedadeLigacao: string;

        private get IsFormatar(): boolean
        {
            return this.Formatar != null;
        }

        protected get PropriedadeLigacao(): r.Propriedade
        {
            return this._propriedadeLigacao;
        }
        protected set PropriedadeLigacao(value: r.Propriedade)
        {
            this._propriedadeLigacao = value;
            this._tipoPrimarioProprieadeLigacao = (value?.Tipo instanceof r.TipoPrimario) ? value.Tipo.TipoPrimarioEnum : r.EnumTipoPrimario.Desconhecido;
        }

        public get TipoPrimarioProprieadeLigacao(): r.EnumTipoPrimario
        {
            return this._tipoPrimarioProprieadeLigacao;
        }

        public constructor(controlePai: BaseControle,
            elemento: HTMLElement,
            atributo: AtributoHtml,
            valorAtributo: string)
        {
            super(controlePai, elemento);

            if (String.IsNullOrWhiteSpace(valorAtributo))
            {
                throw new ErroNaoDefinido("O valor do atributo não foi definido", this);
            }

            //this.__ValorPropriedadeOrigem_Alterado = this.ValorPropriedadeOrigem_Alterado.bind(this);
            //this.__ValorPropriedadeAlterado = this.ValorPropriedade_Alterada.bind(this);

            this.AtributoHtml = atributo;
            this.ValorAtributo = valorAtributo;
            this.ExpressaoBind = BindUtil.RetornarExpressaoBind(this.ValorAtributo);
            this.CaminhoPropriedadeLigacao = BindUtil.RetornarCaminhoPropriedade(this.ExpressaoBind, true);

            this.ValidarValorAtributo();


            this.Opcoes = BindOpcoesUtil.RetornarOpcoes(this.ValorAtributo);
            this.NomePropriedadeLigacao = BindUtil.RetornarNomePropriedade(this.CaminhoPropriedadeLigacao);

            this.FuncaoExpressao = this.RetornarFuncaoExpressao();
            this.FuncaoConverter = this.RetornarFuncaoConverter();

            this.Formatar = this.RetornarFormatar();
            this.MaximoCaracteres = this.RetornarMaximoCaracteres();
            this.ValorPadrao = this.RetornarValorPadrao();
            this.Origem = BindOpcoesUtil.RetornarOrigem(this.Opcoes, this.ControlePai);
            this.IsNaoPermitirValorZero = this.RetornarValorAtributoBoolean(AtributosHtml.IsNaoPermitirValorZero, false);

            if (u.ValidacaoUtil.IsDefinido(this.Origem))
            {
                this.PaiPropriedadeLigacao = u.ReflexaoUtil.RetornarValorPaiPropriedade(this.Origem, this.CaminhoPropriedadeLigacao, false);
                this.PropriedadeLigacao = this.RetornarPropriedadeLigacao();

                if (this.PaiPropriedadeLigacao instanceof ObjetoControladorPropriedade)
                {
                    this.PaiPropriedadeLigacao.AdicionarManipuladorPropriedadeAlterada(this.NomePropriedadeLigacao, this.ValorPropriedadeOrigem_Alterado, this);
                }
            }
            else
            {
                this.EventoDataSourceAlterado.AddHandler(this.DataSource_Alterado, this);
                this.EventoDataSourceAntesAlterar.AddHandler(this.DataSource_AntesAlterar, this);
            }
        }

        private RetornarPropriedadeLigacao(): sn.r.Propriedade
        {
            if (String.IsNullOrWhiteSpace(this.NomePropriedadeLigacao))
            {
                return null;
            }
            return this.PaiPropriedadeLigacao?.GetType().RetornarPropriedade(this.NomePropriedadeLigacao) ?? null;
        }

        private ValidarValorAtributo()
        {
            if (!u.ValidacaoUtil.IsBind(this.ValorAtributo) || String.IsNullOrWhiteSpace(this.CaminhoPropriedadeLigacao) || this.ExpressaoBind == null)
            {
                throw new Erro(`O valor do bind é invalido ${this.ValorAtributo} em ${this.ControleApresentacao.___NomeConstrutor}.\r\n Elemento: ${this.Elemento?.outerHTML.substring(0, 100)}`, this);
            }
        }

        public InicializarBind(): void
        {
            this.Inicializar();
        }

        protected override Inicializar(): void
        {
            if (u.ValidacaoUtil.IsDefinido(this.Origem))
            {
                //no caso da origem é propriedade deve ser inicializa a primeira vez aqui
                //Por que o data source não se propaga
                this.AtribuirValorPropriedadeOrigem();
            }
        }

        //#region Origem personalizada

        private AtribuirValorPropriedadeOrigem()
        {
            const valorPropriedade = u.ReflexaoUtil.RetornarValorPropriedade(this.Origem, this.CaminhoPropriedadeLigacao, true);
            if (valorPropriedade === undefined)
            {
                const nomeConstrutor = this.Origem instanceof Snebur.Objeto ? this.Origem.___NomeConstrutor : " origem desconhecida";
                const mensagemErro = `A propriedade '${this.CaminhoPropriedadeLigacao}' não foi encontrada na Origem '${nomeConstrutor}' \n configura a origem do controle apresentação do bind`;
                console.error(mensagemErro);
                /*valorPropriedade = null;*/
                /*throw new Erro(mensagemErro);*/
            }
            this.ValorPropriedade = valorPropriedade;
        }

        private ValorPropriedadeOrigem_Alterado(provedor: any, e: PropriedadeAlteradaEventArgs): void
        {
            this.ValorPropriedade = e.NovoValor;
        }

        //#endregion

        //#region ValorPropriedade

        public get ValorPropriedade(): any
        {
            return this._valorPropriedade;
        }

        public set ValorPropriedade(value: any)
        {
            const antigoValor = this._valorPropriedade;
            const valorNormalizado = this.NormalizarValorPropriedade(value);

            //######################## 
            //if (this._valorPropriedade !== value)
            //{
            this._valorPropriedade = valorNormalizado;
            this.ValorPropriedadeAlterado(antigoValor, valorNormalizado);
            //}
        }

        protected abstract ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void;

        protected RetornarValorPropriedade(): any
        {
            return this.RetornarValorPropriedadeInterno();
            //let valorPropriedade = this.RetornarValorPropriedadeInterno();
            //if (this.FuncaoConverter != null)
            //{
            //    valorPropriedade = this.RetornarValorPropridadeConvertido(valorPropriedade);
            //    this.IsValorConvertidoFuncao = true;
            //}
            /*return valorPropriedade;*/
        }

        //protected RetornarValorPropridadeConvertido(valorPropriedade: any): any
        //{
        //    if (this.FuncaoConverter != null)
        //    {
        //        return this.FuncaoConverter(valorPropriedade, this.DataSource, this);
        //    }
        //    return valorPropriedade;
        //}

        private RetornarValorPropriedadeInterno(): void
        {
            if (this.CaminhoPropriedadeLigacao === ".")
            {
                return this.DataSource;
            }
            if (this.CaminhoPropriedadeLigacao.StartsWith("pai"))
            {
                return this.RetornarValorPropridadeControlePai();
            }

            if (u.ValidacaoUtil.IsDefinido(this.PaiPropriedadeLigacao))
            {
                const valor = u.ReflexaoUtil.RetornarValorPropriedade(this.PaiPropriedadeLigacao, this.NomePropriedadeLigacao, true);
                if (valor === undefined)
                {
                    this.AlertaFalhaCaminhoBind();
                }
                return valor;
            }
            return null;
        }


        protected AlterarValorPropriedade(valorPropriedade: any): void
        {
            if (u.ValidacaoUtil.IsDefinido(this.PaiPropriedadeLigacao))
            {
                u.ReflexaoUtil.AtribuirValorPropriedade(this.PaiPropriedadeLigacao,
                    this.NomePropriedadeLigacao,
                    valorPropriedade, true);
            }
        }

        protected RetornarValorPropridadeControlePai(): any
        {
            const partes = this.CaminhoPropriedadeLigacao.split(".");
            let controlePai = this.ControlePai;
            for (const parte of partes.ToList(true))
            {
                if (parte === "pai")
                {
                    controlePai = controlePai.ControlePai;
                    partes.shift();
                }
            }
            return u.ReflexaoUtil.RetornarValorPropriedade(controlePai, String.Join(".", partes));
        }
        //#endregion

        //#region  DataSource

        protected DataSource_AntesAlterar(provedor: any, e: UIEventArgs)
        {
            this.RemoverHandlerPropriedadeAlterada();
        }

        protected DataSource_Alterado(provedor: any, e: UIEventArgs)
        {
            this.AdicionarHandlerPropriedadeAlteradaInterno();
            this.ValorPropriedade = this.RetornarValorPropriedade();
        }
        //#endregion

        //#region Protegidas

        private RetornarFuncaoConverterInterno(caminhoFuncao: string): (valor: any, dataSource: any, bind: BaseBind) => void
        {
            let controle = this as any;
            if (caminhoFuncao.StartsWith(BaseBind.THIS))
            {
                caminhoFuncao = caminhoFuncao.substring(BaseBind.THIS.length);
            }

            while (controle instanceof BaseUIElemento)
            {
                let funcao = (controle as any)[caminhoFuncao];
                if (u.ValidacaoUtil.IsFunction(funcao))
                {
                    funcao = funcao.bind(controle);
                    return funcao;
                }
                controle = (controle as BaseUIElemento).ControlePai;
            }

            let funcao = r.ReflexaoNamespaceUtil.RetornarConstrutor(caminhoFuncao, true);
            if (!(funcao instanceof Function) && !caminhoFuncao.Contains("."))
            {
                caminhoFuncao = `ui.Converter.${caminhoFuncao}`;
                funcao = r.ReflexaoNamespaceUtil.RetornarConstrutor(caminhoFuncao, true);
            }

            if (!(funcao instanceof Function))
            {
                console.error(`A função converter '${caminhoFuncao}' não foi encontrada em ${this.ControleApresentacao.GetType().Nome}`);
                return null;
            }
            funcao = funcao.bind(controle);
            return funcao as any;
        }

        //#endregion

        //#region  Handler propriedade

        protected ValorPropriedade_Alterada(provedor: any, e: PropriedadeAlteradaEventArgs): void
        {
            this.ValorPropriedade = e.NovoValor;
        }

        private AdicionarHandlerPropriedadeAlteradaInterno(): void
        {
            if (u.ValidacaoUtil.IsDefinido(this.DataSource))
            {
                this.PaiPropriedadeLigacao = u.ReflexaoUtil.RetornarValorPaiPropriedade(this.DataSource, this.CaminhoPropriedadeLigacao, true);

                if ((this.CaminhoPropriedadeLigacao !== ".") && (u.ValidacaoUtil.IsDefinido(this.PaiPropriedadeLigacao)))
                {
                    this.PropriedadeLigacao = this.PaiPropriedadeLigacao.GetType().RetornarPropriedade(this.NomePropriedadeLigacao);
                    if (this.PaiPropriedadeLigacao instanceof ObjetoControladorPropriedade)
                    {
                        this.PaiPropriedadeLigacao.AdicionarManipuladorPropriedadeAlterada(this.NomePropriedadeLigacao, this.ValorPropriedade_Alterada, this);
                    }
                }
            }
        }

        private RemoverHandlerPropriedadeAlterada(): void
        {
            if (this.PaiPropriedadeLigacao instanceof ObjetoControladorPropriedade)
            {
                this.PaiPropriedadeLigacao.RemoverManipuladorPropriedadeAlterada(this.NomePropriedadeLigacao, this.ValorPropriedade_Alterada, this);
            }

            if (u.ValidacaoUtil.IsDefinido(this.Origem))
            {
                if (this.PaiPropriedadeLigacao instanceof ObjetoControladorPropriedade)
                {
                    this.PaiPropriedadeLigacao?.RemoverManipuladorPropriedadeAlterada(this.NomePropriedadeLigacao, this.ValorPropriedadeOrigem_Alterado, this);
                }
            }
        }
        //#endregion 

        //#region Recurso - valor da propriedade

        protected NormalizarValorPropriedade(valor: any): any
        {
            if ((valor === null || valor === undefined) && u.ValidacaoUtil.IsDefinido(this.ValorPadrao))
            {
                valor = this.ValorPadrao;
            }

            if (this.FuncaoExpressao != null)
            {
                const dataSource = this.Origem ?? this.DataSource;
                if (this.IsProcessarFuncaoExpressao(dataSource))
                {
                    const _this = this.ControlePai.ControleApresentacao;
                    try
                    {
                        if ($Configuracao.IsDebug)
                        {
                            this.Elemento.setAttribute("debug-valor-bind-expressao", this.FuncaoExpressao.toString());
                        }
                        valor = this.FuncaoExpressao(dataSource, _this);
                        this.IsValorNormalizado = true;
                    }
                    catch (erro)
                    {
                        const mensagem = `Falha ao computar a expressão do bind ${this.ValorAtributo}, dataSource : ${dataSource?.GetType()?.Nome ?? "null"} em  ${this.ControleApresentacao.___NomeConstrutor}`;
                        console.error(mensagem);
                        valor = null;
                    }
                }
            }

            if (this.IsFormatar || this.FuncaoConverter != null)
            {
                for (const opcaoNormalizar of this.RetornarNomarlizadores())
                {
                    switch (opcaoNormalizar)
                    {
                        case EnumNormalizadorValor.Formatar:
                            valor = u.FormatacaoUtil.Formatar(valor, this.Formatar, true);
                            this.IsValorNormalizado = true;
                            break;
                        case EnumNormalizadorValor.Converter:
                            valor = this.FuncaoConverter(valor, this.DataSource, this);
                            this.IsValorNormalizado = true;
                            break;
                        default:
                    }

                }
            }



            if (this.MaximoCaracteres > 0 && typeof valor === "string" && valor.length > this.MaximoCaracteres)
            {
                return valor.substring(0, this.MaximoCaracteres);
            }

            if (valor === 0 && this.IsNaoPermitirValorZero)
            {
                valor = null;
            }

            if ($Configuracao.IsDebug)
            {
                this.Elemento.setAttribute("debug-valor-bind-computado", valor?.toString().substr(0, 10) ?? "null");
            }
            return valor;
        }

        private RetornarNomarlizadores(): EnumNormalizadorValor[]
        {
            const normalizadores = new List<EnumNormalizadorValor>();

            if (u.ValidacaoUtil.IsDefinido(this.Formatar))
            {
                normalizadores.Add(EnumNormalizadorValor.Formatar);
            }

            if (this.FuncaoConverter != null)
            {
                normalizadores.Add(EnumNormalizadorValor.Converter);
            }

            const isInverterOrdem = normalizadores.Count === 2 &&
                this.ValorAtributo.indexOf("Formatar=") > this.ValorAtributo.indexOf("Converter=");

            if (isInverterOrdem)
            {
                //if ($Configuracao.IsDebug || $Configuracao.IsTeste)
                //{
                //    console.warn(`Normalizadores  Converter e Formatar, ordem inversa, bind:  ${this.ValorAtributo} em ${this.ControleApresentacao.___NomeConstrutor}`);
                //}
                return normalizadores.reverse();
            }
            return normalizadores;
        }

        private IsProcessarFuncaoExpressao(dataSource: any): boolean
        {
            if (this.FuncaoExpressao.Options.IsDataSource)
            {
                return dataSource != null;
            }
            return true;
        }

        public RetornarFuncaoExpressao(): FuncaoBindExpressao
        {
            if (BindExpressaoUtil.IsExpressao(this.ExpressaoBind))
            {
                return BindExpressaoUtil.RetornarFuncaoExpresao(this.ExpressaoBind, [this.CaminhoPropriedadeLigacao]);
            }
            return null;
        }

        private RetornarFuncaoConverter(): (valor: any, dataSource: any, bind: BaseBind) => void
        {
            const fim = this.ValorAtributo.indexOf("}}");
            if (fim > 0)
            {
                const parteSemBind = this.ValorAtributo.substring(fim + 2);
                const indexConverter = parteSemBind.indexOf("Converter=");
                if (indexConverter >= 0)
                {
                    /*let nomeFuncao = parteSemBind.substring(indexConverter + ("Converter=".length)).Split(",").First().trim();*/
                    const nomeFuncaoRecurso = BindOpcoesUtil.RetornarConteudoOpcao(this.Opcoes, EnumBindOpcao.OPCAO_CONVERTER);
                    if (nomeFuncaoRecurso == null)
                    {
                        throw new Erro(`A sintaxe do bind é invalida: ${this.ValorAtributo} em ${this.ControleApresentacao.___NomeConstrutor}`);
                    }
                    return this.RetornarFuncaoConverterInterno(nomeFuncaoRecurso);
                }
            }
            return null;
        }

        protected RetornarFormatar(): string
        {
            const conteudo = BindOpcoesUtil.RetornarConteudoOpcao(this.Opcoes, EnumBindOpcao.OPCAO_FORMATAR);
            if (!String.IsNullOrEmpty(conteudo))
            {
                return conteudo.toLowerCase();
            }

            if (this instanceof BindTexto)
            {
                const valorAtributoFormatar = this.RetornarValorAtributo(AtributosHtml.Formatar);
                if (!String.IsNullOrEmpty(valorAtributoFormatar))
                {
                    return valorAtributoFormatar.toLowerCase();
                }
            }
            return null;
        }

        private RetornarMaximoCaracteres(): number | null
        {
            const conteudo = BindOpcoesUtil.RetornarConteudoOpcao(this.Opcoes, EnumBindOpcao.OPCAO_MAXIMO_CARACTERES);
            if (conteudo != null && ValidacaoUtil.IsNumber(conteudo))
            {
                const maximoCaracteres = parseInt(conteudo);
                if (!isNaN(maximoCaracteres))
                {
                    return maximoCaracteres;
                }
            }
            return null;
        }

        private RetornarValorPadrao(): any
        {
            const conteudo = BindOpcoesUtil.RetornarConteudoOpcao(this.Opcoes, EnumBindOpcao.OPCAO_PADRAO);
            if (conteudo != null)
            {
                return u.ConverterUtil.ParaMelhorTipo(conteudo);
            }
            return null;
        }

        //#endregion

        //#region Retornar valor dos atributos

        protected override RetornarValorAtributo(atributo: AtributoHtml): string;
        protected override RetornarValorAtributo(atributo: AtributoHtml, valorPadrao: any): string;
        protected override RetornarValorAtributo(atributo: AtributoHtml, valorPadrao: any, aceitarBind: boolean): string;
        protected override RetornarValorAtributo(atributo: AtributoHtml, valorPadrao: any, aceitarBind: boolean, elemento: HTMLElement): string;
        protected override RetornarValorAtributo(atributo: AtributoHtml, valorPadrao: any = null, aceitarBind: boolean = false, elemento: HTMLElement = this.Elemento): string
        {
            const valorAtributo = super.RetornarValorAtributo(atributo, null, aceitarBind, elemento);
            if (!String.IsNullOrWhiteSpace(valorAtributo))
            {
                return valorAtributo;
            }

            if (this.ControlePai.Elemento !== elemento)
            {
                return super.RetornarValorAtributo(atributo, valorPadrao, aceitarBind, this.ControlePai.Elemento);
            }
            return valorPadrao;
        }

        //#endregion

        protected RetornarComponeteApresentacao(): ComponenteApresentacao
        {
            if (this.ControlePai.IDElemento === this.IDElemento)
            {
                return this.ControlePai;
            }

            const controle = this.ControlePai.ControlesFilho.Where(x => x.IDElemento === this.IDElemento).SingleOrDefault();
            if (controle instanceof BaseControle)
            {
                return controle;
            }

            const compronenteApresetnacaoFilho = this.RetornarComponenteApresentacaoFilho(this.ControlePai);
            if (compronenteApresetnacaoFilho instanceof ComponenteApresentacao)
            {
                return compronenteApresetnacaoFilho;
            }
            return null;
        }

        private RetornarComponenteApresentacaoFilho(componenteApresentacaoPai: ComponenteApresentacao): ComponenteApresentacao
        {
            const componenteApresentacao = componenteApresentacaoPai.ComponentesApresentacaoFilhos.Where(x => x.IDElemento === this.IDElemento).SingleOrDefault();
            if (componenteApresentacao instanceof ComponenteApresentacao)
            {
                return componenteApresentacao;
            }

            for (const componenteApresentacaoFilho of componenteApresentacaoPai.ComponentesApresentacaoFilhos)
            {
                const componenteApresentacao = this.RetornarComponenteApresentacaoFilho(componenteApresentacaoFilho);
                if (componenteApresentacao instanceof ComponenteApresentacao)
                {
                    return componenteApresentacao;
                }
            }
            return null;
        }

        //#region DEBUG

        private AlertaFalhaCaminhoBind()
        {
            if ($Configuracao.IsDebug && !this._isAlertaFalhaBindMostrado
                && !this.ControleApresentacao.IsDataSourseHerdado)
            {
                if (!(this.PaiPropriedadeLigacao instanceof BaseControle))
                {
                    console.warn(`O caminho do bind ${this.CaminhoPropriedadeLigacao} não foi encontrado em .
                              <br>Local: ${this.ControleApresentacao.___NomeConstrutor}
                              <br>Objeto ${this.PaiPropriedadeLigacao} => ${this.NomePropriedadeLigacao}.
                              <br>Defina null para a propriedade, para não mostrar mais esse alerta.`);
                    this._isAlertaFalhaBindMostrado = true;
                }
            }
        }

        //#endregion
        //#region IDisposable

        public override toString()
        {
            return `Bind ${this.___NomeConstrutor} ${this.CaminhoPropriedadeLigacao} ${this.FuncaoExpressao?.toString()}`;
        }

        public override Dispose()
        {
            if (!this.IsDispensado)
            {
                this.RemoverHandlerPropriedadeAlterada();

                this.EventoDataSourceAlterado.RemoveHandler(this.DataSource_Alterado, this);
                this.EventoDataSourceAntesAlterar.RemoveHandler(this.DataSource_AntesAlterar, this);

                this.PaiPropriedadeLigacao = null;
                this.PropriedadeLigacao = null;

                if (typeof this.FuncaoExpressao === "function")
                {
                    window.__ExpressoesBind[this.FuncaoExpressao.Options.NomeExpressao];
                }

                delete this.FuncaoConverter;
                delete this.FuncaoExpressao;
                delete this.Formatar;
                delete this.ValorPadrao;
                //this.CaminhoPropriedadeLigacao = null;
                //this.NomePropriedadeLigacao = null;

                super.Dispose();
            }
        }
        //#endregion 

    }

    enum EnumNormalizadorValor
    {
        Formatar,
        Converter
    }
}