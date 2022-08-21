namespace Snebur.Utilidade
{
    export class ThreadUtil
    {
        public static EsperarAsync(tempo: TimeSpan): Promise<void>
        public static EsperarAsync(totalMilisegundos: number): Promise<void>
        public static EsperarAsync(argumento: any): Promise<void>  
        {
            const totalMilisegundos = Math.max(ThreadUtil.RetornarTotalMilesegundos(argumento), 0);
            return new Promise<void>(resolver =>
            {
                setTimeout(function ()
                {
                    resolver();
                }, totalMilisegundos);
            });
        }

        /**Quebrar, a pilha das chamadas (callstack), 
         * Elementos adicionar neste pilhas serão  renderizados pelo navegador*/

        public static QuebrarAsync(): Promise<void> 
        {
            return this.EsperarAsync(0);
        }

        public static async BloquearAsync(thisArgs: any, condicaoBloquear: () => boolean): Promise<null>
        public static async BloquearAsync(thisArgs: any, condicaoBloquear: () => boolean, timeout: number): Promise<Error | null>
        public static async BloquearAsync(thisArgs: any, condicaoBloquear: () => boolean, timeout: number = Number.Int32MaxValue): Promise<Error | null>
        {
            await ThreadUtil.QuebrarAsync();
            const stopWatch = Stopwatch.StartNew();
            while (condicaoBloquear.call(thisArgs))
            {
                if (timeout > 0)
                {
                    if (stopWatch.ElapsedMilliseconds > timeout)
                    {
                        stopWatch.Stop();
                        const mensagem = `Tempo limite atingido: ${timeout}ms `;
                        console.warn(mensagem);
                        return new Error(mensagem);
                    }
                }
                await u.ThreadUtil.EsperarAsync(200);
            }
            stopWatch.Stop();
            return null;
        }

        public static ExecutarAsync(manipulador: Function): void
        public static ExecutarAsync(manipulador: Function, tempoInicializar: number): void
        public static ExecutarAsync(manipulador: Function, tempoInicializar: number = 10): void
        {
            setTimeout(manipulador, tempoInicializar);
        }

        public async RepetirAsyc(quantidade: number, intervalo: number, callback: (n: number) => void)
        {
            for (let i = 1; i <= quantidade; i++)
            {
                await ThreadUtil.EsperarAsync(intervalo);
                callback(i);
            }
        }

        private static RetornarTotalMilesegundos(tempo: TimeSpan): number
        private static RetornarTotalMilesegundos(totalMilisegundos: number): number
        private static RetornarTotalMilesegundos(argumento: any): number
        {
            if (!u.ValidacaoUtil.IsDefinido(argumento))
            {
                throw new ErroNaoDefinido("O argumento não foi definido", this);
            }
            if (argumento instanceof TimeSpan)
            {
                return argumento.TotalMilliseconds;
            }
            else if (typeof argumento === "number")
            {
                return argumento;
            }
            else
            {
                throw new ErroNaoSuportado(`O 'argumento' não foi suportado`, this);
            }
        }
    }

    
}