
namespace Snebur.Serializacao
{
    export class BaseDominioReferencia extends Snebur.Dominio.BaseDominio 
    {
        private _caminhoTipo: string;

        public override get __CaminhoTipo(): string
        {
            return this._caminhoTipo;
        }

        public constructor(baseDominioOrigem: d.BaseDominio)
        {
            super();

            this.__IsBaseDominioReferencia = true;
            this.__IdentificadorReferencia = baseDominioOrigem.RetornarIdentificadorReferencia();
            this._caminhoTipo = baseDominioOrigem.__CaminhoTipo;
        }

        public SetCaminhoTipo(caminhoTipo: string): void
        {
            this._caminhoTipo = caminhoTipo;
        }
    }
}
