namespace Snebur
{
    export abstract class ObjetoControladorPropriedade extends Snebur.Objeto implements IDisposable
    {
        private static readonly __NOME_PROPRIEDADE_EVENTO_CONTROLE_DISPENSADO = "EventoControleDispensado";

        //readonly #__propriedadesAlteradas__ = new DicionarioSimples<d.PropriedadeAlterada>();
        //readonly #EventosNotificarPropriedadeAlterada = new DicionarioSimples<EventoPropriedadeAlterada>();
        //static readonly #__EventosProtegidos = [ObjetoControladorPropriedade.__NOME_PROPRIEDADE_EVENTO_CONTROLE_DISPENSADO];


        private readonly __propriedadesAlteradas__ = new DicionarioSimples<d.PropriedadeAlterada>();
        private readonly __EventosNotificarPropriedadeAlterada = new DicionarioSimples<EventoPropriedadeAlterada>();


        private __isNotificacaoAlteracaoPropriedadeAtiva: boolean = true;
        /*protected __IsControladorPropriedadesAlteradaAtivo: boolean = false;*/

        private static readonly __EventosProtegidos = [ObjetoControladorPropriedade.__NOME_PROPRIEDADE_EVENTO_CONTROLE_DISPENSADO];

        private get IsEntidadeClonada(): boolean
        {
            if (this instanceof Entidade)
            {
                return ((this as any) as IEntidadeClonada).___is_entidade_clonada__;
            }
            return false;
        }

        public get __PropriedadesAlteradas(): DicionarioSimples<d.PropriedadeAlterada>
        {
            return this.__propriedadesAlteradas__;
        }
        //public set __PropriedadesAlteradas(value: DicionarioSimples<d.PropriedadeAlterada>)
        //{
        //    //nao faz nada
        //}

        public get __IsExisteAlteracao(): boolean
        {
            return (this.__PropriedadesAlteradas.Count > 0);
        }

        /*protected __IsControladorPropriedadesAlteradaAtivo: boolean = false;*/

        private _propriedadesValidacoes: DicionarioSimples<PropriedadeValidacoes>;

        private get PropriedadesValidacoes(): DicionarioSimples<PropriedadeValidacoes>
        {
            if (!this._propriedadesValidacoes)
            {
                this._propriedadesValidacoes = new DicionarioSimples<PropriedadeValidacoes>();
            }
            return this._propriedadesValidacoes;
        }

        protected get IsNotificacaoAlteracaoPropriedadeAtiva(): boolean
        {
            return this.__isNotificacaoAlteracaoPropriedadeAtiva;
        }

        public get __IsMontarValorAntigoInicial(): boolean
        {
            return false;
        }

        public constructor()
        {
            super();

            //this.PropriedadesAlterada = new Array<PropriedadeAlteradaEventArgs>();
            //this.EventosNotificarPropriedadeAlterada = new DicionarioSimples<EventoPropriedadeAlterada>();
        }

        //#region Validação

        public AdicionarValidacao<T extends this = this>(expressaoPropriedade: (value: T) => any, validacao: IBaseValidacao): void;
        public AdicionarValidacao<T extends this = this>(expressaoPropriedade: (value: T) => any, ...validacoes: IBaseValidacao[]): void;
        public AdicionarValidacao<T extends this = this>(expressaoPropriedade: (value: T) => any, ...validacoes: IBaseValidacao[]): void
        {
            const propriedadeValidacoes = this.RetornarPropriedadeValidacoes(expressaoPropriedade);
            for (const valicacao of validacoes)
            {
                propriedadeValidacoes.Validacoes.Add(valicacao);
            }
        }

