namespace Snebur.WebWorker
{
    export class UrlWorkerUtil
    {
        private static readonly UrlsBlobsWorksCache = new DicionarioSimples();
        private static _versao: string = null;

        private static get Versao(): string
        {
            if (UrlWorkerUtil._versao === null)
            {
                UrlWorkerUtil._versao = $Configuracao.IsDebug ? GuidUtil.RetornarNovoGuid() :
                    ($Configuracao?.Versao ?? Snebur.VersaoScript);
            }
            return UrlWorkerUtil._versao;
        }

        public static async RetornarUrlCompletaServicoWorker(urlWorker:string): Promise<string>
        {
            const urlRelativa = UrlUtil.CombinarQueryChaveValor(urlWorker, "v", UrlWorkerUtil.Versao);
            if (!ValidacaoUtil.IsUrlHttp(urlRelativa))
            {
                if ($Configuracao.UrlServicosWorker == null)
                {
                    console.error("A configuração: UrlServicosWorker não foi definida ");
                }
                return await UrlWorkerUtil.UrlBlobAsync(urlRelativa);
            }
            return urlRelativa;
        }

        private static async UrlBlobAsync(urlRelativa: string): Promise<string>
        {
            if (!UrlWorkerUtil.UrlsBlobsWorksCache.ContainsKey(urlRelativa))
            {
                UrlWorkerUtil.UrlsBlobsWorksCache.Add(urlRelativa, null);
                await UrlWorkerUtil.CarregarUrlBlobAsync(urlRelativa);
            }

            let urlBlob = UrlWorkerUtil.UrlsBlobsWorksCache.Item(urlRelativa);
            while (urlBlob === null)
            {
                await ThreadUtil.EsperarAsync(300);
                urlBlob = UrlWorkerUtil.UrlsBlobsWorksCache.Item(urlRelativa);
            }
            return urlBlob;
        }
        private static async CarregarUrlBlobAsync(urlRelativa: string)
        {
            if (typeof $Aplicacao.FuncaoNormalizarUrlRelativaWebWorker === "function")
            {
                urlRelativa = $Aplicacao.FuncaoNormalizarUrlRelativaWebWorker(urlRelativa);
            }
            const urlCompleta = UrlUtil.Combinar($Configuracao.UrlServicosWorker, urlRelativa);
            const conteudo = await u.AjaxUtil.RetornarConteudoTextoAsync(urlCompleta, null, null, true);
            if (conteudo instanceof Error)
            {
                throw new Erro(`Não foi possível carregar o conteúdo do Worker: ${urlCompleta}`, conteudo);
            }

            console.log(`Carregando worker (blob) da url: ${urlCompleta}`);

            const blob = new Blob([conteudo], { "type": "application/javascript" });
            const urlBlob = window.URL.createObjectURL(blob);
            UrlWorkerUtil.UrlsBlobsWorksCache.AtribuirItem(urlRelativa, urlBlob);
        }

    }
}