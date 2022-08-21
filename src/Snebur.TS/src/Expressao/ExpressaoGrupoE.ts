namespace Snebur.Expressao
{
    export class ExpressaoGrupoE extends ExpressaoGrupo
    {
        public constructor(expressaoTexto: string,
            tipoPrefixo: r.TipoBaseDominio,
            prefixo: string,
            argumentos: Array<any>)
        {
            super(expressaoTexto, tipoPrefixo, prefixo, argumentos);
        }

        public get OPERADOR_GRUPO(): string
        {
            return ExpressaoGrupo.OPERADOR_GRUPO_E;
        } 
    }
}