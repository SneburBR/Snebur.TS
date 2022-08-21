namespace Snebur
{
    export class ListaObservacao<T> extends Array<T> implements IDisposable, ILista<T>
    {
        public __isListaNova: boolean = true;
        public __isLimpandoListaNova: boolean = false;

        protected _tipoLista: EnumTipoLista = EnumTipoLista.ListaObservacao;

        public readonly EventoItemAdicionado = new Evento<ItemEventArgs<T>>(this);
        public readonly EventoItemRemovido = new Evento<ItemEventArgs<T>>(this);
        public readonly EventoItemInserido = new Evento<InserirItemEventArgs<T>>(this);
        public readonly EventoItemAlterado = new Evento<ItemAlteradoEventArgs<T>>(this);
        public readonly EventoListaNovaAlterada = new Evento(this);

        protected readonly ListaNovaAlteradaInterno: (isListaNova?: boolean) => boolean = ListaObservacaoIndexada.prototype.__ListaNovaAlteradaInterno.bind(this);

        public Tag: any;
        //public IsListaObservacao: boolean;

        public constructor()
        {
            super();
            /*this.EventoItemAlterado.AddHandler(this.This_ItemAlterado, this);*/
        }

        //private This_ItemAlterado()
        //{

        //}

        public async PrototypeAddRangeAsync(itens: Array<T>, intervalo: number = 0)
        {
            for (const item of itens)
            {
                ListaObservacao.Adicionar(this, item);
                await u.ThreadUtil.EsperarAsync(intervalo);
            }
        }

        public static Existe(lista: ListaObservacao<any>, item: any, comparador?: Snebur.IEqualityComparer): boolean
        {
            lista.ListaNovaAlteradaInterno();
            return lista.IndexOf(item, comparador) !== -1;
        }

        public static Adicionar(lista: ListaObservacao<any>, item: any): number
        {
            if ($Configuracao.IsDebug)
            {
                if (item === undefined)
                {
                    throw new Erro("Um item não definido está sendo inserido na ListaObservacao");
                }

                if (item === null)
                {
                    console.warn("Um item null foi inserido na ListaObservacao");
                }
            }

            lista.ListaNovaAlteradaInterno();
            const resultado = lista.push(item);
            lista.EventoItemAdicionado.Notificar(lista, new ItemEventArgs(item));
            lista.EventoItemAlterado.Notificar(lista, new ItemAlteradoEventArgs(item, EnumAcaoItemAlterado.Adicionado));
            return resultado;
        }

        public static Remover(lista: ListaObservacao<any>, item: any): boolean
        {
            lista.ListaNovaAlteradaInterno();
            const posicao = lista.indexOf(item);
            if (posicao >= 0)
            {
                lista.splice(posicao, 1);
                lista.EventoItemRemovido.Notificar(lista, new ItemEventArgs(item));
                lista.EventoItemAlterado.Notificar(lista, new ItemAlteradoEventArgs(item, EnumAcaoItemAlterado.Removido));
                return true;
            }
            return false;
        }

        public static Inserir(lista: ListaObservacao<any>, posicao: number, item: any): number
        {
            lista.ListaNovaAlteradaInterno();
            lista.splice(posicao, 0, item);
            lista.EventoItemInserido.Notificar(lista, new InserirItemEventArgs(posicao, item));
            lista.EventoItemAlterado.Notificar(lista, new ItemAlteradoEventArgs(item, EnumAcaoItemAlterado.Inserido, posicao));
            return lista.length;
        }

        public static ListaNovaAlerada(lista: ListaObservacao<any>, isForcar?: boolean, isDefinirListaNova?: boolean)
        {
            const isNotificador = lista.ListaNovaAlteradaInterno(isDefinirListaNova);
            if (!isNotificador && isForcar)
            {
                lista.EventoListaNovaAlterada.Notificar(this, EventArgs.Empty);
            }
        }

        protected __ListaNovaAlteradaInterno(isDefinirListaNova: boolean): boolean
        {
            const isProximoValor = isDefinirListaNova ? true : false;
            if (this.__isListaNova !== isProximoValor)
            {
                this.__isListaNova = isProximoValor;
                this.EventoListaNovaAlterada.Notificar(this, EventArgs.Empty);
                return true;
            }
            return false;
        }
        //#region Métodos privados

        //private ContemEntidade(item: T): boolean
        //{
        //    let entidade = (item as any) as d.Entidade;
        //    if (entidade.Id > 0)
        //    {
        //        let identificadorEntidade = entidade.IdentificadorEntidade;
        //        return this.Any(x => ((x as any) as d.IEntidade).IdentificadorEntidade == identificadorEntidade);
        //    }
        //    return super.Contains(item);
        //}

        //private RemoverEntidade(item: T): boolean
        //{
        //    let entidade = (item as any) as d.Entidade;
        //    if (entidade.Id > 0)
        //    {
        //        let identificadorEntidade = entidade.IdentificadorEntidade;
        //        let entidadeRemover = this.Where(x => ((x as any) as d.IEntidade).IdentificadorEntidade == identificadorEntidade).FirstOrDefault();
        //        return super.Remove(entidadeRemover);

        //    }
        //    return super.Remove(item);
        //}

        //#endregion

        public Dispose(): void
        {
            this.EventoItemAdicionado.Clear();
            this.EventoItemAdicionado.Clear();
            this.EventoItemInserido.Clear();
            this.Clear();
        }
    }
}