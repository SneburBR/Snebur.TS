namespace Snebur.Utilidade
{
    export class AjaxUtil_HttpRequest
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

        private static __RetornarConteudoBlobInternoAsync(url: string, type: EnumMimetypeString = EnumMimetypeString.Bin, callback: CallbackResultado<string | Blob | Erro>): void
        {
            const xmlHttp = new XMLHttpRequest();

            xmlHttp.open("GET", url, true);
            xmlHttp.setRequestHeader("Content-type", EnumMimetypeString.Bin);
            xmlHttp.responseType = "blob";

            xmlHttp.onreadystatechange = function ()
            {
                if (xmlHttp.readyState === 4)
                {
                    if (xmlHttp.status !== 200)
                    {
                        /*const resposta: any = xmlHttp.response || xmlHttp.responseText;*/
                        callback(new Erro(`Falha download ${url}`));
                        return;
                    }

                    if (xmlHttp.response instanceof Blob)
                    {
                        callback(xmlHttp.response);
                        return;
                    }
                    if (xmlHttp.response instanceof ArrayBuffer)
                    {
                        const blob = new Blob([xmlHttp.response], { type: type });
                        callback(blob);
                        return;
                    }
                    if (xmlHttp.response instanceof Uint8Array)
                    {
                        const blob = new Blob([xmlHttp.response.buffer], { type: type });
                        callback(blob);
                        return;
                    }

                    if (typeof xmlHttp.response === "string")
                    {
                        const blob = new Blob([xmlHttp.response], { type: "text/plain" });
                        callback(blob);
                        return;
                    }
                    if (typeof xmlHttp.responseText === "string")
                    {
                        const blob = new Blob([xmlHttp.responseText], { type: "text/plain" });
                        callback(blob);
                        return;
                    }

                    const resultado = xmlHttp.response ?? xmlHttp.responseText;
                    if (resultado == null)
                    {
                        callback(null);
                        return;
                    }

                    const blob = new Blob([resultado], { type: "text/plain" });
                    callback(blob);

                }
            };
            xmlHttp.send(null);
        }

        public static RetornarConteudoTextoAsync(url: string,
            formData: FormData | ArrayBuffer = null,
            cabecalhos: DicionarioSimples<string | number> = null,
            ignorarErro: boolean = false,
            isNaoAdicionarContextTypeJson: boolean = false): Promise<string | Erro>
        {
            return new Promise<string | Erro>(resolver =>
            {
                this.__RetornarConteudoTextoInternoAsync(url,
                    formData, cabecalhos, (resultado: string | Erro) =>
                {
                    if (resultado instanceof Error)
                    {
                        if (!ignorarErro)
                        {
                            throw resultado;
                        }
                        /*resultado = String.Empty;*/
                    }
                    resolver(resultado);
                },
                isNaoAdicionarContextTypeJson);
            });
        }

        private static __RetornarConteudoTextoInternoAsync(url: string,
            formData: FormData | ArrayBuffer,
            cabecalhos: DicionarioSimples<string | number>,
            callback: CallbackResultado<string | Erro>,
            isNaoAdicionarContextTypeJson: boolean): void
        {
            const metodo = formData != null ? u.EnumHttpMethod.POST : u.EnumHttpMethod.GET;
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open(metodo, url, true);

            if (!isNaoAdicionarContextTypeJson && !cabecalhos?.ContainsKey("Content-type"))
            {
                xmlHttp.setRequestHeader("Content-type", "text/json");
            }

            if (typeof $Aplicacao.FuncaoNormalizarRequisicao === "function")
            {
                $Aplicacao.FuncaoNormalizarRequisicao(metodo, url, xmlHttp);
            }

            if (cabecalhos instanceof DicionarioSimples)
            {
                for (const cabecalho of cabecalhos.ParesChaveValor)
                {
                    xmlHttp.setRequestHeader(cabecalho.Chave, cabecalho.Valor.toString());
                }
            }

            xmlHttp.onreadystatechange = function ()
            {
                if (xmlHttp.readyState === 4)
                {
                    if (xmlHttp.status === 200)
                    {
                        callback(xmlHttp.responseText);
                    }
                    else
                    {
                        const mensagem = `url : ${url},  status: ${xmlHttp.status.toString()}`;
                        callback(new Erro(mensagem, this));
                    }
                }
            };
            xmlHttp.send(formData);
        }

        private static __RetornarConteudoBytesInternoAsync(
            metodo: EnumHttpMethod,
            url: string,
            token: string,
            timeout: number,
            cabecalhos: DicionarioSimples<string | number> = null,
            callbackProgresso: CallbackResultado<ProgressoEventArgs>,
            callback: CallbackResultado<ArrayBuffer | Error>): void
        {
            const xmlHttp = new XMLHttpRequest();

            xmlHttp.open(metodo, url, true);


            if (!String.IsNullOrEmpty(token))
            {
                xmlHttp.setRequestHeader(c.ParametrosComunicacao.TOKEN, encodeURIComponent(token));
                xmlHttp.setRequestHeader(c.ParametrosComunicacao.IDENTIFICADOR_APLICACAO, $Configuracao.IdentificadorAplicacao);
            }

            if (cabecalhos?.Count > 0)
            {
                for (const parChaveValor of cabecalhos.ParesChaveValor)
                {
                    xmlHttp.setRequestHeader(parChaveValor.Chave, parChaveValor.Valor?.toString() ?? String.Empty);
                }
            }

            xmlHttp.timeout = timeout;
            xmlHttp.setRequestHeader("Content-type", "arraybuffer");
            xmlHttp.responseType = "arraybuffer";

            if (typeof $Aplicacao.FuncaoNormalizarRequisicao === "function")
            {
                $Aplicacao.FuncaoNormalizarRequisicao(metodo, url, xmlHttp);
            }

            if (u.ValidacaoUtil.IsFunction(callbackProgresso))
            {
                xmlHttp.addEventListener("progress", function (eventoProgresso)
                {
                    const progresso = (eventoProgresso.loaded / eventoProgresso.total) * 100;
                    const argsProgresso = new ProgressoEventArgs(progresso);
                    callbackProgresso(argsProgresso);
                });
            }
            xmlHttp.ontimeout = function ()
            {
                console.error(`Timeout na requisição ${url}`);
                callback(null);
            };
            xmlHttp.onreadystatechange = function ()
            {
                if (xmlHttp.readyState === 4)
                {
                    if (xmlHttp.status === 200)
                    {
                        if (xmlHttp.response instanceof ArrayBuffer)
                        {
                            callback(xmlHttp.response);
                        }
                        else
                        {
                            const mensagem = `URL : ${url},  o tipo não é suportado : ${typeof xmlHttp.response}`;
                            callback(new Erro(mensagem, this));
                        }
                    }
                    else
                    {
                        const mensagem = `URL : ${url},  status: ${xmlHttp.status.toString()}`;
                        callback(new Erro(mensagem, this));
                    }
                }
            };
            xmlHttp.send(null);
        }

        public static RetornarBufferArrayAsync(
            metodo: EnumHttpMethod,
            url: string,
            token: string = null,
            timeout: number = 0,
            cabecalhos: DicionarioSimples<string | number> = null,
            callbackProgresso: CallbackResultado<ProgressoEventArgs> = null): Promise<ArrayBuffer>
        {
            return new Promise<ArrayBuffer>((resolver, reject) =>
            {
                this.__RetornarConteudoBytesInternoAsync(metodo, url, token, timeout, cabecalhos, callbackProgresso,
                    (resultado) =>
                    {
                        if (resultado instanceof Error)
                        {
                            reject(resultado);
                            return;
                        }
                        resolver(resultado);
                    });
            });
        }

        public static RetornarConteudoBlobAsync(url: string, mimeType?: EnumMimetypeString): Promise<Blob | string | Error>
        {
            return new Promise<Blob | string | Error>((resolver, reject) =>
            {
                this.__RetornarConteudoBlobInternoAsync(url, mimeType, function (resultado)
                {
                    if (resultado instanceof Error)
                    {
                        resolver(resultado);
                        return;
                    }
                    resolver(resultado);
                });
            });
        }


        public static RetornarDescricaoCodigoErro(codigo: number): string
        {
            switch (codigo)
            {
                case 404: {
                    return "Pagina não encontrada";
                }
                case 403: {
                    return "Permissão negada";
                }
                case 500: {
                    return "Erro interno no servido";
                }
                case 0: {
                    return "Retorna de internet, falha de conexão, verificar firewall";
                }
                default: {
                    return "Erro desconhecido código " + codigo;
                }
            }
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
    }

     
}