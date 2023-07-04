namespace Snebur.UI
{
    export const $MapeamentosPropriedades = new DicionarioSimples<MapeamentoPropriedadeApresentacao>();

    $MapeamentosPropriedades.Add(ComponenteApresentacao.GetType().Nome, new ComponenteApresentacaoMapeamento());

    $MapeamentosPropriedades.Add(Texto.GetType().Nome, new TextoMapeamento());
    $MapeamentosPropriedades.Add(Paragrafo.GetType().Nome, new TextoMapeamento());


    $MapeamentosPropriedades.Add(BasePainel.GetType().Nome, new BasePainelMapeamento());
    $MapeamentosPropriedades.Add(Painel.GetType().Nome, new PainelMapeamento());

    $MapeamentosPropriedades.Add(PainelLista.GetType().Nome, new PainelListaMapeamento());

    $MapeamentosPropriedades.Add(Icone.GetType().Nome, new IconeMapeamento());
    $MapeamentosPropriedades.Add(Botao.GetType().Nome, new BotaoMapeamento());
    $MapeamentosPropriedades.Add(BotaoMenuItem.GetType().Nome, new BotaoMenuItemMapeamento());
    $MapeamentosPropriedades.Add(BotaoIconeDescricao.GetType().Nome, new BotaoIconeDescricaoMapeamento());

    //controles
    $MapeamentosPropriedades.Add(BaseMenu.GetType().Nome, new BaseMenuMapeamento());
    $MapeamentosPropriedades.Add(Expandir.GetType().Nome, new ExpandirMapeamento());

    $MapeamentosPropriedades.Add(ControleRotulo.GetType().Nome, new ControleRotuloMapeamento());
    $MapeamentosPropriedades.Add(ComponenteApresentacaoRotulo.GetType().Nome, new ComponenteApresentacaoRotuloMapeamento());

    $MapeamentosPropriedades.Add(BaseControleFormulario.GetType().Nome, new BaseControleFormularioMapeamento());
    $MapeamentosPropriedades.Add(PainelAbasHorizontal.GetType().Nome, new PainelAbasMapeamento());
    $MapeamentosPropriedades.Add(Aba.GetType().Nome, new AbaMapeamento());
    $MapeamentosPropriedades.Add(BaseNavegador.GetType().Nome, new NavegadorMapeamento());
}
