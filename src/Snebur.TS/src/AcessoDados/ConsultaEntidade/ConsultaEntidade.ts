namespace Snebur.AcessoDados
{
    export class ConsultaEntidade<TEntidade extends Snebur.Dominio.IEntidade | Snebur.Dominio.Entidade> extends BaseConsultaEntidade implements IConsultaEntidade<TEntidade>
    {

        public constructor(contextoDados: BaseContextoDados, tipoEntidadeConsulta: r.BaseTipo)
        {
            super(contextoDados, tipoEntidadeConsulta);
        }

        public get IsMostrarDeletados(): boolean
        {
            return this.EstruturaConsulta.IsMostrarDeletados;
        }

        public set IsMostrarDeletados(value: boolean)
        {
            this.EstruturaConsulta.IsMostrarDeletados = value;
        }
        //#region Chamadas serviço  Síncronas

        //public RetornarResultadoConsulta(): ResultadoConsulta
        //{
        //    return this.ContextoDados.RetornarResultadoConsulta(this.EstruturaConsulta);
        //}

        //public ToList(): ListaEntidades<TEntidade>
        //{
        //    throw new Erro("usar wait", this);
        //    //return this.RetornarResultadoConsultaEntidades();
        //}

        //public Single(): TEntidade
        //{
        //    throw new Erro("usar wait", this);

        //    //this.EstruturaConsulta.Take = 2;
        //    //var entidades = this.RetornarResultadoConsultaEntidades();
        //    //return entidades.Single();
        //}

        //public SingleOrDefault(): TEntidade
        //{

        //    throw new Erro("usar wait", this);

        //    //this.EstruturaConsulta.Take = 2;
        //    //var entidades = this.RetornarResultadoConsultaEntidades();
        //    //return entidades.SingleOrDefault();
        //}

        //public First(): TEntidade
        //{
        //    throw new Erro("usar wait", this);

        //    //this.EstruturaConsulta.Take = 1;
        //    //var entidades = this.RetornarResultadoConsultaEntidades();
        //    //return entidades.First();
        //}

        //public FirstOrDefault(): TEntidade
        //{
        //    throw new Erro("usar wait", this);

        //    //this.EstruturaConsulta.Take = 1;
        //    //var entidades = this.RetornarResultadoConsultaEntidades();
        //    //return entidades.FirstOrDefault();
        //}
        ////Funções

        //public Count(): number
        //{
        //    throw new Erro("usar wait", this);

        //    //return this.RetornarValorFuncao<number>(EnumTipoFuncao.Contar, null);
        //}

        //public Min(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): number
        //{
        //    throw new Erro("usar wait", this);

        //    //return this.RetornarValorFuncao<number>(EnumTipoFuncao.Minimo, expressaoPropriedade);
        //}

        //public Max(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): number
        //{
        //    throw new Erro("usar wait", this);

        //    //return this.RetornarValorFuncao<number>(EnumTipoFuncao.Maximo, expressaoPropriedade);
        //}

        //public Average(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): number
        //{
        //    throw new Erro("usar wait", this);

        //    //return this.RetornarValorFuncao<number>(EnumTipoFuncao.Media, expressaoPropriedade);
        //}

        //public Sum(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): number
        //{
        //    throw new Erro("usar wait", this);

        //    //return this.RetornarValorFuncao<number>(EnumTipoFuncao.Somar, expressaoPropriedade);
        //}
        //#endregion

        //#region Chamadas serviço Assíncronas

        private async __RetornarResultadoConsultaInternoAsync(callback: CallbackResultado<ResultadoConsulta>)
        {
            const resultado = await this.ContextoDados.RetornarResultadoConsultaAsync(this.EstruturaConsulta);
            callback(resultado);
            /*this.ContextoDados.__RetornarResultadoConsultaInternoAsync(this.EstruturaConsulta, callback);*/
        }

        private __ToListInternoAsync(callback: CallbackResultado<ListaEntidades<TEntidade>>): void
        {
            this.__RetornarResultacoConsultaEntiadesInternoAsync(callback);
        }

        private __SingleInternoAsync(callback: CallbackResultado<TEntidade>): void
        {
            this.__RetornarResultacoConsultaEntiadesInternoAsync(function (callbackResposta: CallbackResultado<TEntidade>, entidades: ListaEntidades<TEntidade>)
            {
                callbackResposta(entidades.Single());
            }.bind(this, callback));
        }

        private __SingleOrDefaultInternoAsync(callback: CallbackResultado<TEntidade>): void
        {
            this.__RetornarResultacoConsultaEntiadesInternoAsync(function (callbackResposta: CallbackResultado<TEntidade | null>, entidades: ListaEntidades<TEntidade>)
            {
                callbackResposta(entidades.SingleOrDefault());
            }.bind(this, callback));
        }

        private __FirstInternoAsync(callback: CallbackResultado<TEntidade>): void
        {
            this.__RetornarResultacoConsultaEntiadesInternoAsync(function (callbackResposta: CallbackResultado<TEntidade>, entidades: ListaEntidades<TEntidade>)
            {
                callbackResposta(entidades.First());
            }.bind(this, callback));
        }

        private __FirstOrDefaultInternoAsync(callback: CallbackResultado<TEntidade>): void
        {
            this.__RetornarResultacoConsultaEntiadesInternoAsync(function (callbackResposta: CallbackResultado<TEntidade | null>, entidades: ListaEntidades<TEntidade>)
            {
                callbackResposta(entidades.FirstOrDefault());
            }.bind(this, callback));
        }
        //Funções Async

        private __CountInternoAsync(callback: CallbackResultado<number>): void
        {
            this.__RetornarValorFuncaoInternoAsync(EnumTipoFuncao.Contar, null, callback);
        }

        private __MinInternoAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number> | CallbackResultado<Date>): void
        {
            this.__RetornarValorFuncaoInternoAsync(EnumTipoFuncao.Minimo, expressaoPropriedade, callback);
        }

        public __MaxInternoAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number> | CallbackResultado<Date>): void
        {
            this.__RetornarValorFuncaoInternoAsync(EnumTipoFuncao.Maximo, expressaoPropriedade, callback);
        }

        public __AverageInternoAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number> | CallbackResultado<Date>): void
        {
            this.__RetornarValorFuncaoInternoAsync(EnumTipoFuncao.Media, expressaoPropriedade, callback);
        }

        public __SumInternoAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number> | CallbackResultado<Date>): void
        {
            this.__RetornarValorFuncaoInternoAsync(EnumTipoFuncao.Somar, expressaoPropriedade, callback);
        }
        //#endregion

        //#region Chamadas Async

        public RetornarResultadoConsultaAsync(): Promise<ResultadoConsulta>
        {
            return new Promise<ResultadoConsulta>(resolver =>
            {
                this.__RetornarResultadoConsultaInternoAsync(function (resultadoConsulta: ResultadoConsulta)
                {
                    resolver(resultadoConsulta);
                });
            });
        }

        public ToListAsync(): Promise<ListaEntidades<TEntidade>>
        {
            return new Promise<ListaEntidades<TEntidade>>(resolver =>
            {
                this.__RetornarResultacoConsultaEntiadesInternoAsync(function (entidades: ListaEntidades<TEntidade>)
                {
                    resolver(entidades);
                });
            });
        }

        public FindAsync(id:number): Promise<TEntidade>
        {
            return this.Where(x => x.Id === id).SingleOrDefaultAsync();
        }

        public SingleAsync(): Promise<TEntidade>
        {
            return new Promise<TEntidade>(resolver =>
            {
                this.__SingleInternoAsync(function (entidade: TEntidade)
                {
                    resolver(entidade);
                });
            });
        }

        public SingleOrDefaultAsync(): Promise<TEntidade>
        {
            return new Promise<TEntidade>(resolver =>
            {
                this.__SingleOrDefaultInternoAsync(function (entidade: TEntidade)
                {
                    resolver(entidade);
                });
            });
        }

        public FirstAsync(): Promise<TEntidade>
        {
            return new Promise<TEntidade>(resolver =>
            {
                this.__FirstInternoAsync(function (entidade: TEntidade)
                {
                    resolver(entidade);
                });
            });
        }

        public FirstOrDefaultAsync(): Promise<TEntidade>
        {
            return new Promise<TEntidade>(resolver =>
            {
                this.__FirstOrDefaultInternoAsync(function (entidade: TEntidade)
                {
                    resolver(entidade);
                });
            });
        }
        //Funções

        public CountAsync(): Promise<number>
        {
            return new Promise<number>(resolver =>
            {
                this.__CountInternoAsync(function (resultado: number)
                {
                    resolver(resultado);
                });
            });
        }

        public MinAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): Promise<number | Date>
        {
            throw new ErroNaoImplementado(this);
            //return new Promise<number | Date>(resolver =>
            //{
            //    this.MinAsync(expressaoPropriedade, function (resultado: number)
            //    {
            //        resolver(resultado);
            //    });
            //});
        }

        public MaxAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): Promise<number | Date>
        {
            throw new ErroNaoImplementado(this);
            //return new Promise<number | Date>(resolver =>
            //{
            //    this.MaxAsync(expressaoPropriedade, function (resultado: number)
            //    {
            //        resolver(resultado);
            //    });
            //});
        }

        public AverageAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): Promise<number>
        {
            throw new ErroNaoImplementado(this);
            //return new Promise<number | Date>(resolver =>
            //{
            //    this.AverageAsync(expressaoPropriedade, function (resultado: number)
            //    {
            //        resolver(resultado);
            //    });
            //});
        }

        public SumAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): Promise<number>
        {
            //throw new ErroNaoImplementado(this);
            return new Promise<number>(resolver =>
            {
                this.__SumInternoAsync(expressaoPropriedade, function (resultado: number)
                {
                    resolver(resultado);
                });
            });
        }
        //#endregion

        //#region Filtros 

        public Where(expressaoFuncaoFiltro: (value: TEntidade, index: number, array: TEntidade[]) => boolean, ...argumentos: any[]): ConsultaEntidade<TEntidade>
        {
            const expressaoGrupoE = u.ExpressaoUtil.RetornarExpressaoGrupoE(expressaoFuncaoFiltro, this.TipoEntidadeConsulta, argumentos);
            this.AdicionarFiltro(this.EstruturaConsulta, this.EstruturaConsulta.FiltroGrupoE, expressaoGrupoE);
            return this;
        }

        public WhereOr(expressaoFuncaoFiltro: (value: TEntidade, index: number, array: TEntidade[]) => boolean, ...argumentos: any[]): ConsultaEntidade<TEntidade>
        {
            const expressaoGrupoOU = u.ExpressaoUtil.RetornarExpressaoGrupoOU(expressaoFuncaoFiltro, this.TipoEntidadeConsulta, argumentos);
            this.AdicionarFiltro(this.EstruturaConsulta, this.EstruturaConsulta.FiltroGrupoOU, expressaoGrupoOU);
            return this;
        }

        public WhereIds(ids: List<number>): ConsultaEntidade<TEntidade>
        {
            this.EstruturaConsulta.FiltroGrupoE.Filtros.Add(new FiltroIds(ids));
            return this;
        }

        public WhereIn(expressaoCaminhoPropriedade: (value: TEntidade) => number | string, lista: List<number | string>): ConsultaEntidade<TEntidade>
        {
            const caminhoPropriedade = this.RetornarCaminhoPropriedade(expressaoCaminhoPropriedade);
            this.EstruturaConsulta.FiltroGrupoE.Filtros.Add(new FiltroPropriedadeIn(caminhoPropriedade, lista.ToList<string>()));
            return this;
        }

        public OfType<TEspecializacao extends TEntidade>(TConstrutorEspecializacao: IConstrutor<TEspecializacao>): ConsultaEntidade<TEspecializacao>
        {
            const tipoEspecializacao: r.TipoEntidade = TConstrutorEspecializacao.GetType() as r.TipoEntidade;
            if (!(tipoEspecializacao instanceof r.TipoEntidade))
            {
                throw new ErroNaoSuportado(`O tipo da especialização não é suportado`, this);
            }
            this._tipoEntidadeConsulta = tipoEspecializacao;
            this.EstruturaConsulta.TipoEntidadeConsulta = tipoEspecializacao;
            this.EstruturaConsulta.NomeTipoEntidade = tipoEspecializacao.Nome;
            this.EstruturaConsulta.TipoEntidadeAssemblyQualifiedName = tipoEspecializacao.AssemblyQualifiedName;

            return (this as any) as ConsultaEntidade<TEspecializacao>;
            //throw new ErroNaoImplementado(this);
        }

        //public OfType<TFiltro extends TEntidade>(tipo: r.TipoBaseEntidade): ConsultaEntidade<TFiltro>
        //{
        //    throw new ErroNaoImplementado(this);
        //}

        //#endregion

        //#region AbrirRelacao 

        public AbrirRelacoes(caminho: string): ConsultaEntidade<TEntidade>
        {
            if (!String.IsNullOrWhiteSpace(caminho))
            {
                const caminhosPropriedade = caminho.split(",");
                const len = caminhosPropriedade.length;
                for (let i = 0; i < len; i++)
                {
                    const caminhoPropriedade = caminhosPropriedade[i].trim();
                    const propriedades = u.ReflexaoUtil.RetornarPropriedadesCaminho(this.TipoEntidadeConsulta, caminhoPropriedade, false, true);
                    this.AbrirRelacaoPropriedades(this.EstruturaConsulta, propriedades, false);
                }
            }
            return this;
        }

        public AbrirRelacao(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => d.Entidade): ConsultaEntidade<TEntidade>
        public AbrirRelacao(caminhoPropriedade: string): ConsultaEntidade<TEntidade>
        public AbrirRelacao(argumento: any): ConsultaEntidade<TEntidade>
        {
            const caminhoPropriedade = this.RetornarCaminhoPropriedade(argumento);
            const propriedades = u.ReflexaoUtil.RetornarPropriedadesCaminho(this.TipoEntidadeConsulta, caminhoPropriedade, false, true);
            this.AbrirRelacaoPropriedades(this.EstruturaConsulta, propriedades, false);
            return this;
        }

        public AbrirRelacaoTipada<TRelacao extends d.Entidade>(construtorTipoRelacao: Function,
            expressaoRelacao: (value: TEntidade, index: number, array: Array<TEntidade>) => TRelacao,
            expressaoPropriedade: (value: TRelacao, index: number, array: Array<TRelacao>) => any): ConsultaEntidade<TEntidade>
        {
            const caminhoRelacao = this.RetornarCaminhoPropriedade(expressaoRelacao);
            const caminhoPropriedade = this.RetornarCaminhoPropriedade(expressaoPropriedade);
            const propriedadesRelacao = u.ReflexaoUtil.RetornarPropriedadesCaminho(this.TipoEntidadeConsulta, caminhoRelacao, false, true);

            const tipoRelacao = construtorTipoRelacao.GetType();
            const propriedadesTipada = u.ReflexaoUtil.RetornarPropriedadesCaminho(tipoRelacao, caminhoPropriedade, false, true);
            const propriedades = propriedadesRelacao.ToList(true);
            propriedades.AddRange(propriedadesTipada);
            this.AbrirRelacaoPropriedades(this.EstruturaConsulta, propriedades, false);
            return this;
        }

        public AbrirColecao(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<d.Entidade>): ConsultaEntidade<TEntidade>
        {
            const caminhoPropriedade = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoPropriedade);
            const propriedades = u.ReflexaoUtil.RetornarPropriedadesCaminho(this.TipoEntidadeConsulta, caminhoPropriedade, false, true);
            this.AbrirRelacaoPropriedades(this.EstruturaConsulta, propriedades, false);
            return this;
        }
        //#endregion

        //#region Ordenação

        public OrderBy(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => string | number | Date): ConsultaEntidade<TEntidade>
        {
            return this.Ordernar(this.EstruturaConsulta, expressaoPropriedade, d.EnumSentidoOrdenacao.Crescente, false);
        }

        public OrderByDescending(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => string | number | Date): ConsultaEntidade<TEntidade>
        {
            return this.Ordernar(this.EstruturaConsulta, expressaoPropriedade, d.EnumSentidoOrdenacao.Decrescente, false);
        }
        //#endregion

        //#region Paginação

        public Take(take: number): ConsultaEntidade<TEntidade>
        {
            this.EstruturaConsulta.Take = take;
            return this;
        }

        public Skip(skip: number): ConsultaEntidade<TEntidade>
        {
            this.EstruturaConsulta.Skip = skip;
            return this;
        }
        //#endregion

        //#region Coleção

        public WhereColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, expressaoFiltro: (value: TRelacao, index: number, array: Array<TRelacao>) => boolean, ...argumentos: any[]): ConsultaEntidade<TEntidade>
        {
            /*const caminhoRelacao = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoCaminhoColecao);*/
            /*let consultaAcessoDados = this.RetornarEstruturaConsultaRelacaoColecao(caminhoRelacao);*/
            throw new ErroNaoImplementado(this);
        }

        public OrderByColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, expressaoPropriedade: (value: TRelacao, index: number, array: Array<TRelacao>) => string | number | Date): ConsultaEntidade<TEntidade>
        {
            const caminhoRelacao = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoCaminhoColecao);
            const consultaAcessoDados = this.RetornarEstruturaConsultaRelacaoColecao(caminhoRelacao);
            this.Ordernar(consultaAcessoDados, expressaoPropriedade, d.EnumSentidoOrdenacao.Crescente, true);
            return this;
        }

        public OrderByDescendingColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, expressaoPropriedade: (value: TRelacao, index: number, array: Array<TRelacao>) => string | number | Date): ConsultaEntidade<TEntidade>
        {
            const caminhoRelacao = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoCaminhoColecao);
            const consultaAcessoDados = this.RetornarEstruturaConsultaRelacaoColecao(caminhoRelacao);
            this.Ordernar(consultaAcessoDados, expressaoPropriedade, d.EnumSentidoOrdenacao.Decrescente, true);
            return this;
        }

        public TakeColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, take: number): ConsultaEntidade<TEntidade>
        {
            const caminhoRelacao = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoCaminhoColecao);
            const consultaAcessoDados = this.RetornarEstruturaConsultaRelacaoColecao(caminhoRelacao);
            consultaAcessoDados.Take = take;
            return this;
        }

        public SkipColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, skip: number): ConsultaEntidade<TEntidade>
        {
            const caminhoRelacao = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoCaminhoColecao);
            const consultaAcessoDados = this.RetornarEstruturaConsultaRelacaoColecao(caminhoRelacao);
            consultaAcessoDados.Skip = skip;
            return this;
        }
        //#endregion 

        //#region Chamadas

        //Síncronas

        //private RetornarResultadoConsultaEntidades(): ListaEntidades<TEntidade>
        //{
        //    return this.RetornarResultadoConsulta().Entidades.Cast<TEntidade>();
        //}

        //private RetornarValorFuncao<T>(tipoFuncaoEnum: EnumTipoFuncao, expressao: Function)
        //{
        //    const consultaValorScalar = this.RetornarEstruturaConsultaValorScalar(tipoFuncaoEnum, expressao);
        //    return this.ContextoDados.RetornarValorScalar<T>(consultaValorScalar);
        //}

        //Assíncronas

        private __RetornarResultacoConsultaEntiadesInternoAsync(callback: CallbackResultado<ListaEntidades<TEntidade>>): void
        {
            this.__RetornarResultadoConsultaInternoAsync(function (callbackResposta: CallbackResultado<ListaEntidades<TEntidade>>, resultadoConsulta: ResultadoConsulta)
            {
                const entidades = resultadoConsulta.Entidades.Cast<TEntidade>();
                //entidades.forEach(x=> x.__ControlePro)
                callbackResposta(entidades);
            }.bind(this, callback));
        }

        private async __RetornarValorFuncaoInternoAsync(tipoFuncaoEnum: EnumTipoFuncao, expressao: Function, callback: CallbackResultado<number> | CallbackResultado<Date> | null)
        {
            const consultaValorScalar = this.RetornarEstruturaConsultaValorScalar(tipoFuncaoEnum, expressao);
            const resultado = await this.ContextoDados.RetornarValorScalarAsync(consultaValorScalar);
            callback(resultado);
            /*this.ContextoDados.__RetornarValorScalarInternoAsync(consultaValorScalar, callback);*/
        }
        //Async

        //Retornar ConsultaValorScalar

        private RetornarEstruturaConsultaValorScalar(tipoFuncaoEnum: EnumTipoFuncao, expressao: Function): EstruturaConsulta
        {
            const estruturaConsultaScalar = new EstruturaConsulta();
            estruturaConsultaScalar.TipoEntidadeConsulta = this.TipoEntidadeConsulta;
            estruturaConsultaScalar.TipoFuncaoEnum = tipoFuncaoEnum;
            estruturaConsultaScalar.NomeTipoEntidade = this.EstruturaConsulta.NomeTipoEntidade;
            estruturaConsultaScalar.TipoEntidadeAssemblyQualifiedName = this.EstruturaConsulta.TipoEntidadeAssemblyQualifiedName;
            estruturaConsultaScalar.FiltroGrupoE = this.EstruturaConsulta.FiltroGrupoE;

            if (estruturaConsultaScalar.Take > 0 || estruturaConsultaScalar.Skip > 0)
            {
                throw new ErroNaoSuportado("Take ou Skip não é suportado em funções", this);
            }
            if (expressao != null)
            {
                const caminhoPropriedade = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressao);
                estruturaConsultaScalar.CaminhoPropriedadeFuncao = caminhoPropriedade;
                this.AbrirRelacaoCaminhoPropriedade(estruturaConsultaScalar, caminhoPropriedade, true);
            }
            return estruturaConsultaScalar;
        }
        //#endregion

        //#region Métodos privados

        //Abrir Relação

        private RetornarCaminhoPropriedade(expressaoPropriedade: Function): string
        private RetornarCaminhoPropriedade(caminhoPropriedade: string): string
        private RetornarCaminhoPropriedade(argumento: any): string
        {
            if (typeof argumento === "string")
            {
                return argumento;
            }
            else if (typeof argumento === "function")
            {
                return u.ExpressaoUtil.RetornarCaminhoPropriedade(argumento);
            }
            else
            {
                throw new Erro("Argumento não suportado", this);
            }
        }

        private AbrirRelacaoCaminhoPropriedade(estruturaConsulta: EstruturaConsulta, caminhoPropriedade: string, filtro: boolean): void
        {
            const propriedades = u.ReflexaoUtil.RetornarPropriedadesCaminho(estruturaConsulta.TipoEntidadeConsulta, caminhoPropriedade, false, true);
            this.AbrirRelacaoPropriedades(estruturaConsulta, propriedades, filtro);
        }

        private AbrirRelacaoPropriedades(estruturaConsulta: EstruturaConsulta, propriedades: Array<r.Propriedade>, filtro: boolean): void
        {
            const propriedadesCaminho = new Array<r.Propriedade>();
            const len = propriedades.length;

            for (let i = 0; i < len; i++)
            {
                let propriedade = propriedades[i];
                propriedade = this.NormalizarPropriedade(propriedade);

                propriedadesCaminho.Add(propriedade);

                const caminhoPropriedadeParcial = String.Join(".", propriedadesCaminho.Select(x => x.Nome));

                if (!this.ExisteRelacaoAberta(estruturaConsulta, caminhoPropriedadeParcial, filtro))
                {
                    if (propriedade.Tipo instanceof r.TipoEntidade)
                    {
                        const relacaoAbertaEntidade = new RelacaoAbertaEntidade();
                        relacaoAbertaEntidade.CaminhoPropriedade = caminhoPropriedadeParcial;

                        relacaoAbertaEntidade.NomeTipoEntidade = propriedade.Tipo.Nome;
                        relacaoAbertaEntidade.TipoEntidadeAssemblyQualifiedName = propriedade.Tipo.AssemblyQualifiedName;

                        if (u.ValidacaoUtil.IsDefinido(propriedade.TipoDeclarado))
                        {
                            relacaoAbertaEntidade.NomeTipoDeclarado = propriedade.TipoDeclarado.Nome;
                            relacaoAbertaEntidade.TipoDeclaradoAssemblyQualifiedName = propriedade.TipoDeclarado.AssemblyQualifiedName;
                        }
                        if (filtro)
                        {
                            estruturaConsulta.RelacoesAbertaFiltro.Add(caminhoPropriedadeParcial, relacaoAbertaEntidade);
                        } else
                        {
                            estruturaConsulta.RelacoesAberta.Add(caminhoPropriedadeParcial, relacaoAbertaEntidade);
                        }
                        continue;
                    }
                    if (propriedade.Tipo instanceof r.TipoListaEntidade)
                    {
                        if (filtro)
                        {
                            throw new ErroNaoSuportado("Não é possível abrir relação filtro nas coleções", this);
                        }

                        const tipoPropridadeItemBaseEntidade: r.TipoEntidade = (propriedade.Tipo as r.TipoListaEntidade).TipoBaseEntidade;
                        const relacaoAbertaListaEntidade = new RelacaoAbertaColecao();

                        relacaoAbertaListaEntidade.CaminhoPropriedade = caminhoPropriedadeParcial;
                        relacaoAbertaListaEntidade.NomeTipoEntidade = tipoPropridadeItemBaseEntidade.Nome;
                        relacaoAbertaListaEntidade.TipoEntidadeAssemblyQualifiedName = tipoPropridadeItemBaseEntidade.AssemblyQualifiedName;
                        relacaoAbertaListaEntidade.NomeTipoDeclarado = propriedade.TipoDeclarado.Nome;
                        relacaoAbertaListaEntidade.TipoDeclaradoAssemblyQualifiedName = propriedade.TipoDeclarado.AssemblyQualifiedName;

                        relacaoAbertaListaEntidade.EstruturaConsulta = new EstruturaConsulta();
                        relacaoAbertaListaEntidade.EstruturaConsulta.NomeTipoEntidade = tipoPropridadeItemBaseEntidade.Nome;
                        relacaoAbertaListaEntidade.EstruturaConsulta.TipoEntidadeAssemblyQualifiedName = tipoPropridadeItemBaseEntidade.AssemblyQualifiedName;
                        relacaoAbertaListaEntidade.EstruturaConsulta.TipoEntidadeConsulta = tipoPropridadeItemBaseEntidade;

                        estruturaConsulta.ColecoesAberta.Add(caminhoPropriedadeParcial, relacaoAbertaListaEntidade);

                        estruturaConsulta = relacaoAbertaListaEntidade.EstruturaConsulta;
                        propriedadesCaminho.Clear();

                        continue;
                    }
                    if (!filtro)
                    {
                        const mensagemErro = `O tipo {propriedade.Tipo.Nome} da Propriedade {propriedade.Nome} não  é uma relação`;
                        throw new Erro(mensagemErro, this);
                    }
                }
            }
        }

        public NormalizarPropriedade(propriedade: r.Propriedade): r.Propriedade
        {
            const atributo = propriedade.Atributos.OfType<at.PropriedadeTSEspecializadaAttribute>(at.PropriedadeTSEspecializadaAttribute).SingleOrDefault();
            if (atributo != null)
            {
                const propriedadeEspecializada = propriedade.TipoDeclarado.RetornarPropriedade(atributo.NomePropriedade);
                return this.NormalizarPropriedade(propriedadeEspecializada);
            }
            return propriedade;
        }

        private ExisteRelacaoAberta(estruturaConsultaAtual: EstruturaConsulta, caminhoPropreidade: string, filtro: boolean): boolean
        {
            if (filtro)
            {
                return estruturaConsultaAtual.RelacoesAbertaFiltro.ContainsKey(caminhoPropreidade);
            }
            else
            {
                return estruturaConsultaAtual.RelacoesAberta.ContainsKey(caminhoPropreidade) || estruturaConsultaAtual.ColecoesAberta.ContainsKey(caminhoPropreidade);
            }
        }
        //Ordenação

        private Ordernar(consultaAcessoDados: EstruturaConsulta, expressaoCaminhoPropriedade: Function, sentido: d.EnumSentidoOrdenacao, colecao: boolean): ConsultaEntidade<TEntidade>
        {
            const caminhoPropriedade = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoCaminhoPropriedade);
            const propriedades = u.ReflexaoUtil.RetornarPropriedadesCaminho(consultaAcessoDados.TipoEntidadeConsulta, caminhoPropriedade, false, false);

            const propriedadesCaminho = new Array<r.Propriedade>();
            const len = propriedades.Count;

            for (let i = 0; i < len; i++)
            {
                const propriedade = propriedades[i];
                propriedadesCaminho.Add(propriedade);

                const caminhoPropriedadeParcial = String.Join(".", propriedadesCaminho.Select(x => x.Nome));
                if (propriedade.Tipo instanceof r.BaseTipoLista)
                {
                    if (colecao)
                    {
                        consultaAcessoDados = this.RetornarEstruturaConsultaRelacaoColecao(caminhoPropriedadeParcial);
                        propriedadesCaminho.Clear();

                    } else
                    {
                        throw new ErroNaoSuportado("Não é suportada ordenação com coleções na expressão, ver OrderByColecao", this);
                    }
                }
                if (propriedade.Tipo instanceof r.TipoEntidade)
                {
                    this.AbrirRelacaoCaminhoPropriedade(consultaAcessoDados, caminhoPropriedadeParcial, true);
                    continue;
                }
            }
            const ultimaPropriedade = propriedades.Last();
            if (!(ultimaPropriedade.Tipo instanceof r.TipoPrimario) && (!(ultimaPropriedade.Tipo instanceof r.TipoEnum)))
            {
                throw new ErroNaoSuportado(`A propriedade não suportada para ordenação {ultimaPropriedade.Nome}`, this);
            }
            const ordenacao = new Ordenacao();
            ordenacao.CaminhoPropriedade = caminhoPropriedade;
            ordenacao.SentidoOrdenacaoEnum = sentido;
            consultaAcessoDados.Ordenacoes.Add(caminhoPropriedade, ordenacao);

            return this;
        }
        //Coleção

        private RetornarEstruturaConsultaRelacaoColecao(caminhoRelacao: string): EstruturaConsulta
        {
            const propriedades = u.ReflexaoUtil.RetornarPropriedadesCaminho(this.TipoEntidadeConsulta, caminhoRelacao, false, true);
            const propriedadesCaminho = new Array<r.Propriedade>();

            let estruturaConsultaAtual = this.EstruturaConsulta;
            const len = propriedades.Count;

            for (let i = 0; i < len; i++)
            {
                const propriedade = propriedades[i];
                propriedadesCaminho.Add(propriedade);

                if (!(propriedade.Tipo instanceof r.TipoListaEntidade))
                {
                    continue;
                }

                const caminhoPropriedadeParcial = String.Join(".", propriedadesCaminho.Select(x => x.Nome));
                if (!estruturaConsultaAtual.ColecoesAberta.ContainsKey(caminhoPropriedadeParcial))
                {
                    throw new Erro(`A preciso abrir a relação ${caminhoPropriedadeParcial}  e  filtra-la, Caminho completo {caminhoRelacao}`, this);
                }

                const relacaoAbertaColecao = estruturaConsultaAtual.ColecoesAberta.Item(caminhoPropriedadeParcial);
                estruturaConsultaAtual = relacaoAbertaColecao.EstruturaConsulta;
            }
            return estruturaConsultaAtual;
        }
        //Filtro

        private AdicionarFiltro(estruturaConsulta: EstruturaConsulta, filtroGrupo: BaseFiltroGrupo, expressao: Snebur.Expressao.Expressao, isCriarNovoGrupo = true): void
        {

            if (expressao instanceof Snebur.Expressao.ExpressaoGrupo)
            {
                const expressoesFilho = (expressao as Snebur.Expressao.ExpressaoGrupo).ExpressoesFilho;
                const novoFiltroGrupo = isCriarNovoGrupo ? this.RetornarNovoFiltroGrupo(expressao) : filtroGrupo;
                filtroGrupo.Filtros.Add(novoFiltroGrupo);

                for (let i = 0; i < expressoesFilho.Count; i++)
                {
                    const expressaoFilho = expressoesFilho[i];
                    this.AdicionarFiltro(estruturaConsulta, novoFiltroGrupo, expressaoFilho);
                }
            }
            else if (expressao instanceof Snebur.Expressao.ExpressaoPropriedade)
            {
                const tipoPropriedade = expressao.Propriedade.Tipo;
                const expressaPropriedade: Snebur.Expressao.ExpressaoPropriedade = expressao;

                if (expressaPropriedade.CaminhoPropriedade.Contains("."))
                {
                    this.AbrirRelacaoCaminhoPropriedade(estruturaConsulta, expressaPropriedade.CaminhoPropriedade, true);
                }

                const filtroPropriedade = new FiltroPropriedade();
                filtroPropriedade.Operador = this.RetornarOperadorFiltro(expressaPropriedade.Operador);
                filtroPropriedade.CaminhoPropriedade = expressaPropriedade.CaminhoPropriedade;
                filtroPropriedade.TipoPrimarioEnum = this.RetornarTipoPrimarioEnum(tipoPropriedade);
                filtroPropriedade.Valor = expressaPropriedade.Valor;
                filtroGrupo.Filtros.Add(filtroPropriedade);
            }
            else
            {
                throw new Erro(`Expressão não suportada {expressao.ExpressaoTexto}`, this);
            }
        }

        private RetornarTipoPrimarioEnum(tipoPropriedade: r.BaseTipo): r.EnumTipoPrimario
        {
            if (tipoPropriedade instanceof r.TipoPrimario)
            {
                return (tipoPropriedade as r.TipoPrimario).TipoPrimarioEnum;
            }
            if (tipoPropriedade instanceof r.TipoEnum)
            {
                return r.EnumTipoPrimario.EnumValor;
            }
            throw new ErroNaoSuportado("O tipo da propriedade não é suportado para filtro", this);
        }

        private RetornarNovoFiltroGrupo(expressao: Snebur.Expressao.ExpressaoGrupo): BaseFiltroGrupo
        {
            if (expressao instanceof Snebur.Expressao.ExpressaoGrupoE)
            {
                return new FiltroGrupoE();
            }
            if (expressao instanceof Snebur.Expressao.ExpressaoGrupoOu)
            {
                return new FiltroGrupoOU();
            }
            if (expressao instanceof Snebur.Expressao.ExpressaoGrupoNao)
            {
                return new FiltroGrupoNAO();
            }
            throw new ErroNaoSuportado(`Expressão grupo não suportado {expressao.ExpressaoTexto}`, this);
        }

        private RetornarOperadorFiltro(operador: Snebur.Expressao.EnumOperadorPropriedade): EnumOperadorFiltro
        {
            switch (operador)
            {
                case (Snebur.Expressao.EnumOperadorPropriedade.Igual):

                    return EnumOperadorFiltro.Igual;

                case (Snebur.Expressao.EnumOperadorPropriedade.IgualAbsoluto):

                    return EnumOperadorFiltro.IgualAbsoluto;

                case (Snebur.Expressao.EnumOperadorPropriedade.Diferente):
                case (Snebur.Expressao.EnumOperadorPropriedade.DiferenteAbsoluto):

                    return EnumOperadorFiltro.Diferente;

                case (Snebur.Expressao.EnumOperadorPropriedade.Maior):

                    return EnumOperadorFiltro.Maior;

                case (Snebur.Expressao.EnumOperadorPropriedade.MaiorIgual):

                    return EnumOperadorFiltro.MaiorIgual;

                case (Snebur.Expressao.EnumOperadorPropriedade.Menor):

                    return EnumOperadorFiltro.Menor;

                case (Snebur.Expressao.EnumOperadorPropriedade.MenorIgual):

                    return EnumOperadorFiltro.MenorIgual;

                case (Snebur.Expressao.EnumOperadorPropriedade.IniciaCom):

                    return EnumOperadorFiltro.IniciaCom;

                case (Snebur.Expressao.EnumOperadorPropriedade.TerminaCom):

                    return EnumOperadorFiltro.TerminaCom;

                case (Snebur.Expressao.EnumOperadorPropriedade.Possui):

                    return EnumOperadorFiltro.Possui;

                default:
                    {
                        const operadorDescricao = u.EnumUtil.RetornarDescricao(Snebur.Expressao.EnumOperadorPropriedade, operador);
                        throw new ErroNaoSuportado(` O operador expressão não é suportado ${operadorDescricao} `, this);
                    }
            }
        }



        //#endregion

        //#region Estrutura consulta acesso dados 

        public RetornarEstruturaConsulta(): Snebur.AcessoDados.EstruturaConsulta
        {
            return this.EstruturaConsulta;
        }

        public IncluirDeletados(incluir: boolean = true): ConsultaEntidade<TEntidade>
        {
            this.EstruturaConsulta.IsMostrarDeletados = incluir;
            return this;
        }
        //#endregion
    }
}