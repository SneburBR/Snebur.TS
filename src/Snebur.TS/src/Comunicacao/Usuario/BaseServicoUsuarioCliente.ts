/*eslint-disable*/
namespace Snebur.Comunicacao
{

    export abstract class BaseServicoUsuarioCliente extends BaseComunicacaoCliente implements IServicoUsuario
    {

        //#region Automático
        public IsExisteInformacaoIpAsync() : Promise<boolean>
        {
            return new Promise<boolean>((resolver, reject) =>
            {
                this.ChamarServicoAsync("IsExisteInformacaoIpAsync", [], resolver, reject);
            });
        }
        public AtualizarInformacaoIpAsync(ipInformacao: Snebur.Dominio.DadosIPInformacao) : Promise<void>
        {
            return new Promise<void>((resolver, reject) =>
            {
                this.ChamarServicoAsync("AtualizarInformacaoIpAsync", [ipInformacao], resolver, reject);
            });
        }
        public ExisteIdentificadorUsuarioAsync(identificadorUsuario: string) : Promise<Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario>
        {
            return new Promise<Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario>((resolver, reject) =>
            {
                this.ChamarServicoAsync("ExisteIdentificadorUsuarioAsync", [identificadorUsuario], resolver, reject);
            });
        }
        public ValidarCredencialAsync(credencial: Snebur.Seguranca.CredencialUsuario) : Promise<Snebur.Dominio.EnumResultadoValidacaoCredencial>
        {
            return new Promise<Snebur.Dominio.EnumResultadoValidacaoCredencial>((resolver, reject) =>
            {
                this.ChamarServicoAsync("ValidarCredencialAsync", [credencial], resolver, reject);
            });
        }
        public SessaoUsuarioAtivaAsync(credencial: Snebur.Seguranca.CredencialUsuario, identificadorSessaoUsuario: string) : Promise<boolean>
        {
            return new Promise<boolean>((resolver, reject) =>
            {
                this.ChamarServicoAsync("SessaoUsuarioAtivaAsync", [credencial, identificadorSessaoUsuario], resolver, reject);
            });
        }
        public RetornarInformacoesSessaoUsuarioAsync(credencial: Snebur.Seguranca.CredencialUsuario, identificadorSessaoUsuario: string) : Promise<Snebur.Dominio.IInformacoesSessaoUsuario>
        {
            return new Promise<Snebur.Dominio.IInformacoesSessaoUsuario>((resolver, reject) =>
            {
                this.ChamarServicoAsync("RetornarInformacoesSessaoUsuarioAsync", [credencial, identificadorSessaoUsuario], resolver, reject);
            });
        }
        public RetornarUsuarioAsync(credencial: Snebur.Seguranca.CredencialUsuario) : Promise<Snebur.Dominio.IUsuario | null>
        {
            return new Promise<Snebur.Dominio.IUsuario | null>((resolver, reject) =>
            {
                this.ChamarServicoAsync("RetornarUsuarioAsync", [credencial], resolver, reject);
            });
        }
        public AutenticarAsync(credencial: Snebur.Seguranca.CredencialUsuario) : Promise<Snebur.Comunicacao.ResultadoAutenticacao>
        {
            return new Promise<Snebur.Comunicacao.ResultadoAutenticacao>((resolver, reject) =>
            {
                this.ChamarServicoAsync("AutenticarAsync", [credencial], resolver, reject);
            });
        }
        public RetornarSessaoUsuarioAsync(identificadorSessaoUsuario: string) : Promise<Snebur.Dominio.ISessaoUsuario | null>
        {
            return new Promise<Snebur.Dominio.ISessaoUsuario | null>((resolver, reject) =>
            {
                this.ChamarServicoAsync("RetornarSessaoUsuarioAsync", [identificadorSessaoUsuario], resolver, reject);
            });
        }
        public CadastrarNovoUsuarioAsync(novoUsuario: Snebur.Dominio.NovoUsuario, isAlterarSenhaProximoAcesso: boolean) : Promise<Snebur.Dominio.IUsuario | null>
        {
            return new Promise<Snebur.Dominio.IUsuario | null>((resolver, reject) =>
            {
                this.ChamarServicoAsync("CadastrarNovoUsuarioAsync", [novoUsuario, isAlterarSenhaProximoAcesso], resolver, reject);
            });
        }
        public EnviarCodigoRecuperarSenhaAsync(identificadorAmigavel: string) : Promise<Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha>
        {
            return new Promise<Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha>((resolver, reject) =>
            {
                this.ChamarServicoAsync("EnviarCodigoRecuperarSenhaAsync", [identificadorAmigavel], resolver, reject);
            });
        }
        public ValidarCodigRecuperarSenhaAsync(identificadorAmigavel: string, codigoRecuperarSenha: string) : Promise<Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha>
        {
            return new Promise<Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha>((resolver, reject) =>
            {
                this.ChamarServicoAsync("ValidarCodigRecuperarSenhaAsync", [identificadorAmigavel, codigoRecuperarSenha], resolver, reject);
            });
        }
        public RecuperarSenhaAsync(identificadorAmigavel: string, codigoRecuperarSenha: string, novaSenha: string) : Promise<Snebur.Comunicacao.ResultadoRecuperarSenha>
        {
            return new Promise<Snebur.Comunicacao.ResultadoRecuperarSenha>((resolver, reject) =>
            {
                this.ChamarServicoAsync("RecuperarSenhaAsync", [identificadorAmigavel, codigoRecuperarSenha, novaSenha], resolver, reject);
            });
        }
        public AlterarSenhaAsync(credencial: Snebur.Seguranca.CredencialUsuario, novaSenha: string) : Promise<Snebur.Comunicacao.ResultadoAlterarSenha>
        {
            return new Promise<Snebur.Comunicacao.ResultadoAlterarSenha>((resolver, reject) =>
            {
                this.ChamarServicoAsync("AlterarSenhaAsync", [credencial, novaSenha], resolver, reject);
            });
        }
        public FinalizarSessaoUsuarioAsync(identificadorSessaoUsuario: string) : Promise<void>
        {
            return new Promise<void>((resolver, reject) =>
            {
                this.ChamarServicoAsync("FinalizarSessaoUsuarioAsync", [identificadorSessaoUsuario], resolver, reject);
            });
        }
        //#endregion

        public constructor(urlServico: string, urlServicoDebug?: string)
        {
            super(urlServico, urlServicoDebug);
        }


    }
}