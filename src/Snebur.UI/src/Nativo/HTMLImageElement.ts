namespace Snebur.UI
{

    Object.defineProperty(HTMLImageElement.prototype, "UrlImagem", {

        get: function ()
        {
            return this.src;
        },
        set: function (value: string)
        {
            if (!Array.isArray(this.__urlsHistorico))
            {
                this.__urlsHistorico = [];
            }
            this.__urlsHistorico.push(value);
            if (this.src !== value)
            {
                this.src = value;
            }
        }
    });
    /*CarregarImagemAsync(urlImagem: string): Promise<void>;*/

    HTMLImageElement.prototype.CarregarImagemAsync = function (this: HTMLImageElement, urlImagem: string, igorarErro: boolean = false): Promise<void | Error>
    {
        return ui.ElementoImagemUtil.CarregarImagemAsync(this, urlImagem, igorarErro);
    };

}
