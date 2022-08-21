namespace Snebur.UI
{
    export class PainelListaMapeamento extends ComponenteApresentacaoMapeamento<PainelLista> 
	{
        protected override Inicializar(): void
        {
            super.Inicializar();

            this.Mapear(x => x.TipoPainel, new PropriedadeTipoPainel());
        }
	}
}
