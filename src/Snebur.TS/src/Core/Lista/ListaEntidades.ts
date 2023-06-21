namespace Snebur
{
    export class ListaEntidades<TEntidade extends d.IEntidade | Snebur.Dominio.Entidade> extends ListaObservacao<TEntidade> implements
        ITipo<Snebur.Reflexao.TipoListaEntidade>, IListaEntidades
    {

        private _isAberta: boolean = false;

        public get IsAberta(): boolean
        {
            return this._isAberta;
        }

        private NotificacaoAlterarRemoverAtiva: boolean;

        public readonly EntidadesRemovida = new Array<Snebur.Dominio.Entidade>();
        public readonly EntidadesAdicionada = new Array<Snebur.Dominio.Entidade>();
         
        public constructor()
        {
            super();
             this._tipoLista = EnumTipoLista.ListaEntidades;
        }

        public static ExisteEntidade(lista: ListaObservacao<any>, entidade: d.Entidade, comparador?: Snebur.IEqualityComparer): boolean
        {
            return ListaObservacao.Existe(lista as ListaObservacao<any>, entidade, comparador);
        }

        public static AdicionarEntidade(lista: ListaEntidades<any>, entidade: d.Entidade): number
        {
            if (entidade instanceof d.Entidade)
            {

                if (lista.EntidadesRemovida.Contains(entidade))
                {
                    lista.EntidadesRemovida.Remove(entidade);
                }
                if (!lista.EntidadesAdicionada.Contains(entidade))
                {
                    lista.EntidadesAdicionada.Add(entidade);
                }
                return ListaObservacao.Adicionar(lista as ListaObservacao<any>, entidade);
            }
            return lista.length;
        }

        public static RemoverEntidade(lista: ListaEntidades<any>, entidade: d.Entidade): boolean
        {
            if (entidade instanceof d.Entidade)
            {
                if (!lista.EntidadesRemovida.Contains(entidade))
                {
                    lista.EntidadesRemovida.Add(entidade);
                }
                if (lista.EntidadesAdicionada.Contains(entidade))
                {
                    lista.EntidadesAdicionada.Remove(entidade);
                }
                return ListaObservacao.Remover(lista as ListaObservacao<any>, entidade);
            }
            return false;
        }

        public static InserieEntidade(lista: ListaEntidades<any>, posicao: number, entidade: d.Entidade): number
        {
            if (entidade instanceof d.Entidade)
            {
                if (lista.EntidadesRemovida.Contains(entidade))
                {
                    lista.EntidadesRemovida.Remove(entidade);
                }
                if (!lista.EntidadesAdicionada.Contains(entidade))
                {
                    lista.EntidadesAdicionada.Add(entidade);
                }
                ListaObservacao.Inserir(lista as ListaObservacao<any>, posicao, entidade);
            }
            return lista.length;
        }

        public override Cast<TConverterEntidade extends d.IEntidade | Snebur.Dominio.Entidade>(): ListaEntidades<TConverterEntidade>
        {
            return (this as any) as ListaEntidades<TConverterEntidade>;
        }

        /** Método usando para expressoes, ex AbriRelacao(Cliente.Pedidos.Incluir().Produtos.Incluir().ConfiguracaoProduto) **/
        public Incluir(): TEntidade
        {
            return null;
        }
        //#region ITipo

        public override __RetornarTipo(): Snebur.Reflexao.TipoListaEntidade
        {
            return u.ReflexaoUtil.RetornarTipoListaEntidade(d.Entidade.__RetornarTipo() as r.TipoBaseDominio);
        }

        public override GetType(): Snebur.Reflexao.TipoListaEntidade
        {
            return this.__RetornarTipo();
        }
        //#endretion
    }
}
