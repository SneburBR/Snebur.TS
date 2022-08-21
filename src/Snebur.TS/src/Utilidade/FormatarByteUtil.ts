namespace Snebur.Utilidade
{
    export class FormatarByteUtil
    {

        public static TOTAL_BYTES_KB: number = 1024;
        public static TOTAL_BYTES_MB: number = FormatarByteUtil.TOTAL_BYTES_KB * 1024;
        public static TOTAL_BYTES_GB: number = FormatarByteUtil.TOTAL_BYTES_MB * 1024;
        public static TOTAL_BYTES_TB: number = FormatarByteUtil.TOTAL_BYTES_GB * 1024;

        public static Formatar(totalBytes: number): string
        public static Formatar(totalBytes: number, formato: EnumFormatoByte): string
        public static Formatar(totalBytes: number, formato?: EnumFormatoByte): string
        {
            totalBytes = u.ConverterUtil.ParaNumero(totalBytes);
            const formatoNormalizado: EnumFormatoByte = this.NormalizarFormato(totalBytes, formato);
            return FormatarByteUtil.FormatarInterno(totalBytes, formatoNormalizado);
        }

        private static NormalizarFormato(totalBytes: number, formato: EnumFormatoByte): EnumFormatoByte
        {
            if (EnumUtil.IsDefindo(EnumFormatoByte, formato))
            {
                return formato;
            }

            if (totalBytes < FormatarByteUtil.TOTAL_BYTES_KB)
            {
                return EnumFormatoByte.Bytes;
            }

            if (totalBytes < FormatarByteUtil.TOTAL_BYTES_MB)
            {
                return EnumFormatoByte.Kilobytes;
            }

            if (totalBytes < FormatarByteUtil.TOTAL_BYTES_GB)
            {
                return EnumFormatoByte.Megabytes;
            }

            if (totalBytes < FormatarByteUtil.TOTAL_BYTES_TB)
            {
                return EnumFormatoByte.Gigabytes;
            }

            return EnumFormatoByte.Terabytes;
        }

        private static FormatarInterno(totalBytes: number, formato: EnumFormatoByte): string
        {
            switch (formato)
            {
                case EnumFormatoByte.Bytes:

                    return `${totalBytes.toString()} bytes`;

                case EnumFormatoByte.Kilobytes:

                    return `${u.FormatacaoUtil.FormatarDecimal(FormatarByteUtil.ConverterParaKB(totalBytes))} Kb`;

                case EnumFormatoByte.Megabytes:

                    return `${u.FormatacaoUtil.FormatarDecimal(FormatarByteUtil.ConverterParaMB(totalBytes))} Mb`;

                case EnumFormatoByte.Gigabytes:

                    return `${u.FormatacaoUtil.FormatarDecimal(FormatarByteUtil.ConverterParaGB(totalBytes))} Gb`;

                case EnumFormatoByte.Terabytes:

                    return `${u.FormatacaoUtil.FormatarDecimal(FormatarByteUtil.ConverterParaGB(totalBytes))} Tb`;

                default:

                    throw new ErroNaoSuportado("Formato não suportado.", this);
            }
        }

        public static ConverterParaKB(totalBytes: number): number
        {
            return totalBytes / FormatarByteUtil.TOTAL_BYTES_KB;
        }

        public static ConverterParaMB(totalBytes: number): number
        {
            return totalBytes / FormatarByteUtil.TOTAL_BYTES_MB;
        }

        public static ConverterParaGB(totalBytes: number): number
        {
            return totalBytes / FormatarByteUtil.TOTAL_BYTES_GB;
        }

        public static ConverterParaTB(totalBytes: number): number
        {
            return totalBytes / FormatarByteUtil.TOTAL_BYTES_TB;
        }
    }
}