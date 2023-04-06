namespace Snebur.Dominio
{
    export class PropriedadeAlterada extends Snebur.Dominio.BaseDominio implements Snebur.Dominio.IPropriedadeAlterada 
    {
        public readonly NomePropriedade: string;
        public readonly NomePropriedadeTipoComplexo: string;

        public readonly IsClone: boolean;
        public AntigoValor: any;
        public NovoValor: any;

        public get CaminhoPropriedade()
        {
            return this.RetornarCaminhoPropriedade();
        }

        //#region Construtor

        public constructor(nomePropriedade: string, antigoValor: any, novoValor: any, nomePropriedadeTipoComplexo: string, isClone: boolean = false)
        {
            super();

            this.Inicializar();
            this.NomePropriedade = nomePropriedade;
            this.NomePropriedadeTipoComplexo = nomePropriedadeTipoComplexo ?? null;
            this.AntigoValor = antigoValor;
            this.NovoValor = novoValor;
            this.IsClone = isClone;

        }
        //#endregion

        public Clone(): PropriedadeAlterada
        {
            return new PropriedadeAlterada(
                this.NomePropriedade,
                this.AntigoValor,
                this.NovoValor,
                this.NomePropriedadeTipoComplexo,
                true);
        }

        public override toString()
        {
            const clone = this.IsClone ? "CLONE-" : String.Empty;
            return `${clone}-${this.NomePropriedade} Antigo: ${this.AntigoValor}, novo: ${this.NovoValor}`;
        }

        private RetornarCaminhoPropriedade(): string
        {
            if (!String.IsNullOrWhiteSpace(this.NomePropriedadeTipoComplexo))
            {
                const indice = this.NomePropriedade.length - this.NomePropriedadeTipoComplexo.length - 1;
                const caminho = `${this.NomePropriedade.substring(0, indice)}.${this.NomePropriedadeTipoComplexo}`;

                this.ValidarCaminho(caminho);

                return caminho;
            }
            this.ValidarCaminho(this.NomePropriedade);

            return this.NomePropriedade;

        }

        private ValidarCaminho(caminho: string)
        {
            if ($Configuracao.IsDebugOuTeste &&
                caminho.Contains("_") &&
                caminho.EndsWith("_Id") === false)
            {
                DebugUtil.ThrowAndContinue("Ops pode ter uma falha aqui");
            }
        }
    }
}
