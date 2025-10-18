// Auto-generated file. Reflexao - Snebur.AcessoDados. Do not modify directly. 
//@Project: Snebur.AcessoDados
//@DataHora: 2025-10-18 15:49:05
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
    export const __$tipoListaEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao = new TipoListaEnum("ListaTipoEnum_Snebur.AcessoDados.EnumPosicaoOrdenacao", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.EnumPosicaoOrdenacao, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao);
    export const __$tipoListaEnum_Snebur_AcessoDados_EnumTipoFuncao = new TipoListaEnum("ListaTipoEnum_Snebur.AcessoDados.EnumTipoFuncao", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.EnumTipoFuncao, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoEnum_Snebur_AcessoDados_EnumTipoFuncao);
    
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.EnumPosicaoOrdenacao",__$tipoEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao);
    $Reflexao.Tipos.Adicionar("Snebur.AcessoDados.EnumTipoFuncao",__$tipoEnum_Snebur_AcessoDados_EnumTipoFuncao);
    //Adding collections
    $Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur.AcessoDados.EnumPosicaoOrdenacao",__$tipoListaEnum_Snebur_AcessoDados_EnumPosicaoOrdenacao);
    $Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur.AcessoDados.EnumTipoFuncao",__$tipoListaEnum_Snebur_AcessoDados_EnumTipoFuncao);
    //Type paths
    Snebur.AcessoDados.EnumPosicaoOrdenacao.__CaminhoTipo = "Snebur.AcessoDados.EnumPosicaoOrdenacao";
    Snebur.AcessoDados.EnumTipoFuncao.__CaminhoTipo = "Snebur.AcessoDados.EnumTipoFuncao";
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
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_BaseAcessoDados = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.BaseAcessoDados", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.BaseAcessoDados, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_BaseFiltro = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.BaseFiltro", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.BaseFiltro, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_BaseFiltro);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.BaseRelacaoAberta", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.BaseRelacaoAberta, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.ConsultaFiltroColecao", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.ConsultaFiltroColecao, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.EntidadeSalvaInfo", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.EntidadeSalvaInfo, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_EstruturaConsulta = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.EstruturaConsulta", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.EstruturaConsulta, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_Ordenacao = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.Ordenacao", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.Ordenacao, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_Ordenacao);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_PropriedadeComputada = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.PropriedadeComputada", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.PropriedadeComputada, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_PropriedadeComputada);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_Resultado = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.Resultado", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.Resultado, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_Resultado);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.BaseFiltroGrupo", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.BaseFiltroGrupo, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroIds = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroIds", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.FiltroIds, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_FiltroIds);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroPropriedade = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroPropriedade", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.FiltroPropriedade, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroPropriedadeIn", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.FiltroPropriedadeIn, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.RelacaoAbertaColecao", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.RelacaoAbertaColecao, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.RelacaoAbertaEntidade", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.RelacaoAbertaEntidade, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoConsulta = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.ResultadoConsulta", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.ResultadoConsulta, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_ResultadoConsulta);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoDeletar = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.ResultadoDeletar", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.ResultadoDeletar, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_ResultadoDeletar);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoSalvar = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.ResultadoSalvar", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.ResultadoSalvar, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_ResultadoSalvar);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoE = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroGrupoE", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.FiltroGrupoE, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoE);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoNAO = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroGrupoNAO", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.FiltroGrupoNAO, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoNAO);
    export const __$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoOU = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroGrupoOU", "Snebur.AcessoDados", "System.Collections.Generic.List`1[[Snebur.AcessoDados.FiltroGrupoOU, Snebur.AcessoDados]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoOU);
    
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
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.BaseAcessoDados",__$tipoListaBaseDominio_Snebur_AcessoDados_BaseAcessoDados);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.BaseFiltro",__$tipoListaBaseDominio_Snebur_AcessoDados_BaseFiltro);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.BaseRelacaoAberta",__$tipoListaBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.ConsultaFiltroColecao",__$tipoListaBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.EntidadeSalvaInfo",__$tipoListaBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.EstruturaConsulta",__$tipoListaBaseDominio_Snebur_AcessoDados_EstruturaConsulta);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.Ordenacao",__$tipoListaBaseDominio_Snebur_AcessoDados_Ordenacao);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.PropriedadeComputada",__$tipoListaBaseDominio_Snebur_AcessoDados_PropriedadeComputada);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.Resultado",__$tipoListaBaseDominio_Snebur_AcessoDados_Resultado);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.BaseFiltroGrupo",__$tipoListaBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroIds",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroIds);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroPropriedade",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroPropriedade);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroPropriedadeIn",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.RelacaoAbertaColecao",__$tipoListaBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.RelacaoAbertaEntidade",__$tipoListaBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.ResultadoConsulta",__$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoConsulta);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.ResultadoDeletar",__$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoDeletar);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.ResultadoSalvar",__$tipoListaBaseDominio_Snebur_AcessoDados_ResultadoSalvar);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroGrupoE",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoE);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroGrupoNAO",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoNAO);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.AcessoDados.FiltroGrupoOU",__$tipoListaBaseDominio_Snebur_AcessoDados_FiltroGrupoOU);
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
    //#endregion
    
    //#region Class Attributes
    //#endregion
    
    //#region Properties
    const __$propriedade_Snebur_AcessoDados_BaseAcessoDados_MensagemErro = new Propriedade("MensagemErro", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados, true, false);
    const __$propriedade_Snebur_AcessoDados_BaseAcessoDados_FalhaAutenticacao = new Propriedade("FalhaAutenticacao", __$tipoTipoPrimario_Boolean, __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados, false, false);
    const __$propriedade_Snebur_AcessoDados_BaseAcessoDados_Comandos = new Propriedade("Comandos", __$tipoListaTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseAcessoDados_MensagemErro)
    __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseAcessoDados_FalhaAutenticacao)
    __$tipoBaseDominio_Snebur_AcessoDados_BaseAcessoDados.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseAcessoDados_Comandos)
    const __$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_CaminhoPropriedade = new Propriedade("CaminhoPropriedade", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta, true, false);
    const __$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_NomeTipoEntidade = new Propriedade("NomeTipoEntidade", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta, true, false);
    const __$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_NomeTipoDeclarado = new Propriedade("NomeTipoDeclarado", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta, true, false);
    const __$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_TipoEntidadeAssemblyQualifiedName = new Propriedade("TipoEntidadeAssemblyQualifiedName", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta, true, false);
    const __$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_TipoDeclaradoAssemblyQualifiedName = new Propriedade("TipoDeclaradoAssemblyQualifiedName", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta, true, false);
    const __$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_PropriedadesAbertas = new Propriedade("PropriedadesAbertas", __$tipoListaTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_CaminhoPropriedade)
    __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_NomeTipoEntidade)
    __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_NomeTipoDeclarado)
    __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_TipoEntidadeAssemblyQualifiedName)
    __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_TipoDeclaradoAssemblyQualifiedName)
    __$tipoBaseDominio_Snebur_AcessoDados_BaseRelacaoAberta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseRelacaoAberta_PropriedadesAbertas)
    const __$propriedade_Snebur_AcessoDados_ConsultaFiltroColecao_Relacao = new Propriedade("Relacao", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao, true, false);
    const __$propriedade_Snebur_AcessoDados_ConsultaFiltroColecao_EstruturaConsulta = new Propriedade("EstruturaConsulta", __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, __$tipoBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao, true, false);
    __$tipoBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_ConsultaFiltroColecao_Relacao)
    __$tipoBaseDominio_Snebur_AcessoDados_ConsultaFiltroColecao.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_ConsultaFiltroColecao_EstruturaConsulta)
    const __$propriedade_Snebur_AcessoDados_EntidadeSalvaInfo_Id = new Propriedade("Id", __$tipoTipoPrimario_Long, __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo, false, false);
    const __$propriedade_Snebur_AcessoDados_EntidadeSalvaInfo_IdentificadorUnicoEntidade = new Propriedade("IdentificadorUnicoEntidade", __$tipoTipoPrimario_Guid, __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo, false, false);
    const __$propriedade_Snebur_AcessoDados_EntidadeSalvaInfo_CaminhoTipoEntidadeSalva = new Propriedade("CaminhoTipoEntidadeSalva", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo, false, false);
    const __$propriedade_Snebur_AcessoDados_EntidadeSalvaInfo_PropriedadesComputada = new Propriedade("PropriedadesComputada", __$tipoListaBaseDominio_Snebur_AcessoDados_PropriedadeComputada, __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EntidadeSalvaInfo_Id)
    __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EntidadeSalvaInfo_IdentificadorUnicoEntidade)
    __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EntidadeSalvaInfo_CaminhoTipoEntidadeSalva)
    __$tipoBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EntidadeSalvaInfo_PropriedadesComputada)
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_NomeTipoEntidade = new Propriedade("NomeTipoEntidade", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, true, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_TipoEntidadeAssemblyQualifiedName = new Propriedade("TipoEntidadeAssemblyQualifiedName", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, true, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_IsIncluirDeletados = new Propriedade("IsIncluirDeletados", __$tipoTipoPrimario_Boolean, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_IsIncluirInativos = new Propriedade("IsIncluirInativos", __$tipoTipoPrimario_Boolean, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_IsDesativarOrdenacao = new Propriedade("IsDesativarOrdenacao", __$tipoTipoPrimario_Boolean, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_Take = new Propriedade("Take", __$tipoTipoPrimario_Integer, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_Skip = new Propriedade("Skip", __$tipoTipoPrimario_Integer, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_PaginaAtual = new Propriedade("PaginaAtual", __$tipoTipoPrimario_Integer, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_CaminhoPropriedadeFuncao = new Propriedade("CaminhoPropriedadeFuncao", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, true, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_TipoFuncaoEnum = new Propriedade("TipoFuncaoEnum", __$tipoTipoPrimario_EnumValor, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_FiltroGrupoE = new Propriedade("FiltroGrupoE", __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoE, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_FiltroGrupoOU = new Propriedade("FiltroGrupoOU", __$tipoBaseDominio_Snebur_AcessoDados_FiltroGrupoOU, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_Ordenacoes = new Propriedade("Ordenacoes", TipoDicionario.GetOrCreate(__$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_Ordenacao, "Dicionario__System.String_Snebur.AcessoDados.Ordenacao"), __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_RelacoesAbertaFiltro = new Propriedade("RelacoesAbertaFiltro", TipoDicionario.GetOrCreate(__$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade, "Dicionario__System.String_Snebur.AcessoDados.RelacaoAbertaEntidade"), __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_RelacoesAberta = new Propriedade("RelacoesAberta", TipoDicionario.GetOrCreate(__$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaEntidade, "Dicionario__System.String_Snebur.AcessoDados.RelacaoAbertaEntidade"), __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_ColecoesAberta = new Propriedade("ColecoesAberta", TipoDicionario.GetOrCreate(__$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao, "Dicionario__System.String_Snebur.AcessoDados.RelacaoAbertaColecao"), __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_PropriedadesAbertas = new Propriedade("PropriedadesAbertas", __$tipoListaTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_EstruturaConsulta_ContarRegistros = new Propriedade("ContarRegistros", __$tipoTipoPrimario_Boolean, __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_NomeTipoEntidade)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_TipoEntidadeAssemblyQualifiedName)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_IsIncluirDeletados)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_IsIncluirInativos)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_IsDesativarOrdenacao)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_Take)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_Skip)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_PaginaAtual)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_CaminhoPropriedadeFuncao)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_TipoFuncaoEnum)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_FiltroGrupoE)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_FiltroGrupoOU)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_Ordenacoes)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_RelacoesAbertaFiltro)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_RelacoesAberta)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_ColecoesAberta)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_PropriedadesAbertas)
    __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_EstruturaConsulta_ContarRegistros)
    const __$propriedade_Snebur_AcessoDados_Ordenacao_CaminhoPropriedade = new Propriedade("CaminhoPropriedade", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_Ordenacao, true, false);
    const __$propriedade_Snebur_AcessoDados_Ordenacao_SentidoOrdenacaoEnum = new Propriedade("SentidoOrdenacaoEnum", __$tipoTipoPrimario_EnumValor, __$tipoBaseDominio_Snebur_AcessoDados_Ordenacao, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_Ordenacao.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_Ordenacao_CaminhoPropriedade)
    __$tipoBaseDominio_Snebur_AcessoDados_Ordenacao.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_Ordenacao_SentidoOrdenacaoEnum)
    const __$propriedade_Snebur_AcessoDados_PropriedadeComputada_NomePropriedade = new Propriedade("NomePropriedade", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_PropriedadeComputada, false, false);
    const __$propriedade_Snebur_AcessoDados_PropriedadeComputada_Valor = new Propriedade("Valor", __$tipoTipoPrimario_Object, __$tipoBaseDominio_Snebur_AcessoDados_PropriedadeComputada, true, false);
    __$tipoBaseDominio_Snebur_AcessoDados_PropriedadeComputada.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_PropriedadeComputada_NomePropriedade)
    __$tipoBaseDominio_Snebur_AcessoDados_PropriedadeComputada.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_PropriedadeComputada_Valor)
    const __$propriedade_Snebur_AcessoDados_Resultado_IsSucesso = new Propriedade("IsSucesso", __$tipoTipoPrimario_Boolean, __$tipoBaseDominio_Snebur_AcessoDados_Resultado, false, false);
    const __$propriedade_Snebur_AcessoDados_Resultado_Permissao = new Propriedade("Permissao", __$tipoTipoPrimario_EnumValor, __$tipoBaseDominio_Snebur_AcessoDados_Resultado, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_Resultado.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_Resultado_IsSucesso)
    __$tipoBaseDominio_Snebur_AcessoDados_Resultado.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_Resultado_Permissao)
    const __$propriedade_Snebur_AcessoDados_BaseFiltroGrupo_Filtros = new Propriedade("Filtros", __$tipoListaBaseDominio_Snebur_AcessoDados_BaseFiltro, __$tipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_BaseFiltroGrupo.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_BaseFiltroGrupo_Filtros)
    const __$propriedade_Snebur_AcessoDados_FiltroIds_Ids = new Propriedade("Ids", __$tipoListaTipoPrimario_Long, __$tipoBaseDominio_Snebur_AcessoDados_FiltroIds, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_FiltroIds.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_FiltroIds_Ids)
    const __$propriedade_Snebur_AcessoDados_FiltroPropriedade_CaminhoPropriedade = new Propriedade("CaminhoPropriedade", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade, true, false);
    const __$propriedade_Snebur_AcessoDados_FiltroPropriedade_TipoPrimarioEnum = new Propriedade("TipoPrimarioEnum", __$tipoTipoPrimario_EnumValor, __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade, false, false);
    const __$propriedade_Snebur_AcessoDados_FiltroPropriedade_Operador = new Propriedade("Operador", __$tipoTipoPrimario_EnumValor, __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade, false, false);
    const __$propriedade_Snebur_AcessoDados_FiltroPropriedade_Valor = new Propriedade("Valor", __$tipoTipoPrimario_Object, __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade, true, false);
    __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_FiltroPropriedade_CaminhoPropriedade)
    __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_FiltroPropriedade_TipoPrimarioEnum)
    __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_FiltroPropriedade_Operador)
    __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedade.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_FiltroPropriedade_Valor)
    const __$propriedade_Snebur_AcessoDados_FiltroPropriedadeIn_CaminhoPropriedade = new Propriedade("CaminhoPropriedade", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn, true, false);
    const __$propriedade_Snebur_AcessoDados_FiltroPropriedadeIn_Lista = new Propriedade("Lista", __$tipoListaTipoPrimario_String, __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_FiltroPropriedadeIn_CaminhoPropriedade)
    __$tipoBaseDominio_Snebur_AcessoDados_FiltroPropriedadeIn.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_FiltroPropriedadeIn_Lista)
    const __$propriedade_Snebur_AcessoDados_RelacaoAbertaColecao_EstruturaConsulta = new Propriedade("EstruturaConsulta", __$tipoBaseDominio_Snebur_AcessoDados_EstruturaConsulta, __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao, true, false);
    __$tipoBaseDominio_Snebur_AcessoDados_RelacaoAbertaColecao.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_RelacaoAbertaColecao_EstruturaConsulta)
    const __$propriedade_Snebur_AcessoDados_ResultadoConsulta_Entidades = new Propriedade("Entidades", __$tipoListaEntidade_Snebur_Dominio_Entidade, __$tipoBaseDominio_Snebur_AcessoDados_ResultadoConsulta, false, false);
    const __$propriedade_Snebur_AcessoDados_ResultadoConsulta_TotalRegistros = new Propriedade("TotalRegistros", __$tipoTipoPrimario_Integer, __$tipoBaseDominio_Snebur_AcessoDados_ResultadoConsulta, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_ResultadoConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_ResultadoConsulta_Entidades)
    __$tipoBaseDominio_Snebur_AcessoDados_ResultadoConsulta.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_ResultadoConsulta_TotalRegistros)
    const __$propriedade_Snebur_AcessoDados_ResultadoSalvar_EntidadesSalvas = new Propriedade("EntidadesSalvas", __$tipoListaBaseDominio_Snebur_AcessoDados_EntidadeSalvaInfo, __$tipoBaseDominio_Snebur_AcessoDados_ResultadoSalvar, false, false);
    const __$propriedade_Snebur_AcessoDados_ResultadoSalvar_ErrosValidacao = new Propriedade("ErrosValidacao", __$tipoListaBaseDominio_Snebur_Dominio_ErroValidacaoInfo, __$tipoBaseDominio_Snebur_AcessoDados_ResultadoSalvar, false, false);
    __$tipoBaseDominio_Snebur_AcessoDados_ResultadoSalvar.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_ResultadoSalvar_EntidadesSalvas)
    __$tipoBaseDominio_Snebur_AcessoDados_ResultadoSalvar.AdicionarPropriedade(__$propriedade_Snebur_AcessoDados_ResultadoSalvar_ErrosValidacao)
    //#endregion
}