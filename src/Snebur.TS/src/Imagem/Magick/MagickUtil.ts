
class MagickUtil
{
    /*@internal*/
    public static IsWorker: boolean = true;

    public static  Profiles = ["ifd0", "ifd1", "exif", "gps", "interop", "thumbnail", "iptc"]

    public static async RemoverExif(imageMagick: MagickWasm.IMagickImage)
    {
        for (const profileName of MagickUtil.Profiles)
        {
            const profile = imageMagick.getProfile(profileName);
            if (profile != null)
            {
                imageMagick.removeProfile("exif");
            }
        }
    }

    public static async ConverterPerfilAsync(imageMagick: MagickWasm.IMagickImage, perfilData: Uint8Array): Promise<void>
    {
        try
        {
            const icc = imageMagick.getProfile("icc");
            const iccData = icc?.getData();
            if (iccData == null || !MagickUtil.IsMesmoPerfil(iccData, perfilData))
            {
                imageMagick.setArtifact("profile:highres-transform", false);
                imageMagick.addProfile("icc", perfilData);
            }
        }
        catch (erro)
        {
            console.warn(`Falha na leitura do exif: ${erro}`);
        }
    }

    private static IsMesmoPerfil(perfilDataOrigem: Uint8Array, perfilData: Uint8Array): boolean
    {
        if (perfilDataOrigem.length === 3144)
        {
            for (let i = 0; i < 32; i++)
            {
                if (perfilDataOrigem[i] !== perfilData[i])
                {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}

