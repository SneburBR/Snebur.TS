
namespace Snebur.Dominio 
{

    export class Cor extends Snebur.Dominio.BaseTipoComplexo implements Snebur.Dominio.ICaminhoTipo, Snebur.Dominio.ICaminhoTipo, IEquals 
    {
        public static readonly COR_TRANSPARENTE: string = "rgba(0,0,0,0.0)";

        //#region Propriedades

        private _rgba: string = null;
        private _r: number = 0;
        private _g: number = 0;
        private _b: number = 0;
        private _a: number = 0;

        public get Rgba(): string 
        {
            return this._rgba;
        }
        public set Rgba(value: string)  
        {
            const antigoValor = this._rgba;
            if (!u.ValidacaoUtil.IsCorRgbOuRgba(value, true))
            {
                value = Cor.COR_TRANSPARENTE;
            }
            this._rgba = value;
            this.AtualizarValores();
            this.NotificarPropriedadeAlterada("Rgba", antigoValor, value);
        }

        public get R(): number
        {
            return this._r;
        }
        public set R(value: number)
        {
            u.ValidacaoUtil.ValidarByte(value);
            this._r = value;
            this.AtualizarRgba();
        }

        public get G(): number
        {
            return this._g;
        }
        public set G(value: number)
        {
            u.ValidacaoUtil.ValidarByte(value);
            this._g = value;
            this.AtualizarRgba();
        }

        public get B(): number
        {
            return this._b;
        }
        public set B(value: number)
        {
            u.ValidacaoUtil.ValidarByte(value);
            this._b = value;
            this.AtualizarRgba();
        }

        public get A(): number
        {
            return this._a;
        }
        public set A(value: number)
        {
            u.ValidacaoUtil.ValidarIntervalo(value, 0, 1);
            this._a = value;
            this.AtualizarRgba();
        }

        public get IsTransparente(): boolean
        {
            return this.A === 0;
        }

        public get IsBranca(): boolean
        {
            return this.R === 255 &&
                this.G === 255 &&
                this.B === 255 &&
                this.A === 1;
        }

        public get IsTransparenteAbsoluto(): boolean
        {
            return this.R === 0 &&
                this.G === 0 &&
                this.B === 0 &&
                this.A === 0;
        }

        public get Solida(): Cor
        {
            const clone = this.Clone();
            clone.A = 1;
            return clone;
        }

        public get IsCorClara(): boolean
        {
            return this.IsCorEscura === false;

        }
        public get IsCorEscura(): boolean
        {
            if (this.A < 0.5)
            {
                return false;
            }

            const [r, g, b] = [this.R, this.G, this.B];
            const hsp = Math.sqrt(
                0.299 * (r * r) +
                0.587 * (g * g) +
                0.114 * (b * b)
            );
            return hsp < 127.5;
        }

        //#endregion

        //#region Construtor

        public constructor()
        public constructor(rgbaOuHexa: string)
        public constructor(cor: Snebur.UI.EnumCor)
        public constructor(r: number, g: number, b: number)
        public constructor(r: number, g: number, b: number, a: number)
        public constructor(p1?: any, p2?: number, p3?: number, p4?: number) 
        {
            super();

            if (arguments.length === 0 || (arguments.length === 1 && String.IsNullOrWhiteSpace(p1)))
            {
                this._rgba = Cor.COR_TRANSPARENTE;
                this.AtualizarValores();

            }

            else if (arguments.length === 1 && (typeof p1 === "string" ||
                typeof p1 === "number"))
            {
                let rgbaOuHexa: string;
                if (typeof p1 === "number")
                {
                    if (!((Snebur.UI as any).CorUtil instanceof Function))
                    {
                        throw new Erro(" o scripts Snebur.UI.ts não foi inicializado. ");
                    }
                    p1 = (Snebur.UI as any).CorUtil.RetornarCorHtml(p1);
                }
                rgbaOuHexa = p1;

                if (ValidacaoUtil.IsCorHexa(p1))
                {
                    rgbaOuHexa = ConverterUtil.ConverterHexaParaRgba(p1);
                }

                if (!(u.ValidacaoUtil.IsCorRgbOuRgba(rgbaOuHexa, true)))
                {
                    throw new Erro("O cor rgb ou rgba não é valida");
                }

                this._rgba = rgbaOuHexa;
                this.AtualizarValores();
            }

            else if (arguments.length === 3 || arguments.length === 4)
            {
                const red = p1;
                const green = p2;
                const blue = p3;
                let alpha = 1;

                if (u.ValidacaoUtil.IsIntervaloValido(p4, 0, 1))
                {
                    alpha = p4;
                }

                this._r = red;
                this._g = green;
                this._b = blue;
                this._a = alpha;
                this.AtualizarRgba();
            }
            else
            {
                throw new ErroNaoSuportado("O construtor do cor não é suportado");
            }
        }

        //#endregion

        public AtualizarRgba()
        {
            this._rgba = `rgba(${this.R},${this.G},${this.B},${this.A.toFixed(1)})`;
        }

        public AtualizarValores(): void
        {
            if (this._rgba.StartsWith("rgba"))
            {
                const valores = this._rgba.replace("rgba", String.Empty).replace("(", String.Empty).replace(")", String.Empty).trim().split(",");
                if (valores.length === 4)
                {
                    this._r = parseInt(valores[0]);
                    this._g = parseInt(valores[1]);
                    this._b = parseInt(valores[2]);
                    this._a = parseFloat(valores[3]);
                    this.AtualizarRgba();
                    return;
                }
            }
            else if (this._rgba.StartsWith("rgb"))
            {
                const valores = this._rgba.replace("rgb", String.Empty).replace("(", String.Empty).replace(")", String.Empty).trim().split(",");
                if (valores.length === 3)
                {
                    this._r = parseInt(valores[0]);
                    this._g = parseInt(valores[1]);
                    this._b = parseInt(valores[2]);
                    this._a = 1;
                    this.AtualizarRgba();
                    return;
                }
            }
            throw new Erro("Cor invalida " + this._rgba);
        }


        public Clone(corRgb: boolean = false): d.Cor
        {
            const a = corRgb ? 1 : this.A;
            return new d.Cor(this.R, this.G, this.B, a);
        }

        public Equals(cor1: d.Cor): boolean
        {
            if (cor1 instanceof d.Cor)
            {
                return this.R === cor1.R &&
                    this.G === cor1.G &&
                    this.B === cor1.B &&
                    this.A === cor1.A;

            }
            return false;
        }

        public override GetHashCode(): number
        {
            return this.Rgba.GetHashCode();
        }

        public override toString(): string
        {
            return this.Rgba;
        }
    }
}
