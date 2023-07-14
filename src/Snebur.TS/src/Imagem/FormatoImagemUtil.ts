namespace Snebur.Imagens
{
    export class FormatoImagemUtil
    {
        public static RetornarFormatoImagemAsync(arquivo: SnBlob, isIgnorarErro: boolean): Promise<d.EnumFormatoImagem>
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


        public static RetornarFormatoImagem(arrayBuffer: ArrayBuffer): EnumFormatoImagem
        {
            const buffer = new Uint8Array(arrayBuffer).slice(0, 24);
            if (FormatoImagemUtil.IsJpeg(buffer))
            {
                return EnumFormatoImagem.JPEG;
            }
            if (FormatoImagemUtil.IsPng(buffer))
            {
                return EnumFormatoImagem.PNG;
            }
            if (FormatoImagemUtil.IsGif(buffer))
            {
                return EnumFormatoImagem.GIF;
            }
            if (FormatoImagemUtil.IsBmp(buffer))
            {
                return EnumFormatoImagem.BMP;
            }
            if (FormatoImagemUtil.IsTiff(buffer))
            {
                return EnumFormatoImagem.TIFF;
            }
            if (FormatoImagemUtil.IsIco(buffer))
            {
                return EnumFormatoImagem.ICO;
            }
            if (FormatoImagemUtil.IsHeic(buffer))
            {
                return EnumFormatoImagem.HEIC;
            }
            if (FormatoImagemUtil.IsPdfOrAi(buffer))
            {
                return EnumFormatoImagem.PDF_AI;
            }
            if (FormatoImagemUtil.IsWebp(buffer))
            {
                return EnumFormatoImagem.WEBP;
            }
            if (FormatoImagemUtil.IsSvg(buffer))
            {
                return EnumFormatoImagem.SVG;
            }
            if (FormatoImagemUtil.IsAvif(buffer))
            {
                return EnumFormatoImagem.AVIF;
            }
            if (FormatoImagemUtil.IsApng(buffer))
            {
                return EnumFormatoImagem.APNG;
            }
            if (FormatoImagemUtil.IsPsd(buffer))
            {
                return EnumFormatoImagem.PSD;
            }
            if (FormatoImagemUtil.IsPsb(buffer))
            {
                return EnumFormatoImagem.PSB;
            }
            if (FormatoImagemUtil.IsCdr(buffer))
            {
                return EnumFormatoImagem.CDR;
            }
            if (FormatoImagemUtil.IsDng(buffer))
            {
                return EnumFormatoImagem.DNG;
            }
            if (FormatoImagemUtil.IsCr2(buffer))
            {
                return EnumFormatoImagem.CR2;
            }
            if (FormatoImagemUtil.IsNef(buffer))
            {
                return EnumFormatoImagem.NEF;
            }
            if (FormatoImagemUtil.IsNrw(buffer))
            {
                return EnumFormatoImagem.NRW;
            }
            if (FormatoImagemUtil.IsArw(buffer))
            {
                return EnumFormatoImagem.ARW;
            }
            if (FormatoImagemUtil.IsCrw(buffer))
            {
                return EnumFormatoImagem.CRW;
            }
            if (FormatoImagemUtil.IsCr3(buffer))
            {
                return EnumFormatoImagem.CR3;
            }
            if (FormatoImagemUtil.IsRaf(buffer))
            {
                return EnumFormatoImagem.RAF;
            }
            if (FormatoImagemUtil.IsSr2(buffer))
            {
                return EnumFormatoImagem.SR2;
            }
            if (FormatoImagemUtil.IsOrf(buffer))
            {
                return EnumFormatoImagem.ORF;
            }
            if (FormatoImagemUtil.IsNKSC(buffer))
            {
                return EnumFormatoImagem.NKSC;
            }
            if (FormatoImagemUtil.IsGpr(buffer))
            {
                return EnumFormatoImagem.GPR;
            }
            if (FormatoImagemUtil.IsSrw(buffer))
            {
                return EnumFormatoImagem.SRW;
            }
            if (FormatoImagemUtil.IsEps(buffer))
            {
                return EnumFormatoImagem.EPS;
            }

            return EnumFormatoImagem.Desconhecido;

        }

        public static IsJpeg(buffer: Uint8Array)
        {
            return buffer[0] === 0xFF && buffer[1] === 0xD8;
        }

        public static IsPng(buffer: Uint8Array)
        {
            const pngSignature = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
            for (let i = 0; i < pngSignature.length; i++)
            {
                if (buffer[i] !==pngSignature[i])
                {
                    return false;
                }
            }
            return true;
        }

        public static IsGif(array: Uint8Array)
        {
            const textDecode = new TextDecoder();
            const buffer = textDecode.decode(array);
            return buffer[0] === "G" && buffer[1] === "I" && buffer[2] === "F" && buffer[3] === "8"
                && (buffer[4] === "7" || buffer[4] === "9") && buffer[5] === "a";
        }

        public static IsBmp(array: Uint8Array): boolean
        {
            const textDecode = new TextDecoder();
            const buffer = textDecode.decode(array);
            return buffer[0] === "B" && buffer[1] === "M";
        }

        public static IsTiff(array: Uint8Array): boolean
        {
            const textDecode = new TextDecoder();
            const buffer = textDecode.decode(array);
            return (buffer[0] === "I" && buffer[1] === "I" && array[2] === 0x2A && array[3] === 0x00)
                || (buffer[0] === "M" && buffer[1] === "M" && array[2] === 0x00 && array[3] === 0x2A);
        }

        public static IsIco(buffer: Uint8Array): boolean
        {
            return buffer[0] === 0x00 && buffer[1] === 0x00 && buffer[2] === 0x01 && buffer[3] === 0x00;
        }

        public static IsWebp(array: Uint8Array): boolean
        {
            const textDecode = new TextDecoder();
            const buffer = textDecode.decode(array);
            return buffer[8] === "W" && buffer[9] === "E" && buffer[10] === "B" && buffer[11] === "P";
        }

        public static IsSvg(array: Uint8Array): boolean
        {
            const textDecode = new TextDecoder();
            const buffer = textDecode.decode(array);
            return buffer[0] === "<" && buffer[1] === "?" && buffer[2] === "x" && buffer[3] === "m"
                && buffer[4] === "l" && buffer[5] === " " && buffer[6] === "v" && buffer[7] === "e";
        }

        public static IsAvif(buffer: Uint8Array): boolean
        {
            const signature = new Uint8Array([0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66]);
            const offset = 4;
            if (buffer.length >= offset + signature.length)
            {
                for (let i = 0; i < signature.length; i++)
                {
                    if (buffer[offset + i] !==signature[i])
                    {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

        public static IsApng(array: Uint8Array): boolean
        {
            const textDecode = new TextDecoder();
            const buffer = textDecode.decode(array);
             
            return array[0] === 0x89 && buffer[1] === "A" && buffer[2] === "P" && buffer[3] === "N"
                && buffer[4] === "G" && array[5] === 0x0D && array[6] === 0x0A && array[7] === 0x1A
                && array[8] === 0x0A;
        }

        public static IsHeic(array: Uint8Array): boolean
        {
            // Check if the first 12 bytes match the HEIF file format
            const textDecode = new TextDecoder();
            const buffer = textDecode.decode(array);
            return buffer[4] === "f" && buffer[5] === "t" && buffer[6] === "y" && buffer[7] === "p"
                && buffer[8] === "h" && buffer[9] === "e" && buffer[10] === "i" && buffer[11] === "c";
        }

        public static IsPsd(array: Uint8Array): boolean
        {
            if (array.length < 4)
            {
                return false;
            }
            const textDecode = new TextDecoder();
            const buffer = textDecode.decode(array);
            return (buffer[0] === "8" && buffer[1] === "B" && buffer[2] === "P" && buffer[3] === "S");
        }

        public static IsPsb(array: Uint8Array): boolean
        {
            const textDecode = new TextDecoder();
            const buffer = textDecode.decode(array);
            return (buffer[0] === "8" && buffer[1] === "B" && buffer[2] === "P" && buffer[3] === "T");
        }

        public static IsCdr(buffer: Uint8Array): boolean
        {
            if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46)
            {
                return true;
            }
            return false;
        }

        public static IsPdfOrAi(buffer: Uint8Array): boolean
        {
            const pdfSignature = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
            const pdfSignatureLength = pdfSignature.length;
            if (buffer.length < pdfSignatureLength)
                return false;
            for (let i = 0; i < pdfSignatureLength; i++)
            {
                if (buffer[i] !==pdfSignature[i])
                    return false;
            }
            return true;
        }
        public static IsPdf2(buffer: Uint8Array): boolean
        {
            // Check for PDF header "25 50 44 46"
            return buffer !==null && buffer.length >= 4 && buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;
        }

        public static IsDng(buffer: Uint8Array): boolean
        {
            const dngSignature = new Uint8Array([0x49, 0x49, 0x2A, 0x00, 0x10, 0x00, 0x00, 0x00]);

            for (let i = 0; i < dngSignature.length; i++)
            {
                if (buffer[i] !==dngSignature[i])
                {
                    return false;
                }
            }

            return true;
        }

        public static IsCr2(buffer: Uint8Array): boolean
        {
            const cr2Signature = new Uint8Array([0x49, 0x49, 0x2A, 0x00, 0x10, 0x00, 0x00, 0x00, 0x43, 0x52, 0x02, 0x00]);

            for (let i = 0; i < cr2Signature.length; i++)
            {
                if (buffer[i] !==cr2Signature[i])
                {
                    return false;
                }
            }

            return true;
        }

        public static IsNef(buffer: Uint8Array): boolean
        {
            const nefSignature = new Uint8Array([0x4D, 0x4D, 0x00, 0x2A, 0x00, 0x00, 0x00, 0x08, 0x00, 0x01]);

            for (let i = 0; i < nefSignature.length; i++)
            {
                if (buffer[i] !==nefSignature[i])
                {
                    return false;
                }
            }

            return true;
        }

        public static IsNrw(buffer: Uint8Array): boolean
        {
            const nrwSignature = new Uint8Array([0x49, 0x49, 0x2A, 0x00, 0x10, 0x00, 0x00, 0x00]);

            for (let i = 0; i < nrwSignature.length; i++)
            {
                if (buffer[i] !==nrwSignature[i])
                {
                    return false;
                }
            }

            return true;
        }

        public static IsArw(buffer: Uint8Array): boolean
        {
            const arwSignature = new Uint8Array([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x43, 0x52, 0x57, 0x52]);

            for (let i = 0; i < arwSignature.length; i++)
            {
                if (buffer[i] !==arwSignature[i])
                {
                    return false;
                }
            }

            return true;
        }

        public static IsCrw(buffer: Uint8Array): boolean
        {
            // 0x49, 0x49, 0x2A, 0x00, 0x10, 0x00, 0x00, 0x00 to ASCII = "II*........"
            //0x4D, 0x4D, 0x00, 0x2A, 0x00, 0x00, 0x00, 0x08 to ASCII = "MM.*...."
            const crwSignature1 = new Uint8Array([0x49, 0x49, 0x2A, 0x00, 0x10, 0x00, 0x00, 0x00]);
            const crwSignature2 = new Uint8Array([0x4D, 0x4D, 0x00, 0x2A, 0x00, 0x00, 0x00, 0x08]);

            let hasFirstSignature = true;
            for (let i = 0; i < crwSignature1.length; i++)
            {
                if (buffer[i] !==crwSignature1[i])
                {
                    hasFirstSignature = false;
                    break;
                }
            }

            let hasSecondSignature = true;
            for (let i = 0; i < crwSignature2.length; i++)
            {
                if (buffer[i] !==crwSignature2[i])
                {
                    hasSecondSignature = false;
                    break;
                }
            }

            return hasFirstSignature || hasSecondSignature;
        }

        public static IsCr3(buffer: Uint8Array): boolean
        {
            const cr3Signature = new Uint8Array([0x48, 0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00]);

            for (let i = 0; i < cr3Signature.length; i++)
            {
                if (buffer[i] !==cr3Signature[i])
                {
                    return false;
                }
            }

            return true;
        }

        public static IsRaf(buffer: Uint8Array): boolean
        {
            const rafSignature = new Uint8Array([0x46, 0x55, 0x4A, 0x49, 0x46, 0x49, 0x4C, 0x4D, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

            for (let i = 0; i < rafSignature.length; i++)
            {
                if (buffer[i] !==rafSignature[i])
                {
                    return false;
                }
            }
            return true;
        }

        public static IsSr2(buffer: Uint8Array): boolean
        {
            const sr2Signature = new Uint8Array([0x53, 0x4F, 0x4E, 0x59, 0x2D, 0x52, 0x41, 0x57, 0x20, 0x49, 0x4D, 0x41]);
            for (let i = 0; i < sr2Signature.length; i++)
            {
                if (buffer[i] !==sr2Signature[i])
                {
                    return false;
                }
            }

            return true;
        }

        public static IsOrf(buffer: Uint8Array): boolean
        {
            const orfSignature = new Uint8Array([0x49, 0x49, 0x2A, 0x00]);
            for (let i = 0; i < orfSignature.length; i++)
            {
                if (buffer[i] !==orfSignature[i])
                {
                    return false;
                }
            }
            return true;
        }

        public static IsNKSC(buffer: Uint8Array): boolean
        {
            const nkscSignature = new Uint8Array([0x3C, 0x3F, 0x78, 0x6D, 0x6C, 0x20, 0x76, 0x65]);

            
            for (let i = 0; i < nkscSignature.length; i++)
            {
                if (buffer[i] !==nkscSignature[i])
                {
                    return false;
                }
            }

            return true;
        }

        public static IsGpr(buffer: Uint8Array): boolean
        {
            const gprSignature = new Uint8Array([0x47, 0x50, 0x52, 0x0A, 0x00, 0x01, 0x00, 0x00]);

            
            for (let i = 0; i < gprSignature.length; i++)
            {
                if (buffer[i] !==gprSignature[i])
                {
                    return  false;
                }
            }

            return true;
        }

        public static IsSrw(array: Uint8Array): boolean
        {
            const textDecode = new TextDecoder();
            const buffer = textDecode.decode(array);
            return buffer[0] === "I" && buffer[1] === "I" && array[2] === 0 && array[3] === 0 &&
                buffer[8] === "S" && buffer[9] === "R" && buffer[10] === "W" && array[11] === 0;
        }

        public static IsEps(buffer: Uint8Array): boolean
        {

            if (buffer[0] === 197 &&
                buffer[1] === 208 &&
                buffer[2] === 211 &&
                buffer[3] === 198)
            {
                return true;
            }
            return (buffer[0] === 0x25 && buffer[1] === 0x21 && buffer[2] === 0x50 && buffer[3] === 0x53);
        }
    }
}
