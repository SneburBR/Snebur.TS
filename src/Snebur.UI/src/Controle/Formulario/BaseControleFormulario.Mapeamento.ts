namespace Snebur.UI
{
    export class BaseControleFormularioMapeamento<TComponente extends BaseControleFormulario = BaseControleFormulario> extends ControleRotuloMapeamento<TComponente>
    {
        protected override Inicializar(): void
        {
            super.Inicializar();
            this.Mapear(x => x.TipoCaixa, new PropriedadeCaixa());
        }
    }
}


