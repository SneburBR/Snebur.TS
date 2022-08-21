namespace Snebur.UI
{
    export class PropriedadeTipoPainelAba extends PropriedadeApresentacao<EnumTipoPainelAba>
    {
        private static readonly PREFIXO = "ap-painel-aba--";
        private static readonly NOME_CLASSE_PADRAO = "ap-painel-aba--padrao";
        private static readonly NOME_CLASSE_MATERIAL_DESIGN = "ap-painel-aba--material-design";

        public constructor()
        {
            super(AtributosHtml.TipoPainelAba);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, tipoPainelAba: EnumTipoPainelAba): string
        {
            if (tipoPainelAba === EnumTipoPainelAba.Padrao)
            {
                return String.Empty;
            }
            return EnumUtil.RetornarDescricao(EnumTipoPainelAba, tipoPainelAba);
        }

        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): EnumTipoPainelAba
        {
            if (String.IsNullOrEmpty(valorDom))
            {
                return EnumTipoPainelAba.Padrao;
            }
            return EnumUtil.RetornarValor(EnumTipoPainelAba, valorDom);
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, tipoPainelAba: EnumTipoPainelAba): void
        {
            const elemento = componenteApresentacao.Elemento;
            EstiloUtil.RemoverClssClasseComecaCom(elemento, PropriedadeTipoPainelAba.PREFIXO);
            const cssClasse = this.RetornarCssTipoCaixa(tipoPainelAba);
            elemento.classList.add(cssClasse);
        }

        private RetornarCssTipoCaixa(tipoPainelAba: EnumTipoPainelAba): string
        {
            switch (tipoPainelAba)
            {
                case EnumTipoPainelAba.Padrao:

                    return PropriedadeTipoPainelAba.NOME_CLASSE_PADRAO;

                case EnumTipoPainelAba.MaterialDesign:

                    return PropriedadeTipoPainelAba.NOME_CLASSE_MATERIAL_DESIGN;

                default:

                    throw new Erro("tipo do painel aba não é suportado");
            }

        }
         
    }
}
