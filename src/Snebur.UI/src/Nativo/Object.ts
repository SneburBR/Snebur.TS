
interface String  
{
    EstiloHtml(estilo: Snebur.UI.EnumEstiloHtml): string
}

interface Number  
{
    EstiloHtml(estilo: Snebur.UI.EnumEstiloHtml): string
}
 

namespace Snebur
{
   

    Object.defineProperty(String.prototype, "EstiloHtml", {
        value: function (estilo: Snebur.UI.EnumEstiloHtml)
        {
            return EstiloUtil.FormatarHtml(this, estilo); 
        },
        writable: false,
        configurable: false,
        enumerable: false
    });

 

    Object.defineProperty(Number.prototype, "EstiloHtml", {
        value: function (estilo: Snebur.UI.EnumEstiloHtml)
        {
            return EstiloUtil.FormatarHtml(this, estilo);
        },
        writable: false,
        configurable: false,
        enumerable: false
    });
 



}

