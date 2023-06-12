namespace Snebur.UI
{
    export class Icone extends ComponenteApresentacaoConteudo  
    {
        public Icone: EnumIcone;
        public TamanhoIcone: EnumTamanhoIcone;
        public IconeCategoria: EnumIconeCategoria;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
            this.IsAdicionarElementoConteudoApresentacao = false;
        }
    }
}
