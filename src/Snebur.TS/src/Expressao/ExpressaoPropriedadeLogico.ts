namespace Snebur.Expressao
{
    export class ExpressaoPropriedadeLogico extends ExpressaoPropriedade
    {

        public constructor(expressaoTexto: string, tipoPrefixo: r.TipoBaseDominio, prefixo: string, argumentos: Array<any>)
        {
            super(expressaoTexto, tipoPrefixo, prefixo, argumentos);

            this.CaminhoPropriedade = this.RetornarCaminhoPropriedade(expressaoTexto);
            this.Propriedade = this.RetornarPropriedade(this.CaminhoPropriedade);
            this.Operador = EnumOperadorPropriedade.Igual;
            this.Valor = (expressaoTexto.StartsWith("!")) ? false : true;
        }
    }
}