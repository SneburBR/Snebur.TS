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

        private __Obetos: any;
        private _length: number

        public get Length(): number
        {
            return this._length;
        }

        public get Chaves(): Array<TChave>
        {
            return Object.keysBase(this.__Obetos).ToList<TChave>();
        }

        public get Valores(): Array<TItem>
        {
            const valores = new Array<TItem>();
            for (const chave of this.Chaves)
            {
                const item = this.__Obetos[chave];
                valores.Add(item);
            }
            return valores;
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
            this._length = 0;
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
            this._length += 1;
            this.EventoItemAlterado.Notificar(this, new ItemDicionarioAlteradoEventArgs(chave, item, EnumAcaoItemAlterado.Adicionado));
        }

        public TryRemove(chave: TChave): boolean
        {
            const item = this.__Obetos[chave];
            if (item !== undefined)
            {
                delete this.__Obetos[chave];
                this._length -= 1;

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
            this._length -= 1;
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
            }
            this.__Obetos = {};
            this._length = 0;
        };

        public Primeiro(): TItem
        {
            let primeiraChave = this.Chaves[0];
            if (primeiraChave == null)
            {
                throw new Erro("O dicionario está vazio", this);
            }
            return this.Item(primeiraChave)
        }

        public Ultimo(): TItem
        {
            let ultimaChave = this.Chaves[this.Count - 1];
            if (ultimaChave == null)
            {
                throw new Erro("O dicionario está vazio", this);
            }
            return this.Item(ultimaChave)
        }

        public Pegar(chave: TChave): TItem
        {
            let item = this.Item(chave);
            this.Remover(chave);
            return item;
        }

        public PegarPrimeiro(): TItem
        {
            if (this.Count > 0)
            {
                let primeiraChave = Object.keys(this.__Obetos)[0] as TChave;
                let primeiroItem = this.Item(primeiraChave);
                this.Remover(primeiraChave);
                return primeiroItem;
            }
            return null;
        }

        public PegarMeio(): TItem
        {
            let total = this.Count;
            if (total > 0)
            {
                let posicao = Math.floor(total / 2);
                let chave = Object.keys(this.__Obetos)[posicao] as TChave;
                let itemMeio = this.Item(chave);
                this.Remover(chave);
                return itemMeio;
            }
            return null;
        }

        public PegarUltimo(): TItem
        {
            let total = this.Count;
            if (total > 0)
            {
                let ultimaChave = Object.keys(this.__Obetos)[total - 1] as TChave;
                let ultimoItem = this.Item(ultimaChave);
                this.Remover(ultimaChave);
                return ultimoItem;
            }
            return null;
        }


        public PegarAleatorio(): TItem
        {
            let total = this.Count;
            if (total > 0)
            {
                let posicao = Math.floor(u.RandomUtil.RetornarRandom(total - 1));
                let chave = Object.keys(this.__Obetos)[posicao] as TChave;
                let itemAleatorio = this.Item(chave);
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
                for (let chave of dicionarioOuArrayParChaveValor.Chaves)
                {
                    if (!this.ContainsKey(chave))
                    {
                        let valor = dicionarioOuArrayParChaveValor.Item(chave);
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
                for (let chave of dicionarioOuArrayParChaveValor.Chaves)
                {
                    let valor = dicionarioOuArrayParChaveValor.Item(chave);
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
            this._length = this.Chaves.length;
            return this._length;
        }

        public Item(chave: TChave): TItem
        public Item<TTipoItem extends TItem>(chave: TChave, construtor: IConstrutor<TTipoItem>): TTipoItem
        public Item(chave: TChave, construtor?: Function): TItem
        {
            let item = this.__Obetos[chave];
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

                let nomeTipoItem = u.ReflexaoUtil.RetornarNomeTipo(item);
                let nomeTipoConstrutor = u.ReflexaoUtil.RetornarNomeTipo(construtor);

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
            let item = this.__Obetos[chave];
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
            let array = new Array<TItem>();
            let chaves = this.Chaves;
            let len = chaves.length;
            for (let i = 0; i < len; i++)
            {
                let chave = chaves[i];
                array.Add(this.Item(chave));
            }
            return array;
        }

        public ToArrayChaveValor(): Array<ParChaveValorSimples<TItem>>
        {
            let lista = new Array<ParChaveValorSimples<TItem>>();
            let chaves = this.Chaves;
            let len = chaves.length;

            for (let i = 0; i < len; i++)
            {
                let chave = chaves[i];
                let valor = this.__Obetos[chave] as TItem;
                lista.Add(new ParChaveValorSimples(chave.toString(), valor));
            }
            return lista;
        }

        public ToListaObservacao(): ListaObservacao<TItem>
        {
            let lista = new ListaObservacao<TItem>();
            let chaves = this.Chaves;
            let len = chaves.length;
            for (let i = 0; i < len; i++)
            {
                let chave = chaves[i];
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
                let primeiro = this.Primeiro();
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
            return item
        }
    }

    DicionarioSimples.__CaminhoTipo = "TipoDicionario";
}