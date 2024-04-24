namespace Snebur.Seguranca
{
    export interface CredencialUsuario
    {
        RetornarIdentificadorEmail(): string;
        RetornarIdentificadorTelefone(): string;
    }

    CredencialUsuario.prototype.RetornarIdentificadorEmail = function ()
    {
        const _credencial: CredencialUsuario = this;
        if (ValidacaoUtil.IsEmail(_credencial.IdentificadorAmigavel))
        {
            return this.IdentificadorAmigavel;
        }
        if (ValidacaoUtil.IsEmail(_credencial.IdentificadorUsuario))
        {
            return this.IdentificadorUsuario;
        }
        return null;
    };

    CredencialUsuario.prototype.RetornarIdentificadorTelefone = function ()
    {
        const _credencial: CredencialUsuario = this;
        if (ValidacaoUtil.IsTelefone(_credencial.IdentificadorAmigavel))
        {
            return this.IdentificadorAmigavel;
        }
        if (ValidacaoUtil.IsTelefone(_credencial.IdentificadorUsuario))
        {
            return this.IdentificadorUsuario;
        }
        return null;
    };

    CredencialUsuario.prototype.Equals = function (this: CredencialUsuario, obj: CredencialUsuario)
    {
        if (obj == null)
        {
            return false;
        }

        return (this.IdentificadorUsuario === obj.IdentificadorUsuario ||
            this.IdentificadorAmigavel.toLowerCase() === obj.IdentificadorAmigavel.toLowerCase()) &&
            this.Senha === obj.Senha;
    };
}