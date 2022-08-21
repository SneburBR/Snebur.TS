

namespace Snebur.UI
{
    export class PaginaAlteradaEventArgs extends EventArgs
    {
        public readonly Pagina: Pagina;
        public readonly Parametros: DicionarioSimples<any, string>;

        public constructor(pagina: Pagina, parametros: DicionarioSimples<any, string>)
        {
            super();
            this.Pagina = pagina;
            this.Parametros = parametros;
        }
    }

    export class AntesNavegarEventArgs extends EventArgs
    {
        public readonly PaginaAtual: Pagina;
        public readonly ProximaPagina: IPaginaConstrutor | Pagina | typeof Pagina;
        public readonly Parametros: DicionarioSimples;

        public get Pagina(): Pagina
        {
            if ($Configuracao.IsDebug)
            {
                throw new Erro("Utilizar propriedade PaginaAtual evento: AntesNavegarEventArgs ");
            }
            return this.PaginaAtual;
        }
        public constructor(paginaAtual: Pagina, refProximaPagina: IPaginaConstrutor | Pagina | typeof Pagina, parametros: DicionarioSimples)
        {
            super();
            this.PaginaAtual = paginaAtual;
            this.ProximaPagina = refProximaPagina;
            this.Parametros = parametros;
        }
    }


}