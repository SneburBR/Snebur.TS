namespace Snebur.Imagens
{
    export class FormatoImagemUtil
    {
        public static RetornarFormatoImagemAsync(arquivo: SnBlob, isIgnorarErro:boolean): Promise<d.EnumFormatoImagem>
        {
            return new Promise<d.EnumFormatoImagem>((resolve, reject) =>
            {
                const reader = new FileReader();
                reader.onload = (e) =>
                {
                    const resultado = FormatoImagemUtil.RetornarFormatoImagem(reader.result as ArrayBuffer);
                    resolve(resultado);
                };
                reader.onerror = (e) =>
                {
                    if (isIgnorarErro)
                    {
                        resolve(d.EnumFormatoImagem.Desconhecido);
                        return;
                    }
                    reject(e);
                };
                reader.readAsArrayBuffer(arquivo.Blob);
            });
        }

        public static RetornarFormatoImagem(buffer: ArrayBuffer): d.EnumFormatoImagem
        {
            //https://en.wikipedia.org/wiki/List_of_file_signatures
            const header = new Uint8Array(buffer).subarray(0, 4);
            const headerHex = Array.from(header).map(b => b.toString(16)).join("");

            if (headerHex.startsWith("ffd8"))
            {
                return d.EnumFormatoImagem.JPEG;
            }

            if (headerHex.startsWith("89504e47"))
            {
                return d.EnumFormatoImagem.PNG;
            }

            if (headerHex.startsWith("47494638"))
            {
                return d.EnumFormatoImagem.GIF;
            }

            if (headerHex.startsWith("424d"))
            {
                return d.EnumFormatoImagem.BMP;
            }

            if (headerHex.startsWith("52494646"))
            {
                return d.EnumFormatoImagem.WEBP;
            }

            if (headerHex.startsWith("49492a00") ||
                headerHex.startsWith("4d4d002a"))
            {
                return d.EnumFormatoImagem.TIFF;
            }
 
            if (headerHex.startsWith("00000100") ||
                headerHex.startsWith("00000200"))
            {
                return d.EnumFormatoImagem.ICO;
            }
             
            if (headerHex.startsWith("000000146674797069736f6d"))
            {
                return d.EnumFormatoImagem.HEIC;
            }
             
            if (headerHex.startsWith("3c737667"))
            {
                return d.EnumFormatoImagem.SVG;
            }
             
            if (headerHex.startsWith("464f524d"))
            {
                return d.EnumFormatoImagem.AVIF;
            }
             
            if (headerHex.startsWith("89504e47"))
            {
                return d.EnumFormatoImagem.APNG;
            }
             
            if (headerHex.startsWith("38425053"))
            {
                return d.EnumFormatoImagem.PSD;
            }
             
            if (headerHex.startsWith("38425053"))
            {
                return d.EnumFormatoImagem.PSB;
            }
             
            if (headerHex.startsWith("52494646"))
            {
                return d.EnumFormatoImagem.CDR;
            }
             
            if (headerHex.startsWith("25504446"))
            {
                return d.EnumFormatoImagem.PDF_AI;
            }
             
            if (headerHex.startsWith("49492a00"))
            {
                return d.EnumFormatoImagem.DNG;
            }
             
            if (headerHex.startsWith("49492a00"))
            {
                return d.EnumFormatoImagem.CR2;
            }
             
            if (headerHex.startsWith("4d4d002a"))
            {
                return d.EnumFormatoImagem.NEF;
            }
             
            if (headerHex.startsWith("4d4d002a"))
            {
                return d.EnumFormatoImagem.NRW;
            }
             
            if (headerHex.startsWith("49492a00"))
            {
                return d.EnumFormatoImagem.ARW;
            }
 
            if (headerHex.startsWith("49492a00"))
            {
                return d.EnumFormatoImagem.CRW;
            }
             
            if (headerHex.startsWith("49492a00"))
            {
                return d.EnumFormatoImagem.CR3;
            }
             
            if (headerHex.startsWith("49492a00"))
            {
                return d.EnumFormatoImagem.RAF;
            }
             
            if (headerHex.startsWith("49492a00"))
            {
                return d.EnumFormatoImagem.SR2;
            }
             
            if (headerHex.startsWith("49492a00"))
            {
                return d.EnumFormatoImagem.ORF;
            }
             
            if (headerHex.startsWith("4e4b5343"))
            {
                return d.EnumFormatoImagem.NKSC;
            }
             
            if (headerHex.startsWith("475052"))
            {
                return d.EnumFormatoImagem.GPR;
            }
             
            if (headerHex.startsWith("535257"))
            {
                return d.EnumFormatoImagem.SRW;
            }
             
            if (headerHex.startsWith("25215053"))
            {

                return d.EnumFormatoImagem.EPS;
            }

            return d.EnumFormatoImagem.Desconhecido;
        }
    }
}
