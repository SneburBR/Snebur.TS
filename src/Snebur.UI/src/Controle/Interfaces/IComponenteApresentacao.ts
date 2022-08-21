namespace Snebur.UI
{
    export interface IComponenteApresentacao
    {
        CorFundoApresentacao: EnumCor | string;
        CorTextoApresentacao: EnumCor | string;
        CorBordaApresentacao: EnumCor | string;
        CorIconeApresentacao: EnumCor | string;

        TonalidadeCorFundo: EnumTonalidade;
        TonalidadeCorTexto: EnumTonalidade;
        TonalidadeCorBorda: EnumTonalidade;
        TonalidadeCorIcone: EnumTonalidade;

        //margem
        Margem: MargemUnidadeComprimento;
        MargemInterna: MargemUnidadeComprimento;
        BordaApresentacao: MargemUnidadeComprimento;

        //dimensoes
        AlturaApresentacao: UnidadeComprimento;
        AlturaMinimaApresentacao: UnidadeComprimento;
        AlturaMaximaApresentacao: UnidadeComprimento;

        LarguraApresentacao: UnidadeComprimento;
        LarguraMinimaApresentacao: UnidadeComprimento;
        LarguraMaximaApresentacao: UnidadeComprimento;

        AlturaLinhaApresentacao: UnidadeComprimento;

        //alinhamentos
        AlinhamentoVertical: EnumAlinhamentoVertical;
        AlinhamentoHorizontal: EnumAlinhamentoHorizontal;

        //barra de rolagem
        BarraRolagemHorizontal: EnumBarraRolagem;
        BarraRolagemVertical: EnumBarraRolagem;

        Tipografia: EnumTipografia;
        Quebrar: EnumQuebrar;
    }

    export interface IPainel extends IComponenteApresentacao
    {
        TipoPainel: EnumTipoPainel
    }
}
