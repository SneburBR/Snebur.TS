
namespace Snebur
{
    export import sn = Snebur;
    export import ui = Snebur.UI;

    //utilidades
    export import EstiloUtil = Snebur.UI.EstiloUtil;
    export import ElementoUtil = Snebur.UI.ElementoUtil;
    export import TelaUtil = Snebur.UI.TelaUtil;
    export import CorUtil = Snebur.UI.CorUtil;
    export import KeyCodeUtil = Snebur.UI.KeyCodeUtil;
    export import MensagemUtil = Snebur.UI.MensagemUtil;
    export import TipograficaUtil = Snebur.UI.TipograficaUtil;

    //imagem
    export import ImagemLocalUtil = Snebur.Imagens.ImagemLocalUtil;
    export import ResultadoCarregarImagem = Snebur.Imagens.ResultadoCarregarImagem;

    //enumeradores
    export import EnumCor = Snebur.UI.EnumCor;
    export import EnumTonalidade = Snebur.UI.EnumTonalidade;
    export import EnumEventoDom = Snebur.UI.EnumEventoDom;
    export import EnumVisibilidade = Snebur.UI.EnumVisibilidade
    export import EnumBotoesAlerta = Snebur.UI.EnumBotoesAlerta;
    export import EnumTipoAlerta = Snebur.UI.EnumTipoAlerta;
    export import EnumOpcaoOcupar = Snebur.UI.EnumOpcaoOcupar;

    export import EnumAlinhamentoHorizontal = Snebur.UI.EnumAlinhamentoHorizontal;
    export import EnumAlinhamentoVertical = Snebur.UI.EnumAlinhamentoVertical;
    export import EnumTipografia = Snebur.UI.EnumTipografia;

    export import EnumTamanhoIcone = Snebur.UI.EnumTamanhoIcone;
    export import EnumIcone = Snebur.UI.EnumIcone;
    export import EnumResultadoOpcaoMensagem = Snebur.UI.EnumResultadoOpcaoMensagem;
    export import EnumBotoesJanelaMensagem = Snebur.UI.EnumBotoesJanelaMensagem

    export import BaseUIElemento = Snebur.UI.BaseUIElemento;
    export import BaseControle = Snebur.UI.BaseControle;
    export import BaseJanelaCadastro = Snebur.UI.BaseJanelaCadastro;
    export import Janela = Snebur.UI.Janela;
    export import Pagina = Snebur.UI.Pagina;
    export import ControleUsuario = Snebur.UI.ControleUsuario;
    export import LazyControle = Snebur.UI.LazyControle;

    export import UnidadeComprimento = Snebur.UI.UnidadeComprimento;

    export import Converter = Snebur.UI.Converter;

    export import JanelaMensagem = Snebur.UI.JanelaMensagem;
    //export import ResultadoJanelaMensagemArgs = Snebur.UI.ResultadoJanelaMensagemArgs;
    export import EntidadeCadastroViewModel = Snebur.UI.EntidadeCadastroViewModel;

    export import IPaginaConstrutor = Snebur.UI.IPaginaConstrutor;
    export import IControleConstrutor = Snebur.UI.IControleConstrutor;

    export import HistoricoNavegadorUtil = Snebur.UI.HistoricoNavegadorUtil;

    export import Estilo = Snebur.UI.Estilo;
    export import GerenciadorRotas = Snebur.UI.GerenciadorRotas;
    export import Rota = Snebur.UI.Rota;

}

namespace Snebur.UI
{
    export let VersaoScript: string;
    export let IsNormalizado: boolean;
}

//Snebur.UI.IsNormalizado = false;
//if (!Snebur.UI.IsNormalizado)
//{
//    throw new Snebur.Erro(" O Scripts Snebur.UI.js não foi normalizado");
//}
