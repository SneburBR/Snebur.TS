namespace Snebur.UI
{
    export class HtmlReferencia
    {
        private _htmlDecodificado: string | null = null;
        private _isHtmlDecodificado: boolean = false;
        private _dataHoraDecodificado: Date | null = null;
        private _url: string | null = null;

        private readonly UrlDesenvolvimentoAbsoluta: string;
        private readonly UrlDesenvolvimentoRelativa: string;

        public readonly Html: string;
        public readonly AtributosRaiz: DicionarioSimples<string>;

        public get HtmlDecodificado(): string | null
        {
            return this._htmlDecodificado;
        }

        public get IsHtmlDecodificado(): boolean
        {
            return this._isHtmlDecodificado;
        }
         
        public get DataHoraDecodificado(): Date | null
        {
            return this._dataHoraDecodificado;
        }

        public get UrlDesenvolvimento(): string
        {
            return (this._url ??= this.RetornarUrlDesenvolvimento());
        }
         
        public constructor(
            urlDesenvolvimentoAbsoluta: string,
            urlDesenvolvimentoRelativa: string,
            html: string,
            atributosRaiz: DicionarioSimples<string>)
        {
            this.UrlDesenvolvimentoAbsoluta = urlDesenvolvimentoAbsoluta;
            this.UrlDesenvolvimentoRelativa = urlDesenvolvimentoRelativa;
            this.Html = html;
            this.AtributosRaiz = atributosRaiz;
        }

        private RetornarUrlDesenvolvimento(): string
        {
            if ($Configuracao.IsUsarHostAtualParaHtmlReferencia)
            {
                const path = `${UrlUtil.RemoverBarraInicial(this.UrlDesenvolvimentoRelativa)}`;
                return `${window.location.origin}/${path}`;
            }
            return this.UrlDesenvolvimentoAbsoluta + "?" + u.GuidUtil.RetornarNovoGuid();
        }

        public DecodificarHtml(): void
        {
            if (this._isHtmlDecodificado)
                return;

            const htmlDecodificado = HtmlReferenciaUtil.RetornarHtmlDecodificado(this);

            Guard.NotNull(htmlDecodificado);

            this._htmlDecodificado = htmlDecodificado;
            this._isHtmlDecodificado = true;
            this._dataHoraDecodificado = new Date();
        }

        public assertsHtmlDecodificado(): asserts this is { HtmlDecodificado: string }
        {
            if (!this._isHtmlDecodificado || this.HtmlDecodificado != null)
            {
                throw new Error("HtmlDecodificado is not available.");
            }
        }
    }
}
