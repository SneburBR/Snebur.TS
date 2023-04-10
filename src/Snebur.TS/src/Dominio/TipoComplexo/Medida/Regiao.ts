namespace Snebur.Dominio
{
    export class Regiao extends BaseMedidaTipoComplexo implements IRegiao
    {
        private _largura: number = 0;
        private _altura: number = 0;
        private _x: number = 0;
        private _y: number = 0;

        public get X(): number 
        {
            return this._x;
        }

        public set X(value: number)  
        {
            this.NotificarPropriedadeAlterada("X", this._x, this._x = value.ToDecimal(3));
        }

        public get Y(): number 
        {
            return this._y;
        }

        public set Y(value: number)  
        {
            this.NotificarPropriedadeAlterada("Y", this._y, this._y = value.ToDecimal(3));
        }

        public get Largura(): number 
        {
            return this._largura;
        }

        public set Largura(value: number)  
        {
            this.NotificarValorPropriedadeAlterada("Largura", this._largura, this._largura = value.ToDecimal(3));
        }

        public get Altura(): number 
        {
            return this._altura;
        }

        public set Altura(value: number)  
        {
            this.NotificarValorPropriedadeAlterada("Altura", this._altura, this._altura = value.ToDecimal(3));
        }

        public get Posicao(): d.Posicao
        {
            return new d.Posicao(this.X, this.Y);
        }
        public get Dimensao(): d.Dimensao
        {
            return new d.Dimensao(this.Largura, this.Altura);
        }

        public get IsEmpty(): boolean
        {
            return this.Posicao.IsEmpty && this.Dimensao.IsEmpty;
        }

        public constructor();
        public constructor(posicao: d.Posicao, dimensao: d.Dimensao)
        public constructor(x: number, y: number, largura: number, altura: number)
        public constructor(arg1?: any, arg2?: any, largura?: number, altura?: number) 
        {
            super();

            if (arg1 instanceof d.Posicao && arg2 instanceof d.Dimensao)
            {
                this._x = arg1.X;
                this._y = arg1.Y;
                this._largura = arg2.Largura;
                this._altura = arg2.Altura;
            }
            else
            {
                this._x = u.ConverterUtil.ParaNumero(arg1);
                this._y = u.ConverterUtil.ParaNumero(arg2);
                this._largura = u.ConverterUtil.ParaNumero(largura);
                this._altura = u.ConverterUtil.ParaNumero(altura);
            }
        }

        public Clone(): Regiao
        {
            return new Regiao(this.X, this.Y, this.Largura, this.Altura);
        }

        public Equals(obj: Regiao): boolean
        {
            if (obj instanceof Regiao)
            {
                return this.X.ToDecimal() === obj.X.ToDecimal() &&
                    this.Y.ToDecimal() === obj.Y.ToDecimal() &&
                    this.Largura.ToDecimal() === obj.Largura.ToDecimal() &&
                    this.Altura.ToDecimal() === obj.Altura.ToDecimal();
            }
            return false;
        }

        public ToPixels(dpi: number): Regiao
        {
            return this.ParaPixels(dpi);
        }

        public ParaPixels(dpi: number): Regiao
        {
            const posicao = this.Posicao.ParaPixels(dpi);
            const dimensao = this.Dimensao.ParaPixels(dpi);
            return new Regiao(posicao, dimensao);
        }

        public ParaCentimetros(dpi: number): Regiao
        {
            const posicao = this.Posicao.ParaCentimetros(dpi);
            const dimensao = this.Dimensao.ParaCentimetros(dpi);
            return new Regiao(posicao, dimensao);
        }

        public Escalar(escala: number, isInteiro?: boolean): Regiao
        {
            const posicao = this.Posicao.Escalar(escala, isInteiro);
            const dimensao = this.Dimensao.Escalar(escala, isInteiro);
            return new Regiao(posicao, dimensao);
        }

        public override toString(): string
        {
            return `${this.___NomeConstrutor} L: ${this.Largura.toFixed(2)} A: ${this.Altura.toFixed(2)}_X: ${this.X.toFixed(2)} Y: ${this.Y.toFixed(2)}`;
        }
    }
}