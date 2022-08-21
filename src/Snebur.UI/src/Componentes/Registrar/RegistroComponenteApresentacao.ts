namespace Snebur.UI
{
    export class RegistroComponenteApresentacao
    {
        public readonly TagName: string;
        public readonly Construtor: IComponenteApresentacaoConstrutor;
        public readonly CaminhoConstrtuor: string;

        public constructor(tagName: string, construtor: IComponenteApresentacaoConstrutor)
        {
            this.TagName = tagName;
            this.Construtor = construtor;
        }
    }
}