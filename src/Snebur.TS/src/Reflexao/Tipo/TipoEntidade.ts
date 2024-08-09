namespace Snebur.Reflexao
{
    export class TipoEntidade extends TipoBaseDominio
    {
        private static readonly NomesPropriedadeDescricao = ["Nome", "Descricao", "Conteudo"];

        private _propriedadeDescricao: r.Propriedade = undefined;
        private _propriedadesChaveEstrangeiras: List<r.Propriedade> = null;
        private _rotulo: string = null;

        private _isIdentity: boolean;
        private _isImplementaIDeletado: boolean;
        private _isImplementaIAtivo: boolean;
        private _propriedadeChavePrimaria: r.Propriedade;

        public override get Construtor(): d.EntidadeConstrutor
        {
            return this._construtor as d.EntidadeConstrutor;
        }

        public get Rotulo(): string
        {
            if (this._rotulo == null)
            {
                this._rotulo = this.RetornarRotulo();
            }
            return this._rotulo;
        }

        public get IsIdentity(): boolean
        {
            return this._isIdentity;
        }

        public get IsImplementaIDeletado(): boolean
        {
            return this._isImplementaIDeletado;
        }

        public get IsImplementaIAtivo(): boolean
        {
            return this._isImplementaIAtivo;
        }

        public get PropriedadesChaveEstrangeiras(): List<r.Propriedade>
        {
            if (!this._propriedadesChaveEstrangeiras)
            {
                this._propriedadesChaveEstrangeiras = this.RetornarPropriedadesChaveEstrangeiras();
            }
            return this._propriedadesChaveEstrangeiras;
        }

        public get PropriedadeChavePrimaria(): Propriedade
        {
            return this._propriedadeChavePrimaria;
        }

        public constructor(construtor: Function, nome: string,
            _namespace: string,
            assemblyQualifiedName: string,
            tipoBase: BaseTipo,
            isAbstrato: boolean,
            isImplementaIDeletado: boolean,
            isImplementaIAtivo: boolean,
            isIdentity: boolean)
        {
            super(construtor, nome, _namespace, assemblyQualifiedName, tipoBase, isAbstrato);
            this.TipoReflexao = EnumTipoReflexao.TipoBaseEntidade;

            this._isImplementaIDeletado = isImplementaIDeletado;
            this._isImplementaIAtivo = isImplementaIAtivo;
            this._isIdentity = isIdentity;
        }

        public RetornarPropriedadeDescricao(): r.Propriedade
        public RetornarPropriedadeDescricao(isRetornarNull: boolean): r.Propriedade
        public RetornarPropriedadeDescricao(isRetornarNull: boolean = false): r.Propriedade
        {
            if (this._propriedadeDescricao === undefined)
            {
                this._propriedadeDescricao = this.RetornarPropriedadeDescricaoInterno();
            }
            if (this._propriedadeDescricao != null)
            {
                return this._propriedadeDescricao;
            }
            if (isRetornarNull)
            {
                return null;
            }
            throw new ErroOperacaoInvalida(`A propriedade descrição não foi encontrada ma entidade '${this.Nome}'`, this);
        }

        private RetornarPropriedadeDescricaoInterno(): Propriedade
        {
            const todasPropriedade = this.RetornarPropriedades(false);

            const propriedadeDescricao = todasPropriedade
                .Where(x => TipoEntidade.NomesPropriedadeDescricao.Contains(x.Nome))
                .OrderBy(x => x.Nome)
                .FirstOrDefault();

            if (propriedadeDescricao != null)
            {
                return propriedadeDescricao;
            }

            const propriedadeAtributoPropriedadeDescricao = todasPropriedade.
                Where(x => x.Atributos.OfType(at.PropriedadeDescricaoAttribute).Count === 1).SingleOrDefault();

            if (propriedadeAtributoPropriedadeDescricao != null)
            {
                return propriedadeAtributoPropriedadeDescricao;
            }
            const atributoPropriedadeDescricao = this.Atributos.OfType(at.PropriedadeDescricaoAttribute).SingleOrDefault();
            if (atributoPropriedadeDescricao != null)
            {
                if (String.IsNullOrWhiteSpace(atributoPropriedadeDescricao.NomePropriedade))
                {
                    throw new ErroNaoDefinido("O nome da propriedade descrição não foi definido no atributo", this);
                }
                return this.RetornarPropriedade(atributoPropriedadeDescricao.NomePropriedade);
            }
            return null;
        }

        public RetornarPropriedadesExibicao(): Array<r.Propriedade>
        {
            const propriedades = new Array<r.Propriedade>();
            const todasPropriedades = this.RetornarPropriedades(false, true);
            const nomesPropriedadeChaveEstrangeira = new Array<string>();
            let len = todasPropriedades.length;
            for (let i = 0; i < len; i++)
            {
                const propriedade = todasPropriedades[i];
                if (!this.IgnorarPropriedade(propriedade))
                {
                    const atributoChaveEstrangeira = propriedade.Atributos.OfType(d.Atributos.ChaveEstrangeiraAttribute).SingleOrDefault();
                    if (atributoChaveEstrangeira != null)
                    {
                        nomesPropriedadeChaveEstrangeira.Add(atributoChaveEstrangeira.NomePropriedade);
                    }
                    if ((propriedade.Tipo instanceof r.TipoPrimario) ||
                        (propriedade.Tipo instanceof r.TipoEnum))
                    {
                        propriedades.Add(propriedade);
                        continue;
                    }
                    if ((propriedade.Tipo instanceof r.TipoEntidade))
                    {
                        const atributoRelacao = propriedade.Atributos.OfType(d.Atributos.BaseRelacaoAttribute).SingleOrDefault();
                        if (atributoRelacao instanceof d.Atributos.RelacaoPaiAttribute)
                        {
                            propriedades.Add(propriedade);
                        }
                        continue;
                    }
                    if (propriedade.Tipo instanceof r.BaseTipoLista)
                    {
                        const atributoRelacao = propriedade.Atributos.OfType(d.Atributos.BaseRelacaoAttribute).SingleOrDefault();
                        if (atributoRelacao instanceof d.Atributos.RelacaoNnAttribute)
                        {
                            propriedades.Add(propriedade);
                        }
                        continue;
                    }
                    if (propriedade.Tipo instanceof r.TipoComplexo)
                    {
                        propriedades.Add(propriedade);
                        continue;
                    }
                    throw new ErroNaoSuportado("O tipo da propriedade não é suportado", this);
                }
            }
            len = nomesPropriedadeChaveEstrangeira.length;
            for (let i = 0; i < len; i++)
            {
                const nomePropriedade = nomesPropriedadeChaveEstrangeira[i];
                const propriedade = propriedades.Where(x => x.Nome === nomePropriedade).Single();
                propriedades.Remove(propriedade);
            }
            return propriedades;
        }

        public RetornarPropriedadesPesquisa(): Array<r.Propriedade>
        {
            const propriedadesPesquisa = new Array<r.Propriedade>();
            const propriedadeDescricao = this.RetornarPropriedadeDescricao(true);
            if (propriedadeDescricao != null)
            {
                propriedadesPesquisa.Add(propriedadeDescricao);
            }
            return propriedadesPesquisa;
        }

        public SetPropriedadeChavePrimaria(propriedade: r.Propriedade): void
        {
            if (this._propriedadeChavePrimaria != null)
            {
                throw new ErroOperacaoInvalida("A propriedade chave primária já foi definida", this);
            }

            propriedade.Atributos.Add(new Snebur.Dominio.Atributos.ChavePrimariaAttribute(this.IsIdentity));
            this._propriedadeChavePrimaria = propriedade;
        }

        private IgnorarPropriedade(propriedade: r.Propriedade)
        {
            if (propriedade.Atributos.Count > 0)
            {
                const atributoOcultarColuna = propriedade.Atributos.OfType(d.Atributos.OcultarColunaAttribute).SingleOrDefault();
                if (atributoOcultarColuna != null)
                {
                    return true;
                }

                const atributoChavePrimaria = propriedade.Atributos.OfType(d.Atributos.ChavePrimariaAttribute).SingleOrDefault();
                if (atributoChavePrimaria != null)
                {
                    return true;
                }

                const atributoSomenteLeitura = propriedade.Atributos.OfType(at.SomenteLeituraAttribute).SingleOrDefault();
                if (atributoSomenteLeitura != null)
                {
                    return true;
                }
            }
            return false;
        }

        private RetornarPropriedadesChaveEstrangeiras(): List<Propriedade>
        {
            const propriedadesChaveEstrangeiras = new List<r.Propriedade>();
            const propriedades = this.RetornarPropriedades();
            for (const propriedade of propriedades)
            {
                const atributoPropriedade = u.EntidadeUtil.RetornarAtributoChaveEstrangeira(propriedade, true);
                if (atributoPropriedade != null)
                {
                    propriedadesChaveEstrangeiras.Add(this.RetornarPropriedade(atributoPropriedade.NomePropriedade));
                }
            }
            return propriedadesChaveEstrangeiras;
        }

        private RetornarRotulo(): string
        {
            const atributoRotulo = this.Atributos.OfType(at.RotuloAttribute).FirstOrDefault();
            if (atributoRotulo != null)
            {
                return atributoRotulo.Rotulo;
            }
            return this.Nome;
        }

        private RetornarIsEntity(): boolean
        {
            throw new Error("Method not implemented.");
        }
    }
}