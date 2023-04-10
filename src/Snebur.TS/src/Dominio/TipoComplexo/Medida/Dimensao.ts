namespace Snebur.Dominio
{
    export class Dimensao extends BaseMedidaTipoComplexo implements Snebur.Dominio.IDimensao
    {
        //#region Propriedades

        private _largura: number = 0;
        private _altura: number = 0;

        public get Largura(): number 
        {
            return this._largura;
        }

        public set Largura(value: number)  
        {
            if (value < 0 || isNaN(value))
            {
                throw new Erro("A dimensão não suporta valores negativo ou NaN");
            }
            this.NotificarValorPropriedadeAlterada("Largura", this._largura, this._largura = value.ToDecimal(3));
        }

        public get Altura(): number 
        {
            return this._altura;
        }

        public set Altura(value: number)  
        {
            if (value < 0 || isNaN(value))
            {
                throw new Erro("A dimensão não suporta valores negativo");
            }
            this.NotificarValorPropriedadeAlterada("Altura", this._altura, this._altura = value.ToDecimal(3));
        }

        public get Orientacao(): d.EnumOrientacao
        {
            if (this.Largura > this.Altura)
            {
                return d.EnumOrientacao.Horizontal;
            }
            if (this.Altura > this.Largura)
            {
                return d.EnumOrientacao.Vertical;
            }
            return d.EnumOrientacao.Quadrado;
        }

        public get IsQuadrada(): boolean
        {
            return this.Orientacao === d.EnumOrientacao.Quadrado;
        }

        public get IsEmpty(): boolean
        {
            return !this.IsExisteDimnesao;
        }

        public get IsExisteDimnesao(): boolean
        {
            return (this.Largura > 0 && this.Altura > 0);
        }

        public get TotalMegaPixels(): number
        {
            return (this.Largura * this.Altura) / (1024 * 1024);
        }

        public get AreaQuadrada(): number
        {
            return this.Largura * this.Altura;
        }

        public get Proporcao(): number
        {
            return (this.Largura / this.Altura).ToDecimal(2);
        }

        public get ProporcaoSimplificada(): IDimensao
        {
            return DimensaoUtil.ProporcaoSimplificada(this.Largura, this.Altura);
        }

        //#endregion

        //#region Construtor

        public constructor();
        public constructor(largura: number, altura: number);
        public constructor(dimensao: IDimensao);
        public constructor(larguraOuDimensao?: number | IDimensao, altura?: number) 
        {
            super();

            if (ValidacaoUtil.IsNumber(larguraOuDimensao as number) &&
                ValidacaoUtil.IsNumber(altura))
            {
                this.Largura = u.ConverterUtil.ParaNumero(larguraOuDimensao as number);
                this.Altura = u.ConverterUtil.ParaNumero(altura);
            }
            else if (typeof larguraOuDimensao === "object")
            {
                const dimensao = larguraOuDimensao as IDimensao;
                if (ValidacaoUtil.IsNumber(dimensao.Largura) &&
                    ValidacaoUtil.IsNumber(dimensao.Altura))
                {
                    this.Largura = u.ConverterUtil.ParaNumero(dimensao.Largura);
                    this.Altura = u.ConverterUtil.ParaNumero(dimensao.Altura);
                }
            }
        }

        public Clone(): Dimensao;
        public Clone(inverterOrientacao: boolean): Dimensao;
        public Clone(inverterOrientacao: boolean = false): Dimensao
        {
            if (inverterOrientacao)
            {
                return new Dimensao(this._altura, this._largura);
            }
            return new Dimensao(this._largura, this._altura);
        }

        public override toString(): string
        {
            return this.___NomeConstrutor + "_" + this.Largura.toString() + "x" + this.Altura.toString();
        }

        public Equals(dimensao: Dimensao): boolean;
        public Equals(dimensao: IDimensao, sensibilidade: number): boolean;
        public Equals(dimensao: IDimensao, sensibilidade: number = 0): boolean
        {
            if (dimensao != null &&
                typeof dimensao.Largura === "number" &&
                typeof dimensao.Altura === "number")
            {
                if (sensibilidade === 0)
                {
                    return this.Largura.ToDecimal() === dimensao.Largura.ToDecimal() &&
                        this.Altura.ToDecimal() === dimensao.Altura.ToDecimal();
                }
                else
                {
                    return Util.IgualSensivel(this.Largura, dimensao.Largura, sensibilidade) &&
                        Util.IgualSensivel(this.Altura, dimensao.Altura, sensibilidade);
                }
            }
            return false;
        }

        /**
       * verifica se ambos dos lados é maior
       * @param dimensao
       */
        public Maior(dimensao: d.Dimensao): boolean
        {

            return this.Altura > dimensao.Altura &&
                this.Largura > dimensao.Largura;
        }

        /**
        * verifica se um dos lados é maior
        * @param dimensao
        */
        public MaiorParcial(dimensao: d.Dimensao): boolean
        {
            return this.Altura > dimensao.Altura ||
                this.Largura > dimensao.Largura;
        }

        /**
         * verifica se ambos do lados são menor
         * @param dimensao
         */
        public Menor(dimensao: d.Dimensao): boolean
        {
            return this.Altura < dimensao.Altura &&
                this.Largura < dimensao.Largura;
        }

        /**
         * Verifica se um dos lados é menor;
         * @param dimensao
         */
        public MenorParcial(dimensao: d.Dimensao): boolean
        {
            return this.Altura < dimensao.Altura ||
                this.Largura < dimensao.Largura;
        }

     

        /**
         * Verifica se dimensão é proporcional
         * @param dimensao sensibilidade para a comparação, padrão =0
         */
         public IsProporcional(dimensao: d.Dimensao): boolean;
        public IsProporcional(dimensao: d.Dimensao, sensibilidade: number): boolean;
        public IsProporcional(dimensao: d.Dimensao, sensibilidade: number = 0.1): boolean
        {
            if (dimensao != null)
            {
                if (this.IsEmpty || dimensao.IsEmpty)
                {
                    return false;
                }

                //const scalarX = (this.Largura / dimensao.Largura).ToDecimal();
                //const scalarY = (this.Altura / dimensao.Altura).ToDecimal();
                return u.Util.IgualSensivel(this.Proporcao, dimensao.Proporcao, sensibilidade);
            }
            return false;
        }

        public ParaPixels(dpi: number): Dimensao
        {
            const larguraPixels = MedidaUtil.RetornarPixelsVisualizacao(this.Largura, dpi);
            const alturaPixels = MedidaUtil.RetornarPixelsVisualizacao(this.Altura, dpi);
            return new Dimensao(larguraPixels, alturaPixels);
        }

        /**Converter dimensão para impressão, padrão 300dpi */
        public ParaImpressao(): Dimensao
        {
            return this.ParaPixels(MedidaUtil.DPI_IMPRESSAO_PADRAO);
        }

        public ParaCentimetros(dpi: number): Dimensao
        {
            const larguraCentimentros = MedidaUtil.ParaCentimentros(this.Largura, dpi).ToDecimal();
            const alturaCentimetros = MedidaUtil.ParaCentimentros(this.Altura, dpi).ToDecimal();
            return new Dimensao(larguraCentimentros, alturaCentimetros);
        }

        /**
         * Converter a dimensão para centímetros
         * @param dpi
         */
        public ToCentimetros(dpi: number): Dimensao
        {
            return this.ParaCentimetros(dpi);
        }

        /**
         * Retornar um nova Dimensão
         * @param escalar escalar que será multiplicado na largura e altura da dimensão
         */
        public Escalar(escalar: number, isInteiro: boolean = false): Dimensao
        {
            const largura = this.Largura * escalar;
            const altura = this.Altura * escalar;

            if (isInteiro)
            {
                return new Dimensao(parseInt(largura), parseInt(altura));
            }
            return new Dimensao(largura, altura);
        }

        /**
        * Retornar um nova Dimensão
        * @param escalar escalar que será multiplicado na largura da dimensão
        */
        public EscalarLargura(escalarLargura: number): Dimensao
        {
            const largura = this.Largura * escalarLargura;
            const altura = this.Altura;
            return new Dimensao(largura, altura);
        }

        /**
       * Retornar um nova Dimensão
       * @param escalar escalar que será multiplicado na altura da dimensão
       */
        public EscalarAltura(escalarAltura: number): Dimensao
        {
            const largura = this.Largura;
            const altura = this.Altura * escalarAltura;
            return new Dimensao(largura, altura);
        }

        public Diminuir(dimensao: Dimensao): Dimensao;
        public Diminuir(margem: Margem): Dimensao;
        public Diminuir(comprimento: number): Dimensao;
        public Diminuir(margemOuDimensao: Margem | Dimensao | number): Dimensao
        {

            if (margemOuDimensao instanceof Dimensao)
            {
                const largura = Math.max(this.Largura - margemOuDimensao.Largura, 0);
                const altura = Math.max(this.Altura - margemOuDimensao.Altura, 0);
                return new Dimensao(largura, altura);
            }

            if (margemOuDimensao instanceof Margem)
            {
                const largura = Math.max(this.Largura - (margemOuDimensao.Esquerda + margemOuDimensao.Direita), 0);
                const altura = Math.max(this.Altura - (margemOuDimensao.Superior + margemOuDimensao.Inferior), 0);
                return new Dimensao(largura, altura);
            }
            if (typeof margemOuDimensao === "number")
            {
                const largura = Math.max(this.Largura - margemOuDimensao, 0);
                const altura = Math.max(this.Altura - margemOuDimensao, 0);
                return new Dimensao(largura, altura);
            }

            throw new Erro("O argumento 'margemOuDimensao' não é suportado");
        }

        public Aumentar(dimensao: Dimensao): Dimensao;
        public Aumentar(margem: Margem): Dimensao;
        public Aumentar(comprimento: number): Dimensao;
        public Aumentar(margemOuDimensao: Margem | Dimensao | number): Dimensao
        {

            if (margemOuDimensao instanceof Dimensao)
            {
                const largura = Math.max(this.Largura + margemOuDimensao.Largura, 0);
                const altura = Math.max(this.Altura + margemOuDimensao.Altura, 0);
                return new Dimensao(largura, altura);
            }

            if (margemOuDimensao instanceof Margem)
            {
                const largura = Math.max(this.Largura + (margemOuDimensao.Esquerda + margemOuDimensao.Direita), 0);
                const altura = Math.max(this.Altura + (margemOuDimensao.Superior + margemOuDimensao.Inferior), 0);
                return new Dimensao(largura, altura);
            }

            if (typeof margemOuDimensao === "number")
            {
                const largura = Math.max(this.Largura + margemOuDimensao, 0);
                const altura = Math.max(this.Altura + margemOuDimensao, 0);
                return new Dimensao(largura, altura);
            }

            throw new Erro("O argumento 'margemOuDimensao' não é suportado");
        }


        public RetornarPosicaoCentro(dimensao: Dimensao): Posicao
        {
            const x = (this.Largura - dimensao.Largura) / 2;
            const y = (this.Altura - dimensao.Altura) / 2;
            return new Posicao(x, y);
        }

        public Inverter(): Dimensao
        {
            return new Dimensao(this.Altura, this.Largura);
        }

        /**
        * Converter a dimensão para pixels
        * @param dpi
        */
        public ToPixels(dpi: number): Dimensao
        {
            return this.ParaPixels(dpi);
        }

        public ToInteiro(): Dimensao
        {
            return new Dimensao(
                parseInt(this.Largura),
                parseInt(this.Altura));
        }

        public ToProporcaoSimplificadaString(): string
        {
            const proporcao = this.ProporcaoSimplificada;
            return `${proporcao.Largura}:${proporcao.Altura}`;
        }

    }
}