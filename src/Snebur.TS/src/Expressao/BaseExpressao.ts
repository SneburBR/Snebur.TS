namespace Snebur.Expressao
{
    export abstract class Expressao
    {
        public readonly ExpressaoTexto: string;
        public readonly Prefixo: string;
        public readonly TipoPrefixo: r.TipoBaseDominio;
        public readonly Argumentos: Array<any>;

        public constructor(expressaoTexto: string, tipoPrefixo: r.TipoBaseDominio, prefixo: string, argumentos: Array<any>)
        {
            this.ExpressaoTexto = expressaoTexto.trim();
            this.Prefixo = prefixo;
            this.TipoPrefixo = tipoPrefixo;
            this.Argumentos = argumentos;
            this.ValidarParantens();
        }

        private ValidarParantens()
        {
            //var len = this.ExpressaoTexto.length;
            //var aberto = false;
            //var posicaoAbre = -1;
            //var posicaoFecha = -1;

            //var contatorParentesAbre = 0;

            //for (var i = 0; i < len; i++)
            //{
            //    let caracter = this.ExpressaoTexto[i];
            //    if (caracter == "(")
            //    {
            //        if (!aberto)
            //        {
            //            aberto = true;
            //            posicaoAbre = i;
            //        }
            //        contatorParentesAbre += 1;
            //    }
            //    if (caracter == ")")
            //    {

            //    }

            //}
        }

        private RemoverParentesString(expressaoTexto: string): string
        {
            throw new ErroNaoImplementado();
        }
    }
}