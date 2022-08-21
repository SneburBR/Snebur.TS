/*eslint-disable*/
//Data : sexta-feira, 29 de julho de 2022
//Hora : 11:26:21
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