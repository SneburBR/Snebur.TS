
namespace Snebur 
{
    export class ValidacaoDiferente extends ValidacaoNormal
    {
        private readonly PropriedadeComparar: r.Propriedade;
        private readonly IsFormatarSomenteNumero: boolean;

        public constructor(propriedadeComparar: r.Propriedade, isFormatarSomenteNumero: boolean)
        {
            super();

            this.PropriedadeComparar = propriedadeComparar;
            this.IsFormatarSomenteNumero = isFormatarSomenteNumero;
        }

        public IsValido(paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any): boolean
        {
            if (ValidacaoUtil.IsDefinido(valorPropriedade, true))
            {
                let valorComparar = this.PropriedadeComparar.RetornarValor(paiPropriedade);
                if (this.IsFormatarSomenteNumero)
                {
                    valorPropriedade = TextoUtil.RetornarSomenteNumeros(valorPropriedade);
                    valorComparar = TextoUtil.RetornarSomenteNumeros(valorComparar);
                }
                return Util.IsDiferente(valorPropriedade, valorComparar);
            }
            return true;
        }

        public RetornarMensagemValidacao(paiPropriedade: any, propriedade: r.Propriedade, valorPropriedade: any): string
        {
            const rotulo = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade);
            const rotuloComparar = u.GlobalizacaoUil.RetornarRotuloPropriedade(this.PropriedadeComparar);
            return `O valor do campo ${rotulo} de ser diferente do campo ${rotuloComparar}`;
        }
    }
}