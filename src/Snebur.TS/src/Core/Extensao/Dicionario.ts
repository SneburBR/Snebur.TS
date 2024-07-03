namespace Snebur
{
    export abstract class BaseDicionario<TChave extends TipoItemLista = string, TItem = any> implements ITipo<Snebur.Reflexao.TipoDicionario>, IClone<BaseDicionario<TChave, TItem>>
    {
        private __hashCode: number;

        public abstract __RetornarTipo(): r.TipoDicionario;

        public abstract GetType(): r.TipoDicionario;

        public GetHashCode(): number
        {
            if (!this.__hashCode)
            {
                this.__hashCode = Objeto.RetornarNovoHashCode();
            }
            return this.__hashCode;
        }

        public abstract Clone(): BaseDicionario<TItem, TChave>;
        public abstract Clone(isClonarItens: boolean): BaseDicionario<TItem, TChave>;
    }

    export type TipoItemLista = string | number | Date | object | Snebur.Objeto | d.IEntidade | { [key: string]: any };

    export class DicionarioSimples<TItem = any, TChave extends string | number = string> extends BaseDicionario<TChave, TItem>
    {
        private _chaves: TChave[];
        private _valores: TItem[];

        private __Obetos: any;
        private __length: number

        public get Length(): number
        {
            return this.__length;
        }
        private set Length(value: number)
        {
            this.__length = value;
            this._chaves = null;
            this._valores = null;
        }

        public get Chaves(): Array<TChave>
        {
            if (this._chaves == null)
            {
                this._chaves = Object.keysBase(this.__Obetos).ToList<TChave>();
            }
            return this._chaves;
        }

        public get Valores(): Array<TItem>
        {
            if (this._valores == null)
            {
                this._valores = this.ToArray();
            }
            return this._valores;
        }

        public get ParesChaveValor(): List<ParChaveValorTipada<TChave, TItem>>
        {
            const retorno = new List<ParChaveValorTipada<TChave, TItem>>();
            const chaves = this.Chaves;
            for (const chave of chaves)
            {
                const item = this.__Obetos[chave];
                retorno.Add(new ParChaveValorTipada(chave, item));
            }
            return retorno;
        }

        public readonly EventoItemAlterado = new Evento<ItemDicionarioAlteradoEventArgs>(this);

        public constructor()
        public constructor(obj: any)
        public constructor(obj: any = null)
        {
            super();
            this.Length = 0;
            this.__Obetos = {};

            if (obj != null)
            {
                const chaves = Object.keys(obj);
                for (const chave of chaves)
                {
                    const valor = (obj as any)[chave];
                    if (u.ValidacaoUtil.IsDefinido(valor))
                    {
                        this.Add(chave as TChave, valor);
                    }
                }
            }
        }

        public Adicionar(chave: TChave, item: TItem): void
        {
            if (this.Existe(chave))
            {
                throw new Erro(`A chave '${chave}' já existe no dicionario`, this);
            }
            this.__Obetos[chave] = item;
            this.Length += 1;
            this.EventoItemAlterado.Notificar(this, new ItemDicionarioAlteradoEventArgs(chave, item, EnumAcaoItemAlterado.Adicionado));
        }

        public TryRemove(chave: TChave): boolean
        {
            const item = this.__Obetos[chave];
            if (item !== undefined)
            {
                delete this.__Obetos[chave];
                this.Length -= 1;

                this.EventoItemAlterado.Notificar(this, new ItemDicionarioAlteradoEventArgs(chave, item, EnumAcaoItemAlterado.Removido));
                return true;
            }
            return false;
        }

        public Remover(chave: TChave): boolean
        {
            const item = this.__Obetos[chave];
            if (item === undefined)
            {
                console.warn(`A chave '${chave}' não foi encontrada  no dicionário`, this);
                return false;
            }
            this.Length -= 1;
            delete this.__Obetos[chave];
            this.EventoItemAlterado.Notificar(this, new ItemDicionarioAlteradoEventArgs(chave, item, EnumAcaoItemAlterado.Removido));
            return true;
        }

        public Existe(chave: TChave): boolean
        {
            return (this.__Obetos[chave] !== undefined);
            // 2 vezes mais rápido q que usar this.__Obetos.hasOwnProperty(chave)
        }

        public Limpar(): void
        {
            for (const chave in this.__Obetos)
            {
                /*eslint-disable*/
                if (this.__Obetos.hasOwnProperty(chave))
                {
                    this.EventoItemAlterado.Notificar(this, new ItemDicionarioAlteradoEventArgs(chave, this.__Obetos[chave], EnumAcaoItemAlterado.Adicionado));
                    delete this.__Obetos[chave];
                }
                /*eslint-enable*/
            }
            this.__Obetos = {};
            this.Length = 0;
        }

        public Primeiro(): TItem
        {
            const primeiraChave = this.Chaves[0];
            if (primeiraChave == null)
            {
                throw new Erro("O dicionario está vazio", this);
            }
            return this.Item(primeiraChave);
        }

        public Ultimo(): TItem
        {
            const ultimaChave = this.Chaves[this.Count - 1];
            if (ultimaChave == null)
            {
                throw new Erro("O dicionario está vazio", this);
            }
            return this.Item(ultimaChave);
        }

        public Pegar(chave: TChave): TItem
        {
            const item = this.Item(chave);
            this.Remover(chave);
            return item;
        }

        public PegarPrimeiro(): TItem
        {
            if (this.Count > 0)
            {
                const primeiraChave = Object.keys(this.__Obetos)[0] as TChave;
                const primeiroItem = this.Item(primeiraChave);
                this.Remover(primeiraChave);
                return primeiroItem;
            }
            return null;
        }

        public PegarMeio(): TItem
        {
            const total = this.Count;
            if (total > 0)
            {
                const posicao = Math.floor(total / 2);
                const chave = Object.keys(this.__Obetos)[posicao] as TChave;
                const itemMeio = this.Item(chave);
                this.Remover(chave);
                return itemMeio;
            }
            return null;
        }

        public PegarUltimo(): TItem
        {
            const total = this.Count;
            if (total > 0)
            {
                const ultimaChave = Object.keys(this.__Obetos)[total - 1] as TChave;
                const ultimoItem = this.Item(ultimaChave);
                this.Remover(ultimaChave);
                return ultimoItem;
            }
            return null;
        }


        public PegarAleatorio(): TItem
        {
            const total = this.Count;
            if (total > 0)
            {
                const posicao = Math.floor(u.RandomUtil.RetornarRandom(total - 1));
                const chave = Object.keys(this.__Obetos)[posicao] as TChave;
                const itemAleatorio = this.Item(chave);
                this.Remover(chave);
                return itemAleatorio;
            }
            return null;
        }

        public TryAdd(chave: TChave, objeto: TItem): void
        {
            if (!this.ContainsKey(chave))
            {
                this.Adicionar(chave, objeto);
            }
        }

        public Add(chave: TChave, objeto: TItem): void
        {
            this.Adicionar(chave, objeto);
        }

        public AddOrUpdate(chave: TChave, objeto: TItem): void
        {
            if (this.ContainsKey(chave))
            {
                this.AtribuirItem(chave, objeto);
                return;
            }
            this.Adicionar(chave, objeto);
        }

        public AddRange(dicionarioOuArrayParChaveValor: DicionarioSimples<TItem, TChave> | ParChaveValorTipada<TChave, TItem>[])
        {
            if (dicionarioOuArrayParChaveValor == null)
            {
                return;
            }

            if (dicionarioOuArrayParChaveValor instanceof DicionarioSimples)
            {
                for (const chave of dicionarioOuArrayParChaveValor.Chaves)
                {
                    if (!this.ContainsKey(chave))
                    {
                        const valor = dicionarioOuArrayParChaveValor.Item(chave);
                        this.Add(chave, valor);
                    }
                }
            }
            else if (Array.isArray(dicionarioOuArrayParChaveValor))
            {
                for (const parChaveValor of dicionarioOuArrayParChaveValor)
                {
                    if (!this.ContainsKey(parChaveValor.Chave))
                    {
                        this.Add(parChaveValor.Chave, parChaveValor.Valor);
                    }
                }
            }
            else
            {
                throw new Erro(` O tipo ${u.ReflexaoUtil.RetornarNomeTipo(dicionarioOuArrayParChaveValor)} não é suportado`);
            }
        }

        public AddRangeOrUpdate(dicionarioOuArrayParChaveValor: DicionarioSimples<TItem, TChave> | ParChaveValorTipada<TChave, TItem>[])
        {
            if (dicionarioOuArrayParChaveValor == null)
            {
                return;
            }

            if (dicionarioOuArrayParChaveValor instanceof DicionarioSimples)
            {
                for (const chave of dicionarioOuArrayParChaveValor.Chaves)
                {
                    const valor = dicionarioOuArrayParChaveValor.Item(chave);
                    this.AddOrUpdate(chave, valor);
                }
            }

            else if (Array.isArray(dicionarioOuArrayParChaveValor))
            {
                for (const parChaveValor of dicionarioOuArrayParChaveValor)
                {
                    this.AddOrUpdate(parChaveValor.Chave, parChaveValor.Valor);
                }
            }
            else
            {
                throw new Erro(` O tipo ${u.ReflexaoUtil.RetornarNomeTipo(dicionarioOuArrayParChaveValor)} não é suportado`);
            }
        }

        public RemoveAll(chaves: TChave[]): void
        {
            for (const chave of chaves)
            {
                this.TryRemove(chave);
            }
        }

        public Remove(chave: TChave): boolean
        {
            return this.Remover(chave);
        }

        public get Count(): number
        {
            return this.Length;
        }

        public Item(chave: TChave): TItem
        public Item<TTipoItem extends TItem>(chave: TChave, construtor: IConstrutor<TTipoItem>): TTipoItem
        public Item(chave: TChave, construtor?: Function): TItem
        {
            const item = this.__Obetos[chave];
            if (item === undefined)
            {
                throw new Erro("Chave não foi encontrada " + chave, this);
            }
            if (u.ValidacaoUtil.IsFunction(construtor))
            {
                if (item instanceof construtor)
                {
                    return item as TItem;
                }

                const nomeTipoItem = u.ReflexaoUtil.RetornarNomeTipo(item);
                const nomeTipoConstrutor = u.ReflexaoUtil.RetornarNomeTipo(construtor);

                throw new Erro(`O item '${nomeTipoItem}' não é do tipo '${nomeTipoConstrutor}'`);
            }
            return item;
        }

        public AdicionarOuAtribuir(chave: TChave, item: TItem): void
        {
            if (this.ContainsKey(chave))
            {
                this.AtribuirItem(chave, item);
            }
            else
            {
                this.Add(chave, item);
            }
        }

        public AtribuirItem(chave: TChave, item: TItem): void
        {
            if (!this.Existe(chave))
            {
                throw new Erro("Chave não foi encontrada " + chave, this);
            }
            this.__Obetos[chave] = item;
        }

        public TryItem(chave: TChave): TItem | null
        public TryItem(chave: TChave, valorPadrao: TItem): TItem | null
        public TryItem(chave: TChave, valorPadrao: TItem = null): TItem | null
        {
            const item = this.__Obetos[chave];
            if (u.ValidacaoUtil.IsDefinido(item))
            {
                return item;
            }
            return valorPadrao;
        }

        public First(): TItem
        {
            return this.Primeiro();
        }

        public FirstOrDefault(): TItem
        {
            if (this.Count > 0)
            {
                return this.Primeiro();
            }
            return null;
        }

        public Last(): TItem
        {
            return this.Ultimo();
        }

        public LastOrDefault(): TItem
        {
            if (this.Count > 0)
            {
                return this.Ultimo();
            }
            return null;
        }

        public Pop(): TItem
        {
            return this.PegarUltimo();
        }

        public Shift(): TItem
        {
            return this.PegarPrimeiro();
        }

        public Clear(): void
        {
            this.Limpar();
        }

        public ContainsKey(chave: TChave)
        {
            return this.Existe(chave);
        }

        public ToArray(): Array<TItem>
        {
            const array = new Array<TItem>();
            const chaves = this.Chaves;
            for (let i = 0; i < chaves.length; i++)
            {
                const chave = chaves[i];
                array.push(this.Item(chave));
            }
            return array;
        }

        public ToArrayChaveValor(): Array<ParChaveValorSimples<TItem>>
        {
            const lista = new Array<ParChaveValorSimples<TItem>>();
            const chaves = this.Chaves;

            for (let i = 0; i < chaves.length; i++)
            {
                const chave = chaves[i];
                const valor = this.__Obetos[chave] as TItem;
                lista.Add(new ParChaveValorSimples(chave.toString(), valor));
            }
            return lista;
        }

        public ToListaObservacao(): ListaObservacao<TItem>
        {
            const lista = new ListaObservacao<TItem>();
            const chaves = this.Chaves;
            const len = chaves.length;
            for (let i = 0; i < len; i++)
            {
                const chave = chaves[i];
                lista.Add(this.Item(chave));
            }
            return lista;
        }
        //#region ITipo

        public __RetornarTipo(): Snebur.Reflexao.TipoDicionario
        {
            if (this.Count === 0)
            {
                return $Reflexao.TipoDicionarioVazio;
            } else
            {
                const primeiro = this.Primeiro();
                return new r.TipoDicionario(primeiro.GetType());
            }
        }

        public GetType(): Snebur.Reflexao.TipoDicionario
        {
            return this.__RetornarTipo();
        }

        //#endregion

        public override Clone(isClonarItens: boolean = false): DicionarioSimples<TItem, TChave>
        {
            const clone = new DicionarioSimples<TItem, TChave>();
            for (const chave of this.Chaves)
            {
                const item = this.RetornarItem(this.Item(chave), isClonarItens);
                clone.Add(chave, item);
            }
            return clone;
        }

        private RetornarItem<TItem>(item: TItem, isClonarItens: boolean): any
        {
            if (isClonarItens)
            {
                if (typeof (item as IClone).Clone === "function")
                {
                    return (item as IClone).Clone();
                }
            }
            return item;
        }

        public override Equals(obj: any): boolean
        {
            if (obj instanceof DicionarioSimples)
            {
                if (obj === this)
                {
                    return true;
                }

                const thisChaves = this.Chaves;
                const thisValores = this.Valores;

                const objChaves = obj.Chaves;
                const objValores = obj.Valores;

                return objChaves.length === thisChaves.length
                    && objValores.length === thisValores.length
                    && objChaves.every((chave, index) => chave === thisChaves[index])
                    && objValores.every((valor, index) => Util.IsIgual(valor, thisValores[index]));

            }
            return false;
        }
    }

    DicionarioSimples.__CaminhoTipo = "TipoDicionario";
}