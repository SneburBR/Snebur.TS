
namespace Snebur
{
    export class ListaObservacaoIndexada<T = any, TChave = string | number> extends ListaObservacao<T>
    {
        private readonly Dicionario = new DicionarioSimples<T>();
        public readonly FuncaoValidarNovoItem: (item: T) => boolean = () => { return true; }
        private readonly ExpressaoChave: (item: T) => TChave;

        // BUG NO TYPESCRIPT AO COMPILAR OBJETOS Q FAZEM HERANÇA DE ARRAY - esse bug começou aparecer a partir da versão 2.4 -
        // caso se corrigido, remover as declarações do prototype e deixar somente os métodos

        private readonly AdicionarIndexadoInterno = ListaObservacaoIndexada.prototype.AdicionarIndexadoInterno_Prototype.bind(this);
        private readonly ExisteItemIndexadoInterno = ListaObservacaoIndexada.prototype.ExisteItemIndexadoInterno_Prototype.bind(this);
        private readonly RemoverItemIndexadoInterno = ListaObservacaoIndexada.prototype.RemoverItemIndexadoInterno_Prototype.bind(this);

        private readonly ItemInterno = ListaObservacaoIndexada.prototype.Item.bind(this);
        private readonly ItemOrDefaultInterno = ListaObservacaoIndexada.prototype.ItemOrDefault.bind(this);


        /*public AddRangeAsync: (itens: T[], intervalo?: number) => void = ListaObservacaoIndexada.prototype.AddRangeAsync_Prototype.bind(this);*/
        //public ContainsKey :(chave:TChave) => boolean = ListaObservacaoIndexada.prototype.ContainsKey_Prototype.bind(this);

        private RetornarChave = ListaObservacaoIndexada.prototype.RetornarChave_Prototype.bind(this);

        public constructor(expressaoChave: (item: T) => TChave)
        {
            super();
            this.ExpressaoChave = expressaoChave;
            this._tipoLista = EnumTipoLista.ListaObservacaoIndexada;
        }

 

        private ExisteItemIndexadoInterno_Prototype(item: T): boolean
        {
            const chave = this.RetornarChave(item);
            return this.Dicionario.ContainsKey(chave);
        }

        private AdicionarIndexadoInterno_Prototype(item: T, posicao: number = -1): number
        {
            if (this.FuncaoValidarNovoItem(item))
            {
                const chave = this.RetornarChave(item);
                if (this.Dicionario.ContainsKey(chave))
                {
                    throw new Erro("O item ja está na lista chave + " + chave);
                }
                this.Dicionario.Add(chave, item);
                if (posicao >= 0)
                {
                    return ListaObservacao.Inserir(this, posicao, item);
                }
                else
                {
                    return ListaObservacao.Adicionar(this, item);
                }

            }
            return this.length;
        }

        private RemoverItemIndexadoInterno_Prototype(item: T): boolean
        {
            const chave = this.RetornarChave(item);
            if (!this.Dicionario.ContainsKey(chave))
            {
                throw new Erro("O item não ja está na lista chave + " + chave);
            }
            this.Dicionario.Remove(chave);
            return ListaObservacao.Remover(this, item);
        }

        private RetornarChave_Prototype(item: T): string 
        {
            const chave = this.ExpressaoChave(item);
            if ($Configuracao.IsDebug)
            {
                if (!(typeof chave === "string" || typeof chave === "number"))
                {
                    throw new Erro("O tipo da chave não valido");
                }
            }
            if (!u.ValidacaoUtil.IsDefinido(chave))
            {
                throw new Erro("A chave não foi definido");
            }
            return chave.toString();
        }

        public Item(chave: TChave): T
        {
            return this.Dicionario.Item(chave.toString());
        }

        public ItemOrDefault(chave: TChave): T
        {
            return this.Dicionario.TryItem(chave.toString());
        }

        //#region Métodos estaticos

        public static ExisteIndexado(lista: ListaObservacaoIndexada<any>, item: any): boolean
        {
            lista.ListaNovaAlteradaInterno();
            return lista.ExisteItemIndexadoInterno(item);
        }

        public static AdicionarItemIndexado(lista: ListaObservacaoIndexada<any>, item: any): number
        {
            return lista.AdicionarIndexadoInterno(item);
        }

        public static InserirItemIndexado(lista: ListaObservacaoIndexada<any>, posicao: number, item: any): number
        {
            return lista.AdicionarIndexadoInterno(item, posicao);
        }

        public static RemoverItemIndexado(lista: ListaObservacaoIndexada<any>, item: any): boolean
        {
            return lista.RemoverItemIndexadoInterno(item);
        }

        public static ItemIndexado(lista: ListaObservacaoIndexada<any>, chave: string | number): boolean
        {
            return lista.ItemInterno(chave);
        }

        public static ItemOrDefaultIndexado(lista: ListaObservacaoIndexada<any>, chave: string | number): boolean
        {
            return lista.ItemOrDefaultInterno(chave);
        }

        //#endregion

    }




}