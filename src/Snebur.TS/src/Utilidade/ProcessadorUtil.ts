namespace Snebur.Utilidade
{
    export class ProcessadorUtil
    {
        public static async CalcularNotaProcessaador(): Promise<{ MainThread: w.IResultadoProcessador; Worker: w.IResultadoProcessador }>
        {
            const tempo = ProcessadorUtil.fib(40);
            const totalOpacoes = ProcessadorUtil.dist(1000);

            const mainThread = {
                Tempo: tempo,
                Total: totalOpacoes
            };

            const worker = await w.Cpu.CalcularNotaProcessaadorAsync();

            if ($Configuracao.IsDebug || $Configuracao.IsTeste)
            {
                let estilo = "color:red;font-family:system-ui;font-size:25px;-webkit-text-stroke: 1px black;font-weight:bold";
                console.log("%cMAINTHREAD TEMPO : " + tempo + " ms", estilo);
                console.log("%cMAINTHREAD TOTAL OPERAÇÕES 1s: " + totalOpacoes, estilo);

                estilo = "color:blue;font-family:system-ui;font-size:25px;-webkit-text-stroke: 1px black;font-weight:bold";
                console.log("%cWORKER TEMPO : " + worker.Tempo + " ms", estilo);
                console.log("%cWORKER TOTAL OPERAÇÕES 1s: " + worker.Total, estilo);

                if (u.SistemaUtil.IsAndroidOrIOS)
                {
                    let info = `Mainthread Tempo ${tempo}ms, \r\n total operações em 1s : ${totalOpacoes}`;
                    info += `\rWorker Tempo ${worker.Tempo}ms, \r\n total operações em 1s : ${worker.Total}`;
                    alert(info);
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
            const start = new Date().getTime();
            let ops = 0;
            let curTime = new Date().getTime();
            while (curTime < start + timeLimit)
            {
                const dists = [];
                locs.forEach(a => locs.forEach(b =>
                {
                    const d = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
                    dists.push(d);
                }));
                ops++;
                curTime = new Date().getTime();
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
            const start = new Date().getTime();
            ProcessadorUtil.fibonacci(i);
            const end = new Date().getTime();
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

    }


}
