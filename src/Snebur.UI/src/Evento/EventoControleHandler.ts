namespace Snebur.UI
{
    export abstract class EventoControleHandler extends UIEvento
    {
        public readonly Manipulador: UIEventoHandler;
        public readonly NomeManipulador: string;
        public readonly ControleManipulador: BaseControle;

        public get CaminhoManipulador(): string
        {
            return this.ControleManipulador.___NomeConstrutor + "." + this.NomeManipulador;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement, atributo: AtributoHtml, nomeEventoDom: string)
        {
            super(controlePai, elemento, atributo, nomeEventoDom);

            this.NomeManipulador = this.ValorAtributo;
            [this.Manipulador, this.ControleManipulador] = this.RetornarManipulador();
            controlePai.EventosAmarrados.Add(this);
        }

        private RetornarManipulador():  [UIEventoHandler, BaseControle]
        {
            let controle = this.ControlePai as any;
            let manipulador: UIEventoHandler = controle[this.NomeManipulador];
            while ((controle != null) && !(manipulador instanceof Function))
            {
                controle = (controle as BaseControle).ControlePai;
                if (controle instanceof BaseControle)
                {
                    manipulador = (controle as any)[this.NomeManipulador];
                }
            }

            if (!(manipulador instanceof Function))
            {
                console.error(`O manipulador '${this.NomeManipulador}' não foi encontrado em '${this.ControleApresentacao.GetType().Nome} 
                              \r\nElemento: ${this.Elemento.outerHTML.substr(0, 100)}`);
                return [null, null];
            }
            manipulador = manipulador.bind(controle);
            return [manipulador, controle];
        }

        protected ManipuladorkEventListenerDom(domEvent: UIEvent)
        {
            if (u.ValidacaoUtil.IsFunction(this.Manipulador))
            {
                this.Manipulador(this.ControlePai, new UIEventArgs(this.Elemento, this.RetornarParametros(), domEvent));
            }
        }

        public override Dispose(): void
        {
            this.ControlePai.EventosAmarrados.Add(this);
            super.Dispose();
        }
    }
}