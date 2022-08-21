namespace Snebur.UI
{
    export abstract class MapeamentoPropriedadeApresentacao<TComponenteApresentacao extends ComponenteApresentacao = ComponenteApresentacao>
    {
        public readonly DicionarioPropriedades = new DicionarioSimples<IPropriedadeApresentacao>();
        public readonly PropriedadesOrdenadas = new List<IPropriedadeApresentacao>();

        public constructor()
        {
            this.Inicializar();
        }

        protected Mapear(expressaoProprieade: (value: TComponenteApresentacao) => any, propriedade: IPropriedadeApresentacao): void
        protected Mapear(expressaoProprieade: (value: TComponenteApresentacao) => any, propriedade: IPropriedadeApresentacao, isRedudante: boolean): void
        protected Mapear(expressaoProprieade: (value: TComponenteApresentacao) => any, propriedade: IPropriedadeApresentacao, isRedudante: boolean = false): void
        {
            const nomePropriedade = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoProprieade);
            propriedade.NomePropriedade = nomePropriedade;
            propriedade.IsRedundante = isRedudante;
            this.DicionarioPropriedades.Add(nomePropriedade, propriedade);
            this.PropriedadesOrdenadas.Add(propriedade);

        }

        protected Remover(expressaoProprieade: (value: TComponenteApresentacao) => any)
        {
            const nomePropriedade = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoProprieade);
            const propriedade = this.DicionarioPropriedades.Item(nomePropriedade);
            this.DicionarioPropriedades.Remove(nomePropriedade);
            this.PropriedadesOrdenadas.Remove(propriedade);
        }

        protected abstract Inicializar(): void

    }

}
