namespace Snebur.Utilidade
{
    export class AjaxUtil
    {
        public static RetornarTextoSync(url: string): string
        public static RetornarTextoSync(url: string, isRetornarErro: true): string | Error
        public static RetornarTextoSync(url: string, isRetornarErro: false): string
        public static RetornarTextoSync(url: string, isRetornarErro: boolean = false): string | Error
        {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, false);
            xmlHttp.setRequestHeader("Content-type", "text/html");

            xmlHttp.send(null);

            if (xmlHttp.status === 200)
            {
                return xmlHttp.responseText;
            }
            else
            {
                const erro = new Erro("Não foi possível carregar o texto da URL " + url, this);
                if (isRetornarErro)
                {
                    return erro;
                }
                throw erro;
            }
        }

        public static async RetornarConteudoTextoAsync(url: string,
            formData: FormData | ArrayBuffer = null,
            cabecalhos: DicionarioSimples<string | number> = null,
            ignorarErro: boolean = false,
            isNaoAdicionarContextTypeJson: boolean = false): Promise<string | Erro>
        {
            const body = formData instanceof FormData || formData instanceof ArrayBuffer ? formData : undefined;

            cabecalhos ??= new DicionarioSimples<string | number>();

            if (!isNaoAdicionarContextTypeJson)
            {
                cabecalhos.TryAdd("content-type", "application/json");
            }

            const headers = this.RetornarHeaders(cabecalhos);
            const metodo = formData != null ? "POST" : "GET";
            try
            {
                const response = await fetch(url, {
                    method: metodo,
                    headers: headers,
                    body: body,
                });

                if (response.ok)
                {
                    return await response.text();
                }
                else
                {
                    throw new Erro(`URL : ${url}, status: ${response.status} - ${response.statusText}`);
                }
            }
            catch (error)
            {
                throw new Erro(`URL : ${url}, Falha de conexão ${error}`);
            }
        }

        public static RetornarBufferArrayAsync(
            metodo: EnumHttpMethod,
            url: string,
            token: string = null,
            timeout: number = 0,
            cabecalhos: DicionarioSimples<string | number> = null,
            callbackProgresso: CallbackResultado<ProgressoEventArgs> = null): Promise<ArrayBuffer>
        {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise<ArrayBuffer>(async (resolve, reject) =>
            {
                let idTimeout: number = null;
                if (timeout > 0)
                {
                    idTimeout = setTimeout(() =>
                    {
                        reject(new Erro(`Timeout na requisição ${url}`));
                    }, timeout);
                }

                cabecalhos ??= new DicionarioSimples<string | number>();
                cabecalhos.TryAdd("content-type", "application/octet-stream");

                const headers = this.RetornarHeaders(cabecalhos, token);
                try
                {
                    const response = await fetch(url, {
                        method: metodo,
                        headers: headers,
                    });

                    if (callbackProgresso != null)
                    {
                        const totalDownloadBytes = parseInt(response.headers.get("content-length"));
                        if (totalDownloadBytes > 0)
                        {
                            try
                            {
                                const chunks = new Array<Uint8Array>();
                                let bytesDownloaded = 0;
                                const reader = response.body.getReader();

                                // eslint-disable-next-line no-constant-condition
                                while (true)
                                {
                                    clearTimeout(idTimeout);
                                    idTimeout = setTimeout(() =>
                                    {
                                        reject(new Erro(`Timeout na requisição ${url}`));
                                    }, timeout);

                                    const { value, done } = await reader.read();
                                    if (done)
                                    {
                                        break;
                                    }
                                    chunks.push(value);
                                    bytesDownloaded += value.length;
                                    const progresso = bytesDownloaded / totalDownloadBytes;
                                    callbackProgresso(new ProgressoEventArgs(progresso, `${progresso.toFixed(2)}%`, bytesDownloaded, totalDownloadBytes));
                                }

                                clearTimeout(idTimeout);

                                const chunksAll = new Uint8Array(bytesDownloaded);
                                let position = 0;
                                for (const chunk of chunks)
                                {
                                    chunksAll.set(chunk, position);
                                    position += chunk.length;
                                }
                                resolve(chunksAll.buffer);
                                return;
                            }
                            catch (error)
                            {
                                console.error(`Erro ao processar o download do arquivo com processo ${url} - ${error}`);
                            }

                        }
                    }

                    if (response.ok)
                    {
                        const arrayBuffer = await response.arrayBuffer();
                        resolve(arrayBuffer);
                    }
                    else
                    {
                        reject(new Erro(`URL : ${url}, status: ${response.status} - ${response.statusText}`));
                    }
                }
                catch (error)
                {
                    clearTimeout(idTimeout);
                    reject(new Erro(`URL : ${url}, Falha de conexão ${error}`));
                }
            });
        }

