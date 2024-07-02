namespace Snebur.UI
{
    export class CaixaQuantidade extends BaseCaixaNumero 
    {
        public override readonly PASSAO_PADRAO: number = 1;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        public BtnMenos_Click(provedor: ui.Botao, e: ui.UIEventArgs): void
        {
            const passaLargo = this.RetornarPassoLargo();
            let valor = this.Valor;
            valor -= passaLargo;
            valor = Math.round(valor / passaLargo) * passaLargo;
            //if (valor < this.Minimo)
            //{
            //    valor = this.Minimo;
            //}
            this.Valor = valor;
            this.AlterarValorPropriedade();
            /*this.ElementoInput?.focus();*/
            this.Elemento.classList.add(ConstantesCssClasses.CSS_CLASSE_FOCUS);
            this.Elemento.focus();
        }

        public BtnMais_Click(provedor: ui.Botao, e: ui.UIEventArgs): void
        {
            const passaLargo = this.RetornarPassoLargo();
            let valor = this.Valor;
            valor += passaLargo;
            valor = Math.round(valor / passaLargo) * passaLargo;
            /*const maximo = this.RetornarMaximo();*/
            //if (valor > maximo)
            //{
            //    valor = maximo;
            //}
            this.Valor = valor;
            this.AlterarValorPropriedade();
            this.Elemento.classList.add(ConstantesCssClasses.CSS_CLASSE_FOCUS);
            this.Elemento.focus();
        }
    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface CaixaQuantidade
    {
        readonly BtnDiminuir: ui.Botao;
        readonly BtnAumentar: ui.Botao;
    }

    //#endregion

}