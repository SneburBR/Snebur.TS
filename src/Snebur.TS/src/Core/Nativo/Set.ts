namespace Snebur
{
    Set.prototype.AddRangeNew = (function (this: Set<any>, itens: any[])
    {
        /*eslint-disable*/
        this.Clear();
        this.AddRange(itens);
    });

    Set.prototype.AddRange = (function (this: Set<any>, itens: any[])
    {
        if (Array.isArray(itens) && itens.length > 0)
        {
            for (const item of itens)
            {
                this.add(item);
            }
        }
    });

    Set.prototype.Clear = (function (this: Set<any>)
    {
        this.clear();
    });
}