        public AdicionarValidacaoRequerido<T extends this = this>(...expressoesPropriedade: ((value: T) => any)[]): void
        {
            expressoesPropriedade = expressoesPropriedade.length === 1 && Array.isArray(expressoesPropriedade[0]) ?
                expressoesPropriedade[0] : expressoesPropriedade;

            for (const expressaoPropriedade of expressoesPropriedade)
            {
                const propriedadeValidacoes = this.RetornarPropriedadeValidacoes(expressaoPropriedade);
                const isExisteValidacaoRequerido = propriedadeValidacoes.Validacoes.Any(x => x instanceof at.ValidacaoRequeridoAttribute);
                if (!isExisteValidacaoRequerido)
                {
                    propriedadeValidacoes.Validacoes.Add(new at.ValidacaoRequeridoAttribute());
                }
            }
        }

        public AdicionarValidacaoTextoTamanho<T extends this = this>(expressaoPropriedade: (value: T) => string, tamanhoMaximo: number): void
        {
            this.AdicionarValidacoesTextoTamanho([expressaoPropriedade, tamanhoMaximo]);
        }

        public AdicionarValidacoesTextoTamanho<T extends this = this>(...expressoesPropriedade: [((value: T) => string), number][]): void
        {
            for (const [expressaoPropriedade, tamanhoMaximo] of expressoesPropriedade)
            {
                const propriedadeValidacoes = this.RetornarPropriedadeValidacoes(expressaoPropriedade);
                const validacaoTextoTamanho = propriedadeValidacoes.Validacoes.OfType(at.ValidacaoTextoTamanhoAttribute).SingleOrDefault();
                if (validacaoTextoTamanho == null)
                {
                    propriedadeValidacoes.Validacoes.Add(new at.ValidacaoTextoTamanhoAttribute(0, tamanhoMaximo));
                }
                else
                {
                    validacaoTextoTamanho.TamanhoMinimo = 0;
                    validacaoTextoTamanho.TamanhoMaximo = tamanhoMaximo;
                }
            }
        }

        public async RetornarMensagemValidacoesPendenteAsync(): Promise<List<string>>
        {
            const retorno = new List<string>();
            const propriedades = this.GetType().RetornarPropriedades(false);
            for (const propriedade of propriedades)
            {
                const propriedadeValidacoes = this.PropriedadesValidacoes.TryItem(propriedade.Nome);
                if (propriedadeValidacoes instanceof PropriedadeValidacoes)
                {
                    const valorPropriedade = propriedade.RetornarValor(this);
                    for (const validacao of propriedadeValidacoes.Validacoes)
                    {
                        const isValido = await validacao.IsValidoAsync(this, propriedade, valorPropriedade);
                        if (!isValido)
                        {
                            const mensagem = validacao.RetornarMensagemValidacao(this, propriedade, valorPropriedade);
                            retorno.Add(mensagem);
                            break;
                        }
                    }
                }
            }
            return retorno;
        }

        public RetornarPropriedadeValidacoes(nomePropriedade: string): PropriedadeValidacoes;
        public RetornarPropriedadeValidacoes<T>(expressaoPropriedade: (value: T) => any): PropriedadeValidacoes;
        public RetornarPropriedadeValidacoes<T>(expressaoPropriedadeOuNomePropriedade: ((value: T) => any) | string): PropriedadeValidacoes
        {
            const caminhoPropriedade = typeof expressaoPropriedadeOuNomePropriedade === "string" ?
                expressaoPropriedadeOuNomePropriedade :
                u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoPropriedadeOuNomePropriedade);

            if (!this.PropriedadesValidacoes.ContainsKey(caminhoPropriedade))
            {
                const propriedade = this.RetornarPropriedadeInterno(caminhoPropriedade);
                const propriedadesValidacoes = new PropriedadeValidacoes(caminhoPropriedade, propriedade);
                this.PropriedadesValidacoes.Add(caminhoPropriedade, propriedadesValidacoes);
            }
            return this.PropriedadesValidacoes.Item(caminhoPropriedade);
        }

