// Auto-generated file. Reflexao - Snebur.Depuracao. Do not modify directly. 
//@Project: Snebur.Depuracao
//@DataHora: 2025-11-14 08:07:40
//@Artifact: Reflexao
//@Namespace: Snebur.Depuracao.Dominio 
//@PrioridadeDominio: 4
//@Globalizar: False 
//@Dominios dependentes: []
/*eslint-disable*/
// Ignore Spelling: *

namespace Snebur.Reflexao
{
    
    //#region Enum types Types
    export const __$tipoEnum_Snebur_Depuracao_EnumTipoLog = new TipoEnum(Snebur.Depuracao.EnumTipoLog,"EnumTipoLog","Snebur.Depuracao","Snebur.Depuracao.EnumTipoLog, Snebur.Depuracao",null,false);
    export const __$tipoEnum_Snebur_Depuracao_EnumTipoMensagem = new TipoEnum(Snebur.Depuracao.EnumTipoMensagem,"EnumTipoMensagem","Snebur.Depuracao","Snebur.Depuracao.EnumTipoMensagem, Snebur.Depuracao",null,false);
    //Collections
    export const __$tipoListaEnum_Snebur_Depuracao_EnumTipoLog = new TipoListaEnum("ListaTipoEnum_Snebur.Depuracao.EnumTipoLog", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.EnumTipoLog, Snebur.Depuracao]], System.Private.CoreLib", __$tipoEnum_Snebur_Depuracao_EnumTipoLog);
    export const __$tipoListaEnum_Snebur_Depuracao_EnumTipoMensagem = new TipoListaEnum("ListaTipoEnum_Snebur.Depuracao.EnumTipoMensagem", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.EnumTipoMensagem, Snebur.Depuracao]], System.Private.CoreLib", __$tipoEnum_Snebur_Depuracao_EnumTipoMensagem);
    
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.EnumTipoLog",__$tipoEnum_Snebur_Depuracao_EnumTipoLog);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.EnumTipoMensagem",__$tipoEnum_Snebur_Depuracao_EnumTipoMensagem);
    //Adding collections
    $Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur.Depuracao.EnumTipoLog",__$tipoListaEnum_Snebur_Depuracao_EnumTipoLog);
    $Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur.Depuracao.EnumTipoMensagem",__$tipoListaEnum_Snebur_Depuracao_EnumTipoMensagem);
    //Type paths
    Snebur.Depuracao.EnumTipoLog.__CaminhoTipo = "Snebur.Depuracao.EnumTipoLog";
    Snebur.Depuracao.EnumTipoMensagem.__CaminhoTipo = "Snebur.Depuracao.EnumTipoMensagem";
    //#endregion
    
    //#region Domain types Types
    export const __$tipoBaseDominio_Snebur_Depuracao_Contrato = new TipoBaseDominio(Snebur.Depuracao.Contrato,"Contrato","Snebur.Depuracao","Snebur.Depuracao.Contrato, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Dominio_BaseDominio,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_Mensagem = new TipoBaseDominio(Snebur.Depuracao.Mensagem,"Mensagem","Snebur.Depuracao","Snebur.Depuracao.Mensagem, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Dominio_BaseDominio,true);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado = new TipoBaseDominio(Snebur.Depuracao.MensagemControleAlterado,"MensagemControleAlterado","Snebur.Depuracao","Snebur.Depuracao.MensagemControleAlterado, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado = new TipoBaseDominio(Snebur.Depuracao.MensagemEstiloCssAlterado,"MensagemEstiloCssAlterado","Snebur.Depuracao","Snebur.Depuracao.MensagemEstiloCssAlterado, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo = new TipoBaseDominio(Snebur.Depuracao.MensagemIrParaCodigo,"MensagemIrParaCodigo","Snebur.Depuracao","Snebur.Depuracao.MensagemIrParaCodigo, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemLog = new TipoBaseDominio(Snebur.Depuracao.MensagemLog,"MensagemLog","Snebur.Depuracao","Snebur.Depuracao.MensagemLog, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemPing = new TipoBaseDominio(Snebur.Depuracao.MensagemPing,"MensagemPing","Snebur.Depuracao","Snebur.Depuracao.MensagemPing, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemScriptAlterado = new TipoBaseDominio(Snebur.Depuracao.MensagemScriptAlterado,"MensagemScriptAlterado","Snebur.Depuracao","Snebur.Depuracao.MensagemScriptAlterado, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    //Collections
    export const __$tipoListaBaseDominio_Snebur_Depuracao_Contrato = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.Depuracao.Contrato", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.Contrato, Snebur.Depuracao]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_Depuracao_Contrato);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_Mensagem = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.Depuracao.Mensagem", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.Mensagem, Snebur.Depuracao]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_Depuracao_Mensagem);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemControleAlterado = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.Depuracao.MensagemControleAlterado", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemControleAlterado, Snebur.Depuracao]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.Depuracao.MensagemEstiloCssAlterado", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemEstiloCssAlterado, Snebur.Depuracao]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.Depuracao.MensagemIrParaCodigo", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemIrParaCodigo, Snebur.Depuracao]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemLog = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.Depuracao.MensagemLog", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemLog, Snebur.Depuracao]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_Depuracao_MensagemLog);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemPing = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.Depuracao.MensagemPing", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemPing, Snebur.Depuracao]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_Depuracao_MensagemPing);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemScriptAlterado = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur.Depuracao.MensagemScriptAlterado", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemScriptAlterado, Snebur.Depuracao]], System.Private.CoreLib", __$tipoBaseDominio_Snebur_Depuracao_MensagemScriptAlterado);
    
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.Contrato",__$tipoBaseDominio_Snebur_Depuracao_Contrato);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.Mensagem",__$tipoBaseDominio_Snebur_Depuracao_Mensagem);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemControleAlterado",__$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemEstiloCssAlterado",__$tipoBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemIrParaCodigo",__$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemLog",__$tipoBaseDominio_Snebur_Depuracao_MensagemLog);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemPing",__$tipoBaseDominio_Snebur_Depuracao_MensagemPing);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemScriptAlterado",__$tipoBaseDominio_Snebur_Depuracao_MensagemScriptAlterado);
    //Adding collections
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.Contrato",__$tipoListaBaseDominio_Snebur_Depuracao_Contrato);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.Mensagem",__$tipoListaBaseDominio_Snebur_Depuracao_Mensagem);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemControleAlterado",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemControleAlterado);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemEstiloCssAlterado",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemIrParaCodigo",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemLog",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemLog);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemPing",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemPing);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemScriptAlterado",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemScriptAlterado);
    //Type paths
    Snebur.Depuracao.Contrato.__CaminhoTipo = "Snebur.Depuracao.Contrato";
    Snebur.Depuracao.Mensagem.__CaminhoTipo = "Snebur.Depuracao.Mensagem";
    Snebur.Depuracao.MensagemControleAlterado.__CaminhoTipo = "Snebur.Depuracao.MensagemControleAlterado";
    Snebur.Depuracao.MensagemEstiloCssAlterado.__CaminhoTipo = "Snebur.Depuracao.MensagemEstiloCssAlterado";
    Snebur.Depuracao.MensagemIrParaCodigo.__CaminhoTipo = "Snebur.Depuracao.MensagemIrParaCodigo";
    Snebur.Depuracao.MensagemLog.__CaminhoTipo = "Snebur.Depuracao.MensagemLog";
    Snebur.Depuracao.MensagemPing.__CaminhoTipo = "Snebur.Depuracao.MensagemPing";
    Snebur.Depuracao.MensagemScriptAlterado.__CaminhoTipo = "Snebur.Depuracao.MensagemScriptAlterado";
    //#endregion
    
    //#region Class Attributes
    //#endregion
    
    //#region Properties
    const __$propriedade_Snebur_Depuracao_Contrato_Mensagem = new Propriedade("Mensagem", __$tipoBaseDominio_Snebur_Depuracao_Mensagem, __$tipoBaseDominio_Snebur_Depuracao_Contrato, true, false);
    __$tipoBaseDominio_Snebur_Depuracao_Contrato.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_Contrato_Mensagem)
    const __$propriedade_Snebur_Depuracao_MensagemControleAlterado_IsScript = new Propriedade("IsScript", __$tipoTipoPrimario_Boolean, __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado, false, false);
    const __$propriedade_Snebur_Depuracao_MensagemControleAlterado_UrlScriptRuntime = new Propriedade("UrlScriptRuntime", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado, false, false);
    const __$propriedade_Snebur_Depuracao_MensagemControleAlterado_CaminhoConstrutor = new Propriedade("CaminhoConstrutor", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado, false, false);
    const __$propriedade_Snebur_Depuracao_MensagemControleAlterado_NomeControle = new Propriedade("NomeControle", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado, false, false);
    __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemControleAlterado_IsScript)
    __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemControleAlterado_UrlScriptRuntime)
    __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemControleAlterado_CaminhoConstrutor)
    __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemControleAlterado_NomeControle)
    const __$propriedade_Snebur_Depuracao_MensagemEstiloCssAlterado_NomeArquivo = new Propriedade("NomeArquivo", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado, false, false);
    __$tipoBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemEstiloCssAlterado_NomeArquivo)
    const __$propriedade_Snebur_Depuracao_MensagemIrParaCodigo_NomeControle = new Propriedade("NomeControle", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo, false, false);
    const __$propriedade_Snebur_Depuracao_MensagemIrParaCodigo_SearchElementPatterns = new Propriedade("SearchElementPatterns", __$tipoListaTipoPrimario_String, __$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo, false, false);
    const __$propriedade_Snebur_Depuracao_MensagemIrParaCodigo_TagElemento = new Propriedade("TagElemento", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo, false, false);
    const __$propriedade_Snebur_Depuracao_MensagemIrParaCodigo_Namespace = new Propriedade("Namespace", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo, false, false);
    __$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemIrParaCodigo_NomeControle)
    __$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemIrParaCodigo_SearchElementPatterns)
    __$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemIrParaCodigo_TagElemento)
    __$tipoBaseDominio_Snebur_Depuracao_MensagemIrParaCodigo.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemIrParaCodigo_Namespace)
    const __$propriedade_Snebur_Depuracao_MensagemLog_Mensagem = new Propriedade("Mensagem", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_Depuracao_MensagemLog, false, false);
    const __$propriedade_Snebur_Depuracao_MensagemLog_TipoLog = new Propriedade("TipoLog", __$tipoEnum_Snebur_Depuracao_EnumTipoLog, __$tipoBaseDominio_Snebur_Depuracao_MensagemLog, false, false);
    __$tipoBaseDominio_Snebur_Depuracao_MensagemLog.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemLog_Mensagem)
    __$tipoBaseDominio_Snebur_Depuracao_MensagemLog.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemLog_TipoLog)
    const __$propriedade_Snebur_Depuracao_MensagemPing_Ping = new Propriedade("Ping", __$tipoTipoPrimario_Boolean, __$tipoBaseDominio_Snebur_Depuracao_MensagemPing, false, false);
    const __$propriedade_Snebur_Depuracao_MensagemPing_DataHora = new Propriedade("DataHora", __$tipoTipoPrimario_DateTime, __$tipoBaseDominio_Snebur_Depuracao_MensagemPing, false, false);
    __$tipoBaseDominio_Snebur_Depuracao_MensagemPing.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemPing_Ping)
    __$tipoBaseDominio_Snebur_Depuracao_MensagemPing.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemPing_DataHora)
    const __$propriedade_Snebur_Depuracao_MensagemScriptAlterado_NomeArquivo = new Propriedade("NomeArquivo", __$tipoTipoPrimario_String, __$tipoBaseDominio_Snebur_Depuracao_MensagemScriptAlterado, false, false);
    __$tipoBaseDominio_Snebur_Depuracao_MensagemScriptAlterado.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_MensagemScriptAlterado_NomeArquivo)
    //#endregion
}