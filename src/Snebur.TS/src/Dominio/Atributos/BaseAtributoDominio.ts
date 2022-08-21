namespace Snebur.Dominio.Atributos
{
    export abstract class BaseAtributoDominio extends Snebur.Dominio.BaseDominio
    {
        public constructor(inicializador?: Partial<BaseAtributoDominio>)
        {
            super(inicializador);
        }
    }
}