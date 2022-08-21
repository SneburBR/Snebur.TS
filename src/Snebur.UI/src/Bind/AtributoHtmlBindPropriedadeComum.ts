namespace Snebur.UI
{
    export class AtributoHtmlBindPropriedadeComum<TControle extends BaseControle | IComponenteApresentacao = BaseControle> extends AtributoHtmlBindConstrutor
    {
        public readonly NomePropriedade: string;

        public constructor(atributoBind: AtributoHtml, bindConstrutor: IBindPropriedadeComumConstrutor, expressaoPropriedade: (value: TControle) => any)
        {
            super(atributoBind, bindConstrutor as any);
            /*this.AtributoHtml = atributoBind;*/
            //this.ConstrutorBind = bindConstrutor;
            this.NomePropriedade = ExpressaoUtil.RetornarCaminhoPropriedade(expressaoPropriedade);
        }
    }
}