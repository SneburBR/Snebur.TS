namespace Snebur.Dominio
{
    export abstract class BaseTipoComplexo extends Snebur.Dominio.BaseDominio implements   Snebur.Dominio.ICaminhoTipo
    {
        //#region Construtor

        private readonly PropriedadesMapeadas: List<r.Propriedade>;

        public __IsIndependente = false;
        public __Entidade: d.Entidade = null;
        public __NomePropriedadeEntidade: string;

        public constructor(inicializador?: Partial<BaseTipoComplexo>) 
        {
            super(inicializador);

            this.PropriedadesMapeadas = this.RetornarPropriedadesMapeadas();
        }

        private RetornarPropriedadesMapeadas(): List<r.Propriedade>
        {
            if (this instanceof BaseListaTipoComplexo)
            {
                return this.GetType().TipoBase.Propriedades;
            }
            else
            {
                return this.GetType().Propriedades;
            }
        }

        //#endregion

        public abstract Clone<TClone extends this =this>(): TClone;
        public abstract Clone(): BaseTipoComplexo;

        public abstract override Equals<TIgual extends this = this>(obj: TIgual): boolean;
        public abstract override Equals(obj: BaseTipoComplexo): boolean;

        public override NotificarValorPropriedadeAlterada(nomePropriedade: string, antigoValor: any, novoValor?: any)
        {
            if (this.__Entidade instanceof d.Entidade)
            {
                const caminhoPropriedade = `${this.__NomePropriedadeEntidade}_${nomePropriedade}`;
                (this.__Entidade as any as IObjetoControladorPropriedade).NotificarValorPropriedadeAlterada(caminhoPropriedade, antigoValor, novoValor);
                //super.NotificarValorPropriedadeAlterada(nomePropriedade, antigoValor, novoValor);
            }
            super.NotificarValorPropriedadeAlterada(nomePropriedade, antigoValor, novoValor);
        }

        public NotificarTodasPropriedadesAlteradas(objetoAntigo: BaseTipoComplexo): void
        {
            for (const propriedade of this.PropriedadesMapeadas)
            {
                const antigoValor = propriedade.RetornarValor(objetoAntigo);
                const novoValor = propriedade.RetornarValor(this);
                const caminhoPropriedade = `${this.__NomePropriedadeEntidade}_${propriedade.Nome}`;
                (this.__Entidade as any as IObjetoControladorPropriedade).NotificarValorPropriedadeAlterada(caminhoPropriedade, antigoValor, novoValor);
            }
        }
    }
}