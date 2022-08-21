namespace Snebur.UI
{

    export class PainelAbasMapeamento<TControleRotulo extends PainelAbasHorizontal = PainelAbasHorizontal> extends ComponenteApresentacaoMapeamento<TControleRotulo>
    {

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.Mapear(x => x.TipoPainelAba, new PropriedadeTipoPainelAba());
            //this.Mapear(x => x.TipoAnimacao, new PropriedadeTipoAnimacao());
        }
    }

}

