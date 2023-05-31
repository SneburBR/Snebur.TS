namespace Snebur.ServicoArquivo
{
    export abstract class BaseTarefaEnviarArquivo extends Snebur.Tarefa.BaseTarefa
    {
        //#region Propriedade - NotificarPropriedadeAlterada

        protected static TAMANHO_PACOTE_PRODUCAO: number = 128 * 1024;
        protected static TAMANHO_PACOTE_DEBUG: number = 32 * 1024;

        protected static TEMPO_ESPERA_ENVIO_PROXIMO_PACOTE_PRODUCAO: number = 0;
        protected static TEMPO_ESPERA_ENVIO_PROXIMO_PACOTE_DEBUG: number = 0;

        private _tamanhoPacote: number = null;
        private _tempoEsperarEnvioProximoPacote: number = null;

        private _nomeArquivo: string;
        private _totalBytesLocal: number;
        private _descricaoStatus: string;
        private _checksum: string;
        private _totalBytes: number;

        private IsEnviandoPacote = false;

        public get NomeArquivo(): string
        {
            return this._nomeArquivo;
        }

        public set NomeArquivo(value: string)
        {
            this.NotificarPropriedadeAlterada("NomeArquivo", this._nomeArquivo, this._nomeArquivo = value);
        }

        public get DescricaoStatus(): string
        {
            return this._descricaoStatus;
        }

        public set DescricaoStatus(value: string)
        {
            this.NotificarPropriedadeAlterada("DescricaoStatus", this._descricaoStatus, value);
            this._descricaoStatus = value;
        }

        public get TotalBytesLocal(): number
        {
            return this._totalBytesLocal;
        }

        public set TotalBytesLocal(value: number)
        {
            this.NotificarPropriedadeAlterada("TotalBytesLocal", this._totalBytesLocal, this._totalBytesLocal = value);
        }

        public get TotalBytes(): number
        {
            return this._totalBytes;
        }

        public set TotalBytes(value: number)
        {
            this.NotificarPropriedadeAlterada("TotalBytes", this._totalBytes, this._totalBytes = value);
        }

        public get Checksum(): string
        {
            return this._checksum;
        }

        public set Checksum(value: string)
        {
            this._checksum = value;
        }


        private get TempoEsperarEnvioProximoPacote(): number
        {
            if (this._tempoEsperarEnvioProximoPacote == null)
            {
                this._tempoEsperarEnvioProximoPacote = ($Configuracao.IsDebug) ?
                    BaseTarefaEnviarArquivo.TEMPO_ESPERA_ENVIO_PROXIMO_PACOTE_DEBUG :
                    BaseTarefaEnviarArquivo.TEMPO_ESPERA_ENVIO_PROXIMO_PACOTE_PRODUCAO;
            }
            return this._tempoEsperarEnvioProximoPacote;
        }

        private get TamanhoPacote(): number
        {
            if (this._tamanhoPacote == null)
            {
                this._tamanhoPacote = ($Configuracao.IsDebug) ?
                    BaseTarefaEnviarArquivo.TAMANHO_PACOTE_DEBUG :
                    BaseTarefaEnviarArquivo.TAMANHO_PACOTE_PRODUCAO;
            }
            return this._tamanhoPacote;
        }

        //#endregion

        //#region Propriedades

        public EntidadeArquivo: d.IArquivo;
        public Tentativa: number;

        //protected readonly OrigemArquivo: OrigemArquivo;

        protected readonly AssemblyQualifiedName: string;
        protected readonly NomeTipoArquivo: string;

        protected Buffer: ArrayBuffer;
        //protected Bytes: Uint8Array;
        protected ParteAtual: number;
        protected TotalPartes: number;
        protected TotalBytesEnviado: number;

        protected URLEnviarArquivo: string;
        protected IntervaloProximaTentiva: TimeSpan;

        protected readonly Gerenciador: GerenciadorEnvioArquivo;

        //#endregion

        public constructor(gerenciador: GerenciadorEnvioArquivo, entidadeArquivo: d.IArquivo)
        {
            super();

            this.Gerenciador = gerenciador;
            //this.Arquivo = origemArquivo.Arquivo;
            this.EntidadeArquivo = entidadeArquivo;
            this.EventoStatusAlterado.AddHandler(this.Tarefa_StatusAlterado, this);
            this.URLEnviarArquivo = this.RetornarUrlEnviarArquivo();

            this.NomeArquivo = entidadeArquivo.NomeArquivo;
            this.TotalBytesLocal = entidadeArquivo.TotalBytesLocal;
            this.Status = t.EnumStatusTarefa.Aguardando;
            this.ParteAtual = 1;
            this.Tentativa = 0;
            this.IntervaloProximaTentiva = TimeSpan.FromSeconds(10);
            this.AssemblyQualifiedName = entidadeArquivo.GetType().AssemblyQualifiedName;
            this.NomeTipoArquivo = entidadeArquivo.GetType().Nome;

            if (!(entidadeArquivo.Id > 0))
            {
                throw new Erro("A entidadeArquivo precisa ser salva antes de envia-la", this);
            }
        }

        public Tarefa_StatusAlterado(provedor: any, e: Snebur.Tarefa.StatusTarefaAlteradoEventArgs): void
        {
            this.DescricaoStatus = this.RetornarDescricaoTarefa(e.Status);
        }

        protected ExecutarInternoAsync()
        {
            this.IniciarEnvioAsync();
        }

        protected Reiniciar()
        {
            this.IniciarEnvioAsync();
        }

        protected async IniciarEnvioAsync()
        {
            this.Buffer = await this.RetornarBufferAsync();

            if (!(this.Buffer instanceof ArrayBuffer))
            {
                this.FinalizarTarefa(new ErroEnviarPacote("Não foi possível carregar o ArrayBuffer(bytes) do arquivo"));
                return;
            }
            
            this.Checksum = await Snebur.WebWorker.Checksum.RetornarChecksumAsync(this.Buffer) as string;
            this.IniciarEnvio();
        }

        protected Continuar(): void
        {
            if (!String.IsNullOrWhiteSpace(this.Checksum))
            {
                this.EnviarProximoPacoteAsync();
            }
            else
            {
                throw new Erro(" o checksum não foi definido");
                //Aguardando calculo do check sum
                //this.Status = Snebur.Tarefa.EnumStatusTarefa.Aguardando;
                //throw new Erro("")
            }
        }

        protected override RetornarTimeout(): TimeSpan
        {
            if ($Configuracao.IsDebug)
            {
                return TimeSpan.FromDays(1);
            }
            return super.RetornarTimeout();
        }

        //#region Enviar Pacote

        private IniciarEnvio()
        {
            this.IsEnviandoPacote = false;
            this.TotalBytesEnviado = 0;
            this.TotalBytes = this.Buffer.byteLength;
            this.TotalPartes = Math.ceil(this.TotalBytes / this.TamanhoPacote);
            this.EnviarProximoPacoteAsync();
        }

       
        private async EnviarProximoPacoteAsync()
        {
            const tempoEsperaEnviarProximoPacote = this.TempoEsperarEnvioProximoPacote;
            await ThreadUtil.EsperarAsync(tempoEsperaEnviarProximoPacote);

            if (this.IsEnviandoPacote)
            {
                console.error("já existe um pacote sendo enviado ");
                return;
            }
       

            if (this.Status === t.EnumStatusTarefa.Pausada ||
                this.Status === t.EnumStatusTarefa.Cancelada ||
                this.Status === t.EnumStatusTarefa.Finalizada)
            {
                return;
            }

            if (this.Status === Snebur.Tarefa.EnumStatusTarefa.Aguardando)
            {
                this.Status = t.EnumStatusTarefa.Executando;
            }
            if (!(this.Buffer instanceof ArrayBuffer))
            {
                
                this.Reiniciar();
                return;
            }

           
            const inicio = (this.ParteAtual - 1) * this.TamanhoPacote;
            let fim = inicio + this.TamanhoPacote;
            if (fim > this.TotalBytes)
            {
                fim = this.TotalBytes;
            }

            const pacote = this.Buffer.slice(inicio, fim);
            const checksumPacote = u.ChecksumUtil.RetornarChecksum(pacote);
            const parametros = this.RetornarParametros(checksumPacote);
            const url = u.UrlUtil.RetornarURL(this.URLEnviarArquivo, [new ParChaveValorSimples("State", u.RandomUtil.RetornarRandom().toString())]);
            const enviador = new EnviarPacote(url, pacote, parametros);
            this.IsEnviandoPacote = true;
            const resultado = await enviador.EnviarAsync();
            this.IsEnviandoPacote = false;

            const tamanhoPacote = pacote.byteLength;

            this.IsEnviandoPacote = false;
            switch (resultado)
            {
                case (sa.EnumResultadoEnvioPacote.Sucesso):

                    this.PacoteEnviadoSucesso(tamanhoPacote);
                    break;

                case (sa.EnumResultadoEnvioPacote.ReiniciarEnvio):

                    console.error(this.toString() + " Reiniciar envio ");
                    this.ParteAtual = 1;
                    this.Reiniciar();
                    break;

                case (sa.EnumResultadoEnvioPacote.TentarNovamente): {

                    console.error(this.toString() + " tentar novamente ");
                    const p = this.Progresso;
                    this.Progresso = p;
                    this.Tentativa += 1;
                    await ThreadUtil.EsperarAsync(this.IntervaloProximaTentiva.TotalMilliseconds);
                    this.EnviarProximoPacoteAsync();
                    break;
                }
                default:

                    console.error(this.toString() + " O resultado do envio do pacote não é suportado ");
                    throw new ErroNaoSuportado(`O resultado do envio do pacote não é suportado ${ u.EnumUtil.RetornarDescricao(sa.EnumResultadoEnvioPacote, resultado)}`, this);
            }
        }
     
        private PacoteEnviadoSucesso(tamanhoPacote: number): void
        {
            this.Gerenciador.TotalBytesMedidorVelocidade += tamanhoPacote;
            this.Tentativa = 0;
            this.TotalBytesEnviado += tamanhoPacote;
            this.Progresso = (this.TotalBytesEnviado / this.TotalBytes) * 100;
            this.ParteAtual += 1;

            if (this.ParteAtual <= this.TotalPartes)
            {
                this.EnviarProximoPacoteAsync();
            }
            else
            {
                this.FinalizarEnviadoSucesso();
            }
        }

        protected FinalizarEnviadoSucesso(): void
        {
            this.Progresso = 100;
            if (this.Buffer instanceof ArrayBuffer)
            {
                this.Buffer.slice(0, this.Buffer.byteLength);
            }

            delete this.Buffer;
            this.Buffer = undefined;
            this.FinalizarTarefa(null);

        }
        //#endregion

        //#region Métodos protegidos 

        protected RetornarUrlEnviarArquivo(): string
        {
            const servicoArquivo = $Aplicacao.RetornarServicoArquivo((this.EntidadeArquivo as any).GetType());
            return u.UrlUtil.Combinar(servicoArquivo.URLServico, ConstantesServicoArquivo.NOME_ARQUIVO_ENVIAR_ARQUIVO);
        }

        protected RetornarParametros(checksumPacote: string): Array<ParChaveValorSimples<string>>
        {
            const parametros = new Array<ParChaveValorSimples<string>>();

            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.ID_ARQUIVO, this.EntidadeArquivo.Id.toString()));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.IDENTIFICADOR_SESSAO_USUARIO, $Aplicacao.IdentificadorSessaoUsuario));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.TAMANHO_PACOTE, this.TamanhoPacote.toString()));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.CHECKSUM_ARQUIVO, this.Checksum));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.CHECKSUM_PACOTE, checksumPacote));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.TOTAL_PARTES, this.TotalPartes.toString()));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.PARTE_ATUAL, this.ParteAtual.toString()));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.TOTAL_BYTES, this.TotalBytes.toString()));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.ASEMMBLY_QUALIFIED_NAME, this.AssemblyQualifiedName));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.IDENTIFICADOR_USUARIO, $Aplicacao.CredencialUsuario.IdentificadorUsuario));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.SENHA, $Aplicacao.CredencialUsuario.Senha));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoArquivo.NOME_TIPO_ARQUIVO, this.NomeTipoArquivo));
            
            return parametros;
        }
        //#endregion

        //#region Métodos privados

        private RetornarDescricaoTarefa(status: t.EnumStatusTarefa): string
        {
            switch (status)
            {
                case (t.EnumStatusTarefa.Aguardando):

                    return "Aguardando envio";

                case (t.EnumStatusTarefa.Executando):

                    return "Enviando";

                case (t.EnumStatusTarefa.Pausada):

                    return "Envio pausado";

                case (t.EnumStatusTarefa.Finalizada):

                    return "Envio concluído";

                case (t.EnumStatusTarefa.Cancelada):

                    return "Cancelado";

                case (t.EnumStatusTarefa.Erro):

                    if (this.Erro instanceof Error)
                    {
                        return this.Erro.message;
                    }
                    return "Erro";

                default:

                    throw new ErroNaoSuportado("O status da tarefa não é suportado", this);
            }
        }
        //#endregion

        //#region Métodos abstratos 

        protected abstract RetornarBufferAsync(): Promise<ArrayBuffer>;

        //#endregion
    }
}