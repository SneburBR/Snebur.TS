
namespace Snebur.UI
{
    export class ColunaMapeamento extends ComponenteApresentacaoMapeamento<Coluna>
    {
        protected override Inicializar(): void
        {
            super.Inicializar();
            this.Mapear(x => x.RotuloApresentacao, new PropriedadeRotuloApresentacao());
        }
    } 
}
