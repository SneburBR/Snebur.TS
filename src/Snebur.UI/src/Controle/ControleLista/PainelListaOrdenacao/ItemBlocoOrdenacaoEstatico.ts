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
            this.Rolagem = new Rolagem(this.PainelLista.ElementoScroll);
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
            this.AtualizarScroll(regiaoElementoClone, infoMovimentacao);

            const melhorBlocoCapturado = blocosCapturados.OrderByDescending(x => x.Porcentagem).First();
            const isIserirAntes = melhorBlocoCapturado.Porcentagem <= 50;
            console.warn(`Atual: ${this.ObjetoOrdenacao.Ordenacao} -- Destino : ${this.RegiaoBlocoAtual.OrdenacaoDestino}, Antes ${isIserirAntes}`);

            const elementoDestino = this.Elemento.parentElement;

            if (elementoDestino !== this.PainelLista.ElementoApresentacao)
            {
                console.error("elemento destino inválido");
            }

            /*const elementoCapturado = .ItemBlocoOrdenacao.Elemento;*/
            const elementoReferencia = this.RetornarElementoReferencia(melhorBlocoCapturado, regiaoElementoClone);
            if (elementoReferencia != null)
            {
                const label = elementoReferencia.querySelector(".foto-album-lamina-encadernacao-descricao-formatada");
                console.warn(`Label ${label?.textContent ?? "null"}`);
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
            throw new Error("Method not implemented.");
        }

        //#region Scroll

        public async AtualizarScroll(
            regiaoElementoClone: DOMRect,
            infoMovimentacao:InfoMovimentacaoItemBloco): Promise<void>
        {
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

        private async AtualizarScrollHorizontalAsync(regiaoElementoClone: DOMRect): Promise<boolean>
        {
            console.error("AtualizarScrollHorizontal Method not implemented.");
            return false;
        }

        private async AtualizarScrollVerticalAsync(regiaoElementoClone: DOMRect): Promise<boolean>
        {
            const elementoScroll = this.ElementoScroll;
            const regiaoScroll = elementoScroll.getBoundingClientRect();

            console.log(`Scroll : 
                         Rect Top + height: ${regiaoScroll.top + regiaoScroll.height}
                         Rect Top: ${regiaoScroll.top} - Height: ${regiaoScroll.height} 
                         clientHeight: ${elementoScroll.clientHeight}
                         scrollHeight: ${elementoScroll.scrollHeight}
                         ScrollTop: ${elementoScroll.scrollTop} `);

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

        //#endregion
    }
}
