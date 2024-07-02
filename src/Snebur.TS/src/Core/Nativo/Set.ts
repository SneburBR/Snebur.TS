namespace Snebur
{
    Object.defineProperty(Set.prototype, "Count", {
        get: function (this: Set<any>)
        {
            return this.size;
        },
        enumerable: true,
        configurable: true
    });
    
    Set.prototype.AddRangeNew = (function (this: Set<any>, itens: any[] | Set<any>)
    {
        /*eslint-disable*/
        this.Clear();
        this.AddRange(itens as any);
    });

    Set.prototype.AddRange = (function (this: Set<any>, itens: any[] | Set<any>)
    {
        if (itens == null)
        {
            return;
        }

        for (const item of itens)
        {
            this.add(item);
        }
    });

    Set.prototype.Clear = (function (this: Set<any>)
    {
        this.clear();
    });
}
