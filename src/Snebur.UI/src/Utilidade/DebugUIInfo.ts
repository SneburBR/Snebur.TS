namespace Snebur.UI
{
    export class DebugUIInfoUtil
    {

        public static RetornarInfoCompleto(aplicacao: BaseAplicacao, isCopiar = true): string
        {
            const sb = new StringBuilder();
            sb.AppendLine(DebugUIInfoUtil.RetornarInfoResumido(aplicacao, false));

            if (aplicacao != null && aplicacao.DocumentoPrincipal != null)
            {
                sb.AppendLine("Mapa:");
                const mapa = new MapaAplicacao();
                sb.AppendLine(mapa.ToText());
            }

            const resultado = sb.ToString();
            if (isCopiar)
            {
                navigator.clipboard.writeText(resultado);
            }
            return resultado;
        }

        public static RetornarInfoResumido(aplicacao: BaseAplicacao, isCopiar = true): string
        {
            const sb = new StringBuilder();
            if (aplicacao != null)
            {
                sb.AppendLine("Sigi info debug: " + FormatacaoUtil.FormatarDataHora(new Date()));
                if (aplicacao.Usuario != null)
                {
                    sb.AppendLine("Usuário: " + aplicacao.CredencialUsuario.IdentificadorAmigavel ?? aplicacao.CredencialUsuario.IdentificadorUsuario);
                    sb.AppendLine("Versão: " + $Configuracao.Versao);
                }
                const documentoPrincipal = aplicacao.DocumentoPrincipal;
                if (documentoPrincipal != null)
                {
                    if (documentoPrincipal.NavegadorPrincipal.PaginaAtual != null)
                    {
                        sb.AppendLine("Pagina:" + documentoPrincipal.NavegadorPrincipal.PaginaAtual.___NomeConstrutor);
                    }
                    if (documentoPrincipal.JanelasCarregada.Count > 0)
                    {
                        const janela = documentoPrincipal.JanelasCarregada.LastOrDefault();
                        sb.AppendLine("Janela:" + janela.___NomeConstrutor);
                    }
                }
            }

            const resultado = sb.ToString();
            if (isCopiar)
            {
                navigator.clipboard.writeText(resultado);
            }
            return resultado;
        }

    }

    export class MapaAplicacao
    {
        private readonly MapaDocumentoPrincipal: MapaItem

        public constructor()
        {
            this.MapaDocumentoPrincipal = new MapaItem($Aplicacao.DocumentoPrincipal, 0);

        }

        public ToHtml(): string
        {
            return this.MapaDocumentoPrincipal.ToHtml();
        }

        public ToText(): string
        {
            return this.MapaDocumentoPrincipal.ToText();
        }
    }

    class MapaItem
    {
        public readonly Filhos = new List<MapaItem>();
        public constructor(
            public readonly Controle: BaseControleApresentacaoFormulario,
            public readonly Nivel: number)
        {
            for (const controle of this.Controle.DicionarioControlesFilho.ToArray())
            {
                if (controle instanceof BaseControleApresentacaoFormulario)
                {
                    this.Filhos.Add(new MapaItem(controle, this.Nivel + 1));
                }
            }
        }

        public ToHtml(): string
        {
            const tab = "&nbsp;".repeat(this.Nivel * 4);
            const sb = new StringBuilder();
            sb.AppendLine(` ${tab} > ${this.Controle.___NomeConstrutor} `);
            for (const filho of this.Filhos)
            {
                sb.AppendLine(filho.ToHtml());
            }
            return sb.ToHtml();
        }

        public ToText(): string
        {
            const tab = "\t".repeat(this.Nivel);
            const sb = new StringBuilder();
            sb.AppendLine(` ${tab} > ${this.Controle.___NomeConstrutor} (${this.Nivel}) `);
            for (const filho of this.Filhos)
            {
                sb.AppendLine(filho.ToText().trim());
            }
            return sb.ToString();
        }

    }
}