namespace Snebur.Expressao
{
    export class ExpressaoPropriedadeMetodo extends ExpressaoPropriedade
    {
        public readonly OperadorMetodo: EnumOperadorMetodo;
        public readonly Metodo: string;

        public constructor(expressaoTexto: string, tipoPrefixo: r.TipoBaseDominio, prefixo: string, argumentos: Array<any>)
        {
            super(expressaoTexto, tipoPrefixo, prefixo, argumentos);

            this.OperadorMetodo = this.RetornarOperadorMetodo();
            this.Metodo = u.EnumUtil.RetornarDescricao(EnumOperadorMetodo, this.OperadorMetodo);
            this.Operador = OperadorUtil.RetornarOperador(this.Metodo);

            const posicaoMetodo = this.ExpressaoTexto.indexOf(this.Metodo);
            const expressaoPropriedade = this.ExpressaoTexto.substring(0, posicaoMetodo - 1);
            const expressaoValor = this.ExpressaoTexto.substring(posicaoMetodo + this.Metodo.length + 1, this.ExpressaoTexto.length - 1);

            this.CaminhoPropriedade = this.RetornarCaminhoPropriedade(expressaoPropriedade);
            this.Propriedade = this.RetornarPropriedade(this.CaminhoPropriedade);
            this.Valor = this.RetornarValor(expressaoValor);
        }

        private RetornarOperadorMetodo(): EnumOperadorMetodo
        {
            const valores = u.EnumUtil.RetornarValoresEnum(EnumOperadorMetodo);
            for (let i = 0; i < valores.Count; i++)
            {
                const valor = valores[i];
                const metodo = EnumOperadorMetodo[valor];
                if (this.ExpressaoTexto.Contains(metodo))
                {
                    return valor;
                }
            }
            throw new ErroOperacaoInvalida(`O operador método não foi encontrado na expressão ${this.ExpressaoTexto}`, this);
        }
    }
}