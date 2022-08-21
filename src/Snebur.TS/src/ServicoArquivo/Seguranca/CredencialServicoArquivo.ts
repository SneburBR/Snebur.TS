namespace Snebur.Seguranca
{
    export class CredencialServicoArquivo
    {
        private static IDENTIFICADOR_USUARIO: string = "ServicoArquivo";

        private static SENHA: string = "0388cb06-7431-4c5e-b70f-31129e7fd7da";

        public static get ServicoArquivo(): CredencialServico
        {
            const credencial = new CredencialUsuario();
            credencial.IdentificadorUsuario = CredencialServicoArquivo.IDENTIFICADOR_USUARIO;
            credencial.Senha = CredencialServicoArquivo.SENHA;
            return credencial;
        }
    }
}