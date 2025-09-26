/*eslint-disable*/
//@Project: Snebur.Comunicacao 
//@Namespace: Snebur.Comunicacao.Dominio 
//@PrioridadeDominio: 1
//@Globalizar: False 
//@Dominios dependentes: []
//@Artifact: Interfaces
//@DataHora: 2025-09-26 18:28:22

namespace Snebur.AcessoDados
{
    export interface IServicoRegrasNegocio  extends Snebur.Comunicacao.IBaseServico
    {
    }
}
namespace Snebur.Comunicacao
{
    export interface IServicoLogServicoArquivo  extends Snebur.Comunicacao.IBaseServico
    {
        NotificarInicioEnvioAsync(totalArquivos: number, totalBytes: number): Promise<string>;
        NotificarProgressoEnvioArquivoAsync(identificadorLog: string, progresso: number, bytesEnvidos: number): Promise<boolean>;
        NotificarFimEnvioAsync(identificadorLog: string, totalBytesEnviado: number): Promise<boolean>;
    }
}