namespace Snebur.Reflexao
{
    export abstract class BaseTipoUI extends BaseTipo
    {
        public constructor(nome: string, _namespace: string, caminhoTipoBase: string, isAbstrato: boolean)
        {
            super(nome, _namespace, null, caminhoTipoBase, isAbstrato);
        }

        public RetornarTipoUIHtml(): TipoUIHtml
        {
            if (this instanceof TipoUIHtml)
            {
                return this;
            }

            if (this.TipoBase instanceof BaseTipoUI)
            {
                return this.TipoBase.RetornarTipoUIHtml();
            }
            return null;
        }

        public RetornarHtmlReferencia(): Snebur.UI.HtmlReferencia
        {
            const tipoUIHtml = this.RetornarTipoUIHtml();
            if (tipoUIHtml != null)
            {
                if ($HtmlReferencias.ContainsKey(tipoUIHtml.CaminhoTipo))
                {
                    return $HtmlReferencias.Item(tipoUIHtml.CaminhoTipo);
                }
                throw new Erro(`não foi encontrado a referencia para o tipohtml ${tipoUIHtml.Nome}`);
            }
            return null;
        }
    }
}