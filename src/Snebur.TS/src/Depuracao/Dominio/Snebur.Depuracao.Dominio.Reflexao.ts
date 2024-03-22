/*eslint-disable*/
//@Namespace: Snebur.Depuracao
//@PrioridadeDominio: 4
//@Globalizar: False
//@Dominios dependentes: []
namespace Snebur.Reflexao
{
	//Enum
	export const __$tipoEnum_Snebur_Depuracao_EnumTipoMensagem = new Snebur.Reflexao.TipoEnum("EnumTipoMensagem", "Snebur.Depuracao", "Snebur.Depuracao.EnumTipoMensagem, Snebur.Depuracao");
	export const __$tipoEnum_Snebur_Depuracao_EnumTipoLog = new Snebur.Reflexao.TipoEnum("EnumTipoLog", "Snebur.Depuracao", "Snebur.Depuracao.EnumTipoLog, Snebur.Depuracao");
	
	//Lista Enum
	export const __$tipoListaEnum_Snebur_Depuracao_EnumTipoMensagem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Depuracao.EnumTipoMensagem", "Snebur.Depuracao", "Snebur.Depuracao.EnumTipoMensagem, Snebur.Depuracao", __$tipoEnum_Snebur_Depuracao_EnumTipoMensagem);
	export const __$tipoListaEnum_Snebur_Depuracao_EnumTipoLog = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Depuracao.EnumTipoLog", "Snebur.Depuracao", "Snebur.Depuracao.EnumTipoLog, Snebur.Depuracao", __$tipoEnum_Snebur_Depuracao_EnumTipoLog);
	
