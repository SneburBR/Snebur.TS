
namespace Snebur.UI
{
    export class UIValorAlteradoEventArgs<T = any> extends UIEventArgs
    {

        public Valor: T;

        public constructor(elemento: HTMLElement,
            parametros: DicionarioSimples<any>, domEvent: UIEvent, valor: T)
        {
            super(elemento, parametros, domEvent);
            this.Valor = valor;
        }
    }
}