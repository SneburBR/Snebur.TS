namespace Snebur.Utilidade
{
    export class SessaoUsuarioUtil
    {
        public static readonly CHAVE_DADOS_SESSAO_USUARIO: string = "CHAVE_SESSAO_USUARIO";

        public static RetornarInformacaoSessaoUsuario(): Snebur.Dominio.InformacaoSessao 
        {
            const informacao = new Snebur.Dominio.InformacaoSessao({
                IdentificadorAplicacao: $Configuracao.IdentificadorAplicacao,
                VersaoAplicacao: $Configuracao.Versao,
                Resolucao: u.SistemaUtil.Resolucao,
                Plataforma: u.SistemaUtil.Plataforma,
                TipoAplicacao: u.SistemaUtil.TipoAplicacao,
                SistemaOperacional: u.SistemaUtil.SistemaOperacional,
                Navegador: u.SistemaUtil.Navegador,
                Idioma: u.SistemaUtil.Idioma,
            });
            return informacao;
        }

        public static RetornarCredencialUsuario(): Snebur.Seguranca.CredencialUsuario
        {
            const cache = SessaoUsuarioUtil.RetornarCacheSessaoUsuairo();
            const credencial = new s.CredencialUsuario({
                IdentificadorUsuario : cache.Credencial.IdentificadorUsuario,
                Senha: cache.Credencial.Senha,
                Nome: cache.Credencial.Nome,
                IdentificadorAmigavel: cache.Credencial.IdentificadorAmigavel
            });
           
            return credencial;
        }

        public static RetornarIdentificadorSessaoUsuario(): string
        {
            const cache = SessaoUsuarioUtil.RetornarCacheSessaoUsuairo();
            return cache.IdentificadorSessaoUsuario;
        }

        public static SalvarSessaoUsuario(
            credencial: s.CredencialUsuario,
            identificadorSessaoUsuario: string,
            isManterConectado: boolean): void
        {
            const cache = new ap.CacheSessaoUsuario();
            cache.IdentificadorSessaoUsuario = identificadorSessaoUsuario;
            cache.Credencial.IdentificadorUsuario = credencial.IdentificadorUsuario;
            cache.Credencial.Senha = credencial.Senha;
            cache.Credencial.IdentificadorAmigavel = credencial.IdentificadorAmigavel;
            cache.Credencial.Nome = credencial.Nome;

            const json = JSON.stringify(cache);
            CookieUtil.SalvarCookie(SessaoUsuarioUtil.CHAVE_DADOS_SESSAO_USUARIO, json, isManterConectado);
        }

        public static async InicializarNovaSessaoUsuarioAsync(
            credencial: s.CredencialUsuario,
            usuario: d.IUsuario,
            identificadorAmiguavel: string,
            isManterConectado: boolean): Promise<void>
        {
            if (usuario == null)
            {
                throw new Erro("O usuario não foi definido");
            }

            const identificadorSessaoUsuario = GuidUtil.RetornarNovoGuid();
            const credencialCache = new s.CredencialUsuario();
            credencialCache.Nome = usuario.Nome;
            credencialCache.IdentificadorAmigavel = identificadorAmiguavel;
            credencialCache.IdentificadorUsuario = usuario.IdentificadorUsuario;
            credencialCache.Senha = credencial.Senha;
            SessaoUsuarioUtil.SalvarSessaoUsuario(credencialCache, identificadorSessaoUsuario, isManterConectado);
            $Aplicacao.Usuario = usuario;
            await $Aplicacao.InicializarSessaoUsuarioAsync();
        }

        //public static InicializarNovaSessaoUsuarioAsync(usuario: d.IUsuario, callback: Callback): void
        //{
        //    let identificadorSessaoUsuario = GuidUtil.RetornarNovoGuid();
        //    let credencial = new s.CredencialUsuario();
        //    credencial.IdentificadorUsuario = usuario.IdentificadorUsuario;
        //    credencial.Senha = usuario.Senha;
        //    this.SalvarSessaoUsuario(credencial, identificadorSessaoUsuario);
        //    callback();
        //}

        private static RetornarCacheSessaoUsuairo(): ap.CacheSessaoUsuario
        {
            const jsonCacheSessaoUsuario = CookieUtil.RetornarCookie(SessaoUsuarioUtil.CHAVE_DADOS_SESSAO_USUARIO);
            if (String.IsNullOrEmpty(jsonCacheSessaoUsuario))
            {
                SessaoUsuarioUtil.IniciarNovaSessaoUsuarioAnonima();
                return SessaoUsuarioUtil.RetornarCacheSessaoUsuairo();
            }
            const dados: ap.CacheSessaoUsuario = JSON.parse(jsonCacheSessaoUsuario);
            if (!ap.CacheSessaoUsuario.IsValido(dados))
            {
                LogUtil.Erro(new ErroOperacaoInvalida("O dados da sessão usuário salva no cookie são inválidos", this));
                SessaoUsuarioUtil.IniciarNovaSessaoUsuarioAnonima();
                return SessaoUsuarioUtil.RetornarCacheSessaoUsuairo();
            }
            return dados;
        }

        public static IniciarNovaSessaoUsuarioAnonima(): void   
        {
            this.SalvarSessaoUsuario(
                s.CredencialAnonimo.Anonimo,
                GuidUtil.RetornarNovoGuid(),
                true);

            if ($Aplicacao instanceof Snebur.Aplicacao.BaseAplicacao)
            {
                $Aplicacao.Usuario = null;
            }
        }

        public static async SairAsync()
        {
            return $Aplicacao.SairAsync();
        }

        public static get LocalAtiva(): d.ISessaoUsuario
        {
            return {
                Status: Snebur.Dominio.EnumStatusSessaoUsuario.Ativo
            } as d.ISessaoUsuario;
        }
    }
}