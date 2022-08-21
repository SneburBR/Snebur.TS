namespace Snebur.Dominio
{
    export class Borda extends Snebur.Dominio.BaseTipoComplexo implements Snebur.Dominio.ICaminhoTipo, Snebur.Dominio.IBorda
    {

        private _corRgba: string = Cor.COR_TRANSPARENTE;
        private _espessura: number = 0.5;
        private _arredondamento: number = 0;
        private _afastamento: number = 0;
        private _isInterna: boolean = true;

        public get Espessura(): number 
        {
            return this._espessura;
        }

        public set Espessura(value: number)  
        {
            this.NotificarValorPropriedadeAlterada("Espessura", this._espessura, this._espessura = value);
        }

        public get Arredondamento(): number 
        {
            return this._arredondamento;
        }

        public set Arredondamento(value: number)  
        {
            this.NotificarValorPropriedadeAlterada("Arredondamento", this._arredondamento, this._arredondamento = value);
        }

        public get Afastamento(): number 
        {
            return this._afastamento;
        }

        public set Afastamento(value: number)  
        {
            this.NotificarValorPropriedadeAlterada("Afastamento", this._afastamento, this._afastamento = value);
        }

        public get IsInterna(): boolean 
        {
            return this._isInterna;
        }

        public set IsInterna(value: boolean)  
        {
            this.NotificarValorPropriedadeAlterada("IsInterna", this._isInterna, this._isInterna = value);
        }

        public get CorRgba(): string 
        {
            return this._corRgba;
        }

        public set CorRgba(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("CorRgba", this._corRgba, this._corRgba = value);
        }

        public get Cor(): Snebur.Dominio.Cor
        {
            return new Cor(this.CorRgba);
        }
        public set Cor(value: Snebur.Dominio.Cor)
        {
            this.CorRgba = value.Rgba;
        }


        public get ExisteBorda(): boolean
        {
            return !this.Cor.IsTransparente || this.Arredondamento > 0;
        }

        public constructor()
        public constructor(corRgba: string, isInterna: boolean, afastamento: number, espessura: number, arredondamento: number)
        public constructor(corRgba: string = Cor.COR_TRANSPARENTE, isInterna: boolean = true, afastamento: number = 0, espessura: number = 0, arredondamento: number = 0)
        {
            super();

            this.CorRgba = corRgba;
            this.IsInterna = isInterna;
            this.Afastamento = afastamento;
            this.Espessura = espessura;
            this.Arredondamento = arredondamento;
        }


        public Clone(): Borda
        {
            return new Borda(this.CorRgba, this.IsInterna, this.Afastamento, this.Espessura, this.Arredondamento);
        }

        public static Vazia(): Borda
        {
            return new Borda();
        }

        public Equals(borda: d.Borda): boolean
        {
            if (borda instanceof Borda)
            {
                return this.Espessura === borda.Espessura &&
                    this.IsInterna === borda.IsInterna &&
                    this.Afastamento === borda.Afastamento &&
                    this.Arredondamento === borda.Arredondamento &&
                    this.CorRgba === borda.CorRgba;
            }
            return false;
        }
    }
}