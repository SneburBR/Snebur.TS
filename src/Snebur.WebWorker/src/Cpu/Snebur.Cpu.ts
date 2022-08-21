

self.onmessage = function (e: MessageEvent)
{
    const resultado = ProcessadorUtil.CalcularNotaProcessaador();
    self.postMessage(resultado);

};

class ProcessadorUtil
{
    public static CalcularNotaProcessaador(): Snebur.WebWorker.IResultadoProcessador
    {
        const tempo = ProcessadorUtil.fib(40);
        const total = ProcessadorUtil.dist(1000);
        return {
            Tempo: tempo,
            Total: total
        };

    }
    private static getRandomLocations(n: number): Array<{ x: number, y: number }>
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