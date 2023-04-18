namespace Snebur.Reflexao
{
    export abstract class BaseNamespace
    {
        protected _namespacePai: BaseNamespace;
        private _instancia: any;
        private _caminho: any;
        private _prioridade: any;
        private _versao: string;
        private _tipoNamespace: EnumTipoNamespace;
        private _namespaces: BaseNamespace[];

        public readonly Nome: string;
        private readonly Seguimentos: string[];

        public readonly NamespacesFilho = new DicionarioSimples<NamespaceFilho>();

        public get Instancia(): any
        {
            return this._instancia;
        }

        public get Caminho(): string
        {
            return this._caminho;
        }

        public get TipoNamespace(): EnumTipoNamespace
        {
            return this._tipoNamespace;
        }

        public get Versao(): string
        {
            throw new ErroNaoImplementado();
        }

        public get Prioridade(): number
        {
            if (this._prioridade == null)
            {
                this._prioridade = this.RetornarPrioridade();
            }
            return this._prioridade;
        }

        public get Namespaces(): List<BaseNamespace>
        {
            if (this._namespaces == null)
            {
                this._namespaces = this.RetornarNamespace();
            }
            return this._namespaces;
        }

        protected constructor(
            namespacePai: BaseNamespace,
            tipoNamespace: EnumTipoNamespace,
            nome: string)
        {
            if (String.IsNullOrWhiteSpace(nome))
            {
                throw new Erro("Caminho do namespace invalido");
            }

            if (!u.CharUtil.IsUpper(nome[0]))
            {
                throw new Erro(`O nome do namespace '${nome}' deve iniciar com letra maiúscula`);
            }
            this._namespacePai = namespacePai;
            this.Nome = nome;
            this._tipoNamespace = tipoNamespace;
            this._caminho = this.RetornarCaminho();
            this._instancia = this.RetornarIntancia();
            this.Seguimentos = this.Caminho.split(".");

            GerenciadorNamespace.AdicionarNamespace(this);
        }

        public RetornarCaminhoTipoCompleto(caminhoCompletoOuParcial: string): string
        {
            throw new ErroNaoImplementado();
            //if (caminhoCompletoOuParcial.startsWith(this.Caminho))
            //{
            //    return caminhoCompletoOuParcial;
            //}
            //return this.Caminho + "." + caminhoCompletoOuParcial;
        }

        public RetornarInstanciaObjeto(caminho: string): any
        {
            if (String.IsNullOrWhiteSpace(caminho))
            {
                throw new Erro("O caminho não foi definido");
            }

            const segumentosCaminho = caminho.split(".");
            const segumentosNamespace = this.Seguimentos;

            for (const seguimento of segumentosNamespace)
            {
                if (segumentosCaminho[0] !== seguimento)
                {
                    break;
                }
                segumentosCaminho.shift();
            }

            if (segumentosCaminho.length === 0)
            {
                return this;
            }

            let instanciaAtual = this.Instancia;
            for (const seguimentoCaminho of segumentosCaminho)
            {
                if (instanciaAtual[seguimentoCaminho] == null)
                {
                    return null;
                }
                instanciaAtual = instanciaAtual[seguimentoCaminho];
            }

            if (instanciaAtual != null)
            {
                return instanciaAtual;
            }
            return null;

        }

        protected abstract RetornarIntancia(): any
        protected abstract RetornarCaminho(): any
        protected abstract RetornarPrioridade(): number;

        public PopularNamespaceFilhos(tipoNamespace: EnumTipoNamespace, seguimentos: string[])
        {
            if (seguimentos == null || seguimentos.length === 0)
            {
                throw new Erro("O seguimentos do namespace não foram definido");
            }

            const nomeNamespace = seguimentos.First();
            if (!this.NamespacesFilho.ContainsKey(nomeNamespace))
            {
                this.NamespacesFilho.Add(nomeNamespace, new NamespaceFilho(this, tipoNamespace, nomeNamespace));
            }
            if (seguimentos.length === 1)
            {
                const namespaceFilho = this.NamespacesFilho.Item(nomeNamespace);
                if (namespaceFilho.TipoNamespace !== tipoNamespace)
                {
                    namespaceFilho.AlterarTipoNamespace(tipoNamespace);
                }
                return;
            }
            const namespaceFilho = this.NamespacesFilho.Item(nomeNamespace);
            namespaceFilho.PopularNamespaceFilhos(tipoNamespace, seguimentos.Skip(1));
        }

        public toString(): string
        {
            return this.Nome;
        }



        public AlterarTipoNamespace(tipoNamespace: EnumTipoNamespace)
        {
            console.warn(`Alterado o tipo do namespace:  ${this.Caminho}.
                         (${EnumTipoNamespace[this.TipoNamespace]}) => ${EnumTipoNamespace[tipoNamespace]}`);
            this._tipoNamespace = tipoNamespace;
        }

        private RetornarNamespace(): BaseNamespace[]
        {
            const retorno = new List<BaseNamespace>();
            retorno.Add(this);
            for (const namespaceFilho of this.NamespacesFilho.ToArray())
            {
                retorno.AddRange(namespaceFilho.Namespaces);
            }
            return retorno;
        }

        public ValidarScriptsNormalizado()
        {
            if (typeof this.Instancia.__IsScriptNormalizado === "boolean")
            {
                if (!this.Instancia.__IsScriptNormalizado)
                {
                    const mensagem = "O projeto " + this.Caminho + " não foi normalizado pela extensão Snebur.VisualStudio";
                    alert(mensagem);
                    throw new Erro(mensagem);
                }
            }
        }
    }

}