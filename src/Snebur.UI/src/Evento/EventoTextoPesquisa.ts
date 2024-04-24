namespace Snebur.UI
{
    export class EventoTextoPesquisa extends EventoControleHandler
    {
        private static readonly INTERVALO = 750;
        //private TempoEsperar: TimeSpan;
        //private TempoUltimaPesquisa: TimeSpan;
        private ValorUltimaPesquisa: string;
        private ElementoInput: HTMLInputElement;

        private readonly ExecutarDepois = new ExecutarDepois(this.Continuar.bind(this), EventoTextoPesquisa.INTERVALO);
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.TextoPesquisa, "keydown");

            /*this.TempoUltimaPesquisa = new Date().TimeOfDay;*/
            this.ElementoInput = this.RetornarElementoInput();
        }

        private RetornarElementoInput(): HTMLInputElement
        {
            if (this.ControlePai.Elemento instanceof HTMLInputElement)
            {
                return this.ControlePai.Elemento;
            }
            const elementosInput = this.Elemento.getElementsByTagName("input");
            if (elementosInput.length === 1)
            {
                return elementosInput[0];
            }

            if (this.ControlePai instanceof CaixaPesquisa)
            {
                return this.ControlePai.ControleInput.ElementoInput;
            }
            throw new Erro("Não possível encontrar o elemento input dentro do controle {0}", this.ControlePai.___NomeConstrutor);
        }

        protected override ManipuladorkEventListenerDom(e: KeyboardEvent): void
        {
            /*this.TempoUltimaPesquisa = new Date().TimeOfDay;*/
            this.ExecutarDepois.Executar(e);
        }

        private Continuar(domEvent: KeyboardEvent)
        {
            const elemento = this.ElementoInput as HTMLInputElement;
            if (elemento instanceof HTMLInputElement)
            {
                const pesquisa = elemento.value;
                if (!(String.IsNullOrWhiteSpace(pesquisa)))
                {
                    if (pesquisa !== this.ValorUltimaPesquisa)
                    {
                        this.Manipulador(this, new TextoPesquisaEventArgs(this.Elemento, this.RetornarParametros(), domEvent, pesquisa));
                    }
                }
                else
                {
                    this.Manipulador(this, new TextoPesquisaEventArgs(this.Elemento, this.RetornarParametros(), domEvent, ""));
                }
            }
        }

        protected override RetornarIDElemento(idElemento: string): string;
        protected override RetornarIDElemento(refElemento: HTMLElement): string;
        protected override RetornarIDElemento(refElemento: any): string
        {
            if (!(refElemento instanceof HTMLElement))
            {
                throw new ErroOperacaoInvalida("O referencia do elemento é invalida", this);
            }
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            if (elemento.tagName === "SN-CAIXA-PESQUISA")
            {
                const elementosInput = ElementoAtributoUtil.RetornarElementosFilhosPossuiAtributo(elemento, AtributosHtml.ItemElemento, "ControleInput", function () { return true; });
                //if (elementosInput.length != 1)
                //{
                //    throw new Erro("Não foi encontrado elemento input em SN-CAIXA-PESQUISA", this);
                //}
                const elementoInput = elementosInput.First();
                if (String.IsNullOrWhiteSpace(elementoInput.id))
                {
                    elementoInput.id = ElementoUtil.RetornarNovoIDElemento(this.ControlePai, "input_pesquisa");
                }
                return elementoInput.id;
            }
            return elemento.id;
            //SN-CAIXA-PESQUISA
        }
    }
}