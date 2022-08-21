namespace Snebur.UI
{
    export class LinhaOrdenacao<TItem extends d.IOrdenacaoEntidade> extends Linha<TItem>
    {
        public get IsSensibilidadeVertical(): boolean
        {
            return true;
        }

        public get DataListaOrdenacao(): DataListaOrdenacao
        {
            return this.RetornarControlePai<DataListaOrdenacao>(DataListaOrdenacao);
        }

        public override get LinhasColecao(): LinhasColecaoOrdenacao<TItem>
        {
            return this.ControlePai as LinhasColecaoOrdenacao<TItem>;
        }

        public constructor(controlePai: LinhasColecao<TItem>,
            idElemento: string,
            template: TemplateColunasColecao,
            itemReferencia: any,
            manipuladorClick: EventoHandler)
        {
            super(controlePai, idElemento, template, itemReferencia, manipuladorClick);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.AdicionarEventoDom(EnumEventoDom.MouseDown, this.Elemento_MouseDown.bind(this));
            this.AdicionarEventoDom(EnumEventoDom.MouseUp, this.Window_MouseUp.bind(this), window);
            this.AdicionarEventoDom(EnumEventoDom.MouseMove, this.Window_MouseMove.bind(this), window);
        }
        //#region Ordenacao

        private Mover: boolean = false;
        private ElementoClone: HTMLElement;
        private DiferencaX: number = 0;
        private DiferencaY: number = 0;

        private PageXInicial: number;
        private PageYInicial: number;
        private Elemento_MouseDown(e: MouseEvent)
        {
            this.Mover = true;

            this.PageXInicial = e.pageX;
            this.PageYInicial = e.pageY;
            document.documentElement.style.cursor = "grab";
        }

        private Window_MouseMove(e: MouseEvent)
        {
            if (this.Mover)
            {
                if (this.ElementoClone instanceof HTMLElement)
                {
                    this.ElementoClone.style.left = (e.pageX - this.DiferencaX).toString() + "px";
                    this.ElementoClone.style.top = (e.pageY - this.DiferencaY).toString() + "px";
                    document.documentElement.style.cursor = "grabbing";
                }
                else
                {
                   
                    const diferencaX = Math.abs(this.PageXInicial - e.pageX);
                    const diferencaY = Math.abs(this.PageYInicial - e.pageY);
                    const diferenca = Math.max(diferencaX, diferencaY);
                    if (diferenca > 5)
                    {
                        this.LinhasColecao.LinhaMovendo = this;
                        this.LinhasColecao.IsMovendoLinha = true;
                        this.AdicionarElementoClone(e);
                        this.Elemento.style.opacity = "0";
                    }
                }
            }
            else
            {
                const elemento = this.Elemento;
                if (elemento instanceof HTMLElement)
                {
                    if (this.LinhasColecao.IsMovendoLinha && this.LinhasColecao.LinhaMovendo != null)
                    {
                        const elementoLinhaMovento = this.LinhasColecao.LinhaMovendo.Elemento;

                        if (this.IsPosicaoMouseEmCimaDoElemento(new d.Posicao(e.pageX, e.pageY)))
                        {
                            this.LinhasColecao.LinhaReferenciaDestino = this;

                            const posicoes = elemento.getBoundingClientRect();
                            elementoLinhaMovento.remove();
                            if (e.pageY > (posicoes.top + (posicoes.height / 2)))
                            {
                                this.LinhasColecao.Elemento.insertBefore(elementoLinhaMovento, elemento);
                            }
                            else
                            {
                                this.LinhasColecao.Elemento.insertBefore(elementoLinhaMovento, elemento.nextElementSibling);
                            }
                        }
                    }
                    else
                    {
                        elemento.style.borderLeft = "";
                        elemento.style.borderRight = "";
                        elemento.style.borderTop = "";
                        elemento.style.borderBottom = "";
                    }
                }
            }
        }

        private AdicionarElementoClone(e: MouseEvent)
        {
            if (!(this.ElementoClone instanceof HTMLElement))
            {
                const elemento = this.Elemento;
                const posicoes = elemento.getBoundingClientRect();
                this.DiferencaX = e.pageX - posicoes.left;
                this.DiferencaY = e.pageY - posicoes.top;
                this.ElementoClone = document.createElement("div");
                EstiloUtil.AdicionarCssClasse(this.ElementoClone, "sn-documento-principal");

                this.ElementoClone.style.position = "absolute";
                this.ElementoClone.style.width = posicoes.width.ToPixels();
                this.ElementoClone.style.height = posicoes.height.ToPixels();
                this.ElementoClone.style.backgroundColor = this.RetornarBackgroundColor();
                this.ElementoClone.style.border = "1px solid #ccc";
                this.ElementoClone.style.opacity = "0.9";
                this.ElementoClone.style.left = (e.pageX - this.DiferencaX).ToPixels();
                this.ElementoClone.style.top = (e.pageY - this.DiferencaY).ToPixels();
                this.ElementoClone.style.zIndex = (1000000).toString();

                const larguras = new Array<number>();
                let len = this.Elemento.childNodes.length;
                for (let i = 0; i < len; i++)
                {
                    const filho = this.Elemento.childNodes[i];
                    if (filho instanceof HTMLElement)
                    {
                        larguras.Add(filho.clientWidth);
                    }
                }

                const elementoTable = document.createElement("table");
                EstiloUtil.AdicionarCssClasse(elementoTable, "sn-destino-data-lista");

                elementoTable.style.width = "100%";
                elementoTable.innerHTML = elemento.outerHTML;
                this.ElementoClone.appendChild(elementoTable);

                const tr = elementoTable.firstElementChild.firstElementChild;
                len = tr.childNodes.length;
                for (let i = 0; i < len; i++)
                {
                    const filho = tr.childNodes[i];
                    if (filho instanceof HTMLElement)
                    {
                        const l = larguras.shift();
                        if (l > 0)
                        {
                            filho.style.width = l.ToPixels();
                        }
                    }
                }

                document.body.appendChild(this.ElementoClone);
            }
        }

        private Window_MouseUp(e: MouseEvent)
        {
            this.Mover = false;
            this.RemoverElementoClone();
            this.LinhasColecao.IsMovendoLinha = false;
            this.Elemento.style.opacity = "1";

            document.documentElement.style.cursor = "";

            /*eslint-disable*/
            if (this.LinhasColecao.LinhaReferenciaDestino == this && this.LinhasColecao.LinhaMovendo instanceof LinhaOrdenacao)
            {
                if (this.LinhasColecao.LinhaReferenciaDestino == this.LinhasColecao.LinhaMovendo)
                {
                    //não faz nada
                    this.LinhasColecao.LinhaReferenciaDestino = null;
                    this.LinhasColecao.LinhaMovendo = null;
                }
                else
                {
                    //if (this.IsMouseEmCimaDoElemento(new d.Posicao(e.pageX, e.pageY)))
                    if (this.LinhasColecao.LinhaMovendo.IsPosicaoMouseEmCimaDoElemento(new d.Posicao(e.pageX, e.pageY)))
                    {
                        let destinoLinha = this.RetornarDestinoItemControle(e);
                        let elementoPai = this.LinhasColecao.Elemento;
                        switch (destinoLinha)
                        {
                            case EnumDestinoControleOrdenado.Antes:

                                if (this.AtualizarOrdenacaoAntes())
                                {
                                    let elementoMovendo = this.LinhasColecao.LinhaMovendo.Elemento;
                                    elementoPai.removeChild(elementoMovendo);
                                    elementoPai.insertBefore(elementoMovendo, this.LinhasColecao.LinhaReferenciaDestino.Elemento);
                                    this.OrdenarItensControle();
                                }
                                break;
                            case EnumDestinoControleOrdenado.Depois:

                                if (this.AtualizarOrdenacaoDepois())
                                {
                                    let elementoMovendo = this.LinhasColecao.LinhaMovendo.Elemento;
                                    elementoPai.removeChild(elementoMovendo);
                                    elementoPai.insertBefore(elementoMovendo, this.LinhasColecao.LinhaReferenciaDestino.Elemento.nextSibling);
                                    this.OrdenarItensControle();
                                }
                                break;

                            default:
                                throw new Erro("Destino do item controle não suportado", this);
                        }
                    }
                    else
                    {
                        this.LinhasColecao.LinhaReferenciaDestino = null;
                        this.LinhasColecao.LinhaMovendo = null;
                    }
                }
            }
        }

        private OrdenarItensControle(): void
        {
            let clone = this.LinhasColecao.Linhas.ToList(true);
            this.LinhasColecao.Linhas.Clear();
            this.LinhasColecao.Linhas.AddRange(clone.OrderBy(x => (x as LinhaOrdenacao<TItem>).EntidadeOrdenacao.Ordenacao));
        }

        private RetornarDestinoItemControle(e: MouseEvent): EnumDestinoControleOrdenado
        {
            let posicoes = this.Elemento.getBoundingClientRect();
            if (this.IsSensibilidadeVertical)
            {
                if (e.pageY > (posicoes.top + (posicoes.height / 2)))
                {
                    return EnumDestinoControleOrdenado.Depois;
                }
                else
                {
                    return EnumDestinoControleOrdenado.Antes;
                }
            }
            else
            {
                if (e.pageX > (posicoes.left + (posicoes.width / 2)))
                {
                    return EnumDestinoControleOrdenado.Depois;
                }
                else
                {
                    return EnumDestinoControleOrdenado.Antes;
                }
            }
        }

        private AtualizarOrdenacaoAntes(): boolean
        {
            let linhaMovendo = this.LinhasColecao.LinhaMovendo;
            let linhaAnteriorReferencia = this.LinhasColecao.LinhaReferenciaDestino;
            let posicaoItemLinhaAnteriorReferencia = this.LinhasColecao.Linhas.indexOf(linhaAnteriorReferencia);

            let entidadeAlterarOrdenacao = this.LinhasColecao.LinhaMovendo.EntidadeOrdenacao;
            let entidadeReferencia = this.LinhasColecao.LinhaReferenciaDestino.EntidadeOrdenacao;

            if (entidadeReferencia.Id == entidadeAlterarOrdenacao.Id)
            {
                return false;
            }
            let entidadesSalvar = new Array<d.IEntidade>();
            if (posicaoItemLinhaAnteriorReferencia == 0)
            {
                entidadeAlterarOrdenacao.Ordenacao = entidadeReferencia.Ordenacao - (1 / 1000);
            }
            else
            {
                let linhaAnterior = this.LinhasColecao.Linhas[posicaoItemLinhaAnteriorReferencia - 1] as LinhaOrdenacao<TItem>;
                let entidadeAnterior = linhaAnterior.EntidadeOrdenacao;
                if (entidadeAnterior.Id == entidadeAlterarOrdenacao.Id)
                {
                    return false;
                }
                let tempOrdenacaItem = entidadeAlterarOrdenacao.Ordenacao;
                let tempOrdenacaReferencia = entidadeReferencia.Ordenacao;
                let tempOrdenacaoAtenrior = entidadeAnterior.Ordenacao;

                if (tempOrdenacaReferencia < tempOrdenacaoAtenrior)
                {
                    return false;
                }
                if (entidadeReferencia.Ordenacao === entidadeAnterior.Ordenacao)
                {
                    entidadeAnterior.Ordenacao -= 1 / 1000;
                    entidadesSalvar.Add(entidadeAnterior);
                }
                entidadeAlterarOrdenacao.Ordenacao = entidadeAnterior.Ordenacao + ((entidadeReferencia.Ordenacao - entidadeAnterior.Ordenacao) / 2.05);

                if (!(entidadeAlterarOrdenacao.Ordenacao > entidadeAnterior.Ordenacao &&
                    entidadeAlterarOrdenacao.Ordenacao < entidadeReferencia.Ordenacao))
                {
                    if (entidadeAlterarOrdenacao.Ordenacao !== entidadeReferencia.Ordenacao)
                    {
                        throw new Erro("A controle deve ficar meio entre o anterior e referencia");
                    }
                }
            }
            entidadesSalvar.Add(entidadeAlterarOrdenacao);
            let contexto = $Aplicacao.RetornarContextoDados(entidadeAlterarOrdenacao.GetType() as r.TipoEntidade);
            //contexto.SalvarAsync(entidadeAlterarOrdenacao, null);
            contexto.SalvarAsync(entidadesSalvar);


            return true;
        }

        private AtualizarOrdenacaoDepois(): boolean
        {
            let lihaMovendo = this.LinhasColecao.LinhaMovendo;
            let linhaReferencia = this.LinhasColecao.LinhaReferenciaDestino;
            let posicaoLinhaReferencia = this.LinhasColecao.Linhas.indexOf(linhaReferencia);

            let entidadeAlterarOrdenacao = this.LinhasColecao.LinhaMovendo.EntidadeOrdenacao;
            let entidadeReferencia = this.LinhasColecao.LinhaReferenciaDestino.EntidadeOrdenacao;

            if (entidadeAlterarOrdenacao.Id == entidadeReferencia.Id)
            {
                return false;
            }
            let entidadesSalvar = new Array<d.IEntidade>();

            if (posicaoLinhaReferencia == (this.LinhasColecao.Linhas.Count - 1))
            {
                entidadeAlterarOrdenacao.Ordenacao = entidadeReferencia.Ordenacao + (1 / 1000);
            }
            else
            {
                let linhaDepois = this.LinhasColecao.Linhas[posicaoLinhaReferencia + 1] as LinhaOrdenacao<TItem>;
                let entidadeDepois = linhaDepois.EntidadeOrdenacao;
                if (entidadeDepois.Id == entidadeAlterarOrdenacao.Id)
                {
                    return false;
                }
                let tempOrdenacaItem = entidadeAlterarOrdenacao.Ordenacao;
                let tempOrdenacaReferencia = entidadeReferencia.Ordenacao;
                let tempOrdenacaoDepois = entidadeDepois.Ordenacao;

                if (tempOrdenacaReferencia > tempOrdenacaoDepois)
                {
                    return false;
                }
                if (entidadeReferencia.Ordenacao === entidadeDepois.Ordenacao)
                {
                    entidadeDepois.Ordenacao += 1 / 1000;
                    entidadesSalvar.Add(entidadeDepois)
                }
                entidadeAlterarOrdenacao.Ordenacao = entidadeReferencia.Ordenacao + ((entidadeDepois.Ordenacao - entidadeReferencia.Ordenacao) / 2.01);

                if (!(entidadeAlterarOrdenacao.Ordenacao > entidadeReferencia.Ordenacao &&
                    entidadeAlterarOrdenacao.Ordenacao < entidadeDepois.Ordenacao))
                {
                    if (entidadeAlterarOrdenacao.Ordenacao !== entidadeReferencia.Ordenacao)
                    {
                        throw new Erro("A controle deve ficar meio entre a referencia e depois");
                    }
                }
            }
            entidadesSalvar.Add(entidadeAlterarOrdenacao);
            let contexto = $Aplicacao.RetornarContextoDados(entidadeAlterarOrdenacao.GetType() as r.TipoEntidade);
            //contexto.SalvarAsync(entidadeAlterarOrdenacao, null);
            contexto.SalvarAsync(entidadesSalvar);
            return true;
        }

        private RemoverElementoClone()
        {
            if (this.ElementoClone instanceof HTMLElement)
            {
                document.body.removeChild(this.ElementoClone);
                this.ElementoClone = null;
            }
        }

        private RetornarBackgroundColor(): string
        {
            let elementoAtual = this.Elemento;
            while (elementoAtual != null)
            {
                let backgroundColor = window.getComputedStyle(elementoAtual).getPropertyValue("background-color");
                if (!String.IsNullOrWhiteSpace(backgroundColor) && backgroundColor != "transparent")
                {
                    return backgroundColor;
                }
                elementoAtual = elementoAtual.parentElement;
            }

            let backgroundColor = window.getComputedStyle(document.body).getPropertyValue("background-color");
            if (!String.IsNullOrWhiteSpace(backgroundColor) && backgroundColor != "transparent")
            {
                return backgroundColor;
            }
            return null;
        }

        private _entidadeOrdenacao: d.IOrdenacaoEntidade = null;
        public get EntidadeOrdenacao(): d.IOrdenacaoEntidade
        {
            if (this._entidadeOrdenacao == null)
            {
                let entidadeOrdenacao = this.RetornarEntidadeOrdenacaoInterno();

                if (!(entidadeOrdenacao instanceof d.Entidade))
                {
                    throw new Erro("A entidade de ordenação não é valida", this);
                }

                if (!u.ValidacaoUtil.IsNumber(((entidadeOrdenacao as any) as d.IOrdenacao).Ordenacao))
                {
                    let nomePropriedade = u.ReflexaoUtil.RetornarCaminhoPropriedade<d.IOrdenacao>(x => x.Ordenacao);
                    throw new Erro(`Não foi encontrado a propriedade ${nomePropriedade} em ${entidadeOrdenacao.__IdentificadorEntidade}`, this);
                }
                this._entidadeOrdenacao = entidadeOrdenacao as any;
            }
            return this._entidadeOrdenacao;
        }

        private RetornarEntidadeOrdenacaoInterno(): d.IEntidade
        {
            if (!String.IsNullOrWhiteSpace(this.DataListaOrdenacao.CaminhoEntidadeOrdenacao))
            {
                return u.ReflexaoUtil.RetornarValorPropriedade(this.ItemReferencia, this.DataListaOrdenacao.CaminhoEntidadeOrdenacao);
            }
            return this.ItemReferencia;
        }
        //#endregion
    }
}