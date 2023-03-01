namespace Snebur.UI
{
    export class GerenciadorRotas
    {
        private static RotasNavegador = new DicionarioSimples<RotasNavegador>();

        public static IsExisteRota(identificadorNavegador: string, caminho: string): boolean
        {
            if (RotaUtil.IsRota(caminho))
            {
                const rotasNavegador = GerenciadorRotas.RetornarRodasNavegador(identificadorNavegador);
                return rotasNavegador.IsExisteRota(caminho);
            }
            return false;
        }

        public static RetornarRota(identificadorNavegador: string, caminho: string): Rota
        public static RetornarRota(identificadorNavegador: string, pagina: Pagina): Rota
        public static RetornarRota(identificadorNavegador: string, construtorPagina: IPaginaConstrutor, parametros?: any): Rota
        public static RetornarRota(identificadorNavegador: string, paginaOuCaminho: Pagina | string | IPaginaConstrutor, parametros?: any): Rota
        {
            if (paginaOuCaminho == null)
            {
                return null;
            }
            const rotasNavegador = GerenciadorRotas.RetornarRodasNavegador(identificadorNavegador);
            return rotasNavegador.RetornarRota(paginaOuCaminho, parametros);
        }

        public static AdicionarRota(rota: Rota): void;
        public static AdicionarRota(identificadorNavegador: string, rota: Rota): void;
        public static AdicionarRota(rotaOuIdentificadorNavegador: string | Rota, rotaArgs?: Rota): void
        {
            const rota = rotaArgs instanceof Rota ? rotaArgs : rotaOuIdentificadorNavegador instanceof Rota ? rotaOuIdentificadorNavegador : null;
            const identificadorNavegador = typeof rotaOuIdentificadorNavegador === "string" ? rotaOuIdentificadorNavegador : undefined;

            ValidacaoUtil.ValidarArgumentoInstanciaDe(rota, Rota);

            const rotasNavegador = GerenciadorRotas.RetornarRodasNavegador(identificadorNavegador);
            rotasNavegador.AdicionarRota(rota);
        }

        public static RetornarRodasNavegador(identificadorNavegador: string = NavegadorPrincipal.IDENTIFICADOR)
        {
            if (identificadorNavegador == null)
            {
                identificadorNavegador = NavegadorPrincipal.IDENTIFICADOR;
            }
            if (!GerenciadorRotas.RotasNavegador.ContainsKey(identificadorNavegador))
            {
                GerenciadorRotas.RotasNavegador.Add(identificadorNavegador, new RotasNavegador(identificadorNavegador));
            }
            return GerenciadorRotas.RotasNavegador.Item(identificadorNavegador);
        }
    }

    export class RotasNavegador
    {
        private readonly DicionarioCaminhos = new DicionarioSimples<Rota>();
        private readonly DicionarioRotasPagina = new DicionarioSimples<RotasPagina>();

        public get Navegador()
        {
            if ($Aplicacao.DocumentoPrincipal != null)
            {
                const navegador = $Aplicacao.DocumentoPrincipal.RetornarNavegador(this.IdentificadorNavegador);
                if (navegador == null)
                {
                    throw new Erro(`Não foi possível encontrar o navegador do identificador ${this.IdentificadorNavegador}`);
                }
                return navegador;
            }
            return null;
        }

        public constructor(
            public readonly IdentificadorNavegador: string)
        {

        }

        public IsExisteRota(caminho: string): boolean
        {
            caminho = RotaUtil.NormalizarCaminho(caminho);
            return this.DicionarioCaminhos.ContainsKey(caminho);
        }

        public AdicionarRota(rota: Rota)
        {
            if (typeof rota.ConstrutorPagina !== "function")
            {
                throw new Erro("O construtor da página não foi definido");
            }

            RotaUtil.ValidarCaminho(rota.Caminho);

            const caminho = rota.Caminho;
            if (this.DicionarioCaminhos.ContainsKey(caminho))
            {
                throw new Erro(`A caminho da rota '${caminho}' já exite`);
            }
            this.DicionarioCaminhos.Add(caminho, rota);

            const rotasPaginas = this.RetornarRotasPagina(rota.ConstrutorPagina);
            rotasPaginas.AdicionarRota(rota);
        }

        public RetornarRota(pagina: Pagina): Rota
        public RetornarRota(caminho: string): Rota
        public RetornarRota(construtorPagina: IPaginaConstrutor, parametros?: any): Rota
        public RetornarRota(paginaOuCaminho: Pagina | string | IPaginaConstrutor, parametros?: any): Rota
        public RetornarRota(paginaOuCaminho: Pagina | string | IPaginaConstrutor, parametros?: Partial<Pagina>): Rota
        {
            if (typeof paginaOuCaminho === "string")
            {
                RotaUtil.ValidarCaminho(paginaOuCaminho);
                const caminho = RotaUtil.NormalizarCaminho(paginaOuCaminho);
                if (this.DicionarioCaminhos.ContainsKey(caminho))
                {
                    return this.DicionarioCaminhos.Item(caminho);
                }
                console.error(`Não foi encontrada a rota para o caminho: ${caminho} `);
                return null;
            }

            if (paginaOuCaminho instanceof Pagina ||
                typeof paginaOuCaminho === "function")
            {
                const caminhoTipo = paginaOuCaminho.__CaminhoTipo;
                if (!this.DicionarioRotasPagina.ContainsKey(caminhoTipo))
                {
                    console.warn(`ignore: Não existe nenhuma rota configurada para construtor da página '${caminhoTipo}'`);
                    return null;
                }
                const rotasPagina = this.DicionarioRotasPagina.Item(caminhoTipo);
                if (paginaOuCaminho instanceof Pagina)
                {
                    return rotasPagina.RetornarRota(paginaOuCaminho);
                }
                return rotasPagina.RetornarRota(parametros);
            }

            throw new Erro("O argumento paginaOuCaminho é invalido");
        }

        private RetornarRotasPagina(construtorPagina: IPaginaConstrutor<Pagina>): RotasPagina
        {
            const caminhoTipo = construtorPagina.__CaminhoTipo;
            if (!this.DicionarioRotasPagina.ContainsKey(caminhoTipo))
            {
                this.DicionarioRotasPagina.Add(caminhoTipo, new RotasPagina(construtorPagina));
            }
            return this.DicionarioRotasPagina.Item(caminhoTipo);
        }
    }

    export class RotasPagina
    {
        private readonly Rotas = new List<Rota>();

        public constructor(
            public readonly ConstrutorPagina: IPaginaConstrutor)
        {
        }

        public AdicionarRota(rota: Rota): void
        {
            if (this.Rotas.Any(x => x.Equals(rota)))
            {
                const parametrosSerializado = JSON.stringify(rota.Parametros ?? null);
                console.error(`Já existe uma rota para a Página ${this.ConstrutorPagina.GetType().Nome} com os parâmetros ${parametrosSerializado} `);
                return;
            }
            this.Rotas.Add(rota);
        }

        public RetornarRota(paginaOuParametros?: Partial<Pagina>): Rota
        {
            if (this.Rotas.Count === 0)
            {
                console.error(`Não existe nenhuma rota configurada para construtor da página '${this.ConstrutorPagina.__CaminhoTipo}'`);
                return null;
            }

            if (this.Rotas.Count === 1)
            {
                return this.Rotas.Single();
            }

            if (paginaOuParametros != null)
            {
                const melhorRota = this.RetornarMelhorRota(paginaOuParametros);
                if (melhorRota != null)
                {
                    return melhorRota;
                }
            }

            return this.Rotas.Where(x => x.Parametros == null).FirstOrDefault() ??
                this.Rotas.First();
        }

        private RetornarMelhorRota(paginaOuParametros: Partial<Pagina>): Rota
        {
            return this.Rotas.Where(x => x.IsParametrosIgual(paginaOuParametros)).FirstOrDefault();
        }
    }
}