namespace Snebur
{
    export declare type TipoIsValido = (paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any) => boolean;

    export class ValidacaoPersonalizada extends BaseValidacaoPersonalizada implements IValidacao
    {
        public readonly TipoValidacao: EnumTipoValidacao = EnumTipoValidacao.Normal;
        public readonly FuncaoIsValido: TipoIsValido;

        public constructor(funcaoRetornarMensagemValidacao: TipoFuncaoRetornarMensagemValidacao, funcaoIsValidoAsync: TipoIsValido)
        {
            super(funcaoRetornarMensagemValidacao);
            this.FuncaoIsValido = funcaoIsValidoAsync;
        }

        public IsValido(paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any): boolean
        {
            return this.FuncaoIsValido(paiPropriedade, propriedade, valorPropriedade);
        }

        public async IsValidoAsync(paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any): Promise<boolean>
        {
            return this.IsValido(paiPropriedade, propriedade, valorPropriedade);
        }

    }
}
