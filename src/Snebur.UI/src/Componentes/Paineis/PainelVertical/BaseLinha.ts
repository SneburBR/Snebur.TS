
namespace Snebur.UI
{
    export class BaseLinha extends BasePainel
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
                    const margem = new MargemUnidadeComprimento(valorMargem);
                    if (margem.Superior.Valor !== 0 ||
                        margem.Inferior.Valor !== 0)
                    {
                        console.error(`Não utilize margem verticais nas linhas, cabecalho ou rodapé no painel-vertical:${this.___NomeConstrutor} + ${this.ControleApresentacao.___NomeConstrutor}
                                       Html: ${this.Elemento.outerHTML.substring(0, 255)}`);
                    }
                }
            }
        }
    }
}