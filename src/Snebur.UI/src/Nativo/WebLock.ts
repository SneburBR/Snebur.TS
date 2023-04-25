

Object.defineProperty(Navigator.prototype, "IsWakeLockSupported", {
    get: function ()
    {
        return "wakeLock" in navigator;
    }
});

interface BaseWebLockSentinelEventMap
{
    "release": Event;
    "visibilitychange": Event;
}

type WakeLockSentinel = {
    readonly released: Boolean;
    readonly type: string;
    release(): Promise<void>
    addEventListener<K extends keyof BaseWebLockSentinelEventMap>(type: K, listener: (this: Event, ev: BaseWebLockSentinelEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof BaseWebLockSentinelEventMap>(type: K, listener: (this: Event, ev: BaseWebLockSentinelEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

type WakeLockRequestType = "screen"

interface Navigator
{
    wakeLock: {
        request: (type: WakeLockRequestType) => Promise<WakeLockSentinel>
    },
    IsWakeLockSupported: boolean
}
 
    