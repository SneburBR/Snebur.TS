////namespace Snebur.UI
////{
////    export class MascaraHoraBkp extends BaseMascara
////    {
////        private static readonly MASCARA_HORA_ANTES_DAS_10: string = "#:##";
////        private static readonly MASCARA_HORA_NORMAL: string = "##:##";

////        private IsAntes10: boolean;

////        public override get FormataMascara(): string
////        {
////            if (this.IsAntes10)
////            {
////                return MascaraHoraBkp.MASCARA_HORA_ANTES_DAS_10;
////            }
////            return MascaraHoraBkp.MASCARA_HORA_NORMAL;

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
////                KeyCodeUtil.IsKeyCodeDoisPontos(keycode);


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
////                    if (posicao == 1)
////                    {
////                        this.IsAntes10 = (KeyCodeUtil.IsKeyCodeDoisPontos(keycode));
////                    }

////                    //O texto do controle está selecionado,
////                    // porem no event KeyDown, o valorAtual ainda não recebeu o novoValor
////                    //

////                    if (elemento.selectionStart != elemento.selectionEnd)
////                    {
////                        valorAtual = '';
////                    }
////                    //Vericando se aceita mais caracter na mascara
////                    if ((valorAtual.length + 1) > this.FormataMascara.length)
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
////            /*super.AtualizarValorFormatado(event, completar);*/
            
////            let elemento = this.ElementoTipado;
////            let valorDom = elemento.value;

////            let mascaraFormatada = this.RetornarValorFormatado(valorDom, completar);

////            if (valorDom !== mascaraFormatada)
////            {
////                elemento.value = mascaraFormatada;
////            }
////            //delete (elemento as any);
////            elemento = undefined;

////            this.NotificarValorFormatadoAlterado(event, mascaraFormatada);
////        }

////        protected override RetornarValorFormatado(valorDom: string, completar: boolean = false): string
////        {
////            this.IsAntes10 = valorDom.Contains(":") && valorDom.split(":").First().length == 1;
////            return u.FormatacaoUtil.FormatarMascara(valorDom, this.FormataMascara, completar);
////        }

////        private Elemento_Blur(e: FocusEvent): void
////        {
////            this.AtualizarValorFormatado(e, true);
////        }

////        private Elemento_Focus(event: FocusEvent)
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