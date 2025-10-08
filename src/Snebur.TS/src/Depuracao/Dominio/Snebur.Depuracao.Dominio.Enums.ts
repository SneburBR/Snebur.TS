/*eslint-disable*/
//@Artifact: Enums
//@Project: Snebur.Depuracao 
//@Namespace: Snebur.Depuracao.Dominio 
//@PrioridadeDominio: 4
//@Globalizar: False 
//@Dominios dependentes: []
//@DataHora: 2025-10-06 17:02:18

namespace Snebur.Depuracao
{
    export enum EnumTipoLog
    {
        Undefined = -1,
        Normal = 0,
        Alerta = 1,
        Erro = 2,
        Sucesso = 3,
        Acao = 4
    }
    (EnumTipoLog as any).Rotulos = {};
    (EnumTipoLog as any).Rotulos["Normal"] = "Normal";
    (EnumTipoLog as any).Rotulos["Alerta"] = "Alerta";
    (EnumTipoLog as any).Rotulos["Erro"] = "Erro";
    (EnumTipoLog as any).Rotulos["Sucesso"] = "Sucesso";
    (EnumTipoLog as any).Rotulos["Acao"] = "Acao";
    export enum EnumTipoMensagem
    {
        Undefined = -1,
        Ping = 1,
        AtualizarEstiloCss = 2,
        AtualizarControle = 3
        , TEMP_Undefined = 0
    }
    (EnumTipoMensagem as any).Rotulos = {};
    (EnumTipoMensagem as any).Rotulos["Undefined"] = "Undefined";
    (EnumTipoMensagem as any).Rotulos["Ping"] = "Ping";
    (EnumTipoMensagem as any).Rotulos["AtualizarEstiloCss"] = "AtualizarEstiloCss";
    (EnumTipoMensagem as any).Rotulos["AtualizarControle"] = "AtualizarControle";
}