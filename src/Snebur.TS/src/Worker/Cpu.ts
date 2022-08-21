namespace Snebur.WebWorker
{
    export class Cpu extends Snebur.WebWorker.WorkerCliente<any, IResultadoProcessador>
    {
        private static UrlChecksum: string = "/workers/Snebur.Cpu.js?v=2";

        public static CalcularNotaProcessaadorAsync(): Promise<IResultadoProcessador>
        {
            return new Cpu().RetornarResultadoAsync(null) as Promise<IResultadoProcessador>;
        }

        public get UrlWorker(): string
        {
            return Cpu.UrlChecksum;
        }

    }
}

