namespace Snebur.UI
{
    export class PropriedadeCaixa extends PropriedadeApresentacao<EnumTipoCaixa>
    {
        private static readonly PREFIXO = "ap-caixa--";
        private static readonly NOME_CLASSE_PADRAO = "ap-caixa--padrao";
        private static readonly NOME_CLASSE_DELINEADA = "ap-caixa--delineada";

        public constructor()
        {
            super(AtributosHtml.TipoCaixa);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, tipoCaixa: EnumTipoCaixa): string
        {
            if (tipoCaixa === $Configuracao.ConfiguracaoFormulario.TipoCaixaPadrao)
            {
                return String.Empty;
            }
            return EnumUtil.RetornarDescricao(EnumTipoCaixa, tipoCaixa);
        }

        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): EnumTipoCaixa
        {
            if (String.IsNullOrEmpty(valorDom))
            {
                return $Configuracao.ConfiguracaoFormulario.TipoCaixaPadrao;
            }
            return EnumUtil.RetornarValor(EnumTipoCaixa, valorDom);
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, tipoCaixa: EnumTipoCaixa): void
        {
            const elemento = componenteApresentacao.Elemento;
            EstiloUtil.RemoverClssClasseComecaCom(elemento, PropriedadeCaixa.PREFIXO);

            //if (tipoCaixa != EnumTipoCaixa.Padrao)
            //{
            const cssClasse = this.RetornarCssTipoCaixa(tipoCaixa);
            elemento.classList.add(cssClasse);
            //}
        }

        private RetornarCssTipoCaixa(tipoCaixa: EnumTipoCaixa): string
        {
            switch (tipoCaixa)
            {
                case EnumTipoCaixa.Padrao:

                    return PropriedadeCaixa.NOME_CLASSE_PADRAO;

                case EnumTipoCaixa.Delineada:

                    return PropriedadeCaixa.NOME_CLASSE_DELINEADA;

                default:

                    throw new Erro("");
            }
        }
    }
}
