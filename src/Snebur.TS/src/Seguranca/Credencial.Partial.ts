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
   

     
}