namespace Snebur.Reflexao
{

    export class ReflexaoConstrutor
    {
        private _isInicializado = false;
        public readonly Tipos: DicionarioSimples<BaseTipo>;
        public readonly TipoNulo: Snebur.Reflexao.TipoNulo;
        public readonly TipoDesconhecido: Snebur.Reflexao.TipoDesconhecido;
        public readonly TipoListaVazia: Snebur.Reflexao.TipoListaVazia;
        public readonly TipoListaItemDesconhecido: Snebur.Reflexao.TipoListaVazia;
        public readonly TipoDicionarioVazio: Snebur.Reflexao.TipoDicionarioVazio;

        constructor()
        {
            this.Tipos = new DicionarioSimples<BaseTipo>();

            this.TipoNulo = new Snebur.Reflexao.TipoNulo();
            this.TipoDesconhecido = new Snebur.Reflexao.TipoDesconhecido();
            this.TipoListaVazia = new Snebur.Reflexao.TipoListaVazia();
            this.TipoListaItemDesconhecido = new Snebur.Reflexao.TipoListaItemDesconhecido();
            this.TipoDicionarioVazio = new Snebur.Reflexao.TipoDicionarioVazio();

            this.Tipos.Adicionar(this.TipoNulo.Nome, this.TipoNulo);
            this.Tipos.Adicionar(this.TipoDesconhecido.Nome, this.TipoDesconhecido);
            this.Tipos.Adicionar(this.TipoListaVazia.Nome, this.TipoListaVazia);
            this.Tipos.Adicionar(this.TipoDicionarioVazio.Nome, this.TipoDicionarioVazio);
        }

        public Inicializar()
        {
            if (!this._isInicializado)
            {
                this.TipoListaVazia.Propriedades.Add(new Propriedade("Count", __$tipoTipoPrimario_Integer, null, false));
                this.TipoListaItemDesconhecido.Propriedades.Add(new Propriedade("Count", __$tipoTipoPrimario_Integer, null, false));
                this.TipoDicionarioVazio.Propriedades.Add(new Propriedade("Count", __$tipoTipoPrimario_Integer, null, false));

                if ($Configuracao.IsDebug)
                {
                    this.Tipos.EventoItemAlterado.AddHandler(this.Tipos_ItemAlterado, this);
                }
                this._isInicializado = true;
            }
        }

        private Tipos_ItemAlterado(provedor: any, e: ItemDicionarioAlteradoEventArgs)
        {
            if (e.Chave === "ItemPromocaoRevelacaoViewModel" ||
                e.Chave === "ItemPromocaoFotoProducaoViewModel")
            {
                if (e.Chave !== (e.Item as r.TipoGenerico).Construtor.name ||
                    e.Chave !== (e.Item as r.TipoGenerico).CaminhoTipo)
                {
                    throw new Erro("O tipo é invalido");
                }
            }
        }

        public IsCriarNovoTipoGenerico(caminhoTipo: string, construtorOuObjeto: any)
        {
            if (caminhoTipo === "Snebur.Dominio.BaseViewModel")
            {
                const construtor = this.NormalizarConstrutor(construtorOuObjeto);
                return construtor !== Snebur.Dominio.BaseViewModel;
            }

            if (caminhoTipo === "Snebur.Objeto")
            {
                const construtor = this.NormalizarConstrutor(construtorOuObjeto);
                return construtor !== Snebur.SneburObject;
            }

            if (this.IsBaseTipoGenerico(caminhoTipo))
            {
                throw new ErroNaoImplementado();
            }
            return false;
        }

        public IsBaseTipoGenerico(caminhoTipo: string)
        {
            return caminhosGenericos[caminhoTipo];
        }

        public AdicionarNovoTipoGenerico(caminhoTipoGenerico: string, construtorOuObjeto: any): void
        {
            const tipoBase = $Reflexao.Tipos.Item(caminhoTipoGenerico);
            const construtor = this.NormalizarConstrutor(construtorOuObjeto);
            const caminhoTipo = construtor.name;

            if (this.Tipos.ContainsKey(caminhoTipo))
            {
                throw new Erro(`Não é possível criar um tipo genérico, o caminho '${construtor.name}' já existe`);
            }
            const novoTipoGenerico = new r.TipoGenerico(construtor, tipoBase);
            if (novoTipoGenerico.CaminhoTipo !== caminhoTipo)
            {
                throw new Erro("Caminho invalido");

            }
            construtorOuObjeto.__CaminhoTipo = caminhoTipo;
            this.Tipos.Add(caminhoTipo, novoTipoGenerico);
        }

        private NormalizarConstrutor(construtorOuObjeto: any): Function
        {
            if (construtorOuObjeto instanceof Snebur.SneburObject)
            {
                return construtorOuObjeto.constructor;
            }

            if (typeof construtorOuObjeto === "function")
            {
                return construtorOuObjeto;
            }
            throw new Error("O construtor não foi encontrado");
        }
    }

    const caminhosGenericos: any = {
        "Snebur.Dominio.BaseViewModel": true,
        "Snebur.Dominio.BaseDominio": true,
        "Snebur.Objeto": true,
        "Snebur.ObjetoControladorPropriedade": true
    };
}