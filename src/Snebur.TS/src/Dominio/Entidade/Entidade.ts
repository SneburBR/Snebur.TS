namespace Snebur.Dominio
{
    export abstract class Entidade extends BaseDominio implements IEntidade, IEquals, IClone<Entidade>
    {
        private _entidadeHashCode: number;

        //#region Propriedades

        private _id: number = 0;

        //private _entidadeCloneSomenteId: Entidade;

        public get Id(): number
        {
            return this._id;
        }

        public set Id(value: number)
        {
            if (this._id > 0 && this._id !== value)
            {
                throw new ErroOperacaoInvalida("Não possível sobreescrever um id ja existente");
            }

            const isNotificarEntidadeSalva = (this._id === 0 && value > 0);
            this.NotificarValorPropriedadeAlterada("Id", this._id, this._id = value);
            if (isNotificarEntidadeSalva)
            {
                this.EventoEntidadeSalva.Notificar(this, EventArgs.Empty);
            }
        }

        public get __IdentificadorEntidade(): string
        {
            if (this.Id > 0)
            {
                return `${this.__NomeTipoEntidade}_${this.Id.ToString()}`;
            }
            return `${this.__NomeTipoEntidade}-(0)-${super.GetHashCode()}`;
        }

        public readonly __IsSomenteLeitura: boolean = false;

        public get __NomeTipoEntidade(): string
        {
            return this.GetType().Nome;
        }

        public override get __IsExisteAlteracao(): boolean
        {
            if (this.Id === 0 || this.__PropriedadesAlteradas.Count > 0)
            {
                return true;
            }

            const propriedades = (this.GetType() as r.TipoEntidade).RetornarPropriedades();
            for (const propriedade of propriedades)
            {
                const tipoPropriedade = propriedade.Tipo;
                if (tipoPropriedade instanceof r.TipoListaEntidade)
                {
                    const lista = u.ReflexaoUtil.RetornarValorPropriedade(this, propriedade) as ListaEntidades<Entidade>;
                    if (lista instanceof Array)
                    {
                        return lista.EntidadesRemovida.Count > 0 || lista.EntidadesAdicionada.Count > 0;
                    }
                    return true;
                }
            }
            return false;
        }

        //Inicializar construtor Partial
        private readonly __InicializarConstrutor?: Function;

        //#endregion

        public readonly EventoEntidadeSalva = new Evento(this);

        public constructor(inicializador?: Partial<Entidade>)
        {
            super(inicializador);
            //this.__NomeTipoEntidade = this.GetType().Nome;
        }

        protected override Inicializar(): void
        {
            const propriedadesTipoComplexo = this.GetType().RetornarPropriedades(false).Where(x => x.Tipo instanceof r.TipoComplexo).ToList();
            for (const propriedadeTipoComplexo of propriedadesTipoComplexo)
            {
                const tipoComplexo = u.ReflexaoUtil.RetornarValorPropriedade(this, propriedadeTipoComplexo);
                if (tipoComplexo instanceof d.BaseTipoComplexo)
                {
                    tipoComplexo.__Entidade = this;
                    tipoComplexo.__NomePropriedadeEntidade = propriedadeTipoComplexo.Nome;
                }
                else
                {
                    const isValidar = propriedadeTipoComplexo.Atributos.OfType<at.IgnorarValidacaoTipoComplexo>(at.IgnorarValidacaoTipoComplexo).Count === 0;
                    if (isValidar)
                    {
                        throw new Erro(`A propriedade ${propriedadeTipoComplexo.Nome} do tipo complexo ${propriedadeTipoComplexo.Tipo.Nome} não foi definido no seu contrato do campo privado. Atualize a extensão no lado servidor`);
                    }
                }
            }

            //this.InicializarEntidadeOrdenacao();
            super.Inicializar();

            if (u.ValidacaoUtil.IsFunction(this.__InicializarConstrutor))
            {
                this.__InicializarConstrutor.call(this);
            }
        }

        public override NotificarValorPropriedadeAlteradaTipoCompleto(nomePropriedade: string, antigoValor: BaseTipoComplexo, novoValor: BaseTipoComplexo)
        {
            if ($Configuracao.IsDebugOuTeste)
            {
                const propriedade = this.GetType().RetornarPropriedade(nomePropriedade);
                const isSomenteLeitura = propriedade.Atributos.OfType(at.SomenteLeituraAttribute).SingleOrDefault() instanceof at.SomenteLeituraAttribute;
                if (isSomenteLeitura &&
                    antigoValor instanceof Dimensao && !antigoValor.IsEmpty)
                {
                    throw new Erro("Não é possível atualizar um valor somente leitura");
                }
            }

            if (!(novoValor instanceof BaseTipoComplexo))
            {
                throw new Erro("O novoValor não  é do tipoComplexo");
            }

            if (antigoValor === undefined)
            {
                antigoValor = new (novoValor.GetType() as r.TipoComplexo).Construtor() as BaseTipoComplexo;
            }

            if (antigoValor instanceof BaseTipoComplexo)
            {
                antigoValor.__Entidade = null;
                antigoValor.__NomePropriedadeEntidade;
            }

            novoValor.__Entidade = this;
            novoValor.__NomePropriedadeEntidade = nomePropriedade;
            novoValor.NotificarTodasPropriedadesAlteradas(antigoValor);
            //super.NotificarValorPropriedadeAlterada(nomePropriedade, antigoValor, )

        }

        protected NotificarValorPropriedadeAlteradaRelacao(nomePropriedade: string, antigoValor: any, novoValor: any): void
        {
            this.NotificarValorPropriedadeAlterada(nomePropriedade, antigoValor, novoValor);

            if (this instanceof d.Entidade)
            {
                if (!u.Util.IsIgual(antigoValor, novoValor))
                {
                    const tipoEntidade = this.GetType() as r.TipoEntidade;
                    const propriedade = this.GetType().RetornarPropriedade(nomePropriedade);
                    const propriedadeChaveEstrageira = u.EntidadeUtil.RetornarPropriedadeChaveEstrangeira(tipoEntidade, propriedade);

                    if (novoValor instanceof d.Entidade)
                    {
                        const nomePropriedadePrivada = "_" + u.TextoUtil.FormatarPrimeiraLetraMinuscula(propriedadeChaveEstrageira.Nome);
                        const antigoValorChaveEstrangeira = (this as any)[nomePropriedadePrivada] as number;
                        const novoValorChaveEstrangeira = novoValor.Id;
                        if (antigoValorChaveEstrangeira !== novoValorChaveEstrangeira)
                        {
                            (this as any)[propriedadeChaveEstrageira.Nome] = novoValorChaveEstrangeira;
                            //propriedadeChaveEstrageira.SetValue(this, novoValorChaveEstrangeira);
                            if (this.IsNotificacaoAlteracaoPropriedadeAtiva)
                            {
                                this.NotificarValorPropriedadeAlterada(propriedadeChaveEstrageira.Nome, antigoValorChaveEstrangeira, novoValorChaveEstrangeira);
                            }
                        }
                    }
                }
            }
        }

        protected NotificarValorPropriedadeAlteradaChaveEstrangeiraAlterada(
            nomePropriedade: string,
            nomePropriedadeRelacao: string,
            antigoValor: any,
            novoValor: any): void
        {

            this.NotificarValorPropriedadeAlterada(nomePropriedade, antigoValor, novoValor);

            if (this.IsNotificacaoAlteracaoPropriedadeAtiva)
            {
                if (!u.Util.IsIgual(antigoValor, novoValor))
                {
                    //const tipoEntidade = this.GetType() as r.TipoEntidade;
                    //const propriedadeChaveEstrangeira = this.GetType().RetornarPropriedade(nomePropriedade);
                    //const propriedadeRelacao = u.EntidadeUtil.RetornarPropriedadeRelacao(tipoEntidade, propriedadeChaveEstrangeira);
                    const entidadeRelacao = (this as any)[nomePropriedadeRelacao];
                    if (entidadeRelacao instanceof Entidade)
                    {
                        if (entidadeRelacao.Id !== novoValor)
                        {
                            console.WarmDebug(`A propriedade chave estrangeira alterada ${this.GetType().Nome}.${nomePropriedade} = ${novoValor ?? "null"}
                                               Propriedade da relação {} foi atribuído valor null.
                                               ${this.GetType().Nome}.${nomePropriedadeRelacao} = null`);

                            (this as any)[nomePropriedadeRelacao] = null;
                        }
                    }
                }
            }
        }

        //os o id da chave primaria, e id das chave estrangeiras, e todoas as propriedades alteradas
        protected RetornarValorChaveEstrangeira(nomePropriedade: string, nomePropriedadeRelacao: string, idChaveEstrangeira: number): number
        {
            const relacaoChaveEstrangeira = (this as any)[nomePropriedadeRelacao];
            if (relacaoChaveEstrangeira instanceof Entidade)
            {
                return relacaoChaveEstrangeira.Id;
            }
            return idChaveEstrangeira;
        }

        public RetornarValorPropriedadeIsAtivo(isAtivo: boolean)
        {
            if (this.GetTypeTipado().IsImplementaIAtivo &&
                this.GetTypeTipado().IsImplementaIDeletado)
            {
                return isAtivo && !(this as any as IDeletado).IsDeletado;
            }
            return isAtivo;
        }

        //#region Clonar

        public CloneSomenteId<TEntidade extends this = this>(): TEntidade
        {
            if (this.Id === 0)
            {
                throw new Erro("O entidade clona deve ter um id maior que zero", this);
            }
            return this.Clone(EnumOpcaoClonarEntidade.SomenteId);
        }

        /**@param {funcaoClonarValorProprieade} Funcao opcional para clonar tudo, o valor propriedade, retorna o valor propriedade clonado, se undefined o valor será clonado para método padrao */
        public Clone<TEntidade extends this = this>(
            opcoes: EnumOpcaoClonarEntidade = EnumOpcaoClonarEntidade.Tudo,
            funcaoClonarValorProprieadede?: FuncaoClonarPropriedade):
            TEntidade
        {
            return AjudanteClonarEntidade.Clonar(this, opcoes, funcaoClonarValorProprieadede) as TEntidade;
        }

        //#endregion


        //#region IEquals

        public override Equals(obj: any): boolean
        {
            if (obj instanceof Entidade)
            {
                return this.__IdentificadorEntidade === (obj as Entidade).__IdentificadorEntidade;
            }
            return super.Equals(obj);
        }

        public override GetHashCode(): number
        {
            //if (this.Id == 0)
            //{
            //    throw new Erro("Não é possível gerar um hash para entidades não salva");
            //}
            if (this.Id > 0)
            {
                if (this._entidadeHashCode == null)
                {
                    this._entidadeHashCode = this.__IdentificadorEntidade.GetHashCode();
                }
                return this._entidadeHashCode;
            }
            return this.__IdentificadorEntidade.GetHashCode();
        }

        //#endregion


        public override toString(): string
        {
            if (this.Id > 0)
            {
                const nome = TextoUtil.RemoverAcentos(TextoUtil.RetornarSomentesLetrasNumeros(u.ConverterUtil.ParaString((this as any)["Nome"])));
                return this.___NomeConstrutor + ".Id." + this._id + "." + nome;
            }
            return super.toString();
        }
        
        private GetTypeTipado(): r.TipoEntidade  
        {
            return super.GetType() as r.TipoEntidade;
        }

         
    }

    export declare type FuncaoClonarPropriedade = (propriedade: r.Propriedade, valorPropriedade: Entidade) => any | undefined;


}