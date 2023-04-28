namespace Snebur.UI
{
    export class Painel extends BasePainel implements IPainel
    {
        public TipoPainel: EnumTipoPainel;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }

        public override Inicializar(): void
        {
            super.Inicializar();
            this.ValidarTipoPainel();
        }

        private ValidarTipoPainel()
        {
            if ($Configuracao.IsDebug)
            {
                const tipoPainel = this.RetornarValorAtributoEnum(EnumTipoPainel, AtributosHtml.TipoPainel, null, true);
                if (ValidacaoUtil.IsBind(tipoPainel))
                {
                    return;
                }
                if (!EnumUtil.IsDefindo(EnumTipoPainel, tipoPainel))
                {
                    console.warn(`O atributo ${AtributosHtml.TipoPainel.Nome}  do Painel não está defino ou é invalido em ${this.ControleApresentacao.___NomeConstrutor}.`);
                }
                else
                {
                    const constrolesNaoSuportado = this.ComponentesApresentacaoFilhos.Where(x => !this.IsComponenteFilhoRecomendado(tipoPainel, x));
                    if (constrolesNaoSuportado.Count > 0)
                    {
                        const descricao = String.Join(", ", constrolesNaoSuportado.Select(x => x.GetType().Nome));
                        console.warn(`Componente não recomentado ${descricao} É recomendado usar blocos no primeiro nível dos nos  Painel ${EnumUtil.RetornarRotulo(EnumTipoPainel, tipoPainel)} em ${this.ControleApresentacao.___NomeConstrutor}`);
                    }
                }
            }
        }

        public IsComponenteFilhoRecomendado(tipoPainel: EnumTipoPainel, componente: ComponenteApresentacao)
        {
            if (componente instanceof EstilosItens)
            {
                return true;
            }

            if (tipoPainel === EnumTipoPainel.PilhaVertical)
            {
                //if (componente instanceof BaseCaixaTexto)
                //{
                //    return true;
                //}
                //if (componente instanceof BaseControleFormulario)
                //{
                //    return false;
                //}
                return true;
            }
            if (tipoPainel === EnumTipoPainel.PilhaHorizontal)
            {
                if (componente instanceof Texto)
                {
                    return true;
                }

            }
            return componente instanceof Bloco ||
                componente instanceof Painel ||
                componente instanceof BlocoItem;
        }
    }
}
