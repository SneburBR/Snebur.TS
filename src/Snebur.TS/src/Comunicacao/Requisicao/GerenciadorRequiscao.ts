namespace Snebur.Comunicacao
{
    export class GerenciadorRequiscao
    {
        private _isExisteFalhaRequisicao = false;

        private readonly Fila = new List<RequisicaoResolver>();
        private _requisicaoAtual: RequisicaoResolver;
        private _isParado: boolean = false;

        private readonly CallbackIncrementarTotalFinal = new List<Function>();

        public get IsExisteFalhaRequisicao(): boolean
        {
            return this._isExisteFalhaRequisicao;
        }

        public get IsExisteRequisicoesAtivas(): boolean
        {
            return this.Fila.length > 0 || this._requisicaoAtual != null;
        }

        public get TotalRequisicoesFila(): number
        {
            return this.Fila.length + (this._requisicaoAtual != null ? 1 : 0);
        }

        public get RequisicaoAtual(): RequisicaoResolver
        {
            return this._requisicaoAtual;
        }

        public ExecutarAsync(requisicao: BaseRequisicao): Promise<ResultadoChamada>
        {
            return new Promise(resolver =>
            {
                this.Fila.Add({
                    Requisicao: requisicao,
                    Resolver: resolver
                });
                this.GerarLogRequisicaoAguardandoNaFila(requisicao);
                this.IncrimentarTotalFinal();
                this.ExecutarProximaRequisicaoAsync();
            });
        }

        public async AguardarFilaRequisicoesAsync(progressHandler: (e: ProgressoEventArgs) => void = null): Promise<void>
        {
            if (!this.IsExisteRequisicoesAtivas)
            {
                return;
            }

            let totalFila = this.Fila.length;
            let ultimoProgresso = $Aplicacao.ProgressoOcupadoAtual;

            if (!ValidacaoUtil.IsValorProgressoValido(ultimoProgresso))
            {
                console.error(`Valor do progresso ${ultimoProgresso} invalido`);
                ultimoProgresso = 0;
            }

            const incrementarTotalFinal = function ()
            {
                totalFila += 1;
            };

            this.CallbackIncrementarTotalFinal.Add(incrementarTotalFinal);
            while (this.IsExisteRequisicoesAtivas)
            {
                /*console.WarmDebug(`Existe ainda ( ${this.TotalRequisicoesFila} requisições na fila`);*/
                if (progressHandler != null)
                {
                    if (totalFila < this.Fila.length)
                    {
                        console.error("Gerenciador de requisições: totalFila < this.Fila.length");
                    }

                    const executadas = (totalFila - this.Fila.length);
                    const progresso = (executadas / totalFila) * 100;
                    ultimoProgresso = Math.max(ultimoProgresso, progresso);
                    progressHandler(new ProgressoEventArgs(ultimoProgresso, `Fila ${executadas}/${totalFila}`));
                }
                await ThreadUtil.EsperarAsync(200);
            }
            this.CallbackIncrementarTotalFinal.Remove(incrementarTotalFinal);
        }

        public async ContinuarAsync()
        {
            this._isParado = false;
            this.ExecutarProximaRequisicaoAsync();
        }

        public async PararAsync()
        {
            this._isParado = true;
        }

        private async ExecutarProximaRequisicaoAsync()
        {
            if (this._isParado)
            {
                return;
            }

            if (this._requisicaoAtual == null &&
                this.Fila.Count > 0)
            {
                this._requisicaoAtual = this.Fila.PegarPrimeiro();
                const requisicao = this._requisicaoAtual.Requisicao;
                const resolver = this._requisicaoAtual.Resolver;
                const resultado = await requisicao.ExecutarAsync();
                this.ResolverAsync(resolver, resultado);
                this._requisicaoAtual = null;
                this.ExecutarProximaRequisicaoAsync();
            }
        }

        private async ResolverAsync(resolver: (resultado: any) => void, resultado: ResultadoChamada)
        {
            await ThreadUtil.QuebrarAsync();
            resolver(resultado);
        }

        public SetIsExiteFalhaRequisicao(isFalha: boolean)
        {
            this._isExisteFalhaRequisicao = isFalha;
        }

        //public NotificarFalhaRequisicao()
        //{
        //    this._isExisteFalhaRequisicao = true;
        //}

        //public NotificarFalhaRequisicao()
        //{
        //    this._isExisteFalhaRequisicao = true;
        //}

        private GerarLogRequisicaoAguardandoNaFila(requisicao: BaseRequisicao)
        {
            if (this._requisicaoAtual != null &&
                this._requisicaoAtual.Requisicao !== requisicao &&
                this.Fila.Count > 0)
            {
                if ($Configuracao.IsDebugOuTeste)
                {
                    console.log(`A requisição ${requisicao.toString()} está na fila n ${this.Fila.length}`);
                }
            }
        }

        private IncrimentarTotalFinal()
        {
            for (const callback of this.CallbackIncrementarTotalFinal)
            {
                callback();
            }
        }

        //#region Instancia única

        private static _instancia: GerenciadorRequiscao = null;
        public static get Instancia(): GerenciadorRequiscao
        {
            if (GerenciadorRequiscao._instancia == null)
            {
                GerenciadorRequiscao._instancia = new GerenciadorRequiscao();
            }
            return GerenciadorRequiscao._instancia;
        }

        //#endregion
    }

    interface RequisicaoResolver
    {
        readonly Requisicao: BaseRequisicao;
        readonly Resolver: (resultado: ResultadoChamada) => void;
    }

}
