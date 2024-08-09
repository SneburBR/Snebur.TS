
namespace Snebur.UI
{
    export class BotaoIconeDescricao extends Snebur.UI.ControleRotulo implements IComponenteApresentacaoIcone
    { 
        public Icone: EnumIcone;
        public TamanhoIcone: EnumTamanhoIcone;

        public get ElementoRecipienteIcone(): HTMLElement
        {
            return this.BlocoRecipienteIcone.ElementoApresentacao;
        }
        
        public constructor(controlePai: Snebur.UI.BaseControle, refElemento: HTMLElement | string) 
        {
            super(controlePai, refElemento);
            this.EventoCarregado.AddHandler(this.Controle_Carregado, this);
        }

        public Controle_Carregado(provedor: any, e: EventArgs) 
        {
            //controle carregada
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }

        protected RetornarElementoRotulo(): HTMLElement
        {
            return this.TextoRotuloInterno.ElementoApresentacao;
        }

        public override Desabilitar(): void
        {
            super.Desabilitar();
            this.Elemento.style.opacity = "0.6";
        }

        public override Habilitar(): void
        {
            super.Habilitar();
            this.Elemento.style.opacity = "1";
        }
    }

	//#region Elementos da apresentação - código gerado automaticamente #

	export interface BotaoIconeDescricao
	{
		readonly BlocoRecipienteIcone: ui.Bloco;
		readonly ControleIcone: ui.Icone;
		readonly BloboRecipienteRotulo: ui.Bloco;
		readonly TextoRotuloInterno: ui.Texto;
	}

	//#endregion

}