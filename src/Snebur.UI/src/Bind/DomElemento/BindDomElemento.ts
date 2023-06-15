namespace Snebur.UI
{
    export abstract class BindDomElemento extends BaseBind
    {
        public override readonly Priority: number = -1;

        private _isInputEvent: boolean;

        protected __ElementoInput_ValorDomAlterado: EventListener;
        protected __ElementoInput_ValorDomAlteradoInput: EventListener;
        protected __ElementoInput_KeyDown: EventListener;

        public get IsInputEvent()
        {
            return this._isInputEvent;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement, atributo: AtributoHtml, valorAtributo: string)
        {
            super(controlePai, elemento, atributo, valorAtributo);

            this.__ElementoInput_ValorDomAlterado = this.ElementoInput_ValorDomAlterado.bind(this);
            this.__ElementoInput_KeyDown = this.ElementoInput_KeyDown.bind(this);
            this.__ElementoInput_ValorDomAlteradoInput = this.ElementoInput_ValorDomAlteradoInput.bind(this);

            this.AdicionarHandlerEventoDom();
        }

        protected ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            this.AtribuirValorDom(novoValor);

            if (this.ControlePai instanceof BaseControleFormulario)
            {
                this.ControlePai.AtualizarCssClassePossuiConteudo();
            }
        }

        //#region Handler Evento Dom

        private __ultimoValorDom: string;

        protected ElementoInput_ValorDomAlteradoInput(e: UIEvent): void
        {
            this._isInputEvent = true;
            this.ValorDomAlterado(e);
        }

        protected ElementoInput_ValorDomAlterado(e: UIEvent): void
        {
            this._isInputEvent = false;
            this.ValorDomAlterado(e, true);
        }

        private ValorDomAlterado(e: UIEvent, isForcar?: boolean)
        {
            if (this.Elemento instanceof HTMLElement)
            {
                if (e.target instanceof HTMLInputElement)
                {
                    if (e.target.IsCapturandoMascara && e.target.type === "text")
                    {
                        return;
                    }
                }

                const valorDom = this.RetornarValorDom();
                if (this.__ultimoValorDom !== valorDom || isForcar)
                {
                    this.__ultimoValorDom = valorDom;
                    this.SetTimeout(this.LimparUltimoValorDom, 1000);
                    const valorPropriedade = this.RetornarValorConvertidoParaPropriedade(valorDom);
                    this.AlterarValorPropriedade(valorPropriedade);
                }
            }
        }

        private LimparUltimoValorDom(): void
        {
            this.__ultimoValorDom = null;
        }


        protected ElementoInput_KeyDown(e: KeyboardEvent): void
        {
            this._isInputEvent = false;
            if (KeyCodeUtil.IsKeyCodeEnter(e.keyCode))
            {
                if (this.Elemento instanceof HTMLTextAreaElement)
                {
                    return;
                }

                const valorDom = this.RetornarValorDom();
                const valorPropriedade = this.RetornarValorConvertidoParaPropriedade(valorDom);
                this.AlterarValorPropriedade(valorPropriedade);
                e.preventDefault();
            }
        }

        private AdicionarHandlerEventoDom(): void
        {
            const elemento = this.Elemento;
            if (elemento instanceof HTMLElement)
            {
                switch (true)
                {
                    case (elemento instanceof HTMLTextAreaElement): {

                        elemento.addEventListener("blur", this.__ElementoInput_ValorDomAlterado);
                        elemento.addEventListener("keydown", this.__ElementoInput_KeyDown);
                        break;
                    }
                    case (elemento instanceof HTMLInputElement): {

                        this.AdicionarHandlerEventoDomInterno(elemento);
                        break;
                    }
                }
            }
        }
        private AdicionarHandlerEventoDomInterno(elemento: HTMLElement)
        {
            elemento.addEventListener("change", this.__ElementoInput_ValorDomAlterado);
            const tipo = (elemento as HTMLInputElement).type;
            if (tipo !== "checkbox" && tipo !== "radio" && tipo !== "number")
            {
                elemento.addEventListener("blur", this.__ElementoInput_ValorDomAlterado);

                if (tipo === "text" && this.IsCapturaEventoInput())
                {
                    elemento.addEventListener("input", this.__ElementoInput_ValorDomAlteradoInput);
                }
                //###tentando resolver bug da mascara da data
                elemento.addEventListener("keydown", this.__ElementoInput_KeyDown);
            }
        }

        private IsCapturaEventoInput(): boolean
        {
            if (this.ControlePai instanceof CaixaMoeda)
            {
                return false;
            }

            if (this instanceof BindTexto)
            {
                return this.Elemento.getAttribute("sn-mascara") !== "Moeda";
            }

            return true;
        }

        private RemoverHabndlerEventoDom(): void
        {
            const elemento = this.Elemento;
            if (elemento instanceof HTMLElement)
            {
                switch (true)
                {
                    case (elemento instanceof HTMLTextAreaElement): {

                        elemento.removeEventListener("blur", this.__ElementoInput_ValorDomAlterado);
                        elemento.removeEventListener("keydown", this.__ElementoInput_KeyDown);
                        break;
                    }
                    case (elemento instanceof HTMLInputElement): {

                        elemento.removeEventListener("change", this.__ElementoInput_ValorDomAlterado);

                        const tipo = (elemento as HTMLInputElement).type;
                        if (tipo !== "checkbox" && tipo !== "radio" && tipo !== "number")
                        {
                            elemento.removeEventListener("blur", this.__ElementoInput_ValorDomAlterado);
                            elemento.removeEventListener("keydown", this.__ElementoInput_KeyDown);
                            elemento.removeEventListener("input", this.__ElementoInput_ValorDomAlteradoInput);
                        }
                        break;
                    }
                }
            }
        }
        //Valor do DOM

        protected RetornarValorDom(): any
        {
            const elemento = this.Elemento;
            switch (true)
            {
                case (elemento instanceof HTMLTextAreaElement): {

                    return (elemento as HTMLTextAreaElement).value;
                }
                case (elemento instanceof HTMLInputElement): {

                    const tipo = (elemento as HTMLInputElement).type;
                    switch (tipo)
                    {
                        case "text":
                        case "number":
                        case "range":
                        case "search":
                        case "tel":
                        case "email":
                        case "password":
                            {
                                return (elemento as HTMLInputElement).value;
                            }
                        case "radio":
                        case "checkbox": {

                            return (elemento as HTMLInputElement).checked;
                        }
                        default: {

                            console.error(`O elemento  ${elemento.tagName} type ${tipo} não é suportado pelo bind ${this.___NomeConstrutor} em ${this.ControleApresentacao.___NomeConstrutor}`, this);
                            return;
                        }
                    }
                }
                default: {

                    console.error(`O elemento  ${elemento.tagName}  não é suportado pelo bind ${this.___NomeConstrutor} em ${this.ControleApresentacao.___NomeConstrutor}`, this);
                    return;
                }
            }
        }

        protected AtribuirValorDom(valorPropriedade: any): void
        {

            let novoValorDom = this.RetornarValorConvertidoParaDom(valorPropriedade);
            const elemento = this.Elemento;

            if (elemento instanceof HTMLElement)
            {

                if (elemento instanceof HTMLSpanElement)
                {

                    elemento.innerHTML = " " + novoValorDom + " ";
                    return;
                }

                if ((elemento instanceof HTMLParagraphElement) ||
                    (elemento instanceof HTMLDivElement) ||
                    (elemento instanceof HTMLLabelElement) ||
                    (elemento instanceof HTMLSpanElement) ||
                    (elemento instanceof HTMLHeadingElement) ||
                    (elemento instanceof HTMLTableCellElement) ||
                    (elemento instanceof HTMLOptionElement) ||
                    (elemento instanceof HTMLAnchorElement))
                {
                    elemento.innerHTML = novoValorDom;
                    return;
                }

                if (elemento instanceof HTMLTextAreaElement)
                {
                    elemento.value = novoValorDom;
                    return;
                }

                if (elemento instanceof HTMLInputElement)
                {
                    const tipo = (elemento as HTMLInputElement).type;
                    switch (tipo)
                    {
                        case "text":
                        case "search":
                        case "tel":
                        case "email":
                        case "password": {

                            const valorAtual = (elemento as HTMLInputElement).value;
                            if (valorAtual !== novoValorDom)
                            {
                                if (this.IsAtualizarValorDom(valorPropriedade, valorAtual, novoValorDom))
                                {
                                    (elemento as HTMLInputElement).value = novoValorDom;
                                }
                            }
                            return;
                        }
                        case "number":
                        case "range":

                            if (!String.IsNullOrEmpty(novoValorDom) && isNaN(parseFloat(novoValorDom)))
                            {
                                console.error(`O novo valor do dom ${novoValorDom} para o elemento  ${elemento.tagName} não é suportado pelo bind ${this.___NomeConstrutor} em ${this.ControleApresentacao.___NomeConstrutor}`, this);
                                return;
                            }

                            if (String.IsNullOrEmpty(novoValorDom))
                            {
                                novoValorDom = "0";
                            }
                            if ((elemento as HTMLInputElement).value !== novoValorDom)
                            {
                                (elemento as HTMLInputElement).value = novoValorDom;
                            }
                            return;
                        case "radio":
                        case "checkbox": {

                            const novoValor = u.ConverterUtil.ParaBoolean(valorPropriedade);
                            if ((elemento as HTMLInputElement).checked !== novoValor)
                            {
                                (elemento as HTMLInputElement).checked = novoValor;
                                (elemento as HTMLInputElement).value = (novoValor) ? "on" : "off";
                            }
                            return;

                        }
                        default: {

                            console.error(`O tipo ${tipo} do elemento input não é suportado pelo Bind  ${this.___NomeConstrutor}`, this);
                            return;
                        }
                    }
                }

                if (elemento instanceof HTMLImageElement)
                {
                    if (elemento.src !== novoValorDom)
                    {
                        elemento.src = novoValorDom;
                    }
                    return;
                }

                switch (elemento.tagName)
                {
                    case "AP-TEXTO":
                    case "AP-PARAGRAFO":
                    case "AP-BLOCO":
                    case "AP-BLOCO-LISTA-VAZIA":
                    case "AP-BLOCO-CABECALHO":

                        elemento.ElementoApresentacao.innerHTML = novoValorDom;
                        return;
                    case "SN-CONTROLE-IMAGEM":
                    case "SN-CONTROLE-IMAGENS": {

                        const elementoImagem = elemento.getElementsByTagName("img")[0];
                        if (elementoImagem instanceof HTMLImageElement)
                        {
                            if (elementoImagem.src !== novoValorDom)
                            {
                                elementoImagem.src = novoValorDom;
                            }
                            return;
                        }
                        break;
                    }
                    case "I":
                    case "STRONG":

                        elemento.innerHTML = novoValorDom;
                        return;

                    case "SN-BOTAO": {

                        const elementoRotulo = elemento.getElementsByTagName("rotulo-botao")[0];
                        if (elementoRotulo instanceof HTMLElement)
                        {
                            elementoRotulo.innerHTML = novoValorDom;
                        }
                        return;
                    }
                }

                console.error(`O elemento  ${elemento.tagName} não é suportado pelo bind ${this.___NomeConstrutor} em ${this.ControleApresentacao.___NomeConstrutor}`, this);
            }

        }

        private IsAtualizarValorDom(valorPropriedade: any, valorAtualDom: string, novoValorDom: string): boolean
        {
            switch (this.TipoPrimarioProprieadeLigacao)
            {
                case r.EnumTipoPrimario.DateTime:

                    if (valorPropriedade == null)
                    {
                        if (String.IsNullOrEmpty(novoValorDom) &&
                            !String.IsNullOrWhiteSpace(valorAtualDom))
                        {
                            return ValidacaoUtil.IsDateString(valorAtualDom);
                        }
                    }
                    return true;

                default:

                    return true;
            }

        }
        //#endregion

        //#region Conversão overrides

        protected RetornarValorConvertidoParaPropriedade(valorDom: any): any
        {
            if (this.PropriedadeLigacao instanceof r.Propriedade)
            {
                if (this.PropriedadeLigacao.AceitaNulo && (String.IsNullOrEmpty(valorDom) || !this.IsValorDomValido(valorDom)))
                {
                    return null;
                }
                const tipo = this.PropriedadeLigacao.Tipo;
                if (!(tipo instanceof Snebur.r.TipoPrimario))
                {
                    throw new Erro(`O tipo da propriedade ${tipo.Nome} não é suportada pelo bind '${this.GetType().Nome}' ` +
                        `\r\n Controle : ${this.ControleApresentacao.___NomeConstrutor} ` +
                        `\r\n Propriedade ? ${this.CaminhoPropriedadeLigacao}` +
                        `\r\n DataSource tipo: ${this.DataSource?.GetType().Nome}`);
                }
                return u.ConverterUtil.Para(valorDom, tipo);
            }
            return valorDom;
        }


        private IsValorDomValido(valorDom: string)
        {

            switch (this.TipoPrimarioProprieadeLigacao)
            {
                case r.EnumTipoPrimario.DateTime:

                    return u.ValidacaoUtil.IsDateString(valorDom);

                default:

                    //outros valores serão convertidos para tipo
                    return true;

            }
        }

        protected RetornarValorConvertidoParaDom(valorPropriedade: any): string
        {
            if (this.IsValorNormalizado)
            {
                return valorPropriedade;
            }
            return u.ConverterUtil.ParaString(valorPropriedade);
        }
        //#endregion

        //#region IDisposable

        public override Dispose()
        {
            this.RemoverHabndlerEventoDom();

            this.__ElementoInput_ValorDomAlterado = null;
            super.Dispose();
        }
        //#endregion 
    }
}