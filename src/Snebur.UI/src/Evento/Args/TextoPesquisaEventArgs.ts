
namespace Snebur.UI
{
    export class TextoPesquisaEventArgs extends UIEventArgs
    {

        public Pesquisa: string;

        public constructor(elemento: HTMLElement, parametros: DicionarioSimples<any>, domEvent: UIEvent, pesquisa: string)
        {
            super(elemento, parametros, domEvent);
            this.Pesquisa = pesquisa;
        }
    }
}