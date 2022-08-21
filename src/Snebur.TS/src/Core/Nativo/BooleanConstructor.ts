
namespace Snebur
{
    Boolean.__CaminhoTipo = "Boolean";

    Boolean.__RetornarTipo = function (): Snebur.Reflexao.TipoPrimario
    {
        return u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.Boolean);
    };
    Boolean.GetType = function (): Snebur.Reflexao.TipoPrimario
    {
        return this.__RetornarTipo();
    };
    

    Boolean.Parse = function (obj: any)
    {
        return u.ConverterUtil.ParaBoolean(obj);
    };
}

