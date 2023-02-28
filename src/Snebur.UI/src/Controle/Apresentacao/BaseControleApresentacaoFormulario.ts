namespace Snebur.UI
{
    export abstract class BaseControleApresentacaoFormulario extends Snebur.UI.BaseControle
    {
        protected readonly EventoTelaAlterada = new Evento<TelaAlteradaEventArgs>(this);

        public constructor(controlePai: BaseControle);
        public constructor(controlePai: BaseControle, refElemento?: HTMLElement | string);
        public constructor(controlePai: BaseControle, refElemento?: HTMLElement | string)
        {
            super(controlePai, refElemento);
            TelaUtil.EventoTelaAlterada.AddHandler(this.ControleApresentacao_TelaAlterada, this);
        }

        //#region Tela alterada

        private async ControleApresentacao_TelaAlterada(provedor: any, e: TelaAlteradaEventArgs)
        {
            if (this.IsControleInicializado)
            {
                await ThreadUtil.EsperarAsync(50);
                this.EventoTelaAlterada?.Notificar(this, e);
            }
        }

        //#endregion

        //#region Validação

        public async ValidarFormularioAsync(isSomenteControlesVisiveis: boolean = true): Promise<boolean>
        {
            const indeficadorTimeout = ValidacaoUtil.ValidarTimeout("Validação do formulário", 10000, true);
            const resultado = await this.ValidarFormularioInternoAsync(isSomenteControlesVisiveis);
            if (!resultado.IsSucesso && !TelaUtil.IsCelularOuTablet)
            {
                resultado.ControleInvalido.Elemento.scrollIntoView({
                    block: "nearest", inline: "nearest", behavior: "smooth"
                });

                await u.ThreadUtil.QuebrarAsync();
                resultado.ControleInvalido.FocusNaoOcultarValidacao();
                resultado.ControleInvalido.MostrarMensagemValidacao(true);
            }
            window.clearTimeout(indeficadorTimeout);
            return resultado.IsSucesso;
        }

        private async ValidarFormularioInternoAsync(isSomenteControlesVisiveis: boolean): Promise<ResultadoValidacao>
        {
            await ElementoUtil.DesfocarElementoAtualAtivoAsync();

            const controlesApresentacao = this.ControlesFilho.OfType(BaseControleApresentacaoFormulario).
                Where(x => x.IsVisivel).ToList();

            for (const controleApresenta of controlesApresentacao)
            {
                const resultadoValidacao = await controleApresenta.ValidarFormularioInternoAsync(isSomenteControlesVisiveis);
                if (!resultadoValidacao.IsSucesso)
                {
                    return resultadoValidacao;
                }
            }

            const controlesFumulario = this.ControlesFilho.OfType(BaseControleFormulario);
            let controles = controlesFumulario.Where(x => !x.IsIgnorarValidacao);
            if (isSomenteControlesVisiveis)
            {
                controles = controles.Where(x => x.IsVisivel).ToList();
            }
            controles.ForEach(x => x.OcultarMensagemValidacao());

            const validador = new ValidarControlesFormulario(controles);
            const [isSucesso, controle] = await validador.ValidarAsync();
            validador.Dispose();

            return new ResultadoValidacao(controle, isSucesso);
        }

        public OcultarMensagensValidacao(isDefinirComoValido?: boolean): void
        {
            const controlesApresentacao = this.ControlesFilho.OfType(BaseControleApresentacaoFormulario).
                Where(x => x.IsControleInicializado && x.IsVisivel).ToList();


            for (const controle of controlesApresentacao)
            {
                controle.OcultarMensagensValidacao(isDefinirComoValido);
            }

            const controles = this.ControlesFilho.OfType(BaseControleFormulario).
                Where(x => x.IsControleInicializado && !x.IsIgnorarValidacao &&
                    x.IsVisivel).ToList();

            for (const controle of controles)
            {
                controle.OcultarMensagemValidacao();
                if (isDefinirComoValido)
                {
                    controle.IsValido = true;
                }
            }
        }

        public LimparValidacoesControleFormulario(isSomenteMensagemFlutuante = true): void
        {

            const controlesApresentacao = this.ControlesFilho.OfType<BaseControleApresentacaoFormulario>(BaseControleApresentacaoFormulario).
                Where(x => x.IsVisivel).ToList();

            for (const controleApresenta of controlesApresentacao)
            {
                controleApresenta.LimparValidacoesControleFormulario(isSomenteMensagemFlutuante);
            }

            let controles = this.ControlesFilho.OfType<BaseControleFormulario>(BaseControleFormulario).
                Where(x => !x.IsIgnorarValidacao).ToList();

            if (isSomenteMensagemFlutuante)
            {
                controles = controles.Where(x => x.IsMostrarMensagemValidacaoFlutuante).ToList();
            }

            for (const controle of controles)
            {
                controle.LimparValidacao();
            }
        }

        public MostrarSomenteMensagemValidacaoFlutuante(isForcar: boolean): any
        {
            const controles = this.ControlesFilho.OfType<BaseControleFormulario>(BaseControleFormulario).
                Where(x => !x.IsIgnorarValidacao && !x.IsValido && x.IsVisivel &&
                    x.IsMostrarMensagemValidacaoFlutuante).ToList();

            if (controles.Count > 0)
            {
                for (const controle of controles)
                {
                    controle.OcultarMensagemValidacao();
                }
                controles.First().MostrarMensagemValidacao(isForcar);
            }
        }

        public AtualizarPosicoesMensagemValidacao(): void
        {
            let controlesApresentacao = this.DicionarioControlesFilho.Valores.OfType<BaseControleApresentacaoFormulario>(BaseControleApresentacaoFormulario);
            controlesApresentacao = controlesApresentacao.Where(x => x.IsControleInicializado && x.IsVisivel).ToList();

            for (const controle of controlesApresentacao)
            {
                controle.AtualizarPosicoesMensagemValidacao();
            }

            const controles = this.ControlesFilho.OfType<BaseControleFormulario>(BaseControleFormulario).
                Where(x => x.IsControleInicializado &&
                    !x.IsIgnorarValidacao &&
                    x.IsVisivel &&
                    !x.IsValido).ToList();

            for (const controle of controles)
            {
                controle.PosicionarMensagemValidacaoFluante();
            }
        }
        //#endregion

        public override OcultarElemento(): void
        {
            this.OcultarControlesFlutuantes();
            super.OcultarElemento();
        }

        protected OcultarControlesFlutuantes()
        {
            this.LimparValidacoesControleFormulario(true);

            for (const controleFilho of this.ControlesFilho)
            {
                if (controleFilho instanceof ControleFlutuante)
                {
                    controleFilho.Fechar();
                    continue;
                }
                else if (controleFilho instanceof Janela)
                {
                    controleFilho.FecharAsync();
                }
                else if (controleFilho instanceof BaseComboBox)
                {
                    controleFilho.CaixaSelecao.Fechar();
                    continue;
                }
                else if (controleFilho instanceof BaseControleApresentacaoFormulario)
                {
                    controleFilho.OcultarControlesFlutuantes();
                }
            }
        }

        //#region MarcaLinha

        public __UltimoItemMarcado: any;

        protected override InicializarControlesFilho(): void
        {
            super.InicializarControlesFilho();

            const controlesLista = this.ControlesFilho.OfType<DataLista>(DataLista).ToList();
            for (const controlaLista of controlesLista)
            {
                controlaLista.EventoListaAtualizada.AddHandler(this.BaseControleLista_ListaAtualizada, this);
            }
        }

        private BaseControleLista_ListaAtualizada(dataLista: DataLista, e: EventArgs): void
        {
            const ultimoItemMarcado = this.__UltimoItemMarcado;
            if (u.ValidacaoUtil.IsDefinido(ultimoItemMarcado))
            {
                const linha = dataLista.LinhasColecao.Linhas.Where(x => Util.IsIgual(x.ItemReferencia, ultimoItemMarcado)).SingleOrDefault();
                if (linha instanceof Linha)
                {
                    linha.MarcarLinha();
                }
            }
        }

        //#endregion

        //#region Dispose

        public override Dispose(): void
        {
            TelaUtil.EventoTelaAlterada.RemoveHandler(this.ControleApresentacao_TelaAlterada, this);
            super.Dispose();
        }

        //#endregion
    }


    export class ResultadoValidacao
    {
        public readonly IsSucesso: boolean;

        public readonly ControleInvalido: BaseControleFormulario;

        public constructor(controleInvalido: BaseControleFormulario, isSucesso: boolean)
        {
            this.ControleInvalido = controleInvalido;
            this.IsSucesso = isSucesso;
        }

    }
}
