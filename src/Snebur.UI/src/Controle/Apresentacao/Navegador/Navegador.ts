namespace Snebur.UI
{
    export class Navegador extends BaseNavegador
    {
        private _caminhoRota: string = null;
        private _identificadorNavegador: string = null;

        public override readonly IsHistoricoAtivo: boolean = false;

        public get NavegadorPai(): BaseNavegador
        {
            return this.RetornarControlePai(BaseNavegador, false, false);
        }

        public override get IdentificadorNavegador(): string
        {
            if (this._identificadorNavegador == null)
            {
                this._identificadorNavegador = this.RetornarValorAtributo(AtributosHtml.IdentificadorNavegador, GuidUtil.RetornarNovoGuid());
            }
            return this._identificadorNavegador;
        }

        public override get CaminhoRota(): string
        {
            return this._caminhoRota;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement) 
        {
            super(controlePai, elemento);
        }

        //protected override Inicializar(): void
        //{
        //    super.Inicializar();
        //}
         
        //protected override async NavegarPaginaInicialAsync()
        //{
        //    if (this.IsExistePaginaHistorico())
        //    {
        //        if (await this.NavegarPaginaHistoricoAsync())
        //        {
        //            return;
        //        }
        //    }
        //    return super.NavegarPaginaInicialAsync();
        //}

        //private async NavegarPaginaHistoricoAsync()
        //{
        //    const parametros = await HistoricoNavegadorUtil.RetornarParametrosHistoricoAsync();
        //    const nomeConstrutorPagina = parametros.Item(HistoricoNavegadorUtil.PARAMETRO_PAGINA);

        //    const construtorPagina = PaginaUtil.RetornarConstrutorPagina(this, nomeConstrutorPagina, true);
        //    if (construtorPagina == null)
        //    {
        //        console.error(`Não foi encontrada a página ${nomeConstrutorPagina}`);
        //        return false;
        //    }
        //    this.Navegar(construtorPagina, parametros);
        //    return true;
        //}

        //private async Window_HashhChange(domEvent: HashChangeEvent)
        //{
        //    const urlHsitoricoPaginaAtual = this.RetoronarUrlHistoricoHash(this.PaginaAtual, this._parametros);
        //    if (document.location.href !== urlHsitoricoPaginaAtual)
        //    {
        //        if (document.location.href.Contains("#"))
        //        {
        //            const chavesParametrosHistorico = HistoricoNavegadorUtil.RetornarChavesParametros();
        //            if (chavesParametrosHistorico.Contains(HistoricoNavegadorUtil.PARAMETRO_PAGINA))
        //            {
        //                const parametros = await HistoricoNavegadorUtil.RetornarParametrosHistoricoAsync();
        //                const caminhoPagina = parametros.Item(HistoricoNavegadorUtil.PARAMETRO_PAGINA);
        //                parametros.Remove(HistoricoNavegadorUtil.PARAMETRO_PAGINA);
        //                const construtorPagina = PaginaUtil.RetornarConstrutorPagina(this, caminhoPagina);

        //                console.log(`Navegando histórico ${construtorPagina}`);

        //                this.Navegar(construtorPagina, parametros);
        //            }
        //        }
        //    }
        //}

        public override SalvarHistoricoNavegador(pagina: Pagina, parametros: DicionarioSimples<any, string>): void
        {
            //if (this.IsHistoricoAtivo)
            //{
            //    const urlHistorico = this.RetoronarUrlHistoricoHash(pagina, parametros);
            //    if (location.href !== urlHistorico)
            //    {
            //        document.location.href = urlHistorico;
            //    }
            //}
        }

        //private RetoronarUrlHistoricoHash(pagina: Pagina, parametros: DicionarioSimples<string>): string
        //{
        //    const caminhoPagina = u.ValidacaoUtil.IsDefinido(pagina) ? pagina.GetType().Nome : String.Empty;
        //    if (!parametros.ContainsKey(HistoricoNavegadorUtil.PARAMETRO_PAGINA))
        //    {
        //        parametros.Add(HistoricoNavegadorUtil.PARAMETRO_PAGINA, caminhoPagina);
        //    }
        //    else
        //    {
        //        parametros.AtribuirItem(HistoricoNavegadorUtil.PARAMETRO_PAGINA, caminhoPagina);
        //    }
        //    if ($Aplicacao.ParametrosHistorico?.Count > 0)
        //    {
        //        parametros.AddRange($Aplicacao.ParametrosHistorico);
        //    }
        //    return HistoricoNavegadorUtil.RetornarUrlHistorico(parametros);
        //}

        //private IsExistePaginaHistorico(): boolean
        //{
        //    const chavesParametrosHistorico = HistoricoNavegadorUtil.RetornarChavesParametros();
        //    return chavesParametrosHistorico.Contains(HistoricoNavegadorUtil.PARAMETRO_PAGINA);
        //}
    }
}