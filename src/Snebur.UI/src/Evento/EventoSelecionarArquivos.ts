namespace Snebur.UI
{
    export class EventoSelecionarArquivos extends EventoControleHandler
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.SelecionarArquivos, "click");
        }

        public override ManipuladorkEventListenerDom(e: Event): void
        {
            this.DispararAsync();
        }

        public async DispararAsync()
        {
            const isMultiSelecacao = this.RetornarValorAtributoBoolean(AtributosHtml.Multiselecao, false);
            const accept = this.RetornarValorAtributo(AtributosHtml.Accept, String.Empty);
            const arquivos = await SelecionarArquivosUtil.SelecionarArquivosAsync(isMultiSelecacao, accept);

            if (arquivos.length > 0)
            {
                this.Manipulador(this.ControlePai, new SelecionarArquivosEventoArgs(arquivos));
            }

            if ($Configuracao.IsDebug)
            {
                console.log(" Caixa de dialogo para seleção de arquivos solicitada. ");
            }
        }


        //#region IDisposable

        public override Dispose(): void
        {
            /*this.RemoverEventoChange();*/
            super.Dispose();
        }
        //#endregion
    }


}