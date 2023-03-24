namespace Snebur.Nativo
{ 
    Event.prototype.BaseStopPropagation = Event.prototype.stopPropagation;
    Event.prototype.BaseStopImmediatePropagation = Event.prototype.stopImmediatePropagation;
     
    Object.defineProperty(Event.prototype, "stopPropagation", {
        value: function (this: Event)
        {
            this.BaseStopPropagation();
            this.IsCancelado = true;
            window.EventoStopPropagation?.Notificar(this, new StopPropagationEventArgs(this));
        }
    });

    Object.defineProperty(Event.prototype, "stopImmediatePropagation", {
        value: function (this: Event)
        {
            this.BaseStopImmediatePropagation();
            this.IsCancelado = true;
            window.EventoStopPropagation?.Notificar(this, new StopPropagationEventArgs(this));
        }
    });

    Object.defineProperty(MouseEvent.prototype, "IsBotaoEsquerdo", {
        get: function ()
        {
            const e = this as MouseEvent;
            return e.buttons === 1 ||
                e.button === 0;
        }
    });


    Object.defineProperty(MouseEvent.prototype, "IsBotaoDireito", {
        get: function ()
        {
            const e = this as MouseEvent;
            return e.buttons === 2;
        }
    });


    //Object.defineProperty(MouseEvent.prototype, "IsTeclaModificadoraPrecionada", {
    //    get: function ()
    //    {
    //        let e = this as MouseEvent;
    //        return e.
    //    }
    //});

}