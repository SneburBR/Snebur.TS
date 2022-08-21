

namespace Snebur
{

    /*eslint-disable*/
    (String as any).Empty = "";
    String.Format = function (): string
    {
        if ($Configuracao != null && $Configuracao?.IsDebug)
        {
            //console.warn("String.Format obsoleto " + Error().stack);
        }

        let resultado: string = '';
        let len = arguments.length;
        if (len > 0)
        {
            resultado += arguments[0];
            if (len > 1)
            {
                for (let i = 0; i < (len - 1); i++)
                {
                    let reg = new RegExp("\\{" + i + "\\}", "gm");
                    resultado = resultado.replace(reg, arguments[i + 1]);
                }
            }
        }
        return resultado;
    };
    /*eslint-enable*/


    String.IsNullOrEmpty = function (texto: string): boolean
    {
        if (typeof texto === "string")
        {
            return texto.length === 0;
        }
        return texto == null;
    };

    String.IsNullOrWhiteSpace = function (texto: string): boolean  
    {
        if (typeof texto === "string")
        {
            if (texto.length > 0)
            {
                for (let i = 0; i < texto.length; i++)
                {
                    if (!String.IsCharWhiteSpace(texto.charAt(i)))
                    {
                        return false;
                    }
                }
            }
            return true;
        }
        return texto == null;
        //return (!(u.ValidacaoUtil.IsString(texto) && (texto.trim().length > 0)));
    };

    String.IsCharWhiteSpace = function (char: string): boolean
    {
        if (typeof char !== "string")
        {
            console.error("String.IsCharWhiteSpace, O argumento char n�o foi definido ou � invalido");
            return false;
        }

        if (char.length > 1)
        {
            console.error("String.IsCharWhiteSpace, O argumento char n�o � uma string com mais de um car�cter");
            return false;
        }

        return char.length === 0 || (char.length === 1 && (char === " " ||
            char === "\t" ||
            char === "\r" ||
            char === "\n" ||
            char === "\v" ||
            char === "\f" ||
            char === "\u00a0" ||
            char === "\u1680" ||
            char === "\u2000" ||
            char === "\u200a" ||
            char === "\u2028" ||
            char === "\u2029" ||
            char === "\u202f" ||
            char === "\u205f" ||
            char === "\u3000" ||
            char === "\ufeff"));
    };

    String.Join = function (separador: string, lista: Array<string>): string
    {
        if (lista.Count > 0)
        {
            return lista.join(separador);
        }
        return String.Empty;
    };

    String.Concat = function (...argumentos: Array<string>)
    {
        const partes = new List<string>();
        for (const argumento of argumentos)
        {
            partes.Add(ConverterUtil.ParaString(argumento));
        }
        return String.Join(String.Empty, partes);
    };

    String.__RetornarTipo = function (): Snebur.Reflexao.TipoPrimario
    {
        return u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.String);
    };

    String.GetType = function (): Snebur.Reflexao.TipoPrimario
    {
        return this.__RetornarTipo();
    };

    String.Parse = function (obj: any): string
    {
        return u.ConverterUtil.ParaString(obj);
    };

    String.IsIniciaComNumero = function (texto: string): boolean
    {
        return TextoUtil.IsIniciaComNumero(texto);

    };

    String.__CaminhoTipo = "String";
}
