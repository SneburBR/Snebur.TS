namespace Snebur.UI
{
    export class EventoEnter extends EventoControleHandler
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.Enter, EnumEventoDom.KeyDown);
        }

        public override ManipuladorkEventListenerDom(domEvent: KeyboardEvent)
        {
            if (KeyCodeUtil.IsKeyCodeEnter(domEvent.keyCode))
            {
                if (!this.ControlePai.IsDesabilitado)
                {
                    domEvent.stopPropagation();
                    this.ChamarManipuladorAsync(domEvent);
                }
            }
        }

        private async ChamarManipuladorAsync(domEvent: KeyboardEvent)
        {
            await ElementoUtil.DesfocarElementoAtualAtivoAsync();
            try
            {
                const args = new UIEventArgs(this.Elemento, this.RetornarParametros(), domEvent);
                this.Manipulador(this.ControlePai, args);
            }
            catch (erroInterno)
            {
                const mensagem = `Erro no evento click ${this.CaminhoManipulador}`;
                const erro = new Erro(mensagem, erroInterno);
                LogUtil.Erro(erro);
                throw erro;
            }
        }
    }
}