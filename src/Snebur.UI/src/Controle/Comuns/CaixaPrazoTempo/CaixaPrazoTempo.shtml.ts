
namespace Snebur.UI
{
    export class CaixaPrazoTempo extends ControleRotulo
    {
        private static readonly SUBSTITUICAO_TIPO_PAINEL: string = "[[TIPO-PAINEL]]";
        private readonly TextoRotulo: ui.Texto;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this._dataSource = null;
        }

        protected override RetornarHtmlInterno(atributos: DicionarioSimples)
        {
            const htmlInterno = super.RetornarHtmlInterno(atributos);
            const tipoPaienl = this.RetornarTipoPainel(atributos);
            return htmlInterno.Replace(CaixaPrazoTempo.SUBSTITUICAO_TIPO_PAINEL, tipoPaienl);
        }

        private RetornarTipoPainel(atributos: DicionarioSimples<any, string>): any
        {
            if (atributos.ContainsKey(AtributosHtml.TipoPainel.Nome))
            {
                return atributos.Item(AtributosHtml.TipoPainel.Nome);
            }
            return EnumUtil.RetornarDescricao(EnumTipoPainel, EnumTipoPainel.PilhaVertical);
        }

        protected RetornarElementoRotulo(): HTMLElement
        {
            return this.TextoRotulo.ElementoApresentacao;
        }

        public ValorPropriedadeAlterado(paiPropriedade: ObjetoControladorPropriedade, nomePropriedade: string, proprieade: r.Propriedade, valorPropriedade: any): void
        {
            if (valorPropriedade instanceof PrazoTempo)
            {
                this.DataSource = valorPropriedade;
            }
        }

        private MostrarControleNumero(tipoPrazo: d.EnumTipoPrazo): boolean
        {
            if (tipoPrazo === d.EnumTipoPrazo.Horas)
            {
                return false;
            }
            return true;
        }

        private MostrarControleHora(tipoPrazo: d.EnumTipoPrazo): boolean
        {
            if (tipoPrazo === d.EnumTipoPrazo.Horas)
            {
                return true;
            }
            return false;
        }

        public override Habilitar(): void
        {
            for (const controleFilho of this.ControlesFilho)
            {
                controleFilho.Habilitar();
            }

            super.Habilitar();
        }

        public override Desabilitar(): void
        {
            super.Desabilitar();
        }
    }

}
