namespace Snebur
{
    export class MagickUtil
    {
        public static async  RetornarExifAsync(magickImage: MagickWasm.IMagickImage): Promise< ExitResult>
        {
            try
            {
                const exifProfile = magickImage.getProfile("exif");
                if (exifProfile != null)
                {
                    const bytes = exifProfile.getData();

                    const resultado = await exifr.parse(bytes, {
                        jfif: true,
                        tiff: true,
                        iptc: true,
                        icc: true,
                        exif: true,
                        gps: true,
                        ifd0: true,
                        interop: true,
                        silentErrors: true,
                        mergeOutput: false,
                    }, false);

                    const buffer = new Buffer(bytes);
                    const exifReader = new Exif.ExifReader(buffer);
                    const result = exifReader.result;
                    return new ExitResult(result);
                }
            }
            catch (erro)
            {
                console.warn(`Falha na leitura do exif: ${erro}`);
            }
            return null;
        }
    }
}
