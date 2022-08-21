

namespace Snebur
{

    Number.__CaminhoTipo = "Double";

    Number.IsInteger = function (obj: any): boolean
    {
        return u.ValidacaoUtil.IsInteger(obj);
    };
    Number.IsNumber = function (obj: any): boolean
    {
        return u.ValidacaoUtil.IsNumber(obj);
    };
    Number.IsDecimal = function (obj: any): boolean
    {
        return u.ValidacaoUtil.IsDecimal(obj);
    };
    Number.Parse = function (obj: any): number
    {
        return u.ConverterUtil.ParaNumero(obj, false);
    };
    Number.__RetornarTipo = function ()
    {
        return u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.Double);
    };
    Number.GetType = function (): Snebur.Reflexao.TipoPrimario
    {
        return this.__RetornarTipo();
    };

    Number.Int8MinValue = -128;
    Number.Int8MaxValue = 127;

    Number.Uint8MinValue = 0;
    Number.Uint8MaxValue = 255;

    Number.Int16MinValue = -32768;
    Number.Int16MaxValue = 32767;

    Number.UInt16MinValue = 0;
    Number.UInt16MaxValue = 65535;

    Number.Int32MinValue = -2147483648;
    Number.Int32MaxValue = 2147483647;

    Number.UInt32MinValue = 0;
    Number.UInt32MaxValue = 4294967295;

    Number.Int64MinValue = -9223372036854775808;
    Number.Int64MaxValue = 9223372036854775807;

    Number.UInt64MinValue = 0;
    Number.UInt64MaxValue = 18446744073709551615;
}
