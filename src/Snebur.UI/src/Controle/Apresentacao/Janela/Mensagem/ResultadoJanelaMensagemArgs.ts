
namespace Snebur.UI
{
    export class ResultadoJanelaMensagemArgs extends ResultadoFecharJanelaArgs
    {
        public OpcaoSelecionada: EnumResultadoOpcaoMensagem;
        
        public constructor(janela: Janela,resultado:EnumResultadoOpcaoMensagem)
        {
            super(janela, true, null);

            this.OpcaoSelecionada = resultado;
        }
    }
}