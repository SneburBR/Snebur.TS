
namespace Snebur.ServicoArquivo
{
    export class ServicoArquivo extends Snebur.BaseServico
    {
        public override UrlServico: string;
        public readonly Namespace: string;

        public constructor(tipo: r.TipoEntidade, urlServico: string)
        public constructor(_namespace: string, urlServico: string)
        public constructor(parametro: any, urlServico: string)
        {
            super();

            this.UrlServico = urlServico;
            this.Namespace = u.NamespaceUtil.RetornarNamespace(parametro);
            $Aplicacao.AdicionarServicoArquivo(this.Namespace, urlServico);
        }
    }
}