/*eslint-disable*/
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
        SalvarAsync(entidades : Array<Snebur.Dominio.IEntidade>) : Promise<Snebur.AcessoDados.ResultadoSalvar>;
        DeletarAsync(entidades : Array<Snebur.Dominio.IEntidade>,relacoesEmCascata : string) : Promise<Snebur.AcessoDados.ResultadoDeletar>;
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