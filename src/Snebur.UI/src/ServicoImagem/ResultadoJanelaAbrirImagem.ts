
namespace Snebur.UI
{
    export class ResultadoJanelaAbriImagem extends Snebur.UI.ResultadoFecharJanelaArgs
    {
        public Imagens: Array<d.IImagem>;

        public constructor(janela: Janela, imagens: Array<d.IImagem>)
        {
            super(janela, true, null);
            this.Imagens = imagens;
        }
    }
}