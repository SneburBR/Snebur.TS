
namespace Snebur.UI
{
    export interface IControleBaseEventoValorAlterado extends BaseControle
    {
        ElementoInput?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    }

    export interface IControleEventoValorAlterado<T = any> extends IControleBaseEventoValorAlterado
    {
        EventoValorAlterado: Evento<ValorAlteradoEventArgs<T>>;
    }

    export interface IControleEventoValorModificando<T = any> extends IControleBaseEventoValorAlterado
    {
        ElementoInput?: HTMLInputElement;

        EventoValorModificando: Evento<ValorAlteradoEventArgs<T>>;
    }
}