namespace Snebur.UI
{
    export class FiltroImagemUtil
    {
        public static readonly CSS_CLASS_FILTRO_IMAGEM: string = "sn-filtro-imagem";
        public static readonly TAG_ELEMENTO_SOBREPOSICAO: string = "sobre-posicao";
        public static readonly TAG_ELEMENTO_EXPOSICAO: string = "exposicao";
        public static readonly TAG_ELEMENTO_EXPOSICAO_EXTRA: string = "exposicao-extra";
        public static readonly TAG_ELEMENTO_CIANO: string = "ciano";
        public static readonly TAG_ELEMENTO_MAGENTA: string = "magenta";
        public static readonly TAG_ELEMENTO_AMARELO: string = "amarelo";

        private static readonly FILTRO_CONSTRASTE: string = "contrast";
        private static readonly FILTRO_BRILHO: string = "brightness";
        private static readonly FILTRO_SATURACAO: string = "saturate";
        private static readonly FILTRO_SEPIA: string = "sepia";
        private static readonly FILTRO_PRETO_BRANCO: string = "grayscale";
        private static readonly FILTRO_INVETER: string = "invert";
        private static readonly FILTRO_MATRIZ: string = "hue-rotate";
        private static readonly FILTRO_DESFOQUE: string = "blur";

        public static Aplicar(elementoRecipiente: HTMLElement,
            filtroImagemOuEfeitoImagem: d.FiltroImagem | i.EfeitoImagem,
            sobrePosicao?: i.SobrePosicao): void
        {

            const filtroImagem = filtroImagemOuEfeitoImagem instanceof i.EfeitoImagem ?
                filtroImagemOuEfeitoImagem.Filtro : filtroImagemOuEfeitoImagem as d.FiltroImagem;

            sobrePosicao = filtroImagemOuEfeitoImagem instanceof i.EfeitoImagem ? filtroImagemOuEfeitoImagem.SobrePosicao : sobrePosicao;


            const listaFiltros = new List<string>();
            /*const filtroImagem = filtroImagemOuFiltroConhecido instanceof i.FiltroImagemConhecido ? filtroImagemOuFiltroConhecido.Filtro : filtroImagemOuFiltroConhecido;*/

            FiltroImagemUtil.AdicionarCssFiltro(listaFiltros, EnumFiltroCss.Brilho, filtroImagem.Brilho, 0.5);
            FiltroImagemUtil.AdicionarCssFiltro(listaFiltros, EnumFiltroCss.Contraste, filtroImagem.Contraste, 0.5);
            FiltroImagemUtil.AdicionarCssFiltro(listaFiltros, EnumFiltroCss.Saturacao, filtroImagem.Saturacao);
            FiltroImagemUtil.AdicionarCssFiltro(listaFiltros, EnumFiltroCss.PretoBranco, filtroImagem.PretoBranco);
            FiltroImagemUtil.AdicionarCssFiltro(listaFiltros, EnumFiltroCss.Sepia, filtroImagem.Sepia);
            FiltroImagemUtil.AdicionarCssFiltro(listaFiltros, EnumFiltroCss.Matriz, filtroImagem.Matriz);
            FiltroImagemUtil.AdicionarCssFiltro(listaFiltros, EnumFiltroCss.Inverter, filtroImagem.Inverter);
            FiltroImagemUtil.AdicionarCssFiltro(listaFiltros, EnumFiltroCss.Desfoque, filtroImagem.Desfoque);

            const filtros = String.Join(" ", listaFiltros).trim();
            elementoRecipiente.style.filter = filtros;
            elementoRecipiente.style.webkitFilter = filtros;

            if (!elementoRecipiente.classList.contains(FiltroImagemUtil.CSS_CLASS_FILTRO_IMAGEM))
            {
                elementoRecipiente.classList.add(FiltroImagemUtil.CSS_CLASS_FILTRO_IMAGEM);
            }

            FiltroImagemUtil.AplicarSobrePosicao(elementoRecipiente, sobrePosicao);
            //correções
            FiltroImagemUtil.AplicarCiano(elementoRecipiente, filtroImagem);
            FiltroImagemUtil.AplicarMagenta(elementoRecipiente, filtroImagem);
            FiltroImagemUtil.AplicarAmarelo(elementoRecipiente, filtroImagem);
            FiltroImagemUtil.AplicarExposicao(elementoRecipiente, filtroImagem);

        }

