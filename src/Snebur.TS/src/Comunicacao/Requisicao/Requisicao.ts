﻿namespace Snebur.Comunicacao
{
    export class Requisicao extends BaseRequisicao
    {
        private static MAXIMA_TENTATIVA_ERRO_INTERNO_SERVIDOR: number = 10;
        private static readonly TEMPO_ESPERAR_FALHA = 2;
        private UrlServico: string
        private Tentativa: number = 0;

        private get Gerencaidor(): GerenciadorRequiscao
        {
            return GerenciadorRequiscao.Instancia;
        }

        public get UrlRequisicao(): string
        {
            return this.UrlServico;
        }

        public get UrlCompleta(): string
        {
            return UrlUtil.Combinar(this.UrlRequisicao,
                this.NomeManipualdor,
                this.NomeMetodo, `\\${BaseRequisicao.Contador}\\`);
        }

        public constructor(
            private readonly BaseServico: BaseComunicacaoCliente,
            public readonly NomeManipualdor: string,
            public readonly NomeMetodo: string,
            private readonly Credencial: s.Credencial,
            private readonly Pacote: Uint8Array)
        {
            super();

            this.UrlServico = this.BaseServico.UrlServico;
        }

        public override async ExecutarAsync(): Promise<any>
        {
            const resultado = await this.ExecutarInternoAsync();
            if (this.Gerencaidor.IsExisteFalhaRequisicao)
            {
                this.Gerencaidor.SetIsExiteFalhaRequisicao(false);
                $Aplicacao.EventoConexaoRestabelecida.Notificar(this, EventArgs.Empty);
            }
            return this.RetornarValorResultado(resultado);
        }

        private async ExecutarInternoAsync(): Promise<any>
        {
            const token = await s.Token.RetornarTokenAsync();
            const chamadaServico = new ChamadaServicoAsync(
                this,
                this.UrlServico,
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

                return await this.TentarNovamenteAsync(resultadoChamada);
            }
            return resultadoChamada;
        }

        private TentarUtilizarUrlServicoDebug()
        {
            if (this.IsUsarUrlServicoDEBUG())
            {
                this.UsarUrlServicoDEBUG();
            }
        }
        private IsUsarUrlServicoDEBUG()
        {
            if ($Configuracao.IsTeste &&
                $Configuracao.IsAlterarUrlDebug)
            {
                return this.Tentativa > 5;
            }

            return $Configuracao.IsDebug &&
                Snebur.$Configuracao.IsAlterarUrlDebug &&
                this.UrlServico !== this.BaseServico.UrlServicoDebug &&
                !String.IsNullOrEmpty(this.BaseServico.UrlServicoDebug);
        }

        public UsarUrlServicoDEBUG()
        {
            if (this.UrlServico !== this.BaseServico.UrlServicoDebug)
            {
                this.BaseServico.UsarUrlServicoDEBUG();
                this.UrlServico = this.BaseServico.UrlServico;
            }
        }

        private NotificarErroRequisicao(
            chamarServico: ChamadaServicoAsync,
            resultadoChamada: ResultadoChamadaErro): void
        {

            const isErroInternoServidor = resultadoChamada instanceof ResultadoChamadaErroInternoServidor || resultadoChamada.StatusCode === 500;

            const sb = new StringBuilder();
            sb.AppendLine(`Falha na requisição interno no servidor (Status) ${chamarServico.HttpStatus}`);
            sb.AppendLine("URL: " + this.UrlServico);
            sb.AppendLine("Serviço: " + this.NomeManipualdor);
            sb.AppendLine("Operação: " + this.NomeMetodo);
            sb.AppendLine("Tentativa: " + this.Tentativa + 1);
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
                    this.Tentativa > Requisicao.MAXIMA_TENTATIVA_ERRO_INTERNO_SERVIDOR)
                {
                    throw new Error(mensagem);
                }
            }

            this.TentarUtilizarUrlServicoDebug();
            this.Tentativa += 1;
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
                this.UrlServico,
                this.NomeManipualdor,
                this.NomeMetodo,
                this.Tentativa);

            $Aplicacao.EventoFalhaConexao.Notificar(this, args);

            if (!isErroInternoServidor && !this.Gerencaidor.IsExisteFalhaRequisicao)
            {
                GerenciadorRequiscao.Instancia.SetIsExiteFalhaRequisicao(true);
                await u.InternetUtil.AguardarConexaoInternerAsync();
            }

            const totalSegundos = Requisicao.TEMPO_ESPERAR_FALHA * Math.min(this.Tentativa, 10);
            const esperarProximaTentativa = TimeSpan.FromSeconds(Math.min(totalSegundos, 60));
            await u.ThreadUtil.EsperarAsync(esperarProximaTentativa);
            return await this.ExecutarInternoAsync();
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
            return this.UrlCompleta;
        }
    }
}
