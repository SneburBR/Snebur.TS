namespace Snebur.Dominio
{
    export class Margem extends Snebur.Dominio.BaseMedidaTipoComplexo implements Snebur.Dominio.IMargem
    {
        //#region Propriedades

        private _esquerda: number = null;
        private _superior: number = null;
        private _direita: number = null;
        private _inferior: number = null;

        public get Esquerda(): number 
        {
            return this._esquerda;
        }

        public set Esquerda(value: number)  
        {
            this.NotificarPropriedadeAlterada("Esquerda", this._esquerda, this._esquerda = value);
        }

        public get Superior(): number 
        {
            return this._superior;
        }

        public set Superior(value: number)  
        {
            this.NotificarPropriedadeAlterada("Superior", this._superior, this._superior = value);
        }

        public get Direita(): number 
        {
            return this._direita;
        }

        public set Direita(value: number)  
        {
            this.NotificarPropriedadeAlterada("Direita", this._direita, this._direita = value);
        }

        public get Inferior(): number 
        {
            return this._inferior;
        }

        public set Inferior(value: number)  
        {
            this.NotificarPropriedadeAlterada("Inferior", this._inferior, this._inferior = value);
        }

        public get Media(): number
        {
            return (this.Superior + this.Inferior + this.Direita + this.Esquerda) / 4;
        }

        //#endregion

        //#region Construtor

        public constructor()
        public constructor(margem: number)
        public constructor(margemHorizontal: number, magemVertical: number)
        public constructor(esquerda: number, superior: number, direita: number, inferior: number)
        public constructor(p1?: number, p2?: number, direita?: number, inferior?: number) 
        {
            super();

            let esquerda: number;
            let superior: number;

            if (arguments.length === 0 || (arguments.length === 1 && p1 == null))
            {
                esquerda = null;
                superior = null;
                direita = null;
                inferior = null;

            }
            else if (arguments.length === 1)
            {
                const margem = u.ConverterUtil.ParaNumero(p1);
                esquerda = margem;
                superior = margem;
                direita = margem;
                inferior = margem;
            }
            else if (arguments.length === 2)
            {
                const margemX = u.ConverterUtil.ParaNumero(p1);
                const margemY = u.ConverterUtil.ParaNumero(p2);

                esquerda = margemX;
                superior = margemY;
                direita = margemX;
                inferior = margemY;
            }
            else
            {
                esquerda = u.ConverterUtil.ParaNumero(p1);
                superior = u.ConverterUtil.ParaNumero(p2);
            }


            this._esquerda = u.ConverterUtil.ParaNumero(esquerda);
            this._superior = u.ConverterUtil.ParaNumero(superior);
            this._direita = u.ConverterUtil.ParaNumero(direita);
            this._inferior = u.ConverterUtil.ParaNumero(inferior);
        }

        public Clone(): Margem
        {
            return new Margem(this.Esquerda, this.Superior, this.Direita, this.Inferior);
        }

        public Equals(margem: Margem): boolean
        {
            return this.Esquerda === margem.Esquerda &&
                this.Superior === margem.Superior &&
                this.Direita === margem.Direita &&
                this.Inferior === margem.Inferior;
        }

        public Somar(margem: Margem): Margem
        {
            return new Margem(this.Esquerda + margem.Esquerda,
                this.Superior + margem.Superior,
                this.Direita + margem.Direita,
                this.Inferior + margem.Inferior);
        }

        public get MenorValor(): number
        {
            return Math.min(this.Esquerda, this.Superior, this.Direita, this.Inferior);
        }

        public get MaiorValor(): number
        {
            return Math.max(this.Esquerda, this.Superior, this.Direita, this.Inferior);
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



        public get ExisteMargem(): boolean
        {
            return !isNaN(this.Esquerda) ||
                !isNaN(this.Direita) ||
                !isNaN(this.Superior) ||
                !isNaN(this.Inferior);
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
         
        //#endregion


        public override toString(): string
        {
            return `${this.___NomeConstrutor} ${this.Esquerda.toFixed(2)}  ${this.Superior.toFixed(2)}  ${this.Direita.toFixed(2)} Y: ${this.Inferior.toFixed(2)}`;
        }
    }
}