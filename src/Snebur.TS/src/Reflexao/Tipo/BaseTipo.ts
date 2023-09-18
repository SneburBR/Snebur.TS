namespace Snebur.Reflexao
{
    export abstract class BaseTipo implements ICaminhoTipo
    {
        private __todasPropridades: DicionarioSimples<Propriedade> | undefined = undefined;
        private _tipoBase: BaseTipo;

        public readonly Nome: string;

        public readonly Namespace: string;

        public readonly Abstrato: boolean;

        public readonly Atributos = new List<Snebur.Dominio.Atributos.BaseAtributoDominio>();

        public readonly Propriedades = new List<Propriedade>();

        public get TodasPropriedades(): DicionarioSimples<Propriedade>
        {
            if (this.__todasPropridades === undefined)
            {
                this.__todasPropridades = this.RetornarTodasPropriedades();
            }
            return this.__todasPropridades;
        }

        public readonly AssemblyQualifiedName: string;

        public readonly CaminhoTipoBase: string;

        public get TipoBase(): BaseTipo
        {
            if (!this._tipoBase && this.CaminhoTipoBase)
            {
                this._tipoBase = $Reflexao.Tipos.TryItem(this.CaminhoTipoBase);
            }

            if (this._tipoBase instanceof BaseTipo)
            {
                if ($Configuracao && $Configuracao.IsDebug)
                {
                    if (this._tipoBase.Nome === this.Nome &&
                        this._tipoBase.Namespace === this.Namespace)
                    {
                        throw new Erro("O tipo base dever ser diferente do tipo atual");
                    }
                }
            }
            return this._tipoBase;
        }

        public TipoReflexao: EnumTipoReflexao;

        public get __CaminhoTipo(): string
        {
            if (!String.IsNullOrWhiteSpace(this.Namespace))
            {
                return `${this.Namespace}.${this.Nome}`;
            }
            else
            {
                return this.Nome;
            }
        }

        public get CaminhoTipo(): string
        {
            return this.__CaminhoTipo;
        }

        public get Construtor(): Function
        {
            return r.ReflexaoNamespaceUtil.RetornarConstrutor(this.CaminhoTipo );
        }

        public get IsTipoPrimario(): boolean
        {
            return this instanceof r.TipoPrimario ||
                this instanceof r.TipoEnum;
        }

        public get IsTipoCompleto(): boolean
        {
            return this instanceof r.TipoComplexo;
        }

        public constructor(nome: string, _namespace: string, assemblyQualifiedName: string, tipoBase: BaseTipo, abstrato: boolean)
        public constructor(nome: string, _namespace: string, assemblyQualifiedName: string, caminhoTipoBase: string, abstrato: boolean)
        public constructor(nome: string, _namespace: string, assemblyQualifiedName: string, tipoBaseOuCaminho: BaseTipo | string, abstrato: boolean)
        {
            this.Nome = nome;
            this.Abstrato = abstrato;
            this.Namespace = _namespace;
            this.AssemblyQualifiedName = assemblyQualifiedName;

            if (tipoBaseOuCaminho instanceof BaseTipo)
            {
                this._tipoBase = tipoBaseOuCaminho;
                this.CaminhoTipoBase = this._tipoBase.CaminhoTipo;
            }
            else if (typeof tipoBaseOuCaminho === "string")
            {
                this.CaminhoTipoBase = tipoBaseOuCaminho;

                if ($Configuracao && $Configuracao.IsDebug)
                {
                    if (tipoBaseOuCaminho === `${_namespace}.${nome}`)
                    {
                        throw new Erro("O tipo base dever ser diferente do tipo atual");
                    }
                }
            }
        }

        public AdicionarPropriedade(propriedade: Propriedade)
        {
            this.Propriedades.Add(propriedade);
            this.__todasPropridades = undefined;
            delete this.__todasPropridades;
        }

        public RetornarPropriedades(): Array<Propriedade>
        public RetornarPropriedades(ignorarTipoBase: boolean): Array<Propriedade>
        public RetornarPropriedades(ignorarTipoBase: boolean, ordenar: boolean): Array<Propriedade>
        public RetornarPropriedades(ignorarTipoBase?: boolean, ordenar?: boolean): Array<Propriedade>
        {
            ignorarTipoBase = u.ConverterUtil.ParaBoolean(ignorarTipoBase);
            ordenar = u.ConverterUtil.ParaBoolean(ordenar);
            if (ignorarTipoBase)
            {
                return this.Propriedades;
            }
            else
            {
                return this.TodasPropriedades.Valores;
            }
        }
 
        public RetornarPropriedade<T>(expressaoPropriedade: (value: T) => any): Propriedade
        public RetornarPropriedade<T>(expressaoPropriedade: (value: T) => any, nullSeNaoExiste: boolean): Propriedade
        public RetornarPropriedade(nomePropriedade: string): Propriedade
        public RetornarPropriedade(nomePropriedade: string, nullSeNaoExiste: boolean): Propriedade
        public RetornarPropriedade(nomePropriedadeOuExpressao: string | Function, isNullSeNaoExiste: boolean = true): Propriedade
        {
            const nomePropriedade = u.ExpressaoUtil.NormalizarNomePropriedade(nomePropriedadeOuExpressao);
            const todasPropriedades = this.TodasPropriedades;
            if (todasPropriedades.ContainsKey(nomePropriedade))
            {
                return todasPropriedades.Item(nomePropriedade);
            }

            if (!isNullSeNaoExiste)
            {
                throw new Erro(`Não foi encontrada a propriedade '${nomePropriedade}' em '${this.Nome}'`, this);
            }
            return null;
        }

        public IsSubTipo(tipo: r.BaseTipo): boolean
        {
            let tipoAtual = this as r.BaseTipo;
            while (tipoAtual.TipoBase instanceof r.BaseTipo)
            {
                if (tipoAtual.TipoBase === tipo)
                {
                    return true;
                }
                tipoAtual = tipoAtual.TipoBase;
            }
            return false;
        }

        public IsSubTipoIgual(tipo: r.BaseTipo): boolean
        {
            /*eslint-disable*/
            if (tipo == this)
            {
                return true;
            }
            return this.IsSubTipo(tipo);
        }


        private RetornarTodasPropriedades(): DicionarioSimples<Propriedade>
        {
            let todasPropriedades = new DicionarioSimples<Propriedade>();
            let tipoBaseAtual: BaseTipo = this;
            let isOrdenar = true;
            while (u.ValidacaoUtil.IsDefinido(tipoBaseAtual))
            {
                let propriedades = tipoBaseAtual.Propriedades;
                if (isOrdenar)
                {
                    propriedades = propriedades.ToList(true);
                    propriedades.reverse();
                }

                for (let propriedade of propriedades)
                {
                    if (!todasPropriedades.ContainsKey(propriedade.Nome))
                    {
                        todasPropriedades.Add(propriedade.Nome, propriedade);
                    }
                }
                tipoBaseAtual = tipoBaseAtual.TipoBase;
            }
            return todasPropriedades;
        }

        public toString(): string
        {
            return this.Nome;
        }
    }
}