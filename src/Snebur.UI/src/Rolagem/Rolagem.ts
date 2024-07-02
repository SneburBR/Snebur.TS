namespace Snebur.UI
{
    export class Rolagem implements IDisposable
    {
        //#region Propriedades

        private static readonly INTERVALO_ENTRE_ROLAGENS: number = 20;
        private static readonly TEMPO_PADRAO: number = 200;
        public readonly ElementoScroll: HTMLElement;
        private TokenCancelamento: CancelationToken;

        //#endregion

        //#region Construtor

        public constructor(elementoAlvo: HTMLElement | string)
        {
            this.ElementoScroll = ElementoUtil.RetornarElemento(elementoAlvo);
        }
        //#endregion

        //#region Métodos Públicos

        public RolarParaInicioHorizontalAsync(duracaoEmMilisegundos: number = Rolagem.TEMPO_PADRAO): Promise<void>
        {
            return this.RolarHorizontalAsync(0, duracaoEmMilisegundos);
        }

        public RolarParaFinalHorizontalAsync(duracaoEmMilisegundos: number = Rolagem.TEMPO_PADRAO): Promise<void>
        {
            return this.RolarHorizontalAsync(this.ElementoScroll.scrollWidth, duracaoEmMilisegundos);
        }

        public RolarParaInicioVerticalAsync(duracaoEmMilisegundos: number): Promise<void>
        {
            return this.RolarVerticalAsync(0, duracaoEmMilisegundos);
        }

        public RolarParaFinalVertical(duracaoEmMilisegundos: number = Rolagem.TEMPO_PADRAO)
        {
            return this.RolarVerticalAsync(this.ElementoScroll.scrollHeight, duracaoEmMilisegundos);
        }

        public async RolarHorizontalAsync(posicaoFinal: number, duracaoEmMilisegundos: number = Rolagem.TEMPO_PADRAO): Promise<void>
        {
            const posicaoInicial = this.ElementoScroll.scrollLeft;
            posicaoFinal = u.ConverterUtil.ParaInteiro(posicaoFinal);
            const direcao = (posicaoInicial < posicaoFinal ? EnumDirecaoRolagem.ParaDireita : EnumDirecaoRolagem.ParaEsquerda);
            await this.IniciarAsync(direcao, posicaoInicial, posicaoFinal, duracaoEmMilisegundos);
        }

        public async RolarVerticalAsync(posicaoFinal: number, duracaoEmMilisegundos: number = Rolagem.TEMPO_PADRAO): Promise<void>
        {
            const posicaoInicial = this.ElementoScroll.scrollTop;
            posicaoFinal = u.ConverterUtil.ParaInteiro(posicaoFinal);
            const direcao = (posicaoInicial < posicaoFinal ? EnumDirecaoRolagem.ParaBaixo : EnumDirecaoRolagem.ParaCima);
            await this.IniciarAsync(direcao, posicaoInicial, posicaoFinal, duracaoEmMilisegundos);
        }

        public async RolarParaEsquerdaAsync(distancia: number, duracaoEmMilisegundos: number = Rolagem.TEMPO_PADRAO): Promise<void>
        {
            const posicaoInicial = this.ElementoScroll.scrollLeft;
            const posicaoFinal = posicaoInicial - distancia;
            const direcao = EnumDirecaoRolagem.ParaEsquerda;
            await this.IniciarAsync(direcao, posicaoInicial, posicaoFinal, duracaoEmMilisegundos);
        }

        public async RolarParaDireitaAsync(distancia: number, duracaoEmMilisegundos: number = Rolagem.TEMPO_PADRAO): Promise<void>
        {
            const posicaoInicial = this.ElementoScroll.scrollLeft;
            const posicaoFinal = posicaoInicial + distancia;
            const direcao = EnumDirecaoRolagem.ParaDireita;
            await this.IniciarAsync(direcao, posicaoInicial, posicaoFinal, duracaoEmMilisegundos);
        }

        public async RolarParaCimaAsync(distancia: number, duracaoEmMilisegundos: number = Rolagem.TEMPO_PADRAO): Promise<void>
        {
            const posicaoInicial = this.ElementoScroll.scrollTop;
            const posicaoFinal = posicaoInicial - distancia;
            const direcao = EnumDirecaoRolagem.ParaCima;
            await this.IniciarAsync(direcao, posicaoInicial, posicaoFinal, duracaoEmMilisegundos);
        }

        public async RolarParaBaixoAsync(distancia: number, duracaoEmMilisegundos: number = Rolagem.TEMPO_PADRAO): Promise<void>
        {
            const posicaoInicial = this.ElementoScroll.scrollTop;
            const posicaoFinal = posicaoInicial + distancia;
            const direcao = EnumDirecaoRolagem.ParaBaixo;
            await this.IniciarAsync(direcao, posicaoInicial, posicaoFinal, duracaoEmMilisegundos);
        }
         
        //#endregion

        //#region Métodos Privados

        private IniciarAsync(
            direcao: EnumDirecaoRolagem,
            posicaoInicial: number,
            posicaoFinal: number,
            duracaoEmMilisegundos: number): Promise<void>
        {
            this.TokenCancelamento?.Cancel();
            this.TokenCancelamento = new CancelationToken();

            return this.IniciarInternoAsync(this.TokenCancelamento,
                direcao,
                posicaoInicial,
                posicaoFinal,
                duracaoEmMilisegundos);

        }

        private async IniciarInternoAsync(
            tokenCancelamento: CancelationToken,
            direcao: EnumDirecaoRolagem,
            posicaoInicial: number,
            posicaoFinal: number,
            duracaoEmMilisegundos: number): Promise<void>
        {

            posicaoFinal = this.NormalizarPosicaoFinal(direcao, posicaoFinal);

            const rolagemPorIntervalo = this.RetornarRolagemPorIntervalo(
                posicaoInicial,
                posicaoFinal,
                duracaoEmMilisegundos);

            let novaPosicao = this.RetornarNovaPosicao(
                direcao,
                posicaoInicial,
                posicaoFinal,
                rolagemPorIntervalo);

            do 
            {
                this.AtualizarPosicaoScroll(direcao, novaPosicao);
                novaPosicao = this.RetornarNovaPosicao(direcao, novaPosicao, posicaoFinal, rolagemPorIntervalo);

                if (posicaoFinal !== novaPosicao)
                {
                    await ThreadUtil.EsperarAsync(20);
                    if (tokenCancelamento.IsCanceled)
                    {
                        return;
                    }
                }
            }
            while (posicaoFinal !== novaPosicao);
        }

        private AtualizarPosicaoScroll(diretacao: EnumDirecaoRolagem, posicao: number): void
        {
            switch (diretacao)
            {
                case EnumDirecaoRolagem.ParaEsquerda:
                case EnumDirecaoRolagem.ParaDireita:

                    this.ElementoScroll.scrollLeft = posicao;

                    return;

                case EnumDirecaoRolagem.ParaCima:
                case EnumDirecaoRolagem.ParaBaixo:

                    this.ElementoScroll.scrollTop = posicao;
                    return;

                default:

                    throw new ErroNaoSuportado(`A direção ${diretacao} não é suportada para rolagem.`, this);
            }
        }

        private RetornarNovaPosicao(direcao: EnumDirecaoRolagem,
            posicaoAtual: number,
            posicaoFinal: number,
            rolagemPorIntervalo: number): number
        {
            let novaPosicao: number;

            switch (direcao)
            {
                case EnumDirecaoRolagem.ParaEsquerda:
                case EnumDirecaoRolagem.ParaCima:
                    novaPosicao = posicaoAtual - rolagemPorIntervalo;
                    break;

                case EnumDirecaoRolagem.ParaDireita:
                case EnumDirecaoRolagem.ParaBaixo:
                    novaPosicao = posicaoAtual + rolagemPorIntervalo;
                    break;

                default:
                    throw new ErroNaoSuportado(`A direção ${direcao} não é suportada para rolagem.`, this);
            }

            if (this.IsPosicaoFinal(direcao, novaPosicao, posicaoFinal))
            {
                return posicaoFinal;
            }
            return novaPosicao;
        }

        private IsPosicaoFinal(direcao: EnumDirecaoRolagem, novaPosicao: number, posicaoFinal: number)
        {
            if (direcao === EnumDirecaoRolagem.ParaEsquerda || direcao === EnumDirecaoRolagem.ParaCima)
            {
                return novaPosicao <= posicaoFinal;
            }

            if (direcao === EnumDirecaoRolagem.ParaDireita || direcao === EnumDirecaoRolagem.ParaBaixo)
            {
                return novaPosicao >= posicaoFinal;
            }
            throw new Erro("direção não suportada");
        }

        private RetornarRolagemPorIntervalo(posicaoInicial: number, posicaoFinal: number, durecao: number): number
        {
            const rolagemTotal = Math.abs(posicaoFinal - posicaoInicial);
            const rolagemPorIntervalo = Math.ceil(rolagemTotal / durecao * Rolagem.INTERVALO_ENTRE_ROLAGENS);
            return rolagemPorIntervalo;
        }

        private NormalizarPosicaoFinal(direcao: number, posicaoFinal: number): number
        {
            if (direcao === EnumDirecaoRolagem.ParaEsquerda ||
                direcao === EnumDirecaoRolagem.ParaCima)
            {
                if (posicaoFinal < 0)
                {
                    return 0;
                }

            }
            else if (direcao === EnumDirecaoRolagem.ParaDireita)
            {
                const limiteFinalParaDireita = this.ElementoScroll.scrollWidth - this.ElementoScroll.clientWidth;
                if (posicaoFinal > limiteFinalParaDireita)
                {
                    return limiteFinalParaDireita;
                }
            }
            else if (direcao === EnumDirecaoRolagem.ParaBaixo)
            {
                const limiteFinalParaBaixo = this.ElementoScroll.scrollHeight - this.ElementoScroll.clientHeight;
                if (posicaoFinal > limiteFinalParaBaixo)
                {
                    return limiteFinalParaBaixo;
                }
            }
            else
            {
                throw new ErroNaoSuportado(`A direção ${direcao} não é suportada para rolagem.`, this);
            }
            return posicaoFinal;
        }


        //#endregion

        public Dispose(): void
        {
            this.TokenCancelamento?.Cancel();
        }
    }
}