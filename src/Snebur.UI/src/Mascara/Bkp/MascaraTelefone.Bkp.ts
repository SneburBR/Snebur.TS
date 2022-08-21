////namespace Snebur.UI
////{
////    export class MascaraTelefoneBkp extends BaseMascara
////    {
////        public IsCelular: boolean = false;

////        public override get FormataMascara(): string
////        {
////            let valor = (this.Elemento as HTMLInputElement).value;
////            if (this.IsCelular || ValidacaoUtil.IsCelular(valor))
////            {
////                return FormatacaoUtil.FORMATACAO_CELULAR;
////            }
////            return FormatacaoUtil.FORMATACAO_TELEFONE;
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
////            let keycode = event.keyCode;
////            if (keycode !== undefined)
////            {

////                let elemento = event.target as HTMLInputElement;
////                //var elemento = this.ElementoTipado;

////                let valorAtual = '' + elemento.value;
////                if (!this.IsKeyCodeValido(keycode))
////                {
////                    if (!this.TeclaPermitida(keycode))
////                    {
////                        event.preventDefault();
////                        return;
////                    }
////                    //backspace
////                    if (event.keyCode == 8)
////                    {
////                        event.preventDefault();

////                        let inicio = (elemento.selectionStart - 1);
////                        let fim = elemento.selectionEnd;

////                        valorAtual = u.TextoUtil.RemoverParte(valorAtual, inicio, fim);

////                        valorAtual = this.RetornarValorFormatado(valorAtual);

////                        let posicaoPonteiro = elemento.selectionStart - (fim - inicio);

////                        elemento.value = valorAtual;
////                        elemento.selectionStart = posicaoPonteiro;
////                        elemento.selectionEnd = posicaoPonteiro;
////                    }
////                } else
////                {
////                    let posicao = elemento.selectionStart;
////                    this.IsCelular = posicao == 14;

////                    //O texto do controle está selecionado,
////                    // porem no event KeyDown, o valorAtual ainda não recebeu o novoValor
////                    //

////                    if (elemento.selectionStart != elemento.selectionEnd)
////                    {
////                        valorAtual = '';
////                    }
////                    //Vericando se aceita mais caracter na mascara
////                    if ((valorAtual.length + 1) > FormatacaoUtil.FORMATACAO_CELULAR.length)
////                    {
////                        event.preventDefault();
////                        return;
////                    }
////                    //var isNumero = (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105);
////                    let isNumero = KeyCodeUtil.IsKeyCodeNumero(event.keyCode);
////                    let caracterAtualMascara = this.FormataMascara.charAt(posicao);

////                    if (caracterAtualMascara == '#' && !isNumero)
////                    {
////                        event.preventDefault();
////                        this.AtualizarValorFormatado(event);
////                        return;
////                    }
////                    event.preventDefault();
////                    if (isNumero && caracterAtualMascara === '#')
////                    {
////                        //tudo certo
////                        let numero = KeyCodeUtil.RetornarNumero(event.keyCode);
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
////                        while ((posicao < this.FormataMascara.length) && (caracterAtualMascara !== '#'));

////                        if ((isNumero) && ((valorAtual.length) < this.FormataMascara.length))
////                        {
////                            let numero = KeyCodeUtil.RetornarNumero(event.keyCode);
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
////            let elemento = this.ElementoTipado;
////            let valorDom = elemento.value;

////            let mascaraFormatada = this.RetornarValorFormatado(valorDom);

////            if (valorDom !== mascaraFormatada)
////            {
////                elemento.value = mascaraFormatada;
////            }
////            //delete (elemento as any);
////            elemento = undefined;

////            this.NotificarValorFormatadoAlterado(event, mascaraFormatada);
////        }

////        public override RetornarValorFormatado(valorDom: string): string
////        {
////            //if (valorDom.length < 10)
////            //{
////            return u.FormatacaoUtil.FormatarMascara(valorDom, this.FormataMascara, false);
////            //}
////            //return u.FormatacaoUtil.FormatarTelefone(valorDom);

////        }

////        public Elemento_Blur(e: FocusEvent): void
////        {
////            this.AtualizarValorFormatado(e);
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