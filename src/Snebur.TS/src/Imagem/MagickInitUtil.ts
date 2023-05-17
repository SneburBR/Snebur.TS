namespace Snebur.Imagens
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
        private static readonly DA = "__DA__";
        private static _sRgbProfile: Uint8Array;

        private static ProgressosHandler = new Array<(e: ProgressoEventArgs) => void>();

        public static get Status(): EnumStatusInicializacaoMagick 
        {
            return MagickInitUtil._status;
        }

        public static get IsInicializado(): boolean
        {
            return this.Status === EnumStatusInicializacaoMagick.Sucesso;
        }

        public static get sRgbProfile(): Uint8Array
        {
            return MagickInitUtil._sRgbProfile;
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
            const url = Snebur.$Configuracao.UrlMagick;
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

                //if ($Configuracao.IsDebug)
                //{
                //    return EnumStatusInicializacaoMagick.Erro;
                //}

                const urlPackage = MagickInitUtil.UrlMagick;
                if (String.IsNullOrWhiteSpace(urlPackage))
                {
                    console.error("$Configuracao.UrlMagick não definida");
                    return EnumStatusInicializacaoMagick.Erro;
                }

                const bytes = await AjaxUtil.RetornarBufferArrayAsync(
                    u.EnumHttpMethod.GET,
                    urlPackage,
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

                const blobBase64 = await zip.file("magick-base64.js").async("blob");
                const blobMagick = await zip.file("magick.js").async("blob");
                const bytessRGB = await zip.file("sRGB.icm").async("uint8array");

                const urlBlob64 = window.URL.createObjectURL(blobBase64);

                const isBase64Sucesso = await u.ScriptUtil.CarregarScriptAsync(urlBlob64);
                if (!isBase64Sucesso)
                {
                    return EnumStatusInicializacaoMagick.Erro;
                }

                const urlMagick = window.URL.createObjectURL(blobMagick);
                const isSucesso = await u.ScriptUtil.CarregarScriptAsync(urlMagick);
                if (!isSucesso || (globalThis as any)[MagickInitUtil.DA] == null)
                {
                    return EnumStatusInicializacaoMagick.Erro;
                }

                window.URL.revokeObjectURL(urlPackage);
                window.URL.revokeObjectURL(urlMagick);

             

                if (typeof MagickWasm?.initializeImageMagick !== "function")
                {
                    return EnumStatusInicializacaoMagick.Erro;
                }

                this._sRgbProfile = (bytessRGB.length === 3144) ? bytessRGB : null;
                if (this._sRgbProfile == null)
                {
                    console.error("Perfil sRGB inválido");
                }
                 
                await MagickWasm.initializeImageMagick();

                (globalThis as any)[MagickInitUtil.DA] = null;
                delete (globalThis as any)[MagickInitUtil.DA];

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
