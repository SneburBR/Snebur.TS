
namespace Snebur.UI
{
    export const $ComponentesApresentacao = new Snebur.DicionarioSimples<Snebur.UI.RegistroComponenteApresentacao>();

    //#region ComponentesApresentacao

    $ComponentesApresentacao.Add("AP-PAINEL", new RegistroComponenteApresentacao("AP-PAINEL", Painel));
    $ComponentesApresentacao.Add("AP-BLOCO", new RegistroComponenteApresentacao("AP-BLOCO", Bloco));
    $ComponentesApresentacao.Add("AP-BLOCO-ITEM", new RegistroComponenteApresentacao("AP-BLOCO-ITEM", BlocoItem));
    $ComponentesApresentacao.Add("AP-BLOCO-LISTA-VAZIA", new RegistroComponenteApresentacao("AP-BLOCO-LISTA-VAZIA", BlocoListaVazia));
    $ComponentesApresentacao.Add("AP-BLOCO-LISTA-CARREGANDO", new RegistroComponenteApresentacao("AP-BLOCO-LISTA-CARREGANDO", BlocoListaCarregando));
    $ComponentesApresentacao.Add("AP-BLOCO-CABECALHO", new RegistroComponenteApresentacao("AP-BLOCO-CABECALHO", BlocoCabecalho));
    $ComponentesApresentacao.Add("AP-BLOCO-ANIMADO", new RegistroComponenteApresentacao("AP-BLOCO-ANIMADO", BlocoAnimado));

    $ComponentesApresentacao.Add("AP-PAINEL-HORIZONTAL", new RegistroComponenteApresentacao("AP-PAINEL-HORIZONTAL", PainelHorizontal));
    $ComponentesApresentacao.Add("AP-DIREITA", new RegistroComponenteApresentacao("AP-DIREITA", DireitaPainel));
    $ComponentesApresentacao.Add("AP-COLUNA", new RegistroComponenteApresentacao("AP-COLUNA", ColunaPainel));
    $ComponentesApresentacao.Add("AP-ESQUERDA", new RegistroComponenteApresentacao("AP-ESQUERDA", EsquerdaPainel));

    $ComponentesApresentacao.Add("AP-PAINEL-VERTICAL", new RegistroComponenteApresentacao("AP-PAINEL-VERTICAL", PainelVertical));
    $ComponentesApresentacao.Add("AP-CABECALHO", new RegistroComponenteApresentacao("AP-CABECALHO", CabecalhoPainel));
    $ComponentesApresentacao.Add("AP-LINHA", new RegistroComponenteApresentacao("AP-LINHA", LinhaPainel));
    $ComponentesApresentacao.Add("AP-RODAPE", new RegistroComponenteApresentacao("AP-RODAPE", RodapePainel));

    //comum
    $ComponentesApresentacao.Add("AP-ICONE", new RegistroComponenteApresentacao("AP-ICONE", Icone));

    //texto
    $ComponentesApresentacao.Add("AP-TEXTO", new RegistroComponenteApresentacao("SN-TEXTO", Texto));
    $ComponentesApresentacao.Add("AP-PARAGRAFO", new RegistroComponenteApresentacao("SN-PARAGRAFO", Paragrafo));    
    $ComponentesApresentacao.Add("AP-ESTILO-ITENS", new RegistroComponenteApresentacao("AP-ESTILO-ITENS", EstilosItens));    

    //#endregion

}