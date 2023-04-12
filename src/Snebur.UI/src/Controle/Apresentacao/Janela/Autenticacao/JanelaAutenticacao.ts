namespace Snebur.UI
{
    export abstract class JanelaAutenticacao extends Janela
    {
        
        public constructor()
        {
            super();

            this.IsFecharEsc = false;
            this.IsMostrarBarraAcoes = false;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            
        }

        protected override RetornarElementoDestino(): HTMLElement
        {
            return document.body;
        }

        //#region estilos 

      
        //#endregion
    }
}