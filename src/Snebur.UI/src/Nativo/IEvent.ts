interface Event extends Snebur.Nativo.IEvent
{

}
interface MouseEvent extends Snebur.Nativo.IMouseEvent
{

}


namespace Snebur.Nativo
{
    export interface IEvent
    {
        BaseStopPropagation: () => void;
        BaseStopImmediatePropagation: () => void;
        IsCancelado?: boolean;
    }

    export interface IMouseEvent
    {
        /**Botão esquerdo, touch ou principal  */
        IsBotaoEsquerdo?: boolean;
        IsBotaoDireito?: boolean;
      
        //IsTeclaModificadoraPrecionada: boolean;
    }
}