namespace Snebur.UI
{
    export class ElementoUtil
    {
        private static ContadorElemento: number = 0;
        private static UsarIdCurto: boolean = false;

        public static RetornarNovoIDElemento(uiElementoOuConstrutor?: IControleConstrutor | BaseUIElemento, adicional?: string): string
        {
            this.ContadorElemento += 1;
            if ($Configuracao.IsDebug && this.UsarIdCurto)
            {
                return ElementoUtil.RetornarNovoIdLongo(uiElementoOuConstrutor, adicional);
            }
            return "id_" + this.ContadorElemento.toString();
        }

        private static RetornarNovoIdLongo(uiElementoOuConstrutor?: IControleConstrutor | BaseUIElemento, adicional?: string): string
        {
            const partes = new Array<string>();
            if (!String.IsNullOrWhiteSpace(adicional))
            {
                partes.Add(adicional);
            }
            while (uiElementoOuConstrutor instanceof BaseUIElemento)
            {
                const tipo = uiElementoOuConstrutor.GetType();
                if ((tipo instanceof r.BaseTipo) && tipo.Nome !== "Object")
                {
                    partes.Add(tipo.Nome);
                }
                uiElementoOuConstrutor = uiElementoOuConstrutor.ControlePai;
            }
            partes.Add(this.ContadorElemento.toString());
            partes.Add("id");

            partes.reverse();
            return String.Join("_", partes);
        }

        public static RetornarOffset(refEelemento: HTMLElement | string): d.Posicao
        {
            const elemento = ElementoUtil.RetornarElemento(refEelemento);
            const rect = elemento.getBoundingClientRect();
            const win = elemento.ownerDocument.defaultView;

            const x = rect.left + win.pageXOffset;
            const y = rect.top + win.pageYOffset;

            return new d.Posicao(x, y);
        }

        public static RetornarOffsetRelativo(elemento: HTMLElement, elementoRelativo: HTMLElement): IPosicao
        {
            let offsetX = elemento.offsetLeft;
            let offsetY = elemento.offsetTop;
            do
            {
                elemento = elemento.parentElement;
                offsetX += elemento.offsetLeft + elemento.scrollLeft;
                offsetY += elemento.offsetTop;

            }
            while (elemento != null && elemento !== elementoRelativo);

            return {
                X: offsetX,
                Y: offsetY
            };
        }

        public static RetornarElemento(refEelemento: HTMLElement | Element | string | Node | Window, ignorarElmentoNaoEncontrado?: boolean): HTMLElement
        {
            if (refEelemento instanceof Node ||
                refEelemento instanceof Window)
            {
                return refEelemento as HTMLElement;
            }

            if (typeof refEelemento === "string")
            {
                const elemento = document.getElementById(refEelemento);
                if (elemento instanceof HTMLElement)
                {
                    return elemento;
                }
            }
            if (u.ConverterUtil.ParaBoolean(ignorarElmentoNaoEncontrado))
            {
                return null;
            }

            throw new ErroNaoDefinido(`A referencia ${refEelemento} do elemento não foi encontrado`, this);
        }

        public static ClonarElemento(elemento: HTMLElement, removerElementosConteudoApresentacao?: boolean): HTMLElement;
        public static ClonarElemento(idElemento: string, removerElementosConteudoApresentacao?: boolean): HTMLElement;
        public static ClonarElemento(refEelemento: HTMLElement | string, removerElementosConteudoApresentacao = true): HTMLElement
        {
            const elemento = ElementoUtil.RetornarElemento(refEelemento);
            /*const elementoClone = elemento.cloneNode(true);*/
            ElementoUtil.RemoverTodosAtributos(elemento, AtributosHtml.Construtor);
            ElementoUtil.RemoverTodosAtributos(elemento, "Id");

            if (removerElementosConteudoApresentacao)
            {
                const elementosConteudoApresentacao = elemento.getElementsByTagName(ComponenteApresentacaoConteudo.TAG_ELEMENTO_CONTEUDO_APRESENTACAO);
                const len = elementosConteudoApresentacao.length;
                for (let i = 0; i < len; i++)
                {
                    const elementoConteudo = elementosConteudoApresentacao[i];
                    if (elementoConteudo instanceof HTMLElement)
                    {
                        elementoConteudo.remove();
                    }
                }
            }
            return elemento;
        }

