namespace Snebur.Comunicacao
{
    export abstract class BaseComunicacaoCliente extends Snebur.BaseServico implements IBaseServico
    {
        private static MAXIMA_TENTATIVA: number = 3;
        private static readonly TEMPO_ESPERAR_FALHA = 2;
        public static IsExisteFalhaConexao = false;

        private _urlServico: string;
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

        protected readonly OpcoesClonarEntidades: EnumOpcaoClonarEntidade = EnumOpcaoClonarEntidade.ChavesEstrangeira |
            EnumOpcaoClonarEntidade.PropriedadesAlteradas |
            EnumOpcaoClonarEntidade.PropriedadesTiposPrimario;

        public constructor(urlServico: string, urlServicoDebug: string = null)
        {
            super();

            if (!u.ValidacaoUtil.IsUrlServico(urlServico))
            {
                throw new Erro("O URL do serviço é invalida", this);
            }

            this._urlServico = urlServico;
            this.UrlServicoDebug = urlServicoDebug;
        }

        // #region Chamar Async

        protected ChamarServicoAsync(nomeMetodo: string, argumentos: IArguments): void
        {
            this.ChamarServicoInternoAsync(nomeMetodo, argumentos, 0);
        }

        private async ChamarServicoInternoAsync(
            nomeMetodo: string,
            argumentos: IArguments,
            tentativa: number) 
        {
            const metodo: Function = (this as any)[nomeMetodo] as Function;
            const callback: Function = argumentos[(argumentos.length - 1)];

            if (!u.ValidacaoUtil.IsFunction(metodo) ||
                String.IsNullOrWhiteSpace(nomeMetodo))
            {
                throw new ErroNaoDefinido("Método não definido ou nome invalido " + nomeMetodo, this);
            }
            if (!u.ValidacaoUtil.IsFunction(callback))
            {
                throw new ErroNaoDefinido("Callback não definido nos argumentos", this);
            }

            const parametros = this.RetornarParametros(nomeMetodo, metodo, argumentos, true);

            const contrato = this.RetornarContratoChamada(nomeMetodo, parametros, true);
            const nomeManipualdor = this.RetornarNomeManipulador();
            const jsonConteudo = u.JsonUtil.Serializar(contrato);
            const credencial = this.CredencialServico;
            const urlServidor = this.URLServico;

            const token = await s.Token.RetornarTokenAsync();

            const chamadaServico = new ChamadaServicoAsync(
                urlServidor,
                nomeManipualdor,
                jsonConteudo,
                credencial, token);

            const resultadoChamada = await chamadaServico.ChamarAsync();
            /*const callback: Function = argumentos[(argumentos.length - 1)];*/
            if (resultadoChamada instanceof ResultadoChamadaErro)
            {
                this.NotificarErroChamada(
                    nomeMetodo,
                    argumentos,
                    chamadaServico,
                    resultadoChamada,
                    tentativa);

                return;
            }

            if (BaseComunicacaoCliente.IsExisteFalhaConexao)
            {
                BaseComunicacaoCliente.IsExisteFalhaConexao = false;
                $Aplicacao.EventoConexaoRestabelecida.Notificar(this, EventArgs.Empty);
            }

            const valorResultadoChamada = this.RetornarValorResultadoChamda(resultadoChamada);
            if (valorResultadoChamada instanceof ResultadoSessaoUsuarioInvalida)
            {
                u.SessaoUsuarioUtil.IniciarNovaSessaoUsuarioAnonima();
                if ($Configuracao.IsDebug || $Configuracao.IsTeste)
                {
                    alert("Reiniciando sessão do usuário");
                }
                window.location.reload();
                return;
            }

            callback(valorResultadoChamada);
            return valorResultadoChamada;
        }

        private NotificarErroChamada(
            nomeMetodo: string,
            argumentos: IArguments,
            chamarServico: ChamadaServicoAsync,
            resultadoChamada: ResultadoChamadaErro,
            tentativa: number): void
        {

            const isErroInternoServidor = resultadoChamada instanceof ResultadoChamadaErroInternoServidor;

            const sb = new StringBuilder();
            sb.AppendLine(`Erro interno no servidor (Status) ${chamarServico.HttpStatus}, tratamento do erro não implementado`);
            sb.AppendLine("Url: " + this.URLServico);
            sb.AppendLine("Serviço: " + this.RetornarNomeManipulador());
            sb.AppendLine("Operação: " + nomeMetodo);
            sb.AppendLine();

            const linhas = TextoUtil.RetornarLinhas(resultadoChamada.MensagemErro);
            for (const linha of linhas)
            {
                sb.AppendLine(linha);
            }

            const mensagem = sb.ToString();
            console.error(mensagem);

            if (!$Configuracao.IsDebug)
            {
                if (isErroInternoServidor && tentativa > BaseComunicacaoCliente.MAXIMA_TENTATIVA)
                {
                    throw new Error(mensagem);
                }
            }

            this.TentarUtilizarUrlServicoDebug(tentativa);

            this.TentarNovamenteAsync(
                resultadoChamada,
                nomeMetodo,
                isErroInternoServidor,
                argumentos,
                tentativa + 1);
        }

