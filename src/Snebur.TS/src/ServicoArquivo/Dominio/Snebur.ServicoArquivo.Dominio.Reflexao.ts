// Auto-generated file. Reflexao - Snebur.ServicoArquivo. Do not modify directly. 
//@Project: Snebur.ServicoArquivo
//@DataHora: 2025-10-16 16:38:40
//@Artifact: Reflexao
//@Namespace: Snebur.ServicoArquivo.Dominio 
//@PrioridadeDominio: 2
//@Globalizar: False 
//@Dominios dependentes: []
/*eslint-disable*/
// Ignore Spelling: *

namespace Snebur.Reflexao
{
    
    //#region Enum types Types
    export const __$tipoEnum_Snebur_ServicoArquivo_EnumTipoErroServicoArquivo = new TipoEnum(Snebur.ServicoArquivo.EnumTipoErroServicoArquivo,"EnumTipoErroServicoArquivo","Snebur.ServicoArquivo","Snebur.ServicoArquivo.EnumTipoErroServicoArquivo, Snebur.ServicoArquivo",null,false);
    //Collections
    export const __$tipoListaEnum_Snebur_ServicoArquivo_EnumTipoErroServicoArquivo = new TipoListaEnum("ListaTipoEnum_Snebur.ServicoArquivo.EnumTipoErroServicoArquivo", "Snebur.ServicoArquivo", "System.Collections.Generic.List`1[[Snebur.ServicoArquivo.EnumTipoErroServicoArquivo, Snebur.ServicoArquivo]], System.Private.CoreLib", __$tipoEnum_Snebur_ServicoArquivo_EnumTipoErroServicoArquivo);
    
    $Reflexao.Tipos.Adicionar("Snebur.ServicoArquivo.EnumTipoErroServicoArquivo",__$tipoEnum_Snebur_ServicoArquivo_EnumTipoErroServicoArquivo);
    //Adding collections
    $Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur.ServicoArquivo.EnumTipoErroServicoArquivo",__$tipoListaEnum_Snebur_ServicoArquivo_EnumTipoErroServicoArquivo);
    //Type paths
    Snebur.ServicoArquivo.EnumTipoErroServicoArquivo.__CaminhoTipo = "Snebur.ServicoArquivo.EnumTipoErroServicoArquivo";
    //#endregion
    
    //#region Domain types Types
    export const __$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo = new TipoBaseDominio(Snebur.ServicoArquivo.ResultadoServicoArquivo,"ResultadoServicoArquivo","Snebur.ServicoArquivo","Snebur.ServicoArquivo.ResultadoServicoArquivo, Snebur.ServicoArquivo",__$tipoBaseDominio_Snebur_Dominio_BaseDominio,false);
    //Collections
    export const __$tipoListaBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.ServicoArquivo.ResultadoServicoArquivo", "Snebur.ServicoArquivo", "System.Collections.Generic.List`1[[Snebur.ServicoArquivo.ResultadoServicoArquivo, Snebur.ServicoArquivo]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo);
    
    $Reflexao.Tipos.Adicionar("Snebur.ServicoArquivo.ResultadoServicoArquivo",__$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo);
    //Adding collections
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.ServicoArquivo.ResultadoServicoArquivo",__$tipoListaBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo);
    //Type paths
    Snebur.ServicoArquivo.ResultadoServicoArquivo.__CaminhoTipo = "Snebur.ServicoArquivo.ResultadoServicoArquivo";
    //#endregion
    
    //#region Class Attributes
    //#endregion
    
    //#region Properties
    const __$propriedade_Snebur_ServicoArquivo_ResultadoServicoArquivo_Id = new Propriedade("Id", __$tipoTipoPrimario_Long, __$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo, false);
    const __$propriedade_Snebur_ServicoArquivo_ResultadoServicoArquivo_IsSucesso = new Propriedade("IsSucesso", __$tipoTipoPrimario_Boolean, __$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo, false);
    const __$propriedade_Snebur_ServicoArquivo_ResultadoServicoArquivo_MensagemErro = new Propriedade("MensagemErro", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo, true);
    const __$propriedade_Snebur_ServicoArquivo_ResultadoServicoArquivo_TipoErroServicoArquivo = new Propriedade("TipoErroServicoArquivo", __$tipoTipoPrimario_EnumValor, __$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo, false);
    __$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo.AdicionarPropriedade(__$propriedade_Snebur_ServicoArquivo_ResultadoServicoArquivo_Id)
    __$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo.AdicionarPropriedade(__$propriedade_Snebur_ServicoArquivo_ResultadoServicoArquivo_IsSucesso)
    __$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo.AdicionarPropriedade(__$propriedade_Snebur_ServicoArquivo_ResultadoServicoArquivo_MensagemErro)
    __$tipoBaseDominio_Snebur_ServicoArquivo_ResultadoServicoArquivo.AdicionarPropriedade(__$propriedade_Snebur_ServicoArquivo_ResultadoServicoArquivo_TipoErroServicoArquivo)
    //#endregion
}