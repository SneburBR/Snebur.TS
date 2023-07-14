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

        public static get BytesPerfilSRGB(): Uint8Array
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
            return Snebur.$Configuracao.UrlMagick;
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

                if (!MagickInitUtil.IsMagickSuportado())
                {
                    return EnumStatusInicializacaoMagick.Erro;
                }

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
                        MagickInitUtil.NotificarProgresso(e);
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

                /*await this.SimularProgressoAsync();*/

                window.URL.revokeObjectURL(urlPackage);
                window.URL.revokeObjectURL(urlBlobWasm);

                if (!String.IsNullOrWhiteSpace(MagickWasm.Magick.imageMagickVersion))
                {
                    console.warn(`Image Magick ${MagickWasm.Magick.imageMagickVersion} carregado com sucesso`);
                    return EnumStatusInicializacaoMagick.Sucesso;
                }
            }
            catch (erro)
            {
                console.warn("Magick não suportado");
            }

            return EnumStatusInicializacaoMagick.Erro;
        }

        private static IsMagickSuportado():boolean
        {
            if (SistemaUtil.NavegadorEnum === d.EnumNavegador.Safari &&
                SistemaUtil.Navegador.VersaoPrincipal < 14.1)
            {
                console.warn("Versão do Safari não suportada pelo Magick");
                return false;
            }

            if (SistemaUtil.NavegadorEnum === d.EnumNavegador.Chrome &&
                SistemaUtil.Navegador.VersaoPrincipal < 85)
            {
                console.warn("Versão do Chrome não suportada pelo Magick");
                return false;
            }

            if (SistemaUtil.NavegadorEnum === d.EnumNavegador.Opera &&
                SistemaUtil.Navegador.VersaoPrincipal < 75)
            {
                console.warn("Versão do Opera não suportada pelo Magick");
                return false;
            }

            if (SistemaUtil.NavegadorEnum === d.EnumNavegador.Firefox &&
                SistemaUtil.Navegador.VersaoPrincipal < 80)
            {
                console.warn("Versão do Firefox não suportada pelo Magick");
                return false;
            }

            if (SistemaUtil.NavegadorEnum === d.EnumNavegador.Edge &&
                SistemaUtil.Navegador.VersaoPrincipal < 80)
            {
                console.warn("Versão do Edge não suportada pelo Magick");
                return false;
            }

            return true;
        }


        private static NotificarProgresso(e: ProgressoEventArgs)
        {
            for (const progress of MagickInitUtil.ProgressosHandler)
            {
                progress(e);
            }
        }
         
    }
}
