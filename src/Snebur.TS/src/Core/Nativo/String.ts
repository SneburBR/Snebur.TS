
namespace Snebur
{

    String.prototype.All = function (funcaoTodos: (value: string) => boolean): boolean
    {
        const len = this.length;
        for (let i = 0; i < len; i++)
        {
            const caracter = this.charAt(i);
            if (!funcaoTodos(caracter))
            {
                return false;
            }
        }
        return true;
    };

    String.prototype.Any = function (funcaoAny: (value: string) => boolean): boolean
    {
        const len = this.length;
        for (let i = 0; i < len; i++)
        {
            const caracter = this.charAt(i);
            if (funcaoAny(caracter))
            {
                return true;
            }
        }
        return false;
    };
    String.prototype.__RetornarTipo = function (): Snebur.Reflexao.TipoPrimario
    {
        if (u.ValidacaoUtil.IsGuid(this.toString()))
        {
            return u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.Guid);
        }
        else
        {
            return u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.String);
        }
    };
    String.prototype.GetType = function (): Snebur.Reflexao.TipoPrimario
    {
        return this.__RetornarTipo();
    };
    String.prototype.StartsWith = function (this: string, texto: string, isIgnorarCasoSensivel?: boolean): boolean
    {
        if (typeof this.startsWith === "function")
        {
            return this.startsWith(texto);
        }

        if (isIgnorarCasoSensivel)
        {
            return this.toLowerCase().indexOf(texto.toLowerCase()) === 0;
        }
        return this.indexOf(texto) === 0;
    };

    String.prototype.EndsWith = function (texto: string, isIgnorarCasoSensivel?: boolean): boolean
    {
        if (isIgnorarCasoSensivel)
        {
            return this.slice(-texto.length).toLowerCase() === texto.toLowerCase();
        }
        return this.slice(-texto.length) === texto;
    };

    String.prototype.Replace = function (procurar: string | RegExp, substituir: any): string
    {
        return this.replace(procurar, substituir);
    };

    String.prototype.ReplaceAll = function (this: string, procurar: string | RegExp, substituir: any): string
    {
        if (procurar instanceof RegExp)
        {
            let temp = this;
            while (procurar.test(temp))
            {
                temp = temp.replace(procurar, substituir);
            }
            return temp;
        }

        if (typeof (this as any).replaceAll === "function")
        {
            return (this as any).replaceAll(procurar, substituir);
        }

        if (typeof procurar === "string")
        {
            /*eslint-disable*/
            return this.replace(new RegExp(procurar.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), substituir);
            /*eslint-enable*/
        }
        throw new Erro("Replace all");
    };

    Object.defineProperty(String.prototype, "Equals", {

        value: function (this: string, obj: string, comparacao?: Snebur.EnumStringComparacao | boolean)
        {
            if (typeof comparacao === "number")
            {
                return Util.StringIgual(this, obj, comparacao);
                //if (ignorarCase && typeof obj === "string")
                //{
                //    return (this.toLowerCase().trim() === obj.toLowerCase().trim());
                //}
            }

            if (typeof comparacao === "boolean" && comparacao)
            {
                return (this.toLowerCase().trim() === obj.toLowerCase().trim());
            }

            if (obj === null)
            {
                return this?.trim().length === 0;
            }
            return this.toString() === obj;


        },
        writable: false,
        configurable: false,
        enumerable: false
    });

    String.prototype.Contains = (function (texto: string, isIgnoreCase?: boolean): boolean
    {
        if (typeof texto === "string" && texto.length > 0)
        {
            if (isIgnoreCase)
            {
                return (this as string).toLowerCase().indexOf(texto.toLowerCase()) >= 0;
            }
            return this.indexOf(texto) >= 0;
        }
        return false;

    });

    String.prototype.Split = function (divisor, isRemoveEmptyString?: boolean): Array<string>
    {
        if (!(this.trim().length > 0))
        {
            return [];
        }
        else
        {
            const partes = (this as string).split(divisor);
            if (isRemoveEmptyString)
            {
                return partes.map(x => x.trim()).filter(x => x.length > 0);
            }
            return partes.map(x => x.trim());
        }
    };

    String.prototype.ToNumber = function (this: string, removerPixelsOrRem: boolean)
    {
        if (removerPixelsOrRem)
        {
            return u.ConverterUtil.ParaNumero((this as string).replace("px", String.Empty).replace("em", String.Empty));
        }
        return u.ConverterUtil.ParaNumero(this);
    };

    String.prototype.GetHashCode = function ()
    {
        let hash = 0;
        if (this.length === 0)
        {
            return hash;
        }
        for (let i = 0; i < this.length; i++)
        {
            hash = ((hash << 5) - hash) + this.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    };

    String.prototype.ToArray = function ()
    {
        const chars = [];
        for (let i = 0; i < this.length; i++)
        {
            chars.push(this[i]);
        }
        return chars;
    };

    String.prototype.Remove = function (this: string, startIndex: number, count: number): string
    {
        return this.slice(0, startIndex) + this.slice(startIndex + count);
    };


}