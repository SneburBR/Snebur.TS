// Auto-generated file. Reflexao - Snebur.AcessoDados. Do not modify directly. 
//@Project: Snebur.AcessoDados
//@DataHora: 2025-10-08 11:19:41
//@Artifact: Reflexao
//@Namespace: Snebur.AcessoDados.Dominio 
//@PrioridadeDominio: 2
//@Globalizar: False 
//@Dominios dependentes: []
/*eslint-disable*/
// Ignore Spelling: *

namespace Snebur.Reflexao
{
    
    //#region Enum types Types
    export const __$tipoEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao = new TipoEnum(Snebur.AcessoDados.EnumPosicaoOrdenacao,"EnumPosicaoOrdenacao","Snebur.AcessoDados","Snebur.AcessoDados.EnumPosicaoOrdenacao, Snebur.AcessoDados",null,false);
    export const __$tipoEnum_Snebur_AcessoDados_EnumTipoFuncao = new TipoEnum(Snebur.AcessoDados.EnumTipoFuncao,"EnumTipoFuncao","Snebur.AcessoDados","Snebur.AcessoDados.EnumTipoFuncao, Snebur.AcessoDados",null,false);
    //Collections
    export const __$tipoListaEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao = new TipoListaEnum("ListaTipoEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao", "Snebur.AcessoDados", "Snebur.AcessoDados.EnumPosicaoOrdenacao, Snebur.AcessoDados", __$tipoEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao);
    export const __$tipoListaEnum_Snebur_AcessoDados_EnumTipoFuncao = new TipoListaEnum("ListaTipoEnum_Snebur_AcessoDados_EnumTipoFuncao", "Snebur.AcessoDados", "Snebur.AcessoDados.EnumTipoFuncao, Snebur.AcessoDados", __$tipoEnum_Snebur_AcessoDados_EnumTipoFuncao);
    
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.EnumPosicaoOrdenacao",__$tipoEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.EnumTipoFuncao",__$tipoEnum_Snebur_AcessoDados_EnumTipoFuncao);
    //Adding collections
    $Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao",__$tipoListaEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao);
    $Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_AcessoDados_EnumTipoFuncao",__$tipoListaEnum_Snebur_AcessoDados_EnumTipoFuncao);
    //Type paths
    Snebur.AcessoDados.EnumPosicaoOrdenacao.__CaminhoTipo = "Snebur.AcessoDados.EnumPosicaoOrdenacao";
    Snebur.AcessoDados.EnumTipoFuncao.__CaminhoTipo = "Snebur.AcessoDados.EnumTipoFuncao";
    
    //#region Properties
    //#endregion
    
    //#region Domain types Types
    export const __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados = new TipoBaseDominio(Snebur.AcessoDados.BaseAcessoDados,"BaseAcessoDados","Snebur.AcessoDados","Snebur.AcessoDados.BaseAcessoDados, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_Dominio_BaseDominio,true);
    export const __$tipoBaseDominio_Snebur_AcessoDados_BaseFiltro = new TipoBaseDominio(Snebur.AcessoDados.BaseFiltro,"BaseFiltro","Snebur.AcessoDados","Snebur.AcessoDados.BaseFiltro, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados,true);
    export const __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta = new TipoBaseDominio(Snebur.AcessoDados.BaseRelacaoAberta,"BaseRelacaoAberta","Snebur.AcessoDados","Snebur.AcessoDados.BaseRelacaoAberta, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados,true);
    export const __$tipoBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao = new TipoBaseDominio(Snebur.AcessoDados.ConsultaFiltroColecao,"ConsultaFiltroColecao","Snebur.AcessoDados","Snebur.AcessoDados.ConsultaFiltroColecao, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo = new TipoBaseDominio(Snebur.AcessoDados.EntidadeSalvaInfo,"EntidadeSalvaInfo","Snebur.AcessoDados","Snebur.AcessoDados.EntidadeSalvaInfo, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta = new TipoBaseDominio(Snebur.AcessoDados.EstruturaConsulta,"EstruturaConsulta","Snebur.AcessoDados","Snebur.AcessoDados.EstruturaConsulta, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_Ordenacao = new TipoBaseDominio(Snebur.AcessoDados.Ordenacao,"Ordenacao","Snebur.AcessoDados","Snebur.AcessoDados.Ordenacao, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_PropriedadeComputada = new TipoBaseDominio(Snebur.AcessoDados.PropriedadeComputada,"PropriedadeComputada","Snebur.AcessoDados","Snebur.AcessoDados.PropriedadeComputada, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_Resultado = new TipoBaseDominio(Snebur.AcessoDados.Resultado,"Resultado","Snebur.AcessoDados","Snebur.AcessoDados.Resultado, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados,true);
    export const __$tipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo = new TipoBaseDominio(Snebur.AcessoDados.BaseFiltroGrupo,"BaseFiltroGrupo","Snebur.AcessoDados","Snebur.AcessoDados.BaseFiltroGrupo, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseFiltro,true);
    export const __$tipoBaseDominio_Snebur_AcessoDados_FiltroIds = new TipoBaseDominio(Snebur.AcessoDados.FiltroIds,"FiltroIds","Snebur.AcessoDados","Snebur.AcessoDados.FiltroIds, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseFiltro,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade = new TipoBaseDominio(Snebur.AcessoDados.FiltroPropriedade,"FiltroPropriedade","Snebur.AcessoDados","Snebur.AcessoDados.FiltroPropriedade, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseFiltro,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn = new TipoBaseDominio(Snebur.AcessoDados.FiltroPropriedadeIn,"FiltroPropriedadeIn","Snebur.AcessoDados","Snebur.AcessoDados.FiltroPropriedadeIn, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseFiltro,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao = new TipoBaseDominio(Snebur.AcessoDados.RelacaoAbertaColecao,"RelacaoAbertaColecao","Snebur.AcessoDados","Snebur.AcessoDados.RelacaoAbertaColecao, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade = new TipoBaseDominio(Snebur.AcessoDados.RelacaoAbertaEntidade,"RelacaoAbertaEntidade","Snebur.AcessoDados","Snebur.AcessoDados.RelacaoAbertaEntidade, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_ResultadoConsulta = new TipoBaseDominio(Snebur.AcessoDados.ResultadoConsulta,"ResultadoConsulta","Snebur.AcessoDados","Snebur.AcessoDados.ResultadoConsulta, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_Resultado,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_ResultadoDeletar = new TipoBaseDominio(Snebur.AcessoDados.ResultadoDeletar,"ResultadoDeletar","Snebur.AcessoDados","Snebur.AcessoDados.ResultadoDeletar, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_Resultado,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_ResultadoSalvar = new TipoBaseDominio(Snebur.AcessoDados.ResultadoSalvar,"ResultadoSalvar","Snebur.AcessoDados","Snebur.AcessoDados.ResultadoSalvar, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_Resultado,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoE = new TipoBaseDominio(Snebur.AcessoDados.FiltroGrupoE,"FiltroGrupoE","Snebur.AcessoDados","Snebur.AcessoDados.FiltroGrupoE, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoNAO = new TipoBaseDominio(Snebur.AcessoDados.FiltroGrupoNAO,"FiltroGrupoNAO","Snebur.AcessoDados","Snebur.AcessoDados.FiltroGrupoNAO, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo,false);
    export const __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoOU = new TipoBaseDominio(Snebur.AcessoDados.FiltroGrupoOU,"FiltroGrupoOU","Snebur.AcessoDados","Snebur.AcessoDados.FiltroGrupoOU, Snebur.AcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo,false);
    //Collections
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_BaseAcessoDados = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados", "Snebur.AcessoDados", "Snebur.AcessoDados.BaseAcessoDados, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_BaseFiltro = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_BaseFiltro", "Snebur.AcessoDados", "Snebur.AcessoDados.BaseFiltro, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_BaseFiltro);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta", "Snebur.AcessoDados", "Snebur.AcessoDados.BaseRelacaoAberta, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao", "Snebur.AcessoDados", "Snebur.AcessoDados.ConsultaFiltroColecao, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo", "Snebur.AcessoDados", "Snebur.AcessoDados.EntidadeSalvaInfo, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_EstruturaConsulta = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta", "Snebur.AcessoDados", "Snebur.AcessoDados.EstruturaConsulta, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_Ordenacao = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_Ordenacao", "Snebur.AcessoDados", "Snebur.AcessoDados.Ordenacao, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_Ordenacao);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_PropriedadeComputada = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_PropriedadeComputada", "Snebur.AcessoDados", "Snebur.AcessoDados.PropriedadeComputada, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_PropriedadeComputada);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_Resultado = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_Resultado", "Snebur.AcessoDados", "Snebur.AcessoDados.Resultado, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_Resultado);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo", "Snebur.AcessoDados", "Snebur.AcessoDados.BaseFiltroGrupo, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroIds = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroIds", "Snebur.AcessoDados", "Snebur.AcessoDados.FiltroIds, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_FiltroIds);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroPropriedade = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade", "Snebur.AcessoDados", "Snebur.AcessoDados.FiltroPropriedade, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn", "Snebur.AcessoDados", "Snebur.AcessoDados.FiltroPropriedadeIn, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao", "Snebur.AcessoDados", "Snebur.AcessoDados.RelacaoAbertaColecao, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade", "Snebur.AcessoDados", "Snebur.AcessoDados.RelacaoAbertaEntidade, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoConsulta = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_ResultadoConsulta", "Snebur.AcessoDados", "Snebur.AcessoDados.ResultadoConsulta, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_ResultadoConsulta);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoDeletar = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_ResultadoDeletar", "Snebur.AcessoDados", "Snebur.AcessoDados.ResultadoDeletar, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_ResultadoDeletar);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoSalvar = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_ResultadoSalvar", "Snebur.AcessoDados", "Snebur.AcessoDados.ResultadoSalvar, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_ResultadoSalvar);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoE = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroGrupoE", "Snebur.AcessoDados", "Snebur.AcessoDados.FiltroGrupoE, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoE);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoNAO = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroGrupoNAO", "Snebur.AcessoDados", "Snebur.AcessoDados.FiltroGrupoNAO, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoNAO);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoOU = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroGrupoOU", "Snebur.AcessoDados", "Snebur.AcessoDados.FiltroGrupoOU, Snebur.AcessoDados", __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoOU);
    
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.BaseAcessoDados",__$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.BaseFiltro",__$tipoBaseDominio_Snebur_AcessoDados_BaseFiltro);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.BaseRelacaoAberta",__$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.ConsultaFiltroColecao",__$tipoBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.EntidadeSalvaInfo",__$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.EstruturaConsulta",__$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.Ordenacao",__$tipoBaseDominio_Snebur_AcessoDados_Ordenacao);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.PropriedadeComputada",__$tipoBaseDominio_Snebur_AcessoDados_PropriedadeComputada);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.Resultado",__$tipoBaseDominio_Snebur_AcessoDados_Resultado);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.BaseFiltroGrupo",__$tipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.FiltroIds",__$tipoBaseDominio_Snebur_AcessoDados_FiltroIds);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.FiltroPropriedade",__$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.FiltroPropriedadeIn",__$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.RelacaoAbertaColecao",__$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.RelacaoAbertaEntidade",__$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.ResultadoConsulta",__$tipoBaseDominio_Snebur_AcessoDados_ResultadoConsulta);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.ResultadoDeletar",__$tipoBaseDominio_Snebur_AcessoDados_ResultadoDeletar);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.ResultadoSalvar",__$tipoBaseDominio_Snebur_AcessoDados_ResultadoSalvar);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.FiltroGrupoE",__$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoE);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.FiltroGrupoNAO",__$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoNAO);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.FiltroGrupoOU",__$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoOU);
    //Adding collections
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados",__$tipoListaBaseDominio_Snebur_AcessoDados_BaseAcessoDados);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_BaseFiltro",__$tipoListaBaseDominio_Snebur_AcessoDados_BaseFiltro);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta",__$tipoListaBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao",__$tipoListaBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo",__$tipoListaBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta",__$tipoListaBaseDominio_Snebur_AcessoDados_EstruturaConsulta);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_Ordenacao",__$tipoListaBaseDominio_Snebur_AcessoDados_Ordenacao);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_PropriedadeComputada",__$tipoListaBaseDominio_Snebur_AcessoDados_PropriedadeComputada);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_Resultado",__$tipoListaBaseDominio_Snebur_AcessoDados_Resultado);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo",__$tipoListaBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroIds",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroIds);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroPropriedade);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao",__$tipoListaBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade",__$tipoListaBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_ResultadoConsulta",__$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoConsulta);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_ResultadoDeletar",__$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoDeletar);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_ResultadoSalvar",__$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoSalvar);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroGrupoE",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoE);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroGrupoNAO",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoNAO);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_AcessoDados_FiltroGrupoOU",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoOU);
    //Type paths
    Snebur.AcessoDados.BaseAcessoDados.__CaminhoTipo = "Snebur.AcessoDados.BaseAcessoDados";
    Snebur.AcessoDados.BaseFiltro.__CaminhoTipo = "Snebur.AcessoDados.BaseFiltro";
    Snebur.AcessoDados.BaseRelacaoAberta.__CaminhoTipo = "Snebur.AcessoDados.BaseRelacaoAberta";
    Snebur.AcessoDados.ConsultaFiltroColecao.__CaminhoTipo = "Snebur.AcessoDados.ConsultaFiltroColecao";
    Snebur.AcessoDados.EntidadeSalvaInfo.__CaminhoTipo = "Snebur.AcessoDados.EntidadeSalvaInfo";
    Snebur.AcessoDados.EstruturaConsulta.__CaminhoTipo = "Snebur.AcessoDados.EstruturaConsulta";
    Snebur.AcessoDados.Ordenacao.__CaminhoTipo = "Snebur.AcessoDados.Ordenacao";
    Snebur.AcessoDados.PropriedadeComputada.__CaminhoTipo = "Snebur.AcessoDados.PropriedadeComputada";
    Snebur.AcessoDados.Resultado.__CaminhoTipo = "Snebur.AcessoDados.Resultado";
    Snebur.AcessoDados.BaseFiltroGrupo.__CaminhoTipo = "Snebur.AcessoDados.BaseFiltroGrupo";
    Snebur.AcessoDados.FiltroIds.__CaminhoTipo = "Snebur.AcessoDados.FiltroIds";
    Snebur.AcessoDados.FiltroPropriedade.__CaminhoTipo = "Snebur.AcessoDados.FiltroPropriedade";
    Snebur.AcessoDados.FiltroPropriedadeIn.__CaminhoTipo = "Snebur.AcessoDados.FiltroPropriedadeIn";
    Snebur.AcessoDados.RelacaoAbertaColecao.__CaminhoTipo = "Snebur.AcessoDados.RelacaoAbertaColecao";
    Snebur.AcessoDados.RelacaoAbertaEntidade.__CaminhoTipo = "Snebur.AcessoDados.RelacaoAbertaEntidade";
    Snebur.AcessoDados.ResultadoConsulta.__CaminhoTipo = "Snebur.AcessoDados.ResultadoConsulta";
    Snebur.AcessoDados.ResultadoDeletar.__CaminhoTipo = "Snebur.AcessoDados.ResultadoDeletar";
    Snebur.AcessoDados.ResultadoSalvar.__CaminhoTipo = "Snebur.AcessoDados.ResultadoSalvar";
    Snebur.AcessoDados.FiltroGrupoE.__CaminhoTipo = "Snebur.AcessoDados.FiltroGrupoE";
    Snebur.AcessoDados.FiltroGrupoNAO.__CaminhoTipo = "Snebur.AcessoDados.FiltroGrupoNAO";
    Snebur.AcessoDados.FiltroGrupoOU.__CaminhoTipo = "Snebur.AcessoDados.FiltroGrupoOU";
    
    //#region Properties
    const __$propriedade_Snebur_AcessoDados_BaseAcessoDados_MensagemErro = new Propriedade("MensagemErro", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados, true);
    const __$propriedade_Snebur_AcessoDados_BaseAcessoDados_FalhaAutenticacao = new Propriedade("FalhaAutenticacao", __$tipoTipoPrimario_Boolean, __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados, false);
    const __$propriedade_Snebur_AcessoDados_BaseAcessoDados_Comandos = new Propriedade("Comandos", __$tipoListaTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados, false);
    __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseAcessoDados_MensagemErro)
    __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseAcessoDados_FalhaAutenticacao)
    __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseAcessoDados_Comandos)
    //#endregion
}