namespace Snebur.UI
{
    export class PainelHorizontal extends BasePainel
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        protected override InicializarComponentesApresentacao(): void
        {
            super.InicializarComponentesApresentacao();
            this.CalcularLarguraDasColunas(true);
        }

        public override AtualizarAparencia(): void
        {
            super.AtualizarAparencia();
            this.CalcularLarguraDasColunas(false);
        }

        private CalcularLarguraDasColunas(isInicializando: boolean)
        {
            const colunas = isInicializando ?
                this.ComponentesApresentacaoFilhos.OfType(BaseColuna).Where(x => x.Visibilidade === EnumVisibilidade.Visivel && x.VisibilidadeApresentacao === EnumVisibilidade.Visivel).ToList() :
                this.ComponentesApresentacaoFilhos.OfType(BaseColuna).Where(x => x.IsVisivel).ToList();

            const unidadesComprimento = colunas.Where(x => x.AlturaApresentacao instanceof UnidadeComprimento).Select(x => x.LarguraApresentacao);
            //let somaPorcentagem = unidadesComprimentos.Where(x => x && x.TipoUnidade == EnumTipoUnidadeComprimento.Porcentagem).Sum(x => x.Valor);
            //let somaPixels = unidadesComprimentos.Where(x => x.TipoUnidade == EnumTipoUnidadeComprimento.Pixel).Sum(x => x.Valor);
            //let quantidadeVazio = unidadesComprimentos.Where(x => x.TipoUnidade == EnumTipoUnidadeComprimento.Vazio).Count;
            //let porcentagem = (100 - somaPorcentagem) / quantidadeVazio;
            //let estilo = `calc(${porcentagem}% - ${(somaPixels / quantidadeVazio).ToRems()})`;

            const quantidadeVazio = unidadesComprimento.Where(x => x.TipoUnidade === EnumTipoUnidade.Vazio || x.TipoUnidade === EnumTipoUnidade.Auto).Count;
            if (quantidadeVazio > 0)
            {
                const estiloCalculado = UnidadeComprimentoUtil.RetornarValorCalculado(100, unidadesComprimento, quantidadeVazio);
                for (const coluna of colunas)
                {
                    if (coluna.LarguraApresentacao.TipoUnidade === EnumTipoUnidade.Vazio ||
                        coluna.LarguraApresentacao.TipoUnidade === EnumTipoUnidade.Auto)
                    {
                        coluna.Elemento.style.width = estiloCalculado;
                    }
                }
            }

            if ($Configuracao.IsDebug)
            {
                if (colunas.Count > 0 && quantidadeVazio === 0)
                {
                    console.warn(`Nenhuma coluna com largura automática está definida no controle ${this.ControleApresentacao.___NomeConstrutor} para largura automática, é precisa remover o atributo sn-altura`);
                }

                const constrolesNaoSuportado = this.ComponentesApresentacaoFilhos.
                    Where(x => !(x instanceof BaseColuna)).
                    ToList();

                if (constrolesNaoSuportado.Count > 0)
                {
                    const descricao = String.Join(", ", constrolesNaoSuportado.Select(x => x.GetType().Nome));
                    console.error(`Os componentes ${descricao} não são suportado pelo PainelHorizontal pagina ${this.ControleApresentacao.Nome}`);
                }
            }
        }
    }
}
