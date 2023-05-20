namespace Snebur.WebWorker
{
    export class GerenciadorMagickWorker
    {
        private static TOTAL_THREAD_PADRAO = 3;
        private readonly WorkersDisponivel = new List<MagickWorkerCliente>();
        private readonly WorkersOcupados = new List<MagickWorkerCliente>();
        private readonly UrlBlobWorker: string;

        private _totalThreads: number = 0;
        public get TotalThreas(): number
        {
            return this._totalThreads;
        }

        private constructor(urlBlobWorker: string = null)
        {
            this.UrlBlobWorker = urlBlobWorker;
            this.AtualizarThreads(GerenciadorMagickWorker.TOTAL_THREAD_PADRAO);
        }

        public AtualizarThreads(totalThreads: number)
        {
            if (this.WorkersOcupados.Count > 0)
            {
                console.error("O Gerenciador do worker está ocupado, espera desocupar para atualizar as threads");
                return;
            }

            this.WorkersDisponivel.forEach(x => x.Dispose());
            this.WorkersDisponivel.Clear();
            this.WorkersOcupados.Clear();
            this._totalThreads = totalThreads;

            for (let i = 0; i < this.TotalThreas; i++)
            {
                this.WorkersDisponivel.Add(new MagickWorkerCliente(i + 1, this.UrlBlobWorker));
            }
        }

        public async ProcessarAsync(opcoes: IOpcoesMagick): Promise<IResultadoMagick | null>
        {
            const workerCliente = await this.RetornarWorkerClienteDisponivelAsync();
            let isSucesso: boolean = false;
            try
            {
                const t = Stopwatch.StartNew();
                const resultado = await workerCliente.ProcessarAsync(opcoes);

                const memory = (performance as any).memory;
                if (memory != null)
                {
                    const totalJSHeapSize = FormatacaoUtil.FormatarBytes(memory.totalJSHeapSize);
                    const usedJSHeapSize = FormatacaoUtil.FormatarBytes(memory.usedJSHeapSize);
                    const jsHeapSizeLimit = FormatacaoUtil.FormatarBytes(memory.jsHeapSizeLimit);
                    console.warn(`Memória totalJSHeapSize: ${totalJSHeapSize} - usedJSHeapSize:${usedJSHeapSize} - jsHeapSizeLimit:${jsHeapSizeLimit}`);
                }

                if (resultado.IsSucesso)
                {
                    console.warn(`Processado Magick Worker Thread (${workerCliente.Numero}) : Arquivo: ${opcoes?.NomeArquivoOrigem} - t ${t.TotalSeconds} {} `);
                    isSucesso = true;
                    return resultado;
                }
            }
            catch (erro)
            {
                DebugUtil.ThrowAndContinue("Falha no gerenciador do worker" + erro);
            }
            finally
            {
                this.WorkersOcupados.Remove(workerCliente);
                if (isSucesso === true)
                {
                    this.WorkersDisponivel.Add(workerCliente);
                }
                else
                {
                    workerCliente.Dispose();
                    this.WorkersDisponivel.Add(new MagickWorkerCliente(workerCliente.Numero, this.UrlBlobWorker));
                }
            }
            return null;
        }

        private async RetornarWorkerClienteDisponivelAsync(): Promise<MagickWorkerCliente>
        {
            while (this.WorkersDisponivel.length === 0)
            {
                await ThreadUtil.EsperarAsync(100);
            }

            const proximoWorker = this.WorkersDisponivel.shift();
            if (proximoWorker instanceof MagickWorkerCliente)
            {
                this.WorkersOcupados.Add(proximoWorker);
                return proximoWorker;
            }
            DebugUtil.ThrowAndContinue("Operação invalida na fila worker ");
            return this.RetornarWorkerClienteDisponivelAsync();
        }


        //#region Instancia

        private static _instancia: GerenciadorMagickWorker = null;
        public static get Instancia(): GerenciadorMagickWorker
        {
            if (GerenciadorMagickWorker._instancia == null)
            {
                GerenciadorMagickWorker._instancia = new GerenciadorMagickWorker(i.MagickInitUtil.UrlBlobMagickWorker);
            }
            return GerenciadorMagickWorker._instancia;
        }

        //#endregion
    }
}