        public static Limpar(elementoRecipiente: HTMLElement): void
        {
            elementoRecipiente.style.filter = String.Empty;
            if (elementoRecipiente.classList.contains(FiltroImagemUtil.CSS_CLASS_FILTRO_IMAGEM))
            {
                elementoRecipiente.classList.remove(FiltroImagemUtil.CSS_CLASS_FILTRO_IMAGEM);
            }

            const elementoSobrePosicao = FiltroImagemUtil.RetornarElementoFiltro(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_SOBREPOSICAO);
            const elementoExposicao = FiltroImagemUtil.RetornarElementoFiltro(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_EXPOSICAO);
            const elementoCiano = FiltroImagemUtil.RetornarElementoFiltro(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_CIANO);
            const elementoMagenta = FiltroImagemUtil.RetornarElementoFiltro(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_MAGENTA);
            const elementoAmarelo = FiltroImagemUtil.RetornarElementoFiltro(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_AMARELO);

            elementoExposicao?.remove();
            elementoSobrePosicao?.remove();
            elementoCiano?.remove();
            elementoMagenta?.remove();
            elementoAmarelo?.remove();
        }
     

        private static AdicionarCssFiltro(filtros: List<string>, filtro: EnumFiltroCss, valor: number, escala: number = 1): void
        {
            if (valor !== null)
            {
                valor = ConverterUtil.ParaNumero(valor);
                const valorPadrao = FiltroImagemUtil.RetornarValorPadrao(filtro);
                if (valor !== valorPadrao)
                {
                    if (escala !== 1)
                    {
                        valor = valorPadrao + ((valor - valorPadrao) * escala);
                    }

                    const nomeFiltro = FiltroImagemUtil.RetonarNomeFiltro(filtro);
                    const unidade = FiltroImagemUtil.RetornarUnidade(filtro);
                    const cssFiltro = nomeFiltro + "(" + valor.toFixed(0) + unidade + ")";
                    filtros.Add(cssFiltro);
                }
            }
        }

        private static RetornarUnidade(filtro: EnumFiltroCss): string
        {
            switch (filtro)
            {
                case EnumFiltroCss.Contraste:
                case EnumFiltroCss.Brilho:
                case EnumFiltroCss.Saturacao:
                case EnumFiltroCss.Sepia:
                case EnumFiltroCss.PretoBranco:
                case EnumFiltroCss.Inverter:

                    return UnidadeUtil.SUFIXO_PORCENTAGEM;

                case EnumFiltroCss.Matriz:

                    return UnidadeUtil.SUFIXO_GRAU;

                case EnumFiltroCss.Desfoque:

                    return UnidadeUtil.SUFIXO_PIXEL;

                default:

                    throw new Erro("O filtro" + filtro + " não é suportado");

            }
        }

        private static RetornarValorPadrao(filtro: EnumFiltroCss): number
        {
            switch (filtro)
            {
                case EnumFiltroCss.Contraste:

                    return d.FiltroImagem.CONTRASTE_PADRAO;

                case EnumFiltroCss.Brilho:

                    return d.FiltroImagem.BRILHO_PADRAO;

                case EnumFiltroCss.Saturacao:

                    return d.FiltroImagem.SATURACAO_PADRAO;

                case EnumFiltroCss.Sepia:

                    return d.FiltroImagem.SEPIA_PADRAO;

                case EnumFiltroCss.PretoBranco:

                    return d.FiltroImagem.PRETO_BRANCO_PADRAO;

                case EnumFiltroCss.Inverter:

                    return d.FiltroImagem.INVERTER_PADRAO;

                case EnumFiltroCss.Matriz:

                    return d.FiltroImagem.MATRIZ_PADRAO;

                case EnumFiltroCss.Desfoque:

                    return d.FiltroImagem.DESFOQUE_PADRAO;

                default:
                    throw new Erro("O filtro" + filtro + " não é suportado");
            }
        }

