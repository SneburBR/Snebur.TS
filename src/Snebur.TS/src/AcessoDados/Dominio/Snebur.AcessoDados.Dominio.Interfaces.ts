/*eslint-disable*/
//Data : sexta-feira, 24 de março de 2023
//Hora : 14:51:17
//@Namespace: Snebur.AcessoDados
//@PrioridadeDominio: 2
//@Globalizar: False
//@Dominios dependentes: []

namespace Snebur.AcessoDados
{
    export interface IServicoDados extends Snebur.Comunicacao.IBaseServico 
    {
        RetornarValorScalarAsync(estruturaConsulta : Snebur.AcessoDados.EstruturaConsulta) : Promise<any>;
        RetornarResultadoConsultaAsync(estruturaConsulta : Snebur.AcessoDados.EstruturaConsulta) : Promise<Snebur.AcessoDados.ResultadoConsulta>;
        SalvarAsync(entidades : Array<Snebur.Dominio.Entidade>) : Promise<Snebur.AcessoDados.ResultadoSalvar>;
        ExcluirAsync(entidades : Array<Snebur.Dominio.Entidade>,relacoesEmCascata : string) : Promise<Snebur.AcessoDados.ResultadoExcluir>;
        RetornarDataHoraAsync() : Promise<Date>;
        RetornarDataHoraUTCAsync() : Promise<Date>;
    }
}
namespace Snebur.AcessoDados.Seguranca
{
    export interface IEstruturaConsultaSeguranca
    {
        PropriedadesAbertas : Array<string>;
    }
}