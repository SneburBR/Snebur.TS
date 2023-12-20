namespace Snebur.UI
{
    export class HtmlReferenciaUtil
    {
        /*eslint-disable*/
        //var regex = new Regex(@"[\s\>a-zA-Z0-9,\:\=]{{[a-zA-Z0-9,\s=]*}}[\s\<a-zA-Z0-9,\:\=]");
        private static readonly REGEXs_BIND_NODE_TEXTO = [/[\s\>a-z0-9,\:]{{[a-z0-9,\=\s]*}}[\s\<a-z0-9,\:]/i];
        private static readonly REGEX_ATRIBUTO_TEXTO = /\s+([\w\-.:]+)(\s*=\s*(?:"([^"]*)"|'([^']*)'|([\w\-.:]+)))?/g;
        /*eslint-enable*/

        private static readonly ABRE_BODY = "<body";
        private static readonly FECHA_BODY = "</body>";

        private static TEMPO_ATUALIZAR_HTML_DECODIFICADO = 5000;

        public static CONTEUDO_INTERNO: string = "[[CONTEUDO_INTERNO]]";

        public static RetornarHtml(tipo: r.TipoUIHtml): string;
        public static RetornarHtml(uiElemento: BaseUIElemento): string;
        public static RetornarHtml(uiElemento: IConstrutor<BaseUIElemento>): string;
        public static RetornarHtml(argumento: any): string
        {
            const html = HtmlReferenciaUtil.RetornarHtmlInterno(argumento);
            return HtmlReferenciaUtil.NormalizarHtml(html);
        }

        private static RetornarHtmlInterno(tipoOuConstrutor: r.TipoUIHtml | BaseUIElemento | IConstrutor<BaseUIElemento>): string
        {
            const htmlReferencia = HtmlReferenciaUtil.RetornarHtmlReferencia(tipoOuConstrutor);
            if (htmlReferencia.IsHtmlDecodificado)
            {
                if (!$Configuracao.IsDebug || $Configuracao.IsDebugApresentacao === false)
                {
                    return htmlReferencia.HtmlDecodificado;
                }

                const isReiniciando = tipoOuConstrutor instanceof BaseUIElemento && tipoOuConstrutor.__IsReiniciado;
                if (!isReiniciando)
                {
                    const tempoUtlimaDecodificacao = Date.now() - htmlReferencia.DataHoraDecodificado.getTime();
                    if (tempoUtlimaDecodificacao < HtmlReferenciaUtil.TEMPO_ATUALIZAR_HTML_DECODIFICADO)
                    {
                        return htmlReferencia.HtmlDecodificado;
                    }
                }
            }
            const htmlDecodificado = HtmlReferenciaUtil.RetornarHtmlDecodificado(htmlReferencia);
            if (htmlReferencia != null)
            {
                htmlReferencia.HtmlDecodificado = htmlDecodificado;
                htmlReferencia.IsHtmlDecodificado = true;
                htmlReferencia.DataHoraDecodificado = new Date();
            }
            return htmlReferencia.HtmlDecodificado;
        }

        private static RetornarHtmlReferencia(tipoOuConstrutor: r.TipoUIHtml | BaseUIElemento | IConstrutor<BaseUIElemento>): HtmlReferencia
        {
            if (tipoOuConstrutor == null)
            {
                throw new Erro("O tipoOuConstrutor não foi definido");
            }

            const tipoUI = this.RetornarTipoUIInterno(tipoOuConstrutor);
            if (tipoUI == null)
            {
                throw new ErroNaoDefinido("O TipoUI não foi definido para" + u.ReflexaoUtil.RetornarNomeTipo(tipoOuConstrutor), this);
            }
            const htmlReferencia = tipoUI.RetornarHtmlReferencia();
            if (htmlReferencia == null)
            {
                throw new ErroNaoDefinido(`O html referencia não está definido '${u.ReflexaoUtil.RetornarNomeTipo(tipoOuConstrutor) }'`, this);
            }
            return htmlReferencia;
        }

        private static RetornarTipoUIInterno(tipoOuConstrutor: r.TipoUIHtml | BaseUIElemento | IConstrutor<BaseUIElemento>): r.TipoUI
        {
            const tipo = HtmlReferenciaUtil.RetornarTipoInterno(tipoOuConstrutor);
            if (!(tipo instanceof r.BaseTipoUI))
            {
                throw new ErroNaoSuportado("O controle não suporta html referenciado", this);
            }
            return tipo;

        }
        private static RetornarTipoInterno(tipoOuConstrutor: r.TipoUIHtml | BaseUIElemento | IConstrutor<BaseUIElemento>): r.BaseTipo
        {

            if (tipoOuConstrutor instanceof r.BaseTipo)
            {
                return tipoOuConstrutor;
            }

            if (tipoOuConstrutor && typeof tipoOuConstrutor.GetType === "function") 
            {
                const tipo = tipoOuConstrutor.GetType();
                if (tipo instanceof r.BaseTipo)
                {
                    return tipo;
                }

                throw new Erro(`O objeto '${tipoOuConstrutor.constructor?.name}' não é suportado. Esperado TipoUI.`);
            }

            throw new Erro("O tipo não foi ser encontrado");
        }

        private static RetornarHtmlDecodificado(htmlReferencia: HtmlReferencia): string
        {
            if ($Configuracao.IsProducao || !$Configuracao.IsDebug)
            {
                return u.Base64Util.Decode(htmlReferencia.Html);
            }
            try
            {
                return HtmlReferenciaUtil.RetornarConteudoHtml(htmlReferencia);
            }
            catch (erro)
            {
                if (htmlReferencia.IsHtmlDecodificado)
                {
                    console.warn(erro);
                    return htmlReferencia.HtmlDecodificado;
                }
                throw erro;
            }
        }

        private static RetornarConteudoHtml(htmlReferencia: HtmlReferencia): string
        {
            const url = htmlReferencia.UrlDesenvolvimentoAbsoluta + "?" + u.GuidUtil.RetornarNovoGuid();

            try
            {
                let html = u.AjaxUtil.RetornarTextoSync(url);
                html = html.replace(/(<!--.*?-->)|(<!--[\w\W\n\s]+?-->)/g, "");

                const corpo = HtmlReferenciaUtil.RetornarCorpoHtml(html, htmlReferencia.UrlDesenvolvimentoAbsoluta);
                const dicionario = this.RetornarDicionarioAtributos(html);
                if (dicionario)
                {
                    (htmlReferencia as any).AtributosRaiz = dicionario;
                }
                return corpo;
            }
            catch (erro)
            {
                console.error(`Não foi possível carregar a URL ${url} - ${erro} `);
                return u.Base64Util.Decode(htmlReferencia.Html);
            }

        }

        private static RetornarCorpoHtml(html: string, url: string): string
        {
            const quantidadesBody = TextoUtil.RetornarOcorrenciasParteTexto(html, "<body>");
            if (quantidadesBody > 1)
            {
                throw new Erro("Existe mais de um elemento corpo '<body>' no html \n" + url);
            }

            const posicaoAbreBody = html.indexOf(this.ABRE_BODY);
            const posicaoFechaBody = html.indexOf(this.FECHA_BODY);

            if (posicaoAbreBody > 0 && posicaoFechaBody > 0)
            {
                const posicaoAbreBodyFechaElemento = html.substring(posicaoAbreBody).indexOf(">");
                const inicio = posicaoAbreBody + posicaoAbreBodyFechaElemento + 1;
                return html.substring(inicio, posicaoFechaBody);
            }
            return html;
        }

        private static RetornarDicionarioAtributos(html: string): DicionarioSimples<string>
        {
            const posicaoAbreBody = html.indexOf(this.ABRE_BODY);
            if (posicaoAbreBody > 0)
            {
                const elementoBodyTexto = u.ExpressaoUtil.RetornarExpressaoAbreFecha(html.substring(posicaoAbreBody), false, "<", ">", true);
                const atributos = u.ExpressaoUtil.RetornarAtributosElemento(elementoBodyTexto);
                return atributos;

                //let elementoBodyTexto = u.ExpressaoUtil.RetornarExpressaoAbreFecha(html.substring(posicaoAbreBody), true, "<", ">", true);
                //if (atributosTexto.StartsWith("body"))
                //{
                //    atributosTexto = atributosTexto.substr("body".length).trim();
                //}
                //let partes = atributosTexto.split(' ');

                //if (partes.length > 0)
                //{
                //    let retorno = new DicionarioSimples<string>();
                //    for (let parte of partes)
                //    {
                //        if (!String.IsNullOrWhiteSpace(parte))
                //        {
                //            let pares = parte.split('=');
                //            if (pares.length == 2)
                //            {
                //                let chave = pares.First();
                //                let valor = JSON.parse(pares.Last());
                //                retorno.Add(chave, valor);
                //            }
                //        }
                //    }
                //    return retorno;
                //}
            }
            return null;
        }

        private static RetornarAtributosTexto(atrubutosTexto: string): any
        {

            const atributosObjetcts = {} as any;
            let resultado = HtmlReferenciaUtil.REGEX_ATRIBUTO_TEXTO.exec(atrubutosTexto);
            while (resultado != null)
            {
                const atributo = resultado[1];
                let value = resultado[1];
                if (resultado[2])
                {
                    value = resultado[3] ? resultado[3] :
                        resultado[4] ? resultado[4] : resultado[5];
                }
                atributosObjetcts[atributo] = value;
                resultado = HtmlReferenciaUtil.REGEX_ATRIBUTO_TEXTO.exec(atrubutosTexto);
            }
            return atributosObjetcts;
        }

        private static NormalizarHtml(html: string): string
        {
            if ($Configuracao.IsDebug)
            {
                return HtmlReferenciaUtil.NormalizarBindNodeTexto(html);
            }
            return html;
        }


        private static NormalizarBindNodeTexto(html: string): string
        {
            /*eslint-disable*/
            while (true)
            {
                const expressao = HtmlReferenciaUtil.REGEXs_BIND_NODE_TEXTO.Where(x => x.test(html)).FirstOrDefault();
                if (expressao == null)
                {
                    break;
                }

                html = html.replace(expressao, (substring: string) =>
                {
                    const inicio = substring.indexOf("{{");
                    const fim = substring.indexOf("}}") + 2;

                    let antes = substring.substring(0, inicio);
                    let depois = substring.substring(fim);
                    const bind = substring.substring(inicio, fim);

                    if (String.IsNullOrWhiteSpace(antes))
                    {
                        antes = "&nbsp;";
                    }

                    if (String.IsNullOrWhiteSpace(depois))
                    {
                        depois = "&nbsp;";
                    }
                    return `${antes}<span sn-bind="${bind}"></span>${depois} `;

                });
            }
            return html;
            /*eslint-enable*/
        }


    }
}