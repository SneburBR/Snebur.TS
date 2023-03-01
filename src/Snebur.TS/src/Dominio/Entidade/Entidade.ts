namespace Snebur.Dominio
{
    export abstract class Entidade extends BaseDominio implements IEntidade, IEquals
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
            if ($Configuracao.IsDebug)
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
        //#region IEquals

        public override Equals(obj: any): boolean
        {
            if (obj instanceof Entidade)
            {
                return this.__IdentificadorEntidade === (obj as Entidade).__IdentificadorEntidade;
            }
            return super.Equals(obj);
        }

        //os o id da chave primaria, e id das chave estrangeiras, e todoas as propriedades alteradas

        //#region Clonar

        public CloneSomenteId<TEntidade extends this = this>(): TEntidade
        {
            if (this.Id === 0)
            {
                throw new Erro("O entidade clona deve ter um id maior que zero", this);
            }
            return this.Clonar(EnumOpcaoClonarEntidade.SomenteId);
        }

        /**@param {funcaoClonarValorProprieade} Funcao opcional para clonar tudo, o valor propriedade, retorna o valor propriedade clonado, se undefined o valor será clonado para método padrao */
        public Clonar<TEntidade extends this = this>(opcoes: EnumOpcaoClonarEntidade = EnumOpcaoClonarEntidade.Tudo,
            funcaoClonarValorProprieadede?: FuncaoClonarPropriedade):
            TEntidade
        {
            const tipoEntidade = this.GetType() as r.TipoEntidade;

            const entidadeClonada = new tipoEntidade.Construtor() as TEntidade;
            entidadeClonada.DesativarNotificacaoPropriedadeAlterada();

            if (!opcoes.HasFlag(EnumOpcaoClonarEntidade.NaoClonarId))
            {
                entidadeClonada.Id = this.Id;
            }

            (entidadeClonada as any as IEntidadeClonada).___IsEntidadeClonada = true;

            const referencia = this as any;

            if (opcoes.HasFlag(EnumOpcaoClonarEntidade.Tudo))
            {
                const propriedades = tipoEntidade.RetornarPropriedades(false);
                propriedades.Remove(tipoEntidade.PropriedadeChavePrimaria);

                for (const propriedade of propriedades)
                {
                    if (propriedade.IsSomenteLeitura)
                    {
                        continue;
                    }

                    const valorPropriedade = referencia[propriedade.Nome];
                    const valorPropriedaeClonado = this.RetornarValorPropriedadeClonado(opcoes, propriedade, valorPropriedade, funcaoClonarValorProprieadede);
                    (entidadeClonada as any)[propriedade.Nome] = valorPropriedaeClonado;
                }
                entidadeClonada.AtivarNotificacaoPropriedadeAlterada();
                return entidadeClonada as TEntidade;
            }

            if (opcoes.HasFlag(EnumOpcaoClonarEntidade.ChavesEstrangeira))
            {
                const propriedadesChavaEstrangeira = tipoEntidade.PropriedadesChaveEstrangeiras;

                for (const propriedadeChaveEstrangeira of propriedadesChavaEstrangeira)
                {
                    (entidadeClonada as any)[propriedadeChaveEstrangeira.Nome] = referencia[propriedadeChaveEstrangeira.Nome];
                }
            }

            if (opcoes.HasFlag(EnumOpcaoClonarEntidade.PropriedadesTiposPrimario))
            {
                const propriedades = tipoEntidade.RetornarPropriedades(false);
                for (const propriedade of propriedades)
                {
                    if (propriedade.Tipo.IsTipoPrimario &&
                        propriedade.Nome !== "__NomeTipoEntidade")
                    {
                        const valorPropriedade = referencia[propriedade.Nome];
                        (entidadeClonada as any)[propriedade.Nome] = valorPropriedade;
                    }
                }
            }

            entidadeClonada.AtivarNotificacaoPropriedadeAlterada();
            if (opcoes.HasFlag(EnumOpcaoClonarEntidade.PropriedadesAlteradas) && this.__PropriedadesAlteradas.Count > 0)
            {
                (entidadeClonada as any).__propriedadesAlteradas__ = this.__PropriedadesAlteradas;

                for (const propriedadeAlterada of this.__PropriedadesAlteradas.Valores)
                {
                    (entidadeClonada as any)[propriedadeAlterada.NomePropriedade] = referencia[propriedadeAlterada.NomePropriedade];
                }
            }
            return entidadeClonada as TEntidade;
        }

        private RetornarValorPropriedadeClonado(opcoes: EnumOpcaoClonarEntidade, propriedade: r.Propriedade, valorPropriedade: any, funcaoClonarValorProprieade: FuncaoClonarPropriedade): any
        {
            if (typeof funcaoClonarValorProprieade === "function")
            {
                const valor = funcaoClonarValorProprieade(propriedade, valorPropriedade);
                if (valor !== undefined)
                {
                    return valor;
                }
            }
            return this.ClonarValorPropriedade(opcoes, propriedade, valorPropriedade, funcaoClonarValorProprieade);
        }

        private ClonarValorPropriedade(opcoes: EnumOpcaoClonarEntidade, propriedade: r.Propriedade, valorPropriedade: any, funcaoClonarValorProprieade: FuncaoClonarPropriedade): any
        {
            if (valorPropriedade instanceof Entidade)
            {
                if ((valorPropriedade as any as IEntidadeClonada).___IsEntidadeClonada)
                {
                    return valorPropriedade;
                }
                return valorPropriedade.Clonar(opcoes, funcaoClonarValorProprieade);
            }

            if (valorPropriedade instanceof Array)
            {
                const lista = valorPropriedade;
                const novoLista = this.RetornarNovaLista(valorPropriedade);
                for (let i = 0; i < valorPropriedade.length; i++)
                {
                    let item = lista[i];
                    if (item instanceof Entidade)
                    {
                        item = this.RetornarValorPropriedadeClonado(opcoes, propriedade, item, funcaoClonarValorProprieade);
                    }
                    novoLista.Add(item);
                }
                return novoLista;
            }

            if (valorPropriedade instanceof BaseTipoComplexo)
            {
                return valorPropriedade.Clone();
            }
            return valorPropriedade;
        }

        private RetornarNovaLista(lista: Array<any>): Array<any>  
        {
            switch (lista.TipoLista)
            {
                case EnumTipoLista.Array:

                    return new Array<any>();

                case EnumTipoLista.List:

                    return new List<any>();

                case EnumTipoLista.ListaObservacao:

                    return new ListaObservacao<any>();

                case EnumTipoLista.ListaObservacaoIndexada: {

                    const expressaoChave = (lista as any)["ExpressaoChave"];
                    return new ListaObservacaoIndexada<any>(expressaoChave);
                }
                case EnumTipoLista.ListaEntidades:

                    return new ListaEntidades<any>();

                case EnumTipoLista.ListaEntidadesIndexada:

                    return new ListaEntidadesIndexada<any>();

            }
            throw new Erro("Method not implemented.");
        }

        //#endregion
        protected RetornarValorChaveEstrangeira(nomePropriedade: string, nomePropriedadeRelacao: string, idChaveEstrangeira: number): number
        {
            const relacaoChaveEstrangeira = (this as any)[nomePropriedadeRelacao];
            if (relacaoChaveEstrangeira instanceof Entidade)
            {
                return relacaoChaveEstrangeira.Id;
            }
            return idChaveEstrangeira;
        }

        public override toString(): string
        {
            if (this.Id > 0)
            {
                const nome = TextoUtil.RemoverAcentos(TextoUtil.RetornarSomentesLetrasNumeros(u.ConverterUtil.ParaString((this as any)["Nome"])));
                return this.___NomeConstrutor + ".Id." + this._id + "." + nome;
            }
            return super.toString();
        }

        //public ToStringHashCode(): string
        //{
        //    if (this.Id === 0)
        //    {
        //        throw new Erro("Não é possível gerar um hash para entidades não salva");
        //    }
        //    return this.__IdentificadorEntidade;
        //}

        private GetTypeTipado(): r.TipoEntidade  
        {
            return super.GetType() as r.TipoEntidade;
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

        //#region IAtivo

        public RetornarValorPropriedadeIsAtivo(isAtivo: boolean)
        {
            if (this.GetTypeTipado().IsImplementaIAtivo &&
                this.GetTypeTipado().IsImplementaIDeletado)
            {
                return isAtivo && !(this as any as IDeletado).IsDeletado;
            }
            return isAtivo;
        }

        //#endregion
    }

    export declare type FuncaoClonarPropriedade = (propriedade: r.Propriedade, valorPropriedade: Entidade) => any | undefined;


}