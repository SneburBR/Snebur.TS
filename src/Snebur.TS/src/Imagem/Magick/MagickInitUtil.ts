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
        /*private static readonly DA = "__DA__";*/
        private static _sRgbProfile: Uint8Array;
        private static _urlBlobMagick: string;
        private static _urlBlobMagickWorker: string;
        private static _bufferWasm: ArrayBuffer;
        private static _blobWasm: Blob;

        private static ProgressosHandler = new Array<(e: ProgressoEventArgs) => void>();

        public static get Status(): EnumStatusInicializacaoMagick 
        {
            return MagickInitUtil._status;
        }

        public static get IsInicializado(): boolean
        {
            return this.Status === EnumStatusInicializacaoMagick.Sucesso;
        }

        public static get BufferWasm(): ArrayBuffer
        {
            return MagickInitUtil._bufferWasm;
        }
        public static get BlobWasm(): Blob
        {
            return MagickInitUtil._blobWasm;
        }

        public static get UrlBlobMagick(): string
        {
            return MagickInitUtil._urlBlobMagick;
        }
        public static get UrlBlobMagickWorker(): string
        {
            return MagickInitUtil._urlBlobMagickWorker;
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
            return url;
        }

        private static async InicializaMagickAsync()
        {
            try
            {

                if (typeof MagickWasm === "object" &&
                    MagickWasm.Magick != null &&
                    MagickWasm?.Magick.imageMagickVersion.length > 0)
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

                const bufferWasm = await zip.file("magick.wasm").async("arraybuffer");
                const blobMagick = await zip.file("magick.js").async("blob");
                const blobMagickWorker = await zip.file("MagickWorker.js").async("blob");
                const bytessRGB = await zip.file("sRGB.icm").async("uint8array");

                const blobWasm = new Blob([bufferWasm], { type: "application/wasm" });

                const urlBlobMagick = window.URL.createObjectURL(blobMagick);
                const urlBlobMagickWorker = window.URL.createObjectURL(blobMagickWorker);
                const urlBlobWasm = window.URL.createObjectURL(blobWasm);

                const isSucesso = await u.ScriptUtil.CarregarScriptAsync(urlBlobMagick);
                if (!isSucesso)
                {
                    return EnumStatusInicializacaoMagick.Erro;
                }

                this._blobWasm = blobWasm;
                this._urlBlobMagick = urlBlobMagick;
                this._urlBlobMagickWorker = urlBlobMagickWorker;
                this._bufferWasm = bufferWasm;

                if (typeof MagickWasm?.initializeImageMagick !== "function")
                {
                    return EnumStatusInicializacaoMagick.Erro;
                }

                this._sRgbProfile = (bytessRGB.length === 3144) ? bytessRGB : null;
                if (this._sRgbProfile == null)
                {
                    console.error("Perfil sRGB inválido");
                }

                await MagickWasm.initializeImageMagick(urlBlobWasm);

                window.URL.revokeObjectURL(urlPackage);
                /*window.URL.revokeObjectURL(urlBlobMagick);*/
                window.URL.revokeObjectURL(urlBlobWasm);
                //(globalThis as any)[MagickInitUtil.DA] = null;
                //delete (globalThis as any)[MagickInitUtil.DA];

                if (!String.IsNullOrWhiteSpace(MagickWasm.Magick.imageMagickVersion))
                {
                    console.warn(`Image Magick ${MagickWasm.Magick.imageMagickVersion} carregado com sucesso`);
                    return EnumStatusInicializacaoMagick.Sucesso;
                }
            }
            catch (erro)
            {
                console.error("Falha ao carregar o Magick: " + erro);
            }

            return EnumStatusInicializacaoMagick.Erro;
        }

        public static RetornarTotalThreadsWorker(): number
        {
            if (navigator.hardwareConcurrency >= 16)
            {
                return 4;
            }

            if (navigator.hardwareConcurrency >= 8)
            {
                return 3;
            }

            if (navigator.hardwareConcurrency >= 4)
            {
                return 2;
            }

            return 1;
        }

        public static RetornarTotalProcessamentoRecilar(): number
        {
            const memory = (performance as any).memory;
            if (memory != null)
            {
                const totalGb = u.FormatarByteUtil.ConverterParaGB(memory.jsHeapSizeLimit);
                if (totalGb > 0 && isFinite(totalGb))
                {
                    if (totalGb >= 4)
                    {
                        return 6;
                    }

                    if (totalGb >= 3)
                    {
                        return 5;
                    }

                    if (totalGb >= 2)
                    {
                        return 3;
                    }
                    if (totalGb >= 1)
                    {
                        return 2;
                    }
                    return 1;
                }
            }
            return 3;
        }
    }
}
