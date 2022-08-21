namespace Snebur.UI
{
    export class MostrouControleFlutanteEventArgs extends EventArgs
    {
        public ControleFlutuante: ControleFlutuante;

        public constructor(controleFlutuante: ControleFlutuante )
        {
            super();

            this.ControleFlutuante = controleFlutuante;
        }
    }
}
