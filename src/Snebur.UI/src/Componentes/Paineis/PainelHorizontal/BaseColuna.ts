namespace Snebur.UI
{
    export class BaseColuna extends BasePainel
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        public override OnVibilidadeAlterada()
        {
            super.OnVibilidadeAlterada();
            this.ControlePai.AtualizarAparencia();
        }
        protected override Inicializar()
        {
            super.Inicializar();

            if ($Configuracao.IsDebug)
            {
                const valorMargem = this.RetornarValorAtributo(AtributosHtml.Margem);
                if (valorMargem != null)
                {
                    console.warn(`Não utilize margem nas colunas, esquerda ou direira doo painel-horitonzal: ${this.___NomeConstrutor} + ${this.ControleApresentacao.___NomeConstrutor}
                                 Html: ${this.Elemento.outerHTML}`);
                }
            }
        }
    }
}
