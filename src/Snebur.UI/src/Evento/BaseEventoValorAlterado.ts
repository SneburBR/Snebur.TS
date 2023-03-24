namespace Snebur.UI
{
    export abstract class BaseEventoValorAlterado extends EventoControleHandler
    {
        public get ControleDestino(): IControleBaseEventoValorAlterado
        {
            return this.ControlePai as IControleBaseEventoValorAlterado;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement, atributoHtml: AtributoHtml, nomeEventoDom: string)
        {
            super(controlePai, elemento, atributoHtml, nomeEventoDom);
        }

        protected override ArramarManipuladorDom(elemento: HTMLElement): boolean
        {
            return elemento instanceof HTMLInputElement ||
                elemento instanceof HTMLSelectElement ||
                elemento instanceof HTMLTextAreaElement;
        }

        protected override ManipuladorkEventListenerDom(domEvent: UIEvent)
        {
            const valorDom = this.RetornarValorInterno();

            ((domEvent as any) as IUIEventValorAlteradoNotificadoInterno).___ValorAlteradoNotificado = true;
            const args = new UIValorAlteradoEventArgs(this.Elemento, this.RetornarParametros(), domEvent, valorDom);
            this.ChamaManipualador(args);
        }

        protected Controle_ValorAlterado(provedor: any, e: ValorAlteradoEventArgs<any>)
        {
            if (e.DomEvento && (e.DomEvento as any as IUIEventValorAlteradoNotificadoInterno).___ValorAlteradoNotificado)
            {
                //teste
                //let aqui = "para propagação";
                //throw new Erro("Analisar a propagação do evento");
                return;
            }
            else
            {
                if (this.ControlePai.IsControleInicializado)
                {
                    const args = new UIValorAlteradoEventArgs(this.Elemento, this.RetornarParametros(), null, e.Valor);
                    this.ChamaManipualador(args);
                }
            }
        }

        private IsChamandoManipulador: boolean = false;
        //private IdentificadorTimeout: number;
        protected ChamaManipualador(args: UIValorAlteradoEventArgs)
        {
            //evitando loop infinito
            if (this.ControleApresentacao.IsControleInicializado && !this.IsChamandoManipulador)
            {
                this.IsChamandoManipulador = true;
                try
                {
                    //this.IdentificadorTimeout = window.setTimeout(this.ManipuladorTimeout.bind(this), 1000);
                    this.Manipulador(this.ControlePai, args);

                }
                catch (erroInterno)
                {
                    this.IsChamandoManipulador = false;

                    const mensagem = `Erro no evento ${this.AtributoHtml.Nome} ${this.CaminhoManipulador}`;
                    const erro = new Erro(mensagem, erroInterno);
                    LogUtil.Erro(erro);
                    throw erro;
                }
                finally
                {
                    this.IsChamandoManipulador = false;
                    //window.clearTimeout(this.IdentificadorTimeout);
                }
            }
            this.IsChamandoManipulador = false;
        }

        //private ManipuladorTimeout(): void
        //{
        //    this.IsChamandoManipulador = false;
        //}


        protected override RetornarElementoDomEvento(elemento: HTMLElement): HTMLElement
        {
            return this.ControleDestino.ElementoInput;
        }

        private RetornarValorInterno(): any
        {
            const elemento = this.ControleDestino.ElementoInput as HTMLElement;
            if (elemento instanceof HTMLInputElement)
            {
                switch (elemento.type)
                {
                    case "radio":
                    case "checkbox":

                        return elemento.checked;

                    default:

                        return elemento.value;
                }
            }
            if (elemento instanceof HTMLTextAreaElement)
            {
                return elemento.value;
            }
            return null;
        }
    }

    

    export class EventoValorMotificando extends BaseEventoValorAlterado
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.ValorModificando, ui.EnumEventoDom.Input);

            if (!((controlePai as IControleEventoValorModificando<any>).EventoValorMotificando instanceof Evento))
            {
                throw new ErroNaoSuportado("controle  pai não implementa  EventoValorMotificando", this);
            }
            (controlePai as IControleEventoValorModificando<any>).EventoValorMotificando.AddHandler(this.Controle_ValorAlterado, this);
        }
    }

    interface IUIEventValorAlteradoNotificadoInterno
    {
        ___ValorAlteradoNotificado: boolean;
    }
}