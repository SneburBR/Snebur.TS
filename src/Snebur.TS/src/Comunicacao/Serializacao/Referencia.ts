namespace Snebur.Serializacao
{
    export abstract class Referencia
    {
         
    }

    export class ReferenciaRaiz extends Referencia
    {

    }

    export class ReferenciaColecao extends Referencia
    {
        public readonly Colecao: Array<any>
        public readonly Posicao: number

        public constructor(inicializar: Partial<ReferenciaColecao>)
        {
            super();
            Object.assign(this, inicializar);
        }
    }

    export class ReferenciaDicionario extends Referencia
    {
        public readonly Dicionario: DicionarioSimples;
        public readonly Chave: string;

        public constructor(inicializar: Partial<ReferenciaDicionario>)
        {
            super();
            Object.assign(this, inicializar);
        }
    }

    export class ReferenciaPropriedade extends Referencia
    {
        public readonly ObjetoPai: any;
        public readonly Propriedade: r.Propriedade;

        public constructor(inicializar: Partial<ReferenciaPropriedade>)
        {
            super();
            Object.assign(this, inicializar);
        }
    }

    export class BaseDominioRefenciada
    {
        public readonly BaseDominio: IBaseDominioReferencia;
        public readonly Referencia: Referencia;
        public readonly IdentificadorReferencia: string

        public constructor(inicializar: Partial<BaseDominioRefenciada>)
        {
            Object.assign(this, inicializar);
        }
    }

    export class BaseDominioOrigem
    {
        public readonly BaseDominio: IBaseDominioReferencia;
        public readonly Referencias = new Array<Referencia>();
        public readonly BaseDominioRefenciadas = new Array<BaseDominioRefenciada>();
        public ReferenciaOrigem: Referencia;

        public constructor(baseDominio: IBaseDominioReferencia)
        {
            this.BaseDominio = baseDominio;
        }

    }
}
