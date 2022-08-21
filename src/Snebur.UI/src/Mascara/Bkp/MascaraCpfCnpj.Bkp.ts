////namespace Snebur.UI
////{
////    export class MascaraCpfCnpjBkp extends BaseMascara
////    {

////        public IsCnpj: boolean = false;

////        public override get FormataMascara(): string
////        {
////            const valor = (this.Elemento as HTMLInputElement).value;
////            if (this.IsCnpj || ValidacaoUtil.IsCnpj(valor))
////            {
////                return FormatacaoUtil.FORMATACAO_CNPJ;
////            }
////            return FormatacaoUtil.FORMATACAO_CPF;
////        }

////        public constructor(controlePai: BaseControle, refElemento: HTMLElement, mascara: string)
////        {
////            super(controlePai, refElemento, mascara);


////            this.AdicionarEventoDom(EnumEventoDom.Blur, this.Elemento_Blur);
////            this.AdicionarEventoDom(EnumEventoDom.Focus, this.Elemento_Focus);
////            this.AdicionarEventoDom(EnumEventoDom.KeyDown, this.Elemento_KeyDown);
////        }

////        public override IsKeyCodeValido(keycode: number): boolean
////        {
////            return KeyCodeUtil.IsKeyCodeNumero(keycode) ||
////                KeyCodeUtil.IsKeyCodeAbreParemtes(keycode) ||
////                KeyCodeUtil.IsKeyCodeFechaParantes(keycode) ||
////                KeyCodeUtil.IsKeyCodeTraco(keycode);
////        }

////        public Elemento_KeyDown(event: KeyboardEvent): void
////        {
////            const keycode = event.keyCode;
////            if (keycode !== undefined)
////            {

////                const elemento = event.target as HTMLInputElement;
////                //var elemento = this.ElementoTipado;

////                let valorAtual = "" + elemento.value;
////                if (!this.IsKeyCodeValido(keycode))
////                {
////                    if (!this.TeclaPermitida(keycode))
////                    {
////                        event.preventDefault();
////                        return;
////                    }
////                    //backspace
////                    if (event.keyCode === 8)
////                    {
////                        event.preventDefault();

////                        const inicio = (elemento.selectionStart - 1);
////                        const fim = elemento.selectionEnd;

////                        valorAtual = u.TextoUtil.RemoverParte(valorAtual, inicio, fim);

////                        valorAtual = this.RetornarValorFormatado(valorAtual);

////                        const posicaoPonteiro = elemento.selectionStart - (fim - inicio);

////                        elemento.value = valorAtual;
////                        elemento.selectionStart = posicaoPonteiro;
////                        elemento.selectionEnd = posicaoPonteiro;
////                    }
////                } else
////                {
////                    let posicao = elemento.selectionStart;
////                    this.IsCnpj = posicao > 13;

////                    //O texto do controle está selecionado,
////                    // porem no event KeyDown, o valorAtual ainda não recebeu o novoValor
////                    //

////                    if (elemento.selectionStart !== elemento.selectionEnd)
////                    {
////                        valorAtual = "";
////                    }
////                    //Verificando se aceita mais carácter na mascara
////                    if ((valorAtual.length + 1) > FormatacaoUtil.FORMATACAO_CNPJ.length)
////                    {
////                        event.preventDefault();
////                        return;
////                    }
////                    //var isNumero = (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105);
////                    const isNumero = KeyCodeUtil.IsKeyCodeNumero(event.keyCode);
////                    let caracterAtualMascara = this.FormataMascara.charAt(posicao);

////                    if (caracterAtualMascara === "#" && !isNumero)
////                    {
////                        event.preventDefault();
////                        this.AtualizarValorFormatado(event);
////                        return;
////                    }
////                    event.preventDefault();
////                    if (isNumero && caracterAtualMascara === "#")
////                    {
////                        //tudo certo
////                        const numero = KeyCodeUtil.RetornarNumero(event.keyCode);
////                        valorAtual += numero;
////                        //return true;

////                    }
////                    else
////                    {
////                        do
////                        {
////                            valorAtual += caracterAtualMascara;
////                            posicao += 1;
////                            caracterAtualMascara = this.FormataMascara.charAt(posicao);
////                        }
////                        while ((posicao < this.FormataMascara.length) && (caracterAtualMascara !== "#"));

////                        if ((isNumero) && ((valorAtual.length) < this.FormataMascara.length))
////                        {
////                            const numero = KeyCodeUtil.RetornarNumero(event.keyCode);
////                            valorAtual += numero;
////                        }
////                    }
////                    valorAtual = this.RetornarValorFormatado(valorAtual);
////                    elemento.value = valorAtual;
////                    elemento.selectionStart = valorAtual.length;
////                    elemento.selectionEnd = valorAtual.length;
////                }
////                //Formatando a mascara
////            }

////        }

////        public override AtualizarValorFormatado(event: UIEvent, completar: boolean = false): void
////        {
////            const elemento = this.ElementoTipado;
////            const valorDom = elemento.value;

////            const mascaraFormatada = this.RetornarValorFormatado(valorDom);

////            if (valorDom !== mascaraFormatada)
////            {
////                elemento.value = mascaraFormatada;
////            }
////            this.NotificarValorFormatadoAlterado(event, mascaraFormatada);
////        }

////        public override RetornarValorFormatado(valorDom: string): string
////        {
////            return u.FormatacaoUtil.FormatarMascara(valorDom, this.FormataMascara, false);
////        }

////        public Elemento_Blur(e: FocusEvent): void
////        {
////            this.AtualizarValorFormatado(e, false);
////        }

////        public Elemento_Focus(event: FocusEvent)
////        {
////            this.ElementoTipado.select();

////        }
////        // #region Métodos

////        //#region IDisposable

////        public override Dispose()
////        {
////            super.Dispose();
////        }
////        //#endregion
////    }



////}