        private static RetonarNomeFiltro(filtro: EnumFiltroCss): string
        {
            switch (filtro)
            {
                case EnumFiltroCss.Contraste:

                    return FiltroImagemUtil.FILTRO_CONSTRASTE;

                case EnumFiltroCss.Brilho:

                    return FiltroImagemUtil.FILTRO_BRILHO;

                case EnumFiltroCss.Saturacao:

                    return FiltroImagemUtil.FILTRO_SATURACAO;

                case EnumFiltroCss.Sepia:

                    return FiltroImagemUtil.FILTRO_SEPIA;

                case EnumFiltroCss.PretoBranco:

                    return FiltroImagemUtil.FILTRO_PRETO_BRANCO;

                case EnumFiltroCss.Inverter:

                    return FiltroImagemUtil.FILTRO_INVETER;

                case EnumFiltroCss.Matriz:

                    return FiltroImagemUtil.FILTRO_MATRIZ;

                case EnumFiltroCss.Desfoque:

                    return FiltroImagemUtil.FILTRO_DESFOQUE;

                default:

                    throw new Erro("O filtro" + filtro + " não é suportado");

            }
        }

        //#region SobrePosição 

        private static AplicarSobrePosicao(elementoRecipiente: HTMLElement,
            sobrePosicao: i.SobrePosicao): void
        {
           
            let elementoSobrePosicao = FiltroImagemUtil.RetornarElementoFiltro(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_SOBREPOSICAO) as HTMLElement;
            if (sobrePosicao instanceof imagem.SobrePosicao)
            {
                if (elementoSobrePosicao == null)
                {
                    elementoSobrePosicao = document.createElement(FiltroImagemUtil.TAG_ELEMENTO_SOBREPOSICAO);
                    elementoRecipiente.appendChild(elementoSobrePosicao);
                }
                FiltroImagemUtil.AplicarSobrePosicaoInterna(elementoSobrePosicao, sobrePosicao);
            }
            else
            {
                elementoSobrePosicao?.remove();
            }

        }

        private static AplicarSobrePosicaoInterna(elementoSobrePosicao: HTMLElement, sobrePosicao: imagem.SobrePosicao): void
        {
            if (u.SistemaUtil.NavegadorEnum === d.EnumNavegador.InternetExplorer ||
                u.SistemaUtil.NavegadorEnum === d.EnumNavegador.Edge)
            {
                elementoSobrePosicao.OcultarElemento();
                return;
            }

            const valorCssMixagem = u.EnumUtil.RetornarRotulo(imagem.EnumMixagem, sobrePosicao.Mixagem).toLowerCase();
            //elementoSobrePosicao.style.opacity = (sobrePosicao.Opacidade / 100).toFixed();
            elementoSobrePosicao.style.setProperty("mix-blend-mode", valorCssMixagem);
            (elementoSobrePosicao.style as any).mixBlendMode = valorCssMixagem;

            if ((elementoSobrePosicao.style as any).mixBlendMode !== valorCssMixagem)
            {
                if ($Configuracao.IsDebug)
                {
                    throw new Erro("Mixagem não suportada" + valorCssMixagem);
                }
            }

            elementoSobrePosicao.style.background = String.Empty;
            elementoSobrePosicao.style.backgroundColor = "rgba(0, 0, 0, 0)";

            if (sobrePosicao instanceof imagem.SobrePosicaoSolida)
            {
                this.AplicarSobrePosicaoSolida(elementoSobrePosicao, sobrePosicao);
            }
            else if (sobrePosicao instanceof imagem.SobrePosicaoGradienteLinear)
            {
                this.AplicarSobrePosicaoGradienteLinear(elementoSobrePosicao, sobrePosicao);
            }
            //else if (sobrePosicao instanceof imagem.SobrePosicaoGradienteRadial)
            //{
            //    this.AplicarSobrePosicaoGradienteRadial(elementoSobrePosicao, sobrePosicao);
            //}
            else
            {
                throw new Erro("Sobreposição não suportada");
            }
        }

        private static AplicarSobrePosicaoSolida(elementoSobrePosicao: HTMLElement, sobrePosicao: imagem.SobrePosicaoSolida): void
        {
            elementoSobrePosicao.style.backgroundColor = sobrePosicao.Cor;
        }

