namespace Snebur.ServicoArquivo
{
    export abstract class OrigemArquivo
    {
        //#region Propriedades

        //public Arquivo: d.IArquivo;
        public Dispensado: boolean;

        //protected Callback: CallbackResultado<ArrayBuffer>;
        //protected CallbackErro: CallbackResultado<Error>;

        //#endregion

        //#region Construtor

        public constructor()
        {
            //this.Arquivo = arquivo;
        }
        //#endregion

        //#region Métodos públicos


        //#endregion

        //#region IDisposable

        public Dispose(): void
        {
            this.Dispensado = true;
        }
        //#endregion
    }
}