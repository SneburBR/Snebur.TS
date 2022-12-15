
namespace Snebur.UI
{
    export class ControleFlutuanteCores extends Snebur.UI.ControleFlutuante implements IControleEventoValorAlterado<d.Cor>
    {
        private static readonly CSS_CLASS_SELECIONADO = "sn-is-cor-selecionada";
        private static readonly CSS_CLASS_PALETA_CORES = "sn-paleta-cores";
        private static readonly CHAVE_LOCAL_STORAGE_HISTORICO: string = "fotoalbum_historico_paleta";

        private _corSelecionada: d.Cor = Cores.Transparente;
        private _elementoDestinoHistoricoPersonalizado: HTMLElement;

        public static readonly TAMANHO_ITEM_COR: string = (u.SistemaUtil.NavegadorEnum === d.EnumNavegador.InternetExplorer) ? "32px" : "2rem";

        private IsSugestaoCorHabilitado: boolean;

        public override get AlturaInicial(): number
        {
            if (this.IsSugestaoCorHabilitado)
            {
                return 510;
            }
            return 450;
        }

        private get Grupo1() { return ["rgb(255,255,255)", "rgb(233,233,233)", "rgb(214,214,214)", "rgb(181,181,181)", "rgb(147,147,147)", "rgb( 99, 99, 99)", "rgb( 41, 41, 41)", "rgb(  0,  0,  0)", "rgb(238, 62, 65)"]; }
        private get Grupo2() { return ["rgb(255,236,225)", "rgb(226,201,200)", "rgb(255,220,215)", "rgb(241,213,187)", "rgb(225,184,145)", "rgb(212,133, 91)", "rgb(175, 90, 33)", "rgb(133, 54,  1)", "rgb(238, 71,153)"]; }
        private get Grupo3() { return ["rgb(248,223,230)", "rgb(247,186,198)", "rgb(223,174,184)", "rgb(194,118,134)", "rgb(178, 83,103)", "rgb(177, 50, 77)", "rgb(131, 38, 61)", "rgb( 91,  0,  6)", "rgb(125, 70,154)"]; }
        private get Grupo4() { return ["rgb(242,225,255)", "rgb(211,192,226)", "rgb(159,127,184)", "rgb(119, 63,133)", "rgb(125, 37, 94)", "rgb(122, 76,157)", "rgb( 78, 35, 11)", "rgb( 50, 10, 81)", "rgb( 28, 68,156)"]; }
        private get Grupo5() { return ["rgb(216,232,255)", "rgb(209,217,238)", "rgb(171,202,223)", "rgb(105,155,189)", "rgb(112,128,172)", "rgb( 63, 83,139)", "rgb( 30, 71,111)", "rgb(  5, 44, 83)", "rgb(  0,172,212)"]; }
        private get Grupo6() { return ["rgb(223,244,231)", "rgb(204,222,211)", "rgb(162,201,177)", "rgb(116,145,115)", "rgb( 56, 79, 55)", "rgb( 81,119,104)", "rgb( 35, 82, 63)", "rgb(  3, 55, 41)", "rgb(  0,171,103)"]; }
        private get Grupo7() { return ["rgb(255,253,232)", "rgb(240,238,211)", "rgb(232,235,192)", "rgb(241,233,178)", "rgb(222,212,175)", "rgb(221,200,119)", "rgb(187,167, 89)", "rgb(165,139, 34)", "rgb(247,235,  0)"]; }
        private get Grupo8() { return ["rgb(246,235,232)", "rgb(226,217,209)", "rgb(210,190,174)", "rgb(178,151,128)", "rgb(143,125,110)", "rgb(112, 89, 70)", "rgb( 80, 66, 55)", "rgb( 61, 45, 32)", "rgb(244,113, 33)"]; }

        private get GruposCor()
        {
            return [this.Grupo1, this.Grupo2, this.Grupo3, this.Grupo4, this.Grupo5, this.Grupo6, this.Grupo7, this.Grupo8];
        }

        private get ControleCaixaSelecaoCor(): CaixaSelecaoCor
        {
            return this.ControlePai as CaixaSelecaoCor;
        }

        private readonly HistoricoCores: Array<string>;

        public get ElementoDestinoHistorico()
        {
            if (this._elementoDestinoHistoricoPersonalizado instanceof HTMLElement)
            {
                return this._elementoDestinoHistoricoPersonalizado;
            }
            return this.ElementoDestinoHistoricoInterno;
        }

