namespace Snebur
{
    /*eslint-disable*/
    Array.prototype.Insert = (function (posicao, item)
    {
        let lista = this as any as Array<any>;
        switch (lista.TipoLista)
        {
            case EnumTipoLista.List:
            case EnumTipoLista.Array:

                lista.splice(posicao, 0, item);
                return lista.length;

            case (EnumTipoLista.ListaObservacao):

                return Snebur.ListaObservacao.Inserir(lista as ListaObservacao<any>, posicao, item);

            case (EnumTipoLista.ListaEntidadesIndexada):
            case (EnumTipoLista.ListaObservacaoIndexada):

                return ListaObservacaoIndexada.InserirItemIndexado(lista as ListaObservacaoIndexada<any>, posicao, item);

            case (EnumTipoLista.ListaEntidades):

                return ListaEntidades.InserieEntidade(lista as ListaEntidades<any>, posicao, item);

            default:

                throw new Erro("Tipo de lista não suportado");
        }
    });


    Array.prototype.PegarPrimeiro = function (this: Array<any>)
    {
        let primeiro = this.shift();
        switch (this.TipoLista)
        {
            case EnumTipoLista.ListaObservacao:
            case EnumTipoLista.ListaEntidades:
            case EnumTipoLista.ListaObservacaoIndexada:
            case EnumTipoLista.ListaEntidadesIndexada:

                ListaObservacao.ListaNovaAlterada(this as ListaObservacao<any>);

                let listaTiapada = this as ListaObservacao<any>;
                listaTiapada.EventoItemRemovido.Notificar(this, new ItemEventArgs(primeiro));
                listaTiapada.EventoItemAlterado.Notificar(this, new ItemAlteradoEventArgs(primeiro, EnumAcaoItemAlterado.Removido));
                break;

            default:



        }
        return primeiro;

    }

    Array.prototype.PegarUltimo = function (this: Array<any>)
    {
        let ultimo = this.pop();
        switch (this.TipoLista)
        {
            case EnumTipoLista.ListaObservacao:
            case EnumTipoLista.ListaEntidades:
            case EnumTipoLista.ListaObservacaoIndexada:
            case EnumTipoLista.ListaEntidadesIndexada:

                let listaTiapada = this as ListaObservacao<any>;
                ListaObservacao.ListaNovaAlterada(listaTiapada, true);
                listaTiapada.EventoItemRemovido.Notificar(listaTiapada, new ItemEventArgs(ultimo));
                listaTiapada.EventoItemAlterado.Notificar(listaTiapada, new ItemAlteradoEventArgs(ultimo, EnumAcaoItemAlterado.Removido));
                break;

            default:
        }
        return ultimo;
    }

    Array.prototype.AddIsTrue = (function (item: any, isAdd: boolean): number
    {
        if (isAdd)
        {
            return this.Add(item);
        }
        return -1;
    });

    Array.prototype.AddIsNotNull = (function (item: any): number
    {
        if (item != null)
        {
            return this.Add(item);
        }
        return -1;
    });

    Array.prototype.Add = (function (item)
    {
        let lista = this as Array<any>;
        switch (lista.TipoLista)
        {
            case EnumTipoLista.Array:
            case EnumTipoLista.List:

                return lista.push(item);

            case EnumTipoLista.ListaObservacao:

                return ListaObservacao.Adicionar(lista as ListaObservacao<any>, item);

            case EnumTipoLista.ListaObservacaoIndexada:
            case EnumTipoLista.ListaEntidadesIndexada:

                return ListaObservacaoIndexada.AdicionarItemIndexado(lista as ListaObservacaoIndexada<any>, item);

            case EnumTipoLista.ListaEntidades:

                return ListaEntidades.AdicionarEntidade(lista as ListaEntidades<any>, item);

            default:

                throw new Erro("Tipo de lista não suportado");

        }
    });

    Array.prototype.RemoveRange = (function (this: Array<any>, itens: Array<any>)
    {
        if (Snebur.Utilidade.ListaUtil.IsListaObservacao(this))
        {
            ListaObservacao.ListaNovaAlterada(this);
        }

        let _this = this as Array<any>;
        for (let item of itens)
        {
            _this.Remove(item);
        }
    });

    Array.prototype.Remove = (function (item)
    {

        let lista = this as Array<any>;
        switch (lista.TipoLista)
        {
            case EnumTipoLista.ListaObservacao:

                return ListaObservacao.Remover(lista as ListaObservacao<any>, item);

            case EnumTipoLista.ListaObservacaoIndexada:
            case EnumTipoLista.ListaEntidadesIndexada:

                return ListaObservacaoIndexada.RemoverItemIndexado(lista as ListaObservacaoIndexada<any>, item);

            case (EnumTipoLista.ListaEntidades):

                return ListaEntidades.RemoverEntidade(lista as ListaEntidades<any>, item);


            case EnumTipoLista.Array:
            case EnumTipoLista.List:


                let posicao = lista.IndexOf(item);
                if (posicao >= 0)
                {
                    this.splice(posicao, 1);
                    return true;
                }
                return false;

            default:

                throw new Erro("Tipo de lista  não suportado");
        }

    });

    Array.prototype.RemoveAt = (function (this: Array<any>, index: number)
    {
        if (Snebur.Utilidade.ListaUtil.IsListaObservacao(this))
        {
            ListaObservacao.ListaNovaAlterada(this as ListaObservacao<any>);
        }

        if (index < this.length)
        {
            let lista = this as Array<any>;
            let item = lista[index];
            lista.Remove(item);
            return true;
        }
        return false;
    });

