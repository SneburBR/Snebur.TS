/*eslint-disable*/
namespace Snebur.Comunicacao
{

    export abstract class BaseServicoUsuarioCliente extends BaseComunicacaoCliente implements IServicoUsuario
    {

//#region Automatico
		//async
		public IsExisteInformacaoIpAsync() : Promise<boolean>
		{
			return new Promise<boolean>(resolver =>
			{
				this.__IsExisteInformacaoIpInternoAsync(  function(resultado: boolean)
				{
					resolver(resultado);
				});
			});
		}
		private __IsExisteInformacaoIpInternoAsync(callback: CallbackResultado<boolean>): void
		{
			this.ChamarServicoAsync("IsExisteInformacaoIpAsync", arguments);
		}
		//async
		public AtualizarInformacaoIpAsync(ipInformacao : Snebur.Dominio.DadosIPInformacao) : Promise<void>
		{
			return new Promise<void>(resolver =>
			{
				this.__AtualizarInformacaoIpInternoAsync(ipInformacao ,  function(resultado: void)
				{
					resolver(resultado);
				});
			});
		}
		private __AtualizarInformacaoIpInternoAsync(ipInformacao : Snebur.Dominio.DadosIPInformacao, callback: CallbackResultado<void>): void
		{
			this.ChamarServicoAsync("AtualizarInformacaoIpAsync", arguments);
		}
		//async
		public ExisteIdentificadorUsuarioAsync(identificadorUsuario : string) : Promise<Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario>
		{
			return new Promise<Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario>(resolver =>
			{
				this.__ExisteIdentificadorUsuarioInternoAsync(identificadorUsuario ,  function(resultado: Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario)
				{
					resolver(resultado);
				});
			});
		}
		private __ExisteIdentificadorUsuarioInternoAsync(identificadorUsuario : string, callback: CallbackResultado<Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario>): void
		{
			this.ChamarServicoAsync("ExisteIdentificadorUsuarioAsync", arguments);
		}
		//async
		public ValidarCredencialAsync(credencial : Snebur.Seguranca.CredencialUsuario) : Promise<Snebur.Dominio.EnumResultadoValidacaoCredencial>
		{
			return new Promise<Snebur.Dominio.EnumResultadoValidacaoCredencial>(resolver =>
			{
				this.__ValidarCredencialInternoAsync(credencial ,  function(resultado: Snebur.Dominio.EnumResultadoValidacaoCredencial)
				{
					resolver(resultado);
				});
			});
		}
		private __ValidarCredencialInternoAsync(credencial : Snebur.Seguranca.CredencialUsuario, callback: CallbackResultado<Snebur.Dominio.EnumResultadoValidacaoCredencial>): void
		{
			this.ChamarServicoAsync("ValidarCredencialAsync", arguments);
		}
		//async
		public SessaoUsuarioAtivaAsync(credencial : Snebur.Seguranca.CredencialUsuario, identificadorSessaoUsuario : string) : Promise<boolean>
		{
			return new Promise<boolean>(resolver =>
			{
				this.__SessaoUsuarioAtivaInternoAsync(credencial, identificadorSessaoUsuario ,  function(resultado: boolean)
				{
					resolver(resultado);
				});
			});
		}
		private __SessaoUsuarioAtivaInternoAsync(credencial : Snebur.Seguranca.CredencialUsuario, identificadorSessaoUsuario : string, callback: CallbackResultado<boolean>): void
		{
			this.ChamarServicoAsync("SessaoUsuarioAtivaAsync", arguments);
		}
		//async
		public RetornarUsuarioAsync(credencial : Snebur.Seguranca.CredencialUsuario) : Promise<Snebur.Dominio.IUsuario>
		{
			return new Promise<Snebur.Dominio.IUsuario>(resolver =>
			{
				this.__RetornarUsuarioInternoAsync(credencial ,  function(resultado: Snebur.Dominio.IUsuario)
				{
					resolver(resultado);
				});
			});
		}
		private __RetornarUsuarioInternoAsync(credencial : Snebur.Seguranca.CredencialUsuario, callback: CallbackResultado<Snebur.Dominio.IUsuario>): void
		{
			this.ChamarServicoAsync("RetornarUsuarioAsync", arguments);
		}
		//async
		public AutenticarAsync(credencial : Snebur.Seguranca.CredencialUsuario) : Promise<Snebur.Comunicacao.ResultadoAutenticacao>
		{
			return new Promise<Snebur.Comunicacao.ResultadoAutenticacao>(resolver =>
			{
				this.__AutenticarInternoAsync(credencial ,  function(resultado: Snebur.Comunicacao.ResultadoAutenticacao)
				{
					resolver(resultado);
				});
			});
		}
		private __AutenticarInternoAsync(credencial : Snebur.Seguranca.CredencialUsuario, callback: CallbackResultado<Snebur.Comunicacao.ResultadoAutenticacao>): void
		{
			this.ChamarServicoAsync("AutenticarAsync", arguments);
		}
		//async
		public RetornarSessaoUsuarioAsync(identificadorSessaoUsuario : string) : Promise<Snebur.Dominio.ISessaoUsuario>
		{
			return new Promise<Snebur.Dominio.ISessaoUsuario>(resolver =>
			{
				this.__RetornarSessaoUsuarioInternoAsync(identificadorSessaoUsuario ,  function(resultado: Snebur.Dominio.ISessaoUsuario)
				{
					resolver(resultado);
				});
			});
		}
		private __RetornarSessaoUsuarioInternoAsync(identificadorSessaoUsuario : string, callback: CallbackResultado<Snebur.Dominio.ISessaoUsuario>): void
		{
			this.ChamarServicoAsync("RetornarSessaoUsuarioAsync", arguments);
		}
		//async
		public CadastrarNovoUsuarioAsync(novoUsuario : Snebur.Dominio.NovoUsuario, isAlterarSenhaProximoAcesso : boolean) : Promise<Snebur.Dominio.IUsuario>
		{
			return new Promise<Snebur.Dominio.IUsuario>(resolver =>
			{
				this.__CadastrarNovoUsuarioInternoAsync(novoUsuario, isAlterarSenhaProximoAcesso ,  function(resultado: Snebur.Dominio.IUsuario)
				{
					resolver(resultado);
				});
			});
		}
		private __CadastrarNovoUsuarioInternoAsync(novoUsuario : Snebur.Dominio.NovoUsuario, isAlterarSenhaProximoAcesso : boolean, callback: CallbackResultado<Snebur.Dominio.IUsuario>): void
		{
			this.ChamarServicoAsync("CadastrarNovoUsuarioAsync", arguments);
		}
		//async
		public EnviarCodigoRecuperarSenhaAsync(identificadorAmigavel : string) : Promise<Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha>
		{
			return new Promise<Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha>(resolver =>
			{
				this.__EnviarCodigoRecuperarSenhaInternoAsync(identificadorAmigavel ,  function(resultado: Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha)
				{
					resolver(resultado);
				});
			});
		}
		private __EnviarCodigoRecuperarSenhaInternoAsync(identificadorAmigavel : string, callback: CallbackResultado<Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha>): void
		{
			this.ChamarServicoAsync("EnviarCodigoRecuperarSenhaAsync", arguments);
		}
		//async
		public ValidarCodigRecuperarSenhaAsync(identificadorAmigavel : string, codigoRecuperarSenha : string) : Promise<Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha>
		{
			return new Promise<Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha>(resolver =>
			{
				this.__ValidarCodigRecuperarSenhaInternoAsync(identificadorAmigavel, codigoRecuperarSenha ,  function(resultado: Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha)
				{
					resolver(resultado);
				});
			});
		}
		private __ValidarCodigRecuperarSenhaInternoAsync(identificadorAmigavel : string, codigoRecuperarSenha : string, callback: CallbackResultado<Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha>): void
		{
			this.ChamarServicoAsync("ValidarCodigRecuperarSenhaAsync", arguments);
		}
		//async
		public RecuperarSenhaAsync(identificadorAmigavel : string, codigoRecuperarSenha : string, novaSenha : string) : Promise<Snebur.Comunicacao.ResultadoRecuperarSenha>
		{
			return new Promise<Snebur.Comunicacao.ResultadoRecuperarSenha>(resolver =>
			{
				this.__RecuperarSenhaInternoAsync(identificadorAmigavel, codigoRecuperarSenha, novaSenha ,  function(resultado: Snebur.Comunicacao.ResultadoRecuperarSenha)
				{
					resolver(resultado);
				});
			});
		}
		private __RecuperarSenhaInternoAsync(identificadorAmigavel : string, codigoRecuperarSenha : string, novaSenha : string, callback: CallbackResultado<Snebur.Comunicacao.ResultadoRecuperarSenha>): void
		{
			this.ChamarServicoAsync("RecuperarSenhaAsync", arguments);
		}
		//async
		public AlterarSenhaAsync(credencial : Snebur.Seguranca.CredencialUsuario, novaSenha : string) : Promise<Snebur.Comunicacao.ResultadoAlterarSenha>
		{
			return new Promise<Snebur.Comunicacao.ResultadoAlterarSenha>(resolver =>
			{
				this.__AlterarSenhaInternoAsync(credencial, novaSenha ,  function(resultado: Snebur.Comunicacao.ResultadoAlterarSenha)
				{
					resolver(resultado);
				});
			});
		}
		private __AlterarSenhaInternoAsync(credencial : Snebur.Seguranca.CredencialUsuario, novaSenha : string, callback: CallbackResultado<Snebur.Comunicacao.ResultadoAlterarSenha>): void
		{
			this.ChamarServicoAsync("AlterarSenhaAsync", arguments);
		}
		//async
		public FinalizarSessaoUsuarioAsync(identificadorSessaoUsuario : string) : Promise<void>
		{
			return new Promise<void>(resolver =>
			{
				this.__FinalizarSessaoUsuarioInternoAsync(identificadorSessaoUsuario ,  function(resultado: void)
				{
					resolver(resultado);
				});
			});
		}
		private __FinalizarSessaoUsuarioInternoAsync(identificadorSessaoUsuario : string, callback: CallbackResultado<void>): void
		{
			this.ChamarServicoAsync("FinalizarSessaoUsuarioAsync", arguments);
		}
		//#endregion

        public constructor(urlServico: string, urlServicoDebug?:string)
        {
			super(urlServico, urlServicoDebug);
        }

      
    }
}