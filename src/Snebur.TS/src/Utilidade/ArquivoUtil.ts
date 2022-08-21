namespace Snebur.Utilidade
{
    export class ArquivoUtil
    {
        private static readonly CaracteresInvalidosNomeArquivos = ["\"", "*", ":", "<", ">", "?", "/", "\\", "|"];

        public static RetornarNomeArquivo(caminhoArquivoOuArquivo: string | Blob | SnBlob): string
        {
            const caminhoArquivo = this.NormalizarCaminhoArquivo(caminhoArquivoOuArquivo);
            if (!String.IsNullOrEmpty(caminhoArquivo))
            {
                const posicaoUtlimaBarra = Math.max(caminhoArquivo.lastIndexOf("/"), caminhoArquivo.lastIndexOf("\\"));
                if (posicaoUtlimaBarra >= 0)
                {
                    const nomeArquivo = caminhoArquivo.substr(posicaoUtlimaBarra + 1);
                    return UrlUtil.RemoverQuery(nomeArquivo);
                }
            }
            return UrlUtil.RemoverQuery(caminhoArquivo);
        }

        public static RetornarExtensaoArquivo(nomeArquivoOuTipoArquivo: string): string
        public static RetornarExtensaoArquivo(nomeArquivoOuTipoArquivo: string, isRevemorPonto: boolean): string
        public static RetornarExtensaoArquivo(nomeTipoOuUrl: string, isRevemorPonto: boolean = false): string
        {
            if (!String.IsNullOrEmpty(nomeTipoOuUrl))
            {
                let ultimaPosicaoPonto = nomeTipoOuUrl.lastIndexOf(".");
                if (ultimaPosicaoPonto > 0)
                {
                    if (isRevemorPonto)
                    {
                        ultimaPosicaoPonto += 1;
                    }
                    return UrlUtil.RemoverQuery(nomeTipoOuUrl.substr(ultimaPosicaoPonto)).toLowerCase();
                }

                if (EnumUtil.IsDefindo(EnumMimetypeString, nomeTipoOuUrl))
                {
                    const posicao = nomeTipoOuUrl.lastIndexOf("/");
                    if (posicao > 0)
                    {
                        const extensao = nomeTipoOuUrl.substr(posicao + 1).toLowerCase();
                        if (isRevemorPonto)
                        {
                            return extensao;
                        }
                        return `.${extensao}`;
                    }
                }
            }
            return String.Empty;
        }

        public static RetornarMimeType(nomeArquivo: string, isNaoEncontradoNull: boolean = false): string
        {
            let extensao = this.RetornarExtensaoArquivo(nomeArquivo, true);
            if (String.IsIniciaComNumero(extensao))
            {
                extensao = "_" + extensao.substr(1);
            }
            const valorMineType = TextoUtil.FormatarPrimeiraLetraMaiuscula(extensao.toLowerCase());
            if (!EnumUtil.IsDefindo(EnumMimeType, valorMineType))
            {
                if (isNaoEncontradoNull)
                {
                    return null;
                }
                throw new Erro(`O mime type para a extensão ${extensao} não está definido`);
            }
            const mimeTypeEnum = EnumUtil.RetornarValor(EnumMimeType, valorMineType);
            return MimeTypeUtil.RetornarMimeType(mimeTypeEnum);
        }

        public static RetornarMineTypeEnum(nomeArquivo: string): EnumMimeType
        {
            const extensao = TextoUtil.FormatarPrimeiraLetraMaiuscula(ArquivoUtil.RetornarExtensaoArquivo(nomeArquivo, true).trim().toLowerCase());
            if (EnumUtil.IsDefindo(EnumMimeType, extensao))
            {
                return EnumUtil.RetornarValor(EnumMimeType, extensao);
            }
            return EnumMimeType.Desconhecido;
        }

        public static RetornarNomeArquivoSemExtensao(arquivo: File | SnBlob | string): string
        {
            const nomeArquivo = this.RetornarNomeArquivo(arquivo);
            if (!String.IsNullOrEmpty(nomeArquivo))
            {
                const ultimaPosicaoPonto = nomeArquivo.lastIndexOf(".");
                if (ultimaPosicaoPonto > 0)
                {
                    return nomeArquivo.substr(0, ultimaPosicaoPonto);
                }
                return nomeArquivo;
            }
            return String.Empty;
        }

        private static NormalizarCaminhoArquivo(caminhoArquivoOuArquivo: string | Blob | SnBlob): string
        {
            /*ValidacaoUtil.ValidarArgumentoDefinido({ caminhoArquivoOuArquivo });*/

            if (caminhoArquivoOuArquivo instanceof File || caminhoArquivoOuArquivo instanceof SnBlob)
            {
                return caminhoArquivoOuArquivo.name;
            }

            if (caminhoArquivoOuArquivo instanceof Blob)
            {
                return `[blob (${caminhoArquivoOuArquivo.size})]${ArquivoUtil.RetornarExtensaoArquivo(caminhoArquivoOuArquivo.type)}`;
            }

            if (typeof caminhoArquivoOuArquivo === "string")
            {
                return caminhoArquivoOuArquivo;
            }

            throw new Erro("Caminho arquivo não suportado");
        }

        public static RetornarBufferArrayAsync(arquivoOuBlob: Blob | SnBlob): Promise<ArrayBuffer | null>
        public static RetornarBufferArrayAsync(arquivoOuBlob: Blob | SnBlob, isIgnorarErro: true): Promise<ArrayBuffer | null>
        public static RetornarBufferArrayAsync(arquivoOuBlob: Blob | SnBlob, isIgnorarErro: false): Promise<ArrayBuffer | Error>
        public static RetornarBufferArrayAsync(arquivoOuBlob: Blob | SnBlob, isIgnorarErro: boolean = true): Promise<ArrayBuffer | Error | null>
        {
            const blob = arquivoOuBlob instanceof SnBlob ? arquivoOuBlob.Blob : arquivoOuBlob;
            return new Promise<ArrayBuffer | Error | null>(resolver => 
            {
                const leitor = new FileReader();
                leitor.onload = function ()
                {
                    resolver(leitor.result as ArrayBuffer);
                };
                leitor.onerror = function (e: ProgressEvent<FileReader>)
                {
                    const nomeArquivo = ArquivoUtil.RetornarNomeArquivo(arquivoOuBlob);
                    const mensagem = `Não foi possível ler arquivo ${nomeArquivo}`;

                    let retorno = new Error(mensagem);
                    LogUtil.Erro(retorno, leitor.error?.message);
                    if (isIgnorarErro)
                    {
                        retorno = null;

                    }
                    resolver(retorno);
                };
                leitor.readAsArrayBuffer(blob);
            });
        }

        public static async RetornarBase64FromUrlAsync(url: string, tentativa = 0): Promise<string | null>
        {
            const blob = await AjaxUtil.RetornarConteudoBlobAsync(url);
            if (blob instanceof Blob)
            {
                return ArquivoUtil.RetornarBase64Async(blob);
            }
            else
            {
                if (tentativa > 5)
                {
                    throw new Erro("Não foi possivel retornar um binario da url" + url);
                }
                return this.RetornarBase64FromUrlAsync(url, tentativa + 1);
            }
        }

        public static RetornarBase64Async(arquivoOuBlob: File | Blob | SnBlob): Promise<string | null>
        {
            const blob = arquivoOuBlob instanceof SnBlob ? arquivoOuBlob.Blob : arquivoOuBlob;
            return new Promise<string>(resolver =>
            {
                const leitor = new FileReader();
                leitor.onload = function ()
                {
                    resolver(leitor.result as string);
                };
                leitor.onerror = function ()
                {
                    const nomeArquivo = ArquivoUtil.RetornarNomeArquivo(arquivoOuBlob);
                    const mensagem = `Não foi possível ler arquivo ${nomeArquivo}`;
                    LogUtil.Erro(leitor.error, mensagem);
                    resolver(null);
                };
                leitor.readAsDataURL(blob);
            });
        }

        public static FormatarNomeArquivo(nomeArquivo: string): string
        {
            const sb = new StringBuilder();
            const len = nomeArquivo.length;
            for (let i = 0; i < len; i++)
            {
                const char = nomeArquivo.charAt(i);
                if (!this.CaracteresInvalidosNomeArquivos.Contains(char))
                {
                    sb.Append(char);
                }
            }
            return sb.ToString();
        }

        public static ConverterBase64ParaBlob(base64: string, mimeType?: string)
        {
            const inicio = base64.indexOf(",");
            if (inicio > 0)
            {
                base64 = base64.substring(inicio + 1);
            }

            const bytes = u.Base64Util.Base64ParaBytes(base64);
            if (!String.IsNullOrWhiteSpace(mimeType))
            {
                return new Blob([bytes], { type: mimeType });
            }
            return new Blob([bytes]);
        }

        public static RetornarNomeOuTipoArquivo(arquivo: Blob | SnBlob): string
        {
            const blob = arquivo instanceof SnBlob ? arquivo.Blob : arquivo;
            if (blob instanceof File)
            {
                return blob.name;
            }
            return blob.type;
        }

        public static TrocarExtensao(nomeArquivo: string, extensao: string): string
        {
            const indiceExtensao = nomeArquivo.lastIndexOf(".");
            if (indiceExtensao > 0)
            {
                const nomeArquivoSemExtensao = nomeArquivo.substring(0, indiceExtensao);
                if (!extensao.StartsWith("."))
                {
                    extensao = "." + extensao;
                }
                return nomeArquivoSemExtensao + extensao;
            }
            return nomeArquivo + extensao;
        }
    }


}