        public get EventoValorAlterado(): Evento<ValorAlteradoEventArgs<d.Cor>>
        {
            return this.ControleCaixaSelecaoCor.EventoValorAlterado;
        }
        public get CorSelecionadaRgba(): string
        {
            return this.CorSelecionada.Rgba;
        }

        public set CorSelecionadaRgba(rgba: string)
        {
            if (u.ValidacaoUtil.IsCorRgbOuRgba(rgba))
            {
                this.CorSelecionada = new d.Cor(rgba);
            }
            else
            {
                this.CorSelecionada = Cores.Transparente;
            }
        }

        public get CorSelecionada(): d.Cor
        {
            return this._corSelecionada;
        }
        public set CorSelecionada(value: d.Cor)
        {
            if (value === undefined)
            {
                throw new Error("O valor da cor não foi definido");
            }
            if (value === null)
            {
                value = Cores.Transparente;
            }

            if (value.IsTransparenteAbsoluto)
            {
                this.ElementoGrupoOpacidade.OcultarElemento(true);
            }
            else
            {
                this.ElementoGrupoOpacidade.MostrarElemento();
            }
            this._corSelecionada = value.Clone();
            this.SelecionarElemento(value);
            this.AtualizarVisualizacao();
            this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs(value));
        }

        public override get Elemento(): HTMLElement
        {
            return this._elemento;
        }

        public ElementosImagemCorSugestao = new Array<HTMLImageElement>();

        public constructor(controlePai: Snebur.UI.BaseControle, elemento: HTMLElement);
        public constructor(controlePai: Snebur.UI.BaseControle, idElemento: string);
        public constructor(controlePai: Snebur.UI.BaseControle, refElemento: any)
        {
            super(controlePai, refElemento);

            this.EventoCarregado.AddHandler(this.ControleFlutuanteCores_Carregado, this);
            this.CssClasseControle = "sn-controle-flutuante-cores";
            this.HistoricoCores = new Array<string>();
            this.RecuperarHistorico();
            this.OpcoesControleFlutuante.IsMoverControleFlutuante = false;
            this.OpcoesControleFlutuante.IsMostrarPainelAcoes = false;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            //this.ControleOpacidade.EventoValorAlterandado.AddHandler(this.ControleOpacidade_Alterando.bind(this));
            //this.ElementoDestinoHistorico = this.RetornarItemElemento("DestinoHistorico");
            this.ElementoGrupoOpacidade.OcultarElemento(true);
            this.ControleOpacidade.Valor = 100;
        }

        public override Mostrar(args?: HTMLElement | BaseUIElemento)
        {
            super.Mostrar(args);

            this.CorSelecionada = this._corSelecionada;

        }
        public override Fixar(elemento: HTMLElement)
        {
            super.Fixar(elemento);
            this.BtnFecharInterno.OcultarElemento();
        }

        private RecuperarHistorico(): void
        {
            const historico = u.LocalStorageUtil.RetornarConteudo(ControleFlutuanteCores.CHAVE_LOCAL_STORAGE_HISTORICO);
            if (historico instanceof Array)
            {
                for (const item of historico)
                {
                    if (u.ValidacaoUtil.IsCorRgbOuRgba(item))
                    {
                        this.HistoricoCores.Add(item);
                    }
                }
            }
        }

        private ControleFlutuanteCores_Carregado(provedor: any, e: EventArgs)
        {
            this.AtualizarHistorico();
            this.ElementoGrupoOpacidade.OcultarElemento(true);
            this.AdicionarPaletaPadrao();
        }

        private AdicionarPaletaPadrao()
        {
            const tabela = document.createElement("table");
            tabela.className = "sn-paleta-cores";
            //tabela.cellPadding = "0";
            //tabela.cellSpacing = "0";

            for (const cores of this.GruposCor)
            {
                const linha = document.createElement("tr");
                linha.height = "30px";

                for (const cor of cores.Select(x => new d.Cor(x)))
                {
                    const td = this.RetornarNovaCelularItemCor(cor);
                    linha.appendChild(td);

                }
                tabela.appendChild(linha);
            }

            this.ElementoDestinoPaleta.ElementoApresentacao.Clear();
            this.ElementoDestinoPaleta.ElementoApresentacao.appendChild(tabela);
        }

