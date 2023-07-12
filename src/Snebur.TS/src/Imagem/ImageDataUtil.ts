namespace Snebur
{
    export class ImageDataUtil
    {
        public static IsCanvasImagemBrancaOuPreta(canvas: HTMLCanvasElement): boolean
        {
            const contexto = canvas.getContext("2d");
            const imageData = contexto.getImageData(0, 0, canvas.width, canvas.height);
            return ImageDataUtil.IsImagemBrancaOuPreta(imageData);
        }

        public static IsImagemBrancaOuPreta(imageData: ImageData): boolean
        {
            return ImageDataUtil.IsImageDateBranca(imageData) ||
                ImageDataUtil.IsImageDataPreta(imageData);
        }

        private static IsImageDateBranca(imageData: ImageData): boolean
        {
            if (imageData == null)
            {
                return true;
            }

            const data = imageData.data;
            const length = data.length;
            let i = 0;

            while (i < length)
            {
                if (!(data[i] > 245 &&
                    data[i + 1] > 245 &&
                    data[i + 2] > 245 &&
                    data[i + 3] > 245))
                {
                    return false;
                }
                i += 4;
            }
            return true;
        }

        private static IsImageDataPreta(imageData: ImageData): boolean
        {
            if (imageData == null)
            {
                return true;
            }
            const data = imageData.data;
            const length = data.length;
            let i = 0;

            while (i < length)
            {
                if (!(data[i] < 10 &&
                    data[i + 1] < 10 &&
                    data[i + 2] < 10))
                {
                    return false;
                }
                i += 4;
            }
            return true;
        }
    }
}
