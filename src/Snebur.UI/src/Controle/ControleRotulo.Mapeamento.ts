namespace Snebur.UI
{
    export class ControleRotuloMapeamento<TControleRotulo extends ControleRotulo = ControleRotulo> extends ComponenteApresentacaoMapeamento<TControleRotulo>
    {
        protected override Inicializar(): void
        {
            super.Inicializar();
            this.Mapear(x => x.RotuloApresentacao, new PropriedadeRotuloApresentacao());
        }
    }

}

