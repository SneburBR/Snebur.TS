﻿namespace Snebur.Utilidade
{
    export class EfeitoImagemUtil
    {

        private static SepiaVermelho: Array<number> = [0, 0, 0, 1, 1, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 19, 19, 20, 21, 22, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 44, 45, 47, 48, 49, 52, 54, 55, 57, 59, 60, 62, 65, 67, 69, 70, 72, 74, 77, 79, 81, 83, 86, 88, 90, 92, 94, 97, 99, 101, 103, 107, 109, 111, 112, 116, 118, 120, 124, 126, 127, 129, 133, 135, 136, 140, 142, 143, 145, 149, 150, 152, 155, 157, 159, 162, 163, 165, 167, 170, 171, 173, 176, 177, 178, 180, 183, 184, 185, 188, 189, 190, 192, 194, 195, 196, 198, 200, 201, 202, 203, 204, 206, 207, 208, 209, 211, 212, 213, 214, 215, 216, 218, 219, 219, 220, 221, 222, 223, 224, 225, 226, 227, 227, 228, 229, 229, 230, 231, 232, 232, 233, 234, 234, 235, 236, 236, 237, 238, 238, 239, 239, 240, 241, 241, 242, 242, 243, 244, 244, 245, 245, 245, 246, 247, 247, 248, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255];
        private static SepiaVerde: Array<number> = [0, 0, 1, 2, 2, 3, 5, 5, 6, 7, 8, 8, 10, 11, 11, 12, 13, 15, 15, 16, 17, 18, 18, 19, 21, 22, 22, 23, 24, 26, 26, 27, 28, 29, 31, 31, 32, 33, 34, 35, 35, 37, 38, 39, 40, 41, 43, 44, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77, 79, 80, 81, 83, 84, 85, 86, 88, 89, 90, 92, 93, 94, 95, 96, 97, 100, 101, 102, 103, 105, 106, 107, 108, 109, 111, 113, 114, 115, 117, 118, 119, 120, 122, 123, 124, 126, 127, 128, 129, 131, 132, 133, 135, 136, 137, 138, 140, 141, 142, 144, 145, 146, 148, 149, 150, 151, 153, 154, 155, 157, 158, 159, 160, 162, 163, 164, 166, 167, 168, 169, 171, 172, 173, 174, 175, 176, 177, 178, 179, 181, 182, 183, 184, 186, 186, 187, 188, 189, 190, 192, 193, 194, 195, 195, 196, 197, 199, 200, 201, 202, 202, 203, 204, 205, 206, 207, 208, 208, 209, 210, 211, 212, 213, 214, 214, 215, 216, 217, 218, 219, 219, 220, 221, 222, 223, 223, 224, 225, 226, 226, 227, 228, 228, 229, 230, 231, 232, 232, 232, 233, 234, 235, 235, 236, 236, 237, 238, 238, 239, 239, 240, 240, 241, 242, 242, 242, 243, 244, 245, 245, 246, 246, 247, 247, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 255];
        private static SepiaAzul: Array<number> = [53, 53, 53, 54, 54, 54, 55, 55, 55, 56, 57, 57, 57, 58, 58, 58, 59, 59, 59, 60, 61, 61, 61, 62, 62, 63, 63, 63, 64, 65, 65, 65, 66, 66, 67, 67, 67, 68, 69, 69, 69, 70, 70, 71, 71, 72, 73, 73, 73, 74, 74, 75, 75, 76, 77, 77, 78, 78, 79, 79, 80, 81, 81, 82, 82, 83, 83, 84, 85, 85, 86, 86, 87, 87, 88, 89, 89, 90, 90, 91, 91, 93, 93, 94, 94, 95, 95, 96, 97, 98, 98, 99, 99, 100, 101, 102, 102, 103, 104, 105, 105, 106, 106, 107, 108, 109, 109, 110, 111, 111, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 119, 121, 121, 122, 122, 123, 124, 125, 126, 126, 127, 128, 129, 129, 130, 131, 132, 132, 133, 134, 134, 135, 136, 137, 137, 138, 139, 140, 140, 141, 142, 142, 143, 144, 145, 145, 146, 146, 148, 148, 149, 149, 150, 151, 152, 152, 153, 153, 154, 155, 156, 156, 157, 157, 158, 159, 160, 160, 161, 161, 162, 162, 163, 164, 164, 165, 165, 166, 166, 167, 168, 168, 169, 169, 170, 170, 171, 172, 172, 173, 173, 174, 174, 175, 176, 176, 177, 177, 177, 178, 178, 179, 180, 180, 181, 181, 181, 182, 182, 183, 184, 184, 184, 185, 185, 186, 186, 186, 187, 188, 188, 188, 189, 189, 189, 190, 190, 191, 191, 192, 192, 193, 193, 193, 194, 194, 194, 195, 196, 196, 196, 197, 197, 197, 198, 199];

        //public static RetornarUrlBlobPretoBrancoAsync(url: string): Promise<string>;
        //public static RetornarUrlBlobPretoBrancoAsync(totalMilisegundos: number): Promise<string>;
        //public static RetornarUrlBlobPretoBrancoAsync(argumento: any): Promise<string>
        //{
        //    let totalMilisegundos = 1000
        //    return new Promise<string>(resolver =>
        //    {
        //        setTimeout(function ()
        //        {
        //            resolver("teste");

        //        }, totalMilisegundos);
        //    });
        //}

        public static async RetornarUrlBlobPretoBrancoAsync(url: string): Promise<string>
        public static async RetornarUrlBlobPretoBrancoAsync(elementoImagem: HTMLImageElement): Promise<string>
        public static async RetornarUrlBlobPretoBrancoAsync(argumento: string | HTMLImageElement): Promise<string>
        {
            const urlImagem = (argumento instanceof HTMLImageElement) ? argumento.src : argumento.toString();
            const elementoImagem = await i.ImagemMemoria.RetornarNovoElementoImagemCarregadaAsync(urlImagem);
            const canvas = EfeitoImagemUtil.RetornarCanvasPretoBranco(elementoImagem);
            const urlResultado = await w.SalvarJpeg.RetornarUrlBlobAsync(canvas);
            return urlResultado;
        }

        //private static AAA(argumento: string | HTMLImageElement): Promise<string>
        //{
        //    if (argumento instanceof HTMLImageElement && ui.ElementoUtil.IsImagmeCarregada(argumento))
        //    {

        //        let canvas = EfeitoImagemUtil.RetornarCanvasPretoBanco(argumento);
        //        return w.SalvarJpeg.RetornarUrlBlobAsync(canvas);
        //    }
        //    else
        //    {
        //        let url = (argumento instanceof HTMLImageElement) ? argumento.src : argumento.toString();
        //        let elementoImagem = new Image();
        //        elementoImagem.addEventListener(ui.EnumEventoDom.Load, function ()
        //        {
        //            let canvas = EfeitoImagemUtil.RetornarCanvasPretoBanco(elementoImagem);
        //            canvas.toBlob((blobImagem: Blob) =>
        //            {
        //                let url = window.URL.createObjectURL(blobImagem);
        //                resolver(url);

        //            }, u.ImagemUtil.FORMATO_JPEG, 0.9);
        //        });
        //        elementoImagem.addEventListener(ui.EnumEventoDom.Error, function (e: ErrorEvent)
        //        {
        //            if (e.error instanceof Error)
        //            {
        //                throw e.error;
        //            }
        //            throw new Erro(e.message);


        //        });
        //        elementoImagem.crossOrigin = "anonymous";
        //        elementoImagem.src = url;
        //    }
        //}

        private static RetornarCanvasPretoBranco(elementoImagem: HTMLImageElement): HTMLCanvasElement
        {
            const canvas = document.createElement("canvas") as HTMLCanvasElement;
            canvas.width = elementoImagem.width;
            canvas.height = elementoImagem.height;

            const contexto = canvas.getContext("2d");
            contexto.imageSmoothingEnabled = false;
            contexto.drawImage(elementoImagem, 0, 0, elementoImagem.width, elementoImagem.height);

            const imagemData = contexto.getImageData(0, 0, elementoImagem.width, elementoImagem.height);
            const pixels = imagemData.data;

            for (let i = 0; i < pixels.length; i += 4)
            {
                const cinza = 0.34 * pixels[i] + 0.5 * pixels[i + 1] + 0.16 * pixels[i + 2];
                // red
                pixels[i] = cinza;
                // green
                pixels[i + 1] = cinza;
                // blue
                pixels[i + 2] = cinza;
            }
            contexto.putImageData(imagemData, 0, 0);
            return canvas;
        }



        public static async RetornarUrlBlobSepiaAsync(elementoImagem: HTMLImageElement): Promise<string>
        public static async RetornarUrlBlobSepiaAsync(url: string): Promise<string>
        public static async RetornarUrlBlobSepiaAsync(argumento: any): Promise<string>
        {
            const urlImagem = (argumento instanceof HTMLImageElement) ? argumento.src : argumento.toString();
            const elementoImagem = await i.ImagemMemoria.RetornarNovoElementoImagemCarregadaAsync(urlImagem);
            const canvas = EfeitoImagemUtil.RetornarCanvasSepia(elementoImagem);
            const urlResultado = await w.SalvarJpeg.RetornarUrlBlobAsync(canvas);
            return urlResultado;
        }

        private static RetornarCanvasSepia(elementoImagem: HTMLImageElement): HTMLCanvasElement
        {
            const canvas = document.createElement("canvas") as HTMLCanvasElement;
            canvas.width = elementoImagem.width;
            canvas.height = elementoImagem.height;

            const contexto = canvas.getContext("2d");
            contexto.imageSmoothingEnabled = false;
            contexto.drawImage(elementoImagem, 0, 0, elementoImagem.width, elementoImagem.height);

            const imagemData = contexto.getImageData(0, 0, elementoImagem.width, elementoImagem.height);
            const pixels = imagemData.data;

            for (let i = 0; i < pixels.length; i += 4)
            {
                // red
                pixels[i] = EfeitoImagemUtil.SepiaVermelho[pixels[i]];
                // green
                pixels[i + 1] = EfeitoImagemUtil.SepiaVerde[pixels[i + 1]];
                // blue
                pixels[i + 2] = EfeitoImagemUtil.SepiaAzul[pixels[i + 2]];
            }
            contexto.putImageData(imagemData, 0, 0);
            return canvas;
        }


    }

}