        public AtualizarSugestaoCor(cores: Array<d.Cor>): void
        public AtualizarSugestaoCor(elementosImagemCorSegestao: Array<HTMLImageElement>): void
        public AtualizarSugestaoCor(elementoImagemCorSegestao: HTMLImageElement): void
        public AtualizarSugestaoCor(coresOuElementoImagemCorSegestao: Cor[] | HTMLImageElement[] | HTMLImageElement): void
        public AtualizarSugestaoCor(coresOuElementoImagemCorSegestao: Cor[] | HTMLImageElement[] | HTMLImageElement): void
        {
            if (CorUtil.IsArrayCor(coresOuElementoImagemCorSegestao))
            {
                const coresString = coresOuElementoImagemCorSegestao.Cast<d.Cor>().Select(x => x.Rgba);
                this.AdicionarPaleta(coresString.Take(8), this.ElementoDestinoSugestaoCores.ElementoApresentacao, true);
                this.MostrarSuguestaoCor();
                return;
            }

            const elementosImagens = this.RetornarElementosImagensSugestao(coresOuElementoImagemCorSegestao);
            this.ElementosImagemCorSugestao.Clear();
            this.ElementosImagemCorSugestao.AddRange(elementosImagens);
            this.AtualizarCoresSugeridasInterno();
        }

        private RetornarElementosImagensSugestao(elementosImagem: HTMLImageElement | HTMLImageElement[]): HTMLImageElement[] 
        {
            if (elementosImagem == null)
            {
                return [];
            }
            if (elementosImagem instanceof HTMLImageElement)
            {
                if (ui.ElementoUtil.IsImagmeCarregada(elementosImagem))
                {
                    return [elementosImagem];
                }
                return [];
            }

            if (elementosImagem.All(x => x instanceof HTMLImageElement))
            {
                return elementosImagem.Where(x => ui.ElementoUtil.IsImagmeCarregada(x));
            }

            throw new Erro("O argumento não é suportado");
        }

        private MostrarSuguestaoCor(): void
        {
            this.IsSugestaoCorHabilitado = true;
            this.PainelSugestaoCores.MostrarElemento();
            /*this.BlocoSemSugestaoCores.OcultarElemento();*/
        }

        private OcultarSugestaoCor(): void
        {
            this.IsSugestaoCorHabilitado = false;
            this.PainelSugestaoCores.OcultarElemento();
            /*this.BlocoSemSugestaoCores.MostrarElemento();*/
        }

