namespace Snebur.Dominio
{
    export declare type TipoListaComplexo = string | number | Date;

    export abstract class BaseListaTipoComplexo<T extends TipoListaComplexo = string> extends BaseTipoComplexo
    {
        private readonly _listaInterna = new List<T>();
        private _json: string = null;

        protected get ListaInterna(): List<T>
        {
            return this._listaInterna;
        }

        public get Json(): string
        {
            return this._json;
        }
        public set Json(value: string)
        {
            value = this.RetornarJsonNormalizado(value);
            this.NotificarPropriedadeAlterada("Json", this._json, this._json = value);
            this.DeserilizarLista();
        }

        public get Count(): number
        {
            return this._listaInterna.Count;
        }

        public constructor(lista: List<T>);
        public constructor(lista: List<T>)
        {
            super();

            if (lista instanceof Array)
            {
                for (const n of lista)
                {
                    this._listaInterna.Add(n);
                }
            }
            this.SerializarLista();
        }

        public Add(valor: T): void
        {
            if (!this.ListaInterna.Contains(valor))
            {
                this.ListaInterna.Add(valor);
                this.SerializarLista();
            }
        }

        public AddRange(valores: List<T>): void
        {
            for (const valor of valores)
            {
                if (!this.ListaInterna.Contains(valor))
                {
                    this.ListaInterna.Add(valor);
                }
            }
            this.SerializarLista();
        }

        public Clear(): void
        {
            this.ListaInterna.Clear();
            this.SerializarLista();
        }

        public Remove(valor: T): boolean
        {
            const resultado = this.ListaInterna.Remove(valor);
            this.SerializarLista();
            return resultado;
        }

        private SerializarLista(): void
        {
            this.Json = JSON.stringify(this.ListaInterna);
        }

        private DeserilizarLista(): void
        {
            this.ListaInterna.Clear();
            if (!String.IsNullOrEmpty(this._json))
            {
                const valoresTipado = JSON.parse(this.Json);
                if (valoresTipado instanceof Array)
                {
                    this.ListaInterna.AddRange(valoresTipado);
                }
            }
        }

        private RetornarJsonNormalizado(json: string): string
        {
            if (String.IsNullOrWhiteSpace(json))
            {
                return JSON.stringify([]);
            }
            return json;
        }


        public ToList(): List<T>
        {
            return this.ListaInterna.ToList(true);
        }
    }
}