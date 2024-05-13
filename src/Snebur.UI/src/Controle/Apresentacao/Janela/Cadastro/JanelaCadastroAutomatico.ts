namespace Snebur.UI
{
    export class JanelaCadastroAutomatico extends BaseJanelaCadastro 
    {
        public Propriedades: Array<r.Propriedade>;

        public constructor(controlePai: BaseControle, entidade: d.Entidade)
        public constructor(controlePai: BaseControle, tipoEntidade: r.BaseTipo)
        public constructor(controlePai: BaseControle, argumento: any)
        {
            super(controlePai, argumento);
        }

        public override HtmlCarregado(): void
        {
            super.HtmlCarregado();
            this.AtualizarTamanhoFormulario();
        }

        protected override RetornarHtmlFormulario(): string
        {
            const sb = new StringBuilder();

            this.Propriedades = this.TipoEntidade.RetornarPropriedadesExibicao();
            const len = this.Propriedades.length;
            const caminhoPai = "Entidade";
            for (let i = 0; i < len; i++)
            {
                const propriedade = this.Propriedades[i];
                sb.AppendLine(this.RetornarHtmlControle(caminhoPai, this.TipoEntidade, propriedade));
            }
            return sb.ToString();
        }
        //#region Métodos privados

        private AtualizarTamanhoFormulario(): void
        {
            const alturaMaxima = 300 + (this.Propriedades.length * 60);
            const estilo = new Estilo();
            estilo.height = alturaMaxima.ToPixels();
            EstiloUtil.AtualizarEstilo(this.ElementoConteudo, estilo);
        }
        //#endregion

        //#region Métodos protegidos

        protected override RetornarRelacoesAbertas(): string
        {
            const propriedades = this.TipoEntidade.RetornarPropriedades();
            const len = propriedades.length;

            const relacoesAberta = new Array<string>();
            for (let i = 0; i < len; i++)
            {
                const propriedade = propriedades[i];
                if (this.AbriRelacao(propriedade))
                {
                    relacoesAberta.Add(propriedade.Nome);
                }
            }
            return String.Join(", ", relacoesAberta);
        }

        protected AbriRelacao(propriedade: r.Propriedade)
        {
            if (propriedade.Tipo instanceof r.TipoEntidade)
            {
                return true;
            }
            if (propriedade.Tipo instanceof r.BaseTipoLista)
            {
                const relacao = propriedade.Atributos.OfType<at.BaseRelacaoAttribute>(at.BaseRelacaoAttribute).SingleOrDefault();
                if (relacao instanceof at.RelacaoNnAttribute)
                {
                    return true;
                }
            }
            return false;
        }
        //#endregion

        //#region Html Controles 

        private RetornarHtmlControle(caminhoPai: string, tipoEntidade: r.TipoEntidade, propriedade: r.Propriedade): string
        {
            if (propriedade.Tipo instanceof r.TipoPrimario)
            {
                return this.RetornarHtmlControleTipoPrimario(caminhoPai, tipoEntidade, propriedade);
            }
            if (propriedade.Tipo instanceof r.TipoEntidade)
            {
                return this.RetornarHtmlControleEntidade(caminhoPai, tipoEntidade, propriedade);
            }
            if (propriedade.Tipo instanceof r.TipoEnum)
            {
                return this.RetornarHtmlControleEnum(caminhoPai, tipoEntidade, propriedade);
            }
            if (propriedade.Tipo instanceof r.TipoListaEntidade)
            {
                //RelacaoNn
                return this.RetornarHtmlControleListaEntidades(caminhoPai, tipoEntidade, propriedade);
            }
            if (propriedade.Tipo instanceof r.TipoComplexo)
            {
                return this.RetornarHtmlControleTipoComplexo(caminhoPai, tipoEntidade, propriedade);
            }
            throw new ErroNaoSuportado("O propriedade não é suportado pelo gerado automático", this);
        }

        private RetornarHtmlControleTipoPrimario(caminhoPai: string, tipoEntidade: r.TipoEntidade, propriedade: r.Propriedade): string
        {
            const caminhoPropriedade = caminhoPai + "." + propriedade.Nome;
            const tipoPrimarioEnum = (propriedade.Tipo as r.TipoPrimario).TipoPrimarioEnum;

            switch (tipoPrimarioEnum)
            {
                case (r.EnumTipoPrimario.String):
                case (r.EnumTipoPrimario.Guid):
                    {
                        const atributoValidacaoSenha = propriedade.Atributos.OfType<at.ValidacaoSenhaAttribute>(at.ValidacaoSenhaAttribute).SingleOrDefault();
                        if (atributoValidacaoSenha != null)
                        {
                            if (this.IDEntidade > 0)
                            {
                                return String.Empty;
                            }
                            return "<sn-caixa-senha sn-bind-form=\"{{" + caminhoPropriedade + "}}\"> </sn-caixa-senha>";
                        }
                        const atributoValidacaoCpf = propriedade.Atributos.OfType<at.ValidacaoCpfAttribute>(at.ValidacaoCpfAttribute).SingleOrDefault();
                        if (atributoValidacaoCpf != null)
                        {
                            return "<sn-caixa-texto sn-bind-form=\"{{" + caminhoPropriedade + "}}\" sn-mascara=\"cpf\"> </sn-caixa-texto>";
                        }
                        return "<sn-caixa-texto sn-bind-form=\"{{" + caminhoPropriedade + "}}\"> </sn-caixa-texto>";
                    }
                case (r.EnumTipoPrimario.Boolean):

                    return "<sn-caixa-interruptor sn-bind-form=\"{{" + caminhoPropriedade + "}}\"></sn-caixa-interruptor>";

                case (r.EnumTipoPrimario.Integer):
                case (r.EnumTipoPrimario.Long):
                case (r.EnumTipoPrimario.Double):
                case (r.EnumTipoPrimario.Decimal):
                    {
                        const atributoMoeda = propriedade.Atributos.OfType<d.Atributos.ValidacaoMoedaAttribute>(d.Atributos.ValidacaoMoedaAttribute).SingleOrDefault();
                        if (atributoMoeda != null)
                        {
                            return "<sn-caixa-moeda sn-bind-form=\"{{" + caminhoPropriedade + "}}\"></sn-caixa-moeda>";
                        }
                        return "<sn-caixa-numero sn-bind-form=\"{{" + caminhoPropriedade + "}}\"></sn-caixa-numero>";

                    }
                case (r.EnumTipoPrimario.DateTime):

                    return "<sn-caixa-data sn-bind-form=\"{{" + caminhoPropriedade + "}}\"></sn-caixa-data>";

                case (r.EnumTipoPrimario.TimeSpan):

                    return "<sn-caixa-hora sn-bind-form=\"{{" + caminhoPropriedade + "}}\"></sn-caixa-hora>";

                default:

                    throw new ErroNaoSuportado("O tipo primário não é suportado", this);
            }
        }

        private RetornarHtmlControleEntidade(caminhoPai: string, tipoEntidade: r.TipoEntidade, propriedade: r.Propriedade): string
        {
            const relacao = propriedade.Atributos.OfType<d.Atributos.BaseRelacaoAttribute>(d.Atributos.BaseRelacaoAttribute).SingleOrDefault();
            if (relacao instanceof at.RelacaoPaiAttribute)
            {
                //var propriedadeDescricao = tipoEntidade.RetornarPropriedadeDescricao();
                const caminhoPropriedade = caminhoPai + "." + propriedade.Nome;
                const caminhoTipo = propriedade.Tipo.__CaminhoTipo;
                const propriedadeDescricao = (propriedade.Tipo as r.TipoEntidade).RetornarPropriedadeDescricao();

                const sb = new StringBuilder();

                sb.AppendLine("<sn-combobox sn-bind-form=\"{{" + caminhoPropriedade + "}}\" sn-tipo=\"" + caminhoTipo + "\" >");
                sb.AppendLine("    <sn-item-selecionado-template>");
                sb.AppendLine("        <span sn-bind-texto=\"{{" + propriedadeDescricao.Nome + "}}\"></span>");
                sb.AppendLine("    </sn-item-selecionado-template>");
                sb.AppendLine("    <sn-item-template>");
                sb.AppendLine("        <span sn-bind-texto=\"{{" + propriedadeDescricao.Nome + "}}\" class=\"mdl- typography--title\" ></span>");
                sb.AppendLine("    </sn-item-template>");
                sb.AppendLine("</sn-combobox>");

                return sb.ToString();
            }
            if (relacao instanceof at.RelacaoUmUmAttribute)
            {
                throw new ErroNaoImplementado();
            }
            throw new ErroNaoSuportado("A relação não é suportada", this);
        }

        private RetornarHtmlControleEnum(caminhoPai: string, tipoEntidade: r.TipoEntidade, propriedade: r.Propriedade): string
        {
            const caminhoPropriedade = caminhoPai + "." + propriedade.Nome;
            const caminhoTipo = propriedade.Tipo.__CaminhoTipo;
            return "<sn-combobox-enum  sn-bind-form=\"{{" + caminhoPropriedade + "}}\" sn-tipo=\"" + caminhoTipo + "\"></sn-combobox-enum>";
        }

        private RetornarHtmlControleListaEntidades(caminhoPai: string, tipoEntidade: r.TipoEntidade, propriedade: r.Propriedade): string
        {
            const relacao = propriedade.Atributos.OfType<d.Atributos.BaseRelacaoAttribute>(d.Atributos.BaseRelacaoAttribute).SingleOrDefault();
            if (relacao instanceof at.RelacaoNnAttribute)
            {
                const caminhoPropriedade = caminhoPai + "." + propriedade.Nome;
                const tipoItemLista: r.TipoEntidade = (propriedade.Tipo as r.TipoListaEntidade).TipoItemLista as r.TipoEntidade;
                const caminhoTipo = tipoItemLista.__CaminhoTipo;

                const propriedadeDescricao = tipoItemLista.RetornarPropriedadeDescricao();

                const sb = new StringBuilder();

                sb.AppendLine("<sn-combobox-nn sn-bind-itens-selecionado=\"{{" + caminhoPropriedade + "}}\" sn-tipo=\"" + caminhoTipo + "\" >");
                sb.AppendLine("    <sn-item-selecionado-template>");
                sb.AppendLine("        <span sn-bind-texto=\"{{" + propriedadeDescricao.Nome + "}}\"></span>");
                sb.AppendLine("    </sn-item-selecionado-template>");
                sb.AppendLine("    <sn-item-template>");
                sb.AppendLine("        <span sn-bind-texto=\"{{" + propriedadeDescricao.Nome + "}}\" class=\"mdl- typography--title\" ></span>");
                sb.AppendLine("    </sn-item-template>");
                sb.AppendLine("</sn-combobox-nn>");

                return sb.ToString();
            }
            throw new ErroNaoSuportado("A relação não é suportada", this);
        }

        private RetornarHtmlControleTipoComplexo(caminhoPai: string, tipoEntidade: r.TipoEntidade, propriedade: r.Propriedade): string
        {
            const tipoComplexo = propriedade.Tipo as r.TipoComplexo;
            const caminhoPropriedade = caminhoPai + "." + propriedade.Nome;
            switch (tipoComplexo.Nome)
            {
                case "Tamanho":
                    {
                        const sbTamanho = new StringBuilder();
                        //return "<sn-caixa-tamanho sn-bind-form=\"{{" + caminhoPropriedade + "}}\"> </sn-caixa-tamanho>";
                        sbTamanho.Append("<sn-caixa-numero sn-bind-form=\"{{" + caminhoPropriedade + ".Largura}}\" > </sn-caixa-numero>");
                        sbTamanho.Append("<sn-caixa-numero sn-bind-form=\"{{" + caminhoPropriedade + ".Altura}}\" > </sn-caixa-numero>");
                        return sbTamanho.ToString();
                    }
                case "Margem":
                    {
                        const sbMargem = new StringBuilder();
                        //return "<sn-caixa-tamanho sn-bind-form=\"{{" + caminhoPropriedade + "}}\"> </sn-caixa-tamanho>";
                        const rotulo = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade);
                        sbMargem.Append("<div> " + rotulo + "</div>");
                        sbMargem.Append("<sn-caixa-numero sn-bind-form=\"{{" + caminhoPropriedade + ".Esquerda}}\" > </sn-caixa-numero>");
                        sbMargem.Append("<sn-caixa-numero sn-bind-form=\"{{" + caminhoPropriedade + ".Superior}}\" > </sn-caixa-numero>");
                        sbMargem.Append("<sn-caixa-numero sn-bind-form=\"{{" + caminhoPropriedade + ".Direita}}\" > </sn-caixa-numero>");
                        sbMargem.Append("<sn-caixa-numero sn-bind-form=\"{{" + caminhoPropriedade + ".Inferior}}\" > </sn-caixa-numero>");
                        return sbMargem.ToString();
                    }
                default:
                    throw new ErroNaoSuportado("Tipo complexo não suportado", this);
            }
        }
        //#endregion
    }
}