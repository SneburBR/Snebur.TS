namespace Snebur.UI
{
    export class PropriedadeVisibilidade extends PropriedadeApresentacao<EnumVisibilidade>
    {
        private static readonly NOME_CLASSE_OCULTAR = "ap-visibilidade--ocultar";
        private static readonly NOME_CLASSE_INVISIVEL = "ap-visibilidade--invisivel";
        public static readonly PREFIXO_VISIBILIDADE = "ap-visibilidade--";

        public constructor()
        {
            super(AtributosHtml.VisibilidadeApresentacao);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, visibilidade: EnumVisibilidade): string
        {
            if (visibilidade === EnumVisibilidade.Visivel)
            {
                return String.Empty;
            }
            return EnumUtil.RetornarDescricao(EnumVisibilidade, visibilidade);
        }

        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): EnumVisibilidade
        {
            if (String.IsNullOrEmpty(valorDom))
            {
                return EnumVisibilidade.Visivel;
            }
            return EnumUtil.RetornarValor(EnumVisibilidade, valorDom);
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, visiblidade: EnumVisibilidade): void
        {
            const elemento = componenteApresentacao.Elemento;
            EstiloUtil.RemoverClssClasseComecaCom(elemento, PropriedadeVisibilidade.PREFIXO_VISIBILIDADE);

            if (visiblidade !== EnumVisibilidade.Visivel)
            {
                const cssClasse = this.RetornarCssClasseVisibilidade(visiblidade);
                elemento.classList.add(cssClasse);
            }
        }

        private RetornarCssClasseVisibilidade(visiblidade: EnumVisibilidade): string
        {
            if (visiblidade == null)
            {
                return String.Empty;
            }

            switch (visiblidade)
            {
                case EnumVisibilidade.Oculto:

                    return PropriedadeVisibilidade.NOME_CLASSE_OCULTAR;

                case EnumVisibilidade.Invisivel:

                    return PropriedadeVisibilidade.NOME_CLASSE_INVISIVEL;

                case EnumVisibilidade.Visivel:

                    return String.Empty;

                default:

                    throw new Erro("Visibilidade não suportada");
            }

        }
    }
}
