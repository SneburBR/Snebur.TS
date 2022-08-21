namespace Snebur
{
    export class HashSet<T extends TipoItemLista>
    {
        private __hashCode: number;

        private Dicionario: DicionarioSimples<T>;
        public IsLancarErroAdicionarItemRepedido = false;

        public get Count(): number
        {
            return this.Dicionario.Count;
        }

        public constructor(...itens: any[])
        {
            this.Dicionario = new DicionarioSimples();

            for (const item of itens)
            {
                this.Add(item);
            }
        }

        public Add(item: T): boolean
        {
            if (typeof item === "undefined")
            {
                throw new Erro("Não é possivel adicionar um item nulo ou não defino no HashSet");
            }
            const chave = this.RetornarChave(item);
            if (this.Dicionario.ContainsKey(chave))
            {
                if (this.IsLancarErroAdicionarItemRepedido)
                {
                    throw new Erro("O item ja está na lista ");
                }
                return false;
            }
            this.Dicionario.Add(chave, item);
            return true;
        }

        public AddRange(items: Array<T>): void
        {
            for (const item of items)
            {
                this.Add(item);
            }
        }

        public RemoveRange(items: Array<T>): void
        {
            for (const item of items)
            {
                this.Remove(item);
            }
        }

        public Remove(item: T): boolean
        {
            if (typeof item === "undefined")
            {
                throw new Erro("O item não foi definidio");
            }
            const chave = this.RetornarChave(item);
            if (!this.Dicionario.ContainsKey(chave))
            {
                return false;
            }
            this.Dicionario.Remove(chave);
            return true;
        }
         
        public Contains(item: T): boolean
        {
            if (typeof item === "undefined")
            {
                throw new Erro("O item não foi definidio");
            }
            const chave = this.RetornarChave(item);
            return this.Dicionario.ContainsKey(chave);
        }

        public Clear(): void
        {
            this.Dicionario.Clear();
        }

        public ToList(): Array<T>
        {
            return this.Dicionario.Valores.ToList(true);
        }
         
        private RetornarChave(item: T)
        {
            if (item == null)
            {
                return "null";
            }
            if (typeof item.GetHashCode === "function")
            {
                return `${item.GetType().Nome}-${item.GetHashCode()}`;

            }
            return `${item.GetType().Nome}-${item.toString()}`;
        }

        public GetHashCode(): number
        {
            if (!this.__hashCode)
            {
                this.__hashCode = Objeto.RetornarNovoHashCode();
            }
            return this.__hashCode;
        }
    }
}