    Array.prototype.Clear = (function (this: Array<any>, isDefinirListaNova?: boolean): void
    {
        if (u.ListaUtil.IsListaObservacao(this))
        {
            if (isDefinirListaNova)
            {
                this.__isLimpandoListaNova = true;
            }

            let lista = this as Array<any>;
            for (let i = this.length - 1; i >= 0; i--)
            {
                let item = lista[i];
                lista.Remove(item);
            }

            if (isDefinirListaNova)
            {
                this.__isLimpandoListaNova = false;
            }
            ListaObservacao.ListaNovaAlterada(this, true, isDefinirListaNova);
        }
        else
        {
            this.splice(0, this.length);
        }
    });

    Array.prototype.Contains = (function (item: any, comparador?: Snebur.IEqualityComparer): boolean
    {
        if (Snebur.Utilidade.ListaUtil.IsListaObservacao(this))
        {
            ListaObservacao.ListaNovaAlterada(this);
        }

        let lista = this as Array<any>;

        switch (lista.TipoLista)
        {
            case EnumTipoLista.Array:
            case EnumTipoLista.List:

                return lista.IndexOf(item, comparador) !== -1;

            case EnumTipoLista.ListaObservacao:

                return ListaObservacao.Existe(lista as ListaObservacao<any>, item, comparador);

            case EnumTipoLista.ListaEntidadesIndexada:
            case EnumTipoLista.ListaObservacaoIndexada:

                return ListaObservacaoIndexada.ExisteIndexado(lista as ListaObservacaoIndexada<any>, item);

            case (EnumTipoLista.ListaEntidades):

                return ListaEntidades.ExisteEntidade(lista as ListaEntidades<any>, item, comparador);

            default:

                throw new Erro("tipo de lista não suportado");

        }
    });

    Array.prototype.AddRange = (function (this: Array<any>, itens: any[])
    {
        /*eslint-disable*/
        if (itens == this)
        {
            return;
        }

        if (Snebur.Utilidade.ListaUtil.IsListaObservacao(this))
        {
            ListaObservacao.ListaNovaAlterada(this, true);
        }

        if (Array.isArray(itens) && itens.length > 0)
        {
            for (const item of itens)
            {
                this.Add(item);
            }
        }
    });

    Array.prototype.AddRangeNew = (function (this: Array<any>, itens: Array<any>)
    {
        /*eslint-disable*/
        if (itens == this)
        {
            return;
        }

        this.Clear();
        this.AddRange(itens);
    });

    Array.prototype.AddRangeAsync = (async function (this: Array<any>, items: any[], cancellationToken?: CancelationToken): Promise<void>
    {
        /*eslint-disable*/
        if (items == this)
        {
            return;
        }

        if (Snebur.Utilidade.ListaUtil.IsListaObservacao(this))
        {
            ListaObservacao.ListaNovaAlterada(this, true);
        }

        if (items?.length)
        {
            for (const item of items)
            {
                if (cancellationToken?.IsCanceled)
                {
                    return;
                }

                this.Add(item);
                await u.ThreadUtil.QuebrarAsync();
            }
        }
    });

    Array.prototype.AddRangeNewAsync = (async function (this: Array<any>, items: any[], cancellationToken?: CancelationToken)
    {
        /*eslint-disable*/
        if (items == this)
        {
            return;
        }
        this.Clear();
        await this.AddRangeAsync(items, cancellationToken);
    });

    (Array.prototype as any).Item = (function (chave: string | number)
    {
        if (this.IsListaObservacao)
        {
            ListaObservacao.ListaNovaAlterada(this);
        }

        let lista = this as Array<any>;
        switch (lista.TipoLista)
        {

            case EnumTipoLista.ListaEntidadesIndexada:
            case EnumTipoLista.ListaObservacaoIndexada:

                return ListaObservacaoIndexada.ItemIndexado(lista as ListaObservacaoIndexada<any>, chave);

            default:

                throw new Erro("A lista não é suportada");
        }
    });

    (Array.prototype as any).ItemOrDefault = (function (chave: string | number)
    {
        if (Snebur.Utilidade.ListaUtil.IsListaObservacao(this))
        {
            ListaObservacao.ListaNovaAlterada(this);
        }

        let lista = this as Array<any>;
        switch (lista.TipoLista)
        {

            case EnumTipoLista.ListaEntidadesIndexada:
            case EnumTipoLista.ListaObservacaoIndexada:

                return ListaObservacaoIndexada.ItemOrDefaultIndexado(lista as ListaObservacaoIndexada<any>, chave);

            default:

                throw new Erro("A lista não é suportada");
        }
    });

    (Array.prototype as any).FindById = (function (id: number): d.IEntidade
    {
        if (Snebur.Utilidade.ListaUtil.IsListaObservacao(this))
        {
            ListaObservacao.ListaNovaAlterada(this);
        }

        let lista = this as Array<any>;
        switch (lista.TipoLista)
        {

            case EnumTipoLista.ListaEntidadesIndexada:
            case EnumTipoLista.ListaObservacaoIndexada:

                return ListaEntidadesIndexada.FindByIdIndexado(lista as ListaEntidadesIndexada<any>, id);

            default:

                throw new Erro("A lista não é suportada");
        }
    });

    (Array.prototype as any).FindByIdOrDefault = (function (id: number)
    {
        if (Snebur.Utilidade.ListaUtil.IsListaObservacao(this))
        {
            ListaObservacao.ListaNovaAlterada(this);
        }

        let lista = this as Array<any>;
        switch (lista.TipoLista)
        {

            case EnumTipoLista.ListaEntidadesIndexada:
            case EnumTipoLista.ListaObservacaoIndexada:

                return ListaEntidadesIndexada.FindByIdOrDefaultIndexado(lista as ListaEntidadesIndexada<any>, id);

            default:

                throw new Erro("A lista não é suportada");
        }
    });



}