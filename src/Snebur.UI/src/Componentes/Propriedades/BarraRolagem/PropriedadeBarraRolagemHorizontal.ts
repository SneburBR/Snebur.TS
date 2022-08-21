namespace Snebur.UI
{
    export class PropriedadeBarraRolagemHorizontal extends PropriedadeApresentacao<EnumBarraRolagem>
	{
        private static readonly PREFIXO_CLASSE_CSS_BARRA_ROLAGEM_HORIZONTAL = "ap-barra-rolagem-horizontal--";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_HORIZONTAL_OCULTA = "ap-barra-rolagem-horizontal--oculta";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_HORIZONTAL_AUTOMATICA = "ap-barra-rolagem-horizontal--automatica";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_HORIZONTAL_VISIVEL = "ap-barra-rolagem-horizontal--visivel";
        private static readonly NOME_CLASSE_CSS_BARRA_ROLAGEM_HORIZONTAL_TRANSBORDAR = "ap-barra-rolagem-horizontal--transbordar";

        public constructor()
        {
            super(AtributosHtml.BarraRolagemHorizontal);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao,alinhamento: EnumBarraRolagem): string
        {
            if (alinhamento === EnumBarraRolagem.NaoDefino)
            {
                return String.Empty;
            }
            return EnumUtil.RetornarDescricao(EnumBarraRolagem, alinhamento);

        }
        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao,valorDom: string): EnumBarraRolagem
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
            EstiloUtil.RemoverClssClasseComecaCom(elemento, PropriedadeBarraRolagemHorizontal.PREFIXO_CLASSE_CSS_BARRA_ROLAGEM_HORIZONTAL);

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

                    return PropriedadeBarraRolagemHorizontal.NOME_CLASSE_CSS_BARRA_ROLAGEM_HORIZONTAL_OCULTA;

                case EnumBarraRolagem.Automatica:

                    return PropriedadeBarraRolagemHorizontal.NOME_CLASSE_CSS_BARRA_ROLAGEM_HORIZONTAL_AUTOMATICA;

                case EnumBarraRolagem.Visivel:

                    return PropriedadeBarraRolagemHorizontal.NOME_CLASSE_CSS_BARRA_ROLAGEM_HORIZONTAL_VISIVEL;

                case EnumBarraRolagem.Transbordar:

                    return PropriedadeBarraRolagemHorizontal.NOME_CLASSE_CSS_BARRA_ROLAGEM_HORIZONTAL_TRANSBORDAR;

                default:

                    throw new Erro("O alinhamento horizontal não é suportado");
            }

        }
	}
}
