
namespace Snebur.Imagem
{
    export class EfeitoImagem extends Snebur.Objeto
    {
        public readonly EfeitoImagemEnum: d.EnumEfeitoImagem;
        public readonly Filtro: d.FiltroImagem;
        public readonly SobrePosicao: SobrePosicao;

        public constructor(efeitoImagemEnum: d.EnumEfeitoImagem, inicializar: Partial<d.FiltroImagem>, sobrePosicao: imagem.SobrePosicao = null)
        {
            super();

            this.EfeitoImagemEnum = efeitoImagemEnum;
            this.Filtro = new d.FiltroImagem(inicializar);
            this.SobrePosicao = sobrePosicao;
        }
    }
}
