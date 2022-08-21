namespace Snebur
{
    export declare type TipoIsValidoAsync = (paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any) => Promise<boolean>;

    export class ValidacaoPersonalizacaoAsync extends BaseValidacaoPersonalizada implements IValidacaoAsync
    {
        public readonly TipoValidacao: EnumTipoValidacao = EnumTipoValidacao.Normal;
        public readonly FuncaoIsValidoAsync: TipoIsValidoAsync;
         
        public constructor(funcaoRetornarMensagemValidacao: TipoFuncaoRetornarMensagemValidacao, funcaoIsValidoAsync: TipoIsValidoAsync)
        {
            super(funcaoRetornarMensagemValidacao);
            this.FuncaoIsValidoAsync = funcaoIsValidoAsync;
        }

        public IsValidoAsync(paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any): Promise<boolean>
        {
            return this.FuncaoIsValidoAsync(paiPropriedade, propriedade, valorPropriedade);
        }
    }
}
