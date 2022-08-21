namespace Snebur.Reflexao
{
    export class NamespaceRaiz extends BaseNamespace
    {
        public override get Caminho(): string
        {
            return this.Nome;
        }

        public constructor(tipoNamespace: EnumTipoNamespace, nome: string)
        {
            super(null, tipoNamespace, nome);
        }

        protected override RetornarCaminho(): string
        {
            return this.Nome;
        }

        protected override RetornarIntancia(): any
        {
            const instanciaEval = eval(this.Nome);
            if (instanciaEval == null)
            {
                throw new Erro(`Não foi encontrada a instancia para o namespace raiz ${this.Nome}`);
            }
            const instanciaGlobal = (globalThis as any)[this.Nome];
            if (instanciaGlobal != null &&
                instanciaGlobal !== instanciaEval)
            {
                throw new Erro(`Existe conflito de mais de uma instacia encontrada para cmainho namespace ${this.Caminho}`);
            }
            return instanciaEval;
        }

        private RetornarInstanciaInterno(base: any, caminho: string): any
        {
            const instancia = (base == null) ? eval(caminho) : base[caminho];
            if (instancia == null)
            {
                const local = base == null ? "LOCAL (null)" :
                    base?.__CaminhoTipo ?? base.constructor.name;

                throw new Erro(`Não foi possível encontrar o namespace em '${local}'
                                Caminho: ${this.Caminho}`);
            }
            return instancia;
        }

        protected RetornarPrioridade(): number
        {
            return this.TipoNamespace;
        }
    }
}