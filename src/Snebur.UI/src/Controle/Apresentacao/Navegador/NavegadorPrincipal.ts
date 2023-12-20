namespace Snebur.UI
{
    export class NavegadorPrincipal extends BaseNavegador
    {
        public static readonly IDENTIFICADOR = "NavegadorPrincipal";
        public override readonly CaminhoRota: string = $Configuracao.CaminhoRotaNavegadorPrincipal ?? "/";
        public override readonly IsHistoricoAtivo: boolean = true;
        public override readonly IdentificadorNavegador: string = NavegadorPrincipal.IDENTIFICADOR;

        public constructor(controlePai: BaseControle, elemento: HTMLElement) 
        {
            super(controlePai, elemento);
            this._isPropagarBindDataSource = false;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            console.log("Rota do navegador principal" + this.CaminhoRota);

            const identificadorNavegador = this.RetornarValorAtributo(AtributosHtml.IdentificadorNavegador, null);

            if (!String.IsNullOrWhiteSpace(identificadorNavegador) &&
                identificadorNavegador !== NavegadorPrincipal.IDENTIFICADOR)
            {
                throw new Erro("O identificador do navegador principal não pode ser alterado ");
            }

            this.AtivarHistorico();
        }

        public AtivarHistorico(): void
        {
            this.AdicionarEventoDomGlobal(EnumEventoDom.PopState, this.Window_PopState);
        }

        public DestativarHistorico(): void
        {
            this.RemoverEventoDomGlobal(EnumEventoDom.PopState, this.Window_PopState);
        }

        protected override async NavegarPaginaInicialAsync()
        {
            if (this.IsExisteRota())
            {
                if (await this.NavegarRotaAsync())
                {
                    return;
                }
            }
            return super.NavegarPaginaInicialAsync();
        }

        private async Window_PopState(e: PopStateEvent)
        {
            if ($Aplicacao.DocumentoPrincipal.IsExisteJanelaAberta)
            {
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
                history.go(1);
                return false;
            }
            this.NavegarRotaAsync();
            return true;
        }

        private async NavegarRotaAsync(): Promise<boolean>
        {
            const caminho = this.RetornarCaminho();
            if (caminho != null)
            {
                const rota = GerenciadorRotas.RetornarRota(this.IdentificadorNavegador, caminho);
                if (rota == null || rota.IsIgnorarRotaRecarregar)
                {
                    return false;
                }

                if (this.PaginaAtual?.Rota?.Equals(rota))
                {
                    return false;
                }

                if (typeof rota.FuncaoExecutarRota === "function")
                {
                    rota.FuncaoExecutarRota();
                    return true;
                }

                console.log(`Navegando para a rota ${rota.Caminho}`);
                this.Navegar(rota.ConstrutorPagina, rota.Parametros);
                return true;
            }
            return false;
        }

        private IsExisteRota(): boolean
        {
            const caminho = this.RetornarCaminho();
            if (!String.IsNullOrWhiteSpace(caminho))
            {
                const isExisteRota = GerenciadorRotas.IsExisteRota(this.IdentificadorNavegador, caminho);
                if (!isExisteRota && caminho !== "/")
                {
                    console.warn("Não foi encontrada a rota para: " + caminho);
                }
                return isExisteRota;
            }
            return false;
        }

        private RetornarCaminho(): string
        {
            let caminho = location.pathname;
            if (!caminho.startsWith("/"))
            {
                throw new Erro("localhost.pathname invalido");
            }

            caminho = RotaUtil.NormalizarCaminho(caminho);
            if (!caminho.startsWith(this.CaminhoRota))
            {
                console.warn(`A rota principal está diferente:
                              Configurado: ${this.CaminhoRota},
                              Rota: ${caminho}`);
                return null;
            }
            caminho = caminho.substring(this.CaminhoRota.length);
            return RotaUtil.NormalizarCaminho(caminho);
        }

        public override SalvarHistoricoNavegador(
            pagina: Pagina,
            parametros: DicionarioSimples<any, string>): void
        {
            const rota = pagina.Rota;
            if (rota != null)
            {
                const caminho = this.RetornarCaminho();
                if (caminho !== rota.Caminho)
                {
                    const novaRota = rota.ConstruirRota(this, parametros);

                    console.log(`Atualizando rota: ${location.pathname}
                                 Nova rota: ${novaRota} `);

                    history.pushState({}, "", novaRota);
                }

                const documentoPrincipal = $Aplicacao.DocumentoPrincipal;
                document.title = rota.Titulo ?? documentoPrincipal.Titulo;
                this.AtualizarMetaTag("description", rota.Descricao);
                this.AtualizarMetaTag("keywords", rota.PalavrasChave);
            }
        }

        private AtualizarMetaTag(name: "description" | "keywords", content: string)
        {
            const meta = document.querySelector(`meta[name="${name}"]`);
            if (meta != null)
            {
                meta.setAttribute("content", content);
            }
        }
    }
}