namespace Snebur.UI
{
    export class CaixaSelecao extends ControleFlutuante //implements IControleLista
    {
        private _alturaItem: number;
        private _larguraInicial: number = null;

        //#region Propriedades 

        protected override get AlturaInicial(): number
        {
            let altura = this.PainelLista.ItensBloco.Count * this._alturaItem;
            if (altura > 400)
            {
                altura = 400;
            }
            return altura;
        }

        public override get LarguraInicial(): number
        {
            return this._larguraInicial;
        }

        public override set LarguraInicial(value: number)
        {
            value = value > 0 ? value : null;
            this._larguraInicial = value;
            this.OpcoesControleFlutuante.IsAjustarLarguraElementoRelativo = value == null;
        }

        public override get DiferencaPosicaoY(): number
        {
            //if (this.ComboBox instanceof ComboBox ||
            //    this.ComboBox instanceof ComboBoxNn)
            //{
            //    const distancia = this.ComboBox.BlocoMensagemValidacao.Elemento.getBoundingClientRect().height;
            //    if (distancia > 0)
            //    {
            //        return Math.abs(distancia);
            //    }
            //}
            return 1;
        }

        public get ElementoItemSelecionado(): HTMLElement
        {
            const combobox = this.ComboBox;
            if (combobox instanceof ComboBox ||
                combobox instanceof ComboBoxEnum)
            {
                return combobox.ControleItemSelecionado.Elemento;
            }

            if (combobox instanceof ComboBoxNn)
            {
                return combobox.ControleItensSelecionado.Elemento;
            }

            throw new Erro(`Combobox não suportado ${combobox.___NomeConstrutor} `);
        }

        public get ComboBox(): BaseComboBox
        {
            return this.ControlePai as BaseComboBox;
        }

        public override get ElementoRelativo(): HTMLElement
        {
            if (this.ComboBox.TipoCaixa === EnumTipoCaixa.Delineada)
            {
                return this.ComboBox.ElementoCaixa;
            }

            if (this.ComboBox instanceof ComboBox && this.ComboBox.ItemSelecionado != null)
            {
                if (this.ComboBox.ControleItemSelecionado?.Elemento?.parentElement instanceof HTMLElement)
                {
                    return this.ComboBox.ControleItemSelecionado.Elemento;
                }
            }

            return this.RetornarElementoRelativo();
        }

        //#endregion

        public constructor(controlePai: BaseComboBox, idElemento: string)
        {
            super(controlePai, idElemento);
            this.DestinoControleFlutuante = EnumDestinoControleFlutuante.Inferior;
            this.OpcoesControleFlutuante.IsAjustarLarguraElementoRelativo = true;
            this.IsAdicionarElementoConteudoApresentacao = false;
            this.OpcoesControleFlutuante.IsAtualizarPosicaoAutomaticamenteGlobalScroll = true;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this._alturaItem = this.ComboBox.AlturaItem;
        }

        protected override RetornarElementoRelativo(): HTMLElement
        {
            if (this.ControlePai instanceof ComboBox)
            {
                if (this.ControlePai.ElemenotLinhaHorizontal.IsVisivel)
                {
                    return this.ControlePai.ElemenotLinhaHorizontal;
                }
            }
            return this.ComboBox.ElementoCaixa;
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "sn-combobox-selecao";
        }

        protected override OcuparElemento(): void
        {
            super.OcuparElemento();
        }

        protected override DesocuparElemento(): void
        {
            super.DesocuparElemento();
        }

        public override async Mostrar(itemSelecionao: any)
        {
            super.Mostrar();

            await ThreadUtil.QuebrarAsync();
            if (itemSelecionao != null)
            {
                const itemBloco = this.PainelLista.ItensBloco.Where(x => x.ItemReferencia === itemSelecionao).SingleOrDefault();
                if (itemBloco != null)
                {
                    ElementoUtil.ScrollTo(itemBloco.Elemento);
                }
            }
        }

        public override Fechar(sucesso: boolean = false): void
        {
            super.Fechar(sucesso);
        }

        public SelecionarItem(item: any): void
        {
            let isJaSelecionado = false;
            for (const itemBloco of this.PainelLista.ItensBloco)
            {
                const isSelecionado = !isJaSelecionado &&
                    u.ValidacaoUtil.IsDefinido(item) &&
                    Util.IsIgual(itemBloco.ItemReferencia, item);

                if (isSelecionado)
                {
                    isJaSelecionado = true;
                    ElementoUtil.ScrollTo(itemBloco.Elemento);
                }

                CssClassUtil.AtualizarCssClass(itemBloco.Elemento,
                    "sn-item-selecionado",
                    isSelecionado);

            }
        }

        //#region Posicao

        //protected override NormalizarLarguraPosicaoX(largura: number, posicaoX: number): [number, number]
        //{
        //    return [largura, posicaoX];
        //}

        protected override NormalizarAlturaPosicaoY(altura: number, posicaoY: number): [number, number]
        {
            const alturaRecipiente = window.innerHeight;
            if ((posicaoY + altura) > alturaRecipiente)
            {
                const alturaElemento = this.ElementoItemSelecionado.getBoundingClientRect().height;
                const espacoSuperior = posicaoY - alturaElemento;
                const espacoInferior = alturaRecipiente - (posicaoY + alturaElemento);
                if (espacoSuperior > espacoInferior)
                {
                    if (altura > espacoSuperior)
                    {
                        altura = espacoSuperior;
                    }
                    const novaPosicaoY = posicaoY - altura - (alturaElemento * .95);
                    return [altura, novaPosicaoY];
                }
                else
                {
                    if (altura > espacoInferior)
                    {
                        altura = espacoInferior;
                    }
                    return [altura, posicaoY];
                }
            }
            return [altura, posicaoY];
        }

        //#endregion
    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface CaixaSelecao
    {
        readonly PainelLista: ui.PainelLista;
    }

    //#endregion

}