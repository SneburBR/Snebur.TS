namespace Snebur.UI
{
    export class ItemTemplate extends BaseTemplate
    {
        public Tipo: r.BaseTipo;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.Tipo = this.RetornarTipoInterno();
        }

        private RetornarTipoInterno(): r.BaseTipo
        {
            const caminhoTipo = this.RetornarValorAtributo(AtributosHtml.Tipo);
            if (!String.IsNullOrWhiteSpace(caminhoTipo))
            {
                return u.ReflexaoUtil.RetornarTipo(caminhoTipo);
            }

            return null;
        }
    }
}