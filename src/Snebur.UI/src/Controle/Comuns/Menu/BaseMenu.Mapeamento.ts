namespace Snebur.UI
{
    export class BaseMenuMapeamento extends ComponenteApresentacaoMapeamento<BaseMenu>
    {
        protected override Inicializar(): void
        {
            super.Inicializar();

            this.Mapear(x => x.Icone, new PropriedadeIcone(true));
            this.Mapear(x => x.IconeCategoria, new PropriedadeIcone(true));
            /*this.Mapear(x => x.TamanhoIcone, new PropriedadeTamanhoIcone());*/
        }
    }
}
