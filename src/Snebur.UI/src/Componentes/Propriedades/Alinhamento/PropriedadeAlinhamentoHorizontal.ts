namespace Snebur.UI
{
    export class PropriedadeAlinhamentoHorizontal extends PropriedadeApresentacao<EnumAlinhamentoHorizontal>
    {
        private static readonly PREFIXO_CLASSE_CSS_ALINHAMENTO_HORIZONTAL = "ap-alinhamento-horizontal--";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_ESQUERDA = "ap-alinhamento-horizontal--esquerda";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_CENTRO = "ap-alinhamento-horizontal--centro";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_DIREITA = "ap-alinhamento-horizontal--direita";

        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_ESQUERDA_ABSOLUTO = "ap-alinhamento-horizontal--esquerda-absoluto";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_CENTRO_ABSOLUTO = "ap-alinhamento-horizontal--centro-absoluto";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_DIREITA_ABSOLUTO = "ap-alinhamento-horizontal--direita-absoluto";

        public constructor()
        {
            super(AtributosHtml.AlinhamentoHorizontal);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, alinhamento: EnumAlinhamentoHorizontal): string
        {
            if (alinhamento === EnumAlinhamentoHorizontal.Esquerda)
            {
                return String.Empty;
            }
            return EnumUtil.RetornarDescricao(EnumAlinhamentoHorizontal, alinhamento);

        }
        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): EnumAlinhamentoHorizontal
        {
            if (String.IsNullOrEmpty(valorDom))
            {
                return EnumAlinhamentoHorizontal.Esquerda;
            }
            return EnumUtil.RetornarValor(EnumAlinhamentoHorizontal, valorDom);
        }
        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, alinhamento: EnumAlinhamentoHorizontal): void
        {
            const elemento = componenteApresentacao.Elemento;
            CssClassUtil.RemoverClssClasseComecaCom(elemento, PropriedadeAlinhamentoHorizontal.PREFIXO_CLASSE_CSS_ALINHAMENTO_HORIZONTAL);

            if (alinhamento !== EnumAlinhamentoHorizontal.Esquerda)
            {
                const cssClasse = this.RetornarCssClasseAlinhamento(alinhamento);
                elemento.classList.add(cssClasse);
            }
        }

        private RetornarCssClasseAlinhamento(alinhamento: EnumAlinhamentoHorizontal): string
        {
            switch (alinhamento)
            {
                case EnumAlinhamentoHorizontal.Esquerda:

                    return String.Empty;

                case EnumAlinhamentoHorizontal.Centro:

                    return PropriedadeAlinhamentoHorizontal.NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_CENTRO;

                case EnumAlinhamentoHorizontal.Direita:

                    return PropriedadeAlinhamentoHorizontal.NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_DIREITA;


                case EnumAlinhamentoHorizontal.EsquerdaAbsoluto:

                    return PropriedadeAlinhamentoHorizontal.NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_ESQUERDA_ABSOLUTO;

                case EnumAlinhamentoHorizontal.CentroAbsoluto:

                    return PropriedadeAlinhamentoHorizontal.NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_CENTRO_ABSOLUTO;

                case EnumAlinhamentoHorizontal.DireitaAbsoluto:

                    return PropriedadeAlinhamentoHorizontal.NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_DIREITA_ABSOLUTO;

                default:

                    throw new Erro("O alinhamento horizontal não é suportado");
            }

        }
	}
}
