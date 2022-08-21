namespace Snebur.UI
{
    export class RegistroElementoControle
    {
        public readonly TagName: string;
        public readonly TagExtesao: string;
        public readonly CaminhoConstrtuor: string;
        public readonly HTMLElementConstrutor: { new(): HTMLElement };
        private readonly Construtor: IControleConstrutor;

        public constructor(tagName: string,
            tagExtensao: string,
            construtor: IControleConstrutor,
            htmlElementConstrutor: { new(): HTMLElement })
        {
            this.TagName = tagName;
            this.TagExtesao = tagExtensao;
            this.Construtor = construtor;
            this.HTMLElementConstrutor = htmlElementConstrutor;
        }

        public RetornarConstrutior(elemento: HTMLElement): IControleConstrutor
        {
            if (typeof this.Construtor.RetornarConstrutor === "function")
            {
                return this.Construtor.RetornarConstrutor(elemento) as IControleConstrutor;
            }
            return this.Construtor;
        }
    }
}