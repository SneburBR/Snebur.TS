namespace Snebur.UI
{
    export class PropriedadeBarraRolagem extends PropriedadeApresentacao<EnumBarraRolagem>
    {
        private static readonly PREFIXO_CLASSE_CSS_BARRA_ROLAGEM = "ap-barra-rolagem--";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_OCULTA = "ap-barra-rolagem--oculta";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_AUTOMATICA = "ap-barra-rolagem--automatica";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_VISIVEL = "ap-barra-rolagem--visivel";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_TRANSBORDAR = "ap-barra-rolagem--transbordar";

        public constructor()
        {
            super(AtributosHtml.BarraRolagem);
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
            EstiloUtil.RemoverClssClasseComecaCom(elemento, PropriedadeBarraRolagem.PREFIXO_CLASSE_CSS_BARRA_ROLAGEM);

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

                    return PropriedadeBarraRolagem.NOME_CLASSE_CSS_BARRA_ROLAGEM_OCULTA;

                case EnumBarraRolagem.Automatica:

                    return PropriedadeBarraRolagem.NOME_CLASSE_CSS_BARRA_ROLAGEM_AUTOMATICA;

                case EnumBarraRolagem.Visivel:

                    return PropriedadeBarraRolagem.NOME_CLASSE_CSS_BARRA_ROLAGEM_VISIVEL;

                case EnumBarraRolagem.Transbordar:

                    return PropriedadeBarraRolagem.NOME_CLASSE_CSS_BARRA_ROLAGEM_TRANSBORDAR;

                default:

                    throw new Erro("O alinhamento horizontal não é suportado");
            }

        }
    }
}
