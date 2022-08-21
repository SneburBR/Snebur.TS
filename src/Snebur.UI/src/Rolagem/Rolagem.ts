namespace Snebur.UI
{
    export class Rolagem implements IDisposable
    {
        //#region Propriedades

        private readonly INTERVALO_ENTRE_ROLAGENS: number = 20;

        private ElementoAlvo: HTMLElement;

        private IdIntervalo: number;
        private DuracaoEmMilisegundos: number;
        private Direcao: EnumDirecaoRolagem;

        private PosicaoInicial: number;
        private PosicaoAtual: number;
        private PosicaoFinal: number;

        //#endregion

        //#region Construtor

        public constructor(idElementoAlvo: string);
        public constructor(elementoAlvo: HTMLElement);
        public constructor(refElementoAlvo: any)
        {
            this.ElementoAlvo = ElementoUtil.RetornarElemento(refElementoAlvo);
        }
        //#endregion

        //#region Métodos Públicos

        public RolarParaInicioHorizontal(duracaoEmMilisegundos: number)
        {
            this.RolarHorizontalParaPontoEspecifico(0, duracaoEmMilisegundos);
        }

        public RolarParaFinalHorizontal(duracaoEmMilisegundos: number)
        {
            this.RolarHorizontalParaPontoEspecifico(this.ElementoAlvo.scrollWidth, duracaoEmMilisegundos);
        }


        public RolarParaInicioVertical(duracaoEmMilisegundos: number)
        {
            this.RolarVerticalParaPontoEspecifico(0, duracaoEmMilisegundos);
        }

        public RolarParaFinalVertical(duracaoEmMilisegundos: number)
        {
            this.RolarVerticalParaPontoEspecifico(this.ElementoAlvo.scrollHeight, duracaoEmMilisegundos);
        }

        public RolarHorizontalParaPontoEspecifico(posicaoFinal: number, duracaoEmMilisegundos: number): void
        {
            this.PosicaoInicial = this.ElementoAlvo.scrollLeft;
            this.PosicaoFinal = u.ConverterUtil.ParaInteiro(posicaoFinal);
            this.Direcao = (this.PosicaoInicial < this.PosicaoFinal ? EnumDirecaoRolagem.ParaDireita : EnumDirecaoRolagem.ParaEsquerda);

            this.Iniciar(duracaoEmMilisegundos);
        }

        public RolarVerticalParaPontoEspecifico(posicaoFinal: number, duracaoEmMilisegundos: number): void
        {
            this.PosicaoInicial = this.ElementoAlvo.scrollTop;
            this.PosicaoFinal = u.ConverterUtil.ParaInteiro(posicaoFinal);
            this.Direcao = (this.PosicaoInicial < this.PosicaoFinal ? EnumDirecaoRolagem.ParaBaixo : EnumDirecaoRolagem.ParaCima);

            this.Iniciar(duracaoEmMilisegundos);
        }

        public RolarParaEsquerda(distancia: number, duracaoEmMilisegundos: number): void
        {
            this.PosicaoInicial = this.ElementoAlvo.scrollLeft;
            this.PosicaoFinal = this.PosicaoInicial - distancia;
            this.Direcao = EnumDirecaoRolagem.ParaEsquerda;

            this.Iniciar(duracaoEmMilisegundos);
        }

        public RolarParaDireita(distancia: number, duracaoEmMilisegundos: number): void
        {
            this.PosicaoInicial = this.ElementoAlvo.scrollLeft;
            this.PosicaoFinal = this.PosicaoInicial + distancia;
            this.Direcao = EnumDirecaoRolagem.ParaDireita;

            this.Iniciar(duracaoEmMilisegundos);
        }

        public RolarParaCima(distancia: number, duracaoEmMilisegundos: number): void
        {
            this.PosicaoInicial = this.ElementoAlvo.scrollTop;
            this.PosicaoFinal = this.PosicaoInicial - distancia;
            this.Direcao = EnumDirecaoRolagem.ParaCima;

            this.Iniciar(duracaoEmMilisegundos);
        }

        public RolarParaBaixo(distancia: number, duracaoEmMilisegundos: number): void
        {
            this.PosicaoInicial = this.ElementoAlvo.scrollTop;
            this.PosicaoFinal = this.PosicaoInicial + distancia;
            this.Direcao = EnumDirecaoRolagem.ParaBaixo;

            this.Iniciar(duracaoEmMilisegundos);
        }

        public Finalizar(): void
        {
            clearInterval(this.IdIntervalo);
            this.IdIntervalo = null;
        }
        //#endregion

        //#region Métodos Privados

        private Iniciar(duracaoEmMilisegundos: number): void
        {
            this.DuracaoEmMilisegundos = duracaoEmMilisegundos;
            this.PosicaoAtual = this.PosicaoInicial;

            this.ValidarPosicaoFinal();
            this.VerificarRolagemEmAndamento();

            this.IdIntervalo = setInterval(this.RealizarRolagem.bind(this), this.INTERVALO_ENTRE_ROLAGENS);
        }

        private RealizarRolagem(): void
        {
            this.PosicaoAtual = this.RetornarNovaPosicao();
            this.AtualizarPosicaoScroll();
        }

        private AtualizarPosicaoScroll(): void
        {
            switch (this.Direcao)
            {
                case EnumDirecaoRolagem.ParaEsquerda:
                case EnumDirecaoRolagem.ParaDireita:
                    this.ElementoAlvo.scrollLeft = this.PosicaoAtual;
                    return;

                case EnumDirecaoRolagem.ParaCima:
                case EnumDirecaoRolagem.ParaBaixo:
                    this.ElementoAlvo.scrollTop = this.PosicaoAtual;
                    return;

                default:
                    throw new ErroNaoSuportado(`A direção ${this.Direcao} não é suportada para rolagem.`, this);
            }
        }

        private RetornarNovaPosicao(): number
        {
            let novaPosicao: number;
            const rolagemPorIntervalo = this.RetornarRolagemPorIntervalo();

            switch (this.Direcao)
            {
                case EnumDirecaoRolagem.ParaEsquerda:
                case EnumDirecaoRolagem.ParaCima:
                    novaPosicao = this.PosicaoAtual - rolagemPorIntervalo;
                    break;

                case EnumDirecaoRolagem.ParaDireita:
                case EnumDirecaoRolagem.ParaBaixo:
                    novaPosicao = this.PosicaoAtual + rolagemPorIntervalo;
                    break;

                default:
                    throw new ErroNaoSuportado(`A direção ${this.Direcao} não é suportada para rolagem.`, this);
            }
            if (((this.Direcao === EnumDirecaoRolagem.ParaEsquerda || this.Direcao === EnumDirecaoRolagem.ParaCima) && novaPosicao <= this.PosicaoFinal) ||
                ((this.Direcao === EnumDirecaoRolagem.ParaDireita || this.Direcao === EnumDirecaoRolagem.ParaBaixo) && novaPosicao >= this.PosicaoFinal))
            {
                novaPosicao = this.PosicaoFinal;
                this.Finalizar();
            }
            return novaPosicao;
        }

        private RetornarRolagemPorIntervalo(): number
        {
            const rolagemTotal = Math.abs(this.PosicaoFinal - this.PosicaoInicial);
            const rolagemPorIntervalo = Math.ceil(rolagemTotal / this.DuracaoEmMilisegundos * this.INTERVALO_ENTRE_ROLAGENS);

            return rolagemPorIntervalo;
        }

        private ValidarPosicaoFinal(): void
        {
            switch (this.Direcao)
            {
                case EnumDirecaoRolagem.ParaEsquerda:
                case EnumDirecaoRolagem.ParaCima:
                    if (this.PosicaoFinal < 0)
                    {
                        this.PosicaoFinal = 0;
                    }
                    break;

                case EnumDirecaoRolagem.ParaDireita: {

                    const limiteFinalParaDireita = this.ElementoAlvo.scrollWidth - this.ElementoAlvo.clientWidth;
                    if (this.PosicaoFinal > limiteFinalParaDireita)
                    {
                        this.PosicaoFinal = limiteFinalParaDireita;
                    }
                    break;
                }
                case EnumDirecaoRolagem.ParaBaixo: {
                    const limiteFinalParaBaixo = this.ElementoAlvo.scrollHeight - this.ElementoAlvo.clientHeight;

                    if (this.PosicaoFinal > limiteFinalParaBaixo)
                    {
                        this.PosicaoFinal = limiteFinalParaBaixo;
                    }
                    break;
                }
                default:
                    throw new ErroNaoSuportado(`A direção ${this.Direcao} não é suportada para rolagem.`, this);
            }
        }

        private VerificarRolagemEmAndamento(): void
        {
            if (this.IdIntervalo != null)
            {
                this.Finalizar();
            }
        }
        //#endregion

        public Dispose(): void
        {
            clearInterval(this.IdIntervalo);
        }
    }
}