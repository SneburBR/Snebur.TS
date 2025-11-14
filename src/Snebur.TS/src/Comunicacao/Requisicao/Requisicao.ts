namespace Snebur.Comunicacao
{
    export class Requisicao extends BaseRequisicao
    {
        private static MAXIMA_TENTATIVA_ERRO_INTERNO_SERVIDOR: number = 10;
        private static readonly TEMPO_ESPERAR_FALHA = 2;

        private _urlServico: string
        private _tentativas: number = 0;

        private get Gerencaidor(): GerenciadorRequiscao
        {
            return GerenciadorRequiscao.Instancia;
        }

        public get UrlRequisicao(): string
        {
            return RequisicaoUtil.RetornarUrlRequisicao(
                this._urlServico,
                this.NomeManipualdor,
                this.NomeMetodo);
        }

        public constructor(
            public readonly BaseServico: BaseComunicacaoCliente,
            public readonly NomeManipualdor: string,
            public readonly NomeMetodo: string,
            private readonly Credencial: s.Credencial,
            private readonly Pacote: Uint8Array)
        {
            super();

            this._urlServico = this.BaseServico.UrlServico;
        }

        public override async ExecutarAsync(): Promise<ResultadoChamada>
        {
            const resultado = await this.ExecutarInternoAsync();
            if (this.Gerencaidor.IsExisteFalhaRequisicao)
            {
                this.Gerencaidor.SetIsExiteFalhaRequisicao(false);
                $Aplicacao.EventoConexaoRestabelecida.Notificar(this, EventArgs.Empty);
            }
            return resultado;
        }

        private async ExecutarInternoAsync(): Promise<ResultadoChamada>
        {

            this.TalvezUtilizarUrlServicoDebug();

            const token = await s.Token.RetornarTokenAsync();
            const chamadaServico = new ChamadaServicoAsync(
                this,
                this._urlServico,
                this.NomeManipualdor,
                this.NomeMetodo,
                this.Credencial,
                token);

            const resultadoChamada = await chamadaServico.ChamarAsync(
                this.Pacote,
                this.BaseServico.Timeout);

            /*const callback: Function = argumentos[(argumentos.length - 1)];*/
            if (resultadoChamada instanceof ResultadoChamadaErro)
            {
                this.NotificarErroRequisicao(
                    chamadaServico,
                    resultadoChamada);

                return await this.TentarNovamenteAsync(resultadoChamada);
            }
            return resultadoChamada;
        }

        private TalvezUtilizarUrlServicoDebug()
        {
            if (this.IsUsarUrlServicoDEBUG())
            {
                this.UsarUrlServicoDEBUG();
            }
        }
        private IsUsarUrlServicoDEBUG()
        {
            if (String.IsNullOrEmpty(this.BaseServico.UrlServicoDebug) ||
                this._urlServico === this.BaseServico.UrlServicoDebug)
            {
                return false;
            }
             
            if ($Configuracao.IsDebugOuTeste)
            {
                if ($Configuracao.IsAlterarUrlDebug)
                {
                    return true;
                }
                return this._tentativas > 5;
            }
            return false;
        }

        public UsarUrlServicoDEBUG()
        {
            if (this._urlServico !== this.BaseServico.UrlServicoDebug)
            {
                this.BaseServico.UsarUrlServicoDEBUG();
                this._urlServico = this.BaseServico.UrlServico;
            }
        }

        private NotificarErroRequisicao(
            chamarServico: ChamadaServicoAsync,
            resultadoChamada: ResultadoChamadaErro): void
        {

            const isErroInternoServidor = resultadoChamada instanceof ResultadoChamadaErroInternoServidor || resultadoChamada.StatusCode === 500;

            const sb = new StringBuilder();
            sb.AppendLine(`Falha na requisição interno no servidor (Status) ${chamarServico.HttpStatus}`);
            sb.AppendLine("URL: " + this._urlServico);
            sb.AppendLine("Serviço: " + this.NomeManipualdor);
            sb.AppendLine("Operação: " + this.NomeMetodo);
            sb.AppendLine("Tentativa: " + this._tentativas + 1);
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
                if (isErroInternoServidor &&
                    this._tentativas > Requisicao.MAXIMA_TENTATIVA_ERRO_INTERNO_SERVIDOR)
                {
                    throw new Error(mensagem);
                }
            }

            this.TalvezUtilizarUrlServicoDebug();
            this._tentativas += 1;
        }

        private async TentarNovamenteAsync(
            resultadoChamada: ResultadoChamadaErro)
        {
            const isErroInternoServidor = resultadoChamada instanceof ResultadoChamadaErroInternoServidor ||
                resultadoChamada.StatusCode === 500;

            if (isErroInternoServidor)
            {
                console.error(`ERRO INTERNO NO SERVIDOR: ${resultadoChamada.MensagemErro}`);
            }

            const args = new FalhaConexaoEventArgs(
                resultadoChamada,
                this._urlServico,
                this.NomeManipualdor,
                this.NomeMetodo,
                this._tentativas);

            $Aplicacao.EventoFalhaConexao.Notificar(this, args);

            if (!isErroInternoServidor && !this.Gerencaidor.IsExisteFalhaRequisicao)
            {
                GerenciadorRequiscao.Instancia.SetIsExiteFalhaRequisicao(true);
                await u.InternetUtil.AguardarConexaoInternerAsync();
            }

            const totalSegundos = Requisicao.TEMPO_ESPERAR_FALHA * Math.min(this._tentativas, 10);
            const esperarProximaTentativa = TimeSpan.FromSeconds(Math.min(totalSegundos, 60));
            await u.ThreadUtil.EsperarAsync(esperarProximaTentativa);
            return await this.ExecutarInternoAsync();
        }

        //#region Normalizar resultado

        //#endregion

        public override toString(): string
        {
            return this.UrlRequisicao;
        }
    }
}
