namespace Snebur.Dominio
{
    export class PropriedadeAlterada extends Snebur.Dominio.BaseDominio implements Snebur.Dominio.IPropriedadeAlterada 
    {
        public readonly NomePropriedade: string;
        public readonly NomePropriedadeTipoComplexo: string;
        public AntigoValor: any;
        public NovoValor: any;

        //#region Construtor

        public constructor(
            nomePropriedade: string,
            antigoValor: any, novoValor: any,
            nomePropriedadeTipoComplexo: string)
        {
            super();

            this.Inicializar();
            this.NomePropriedade = nomePropriedade;
            this.NomePropriedadeTipoComplexo = nomePropriedadeTipoComplexo ?? null;
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

        public Clone(): PropriedadeAlterada
        {
            return new PropriedadeAlterada(
                this.NomePropriedade,
                this.AntigoValor,
                this.NovoValor,
                this.NomePropriedadeTipoComplexo);
        }

        public override ToString()
        {
            return `${this.NomePropriedade} Antigo: ${this.AntigoValor}, novo: ${this.NovoValor}`;
        }
    }
}