        public static RemoverTodosAtributos(elemento: HTMLElement, atributo: AtributoHtml): void
        public static RemoverTodosAtributos(elemento: HTMLElement, nomeAtributo: string): void
        public static RemoverTodosAtributos(idElemento: string, atributo: AtributoHtml): void
        public static RemoverTodosAtributos(idElemento: string, nomeAtributo: string): void
        public static RemoverTodosAtributos(refEelemento: HTMLElement | string, refAtributo: AtributoHtml | string): void
        {
            const nomeAtributo = refAtributo instanceof AtributoHtml ? refAtributo.Nome : refAtributo;
            const elemento = ElementoUtil.RetornarElemento(refEelemento);
            elemento.removeAttribute(nomeAtributo);

            const len = elemento.childNodes.length;
            for (let i = 0; i < len; i++)
            {
                const filho = elemento.childNodes[i];
                if (filho instanceof HTMLElement)
                {
                    ElementoUtil.RemoverAtributo(filho, nomeAtributo);
                }
            }
        }

        public static OcultarElemento(elemento: HTMLElement): void;
        public static OcultarElemento(idElemento: string): void;
        public static OcultarElemento(refEelemento: any): void
        {
            let elemento = ElementoUtil.RetornarElemento(refEelemento);
            elemento.style.display = "none";
            //delete (elemento as any);
            elemento = undefined;
        }

        public static OcultarElementos(arrElementos: Array<HTMLElement>): void;
        public static OcultarElementos(arrIdElementos: Array<string>): void;
        public static OcultarElementos(arrRefElementos: Array<any>): void
        {
            for (let i = 0; i < arrRefElementos.length; i++)
            {
                this.OcultarElemento(arrRefElementos[i]);
            }
        }

        public static MostrarElemento(elemento: HTMLElement): void;
        public static MostrarElemento(idElemento: string): void;
        public static MostrarElemento(refEelemento: any): void
        {
            let elemento = ElementoUtil.RetornarElemento(refEelemento);
            elemento.style.display = "";
            //delete (elemento as any);
            elemento = undefined;
        }

        public static MostrarElementos(arrElementos: Array<HTMLElement>): void;
        public static MostrarElementos(arrIdElementos: Array<string>): void;
        public static MostrarElementos(arrRefElementos: Array<any>): void
        {
            for (let i = 0; i < arrRefElementos.length; i++)
            {
                this.MostrarElemento(arrRefElementos[i]);
            }
        }

        public static AdicionarElemento(elemento: HTMLElement, novoElemento: HTMLElement): void;
        public static AdicionarElemento(idElemento: string, novoElemento: HTMLElement): void;
        public static AdicionarElemento(refElemento: any, novoElemento: HTMLElement): void
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            elemento.appendChild(novoElemento);
            //delete (elemento as any);
        }

