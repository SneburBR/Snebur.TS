namespace Snebur.Dominio
{
    export class PropriedadeAlterada extends Snebur.Dominio.BaseDominio implements Snebur.Dominio.IPropriedadeAlterada 
    {
        public readonly NomePropriedade: string;
        public AntigoValor: any;
        public NovoValor: any;

        //#region Propriedades

        //private _nomePropriedade: string = null;


        //public get NomePropriedade(): string
        //{
        //    return this._nomePropriedade;
        //}

        //public set NomePropriedade(value: string)
        //{
        //    this.NotificarValorPropriedadeAlterada("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        //}

        //public get AntigoValor(): any
        //{
        //    return this._antigoValor;
        //}

        //public set AntigoValor(value: any)
        //{
        //    if (value === undefined)
        //    {
        //        throw new Erro("antigo valor");
        //    }
        //    this.NotificarValorPropriedadeAlterada("AntigoValor", this._antigoValor, this._antigoValor = value);
        //}

        //public get NovoValor(): any
        //{
        //    return this._novoValor;
        //}

        //public set NovoValor(value: any)
        //{
        //    this.NotificarValorPropriedadeAlterada("NovoValor", this._novoValor, this._novoValor = value);
        //}

        //#endregion

        //#region Construtor

        public constructor(nomePropriedade: string, antigoValor: any, novoValor: any)
        {
            super();
            this.Inicializar();
            this.NomePropriedade = nomePropriedade;
            this.AntigoValor = antigoValor;
            this.NovoValor = novoValor;

            //if (nomePropriedade === "TamanhoItemCardapio_Id" && antigoValor === 0)
            //{
            //    const xxx = "0";
            //}

            //if (antigoValor === 0 && nomePropriedade.EndsWith("_Id"))
            //{
            //    console.error("Possível falha nas noticiações da propriedades - Analisar");
            //}

            //this._nomePropriedade = nomePropriedade;
            //this._antigoValor = antigoValor;
            //this._novoValor = novoValor;
        }
        //#endregion
    }
}

