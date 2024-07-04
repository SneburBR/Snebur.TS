namespace Snebur
{
    export class DicionarioEntidade<TChaveEntidade extends Entidade, TItem> implements ITipo<Snebur.Reflexao.TipoDicionario>
    {
        private _length: number;
        private __hashCode: number;

        private readonly DicionarioEntidadeInterno = new DicionarioTipado<TChaveEntidade, TItem>()
        private readonly DicionarioHashCodeEntidade = new DicionarioSimples<TChaveEntidade>();
        private readonly DicionarioHashCodeItem = new DicionarioSimples<TItem>();
        private readonly PropriedadeChave: string;

        public get length(): number
        {
            return this._length;
        }

        public get Count(): number
        {
            return this._length;
        }
        public IsPermitirEntidadesNovas: boolean = false;

        public get ParesChaveValor(): List<ParChaveValorTipada<TChaveEntidade, TItem>>
        {
            const retorno = new List<ParChaveValorTipada<TChaveEntidade, TItem>>();
            const paresChaveValor = this.DicionarioHashCodeEntidade.ParesChaveValor;
            for (const chaveEntidade of paresChaveValor.Select(x => x.Valor))
            {
                const item = this.DicionarioHashCodeItem.Item(this.RetornarChaveInterna(chaveEntidade));
                if (item == null)
                {
                    throw new Erro("O item não está definido");
                }
                retorno.Add(new ParChaveValorTipada(chaveEntidade, item));
            }
            return retorno;
        }

        public get Entidades(): TChaveEntidade[]
        {
          return  this.DicionarioHashCodeEntidade.ParesChaveValor.Select(x => x.Valor);
        }

        public constructor()
        {
            this._length = 0;

            this.PropriedadeChave = `__chave_${this.GetHashCode()}__`;
        }

        private RetornarChaveInterna(chave: TChaveEntidade): string
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
            return `${chave.GetType().Nome}-${chave.GetHashCode()}`;
        }


        public Adicionar(chaveEntidade: TChaveEntidade, objetoItem: TItem): void
        {
            if (chaveEntidade.Id === 0 && !this.IsPermitirEntidadesNovas)
            {
                throw new Erro(`Somente entidades salvas são permitidas no dicionario
                                Para autorizar entidades novas defina IsPermitirEntidadesNovas = true`);
            }

            const chaveHashCode = this.RetornarChaveInterna(chaveEntidade);

            if (this.DicionarioEntidadeInterno.ContainsKey(chaveEntidade) ||
                this.DicionarioHashCodeEntidade.ContainsKey(chaveHashCode))
            {
                throw new Erro(`A chave '${chaveEntidade}' já existe no dicionario`, this);
            }

            if (chaveEntidade.Id > 0)
            {
                this.DicionarioEntidadeInterno.Add(chaveEntidade, objetoItem);
            }

            this.DicionarioHashCodeEntidade.Add(chaveHashCode, chaveEntidade);
            this.DicionarioHashCodeItem.Add(chaveHashCode, objetoItem);
            this._length += 1;
        }


        public TryRemove(chave: TChaveEntidade): boolean
        {
            const chaveHashCode = this.RetornarChaveInterna(chave);

            let isRemoveu: boolean = this.DicionarioEntidadeInterno.TryRemove(chave);

            isRemoveu = isRemoveu || this.DicionarioHashCodeEntidade.TryRemove(chaveHashCode);
            isRemoveu = isRemoveu || this.DicionarioHashCodeItem.TryRemove(chaveHashCode);

            if (isRemoveu)
            {
                this._length -= 1;
                return true;
            }
            return false;
        }

        public Remover(chave: TChaveEntidade): void
        {
            const chaveHashCode = this.RetornarChaveInterna(chave);
            let isRemover = false;
            if (this.DicionarioEntidadeInterno.ContainsKey(chave))
            {
                this.DicionarioEntidadeInterno.Remove(chave);
                isRemover = true;
            }

            if (this.DicionarioHashCodeItem.ContainsKey(chaveHashCode))
            {
                this.DicionarioHashCodeItem.Remove(chaveHashCode);
                isRemover = true;
            }

            if (this.DicionarioHashCodeEntidade.ContainsKey(chaveHashCode))
            {
                this.DicionarioHashCodeEntidade.Remove(chaveHashCode);
                isRemover = true;
            }

            if (isRemover)
            {
                this._length -= 1;
            }
        }

        public Add(chave: TChaveEntidade, objeto: TItem): void
        {
            this.Adicionar(chave, objeto);
        }

        public Remove(chave: TChaveEntidade)
        {
            this.Remover(chave);
        }

        public Item(chave: TChaveEntidade): TItem
        {
            const chaveHashCode = this.RetornarChaveInterna(chave);
            if (this.DicionarioEntidadeInterno.ContainsKey(chave))
            {
                return this.DicionarioEntidadeInterno.Item(chave);
            }

            if (this.DicionarioHashCodeItem.ContainsKey(chaveHashCode))
            {
                return this.DicionarioHashCodeItem.Item(chaveHashCode);
            }

            throw new Erro("Chave não foi encontrada " + chave, this);
        }

        public First(): TItem
        {
            const primerioEntidade = this.DicionarioEntidadeInterno.FirstOrDefault();
            if (primerioEntidade === undefined)
            {
                const primeiroHashCode = this.DicionarioHashCodeItem.FirstOrDefault();
                if (primeiroHashCode === undefined)
                {
                    throw new Erro("O dicionario está vazio");
                }
                return primeiroHashCode;
            }
            return primerioEntidade;
        }

        public Clear(): void
        {
            this.DicionarioEntidadeInterno.Clear();
            this.DicionarioHashCodeItem.Clear();
            this.DicionarioHashCodeEntidade.Clear();
            this._length = 0;
        }

        public ContainsKey(chave: TChaveEntidade)
        {
            const chaveHashCode = this.RetornarChaveInterna(chave);
            return this.DicionarioEntidadeInterno.Existe(chave) ||
                this.DicionarioHashCodeItem.Existe(chaveHashCode);
        }

        public GetType(): Snebur.Reflexao.TipoDicionario
        {
            return this.__RetornarTipo();
        }

        public GetHashCode(): number
        {
            if (!this.__hashCode)
            {
                this.__hashCode = SneburObject.RetornarNovoHashCode();
            }
            return this.__hashCode;
        }

        public __RetornarTipo(): Snebur.Reflexao.TipoDicionario
        {
            if (this.Count === 0)
            {
                return $Reflexao.TipoDicionarioVazio;
            }
            else
            {
                const primeiro = this.First();
                return new r.TipoDicionario(primeiro.GetType());
            }
        }

        //#endregion
    }
    DicionarioEntidade.__CaminhoTipo = "TipoDicionario";

}