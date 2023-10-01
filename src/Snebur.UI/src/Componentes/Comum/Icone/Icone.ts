namespace Snebur.UI
{
    export class Icone extends ComponenteApresentacaoConteudo implements IComponenteApresentacaoIcone 
    {
        public Icone: EnumIcone;
        public TamanhoIcone: EnumTamanhoIcone;
        public IconeCategoria: EnumIconeCategoria;

        public get ElementoRecipienteIcone(): HTMLElement
        {
            /*return this.ElementoApresentacao;*/
            return this.ElementoApresentacao.querySelector("ap-icone") ?? this.ElementoApresentacao;
        }

        public constructor(
            controlePai: BaseControle,
            elemento: HTMLElement,
            componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
            this.IsAdicionarElementoConteudoApresentacao = false;
        }

        public override AtualizarAparencia(): void
        {
            super.AtualizarAparencia();
        }
    }
}
