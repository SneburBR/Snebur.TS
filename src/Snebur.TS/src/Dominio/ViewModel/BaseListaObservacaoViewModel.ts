namespace Snebur.Dominio
{
    export abstract class BaseListaObservacaoViewModel<TEntidade extends IEntidade> extends Snebur.Dominio.BaseViewModel
    {
        public Lista: ListaObservacao<TEntidade>;

        public constructor()
        {
            super();
            this.Lista = new ListaObservacao<TEntidade>();
        }
    }
}