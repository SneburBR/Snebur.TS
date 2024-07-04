
namespace Snebur.Imagens
{
    export class EfeitoImagem extends Snebur.SneburObject
    {
        public readonly EfeitoImagemEnum: d.EnumEfeitoImagem;
        public readonly Filtro: d.FiltroImagem;
        public readonly SobrePosicao: SobrePosicao;

        public constructor(efeitoImagemEnum: d.EnumEfeitoImagem, inicializar: Partial<d.FiltroImagem>, sobrePosicao: imagens.SobrePosicao = null)
        {
            super();

            this.EfeitoImagemEnum = efeitoImagemEnum;
            this.Filtro = new d.FiltroImagem(inicializar);
            this.SobrePosicao = sobrePosicao;
        }
    }
}
