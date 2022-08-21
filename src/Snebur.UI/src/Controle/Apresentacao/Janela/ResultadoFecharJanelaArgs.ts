namespace Snebur.UI
{
    export class ResultadoFecharJanelaArgs  extends EventArgs
    {
        public readonly Janela: Janela;
        public readonly Erro: Error;

        public IsSucesso: boolean;

        public constructor(janela: Janela, isSucesso: boolean, erro: Error)
        {
            super();

            this.Janela = janela;
            this.IsSucesso = isSucesso;
            this.Erro = erro; 
        }
    }
}