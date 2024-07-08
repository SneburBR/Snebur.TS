namespace Snebur.UI
{
    export class PropriedadeBarraRolagemVertical extends PropriedadeApresentacao<EnumBarraRolagem>
    {
        private static readonly PREFIXO_CLASSE_CSS_BARRA_ROLAGEM_VERTICAL = "ap-barra-rolagem-vertical--";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_VERTICAL_OCULTA = "ap-barra-rolagem-vertical--oculta";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_VERTICAL_AUTOMATICA = "ap-barra-rolagem-vertical--automatica";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_VERTICAL_VISIVEL = "ap-barra-rolagem-vertical--visivel";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_VERTICAL_TRANSBORDAR = "ap-barra-rolagem-vertical--transbordar";

        public constructor()
        {
            super(AtributosHtml.BarraRolagemVertical);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, alinhamento: EnumBarraRolagem): string
        {
            if (alinhamento === EnumBarraRolagem.NaoDefino)
            {
                return String.Empty;
            }
            return EnumUtil.RetornarDescricao(EnumBarraRolagem, alinhamento);
        }

        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): EnumBarraRolagem
        {
            if (String.IsNullOrEmpty(valorDom))
            {
                return EnumBarraRolagem.NaoDefino;
            }
            return EnumUtil.RetornarValor(EnumBarraRolagem, valorDom);
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, alinhamento: EnumBarraRolagem): void
        {
            const elemento = componenteApresentacao.ElementoApresentacao;
            CssClassUtil.RemoverClssClasseComecaCom(elemento, PropriedadeBarraRolagemVertical.PREFIXO_CLASSE_CSS_BARRA_ROLAGEM_VERTICAL);

            if (alinhamento !== EnumBarraRolagem.NaoDefino)
            {
                const cssClasse = this.RetornarCssClasseAlinhamento(alinhamento);
                elemento.classList.add(cssClasse);
            }
        }

        private RetornarCssClasseAlinhamento(alinhamento: EnumBarraRolagem): string
        {
            switch (alinhamento)
            {
                case EnumBarraRolagem.NaoDefino:

                    return String.Empty;

                case EnumBarraRolagem.Oculta:

                    return PropriedadeBarraRolagemVertical.NOME_CLASSE_CSS_BARRA_ROLAGEM_VERTICAL_OCULTA;

                case EnumBarraRolagem.Automatica:

                    return PropriedadeBarraRolagemVertical.NOME_CLASSE_CSS_BARRA_ROLAGEM_VERTICAL_AUTOMATICA;

                case EnumBarraRolagem.Visivel:

                    return PropriedadeBarraRolagemVertical.NOME_CLASSE_CSS_BARRA_ROLAGEM_VERTICAL_VISIVEL;

                case EnumBarraRolagem.Transbordar:

                    return PropriedadeBarraRolagemVertical.NOME_CLASSE_CSS_BARRA_ROLAGEM_VERTICAL_TRANSBORDAR;

                default:
                    console.error(`Alinhamento não suportado ${alinhamento}`);
                    return String.Empty;
            }

        }
    }
}
