namespace Snebur.Imagens
{
    export class ExifUtil
    {
        public static async RetornarNomePerfilCorExifAsync(arquivo: SnBlob): Promise<InfoPerfilCor>
        {
            const formatoImagem = await FormatoImagemUtil.RetornarFormatoImagemAsync(arquivo, true);
            try
            {
                const resultado = await exifr.parse(arquivo.Blob, {
                    jfif: true,
                    tiff: true,
                    iptc: false,
                    icc: true,
                    exif: false,
                    gps: false,
                    ifd0: true,
                    interop: false,
                    silentErrors: true,
                    mergeOutput: false,
                }, false);

                const colorSpace: ColorSpaceData =
                    resultado.icc?.ColorSpaceData ??
                    ColorSpaceData.Desconhecido;
              
                return {
                    Nome: resultado.icc?.ProfileDescription,
                    ColorSpace: colorSpace,
                    FormatoImagem: formatoImagem
                };
            }
            catch {

                return {
                    Nome: null,
                    ColorSpace: ColorSpaceData.Desconhecido,
                    FormatoImagem: formatoImagem
                };
            }
        }


        public static async RetornarExifAsync(bytes: Uint8Array): Promise<ExifrJS.MargeOutput>
        {
            try
            {
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

                return resultado;
            }
            catch
            {
                return null;
            }
        }

        public static RetornarRotacaoExifInterno(orientacaoExif: number): number
        {
            switch (orientacaoExif)
            {
                case 1:
                    return 0;
                case 2:
                    return 0;
                case 3:
                    return 180;
                case 4:
                    return 180;
                case 5:
                    return 90;
                case 6:
                    return 90;
                case 7:
                    return 270;
                case 8:
                    return 270;

                default:

                    return 0;
            }
        }
    }

    export interface InfoPerfilCor
    {
        FormatoImagem: EnumFormatoImagem,
        Nome?: string;
        ColorSpace: ColorSpaceData;
    }


}
