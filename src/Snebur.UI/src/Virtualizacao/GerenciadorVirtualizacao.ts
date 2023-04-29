namespace Snebur.UI
{
    export class GerenciadorVirtualizacao 
    {
        private readonly ControlePai: BaseControle;
        private readonly ControleLista: ControleLista;
        private readonly ElementoScroll: HTMLElement;
        private readonly ExecutarDepoisScroll = new ExecutarDepois(this.AtualizarVirtualizacao.bind(this), 150);
        private readonly ExecutarDepoisItensListaAlterada = new ExecutarDepois(this.AtualizarVirtualizacao.bind(this), 250);
        private AlturaElemento: number = 0;

        private ControlesItensNaTela = new HashSet<ItemControle>();
        public ContadorItensNaTela: number = 0;

        public constructor(controleApresentacao: BaseControle,
            conroleLista: ControleLista,
            elementoScroll: HTMLElement)
        {
            this.ControlePai = controleApresentacao;
            this.ControleLista = conroleLista;
            this.ElementoScroll = elementoScroll;

            const valorOverflowY = window.getComputedStyle(elementoScroll).getPropertyValue("overflowY");
            if (valorOverflowY !== "auto")
            {
                //throw new Erro("somente virtualização vertical é suportada");
            }

            this.ControlePai.AdicionarEventoDom(ui.EnumEventoDom.Scroll, this.ElementoVirtualizacao_Scroll, elementoScroll, this);

            this.ControleLista.EventoAntesAlterarLista.AddHandler(this.ControleLista_RemoverMonipuladores, this);
            this.ControleLista.EventoListaAlterada.AddHandler(this.ControleLista_AdicionarManipuladores, this);
            this.ControleLista_AdicionarManipuladores();
            if (this.ControleLista.Lista instanceof Array && this.ControleLista.Lista.length)
            {
                this.AtualizarVirtualizacao();
            }
        }

        private ControleLista_RemoverMonipuladores(): void
        {
            if (this.ControleLista.Lista instanceof Array && ListaUtil.IsListaObservacao( this.ControleLista.Lista))
            {
                this.ControleLista.Lista.EventoItemAdicionado.RemoveHandler(this.ControleLista_ItensListaAlterada, this);
                this.ControleLista.Lista.EventoItemInserido.RemoveHandler(this.ControleLista_ItensListaAlterada, this);
                this.ControleLista.Lista.EventoItemRemovido.RemoveHandler(this.ControleLista_ItensListaAlterada, this);
            }
        }

        private ControleLista_AdicionarManipuladores(): void
        {
            if (this.ControleLista.Lista instanceof Array && ListaUtil.IsListaObservacao(this.ControleLista.Lista))
            {
                this.ControleLista.Lista.EventoItemAdicionado.AddHandler(this.ControleLista_ItensListaAlterada, this);
                this.ControleLista.Lista.EventoItemInserido.AddHandler(this.ControleLista_ItensListaAlterada, this);
                this.ControleLista.Lista.EventoItemRemovido.AddHandler(this.ControleLista_ItensListaAlterada, this);

                if (this.ControleLista.Lista.Count > 0)
                {
                    this.AtualizarVirtualizacao();
                }
            }
        }

        private ElementoVirtualizacao_Scroll(e: UIEvent)
        {
            this.ExecutarDepoisScroll.Executar();
        }

        private ControleLista_ItensListaAlterada(): void
        {
            const diferencaScrool = (this.ElementoScroll.scrollHeight - this.ElementoScroll.scrollTop) - (2 * this.AlturaElemento + 50);
            if (diferencaScrool <= this.ElementoScroll.clientHeight) 
            {
                this.ExecutarDepoisItensListaAlterada.Executar();
            }
        }

        public ForcarAtualizacaoVirtualizacao()
        {
            const itensControleNaTela = this.ControlesItensNaTela.ToList();
            for (const itemControle of itensControleNaTela)
            {
                for (const controleFilho of itemControle.ControlesFilho.Cast<IControleVirtualizacao>())
                {
                    if (ValidacaoUtil.IsFunction(controleFilho.OcultarVirtualizacao))
                    {
                        controleFilho.OcultarVirtualizacao();
                    }
                }
            }
            this.ControlesItensNaTela.Clear();
            this.AtualizarVirtualizacaoInterno();
        }

        public AtualizarVirtualizacao()
        {
            this.ForcarAtualizacaoVirtualizacao();
        }

        private AtualizarVirtualizacaoInterno()
        {

            $Aplicacao.GerenciadorAbrirImagemLocal.LimparFilaVirtualizacao();

            if (this.ControleLista.ItensControle.Count > 0)
            {
                this.ContadorItensNaTela = 0;

                const itensControle = this.ControleLista.ItensControle;
                let encontrou = false;

                for (const itemControle of itensControle)
                {
                    const elemento = itemControle.Elemento;
                    if (this.EstaNaTela(itemControle))
                    {
                        encontrou = true;

                        this.AlturaElemento = elemento.clientHeight;
                        this.ContadorItensNaTela += 1;

                        if (!this.ControlesItensNaTela.Contains(itemControle))
                        {
                            this.ControlesItensNaTela.Add(itemControle);

                            for (const controleFilho of itemControle.ControlesFilho.Cast<IControleVirtualizacao>())
                            {
                                if (controleFilho.MostrarVirtualizacao)
                                {
                                    controleFilho.MostrarVirtualizacao();
                                }
                            }
                        }
                    }
                    else
                    {
                        if (this.ControlesItensNaTela.Contains(itemControle))
                        {
                            this.ControlesItensNaTela.Remove(itemControle);

                            for (const controleFilho of itemControle.ControlesFilho.Cast<IControleVirtualizacao>())
                            {
                                if (controleFilho.OcultarVirtualizacao)
                                {
                                    controleFilho.OcultarVirtualizacao();
                                }
                            }
                        }

                        if (encontrou && this.ControlesItensNaTela.Count === 0)
                        {
                            break;
                        }
                    }
                }
            }
        }

        private AtualizarVirtualizacaoBkp()
        {
            $Aplicacao.GerenciadorAbrirImagemLocal.LimparFilaVirtualizacao();

            if (this.ControleLista.ItensControle.Count > 0)
            {
                this.ContadorItensNaTela = 0;
                const itensControle = this.ControleLista.ItensControle;
                let encontrou = false;


                for (const itemControle of itensControle)
                {
                    const elemento = itemControle.Elemento;
                    if (this.EstaNaTela(itemControle))
                    {
                        encontrou = true;

                        this.ContadorItensNaTela += 1;
                        this.AlturaElemento = elemento.clientHeight;
                    }
                    else
                    {
                        if (encontrou)
                        {
                            break;
                        }
                        if (elemento.firstElementChild instanceof HTMLElement)
                        {
                            elemento.firstElementChild.style.display = "none";
                        }
                        elemento.style.visibility = "hidden";
                    }
                }
            }
        }

        private RetonarPrimeiroUltimoIndiceNaTela(): [number, number]
        {

            if (this.EstaNaTela(this.ControleLista.ItensControle.First()))
            {
                const primeiroIndice = 0;
                const ultimoIndice = this.RetornarUltimoIndiceNaTela(primeiroIndice);
                return [primeiroIndice, ultimoIndice];
            }

            if (this.EstaNaTela(this.ControleLista.ItensControle.Last()))
            {
                const ultimoIndice = this.ControleLista.ItensControle.length;
                const primeiroIndice = this.RetornarPrimeiroIndiceNaTela(ultimoIndice);
                return [primeiroIndice, ultimoIndice];
            }


            const tamanhoScroll = this.ElementoScroll.scrollHeight;
            const posicaoScrool = this.ElementoScroll.scrollTop;
            const ratio = posicaoScrool / tamanhoScroll;
            const incremento = Math.floor((this.ElementoScroll.clientHeight / this.ElementoScroll.scrollHeight) * this.ControleLista.ItensControle.length);
            let posicao = Math.floor(this.ControleLista.ItensControle.length * ratio);

            let itemControle = this.ControleLista.ItensControle[posicao];

            let lugarTela = this.RetonarLugarTela(itemControle);
            while (lugarTela === EnumLugarTelaScroll.NaTela)
            {
                posicao -= incremento;
                if (posicao < 0)
                {
                    posicao = 0;
                }
                itemControle = this.ControleLista.ItensControle[posicao];
                lugarTela = this.RetonarLugarTela(itemControle);
            }

            throw new Erro("Não testado");
        }

        private RetornarUltimoIndiceNaTela(inicio: number)
        {
            if (this.EstaNaTela(this.ControleLista.ItensControle.Last()))
            {
                return this.ControleLista.ItensControle.length;
            }
            let posicao = inicio;
            const maximo = this.ControleLista.ItensControle.length;
            while (posicao <= maximo)
            {
                const itemControle = this.ControleLista.ItensControle[posicao];
                if (!this.EstaNaTela(itemControle))
                {
                    return posicao;
                }
                posicao += 1;
            }

            throw new Erro("O ultimo indice não foi encontrado");
        }

        private RetornarPrimeiroIndiceNaTela(fim: number)
        {
            if (this.EstaNaTela(this.ControleLista.ItensControle.First()))
            {
                return 0;
            }
            let posicao = fim;
            const minimo = 0;
            while (posicao >= minimo)
            {
                const itemControle = this.ControleLista.ItensControle[posicao];
                if (!this.EstaNaTela(itemControle))
                {
                    return posicao;
                }
                posicao -= 1;
            }
            throw new Erro("O primeiro índice não foi encontrado");
        }


        private EstaNaTela(itemControle: ItemControle): boolean
        {
            const elemento = itemControle.Elemento;
            const retangulo = elemento.getBoundingClientRect();
            const inferior = retangulo.bottom - retangulo.height;
            const superior = retangulo.top + retangulo.height;
            return superior >= 0 && inferior <= window.innerHeight;
        }

        private RetonarLugarTela(itemControle: ItemControle): EnumLugarTelaScroll
        {
            const elemento = itemControle.Elemento;
            const retangulo = elemento.getBoundingClientRect();
            const inferior = retangulo.bottom - retangulo.height;
            const superior = retangulo.top + retangulo.height;
            if (superior < 0)
            {
                return EnumLugarTelaScroll.PraCima;
            }
            if (inferior > window.innerHeight)
            {
                return EnumLugarTelaScroll.PraBaixo;
            }
            return EnumLugarTelaScroll.NaTela;
        }

        public Dispose(): void
        {

        }

    }

    export interface IControleVirtualizacao  
    {
        StatusVirtualizacao: EnumStatusVirtualizacao;
        MostrarVirtualizacao(): void;
        OcultarVirtualizacao(): void;
    }
    export enum EnumStatusVirtualizacao
    {
        NaTela = 1,
        Ocultado = 2
    }

    export enum EnumLugarTelaScroll
    {
        PraCima = 1,
        PraBaixo = 2,
        NaTela = 3

    }
}