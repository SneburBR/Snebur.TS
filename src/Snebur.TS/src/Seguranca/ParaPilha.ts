
namespace Snebur.Seguranca
{
    export class ParaPilha
    {
        public static ParaAsync(): Promise<void>
        {
            return new Promise<void>(resolver =>
            {
                setTimeout(() =>
                {
                    resolver();

                }, 100);
                
            });
        }

      

        private static ParaAsyncInterno(callback: Function)
        {
            const urlWorker = this.RetornarUrlWorker();
            const w = new Worker(urlWorker);

            const continuar = (function ()
            {
                setTimeout(function ()
                {
                    window.URL.revokeObjectURL(urlWorker);
                });
                setTimeout(function ()
                {
                    callback();
                });
            });

            w.addEventListener("message", continuar);
            w.addEventListener("error", continuar);
            w.postMessage("parar");
        }

        public static RetornarUrlWorker(): string
        {
            const conteudo = "self.onmessage = function (ev) { self.postMessage('ok'); } \r\n  self.onerror = function (ev) { self.postMessage('error'); } ";
            const opcoes: any = { type: "application/javascript" };
            const blob = new Blob([conteudo], opcoes);
            return window.URL.createObjectURL(blob);
        }
    }
}


