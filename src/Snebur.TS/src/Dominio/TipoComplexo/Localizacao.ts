namespace Snebur.Dominio
{
    export class Localizacao extends Snebur.Dominio.BaseTipoComplexo implements   Snebur.Dominio.ICaminhoTipo 
    {
        //#region Propriedades

        private _latitude: number = 0;
        private _longitude: number = 0;

        public get Latitude(): number 
        {
            return this._latitude;
        }

        public set Latitude(value: number)  
        {
            const antigoValor = this._latitude;
            this._latitude = value;
            this.NotificarPropriedadeAlterada("Latitude", antigoValor, value);
        }

        public get Longitude(): number 
        {
            return this._longitude;
        }

        public set Longitude(value: number)  
        {
            const antigoValor = this._longitude;
            this._longitude = value;
            this.NotificarPropriedadeAlterada("Longitude", antigoValor, value);
        }
        //#endregion

        //#region Construtor

        public constructor()
        public constructor(latitude: number, longitude: number)
        public constructor(latitude: number = 0, longitude: number = 0) 
        {
            super();
            this._latitude = latitude;
            this._longitude = longitude;
        }

        //#endregion

        public Clone(): Localizacao
        {
            return new Localizacao(this.Latitude, this.Longitude);
        }

        public Equals(localizacao: Localizacao): boolean
        {
            if (localizacao instanceof Localizacao)
            {
                return this.Latitude === localizacao.Latitude &&
                    this.Longitude === localizacao.Longitude;
            }
            return false;
        }
    }
}