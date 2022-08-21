namespace Snebur
{
    export class EventoPropriedadeAlterada extends Evento
    {
        public readonly NomePropriedade: string;

        public constructor(baseDomnio: ObjetoControladorPropriedade, nomePropriedade: string)
        {
            super(baseDomnio);

            this.NomePropriedade = nomePropriedade;
        }

        public override Notificar(provedor: ObjetoControladorPropriedade, eventArgs: PropriedadeAlteradaEventArgs): void
        {
            super.Notificar(provedor, eventArgs);
        }
    }
}