        private RetornarPropriedadeInterno(nome: string): r.Propriedade
        {
            if (nome.Contains("."))
            {
                throw new Erro(`Não possível retornar um propriedade filho, '${nome}', execute a operação no pai da propriedade`);
            }

            let propriedade = this.GetType().RetornarPropriedade(nome, true);
            if (!(propriedade instanceof r.Propriedade))
            {
                const valor = (this as any)[nome]?.GetType() ?? u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.Object);
                propriedade = new r.Propriedade(nome, valor, this.GetType(), true);
                this.GetType().AdicionarPropriedade(propriedade);
                return this.RetornarPropriedadeInterno(nome);
            }
            return propriedade;
        }
        /**
         * 
         * @param expressaoPropriedade
         * @param construtor
         * @param rotulo rotulo, q será mostrar nas notificações
         * @param callbackValorAlterado As alterações do propriedades serão ativar depois do controle inicializado, EventoCarregado, 
         * para utilizar dentro do EventoCarregado, declarar 
         * public async Controle_Carregado {
         *     await ThreadUtil.QuebrarAsync()
         * }
         * @param isAceitaNulo
         */
        public DeclararPropriedade<TPropriedade, TThis extends this = this>(expressaoPropriedade: (value: TThis) => TPropriedade, construtor: IConstrutor<TPropriedade>, rotulo?: string, callbackValorAlterado?: CallbackT<PropriedadeAlteradaEventArgs<TPropriedade>>, isAceitaNulo?: boolean): void;
        public DeclararPropriedade<TPropriedade, TThis extends this = this>(expressaoPropriedade: (value: TThis) => TPropriedade, construtor: IConstrutor<TPropriedade>, callbackValorAlterado?: CallbackT<PropriedadeAlteradaEventArgs<TPropriedade>>): void;
        public DeclararPropriedade<TPropriedade, TThis extends this = this>(expressaoPropriedade: (value: TThis) => TPropriedade[keyof TPropriedade], construtorEnum: TPropriedade, rotulo?: string, callbackValorAlterado?: CallbackT<PropriedadeAlteradaEventArgs<TPropriedade[keyof TPropriedade]>>, isAceitaNulo?: boolean): void;
        public DeclararPropriedade<TPropriedade, TThis extends this = this>(expressaoPropriedade: (value: TThis) => TPropriedade[keyof TPropriedade], construtorEnum: TPropriedade, callbackValorAlterado?: CallbackT<PropriedadeAlteradaEventArgs<TPropriedade[keyof TPropriedade]>>): void;
        public DeclararPropriedade(expressaoPropriedade: string, construtor: Function, rotulo?: string, callbackValorAlterado?: CallbackT<PropriedadeAlteradaEventArgs<any>>, isAceitaNulo?: boolean): void;
        public DeclararPropriedade(expressaoPropriedade: string, construtor: Function, callbackValorAlterado?: CallbackT<PropriedadeAlteradaEventArgs<any>>): void;
        /*public DeclararPropriedade<TPropriedade, TThis extends this = this>(expressaoPropriedade: (value: TThis) => TPropriedade | string, argumentoTipo: IConstrutor<TPropriedade>, rotuloOuCallbackValorAlterado: string | CallbackT<PropriedadeAlteradaEventArgs> = null, argumentocallbackValorAlterado: CallbackT<PropriedadeAlteradaEventArgs> = null, isAceitaNulo = true): void*/
        public DeclararPropriedade(expressaoPropriedade: Function | string, argumentoTipo: Function, rotuloOuCallbackValorAlterado: string | CallbackT<PropriedadeAlteradaEventArgs> = null, argumentocallbackValorAlterado: CallbackT<PropriedadeAlteradaEventArgs> = null, isAceitaNulo = true): void
        {
            const nomePropriedade = typeof expressaoPropriedade === "string" ?
                expressaoPropriedade :
                u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoPropriedade);

            const callbackValorAlterado = rotuloOuCallbackValorAlterado instanceof Function ? rotuloOuCallbackValorAlterado : argumentocallbackValorAlterado;

            this.___DeclararPropriedadeInterno(nomePropriedade, callbackValorAlterado);

            let propriedade = this.GetType().RetornarPropriedade(nomePropriedade, true);
            if (!(propriedade instanceof r.Propriedade))
            {
                const tipo = this.RetornarTipoPropriedadeDeclarada(argumentoTipo);
                propriedade = new r.Propriedade(nomePropriedade, tipo, this.GetType(), isAceitaNulo);
                this.GetType().AdicionarPropriedade(propriedade);

                const rotulo = typeof rotuloOuCallbackValorAlterado === "string" ? rotuloOuCallbackValorAlterado : null;
                if (!String.IsNullOrWhiteSpace(rotulo))
                {
                    const atributoRotulo = new at.RotuloAttribute(rotulo);
                    propriedade.Atributos.Add(atributoRotulo);
                }
            }
        }

        private ___DeclararPropriedadeInterno(nomePropriedade: string, callbackValorAlterado: CallbackT<PropriedadeAlteradaEventArgs>): void
        {
            const nomeCampoPrivado = this.RetornarNomeCampoPrivado(nomePropriedade);
            const valorInicial = (this as any)[nomePropriedade];

            (this as any)[nomeCampoPrivado] = u.ValidacaoUtil.IsDefinido(valorInicial) ? valorInicial : null;

            Object.defineProperty(this, nomePropriedade, {
                get: function ()
                {
                    return this[nomeCampoPrivado];
                },
                set: function (value: any)
                {
                    if (Util.IsDiferente(value, this[nomeCampoPrivado]))
                    {
                        this.NotificarValorPropriedadeAlterada(nomePropriedade, this[nomeCampoPrivado], this[nomeCampoPrivado] = value);
                    }
                },
                enumerable: true,
                configurable: true
            });

            if (u.ValidacaoUtil.IsFunction(callbackValorAlterado))
            {
                if (!FuncaoUtil.IsExisteBind(callbackValorAlterado))
                {
                    callbackValorAlterado = callbackValorAlterado.bind(this);
                }

                const funcaoPropriedadeAlterada = (provedor: any, e: PropriedadeAlteradaEventArgs) =>
                {
                    if (this.IsNotificacaoAlteracaoPropriedadeAtiva)
                    {
                        callbackValorAlterado(e);
                    }
                };

                this.AdicionarManipuladorPropriedadeAlterada(nomePropriedade, funcaoPropriedadeAlterada, null);
            }
        }

        private RetornarNomeCampoPrivado(nomePropriedade: string): string
        {
            return "_" + TextoUtil.FormatarPrimeiraLetraMinuscula(nomePropriedade);
        }

        //public AdicionarManipuladorPropriedadeAlterada

        public RetornarTipoPropriedadeDeclarada(funcaoOucaminhoTipo: r.BaseTipo | Function | string): any
        {
            let tipo: r.BaseTipo;
            if (u.ValidacaoUtil.IsFunction(funcaoOucaminhoTipo.GetType) &&
                (tipo = funcaoOucaminhoTipo.GetType()) instanceof r.BaseTipo)
            {
                return tipo;
            }

            if (typeof funcaoOucaminhoTipo === "string")
            {
                return $Reflexao.Tipos.Item(funcaoOucaminhoTipo);
            }

            throw new Erro("O caminho da função ou nome do tipo não foi encontrado");
        }

        //utilizado para debugar

        public async RetornarTodasMensagemValidacoesPendentesAsync(): Promise<List<string>>
        {
            const mensagens = new List<string>();
            for (const propriedadeValidacao of this.PropriedadesValidacoes.Valores)
            {
                const valorPropriedade = (this as any)[propriedadeValidacao.NomePropriedade];
                const propriedade = propriedadeValidacao.Propriedade;
                for (const validacao of propriedadeValidacao.Validacoes)
                {
                    const isValido = await validacao.IsValidoAsync(this, propriedade, valorPropriedade);
                    if (!isValido)
                    {
                        const mensagem = validacao.RetornarMensagemValidacao(this, propriedade, valorPropriedade);
                        mensagens.Add(mensagem);
                    }
                }
            }
            return mensagens;
        }

        //#endregion

        //#region Notificação das propriedades

        protected NotificarPropriedadeAlterada<T extends this = this>(expressaoPropriedade: (value: T) => any): void;
        protected NotificarPropriedadeAlterada<T extends this = this>(expressaoPropriedade: (value: T) => any, antigoValor: any): void;
        protected NotificarPropriedadeAlterada<T extends this = this>(expressaoPropriedade: (value: T) => any, antigoValor: any, novoValor: any): void;
        protected NotificarPropriedadeAlterada(nomePropriedade: string): void;
        protected NotificarPropriedadeAlterada(nomePropriedade: string, valor: any): void;
        protected NotificarPropriedadeAlterada(nomePropriedade: string, antigoValor: any, novoValor: any): void;
        protected NotificarPropriedadeAlterada(nomePropriedade: string | Function, antigoValor?: any, novoValor?: any): void
        {
            if (typeof nomePropriedade === "function")
            {
                nomePropriedade = u.ExpressaoUtil.RetornarCaminhoPropriedade(nomePropriedade);
            }

            if (antigoValor === undefined && novoValor === undefined)
            {
                this.NotificarPropriedadeAlteraSimples(nomePropriedade);
            }
            else
            {
                this.NotificarValorPropriedadeAlterada(nomePropriedade, antigoValor, novoValor);
            }
        }

        protected NotificarValorPropriedadeAlterada(nomePropriedade: string, valor: any): void;
        protected NotificarValorPropriedadeAlterada(nomePropriedade: string, antigoValor: any, novoValor: any): void;
        protected NotificarValorPropriedadeAlterada(nomePropriedade: string, antigoValor: any, novoValor: any, nomePropriedadeEntidade: string, nomePropriedadeTipoComplexo: string): void;
        protected NotificarValorPropriedadeAlterada(nomePropriedade: string, antigoValor: any, novoValor?: any, nomePropriedadeEntidade?: string, nomePropriedadeTipoComplexo?: string): void
        {
            if (this.IsNotificacaoAlteracaoPropriedadeAtiva)
            {
                if (typeof antigoValor === "undefined" && typeof novoValor === "undefined")
                {
                    antigoValor = (this as any)[nomePropriedade];
                }

                if (typeof novoValor === "undefined")
                {
                    novoValor = antigoValor;
                }

                const propriedade = this.GetType().RetornarPropriedade(nomePropriedade);
                let propriedadeAlterada = this.__PropriedadesAlteradas.TryItem(nomePropriedade);

                if (propriedadeAlterada instanceof d.PropriedadeAlterada)
                {
                    if (u.Util.IsIgual(propriedadeAlterada.AntigoValor, novoValor) && !this.IsEntidadeClonada)
                    {
                        this.__PropriedadesAlteradas.Remove(nomePropriedade);
                    }

                    if (!this.__IsMontarValorAntigoInicial)
                    {
                        if (propriedadeAlterada.AntigoValor !== antigoValor)
                        {
                            propriedadeAlterada.AntigoValor = antigoValor;
                        }
                    }
                    propriedadeAlterada.NovoValor = novoValor;
                }
                else
                {
                    propriedadeAlterada = d.PropriedadeAlterada.Create(
                        nomePropriedade,
                        antigoValor,
                        novoValor,
                        nomePropriedadeEntidade,
                        nomePropriedadeTipoComplexo);

                    if (!u.Util.IsIgual(antigoValor, novoValor) || this.IsEntidadeClonada)
                    {
                        if (propriedade != null &&
                            (propriedade.Tipo instanceof r.TipoPrimario ||
                                propriedade.Tipo instanceof r.TipoEnum))
                        {
                            this.__PropriedadesAlteradas.Add(nomePropriedade, propriedadeAlterada);
                        }

                        // propriedade mapeadas do tipo complexo
                        if ((propriedade == null) && nomePropriedade.Contains("_")) 
                        {
                            this.__PropriedadesAlteradas.Add(nomePropriedade, propriedadeAlterada);
                        }
                    }
                }

                if (this.__EventosNotificarPropriedadeAlterada.Existe(nomePropriedade))
                {
                    const eventoPropriedade = this.__EventosNotificarPropriedadeAlterada.Item(nomePropriedade);
                    const args = new PropriedadeAlteradaEventArgs(propriedade, propriedadeAlterada);
                    eventoPropriedade.Notificar(this, args);
                }
            }
        }



        public AdicionarManipuladorPropriedadeAlterada<T extends this = this>(expressaoPropriedade: (value: T) => any, callbackEvento: PropriedadeAlteradaHandlder, objetoBind: any): void;
        public AdicionarManipuladorPropriedadeAlterada(nomePropriedade: string, callbackEvento: PropriedadeAlteradaHandlder, objetoBind: any): void;
        public AdicionarManipuladorPropriedadeAlterada(nomePropriedadeOuExpressao: string | Function, callbackEvento: PropriedadeAlteradaHandlder, objetoBind: any): void
        {
            const nomePropriedade = this.RetornarNomePropriedade(nomePropriedadeOuExpressao);
            if (!this.__EventosNotificarPropriedadeAlterada.Existe(nomePropriedade))
            {
                this.__EventosNotificarPropriedadeAlterada.Adicionar(nomePropriedade, new EventoPropriedadeAlterada(this, nomePropriedade));
            }
            const eventoPropriedade = this.__EventosNotificarPropriedadeAlterada.Item(nomePropriedade);
            eventoPropriedade.AddHandler(callbackEvento, objetoBind);
        }

        public RemoverManipuladorPropriedadeAlterada<T extends this = this>(expressaoPropriedade: (value: T) => any, callbackEvento: PropriedadeAlteradaHandlder, objetoBind: any): void;
        public RemoverManipuladorPropriedadeAlterada(nomePropriedade: string, callbackEvento: PropriedadeAlteradaHandlder, objetoBind: any): void;
        public RemoverManipuladorPropriedadeAlterada(nomePropriedadeOuExpressao: string | Function, callbackEvento: PropriedadeAlteradaHandlder, objetoBind: any): void
        {
            const nomePropriedade = this.RetornarNomePropriedade(nomePropriedadeOuExpressao);
            if (this.__EventosNotificarPropriedadeAlterada.Existe(nomePropriedade))
            {
                const eventoPropriedade = this.__EventosNotificarPropriedadeAlterada.Item(nomePropriedade);
                eventoPropriedade.RemoveHandler(callbackEvento, objetoBind);
            }
        }

        protected AtivarNotificacaoPropriedadeAlterada(): void
        {
            this.__isNotificacaoAlteracaoPropriedadeAtiva = true;
            /*this.__IsControladorPropriedadesAlteradaAtivo = true;*/
        }

        protected DesativarNotificacaoPropriedadeAlterada(): void
        {
            this.__isNotificacaoAlteracaoPropriedadeAtiva = false;
        }

        protected RemoverTodosHandlersPropriedadeAlterada(): void
        {
            this.__EventosNotificarPropriedadeAlterada.Clear();
        }

        public RetornarNomePropriedade(nomePropriedade: string): string;
        public RetornarNomePropriedade<T extends this = this>(expressaoPropriedade: (value: T) => any): string;
        public RetornarNomePropriedade(expressaoPropriedadeOuNomePropriedade: Function | string): string;
        public RetornarNomePropriedade(expressaoPropriedadeOuNomePropriedade: Function | string): string
        {
            if (typeof expressaoPropriedadeOuNomePropriedade === "function")
            {
                return u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoPropriedadeOuNomePropriedade);
            }
            return expressaoPropriedadeOuNomePropriedade;
        }
        //#endregion

        public RetornarPropriedade<T extends this = this>(expressaoPropriedade: (value: T) => any): r.Propriedade
        {
            return this.GetType().RetornarPropriedade(expressaoPropriedade);
        }

        //#region Propriedade privadas

        private NotificarPropriedadeAlteraSimples(nomePropriedade: string): void
        {
            if (this.__EventosNotificarPropriedadeAlterada.Existe(nomePropriedade))
            {
                const eventoPropriedade = this.__EventosNotificarPropriedadeAlterada.Item(nomePropriedade);
                const propriedade = this.GetType().RetornarPropriedade(nomePropriedade);
                const valorPropriedade = (this as any)[nomePropriedade];

                const propriedadeAlterada = new d.PropriedadeAlterada(
                    nomePropriedade,
                    valorPropriedade,
                    valorPropriedade);

                eventoPropriedade.Notificar(this, new PropriedadeAlteradaEventArgs(propriedade, propriedadeAlterada));
            }
        }

        //#endregion

        /**
         * Atribuir valor na propriedade sem notificar
         * @param expressao Expressão da propriedade
         */
        public AttSn<TVAlorPropriedade, TThis extends this>(expressao: (value: TThis) => TVAlorPropriedade, novoValor: TVAlorPropriedade): void
        {
            this.AtribuirSemNotificar(expressao, novoValor);
        }

        public AtribuirSemNotificar<TVAlorPropriedade, TThis extends this>(expressao: (value: TThis) => any, novoValor: TVAlorPropriedade): void
        {
            const nomePropriedade = ExpressaoUtil.RetornarCaminhoPropriedade(expressao);
            const nomeCampoPrivado = this.RetornarNomeCampoPrivado(nomePropriedade);
            const valorAtual = (this as any)[nomeCampoPrivado];
            if (valorAtual === undefined)
            {
                throw new Erro(`A campo privado da propriedade ${valorAtual} não está definido`);
            }
            (this as any)[nomeCampoPrivado] = novoValor;
        }

        public override Dispose(): void
        {
            super.Dispose();

            this.RemoverTodosHandlersPropriedadeAlterada();

            const propriedades = Object.keys(this);
            for (const nomePropriedade of propriedades)
            {
                /* eslint-disable */
                if (this.hasOwnProperty(nomePropriedade))
                {
                    /* eslint-enable */
                    const valorPropriedade = (this as any)[nomePropriedade];
                    if (valorPropriedade instanceof Evento)
                    {
                        if (!ObjetoControladorPropriedade.__EventosProtegidos.Contains(nomePropriedade))
                        {
                            valorPropriedade.Dispose();
                            delete (this as any)[nomePropriedade];
                        }
                    }

                    else if (valorPropriedade instanceof ExecutarDepois)
                    {
                        valorPropriedade.Dispose();
                        delete (this as any)[nomePropriedade];
                    }
                }
            }
        }
    }

    export interface IObjetoControladorPropriedade
    {
        /*__IsControladorPropriedadesAlteradaAtivo: boolean;*/

        NotificarPropriedadeAlterada(nomePropriedade: string, valor: any): void;
        NotificarPropriedadeAlterada(nomePropriedade: string, antigoValor: any, novoValor: any): void;
        NotificarPropriedadeAlterada(nomePropriedade: string, antigoValor: any, novoValor?: any): void;

        NotificarValorPropriedadeAlterada(nomePropriedade: string, valor: any): void;
        NotificarValorPropriedadeAlterada(nomePropriedade: string, antigoValor: any, novoValor: any): void;
        NotificarValorPropriedadeAlterada(nomePropriedade: string, antigoValor: any, novoValor: any, nomePriporiedadeEntidade: string, nomePropriedadeTipoComplexo: string): void;

        AdicionarManipuladorPropriedadeAlterada(nomePropriedade: string, callbackEvento: PropriedadeAlteradaHandlder): void;
        RemoverManipuladorPropriedadeAlterada(nomePropriedade: string, callbackEvento: PropriedadeAlteradaHandlder): void;

        AtivarNotificacaoPropriedadeAlterada(): void;
        DesativarNotificacaoPropriedadeAlterada(): void;
        RemoverTodosHandlersPropriedadeAlterada(): void;
    }
}