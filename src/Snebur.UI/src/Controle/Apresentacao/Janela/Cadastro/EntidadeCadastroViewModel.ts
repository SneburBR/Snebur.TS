namespace Snebur.UI
{
    export class EntidadeCadastroViewModel<TEntidade extends Entidade = Entidade> extends Snebur.Dominio.EntidadeViewModel<TEntidade>
    {
        public Titulo: string
        public SubTitulo: string

        public constructor(entidade: TEntidade, titulo: string = null, subTitulo: string = null)
        {
            super();

            this.Entidade = entidade;

            this.DeclararPropriedade(x => x.Titulo, String);
            this.DeclararPropriedade(x => x.SubTitulo, String);

            this.Titulo = titulo;
            this.SubTitulo = subTitulo;

            if (String.IsNullOrWhiteSpace(titulo))
            {
                this.Titulo = this.RetornarTitulo();
            }
        }

        public async InicializarViewModelAsync(): Promise<void>
        {

        }
         
        private RetornarTitulo(): string
        {
            const tipoEntidade = this.Entidade.GetType();
            return u.GlobalizacaoUil.RetornarRotuloTipo(tipoEntidade as r.TipoEntidade);
        }
    }
}