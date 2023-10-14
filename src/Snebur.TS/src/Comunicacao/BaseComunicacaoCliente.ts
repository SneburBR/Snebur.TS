namespace Snebur.Comunicacao
{
    export abstract class BaseComunicacaoCliente extends Snebur.BaseServico implements IBaseServico
    {
        private static readonly TIMEOUT_PADRAO = 120000;

        private _urlServico: string;
        protected _timeoutRequisicao: number = BaseComunicacaoCliente.TIMEOUT_PADRAO;
        public readonly UrlServicoDebug: string;


        protected IsNormalizarParametros: boolean = true;
        protected IsNaoClonarEntidades: boolean = false;

        public override get URLServico(): string
        {
            return this._urlServico;
        }

        protected get CredencialServico(): Seguranca.Credencial
        {
            return this.RetornarCredencialServico();
        }

        public get Timeout():number
        {
            return this._timeoutRequisicao;
        }

        private readonly Gerenciador: GerenciadorRequiscao
        
        protected readonly OpcoesClonarEntidades: EnumOpcaoClonarEntidade =
            EnumOpcaoClonarEntidade.ChavesEstrangeira |
            EnumOpcaoClonarEntidade.PropriedadesAlteradas |
            EnumOpcaoClonarEntidade.PropriedadesTiposPrimario;

        public constructor(urlServico: string, urlServicoDebug: string = null)
        {
            super();

            this.Gerenciador = GerenciadorRequiscao.Instancia;
            if (!u.ValidacaoUtil.IsUrlServico(urlServico))
            {
                throw new Erro("O URL do serviço é invalida - precisa ser http ou https e terminar com /", this);
            }

            this._urlServico = urlServico;
            this.UrlServicoDebug = urlServicoDebug;
        }

        //#region Chamar Async

        protected ChamarServicoAsync(
            nomeMetodo: string,
            argumentos: IArguments): void
        {
            this.TentarChamarServicoInternoAsync(nomeMetodo, argumentos);
        }

        private async TentarChamarServicoInternoAsync(nomeMetodo: string, argumentos: IArguments)
        { 
             await this.ChamarServicoInternoAsync(
                nomeMetodo,
                argumentos);
        }

        protected async ChamarServicoInternoAsync(
            nomeMetodo: string,
            argumentos: IArguments): Promise<any>
        {
            const metodo: Function = (this as any)[nomeMetodo] as Function;
            const callback: Function = argumentos[(argumentos.length - 1)];

            if (!u.ValidacaoUtil.IsFunction(metodo) ||
                String.IsNullOrWhiteSpace(nomeMetodo))
            {
                throw new ErroNaoDefinido("Método não definido ou nome invalido " + nomeMetodo, this);
            }

            //if (!u.ValidacaoUtil.IsFunction(callback))
            //{
            //    throw new ErroNaoDefinido("Callback não definido nos argumentos", this);
            //}

            const parametros = this.RetornarParametros(nomeMetodo, metodo, argumentos, true);
            const contrato = this.RetornarContratoChamada(nomeMetodo, parametros, true);
            const nomeManipualdor = this.RetornarNomeManipulador();
            const jsonConteudo = u.JsonUtil.Serializar(contrato);
            const credencial = this.CredencialServico;
            const pacote = await PacoteUtil.CompactarPacoteAsync(jsonConteudo);

            const requisicao = new Requisicao(
                this,
                nomeManipualdor,
                nomeMetodo,
                credencial,
                pacote);

            const resultado = await this.Gerenciador.ExecutarAsync(requisicao);

            if (resultado instanceof ResultadoSessaoUsuarioInvalida)
            {
                if ($Configuracao.IsDebugOuTeste)
                {
                    alert("Sessão invalida");
                }
                u.SessaoUsuarioUtil.SairAsync();
                return;
            }

            if (u.ValidacaoUtil.IsFunction(callback))
            {
                callback(resultado);
            }
            return resultado;
        }

        public UsarUrlServicoDEBUG()
        {
            if (this._urlServico !== this.UrlServicoDebug)
            {
                const mensagem = `A URL serviço '${this.RetornarNomeManipulador()}' foi alterada para modo DEBUG,
                               UrlServicoDEBUG : '${this.UrlServicoDebug}'`;

                console.error(mensagem);
                this._urlServico = this.UrlServicoDebug;
            }
        }

        //#endregion


        //// #region Resultado da chamada
         
        protected ChamarServico<T>(
            nomeMetodo: string,
            argumentos: IArguments):T
        {
            throw new Erro("Chamadas síncronas estão obsoletas");
        }
         
        // #endregion

        // #region  Retornar parâmetros da chamada

        private RetornarContratoChamada(nomeOperacao: string, parametros: Array<ParChaveValorSimples<any>>, async: boolean): ContratoChamada
        {
            const contratoChamada = new Snebur.Comunicacao.ContratoChamada();
            contratoChamada.Cabecalho = this.RetornarCabecalho();
            contratoChamada.InformacaoSessaoUsuario = $Aplicacao.InformacaoSessaoUsuario;
            contratoChamada.Operacao = nomeOperacao.Replace("Async", "");
            contratoChamada.DataHora = new Date().Utc;
            contratoChamada.Async = async;

            for (let i = 0; i < parametros.length; i++)
            {
                const parametro = parametros[i];
                const parametroChamada = this.RetornarParametroChamada(parametro);
                contratoChamada.Parametros.Add(parametroChamada);
            }
            return contratoChamada;
        }

        private RetornarParametroChamada(parametro: ParChaveValorSimples<any>): ParametroChamada
        {
            const valorParametro = parametro.Valor;
            if (valorParametro === undefined)
            {
                throw new Erro("O valor do parâmetro não foi definido", this);
            }

            if (valorParametro === null)
            {
                const parametroNulo = new ParametroChamadaNulo();
                parametroNulo.Nome = parametro.Chave;
                return parametroNulo;
            }

            if (!u.ValidacaoUtil.IsDefinido(valorParametro))
            {
                $Reflexao.TipoNulo;
            }

            const tipo = valorParametro.__RetornarTipo();
            switch (tipo.TipoReflexao)
            {
                case Snebur.Reflexao.EnumTipoReflexao.TipoPrimario:

                    return this.RetornarParametroChammadaTipoPrimario(parametro, tipo as r.TipoPrimario);

                case Snebur.Reflexao.EnumTipoReflexao.TipoEnum:

                    return this.RetornarParametroChamadaEnum(parametro, tipo as r.TipoEnum);

                case Snebur.Reflexao.EnumTipoReflexao.TipoBaseDominio:

                    return this.RetornarParametroChamadaBaseDominio(parametro, tipo as r.TipoBaseDominio);

                case Snebur.Reflexao.EnumTipoReflexao.TipoBaseEntidade:

                    return this.RetornarParametroChamadaBaseDominio(parametro, tipo as r.TipoBaseDominio);

                case Snebur.Reflexao.EnumTipoReflexao.TipoListaTipoPrimario:

                    return this.RetornarParametroChamadaListaTipoPrimario(parametro, tipo as r.TipoListaTipoPrimario);

                case Snebur.Reflexao.EnumTipoReflexao.TipoListaEnum:

                    return this.RetornarParametroChamadaListaEnum(parametro, tipo as r.TipoListaEnum);

                case Snebur.Reflexao.EnumTipoReflexao.TipoListaBaseDominio:

                    return this.RetornarParametroChamadaListaBaseDominio(parametro, tipo as r.TipoListaBaseDominio);

                default:

                    throw new ErroNaoSuportado("Tipo parâmetro não suportado", this);
            }
        }

        private RetornarParametroChammadaTipoPrimario(parametro: ParChaveValorSimples<any>, tipo: Snebur.Reflexao.TipoPrimario): ParametroChamadaTipoPrimario
        {
            const parametroChamada = new ParametroChamadaTipoPrimario();
            parametroChamada.Nome = parametro.Chave;
            parametroChamada.TipoPrimarioEnum = tipo.TipoPrimarioEnum;
            parametroChamada.AssemblyQualifiedName = tipo.AssemblyQualifiedName;
            parametroChamada.Valor = parametro.Valor;
            return parametroChamada;
        }

        private RetornarParametroChamadaEnum(parametro: ParChaveValorSimples<any>, tipo: Snebur.Reflexao.TipoEnum): ParametroChamadaEnum
        {
            const parametroChamada = new ParametroChamadaEnum();
            parametroChamada.Nome = parametro.Chave;
            parametroChamada.AssemblyQualifiedName = tipo.AssemblyQualifiedName;
            parametroChamada.Valor = u.ConverterUtil.ParaInteiro(parametro.Valor);
            return parametroChamada;
        }

        private RetornarParametroChamadaBaseDominio(parametro: ParChaveValorSimples<object>, tipo: Snebur.Reflexao.TipoBaseDominio): ParametroChamadaBaseDominio
        {
            const parametroChamada = new ParametroChamadaBaseDominio();
            parametroChamada.Nome = parametro.Chave;
            parametroChamada.AssemblyQualifiedName = tipo.AssemblyQualifiedName;
            parametroChamada.BaseDominio = parametro.Valor as d.BaseDominio;
            return parametroChamada;
        }

        private RetornarParametroChamadaListaTipoPrimario(parametro: ParChaveValorSimples<object>, tipo: Snebur.Reflexao.TipoListaTipoPrimario): ParametroChamadaListaTipoPrimario
        {
            const parametroChamada = new ParametroChamadaListaTipoPrimario();
            parametroChamada.Nome = parametro.Chave;
            parametroChamada.AssemblyQualifiedName = tipo.AssemblyQualifiedName;
            parametroChamada.Lista = parametro.Valor as ListaObservacao<any>;

            if (tipo instanceof r.TipoListaTipoPrimario)
            {
                parametroChamada.TipoPrimarioEnum = tipo.TipoPrimario.TipoPrimarioEnum;
            }
            else
            {
                parametroChamada.TipoPrimarioEnum = r.EnumTipoPrimario.Object;
            }
            return parametroChamada;
        }

        private RetornarParametroChamadaListaEnum(parametro: ParChaveValorSimples<object>, tipo: Snebur.Reflexao.TipoListaEnum): ParametroChamadaListaEnum
        {
            const parametroChamada = new ParametroChamadaListaEnum();
            parametroChamada.Nome = parametro.Chave;
            parametroChamada.AssemblyQualifiedName = tipo.AssemblyQualifiedName;
            parametroChamada.Valores = parametro.Valor as ListaObservacao<number>;
            return parametroChamada;
        }

        private RetornarParametroChamadaListaBaseDominio(parametro: ParChaveValorSimples<object>, tipo: Snebur.Reflexao.TipoListaBaseDominio): ParametroChamadaListaBaseDominio
        {
            const parametroChamada = new ParametroChamadaListaBaseDominio();
            parametroChamada.Nome = parametro.Chave;
            parametroChamada.AssemblyQualifiedName = tipo.TipoBaseDominio.AssemblyQualifiedName;
            parametroChamada.BasesDominio = parametro.Valor as ListaObservacao<d.BaseDominio>;
            return parametroChamada;
        }

        // #endregion

        //#region Parâmetros da operação

        private STRIP_COMMENTS: RegExp = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        private ARGUMENT_NAMES: RegExp = /([^\s,]+)/g;

        private RetornarNomeParametros(funcao: Function, isAsync: boolean): Array<string>
        {
            const funcaoString = funcao.toString().replace(this.STRIP_COMMENTS, "");
            const nomesParametros = funcaoString.slice(funcaoString.indexOf("(") + 1, funcaoString.indexOf(")")).match(this.ARGUMENT_NAMES);
            if (nomesParametros === null && isAsync)
            {
                /*throw new Erro("Não foi passado parâmetro no método do serviço,  O parâmetro callback é requerido ", this);*/
                return [];
            }
            return nomesParametros;
        }

        protected RetornarParametros(nomeMetodo: string, metodo: Function, valoresParametro: IArguments, isAsync = true): Array<ParChaveValorSimples<any>>
        {
            const nomesParametros = this.RetornarNomeParametros(metodo, true);
            if (nomesParametros.Count > 0)
            {
                const nomeParametroCallback = nomesParametros.Last();
                if (!String.IsNullOrWhiteSpace(nomeParametroCallback) &&
                    nomeParametroCallback.StartsWith("callback"))
                {
                    console.error(`Parâmetro callback está obsoleto, remover em ${this.___NomeConstrutor} ${nomeMetodo}`);
                    nomesParametros.Remove(nomeParametroCallback);
                }
            }

            //else
            //{
            //    throw new Erro("O nome do parâmetro callback é invalido {0}", u.ConverterUtil.ParaString(nomeParametroCallback));
            //} 

            const parametros = Array<ParChaveValorSimples<any>>();
            if (nomesParametros != null)
            {
                for (let i = 0; i < nomesParametros.length; i++)
                {
                    const nomeParametro = nomesParametros[i];
                    let valorParametro = valoresParametro[i];
                    valorParametro = this.NormalizarValorParametro(valorParametro);
                    parametros.Add(new ParChaveValorSimples<any>(nomeParametro, valorParametro));
                }
            }
            return parametros;
        }

        protected NormalizarValorParametro(valorParametro: any): any
        {
            if (this.IsNormalizarParametros && !this.IsNaoClonarEntidades)
            {
                if (valorParametro instanceof d.Entidade)
                {
                    if (valorParametro.Id > 0)
                    {
                        return valorParametro.Clone(this.OpcoesClonarEntidades);
                    }
                }

                if (Array.isArray(valorParametro)) 
                {
                    for (let i = 0; i < valorParametro.length; i++)
                    {
                        const item = valorParametro[i];
                        if (item instanceof Entidade)
                        {
                            valorParametro[i] = this.NormalizarValorParametro(item);
                        }
                    }
                }
            }
            return valorParametro;
        }

        //#endregion

        //#region Cabeçalho

        private RetornarCabecalho(): Cabecalho
        {
            const cabecalho = new Cabecalho();
            cabecalho.CredencialUsuario = $Aplicacao.CredencialUsuario;
            cabecalho.CredencialServico = this.RetornarCredencialServico();
            return cabecalho;
        }

        //#endregion

        /*eslint-disable*/

        //#region IBaseServico 



        //public RetornarDataHoraUTC(): Date
        //{
        //    return this.ChamarServico<Date>("RetornarDataHoraUTC", arguments);
        //}

        public PingAsync(): Promise<boolean>
        {
            return new Promise(resolver =>
            {
                this.__PingInternoAsync(resolver);
            });
            /*this.ChamarServicoAsync("PingAsync", arguments);*/
        }

        private __PingInternoAsync(callback: CallbackResultado<boolean>): void
        {
            this.ChamarServicoAsync("PingAsync", arguments);
        }
        //public RetornarDataHoraUTCAsync(callback: CallbackResultado<Date>): void
        //{
        //    this.ChamarServicoAsync("RetornarDataHoraUTCAsync", arguments);
        //}

        //#endregion

        protected RetornarNomeManipulador(): string
        {
            return this.___NomeConstrutor;
        }

        //#region Métodos abstratos

        protected abstract RetornarCredencialServico(): Snebur.Seguranca.CredencialServico;

        //#endregion
    }

    export class FalhaConexaoEventArgs extends EventArgs
    {
        public constructor(
            public readonly ResultadoChamadaErro: ResultadoChamadaErro,
            public readonly UrlServico: string,
            public readonly Servico: string,
            public readonly Metodo: string,
            public readonly Tentativa: number)
        {
            super();
        }
    }
}