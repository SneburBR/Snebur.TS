namespace Snebur.UI
{
    export class Rota
    {
        public readonly ConstrutorPagina: IPaginaConstrutor;
        public readonly Caminho: string;
        public readonly Titulo: string;
        public readonly PalavrasChave: string;
        public readonly Descricao: string;
        public Parametros: any;
        public IsIgnorarRotaRecarregar: boolean = false;

        public constructor(partial: Partial<Rota>)
        {
            this.ConstrutorPagina = partial.ConstrutorPagina;
            Object.assign(this, partial);

            if (this.Caminho == null)
            {
                throw new Erro("O caminho da rota não foi definido");
            }

            if (!RotaUtil.IsRota(this.Caminho))
            {
                throw new Erro("O caminho da rota de iniciar com '/' ");
            }

            if (typeof this.ConstrutorPagina !== "function")
            {
                throw new Erro("O construtor da página não foi definido");
            }
            this.Caminho = RotaUtil.NormalizarCaminho(partial.Caminho);
        }

        public ConstruirRota(identificadorNavegador: string, parametros: DicionarioSimples<any, string>): string
        public ConstruirRota(navegador: BaseNavegador, parametros: DicionarioSimples<any, string>): string
        public ConstruirRota(navegadorOuIdentificador: BaseNavegador | string, parametros: DicionarioSimples<any, string>): string
        {
            const navegador = this.RetornarNavegador(navegadorOuIdentificador);
            const caminhoRota = this.ConstruirRotaInterno(navegador, parametros);
            if (!caminhoRota.startsWith("/"))
            {
                throw new Erro("O caminho da rota deve inicializar com '/'");
            }
            return caminhoRota;
        }

        private RetornarNavegador(navegadorOuIdentificador: BaseNavegador | string): BaseNavegador
        {
            if (navegadorOuIdentificador instanceof BaseNavegador)
            {
                return navegadorOuIdentificador;
            }
            return $Aplicacao.DocumentoPrincipal.RetornarNavegador(navegadorOuIdentificador);
        }

        private ConstruirRotaInterno(
            navegador: BaseNavegador,
            parametros: DicionarioSimples<any, string>): string
        {
            if (parametros?.Count > 0)
            {
                const xxx = "";
                /*console.warn("ConstruirRota pametros não implementado ");*/
            }

            const caminho = this.RetornarCaminnho(navegador);
            const search = new URLSearchParams(document.location.search);
            search.forEach((value, key, p) =>
            {
                if (key.startsWith("m--"))
                {
                    p.delete(key);
                }
            });

            const searchString = search.toString();
            if (!String.IsNullOrWhiteSpace(searchString))
            {
                return `${caminho}?${searchString}`;
            }
            return caminho;
        }

        private RetornarCaminnho(navegador: BaseNavegador)
        {
            if (navegador == null)
            {
                throw new Erro("O navegador não foi definido");
            }
            return RotaUtil.NormalizarCaminho(navegador.CaminhoRota + this.Caminho, true);
        }

        public Equals(rota: any): boolean
        {
            if (this === rota)
            {
                return true;
            }

            if (rota instanceof Rota)
            {
                return this.ConstrutorPagina === rota.ConstrutorPagina &&
                    this.IsParametrosIgual(rota.Parametros);
            }
            return false;
        }

        public IsParametrosIgual(parametros: any): boolean
        {
            if (this.Parametros == null &&
                parametros == null)
            {
                return true;
            }

            if (this.Parametros != null && parametros != null)
            {
                return PaginaUtil.IsParametrosIgual(this.Parametros, parametros);
            }
            return false;
        }
    }
}