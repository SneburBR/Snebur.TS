/*eslint-disable*/
//Data : sexta-feira, 29 de julho de 2022
//Hora : 11:26:21
//@Namespace: Snebur.AcessoDados
//@PrioridadeDominio: 2
//@Globalizar: False
//@Dominios dependentes: []

namespace Snebur.AcessoDados
{
    export enum EnumTipoFuncao
    {
        Consulta = 1,
        Contar = 2,
        Somar = 3,
        Maximo = 4,
        Minimo = 5,
        Media = 6,
    }
    (EnumTipoFuncao as any).Rotulos = {};
    (EnumTipoFuncao as any).Rotulos["Consulta"] = "Consulta";
    (EnumTipoFuncao as any).Rotulos["Contar"] = "Contar";
    (EnumTipoFuncao as any).Rotulos["Somar"] = "Somar";
    (EnumTipoFuncao as any).Rotulos["Maximo"] = "Maximo";
    (EnumTipoFuncao as any).Rotulos["Minimo"] = "Minimo";
    (EnumTipoFuncao as any).Rotulos["Media"] = "Media";

    export enum EnumPosicaoOrdenacao
    {
        Afrente = 1,
        Atras = 2,
    }
    (EnumPosicaoOrdenacao as any).Rotulos = {};
    (EnumPosicaoOrdenacao as any).Rotulos["Afrente"] = "Afrente";
    (EnumPosicaoOrdenacao as any).Rotulos["Atras"] = "Atras";

}