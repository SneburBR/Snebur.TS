namespace Snebur.UI
{
    export declare type CallbackImagemCancelada = (args: ImagemVirtualCanceladaEventArgs) => void;

    export class TarefaAbrirImagemLocal extends Snebur.Tarefa.BaseTarefa
    {
        public readonly Imagem: d.IImagem;
        public readonly OrigemImagem: sa.OrigemImagemLocal;
        public readonly CallbacksCancelarVirtualizacao = new List<CallbackImagemCancelada>();

        public constructor(imagem: d.IImagem, argumento: any = null)
        {
            super(argumento);

            this.Imagem = imagem;

            if (!(this.Imagem.OrigemImagem instanceof sa.OrigemImagemLocal))
            {
                throw new Erro("A origem da imagem não é suportada", this);
            }
            this.OrigemImagem = imagem.OrigemImagem as sa.OrigemImagemLocal;

            imagem.EventoImagemLocalCarregando.Notificar(this, EventArgs);
            //this.CallbackImagemCarregada = callback;
            //this.CallbackCancelado = callbackCancelado;
        }

        //#region métodos sobrescritos

        protected async ExecutarInternoAsync() 
        {
            let erro: Error = null;
            try
            {
                await this.OrigemImagem.CarregarImagemAsync();
            }
            catch (erroCapturado)
            {
                erro = u.ErroUtil.RetornarErro(erroCapturado);
            }
            finally
            {
                this.NotificarImagemCarregadaAsync(erro);
                this.Finalizar(erro);
            }
        }

        protected Continuar(): void
        {
            //não faz nada
        }

        //#endregion 

        private NotificarImagemCarregadaAsync(erro: Error): void
        {
            if (this.Imagem.EventoImagemLocalCarregada instanceof Evento)
            {
                const args = new ImagemLocalCarregadaEventArgs(this.Imagem, erro);
                this.Imagem.EventoImagemLocalCarregada.NotificarAsync(this, args);
                //setTimeout()
                //this.Imagem.EventoImagemLocalCarregada.Notificar(this, EventArgs.Empty);
            }
            //while (this.CallbacksImagemCarregada.Count > 0)
            //{
            //    let args = new ImagemCarregadaEventArgs(this.Imagem, erro);
            //    let callback = this.CallbacksImagemCarregada.PegarPrimeiro();
            //    if (callback instanceof Function)
            //    {
            //        setTimeout(callback.bind(null, args), 0);
            //    }
            //}
        }

        public NotificarCancelamentoVirtualizacao(): void
        {
            while (this.CallbacksCancelarVirtualizacao.Count > 0)
            {
                const args = new ImagemVirtualCanceladaEventArgs(this.Imagem);
                const callback = this.CallbacksCancelarVirtualizacao.PegarPrimeiro();
                if (callback instanceof Function)
                {
                    setTimeout(callback.bind(null, args), 0);
                }
            }
        }

        public Finalizar(erro: Error)
        {
            super.FinalizarTarefa(erro);
        }
        //#endregion
    }

}
namespace Snebur
{
    export class ImagemVirtualCanceladaEventArgs extends EventArgs
    {
        public Imagem: d.IImagem;

        public constructor(imagem: d.IImagem)
        {
            super();
            this.Imagem = imagem;
        }
    }
}