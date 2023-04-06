namespace Snebur
{
    //class DicionarioTipado<TChave extends TipoItemLista, TItem =any> implements ITipo<Snebur.Reflexao.TipoDicionario>
    export class DicionarioTipado<TChave extends TipoItemLista, TItem> implements ITipo<Snebur.Reflexao.TipoDicionario>
    {
        private __hashCode: number;
        private __Obetos: any;
        private __ItensChaves: any;
        private _length: number;

        public get Length(): number
        {
            return this._length;
        }

        private get ChavesInterna(): Array<string>
        {
            return Object.keysBase(this.__Obetos).ToList<string>();
        }

        public get Chaves(): Array<TChave>
        {
            const chaves = new Array<TChave>();
            const chavesInterna = this.ChavesInterna;
            for (const chaveInterna of chavesInterna)
            {
                const item = this.__ItensChaves[chaveInterna];
                chaves.Add(item);
            }
            return chaves;
        }

        public get Valores(): Array<TItem>
        {
            const valores = new Array<TItem>();
            const chavesInterna = this.ChavesInterna;
            for (const chaveInterna of chavesInterna)
            {
                const item = this.__Obetos[chaveInterna];
                valores.Add(item);
            }
            return valores;
        }

        public get ParesChaveValor(): List<ParChaveValorTipada<TChave, TItem>>
        {
            const retorno = new List<ParChaveValorTipada<TChave, TItem>>();
            const chavesInterna = this.ChavesInterna;
            for (const chaveInterna of chavesInterna)
            {
                const item = this.__Obetos[chaveInterna];
                const itemChave = this.__ItensChaves[chaveInterna];
                retorno.Add(new ParChaveValorTipada(itemChave, item));
            }

            return retorno;
        }

        private readonly PropriedadeChave: string;

        public constructor()
        {
            this._length = 0;
            this.__Obetos = {};
            this.__ItensChaves = {};
            this.PropriedadeChave = `__chave_${this.GetHashCode()}__`; 
        }

        private RetornarChaveInterna(chave: TChave): string
        {
            if (chave === null)
            {
                return "null";
            }

            if (chave instanceof Entidade)
            {
                if (chave.Id === 0 && (chave as any)[this.PropriedadeChave] == null)
                {
                    (chave as any)[this.PropriedadeChave] = `${chave.GetType().Nome}-${chave.GetHashCode()}`;
                    return (chave as any)[this.PropriedadeChave];
                }
                else
                {
                    if ((chave as any)[this.PropriedadeChave] != null)
                    {
                        return (chave as any)[this.PropriedadeChave];
                    }
                }
            }

            if (typeof chave.GetHashCode === "function")
            {
                return `${chave.GetType().Nome}-${chave.GetHashCode()}`;
            }
            return `${chave.GetType().Nome}-${chave.toString()}`;
        }

        public Adicionar(chave: TChave, objeto: TItem): void
        {
            const chaveInterna = this.RetornarChaveInterna(chave);
            if (this.ExisteChaveInterna(chaveInterna))
            {
                throw new Erro(`A chave '${chave}' já existe no dicionario`, this);
            }

            this.__Obetos[chaveInterna] = objeto;
            this.__ItensChaves[chaveInterna] = chave;

            this._length += 1;
        }

        public TryRemove(chave: TChave): boolean
        {
            const chaveInterna = this.RetornarChaveInterna(chave);
            const item = this.__Obetos[chaveInterna];
            if (item !== undefined)
            {
                delete this.__Obetos[chaveInterna];
                delete this.__ItensChaves[chaveInterna];
                this._length -= 1;
                return true;
            }
            return false;
        }

        public Remover(chave: TChave): void
        {
            const chaveInterna = this.RetornarChaveInterna(chave);
            this.RemoverInterno(chaveInterna);
        }

        private ExisteChaveInterna(chaveInterna: string)
        {
            return (this.__Obetos[chaveInterna] !== undefined);
        }

        private RemoverInterno(chaveInterna: string)
        {
            const item = this.__Obetos[chaveInterna];
            if (item === undefined)
            {
                throw new Erro("Chave não foi encontrada " + chaveInterna, this);
            }
            this._length -= 1;
            delete this.__Obetos[chaveInterna];
            delete this.__ItensChaves[chaveInterna];
        }
        public Existe(chave: TChave): boolean
        {
            if (chave === undefined)
            {
                throw new Erro("A chave não foi definida");
            }

            const chaveInterna = this.RetornarChaveInterna(chave);
            return this.ExisteChaveInterna(chaveInterna);
        }

        public Limpar(): void
        {
            for (const chave in this.__Obetos)
            {
                /*eslint-disable*/
                if (this.__Obetos.hasOwnProperty(chave))
                {
                    delete this.__Obetos[chave];
                }
            }
            for (let chave in this.__ItensChaves)
            {
                /*eslint-disable*/
                if (this.__ItensChaves.hasOwnProperty(chave))
                {
                    delete this.__ItensChaves[chave];
                }
            }

            this.__Obetos = {};
            this.__ItensChaves = {};
            this._length = 0;
        };

        public Primeiro(): TItem
        {
            let primeiraChave = this.ChavesInterna[0];
            if (primeiraChave === undefined)
            {
                throw new Erro("O dicionario está vazio", this);
            }
            return this.ItemInterno(primeiraChave)
        }

        public Ultimo(): TItem
        {
            let ultimaChave = this.ChavesInterna[this.Count - 1];
            if (ultimaChave === undefined)
            {
                throw new Erro("O dicionario está vazio", this);
            }
            return this.ItemInterno(ultimaChave)
        }

        public Pegar(chave: TChave): TItem
        {
            let chaveInterna = this.RetornarChaveInterna(chave);
            let item = this.ItemInterno(chaveInterna);
            this.RemoverInterno(chaveInterna);
            return item;
        }

        public PegarPrimeiro(): TItem
        {
            if (this.Count > 0)
            {
                let primeiraChave = this.ChavesInterna[0];
                let primeiroItem = this.ItemInterno(primeiraChave);
                this.RemoverInterno(primeiraChave);
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
                let chaveInterna = this.ChavesInterna[posicao];
                let itemMeio = this.ItemInterno(chaveInterna);
                this.RemoverInterno(chaveInterna);
                return itemMeio;
            }
            return null;
        }

        public PegarUltimo(): TItem
        {
            let total = this.Count;
            if (total > 0)
            {
                let ultimaChave = this.ChavesInterna[total - 1];
                let ultimoItem = this.ItemInterno(ultimaChave);
                this.RemoverInterno(ultimaChave);
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
                let chaveInterna = this.ChavesInterna[posicao];
                let itemAleatorio = this.ItemInterno(chaveInterna);
                this.RemoverInterno(chaveInterna);
                return itemAleatorio;
            }
            return null;
        }

        public Add(chave: TChave, objeto: TItem): void
        {
            this.Adicionar(chave, objeto);
        }

        public Remove(chave: TChave)
        {
            this.Remover(chave);
        }

        public get Count(): number
        {
            this._length = this.ChavesInterna.length;
            return this._length;
        }

        public Item(chave: TChave): TItem
        {
            let chaveInterna = this.RetornarChaveInterna(chave);
            let item = this.__Obetos[chaveInterna];
            if (item === undefined)
            {
                throw new Erro("Chave não foi encontrada " + chave, this);
            }
            return item;
        }

        private ItemInterno(chaveInterna: string)
        {
            let item = this.__Obetos[chaveInterna];
            if (item === undefined)
            {
                throw new Erro("Chave não foi encontrada " + chaveInterna, this);
            }
            return item;
        }


        public AtribuirItem(chave: TChave, item: TItem): void
        {
            let chaveInterna = this.RetornarChaveInterna(chave);
            if (!this.ExisteChaveInterna(chaveInterna))
            {
                throw new Erro("Chave não foi encontrada " + chave, this);
            }
            this.__Obetos[chaveInterna] = item;
            this.__ItensChaves[chaveInterna] = chave;
        }

        public TryItem(chave: TChave): TItem
        public TryItem(chave: TChave, valorPadrao: TItem): TItem
        public TryItem(chave: TChave, valorPadrao: TItem = null): TItem
        {
            if (u.ValidacaoUtil.IsDefinido(chave))
            {
                let chaveInterna = this.RetornarChaveInterna(chave);
                let item = this.__Obetos[chaveInterna];
                if (u.ValidacaoUtil.IsDefinido(chaveInterna))
                {
                    return item;
                }
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
            let chavesInterna = this.ChavesInterna;
            let len = chavesInterna.length;
            for (let i = 0; i < len; i++)
            {
                let chaveInterna = chavesInterna[i];
                array.Add(this.ItemInterno(chaveInterna));
            }
            return array;
        }

        public ToArrayChaveValor(): Array<ParChaveValorTipada<TChave, TItem>>
        {
            let lista = new Array<ParChaveValorTipada<TChave, TItem>>();
            let chavesInterna = this.ChavesInterna;
            let len = chavesInterna.length;

            for (let i = 0; i < len; i++)
            {
                let chaveInterna = chavesInterna[i];
                let valor = this.__Obetos[chaveInterna] as TItem;
                let itemChave = this.__ItensChaves[chaveInterna] as TChave;
                lista.Add(new ParChaveValorTipada(itemChave, valor));
            }
            return lista;
        }

        public ToListaObservacao(): ListaObservacao<TItem>
        {
            let lista = new ListaObservacao<TItem>();
            let chavesInerna = this.ChavesInterna;
            let len = chavesInerna.length;
            for (let i = 0; i < len; i++)
            {
                let chaveInterna = chavesInerna[i];
                lista.Add(this.ItemInterno(chaveInterna));
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

        public GetHashCode(): number
        {
            if (!this.__hashCode)
            {
                this.__hashCode = Objeto.RetornarNovoHashCode();
            }
            return this.__hashCode;
        }

        //#endregion
    }
    DicionarioTipado.__CaminhoTipo = "TipoDicionario";

    
}

