namespace Snebur.Aplicacao
{
    export interface ConfiguracaoAplicacao
    {
        IsDebug: boolean;

        IsTeste?: boolean;

        IsNaoAlertarErro?: boolean;

        IsDesativarServicoDepuracao?: boolean;

        IsProtegerUrl?: boolean;

        IsDepuracaoUtilizarHostLocal?: boolean;

        IsProducao?: boolean;

        IsGlobalizar?: boolean;

        IdiomaPadrao: string;

        CulturaPadrao: string;

        FormatoData: EnumFormatoData;

        TipoData: EnumTipoData;

        IdentificadorAplicacao: string;

        NamespaceAplicacao: string;

        NamespacesEntidade: Array<string>;

        NamespacesDependecia: Array<string>;

        AtalhosNamespace?: Array<[string, string]>;

        Versao: string;

        UrlServicoDepuracao?: string;

        UrlImagemCarregando?: string;

        UrlImagemPendente?: string;

        UrlImagemErro?: string;

        UrlIcone?: string

        UrlServicosWorker?: string;
    }
}
