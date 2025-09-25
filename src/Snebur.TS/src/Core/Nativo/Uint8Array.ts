namespace Snebur
{
    Object.defineProperty(Uint8Array.prototype, "arrauButter", {
        get: function (this: Uint8Array)
        {
            if (this.buffer instanceof ArrayBuffer)
            {
                return this.buffer;
            }
            throw new Error(`This Uint8Array does not have a valid ArrayBuffer. ${this.buffer} `);
        },
        enumerable: true,
        configurable: true
    });
}
