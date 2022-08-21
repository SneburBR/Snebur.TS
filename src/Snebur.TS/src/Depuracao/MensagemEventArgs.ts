namespace Snebur.Depuracao
{
    export class MensagemEventArgs<TMensagem extends Mensagem> extends EventArgs
    {
        public readonly Mensagemn: TMensagem;

        public constructor(mensagem: TMensagem)
        {
            super();
            this.Mensagemn = mensagem;
        }
    }
}