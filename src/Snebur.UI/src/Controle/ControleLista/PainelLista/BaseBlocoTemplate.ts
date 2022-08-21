namespace Snebur.UI
{
    export class BaseBlocoTemplate extends BaseTemplate
    {
        public static readonly CHAVE_PADRAO = "Padrao";

        public _chave: string;

        public get Chave(): string
        {
            if (this._chave == null)
            {
                return BlocoTemplate.CHAVE_PADRAO;
            }
            return this._chave;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this._chave = this.RetornarCaminhoTipoInterno();
        }

        private RetornarCaminhoTipoInterno(): string
        {
            const caminhoTipo = this.RetornarValorAtributo(Snebur.UI.AtributosHtml.Tipo);
            if (!String.IsNullOrWhiteSpace(caminhoTipo))
            {
                const tipo = u.ReflexaoUtil.RetornarTipo(caminhoTipo);
                if (tipo === d.BaseViewModel.GetType())
                {
                    throw new Erro("dasdas");
                }
               
                return tipo.CaminhoTipo ??
                    u.ReflexaoUtil.RetornarNomeTipo(caminhoTipo);
            }
            return null;
        }

        public override RetornarNovoElemento(): HTMLElement
        {
            return super.RetornarNovoElemento();
        }
    }
}
