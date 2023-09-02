
namespace Snebur.UI
{
    export class LinhaDetalhesExpandidaEventArgs<TItem = any> extends UIEventArgs
    {
        public readonly Linha: Linha<TItem>;

        public get Item(): any
        {
            return this.Linha.ItemReferencia;
        }

        public get LinhaDetalhes(): LinhaDetalhes<TItem>
        {
            return this.Linha.LinhaDetalhes;
        }

        public get ConteudoLinhaDetalhes(): ConteudoLinhaDetalhes
        {
            return this.LinhaDetalhes.ConteudoLinhaDetalhes;
        }

        public constructor(linha: Linha<TItem>,
            elemento: HTMLElement,
            parametros: DicionarioSimples<any>,
            domEvent: UIEvent)
        {
            super(elemento, parametros, domEvent);
            this.Linha = linha;
        }
    }

    
}