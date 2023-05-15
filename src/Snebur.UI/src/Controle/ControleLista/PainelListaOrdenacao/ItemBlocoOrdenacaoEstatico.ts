namespace Snebur.UI
{
    export class ItemBlocoOrdenacaoEstatico extends ItemBlocoOrdenacao
    {
        private _isRolandoScroll = false;
        private Rolagem: ui.Rolagem;

        private get OrientacaoScroll(): EnumOrientacao
        {
            return this.PainelLista.OrientacaoScroll;
        }

        private get ElementoScroll(): HTMLElement
        {
            return this.Rolagem?.ElementoScroll ?? null;
        }

        protected override IniciarOrdenacao(posicaoX: number, posicaoY: number, eventoNativo: TouchEvent | MouseEvent)
        {
            this.Rolagem?.Dispose();
            const elementoScroll = this.PainelLista.ElementoScroll;
            if (elementoScroll != null)
            {
                this.Rolagem = new Rolagem(elementoScroll);
            }
            super.IniciarOrdenacao(posicaoX, posicaoY, eventoNativo);
        }

        protected override RetornarRegiaoBloco(
            itemBloco: ItemBlocoOrdenacao,
            regiaoPainel: DOMRect,
            indice: number)
        {
            return new RegiaoBlocoOrdenacaoEstatico(itemBloco, indice);
        }

        protected override SimularOrdenacao(
            blocosCapturados: List<RegiaoBlocoPorcentagem>,
            regiaoElementoClone: DOMRect,
            infoMovimentacao: InfoMovimentacaoItemBloco)
        {
            this.RegiaoBlocoAtual.OrdenacaoDestino = this.RetornarNovaOrdenacao(blocosCapturados);

            this.AtualizarScroll(regiaoElementoClone, infoMovimentacao);

            const melhorBlocoCapturado = blocosCapturados.OrderByDescending(x => x.Porcentagem).First();
            const elementoDestino = this.Elemento.parentElement;

            if (elementoDestino !== this.PainelLista.ElementoApresentacao)
            {
                console.error("elemento destino inválido");
            }

            const elementoReferencia = this.RetornarElementoReferencia(melhorBlocoCapturado, regiaoElementoClone);
            if (elementoReferencia != null)
            {
                elementoDestino.insertBefore(
                    this.Elemento,
                    elementoReferencia);
            }
            else
            {
                elementoDestino.appendChild(this.Elemento);
            }
        }

        private RetornarElementoReferencia(regiaoBlocoCapturado: RegiaoBlocoPorcentagem, regiaoElementoClone: DOMRect): HTMLElement
        {
            const elementoCapturado = regiaoBlocoCapturado.RegiaoBlocoOrdenacao.ItemBlocoOrdenacao.Elemento;
            if (this.Elemento === elementoCapturado)
            {
                return this.NextElementSibling;
            }

            /*const isIserirAntes = regiaoBlocoCapturado.Porcentagem <= 50;*/
            const isIserirAntes = this.IsIserirAntes(regiaoBlocoCapturado.RegiaoBlocoOrdenacao.RegiaoOrigem, regiaoElementoClone);
            this.RegiaoBlocoAtual.OrdenacaoDestino <= this.ObjetoOrdenacao.Ordenacao;
            return isIserirAntes ? elementoCapturado : elementoCapturado.nextElementSibling as HTMLElement;
        }

        private IsIserirAntes(regiaoBlocoCapturado: DOMRect, regiaoElementoClone: DOMRect): boolean
        {
            const orientacaoPainel = this.PainelLista.OrientacaoPainel;
            if (orientacaoPainel === EnumOrientacao.Vertical)
            {
                return this.IsIserirAntesScrollVertical(regiaoBlocoCapturado, regiaoElementoClone);
            }

            if (orientacaoPainel === EnumOrientacao.Horizontal)
            {
                return this.IsIserirAntesScrollHorizontal(regiaoBlocoCapturado, regiaoElementoClone);
            }

            return this.IsIserirAntesScrollVertical(regiaoBlocoCapturado, regiaoElementoClone) ||
                this.IsIserirAntesScrollHorizontal(regiaoBlocoCapturado, regiaoElementoClone);
        }

        private IsIserirAntesScrollVertical(regiaoBlocoCapturado: DOMRect, regiaoElementoClone: DOMRect): boolean
        {
            const yCentroCaputurado = regiaoBlocoCapturado.y + (regiaoBlocoCapturado.height / 2);
            const yCentroClone = regiaoElementoClone.y + (regiaoElementoClone.height / 2);
            return yCentroClone < yCentroCaputurado;
        }

        private IsIserirAntesScrollHorizontal(regiaoBlocoCapturado: DOMRect, regiaoElementoClone: DOMRect): boolean
        {
            const xCentroCaputurado = regiaoBlocoCapturado.x + (regiaoBlocoCapturado.width / 2);
            const xCentroClone = regiaoElementoClone.x + (regiaoElementoClone.width / 2);
            return xCentroClone < xCentroCaputurado;
        }

        //#region Scroll

        public async AtualizarScroll(
            regiaoElementoClone: DOMRect,
            infoMovimentacao:InfoMovimentacaoItemBloco): Promise<void>
        {
            if (this.Rolagem == null)
            {
                return;
            }
            let isRolouScroll = false;
            if (this._isRolandoScroll)
            {
                return;
            }

            try
            {
                this._isRolandoScroll = true;
               isRolouScroll = await this.AtualizarScrollInternoAsync(regiaoElementoClone);
            }
            catch (erro)
            {
                console.error(erro);
                return;
            }
            finally
            {
                this._isRolandoScroll = false;
                if (isRolouScroll)
                {
                    this.AnalisarMousePadrado(infoMovimentacao);
                }
            }
        }

        private async AtualizarScrollInternoAsync(regiaoElementoClone: DOMRect): Promise<boolean>
        {
            const elementoScroll = this.ElementoScroll;
            if (elementoScroll == null)
            {
                return false;
            }

            if (this.OrientacaoScroll === EnumOrientacao.Horizontal)
            {
               return  await this.AtualizarScrollHorizontalAsync(regiaoElementoClone);
            }
            return await this.AtualizarScrollVerticalAsync(regiaoElementoClone);
        }
         
        private async AtualizarScrollVerticalAsync(regiaoElementoClone: DOMRect): Promise<boolean>
        {
            const elementoScroll = this.ElementoScroll;
            const regiaoScroll = elementoScroll.getBoundingClientRect();

            //console.LogDebug(`Scroll : 
            //                  Rect Top + height: ${regiaoScroll.top + regiaoScroll.height}
            //                  Rect Top: ${regiaoScroll.top} - Height: ${regiaoScroll.height} 
            //                  clientHeight: ${elementoScroll.clientHeight}
            //                  scrollHeight: ${elementoScroll.scrollHeight}
            //                  ScrollTop: ${elementoScroll.scrollTop} `);

            const yInferior = regiaoScroll.top + regiaoScroll.height;
            const yMouse = regiaoElementoClone.top + regiaoElementoClone.height;

            const isRolarParaBaixo = yMouse > yInferior;
            if (isRolarParaBaixo)
            {
                if (elementoScroll.scrollTop < (elementoScroll.scrollHeight - regiaoScroll.height))
                {
                    await this.Rolagem.RolarParaBaixoAsync(regiaoElementoClone.height);
                    return true;
                }
            }

            const isRolarParaCima = regiaoElementoClone.top < regiaoScroll.top;
            if (isRolarParaCima)
            {
                if (elementoScroll.scrollTop > 0)
                {
                    await this.Rolagem.RolarParaCimaAsync(regiaoElementoClone.height);
                    return true;
                }
            }
            return false;
        }

        private async AtualizarScrollHorizontalAsync(regiaoElementoClone: DOMRect): Promise<boolean>
        {
            const elementoScroll = this.ElementoScroll;
            const regiaoScroll = elementoScroll.getBoundingClientRect();

            console.LogDebug(`Scroll : 
                              Rect Left + width: ${regiaoScroll.left + regiaoScroll.width}
                              Rect Left: ${regiaoScroll.left} - Height: ${regiaoScroll.width} 
                              clientWidth: ${elementoScroll.clientWidth}
                              scrollWidth: ${elementoScroll.scrollWidth}
                              scrollLeft: ${elementoScroll.scrollLeft} `);

            /*elementoScroll.style.border = "2px solid red";*/

            const xDireita = regiaoScroll.left + regiaoScroll.width;
            const xMouse = regiaoElementoClone.left + regiaoElementoClone.width;

            /*console.warn(`xDireita: ${xDireita} -- xMouse: ${xMouse}`);*/

            const isRolarParaDireita = xMouse > xDireita;
            if (isRolarParaDireita)
            {
                if (elementoScroll.scrollLeft < (elementoScroll.scrollWidth - regiaoScroll.width))
                {
                    await this.Rolagem.RolarParaDireitaAsync(regiaoElementoClone.width);
                    return true;
                }
            }

            const isRolarParaEsquerda = regiaoElementoClone.left < regiaoScroll.left;
            if (isRolarParaEsquerda)
            {
                if (elementoScroll.scrollLeft > 0)
                {
                    await this.Rolagem.RolarParaEsquerdaAsync(regiaoElementoClone.width );
                    return true;
                }
            }
            return false;
        }

        //#endregion
    }
}
