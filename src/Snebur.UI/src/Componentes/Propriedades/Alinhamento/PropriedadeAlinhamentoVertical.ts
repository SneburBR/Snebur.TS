namespace Snebur.UI
{
    export class PropriedadeAlinhamentoVertical extends PropriedadeApresentacao<EnumAlinhamentoVertical>
	{
        private static readonly PREFIXO_CLASSE_CSS_ALINHAMENTO_VERTICAL = "ap-alinhamento-vertical--";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_SUPERIOR = "ap-alinhamento-vertical--superior";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_CENTRO = "ap-alinhamento-vertical--centro";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_INFERIOR = "ap-alinhamento-vertical--inferior";

        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_SUPERIOR_ABSOLUTO = "ap-alinhamento-vertical--superior-absoluto";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_CENTRO_ABSOLUTO = "ap-alinhamento-vertical--centro-absoluto";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_INFERIOR_ABSOLUTO = "ap-alinhamento-vertical--inferior-absoluto";


        public constructor()
        {
            super(AtributosHtml.AlinhamentoVertical);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao,alinhamento: EnumAlinhamentoVertical): string
        {
            if (alinhamento === EnumAlinhamentoVertical.Superior)
            {
                return String.Empty;
            }
            return EnumUtil.RetornarDescricao(EnumAlinhamentoVertical, alinhamento);

        }
        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao,valorDom: string): EnumAlinhamentoVertical
        {
            if (String.IsNullOrEmpty(valorDom))
            {
                return EnumAlinhamentoVertical.Superior;
            }
            return EnumUtil.RetornarValor(EnumAlinhamentoVertical, valorDom);
        }
        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, alinhamento: EnumAlinhamentoVertical): void
        {
            const elemento = componenteApresentacao.Elemento;
            CssClassUtil.RemoverClssClasseComecaCom(elemento, PropriedadeAlinhamentoVertical.PREFIXO_CLASSE_CSS_ALINHAMENTO_VERTICAL);

            if (alinhamento !== EnumAlinhamentoVertical.Superior)
            {
                const cssClasse = this.RetornarCssClasseAlinhamento(alinhamento);
                elemento.classList.add(cssClasse);
            }
        }

        private RetornarCssClasseAlinhamento(alinhamento: EnumAlinhamentoVertical): string
        {
            switch (alinhamento)
            {
                case EnumAlinhamentoVertical.Superior:

                    return String.Empty;

                case EnumAlinhamentoVertical.Centro:

                    return PropriedadeAlinhamentoVertical.NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_CENTRO;

                case EnumAlinhamentoVertical.Inferior:

                    return PropriedadeAlinhamentoVertical.NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_INFERIOR;

                case EnumAlinhamentoVertical.SuperiorAbsoluto:

                    return PropriedadeAlinhamentoVertical.NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_SUPERIOR_ABSOLUTO;

                case EnumAlinhamentoVertical.CentroAbsoluto:

                    return PropriedadeAlinhamentoVertical.NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_CENTRO_ABSOLUTO;

                case EnumAlinhamentoVertical.InferiorAbsoluto:

                    return PropriedadeAlinhamentoVertical.NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_INFERIOR_ABSOLUTO;

                default:

                    throw new Erro("O alinhamento vertical não é suportado");
            }

        }
	}
}
