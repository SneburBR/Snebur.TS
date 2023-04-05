namespace Snebur.Comunicacao
{
    export class Requisicao extends BaseRequisicao
    {
        private static MAXIMA_TENTATIVA: number = 35;
        private static readonly TEMPO_ESPERAR_FALHA = 2;
        private readonly UrlServicoDebug: string;
        private URLServico: string
        private Tentativa: number = 0;

        private get Gerencaidor(): GerenciadorRequiscao
        {
            return GerenciadorRequiscao.Instancia;
        }

        public get UrlRequisicao(): string
        {
            return this.URLServico;
        }

        public constructor(
            private readonly BaseServico: BaseComunicacaoCliente,
            private readonly NomeManipualdor: string,
            private readonly NomeMetodo: string,
            private readonly Credencial: s.Credencial,
            private readonly Pacote: Uint8Array)
        {

            super();
            this.URLServico = this.BaseServico.URLServico;
            this.UrlServicoDebug = this.BaseServico.UrlServicoDebug;
        }

        public async ExecutarAsync(): Promise<any>
        {
            if ($Configuracao.IsDebug)
            {
                await ThreadUtil.EsperarAsync(500);
            }

            const token = await s.Token.RetornarTokenAsync();
            const chamadaServico = new ChamadaServicoAsync(
                this,
                this.URLServico,
                this.NomeManipualdor,
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
                return;
            }

            if (this.Gerencaidor.IsExisteFalhaRequisicao)
            {
                this.Gerencaidor.NotificarFalhaRequisicao();
                $Aplicacao.EventoConexaoRestabelecida.Notificar(this, EventArgs.Empty);
            }

            return this.RetornarValorResultado(resultadoChamada);
        }

        private TentarUtilizarUrlServicoDebug()
        {
            const tentativa = this.Tentativa;

            if (($Configuracao.IsDebug || ($Configuracao.IsTeste && tentativa > 3)) &&
                this.URLServico !== this.UrlServicoDebug &&
                !String.IsNullOrEmpty(this.UrlServicoDebug))
            {
                this.UsarUrlServicoDEBUG();
            }
        }

        public UsarUrlServicoDEBUG()
        {
            if (this.URLServico !== this.UrlServicoDebug)
            {
                const mensagem = `A URL serviço '${this.NomeManipualdor}' foi alterada para modo DEBUG,
                               UrlServicoDEBUG : '${this.UrlServicoDebug}'`;

                console.error(mensagem);
                alert(mensagem);
                this.URLServico = this.UrlServicoDebug;
            }
        }

        private NotificarErroRequisicao(
            chamarServico: ChamadaServicoAsync,
            resultadoChamada: ResultadoChamadaErro): void
        {

            const isErroInternoServidor = resultadoChamada instanceof ResultadoChamadaErroInternoServidor;

            const sb = new StringBuilder();
            sb.AppendLine(`Erro interno no servidor (Status) ${chamarServico.HttpStatus}, tratamento do erro não implementado`);
            sb.AppendLine("URL: " + this.URLServico);
            sb.AppendLine("Serviço: " + this.NomeManipualdor);
            sb.AppendLine("Operação: " + this.NomeMetodo);
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
                    this.Tentativa > Requisicao.MAXIMA_TENTATIVA)
                {
                    throw new Error(mensagem);
                }
            }

            this.TentarUtilizarUrlServicoDebug();

            this.Tentativa += 1;

            this.TentarNovamenteAsync(
                resultadoChamada,
                isErroInternoServidor);
        }


        private async TentarNovamenteAsync(
            resultadoChamada: ResultadoChamadaErro,
            isErroInternoServidor: boolean)
        {
            const args = new FalhaConexaoEventArgs(
                resultadoChamada,
                this.URLServico,
                this.NomeManipualdor,
                this.NomeMetodo,
                this.Tentativa);

            $Aplicacao.EventoFalhaConexao.Notificar(this, args);

            if (!isErroInternoServidor && !this.Gerencaidor.IsExisteFalhaRequisicao)
            {
                GerenciadorRequiscao.Instancia.NotificarFalhaRequisicao();
                await u.InternetUtil.AguardarConexaoInternerAsync();
            }

            await u.ThreadUtil.EsperarAsync(TimeSpan.FromSeconds(Requisicao.TEMPO_ESPERAR_FALHA * Math.min(this.Tentativa, 10)));
            this.ExecutarAsync();
        }


        //#region Normalizar resultado

        private RetornarValorResultado(resultadoChamada: ResultadoChamada): any
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
                if ($Configuracao.IsDebug || $Configuracao.IsTeste)
                {
                    alert("Reiniciando sessão do usuário -- sessão usuário invalida");
                }
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

        //#endregion

        public override toString(): string
        {
            return ` ${this.NomeManipualdor} ${this.NomeMetodo} ( ${BaseRequisicao.Contador})`;
        }
    }
}
