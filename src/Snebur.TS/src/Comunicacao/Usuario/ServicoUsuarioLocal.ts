namespace Snebur.Comunicacao
{
    export class ServicoUsuarioLocal extends Snebur.Comunicacao.BaseServicoUsuarioCliente implements Snebur.Comunicacao.IServicoUsuario
    {
        public constructor()
        {
            super("http://servico-usuario.localhost/");
        }

        public override async ExisteIdentificadorUsuarioAsync(identificadorUsuario: string): Promise<c.ResultadoExisteIdentificadoUsuario>
        {
            return new c.ResultadoExisteIdentificadoUsuario;
        }

        public override async ValidarCredencialAsync(credencial: s.CredencialUsuario): Promise<d.EnumResultadoValidacaoCredencial>
        {
            return d.EnumResultadoValidacaoCredencial.Sucesso;
        }

        public override async SessaoUsuarioAtivaAsync(credencial: s.CredencialServico, identificadorSessaoUsuario: string): Promise<boolean>
        {
            return true;
        }

        public override async FinalizarSessaoUsuarioAsync(identificadorSessaoUsuario: string): Promise<void>
        {
            return;
        }

        public override async RetornarSessaoUsuarioAsync(identificadorSessaoUsuario: string): Promise<d.ISessaoUsuario>
        {
            return u.SessaoUsuarioUtil.LocalAtiva;


        }

        public override  RetornarUsuarioAsync(credencial: s.CredencialUsuario): Promise<d.IUsuario>
        {
            return new Promise<any>(resolver =>
            {
                const usuario: Partial<d.IUsuario> = {
                    Status: d.EnumStatusUsuario.Ativo,
                    Nome: credencial.Nome,
                    Senha: credencial.Senha,
                };
                resolver(usuario);
            });
        }

        public override AutenticarAsync(credencial: s.CredencialUsuario): Promise<c.ResultadoAutenticacao>
        {
            throw new Error("Method not implemented.");
        }

        public override CadastrarNovoUsuarioAsync(novoUsuario: d.NovoUsuario, isAlterarSenhaProximoAcesso: boolean): Promise<d.IUsuario>
        {
            throw new Error("Method not implemented.");
        }
        public override EnviarCodigoRecuperarSenhaAsync(identificadorAmigavel: string): Promise<c.ResultadoEnviarCodigoRecuperarSenha>
        {
            throw new Error("Method not implemented.");
        }
        public override ValidarCodigRecuperarSenhaAsync(identificadorAmigavel: string, codigoRecuperarSenha: string): Promise<c.ResultadoValidarCodigoRecuperarSenha>
        {
            throw new Error("Method not implemented.");
        }
        public override RecuperarSenhaAsync(identificadorAmigavel: string, codigoRecuperarSenha: string, novaSenha: string): Promise<c.ResultadoRecuperarSenha>
        {
            throw new Error("Method not implemented.");
        }
        public override AlterarSenhaAsync(credencial: s.CredencialUsuario, novaSenha: string): Promise<c.ResultadoAlterarSenha>
        {
            throw new Error("Method not implemented.");
        }


        protected RetornarCredencialServico(): s.CredencialServico
        {
            const usuario = new s.CredencialUsuario();
            usuario.Nome = "Online";
            usuario.Senha = "Senha";
            return usuario;
        }

    }
}
