namespace Snebur.UI
{
    export class AtributoHtmlBindConstrutor
    {
        public readonly AtributoHtml: AtributoHtml;
        public readonly ConstrutorBind: IBindConstrutor;

        public constructor(atributoBind: AtributoHtml, bindConstrutor: IBindConstrutor)
        {
            this.AtributoHtml = atributoBind;
            this.ConstrutorBind = bindConstrutor;
        }
    }
}