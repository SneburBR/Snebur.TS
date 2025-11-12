namespace Snebur.Utilidade
{
    export class SessaoUsuarioUtil
    {
        public static readonly CHAVE_DADOS_SESSAO_USUARIO: string = "CHAVE_SESSAO_USUARIO";
        public static readonly CHAVE_DADOS_CREDENCIAL_USUARI: string = "CHAVE_CREDENCIAL_USUARIO";

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
                IdentificadorUsuario: cache.Credencial.IdentificadorUsuario,
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

            const cache = new ap.CacheSessaoUsuario(identificadorSessaoUsuario, credencial);
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

            SessaoUsuarioUtil.SalvarSessaoUsuario(
                credencialCache,
                identificadorSessaoUsuario,
                isManterConectado);
            await $Aplicacao.InicializarSessaoUsuarioAsync();
        }

        private static RetornarCacheSessaoUsuairo(): ap.CacheSessaoUsuario
        {
            const jsonCacheSessaoUsuario = CookieUtil.RetornarCookie(SessaoUsuarioUtil.CHAVE_DADOS_SESSAO_USUARIO);
            if (String.IsNullOrEmpty(jsonCacheSessaoUsuario))
            {
                this.SalvarSessaoAnonima();
                return SessaoUsuarioUtil.RetornarCacheSessaoUsuairo();
            }
            const dados: ap.CacheSessaoUsuario = JSON.parse(jsonCacheSessaoUsuario);
            if (!ap.CacheSessaoUsuario.IsValido(dados))
            {
                LogUtil.Erro(new ErroOperacaoInvalida("O dados da sessão usuário salva no cookie são inválidos", this));
                this.SalvarSessaoAnonima();
                return SessaoUsuarioUtil.RetornarCacheSessaoUsuairo();
            }
            return dados;
        }

        /*@internal*/
        public static SalvarSessaoAnonima(): void
        {
            this.SalvarSessaoUsuario(
                s.CredencialAnonimo.Anonimo,
                GuidUtil.RetornarNovoGuid(),
                true);
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