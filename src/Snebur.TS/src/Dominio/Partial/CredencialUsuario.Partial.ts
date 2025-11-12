namespace Snebur.Seguranca
{
	export interface CredencialUsuario
	{
		readonly IsAnonimo:boolean
	}

	Object.defineProperty(CredencialUsuario.prototype, "IsAnonimo", {
		get: function (this: CredencialUsuario): boolean
		{
			return u.ValidacaoUtil.CredencialValida(this, s.CredencialAnonimo.Anonimo);
		}
	});
}