        public static async RetornarConteudoBlobAsync(
            url: string,
            mimeType?: EnumMimetypeString,
            token: string = null,
            timeout: number = 0,
            cabecalhos: DicionarioSimples<string | number> = null): Promise<Blob | string | Error> 
        {

            const bufferArray = await AjaxUtil.RetornarBufferArrayAsync(
                EnumHttpMethod.GET,
                url,
                token,
                timeout,
                cabecalhos);

            if (bufferArray instanceof Error)
            {
                return bufferArray;
            }

            if (bufferArray instanceof ArrayBuffer)
            {
                const type = mimeType ?? "application/octet-stream";
                return new Blob([bufferArray], { type: type });
            }

            return new Erro(`Não foi possível retornar o conteúdo do blob da URL ${url}`);
        }

        private static RetornarHeaders(
            cabecalhos: DicionarioSimples<string | number, string>, token: string = null): Headers
        {
            if (!String.IsNullOrEmpty(token))
            {
                cabecalhos.TryAdd(c.ParametrosComunicacao.TOKEN, encodeURIComponent(token));
                cabecalhos.TryAdd(c.ParametrosComunicacao.IDENTIFICADOR_APLICACAO, $Configuracao.IdentificadorAplicacao);
            }

            const header = new Headers();
            for (const item of cabecalhos.ParesChaveValor)
            {
                if (item.Valor != null)
                {
                    header.append(item.Chave, item.Valor.toString());
                }
            }
            return header;
        }

        public static async SalvarArquivoAsync(
            metodo: EnumHttpMethod,
            urlArquivo: string,
            nomeArquivo: string,
            mimeType: EnumMimeType,
            isTokenRequerido: boolean,
            timeout: number,
            callbackProcesso: (e: ProgressoEventArgs) => void)
        {
            const token = isTokenRequerido ? GuidUtil.RetornarNovoGuid() : null;

            const byfferImagemGabaritoEstrutura = await AjaxUtil.RetornarBufferArrayAsync(
                metodo,
                urlArquivo,
                token,
                timeout,
                null,
                (ev: ProgressoEventArgs) =>
                {
                    callbackProcesso(ev);
                });

            const enumMimeType = MimeTypeUtil.RetornarMimeType(mimeType);
            const blob = new Blob([byfferImagemGabaritoEstrutura], { type: enumMimeType });
            Salvar.SalvarComo(blob, nomeArquivo);
        }

        //public static RetornarDescricaoCodigoErro(codigo: number): string
        //{
        //    switch (codigo)
        //    {
        //        case 404: {
        //            return "Pagina não encontrada";
        //        }
        //        case 403: {
        //            return "Permissão negada";
        //        }
        //        case 500: {
        //            return "Erro interno no servido";
        //        }
        //        case 0: {
        //            return "Retorna de internet, falha de conexão, verificar firewall";
        //        }
        //        default: {
        //            return "Erro desconhecido código " + codigo;
        //        }
        //    }
        //}
    }

    export enum EnumHttpMethod
    {
        POST = "POST",
        GET = "GET"
    }
}