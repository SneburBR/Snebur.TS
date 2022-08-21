namespace Snebur
{
    export class ConsoleLogArgs extends EventArgs
    {
        public readonly Mensagem: string;
        public readonly Tipo: EnumTipoLog;

        public constructor(tipo: EnumTipoLog, mensagem: string)
        {
            super();

            this.Tipo = tipo;
            this.Mensagem = mensagem;
        }
    }

   
}
