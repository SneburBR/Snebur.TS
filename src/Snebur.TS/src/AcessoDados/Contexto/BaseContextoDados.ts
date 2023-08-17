namespace Snebur.AcessoDados
{
    export abstract class BaseContextoDados extends Snebur.BaseServico implements IServicoDados, IDisposable
    {
        private readonly ServicoDados: ServicoDadosCliente;
        private readonly NamespaceEntidades: string;
        private _isSalvando: boolean;
        private _isAtualizandoPropriedades: boolean;

        private get CredencialServico(): s.CredencialServico
        {
            return this.RetornarCredencialServico();
        }

        protected get IsAtualizandoPropriedades(): boolean
        {
            return this._isAtualizandoPropriedades;
        }

        public get IsSalvando(): boolean
        {
            return this._isSalvando;
        }

        public override readonly URLServico: string;
        public readonly URLServicoDebug: string;

        public constructor(tipoEntidadeOuNamespace: r.TipoEntidade | string, urlServico: string, urlServicoDebug: string = null, nomeServicoDados: string = null)
        {
            super();
            this.URLServico = urlServico;
            this.URLServicoDebug = urlServicoDebug;

            if (!u.ValidacaoUtil.IsDefinido(tipoEntidadeOuNamespace))
            {
                tipoEntidadeOuNamespace = this.RetornarNamespaceEntidades();
            }
            this.NamespaceEntidades = u.NamespaceUtil.RetornarNamespace(tipoEntidadeOuNamespace);
            this.ServicoDados = new ServicoDadosCliente(urlServico, this.URLServicoDebug, this.CredencialServico, nomeServicoDados);

            if (!$Aplicacao.ContextosDados.ContainsKey(this.NamespaceEntidades))
            {
                const construtorContexto = (this as any).constructor;
                $Aplicacao.AdicionarContextosDados(this.NamespaceEntidades, urlServico, construtorContexto);
            }
        }

        //#region IServicoDadosAsync

        public PingAsync(): Promise<boolean>
        {
            return this.ServicoDados.PingAsync();
        }

        public RetornarDataHoraAsync(): Promise<Date>
        {
            return this.ServicoDados.RetornarDataHoraAsync();
        }

        public RetornarDataHoraUTCAsync(): Promise<Date>
        {
            return this.ServicoDados.RetornarDataHoraUTCAsync();
        }

        public RetornarResultadoConsultaAsync(estruturaConsulta: EstruturaConsulta): Promise<ResultadoConsulta>
        {
            return this.ServicoDados.RetornarResultadoConsultaAsync(estruturaConsulta);
        }

        public RetornarValorScalarAsync(estruturaConsulta: EstruturaConsulta): Promise<any> 
        {
            return this.ServicoDados.RetornarValorScalarAsync(estruturaConsulta);
        }

        public async SalvarAsync(...entidades: d.Entidade[]): Promise<ResultadoSalvar>
        public async SalvarAsync(...entidades: d.IEntidade[]): Promise<ResultadoSalvar>
        public async SalvarAsync(entidade: d.Entidade): Promise<ResultadoSalvar>
        public async SalvarAsync(entidade: d.IEntidade): Promise<ResultadoSalvar>
        public async SalvarAsync(entidades: Array<d.Entidade>): Promise<ResultadoSalvar>
        public async SalvarAsync(entidades: ListaEntidades<d.Entidade>): Promise<ResultadoSalvar>
        public async SalvarAsync<TEntidade>(entidades: Array<TEntidade>): Promise<ResultadoSalvar>
        public async SalvarAsync<TEntidade extends d.Entidade>(entidades: ListaEntidades<TEntidade>): Promise<ResultadoSalvar>
        public async SalvarAsync(parametro: any): Promise<ResultadoSalvar>
        {
            while (this._isSalvando)
            {
                await ThreadUtil.EsperarAsync(200);
            }

            /*eslint-disable*/
            const entidades = this.RetornarEntidades(arguments);
            /*eslint-enable*/

            try
            {
                this._isSalvando = true;
                if ($Configuracao.IsDebug)
                {
                    const entidadesClonas = entidades.Where(x => (x as any as IEntidadeClonada).___is_entidade_clonada__ === true);
                    if (entidadesClonas.Count > 0)
                    {
                        console.warn("Utilizar o SalvarAvancadoAsync para salvar entidades clonadas");
                    }
                }

                if (entidades.Count > 0)
                {
                    const ajudante = new AjudanteNormalizarEntidadesSalvas(entidades);
                    const resultado = await this.TrySalvarInternoAsync(entidades);
                    ajudante.Normalizar(resultado);
                    return resultado;
                }

                return new ResultadoSalvar({
                    IsSucesso: true
                });
            }
            catch (erro)
            {
                return this.RetornarErroSalvar(erro, entidades);
            }
            finally
            {
                this._isSalvando = false;
            }
        }


        public async SalvarAvancadoAsync(
            argsEntidades: List<IEntidade> | IEntidade,
            argsEntidadesAlvos?: List<IEntidade> | IEntidade)
        {

            while (this._isSalvando)
            {
                await ThreadUtil.EsperarAsync(200);
            }

            const entidades = this.RetornarEntidades(argsEntidades);
            const entidadesAlvo = this.RetornarEntidades(argsEntidadesAlvos);

            try
            {
                this._isSalvando = true;

                if (entidadesAlvo.Any(x => x.Id === 0))
                {
                    throw new Erro("Somente entidades com Id > 0 podem ser alvo de atualização");
                }

                if (entidades.Count > 0)
                {
                    const ajudante = new AjudanteNormalizarEntidadesSalvas(entidades, entidadesAlvo);
                    const resultado = await this.TrySalvarInternoAsync(entidades);
                    ajudante.Normalizar(resultado);
                    return resultado;
                }

                return new ResultadoSalvar({
                    IsSucesso: true
                });
            }
            catch (err)
            {
                return this.RetornarErroSalvar(err, entidades);
            }
            finally
            {
                this._isSalvando = false;
            }

        }


        private async TrySalvarInternoAsync(entidades: d.Entidade[]): Promise<a.ResultadoSalvar>
        {
            try
            {
                return await this.SalvarInternoAsync(entidades);
            }
            catch (err)
            {
                return this.RetornarErroSalvar(err, entidades);

            }
        }


        private async SalvarInternoAsync(entidades: d.Entidade[])
        {
            /*eslint-enable*/

            if (entidades.length === 0)
            {
                throw new ErroNaoDefinido("Nenhum entidade foi passa nos parâmetros", this);
            }

            this.ValidarEntidades(entidades);
            const tempo = Stopwatch.StartNew();

            const resultado = await this.ServicoDados.SalvarAsync(entidades);

            if (tempo.ElapsedMilliseconds > 5000)
            {
                console.warn(`Lentidão no serviço dados para salvar, Tempo: ${tempo.TotalSeconds}s
                             Total entidades: ${entidades.Count}
                             Tipos: ${String.Join(",", entidades.Select(x => x.___NomeConstrutor).Distinct())}`);
            }

            if (!resultado.IsSucesso)
            {
                const descricaoEntidades = String.Join("\r\n", entidades.Select(x => `${x.__IdentificadorEntidade} - ${u.EntidadeUtil.RetornarDescricaoEntidade(x)}`));
                console.error(`Falha salvar entidades : ${resultado.MensagemErro}
                               ${descricaoEntidades}`);
            }
            return resultado;
        }

        private RetornarErroSalvar(err: any, entidades: d.Entidade[]): ResultadoSalvar 
        {
            const descricaoEntidades = String.Join(", ", entidades.Select(x => u.EntidadeUtil.RetornarDescricaoEntidade(x)));
            const mensagemErro = `Falha o salvar entidades ${descricaoEntidades}
                                      Erro: ${err}`;

            if ($Configuracao.IsDebugOuTeste)
            {
                throw new Erro(mensagemErro, err);
            }

            return new a.ResultadoSalvar({
                IsSucesso: false,
                MensagemErro: mensagemErro
            });
        }


        public DeletarAsync(entidade: d.Entidade): Promise<ResultadoDeletar>
        public DeletarAsync(entidade: d.IEntidade): Promise<ResultadoDeletar>
        public DeletarAsync(entidade: d.Entidade, relacoesEmCascata: string): Promise<ResultadoDeletar>
        public DeletarAsync<TEntidade extends d.Entidade>(entidade: TEntidade, expressaoRelacoesAberta: (value: TEntidade, index: number, array: TEntidade[]) => void): Promise<ResultadoDeletar>
        public DeletarAsync(entidades: Array<d.Entidade>): Promise<ResultadoDeletar>
        public DeletarAsync(entidades: Array<d.Entidade>, relacoesEmCascata: string): Promise<ResultadoDeletar>
        public DeletarAsync(entidades: ListaEntidades<d.Entidade>): Promise<ResultadoDeletar>
        public DeletarAsync(entidades: ListaEntidades<d.Entidade>, relacoesEmCascata: string): Promise<ResultadoDeletar>
        public DeletarAsync<TEntidade>(entidades: Array<TEntidade>): Promise<ResultadoDeletar>
        public DeletarAsync<TEntidade>(entidades: Array<TEntidade>, relacoesEmCascata: string): Promise<ResultadoDeletar>
        public DeletarAsync<TEntidade>(entidades: Array<TEntidade>, expressaoRelacoesAberta: (value: TEntidade, index: number, array: TEntidade[]) => void): Promise<ResultadoDeletar>
        public DeletarAsync<TEntidade extends d.Entidade>(entidades: ListaEntidades<TEntidade>): Promise<ResultadoDeletar>
        public DeletarAsync(argumento: any, relacoesEmCascata: any = ""): Promise<ResultadoDeletar>
        {
            if (typeof relacoesEmCascata === "undefined")
            {
                relacoesEmCascata = String.Empty;
            }
            else if (u.ValidacaoUtil.IsFunction(relacoesEmCascata))
            {
                relacoesEmCascata = u.ExpressaoUtil.RetornarCaminhoPropriedade(relacoesEmCascata);
            }

            /*eslint-disable*/
            const entidades = this.RetornarEntidades(arguments);
            /*eslint-enable*/
            if (entidades.length === 0)
            {
                throw new ErroNaoDefinido("Nenhum entidade foi passa nos parâmetros", this);
            }
            if (!u.ValidacaoUtil.IsDefinido(relacoesEmCascata))
            {
                relacoesEmCascata = String.Empty;
            }

            const entidadesNaoSalvas = entidades.Where(x => !(x.Id > 0));
            if (entidadesNaoSalvas.Count > 0)
            {
                throw new Erro(`Não é possível deletar entidades não salvas ${String.Join(", ", entidadesNaoSalvas.Select(k => k.GetType().Nome))}`);
            }
            const entidadesClonada = this.RetornarEntidadesCloneSomenteId(entidades);
            return this.ServicoDados.DeletarAsync(entidadesClonada, relacoesEmCascata);

        }

        //#endregion

        //#region Recuperar Propriedades
        public async SalvarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidade: TEntidade, ...expressoes: Array<(value: TEntidade) => any>): Promise<ResultadoSalvar>
        public async SalvarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidade: TEntidade, ...propriedades: Array<r.Propriedade>): Promise<ResultadoSalvar>
        public async SalvarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidade: TEntidade, ...nomesPropriedades: Array<string>): Promise<ResultadoSalvar>
        public async SalvarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidades: List<TEntidade>, ...expressoes: Array<(value: TEntidade) => any>): Promise<ResultadoSalvar>
        public async SalvarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(argumentoEntidades: TEntidade, ...expressoesOuPropriedades: Array<(value: TEntidade) => any> | Array<r.Propriedade> | Array<string>): Promise<ResultadoSalvar>
        {
            const entidades = this.RetornarEntidades(argumentoEntidades);
            const entidadesClonada = new List<Entidade>();
            for (const entidade of entidades)
            {
                const nomesPropriedades = this.RetornarNomesProprieades<TEntidade>(entidade as TEntidade, expressoesOuPropriedades);
                const clone = entidade.CloneSomenteId();
                clone.Id = entidade.Id;
                for (const nomePropriedade of nomesPropriedades)
                {
                    //var nomePropriedade = ExpressaoUtil.RetornarCaminhoPropriedade(expressão);
                    (clone as any)[nomePropriedade] = (entidade as any)[nomePropriedade];
                }
                entidadesClonada.Add(clone);
            }
            this._isAtualizandoPropriedades = true;
            const resultado = await this.SalvarAvancadoAsync(entidadesClonada, []);
            if (resultado.IsSucesso)
            {
                for (const entidade of entidades)
                {
                    const nomesPropriedades = this.RetornarNomesProprieades<TEntidade>(entidade as TEntidade, expressoesOuPropriedades);
                    entidade.__PropriedadesAlteradas.RemoveAll(nomesPropriedades);
                }
            }
            this._isAtualizandoPropriedades = false;
            return resultado;
        }

        public async RecuperarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidade: TEntidade, ...expressoes: Array<(value: TEntidade) => any>): Promise<void>
        public async RecuperarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidade: TEntidade, ...propriedades: Array<r.Propriedade>): Promise<void>
        public async RecuperarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidade: TEntidade, ...nomesPropriedades: Array<string>): Promise<void>
        public async RecuperarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidade: TEntidade, ...expressoesOuPropriedades: Array<(value: TEntidade) => any> | Array<r.Propriedade> | Array<string>): Promise<void>
        {
            if (!(entidade.Id > 0))
            {
                throw new Erro("Não é possível recuperar propriedades de um entidade não salva");
            }

            //const clone = (entidade as Entidade).CloneSomenteId();
            const tipoEntidade = entidade.GetType();
            //clone.Id = entidade.Id;

            const consulta = this.RetornarConsulta(tipoEntidade).
                Where(x => x.Id === entidade.Id);
            //let propriedades = expressoesPropriedades.Select(x => ExpressaoUtil.RetornarCaminhoPropriedade(x));
            const nomesPropriedades = this.RetornarNomesProprieades(entidade, expressoesOuPropriedades);
            for (const nomePropriedade of nomesPropriedades)
            {
                //###### o serializador não está serializando o tipo HashSet
                const propriedade = tipoEntidade.RetornarPropriedade(nomePropriedade);
                if (propriedade.Tipo instanceof r.TipoBaseDominio ||
                    propriedade.Tipo instanceof r.BaseTipoLista)
                {
                    throw new Erro(`A propriedade ${propriedade.Nome} do ${propriedade.Tipo.Nome} ( Tipo Entidade, baseDominio ou coleções) não são suportado. Utilize esse métodos apenas para propriedades do tipo primário`);
                }
                consulta.EstruturaConsulta.PropriedadesAbertas.Add(nomePropriedade);
            }

            const resultado = await consulta.SingleAsync() as any;
            const entidadeAny = entidade as any;
            for (const nomePropriedade of nomesPropriedades)
            {
                entidadeAny[nomePropriedade] = resultado[nomePropriedade];
            }
        }

        private RetornarNomesProprieades<TEntidade extends IEntidade | Entidade>(
            entidade: TEntidade,
            expressoesOuPropriedades: Array<(value: TEntidade) => any> | Array<r.Propriedade> | Array<string>): Array<string>
        {
            const retorno = new Array<string>();
            for (const expressaoOuPropriedade of expressoesOuPropriedades)
            {
                const tipo = typeof expressaoOuPropriedade;
                switch (tipo)
                {
                    case "string":

                        retorno.Add(expressaoOuPropriedade as string);
                        break;

                    case "function": {
                        const nomePropriedade = ExpressaoUtil.RetornarCaminhoPropriedade(expressaoOuPropriedade as Function);
                        retorno.Add(nomePropriedade);
                        break;
                    }
                    case "object":
                        if (expressaoOuPropriedade instanceof r.Propriedade)
                        {
                            retorno.Add(expressaoOuPropriedade.Nome);
                            break;
                        }
                        break;
                    default:

                        throw new Erro("O tipo  '{0}' da expressão ou propriedade não é suportado");
                }
            }
            return retorno;
        }

        public async RecuperarAsync<TEntidade extends Entidade>
            (entidade: TEntidade, ...expressoesAbrirRelacao: ((value: TEntidade) => d.Entidade)[]): Promise<void>
        {
            if (entidade.Id === 0)
            {
                throw new Erro("Não é possível atualizar uma entidade não salva");
            }
            const consulta = this.RetornarConsulta(entidade.GetType());
            if (expressoesAbrirRelacao?.length > 0)
            {
                for (const expresaoAbrirRelacao of expressoesAbrirRelacao)
                {
                    consulta.AbrirRelacao(expresaoAbrirRelacao);
                }
            }

            consulta.Where(x => x.Id === entidade.Id);
            const entidadeRecuperada = await consulta.SingleAsync();
            for (const propriedade of entidade.GetType().RetornarPropriedades())
            {
                const valorPropriedade = (entidade as any)[propriedade.Nome];
                const valorPropriedadeRecuperada = (entidadeRecuperada as any)[propriedade.Nome];
                if (valorPropriedade !== valorPropriedadeRecuperada)
                {
                    if (propriedade.Tipo instanceof r.TipoPrimario ||
                        propriedade.Tipo instanceof r.TipoEnum ||
                        propriedade.Tipo instanceof r.TipoComplexo)
                    {
                        (entidade as any)[propriedade.Nome] = valorPropriedadeRecuperada;
                    }
                    else if (propriedade.Tipo instanceof d.Entidade &&
                        valorPropriedadeRecuperada instanceof d.Entidade)
                    {
                        (entidade as any)[propriedade.Nome] = valorPropriedadeRecuperada;
                    }
                }
            }
        }

        public async AbrirColecaoAsync<TEntidade extends Entidade>
            (entidade: TEntidade, ...expressoesAbrirRelacao: ((value: TEntidade) => d.Entidade[])[]): Promise<void>
        {
            await this.AbrirRelacaoOuColecaoAsync(entidade, expressoesAbrirRelacao);

        }

        public async AbrirRelacaoAsync<TEntidade extends Entidade>
            (entidade: TEntidade, ...expressoesAbrirRelacao: ((value: TEntidade) => d.Entidade)[]): Promise<void>
        {
            await this.AbrirRelacaoOuColecaoAsync(entidade, expressoesAbrirRelacao);
        }

        public async AbrirRelacaoOuColecaoAsync<TEntidade extends Entidade>
            (entidade: TEntidade, expressoesAbrirRelacao: ((value: TEntidade) => any)[]): Promise<void>
        {
            if (entidade.Id === 0)
            {
                throw new Erro("Não é possível atualizar uma entidade não salva");
            }
            const tipoEntidade = entidade.GetType();
            const consulta = this.RetornarConsulta(tipoEntidade);
            const propriedadesRelacao = new List<r.Propriedade>();
            if (expressoesAbrirRelacao?.length > 0)
            {
                for (const expresaoAbrirRelacao of expressoesAbrirRelacao)
                {
                    const propriedade = tipoEntidade.RetornarPropriedade(expresaoAbrirRelacao, false);
                    if (propriedade.Tipo instanceof r.TipoEntidade)
                    {
                        propriedadesRelacao.Add(propriedade);
                        consulta.AbrirRelacao(expresaoAbrirRelacao);
                    }

                    if (propriedade.Tipo instanceof r.TipoListaEntidade)
                    {
                        propriedadesRelacao.Add(propriedade);
                        consulta.AbrirColecao(expresaoAbrirRelacao);
                    }
                }
            }

            consulta.Where(x => x.Id === entidade.Id);

            const entidadeRecuperada = await consulta.SingleAsync();

            for (const propriedade of propriedadesRelacao)
            {
                (entidade as any)[propriedade.Nome] = (entidadeRecuperada as any)[propriedade.Nome];
            }
        }

        //#region Métodos públicos

        public RetornarConsulta<TEntidade extends Snebur.Dominio.IEntidade>(tipoEntidade: r.BaseTipo): IConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this, tipoEntidade);
        }

        public RetornarNovaEstruturaConsulta(tipoEntidade: r.TipoEntidade): EstruturaConsulta
        {
            return new ConsultaEntidade<Snebur.Dominio.IEntidade>(this, tipoEntidade).RetornarEstruturaConsulta();
            //return ConsultaUtil.RetornarNovaEstruturaConsulta(tipoEntidade);
        }

        //#endregion

        //#region Métodos protegidos

        protected abstract RetornarCredencialServico(): Snebur.Seguranca.CredencialServico;

        protected abstract RetornarNamespaceEntidades(): string

        //#endregion

        //#region Métodos privados

        protected RetornarEntidades(entidade: d.Entidade): Array<d.Entidade>
        protected RetornarEntidades(entidades: Array<d.Entidade>): Array<d.Entidade>
        protected RetornarEntidades(entidades: ListaEntidades<d.Entidade>): Array<d.Entidade>
        protected RetornarEntidades<TEntidade>(entidades: Array<TEntidade>): Array<d.Entidade>
        protected RetornarEntidades<TEntidade extends d.Entidade>(entidades: ListaEntidades<TEntidade>): Array<d.Entidade>
        protected RetornarEntidades(...entidades: Array<d.Entidade>): Array<d.Entidade>
        protected RetornarEntidades(argumentos: any): Array<d.Entidade>
        protected RetornarEntidades(parametro: any): Array<d.Entidade>
        {
            const entidades = new Array<d.Entidade>();

            if (parametro instanceof d.Entidade)
            {
                entidades.Add(parametro);
            }

            if (u.ValidacaoUtil.IsArray(parametro))
            {
                const len = (parametro as Array<any>).length;
                for (let i = 0; i < len; i++)
                {
                    const item = parametro[i];
                    entidades.AddRange(this.RetornarEntidades(item));
                }
            }
            return entidades;
        }

        private ValidarEntidades(entidades: List<d.Entidade>): void
        {
            if (entidades.Any(x => x.__IsSomenteLeitura))
            {
                throw new Erro("Não é permitido salvar entidades somente pra leitura");
            }
        }

        private RetornarEntidadesCloneSomenteId(entidades: Entidade[]): List<Entidade>
        {
            const retorno = new List<Entidade>();
            for (const entidade of entidades)
            {
                retorno.Add(entidade.CloneSomenteId());
            }
            return retorno;
        }


        //#endregion

        //#region IDisposable

        public override Dispose()
        {
            super.Dispose();
        }
        //#endregion
    }
}