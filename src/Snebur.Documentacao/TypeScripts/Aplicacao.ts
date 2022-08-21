namespace Snebur.UI
{
    class AplicacaoDocumentacaoInterna extends Snebur.UI.BaseAplicacao
    {

        public constructor()
        {
            super();
            //super(Snebur.UI.Teste.Principal);

        }
 
        public RetornarServicos(): Array<Snebur.Comunicacao.BaseServicoUsuarioCliente>
        {
            var servicos = new Array<c.BaseServicoUsuarioCliente>();
            return servicos;
        }
    }

    if (document.location.hostname.Contains("documentacao.snebur.local"))
    {
        window.onload = async () =>
        {
            $Aplicacao = new AplicacaoDocumentacaoInterna();
            $Aplicacao.Inicializar();
            //await $Aplicacao.InicializarAwait();
            //console.log("Aplicação inicializada");

        }
    }
}




