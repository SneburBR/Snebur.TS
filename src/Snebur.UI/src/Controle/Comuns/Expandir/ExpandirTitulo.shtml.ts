namespace Snebur.UI
{
    export class ExpandirTitulo extends BaseControle
    {
        private readonly BlocoTitulo: ui.BaseControle;
        public readonly BotaoIcone: ui.Botao;

        public TituloHtmlInterno: string;
        public TituloExpandir: string;
        public TituloEncolher: string;

        public get ControleExpandir(): Expandir
        {
            return this.ControlePai as Expandir;
        }

        public get TamanhoIcone(): EnumTamanhoIcone | string
        {
            return this.BotaoIcone.TamanhoIcone;
        }
        public set TamanhoIcone(value: EnumTamanhoIcone | string)
        {
            this.BotaoIcone.TamanhoIcone = value;
        }

        public constructor(controlePai: Expandir, refElemento?: any)
        {
            super(controlePai, refElemento);
            controlePai.EventoConteudoExpandido.AddHandler(this.ControlePai_ConteudoExpandido, this);
        }

        protected override RetornarHtmlInterno(): string
        {
            this.TituloHtmlInterno = this.HtmlInternoInicial;
            const htmlInterno = HtmlReferenciaUtil.RetornarHtml(this);
            const retorno = htmlInterno.replace("[[CONTEUDO-INTERNO]]", this.TituloHtmlInterno);
            return retorno;
        }

        public override Inicializar(): void
        {
            super.Inicializar();
            this.TituloEncolher = this.RetornarValorAtributo(AtributosHtml.TituloEncolher);
            this.TituloExpandir = this.RetornarValorAtributo(AtributosHtml.TituloExpandir);
            this.AtualizarTitulo();
        }

        private ControlePai_ConteudoExpandido(provedor: any, e: ConteudoExpandidoEventArgs): void
        {
            this.AtualizarTitulo();
        }

        public AtualizarTitulo(): void
        {
            this.BlocoTitulo.ElementoApresentacao.innerHTML = this.RetornarTitulo();
        }

        private RetornarTitulo(): string
        {
            switch (this.ControleExpandir.Status)
            {
                case EnumStatusConteudoExpandir.Encolhido:

                    return this.NormalizarTitulo(this.TituloExpandir);

                case EnumStatusConteudoExpandir.Expandido:

                    return this.NormalizarTitulo(this.TituloEncolher);

                default:

                    throw new Error("O status do não é suportado");
            }
        }

        private NormalizarTitulo(titulo: string): string
        {
            if (!String.IsNullOrWhiteSpace(titulo))
            {
                return titulo;
            }
            return this.TituloHtmlInterno;
        }
    }
}