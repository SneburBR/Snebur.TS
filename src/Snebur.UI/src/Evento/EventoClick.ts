namespace Snebur.UI
{
    export class EventoClick extends EventoControleHandler
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.Click, "click");

            if (elemento instanceof HTMLElement)
            {
                elemento.style.cursor = "pointer";
            }
        }

        protected override RetornarElementoDomEvento(elemento: HTMLElement): HTMLElement
        {
            if (this.ControlePai instanceof Botao && this.ControlePai.ElementoLink != null)
            {
                return this.ControlePai.ElementoLink;
            }
            return elemento;
        }

        public Click(domEvent: UIEvent)
        {
            this.ManipuladorkEventListenerDom(domEvent);
        }

        public override ManipuladorkEventListenerDom(domEvent: UIEvent)
        {
            const controlePai = this.ControlePai;
            if (!controlePai.IsDesabilitado)
            {
                if (this.IsSairLinkRota(domEvent))
                {
                    return;
                }

                domEvent.stopPropagation();
                domEvent.stopImmediatePropagation();
                domEvent.preventDefault();

                try
                {
                    this.ValidarControleManipulador();
                    const args = new UIEventArgs(this.Elemento, this.RetornarParametros(), domEvent);
                    this.MarcarItensControlesLista(controlePai, args);
                    this.Elemento.focus();
                    this.Manipulador(controlePai, args);
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

        private IsSairLinkRota(domEvent: UIEvent): boolean
        {
            const controlePai = this.ControlePai;
            return controlePai instanceof Botao &&
                controlePai.IsLinkRota &&
                domEvent instanceof MouseEvent &&
                (domEvent.shiftKey || domEvent.ctrlKey);
        }

        private ValidarControleManipulador(): void
        {
            const controleManipulador = this.ControleManipulador;
            if (controleManipulador == null)
            {
                throw new Erro(`O controle  manipulador não está definido`);
            }

            if (controleManipulador.IsDispensado)
            {
                throw new Erro(`O controle '${controleManipulador.GetType().Nome}' foi dispensado, não pode ser chamado o evento click`);
            }

            if (!this.ControleManipulador.IsControleInicializado)
            {
                throw new Erro(`O controle '${controleManipulador.GetType().Nome}'}' não está inicializado, não pode ser chamado o evento click`);
            }
        }

        private MarcarItensControlesLista(controlePai: BaseControle, args: UIEventArgs)
        {
            const controleLista = this.RetornarControleListaMarcarItem(controlePai);
            if (controleLista?.IsMarcarItem)
            {
                const linhaOuItemBloco = ControleUtil.RetornarLinhaOuItemBloco(controlePai);
                if (linhaOuItemBloco instanceof Linha)
                {
                    linhaOuItemBloco.DataLista.MarcarLinha(linhaOuItemBloco.ItemReferencia, false);
                    this.ControleApresentacao.__UltimoItemMarcado = linhaOuItemBloco.ItemReferencia;
                }

                if (linhaOuItemBloco instanceof ItemBloco)
                {
                    linhaOuItemBloco.PainelLista.MarcarConteudo(linhaOuItemBloco.ItemReferencia, false);
                    this.ControleApresentacao.__UltimoItemMarcado = linhaOuItemBloco.ItemReferencia;
                }
            }
        }

        private RetornarControleListaMarcarItem(controlePai: BaseControle): BaseControleLista
        {
            return controlePai.RetornarControlePai(BaseControleLista);
        }
    }
}