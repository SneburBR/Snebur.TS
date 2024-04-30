
namespace Snebur
{
    export class GerenciadorFilaInicializacaoAsync
    {
        private readonly Fila = new Queue<IInicializacaoAsync>();
        private ItemAtual: IInicializacaoAsync | null = null;

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

            this.ItemAtual = this.Fila.Dequeue();
            if (this.ItemAtual != null)
            {
                try
                {
                    await this.ItemAtual.InicializarAsync();
                }
                finally
                {
                    this.ItemAtual = null;
                }
            }
            await this.ExecutarAsync();
        }

        public Limpar(): void
        {
            this.Fila.Clear();
        }
    }
}