        public static InserirElementoAntes(elemento: HTMLElement, novoElemento: HTMLElement, nodeReferencia: Node): void;
        public static InserirElementoAntes(idElemento: string, novoElemento: HTMLElement, nodeReferencia: Node): void;
        public static InserirElementoAntes(elemento: HTMLElement, novoElemento: HTMLElement, elementoReferencia: HTMLElement): void;
        public static InserirElementoAntes(idElemento: string, novoElemento: HTMLElement, idElementoReferencia: string): void;
        public static InserirElementoAntes(refElemento: any, novoElemento: HTMLElement, refElementoReferencia: any): void
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            const elementoReferencia = ElementoUtil.RetornarElemento(refElementoReferencia);
            elemento.insertBefore(novoElemento, elementoReferencia);
            //delete (elemento as any);
        }

        public static InserirElementoDepois(elemento: HTMLElement, novoElemento: HTMLElement, nodeReferencia: Node): void;
        public static InserirElementoDepois(idElemento: string, novoElemento: HTMLElement, nodeReferencia: Node): void;
        public static InserirElementoDepois(elemento: HTMLElement, novoElemento: HTMLElement, elementoReferencia: HTMLElement): void;
        public static InserirElementoDepois(idElemento: string, novoElemento: HTMLElement, idElementoReferencia: string): void;
        public static InserirElementoDepois(refElemento: any, novoElemento: HTMLElement, refElementoReferencia: any): void
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            const elementoReferencia = ElementoUtil.RetornarElemento(refElementoReferencia);
            if (elementoReferencia.nextElementSibling instanceof HTMLElement)
            {
                elemento.insertBefore(novoElemento, elementoReferencia.nextElementSibling);
            }
            else
            {
                elemento.appendChild(novoElemento);
            }
            //delete (elemento as any);
        }

        public static RemoverElemento(elemento: HTMLElement, elementoRemover: HTMLElement, ignorarElementoNaoEncotrato: boolean): void;
        public static RemoverElemento(elemento: HTMLElement, idElementoRemover: string, ignorarElementoNaoEncotrato: boolean): void;
        public static RemoverElemento(idElemento: string, elementoRemover: HTMLElement, ignorarElementoNaoEncotrato: boolean): void;
        public static RemoverElemento(idElemento: string, idElementoRemover: string, ignorarElementoNaoEncotrato: boolean): void;
        public static RemoverElemento(elemento: HTMLElement, elementoRemover: HTMLElement): void;
        public static RemoverElemento(elemento: HTMLElement, idElementoRemover: string): void;
        public static RemoverElemento(idElemento: string, elementoRemover: HTMLElement): void;
        public static RemoverElemento(idElemento: string, idElementoRemover: string): void;
        public static RemoverElemento(refElemento: any, refElementoRemover: any, ignorarElementoNaoEncotrato?: boolean): void
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento, ignorarElementoNaoEncotrato);
            const elementoRemover = ElementoUtil.RetornarElemento(refElementoRemover, ignorarElementoNaoEncotrato);

            if ((elemento instanceof HTMLElement) && (elementoRemover instanceof HTMLElement))
            {
                elementoRemover.remove();
                //elemento.removeChild(elementoRemover);

                //delete (elemento as any);
                //delete (elementoRemover as any);
            }
        }

        public static AtualizarInnerHtml(elemento: HTMLElement, innerHtml: string): void;
        public static AtualizarInnerHtml(idElemento: string, innerHtml: string): void;
        public static AtualizarInnerHtml(refEelemento: any, innerHtml: string): void
        {
            let elemento = ElementoUtil.RetornarElemento(refEelemento);
            elemento.innerHTML = innerHtml;
            //delete (elemento as any);
            elemento = undefined;
        }

        //public static AdicionarAtributo(elemento: HTMLElement, atributo: AtributoHtml, valorAtributo: string | number): void;
        //public static AdicionarAtributo(elemento: HTMLElement, nomeAtributo: string, valorAtributo: string | number): void;
        //public static AdicionarAtributo(idElemento: string, atributo: AtributoHtml, valorAtributo: string | number): void;
        //public static AdicionarAtributo(idElemento: string, nomeAtributo: string, valorAtributo: string | number): void;
        public static AdicionarAtributo(refElemento: HTMLElement | string, atributo: AtributoHtml | string, valorAtributo: string | number | boolean = null): void
        {
            const nomeAtributo: string = (atributo instanceof AtributoHtml) ? (atributo as AtributoHtml).Nome : atributo;
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            if (valorAtributo == null)
            {
                elemento.removeAttribute(nomeAtributo);
            }
            else
            {
                elemento.setAttribute(nomeAtributo, valorAtributo.toString());
            }

            //delete (elemento as any);
        }

        public static RemoverAtributo(elemento: Element, atributo: AtributoHtml): void;
        public static RemoverAtributo(elemento: Element, nomeAtributo: string): void;
        public static RemoverAtributo(idElemento: string, atributo: AtributoHtml): void;
        public static RemoverAtributo(idElemento: string, nomeAtributo: string): void;
        public static RemoverAtributo(refElemento: any, atributo: any): void
        {
            const nomeAtributo: string = (atributo instanceof AtributoHtml) ? (atributo as AtributoHtml).Nome : atributo;
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            elemento.removeAttribute(nomeAtributo);
            //delete (elemento as any);
        }

        public static RetornarValorAtributo(elemento: Element, atributo: AtributoHtml): string;
        public static RetornarValorAtributo(elemento: Element, nomeAtributo: string): string;
        public static RetornarValorAtributo(idElemento: string, atributo: AtributoHtml): string;
        public static RetornarValorAtributo(idElemento: string, nomeAtributo: string): string;
        public static RetornarValorAtributo(refElemento: any, atributo: any): string
        {
            let valorAtributo: string = null;
            const nomeAtributo: string = (atributo instanceof AtributoHtml) ? (atributo as AtributoHtml).Nome : atributo;
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            if (elemento.hasAttribute(nomeAtributo))
            {
                valorAtributo = elemento.getAttribute(nomeAtributo);
            }
            //delete (elemento as any);
            return valorAtributo;
        }

        public static LimparElementosFilho(idElemento: string): void
        public static LimparElementosFilho(elemento: HTMLElement): void
        public static LimparElementosFilho(refElemento: any): void
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            while (elemento.firstChild != null)
            {
                elemento.removeChild(elemento.lastChild);
            }
            //delete (elemento as any);
        }

        public static AtualizarValorInput(idElemento: string, valor: string): void
        public static AtualizarValorInput(elemento: HTMLElement, valor: string): void
        public static AtualizarValorInput(refElemento: any, valor: string): void
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento) as HTMLInputElement;
            elemento.value = valor;
            //delete (elemento as any);
        }

        public static InputSomenteLeitura(idElemento: string, ativar: boolean): void
        public static InputSomenteLeitura(elemento: HTMLElement, ativar: boolean): void
        public static InputSomenteLeitura(refElemento: any, ativar: boolean = true): void
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento) as HTMLInputElement;
            elemento.readOnly = ativar;
            //delete (elemento as any);
        }


        //public static AtualizarSrcImagem(refElemento: HTMLElement | string, urlImagem: string, forcar: boolean = false): void
        //{
        //    let elementoImagem = ElementoUtil.RetornarElemento(refElemento) as HTMLImageElement;
        //    if (elementoImagem.src != urlImagem || forcar)
        //    {
        //        elementoImagem.src = urlImagem;
        //    }

        //    //delete (elementoImagem as any);
        //}

        public static FocarElemento(idElemento: string): void
        public static FocarElemento(elemento: HTMLElement): void
        public static FocarElemento(refElemento: any): void
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento) as HTMLInputElement;
            elemento.focus();
            //delete (elemento as any);
        }

        public static IsVisivel(elemento: HTMLElement): boolean
        {
            if (elemento == null)
            {
                return false;
            }

            if (elemento.style.display === "none" ||
                elemento.style.visibility === "hidden" ||
                elemento.style.visibility === "collapse")
            {
                return false;
            }

            const estilosComputado = window.getComputedStyle(elemento, null);
            const displayComputado = estilosComputado.getPropertyValue("display");
            /* const visibilityComputado = estilosComputado.getPropertyValue("visibility");  */

            if (displayComputado === "none" /*   ||
                visibilityComputado === "hidden" ||
                visibilityComputado === "collapse*/)
            {
                if ($Configuracao.IsDebug)
                {
                    if (!EstiloUtil.IsPosicaoZerada(elemento.getBoundingClientRect()))
                    {
                        throw new Erro("Falha analisar visibilidade do elemento");
                    }
                }
                return false;
            }
            return true;
        }

        public static RetornarPosicaoElemento(idElemento: string): IClientRect;
        public static RetornarPosicaoElemento(elemento: HTMLElement): IClientRect;
        public static RetornarPosicaoElemento(refElemento: any): IClientRect
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            const posicaoElemento = elemento.getBoundingClientRect();

            if (posicaoElemento.left === 0 &&
                posicaoElemento.top === 0 &&
                posicaoElemento.width === 0 &&
                posicaoElemento.height === 0)
            {
                return {
                    left: EstiloUtil.RetornarValorNumericoPixel(elemento.style.left),
                    top: EstiloUtil.RetornarValorNumericoPixel(elemento.style.top),
                    width: EstiloUtil.RetornarValorNumericoPixel(elemento.style.width),
                    height: EstiloUtil.RetornarValorNumericoPixel(elemento.style.height),
                    right: EstiloUtil.RetornarValorNumericoPixel(elemento.style.right),
                    bottom: EstiloUtil.RetornarValorNumericoPixel(elemento.style.bottom),
                };
            }
            return posicaoElemento;
        }

        public static RetornarDimensaoElemento(idElemento: string): d.Dimensao;
        public static RetornarDimensaoElemento(elemento: HTMLElement): d.Dimensao;
        public static RetornarDimensaoElemento(refElemento: any): d.Dimensao
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            const posicaoElemento = elemento.getBoundingClientRect();
            let largura = posicaoElemento.width;
            let altura = posicaoElemento.height;

            if (largura === 0 && altura === 0)
            {
                largura = EstiloUtil.RetornarValorNumericoPixel(elemento.style.width);
                altura = EstiloUtil.RetornarValorNumericoPixel(elemento.style.height);

            }
            return new d.Dimensao(largura, altura);
        }

        //public static RetornarDimensaoElemento(idElemento: string): d.Dimensao;
        //public static RetornarDimensaoElemento(elemento: HTMLElement): d.Dimensao;
        //public static RetornarDimensaoElemento(refElemento: any): d.Dimensao
        //{
        //    let elemento = ElementoUtil.RetornarElemento(refElemento);

        //    let larguraElemento: number = 0;
        //    let alturaElemento: number = 0;

        //    while (larguraElemento == 0 || alturaElemento == 0)
        //    {
        //        let posicaoElemento = elemento.getBoundingClientRect();

        //        if (larguraElemento == 0)
        //        {
        //            larguraElemento = posicaoElemento.width;
        //        }
        //        if (alturaElemento == 0)
        //        {
        //            alturaElemento = posicaoElemento.height;
        //        }
        //        elemento = elemento.parentElement;
        //    }
        //    return new d.Dimensao(larguraElemento, alturaElemento);
        //}

        public static DesabilitarElemento(elemento: HTMLElement, isRecursivo: boolean): void
        {
            //if (elemento.tagName.StartsWith(ElementoControleUtil.PREFIXO_CONTROLE) ||
            //    (elemento instanceof HTMLInputElement) ||
            //    (elemento instanceof HTMLButtonElement) ||
            //    (elemento instanceof HTMLAnchorElement))
            //{

            //}

            if (elemento instanceof HTMLInputElement)
            {
                elemento.disabled = true;
            }
            elemento.style.pointerEvents = "none";

            if (isRecursivo)
            {
                const len = elemento.childNodes.length;
                for (let i = 0; i < len; i++)
                {
                    const elementoFilho = elemento.childNodes[i];
                    if (elementoFilho instanceof HTMLElement)
                    {
                        if (!ElementoControleUtil.IsElementoControle(elementoFilho))
                        {
                            ElementoUtil.DesabilitarElemento(elementoFilho, isRecursivo);
                        }
                    }
                }
            }

        }

        public static HabilitarElemento(elemento: HTMLElement): void
        {
            if (elemento instanceof HTMLInputElement)
            {
                if (!elemento.readOnly)
                {
                    elemento.disabled = false;
                    elemento.style.pointerEvents = "";
                }
            }
            else
            {
                elemento.style.pointerEvents = "";
            }

            const len = elemento.childNodes.length;
            for (let i = 0; i < len; i++)
            {
                const elementoFilho = elemento.childNodes[i];
                if (elementoFilho instanceof HTMLElement)
                {
                    if (!ElementoControleUtil.IsElementoControle(elementoFilho))
                    {
                        ElementoUtil.HabilitarElemento(elementoFilho);
                    }
                }
            }
        }

        public static IsImagmeCarregada(idElemento: string): boolean;
        public static IsImagmeCarregada(elemento: HTMLElement): boolean;
        public static IsImagmeCarregada(refElemento: any): boolean
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento, true);
            if (elemento instanceof HTMLImageElement)
            {
                return elemento.complete &&
                    elemento.naturalWidth > 0 &&
                    elemento.naturalHeight > 0;
            }
            return false;
        }


        public static IsNaTela(elemento: HTMLElement): boolean
        {
            if (ElementoUtil.IsVisivel(elemento))
            {
                const retangulo = elemento.getBoundingClientRect();
                const inferior = retangulo.bottom - retangulo.height;
                const superior = retangulo.top + retangulo.height;
                return superior >= 0 && inferior <= window.innerHeight &&
                    retangulo.width > 0 && retangulo.height > 0;
            }
            return false;
        }

        public static RetornarAtributos(elemento: HTMLElement): any
        {
            const len = elemento.attributes.length;
            const di = new DicionarioSimples<string>();
            for (let i = 0; i < len; i++)
            {
                const atributo = elemento.attributes[i];
                //if (atributo.name !== "id")
                //{
                di.Add(atributo.name, atributo.value);
                /*}*/
            }
            return di;
        }

        public static SolicitarTelaCheia(elemento: HTMLElement)
        {
            try
            {
                const el = elemento as any;
                if (elemento.requestFullscreen)
                {
                    el.requestFullscreen();
                }
                else if (el.webkitRequestFullscreen)
                {
                    el.webkitRequestFullscreen();
                }
                else if (el.mozRequestFullScreen)
                {
                    el.mozRequestFullScreen();
                }
                else if (el.msRequestFullscreen)
                {
                    el.msRequestFullscreen();
                }
                else if (el.webkitEnterFullscreen)
                {
                    el.webkitEnterFullscreen();
                }
            }
            catch (erro)
            {
                console.error(erro);
            }
        }

        public static async DesfocarElementoAtualAtivoAsync()
        {
            if (document.activeElement instanceof HTMLElement)
            {
                document.activeElement.blur();
                await ThreadUtil.QuebrarAsync();
            }
        }

        //#region Somente leitura

        public static DesabilitarSomenteLeitura(elemento: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): any
        {
            elemento.disabled = false;
            (elemento as HTMLInputElement).readOnly = false;
            elemento.style.pointerEvents = "";
        }

        public static HabilitarSomenteLeitura(elemento: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): any
        {
            elemento.disabled = true;
            (elemento as HTMLInputElement).readOnly = true;
            elemento.style.pointerEvents = "none";
        }

        //#endregion

        public static CriarElemento<K extends keyof HTMLElementTagNameMap>(tag: K, innerHTML: string | number = "", className: string = ""): HTMLElementTagNameMap[K]
        {
            return ElementoUtil.RetornarNovoElemento(tag, innerHTML, className);
        }

        public static RetornarNovoElemento<K extends keyof HTMLElementTagNameMap>(tag: K, innerHTML: string | number = "", className: string = ""): HTMLElementTagNameMap[K]
        {
            const e = document.createElement(tag);
            e.innerHTML = innerHTML?.toString();
            e.className = className;
            return e;
        }

        public static RetornarSpanStringComClassCss(conteudo: string, classCss: string)
        {
            return ` <span class="${classCss}""> ${conteudo} </span> `;
        }

        public static ScrollTo(elemento: HTMLElement)
        {
            elemento.scrollIntoView({
                block: "center",
                inline: "center",
                behavior: "smooth"
            });
        }
    }

    export interface IClientRect
    {
        width: number;
        height: number;
        top: number;
        left: number;
        right: number;
        bottom: number;
    }

}