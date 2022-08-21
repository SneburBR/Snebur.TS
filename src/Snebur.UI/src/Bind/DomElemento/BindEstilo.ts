namespace Snebur.UI
{
    export class BindEstilo extends BaseBind
    {
        private readonly ElementosAlvo = new List<HTMLElement>();
        public readonly Estilo: string;


        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindEstilo, valorAtributo);

            if (valorAtributo.Contains("="))
            {
                const parteInicial = valorAtributo.split(",")[0];
                if (parteInicial.Contains("="))
                {
                    this.Estilo = parteInicial.split("=").First();
                }
            }
            this.ElementosAlvo.AddRange(this.RetornarElmentos(elemento));

            //let componente = this.RetornarComponeteApresentacao();
            //if (componente instanceof ComponenteApresentacao)
            //{ 
            //    this.ElementosAlvo.Add(compoente.ElementoApresentacao);
            //    if (componente instanceof BaseControleFormulario)
            //    {
            //        this.ElementosAlvo.Add(compoente.ElementoInput);
            //    }
            //}
        }

        private RetornarElmentos(elemento: HTMLElement): List<HTMLElement>
        {
            const elementos = new List<HTMLElement>();
            elementos.Add(elemento);

            const isPropagarEstilos = this.RetornarValorAtributoBoolean(AtributosHtml.IsPropagarEstilos, true);
            if (isPropagarEstilos)
            {
                const componente = this.RetornarComponeteApresentacao();
                if (componente instanceof ComponenteApresentacao)
                {
                    elementos.Add(componente.ElementoApresentacao);
                    if (componente instanceof BaseControleFormulario)
                    {
                        elementos.Add(componente.ElementoInput);
                    }
                }
            }
            return elementos;
        }



        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            if (u.ValidacaoUtil.IsDefinido(novoValor))
            {
                if (EstiloUtil.IsEstiloDimensao(this.Estilo))
                {
                    this.AplicarEstilo(this.Elemento, antigoValor, novoValor);
                    return;
                }

                const elementosAlvo = this.ElementosAlvo;
                for (const elementoAlvo of elementosAlvo)
                {
                    this.AplicarEstilo(elementoAlvo, antigoValor, novoValor);
                }

            }
        }

        private AplicarEstilo(elementoAlvo: HTMLElement, antigoValor: any, novoValor: any)
        {
            if (!String.IsNullOrWhiteSpace(this.Estilo))
            {
                const valor = u.ConverterUtil.ParaString(novoValor);
                const valorFormatado = (this.Estilo === "font-family") ? `'${valor}` : valor;
                elementoAlvo.style.setProperty(this.Estilo, valorFormatado, "important");
                //(elementoAlvo.style as any)[this.Estilo] = valorFormatado;
            }
            else
            {
                if (novoValor instanceof Estilo)
                {
                    ui.EstiloUtil.AtualizarEstilo(elementoAlvo, novoValor);
                }
                else if (typeof novoValor === "string")
                {
                    throw new ErroNaoImplementado();
                }
                else
                {
                    throw new ErroNaoSuportado("O bind estilo não suporta o tipo " + typeof novoValor);
                }
            }
        }


    }
}