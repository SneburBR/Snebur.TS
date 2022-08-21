namespace Snebur.UI
{
    export class BindItensSelecionado extends BindControle
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindItensSelecionado, valorAtributo);
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            if (this.PropriedadeLigacao instanceof r.Propriedade)
            {
                if (this.Controle instanceof BaseControleFormulario)
                {
                    this.Controle.ValorPropriedadeAlterado(this.PaiPropriedadeLigacao, this.NomePropriedadeLigacao, this.PropriedadeLigacao, novoValor);
                    return;
                }
            }

            if ((this.Controle as IControleItensSelecionado).ItensSelecionado !== undefined)
            {
                (this.Controle as IControleItensSelecionado).ItensSelecionado = novoValor;
                return;
            }
        }

        protected override DataSource_Alterado(provedor: any, e: UIEventArgs)
        {
            super.DataSource_Alterado(provedor, e);
            this.Controle.DataSource = this.DataSource;
        }
    }
}