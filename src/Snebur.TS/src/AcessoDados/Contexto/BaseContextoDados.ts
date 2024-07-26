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

        public override readonly UrlServico: string;
        public readonly UrlServicoDebug: string;

        public constructor(tipoEntidadeOuNamespace: r.TipoEntidade | string, urlServico: string, urlServicoDebug: string = null, nomeServicoDados: string = null)
        {
            super();
            this.UrlServico = urlServico;
            this.UrlServicoDebug = urlServicoDebug;

            if (!u.ValidacaoUtil.IsDefinido(tipoEntidadeOuNamespace))
            {
                tipoEntidadeOuNamespace = this.RetornarNamespaceEntidades();
            }
            this.NamespaceEntidades = u.NamespaceUtil.RetornarNamespace(tipoEntidadeOuNamespace);
            this.ServicoDados = new ServicoDadosCliente(urlServico, this.UrlServicoDebug, this.CredencialServico, nomeServicoDados);

            if ($Aplicacao.ContextosDados.ContainsKey(this.NamespaceEntidades))
            {
                throw new Erro(`Já existe um contexto dados instanciado na aplicação para o namespace ${this.NamespaceEntidades}
                                \rA instancia dos contexto dados devem ser únicas para mesmo namaspace das entidades`);
            }

            /*const construtorContexto = (this as any).constructor;*/
            $Aplicacao.AdicionarContextosDados(this.NamespaceEntidades, this);
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

        public async DeletarAsync(entidade: d.Entidade): Promise<ResultadoDeletar>
        public async DeletarAsync(entidade: d.IEntidade): Promise<ResultadoDeletar>
        public async DeletarAsync(entidade: d.Entidade, relacoesEmCascata: string): Promise<ResultadoDeletar>
        public async DeletarAsync<TEntidade extends d.Entidade>(entidade: TEntidade, expressaoRelacoesAberta: (value: TEntidade, index: number, array: TEntidade[]) => void): Promise<ResultadoDeletar>
        public async DeletarAsync(entidades: Array<d.Entidade>): Promise<ResultadoDeletar>
        public async DeletarAsync(entidades: Array<d.Entidade>, relacoesEmCascata: string): Promise<ResultadoDeletar>
        public async DeletarAsync(entidades: ListaEntidades<d.Entidade>): Promise<ResultadoDeletar>
        public async DeletarAsync(entidades: ListaEntidades<d.Entidade>, relacoesEmCascata: string): Promise<ResultadoDeletar>
        public async DeletarAsync<TEntidade>(entidades: Array<TEntidade>): Promise<ResultadoDeletar>
        public async DeletarAsync<TEntidade>(entidades: Array<TEntidade>, relacoesEmCascata: string): Promise<ResultadoDeletar>
        public async DeletarAsync<TEntidade>(entidades: Array<TEntidade>, expressaoRelacoesAberta: (value: TEntidade, index: number, array: TEntidade[]) => void): Promise<ResultadoDeletar>
        public async DeletarAsync<TEntidade extends d.Entidade>(entidades: ListaEntidades<TEntidade>): Promise<ResultadoDeletar>
        public async DeletarAsync(argumento: any, relacoesEmCascata: any = ""): Promise<ResultadoDeletar>
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
            const entidades = this.RetornarEntidades(argumento);
            /*eslint-enable*/
            if (entidades.length === 0)
            {
                return new ResultadoDeletar({
                    IsSucesso: true,
                    MensagemErro: "Nenhuma entidade foi passada nos parâmetros",
                });
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
            const resultado = await this.ServicoDados.DeletarAsync(entidadesClonada, relacoesEmCascata);
            if (resultado.IsSucesso)
            {
                const entidadesIsDeletado = entidades.Where(x => (x as any as IDeletado).IsDeletado !== undefined).Cast<d.IDeletado>();
                entidadesIsDeletado.ForEach(x => x.IsDeletado = true);
            }
            return resultado;
        }

        //#endregion

        //#region Recuperar Propriedades
        public async SalvarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidade: TEntidade, ...expressoes: Array<(value: TEntidade) => any>): Promise<ResultadoSalvar>
        public async SalvarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidade: TEntidade, ...propriedades: Array<r.Propriedade> | Array<string>): Promise<ResultadoSalvar>
        public async SalvarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidades: List<TEntidade>, ...expressoes: Array<(value: TEntidade) => any>): Promise<ResultadoSalvar>
        public async SalvarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(argumentoEntidades: TEntidade, ...expressoesOuPropriedades: Array<(value: TEntidade) => any> | Array<r.Propriedade> | Array<string>): Promise<ResultadoSalvar>
        {
            const entidades = this.RetornarEntidades(argumentoEntidades);
            if (entidades.length === 0)
            {
                return new ResultadoSalvar({
                    IsSucesso: true
                });
            }

            if (entidades.Any(x => x.Id === 0))
            {
                throw new Erro("Não é possível recuperar propriedades de um entidade não salva");
            }

            const entidadesSalvar = new List<Entidade>();
            for (const entidade of entidades)
            {
                if (entidade.__IsExisteAlteracao)
                {
                    const nomesPropriedades = this.RetornarNomesProprieades<TEntidade>(expressoesOuPropriedades);
                    const clone = entidade.CloneSomenteId();
                    clone.__PropriedadesAlteradas.Clear();
                    (clone as any as IObjetoControladorPropriedade).DesativarObservadorPropriedadeAlterada();
                    clone.Id = entidade.Id;

                    const tipoEntidade = entidade.GetType();
                    for (const nomePropriedade of nomesPropriedades)
                    {
                        const propriedade = tipoEntidade.RetornarPropriedade(nomePropriedade);
                        if (propriedade != null)
                        {
                            if (u.EntidadeUtil.IsAlterouPropriedade(entidade, nomePropriedade))
                            {
                                (clone as any)[nomePropriedade] = (entidade as any)[nomePropriedade];

                                if (propriedade.Tipo.IsTipoCompleto)
                                {
                                    const propriedadesTipoCompleto = entidade.__PropriedadesAlteradas.ParesChaveValor.Where(x => x.Chave.startsWith(`${nomePropriedade}_`));
                                    clone.__PropriedadesAlteradas.AddRangeOrUpdate(propriedadesTipoCompleto);
                                }
                                else
                                {
                                    clone.__PropriedadesAlteradas.AddOrUpdate(nomePropriedade, entidade.__PropriedadesAlteradas.Item(nomePropriedade));
                                }
                            }
                        }

                    }
                    (clone as any as IObjetoControladorPropriedade).AtivarObservadorPropriedadeAlterada();
                    entidadesSalvar.Add(clone);
                }

            }
            this._isAtualizandoPropriedades = true;
            const resultado = await this.SalvarAvancadoAsync(entidadesSalvar, []);
            if (resultado.IsSucesso)
            {
                const nomesPropriedades = this.RetornarNomesProprieades<TEntidade>(expressoesOuPropriedades);
                for (const entidade of entidades)
                {
                    const tipoEntidade = entidade.GetType();
                    for (const nomePropriedade of nomesPropriedades)
                    {
                        const propriedade = tipoEntidade.RetornarPropriedade(nomePropriedade);
                        if (propriedade.Tipo.IsTipoCompleto)
                        {
                            const propriedadesTipoCompleto = entidade.__PropriedadesAlteradas.ParesChaveValor.Where(x => x.Chave.startsWith(`${nomePropriedade}_`));
                            entidade.__PropriedadesAlteradas.RemoveAll(propriedadesTipoCompleto.Select(x => x.Chave));
                        }
                        else
                        {
                            entidade.__PropriedadesAlteradas.TryRemove(nomePropriedade);
                        }
                    }
                }
            }
            this._isAtualizandoPropriedades = false;
            return resultado;
        }

        public async RecuperarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidade: TEntidade, ...expressoes: Array<(value: TEntidade) => any>): Promise<void>
        public async RecuperarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(entidades: List<TEntidade>, ...expressoes: Array<(value: TEntidade) => any>): Promise<void>
        public async RecuperarPropriedadesAsync<TEntidade extends Entidade | IEntidade>(argumentoEntidades: TEntidade, ...expressoesOuPropriedades: Array<(value: TEntidade) => any> | Array<r.Propriedade> | Array<string>): Promise<void>
        {
            const entidades = this.RetornarEntidades(argumentoEntidades);
            if (entidades.length === 0)
            {
                return;
            }

            if (entidades.Any(x => x.Id === 0))
            {
                throw new Erro("Não é possível recuperar propriedades de um entidade não salva");
            }

            const tipoEntidade = entidades[0].GetType();
            const ids = entidades.Select(x => x.Id);
            const consulta = this.RetornarConsulta(tipoEntidade).WhereIds(ids);
            consulta.IncluirDeletados();
            const nomesPropriedades = this.RetornarNomesProprieades(expressoesOuPropriedades);

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

            const entidadesRecuperada = await consulta.ToListAsync();
            for (const entidadeRecuperada of entidadesRecuperada)
            {
                const entidade = entidades.Where(x => x.Id === entidadeRecuperada.Id).Single();
                for (const nomePropriedade of nomesPropriedades)
                {
                    (entidade as any)[nomePropriedade] = (entidadeRecuperada as any)[nomePropriedade];
                }
                entidade.__PropriedadesAlteradas.RemoveAll(nomesPropriedades);
            }
        }

        public async RecuperarAsync<TEntidade extends Entidade>(entidade: TEntidade[], ...expressoesAbrirRelacao: ((value: TEntidade) => d.Entidade | d.Entidade[])[]): Promise<void>
        public async RecuperarAsync<TEntidade extends Entidade>(entidade: TEntidade, ...expressoesAbrirRelacao: ((value: TEntidade) => d.Entidade | d.Entidade[])[]): Promise<void>
        public async RecuperarAsync<TEntidade extends Entidade>(entidade: IEntidade, ...expressoesAbrirRelacao: ((value: IEntidade) => d.Entidade | d.Entidade[])[]): Promise<void>
        public async RecuperarAsync<TEntidade extends Entidade>(argumentoEntidades: TEntidade | TEntidade[], ...expressoesAbrirRelacao: ((value: TEntidade) => d.Entidade | d.Entidade[])[]): Promise<void>
        {
            const entidades = this.RetornarEntidades(argumentoEntidades);
            if (entidades.length === 0)
            {
                return;
            }

            if (entidades.Any(x => x.Id === 0))
            {
                throw new Erro("Não é possível recuperar propriedades de um entidade não salva");
            }

            const tipoEntidade = entidades[0].GetType();
            const consulta = this.RetornarConsulta(tipoEntidade);

            if (expressoesAbrirRelacao?.length > 0)
            {
                for (const expresaoAbrirRelacao of expressoesAbrirRelacao)
                {
                    consulta.AbrirRelacaoOuColecao(expresaoAbrirRelacao);
                }
            }

            const ids = entidades.Select(x => x.Id);
            consulta.WhereIds(ids);

            const propriedades = tipoEntidade.RetornarPropriedades();
            const entidadesRecuperada = await consulta.ToListAsync();
            const nomesPropriedesRelacoesAberta = expressoesAbrirRelacao.Select(x => u.ExpressaoUtil.RetornarNomePropriedade(x));

            for (const entidadeRecuperada of entidadesRecuperada)
            {
                const entidade = entidades.Where(x => x.Id === entidadeRecuperada.Id).Single();
                for (const propriedade of propriedades)
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
                        else if (propriedade.Tipo instanceof r.TipoEntidade)
                        {
                            if (nomesPropriedesRelacoesAberta.Contains(propriedade.Nome))
                            {
                                (entidade as any)[propriedade.Nome] = valorPropriedadeRecuperada;
                            }
                        }
                        else if (propriedade.Tipo instanceof r.BaseTipoLista &&
                            Array.isArray(valorPropriedadeRecuperada))
                        {
                            if (nomesPropriedesRelacoesAberta.Contains(propriedade.Nome))
                            {
                                ((entidade as any)[propriedade.Nome] as Array<any>).AddRangeNew(valorPropriedadeRecuperada);
                            }
                        }
                    }
                }

                entidadeRecuperada.NotificarTodasPropriedadesAlteradas();
                entidade.__PropriedadesAlteradas.Clear();
            }
        }

        public async AbrirColecaoAsync<TEntidade extends Entidade>
            (entidades: TEntidade | TEntidade[], ...expressoesAbrirRelacao: ((value: TEntidade) => d.Entidade[])[]): Promise<void>
        {
            await this.AbrirRelacaoOuColecaoAsync(entidades, expressoesAbrirRelacao);
        }

        public async AbrirRelacaoAsync<TEntidade extends Entidade>(entidades: TEntidade | TEntidade[], ...expressoesAbrirRelacao: ((value: TEntidade) => d.Entidade)[]): Promise<void>
        {
            await this.AbrirRelacaoOuColecaoAsync(entidades, expressoesAbrirRelacao);
        }

        public async AbrirRelacaoOuColecaoAsync<TEntidade extends Entidade>
            (entidades: TEntidade | TEntidade[], expressoesAbrirRelacao: ((value: TEntidade) => any)[]): Promise<void>
        {
            if (entidades instanceof Entidade)
            {
                await this.AbrirRelacaoOuColecaoInternoAsync(entidades, expressoesAbrirRelacao);
                return;
            }

            if (Array.isArray(entidades))
            {
                for (const entidade of entidades)
                {
                    await this.AbrirRelacaoOuColecaoInternoAsync(entidade, expressoesAbrirRelacao);
                }
                return;
            }

            throw new Erro("O parâmetro entidades não é do tipo Entidade ou Array");

        }

        private async AbrirRelacaoOuColecaoInternoAsync<TEntidade extends Entidade>
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
            else if (u.ValidacaoUtil.IsArray(parametro))
            {
                const len = (parametro as Array<any>).length;
                for (let i = 0; i < len; i++)
                {
                    const item = parametro[i];
                    entidades.AddRange(this.RetornarEntidades(item));
                }
            }
            else if (parametro != null)
            {
                throw new Erro(`O objeto  ${parametro?.GetType().Name ?? parametro.constructor?.name ?? parametro} não é do tipo entidade`);
            }
            if ($Configuracao.IsDebug)
            {
                this.ValidarContexto(entidades);
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

        private RetornarNomesProprieades<TEntidade extends IEntidade | Entidade>(expressoesOuPropriedades: Array<(value: TEntidade) => any> | Array<r.Propriedade> | Array<string>): Array<string>
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

        private ValidarContexto(entidades: d.Entidade[])
        {
            for (const entidade of entidades)
            {
                const tipo = entidade.GetType() as r.TipoEntidade;
                const contexto = $Aplicacao.RetornarContextoDados(tipo);
                if (contexto !== this)
                {
                    const descricao = u.EntidadeUtil.RetornarDescricaoEntidade(entidade);
                    throw new Erro(`A entidade ${descricao} do tipo ${tipo.Nome} não pertence ao contexto ${this.___NomeConstrutor}`);
                }
            }
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