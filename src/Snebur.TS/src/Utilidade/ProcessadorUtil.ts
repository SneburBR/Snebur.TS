namespace Snebur.Utilidade
{
    export class ProcessadorUtil
    {
        public static async CalcularNotaProcessaadorAsync(isMainThread: boolean): Promise<{ MainThread: w.IResultadoProcessador; Worker: w.IResultadoProcessador }>
        {
            const worker = await w.Cpu.CalcularNotaProcessaadorAsync();
            if ($Configuracao.IsDebug || $Configuracao.IsTeste)
            {
                const estilo = "color:blue;font-family:system-ui;font-size:25px;-webkit-text-stroke: 1px black;font-weight:bold";
                console.LogDebug("%cWORKER TEMPO : " + worker.Tempo + " ms", estilo);
                console.LogDebug("%cWORKER TOTAL OPERAÇÕES 1s: " + worker.Total, estilo);
            }

            let mainThread = null;
            if (isMainThread)
            {
                const tempo = ProcessadorUtil.fib(40);
                const totalOpacoes = ProcessadorUtil.dist(1000);

                mainThread = {
                    Tempo: tempo,
                    Total: totalOpacoes
                };

                if ($Configuracao.IsDebug || $Configuracao.IsTeste)
                {
                    const estilo = "color:red;font-family:system-ui;font-size:25px;-webkit-text-stroke: 1px black;font-weight:bold";
                    console.LogDebug("%cMAINTHREAD TEMPO : " + tempo + " ms", estilo);
                    console.LogDebug("%cMAINTHREAD TOTAL OPERAÇÕES 1s: " + totalOpacoes, estilo);
                }
            }

            return {
                MainThread: mainThread,
                Worker: worker
            };
        }

        private static getRandomLocations(n: number): Array<{ x: number; y: number }>
        {
            let m_w = 123456789;
            let m_z = 987654321;
            const mask = 0xffffffff;

            const random = () =>
            {
                m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
                m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
                let result = ((m_z << 16) + m_w) & mask;
                result /= 4294967296;
                return result + 0.5;
            };

            const locs = [];
            for (let i = 0; i < n; i++)
            {
                locs.push({
                    x: random() * 100,
                    y: random() * 100
                });
            }
            return locs;
        }

        public static distBenchmark(timeLimit: number): number
        {
            const locs = ProcessadorUtil.getRandomLocations(10);
            const start = Date.now();
            let ops = 0;
            let curTime = Date.now();
            while (curTime < start + timeLimit)
            {
                const dists = [];
                locs.forEach(a => locs.forEach(b =>
                {
                    const d = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
                    dists.push(d);
                }));
                ops++;
                curTime = Date.now();
            }
            return ops;
        }

        private static fibonacci(i: number): number
        {
            if (i <= 1) return i;
            return ProcessadorUtil.fibonacci(i - 1) + ProcessadorUtil.fibonacci(i - 2);
        }

        private static fibBenchmark(i: number): number
        {
            const start = Date.now();
            ProcessadorUtil.fibonacci(i);
            const end = Date.now();
            return end - start;
        }

        private static fib(n: number): number
        {
            return ProcessadorUtil.fibBenchmark(n);
        }

        private static dist(n: number): number
        {
            return ProcessadorUtil.distBenchmark(n);
        }

        public static RetornarTotalThreadsWorker(): number
        {
            if (navigator.hardwareConcurrency >= 16)
            {
                return 4;
            }

            if (navigator.hardwareConcurrency >= 8)
            {
                return 3;
            }

            if (navigator.hardwareConcurrency >= 4)
            {
                return 2;
            }
            return 1;
        }

        public static RetornarTotalProcessamentoRecilar(): number
        {
            const memory = (performance as any).memory;
            if (memory != null)
            {
                const totalGb = u.FormatarByteUtil.ConverterParaGB(memory.jsHeapSizeLimit);
                if (totalGb > 0 && isFinite(totalGb))
                {
                    if (totalGb >= 3.9)
                    {
                        return 6;
                    }

                    if (totalGb >= 3)
                    {
                        return 5;
                    }

                    if (totalGb >= 2)
                    {
                        return 4;
                    }

                    if (totalGb >= 1.5)
                    {
                        return 3;
                    }

                    if (totalGb >= 0.5)
                    {
                        return 2;
                    }
                    return 1;
                }
            }
            return 3;
        }

    }


}
