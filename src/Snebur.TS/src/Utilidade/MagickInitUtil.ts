namespace Snebur.Utilidade
{
    export enum EnumStatusInicializacaoMagick
    {
        Aguardando = 1,
        Inicializando = 2,
        Sucesso = 3,
        Erro = 99
    }

    export class MagickInitUtil
    {
        private static _status: EnumStatusInicializacaoMagick = EnumStatusInicializacaoMagick.Aguardando;
        private static readonly TIMEOUT = 5 * 60 * 1000;

        private static ProgressosHandler = new Array<(e: ProgressoEventArgs) => void>();

        public static get Status(): EnumStatusInicializacaoMagick 
        {
            return MagickInitUtil._status;
        }

        public static get IsInicializado(): boolean
        {
            return this.Status === EnumStatusInicializacaoMagick.Sucesso;
        }

        private static get IsFinalizado(): boolean
        {
            return MagickInitUtil.Status === EnumStatusInicializacaoMagick.Sucesso ||
                MagickInitUtil.Status === EnumStatusInicializacaoMagick.Erro;
        }

        public static get Versao(): string
        {
            if (typeof MagickWasm === "object" &&
                MagickWasm?.Magick?.imageMagickVersion?.length > 0)
            {
                return MagickWasm.Magick?.imageMagickVersion;
            }
            return "Magick não inicializado";
        }

        public static async InicializarAsync(progressHandler: (e: ProgressoEventArgs) => void): Promise<boolean>
        {

            if (MagickInitUtil.IsFinalizado)
            {
                return MagickInitUtil.Status === EnumStatusInicializacaoMagick.Sucesso;
            }

            MagickInitUtil.ProgressosHandler.Add(progressHandler);

            if (MagickInitUtil._status === EnumStatusInicializacaoMagick.Aguardando)
            {
                MagickInitUtil._status = EnumStatusInicializacaoMagick.Inicializando;
                MagickInitUtil.InicializarInternoAsync();

            }

            while (!MagickInitUtil.IsFinalizado)
            {
                await ThreadUtil.EsperarAsync(350);
            }
            return MagickInitUtil.Status === EnumStatusInicializacaoMagick.Sucesso;

        }

        private static async InicializarInternoAsync()
        {
            const status = await MagickInitUtil.InicializaMagickAsync();
            MagickInitUtil._status = status;
        }

        private static get UrlMagick(): string
        {
            const url = Snebur.$Configuracao.UrlMagick + "?v=111dasdasdas";
            //if ($Configuracao.IsDebug)
            //{
            //    return url.replace("magick.zip", "magick-debug.zip");
            //}
            return url;
        }

        private static async InicializaMagickAsync()
        {
            try
            {
                
                if (typeof MagickWasm === "object" &&
                    MagickWasm?.Magick?.imageMagickVersion?.length > 0)
                {
                    return EnumStatusInicializacaoMagick.Sucesso;
                }

                if ($Configuracao.IsDebug)
                {
                    return EnumStatusInicializacaoMagick.Erro;
                }

                const urlMagick = MagickInitUtil.UrlMagick;
                if (String.IsNullOrWhiteSpace(urlMagick))
                {
                    console.error("$Configuracao.UrlMagick não definida");
                    return EnumStatusInicializacaoMagick.Erro;
                }

                const bytes = await AjaxUtil.RetornarBufferArrayAsync(
                    EnumHttpMethod.GET,
                    urlMagick,
                    null,
                    MagickInitUtil.TIMEOUT,
                    (e: ProgressoEventArgs) =>
                    {
                        for (const progress of MagickInitUtil.ProgressosHandler)
                        {
                            progress(e);
                        }
                    });

                const zip = new JSZip();
                await zip.loadAsync(bytes);
                const blob = await zip.file("magick.js").async("blob");
                const blobImport = await zip.file("ImportMagick.js").async("blob");
                const urlBlob = window.URL.createObjectURL(blob);

                const isSucessoMagick = await u.ScriptUtil.CarregarScriptAsync(urlBlob);

                if (!isSucessoMagick)
                {
                    return EnumStatusInicializacaoMagick.Erro;
                }

                const urlBlobImport = window.URL.createObjectURL(blobImport);
                const isSucessoImport = await u.ScriptUtil.CarregarScriptAsync(urlBlobImport);
                if (!isSucessoImport)
                {
                    return EnumStatusInicializacaoMagick.Erro;
                }

                window.URL.revokeObjectURL(urlBlob);
                window.URL.revokeObjectURL(urlBlobImport);


                if (typeof MagickWasm?.initializeImageMagick !== "function")
                {
                    return EnumStatusInicializacaoMagick.Erro;
                }

                await MagickWasm.initializeImageMagick();

                if (!String.IsNullOrWhiteSpace(MagickWasm.Magick.imageMagickVersion))
                {
                    console.log(`Image Magick ${MagickWasm.Magick.imageMagickVersion} carregado com sucesso`);
                    return EnumStatusInicializacaoMagick.Sucesso;
                }
            }
            catch (erro)
            {
                console.error("Falha ao carregar o Magick: " + erro);
            }

            return EnumStatusInicializacaoMagick.Erro;
        }
    }
}
