/*eslint-disable*/
//@Namespace: Snebur.Depuracao
//@PrioridadeDominio: 4
//@Globalizar: False
//@Dominios dependentes: []

namespace Snebur.Depuracao
{
    export enum EnumTipoMensagem
    {
        Ping = 1,
        AtualizarEstiloCss = 2,
        AtualizarControle = 3,
    }
    (EnumTipoMensagem as any).Rotulos = {};
    (EnumTipoMensagem as any).Rotulos["Ping"] = "Ping";
    (EnumTipoMensagem as any).Rotulos["AtualizarEstiloCss"] = "AtualizarEstiloCss";
    (EnumTipoMensagem as any).Rotulos["AtualizarControle"] = "AtualizarControle";

    export enum EnumTipoLog
    {
        Normal = 0,
        Alerta = 1,
        Erro = 2,
        Sucesso = 3,
        Acao = 4,
    }
    (EnumTipoLog as any).Rotulos = {};
    (EnumTipoLog as any).Rotulos["Normal"] = "Normal";
    (EnumTipoLog as any).Rotulos["Alerta"] = "Alerta";
    (EnumTipoLog as any).Rotulos["Erro"] = "Erro";
    (EnumTipoLog as any).Rotulos["Sucesso"] = "Sucesso";
    (EnumTipoLog as any).Rotulos["Acao"] = "Acao";

}