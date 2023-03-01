namespace Snebur.Reflexao
{
    export class NamespaceFilho extends BaseNamespace
    {
        public get NamespacePai(): BaseNamespace
        {
            return this._namespacePai;
        }

        public constructor(
            namespacePai: BaseNamespace,
            tipoNamespace: EnumTipoNamespace,
            nome: string)
        {
            super(namespacePai, tipoNamespace, nome);
        }

        protected override RetornarCaminho(): string
        {
            return `${this.NamespacePai.Caminho}.${this.Nome}`;
        }

        protected override RetornarIntancia(): any
        {
            const instancia = this.NamespacePai.Instancia[this.Nome];
            if (instancia == null)
            {
                throw new Erro(`Não foi possível encontrar a instancia do namespace ${this.Caminho}`);
            }
            return instancia;
        }

        protected RetornarPrioridade(): number
        {
            return this.TipoNamespace;
        }
    }
}