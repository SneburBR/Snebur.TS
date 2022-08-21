namespace Snebur
{
    export declare type PropriedadeAlteradaHandlder = EventoHandler<PropriedadeAlteradaEventArgs>;

    export class PropriedadeAlteradaEventArgs<T = any> extends EventArgs
    {
        public readonly PropriedadeAlterada: d.PropriedadeAlterada;

        public readonly Propriedade: r.Propriedade;

        public get NomePropriedade(): string
        {
            return this.Propriedade?.Nome;
        }

        public get AntigoValor(): T
        {
            return this.PropriedadeAlterada.AntigoValor;
        }

        public get NovoValor(): T
        {
            return this.PropriedadeAlterada.NovoValor;
        }

        public get IsExisteAlteracao(): boolean
        {
            return this.AntigoValor !== this.NovoValor;
        }

        public constructor(propriedade: r.Propriedade, propriedadeAlterada: d.PropriedadeAlterada)
        {
            super();

            if (!(propriedadeAlterada instanceof d.PropriedadeAlterada))
            {
                throw new Erro("a propriedadeAlterada não foi definida");
            }

            this.Propriedade = propriedade;
            this.PropriedadeAlterada = propriedadeAlterada;
        }


        //public constructor(nomePropriedade: string, propriedade: r.Propriedade, antigoValor: any, novoValor: any)
        //{
        //    super();

        //    this.NomePropriedade = nomePropriedade;
        //    //this.Propriedade = propriedade;
        //    this.AntigoValor = antigoValor;
        //    this.NovoValor = novoValor;
        //}
    }
}