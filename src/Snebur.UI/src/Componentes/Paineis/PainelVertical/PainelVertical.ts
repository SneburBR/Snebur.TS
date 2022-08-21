namespace Snebur.UI
{
    export class PainelVertical extends BasePainel
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        protected override InicializarComponentesApresentacao(): void
        {
            super.InicializarComponentesApresentacao();
            this.CalcularAlturaDasLinhas(true);
        }

        public override AtualizarAparencia(): void
        {
            super.AtualizarAparencia();
            this.CalcularAlturaDasLinhas(false);
        }

        private CalcularAlturaDasLinhas(isInicializando: boolean)
        {
            const linhas = isInicializando ?
                this.ComponentesApresentacaoFilhos.OfType(BaseLinha).Where(x => x.Visibilidade === EnumVisibilidade.Visivel && x.VisibilidadeApresentacao === EnumVisibilidade.Visivel).ToList() :
                this.ComponentesApresentacaoFilhos.OfType(BaseLinha).Where(x => x.IsVisivel).ToList();


            const unidadesComprimento = linhas.Where(x => x.AlturaApresentacao instanceof UnidadeComprimento).Select(x => x.AlturaApresentacao);
            //let somaPorcentagem = unidadesComprimentos.Where(x => x && x.TipoUnidade == EnumTipoUnidadeComprimento.Porcentagem).Sum(x => x.Valor);
            //let somaPixels = unidadesComprimentos.Where(x => x.TipoUnidade == EnumTipoUnidadeComprimento.Pixel).Sum(x => x.Valor);
            //let quantidadeVazio = unidadesComprimentos.Where(x => x.TipoUnidade == EnumTipoUnidadeComprimento.Vazio).Count;
            //let porcentagem = (100 - somaPorcentagem) / quantidadeVazio;

            //let estilo = `calc(${porcentagem}% - ${(somaPixels / quantidadeVazio).ToRems()})`;

            const quantidadeVazio = unidadesComprimento.Where(x => x.TipoUnidade === EnumTipoUnidade.Vazio || x.TipoUnidade === EnumTipoUnidade.Auto).Count;
            if (quantidadeVazio > 0)
            {
                const estiloCalculado = UnidadeComprimentoUtil.RetornarValorCalculado(100, unidadesComprimento, quantidadeVazio);
                for (const linha of linhas)
                {
                    if (linha.AlturaApresentacao.TipoUnidade === EnumTipoUnidade.Vazio ||
                        linha.AlturaApresentacao.TipoUnidade === EnumTipoUnidade.Auto)
                    {
                        linha.Elemento.style.height = estiloCalculado;
                    }
                }
            } 

            if ($Configuracao.IsDebug)
            {
                if (linhas.Count > 0 && quantidadeVazio === 0)
                {
                    console.warn(`Nenhuma linha com altura automática está definida no controle ${this.ControleApresentacao.___NomeConstrutor} ${this.Nome} para altura automatica, é preciso remover o atributo sn-altura`);
                }

                const constrolesNaoSuportado = this.ComponentesApresentacaoFilhos.Where(x => !(x instanceof BaseLinha)).ToList();
                if (constrolesNaoSuportado.Count > 0)
                {
                    const descricao = String.Join(", ", constrolesNaoSuportado.Select(x => x.GetType().Nome));
                    console.error(`Os componentes ${descricao} não são suportado pelo PainelVertical em ${this.ControleApresentacao.___NomeConstrutor}`);
                }
            }
        }
    }
}
