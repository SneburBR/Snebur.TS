﻿namespace Snebur.Comunicacao
{
    export class GerenciadorRequiscao
    {
        private _isExisteFalhaRequisicao = false;

        private readonly Fila = new List<RequisicaoResolver>();
        private _requisicaoAtual: RequisicaoResolver

        public get IsExisteFalhaRequisicao(): boolean
        {
            return this._isExisteFalhaRequisicao;
        }

        public get IsExisteRequisicoesAtivas(): boolean
        {
            return this.Fila.length > 0 || this._requisicaoAtual!= null;
        }

        public get TotalRequisicoesFila(): number
        {
            return this.Fila.length;
        }

        public ExecutarAsync(requisicao: Requisicao): Promise<any>
        {
            return new Promise(resolver =>
            {
                this.Fila.Add({
                    Requisicao: requisicao,
                    Resolver: resolver
                });
                this.MostrarAlertaRequisicaoAguardandoNaFila(requisicao);
                this.ExecutarProximaRequisicaoAsync();
            });
        }

        public async AguardarFilaRequisicoesAsync(progressHandler: (e: ProgressoEventArgs) => void = null): Promise<void>
        {
            if (this.Fila.length === 0)
            {
                return;
            }

            let totalFila = this.Fila.length;
            let c = 0;
            let ultimoProgresso = $Aplicacao.ProgressoOcupadoAtual;

            if (!ValidacaoUtil.IsValorProgressoValido(ultimoProgresso))
            {
                console.error(`Valor do progresso ${ultimoProgresso} invalido`);
                ultimoProgresso = 0;
            }

            while (this.Fila.length > 0)
            {
                console.WarmDebug(`Existe ainda ( ${this.Fila.length} requisições na fila`);
                if (progressHandler != null)
                {
                    c += 1;
                    if (totalFila < this.Fila.length)
                    {
                        totalFila = this.Fila.length;
                    }
                    const progresso = ((totalFila - this.Fila.length) / totalFila) * 100;
                    ultimoProgresso = Math.max(ultimoProgresso, progresso);
                    progressHandler(new ProgressoEventArgs(ultimoProgresso, `Fila ${c}/${totalFila}`));
                }
                await ThreadUtil.EsperarAsync(350);
            }
        }

        private async ExecutarProximaRequisicaoAsync()
        {
            if (this._requisicaoAtual == null && this.Fila.Count > 0)
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

        private async ResolverAsync(resolver: (resultado: any) => void, resultado: any)
        {
            await ThreadUtil.QuebrarAsync();
            resolver(resultado);
        }

        public NotificarFalhaRequisicao()
        {
            this._isExisteFalhaRequisicao = true;
        }

        private MostrarAlertaRequisicaoAguardandoNaFila(requisicao: Requisicao)
        {
            if (this._requisicaoAtual != null &&
                this._requisicaoAtual.Requisicao !== requisicao &&
                this.Fila.Count > 0)
            {
                if ($Configuracao.IsDebugOuTeste)
                {
                    console.warn(`A requisição ${requisicao.toString()} está na fila n ${this.Fila.length}`);
                }
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
        readonly Requisicao: Requisicao;
        readonly Resolver: (resultado: any) => void;
    }

}