	//Adicionar Enum
	$Reflexao.Tipos.Adicionar("Snebur.Depuracao.EnumTipoMensagem",__$tipoEnum_Snebur_Depuracao_EnumTipoMensagem);
	$Reflexao.Tipos.Adicionar("Snebur.Depuracao.EnumTipoLog",__$tipoEnum_Snebur_Depuracao_EnumTipoLog);
	
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Depuracao_EnumTipoMensagem",__$tipoListaEnum_Snebur_Depuracao_EnumTipoMensagem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Depuracao_EnumTipoLog",__$tipoListaEnum_Snebur_Depuracao_EnumTipoLog);
	
	//Associar caminhos Emil
	Snebur.Depuracao.EnumTipoMensagem.__CaminhoTipo = "Snebur.Depuracao.EnumTipoMensagem";
	Snebur.Depuracao.EnumTipoLog.__CaminhoTipo = "Snebur.Depuracao.EnumTipoLog";
	
	//BaseDominio
	export const __$tipoBaseDominioSnebur_Depuracao_Contrato = new Snebur.Reflexao.TipoBaseDominio(Snebur.Depuracao.Contrato, "Contrato", "Snebur.Depuracao","Snebur.Depuracao.Contrato, Snebur.Depuracao",__$tipoBaseDominioSnebur_Dominio_BaseDominio, false);
	export const __$tipoBaseDominioSnebur_Depuracao_Mensagem = new Snebur.Reflexao.TipoBaseDominio(Snebur.Depuracao.Mensagem, "Mensagem", "Snebur.Depuracao","Snebur.Depuracao.Mensagem, Snebur.Depuracao",__$tipoBaseDominioSnebur_Dominio_BaseDominio, true);
	export const __$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado = new Snebur.Reflexao.TipoBaseDominio(Snebur.Depuracao.MensagemControleAlterado, "MensagemControleAlterado", "Snebur.Depuracao","Snebur.Depuracao.MensagemControleAlterado, Snebur.Depuracao",__$tipoBaseDominioSnebur_Depuracao_Mensagem, false);
	export const __$tipoBaseDominioSnebur_Depuracao_MensagemEstiloCssAlterado = new Snebur.Reflexao.TipoBaseDominio(Snebur.Depuracao.MensagemEstiloCssAlterado, "MensagemEstiloCssAlterado", "Snebur.Depuracao","Snebur.Depuracao.MensagemEstiloCssAlterado, Snebur.Depuracao",__$tipoBaseDominioSnebur_Depuracao_Mensagem, false);
	export const __$tipoBaseDominioSnebur_Depuracao_MensagemLog = new Snebur.Reflexao.TipoBaseDominio(Snebur.Depuracao.MensagemLog, "MensagemLog", "Snebur.Depuracao","Snebur.Depuracao.MensagemLog, Snebur.Depuracao",__$tipoBaseDominioSnebur_Depuracao_Mensagem, false);
	export const __$tipoBaseDominioSnebur_Depuracao_MensagemPing = new Snebur.Reflexao.TipoBaseDominio(Snebur.Depuracao.MensagemPing, "MensagemPing", "Snebur.Depuracao","Snebur.Depuracao.MensagemPing, Snebur.Depuracao",__$tipoBaseDominioSnebur_Depuracao_Mensagem, false);
	export const __$tipoBaseDominioSnebur_Depuracao_MensagemScriptAlterado = new Snebur.Reflexao.TipoBaseDominio(Snebur.Depuracao.MensagemScriptAlterado, "MensagemScriptAlterado", "Snebur.Depuracao","Snebur.Depuracao.MensagemScriptAlterado, Snebur.Depuracao",__$tipoBaseDominioSnebur_Depuracao_Mensagem, false);
	
	//ListaBaseDominio
	export const __$tipoListaBaseDominio_Snebur_Depuracao_Contrato = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Contrato", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.Contrato, Snebur.Depuracao]], mscorlib",__$tipoBaseDominioSnebur_Depuracao_Contrato);
	export const __$tipoListaBaseDominio_Snebur_Depuracao_Mensagem = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Mensagem", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.Mensagem, Snebur.Depuracao]], mscorlib",__$tipoBaseDominioSnebur_Depuracao_Mensagem);
	export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemControleAlterado = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_MensagemControleAlterado", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemControleAlterado, Snebur.Depuracao]], mscorlib",__$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado);
	export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_MensagemEstiloCssAlterado", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemEstiloCssAlterado, Snebur.Depuracao]], mscorlib",__$tipoBaseDominioSnebur_Depuracao_MensagemEstiloCssAlterado);
	export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemLog = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_MensagemLog", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemLog, Snebur.Depuracao]], mscorlib",__$tipoBaseDominioSnebur_Depuracao_MensagemLog);
	export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemPing = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_MensagemPing", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemPing, Snebur.Depuracao]], mscorlib",__$tipoBaseDominioSnebur_Depuracao_MensagemPing);
	export const __$tipoListaBaseDominio_Snebur_Depuracao_MensagemScriptAlterado = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_MensagemScriptAlterado", "Snebur.Depuracao", "System.Collections.Generic.List`1[[Snebur.Depuracao.MensagemScriptAlterado, Snebur.Depuracao]], mscorlib",__$tipoBaseDominioSnebur_Depuracao_MensagemScriptAlterado);
	
	//Adicionar BasesDominio
	$Reflexao.Tipos.Adicionar("Snebur.Depuracao.Contrato",__$tipoBaseDominioSnebur_Depuracao_Contrato);
	$Reflexao.Tipos.Adicionar("Snebur.Depuracao.Mensagem",__$tipoBaseDominioSnebur_Depuracao_Mensagem);
	$Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemControleAlterado",__$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado);
	$Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemEstiloCssAlterado",__$tipoBaseDominioSnebur_Depuracao_MensagemEstiloCssAlterado);
	$Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemLog",__$tipoBaseDominioSnebur_Depuracao_MensagemLog);
	$Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemPing",__$tipoBaseDominioSnebur_Depuracao_MensagemPing);
	$Reflexao.Tipos.Adicionar("Snebur.Depuracao.MensagemScriptAlterado",__$tipoBaseDominioSnebur_Depuracao_MensagemScriptAlterado);
	
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.Contrato",__$tipoListaBaseDominio_Snebur_Depuracao_Contrato);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.Mensagem",__$tipoListaBaseDominio_Snebur_Depuracao_Mensagem);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemControleAlterado",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemControleAlterado);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemEstiloCssAlterado",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemEstiloCssAlterado);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemLog",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemLog);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemPing",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemPing);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Depuracao.MensagemScriptAlterado",__$tipoListaBaseDominio_Snebur_Depuracao_MensagemScriptAlterado);
	
	//Associar caminhos BaseDominio
	
	Snebur.Depuracao.Contrato.__CaminhoTipo = "Snebur.Depuracao.Contrato";
	Snebur.Depuracao.Mensagem.__CaminhoTipo = "Snebur.Depuracao.Mensagem";
	Snebur.Depuracao.MensagemControleAlterado.__CaminhoTipo = "Snebur.Depuracao.MensagemControleAlterado";
	Snebur.Depuracao.MensagemEstiloCssAlterado.__CaminhoTipo = "Snebur.Depuracao.MensagemEstiloCssAlterado";
	Snebur.Depuracao.MensagemLog.__CaminhoTipo = "Snebur.Depuracao.MensagemLog";
	Snebur.Depuracao.MensagemPing.__CaminhoTipo = "Snebur.Depuracao.MensagemPing";
	Snebur.Depuracao.MensagemScriptAlterado.__CaminhoTipo = "Snebur.Depuracao.MensagemScriptAlterado";
	
	//Atributos
	
	//TiposComplexos
	
	//ListaBaseDominio TipoComplexo
	
	//Adicionar TiposComplexos
	
	//Adicionar ListaBaseDominio TiposComplexos
	
	//Associar caminhos TiposComplexos
	
	//Atributos TiposComplexos
	
	//BaseEntidades
	
	//ListaBaseDominio TipoEntidade
	
	//ListaBaseEntidades
	
	//Adicionar BaseEntidades
	
	//Adicionar ListaBaseDominio TipoEntidade
	
	//Adicionar ListaBaseEntidades
	
	//Associar caminhos BaseEntidades
	
	//Atributos TipoEntidade
	
	export const __$propriedade_Snebur_Depuracao_Contrato_Mensagem = new Snebur.Reflexao.Propriedade("Mensagem", __$tipoBaseDominioSnebur_Depuracao_Mensagem, __$tipoBaseDominioSnebur_Depuracao_Contrato, true);
	
	__$tipoBaseDominioSnebur_Depuracao_Contrato.Propriedades.Add(__$propriedade_Snebur_Depuracao_Contrato_Mensagem);
	
	export const __$propriedade_Snebur_Depuracao_MensagemControleAlterado_IsScript = new Snebur.Reflexao.Propriedade("IsScript", __$tipoTipoPrimario_Boolean, __$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado, false);
	
	export const __$propriedade_Snebur_Depuracao_MensagemControleAlterado_UrlScriptRuntime = new Snebur.Reflexao.Propriedade("UrlScriptRuntime", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado, true);
	
	export const __$propriedade_Snebur_Depuracao_MensagemControleAlterado_CaminhoConstrutor = new Snebur.Reflexao.Propriedade("CaminhoConstrutor", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado, true);
	
	export const __$propriedade_Snebur_Depuracao_MensagemControleAlterado_NomeControle = new Snebur.Reflexao.Propriedade("NomeControle", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado, true);
	
	__$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado.Propriedades.Add(__$propriedade_Snebur_Depuracao_MensagemControleAlterado_IsScript);
	__$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado.Propriedades.Add(__$propriedade_Snebur_Depuracao_MensagemControleAlterado_UrlScriptRuntime);
	__$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado.Propriedades.Add(__$propriedade_Snebur_Depuracao_MensagemControleAlterado_CaminhoConstrutor);
	__$tipoBaseDominioSnebur_Depuracao_MensagemControleAlterado.Propriedades.Add(__$propriedade_Snebur_Depuracao_MensagemControleAlterado_NomeControle);
	
	export const __$propriedade_Snebur_Depuracao_MensagemEstiloCssAlterado_NomeArquivo = new Snebur.Reflexao.Propriedade("NomeArquivo", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Depuracao_MensagemEstiloCssAlterado, true);
	
	__$tipoBaseDominioSnebur_Depuracao_MensagemEstiloCssAlterado.Propriedades.Add(__$propriedade_Snebur_Depuracao_MensagemEstiloCssAlterado_NomeArquivo);
	
	export const __$propriedade_Snebur_Depuracao_MensagemLog_Mensagem = new Snebur.Reflexao.Propriedade("Mensagem", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Depuracao_MensagemLog, true);
	
	export const __$propriedade_Snebur_Depuracao_MensagemLog_TipoLog = new Snebur.Reflexao.Propriedade("TipoLog", __$tipoEnum_Snebur_Depuracao_EnumTipoLog, __$tipoBaseDominioSnebur_Depuracao_MensagemLog, false);
	
	__$tipoBaseDominioSnebur_Depuracao_MensagemLog.Propriedades.Add(__$propriedade_Snebur_Depuracao_MensagemLog_Mensagem);
	__$tipoBaseDominioSnebur_Depuracao_MensagemLog.Propriedades.Add(__$propriedade_Snebur_Depuracao_MensagemLog_TipoLog);
	
	export const __$propriedade_Snebur_Depuracao_MensagemPing_Ping = new Snebur.Reflexao.Propriedade("Ping", __$tipoTipoPrimario_Boolean, __$tipoBaseDominioSnebur_Depuracao_MensagemPing, false);
	
	export const __$propriedade_Snebur_Depuracao_MensagemPing_DataHora = new Snebur.Reflexao.Propriedade("DataHora", __$tipoTipoPrimario_DateTime, __$tipoBaseDominioSnebur_Depuracao_MensagemPing, false);
	
	__$tipoBaseDominioSnebur_Depuracao_MensagemPing.Propriedades.Add(__$propriedade_Snebur_Depuracao_MensagemPing_Ping);
	__$tipoBaseDominioSnebur_Depuracao_MensagemPing.Propriedades.Add(__$propriedade_Snebur_Depuracao_MensagemPing_DataHora);
	
	export const __$propriedade_Snebur_Depuracao_MensagemScriptAlterado_NomeArquivo = new Snebur.Reflexao.Propriedade("NomeArquivo", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Depuracao_MensagemScriptAlterado, true);
	
	__$tipoBaseDominioSnebur_Depuracao_MensagemScriptAlterado.Propriedades.Add(__$propriedade_Snebur_Depuracao_MensagemScriptAlterado_NomeArquivo);
	
}