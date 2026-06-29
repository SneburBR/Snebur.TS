namespace Snebur.Aplicacao
{
    export interface ConfiguracaoAplicacao
    {
        readonly IsDebugOuTeste?: boolean;
        IsDebug: boolean;
        IsTeste?: boolean;
        IsDebugUI?: boolean;
        IsProtegerUrl?: boolean;
        IsDepuracaoUtilizarHostLocal?: boolean;
        IsUsarHostAtualParaHtmlReferencia?: boolean;
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

        IsAlterarUrlDebug?: boolean;
        UrlMagick?: string;
        UrlServicosWorker: string;
        UrlServicoDepuracao?: string;
        UrlImagemCarregando?: string;
        UrlImagemPendente?: string;
        UrlImagemSemImagem?: string;
        UrlImagemErro?: string;
        UrlIcone?: string;
    }
}
