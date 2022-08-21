namespace Snebur.Expressao
{
    export class ExpressaoGrupoOu extends ExpressaoGrupo
    {
        public get OPERADOR_GRUPO(): string
        {
            return ExpressaoGrupo.OPERADOR_GRUPO_OU;
        } 

        public constructor(expressaoTexto: string, tipoPrefixo: r.TipoBaseDominio, prefixo: string, argumentos: Array<any>)
        {
            super(expressaoTexto, tipoPrefixo, prefixo, argumentos);
        }
    }
}