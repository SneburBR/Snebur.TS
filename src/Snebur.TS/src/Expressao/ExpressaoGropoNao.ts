namespace Snebur.Expressao
{
    export class ExpressaoGrupoNao extends ExpressaoGrupo
    {
        public get OPERADOR_GRUPO(): string
        {
            return ExpressaoGrupo.OPERADOR_GRUPO_NAO;
        } 

        public constructor(expressaoTexto: string, tipoPrefixo: r.TipoBaseDominio, prefixo: string, argumentos: Array<any>)
        {
            super(expressaoTexto, tipoPrefixo, prefixo, argumentos);
        }
    }
}