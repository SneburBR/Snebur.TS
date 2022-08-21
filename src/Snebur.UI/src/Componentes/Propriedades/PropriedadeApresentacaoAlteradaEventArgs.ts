namespace Snebur.UI
{
    export class PropriedadeApresentacaoAlteradaEventArgs<TValor = any> extends EventArgs
    {
        public readonly ComponenteApresentacao: ComponenteApresentacao;
        public readonly NomePropriedade: string;
        public readonly ValorAntigo: TValor;
        public readonly Valor: TValor;

        public constructor(componenteApresentacao: ComponenteApresentacao, nomePropriedade: string, valorAntigo: TValor, valor: TValor)
        {
            super();

            this.ComponenteApresentacao = componenteApresentacao;
            this.NomePropriedade = nomePropriedade;
            this.ValorAntigo = valorAntigo;
            this.Valor = valor;
        }
    }
}
