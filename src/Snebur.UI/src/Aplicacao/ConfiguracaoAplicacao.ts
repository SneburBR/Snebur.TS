namespace Snebur.Aplicacao
{
    export interface ConfiguracaoAplicacao
    {
        IsPermitirUsuarioAnonimo?: boolean;
        IsDebugUI?: boolean;
        PrefixosCssClasse?: Array<string>;
        ConfiguracaoLayout?: IConfiguracaoLayout;
        CaminhoRotaNavegadorPrincipal?: string;
    }

    export interface IConfiguracaoLayout
    {
        TipoCaixaPadrao?: ui.EnumTipoCaixa,
        IconeCategoriaPadrao?: ui.EnumIconeCategoria,
        IsMostrarMensagemValidacaoFlutuante? : boolean
    }
}
