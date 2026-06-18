
namespace Snebur.Aplicacao
{
    export class CacheSessaoUsuario
    {
        public readonly IdentificadorSessaoUsuario: string;
        public readonly Credencial: d.ICredencialUsuario;

        public constructor(identificadorSessaoUsuario: string, credencial: d.ICredencialUsuario)
        {
            this.IdentificadorSessaoUsuario = identificadorSessaoUsuario;
            this.Credencial = {
                IdentificadorUsuario: credencial.IdentificadorAmigavel,
                Nome: credencial.Nome,
                Senha: credencial.Senha,
                IdentificadorAmigavel: credencial.IdentificadorAmigavel
            };
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

