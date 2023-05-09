﻿/*eslint-disable*/
//Data : segunda-feira, 8 de maio de 2023
//Hora : 18:16:13
//@Namespace: Snebur.Comunicacao
//@PrioridadeDominio: 1
//@Globalizar: False
//@Dominios dependentes: []

namespace Snebur.AcessoDados
{
    export interface IServicoRegrasNegocio extends Snebur.Comunicacao.IBaseServico 
    {
    }
}
namespace Snebur.Comunicacao
{
    export interface IServicoLogServicoArquivo extends Snebur.Comunicacao.IBaseServico 
    {
        NotificarInicioEnvioAsync(totalArquivos : number,totalBytes : number) : Promise<string>;
        NotificarProgressoEnvioArquivoAsync(identificadorLog : string,progresso : number,bytesEnvidos : number) : Promise<boolean>;
        NotificarFimEnvioAsync(identificadorLog : string,totalBytesEnviado : number) : Promise<boolean>;
    }
}