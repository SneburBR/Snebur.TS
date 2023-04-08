
namespace Snebur.UI
{
    export class CaixaCartaoCredito extends BaseCaixaTexto
    {
        public get MascaraCartaoCredito(): MascaraCartaoCredito
        {
            const bindTexto = this.Binds.OfType(BindTexto).Single();
            if (bindTexto.Mascara instanceof MascaraCartaoCredito)
            {
                return bindTexto.Mascara;
            }
            return null;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar()
        {
            super.Inicializar();
            this.MascaraCartaoCredito.EventoBandeiraAlterada.AddHandler(this.MascaraCartaoCredito_BandeiraAlterada, this);
            this.EventoValorAlterado.AddHandler(this.CaixaCartaoCredito_ValorAlterado, this);
            this.AtualizarImagemBandeira(u.EnumBandeira.Outro);
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindTexto, this.CaminhoBind);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Mascara, "cartaocredito");
        }

        public CaixaCartaoCredito_ValorAlterado(provedor: any, e: ValorAlteradoEventArgs)
        {
            const bandeira = u.CartaoCreditoUtil.Identificar(this.Valor).Bandeira;
            this.AtualizarImagemBandeira(bandeira);
        }

        public MascaraCartaoCredito_BandeiraAlterada(provedor: any, e: BandeiraAlteradaEventArgs)
        {
            this.AtualizarImagemBandeira(e.Bandeira);
        }

        private AtualizarImagemBandeira(bandeira: u.EnumBandeira)
        {
            const urlBandeira = u.CartaoCreditoUtil.RetornarUrlImagemBandeira(bandeira);
            this.ElementoImagemBandeira.src = urlBandeira;
        }

        public override Dispose(): void
        {
            this.MascaraCartaoCredito.EventoBandeiraAlterada.RemoveHandler(this.MascaraCartaoCredito_BandeiraAlterada, this);
            super.Dispose();
        }

    }

	//#region Elementos da apresentação - código gerado automaticamente #

	export interface CaixaCartaoCredito
	{
		readonly ElementoImagemBandeira: HTMLImageElement;
	}

	//#endregion

}