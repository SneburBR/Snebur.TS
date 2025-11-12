namespace Snebur.Comunicacao
{
    export class ServicoUsuarioUtil
    {
        public static IsServicoUsuario(obj: any): obj is c.IServicoUsuario
        {
            const requiredMethods: (keyof IServicoUsuario)[] = [
                "IsExisteInformacaoIpAsync",
                "AtualizarInformacaoIpAsync",
                "ExisteIdentificadorUsuarioAsync",
                "ValidarCredencialAsync",
                "SessaoUsuarioAtivaAsync",
                "RetornarUsuarioAsync",
                "AutenticarAsync",
                "RetornarSessaoUsuarioAsync",
                "CadastrarNovoUsuarioAsync",
                "EnviarCodigoRecuperarSenhaAsync",
                "ValidarCodigRecuperarSenhaAsync",
                "RecuperarSenhaAsync",
                "AlterarSenhaAsync",
                "FinalizarSessaoUsuarioAsync"
            ];
            return requiredMethods.every(
                method => typeof (obj as any)[method] === "function"
            );
        }
    }
}
