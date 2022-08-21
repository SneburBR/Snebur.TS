/*eslint-disable*/

namespace Snebur
{
    Boolean.prototype.__RetornarTipo = function (): Snebur.Reflexao.TipoPrimario
    {
        return u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.Boolean);
    };

    Boolean.prototype.GetType = function (): Snebur.Reflexao.TipoPrimario
    {
        return this.__RetornarTipo();
    };

    Object.defineProperty(Boolean.prototype, "GetHashCode", {

        value: function ()
        {
            return (this == true) ? 1 : 0;
        },
        enumerable: true,
    });

    Object.defineProperty(Boolean.prototype, "Equals", {

        value: function (obj: string, ignorarCase?: boolean)
        {
            return this == obj;
        },
        writable: false,
        configurable: false,
        enumerable: false
    });
     
}
