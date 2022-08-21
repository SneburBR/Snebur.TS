namespace Snebur
{
    export abstract class BaseValidacao extends Snebur.Objeto implements IBaseValidacao
    {
        public readonly IsForcando: boolean = false;

        public IsAlerta: boolean = false;

        public abstract RetornarMensagemValidacao(paiPropriedade: any, propriedade: r.Propriedade, valorPropriedade: any): string;

        public abstract TipoValidacao: EnumTipoValidacao;

        public abstract IsValidoAsync(paiPropriedade: ObjetoControladorPropriedade, propriedade: r.Propriedade, valorPropriedade: any): Promise<boolean> | boolean;
    }
}

