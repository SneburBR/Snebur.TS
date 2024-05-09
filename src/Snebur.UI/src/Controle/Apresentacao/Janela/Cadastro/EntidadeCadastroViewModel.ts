namespace Snebur.UI
{
    export class EntidadeCadastroViewModel<TEntidade extends IEntidade = Entidade> extends Snebur.Dominio.EntidadeViewModel<TEntidade>
    {
        public Titulo: string
        public SubTitulo: string

        public readonly EventoTituloAlterado = new Evento(this);

        public get Id(): number
        {
            return this.Entidade.Id;
        }
        public constructor(entidade: TEntidade, titulo: string = null, subTitulo: string = null)
        {
            super();

            this.Entidade = entidade;
            this.DeclararPropriedade(x => x.Titulo, String, this.Titulo_Alterado);
            this.DeclararPropriedade(x => x.SubTitulo, String, this.Titulo_Alterado);

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
            return `Cadastro ${ u.GlobalizacaoUil.RetornarRotuloTipo(tipoEntidade as r.TipoEntidade)}`;
        }

        private Titulo_Alterado()
        {
            this.EventoTituloAlterado.Notificar(this, EventArgs.Empty);
        }
    }
}