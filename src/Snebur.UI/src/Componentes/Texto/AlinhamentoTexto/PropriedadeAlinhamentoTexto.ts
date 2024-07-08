namespace Snebur.UI
{
    export class PropriedadeAlinhamentoTexto extends PropriedadeApresentacao<EnumAlinhamentoTexto>
    {
        private static readonly PREFIXO_CLASSE_CSS_ALINHAMENTO_TEXTO = "ap-alinhamento-texto--";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_ESQUERDA = "ap-alinhamento-texto--esquerda";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_TEXTO_CENTRO = "ap-alinhamento-texto--centro";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_TEXTO_DIREITA = "ap-alinhamento-texto--direita";
        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_TEXTO_JUSTIFICADO = "ap-alinhamento-texto--justificado";

        public constructor()
        {
            super(AtributosHtml.AlinhamentoTexto);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, alinhamento: EnumAlinhamentoTexto): string
        {
            if (alinhamento === EnumAlinhamentoTexto.Esquerda)
            {
                return String.Empty;
            }
            return EnumUtil.RetornarDescricao(EnumAlinhamentoTexto, alinhamento);

        }
        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): EnumAlinhamentoTexto
        {
            if (String.IsNullOrEmpty(valorDom))
            {
                return EnumAlinhamentoTexto.Esquerda;
            }
            return EnumUtil.RetornarValor(EnumAlinhamentoTexto, valorDom);
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, alinhamento: EnumAlinhamentoTexto): void
        {
            const elemento = componenteApresentacao.Elemento;
            CssClassUtil.RemoverClssClasseComecaCom(elemento, PropriedadeAlinhamentoTexto.PREFIXO_CLASSE_CSS_ALINHAMENTO_TEXTO);

            if (alinhamento !== EnumAlinhamentoTexto.Esquerda)
            {
                const cssClasse = this.RetornarCssClasseAlinhamento(alinhamento);
                elemento.classList.add(cssClasse);
            }
        }

        private RetornarCssClasseAlinhamento(alinhamento: EnumAlinhamentoTexto): string
        {
            switch (alinhamento)
            {
                case EnumAlinhamentoTexto.Esquerda:

                    return String.Empty;

                case EnumAlinhamentoTexto.Centro:

                    return PropriedadeAlinhamentoTexto.NOME_CLASSE_CSS_ALINHAMENTO_TEXTO_CENTRO;

                case EnumAlinhamentoTexto.Direita:

                    return PropriedadeAlinhamentoTexto.NOME_CLASSE_CSS_ALINHAMENTO_TEXTO_DIREITA;

                case EnumAlinhamentoTexto.Justificado:

                    return PropriedadeAlinhamentoTexto.NOME_CLASSE_CSS_ALINHAMENTO_TEXTO_JUSTIFICADO;
                default:

                    throw new Erro("O alinhamento horizontal não é suportado");
            }

        }
    }
}
