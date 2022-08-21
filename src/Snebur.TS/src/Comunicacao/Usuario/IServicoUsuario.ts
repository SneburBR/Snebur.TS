namespace Snebur.Comunicacao
{
    export interface IServicoUsuario
    {
        //Async
        //ExisteIdentificadorUsuarioAsync(identificadorUsuario: string, callback: CallbackResultado<Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario>): void;

        //ValidarCredencialAsync(credencial: Snebur.Seguranca.CredencialServico, callback: CallbackResultado<c.EnumResultadoValidacaoCredencial>): void;

        //SessaoUsuarioAtivaAsync(credencial: Snebur.Seguranca.CredencialServico, identificadorSessaoUsuario: string, callback: CallbackResultado<boolean>): void;

        //RetornarUsuarioAsync(credencial: Snebur.Seguranca.CredencialUsuario, callback: CallbackResultado<d.IUsuario>): void;

        //AutenticarAsync(credencial: Snebur.Seguranca.CredencialUsuario, callback: CallbackResultado<c.ResultadoAutenticacao>): void;

        //RetornarSessaoUsuarioAsync(identificadorSessaoUsuario: string, callback: CallbackResultado<d.ISessaoUsuario>): void;

        //Async
        ExisteIdentificadorUsuarioAsync(identificadorUsuario: string): Promise<ResultadoExisteIdentificadoUsuario>;

        ValidarCredencialAsync(credencial: Snebur.Seguranca.CredencialUsuario): Promise<Snebur.Dominio.EnumResultadoValidacaoCredencial>;

        SessaoUsuarioAtivaAsync(credencial: Snebur.Seguranca.CredencialServico, identificadorSessaoUsuario: string): Promise<boolean>;

        RetornarUsuarioAsync(credencial: Snebur.Seguranca.CredencialUsuario): Promise<d.IUsuario>;

        AutenticarAsync(credencial: Snebur.Seguranca.CredencialUsuario): Promise<c.ResultadoAutenticacao>;

        RetornarSessaoUsuarioAsync(identificadorSessaoUsuario: string): Promise<d.ISessaoUsuario>;

        CadastrarNovoUsuarioAsync(novoUsuario: Snebur.Dominio.NovoUsuario, isAlterarSenhaProximoAcesso: boolean): Promise<d.IUsuario>;

        //Async
        EnviarCodigoRecuperarSenhaAsync(identificadorAmigavel: string): Promise<ResultadoEnviarCodigoRecuperarSenha>;

        ValidarCodigRecuperarSenhaAsync(identificadorAmigavel: string, codigoRecuperarSenha: string): Promise<ResultadoValidarCodigoRecuperarSenha>;

        RecuperarSenhaAsync(identificadorAmigavel: string, codigoRecuperarSenha: string, novaSenha: string): Promise<ResultadoRecuperarSenha>;

        AlterarSenhaAsync(credencial: Snebur.Seguranca.CredencialUsuario, novaSenha: string): Promise<ResultadoAlterarSenha>;

        FinalizarSessaoUsuarioAsync(identificadorSessaoUsuario: string): Promise<void>
    }
}