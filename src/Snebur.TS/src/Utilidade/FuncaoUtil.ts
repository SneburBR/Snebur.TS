/*eslint-disable*/
namespace Snebur.Utilidade
{
    export class FuncaoUtil
    {
        public static IsExisteBind(funcao: Function): boolean
        {
            return funcao.IsBoundThis;
            //if (funcao.IsBoundThis)
            //{
            //    return true;
            //}
            //if (ExpressaoUtil.IsEs5)
            //{
            //    return funcao.hasOwnProperty("prototype");
            //}
            //const isBindable = (f: Function) => f.hasOwnProperty("prototype");
            //return isBindable(funcao);
        }
        private static RegexNomeConstrutor = /function (.{1,})\(/;

        public static RetornarNomeConstrutor(construtor: string): string
        {
            let resultado = (FuncaoUtil.RegexNomeConstrutor).exec(construtor);
            if (resultado?.length > 0)
            {
                return FuncaoUtil.NormalizarNomeConstrutor(resultado[1].trim());
            }
            return String.Empty;
        }

        private static NormalizarNomeConstrutor(construtor: string): string
        {
            let posicaoFim = construtor.indexOf('(');
            if (posicaoFim === -1)
            {
                posicaoFim = construtor.indexOf(' ');
            }
            if (posicaoFim > 0)
            {
                return construtor.substring(0, posicaoFim);
            }
            return construtor;
        }
    }
}

interface Function
{
    readonly IsBoundThis: boolean;
    readonly BoundThis: any;
}

(function (baseBind)
{
    Object.defineProperty(Function.prototype, "bind", {

        value: function (this: Function, boundThis: any)
        {
            let funcaoBounded = baseBind.apply(this, arguments);
            funcaoBounded.BoundThis = boundThis;
            return funcaoBounded;
        },
        enumerable: false,
        configurable: false,
        writable: false
    });
     
    Object.defineProperty(Function.prototype, "IsBoundThis", {

        get: function (this: Function)
        {
            return this.hasOwnProperty("BoundThis");
        },
        enumerable: false,
        configurable: false,
    });

}(Function.prototype.bind));

// ES6

