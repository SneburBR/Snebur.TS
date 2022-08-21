namespace Snebur.UI
{
    export class FechouControleFlutanteEventArgs extends EventArgs
    {
        public readonly ControleFlutuante: ControleFlutuante;
        public readonly IsSucesso: boolean;

        public constructor(controleFlutuante: ControleFlutuante, sucesso: boolean)
        {
            super();

            this.ControleFlutuante = controleFlutuante;
            this.IsSucesso = sucesso;
        }
    }

    
}
