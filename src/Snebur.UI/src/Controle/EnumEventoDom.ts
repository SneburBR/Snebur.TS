namespace Snebur.UI
{
    //Ao adicionar um evento dom, deve ser adicionar o mapeamento KeyOf do tipo do argumento do evento do dom,

   //Sequencias dos eventos do mouse ou touch
    // 1 - touchstart
    // 2 - touchmove
    // 3 - touchend
    // 4 - mouseover
    // 5 - mousemove
    // 6 - mousedown
    // 7 - mouseup
    // 8 - click

    export enum EnumEventoDom
    {
        Abort = "abort",
        BeforeUnload = "beforeunload",
        Blur = "blur",
        Change = "change",
        Click = "click",
        ContextMenu = "contextmenu",
        Copy = "copy",
        Cut = "cut",
        DblClick = "dblclick",
        Delete = "delete",
        Drag = "drag",
        DragEnd = "dragend",
        DragEnter = "dragenter",
        DragLeave = "dragleave",
        DragOver = "dragover",
        DragStart = "dragstart",
        Drop = "drop",
        Error = "error",
        Focus = "focus",
        FocusIn = "focusin",
        FocusOut = "focusout",
        FullScreenChange = "fullscreenchange",
        FullScreenError = "fullscreenerror",
        KeyDown = "keydown",
        KeyPress = "keypress",
        KeyUp = "keyup",
        Load = "load",
        Input = "input",
        HashChange = "hashchange",
        Message = "message",
        MouseDown = "mousedown",
        MouseEnter = "mouseenter",
        MouseMove = "mousemove",
        MouseLeave = "mouseleave",
        //mouseout, USAR MOUSE LEAVE
        //mouseover, USAR MOUSEENTER
        MouseUp = "mouseup",
        DOMMouseScroll = "DOMMouseScroll",
        MouseWheel = "mousewheel",
        Wheel = "wheel",
        Paste = "paste",
        PopState = "popstate",
        Resize = "resize",
        Scroll = "scroll",
        TouchCancel = "touchcancel",
        TouchEnd = "touchend",
        TouchMove = "touchmove",
        TouchStart = "touchstart",
        VisibilityChange = "visibilitychange"
    }

    export interface EventoDomMapeado  
    {
        "abort": Event,
        "beforeunload": BeforeUnloadEvent,
        "blur": FocusEvent,
        "change": Event,
        "contentvisibilityautostatechange": ContentVisibilityEvent,
        "click": MouseEvent,
        "contextmenu": MouseEvent,
        "copy": ClipboardEvent,
        "cut": ClipboardEvent,
        "dblclick": MouseEvent,
        "delete": Event,
        "drag": DragEvent,
        "dragend": DragEvent,
        "dragenter": DragEvent,
        "dragleave": DragEvent,
        "dragover": DragEvent,
        "dragstart": DragEvent,
        "drop": DragEvent,
        "error": ErrorEvent,
        "focus": FocusEvent,
        "focusin": FocusEvent,
        "focusout": FocusEvent,
        "fullscreenchange" :Event,
        "fullscreenerror" :Event,
        "keydown": KeyboardEvent,
        "keypress": KeyboardEvent,
        "keyup": KeyboardEvent,
        "load": Event,
        "input": Event,
        "message": MessageEvent,
        "mousedown": MouseEvent,
        "mouseenter": MouseEvent,
        "mousemove": MouseEvent,
        "mouseleave": MouseEvent,
        "hashchange": HashChangeEvent,
        //mouseout, USAR MOUSE LEAVE
        //mouseover, USAR MOUSEENTER
        "mouseup": MouseEvent,
        "mousewheel": WheelEvent,
        "DOMMouseScroll": WheelEvent,
        "wheel": WheelEvent,
        "paste": ClipboardEvent,
        "popstate": PopStateEvent,
        "resize": UIEvent,
        "scroll": UIEvent,
        "touchcancel": TouchEvent,
        "touchend": TouchEvent,
        "touchmove": TouchEvent,
        "touchstart": TouchEvent
        "visibilitychange" : Event
    }
}

interface ContentVisibilityEvent extends Event
{
    readonly skipped: boolean;
}