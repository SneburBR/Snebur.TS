namespace Snebur.UI
{
    export class EntidadeCadastroViewModel<TEntidade extends Entidade = Entidade> extends Snebur.Dominio.EntidadeViewModel<TEntidade>
    {
        private _titulo: string;

        public get Titulo(): string
        {
            return this._titulo;
        }

        public set Titulo(value: string)
        {
            this._titulo = value;
            this.NotificarValorPropriedadeAlterada("Titulo", value);
        }

        public constructor(entidade: TEntidade, titulo: string = null)
        {
            super();
            this.Entidade = entidade;
            this.Titulo = titulo;

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