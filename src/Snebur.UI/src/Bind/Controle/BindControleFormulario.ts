namespace Snebur.UI
{
    export class BindControleFormulario extends BindControle
    {
        public override readonly Priority: number = 2;
        public get ControleFormulario(): BaseControleFormulario<any>
        {
            return this.Controle as BaseControleFormulario<any>;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindFormulario, valorAtributo);

            if (this.Controle instanceof BaseControleFormulario)
            {
                Object(this.Controle)._bindControleFormulario = this;
            }
        }
         
        private IsInputEvent()
        {
            if (this.Controle instanceof BaseCaixaTexto)
            {
                return this.Controle.Binds.OfType(BindTexto).Any(x => x.IsInputEvent) ?? false;
            }
            return false;
        }
        private RetornarValorTipado(novoValor: any): any
        {
            if (this.PropriedadeLigacao instanceof r.Propriedade)
            {
                if (novoValor != null && novoValor.GetType() !== this.PropriedadeLigacao.Tipo)
                {
                    return ConverterUtil.Para(novoValor, this.PropriedadeLigacao.Tipo, true);
                }
            }
            return novoValor;
        }

        protected override DataSource_Alterado(provedor: any, e: UIEventArgs)
        {
            this.ControleFormulario.DataSource = this.DataSource;
            super.DataSource_Alterado(provedor, e);
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            const isInputEvent = this.IsInputEvent();
            if (isInputEvent === false)
            {
                const valorTipado = this.RetornarValorTipado(novoValor);
                this.ControleFormulario.ValorPropriedadeAlterado(
                    this.PaiPropriedadeLigacao,
                    this.NomePropriedadeLigacao,
                    this.PropriedadeLigacao,
                    valorTipado);
                return;
            }
        }
    }
}