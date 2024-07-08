namespace Snebur.UI
{
    export class BindControleUtil
    {
        private static _atributosBind: Array<AtributoHtmlBindConstrutor> = null;

        private static get AtributosBindConstrutor(): Array<AtributoHtmlBindConstrutor>
        {
            if (BindControleUtil._atributosBind == null)
            {
                BindControleUtil._atributosBind = new Array<AtributoHtmlBindConstrutor>();
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.Bind, null));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindUrlImagem, BindUrlImagem));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindTexto, BindTexto));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindRotulo, BindRotulo));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindHora, BindHora));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindData, BindData));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindNumero, BindNumero));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindSenha, BindSenha));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindEnum, BindEnum));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindCssClasse, BindCssClasse));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindDataSource, BindDataSource));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindLista, BindLista));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindFormulario, BindControleFormulario));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindProgresso, BindProgresso));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindItensSelecionado, BindItensSelecionado));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindImagem, BindImagem));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindPropriedade, BindPropriedade));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindEstilo, BindEstilo));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindClass, BindClass));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindValorLogico, BindSelecionadoAlternancia));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindImagens, BindImagens));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.BindSugestoes, BindSugestoes));

                //BindUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.Visibilidade, BindVisibilidade));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.Visibilidade, BindVisibilidade));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.Icone, BindIcone));

                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.Cor, BindCor));

                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.CorFundo, BindCorFundo));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.CorTexto, BindCorTexto));
                //BindUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.CorIcone, BindCorIcone));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.CorBorda, BindCorBorda));

                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.FiltroImagem, BindFiltroImagem));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindConstrutor(AtributosHtml.PreenchimentoImagem, BindPreenchimentoImage));

                //bind propriedade comum
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum(AtributosHtml.Desabilitar, BindPropriedadeComum, x => x.IsDesabilitado));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum(AtributosHtml.Legenda, BindPropriedadeComum, x => x.Legenda));

                //apresentações
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum(AtributosHtml.CorTextoApresentacao, BindPropriedadeComum, x => x.CorTextoApresentacao));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum(AtributosHtml.CorFundoApresentacao, BindPropriedadeComum, x => x.CorFundoApresentacao));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum(AtributosHtml.CorBordaApresentacao, BindPropriedadeComum, x => x.CorBordaApresentacao));

                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum(AtributosHtml.LarguraApresentacao, BindPropriedadeComum, x => x.LarguraApresentacao));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum(AtributosHtml.AlturaApresentacao, BindPropriedadeComum, x => x.AlturaApresentacao));

                //painel
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum<IPainel>(AtributosHtml.TipoPainel, BindPropriedadeComum, x => x.TipoPainel));

                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum<Botao>(AtributosHtml.TipoBotao, BindPropriedadeComum, x => x.TipoBotao));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum<Botao>(AtributosHtml.LinkRota, BindPropriedadeComum, x => x.LinkRota));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum<CaixaTexto>(AtributosHtml.IsSomenteLeitura, BindPropriedadeComum, x => x.IsSomenteLeitura));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum<CaixaTexto>(AtributosHtml.MarcaDagua, BindPropriedadeComum, x => x.MarcaDagua));
                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum<IControleRotulo>(AtributosHtml.Rotulo, BindPropriedadeComum, x => x.Rotulo));

                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum<Painel>(AtributosHtml.TipoPainel, BindPropriedadeComum, x => x.TipoPainel));

                BindControleUtil._atributosBind.Add(new AtributoHtmlBindPropriedadeComum<IControleSelecionado>(AtributosHtml.Selecionado, BindPropriedadeComum, x => x.IsSelecionado));

            }
            return BindControleUtil._atributosBind;
        }

        public static RetornarBinds(controlePai: BaseControle, dicionario: DicionarioSimples<Array<Element>>): Array<BaseBind>
        {
            const binds = new Array<BaseBind>();
            for (const atributoBindConstrutor of BindControleUtil.AtributosBindConstrutor)
            {
                const atributo = atributoBindConstrutor.AtributoHtml;
                if (dicionario.ContainsKey(atributo.Nome))
                {
                    let construtor = atributoBindConstrutor.ConstrutorBind;
                    const elementos = dicionario.Item(atributoBindConstrutor.AtributoHtml.Nome);
                    for (const elemento of elementos)
                    {
                        const conteudo = elemento.getAttribute(atributo.Nome);
                        const valoresAtributo = conteudo.split("&");
                        for (let valorAtributo of valoresAtributo)
                        {
                            valorAtributo = valorAtributo.trim();
                            if (BindUtil.IsCaminhoBind(valorAtributo))
                            {
                                if (atributoBindConstrutor instanceof AtributoHtmlBindPropriedadeComum)
                                {
                                    const novoBind = new (construtor as IBindPropriedadeComumConstrutor)(controlePai, elemento, valorAtributo, atributoBindConstrutor.NomePropriedade);
                                    novoBind.DataSource = controlePai.DataSource;
                                    binds.Add(novoBind);
                                }
                                else
                                {
                                    if (atributo.Nome === AtributosHtml.Bind.Nome)
                                    {
                                        construtor = BindControleUtil.RetornarConstrutorBindRecomendado(controlePai, elemento);
                                    }
                                    if (construtor != null) 
                                    {
                                        const novoBind = new construtor(controlePai, elemento, valorAtributo);
                                        if (novoBind instanceof BaseBind)
                                        {
                                            novoBind.DataSource = controlePai.DataSource;
                                            binds.Add(novoBind);
                                        }
                                        else
                                        {
                                            const nomeTipoObjeto = (novoBind as any).constructor?.name ?? (novoBind as any).toString();
                                            throw new Erro(`Objeto não ${nomeTipoObjeto} é do tipo BaseBind`);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return binds;
        }
        
        private static RetornarConstrutorBindRecomendado(controlePai: BaseControle, elemento: Element): IBindConstrutor
        {
            const controleFilho = controlePai.ControlesFilho.Where(x => x.IDElemento === elemento.id).SingleOrDefault();
            if (controleFilho instanceof BaseControle)
            {
                return BindControleUtil.RetornarConstrutorBindControleFilho(controleFilho);
            }
            else
            {
                return BindControleUtil.RetornarConstrutorBindElemento(elemento);
            }
        }

        private static RetornarConstrutorBindControleFilho(controleFilho: BaseControle): IBindConstrutor
        {
            //case controleFilho instanceof CaixaHora:

            //    return BindHora;

            //case controleFilho instanceof CaixaNumero:

            //    return BindNumero;

            if (controleFilho instanceof BaseControleFormulario)
                return BindControleFormulario;

            if (controleFilho instanceof CaixaPrazoTempo)
                return BindDataSource;

            if (controleFilho instanceof ControleImagem)
                return (BindImagem);

            if (controleFilho instanceof ControleImagens)
                return (BindImagens);

            if (controleFilho instanceof Progresso)
                return (BindProgresso);

            if (controleFilho instanceof ColunaTexto)

                return (BindTexto);

            if (controleFilho instanceof BaseControleLista)
                return (BindLista);

            if (controleFilho instanceof CaixaSelecaoCor)
                return (BindSelecaoCor);

            if (controleFilho instanceof BotaoLogico)
            {
                if (controleFilho.IsGrupo)
                {
                    return (BindGrupoLogico);
                }
                return (BindLogico);
            }

            if (controleFilho instanceof ControleRotulo)
            {
                return (BindRotulo);
            }

            if (controleFilho instanceof BaseControleApresentacaoFormulario)
                return (BindDataSource);

            throw new Erro("Controle filho não suportado pelo sn-bind", this);

        }

        private static RetornarConstrutorBindElemento(elemento: Element): IBindConstrutor
        {
            switch (elemento.tagName.toLowerCase())
            {
                case "label":
                case "i":
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                case "span":
                case "strong":
                case "div":
                case "td":
                case "th":
                case "sn-coluna-texto":
                case "ap-texto":
                case "ap-paragrafo":
                case "ap-bloco":

                    return (BindTexto);

                case "sn-controle-imagem":

                    return (BindImagem);

                case "img":

                    return (BindUrlImagem);

                default:
                    {
                        const errorMessage = `Elemento ou controle não é suportado pelo sn-bind: ${elemento.tagName}`;
                        console.error(errorMessage, elemento);
                        DebugUtil.ThrowAndContinue(errorMessage);
                        return null;
                    }
            }
        }
    }
}