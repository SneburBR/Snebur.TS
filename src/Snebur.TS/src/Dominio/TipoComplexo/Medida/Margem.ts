namespace Snebur.Dominio
{
    export class Margem extends Snebur.Dominio.BaseMedidaTipoComplexo implements Snebur.Dominio.IMargem
    {
        //#region Propriedades

        private _esquerda: number | null = null;
        private _superior: number | null = null;
        private _direita: number | null = null;
        private _inferior: number | null = null;

        public get Esquerda(): number | null
        {
            return this._esquerda;
        }

        public set Esquerda(value: number | null)  
        {
            this.NotificarPropriedadeAlterada("Esquerda", this._esquerda, this._esquerda = (value?.ToDecimal(3) ?? null));
        }

        public get Superior(): number | null
        {
            return this._superior;
        }

        public set Superior(value: number | null)  
        {
            this.NotificarPropriedadeAlterada("Superior", this._superior, this._superior = (value?.ToDecimal(3) ?? null));
        }

        public get Direita(): number | null
        {
            return this._direita;
        }

        public set Direita(value: number | null)  
        {
            this.NotificarPropriedadeAlterada("Direita", this._direita, this._direita = (value?.ToDecimal(3) ?? null));
        }

        public get Inferior(): number | null
        {
            return this._inferior;
        }

        public set Inferior(value: number | null)  
        {
            this.NotificarPropriedadeAlterada("Inferior", this._inferior, this._inferior = (value?.ToDecimal(3) ?? null));
        }

        public get Media(): number | null
        {
            if (this.IsDefined())
            {
                return ((this.Superior + this.Inferior + this.Direita + this.Esquerda) / 4).ToDecimal(3);
            }
            return null;
        }

        public get IsUniforme(): boolean
        {
            const esquerda = this.Esquerda;
            return this.Direita === esquerda &&
                this.Superior === esquerda &&
                this.Inferior === esquerda;
        }

        public get IsNegativa(): boolean
        {
            if (this.IsDefined())
            {
                return this.Esquerda < 0 &&
                    this.Direita < 0 &&
                    this.Superior < 0 &&
                    this.Inferior < 0;
            }
            return false;
        }

        public get Horizontal(): number | null
        {
            if (this.IsDefined())
            {
                return Math.min(this.Esquerda, this.Direita);
            }
            return null;
        }
        public set Horizontal(value: number | null)
        {
            this.Esquerda = value;
            this.Direita = value;
        }

        public get Vertical(): number | null
        {
            if (this.IsDefined())
            {
                return Math.min(this.Superior, this.Inferior);
            }
            return null;
        }
        public set Vertical(value: number | null)
        {
            this.Superior = value;
            this.Inferior = value;
        }

        //#endregion

        //#region Construtor

        public constructor()
        public constructor(margem: number)
        public constructor(margem: IMargem)
        public constructor(margemHorizontal: number | null, magemVertical: number | null)
        public constructor(esquerda: number | null, superior: number | null, direita: number | null, inferior: number | null)
        public constructor(...args: any[]) 
        {
            super();

            const [esquerda, superior, direita, inferior] = this.RetornarParametrosInicializacao(args);
            this.Esquerda = u.ConverterUtil.ParaNumero(esquerda, true);
            this.Superior = u.ConverterUtil.ParaNumero(superior);
            this.Direita = u.ConverterUtil.ParaNumero(direita);
            this.Inferior = u.ConverterUtil.ParaNumero(inferior);
        }

        public Clone(): Margem
        {
            return new Margem(this.Esquerda, this.Superior, this.Direita, this.Inferior);
        }

        public Equals(margem: Margem): boolean
        {
            if (margem == null) return false;

            return this.Esquerda === margem.Esquerda &&
                this.Superior === margem.Superior &&
                this.Direita === margem.Direita &&
                this.Inferior === margem.Inferior;
        }

        public Somar(margem: Margem): Margem
        {
            if (this.IsDefined() && margem.IsDefined())
            {
                return new Margem(this.Esquerda + margem.Esquerda,
                    this.Superior + margem.Superior,
                    this.Direita + margem.Direita,
                    this.Inferior + margem.Inferior);
            }

            if (margem.IsDefined())
            {
                return margem.Clone();
            }

            if (this.IsDefined())
            {
                return this.Clone();
            }
            throw new Erro("Não é possível somar margens indefinidas");

        }

        public get MenorValor(): number | null
        {
            if (this.IsDefined())
            {
                return Math.min(this.Esquerda, this.Superior, this.Direita, this.Inferior);
            }
            return null;
        }

        public get MaiorValor(): number | null
        {
            if (this.IsDefined())
            {
                return Math.max(this.Esquerda, this.Superior, this.Direita, this.Inferior);
            }
            return null;
        }

        public get IsEmpty(): boolean
        {
            return this.Esquerda === null &&
                this.Direita === null &&
                this.Superior === null &&
                this.Inferior === null;
        }

        public get IsZerada(): boolean
        {
            if (this.IsEmpty)
            {
                return true;
            }
            return this.Esquerda === 0 &&
                this.Direita === 0 &&
                this.Superior === 0 &&
                this.Inferior === 0;
        }

        public get IsExisteMargem(): boolean
        {
            if (!this.IsDefined())
            {
                return false;
            }
            return this.Esquerda >= 0 ||
                this.Direita >= 0 ||
                this.Superior >= 0 ||
                this.Inferior >= 0;
        }

        public static get Empty(): Margem
        {
            return new Margem(0, 0, 0, 0);
        }

        public ToPixels(dpi: number): Margem
        {
            return this.ParaPixels(dpi);
        }

        public ParaPixels(dpi: number): Margem
        {
            if (!this.IsDefined())
            {
                throw new Erro("Não é possível converter uma margem indefinida para pixels");
            }

            const esquerda = MedidaUtil.RetornarPixelsVisualizacao(this.Esquerda, dpi);
            const superior = MedidaUtil.RetornarPixelsVisualizacao(this.Superior, dpi);
            const direita = MedidaUtil.RetornarPixelsVisualizacao(this.Direita, dpi);
            const inferior = MedidaUtil.RetornarPixelsVisualizacao(this.Inferior, dpi);
            return new Margem(esquerda, superior, direita, inferior);
        }

        public ToIMagem(): IMargem
        {
            return {
                Esquerda: this.Esquerda,
                Direita: this.Direita,
                Inferior: this.Inferior,
                Superior: this.Superior
            };
        }

        public IsMaior(margem: IMargem): boolean
        {
            if (margem == null)
            {
                throw new ErroArgumentoNulo("margem");
            }

            if (!this.IsDefined() || !MargemHelper.IsDefind(margem))
            {
                throw new Erro("Não é possível comparar margens indefinidas");
            }


            return this.Superior > margem.Superior &&
                this.Inferior > margem.Inferior &&
                this.Esquerda > margem.Esquerda &&
                this.Direita > margem.Direita;
        }

        public IsMaiorOuIgual(margem: IMargem): boolean
        {
            if (this.IsDefined() && MargemHelper.IsDefind(margem))
            {
                return this.Superior >= margem.Superior &&
                    this.Inferior >= margem.Inferior &&
                    this.Esquerda >= margem.Esquerda &&
                    this.Direita >= margem.Direita;
            }
            return false;
        }

        public Diminuir(valor: number, isAceitarNegativo: boolean): Margem
        {
            if (!this.IsDefined())
            {
                throw new Erro("Não é possível diminuir uma margem indefinida");
            }

            const esquerda = this.Esquerda - valor;
            const superior = this.Superior - valor;
            const direita = this.Direita - valor;
            const inferior = this.Inferior - valor;

            if (isAceitarNegativo)
            {
                return new Margem(esquerda, superior, direita, inferior);
            }

            return new Margem(
                Math.max(esquerda, 0),
                Math.max(superior, 0),
                Math.max(direita, 0),
                Math.max(inferior, 0));
        }
        //#endregion

        public Escalar(scalar: number): Margem
        public Escalar(scalarX: number, scalarY: number): Margem
        public Escalar(scalarX: number, scalarY?: number): Margem
        {
            if (!this.IsDefined())
            {
                throw new Erro("Não é possível escalar uma margem indefinida");
            }

            scalarY = scalarY ?? scalarX;
            return new Margem({
                Esquerda: this.Esquerda * scalarX,
                Superior: this.Superior * scalarY,
                Direita: this.Direita * scalarX,
                Inferior: this.Inferior * scalarY
            });
        }

        public IsAlbumMaior(value: number): boolean
        {
            if (!this.IsDefined())
            {
                throw new Erro("Não é possível comparar uma margem indefinida");
            }

            if (this.Esquerda > value)
                return true;
            if (this.Superior > value)
                return true;
            if (this.Direita > value)
                return true;
            if (this.Inferior > value)
                return true;
            return false;
        }

        public IsAlgumMaiorOuIgual(value: number): boolean
        {
            if (!this.IsDefined())
            {
                return false;
            }

            if (this.Esquerda >= value) return true;
            if (this.Superior >= value) return true;
            if (this.Direita >= value) return true;
            if (this.Inferior >= value) return true;
            return false;
        }

        public IsAlgumMenor(value: number): boolean
        {
            if (!this.IsDefined())
            {
                return false;
            }

            if (this.Esquerda < value) return true;
            if (this.Superior < value) return true;
            if (this.Direita < value) return true;
            if (this.Inferior < value) return true;
            return false;
        }

        public IsAlgumMenorOuIgual(value: number): boolean
        {
            if (!this.IsDefined())
            {
                return false;
            }

            if (this.Esquerda <= value) return true;
            if (this.Superior <= value) return true;
            if (this.Direita <= value) return true;
            if (this.Inferior <= value) return true;
            return false;
        }

        public NormalizarMaximo(value: number): Margem
        {
            if (!this.IsDefined())
            {
                return new Margem()
            }

            return new Margem({
                Esquerda: Math.min(this.Esquerda, value),
                Superior: Math.min(this.Superior, value),
                Direita: Math.min(this.Direita, value),
                Inferior: Math.min(this.Inferior, value)
            });
        }

        public NormalizarMinimo(value: number): Margem
        {
            if (!this.IsDefined())
            {
                return new Margem()
            }

            return new Margem({
                Esquerda: Math.max(this.Esquerda, value),
                Superior: Math.max(this.Superior, value),
                Direita: Math.max(this.Direita, value),
                Inferior: Math.max(this.Inferior, value)
            });
        }

        public override toString(): string
        {
            return `${this.___NomeConstrutor}${this.Esquerda?.toFixed(3)},${this.Superior?.toFixed(3)},${this.Direita?.toFixed(3)},${this.Inferior?.toFixed(3)}`;
        }

        private RetornarParametrosInicializacao(args: any[]): [number, number, number, number]
        {
            if (args.length === 0 || (args.length === 1 && args[0] == null))
            {
                return [0, 0, 0, 0];

            }
            if (args.length === 1)
            {
                const a1 = args[0];
                if (typeof a1 === "number")
                {
                    const margem = u.ConverterUtil.ParaNumero(a1);
                    return [margem, margem, margem, margem];
                }

                if (
                    a1.Esquerda !== undefined &&
                    a1.Superior !== undefined &&
                    a1.Direita !== undefined &&
                    a1.Inferior !== undefined)
                {
                    return [a1.Esquerda, a1.Superior, a1.Direita, a1.Inferior];
                }
            }

            if (args.length === 2)
            {
                const margemX = u.ConverterUtil.ParaNumero(args[0]);
                const margemY = u.ConverterUtil.ParaNumero(args[1]);
                return [margemX, margemY, margemX, margemY];
            }

            if (args.length === 4)
            {
                return [
                    ConverterUtil.ParaNumero(args[0]),
                    ConverterUtil.ParaNumero(args[1]),
                    ConverterUtil.ParaNumero(args[2]),
                    ConverterUtil.ParaNumero(args[3])];
            }
            throw new Erro("Argumentos de construção da margem inválidos");
        }


        public IsDefined(): this is this & DefinedMargem
        {
            return this._esquerda !== null &&
                this._direita !== null &&
                this._superior !== null &&
                this._inferior !== null;
        }
    }

    export interface DefinedMargem
    {
        readonly Esquerda: number;
        readonly Superior: number;
        readonly Direita: number;
        readonly Inferior: number;
        readonly Media: number;
        readonly Horizontal: number;
        readonly Vertical: number;
        readonly MenorValor: number;
        readonly MaiorValor: number;
    }

    export class MargemHelper
    {
        public static IsDefind(margem: IMargem): margem is IMargem & DefinedMargem
        {
            return margem != null &&
                margem.Esquerda !== null &&
                margem.Direita !== null &&
                margem.Superior !== null &&
                margem.Inferior !== null;
        }
    }
}