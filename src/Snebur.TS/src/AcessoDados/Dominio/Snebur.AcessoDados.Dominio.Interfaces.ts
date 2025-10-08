/*eslint-disable*/
//@Artifact: Interfaces
//@Project: Snebur.AcessoDados 
//@Namespace: Snebur.AcessoDados.Dominio 
//@PrioridadeDominio: 2
//@Globalizar: False 
//@Dominios dependentes: []
//@DataHora: 2025-10-06 17:01:39

namespace Snebur.AcessoDados
{
    export interface IServicoDados  extends Snebur.Comunicacao.IBaseServico
    {
        RetornarValorScalarAsync(estruturaConsulta: Snebur.AcessoDados.EstruturaConsulta): Promise<any | null>;
        RetornarResultadoConsultaAsync(estruturaConsulta: Snebur.AcessoDados.EstruturaConsulta): Promise<Snebur.AcessoDados.ResultadoConsulta>;
        SalvarAsync(entidades: Array<Snebur.Dominio.IEntidade>): Promise<Snebur.AcessoDados.ResultadoSalvar>;
        DeletarAsync(entidades: Array<Snebur.Dominio.IEntidade>, relacoesEmCascata: string): Promise<Snebur.AcessoDados.ResultadoDeletar>;
        RetornarDataHoraAsync(): Promise<Date>;
        RetornarDataHoraUTCAsync(): Promise<Date>;
    }
}
namespace Snebur.AcessoDados.Seguranca
{
    export interface IEstruturaConsultaSeguranca
    {
        readonly PropriedadesAbertas: Array<string> | null;
    }
}