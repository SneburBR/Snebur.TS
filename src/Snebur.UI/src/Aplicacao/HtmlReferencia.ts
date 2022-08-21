namespace Snebur.UI
{
    export class HtmlReferencia
    {
        public readonly UrlDesenvolvimentoAbsoluta: string;
        public readonly UrlDesenvolvimentoRelativa: string;
        public readonly Html: string;
        public readonly AtributosRaiz: DicionarioSimples<string>;

        public HtmlDecodificado: string;
        public IsHtmlDecodificado: boolean;
        public DataHoraDecodificado: Date;
        
        
        public constructor(urlDesenvolvimentoAbsoluta: string,
            urlDesenvolvimentoRelativa: string,
            html: string,
            atributosRaiz: DicionarioSimples<string>)
        {
            this.UrlDesenvolvimentoAbsoluta = urlDesenvolvimentoAbsoluta;
            this.UrlDesenvolvimentoRelativa = urlDesenvolvimentoRelativa;
            this.Html = html;
            this.AtributosRaiz = atributosRaiz;
        }
    }
}
