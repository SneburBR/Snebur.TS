
namespace Snebur.Aplicacao
{
    export class CacheSessaoUsuario
    {
        public IdentificadorSessaoUsuario: string;
        public Credencial: d.ICredencialUsuario;

        public constructor()
        {
            this.Credencial = {} as d.ICredencialUsuario;
        }

        public static IsValido(dados: CacheSessaoUsuario): boolean
        {
            return u.ValidacaoUtil.IsGuid(dados.IdentificadorSessaoUsuario) &&
                u.ValidacaoUtil.IsDefinido(dados.Credencial) &&
                !String.IsNullOrEmpty(dados.Credencial.IdentificadorUsuario) &&
                !String.IsNullOrEmpty(dados.Credencial.Senha) &&
                !String.IsNullOrEmpty(dados.Credencial.Nome) &&
                !String.IsNullOrEmpty(dados.Credencial.IdentificadorAmigavel);
        }
    }
}