        private static AplicarSobrePosicaoGradienteLinear(elementoSobrePosicao: HTMLElement, sobrePosicao: imagem.SobrePosicaoGradienteLinear): void
        {
            const cssDirecao = u.EnumUtil.RetornarRotulo(imagem.EnumDirecaoGradiente, sobrePosicao.Direcao);
            const cssGradiente = `linear-gradient(${cssDirecao}, ${sobrePosicao.Cor1} ${sobrePosicao.LimiteCor1.toFixed(0)}%, ${sobrePosicao.Cor2} ${sobrePosicao.LimiteCor2.toFixed(0)}%)`;

            elementoSobrePosicao.style.background = cssGradiente;
        }

        //private static AplicarSobrePosicaoGradienteRadial(elementoSobrePosicao: HTMLElement, sobrePosicao: imagem.SobrePosicaoGradienteRadial): void
        //{
        //    let cssPosicao = u.EnumUtil.RetornarRotulo(imagem.EnumPosicaoGradiente, sobrePosicao.Posicao).toLowerCase();
        //    let cssTamanho = u.EnumUtil.RetornarRotulo(imagem.EnumTamanhoGradiente, sobrePosicao.Tamanho).toLowerCase();
        //    let cssGradiente = `-webkit-radial-gradient(${cssPosicao}, circle ${cssTamanho}, ${sobrePosicao.Cor1} ${sobrePosicao.LimiteCor1}%, ${sobrePosicao.Cor2} ${sobrePosicao.LimiteCor2}%)`;
        //    elementoSobrePosicao.style.background = cssGradiente;
        //}

        //#endregion

        //#region Correções

        private static AplicarExposicao(elementoRecipiente: HTMLElement, filtroImagem: d.FiltroImagem): void
        {
            FiltroImagemUtil.AplicarExposicaoInterno(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_EXPOSICAO, filtroImagem.Exposicao);
            FiltroImagemUtil.AplicarExposicaoInterno(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_EXPOSICAO_EXTRA, filtroImagem.Exposicao);
        }

        private static AplicarCiano(elementoRecipiente: HTMLElement, filtroImagem: d.FiltroImagem): void
        {
            FiltroImagemUtil.AplicarCorrecaoInterno(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_CIANO, filtroImagem.Ciano, EnumCorCorrecao.Ciano);
        }

        private static AplicarMagenta(elementoRecipiente: HTMLElement, filtroImagem: d.FiltroImagem): void
        {
            FiltroImagemUtil.AplicarCorrecaoInterno(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_MAGENTA, filtroImagem.Magenta, EnumCorCorrecao.Magenta);
        }

        private static AplicarAmarelo(elementoRecipiente: HTMLElement, filtroImagem: d.FiltroImagem): void
        {
            FiltroImagemUtil.AplicarCorrecaoInterno(elementoRecipiente, FiltroImagemUtil.TAG_ELEMENTO_AMARELO, filtroImagem.Amarelo, EnumCorCorrecao.Amarelo);
        }

        private static AplicarCorrecaoInterno(
            elementoRecipiente: HTMLElement,
            tagElementoCorrecao: string,
            valorCorrecao: number,
            corCorrecao: EnumCorCorrecao): void
        {
            let elementoCorrecao = FiltroImagemUtil.RetornarElementoFiltro(elementoRecipiente, tagElementoCorrecao) as HTMLElement;
            if (typeof valorCorrecao === "number" && valorCorrecao !== 0 && !isNaN(valorCorrecao))
            {
                if (elementoCorrecao == null)
                {
                    elementoCorrecao = document.createElement(tagElementoCorrecao) as HTMLElement;
                    elementoRecipiente.appendChild(elementoCorrecao);
                }
                elementoCorrecao.setAttribute("sn-valor-correcao", ConverterUtil.ParaNumero(valorCorrecao).toFixed(1));
                const cor = this.RetornarCorCorrecao(valorCorrecao, corCorrecao);
                elementoCorrecao.style.backgroundColor = cor;
                elementoCorrecao.style.setProperty("mix-blend-mode", "soft-light");
                (elementoCorrecao.style as any).mixBlendMode = "soft-light";
            }
            else
            {
                elementoCorrecao?.remove();
            }
        }

        private static RetornarCorCorrecao(valor: number, corCorrecao: EnumCorCorrecao): string
        {
            const opacidade = this.RetornarOpacidadeCor(valor);
            if (valor > 0)
            {
                return this.RetornarCorPositiva(opacidade, corCorrecao);
            }
            return this.RetornarCorNegativa(opacidade, corCorrecao);
        }

