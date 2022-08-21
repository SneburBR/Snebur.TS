namespace Snebur.Expressao
{
    export class ExpressaoPropriedadeComparar extends ExpressaoPropriedade
    {

        public constructor(expressaoTexto: string, tipoPrefixo: r.TipoBaseDominio, prefixo: string, argumentos: Array<any>)
        {
            super(expressaoTexto, tipoPrefixo, prefixo, argumentos);

            const partes = expressaoTexto.split(" ");
            const esquerda = partes[0];
            const descricaoOperador = partes[1];
            const direita = partes[2];

            if (esquerda.Contains(this.Prefixo) && direita.Contains(this.Prefixo))
            {
                throw new ErroOperacaoInvalida(`A espressão é invalida ${expressaoTexto}`, this);
            }
            this.Operador = OperadorUtil.RetornarOperador(descricaoOperador);

            const isEsquerdaPropriedae = esquerda.Contains(this.Prefixo);
            const parteCaminhoPropriedade: string = (isEsquerdaPropriedae) ? esquerda : direita;
            const expressaoValor: string = (isEsquerdaPropriedae) ? direita : esquerda;

            this.CaminhoPropriedade = this.RetornarCaminhoPropriedade(parteCaminhoPropriedade);
            this.Propriedade = this.RetornarPropriedade(this.CaminhoPropriedade);
            this.Valor = this.RetornarValor(expressaoValor);
        }
    }
}