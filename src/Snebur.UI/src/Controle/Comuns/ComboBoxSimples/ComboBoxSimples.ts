namespace Snebur.UI
{
    export class ComboBoxSimples<T extends string | number | Objeto = Objeto> extends Snebur.UI.BaseControle implements IControleLista, IControleEventoValorAlterado<T>
    {
        private _lista: ListaObservacao<T> = null;
        private ValorAtributoExibicao: string;

        public ElementoSelect: HTMLSelectElement;

        private readonly ItensElemento = new DicionarioTipado<string, [T, HTMLOptionElement]>();

        private IsEnum: boolean = false;
        private ConstrutorEnum: object;

        public get Lista(): ListaObservacao<T>
        {
            return this._lista;
        }
        public set Lista(value: ListaObservacao<T>)
        {
            if (this._lista instanceof Array)
            {
                this.RemoverManipuladoresListaObservacao();
            }
            this._lista = value;
            this.AdicionarManipuladoresListaObservacao();
            this.InicializarLista();
        }

        public get Valor(): T
        {
            if (this.ElementoSelect instanceof HTMLElement && this.ElementoSelect.selectedIndex >= 0)
            {
                const chave = this.ElementoSelect.options[this.ElementoSelect.selectedIndex].value;
                if (this.ItensElemento.ContainsKey(chave))
                {
                    /*eslint-disable*/
                    const [item, elemento] = this.ItensElemento.Item(chave);
                    return item;
                    /*eslint-enable*/
                }
            }
            return null;
        }

        public set Valor(value: T)
        {
            this.SelecionarValor(value);
        }

        private SelecionarValor(value: T): void
        {
            if (u.ValidacaoUtil.IsDefinido(value))
            {
                if (this.Valor !== value)
                {
                    const resultado = this.SelecionarItem(value);
                    if (!resultado)
                    {
                        const valores = this.ItensElemento.ToArray();
                        for (const itens of valores)
                        {
                            /*eslint-disable*/
                            const [item, elemento] = itens;
                            if (u.Util.IsIgual(item, value))
                            {
                                this.SelecionarItem(item);
                                break;
                            }
                            /*eslint-enable*/
                        }
                    }
                }
            }
        }

        private SelecionarItem(item: T): boolean
        {
            const chave = this.RetornarChave(item);
            if (this.ItensElemento.ContainsKey(chave))
            {
                /*eslint-disable*/
                const [item, elemento] = this.ItensElemento.Item(chave);
                elemento.selected = true;
                this.NotificarEventoValorAlterado();
                return true;
                /*eslint-enable*/
            }
            return false;
        }

        public readonly EventoValorAlterado: Evento<ValorAlteradoEventArgs<T>>;

        public constructor(controlePai: Snebur.UI.BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.CssClasseControle = "sn-combobx-simples";
            this.EventoValorAlterado = new Evento<ValorAlteradoEventArgs<T>>(this);
        }

        public AtualizarExibicao(item: T, descricao: string)
        {
            const chave = this.RetornarChave(item);
            if (this.ItensElemento.ContainsKey(chave))
            {
                const [_item, elemento] = this.ItensElemento.Item(chave);
                elemento.innerHTML = descricao;
            }
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            this.ElementoSelect = this.ElementoSelect = document.createElement("select");
            this.ElementoSelect.className = "elemento-select";
            this.ElementoApresentacao.appendChild(this.ElementoSelect);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.ValorAtributoExibicao = this.RetornarValorAtributo(AtributosHtml.Exibicao);
            this.AdicionarEventoDom(ui.EnumEventoDom.Change, this.ElementoSelect_Change, this.ElementoSelect);
            this.IsEnum = this.ValorAtributoExibicao === "Enum";
            if (this.IsEnum)
            {
                this.InicializarEnum();
            }
        }


        private InicializarEnum(): void
        {
            const caminhoEnum = this.RetornarValorAtributo(AtributosHtml.Tipo);
            if (String.IsNullOrWhiteSpace(caminhoEnum))
            {
                throw new Error("O caminho do tipo do enum no combobox não foi definido");
            }
            this.ConstrutorEnum = u.ReflexaoUtil.RetornarConstrutorEnum(caminhoEnum);
            if (!this.ConstrutorEnum)
            {
                throw new Erro("Não foi encontrado o caminho do enum" + caminhoEnum);
            }

            const valores = u.EnumUtil.RetornarValoresEnum(this.ConstrutorEnum).ToList<T>().ToListaObservacao();
            this.Lista = valores;
        }

        private ElementoSelect_Change(e: Event): void
        {
            this.NotificarEventoValorAlterado();
        }

        //#region Manipuladores

        private AdicionarManipuladoresListaObservacao(): void
        {
            if (this.Lista instanceof Array && ListaUtil.IsListaObservacao( this.Lista))
            {
                this.Lista.EventoItemAdicionado.AddHandler(this.Lista_ItemAdicionado, this);
                this.Lista.EventoItemInserido.AddHandler(this.Lista_ItemInserido, this);
                this.Lista.EventoItemRemovido.AddHandler(this.Lista_ItemRemovido, this);
            }
        }

        private RemoverManipuladoresListaObservacao(): void
        {
            if (this.Lista instanceof Array && ListaUtil.IsListaObservacao(this.Lista))
            {
                this.Lista.EventoItemAdicionado.RemoveHandler(this.Lista_ItemAdicionado, this);
                this.Lista.EventoItemInserido.RemoveHandler(this.Lista_ItemInserido, this);
                this.Lista.EventoItemRemovido.RemoveHandler(this.Lista_ItemRemovido, this);
            }
        }

        private Lista_ItemAdicionado(provedor:any, e: ItemEventArgs): void
        {
            this.AdicionarItem(e.Item);
        }

        private Lista_ItemInserido(provedor: any,e: InserirItemEventArgs): void
        {
            throw new ErroNaoImplementado("Não implementa para inserir o item, chame o pai");
        }

        private Lista_ItemRemovido(provedor: any,e: ItemEventArgs): void
        {
            this.RemoverItem(e.Item);
        }

        //#endregion

        private InicializarLista(): void
        {
            if (this.IsControleInicializado)
            {
                ElementoUtil.LimparElementosFilho(this.ElementoSelect);
                this.ItensElemento.Clear();
                if (this.Lista instanceof Array)
                {
                    for (const item of this.Lista)
                    {
                        this.AdicionarItem(item);
                    }
                }
            }
        }

        private AdicionarItem(item: T): void
        {
            const chave = this.RetornarChave(item);
            if (!this.ItensElemento.ContainsKey(chave))
            {
                const elementoItem = document.createElement("option");
                elementoItem.value = item.toString();
                elementoItem.innerHTML = this.RetornarValorExibicao(item);

                this.ElementoSelect.appendChild(elementoItem);
                this.ItensElemento.Add(chave, [item, elementoItem]);
            }
        }

        private RemoverItem(item: any): void
        {
            const chave = this.RetornarChave(item);
            if (this.ItensElemento.ContainsKey(item))
            {
                /*eslint-disable*/
                const [item, elementoItem] = this.ItensElemento.Item(chave);
                this.ItensElemento.Remove(chave);
                this.ElementoSelect.removeChild(elementoItem);
                /*eslint-enable*/
            }
        }

        private RetornarChave(item: T): string
        {
            if (!u.ValidacaoUtil.IsDefinido(item))
            {
                throw new ErroNaoDefinido("O item não foi definido");
            }
            return item.toString();
        }

        private RetornarValorExibicao(item: any): string
        {
            if (this.IsEnum)
            {
                return u.EnumUtil.RetornarRotulo(this.ConstrutorEnum, item);
            }
            else
            {
                if (this.ValorAtributoExibicao)
                {
                    if (this.ValorAtributoExibicao === ".")
                    {
                        return ConverterUtil.ParaString(item);
                    }
                    //throw new ErroNaoImplementado("exibição não implementada");
                    return u.ReflexaoUtil.RetornarValorPropriedade(item, this.ValorAtributoExibicao);
                }
            }
            return item.toString();

        }

        private NotificarEventoValorAlterado(): void
        {
            const args = new ValorAlteradoEventArgs(this.Valor);
            this.EventoValorAlterado.Notificar(this, args);
        }
    }




}

