
namespace Snebur.UI
{
    export class JanelaInfo extends Snebur.UI.Janela
    {
        public readonly Info: string;
        public readonly Titulo: string;

        public constructor(controlePai: Snebur.UI.BaseControle, titulo: string, info: string) 
        {
            super(controlePai);
            this.EventoCarregado.AddHandler(this.Janela_Carregada, this);
            this.Info = info;
            this.Titulo = titulo;
        }

        private Janela_Carregada(provedor: any, e: EventArgs) 
        {
            //pagina carregada
        }

        public async BtnOk_Click(botao: ui.Botao, e: ui.UIEventArgs)
        {
            await this.FecharAsync(true);
        }
    }

	//#region Elementos da apresentação - código gerado automaticamente #

	export interface JanelaInfo
	{
	}

	//#endregion

}