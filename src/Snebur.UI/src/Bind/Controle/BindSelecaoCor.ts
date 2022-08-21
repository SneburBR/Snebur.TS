namespace Snebur.UI
{
    //bind exclusivo para caixa de selecao cor
    export class BindSelecaoCor extends BindControle
    {

        public get CaixaSelecaoCor(): CaixaSelecaoCor
        {
            return this.Controle as CaixaSelecaoCor;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindSelecaoCor, valorAtributo);

            if (!(this.CaixaSelecaoCor instanceof CaixaSelecaoCor))
            {
                throw new Erro("Controle não suportado");
            }
            this.CaixaSelecaoCor.EventoValorAlterado.AddHandler(this.CaixaSelecaoCor_ValorAlterado, this);
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            if (novoValor instanceof d.Cor)
            {
                if (Util.IsDiferente(this.CaixaSelecaoCor.CorSelecionada, novoValor))
                {
                    this.CaixaSelecaoCor.CorSelecionada = novoValor;
                }
            }
            
        }

        private CaixaSelecaoCor_ValorAlterado(provedor: any, e: ValorAlteradoEventArgs<d.Cor>): void
        {
            this.AlterarValorPropriedade(this.CaixaSelecaoCor.CorSelecionada);
        }

        public override Dispose(): void
        {
            this.CaixaSelecaoCor.EventoValorAlterado.RemoveHandler(this.CaixaSelecaoCor_ValorAlterado, this);
            super.Dispose();

        }
    }
}
