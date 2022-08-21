namespace Snebur.UI
{
    export class EventoClickAsync extends EventoControleHandler
    {
        public get ManipuladorAsync(): UIEventoHandlerAsync
        {
            return this.Manipulador as UIEventoHandlerAsync;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.ClickAsync, "click");

            if (elemento instanceof HTMLElement)
            {
                elemento.style.cursor = "pointer";
            }
        }

        public Click(domEvent: UIEvent)
        {
            this.ManipuladorkEventListenerDom(domEvent);
        }

        public override async ManipuladorkEventListenerDom(domEvent: UIEvent)
        {
            domEvent.stopPropagation();
            const controlePai = this.ControlePai;
            const controleApresentacao = this.ControleApresentacao;
            try
            {
                controleApresentacao.Ocupar();
                await this.ManipuladorAsync(controlePai, new UIEventArgs(this.Elemento, this.RetornarParametros(), domEvent));
            }
            catch (erroInterno)
            {
                const mensagem = `Erro no evento click-async ${this.CaminhoManipulador}`;
                const erro = new Erro(mensagem, erroInterno);
                LogUtil.Erro(erro);
                throw erro;
            }
            finally
            {
                if (controleApresentacao.IsControleInicializado && !controleApresentacao.IsDispensado)
                {
                    await controleApresentacao.DesocuparAsync();
                }
            }
        }
    }
}