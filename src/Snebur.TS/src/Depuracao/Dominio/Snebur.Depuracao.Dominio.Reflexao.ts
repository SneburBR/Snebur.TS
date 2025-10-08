// Auto-generated file. Reflexao - Snebur.Depuracao. Do not modify directly. 
//@Project: Snebur.Depuracao
//@DataHora: 2025-10-08 11:19:57
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
    export const __$tipoListaEnum_Snebur_Depuracao_EnumTipoLog = new TipoListaEnum("ListaTipoEnum_Snebur_Depuracao_EnumTipoLog", "Snebur.Depuracao", "Snebur.Depuracao.EnumTipoLog, Snebur.Depuracao", __$tipoEnum_Snebur_Depuracao_EnumTipoLog);
    export const __$tipoListaEnum_Snebur_Depuracao_EnumTipoMensagem = new TipoListaEnum("ListaTipoEnum_Snebur_Depuracao_EnumTipoMensagem", "Snebur.Depuracao", "Snebur.Depuracao.EnumTipoMensagem, Snebur.Depuracao", __$tipoEnum_Snebur_Depuracao_EnumTipoMensagem);
    
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.EnumTipoLog",__$tipoEnum_Snebur_Depuracao_EnumTipoLog);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.EnumTipoMensagem",__$tipoEnum_Snebur_Depuracao_EnumTipoMensagem);
    //Adding collections
    $Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Depuracao_EnumTipoLog",__$tipoListaEnum_Snebur_Depuracao_EnumTipoLog);
    $Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Depuracao_EnumTipoMensagem",__$tipoListaEnum_Snebur_Depuracao_EnumTipoMensagem);
    //Type paths
    Snebur.Depuracao.EnumTipoLog.__CaminhoTipo = "Snebur.Depuracao.EnumTipoLog";
    Snebur.Depuracao.EnumTipoMensagem.__CaminhoTipo = "Snebur.Depuracao.EnumTipoMensagem";
    
    //#region Properties
    //#endregion
    
    //#region Domain types Types
    export const __$tipoBaseDominio_Snebur_Depuracao_Contrato = new TipoBaseDominio(Snebur.Depuracao.Contrato,"Contrato","Snebur.Depuracao","Snebur.Depuracao.Contrato, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Dominio_BaseDominio,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_Mensagem = new TipoBaseDominio(Snebur.Depuracao.Mensagem,"Mensagem","Snebur.Depuracao","Snebur.Depuracao.Mensagem, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Dominio_BaseDominio,true);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado = new TipoBaseDominio(Snebur.Depuracao.MensagemControleAlterado,"MensagemControleAlterado","Snebur.Depuracao","Snebur.Depuracao.MensagemControleAlterado, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado = new TipoBaseDominio(Snebur.Depuracao.MensagemEstiloCssAlterado,"MensagemEstiloCssAlterado","Snebur.Depuracao","Snebur.Depuracao.MensagemEstiloCssAlterado, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemLog = new TipoBaseDominio(Snebur.Depuracao.MensagemLog,"MensagemLog","Snebur.Depuracao","Snebur.Depuracao.MensagemLog, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemPing = new TipoBaseDominio(Snebur.Depuracao.MensagemPing,"MensagemPing","Snebur.Depuracao","Snebur.Depuracao.MensagemPing, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    export const __$tipoBaseDominio_Snebur_Depuracao_MensagemScriptAlterado = new TipoBaseDominio(Snebur.Depuracao.MensagemScriptAlterado,"MensagemScriptAlterado","Snebur.Depuracao","Snebur.Depuracao.MensagemScriptAlterado, Snebur.Depuracao",__$tipoBaseDominio_Snebur_Depuracao_Mensagem,false);
    //Collections
    export const __$tipoListaBaseDominio_Snebur_Depuracao_Contrato = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_Depuracao_Contrato", "Snebur.Depuracao", "Snebur.Depuracao.Contrato, Snebur.Depuracao", __$tipoBaseDominio_Snebur_Depuracao_Contrato);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_Mensagem = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_Depuracao_Mensagem", "Snebur.Depuracao", "Snebur.Depuracao.Mensagem, Snebur.Depuracao", __$tipoBaseDominio_Snebur_Depuracao_Mensagem);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemControleAlterado = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado", "Snebur.Depuracao", "Snebur.Depuracao.MensagemControleAlterado, Snebur.Depuracao", __$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado", "Snebur.Depuracao", "Snebur.Depuracao.MensagemEstiloCssAlterado, Snebur.Depuracao", __$tipoBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemLog = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_Depuracao_MensagemLog", "Snebur.Depuracao", "Snebur.Depuracao.MensagemLog, Snebur.Depuracao", __$tipoBaseDominio_Snebur_Depuracao_MensagemLog);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemPing = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_Depuracao_MensagemPing", "Snebur.Depuracao", "Snebur.Depuracao.MensagemPing, Snebur.Depuracao", __$tipoBaseDominio_Snebur_Depuracao_MensagemPing);
    export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemScriptAlterado = new TipoListaBaseDominio("ListaTipoBaseDominio_Snebur_Depuracao_MensagemScriptAlterado", "Snebur.Depuracao", "Snebur.Depuracao.MensagemScriptAlterado, Snebur.Depuracao", __$tipoBaseDominio_Snebur_Depuracao_MensagemScriptAlterado);
    
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.Contrato",__$tipoBaseDominio_Snebur_Depuracao_Contrato);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.Mensagem",__$tipoBaseDominio_Snebur_Depuracao_Mensagem);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemControleAlterado",__$tipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemEstiloCssAlterado",__$tipoBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemLog",__$tipoBaseDominio_Snebur_Depuracao_MensagemLog);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemPing",__$tipoBaseDominio_Snebur_Depuracao_MensagemPing);
    $Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemScriptAlterado",__$tipoBaseDominio_Snebur_Depuracao_MensagemScriptAlterado);
    //Adding collections
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_Depuracao_Contrato",__$tipoListaBaseDominio_Snebur_Depuracao_Contrato);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_Depuracao_Mensagem",__$tipoListaBaseDominio_Snebur_Depuracao_Mensagem);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_Depuracao_MensagemControleAlterado",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemControleAlterado);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_Depuracao_MensagemLog",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemLog);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_Depuracao_MensagemPing",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemPing);
    $Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur_Depuracao_MensagemScriptAlterado",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemScriptAlterado);
    //Type paths
    Snebur.Depuracao.Contrato.__CaminhoTipo = "Snebur.Depuracao.Contrato";
    Snebur.Depuracao.Mensagem.__CaminhoTipo = "Snebur.Depuracao.Mensagem";
    Snebur.Depuracao.MensagemControleAlterado.__CaminhoTipo = "Snebur.Depuracao.MensagemControleAlterado";
    Snebur.Depuracao.MensagemEstiloCssAlterado.__CaminhoTipo = "Snebur.Depuracao.MensagemEstiloCssAlterado";
    Snebur.Depuracao.MensagemLog.__CaminhoTipo = "Snebur.Depuracao.MensagemLog";
    Snebur.Depuracao.MensagemPing.__CaminhoTipo = "Snebur.Depuracao.MensagemPing";
    Snebur.Depuracao.MensagemScriptAlterado.__CaminhoTipo = "Snebur.Depuracao.MensagemScriptAlterado";
    
    //#region Properties
    const __$propriedade_Snebur_Depuracao_Contrato_Mensagem = new Propriedade("Mensagem", __$tipoBaseDominio_Snebur_Depuracao_Mensagem, __$tipoBaseDominio_Snebur_Depuracao_Contrato, true);
    __$tipoBaseDominio_Snebur_Depuracao_Contrato.AdicionarPropriedade(__$propriedade_Snebur_Depuracao_Contrato_Mensagem)
    //#endregion
}