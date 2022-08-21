//namespace Snebur.WebWorker
//{
//    export class SalvarPneg extends WorkerCliente<ISalvarPnegMensagem, Uint8Array>
//    {
//        private static readonly UrlWorker: string = "/Scripts/Snebur.SalvarPneg.js";

//        public static RetornarBytesAsync(imagemData: ImageData): Promise<Uint8Array>
//        {
//            let mensagem: ISalvarPnegMensagem = { ImagemData: imagemData };
//            return new SalvarPneg().RetornarResultadoAsync(mensagem);
//        }

//        public get UrlWorker(): string
//        {
//            return SalvarPneg.UrlWorker;
//        }
//    }
//}
