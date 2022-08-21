namespace Snebur 
{
    export abstract class ValidacaoNormal extends BaseValidacao
    {
        public TipoValidacao: EnumTipoValidacao = EnumTipoValidacao.Normal;

        public IsValidoAsync(paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any): Promise<boolean> | boolean
        {
            return this.IsValido(paiPropriedade, propriedade, valorPropriedade);
        }

        public abstract IsValido(paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any): boolean;
    }
}
