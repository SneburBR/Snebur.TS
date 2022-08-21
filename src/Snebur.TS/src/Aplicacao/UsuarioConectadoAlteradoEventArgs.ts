namespace Snebur.Aplicacao
{
    export class UsuarioConectadoAlteradoEventArgs extends EventArgs
    {
        public readonly Usuario: d.IUsuario;
        public readonly IsLogado: boolean;

        public constructor(usuario: d.IUsuario, isLogado: boolean)
        {
            super();
            this.Usuario = usuario;
            this.IsLogado = isLogado;
        }

    }
}
