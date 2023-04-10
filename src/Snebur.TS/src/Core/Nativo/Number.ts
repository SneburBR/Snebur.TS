
namespace Snebur
{
    Object.defineProperty(Number.prototype, "Equals", {

        value: function (obj: any)
        {
            /*eslint-disable*/
            return this == obj;
            /*eslint-enable*/
        },
        writable: false,
        configurable: false,
        enumerable: false
    });


    Number.prototype.replace = function (this: number, searchValue: any, replaceValue: any)
    {
        const _str = this.toString();
        return _str.replace(searchValue, replaceValue);
    };

    Number.prototype.__RetornarTipo = function (): Snebur.Reflexao.TipoPrimario
    {
        if (u.ValidacaoUtil.IsInteger(this))
        {
            if (this < 2147483647)
            {
                return (u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.Integer));
            } else
            {
                return (u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.Long));
            }
        } else
        {
            return (u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.Double));
        }
    };

    Number.prototype.GetType = function (): Snebur.Reflexao.TipoPrimario
    {
        return this.__RetornarTipo();
    };

    //Number.prototype.ToString = function (args?: any): string
    //{
    //    return this.toString(args);
    //}

    Number.prototype.ToInteger = function (this: number): number
    {
        return parseInt(Math.round(this));
        //return u.ConverterUtil.ParaInteiro(this);
    };

    Number.prototype.ToPixels = function (this: number, dpi: number = null, formatar: boolean = true): any
    {
        if (typeof dpi === "number" && dpi >= 0)
        {
            if (dpi === 0)
            {
                console.warn("Formatação ToPìxels, falha, dpi == 0");
            }
            const pixels = MedidaUtil.RetornarPixelsVisualizacao(this, dpi);
            if (formatar)
            {
                return pixels.ToPixels();
            }
            return pixels;
        }

        if (isNaN(this))
        {
            const mensagemErro = "Não é possível transformar NaN para pixels";
            if ($Configuracao.IsDebug)
            {
                throw new Erro(mensagemErro);
            }
            else
            {
                console.error(mensagemErro);
            }
        }
        return this.toFixed(2) + "px";
    };

    Number.prototype.ToRems = function (this: number, tamanhoFonteDocumento: number = 16): string
    {
        return (this / tamanhoFonteDocumento).toFixed(4) + "rem";
    };

    Number.prototype.ToDecimal = function (this: number): number
    {
        return Math.round(this * 100) / 100;
    };

    Number.prototype.ToAbsoluto = function (this: number): number
    {
        return Math.abs(this);
    };
    Number.prototype.ToContrario = function (this: number): number
    {
        return this * -1;
    };
    Number.prototype.ToNegativo = function (): number
    {
        return this.ToAbsoluto() * -1;
    };

    //por questão de performance, object são mais rápidos q potencia
    //const __multplicadoresDecimal__: { [key: number]: number, } = {

    //    1: 10,
    //    2: 100,
    //    3: 1000,
    //    4: 10000,
    //    5: 100000,
    //    6: 1000000,
    //    7: 10000000,
    //    8: 100000000,
    //};

    Number.prototype.ToDecimal = function (this: number, casas: number = 2): number
    {
        //Foi feito assim por motivo de performance, if são 40% mais rápidos q usar objects e 100% mais q usar Math.pow
        if (casas === 1)
        {
            return Math.round(this * 10) / 10;
        }
        if (casas === 2)
        {
            return Math.round(this * 100) / 100;
        }
        if (casas === 3)
        {
            return Math.round(this * 1000) / 1000;
        }
        if (casas === 4)
        {
            return Math.round(this * 10000) / 10000;
        }
        const multiplicador = Math.pow(10, casas);
        /*const multiplicador = __multplicadoresDecimal__[casas];*/
        return Math.round(this * multiplicador) / multiplicador;
    };

    Number.prototype.HasFlag = function (this: number, valor)
    {
        return (this & valor) === valor;
    };

    Number.prototype.ToCentimetos = function (this: number, dpi: number)
    {
        return MedidaUtil.ParaCentimentros(this, dpi);
    };

    Object.defineProperty(Number.prototype, "GetHashCode", {

        value: function ()
        {
            return this;
        },
        enumerable: true,
    });

}

