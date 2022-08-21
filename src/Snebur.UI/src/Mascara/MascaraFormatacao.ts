namespace Snebur.UI
{
    export class MascaraFormatacao extends BaseMascara
    {
        private __Elemento_Blur: EventListener;

        public constructor(controlePai: BaseControle, refElemento: HTMLElement, mascara: string)
        {
            super(controlePai, refElemento, mascara);

            this.__Elemento_Blur = this.Elemento_Blur.bind(this);
            this.AdicionarEventosDom();
        }
        // #region Eventos DOM

        public AdicionarEventosDom(): void
        {
            const elemento = this.ElementoTipado;

            //elemento.addEventListener('keydown', this.__CallbackElemento_Keydown);

            elemento.onblur = this.Elemento_Blur.bind(this);

            this.AdicionarEventoDom(EnumEventoDom.Focus, this.Elemento_Focus);
            this.AdicionarEventoDom(EnumEventoDom.Blur, this.Elemento_Blur);

            //this.AdicionarEventoDom(EnumEventoDom.KeyDown, this.Elemento_KeyDown);

            if (SistemaUtil.SistemaOperacionalEnum === d.EnumSistemaOperacional.Android)
            {
                this.AdicionarEventoDom(EnumEventoDom.KeyUp, this.Elemento_KeyUp);
            }
            else
            {
                this.AdicionarEventoDom(EnumEventoDom.KeyDown, this.Elemento_KeyDown);
            }
        }

        private AdicionarEventosAndroid(): void
        {
            this.RemoverEventoDom(EnumEventoDom.KeyDown, this.Elemento_KeyDown);
            this.AdicionarEventoDom(EnumEventoDom.KeyUp, this.Elemento_KeyUp);
        }

        public RemoverEventosDom(): void
        {
            const elemento = this.ElementoTipado;
            if (elemento.onblur === this.__Elemento_Blur)
            {
                elemento.onblur = null;
            }
            this.DispensarEventosDom();
        }
        // #endregion

        // #region Eventos DOM

        private Elemento_KeyUp(event: KeyboardEvent): void
        {
            if (event.keyCode !== undefined)
            {
                this.MascaraAndroid(event);
            }
        }

        private Elemento_KeyDown(event: KeyboardEvent): void
        {
            if (event.keyCode !== undefined)
            {
                const keyCode = event.keyCode;
                const isAndroid = keyCode === 229;
                if (isAndroid)
                {
                    this.AdicionarEventosAndroid();
                    this.MascaraAndroid(event);
                }
                else
                {
                    this.MascaraPadrao(event);
                }
            }
        }


        /**
         * O conteúdo é substituído, uma vez que não é possível detectar o keycode para enviar a tecla
         * @param event
         */
        private MascaraAndroid(event: KeyboardEvent): void
        {
            const elemento = event.target as HTMLInputElement;
            const valorAtual = "" + elemento.value;
            const valorFormato = this.RetornarValorFormatado(valorAtual, false);
            if (valorAtual !== valorFormato)
            {
                elemento.value = valorFormato;
            }
        }


        /**
         * Evita que próximo carácter seja digitado
         * @param event
         */
        protected MascaraPadrao(event: KeyboardEvent): void
        {
            if (event.keyCode !== undefined)
            {
                const elemento = event.target as HTMLInputElement;
                const keyCode = event.keyCode;

                const posicaoCursor = elemento.selectionStart;
                let valorAtual = "" + elemento.value;

                if (posicaoCursor < (valorAtual.length - 1))
                {
                    /*console.warn(`Cursor: ${posicaoCursor}, tamanho: ${valorAtual.length}`);*/
                    return;
                }
                 
                if (!this.IsKeyCodeValido(keyCode))
                {
                    if (!this.TeclaPermitida(keyCode))
                    {
                        event.preventDefault();
                        return;
                    }
                    //backspace
                    if (keyCode === 8)
                    {
                        event.preventDefault();

                        const inicio = (elemento.selectionStart - 1);
                        const fim = elemento.selectionEnd;

                        valorAtual = u.TextoUtil.RemoverParte(valorAtual, inicio, fim);

                        valorAtual = this.RetornarValorFormatado(valorAtual, false);

                        const posicaoPonteiro = elemento.selectionStart - (fim - inicio);

                        elemento.value = valorAtual;
                        elemento.selectionStart = posicaoPonteiro;
                        elemento.selectionEnd = posicaoPonteiro;
                    }
                }
                else
                {
                    let posicao = elemento.selectionStart;

                    //O texto do controle está selecionado,
                    // porem no event KeyDown, o valorAtual ainda não recebeu o novoValor
                    //

                    if (elemento.selectionStart !== elemento.selectionEnd)
                    {
                        valorAtual = "";
                    }

                    //Verificando se aceita mais carácter na mascara
                    if ((valorAtual.length + 1) > this.FormataMascara.length)
                    {
                        event.preventDefault();
                        return;
                    }
                    //var isNumero = (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105);
                    const isNumero = KeyCodeUtil.IsKeyCodeNumero(keyCode);
                    let caractarAtualMascara = this.FormataMascara.charAt(posicao);

                    if (caractarAtualMascara === "#" && !isNumero)
                    {
                        event.preventDefault();

                        this.AtualizarValorFormatado(event, false);

                        return;
                    }
                    event.preventDefault();
                    if (isNumero && caractarAtualMascara === "#")
                    {
                        //tudo certo
                        const numero = KeyCodeUtil.RetornarNumero(keyCode);
                        valorAtual += numero;
                        //return true;

                    }
                    else
                    {
                        do
                        {
                            valorAtual += caractarAtualMascara;
                            posicao += 1;
                            caractarAtualMascara = this.FormataMascara.charAt(posicao);
                        }
                        while ((posicao < this.FormataMascara.length) && (caractarAtualMascara !== "#"));

                        if ((isNumero) && ((valorAtual.length) < this.FormataMascara.length))
                        {
                            const numero = KeyCodeUtil.RetornarNumero(keyCode);
                            valorAtual += numero;
                        }
                    }
                    valorAtual = this.RetornarValorFormatado(valorAtual, false);

                    elemento.value = valorAtual;
                    elemento.selectionStart = valorAtual.length;
                    elemento.selectionEnd = valorAtual.length;
                }
                //Formatando a mascara
            }
        }

        private Elemento_Focus(event: FocusEvent)
        {
            const elemento = event.target as HTMLInputElement;
            if (elemento instanceof HTMLInputElement)
            {
                elemento.IsCapturandoMascara = true;
                this.ElementoTipado.select();
            }

            //event.target.select();
        }

        private Elemento_Blur(e: FocusEvent)
        {
            const elemento = e.target as HTMLInputElement;
            if (elemento instanceof HTMLInputElement)
            {
                if (elemento.IsCapturandoMascara)
                {
                    elemento.IsCapturandoMascara = false;
                    this.AtualizarValorFormatado(e, this.IsCompletar);
                }
            }
        }

        // #region Métodos

        //#region IDisposable

        public override Dispose()
        {
            this.RemoverEventosDom();

            super.Dispose();
        }
        //#endregion
    }
}