        private TentarUtilizarUrlServicoDebug(tentativa: number)
        {
            if (($Configuracao.IsDebug || ($Configuracao.IsTeste && tentativa > 3)) &&
                this.URLServico !== this.UrlServicoDebug &&
                !String.IsNullOrEmpty(this.UrlServicoDebug))
            {
                this.UsarUrlServicoDEBUG();
            }
        }

        public UsarUrlServicoDEBUG()
        {
            if (this._urlServico !== this.UrlServicoDebug)
            {
                const mensagem = `A URL serviço '${this.RetornarNomeManipulador()}' foi alterada para modo DEBUG,
                               UrlServicoDEBUG : '${this.UrlServicoDebug}'`;

                console.error(mensagem);
                alert(mensagem);

                this._urlServico = this.UrlServicoDebug;
            }
        }
        //#endregion

        //#region Chamar Sync

        protected ChamarServico<TResultado>(nomeMetodo: string, argumentos: IArguments): TResultado
        {
            throw new Erro("Chamada sincronizas obsoletas usar async", this);

            //let metodo: Function = (this as any)[nomeMetodo] as Function;
            //let nomesParametros = this.RetornarNomeParametros(metodo, false);
            //let parametros = this.RetornarParametros(nomesParametros, argumentos);
            //let contratoChamada = this.RetornarContratoChamada(nomeMetodo, parametros, false);
            //let jsonConteudo = u.JsonUtil.Serializar(contratoChamada);
            //let nomeManipualdor = this.RetornarNomeManipulador();
            //let chamarServico = new ChamadaServico(this.URLServico, nomeManipualdor, jsonConteudo, this.CredencialServico);
            //let resultadoChamada = chamarServico.Chamar();
            //return this.RetornarValorResultadoChamda(resultadoChamada);
        }

        // #endregion

        //#region Tentar novamente

        private async TentarNovamenteAsync(
            resultadoChamada: ResultadoChamadaErro,
            nomeMetodo: string,
            isErroInternoServidor: boolean,
            argumentos: IArguments,
            tentativa: number)
        {
            const args = new FalhaConexaoEventArgs(
                resultadoChamada,
                this.URLServico,
                this.RetornarNomeManipulador(),
                nomeMetodo,
                tentativa);

            $Aplicacao.EventoFalhaConexao.Notificar(this, args);

            if (!isErroInternoServidor && !BaseComunicacaoCliente.IsExisteFalhaConexao)
            {
                BaseComunicacaoCliente.IsExisteFalhaConexao = true;
                await u.InternetUtil.AguardarConexaoInternerAsync();
            }

            await u.ThreadUtil.EsperarAsync(TimeSpan.FromSeconds(BaseComunicacaoCliente.TEMPO_ESPERAR_FALHA * Math.min(tentativa, 10)));
            this.ChamarServicoInternoAsync(nomeMetodo, argumentos, tentativa);
        }

        //#endregion

        //// #region Resultado da chamada

        private RetornarValorResultadoChamda(resultadoChamada: ResultadoChamada): any
        {
            if (resultadoChamada instanceof ResultadoChamadaVazio)
            {
                return null;
            }
            if (resultadoChamada instanceof ResultadoChamadaTipoPrimario)
            {
                const resultadoChamadaTipoPrimario: ResultadoChamadaTipoPrimario = resultadoChamada;
                return u.ConverterUtil.ParaTipoPrimario(resultadoChamadaTipoPrimario.Valor, resultadoChamadaTipoPrimario.TipoPrimarioEnum);
            }

            if (resultadoChamada instanceof ResultadoChamadaBaseDominio)
            {
                const resultadoChamadaBaseDominio: ResultadoChamadaBaseDominio = resultadoChamada;
                return resultadoChamadaBaseDominio.BaseDominio;
            }
            if (resultadoChamada instanceof ResultadoChamadaLista)
            {
                return this.RetornarValorResultadoChamadaLista(resultadoChamada);
            }

            if (resultadoChamada instanceof ResultadoSessaoUsuarioInvalida)
            {
                u.SessaoUsuarioUtil.SairAsync();
                return;
            }
            throw new ErroNaoSuportado("Resultado chamada não suportado", this);
        }

        private RetornarValorResultadoChamadaLista(resultadoChamada: ResultadoChamadaLista): any
        {
            if (resultadoChamada instanceof ResultadoChamadaListaTipoPrimario)
            {
                //var resultadoChamdaListaTipoPrimario: ResultadoChamadaListaTipoPrimario = resultadoChamada;
                const lista = new Array<any>();
                const valores = resultadoChamada.Valores;
                const len = valores.length;

                for (let i = 0; i < len; i++)
                {
                    const valor = valores[i];
                    const valorTipado = u.ConverterUtil.ParaTipoPrimario(valor, resultadoChamada.TipoPrimarioEnum);
                    lista.Add(valorTipado);
                }
                return lista;
            }
            if (resultadoChamada instanceof ResultadoChamadaListaBaseDominio)
            {
                return resultadoChamada.BasesDominio;
            }
            throw new ErroNaoSuportado("Resultado chamada lista não suportado", this);
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
                        return valorParametro.Clonar(this.OpcoesClonarEntidades);
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

        public Ping(): boolean
        {
            return this.ChamarServico<boolean>("Ping", arguments);
        }

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