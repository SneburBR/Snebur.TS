
namespace Snebur.Dominio.Atributos 
{
    export abstract class BaseAtributoValidacaoAsync extends Snebur.Dominio.Atributos.BaseAtributoDominio implements IValidacaoAsync
    {
        public readonly TipoValidacao: EnumTipoValidacao = EnumTipoValidacao.Async;
        public readonly UltimaMensagemValidacao?: string;
        public readonly IsForcando?: boolean;
        public IsAlerta: boolean = false;

        public constructor(inicializador?: Partial<BaseAtributoDominio>)
        {
            super(inicializador);
        }

        public RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
        {
            throw new Erro("Esse método deve ser implementando na Partial da classe atributo", this);
        }

        public IsValidoAsync(paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any): boolean | Promise<boolean>
        {
            throw new Erro("Esse método deve ser implementando na Partial da classe atributo", this);
        }
    }

}