namespace Snebur.Aplicacao
{
    export interface ConfiguracaoAplicacao
    {
        IsPermitirUsuarioAnonimo?: boolean;
        IsDebugApresentacao?: boolean;
        PrefixosCssClasse?: Array<string>;
        ConfiguracaoFormulario?: IConfiguracaoFormulario;
        CaminhoRotaNavegadorPrincipal?: string;
    }

    export interface IConfiguracaoFormulario
    {
        TipoCaixaPadrao?: ui.EnumTipoCaixa,
        IsMostrarMensagemValidacaoFlutuante? : boolean
    }
}
