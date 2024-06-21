
namespace Snebur
{
    export class GerenciadorFilaInicializacaoAsync
    {
        private readonly Fila = new Queue<IInicializacaoAsync>();
        private ItemAtual: IInicializacaoAsync | null = null;

        public readonly EventoItemInicializado = new Evento<ItemEventArgs<IInicializacaoAsync>>(this);

        public Adicionar(item: IInicializacaoAsync): void
        {
            this.Fila.Enqueue(item);
        }

        public Remover(item: IInicializacaoAsync): void
        {
            this.Fila.Remove(item);
        }

        public async ExecutarAsync(): Promise<void>
        {
            if (this.ItemAtual != null || this.Fila.Count === 0)
            {
                return;
            }

            const itemAtual = this.Fila.Dequeue();
            if (itemAtual != null)
            {
                this.ItemAtual = itemAtual;
                try
                {
                    await itemAtual.InicializarAsync();
                    if (this.ItemAtual == itemAtual)
                    {
                        this.EventoItemInicializado.Notificar(itemAtual, new ItemEventArgs(itemAtual));
                    }
                }
                finally
                {
                    this.ItemAtual = null;
                }
            }
            await this.ExecutarAsync();
        }

        public Cancelar(): void
        {
            this.Fila.Clear();
            if (typeof this.ItemAtual?.Cancelar == "function")
            {
                this.ItemAtual.Cancelar();
            }
            this.ItemAtual = null;;
        }
    }
}