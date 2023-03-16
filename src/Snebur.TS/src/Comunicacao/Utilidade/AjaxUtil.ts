namespace Snebur.Utilidade
{
    export class AjaxUtil
    {

        public static RetornarTextoSync(url: string): string  
        public static RetornarTextoSync(url: string, isRetornarErro: true): string   | Error
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
                const erro = new Erro("Não foi possível carregar o texto da url " + url, this);
                if (isRetornarErro)
                {
                    return erro;
                }
                throw erro;
            }
        }

        private static __RetornarConteudoBlobInternoAsync(url: string, callback: CallbackResultado<string | Blob | Erro>): void
        {
            const xmlHttp = new XMLHttpRequest();

            xmlHttp.open("GET", url, true);
            xmlHttp.setRequestHeader("Content-type", "application/octet-stream");
            xmlHttp.responseType = "blob";

            xmlHttp.onreadystatechange = function ()
            {
                if (xmlHttp.readyState === 4)
                {
                    if (xmlHttp.status === 200)
                    {
                        if (xmlHttp.response instanceof Blob)
                        {
                            callback(xmlHttp.response);
                        }
                        else
                        {
                            const resposta: any = xmlHttp.response || xmlHttp.responseText;
                            callback(resposta);
                        }
                    }
                    else
                    {
                        const mensagem = `url : ${url},  status: ${xmlHttp.status.toString()}`;
                        callback(new Erro(mensagem, this));
                    }
                }
            };
            xmlHttp.send(null);
        }

        public static RetornarConteudoTextoAsync(url: string,
            formData: FormData | ArrayBuffer = null,
            cabecalhos: DicionarioSimples<string | number> = null, ignorarErro? :boolean): Promise<string | Erro>
        {
            return new Promise<string| Erro>(resolver =>
            {
                this.__RetornarConteudoTextoInternoAsync(url, formData, cabecalhos, (resultado: string | Erro) =>
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
                });
            });
        }

        private static __RetornarConteudoTextoInternoAsync(url: string,
            formData: FormData | ArrayBuffer,
            cabecalhos: DicionarioSimples<string | number>,
            callback: CallbackResultado<string | Erro>): void
        {
            const metodo = formData != null ? "POST" : "GET";
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open(metodo, url, true);

            xmlHttp.setRequestHeader("Content-type", "text/json");

            if (metodo === "POST" && typeof $Aplicacao.FuncaoNormalizarRequisicao === "function")
            {
                $Aplicacao.FuncaoNormalizarRequisicao(xmlHttp);
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

        private static __RetornarConteudoBytesInternoAsync(url: string,
            token: string,
            callback?: CallbackResultado<ArrayBuffer | Error>,
            callbackProgresso?: CallbackResultado<ProgressoEventArgs>): void
        {
            const xmlHttp = new XMLHttpRequest();

            xmlHttp.open("POST", url, true);
            xmlHttp.setRequestHeader("Content-type", "buuferArray");
            if (!String.IsNullOrEmpty(token))
            {
                xmlHttp.setRequestHeader(c.ParametrosComunicacao.TOKEN, encodeURIComponent(token));
            }

            xmlHttp.setRequestHeader(c.ParametrosComunicacao.NOME_APLICACAO_WEB, encodeURIComponent($Configuracao.IdentificadorAplicacao));
            xmlHttp.setRequestHeader("Content-type", "buuferArray");
            xmlHttp.responseType = "arraybuffer";

            if (typeof $Aplicacao.FuncaoNormalizarRequisicao === "function")
            {
                $Aplicacao.FuncaoNormalizarRequisicao(xmlHttp);
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
                            const mensagem = `url : ${url},  o tipo não é suportado : ${typeof xmlHttp.response}`;
                            callback(new Erro(mensagem, this));
                        }
                    }
                    else
                    {
                        const mensagem = `url : ${url},  status: ${xmlHttp.status.toString()}`;
                        callback(new Erro(mensagem, this));
                    }
                }
            };
            xmlHttp.send(null);
        }

        public static RetornarBufferArrayAsync(url: string, token?: string, callbackProgresso?: CallbackResultado<ProgressoEventArgs>): Promise<ArrayBuffer>
        {
            return new Promise<ArrayBuffer>(resolver =>
            {
                this.__RetornarConteudoBytesInternoAsync(url, token, function (resultado)
                {
                    if (resultado instanceof Error)
                    {
                        throw resultado;
                    }
                    resolver(resultado);
                }, callbackProgresso);
            });
        }

        public static RetornarConteudoBlobAsync(url: string): Promise<Blob | string | Error>
        {
            return new Promise<Blob | string | Error>(resolver =>
            {
                this.__RetornarConteudoBlobInternoAsync(url, function (resultado)
                {
                    if (resultado instanceof Error)
                    {
                        throw resultado;
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
            urlArquivo: string,
            nomeArquivo: string,
            mimeType: EnumMimeType,
            isTokenRequerido:boolean,
            callbackProcesso: (e: ProgressoEventArgs) => void)
        {
            const token = isTokenRequerido ? GuidUtil.RetornarNovoGuid() : null;

            const byfferImagemGabaritoEstrutura = await AjaxUtil.RetornarBufferArrayAsync(
                urlArquivo,
                token, (ev: ProgressoEventArgs) =>
            {
                callbackProcesso(ev);
            });
            const enumMimeType = MimeTypeUtil.RetornarMimeType(mimeType);
            const blob = new Blob([byfferImagemGabaritoEstrutura], { type: enumMimeType });
            Salvar.SalvarComo(blob, nomeArquivo);
        }
    }
}