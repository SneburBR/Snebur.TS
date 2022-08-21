namespace Snebur.Seguranca
{
    export class CredencialAnonimo
    {
        private static IDENTIFICADOR_USUARIO: string = "Anonimo";

        private static SENHA: string = "c42b636c-97d1-4ea9-ba45-90ad98b42abb";

        public static get Anonimo(): CredencialUsuario
        {
            const credencial = new CredencialUsuario();
            credencial.Nome = "Visitante";
            credencial.IdentificadorAmigavel = "anonimo";
            credencial.IdentificadorUsuario = CredencialAnonimo.IDENTIFICADOR_USUARIO;
            credencial.Senha = CredencialAnonimo.SENHA;
            return credencial;
        }
    }
}