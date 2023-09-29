namespace Snebur.Utilidade
{
    export class UrlUtil
    {
        /**
         * Remove querystring depois ?
         * @param url
         */
        public static RemoverQuery(url: string): string
        {
            let retorno = url;
            const posicaoQuery = retorno.lastIndexOf("?");
            if (posicaoQuery > -1)
            {
                retorno = retorno.substr(0, posicaoQuery);
            }
            const posicaoHash = retorno.lastIndexOf("#");
            if (posicaoHash > -1)
            {
                retorno = retorno.substr(0, posicaoHash);
            }
            return retorno;
        }

        public static Combinar(...caminhos: Array<string | number>): string
        {
            return CaminhoUtil.CombinarCaminhos(caminhos);
        }

        public static CombinarQueryChaveValor(urlBase: string, chave: string, valor: string | number): string
        {
            if (!urlBase.Contains("?"))
            {
                urlBase += "?";
            }
            else if (!urlBase.EndsWith("&"))
            {
                urlBase += "&";
            }
            return `${urlBase}${chave}=${encodeURIComponent(valor)}`;
        }

        public static RetornarURL(url: string, parametros: Array<ParChaveValorSimples<string>>)
        {
            if (parametros.length > 0)
            {
                if (!(url.indexOf("?") > 0))
                {
                    url += "?";
                }

                if (!url.EndsWith("?"))
                {
                    url += "&";
                }

                const partes = new Array<string>();
                for (let i = 0; i < parametros.length; i++)
                {
                    const parametro = parametros[i];
                    const chave = UrlUtil.Encode(Base64Util.Encode(parametro.Chave));
                    const valor = UrlUtil.Encode(Base64Util.Encode(parametro.Valor));
                    const parChaveValor = chave + "=" + valor;
                    partes.Add(parChaveValor);
                }
                const queryString = partes.join("&");
                return url + queryString;

            } else
            {
                return url;
            }
        }

        public static RetornarPagina(url: string): string
        {
            return this.RetornarNomeArquivoUrl(url);
        }

        public static RetornarNomeArquivoUrl(url: string): string
        {
            if (!String.IsNullOrWhiteSpace(url))
            {
                const partes = url.split("/");
                let nomeArquivo = partes[partes.length - 1];
                if (nomeArquivo.indexOf("?") > 0)
                {
                    nomeArquivo = nomeArquivo.substr(0, nomeArquivo.indexOf("?"));
                }
                return nomeArquivo;
            }
            return "";
        }

        public static RetornarPaginaNomeAtual(): string
        {
            const path = document.location.pathname;
            const partes = path.split("/");
            const pagina = partes[partes.length - 1];
            return pagina;
        }

        public static Encode(url: string): string
        {
            return encodeURIComponent(url);
        }

        public static Decode(url: string): string
        {
            return decodeURIComponent(url);
        }

        public static RetornarParametrosQuery(queryString: string): DicionarioSimples<string>
        {
            const parametros = new DicionarioSimples<string>();

            if (!String.IsNullOrWhiteSpace(queryString))
            {
                queryString = queryString.trim();
                if (Base64Util.IsBase64(queryString))
                {
                    queryString = Base64Util.Decode(queryString);
                }

                const expressoes = queryString.split("&");
                for (const expressao of expressoes)
                {
                    let posicao = expressao.indexOf("=");
                    const chave = expressao.substring(0, posicao);
                    const valor = posicao > 0 ? expressao.substring(posicao += 1) : String.Empty;
                    if (parametros.ContainsKey(chave))
                    {
                        const valorAtual = parametros.Item(chave);
                        parametros.AtribuirItem(chave, `${valorAtual},${valor}`);
                    }
                    else
                    {
                        parametros.Add(chave, decodeURIComponent(valor));
                    }

                }
            }
            return parametros;
        }

        public static RetornarValorParametroQueryString(nomeParametro: string): string;
        public static RetornarValorParametroQueryString(nomeParametro: string, isIgnorarErro: boolean = true): string
        {
            const parametros = this.RetornarParametroQuerysUrl();
            if (parametros.ContainsKey(nomeParametro))
            {
                return parametros.Item(nomeParametro);
            }

            if (!isIgnorarErro)
            {
                throw new Erro(`O parâmetro ${nomeParametro} não foi encontrado`);
            }
            return null;
        }

        public static RetornarParametroQuerysUrl(): DicionarioSimples<string>
        {
            let queryString = document.location.search;
            const fim = queryString.indexOf("#");
            if (queryString.StartsWith("?"))
            {
                queryString = queryString.substring(1);
                if (fim > 0)
                {
                    queryString = queryString.substr(0, fim);
                }
            }
            return this.RetornarParametrosQuery(queryString);
        }

        public static RetornarUrlPai(url: string): string
        {
            if (String.IsNullOrEmpty(url))
            {
                throw new Erro("A url não foi definida");
            }

            const posicaoUtlimaBarra = Math.max(url.lastIndexOf("/"), url.lastIndexOf("\\"));
            if (posicaoUtlimaBarra >= 0)
            {
                return url.substr(0, posicaoUtlimaBarra + 1);
            }
            return url;
        }

        public static RetornarNomeArquivoCssSemExtensao(url: string): string
        {
            return this.RetornarNomeArquivoExtensao(url, ".css");
        }

        public static RetornarNomeArquivoJsSemExtensao(url: string): string
        {
            return this.RetornarNomeArquivoExtensao(url, ".js");
        }

        private static RetornarNomeArquivoExtensao(url: string, extensao: string, isInclirExtensaoMinificado: boolean = true)
        {
            let nomeArquivo = ArquivoUtil.RetornarNomeArquivo(url);
            if (nomeArquivo.toLowerCase().EndsWith(extensao))
            {
                nomeArquivo = ArquivoUtil.RetornarNomeArquivoSemExtensao(nomeArquivo);
                if (isInclirExtensaoMinificado)
                {
                    if (nomeArquivo.toLowerCase().EndsWith(".min"))
                    {
                        return ArquivoUtil.RetornarNomeArquivoSemExtensao(nomeArquivo);
                    }
                }
                return nomeArquivo;
            }
            return nomeArquivo;
        }

        public static RetornarPesquisa(url: string): string
        {
            if (!String.IsNullOrEmpty(url))
            {
                const indice = url.lastIndexOf("?");
                if (indice > 1)
                {
                    return url.substr(indice + 1);
                }
            }
            return String.Empty;
        }

        public static NormalizarUrlServidor(url: string, ambienteServidor: EnumAmbienteServidor): string
        {
            if (ambienteServidor === EnumAmbienteServidor.Producao)
            {
                return url;
            }

            const dominioSubtituir = this.RetornarDominioSuperiorSubstituir(ambienteServidor);
            return UrlUtil.NormalizarHttps(url.Replace(ConstantesDominioSuperior.DOMIMIO_SUPERIOR_PRODUCAO, dominioSubtituir));
        }

        public static NormalizarHttps(url: string): string
        {
            url = url.toLowerCase().trim();

            if (url.startsWith("https://"))
            {
                return url;
            }

            if (url.startsWith("http://"))
            {
                return url.Replace("http://", "https://");
            }
            url = UrlUtil.RemoverBarraInicial(url);
            return `https://${url}`;
        }

        private static RetornarDominioSuperiorSubstituir(ambienteServidor: EnumAmbienteServidor)
        {
            switch (ambienteServidor)
            {
                case EnumAmbienteServidor.Localhost:

                    return ConstantesDominioSuperior.DOMIMIO_SUPERIOR_LOCALHOST;

                case EnumAmbienteServidor.Interno:

                    return ConstantesDominioSuperior.DOMIMIO_SUPERIOR_INTERNO;

                case EnumAmbienteServidor.Teste:

                    return ConstantesDominioSuperior.DOMIMIO_SUPERIOR_TESTE;

                case EnumAmbienteServidor.Producao:

                    return ConstantesDominioSuperior.DOMIMIO_SUPERIOR_PRODUCAO;

                default:

                    throw new Erro("Ambiente servidor não suportado");
            }
        }

        public static RemoverBarraInicial(url: string)
        {
            url = url.trimStart();
            while (url.startsWith("/"))
            {
                url = url.substring(1);
            }
            return url;
        }

        public static RemoverBarraFinal(url: string)
        {
            url = url.trimEnd();
            while (url.endsWith("/"))
            {
                url = url.substring(0, url.length - 1);
            }
            return url;
        }

        public static AdicionarBarraInicial(url: string)
        {
            if (!url.trim().startsWith("/"))
            {
                return "/" + url;
            }
            return url;
        }
        public static AdicionarBarraFinal(url: string)
        {
            if (!url.trim().EndsWith("/"))
            {
                return url + "/";
            }
            return url;
        }

        public static IsHash(hash: string): boolean
        {
            return !String.IsNullOrWhiteSpace(hash) &&
                hash[0] === "#";
        }

        public static IsPathHasFileName(url: string)
        {
            const nomeArquivo = u.ArquivoUtil.RetornarNomeArquivo(url);
            return nomeArquivo.indexOf(".") > 0;
        }

        public static RetornarUrlSemNomeArquivo(url: string): string
        {
            if (UrlUtil.IsPathHasFileName(url))
            {
                return url.substring(0, url.lastIndexOf("/") + 1);
            }
            return url;
        }

        public static NormalizarHash(hash: string): string
        {
            if (!hash.trim().startsWith("#"))
            {
                return "#" + hash;
            }
            return hash;
        }
    }
}