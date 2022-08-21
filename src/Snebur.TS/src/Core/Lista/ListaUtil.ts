namespace Snebur.Utilidade
{
    export class ListaUtil
    {
        public static Selecionar(lista: Array<ISelecionado>, itemSelecionado: ISelecionado)
        {
            for (const item of lista)
            {
                if (!Util.IsIgual(item, itemSelecionado))
                {
                    item.IsSelecionado = false;
                }
            }

            if (itemSelecionado != null &&
                itemSelecionado.IsSelecionado === false)
            {
                itemSelecionado.IsSelecionado = true;
            }
        }

        public static Limpar<T>(lista: Array<T>)
        {
            if (Array.isArray(lista))
            {
                lista.Clear();
            }
        }

        public static IsListaObservacao(lista: Array<any>): lista is ListaObservacao<any>
        {
            const tipo = lista.TipoLista;
            if (typeof tipo === "number")
            {
                return tipo === EnumTipoLista.ListaObservacao ||
                    tipo === EnumTipoLista.ListaEntidades ||
                    tipo === EnumTipoLista.ListaObservacaoIndexada;
            }
            return false;
        }


        public static IsListaIgual(lista1: List<any>, lista2: List<any>): boolean
        {
            if (lista1 !== lista2)
            {
                if (lista1?.Count !== lista2?.Count)
                {
                    return false;
                }

                const len = lista1?.Count ?? 0;
                for (let i = 0; i < len; i++)
                {
                    const item1 = lista1[i];
                    const item2 = lista2[i];

                    if (item1 != null && typeof item1.Equals === "function")
                    {
                        if (!item1.Equals(item2))
                        {
                            return false;
                        }
                    }
                    else if (item1 !== item2)
                    {
                        return false;
                    }
                }
            }
            return true;

        }
    }
}