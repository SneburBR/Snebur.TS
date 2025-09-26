/*eslint-disable*/
//@Project: Snebur.AcessoDados 
//@Namespace: Snebur.AcessoDados.Dominio 
//@PrioridadeDominio: 2
//@Globalizar: False 
//@Dominios dependentes: []
//@Artifact: Enums
//@DataHora: 2025-09-26 15:26:24

namespace Snebur.AcessoDados
{
    export enum EnumPosicaoOrdenacao
    {
        Undefined = -1,
        Afrente = 1,
        Atras = 2
        , TEMP_Undefined = 0
    }
    (EnumPosicaoOrdenacao as any).Rotulos = {};
    (EnumPosicaoOrdenacao as any).Rotulos["Afrente"] = "Afrente";
    (EnumPosicaoOrdenacao as any).Rotulos["Atras"] = "Atras";
    export enum EnumTipoFuncao
    {
        Undefined = -1,
        Consulta = 1,
        Contar = 2,
        Somar = 3,
        Maximo = 4,
        Minimo = 5,
        Media = 6,
        Existe = 7
        , TEMP_Undefined = 0
    }
    (EnumTipoFuncao as any).Rotulos = {};
    (EnumTipoFuncao as any).Rotulos["Consulta"] = "Consulta";
    (EnumTipoFuncao as any).Rotulos["Contar"] = "Contar";
    (EnumTipoFuncao as any).Rotulos["Somar"] = "Somar";
    (EnumTipoFuncao as any).Rotulos["Maximo"] = "Maximo";
    (EnumTipoFuncao as any).Rotulos["Minimo"] = "Minimo";
    (EnumTipoFuncao as any).Rotulos["Media"] = "Media";
    (EnumTipoFuncao as any).Rotulos["Existe"] = "Existe";
}