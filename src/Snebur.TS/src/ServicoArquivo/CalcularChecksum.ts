//namespace Snebur.ServicoArquivo
//{
//    export class CalcularChecksum
//    {
//        //public static BlobWorkerCheckum: Blob;
//        public static UrlBlobChecksum: string;

//        private Bytes: ArrayBuffer;
//        private Callback: CallbackResultado<string>;
//        private CallbackErro: CallbackResultado<Erro>;
//        private Worker: Worker;
        
//        public constructor(bytes: ArrayBuffer)
//        {
//            this.Bytes = bytes;
//        }

//        public CalcularAsync(callback: CallbackResultado<string>, callbackErro: CallbackResultado<Erro>): void
//        {
//            this.Callback = callback;
//            this.CallbackErro = callbackErro;

//            this.Worker = new Worker(CalcularChecksum.UrlBlobChecksum);
//            this.Worker.onmessage = this.Worker_Message.bind(this);
//            this.Worker.onerror = this.Worker_Error.bind(this);
//            this.Worker.postMessage(this.Bytes);
//        }

//        private Worker_Message(e: MessageEvent)
//        {
//            this.Worker.terminate();
//            let callback = this.Callback;
//            this.Dispose();
//            let checksum = u.ConverterUtil.ParaString(e.data);
//            callback(checksum);
//        }

//        private Worker_Error(e:Event)
//        {
//            let erro = new Erro("Erro ao calcular o checksum", this);
//            this.CallbackErro(erro);
//        }
//        //#region IDisposable

//        public Dispose(): void
//        {
//            if (this.Worker instanceof Worker)
//            {
//                this.Worker.terminate();
//            }
//            this.Bytes = null;
//            this.Callback = null;
//            this.CallbackErro = null;
//        }
//        //#endregion
//    }
//}