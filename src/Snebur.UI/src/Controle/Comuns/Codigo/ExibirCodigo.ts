namespace Snebur.UI
{
    export class ExibirCodigo extends Snebur.UI.BaseControle
    {

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override  Inicializar(): void
        {
            super.Inicializar();
           
            PR.prettyPrint();
        }

        protected override  HtmlCarregado(): void
        {
            super.HtmlCarregado();

            const htmlInterno = this.HtmlInternoInicial;
            const elementoApresentacao = this.ElementoApresentacao;

            ElementoUtil.LimparElementosFilho(elementoApresentacao);

            const elementoExibir = document.createElement("div");
            elementoExibir.className = "exibir";
            elementoExibir.innerHTML = htmlInterno;

            const elementoCodigo = document.createElement("pre");
            elementoCodigo.className = "prettyprint";
            const elementoTexto = document.createTextNode(htmlInterno);
            elementoCodigo.appendChild(elementoTexto);

            elementoApresentacao.appendChild(elementoExibir);
            elementoApresentacao.appendChild(elementoCodigo);
        }

        private RetornarNovoHtmlInterno(): string
        {
            const coteudoCodigicado = u.HtmlEncodeUtil.Encode(this.HtmlInterno);
             
            const sb = new StringBuilder();
            sb.AppendLine("<pre class\"prettyprint\" >");
            sb.AppendLine(coteudoCodigicado);
            sb.AppendLine("</pre>");
            return sb.ToString();
        }
    }
}

declare let PR: ICodePrettify;
interface ICodePrettify
{
    prettyPrint(): void;
}