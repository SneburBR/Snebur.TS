namespace Snebur
{
    export declare type TipoFuncaoRetornarMensagemValidacao = (paiPropriedade: any, propriedade: r.Propriedade, valorPropriedade: any) => string;

    export abstract class BaseValidacaoPersonalizada extends Snebur.SneburObject implements IBaseValidacao
    {
        public readonly abstract TipoValidacao: EnumTipoValidacao;
        public readonly FuncaoRetornarMensagemValidacao: TipoFuncaoRetornarMensagemValidacao;

        public constructor(funcaoRetornarMensagemValidacao: TipoFuncaoRetornarMensagemValidacao)
        {
            super();
            this.FuncaoRetornarMensagemValidacao = funcaoRetornarMensagemValidacao;
        }

        public RetornarMensagemValidacao(paiPropriedade: any, propriedade: r.Propriedade, valorPropriedade: any): string
        {
            return this.FuncaoRetornarMensagemValidacao(paiPropriedade, propriedade, valorPropriedade);
        }

        public abstract IsValidoAsync(paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any): Promise<boolean>;
    }
}