        private static RetornarOpacidadeCor(valor: number): string
        {
            let opacidade = Math.abs(valor) / 100;
            opacidade = NormalizacaoUtil.NormalizarIntervalo(opacidade, 0, 1);
            return opacidade.toFixed(2);
        }

        private static RetornarCorNegativa(opacidade: string, corCorrecao: EnumCorCorrecao): string
        {
            switch (corCorrecao)
            {
                case EnumCorCorrecao.Exposicao:

                    throw new Erro("Utilizar método retornar cor da exposição");
                //return `rgba(0,0,0,${opacidade})`;

                case EnumCorCorrecao.Ciano:

                    return `rgba(255,0,0,${opacidade})`;

                case EnumCorCorrecao.Magenta:

                    return `rgba(0,255,0,${opacidade})`;

                case EnumCorCorrecao.Amarelo:

                    return `rgba(0,0,255,${opacidade})`;

                default:

                    throw new Erro("A cor de correção não suportado");
            }

        }

        private static RetornarCorPositiva(opacidade: string, corCorrecao: EnumCorCorrecao): string
        {
            switch (corCorrecao)
            {
                case EnumCorCorrecao.Exposicao:

                    throw new Erro("Utilizar método retornar cor da exposição");
                //return `rgba(255,255,255, ${opacidade})`;

                case EnumCorCorrecao.Ciano:

                    return `rgba(0,255,255, ${opacidade})`;

                case EnumCorCorrecao.Magenta:

                    return `rgba(255,0,255, ${opacidade})`;

                case EnumCorCorrecao.Amarelo:

                    return `rgba(255,255,0, ${opacidade})`;

                default:

                    throw new Erro("A cor de correção não suportado");
            }

        }

        //#region Exposição

        private static AplicarExposicaoInterno(elementoRecipiente: HTMLElement, tagElementoCorrecao: string, valorCorrecao: number): void
        {
            let elementoExposicao = FiltroImagemUtil.RetornarElementoFiltro(elementoRecipiente, tagElementoCorrecao) as HTMLElement;

            if (typeof valorCorrecao === "number" && valorCorrecao !== 0 && !isNaN(valorCorrecao))
            {
                if (elementoExposicao == null)
                {
                    elementoExposicao = document.createElement(tagElementoCorrecao) as HTMLElement;
                    elementoRecipiente.appendChild(elementoExposicao);
                }
                elementoExposicao.setAttribute("sn-valor-correcao", ConverterUtil.ParaNumero(valorCorrecao).toFixed(1));
                const cor = this.RetornarCorExposicao(valorCorrecao);
                elementoExposicao.style.backgroundColor = cor;
                elementoExposicao.style.setProperty("mix-blend-mode", "soft-light");
                (elementoExposicao.style as any).mixBlendMode = "soft-light";
            }
            else
            {
                elementoExposicao?.remove();
            }
        }

        private static RetornarCorExposicao(valor: number): string
        {
            const opacidade = Math.abs(valor) / 100;
            let valorRgb = 127 - (127 * opacidade);
            if (valor > 0)
            {
                valorRgb = 255 - valorRgb;
                //return `rgb(${valorRgb}, ${valorRgb},${valorRgb})`;
            }
            return `rgb(${valorRgb}, ${valorRgb},${valorRgb})`;
        }

        private static RetornarElementoFiltro(elementoRecipiente: HTMLElement, tagElemento: string): HTMLElement
        {
            if (elementoRecipiente.id === "")
            {
                elementoRecipiente.id = ElementoUtil.RetornarNovoIDElemento();
            }
            return elementoRecipiente.querySelector(`#${elementoRecipiente.id} > ${tagElemento} `);
        }

        //#endregion

        //#endregion
    }

    enum EnumCorCorrecao
    {
        Ciano = 1,
        Magenta = 2,
        Amarelo = 3,
        Exposicao = 10,
    }

    enum EnumFiltroCss
    {
        Contraste = 1,
        Brilho = 2,
        Saturacao = 3,
        Sepia = 4,
        PretoBranco = 5,
        Inverter = 6,
        Matriz = 7,
        Desfoque = 0,
    }
}

