namespace Snebur.Dominio.Atributos
{
    export abstract class BaseAtributoValidacao extends Snebur.Dominio.Atributos.BaseAtributoDominio implements IValidacao
    {
        public readonly TipoValidacao: EnumTipoValidacao = EnumTipoValidacao.Normal;
        public readonly UltimaMensagemValidacao?: string;
        public readonly IsForcando?: boolean;
        public IsAlerta: boolean = false;

        public constructor(inicializador?: Partial<BaseAtributoValidacao>)
        {
            super(inicializador);
        }

        public RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
        {
            throw new Erro("Esse método deve ser implementando na Partial da classe atributo", this);
        }

        public IsValido(paiPropriedade: ObjetoControladorPropriedade, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
        {
            throw new Erro("Esse método deve ser implementando na Partial da classe atributo", this);
        }

        public async IsValidoAsync(paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any): Promise<boolean>
        {
            return this.IsValido(paiPropriedade, propriedade, valorPropriedade);
        }
    }
}