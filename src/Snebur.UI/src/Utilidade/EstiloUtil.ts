namespace Snebur.UI
{
    export class EstiloUtil
    {
        private static readonly PASSO_ZINDEX_JANELA = 10000;
        private static readonly PASSO_ZINDEX_CONTROLE_FLUTUANTE = 200;
        public static readonly IMPORTANT = " !important";
        private static _zIndexFlutenteContador: number = 10000;
        public static readonly OptionsEventListernerNotPassive = { passive: false };
        public static readonly OptionsEventListernerPassive = { passive: true };

        public static readonly TAMANHO_FONTE_PADRAO = 16;

        private static EstilosIngnorar: any = {
            "cssText": true,
            "insetInline": true,
            "insetInlineEnd": true,
            "insetInlineStart": true,
            "object-position": true,
            "length": true,
            "parentRule": true,
            "getPropertyPriority ": true
        }

        public static get TamanhoFonteDocumento(): number
        {
            return EstiloUtil.RetornarValorNumericoPixel(window.getComputedStyle(document.documentElement).getPropertyValue("font-size"));
        }

        public static get CssTranslateCentro()
        {
            if (u.SistemaUtil.IsInternetExplorer11)
            {
                return "translate( -50%,-50% )";
            }
            return "translate(calc( -50% + 1px - 1px), calc( -50% + 1px - 1px))";
        }
        public static get CssTranslateCentroVertical()
        {
            if (u.SistemaUtil.IsInternetExplorer11)
            {
                return "translateY(-50%)";
            }
            return "translateY(calc( -50% + 1px - 1px))";
        }

        public static get ZIndexJanelaContador(): number
        {
            this._zIndexFlutenteContador += EstiloUtil.PASSO_ZINDEX_JANELA;
            return this._zIndexFlutenteContador;
        }
        public static get ZIndexControleFlutuante(): number
        {
            this._zIndexFlutenteContador += EstiloUtil.PASSO_ZINDEX_CONTROLE_FLUTUANTE;
            return this._zIndexFlutenteContador;

        }
        public static get ZIndexJanelaContadorMensagemFlutuante(): number
        {
            this._zIndexFlutenteContador += 1;
            return this._zIndexFlutenteContador;
        }

        //private static string ClassesCssReversadasMaterialDesinger 

        public static AdicionarCssClasse(refEelemento: HTMLElement | string, classes: string): void
        {
            if (!String.IsNullOrWhiteSpace(classes))
            {
                const elemento = ElementoUtil.RetornarElemento(refEelemento);
                const partes = classes.split(" ");
                const len = partes.length;

                for (let i = 0; i < len; i++)
                {
                    const classe = partes[i];
                    if (!String.IsNullOrWhiteSpace(classe))
                    {
                        const posicaoPrefixo = classe.indexOf("--");
                        if (posicaoPrefixo > 0)
                        {
                            const prefixo = classe.substr(0, posicaoPrefixo + 2);
                            EstiloUtil.RemoverClssClassePrefixo(elemento, prefixo);
                        }

                        if (!elemento.classList.contains(classe))
                        {
                            elemento.classList.add(classe);
                        }
                    }
                }
            }
        }

        public static RemoverCssClasse(refEelemento: HTMLElement | string, classes: string): void
        {
            const elemento = ElementoUtil.RetornarElemento(refEelemento, true);
            if (elemento instanceof HTMLElement)
            {
                const partes = classes.split(" ");
                const len = partes.length;
                for (let i = 0; i < len; i++)
                {
                    const classe = partes[i];
                    while (elemento.classList.contains(classe))
                    {
                        elemento.classList.remove(classe);
                    }
                }
            }
        }


        /**
         * Atualizar classes no elemento
         * @param elemento elemento de destino
         * @param classes classes para adicionar ou remover, separado por espaços
         * @param isAdicionar true para adicionar false para remover a classe
         * @param isIgnorarErro Opcional ignora erro, caso o elemento não exista, padrão false
         */
        public static AtualizarCssClass(refEelemento: HTMLElement | string, classes: string, isAdicionar: boolean)
        {
            if (classes == null)
            {
                throw new Erro("O argumento  'classes' não foi definido");
            }

            if (isAdicionar)
            {
                EstiloUtil.AdicionarCssClasse(refEelemento, classes);
            }
            else
            {
                EstiloUtil.RemoverCssClasse(refEelemento, classes);
            }

        }

        public static AtualizarEstilo(elemento: HTMLElement | Element, estilo: Estilo): void
        public static AtualizarEstilo(idElemento: string, estilo: Estilo): void
        public static AtualizarEstilo(refEelemento: any, estilo: Estilo): void
        {
            const elemento = ElementoUtil.RetornarElemento(refEelemento);
            for (const propriedade in estilo)
            {
                if (typeof propriedade !== "undefined")
                {
                    /*eslint-disable*/
                    if (estilo.hasOwnProperty(propriedade))
                    {
                        if ((elemento.style as any)[propriedade] !== (estilo as any)[propriedade])
                        {
                            (elemento.style as any)[propriedade] = (estilo as any)[propriedade];
                        }

                    }
                    /*eslint-enable*/
                    //elemento.style[p] = estilo[p];
                }
            }
            //delete (elemento as any);
        }

        public static AtualizarCssTexto(elemento: HTMLElement, cssTexto: string): void
        public static AtualizarCssTexto(idElemento: string, cssTexto: string): void
        public static AtualizarCssTexto(refEelemento: any, cssTexto: string): void
        {
            const elemento = ElementoUtil.RetornarElemento(refEelemento);
            elemento.style.cssText = cssTexto;
            //delete (elemento as any);
        }

        public static AtualizarVisibilidade(elemento: HTMLElement, visibilidade: boolean): void
        public static AtualizarVisibilidade(elemento: HTMLElement, visibilidade: EnumVisibilidade): void
        public static AtualizarVisibilidade(idElemento: string, visibilidade: EnumVisibilidade): void
        public static AtualizarVisibilidade(refEelemento: any, visibilidade: EnumVisibilidade | boolean): void 
        {
            const elemento = ElementoUtil.RetornarElemento(refEelemento);

            /*EstiloUtil.RemoverClssClasseComecaCom(elemento, PropriedadeVisibilidade.PREFIXO_VISIBILIDADE);*/

            visibilidade = EstiloUtil.RetornarNormalizarVisibilidade(visibilidade);
            elemento.style.visibility = this.RetornarEstiloVisibilidade(visibilidade);


            switch (visibilidade)
            {
                case EnumVisibilidade.Visivel:

                    if (elemento.__OpacidadeVisivel)
                    {
                        elemento.style.opacity = elemento.__OpacidadeVisivel.toString();
                    }
                    elemento.style.display = String.Empty;
                    break;


                case EnumVisibilidade.Invisivel:
                    {
                        const _opcidadeVisivel = String.IsNullOrEmpty(elemento.style.opacity) ? 1 : parseFloat(elemento.style.opacity);
                        elemento.__OpacidadeVisivel = _opcidadeVisivel;
                        break;
                    }
                case EnumVisibilidade.Oculto:
                    elemento.style.display = "none";
                    elemento.style.setProperty("display", "none", "important");
                    break;
            }

        }

        public static RetornarNormalizarVisibilidade(visibilidade: EnumVisibilidade | boolean | string): EnumVisibilidade
        {
            if (typeof visibilidade === "boolean")
            {
                return (visibilidade) ? EnumVisibilidade.Visivel : EnumVisibilidade.Oculto;
            }

            if (typeof visibilidade === "string")
            {
                if (ValidacaoUtil.IsNumber(visibilidade, true))
                {
                    return parseInt(visibilidade);
                }
                const visiblidadeTipada = EnumUtil.RetornarValor(EnumVisibilidade, visibilidade);
                if (typeof visiblidadeTipada === "number")
                {
                    return visiblidadeTipada;
                }
                throw new Erro(`Não foi possível normalizar visibilidade do valor ${visibilidade}`);
            }
            return visibilidade;

        }
        private static RetornarEstiloVisibilidade(visibilidade: EnumVisibilidade | boolean): string
        {

            switch (visibilidade)
            {
                case (EnumVisibilidade.Visivel):

                    return "visible";

                case (EnumVisibilidade.Oculto):

                    return "collapse";

                case (EnumVisibilidade.Invisivel):

                    return "hidden";

                default:

                    throw new Erro(`A visibilidade ${visibilidade} não é suportada`, this);
            }
        }

        public static RetornarVisibilidade(elemento: HTMLElement): EnumVisibilidade
        public static RetornarVisibilidade(idElemento: string): EnumVisibilidade
        public static RetornarVisibilidade(refEelemento: any): EnumVisibilidade
        {
            const elemento = ElementoUtil.RetornarElemento(refEelemento);
            switch (elemento.style.visibility)
            {
                case "hidden":

                    return EnumVisibilidade.Invisivel;

                case "collapse":

                    return EnumVisibilidade.Oculto;

                default:

                    return EnumVisibilidade.Visivel;
            }
        }

        public static IncrementarJanelaZIndex(janela: Janela | ControleApresentacao): number
        {
            const elemento = ElementoUtil.RetornarElemento(janela.Elemento);
            const zindex = EstiloUtil.ZIndexJanelaContador;
            elemento.style.zIndex = zindex.ToString();
            return zindex;
        }

        public static IncrementarControleFlutuanteZIndex(controleFlutuante: ControleFlutuante): number
        {
            const elemento = ElementoUtil.RetornarElemento(controleFlutuante.Elemento);
            const zindex = EstiloUtil.ZIndexJanelaContador;
            elemento.style.zIndex = zindex.ToString();
            return zindex;
        }

        public static IncrementarMensagemValizacaoZIndex(janelaOuControleFlutuantePai: ControleApresentacaoZIndex, refEelemento: HTMLElement | string): void
        {
            const zindex = janelaOuControleFlutuantePai?.RetornarElementoZIndex()?.style.zIndex ?? "0";
            let zindexTipado = ConverterUtil.ParaNumero(zindex);
            if (zindexTipado === 0)
            {
                zindexTipado = EstiloUtil.ZIndexJanelaContadorMensagemFlutuante;
            }
            const elemento = ElementoUtil.RetornarElemento(refEelemento);
            elemento.style.zIndex = zindexTipado.ToString();
        }

        public static RetornarValorNumericoPixel(pixelString: string): number
        {
            if (String.IsNullOrWhiteSpace(pixelString))
            {
                return 0;
            }
            else
            {
                /*return u.ConverterUtil.ParaNumero(pixel.replace("px", ""));*/
                const pixels = parseInt(pixelString);
                return isNaN(pixels) ? 0 : pixels;
            }
        }

        public static RetornarValorNumericoRem(remsString: string): number
        {
            if (String.IsNullOrWhiteSpace(remsString))
            {
                return 0;
            }
            else
            {
                /*return u.ConverterUtil.ParaNumero(rems.replace("rem", ""));*/
                const rems = parseFloat(remsString);
                return isNaN(rems) ? 0 : rems;
            }
        }

        public static FormatarValorPixel(valor: number): string
        {
            return `${valor}px`;
        }

        public static Ocultar(elemento: HTMLElement): void;
        public static Ocultar(idElemento: string): void;
        public static Ocultar(refEelemento: any): void
        {
            ElementoUtil.OcultarElemento(refEelemento);
        }

        public static Mostrar(elemento: HTMLElement): void;
        public static Mostrar(idElemento: string): void;
        public static Mostrar(refEelemento: any): void
        {
            ElementoUtil.MostrarElemento(refEelemento);
        }

        public static RemoverClssClassePrefixo(elemento: HTMLElement, prefixo: string): any
        {
            this.RemoverClssClasseComecaCom(elemento, prefixo);
        }

        public static RemoverClssClasseComecaCom(elemento: HTMLElement, prefixo: string): any
        {
            const classesCor = u.Util.CopiarArray<string>(elemento.classList).Where(x => x.StartsWith(prefixo)).ToList();
            for (const classe of classesCor)
            {
                elemento.classList.remove(classe);
            }
        }

        private static ValidarCssClasse(classe: string): void
        {
            const prefixo = classe.split("-")[0];
            if (!EstiloUtil.PrefixosSuportados.Contains(prefixo))
            {
                throw new Erro(`O prefixo da classe ${classe} não é suportado`);
            }
        }

        private static _prefixosSuportados: HashSet<string> = null;
        private static get PrefixosSuportados(): HashSet<string>
        {
            if (EstiloUtil._prefixosSuportados == null)
            {
                EstiloUtil._prefixosSuportados = new HashSet<string>();
                EstiloUtil._prefixosSuportados.Add("zs");
                EstiloUtil._prefixosSuportados.Add("local");
                if ($Configuracao.PrefixosCssClasse?.Count > 0)
                {
                    EstiloUtil._prefixosSuportados.AddRange($Configuracao.PrefixosCssClasse);
                }

            }
            return EstiloUtil._prefixosSuportados;
        }

        public static ResetarZIndex(valor: number)
        {
            this._zIndexFlutenteContador = valor;
        }

        public static FormatarHtml(valor: string | number, estilo: EnumEstiloHtml): string
        {
            switch (estilo)
            {
                case EnumEstiloHtml.Negrito:

                    return `<strong> ${valor} </strong>`;

                case EnumEstiloHtml.QuebraLinhaFinal:

                    return `${valor} <br/>`;

                case EnumEstiloHtml.QuebraLinhaIncial:

                    return `<br/> ${valor} `;

                default:

                    throw new Erro("O estilo HTML não é suportado");
            }

        }
        public static FormatarHtmlCor(valor: string | number, cor: EnumCor, tonalizada?: EnumTonalidade): string
        {
            const classeCor = CorUtil.RetornarClasseCssCor(EnumPrefixoCor.CorTexto, cor, tonalizada);
            return `<span class="${classeCor}">  ${valor} </span>`;

        }

        static IsPosicaoZerada(posicaoElementoRelativo: DOMRect)
        {
            if (posicaoElementoRelativo != null)
            {
                return !((posicaoElementoRelativo.left +
                    posicaoElementoRelativo.top +
                    posicaoElementoRelativo.width +
                    posicaoElementoRelativo.height) > 0);
            }
            return true;
        }

        public static NormalizarPosicao(posicao: DOMRect, scalar?: number): DOMRect
        {
            if (scalar == null)
            {
                const tamanhoFonteDocumento = EstiloUtil.TamanhoFonteDocumento;
                scalar = EstiloUtil.TAMANHO_FONTE_PADRAO / tamanhoFonteDocumento;
            }
            if (scalar !== 1)
            {
                return new DOMRect(posicao.x * scalar,
                    posicao.y * scalar,
                    posicao.width * scalar,
                    posicao.height * scalar);

                //    left: posicao.left * scalar,
                //    top: posicao.top * scalar,
                //    width: posicao.width * scalar,
                //    height: posicao.height * scalar,
                //    right: posicao.right * scalar,
                //    bottom: posicao.bottom * scalar,
                //    x: posicao.x * scalar,
                //    y: posicao.y * scalar,
                //    toJSON: null
                //};
            }
            return posicao;
        }

        public static FormatarRem(valor: number)
        {
            return valor.toFixed(2) + "rem";
        }

        private static EstilosDimensao: any = {
            "width": true,
            "max-width": true,
            "min-width": true,
            "height": true,
            "max-height": true,
            "min-height": true,
        }

        public static IsEstiloDimensao(estilo: string)
        {
            return EstiloUtil.EstilosDimensao[estilo] === true;
        }

        public static DesativarScrollVertical(elemento: HTMLElement)
        {
            const overflowY = u.SistemaUtil.SistemaOperacionalEnum === d.EnumSistemaOperacional.Android ? "visible" : "hidden";
            elemento?.style.setProperty("overflow-y", overflowY, "important");
            elemento?.style.setProperty("-webkit-overflow-scrolling", "none", "important");
        }

        public static AtivarScrollVertical(elemento: HTMLElement)
        {
            elemento?.style.setProperty("overflow-y", "auto", "important");

            elemento?.style.setProperty("-webkit-overflow-scrolling", "touch", "important");
        }

        public static DesativarScrollHorizontal(elemento: HTMLElement)
        {
            const overflowY = u.SistemaUtil.SistemaOperacionalEnum === d.EnumSistemaOperacional.Android ? "visible" : "hidden";
            elemento?.style.setProperty("overflow-y", overflowY, "important");
        }

        public static AtivarScrollHorizontal(elemento: HTMLElement)
        {
            elemento?.style.setProperty("overflow-y", "auto", "important");
        }

        public static SetFontSize(element: HTMLElement, tamanhoFonte: number)
        {
            if (tamanhoFonte < 3 || isNaN(tamanhoFonte) || tamanhoFonte > 150)
            {
                console.error(`O tamanho da fonte: ${tamanhoFonte} não é suportado`);
                return;
            }

            element.style.fontSize = tamanhoFonte.ToPixels();
            element.style.setProperty("font-size", tamanhoFonte.ToPixels(), "important");
        }

        public static RetornarEstilo(elementoOrigem: HTMLElement): Estilo
        {
            if (elementoOrigem == null)
            {
                return null;
            }

            const estilo = new Estilo();
            for (const nomeEstilo in elementoOrigem.style)
            {
                if (EstiloUtil.IsEstilo(nomeEstilo))
                {
                    const valorEstilo = elementoOrigem.style[nomeEstilo];
                    if (typeof valorEstilo === "string" && valorEstilo !== "")
                    {
                        (estilo as any)[nomeEstilo] = valorEstilo;
                        if (nomeEstilo === "font")
                        {
                            (estilo as any).fontSize = elementoOrigem.style.fontSize;
                        }
                    }
                }
            }
            return estilo;
        }

        public static RetornarEstiloComputado(elementoOrigem: HTMLElement): Estilo
        {
            const estilo = new Estilo();
            const estilosComputados = document.defaultView.getComputedStyle(elementoOrigem, null);
            for (const nomeEstilo in estilosComputados)
            {
                if (EstiloUtil.IsEstilo(nomeEstilo))
                {
                    const valorEstilo = estilosComputados[nomeEstilo];
                    if (typeof valorEstilo === "string" && valorEstilo !== "")
                    {
                        (estilo as any)[nomeEstilo] = valorEstilo;
                        if (nomeEstilo === "font")
                        {
                            (estilo as any).fontSize = estilosComputados.fontSize;
                        }
                    }
                }
            }
            return estilo;
        }

        public static IsEstilo(estilo: string)
        {
            return typeof estilo === "string" &&
                !EstiloUtil.EstilosIngnorar[estilo] &&
                !estilo.StartsWith("-webkit") &&
                !estilo.StartsWith("inset") &&
                !ValidacaoUtil.IsNumber(estilo, true);
        }

        public static DefinirCursorGlogal(cursor: CursorType)
        {
            document.documentElement.style.cursor = cursor;
            document.body.style.cursor = cursor;
        }

        public static LimparPosicoes(elementoImagem:HTMLElement)
        {
            elementoImagem.style.left = "";
            elementoImagem.style.right = ""; 
            elementoImagem.style.top = ""; 
            elementoImagem.style.bottom = ""; 
            elementoImagem.style.width = ""; 
            elementoImagem.style.height = ""; 
        }

        public static RetornarRotacao(transform: string):number
        {
            if (String.IsNullOrWhiteSpace(transform))
            {
                return 0;
            }
            const match = transform.match(/rotate\(([-\d.]+)deg\)/);
            if (!match || match.length < 2)
            {
                return 0;
            }
            return parseFloat(match[1]);
        }

        public static AtualizarCssClassPrefixo(elemento: HTMLElement, cssClasse: string)
        {
            const index = cssClasse.lastIndexOf("--");
            if (index > 0)
            {
                const prefixo = cssClasse.substring(0, index + 2);
                EstiloUtil.RemoverClssClassePrefixo(elemento, prefixo);
            }
            else
            {
                console.error(`A classe CSS '${cssClasse}' não possui um prefixo '--'`);
            }
            elemento.classList.add(cssClasse);
        }

        public static CalcularPixelsTamanhoFonte(pixels: number)
        {
            const tamanhoFonte = ui.EstiloUtil.TamanhoFonteDocumento;
            if (tamanhoFonte === ui.EstiloUtil.TAMANHO_FONTE_PADRAO)
            {
                return pixels;
            }
            return pixels * (tamanhoFonte / ui.EstiloUtil.TAMANHO_FONTE_PADRAO);
        }

        public static RetornarValorPixel(pixelOrRem: string): number
        {
            const valor = pixelOrRem.ToNumber();
            if (pixelOrRem.endsWith("px"))
            {
                return valor;
            }
            return valor * EstiloUtil.TamanhoFonteDocumento;
        }
    }

    export enum EnumEstiloHtml
    {
        Negrito,
        QuebraLinhaFinal,
        QuebraLinhaIncial,
    }

   export type CursorType =
        | "auto"
        | "default"
        | "none"
        | "context-menu"
        | "help"
        | "pointer"
        | "progress"
        | "wait"
        | "cell"
        | "crosshair"
        | "text"
        | "vertical-text"
        | "alias"
        | "copy"
        | "move"
        | "no-drop"
        | "not-allowed"
        | "e-resize"
        | "n-resize"
        | "ne-resize"
        | "nw-resize"
        | "s-resize"
        | "se-resize"
        | "sw-resize"
        | "w-resize"
        | "ew-resize"
        | "ns-resize"
        | "nesw-resize"
        | "nwse-resize"
        | "col-resize"
        | "row-resize"
        | "all-scroll"
        | "zoom-in"
        | "zoom-out"
        | "grab"
        | "grabbing";
}