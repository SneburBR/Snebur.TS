namespace Snebur.AcessoDados
{
    export abstract class BaseConsultaEntidade extends Snebur.SneburObject
    {
        protected _tipoEntidadeConsulta: r.TipoEntidade;
        public readonly ContextoDados: BaseContextoDados;
        public readonly EstruturaConsulta: EstruturaConsulta;

        public get TipoEntidadeConsulta(): r.TipoEntidade
        {
            return this._tipoEntidadeConsulta;
        }

        public constructor(contextoDados: BaseContextoDados, tipoEntidade: r.BaseTipo, estruturaConsulta?: EstruturaConsulta)
        {
            super();

            if (!(tipoEntidade instanceof r.TipoEntidade))
            {
                throw new Erro(`O tipo da entidade não é suportado ${tipoEntidade.Nome}`, this);
            }
            this.ContextoDados = contextoDados;
            this._tipoEntidadeConsulta = tipoEntidade;
            this.EstruturaConsulta = this.__RetornarEstruturaConsulta(estruturaConsulta);
            this.EstruturaConsulta.TipoEntidadeConsulta = tipoEntidade;
        }

        private __RetornarEstruturaConsulta(estruturaConsulta: EstruturaConsulta | undefined): EstruturaConsulta
        {
            if (u.ValidacaoUtil.IsDefinido(estruturaConsulta))
            {
                if (!(estruturaConsulta instanceof EstruturaConsulta))
                {
                    throw new ErroOperacaoInvalida("O consulta é invalida", this);
                }
                return estruturaConsulta;
            }
            else
            {
                return this.RetornarNovaEstruturaConsulta();
            }
        }

        private RetornarNovaEstruturaConsulta(): EstruturaConsulta
        {
            const tipoEntidade = this.TipoEntidadeConsulta;
            const novoEstruturaConsulta = new EstruturaConsulta();
            novoEstruturaConsulta.NomeTipoEntidade = tipoEntidade.Nome;
            novoEstruturaConsulta.TipoEntidadeAssemblyQualifiedName = tipoEntidade.AssemblyQualifiedName;
            novoEstruturaConsulta.TipoEntidadeConsulta = tipoEntidade;
            novoEstruturaConsulta.TipoFuncaoEnum = EnumTipoFuncao.Consulta;
            return novoEstruturaConsulta;
        }
    }
}