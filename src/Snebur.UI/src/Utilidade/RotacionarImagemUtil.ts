namespace Snebur.Imagem
{
    declare let Buffer: Buffer;

    export class RotacionarImagemUtil
    {
        public static async RotacionarUrlImagemAsync(
            urlImagem: string,
            rotacao: EnumRotacaoImagem,
            formatoImagem: EnumFormatoImagem): Promise<string>
        {
            const imagem = await ImagemLocalUtil.RetornarElementoImagemCarregadaAsync(urlImagem, false);
            //if (SistemaUtil.IsAndroidOrIOS)
            //{
            return await RotacionarImagemUtil.RotacionarImagemUsingCanvasAsync(imagem, rotacao, formatoImagem);
            //}
            //return await RotacionarImagemUtil.RotacionarImagemUsingBuffferAsync(imagem, angulo);
        }

        public static async RotacionarImagemUsingCanvasAsync(
            imagem: HTMLImageElement,
            rotacao: EnumRotacaoImagem,
            formatoImagem: EnumFormatoImagem): Promise<string>
        {
            const novaDimensao = RotacionarImagemUtil.RetornarDimensaoRotacionada({ Largura: imagem.naturalWidth, Altura: imagem.naturalHeight }, rotacao);
            const canvasOrigem = document.createElement("canvas");
            canvasOrigem.width = novaDimensao.Largura;
            canvasOrigem.height = novaDimensao.Altura;

            const context = canvasOrigem.getContext("2d");
            rotacao = u.NormalizacaoUtil.NormalizarRotacaoImagem(rotacao);
            switch (rotacao)
            {
                case EnumRotacaoImagem.Rotacao90:

                    context.translate(canvasOrigem.width / 2, canvasOrigem.height / 2);
                    context.rotate(Math.PI / 2);
                    context.drawImage(imagem, -imagem.width / 2, -imagem.height / 2);
                    context.rotate(-Math.PI / 2);
                    context.translate(-canvasOrigem.width / 2, -canvasOrigem.height / 2);
                    break;

                case EnumRotacaoImagem.Rotacao180:
                case EnumRotacaoImagem.Rotacao180AntiHorario:

                    context.rotate(Math.PI);
                    context.drawImage(imagem, -imagem.width, -imagem.height);
                    context.rotate(-Math.PI);

                    break;
                case EnumRotacaoImagem.Rotacao90AntiHorario:
                case EnumRotacaoImagem.Rotacao270:

                    context.translate(canvasOrigem.width / 2, canvasOrigem.height / 2);
                    context.rotate(-Math.PI / 2);
                    context.drawImage(imagem, -imagem.width / 2, -imagem.height / 2);
                    context.rotate(Math.PI / 2);
                    context.translate(-canvasOrigem.width / 2, -canvasOrigem.height / 2);

                    break;
                case EnumRotacaoImagem.Normal:
                case EnumRotacaoImagem.Rotacao360:
                    //n�o faz nada
                    break;
                default:
                    throw new Erro("Rota��o da imagem n�o suportada");
            }


            const mimeType = u.ImagemUtil.RetornarMimeTypeString(formatoImagem);
            const blob = await canvasOrigem.ToBlobAsync(mimeType, 1);
            return window.URL.createObjectURL(blob);
        }

        private static RetornarDimensaoRotacionada(
            dimensao: IDimensao,
            rotacao: EnumRotacaoImagem): IDimensao
        {
            if (rotacao === EnumRotacaoImagem.Rotacao90 ||
                rotacao === EnumRotacaoImagem.Rotacao90AntiHorario ||
                rotacao === EnumRotacaoImagem.Rotacao270)
            {
                return {
                    Largura: dimensao.Altura,
                    Altura: dimensao.Largura
                };
            }
            return dimensao;
        }

        public static async RotacionarImagemUsingBuffferAsync(
            imagem: HTMLImageElement,
            rotacao: EnumRotacaoImagem,
            formatoImagem: EnumFormatoImagem): Promise<string>
        {
            const canvasOrigem = document.createElement("canvas");
            canvasOrigem.width = imagem.naturalWidth;
            canvasOrigem.height = imagem.naturalHeight;

            const context = canvasOrigem.getContext("2d");
            context.imageSmoothingEnabled = false;
            context.drawImage(imagem, 0, 0);

            const imagemDataOrigem = context.getImageData(
                0, 0,
                canvasOrigem.width,
                canvasOrigem.height);

            const imagemDataDestino = RotacionarImagemUtil.RotacionarImageData(imagemDataOrigem, rotacao);

            u.ImagemUtil.LimarCanvas(canvasOrigem);

            const canvasDestino = document.createElement("canvas");
            canvasDestino.width = imagemDataDestino.width;
            canvasDestino.height = imagemDataDestino.height;

            const contextoDestino = canvasDestino.getContext("2d");
            contextoDestino.putImageData(imagemDataDestino, 0, 0);

            const mimeType = u.ImagemUtil.RetornarMimeTypeString(formatoImagem);
            const blob = await canvasDestino.ToBlobAsync(mimeType, 1);
            return window.URL.createObjectURL(blob);
        }

        public static RotacionarImageData(imageDataOrigem: ImageData, rotacao: EnumRotacaoImagem): ImageData
        {
            if (rotacao !== EnumRotacaoImagem.Normal &&
                rotacao !== EnumRotacaoImagem.Rotacao360)
            {
                let width = imageDataOrigem.width;
                let height = imageDataOrigem.height;

                let buffer = new Buffer(imageDataOrigem.data.buffer);
                let loops = rotacao / EnumRotacaoImagem.Rotacao90;
                while (loops > 0)
                {
                    const bufferDestino = Buffer.alloc(buffer.length);
                    let newOffset = 0;
                    for (let x = 0; x < width; x += 1)
                    {
                        for (let y = height - 1; y >= 0; y -= 1)
                        {
                            const offset = (width * y + x) << 2;
                            const pixel = buffer.readUInt32BE(offset, true);
                            bufferDestino.writeUInt32BE(pixel, newOffset, true);
                            newOffset += 4;
                        }
                    }
                    buffer = bufferDestino;
                    const newHeight = width;
                    width = height;
                    height = newHeight;
                    loops -= 1;
                }

                const data = new Uint8ClampedArray(buffer.buffer);
                return new ImageData(data, width, height);
            }
            return imageDataOrigem;

        }
    }

    //export enum EnumRotacaoImagem
    //{
    //    Normal = 0,
    //    _90 = 90,
    //    _90AntiHorario = -90,
    //    _180 = 180,
    //    _180AntiHorario = -180,
    //    _270 = 270,
    //    _360 = 360,
    //}
}

interface Buffer
{
    buffer: ArrayBuffer;
    new(arrayBuffer: ArrayBuffer): Buffer
    alloc(len: number): Buffer
    writeUInt32BE(value: number, offset: number, noAssert: boolean): number
    readUInt32BE(offset: number, noAssert: boolean): number
}