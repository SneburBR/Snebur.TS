namespace Snebur.WebWorker
{
    export class GerenciadorMagickWorker
    {
        private static TOTAL_THREAD_PADRAO = 3;
        private readonly WorkersDisponivel = new List<MagickWorkerCliente>();
        private readonly WorkersOcupados = new List<MagickWorkerCliente>();
        private readonly UrlBlobWorker: string;

        private _totalThreads: number = 0;
        private _totalProcessamentoReciclar: number = 0;
        public get TotalThreas(): number
        {
            return this._totalThreads;
        }

        public get TotalProcessamentoReciclar(): number
        {
            return this._totalProcessamentoReciclar;
        }

        private constructor(urlBlobWorker: string = null)
        {
            this.UrlBlobWorker = urlBlobWorker;
            this._totalThreads = u.ProcessadorUtil.RetornarTotalThreadsWorker();
            this._totalProcessamentoReciclar = u.ProcessadorUtil.RetornarTotalProcessamentoRecilar();
            console.warn(`CARREGAMENTO IMAGENS THREADS ${this._totalThreads} - RECICLAR ${this._totalProcessamentoReciclar} `);

            this.AtualizarThreads(this.TotalThreas);
        }

        private AtualizarThreads(totalThreads: number)
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
                this.WorkersDisponivel.Add(new MagickWorkerCliente(i + 1, this.UrlBlobWorker, this.TotalProcessamentoReciclar));
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


                if (resultado?.IsSucesso)
                {
                    const impressao = resultado.ImagensCarregada.Where(x => x.TamanhoImagem === EnumTamanhoImagem.Impressao).FirstOrDefault();
                    if (impressao != null)
                    {
                        workerCliente.Reciclar();
                        console.warn(`Processado Magick Worker Thread (${workerCliente.Numero}) : Arquivo: ${opcoes?.NomeArquivoOrigem} - t ${t.TotalSeconds} `);
                        if (window.__IS_SALVAR_ARQUIVOS__IMPRESSAO__)
                        {
                            Salvar.SalvarComo(impressao.Arquivo, `MAGICK-IMPRESSAO-${opcoes?.NomeArquivoOrigem}t-${t.ElapsedMilliseconds}.${resultado.MagickFormat.toLocaleLowerCase()}`);
                        }
                    }

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
                    this.WorkersDisponivel.Add(new MagickWorkerCliente(workerCliente.Numero, this.UrlBlobWorker, this.TotalProcessamentoReciclar));
                }
            }
            return null;
        }

        private async RetornarWorkerClienteDisponivelAsync(): Promise<MagickWorkerCliente>
        {
            while (this.WorkersDisponivel.length === 0)
            {
                console.error("Esperando Worker disponível");
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


        public Recilar()
        {
            for (const worker of this.WorkersDisponivel)
            {
                worker.Reciclar();
            }
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
