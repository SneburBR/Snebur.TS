namespace Snebur.WebWorker
{
    export abstract class WorkerCliente<TMensagem = any, TResultado = any>
    {
        protected abstract UrlWorker: string;
        protected constructor()
        {

        }

        public RetornarResultadoAsync<TResultadoFinal = TResultado>(mensagem: TMensagem, argumento: any = null): Promise<TResultadoFinal | Error>
        {
            return new Promise<TResultadoFinal>(this.Promise_Resolver.bind(this, mensagem, argumento));
        }

        private async Promise_Resolver(mensagem: TMensagem, argumento: any, resolver: (resultado: TResultado | Error) => void) 
        {
            const workerInterno = new WorkerClienteInterno(this.UrlWorker);
            await workerInterno.InicializarAsync();
            const callback = async (resultado: TResultado | Error) =>
            {
                resultado = await this.NormalizarResultado(mensagem, resultado, argumento);
                resolver(resultado);
            };
            workerInterno.EnviarMensagem(mensagem, callback);
        }

        protected NormalizarResultado(mensagem: TMensagem, resultado: TResultado | Error, argumento: any): Promise<TResultado | Error> | TResultado | Error
        {
            return resultado;
        }
    }
}