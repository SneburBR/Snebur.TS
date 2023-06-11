namespace Snebur
{
    export class ValorAlteradoEventArgs<T = any> extends EventArgs
    {
        public readonly Valor: T;
        public readonly DomEvento: Event;

        public constructor(valor: T, domEvento: Event = null)
        {
            super();
            this.Valor = valor;
            this.DomEvento = domEvento;
        }
    }

    export class ValorSelecionadoAlteradoEventArgs<T = any> extends ValorAlteradoEventArgs<T>
    {
        public readonly IsSelecionado: boolean;
        public constructor(valor: T, isSelecionado:boolean, domEvent: Event = null)
        {
            super(valor, domEvent);
            this.IsSelecionado = isSelecionado;
        }
    }
}