namespace Snebur
{
    if (document.location.hostname.Contains("apresentacao.snebur.local"))
    {
        $Configuracao = {

            IsDebug: true,

            IsProducao: false,

            IsAppCordova: false,

            IsMostrarAlertaErro: true,

            IsGlobalizar: false,

            IdiomaPadrao: "pt-BR",

            CulturaPadrao: "pt-BR",

            IdentificadorAplicacao: "Snebur.Documentacao",

            IdentificadorInstancia: "Snebur.Documentacao",

            NamespacePadrao: "Snebur.Documentacao",

            NamespaceDependentes: [ "Snebur.UI"],

            Versao: '1.0.0.0',

            PermitirUsuarioAnonimo: true,

            IsDebugApresentacao: true,

            PrefixosCssClasse: [],

            
        }
    }

}
