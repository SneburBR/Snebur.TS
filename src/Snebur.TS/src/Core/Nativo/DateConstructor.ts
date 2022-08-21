
namespace Snebur
{
    Date.__CaminhoTipo = "DateTime";

    Date.__RetornarTipo = function (): Snebur.Reflexao.TipoPrimario
    {
        return u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.DateTime);
    };

    Date.GetType = function (): Snebur.Reflexao.TipoPrimario
    {
        return this.__RetornarTipo();
    };
    Date.Parse = function (obj: any): Date
    {
        return u.ConverterUtil.ParaData(obj);
    };

    Object.defineProperty(Date, "DataInicioUnix", {
        get: function ()
        {
            return new Date(1970, 0, 1, 0, 0, 0, 0);
        }
    });
}

interface DateConstructor
{
   readonly DataInicioUnix: Date;
}