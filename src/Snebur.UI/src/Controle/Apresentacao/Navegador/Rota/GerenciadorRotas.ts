namespace Snebur.UI
{
    export class GerenciadorRotas
    {
        private static TodasRotasConstrutorPagina = new DicionarioSimples<IPaginaConstrutor>();
        private static RotasNavegador = new DicionarioSimples<RotasNavegador>();
        private static RotasEpescial = new DicionarioSimples<RotaEspecial>();

        public static IsExisteRota(identificadorNavegador: string, caminho: string): boolean
        {
            const primeiraParteRota= RotaUtil.RetornarPrimeroCaminho(caminho);
            if (this.RotasEpescial.ContainsKey(primeiraParteRota))
            {
                return true;
            }

            if (RotaUtil.IsRota(caminho))
            {
                const rotasNavegador = GerenciadorRotas.RetornarRodasNavegador(identificadorNavegador);
                return rotasNavegador.IsExisteRota(caminho);
            }
            return false;
        }

        public static IsExisteRotaConstrutorPagina(construtorPagina: IPaginaConstrutor)
        {
            return GerenciadorRotas.TodasRotasConstrutorPagina.ContainsKey(construtorPagina.__CaminhoTipo);
        }

        public static RetornarRota(identificadorNavegador: string, caminho: string): BaseRota
        public static RetornarRota(identificadorNavegador: string, pagina: Pagina): BaseRota
        public static RetornarRota(identificadorNavegador: string, construtorPagina: IPaginaConstrutor, parametros?: any): BaseRota
        public static RetornarRota(identificadorNavegador: string, paginaOuCaminho: Pagina | string | IPaginaConstrutor, parametros?: any): BaseRota
        {
            if (paginaOuCaminho == null)
            {
                return null;
            }
            const rotasNavegador = GerenciadorRotas.RetornarRodasNavegador(identificadorNavegador);
            const rotaPagina = rotasNavegador.RetornarRota(paginaOuCaminho, parametros);
            if (rotaPagina != null)
            {
                return rotaPagina;
            }

            if (typeof paginaOuCaminho === "string")
            {
                const primeiraParteRota = RotaUtil.RetornarPrimeroCaminho(paginaOuCaminho);
                if (this.RotasEpescial.ContainsKey(primeiraParteRota))
                {
                    return this.RotasEpescial.Item(primeiraParteRota);
                }
            }
            return null;
        }

        public static AdicionarRota(rota: BaseRota): void;
        public static AdicionarRota(identificadorNavegador: string, rota: BaseRota): void;
        public static AdicionarRota(rotaOuIdentificadorNavegador: string | BaseRota, rotaArgs?: BaseRota): void
        {
            const rota = rotaArgs instanceof BaseRota ? rotaArgs : rotaOuIdentificadorNavegador instanceof BaseRota ? rotaOuIdentificadorNavegador : null;
            const identificadorNavegador = typeof rotaOuIdentificadorNavegador === "string" ? rotaOuIdentificadorNavegador : undefined;

            ValidacaoUtil.ValidarArgumentoInstanciaDe(rota, BaseRota);

            if (rota instanceof RotaPagina)
            {
                const rotasNavegador = GerenciadorRotas.RetornarRodasNavegador(identificadorNavegador);
                rotasNavegador.AdicionarRota(rota);


                if (!GerenciadorRotas.TodasRotasConstrutorPagina.ContainsKey(rota.ConstrutorPagina.__CaminhoTipo))
                {
                    GerenciadorRotas.TodasRotasConstrutorPagina.Add(rota.ConstrutorPagina.__CaminhoTipo, rota.ConstrutorPagina);
                }
            }

            else if (rota instanceof RotaEspecial)
            {
                GerenciadorRotas.RotasEpescial.Add(rota.Caminho, rota);
            }
            else
            {
                throw new Erro("Rota não suportada");
            }
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
        private readonly DicionarioCaminhos = new DicionarioSimples<BaseRota>();
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

        public AdicionarRota(rota: RotaEspecial)
        {

            RotaUtil.ValidarCaminho(rota.Caminho);

            if (rota.ConstrutorPagina == null)
            {
                throw new Erro(`O construtor da página não foi definido para a rota '${rota.Caminho}'`);
            }

            const caminho = rota.Caminho;
            if (this.DicionarioCaminhos.ContainsKey(caminho))
            {
                throw new Erro(`A caminho da rota '${caminho}' já exite`);
            }
            this.DicionarioCaminhos.Add(caminho, rota);

            const rotasPaginas = this.RetornarRotasPagina(rota.ConstrutorPagina);
            rotasPaginas.AdicionarRota(rota);


        }

        public RetornarRota(pagina: Pagina): BaseRota
        public RetornarRota(caminho: string): BaseRota
        public RetornarRota(construtorPagina: IPaginaConstrutor, parametros?: any): BaseRota
        public RetornarRota(paginaOuCaminho: Pagina | string | IPaginaConstrutor, parametros?: any): BaseRota
        public RetornarRota(paginaOuCaminho: Pagina | string | IPaginaConstrutor, parametros?: Partial<Pagina>): BaseRota
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
        private readonly Rotas = new List<RotaPagina>();

        public constructor(
            public readonly ConstrutorPagina: IPaginaConstrutor)
        {
        }

        public AdicionarRota(rota: BaseRota): void
        {
            if (this.Rotas.Any(x => x.Equals(rota)))
            {
                const parametrosSerializado = JSON.stringify(rota.Parametros ?? null);
                console.error(`Já existe uma rota para a Página ${this.ConstrutorPagina.GetType().Nome} com os parâmetros ${parametrosSerializado} `);
                return;
            }
            this.Rotas.Add(rota);
        }

        public RetornarRota(paginaOuParametros?: Partial<Pagina>): BaseRota
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

        private RetornarMelhorRota(paginaOuParametros: Partial<Pagina>): BaseRota
        {
            return this.Rotas.Where(x => x.IsParametrosIgual(paginaOuParametros)).FirstOrDefault();
        }
    }
}