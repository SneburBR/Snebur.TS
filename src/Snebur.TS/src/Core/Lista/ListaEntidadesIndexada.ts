namespace Snebur
{
    export class ListaEntidadesIndexada<TEntidade extends d.IEntidade | Snebur.Dominio.Entidade> extends ListaObservacaoIndexada<TEntidade>
    {

        private FindByIdInterno = ListaEntidadesIndexada.prototype.FindById.bind(this);
        private FindByOrDefaultInterno = ListaEntidadesIndexada.prototype.FindByIdOrDefault.bind(this);

        public constructor()
        {
            super(x => x.Id);
            this._tipoLista = EnumTipoLista.ListaEntidadesIndexada;
        }


        public FindById(id: number): TEntidade
        {
            return this.Item(id);
        }

        public FindByIdOrDefault(id: number): TEntidade
        {
            return this.ItemOrDefault(id);
        }
 
        public static FindByIdIndexado(lista: ListaEntidadesIndexada<d.IEntidade>, id: number): d.IEntidade
        {
            return lista.FindByIdInterno(id);
        }

        public static FindByIdOrDefaultIndexado(lista: ListaEntidadesIndexada<d.IEntidade>, id: number): d.IEntidade
        {
            return lista.FindByOrDefaultInterno(id);
        }
    }
}