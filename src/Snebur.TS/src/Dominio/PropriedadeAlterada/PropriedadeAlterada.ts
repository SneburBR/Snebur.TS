namespace Snebur.Dominio
{
    export class PropriedadeAlterada extends Snebur.Dominio.BaseDominio implements Snebur.Dominio.IPropriedadeAlterada 
    {
        public readonly NomePropriedade: string;
        public readonly IsClone: boolean;
        public AntigoValor: any;
        public NovoValor: any;

        public get CaminhoPropriedade(): string
        {
            return this.NomePropriedade;
        }

        //#region Construtor

        public constructor(nomePropriedade: string, antigoValor: any, novoValor: any, isClone: boolean = false)
        {
            super();

            this.Inicializar();
            this.NomePropriedade = nomePropriedade;
            this.AntigoValor = antigoValor;
            this.NovoValor = novoValor;
            this.IsClone = isClone;

            if (Snebur.$Configuracao?.IsDebugOuTeste)
            {
                if ($Configuracao.IsDebugOuTeste)
                {
                    ValidacaoUtil.ValidarArgumentoDefinido({ nomePropriedade: nomePropriedade });
                }
            }
        }

        //#endregion

        public Clone(): PropriedadeAlterada
        {
            return new PropriedadeAlterada(
                this.NomePropriedade,
                this.AntigoValor,
                this.NovoValor,
                true);
        }

        public override toString(): string
        {
            const clone = this.IsClone ? "CLONE-" : String.Empty;
            return `${clone}-${this.NomePropriedade} Antigo: ${this.AntigoValor}, novo: ${this.NovoValor}`;
        }

        protected ValidarCaminho(caminho: string)
        {
            if ($Configuracao.IsDebugOuTeste &&
                caminho.Contains("_") &&
                caminho.EndsWith("_Id") === false)
            {
                DebugUtil.ThrowAndContinue("Ops pode ter uma falha aqui");
            }
        }

        public static Create(nomePropriedade: string,
            antigoValor: any,
            novoValor: any,
            nomePropriedadeEntidade: string,
            nomePropriedadeTipoComplexo: string,): PropriedadeAlterada
        {

            if (nomePropriedadeEntidade != null || nomePropriedadeTipoComplexo != null)
            {
                return new PropriedadeAlteradaTipoComplexo(
                    nomePropriedade,
                    antigoValor,
                    novoValor,
                    nomePropriedadeEntidade,
                    nomePropriedadeTipoComplexo);
            }

            return new PropriedadeAlterada(
                nomePropriedade,
                antigoValor,
                novoValor);
        }
    }

    export class PropriedadeAlteradaTipoComplexo extends PropriedadeAlterada
    {
        private readonly _caminhoPropriedade: string;

        public readonly NomePropriedadeEntidade: string;
        public readonly NomePropriedadeTipoComplexo: string;

        public override get CaminhoPropriedade(): string
        {
            return this._caminhoPropriedade;
        }

        public constructor(
            nomePropriedade: string,
            antigoValor: any,
            novoValor: any,
            nomePropriedadeEntidade: string,
            nomePropriedadeTipoComplexo: string,
            isClone: boolean = false)
        {
            super(nomePropriedade, antigoValor, novoValor, isClone);

            if ($Configuracao.IsDebugOuTeste)
            {
                ValidacaoUtil.ValidarArgumentoDefinido({ nomePropriedadeEntidade: nomePropriedadeEntidade });
                ValidacaoUtil.ValidarArgumentoDefinido({ nomePropriedadeTipoComplexo: nomePropriedadeTipoComplexo });
            }
            this.NomePropriedadeEntidade = nomePropriedadeEntidade;
            this.NomePropriedadeTipoComplexo = nomePropriedadeTipoComplexo;
            this._caminhoPropriedade = this.RetornarCaminhoPropriedade();
        }

        protected RetornarCaminhoPropriedade(): string
        {
            const caminho = `${this.NomePropriedadeEntidade}.${this.NomePropriedadeTipoComplexo}`;
            this.ValidarCaminho(caminho);
            return caminho;
        }

        public override Clone(): PropriedadeAlteradaTipoComplexo
        {
            return new PropriedadeAlteradaTipoComplexo(
                this.NomePropriedade,
                this.AntigoValor,
                this.NovoValor,
                this.NomePropriedadeEntidade,
                this.NomePropriedadeTipoComplexo,
                this.IsClone
            );
        }
    }
}