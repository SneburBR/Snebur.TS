namespace Snebur.UI
{
    export abstract class Pagina extends ControleApresentacao
    {
        private _parametros = new DicionarioSimples();

        protected _isPropagarBindDataSource: boolean = true;

        public get __Parametros(): DicionarioSimples
        {
            return this._parametros;
        }
        //public ParametrosHistorico: DicionarioSimples<any>;

        public get Navegador(): BaseNavegador
        {
            if (this.ControlePai instanceof BaseNavegador)
            {
                return this.ControlePai;
            }
            throw new Erro("O controle pai não é  do tipo navegador", this);
        }

        public get Rota(): Rota
        {
            if (!this.Navegador.IsHistoricoAtivo)
            {
                return null;
            }
            return this.RetornarRota();
        }

        public get IsPropagarBindDataSource()
        {
            return this._isPropagarBindDataSource;
        }

        public constructor(controlePai: BaseControle)
        {
            super(controlePai);

            if (!(controlePai instanceof BaseNavegador))
            {
                throw new Erro("As paginas deve ser instanciadas dentro do controle navegador, utilize neste caso o controle usuário", this);
            }
        }

        protected override AntesAdicionarElemento(elemento: HTMLElement, elementoDestino: HTMLElement): void
        {
            super.AntesAdicionarElemento(elemento, elementoDestino);
        }

        protected override Inicializar()
        {
            this.AtualizarParametrosPropriedades();
            super.Inicializar();
            //this.ParametrosHistorico = this.RetornarParametrosHash();
        }

        public override NotificarControleCarregado()
        {
            this.AtualizarParametrosPropriedades();
            super.NotificarControleCarregado();
        }

        public AtualizarPagina(): void
        {
            const construtorPagina = (this as any).constructor as IPaginaConstrutor;
            this.Navegador.Navegar(construtorPagina, this.__Parametros);
        }

        //#region Métodos privados

        //private RetornarParametrosHash(): DicionarioSimples<any>
        //{
        //    return u.UrlHistoricoUtil.RetornarParametrosHistorico();
        //}

        //#endregion

        protected override RetornarTagNovoElemento(): string
        {
            return "sn-pagina";
        }

        protected RetornarValorParametro<T extends Snebur.Objeto>(chave: string, construtor: IConstrutor<T>): T;
        protected RetornarValorParametro(chave: string, construtor: IConstrutor<Number>): number;
        protected RetornarValorParametro(chave: string, construtor: IConstrutor<String>): string;
        protected RetornarValorParametro(chave: string, construtor: IConstrutor<Boolean>): boolean;
        protected RetornarValorParametro(chave: string, construtor: IConstrutor<Date>): Date;
        protected RetornarValorParametro<T extends Snebur.Objeto>(chave: string, construtor: IConstrutor<T>, ignorarErro: boolean): T;
        protected RetornarValorParametro(chave: string, construtor: Function, ignorarErro: boolean): any;
        protected RetornarValorParametro<T>(chave: string, construtor: IConstrutor<T> | Function, ignorarErro: boolean = false): T | any
        {
            u.ValidacaoUtil.ValidarArgumentoDefinido({ Parametros: this.__Parametros });

            if (!this.__Parametros.ContainsKey(chave))
            {
                if (!ignorarErro)
                {
                    throw new Erro(`O valor para chave '${chave}' não foi encontrado no dicionario de parâmetros`);
                }
                return null;
            }

            const valor = this.__Parametros.Item(chave);
            if (typeof construtor === "function")
            {
                if (u.ValidacaoUtil.IsValorConstrutorValor(valor, construtor))
                {
                    return valor as T;
                }

                const tipo = construtor.GetType();
                if (tipo instanceof r.TipoPrimario)
                {
                    try
                    {
                        return ConverterUtil.Para(valor, construtor.GetType());
                    }
                    catch (erro)
                    {
                        console.error(erro);
                    }

                }
                if (!ignorarErro)
                {
                    throw new Erro(`O tipo do valor da chave '${chave}' não compatível com ${u.ReflexaoUtil.RetornarNomeTipo(construtor)}`);
                }
                return valor;
            }
            return valor as T;
        }

        protected RetornarValorParametroEnum<TEnum>(chave: string, construtorEnum: TEnum, ignorarErro: boolean = false): TEnum[keyof TEnum]
        {
            const valorInt = this.RetornarValorParametro(chave, Number, ignorarErro);
            if (EnumUtil.IsDefindo(construtorEnum, valorInt))
            {
                return valorInt as any;
            }

            if (!ignorarErro)
            {
                const nomeTipo = u.ReflexaoUtil.RetornarNomeTipo(construtorEnum);
                throw new Erro(`O valor '${valorInt}' do parâmetro ${chave} não está definida no enum ${nomeTipo}`);
            }
            return null;
        }

        public AdicionarParametros(parametros: DicionarioSimples)
        {
            this.__Parametros?.Clear();
            this.__Parametros.AddRange(parametros);
        }

        public AdicionarParametro(chave: string, valor: any): void
        {
            if (this.__Parametros.ContainsKey(chave))
            {
                this.__Parametros.AtribuirItem(chave, valor);
            }
            else
            {
                this.__Parametros.Add(chave, valor);
            }
        }

        protected AtualizarParametrosPropriedades(): void
        {
            for (const parChaveValor of this.__Parametros.ParesChaveValor)
            {
                if (parChaveValor.Valor != null)
                {
                    try
                    {
                        (this as any)[parChaveValor.Chave] = parChaveValor.Valor;
                    }
                    catch (erro)
                    {
                        console.warn(` Não foi possível atribuir o valor do parâmetro na propriedade, (possivel readonly) em ${this.___NomeConstrutor}<br />` + erro);
                    }
                }
            }
        }

        public override ReInicializar(): void
        {
            const tempParametros = this.__Parametros;
            super.ReInicializar();
            this._parametros = tempParametros;
        }

        //public Voltar(isSucesso: boolean)
        //{
        //    this.Navegador.Voltar(isSucesso);
        //}

        public async FecharAsync(isSucesso: boolean): Promise<any>
        {
            if (this.ControleApresentacaoPai instanceof Janela)
            {
                return this.ControleApresentacaoPai.FecharAsync(isSucesso);
            }

            const janela = this.RetornarControlePai(Janela, false, true);
            if (janela instanceof Janela)
            {
                return janela.FecharAsync(isSucesso);
            }

            throw new Erro(`Nenhuma janela pai encontrada para a página ${this.___NomeConstrutor}. `);
        }

        public override Equals(pagina: Pagina)
        {
            if (pagina instanceof Pagina)
            {
                return this.constructor === pagina.constructor;
            }
            return false;
        }

        public IsMesmoContrustor(construtor: typeof Pagina | IPaginaConstrutor<Pagina>,
            expressoesParametrosOuChave: string | Function | DicionarioSimples<any, string> | List<ITupleParametroPagina<any, any>> | Partial<Pagina>): boolean
        {
            return this.constructor === construtor;
        }

        protected RetornarRota(): Rota
        {
            const rota = GerenciadorRotas.RetornarRota(
                this.Navegador.IdentificadorNavegador,
                this);

            if (rota != null)
            {
                return rota;
            }

            console.warn(`ignore: não foi definido uma rota para a página ${this.___NomeConstrutor}`);

            const caminho = `${this.Navegador.CaminhoRota}/${this.___NomeConstrutor}`;
            return new Rota({
                ConstrutorPagina: this.constructor as IPaginaConstrutor,
                Caminho: caminho
            });
        }
    }
}