        private async BtnAtualizarCoresSugeridas_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            this.AtualizarCoresSugeridasInterno();
        }

        public RetornarElementoImagemCorSugestao(): HTMLImageElement
        {
            if (this.ElementosImagemCorSugestao.length > 1)
            {
                const rnd = u.RandomUtil.RetornarRandom(this.ElementosImagemCorSugestao.length - 1);
                if (rnd > (this.ElementosImagemCorSugestao.length - 1))
                {
                    throw new Erro("Random invalido");
                }
                return this.ElementosImagemCorSugestao[rnd];
            }
            return this.ElementosImagemCorSugestao.SingleOrDefault();

        }

        private AtualizarCoresSugeridasInterno(): void
        {
            const dicionario = new DicionarioSimples<number>();

            const elementoCorSugestao = this.RetornarElementoImagemCorSugestao();

            if (elementoCorSugestao instanceof HTMLImageElement && ui.ElementoUtil.IsImagmeCarregada(elementoCorSugestao))
            {
                const dimensaoUniforme = u.ImagemUtil.RetornarDimencaoUniformeDentro(elementoCorSugestao.width, elementoCorSugestao.height, 100, 100);
                const canvas = document.createElement("canvas");
                canvas.width = dimensaoUniforme.Largura;
                canvas.height = dimensaoUniforme.Altura;

                const contexto = canvas.getContext("2d");
                contexto.imageSmoothingEnabled = false;
                contexto.drawImage(elementoCorSugestao, 0, 0, elementoCorSugestao.naturalWidth, elementoCorSugestao.naturalHeight, 0, 0, dimensaoUniforme.Largura, dimensaoUniforme.Altura);

                const imagemData = contexto.getImageData(0, 0, dimensaoUniforme.Largura, dimensaoUniforme.Altura);
                const pixels = imagemData.data;
                const len = pixels.length;
                const sensibilidade = 30; // 20, 10 ou 5
                const sensibilidadeCinza = 30;

                for (let i = 0; i < len; i += 4)
                {
                    const red = pixels[i];
                    const green = pixels[i + 1];
                    const blue = pixels[i + 2];

                    let redSensivel = Math.round(red / sensibilidade) * sensibilidade;
                    let greenSensivel = Math.round(green / sensibilidade) * sensibilidade;
                    let blueSensivel = Math.round(blue / sensibilidade) * sensibilidade;

                    if (redSensivel > 255) redSensivel = 255;
                    if (greenSensivel > 255) greenSensivel = 255;
                    if (blueSensivel > 255) blueSensivel = 255;

                    if ($Configuracao.IsDebug)
                    {
                        u.ValidacaoUtil.IsByte(redSensivel);
                        u.ValidacaoUtil.IsByte(greenSensivel);
                        u.ValidacaoUtil.IsByte(blueSensivel);
                    }

                    if (!(u.Util.IgualSensivel(redSensivel, greenSensivel, sensibilidadeCinza) &&
                        u.Util.IgualSensivel(redSensivel, blueSensivel, sensibilidadeCinza)))
                    {
                        const cor = "rgb(" + redSensivel + "," + greenSensivel + "," + blueSensivel + ")";
                        if (!dicionario.ContainsKey(cor))
                        {
                            dicionario.Add(cor, 1);
                        }
                        else
                        {
                            let contador = dicionario.Item(cor);
                            dicionario.AtribuirItem(cor, contador += 1);
                        }
                    }
                }

                const paleta = dicionario.ToArrayChaveValor().
                    OrderByDescending(x => u.RandomUtil.RetornarRandom()).
                    Select(x => x.Chave).Take(9);

                this.AdicionarPaleta(paleta.Take(8), this.ElementoDestinoSugestaoCores.ElementoApresentacao, true);

                this.MostrarSuguestaoCor();

            }
            else
            {
                this.OcultarSugestaoCor();
            }
        }

        private AdicionarPaleta(cores: Array<string>, elementoDestino: HTMLElement, isCoresSugeridas: boolean): void
        {
            const tabela = document.createElement("table");
            tabela.className = "sn-paleta-cores";

            const linha = document.createElement("tr");
            linha.height = ControleFlutuanteCores.TAMANHO_ITEM_COR;

            if (isCoresSugeridas)
            {
                const cor = Cores.Transparente;
                const td = this.RetornarNovaCelularItemCor(cor);
                //td.style.backgroundColor = cor;
                //td.className = "sn-cor-paleta";
                td.onclick = this.RemoverCor_Click.bind(this);
                td.title = "Remover cor";
                td.innerHTML = "<i class=\"material-icons\">close</i>";
                linha.appendChild(td);
            }


            for (const cor of cores.Select(x => new d.Cor(x)))
            {
                const td = this.RetornarNovaCelularItemCor(cor);
                //td.style.backgroundColor = cor;
                //td.className = "sn-cor-paleta";
                //td.onclick = this.SelecionarCor_Click.bind(this, new d.Cor(cor));
                //td.innerHTML = "&nbsp;";
                //td.dataset.cor = "cor";
                linha.appendChild(td);

                //if (c < (paleta.length - 1))
                //{
                //    let tdEspaco = this.RetornarTDEspaco();
                //    linha.appendChild(tdEspaco);
                //}
            }

            if (isCoresSugeridas)
            {
                //this.BtnBotaoAtualizar.MostrarElemento();
                //let elementoBtnAtualizarCoresSugeridas = this.BtnBotaoAtualizar.Elemento;
                //elementoBtnAtualizarCoresSugeridas.parentElement.removeChild(elementoBtnAtualizarCoresSugeridas);

                //let td = this.RetornarNovaCelularItemCor();
                //td.appendChild(elementoBtnAtualizarCoresSugeridas)
                //linha.appendChild(td);
            }


            tabela.appendChild(linha);
            ui.ElementoUtil.LimparElementosFilho(elementoDestino);
            elementoDestino.appendChild(tabela);
        }

        private RetornarNovaCelularItemCor(cor: d.Cor): HTMLTableCellElement
        {
            const td = document.createElement("td");
            td.style.width = ControleFlutuanteCores.TAMANHO_ITEM_COR;
            td.style.height = ControleFlutuanteCores.TAMANHO_ITEM_COR;

            td.width = ControleFlutuanteCores.TAMANHO_ITEM_COR;
            td.height = ControleFlutuanteCores.TAMANHO_ITEM_COR;

            td.style.backgroundColor = cor.Rgba;
            td.className = "sn-cor-paleta";
            td.onclick = this.SelecionarCor_Click.bind(this, cor);
            td.innerHTML = "&nbsp;";
            td.dataset.cor = cor.Rgba;

            return td;
        }

        private RemoverCor_Click(e: UIEvent)
        {
            this.CorSelecionada = this.ControleCaixaSelecaoCor.CorPadrao;
        }

        private SelecionarCor_Click(cor: d.Cor, e: MouseEvent)
        {
            /*this.CorSelecionada = new d.Cor(corString);*/
            this.CorSelecionada = cor;
            this.ControleOpacidade.Valor = this.CorSelecionada.A * 100;
            this.ElementoGrupoOpacidade.MostrarElemento();
        }

        private async ControleOpacidade_ValorAlterado(provedor: ui.BaseUIElemento, e: ui.UIValorAlteradoEventArgs)
        {
            if (this.ControlePai.IsControleInicializado)
            {
                const alpha = this.ControleOpacidade.Valor / 100;
                this.CorSelecionada = new d.Cor(this.CorSelecionada.R, this.CorSelecionada.G, this.CorSelecionada.B, alpha);
            }
        }

        public AtualizarVisualizacao(): void
        {
            this.ElementoVisualizacao.style.backgroundColor = this.CorSelecionada.Rgba;
        }

        private async DivSelecionar_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            //this.Fechar(true);
        }

        private SelecionarElemento(cor: d.Cor)
        {
            const seletor = `td[data-cor="${cor}"]`;
            const elementosPaletaCores = document.querySelectorAll(`.${ControleFlutuanteCores.CSS_CLASS_PALETA_CORES}`) as Element[];
            for (const elementoPaletaCores of elementosPaletaCores)
            {
                const elementosSelecioando = elementoPaletaCores.querySelectorAll(`.${ControleFlutuanteCores.CSS_CLASS_SELECIONADO}`) as Element[];
                for (const elemento of elementosSelecioando)
                {
                    elemento.classList.remove(ControleFlutuanteCores.CSS_CLASS_SELECIONADO);
                }
                const elementoSelecionar = elementoPaletaCores.querySelector(seletor);
                elementoSelecionar?.classList.add(ControleFlutuanteCores.CSS_CLASS_SELECIONADO);
            }
        }

        //#region Histórico

        public AlterarElementoDestinoHistorico(elemento: HTMLElement)
        {
            ValidacaoUtil.ValidarArgumentoInstanciaDe({ elemento: elemento }, HTMLElement);

            if (this.ElementoDestinoHistorico !== elemento)
            {
                if (this.ElementoDestinoHistorico instanceof HTMLElement)
                {
                    this.ElementoDestinoHistorico.remove();
                }
                this._elementoDestinoHistoricoPersonalizado = elemento;

                if (this.ElementoDestinoHistorico !== elemento)
                {
                    throw new Erro("Elemento destino eh deferente do elemento, isso pode acontecer ao adicionar um propriedade em runtime usando Object.defineProperty,  writable:false. mudar para writable:true... :( cansei de escrever  ");
                }
                this.ElementoRotuloHistorico.OcultarElemento();
                this.AtualizarHistorico();
            }
        }

        public SalvarHistorico(): void
        {
            if (!this.CorSelecionada.IsTransparente)
            {
                if (!this.HistoricoCores.Contains(this.CorSelecionada.Rgba))
                {
                    this.HistoricoCores.Insert(0, this.CorSelecionada.Rgba);
                }

                u.LocalStorageUtil.AdicionarConteudo(
                    ControleFlutuanteCores.CHAVE_LOCAL_STORAGE_HISTORICO,
                    this.HistoricoCores.ToList().Take(10));

                this.AtualizarHistorico();
            }
        }

        private AtualizarHistorico()
        {
            const paletaHistorico = u.LocalStorageUtil.RetornarConteudo(ControleFlutuanteCores.CHAVE_LOCAL_STORAGE_HISTORICO);
            if (paletaHistorico instanceof Array)
            {
                this.AdicionarPaleta(paletaHistorico, this.ElementoDestinoHistorico, false);
            }
        }

        //#endregion

        private BtnFechar_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            this.Fechar(false);
        }

        public override Fechar(sucesso: boolean)
        {
            this.SalvarHistorico();
            super.Fechar(sucesso);
        }

        public override Dispose(): void
        {
            super.Dispose();
        }

    }


	//#region Elementos da apresentação - código gerado automaticamente #

	export interface ControleFlutuanteCores
	{
		readonly PainelSugestaoCores: ui.Painel;
		readonly ElementoRotuloSugestaoCor: ui.Texto;
		readonly ElementoDestinoSugestaoCores: ui.Bloco;
		readonly BtnBotaoAtualizar: ui.Botao;
		readonly ElementoDestinoPaleta: ui.Bloco;
		readonly ElementoGrupoOpacidade: ui.Painel;
		readonly ControleOpacidade: ui.CaixaSlider;
		readonly ElementoVisualizacao: HTMLDivElement;
		readonly ElementoRotuloHistorico: ui.Texto;
		readonly ElementoDestinoHistoricoInterno: HTMLDivElement;
		readonly BtnFecharInterno: ui.Botao;
	}

	//#endregion

}
