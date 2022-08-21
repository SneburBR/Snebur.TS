namespace Snebur.Reflexao
{
    export class TipoListaEntidade extends TipoListaBaseDominio
    {
        public TipoBaseEntidade: TipoEntidade
        public static PropriedadeEntidadesRemovida: Propriedade = null;

        public constructor(nome: string, _namespace: string, assemblyQualifiedName: string, tipoBaseEntidade: TipoEntidade)
        {
            super(nome, _namespace, assemblyQualifiedName, tipoBaseEntidade);
            //this.TipoBaseDominio = tipoListaBase.TipoBaseDominio;

            if (!(tipoBaseEntidade instanceof r.TipoEntidade))
            {
                throw new ErroOperacaoInvalida("O tipo entidade é invalido", this);
            }
            this.TipoReflexao = EnumTipoReflexao.TipoListaEntidade;
            this.TipoBaseEntidade = tipoBaseEntidade;

            if (TipoListaEntidade.PropriedadeEntidadesRemovida == null)
            {
                TipoListaEntidade.PropriedadeEntidadesRemovida = this.RetornarPropriedadeEntidadesRemovida();
            }
        }

        public override RetornarTipoItemLista(): TipoEntidade
        {
            return this.TipoBaseDominio as TipoEntidade;
        }

        private RetornarPropriedadeEntidadesRemovida(): Propriedade
        {
            const tipoListaEntidades = this.RetornarTipoListaEntidades();
            return new Propriedade("EntidadesRemovida", tipoListaEntidades, this, false);
        }

        private RetornarTipoListaEntidades(): TipoListaBaseDominio
        {
            return __$tipoListaBaseDominio_Snebur_Dominio_Entidade;
        }
    }
}