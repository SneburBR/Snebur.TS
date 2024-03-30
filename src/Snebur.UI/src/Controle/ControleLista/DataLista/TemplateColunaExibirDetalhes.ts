namespace Snebur.UI
{
    export class TemplateColunaExibirDetalhes extends TemplateColuna
    {
        public override get Html(): string
        {
            return '<sn-botao data-expandir-detalhes="true" sn-tipo-botao="Icone" ap-icone="ExpandMore" sn-click="BtnExpandir_Click"></sn-botao>';
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.IsAdicionarElementoConteudoApresentacao = false;
        }
    }
}

