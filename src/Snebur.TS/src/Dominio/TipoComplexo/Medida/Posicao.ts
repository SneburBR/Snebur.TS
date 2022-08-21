namespace Snebur.Dominio
{
    export class Posicao extends Snebur.Dominio.BaseMedidaTipoComplexo implements Snebur.Dominio.IPosicao, Snebur.Dominio.ICaminhoTipo, IEquals
    {
        //#region Propriedades

        private _x: number = 0;
        private _y: number = 0;

        public get X(): number 
        {
            return this._x;
        }

        public set X(value: number)  
        {
            this.NotificarPropriedadeAlterada("X", this._x, this._x = value);
        }

        public get Y(): number 
        {
            return this._y;
        }

        public set Y(value: number)  
        {
            this.NotificarPropriedadeAlterada("Y", this._y, this._y = value);
        }

        public get XImpressao(): number
        {
            return u.MedidaUtil.RetornarPixelsImpressao(this.X);
        }

        public get YImpressao(): number
        {
            return u.MedidaUtil.RetornarPixelsImpressao(this.Y);
        }

        public get IsEmpty(): boolean
        {
            return this.X === 0 && this.Y === 0;
        }
        //#endregion

        //#region Construtor

        public constructor()
        public constructor(x: number, y: number)
        public constructor(posicao: IPosicao)
        public constructor(xOuPosicao?: any, y?: any) 
        {
            super();

            if (ValidacaoUtil.IsNumber(xOuPosicao as any) &&
                ValidacaoUtil.IsNumber(y))
            {
                this._x = u.ConverterUtil.ParaNumero(xOuPosicao);
                this._y = u.ConverterUtil.ParaNumero(y);
            }
            else if (typeof xOuPosicao === "object")
            {
                const posicao = xOuPosicao as IPosicao;
                if (ValidacaoUtil.IsNumber(posicao.X) &&
                    ValidacaoUtil.IsNumber(posicao.Y))
                {
                    this._x = u.ConverterUtil.ParaNumero(posicao.X);
                    this._y = u.ConverterUtil.ParaNumero(posicao.Y);
                }
            }
        }
        //#endregion

        public RetornarXVisualizacao(dpiVisualziacao: number): number
        {
            return u.MedidaUtil.RetornarPixelsVisualizacao(this.X, dpiVisualziacao);
        }

        public RetornarYVisualizacao(dpiVisualziacao: number): number
        {
            return u.MedidaUtil.RetornarPixelsVisualizacao(this.Y, dpiVisualziacao);
        }

        public Clone(): Posicao
        {
            return new Posicao(this.X, this.Y);
        }

        public Equals(posicao: Posicao): boolean
        public Equals(posicao: Posicao, sensibilidade: number): boolean
        public Equals(posicao: Posicao, sensibilidade: number = 0): boolean
        {
            if (posicao instanceof Posicao)
            {
                if (sensibilidade > 0)
                {
                    return Util.IgualSensivel(this.X.ToDecimal(), posicao.X.ToDecimal(), sensibilidade) &&
                        Util.IgualSensivel(this.Y.ToDecimal(), posicao.Y.ToDecimal(), sensibilidade);
                }
                return this.X.ToDecimal() === posicao.X.ToDecimal() &&
                    this.Y.ToDecimal() === posicao.Y.ToDecimal();
            }
            return false;
        }


        public IsProporcional(posicao: d.Posicao): boolean
        public IsProporcional(posicao: d.Posicao, sensibilidade: number): boolean
        public IsProporcional(posicao: d.Posicao, sensibilidade: number = 0): boolean
        {
            if (!this.IsEmpty && !posicao.IsEmpty)
            {
                const scalarX = (this.X / posicao.X).ToDecimal();
                const scalarY = (this.Y / posicao.Y).ToDecimal();
                return u.Util.IgualSensivel(scalarX, scalarY, 0);
            }

            if (this.IsEmpty && posicao.IsEmpty)
            {
                return true;
            }
            return false;
        }



        public ToPixels(dpi: number): Posicao
        {
            return this.ParaPixels(dpi);
        }

        public ParaPixels(dpi: number): Posicao
        {
            const x = MedidaUtil.RetornarPixelsVisualizacao(this.X, dpi);
            const y = MedidaUtil.RetornarPixelsVisualizacao(this.Y, dpi);
            return new Posicao(x, y);
        }

        public ParaImpressao(): Posicao
        {
            return this.ParaPixels(MedidaUtil.DPI_IMPRESSAO_PADRAO);
        }

        public ParaCentimetros(dpi: number): Posicao
        {
            const x = MedidaUtil.ParaCentimentros(this.X, dpi);
            const y = MedidaUtil.ParaCentimentros(this.Y, dpi);
            return new Posicao(x, y);
        }

        //#region Estático

        public static get Empty(): Posicao
        {
            return new Posicao(0, 0);
        }

        //#endregion


        /**
         * Retornar um nova Dimensão
         * @param escalar escalar que será multiplicado no X e Y da Posição
         */
        public Escalar(escalar: number, isInteiro: boolean = false): Posicao
        {
            const x = this.X * escalar;
            const y = this.Y * escalar;

            if (isInteiro)
            {
                return new Posicao(parseInt(x), parseInt(y));
            }
            return new Posicao(x, y);
        }

        public override toString(): string
        {
            return this.___NomeConstrutor + "_" + this.X.toString() + "x" + this.Y.toString();
        }

    }
}