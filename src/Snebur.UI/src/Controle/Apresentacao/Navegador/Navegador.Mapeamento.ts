namespace Snebur.UI
{
    export class NavegadorMapeamento<TControleRotulo extends BaseNavegador = BaseNavegador> extends ComponenteApresentacaoMapeamento<TControleRotulo>
    {
        protected override Inicializar(): void
        {
            super.Inicializar();
            this.Mapear(x => x.TipoAnimacao, new PropriedadeTipoAnimacao());
        }
    }
}

