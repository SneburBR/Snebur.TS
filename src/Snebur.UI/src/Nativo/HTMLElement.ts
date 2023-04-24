
namespace Snebur
{

    Object.defineProperty(HTMLElement.prototype, "Dimensao", {
        get: function ()
        {
            return ui.ElementoUtil.RetornarDimensaoElemento(this);
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(HTMLElement.prototype, "IsVisivel", {
        get: function ()
        {
            return ui.ElementoUtil.IsVisivel(this);
        },
        enumerable: false,
        configurable:false
    });

    if (typeof HTMLElement !== "undefined" && typeof HTMLElement.prototype !== "undefined")
    {
        Object.defineProperty(HTMLElement.prototype, "Visibilidade", {

            get: function ()
            {
                const elemento = this as HTMLElement;
                return ui.EstiloUtil.RetornarVisibilidade(elemento);
            },
            set: function (value: EnumVisibilidade)
            {
                const elemento = this as HTMLElement;
                ui.EstiloUtil.AtualizarVisibilidade(elemento, value);
            }
        });

        HTMLElement.prototype.OcultarElemento = (function (invisivel?: boolean)
        {
            const elemento = this as HTMLElement;
            elemento.Visibilidade = (invisivel) ? EnumVisibilidade.Invisivel : EnumVisibilidade.Oculto;

        });

        HTMLElement.prototype.MostrarElemento = (function ()
        {
            const elemento = this as HTMLElement;
            elemento.Visibilidade = EnumVisibilidade.Visivel;

        });

        HTMLElement.prototype.Desabilitar = (function ()
        {
            const elemento = this as HTMLElement;
            ElementoUtil.DesabilitarElemento(elemento, false);
        });

        HTMLElement.prototype.Habilitar = (function ()
        {
            const elemento = this as HTMLElement;
            ElementoUtil.HabilitarElemento(elemento);
        });

        HTMLElement.prototype.RetornarValorEstiloComputado = (function (expressao: any, valorPadrao: string = ""): string
        {
            const propriedadeEstilo = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressao);
            const valorComputado = window.getComputedStyle(this).getPropertyValue(propriedadeEstilo);
            if (!String.IsNullOrWhiteSpace(valorComputado))
            {
                return valorComputado;
            }
            return valorPadrao;
        });

        HTMLElement.prototype.Clear = (function ()
        {
            ElementoUtil.LimparElementosFilho(this);
        });


        HTMLElement.prototype.Dispose = (function ()
        {
            if (this.parentNode !== null)
            {
                this.remove();
            }
        });
    }

    Object.defineProperty(HTMLElement.prototype, "ElementoApresentacao", {
        get: function ()
        {
            const _this = this as HTMLElement;
            if (_this.firstElementChild != null)
            {
                if (_this.firstElementChild.tagName === ui.ComponenteApresentacaoConteudo.TAG_ELEMENTO_CONTEUDO_APRESENTACAO_CAIXA_ALTA)
                {
                    return _this.firstElementChild;
                }
            }
            return _this;
        }
    });


    //
    Object.defineProperty(HTMLImageElement.prototype, "UrlImagem", {

        get: function ()
        {
            return this.src;
        },
        set: function (value: string)
        {
            if (this.src !== value)
            {
                this.src = value;
            }
        }
    });


    if (!HTMLCanvasElement.prototype.toBlob)
    {
        HTMLCanvasElement.prototype.toBlob = function (callback: (blob: Blob | null) => void, formato: any, qualidade: number): void
        {
            if (!formato)
            {
                formato = "image/png";
            }

            const binStr = atob(this.toDataURL(formato, qualidade).split(",")[1]);
            const len = binStr.length;
            const arr = new Uint8Array(len);

            for (let i = 0; i < len; i++)
            {
                arr[i] = binStr.charCodeAt(i);
            }

            callback(new Blob([arr], { type: formato }));
        };
    }
     
    //XMLHttpRequest
    if (!(XMLHttpRequest.prototype as any).a)
    {
        (XMLHttpRequest.prototype as any).a = XMLHttpRequest.prototype.send;
    }


    //Polyfill remove
    (function (arr)
    {
        arr.forEach(function (item)
        {
            /*eslint-disable*/
            if (item.hasOwnProperty("remove"))
            {
                return;
            }
            /*eslint-enable*/
            Object.defineProperty(item, "remove", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function remove()
                {
                    if (this.parentNode !== null)
                    {
                        this.parentNode.removeChild(this);
                    }
                }
            });
        });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


    if (Element.prototype._baseRemove == null)
    {
        Element.prototype._baseRemove = Element.prototype.remove;

        Object.defineProperty(Element.prototype, "remove", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove(this:Element)
            {
                this._baseRemove();
            }
        });
    }
}

interface Element
{
    _baseRemove(): void;
}
