namespace Snebur.UI
{
    export class PainelMapeamento<TPainel extends Painel = Painel> extends BasePainelMapeamento<TPainel> 
    {
        protected override Inicializar(): void
        {
            super.Inicializar();

            this.Mapear(x => x.TipoPainel, new PropriedadeTipoPainel());

        }
    }
}
