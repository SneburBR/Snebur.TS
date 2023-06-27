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
        public constructor(posicao: IPosicao, dimensao: IDimensao)
        public constructor(x: number, y: number, largura: number, altura: number)
        public constructor(...args: any[]) 
        {
            super();

            const [x, y, largura, altura] = this.RetornarParametrosInicializacao(args);
            this._x = u.ConverterUtil.ParaNumero(x);
            this._y = u.ConverterUtil.ParaNumero(y);
            this._largura = u.ConverterUtil.ParaNumero(largura);
            this._altura = u.ConverterUtil.ParaNumero(altura);
        }

        private RetornarParametrosInicializacao(args: any[]): [number, number, number, number]
        {
            if (args.length === 0 || (args.length === 1 && args[0] == null))
            {
                return [0, 0, 0, 0];

            }
              
            if (args.length === 2)
            {
                const posicao =  args[0] as IPosicao;
                const dimensao = args[1] as IDimensao;
                return [posicao.X, posicao.Y, dimensao.Largura, dimensao.Altura];
            }

            if (args.length === 4)
            {
                return [
                    ConverterUtil.ParaNumero(args[0]),
                    ConverterUtil.ParaNumero(args[1]),
                    ConverterUtil.ParaNumero(args[2]),
                    ConverterUtil.ParaNumero(args[3])];
            }

            throw new Erro("Argumentos de construção da região inválidos");
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