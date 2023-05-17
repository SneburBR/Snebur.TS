namespace Snebur.Imagens
{
    export class MagickUtil
    {
        public static async RemoverExif(imageMagick: MagickWasm.IMagickImage)
        {
            const exif = imageMagick.getProfile("exif");
            if (exif != null)
            {
                imageMagick.removeProfile("exif");
            }
        }

        public static async ConvertersRGBAsync(imageMagick: MagickWasm.IMagickImage): Promise<void>
        {
            try
            {
                const icc = imageMagick.getProfile("icc");
                const iccData = icc?.getData();
                if (iccData == null || !MagickUtil.IssRgbData(iccData))
                {
                    imageMagick.setArtifact("profile:highres-transform", false);
                    imageMagick.addProfile("icc", MagickInitUtil.sRgbProfile);
                }
            }
            catch (erro)
            {
                console.warn(`Falha na leitura do exif: ${erro}`);
            }
        }

        private static IssRgbData(iccData: Uint8Array): boolean
        {
            if (iccData.length === 3144)
            {
                const bytes = MagickInitUtil.sRgbProfile;
                for (let i = 0; i < 32; i++)
                {
                    if (iccData[i] !== bytes[i])
                    {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
    }
}
