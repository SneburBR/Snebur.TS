namespace Snebur.Dominio
{
    export class Area extends Snebur.Dominio.BaseMedidaTipoComplexo implements IArea
    {

        //#region Propriedades

        private _esquerda: number  = null;
        private _superior: number = null;
        private _direita: number = null;
        private _inferior: number = null;

        private _largura: number = 0;
        private _altura: number = 0;

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
            this.NotificarPropriedadeAlterada("Superior", this._superior, this._superior =value);
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


        public get Largura(): number 
        {
            return this._largura;
        }

        public set Largura(value: number)  
        {
            this.NotificarValorPropriedadeAlterada("Largura", this._largura, this._largura = value);
        }

        public get Altura(): number 
        {
            return this._altura;
        }
        public set Altura(value: number)
        {
            this._altura = value;
        }


        public get Dimensao(): Dimensao
        {
            return new Dimensao(this.Largura, this.Altura);
        }

        public get Margem(): Margem
        {
            return new Margem(this.Esquerda, this.Superior, this.Direita, this.Inferior);
        }

        public get IsEmpty(): boolean
        {
            return this.Margem.IsEmpty && this.Dimensao.IsEmpty;
        }

        public constructor()
        public constructor(esquerda: number, superior: number, direita: number, inferior: number, largura: number, altura: number)
        public constructor(esquerda: number = null, superior: number = null, direita: number = null, inferior: number = null, largura: number = 0, altura: number = 0)
        {
            super();

            this.Esquerda = esquerda;
            this.Superior = superior;
            this.Direita = direita;
            this.Inferior = inferior;
            this.Largura = largura;
            this.Altura = altura;
        }

        //#endregion

        public get IsEmpy(): boolean
        {
            return this.Largura === 0 && this.Altura === 0 &&
                this.Esquerda === null && this.Direita === null &&
                this.Inferior === null && this.Superior === null;
        }

        public Clone(): Area
        {
            return new Area(this.Esquerda, this.Superior, this.Direita, this.Inferior, this.Largura, this.Altura);
        }

        public Equals(obj: Area): boolean
        {
            if (obj instanceof Area)
            {
                return this.Esquerda === obj.Esquerda &&
                    this.Superior === obj.Superior &&
                    this.Direita === obj.Direita &&
                    this.Inferior === obj.Inferior &&
                    this.Largura === obj.Largura &&
                    this.Altura === obj.Altura;
            }
            return true;
        }

        public CalcularRegiao(dimensaoRecipiente: Dimensao): Regiao
        {
            throw new ErroNaoImplementado();
        }

        public Escalar(escala: number, isInteiro: boolean): Area
        {
            throw new ErroNaoImplementado();
        }


    }
}