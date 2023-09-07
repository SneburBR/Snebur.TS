
namespace Snebur.UI
{
    export class ResultadoJanelaMensagemArgs extends ResultadoFecharJanelaArgs
    {
        public readonly OpcaoSelecionada: EnumResultadoOpcaoMensagem;
        public readonly IsFechouJanela: boolean;

        public constructor(janela: Janela, resultado: EnumResultadoOpcaoMensagem, isFechouJanela: boolean = false)
        {
            super(janela, true, null);
            this.OpcaoSelecionada = resultado;
            this.IsFechouJanela = isFechouJanela;
        }
    }
}