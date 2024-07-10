/*eslint-disable*/
//@Namespace: Snebur.Dominio
//@PrioridadeDominio: 0
//@Globalizar: False
//@Dominios dependentes: []
namespace Snebur.Reflexao
{
	export const __$tipoTipoPrimario_void = new Snebur.Reflexao.TipoPrimario("void", Snebur.Reflexao.EnumTipoPrimario.void);
	export const __$tipoTipoPrimario_Boolean = new Snebur.Reflexao.TipoPrimario("Boolean", Snebur.Reflexao.EnumTipoPrimario.Boolean);
	export const __$tipoTipoPrimario_String = new Snebur.Reflexao.TipoPrimario("String", Snebur.Reflexao.EnumTipoPrimario.String);
	export const __$tipoTipoPrimario_Integer = new Snebur.Reflexao.TipoPrimario("Integer", Snebur.Reflexao.EnumTipoPrimario.Integer);
	export const __$tipoTipoPrimario_Long = new Snebur.Reflexao.TipoPrimario("Long", Snebur.Reflexao.EnumTipoPrimario.Long);
	export const __$tipoTipoPrimario_Decimal = new Snebur.Reflexao.TipoPrimario("Decimal", Snebur.Reflexao.EnumTipoPrimario.Decimal);
	export const __$tipoTipoPrimario_Double = new Snebur.Reflexao.TipoPrimario("Double", Snebur.Reflexao.EnumTipoPrimario.Double);
	export const __$tipoTipoPrimario_DateTime = new Snebur.Reflexao.TipoPrimario("DateTime", Snebur.Reflexao.EnumTipoPrimario.DateTime);
	export const __$tipoTipoPrimario_TimeSpan = new Snebur.Reflexao.TipoPrimario("TimeSpan", Snebur.Reflexao.EnumTipoPrimario.TimeSpan);
	export const __$tipoTipoPrimario_EnumValor = new Snebur.Reflexao.TipoPrimario("EnumValor", Snebur.Reflexao.EnumTipoPrimario.EnumValor);
	export const __$tipoTipoPrimario_Guid = new Snebur.Reflexao.TipoPrimario("Guid", Snebur.Reflexao.EnumTipoPrimario.Guid);
	export const __$tipoTipoPrimario_Object = new Snebur.Reflexao.TipoPrimario("Object", Snebur.Reflexao.EnumTipoPrimario.Object);
	export const __$tipoTipoPrimario_Single = new Snebur.Reflexao.TipoPrimario("Single", Snebur.Reflexao.EnumTipoPrimario.Single);
	export const __$tipoTipoPrimario_Char = new Snebur.Reflexao.TipoPrimario("Char", Snebur.Reflexao.EnumTipoPrimario.Char);
	export const __$tipoTipoPrimario_Byte = new Snebur.Reflexao.TipoPrimario("Byte", Snebur.Reflexao.EnumTipoPrimario.Byte);
	
	//Lista de tipos primarios
	export const __$tipoListaTipoPrimario_String = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_String);
	export const __$tipoListaTipoPrimario_Integer = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_Integer);
	export const __$tipoListaTipoPrimario_Decimal = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_Decimal);
	export const __$tipoListaTipoPrimario_Boolean = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_Boolean);
	export const __$tipoListaTipoPrimario_Byte = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_Byte);
	export const __$tipoListaTipoPrimario_Long = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_Long);
	export const __$tipoListaTipoPrimario_Double = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_Double);
	export const __$tipoListaTipoPrimario_void = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_void);
	export const __$tipoListaTipoPrimario_DateTime = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_DateTime);
	export const __$tipoListaTipoPrimario_TimeSpan = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_TimeSpan);
	export const __$tipoListaTipoPrimario_EnumValor = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_EnumValor);
	export const __$tipoListaTipoPrimario_Guid = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_Guid);
	export const __$tipoListaTipoPrimario_Object = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_Object);
	export const __$tipoListaTipoPrimario_Single = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_Single);
	export const __$tipoListaTipoPrimario_Char = new Snebur.Reflexao.TipoListaTipoPrimario(__$tipoTipoPrimario_Char);
	
	//Adicionar os tipos
	//Adicionar  Tipos primarios
	$Reflexao.Tipos.Adicionar("String",__$tipoTipoPrimario_String);
	$Reflexao.Tipos.Adicionar("Integer",__$tipoTipoPrimario_Integer);
	$Reflexao.Tipos.Adicionar("Decimal",__$tipoTipoPrimario_Decimal);
	$Reflexao.Tipos.Adicionar("Boolean",__$tipoTipoPrimario_Boolean);
	$Reflexao.Tipos.Adicionar("Byte",__$tipoTipoPrimario_Byte);
	$Reflexao.Tipos.Adicionar("Long",__$tipoTipoPrimario_Long);
	$Reflexao.Tipos.Adicionar("Double",__$tipoTipoPrimario_Double);
	$Reflexao.Tipos.Adicionar("void",__$tipoTipoPrimario_void);
	$Reflexao.Tipos.Adicionar("DateTime",__$tipoTipoPrimario_DateTime);
	$Reflexao.Tipos.Adicionar("TimeSpan",__$tipoTipoPrimario_TimeSpan);
	$Reflexao.Tipos.Adicionar("EnumValor",__$tipoTipoPrimario_EnumValor);
	$Reflexao.Tipos.Adicionar("Guid",__$tipoTipoPrimario_Guid);
	$Reflexao.Tipos.Adicionar("Object",__$tipoTipoPrimario_Object);
	$Reflexao.Tipos.Adicionar("Single",__$tipoTipoPrimario_Single);
	$Reflexao.Tipos.Adicionar("Char",__$tipoTipoPrimario_Char);
	
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_String",__$tipoListaTipoPrimario_String);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_Integer",__$tipoListaTipoPrimario_Integer);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_Decimal",__$tipoListaTipoPrimario_Decimal);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_Boolean",__$tipoListaTipoPrimario_Boolean);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_Byte",__$tipoListaTipoPrimario_Byte);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_Long",__$tipoListaTipoPrimario_Long);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_Double",__$tipoListaTipoPrimario_Double);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_void",__$tipoListaTipoPrimario_void);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_DateTime",__$tipoListaTipoPrimario_DateTime);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_TimeSpan",__$tipoListaTipoPrimario_TimeSpan);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_EnumValor",__$tipoListaTipoPrimario_EnumValor);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_Guid",__$tipoListaTipoPrimario_Guid);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_Object",__$tipoListaTipoPrimario_Object);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_Single",__$tipoListaTipoPrimario_Single);
	$Reflexao.Tipos.Adicionar("ListaTipoPrimario_Char",__$tipoListaTipoPrimario_Char);
	
	//Enum
	export const __$tipoEnum_Snebur_EnumAmbienteServidor = new Snebur.Reflexao.TipoEnum("EnumAmbienteServidor", "Snebur", "Snebur.EnumAmbienteServidor, Snebur");
	export const __$tipoEnum_Snebur_EnumNivelErro = new Snebur.Reflexao.TipoEnum("EnumNivelErro", "Snebur", "Snebur.EnumNivelErro, Snebur");
	export const __$tipoEnum_Snebur_AcessoDados_EnumOperadorFiltro = new Snebur.Reflexao.TipoEnum("EnumOperadorFiltro", "Snebur.AcessoDados", "Snebur.AcessoDados.EnumOperadorFiltro, Snebur");
	export const __$tipoEnum_Snebur_AcessoDados_Seguranca_EnumPermissao = new Snebur.Reflexao.TipoEnum("EnumPermissao", "Snebur.AcessoDados.Seguranca", "Snebur.AcessoDados.Seguranca.EnumPermissao, Snebur");
	export const __$tipoEnum_Snebur_Arquivo_EnumTipoArquivo = new Snebur.Reflexao.TipoEnum("EnumTipoArquivo", "Snebur.Arquivo", "Snebur.Arquivo.EnumTipoArquivo, Snebur");
	export const __$tipoEnum_Snebur_Arquivo_EnumTipoXFG = new Snebur.Reflexao.TipoEnum("EnumTipoXFG", "Snebur.Arquivo", "Snebur.Arquivo.EnumTipoXFG, Snebur");
	export const __$tipoEnum_Snebur_Comparer_EnumCompararPropriedade = new Snebur.Reflexao.TipoEnum("EnumCompararPropriedade", "Snebur.Comparer", "Snebur.Comparer.EnumCompararPropriedade, Snebur");
	export const __$tipoEnum_Snebur_Dne_EnumUF = new Snebur.Reflexao.TipoEnum("EnumUF", "Snebur.Dne", "Snebur.Dne.EnumUF, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumOpcoesAlterarPropriedade = new Snebur.Reflexao.TipoEnum("EnumOpcoesAlterarPropriedade", "Snebur.Dominio", "Snebur.Dominio.EnumOpcoesAlterarPropriedade, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumTipoValorPadrao = new Snebur.Reflexao.TipoEnum("EnumTipoValorPadrao", "Snebur.Dominio", "Snebur.Dominio.EnumTipoValorPadrao, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnunFlagAlteracaoPropriedade = new Snebur.Reflexao.TipoEnum("EnunFlagAlteracaoPropriedade", "Snebur.Dominio", "Snebur.Dominio.EnunFlagAlteracaoPropriedade, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumTipoDesbloqueio = new Snebur.Reflexao.TipoEnum("EnumTipoDesbloqueio", "Snebur.Dominio", "Snebur.Dominio.EnumTipoDesbloqueio, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumSentidoOrdenacao = new Snebur.Reflexao.TipoEnum("EnumSentidoOrdenacao", "Snebur.Dominio", "Snebur.Dominio.EnumSentidoOrdenacao, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumOrientacao = new Snebur.Reflexao.TipoEnum("EnumOrientacao", "Snebur.Dominio", "Snebur.Dominio.EnumOrientacao, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumTipoJuros = new Snebur.Reflexao.TipoEnum("EnumTipoJuros", "Snebur.Dominio", "Snebur.Dominio.EnumTipoJuros, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumResultadoAutenticacao = new Snebur.Reflexao.TipoEnum("EnumResultadoAutenticacao", "Snebur.Dominio", "Snebur.Dominio.EnumResultadoAutenticacao, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumResultadoValidacaoCredencial = new Snebur.Reflexao.TipoEnum("EnumResultadoValidacaoCredencial", "Snebur.Dominio", "Snebur.Dominio.EnumResultadoValidacaoCredencial, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumStatusCodigoRecuperarSenha = new Snebur.Reflexao.TipoEnum("EnumStatusCodigoRecuperarSenha", "Snebur.Dominio", "Snebur.Dominio.EnumStatusCodigoRecuperarSenha, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumStatusServicoArquivo = new Snebur.Reflexao.TipoEnum("EnumStatusServicoArquivo", "Snebur.Dominio", "Snebur.Dominio.EnumStatusServicoArquivo, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumStatusUsuario = new Snebur.Reflexao.TipoEnum("EnumStatusUsuario", "Snebur.Dominio", "Snebur.Dominio.EnumStatusUsuario, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumStatusArquivo = new Snebur.Reflexao.TipoEnum("EnumStatusArquivo", "Snebur.Dominio", "Snebur.Dominio.EnumStatusArquivo, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumAparenciaFonte = new Snebur.Reflexao.TipoEnum("EnumAparenciaFonte", "Snebur.Dominio", "Snebur.Dominio.EnumAparenciaFonte, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumEspessuraFonte = new Snebur.Reflexao.TipoEnum("EnumEspessuraFonte", "Snebur.Dominio", "Snebur.Dominio.EnumEspessuraFonte, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumFormatoArquivoFonte = new Snebur.Reflexao.TipoEnum("EnumFormatoArquivoFonte", "Snebur.Dominio", "Snebur.Dominio.EnumFormatoArquivoFonte, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumEfeitoImagem = new Snebur.Reflexao.TipoEnum("EnumEfeitoImagem", "Snebur.Dominio", "Snebur.Dominio.EnumEfeitoImagem, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumFiltroImagem = new Snebur.Reflexao.TipoEnum("EnumFiltroImagem", "Snebur.Dominio", "Snebur.Dominio.EnumFiltroImagem, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumFormatoImagem = new Snebur.Reflexao.TipoEnum("EnumFormatoImagem", "Snebur.Dominio", "Snebur.Dominio.EnumFormatoImagem, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumRotacaoImagem = new Snebur.Reflexao.TipoEnum("EnumRotacaoImagem", "Snebur.Dominio", "Snebur.Dominio.EnumRotacaoImagem, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumTamanhoImagem = new Snebur.Reflexao.TipoEnum("EnumTamanhoImagem", "Snebur.Dominio", "Snebur.Dominio.EnumTamanhoImagem, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumNavegador = new Snebur.Reflexao.TipoEnum("EnumNavegador", "Snebur.Dominio", "Snebur.Dominio.EnumNavegador, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumPlataforma = new Snebur.Reflexao.TipoEnum("EnumPlataforma", "Snebur.Dominio", "Snebur.Dominio.EnumPlataforma, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumSistemaOperacional = new Snebur.Reflexao.TipoEnum("EnumSistemaOperacional", "Snebur.Dominio", "Snebur.Dominio.EnumSistemaOperacional, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumStatusSessaoUsuario = new Snebur.Reflexao.TipoEnum("EnumStatusSessaoUsuario", "Snebur.Dominio", "Snebur.Dominio.EnumStatusSessaoUsuario, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumTipoAplicacao = new Snebur.Reflexao.TipoEnum("EnumTipoAplicacao", "Snebur.Dominio", "Snebur.Dominio.EnumTipoAplicacao, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumTipoPrazo = new Snebur.Reflexao.TipoEnum("EnumTipoPrazo", "Snebur.Dominio", "Snebur.Dominio.EnumTipoPrazo, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumMimeType = new Snebur.Reflexao.TipoEnum("EnumMimeType", "Snebur.Dominio", "Snebur.Dominio.EnumMimeType, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumPreenchimentoImagem = new Snebur.Reflexao.TipoEnum("EnumPreenchimentoImagem", "Snebur.Dominio", "Snebur.Dominio.EnumPreenchimentoImagem, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumMes = new Snebur.Reflexao.TipoEnum("EnumMes", "Snebur.Dominio", "Snebur.Dominio.EnumMes, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumTipoData = new Snebur.Reflexao.TipoEnum("EnumTipoData", "Snebur.Dominio", "Snebur.Dominio.EnumTipoData, Snebur");
	export const __$tipoEnum_Snebur_Dominio_EnumDiaSemana = new Snebur.Reflexao.TipoEnum("EnumDiaSemana", "Snebur.Dominio", "Snebur.Dominio.EnumDiaSemana, Snebur");
	export const __$tipoEnum_Snebur_Dominio_Atributos_EnumFormatacaoDados = new Snebur.Reflexao.TipoEnum("EnumFormatacaoDados", "Snebur.Dominio.Atributos", "Snebur.Dominio.Atributos.EnumFormatacaoDados, Snebur");
	export const __$tipoEnum_Snebur_Dominio_Atributos_EnumOrdenacaoNovoRegistro = new Snebur.Reflexao.TipoEnum("EnumOrdenacaoNovoRegistro", "Snebur.Dominio.Atributos", "Snebur.Dominio.Atributos.EnumOrdenacaoNovoRegistro, Snebur");
	export const __$tipoEnum_Snebur_Dominio_Atributos_EnumTipoExclusaoRelacao = new Snebur.Reflexao.TipoEnum("EnumTipoExclusaoRelacao", "Snebur.Dominio.Atributos", "Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao, Snebur");
	export const __$tipoEnum_Snebur_Dominio_Atributos_EnumOpcoesComparacaoAuxiliar = new Snebur.Reflexao.TipoEnum("EnumOpcoesComparacaoAuxiliar", "Snebur.Dominio.Atributos", "Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar, Snebur");
	export const __$tipoEnum_Snebur_Dominio_Interface_Media_EnumFamiliaPerfilIcc = new Snebur.Reflexao.TipoEnum("EnumFamiliaPerfilIcc", "Snebur.Dominio.Interface.Media", "Snebur.Dominio.Interface.Media.EnumFamiliaPerfilIcc, Snebur");
	export const __$tipoEnum_Snebur_Imagens_EnumDirecaoGradiente = new Snebur.Reflexao.TipoEnum("EnumDirecaoGradiente", "Snebur.Imagens", "Snebur.Imagens.EnumDirecaoGradiente, Snebur");
	export const __$tipoEnum_Snebur_Imagens_EnumMixagem = new Snebur.Reflexao.TipoEnum("EnumMixagem", "Snebur.Imagens", "Snebur.Imagens.EnumMixagem, Snebur");
	export const __$tipoEnum_Snebur_Imagens_EnumPosicaoGradiente = new Snebur.Reflexao.TipoEnum("EnumPosicaoGradiente", "Snebur.Imagens", "Snebur.Imagens.EnumPosicaoGradiente, Snebur");
	export const __$tipoEnum_Snebur_Imagens_EnumTipoSobrePosicao = new Snebur.Reflexao.TipoEnum("EnumTipoSobrePosicao", "Snebur.Imagens", "Snebur.Imagens.EnumTipoSobrePosicao, Snebur");
	export const __$tipoEnum_Snebur_Imagens_EnumTamanhoGradiente = new Snebur.Reflexao.TipoEnum("EnumTamanhoGradiente", "Snebur.Imagens", "Snebur.Imagens.EnumTamanhoGradiente, Snebur");
	export const __$tipoEnum_Snebur_Reflexao_EnumTipoPrimario = new Snebur.Reflexao.TipoEnum("EnumTipoPrimario", "Snebur.Reflexao", "Snebur.Reflexao.EnumTipoPrimario, Snebur");
	export const __$tipoEnum_Snebur_Reflexao_EnumTipoReflexao = new Snebur.Reflexao.TipoEnum("EnumTipoReflexao", "Snebur.Reflexao", "Snebur.Reflexao.EnumTipoReflexao, Snebur");
	export const __$tipoEnum_Snebur_Servicos_EnumTipoLogDesempenho = new Snebur.Reflexao.TipoEnum("EnumTipoLogDesempenho", "Snebur.Servicos", "Snebur.Servicos.EnumTipoLogDesempenho, Snebur");
	export const __$tipoEnum_Snebur_Servicos_EnumTipoLogSeguranca = new Snebur.Reflexao.TipoEnum("EnumTipoLogSeguranca", "Snebur.Servicos", "Snebur.Servicos.EnumTipoLogSeguranca, Snebur");
	export const __$tipoEnum_Snebur_Tarefa_EnumStatusTarefa = new Snebur.Reflexao.TipoEnum("EnumStatusTarefa", "Snebur.Tarefa", "Snebur.Tarefa.EnumStatusTarefa, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumBotoesAlerta = new Snebur.Reflexao.TipoEnum("EnumBotoesAlerta", "Snebur.UI", "Snebur.UI.EnumBotoesAlerta, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumResultadoAlerta = new Snebur.Reflexao.TipoEnum("EnumResultadoAlerta", "Snebur.UI", "Snebur.UI.EnumResultadoAlerta, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumTipoAlerta = new Snebur.Reflexao.TipoEnum("EnumTipoAlerta", "Snebur.UI", "Snebur.UI.EnumTipoAlerta, Snebur");
	export const __$tipoEnum_Snebur_UI_BaseEnumApresentacao = new Snebur.Reflexao.TipoEnum("BaseEnumApresentacao", "Snebur.UI", "Snebur.UI.BaseEnumApresentacao, Snebur");
	export const __$tipoEnum_Snebur_UI_BaseEnumComprimento = new Snebur.Reflexao.TipoEnum("BaseEnumComprimento", "Snebur.UI", "Snebur.UI.BaseEnumComprimento, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumAlinhamentoHorizontal = new Snebur.Reflexao.TipoEnum("EnumAlinhamentoHorizontal", "Snebur.UI", "Snebur.UI.EnumAlinhamentoHorizontal, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumAlinhamentoTexto = new Snebur.Reflexao.TipoEnum("EnumAlinhamentoTexto", "Snebur.UI", "Snebur.UI.EnumAlinhamentoTexto, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumAlinhamentoVertical = new Snebur.Reflexao.TipoEnum("EnumAlinhamentoVertical", "Snebur.UI", "Snebur.UI.EnumAlinhamentoVertical, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumAltura = new Snebur.Reflexao.TipoEnum("EnumAltura", "Snebur.UI", "Snebur.UI.EnumAltura, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumAlturaLinha = new Snebur.Reflexao.TipoEnum("EnumAlturaLinha", "Snebur.UI", "Snebur.UI.EnumAlturaLinha, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumAparencia = new Snebur.Reflexao.TipoEnum("EnumAparencia", "Snebur.UI", "Snebur.UI.EnumAparencia, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumBarraRolagem = new Snebur.Reflexao.TipoEnum("EnumBarraRolagem", "Snebur.UI", "Snebur.UI.EnumBarraRolagem, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumCor = new Snebur.Reflexao.TipoEnum("EnumCor", "Snebur.UI", "Snebur.UI.EnumCor, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumDestinoControleFlutuante = new Snebur.Reflexao.TipoEnum("EnumDestinoControleFlutuante", "Snebur.UI", "Snebur.UI.EnumDestinoControleFlutuante, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumDistanciaMargem = new Snebur.Reflexao.TipoEnum("EnumDistanciaMargem", "Snebur.UI", "Snebur.UI.EnumDistanciaMargem, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumEstiloBorda = new Snebur.Reflexao.TipoEnum("EnumEstiloBorda", "Snebur.UI", "Snebur.UI.EnumEstiloBorda, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumFormatacaoTexto = new Snebur.Reflexao.TipoEnum("EnumFormatacaoTexto", "Snebur.UI", "Snebur.UI.EnumFormatacaoTexto, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumFormatacao = new Snebur.Reflexao.TipoEnum("EnumFormatacao", "Snebur.UI", "Snebur.UI.EnumFormatacao, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumIcone = new Snebur.Reflexao.TipoEnum("EnumIcone", "Snebur.UI", "Snebur.UI.EnumIcone, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumIconeCategoria = new Snebur.Reflexao.TipoEnum("EnumIconeCategoria", "Snebur.UI", "Snebur.UI.EnumIconeCategoria, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumLargura = new Snebur.Reflexao.TipoEnum("EnumLargura", "Snebur.UI", "Snebur.UI.EnumLargura, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumLarguraBloco = new Snebur.Reflexao.TipoEnum("EnumLarguraBloco", "Snebur.UI", "Snebur.UI.EnumLarguraBloco, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumMargem = new Snebur.Reflexao.TipoEnum("EnumMargem", "Snebur.UI", "Snebur.UI.EnumMargem, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumMostrar = new Snebur.Reflexao.TipoEnum("EnumMostrar", "Snebur.UI", "Snebur.UI.EnumMostrar, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumOpcapBindCssClasse = new Snebur.Reflexao.TipoEnum("EnumOpcapBindCssClasse", "Snebur.UI", "Snebur.UI.EnumOpcapBindCssClasse, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumPosicao = new Snebur.Reflexao.TipoEnum("EnumPosicao", "Snebur.UI", "Snebur.UI.EnumPosicao, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumQuebrar = new Snebur.Reflexao.TipoEnum("EnumQuebrar", "Snebur.UI", "Snebur.UI.EnumQuebrar, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumTamanhoIcone = new Snebur.Reflexao.TipoEnum("EnumTamanhoIcone", "Snebur.UI", "Snebur.UI.EnumTamanhoIcone, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumTipoAnimacao = new Snebur.Reflexao.TipoEnum("EnumTipoAnimacao", "Snebur.UI", "Snebur.UI.EnumTipoAnimacao, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumTipoBotao = new Snebur.Reflexao.TipoEnum("EnumTipoBotao", "Snebur.UI", "Snebur.UI.EnumTipoBotao, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumTipoCaixa = new Snebur.Reflexao.TipoEnum("EnumTipoCaixa", "Snebur.UI", "Snebur.UI.EnumTipoCaixa, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumTipoPainelAba = new Snebur.Reflexao.TipoEnum("EnumTipoPainelAba", "Snebur.UI", "Snebur.UI.EnumTipoPainelAba, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumTipoEntrada = new Snebur.Reflexao.TipoEnum("EnumTipoEntrada", "Snebur.UI", "Snebur.UI.EnumTipoEntrada, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumTipografia = new Snebur.Reflexao.TipoEnum("EnumTipografia", "Snebur.UI", "Snebur.UI.EnumTipografia, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumPesoFonte = new Snebur.Reflexao.TipoEnum("EnumPesoFonte", "Snebur.UI", "Snebur.UI.EnumPesoFonte, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumFonte = new Snebur.Reflexao.TipoEnum("EnumFonte", "Snebur.UI", "Snebur.UI.EnumFonte, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumTipoPainel = new Snebur.Reflexao.TipoEnum("EnumTipoPainel", "Snebur.UI", "Snebur.UI.EnumTipoPainel, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumTonalidade = new Snebur.Reflexao.TipoEnum("EnumTonalidade", "Snebur.UI", "Snebur.UI.EnumTonalidade, Snebur");
	export const __$tipoEnum_Snebur_UI_EnumVisibilidade = new Snebur.Reflexao.TipoEnum("EnumVisibilidade", "Snebur.UI", "Snebur.UI.EnumVisibilidade, Snebur");
	export const __$tipoEnum_Snebur_Utilidade_EnumTipoCaminho = new Snebur.Reflexao.TipoEnum("EnumTipoCaminho", "Snebur.Utilidade", "Snebur.Utilidade.EnumTipoCaminho, Snebur");
	export const __$tipoEnum_Snebur_Utilidade_OpcoesCompararData = new Snebur.Reflexao.TipoEnum("OpcoesCompararData", "Snebur.Utilidade", "Snebur.Utilidade.OpcoesCompararData, Snebur");
	export const __$tipoEnum_Snebur_Utilidade_OpcoesCompararHora = new Snebur.Reflexao.TipoEnum("OpcoesCompararHora", "Snebur.Utilidade", "Snebur.Utilidade.OpcoesCompararHora, Snebur");
	export const __$tipoEnum_Snebur_Utilidade_QueryType = new Snebur.Reflexao.TipoEnum("QueryType", "Snebur.Utilidade", "Snebur.Utilidade.QueryType, Snebur");
	export const __$tipoEnum_Snebur_Utilidade_EnumFiltroPropriedadeCampo = new Snebur.Reflexao.TipoEnum("EnumFiltroPropriedadeCampo", "Snebur.Utilidade", "Snebur.Utilidade.EnumFiltroPropriedadeCampo, Snebur");
	export const __$tipoEnum_Snebur_Utilidade_EnumStatusDiretorio = new Snebur.Reflexao.TipoEnum("EnumStatusDiretorio", "Snebur.Utilidade", "Snebur.Utilidade.EnumStatusDiretorio, Snebur");
	export const __$tipoEnum_Snebur_Utilidade_EnumDivisorDecimal = new Snebur.Reflexao.TipoEnum("EnumDivisorDecimal", "Snebur.Utilidade", "Snebur.Utilidade.EnumDivisorDecimal, Snebur");
	export const __$tipoEnum_Snebur_Utilidade_EnumFormatacaoBytes = new Snebur.Reflexao.TipoEnum("EnumFormatacaoBytes", "Snebur.Utilidade", "Snebur.Utilidade.EnumFormatacaoBytes, Snebur");
	export const __$tipoEnum_Snebur_Utilidade_EnumTipoSerializacao = new Snebur.Reflexao.TipoEnum("EnumTipoSerializacao", "Snebur.Utilidade", "Snebur.Utilidade.EnumTipoSerializacao, Snebur");
	
	//Lista Enum
	export const __$tipoListaEnum_Snebur_EnumAmbienteServidor = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.EnumAmbienteServidor", "Snebur", "Snebur.EnumAmbienteServidor, Snebur", __$tipoEnum_Snebur_EnumAmbienteServidor);
	export const __$tipoListaEnum_Snebur_EnumNivelErro = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.EnumNivelErro", "Snebur", "Snebur.EnumNivelErro, Snebur", __$tipoEnum_Snebur_EnumNivelErro);
	export const __$tipoListaEnum_Snebur_AcessoDados_EnumOperadorFiltro = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.AcessoDados.EnumOperadorFiltro", "Snebur.AcessoDados", "Snebur.AcessoDados.EnumOperadorFiltro, Snebur", __$tipoEnum_Snebur_AcessoDados_EnumOperadorFiltro);
	export const __$tipoListaEnum_Snebur_AcessoDados_Seguranca_EnumPermissao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.AcessoDados.Seguranca.EnumPermissao", "Snebur.AcessoDados.Seguranca", "Snebur.AcessoDados.Seguranca.EnumPermissao, Snebur", __$tipoEnum_Snebur_AcessoDados_Seguranca_EnumPermissao);
	export const __$tipoListaEnum_Snebur_Arquivo_EnumTipoArquivo = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Arquivo.EnumTipoArquivo", "Snebur.Arquivo", "Snebur.Arquivo.EnumTipoArquivo, Snebur", __$tipoEnum_Snebur_Arquivo_EnumTipoArquivo);
	export const __$tipoListaEnum_Snebur_Arquivo_EnumTipoXFG = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Arquivo.EnumTipoXFG", "Snebur.Arquivo", "Snebur.Arquivo.EnumTipoXFG, Snebur", __$tipoEnum_Snebur_Arquivo_EnumTipoXFG);
	export const __$tipoListaEnum_Snebur_Comparer_EnumCompararPropriedade = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Comparer.EnumCompararPropriedade", "Snebur.Comparer", "Snebur.Comparer.EnumCompararPropriedade, Snebur", __$tipoEnum_Snebur_Comparer_EnumCompararPropriedade);
	export const __$tipoListaEnum_Snebur_Dne_EnumUF = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dne.EnumUF", "Snebur.Dne", "Snebur.Dne.EnumUF, Snebur", __$tipoEnum_Snebur_Dne_EnumUF);
	export const __$tipoListaEnum_Snebur_Dominio_EnumOpcoesAlterarPropriedade = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumOpcoesAlterarPropriedade", "Snebur.Dominio", "Snebur.Dominio.EnumOpcoesAlterarPropriedade, Snebur", __$tipoEnum_Snebur_Dominio_EnumOpcoesAlterarPropriedade);
	export const __$tipoListaEnum_Snebur_Dominio_EnumTipoValorPadrao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumTipoValorPadrao", "Snebur.Dominio", "Snebur.Dominio.EnumTipoValorPadrao, Snebur", __$tipoEnum_Snebur_Dominio_EnumTipoValorPadrao);
	export const __$tipoListaEnum_Snebur_Dominio_EnunFlagAlteracaoPropriedade = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnunFlagAlteracaoPropriedade", "Snebur.Dominio", "Snebur.Dominio.EnunFlagAlteracaoPropriedade, Snebur", __$tipoEnum_Snebur_Dominio_EnunFlagAlteracaoPropriedade);
	export const __$tipoListaEnum_Snebur_Dominio_EnumTipoDesbloqueio = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumTipoDesbloqueio", "Snebur.Dominio", "Snebur.Dominio.EnumTipoDesbloqueio, Snebur", __$tipoEnum_Snebur_Dominio_EnumTipoDesbloqueio);
	export const __$tipoListaEnum_Snebur_Dominio_EnumSentidoOrdenacao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumSentidoOrdenacao", "Snebur.Dominio", "Snebur.Dominio.EnumSentidoOrdenacao, Snebur", __$tipoEnum_Snebur_Dominio_EnumSentidoOrdenacao);
	export const __$tipoListaEnum_Snebur_Dominio_EnumOrientacao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumOrientacao", "Snebur.Dominio", "Snebur.Dominio.EnumOrientacao, Snebur", __$tipoEnum_Snebur_Dominio_EnumOrientacao);
	export const __$tipoListaEnum_Snebur_Dominio_EnumTipoJuros = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumTipoJuros", "Snebur.Dominio", "Snebur.Dominio.EnumTipoJuros, Snebur", __$tipoEnum_Snebur_Dominio_EnumTipoJuros);
	export const __$tipoListaEnum_Snebur_Dominio_EnumResultadoAutenticacao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumResultadoAutenticacao", "Snebur.Dominio", "Snebur.Dominio.EnumResultadoAutenticacao, Snebur", __$tipoEnum_Snebur_Dominio_EnumResultadoAutenticacao);
	export const __$tipoListaEnum_Snebur_Dominio_EnumResultadoValidacaoCredencial = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumResultadoValidacaoCredencial", "Snebur.Dominio", "Snebur.Dominio.EnumResultadoValidacaoCredencial, Snebur", __$tipoEnum_Snebur_Dominio_EnumResultadoValidacaoCredencial);
	export const __$tipoListaEnum_Snebur_Dominio_EnumStatusCodigoRecuperarSenha = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumStatusCodigoRecuperarSenha", "Snebur.Dominio", "Snebur.Dominio.EnumStatusCodigoRecuperarSenha, Snebur", __$tipoEnum_Snebur_Dominio_EnumStatusCodigoRecuperarSenha);
	export const __$tipoListaEnum_Snebur_Dominio_EnumStatusServicoArquivo = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumStatusServicoArquivo", "Snebur.Dominio", "Snebur.Dominio.EnumStatusServicoArquivo, Snebur", __$tipoEnum_Snebur_Dominio_EnumStatusServicoArquivo);
	export const __$tipoListaEnum_Snebur_Dominio_EnumStatusUsuario = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumStatusUsuario", "Snebur.Dominio", "Snebur.Dominio.EnumStatusUsuario, Snebur", __$tipoEnum_Snebur_Dominio_EnumStatusUsuario);
	export const __$tipoListaEnum_Snebur_Dominio_EnumStatusArquivo = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumStatusArquivo", "Snebur.Dominio", "Snebur.Dominio.EnumStatusArquivo, Snebur", __$tipoEnum_Snebur_Dominio_EnumStatusArquivo);
	export const __$tipoListaEnum_Snebur_Dominio_EnumAparenciaFonte = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumAparenciaFonte", "Snebur.Dominio", "Snebur.Dominio.EnumAparenciaFonte, Snebur", __$tipoEnum_Snebur_Dominio_EnumAparenciaFonte);
	export const __$tipoListaEnum_Snebur_Dominio_EnumEspessuraFonte = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumEspessuraFonte", "Snebur.Dominio", "Snebur.Dominio.EnumEspessuraFonte, Snebur", __$tipoEnum_Snebur_Dominio_EnumEspessuraFonte);
	export const __$tipoListaEnum_Snebur_Dominio_EnumFormatoArquivoFonte = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumFormatoArquivoFonte", "Snebur.Dominio", "Snebur.Dominio.EnumFormatoArquivoFonte, Snebur", __$tipoEnum_Snebur_Dominio_EnumFormatoArquivoFonte);
	export const __$tipoListaEnum_Snebur_Dominio_EnumEfeitoImagem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumEfeitoImagem", "Snebur.Dominio", "Snebur.Dominio.EnumEfeitoImagem, Snebur", __$tipoEnum_Snebur_Dominio_EnumEfeitoImagem);
	export const __$tipoListaEnum_Snebur_Dominio_EnumFiltroImagem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumFiltroImagem", "Snebur.Dominio", "Snebur.Dominio.EnumFiltroImagem, Snebur", __$tipoEnum_Snebur_Dominio_EnumFiltroImagem);
	export const __$tipoListaEnum_Snebur_Dominio_EnumFormatoImagem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumFormatoImagem", "Snebur.Dominio", "Snebur.Dominio.EnumFormatoImagem, Snebur", __$tipoEnum_Snebur_Dominio_EnumFormatoImagem);
	export const __$tipoListaEnum_Snebur_Dominio_EnumRotacaoImagem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumRotacaoImagem", "Snebur.Dominio", "Snebur.Dominio.EnumRotacaoImagem, Snebur", __$tipoEnum_Snebur_Dominio_EnumRotacaoImagem);
	export const __$tipoListaEnum_Snebur_Dominio_EnumTamanhoImagem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumTamanhoImagem", "Snebur.Dominio", "Snebur.Dominio.EnumTamanhoImagem, Snebur", __$tipoEnum_Snebur_Dominio_EnumTamanhoImagem);
	export const __$tipoListaEnum_Snebur_Dominio_EnumNavegador = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumNavegador", "Snebur.Dominio", "Snebur.Dominio.EnumNavegador, Snebur", __$tipoEnum_Snebur_Dominio_EnumNavegador);
	export const __$tipoListaEnum_Snebur_Dominio_EnumPlataforma = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumPlataforma", "Snebur.Dominio", "Snebur.Dominio.EnumPlataforma, Snebur", __$tipoEnum_Snebur_Dominio_EnumPlataforma);
	export const __$tipoListaEnum_Snebur_Dominio_EnumSistemaOperacional = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumSistemaOperacional", "Snebur.Dominio", "Snebur.Dominio.EnumSistemaOperacional, Snebur", __$tipoEnum_Snebur_Dominio_EnumSistemaOperacional);
	export const __$tipoListaEnum_Snebur_Dominio_EnumStatusSessaoUsuario = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumStatusSessaoUsuario", "Snebur.Dominio", "Snebur.Dominio.EnumStatusSessaoUsuario, Snebur", __$tipoEnum_Snebur_Dominio_EnumStatusSessaoUsuario);
	export const __$tipoListaEnum_Snebur_Dominio_EnumTipoAplicacao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumTipoAplicacao", "Snebur.Dominio", "Snebur.Dominio.EnumTipoAplicacao, Snebur", __$tipoEnum_Snebur_Dominio_EnumTipoAplicacao);
	export const __$tipoListaEnum_Snebur_Dominio_EnumTipoPrazo = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumTipoPrazo", "Snebur.Dominio", "Snebur.Dominio.EnumTipoPrazo, Snebur", __$tipoEnum_Snebur_Dominio_EnumTipoPrazo);
	export const __$tipoListaEnum_Snebur_Dominio_EnumMimeType = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumMimeType", "Snebur.Dominio", "Snebur.Dominio.EnumMimeType, Snebur", __$tipoEnum_Snebur_Dominio_EnumMimeType);
	export const __$tipoListaEnum_Snebur_Dominio_EnumPreenchimentoImagem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumPreenchimentoImagem", "Snebur.Dominio", "Snebur.Dominio.EnumPreenchimentoImagem, Snebur", __$tipoEnum_Snebur_Dominio_EnumPreenchimentoImagem);
	export const __$tipoListaEnum_Snebur_Dominio_EnumMes = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumMes", "Snebur.Dominio", "Snebur.Dominio.EnumMes, Snebur", __$tipoEnum_Snebur_Dominio_EnumMes);
	export const __$tipoListaEnum_Snebur_Dominio_EnumTipoData = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumTipoData", "Snebur.Dominio", "Snebur.Dominio.EnumTipoData, Snebur", __$tipoEnum_Snebur_Dominio_EnumTipoData);
	export const __$tipoListaEnum_Snebur_Dominio_EnumDiaSemana = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.EnumDiaSemana", "Snebur.Dominio", "Snebur.Dominio.EnumDiaSemana, Snebur", __$tipoEnum_Snebur_Dominio_EnumDiaSemana);
	export const __$tipoListaEnum_Snebur_Dominio_Atributos_EnumFormatacaoDados = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.Atributos.EnumFormatacaoDados", "Snebur.Dominio.Atributos", "Snebur.Dominio.Atributos.EnumFormatacaoDados, Snebur", __$tipoEnum_Snebur_Dominio_Atributos_EnumFormatacaoDados);
	export const __$tipoListaEnum_Snebur_Dominio_Atributos_EnumOrdenacaoNovoRegistro = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.Atributos.EnumOrdenacaoNovoRegistro", "Snebur.Dominio.Atributos", "Snebur.Dominio.Atributos.EnumOrdenacaoNovoRegistro, Snebur", __$tipoEnum_Snebur_Dominio_Atributos_EnumOrdenacaoNovoRegistro);
	export const __$tipoListaEnum_Snebur_Dominio_Atributos_EnumTipoExclusaoRelacao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao", "Snebur.Dominio.Atributos", "Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao, Snebur", __$tipoEnum_Snebur_Dominio_Atributos_EnumTipoExclusaoRelacao);
	export const __$tipoListaEnum_Snebur_Dominio_Atributos_EnumOpcoesComparacaoAuxiliar = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar", "Snebur.Dominio.Atributos", "Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar, Snebur", __$tipoEnum_Snebur_Dominio_Atributos_EnumOpcoesComparacaoAuxiliar);
	export const __$tipoListaEnum_Snebur_Dominio_Interface_Media_EnumFamiliaPerfilIcc = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Dominio.Interface.Media.EnumFamiliaPerfilIcc", "Snebur.Dominio.Interface.Media", "Snebur.Dominio.Interface.Media.EnumFamiliaPerfilIcc, Snebur", __$tipoEnum_Snebur_Dominio_Interface_Media_EnumFamiliaPerfilIcc);
	export const __$tipoListaEnum_Snebur_Imagens_EnumDirecaoGradiente = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Imagens.EnumDirecaoGradiente", "Snebur.Imagens", "Snebur.Imagens.EnumDirecaoGradiente, Snebur", __$tipoEnum_Snebur_Imagens_EnumDirecaoGradiente);
	export const __$tipoListaEnum_Snebur_Imagens_EnumMixagem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Imagens.EnumMixagem", "Snebur.Imagens", "Snebur.Imagens.EnumMixagem, Snebur", __$tipoEnum_Snebur_Imagens_EnumMixagem);
	export const __$tipoListaEnum_Snebur_Imagens_EnumPosicaoGradiente = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Imagens.EnumPosicaoGradiente", "Snebur.Imagens", "Snebur.Imagens.EnumPosicaoGradiente, Snebur", __$tipoEnum_Snebur_Imagens_EnumPosicaoGradiente);
	export const __$tipoListaEnum_Snebur_Imagens_EnumTipoSobrePosicao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Imagens.EnumTipoSobrePosicao", "Snebur.Imagens", "Snebur.Imagens.EnumTipoSobrePosicao, Snebur", __$tipoEnum_Snebur_Imagens_EnumTipoSobrePosicao);
	export const __$tipoListaEnum_Snebur_Imagens_EnumTamanhoGradiente = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Imagens.EnumTamanhoGradiente", "Snebur.Imagens", "Snebur.Imagens.EnumTamanhoGradiente, Snebur", __$tipoEnum_Snebur_Imagens_EnumTamanhoGradiente);
	export const __$tipoListaEnum_Snebur_Reflexao_EnumTipoPrimario = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Reflexao.EnumTipoPrimario", "Snebur.Reflexao", "Snebur.Reflexao.EnumTipoPrimario, Snebur", __$tipoEnum_Snebur_Reflexao_EnumTipoPrimario);
	export const __$tipoListaEnum_Snebur_Reflexao_EnumTipoReflexao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Reflexao.EnumTipoReflexao", "Snebur.Reflexao", "Snebur.Reflexao.EnumTipoReflexao, Snebur", __$tipoEnum_Snebur_Reflexao_EnumTipoReflexao);
	export const __$tipoListaEnum_Snebur_Servicos_EnumTipoLogDesempenho = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Servicos.EnumTipoLogDesempenho", "Snebur.Servicos", "Snebur.Servicos.EnumTipoLogDesempenho, Snebur", __$tipoEnum_Snebur_Servicos_EnumTipoLogDesempenho);
	export const __$tipoListaEnum_Snebur_Servicos_EnumTipoLogSeguranca = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Servicos.EnumTipoLogSeguranca", "Snebur.Servicos", "Snebur.Servicos.EnumTipoLogSeguranca, Snebur", __$tipoEnum_Snebur_Servicos_EnumTipoLogSeguranca);
	export const __$tipoListaEnum_Snebur_Tarefa_EnumStatusTarefa = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Tarefa.EnumStatusTarefa", "Snebur.Tarefa", "Snebur.Tarefa.EnumStatusTarefa, Snebur", __$tipoEnum_Snebur_Tarefa_EnumStatusTarefa);
	export const __$tipoListaEnum_Snebur_UI_EnumBotoesAlerta = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumBotoesAlerta", "Snebur.UI", "Snebur.UI.EnumBotoesAlerta, Snebur", __$tipoEnum_Snebur_UI_EnumBotoesAlerta);
	export const __$tipoListaEnum_Snebur_UI_EnumResultadoAlerta = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumResultadoAlerta", "Snebur.UI", "Snebur.UI.EnumResultadoAlerta, Snebur", __$tipoEnum_Snebur_UI_EnumResultadoAlerta);
	export const __$tipoListaEnum_Snebur_UI_EnumTipoAlerta = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumTipoAlerta", "Snebur.UI", "Snebur.UI.EnumTipoAlerta, Snebur", __$tipoEnum_Snebur_UI_EnumTipoAlerta);
	export const __$tipoListaEnum_Snebur_UI_BaseEnumApresentacao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.BaseEnumApresentacao", "Snebur.UI", "Snebur.UI.BaseEnumApresentacao, Snebur", __$tipoEnum_Snebur_UI_BaseEnumApresentacao);
	export const __$tipoListaEnum_Snebur_UI_BaseEnumComprimento = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.BaseEnumComprimento", "Snebur.UI", "Snebur.UI.BaseEnumComprimento, Snebur", __$tipoEnum_Snebur_UI_BaseEnumComprimento);
	export const __$tipoListaEnum_Snebur_UI_EnumAlinhamentoHorizontal = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumAlinhamentoHorizontal", "Snebur.UI", "Snebur.UI.EnumAlinhamentoHorizontal, Snebur", __$tipoEnum_Snebur_UI_EnumAlinhamentoHorizontal);
	export const __$tipoListaEnum_Snebur_UI_EnumAlinhamentoTexto = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumAlinhamentoTexto", "Snebur.UI", "Snebur.UI.EnumAlinhamentoTexto, Snebur", __$tipoEnum_Snebur_UI_EnumAlinhamentoTexto);
	export const __$tipoListaEnum_Snebur_UI_EnumAlinhamentoVertical = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumAlinhamentoVertical", "Snebur.UI", "Snebur.UI.EnumAlinhamentoVertical, Snebur", __$tipoEnum_Snebur_UI_EnumAlinhamentoVertical);
	export const __$tipoListaEnum_Snebur_UI_EnumAltura = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumAltura", "Snebur.UI", "Snebur.UI.EnumAltura, Snebur", __$tipoEnum_Snebur_UI_EnumAltura);
	export const __$tipoListaEnum_Snebur_UI_EnumAlturaLinha = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumAlturaLinha", "Snebur.UI", "Snebur.UI.EnumAlturaLinha, Snebur", __$tipoEnum_Snebur_UI_EnumAlturaLinha);
	export const __$tipoListaEnum_Snebur_UI_EnumAparencia = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumAparencia", "Snebur.UI", "Snebur.UI.EnumAparencia, Snebur", __$tipoEnum_Snebur_UI_EnumAparencia);
	export const __$tipoListaEnum_Snebur_UI_EnumBarraRolagem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumBarraRolagem", "Snebur.UI", "Snebur.UI.EnumBarraRolagem, Snebur", __$tipoEnum_Snebur_UI_EnumBarraRolagem);
	export const __$tipoListaEnum_Snebur_UI_EnumCor = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumCor", "Snebur.UI", "Snebur.UI.EnumCor, Snebur", __$tipoEnum_Snebur_UI_EnumCor);
	export const __$tipoListaEnum_Snebur_UI_EnumDestinoControleFlutuante = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumDestinoControleFlutuante", "Snebur.UI", "Snebur.UI.EnumDestinoControleFlutuante, Snebur", __$tipoEnum_Snebur_UI_EnumDestinoControleFlutuante);
	export const __$tipoListaEnum_Snebur_UI_EnumDistanciaMargem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumDistanciaMargem", "Snebur.UI", "Snebur.UI.EnumDistanciaMargem, Snebur", __$tipoEnum_Snebur_UI_EnumDistanciaMargem);
	export const __$tipoListaEnum_Snebur_UI_EnumEstiloBorda = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumEstiloBorda", "Snebur.UI", "Snebur.UI.EnumEstiloBorda, Snebur", __$tipoEnum_Snebur_UI_EnumEstiloBorda);
	export const __$tipoListaEnum_Snebur_UI_EnumFormatacaoTexto = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumFormatacaoTexto", "Snebur.UI", "Snebur.UI.EnumFormatacaoTexto, Snebur", __$tipoEnum_Snebur_UI_EnumFormatacaoTexto);
	export const __$tipoListaEnum_Snebur_UI_EnumFormatacao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumFormatacao", "Snebur.UI", "Snebur.UI.EnumFormatacao, Snebur", __$tipoEnum_Snebur_UI_EnumFormatacao);
	export const __$tipoListaEnum_Snebur_UI_EnumIcone = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumIcone", "Snebur.UI", "Snebur.UI.EnumIcone, Snebur", __$tipoEnum_Snebur_UI_EnumIcone);
	export const __$tipoListaEnum_Snebur_UI_EnumIconeCategoria = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumIconeCategoria", "Snebur.UI", "Snebur.UI.EnumIconeCategoria, Snebur", __$tipoEnum_Snebur_UI_EnumIconeCategoria);
	export const __$tipoListaEnum_Snebur_UI_EnumLargura = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumLargura", "Snebur.UI", "Snebur.UI.EnumLargura, Snebur", __$tipoEnum_Snebur_UI_EnumLargura);
	export const __$tipoListaEnum_Snebur_UI_EnumLarguraBloco = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumLarguraBloco", "Snebur.UI", "Snebur.UI.EnumLarguraBloco, Snebur", __$tipoEnum_Snebur_UI_EnumLarguraBloco);
	export const __$tipoListaEnum_Snebur_UI_EnumMargem = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumMargem", "Snebur.UI", "Snebur.UI.EnumMargem, Snebur", __$tipoEnum_Snebur_UI_EnumMargem);
	export const __$tipoListaEnum_Snebur_UI_EnumMostrar = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumMostrar", "Snebur.UI", "Snebur.UI.EnumMostrar, Snebur", __$tipoEnum_Snebur_UI_EnumMostrar);
	export const __$tipoListaEnum_Snebur_UI_EnumOpcapBindCssClasse = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumOpcapBindCssClasse", "Snebur.UI", "Snebur.UI.EnumOpcapBindCssClasse, Snebur", __$tipoEnum_Snebur_UI_EnumOpcapBindCssClasse);
	export const __$tipoListaEnum_Snebur_UI_EnumPosicao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumPosicao", "Snebur.UI", "Snebur.UI.EnumPosicao, Snebur", __$tipoEnum_Snebur_UI_EnumPosicao);
	export const __$tipoListaEnum_Snebur_UI_EnumQuebrar = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumQuebrar", "Snebur.UI", "Snebur.UI.EnumQuebrar, Snebur", __$tipoEnum_Snebur_UI_EnumQuebrar);
	export const __$tipoListaEnum_Snebur_UI_EnumTamanhoIcone = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumTamanhoIcone", "Snebur.UI", "Snebur.UI.EnumTamanhoIcone, Snebur", __$tipoEnum_Snebur_UI_EnumTamanhoIcone);
	export const __$tipoListaEnum_Snebur_UI_EnumTipoAnimacao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumTipoAnimacao", "Snebur.UI", "Snebur.UI.EnumTipoAnimacao, Snebur", __$tipoEnum_Snebur_UI_EnumTipoAnimacao);
	export const __$tipoListaEnum_Snebur_UI_EnumTipoBotao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumTipoBotao", "Snebur.UI", "Snebur.UI.EnumTipoBotao, Snebur", __$tipoEnum_Snebur_UI_EnumTipoBotao);
	export const __$tipoListaEnum_Snebur_UI_EnumTipoCaixa = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumTipoCaixa", "Snebur.UI", "Snebur.UI.EnumTipoCaixa, Snebur", __$tipoEnum_Snebur_UI_EnumTipoCaixa);
	export const __$tipoListaEnum_Snebur_UI_EnumTipoPainelAba = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumTipoPainelAba", "Snebur.UI", "Snebur.UI.EnumTipoPainelAba, Snebur", __$tipoEnum_Snebur_UI_EnumTipoPainelAba);
	export const __$tipoListaEnum_Snebur_UI_EnumTipoEntrada = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumTipoEntrada", "Snebur.UI", "Snebur.UI.EnumTipoEntrada, Snebur", __$tipoEnum_Snebur_UI_EnumTipoEntrada);
	export const __$tipoListaEnum_Snebur_UI_EnumTipografia = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumTipografia", "Snebur.UI", "Snebur.UI.EnumTipografia, Snebur", __$tipoEnum_Snebur_UI_EnumTipografia);
	export const __$tipoListaEnum_Snebur_UI_EnumPesoFonte = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumPesoFonte", "Snebur.UI", "Snebur.UI.EnumPesoFonte, Snebur", __$tipoEnum_Snebur_UI_EnumPesoFonte);
	export const __$tipoListaEnum_Snebur_UI_EnumFonte = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumFonte", "Snebur.UI", "Snebur.UI.EnumFonte, Snebur", __$tipoEnum_Snebur_UI_EnumFonte);
	export const __$tipoListaEnum_Snebur_UI_EnumTipoPainel = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumTipoPainel", "Snebur.UI", "Snebur.UI.EnumTipoPainel, Snebur", __$tipoEnum_Snebur_UI_EnumTipoPainel);
	export const __$tipoListaEnum_Snebur_UI_EnumTonalidade = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumTonalidade", "Snebur.UI", "Snebur.UI.EnumTonalidade, Snebur", __$tipoEnum_Snebur_UI_EnumTonalidade);
	export const __$tipoListaEnum_Snebur_UI_EnumVisibilidade = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.UI.EnumVisibilidade", "Snebur.UI", "Snebur.UI.EnumVisibilidade, Snebur", __$tipoEnum_Snebur_UI_EnumVisibilidade);
	export const __$tipoListaEnum_Snebur_Utilidade_EnumTipoCaminho = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Utilidade.EnumTipoCaminho", "Snebur.Utilidade", "Snebur.Utilidade.EnumTipoCaminho, Snebur", __$tipoEnum_Snebur_Utilidade_EnumTipoCaminho);
	export const __$tipoListaEnum_Snebur_Utilidade_OpcoesCompararData = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Utilidade.OpcoesCompararData", "Snebur.Utilidade", "Snebur.Utilidade.OpcoesCompararData, Snebur", __$tipoEnum_Snebur_Utilidade_OpcoesCompararData);
	export const __$tipoListaEnum_Snebur_Utilidade_OpcoesCompararHora = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Utilidade.OpcoesCompararHora", "Snebur.Utilidade", "Snebur.Utilidade.OpcoesCompararHora, Snebur", __$tipoEnum_Snebur_Utilidade_OpcoesCompararHora);
	export const __$tipoListaEnum_Snebur_Utilidade_QueryType = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Utilidade.QueryType", "Snebur.Utilidade", "Snebur.Utilidade.QueryType, Snebur", __$tipoEnum_Snebur_Utilidade_QueryType);
	export const __$tipoListaEnum_Snebur_Utilidade_EnumFiltroPropriedadeCampo = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Utilidade.EnumFiltroPropriedadeCampo", "Snebur.Utilidade", "Snebur.Utilidade.EnumFiltroPropriedadeCampo, Snebur", __$tipoEnum_Snebur_Utilidade_EnumFiltroPropriedadeCampo);
	export const __$tipoListaEnum_Snebur_Utilidade_EnumStatusDiretorio = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Utilidade.EnumStatusDiretorio", "Snebur.Utilidade", "Snebur.Utilidade.EnumStatusDiretorio, Snebur", __$tipoEnum_Snebur_Utilidade_EnumStatusDiretorio);
	export const __$tipoListaEnum_Snebur_Utilidade_EnumDivisorDecimal = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Utilidade.EnumDivisorDecimal", "Snebur.Utilidade", "Snebur.Utilidade.EnumDivisorDecimal, Snebur", __$tipoEnum_Snebur_Utilidade_EnumDivisorDecimal);
	export const __$tipoListaEnum_Snebur_Utilidade_EnumFormatacaoBytes = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Utilidade.EnumFormatacaoBytes", "Snebur.Utilidade", "Snebur.Utilidade.EnumFormatacaoBytes, Snebur", __$tipoEnum_Snebur_Utilidade_EnumFormatacaoBytes);
	export const __$tipoListaEnum_Snebur_Utilidade_EnumTipoSerializacao = new Snebur.Reflexao.TipoListaEnum("ListaTipoEnum_Snebur.Utilidade.EnumTipoSerializacao", "Snebur.Utilidade", "Snebur.Utilidade.EnumTipoSerializacao, Snebur", __$tipoEnum_Snebur_Utilidade_EnumTipoSerializacao);
	
	//Adicionar Enum
	$Reflexao.Tipos.Adicionar("Snebur.EnumAmbienteServidor",__$tipoEnum_Snebur_EnumAmbienteServidor);
	$Reflexao.Tipos.Adicionar("Snebur.EnumNivelErro",__$tipoEnum_Snebur_EnumNivelErro);
	$Reflexao.Tipos.Adicionar("Snebur.AcessoDados.EnumOperadorFiltro",__$tipoEnum_Snebur_AcessoDados_EnumOperadorFiltro);
	$Reflexao.Tipos.Adicionar("Snebur.AcessoDados.Seguranca.EnumPermissao",__$tipoEnum_Snebur_AcessoDados_Seguranca_EnumPermissao);
	$Reflexao.Tipos.Adicionar("Snebur.Arquivo.EnumTipoArquivo",__$tipoEnum_Snebur_Arquivo_EnumTipoArquivo);
	$Reflexao.Tipos.Adicionar("Snebur.Arquivo.EnumTipoXFG",__$tipoEnum_Snebur_Arquivo_EnumTipoXFG);
	$Reflexao.Tipos.Adicionar("Snebur.Comparer.EnumCompararPropriedade",__$tipoEnum_Snebur_Comparer_EnumCompararPropriedade);
	$Reflexao.Tipos.Adicionar("Snebur.Dne.EnumUF",__$tipoEnum_Snebur_Dne_EnumUF);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumOpcoesAlterarPropriedade",__$tipoEnum_Snebur_Dominio_EnumOpcoesAlterarPropriedade);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumTipoValorPadrao",__$tipoEnum_Snebur_Dominio_EnumTipoValorPadrao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnunFlagAlteracaoPropriedade",__$tipoEnum_Snebur_Dominio_EnunFlagAlteracaoPropriedade);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumTipoDesbloqueio",__$tipoEnum_Snebur_Dominio_EnumTipoDesbloqueio);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumSentidoOrdenacao",__$tipoEnum_Snebur_Dominio_EnumSentidoOrdenacao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumOrientacao",__$tipoEnum_Snebur_Dominio_EnumOrientacao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumTipoJuros",__$tipoEnum_Snebur_Dominio_EnumTipoJuros);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumResultadoAutenticacao",__$tipoEnum_Snebur_Dominio_EnumResultadoAutenticacao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumResultadoValidacaoCredencial",__$tipoEnum_Snebur_Dominio_EnumResultadoValidacaoCredencial);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumStatusCodigoRecuperarSenha",__$tipoEnum_Snebur_Dominio_EnumStatusCodigoRecuperarSenha);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumStatusServicoArquivo",__$tipoEnum_Snebur_Dominio_EnumStatusServicoArquivo);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumStatusUsuario",__$tipoEnum_Snebur_Dominio_EnumStatusUsuario);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumStatusArquivo",__$tipoEnum_Snebur_Dominio_EnumStatusArquivo);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumAparenciaFonte",__$tipoEnum_Snebur_Dominio_EnumAparenciaFonte);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumEspessuraFonte",__$tipoEnum_Snebur_Dominio_EnumEspessuraFonte);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumFormatoArquivoFonte",__$tipoEnum_Snebur_Dominio_EnumFormatoArquivoFonte);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumEfeitoImagem",__$tipoEnum_Snebur_Dominio_EnumEfeitoImagem);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumFiltroImagem",__$tipoEnum_Snebur_Dominio_EnumFiltroImagem);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumFormatoImagem",__$tipoEnum_Snebur_Dominio_EnumFormatoImagem);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumRotacaoImagem",__$tipoEnum_Snebur_Dominio_EnumRotacaoImagem);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumTamanhoImagem",__$tipoEnum_Snebur_Dominio_EnumTamanhoImagem);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumNavegador",__$tipoEnum_Snebur_Dominio_EnumNavegador);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumPlataforma",__$tipoEnum_Snebur_Dominio_EnumPlataforma);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumSistemaOperacional",__$tipoEnum_Snebur_Dominio_EnumSistemaOperacional);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumStatusSessaoUsuario",__$tipoEnum_Snebur_Dominio_EnumStatusSessaoUsuario);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumTipoAplicacao",__$tipoEnum_Snebur_Dominio_EnumTipoAplicacao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumTipoPrazo",__$tipoEnum_Snebur_Dominio_EnumTipoPrazo);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumMimeType",__$tipoEnum_Snebur_Dominio_EnumMimeType);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumPreenchimentoImagem",__$tipoEnum_Snebur_Dominio_EnumPreenchimentoImagem);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumMes",__$tipoEnum_Snebur_Dominio_EnumMes);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumTipoData",__$tipoEnum_Snebur_Dominio_EnumTipoData);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.EnumDiaSemana",__$tipoEnum_Snebur_Dominio_EnumDiaSemana);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Atributos.EnumFormatacaoDados",__$tipoEnum_Snebur_Dominio_Atributos_EnumFormatacaoDados);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Atributos.EnumOrdenacaoNovoRegistro",__$tipoEnum_Snebur_Dominio_Atributos_EnumOrdenacaoNovoRegistro);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao",__$tipoEnum_Snebur_Dominio_Atributos_EnumTipoExclusaoRelacao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar",__$tipoEnum_Snebur_Dominio_Atributos_EnumOpcoesComparacaoAuxiliar);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Interface.Media.EnumFamiliaPerfilIcc",__$tipoEnum_Snebur_Dominio_Interface_Media_EnumFamiliaPerfilIcc);
	$Reflexao.Tipos.Adicionar("Snebur.Imagens.EnumDirecaoGradiente",__$tipoEnum_Snebur_Imagens_EnumDirecaoGradiente);
	$Reflexao.Tipos.Adicionar("Snebur.Imagens.EnumMixagem",__$tipoEnum_Snebur_Imagens_EnumMixagem);
	$Reflexao.Tipos.Adicionar("Snebur.Imagens.EnumPosicaoGradiente",__$tipoEnum_Snebur_Imagens_EnumPosicaoGradiente);
	$Reflexao.Tipos.Adicionar("Snebur.Imagens.EnumTipoSobrePosicao",__$tipoEnum_Snebur_Imagens_EnumTipoSobrePosicao);
	$Reflexao.Tipos.Adicionar("Snebur.Imagens.EnumTamanhoGradiente",__$tipoEnum_Snebur_Imagens_EnumTamanhoGradiente);
	$Reflexao.Tipos.Adicionar("Snebur.Reflexao.EnumTipoPrimario",__$tipoEnum_Snebur_Reflexao_EnumTipoPrimario);
	$Reflexao.Tipos.Adicionar("Snebur.Reflexao.EnumTipoReflexao",__$tipoEnum_Snebur_Reflexao_EnumTipoReflexao);
	$Reflexao.Tipos.Adicionar("Snebur.Servicos.EnumTipoLogDesempenho",__$tipoEnum_Snebur_Servicos_EnumTipoLogDesempenho);
	$Reflexao.Tipos.Adicionar("Snebur.Servicos.EnumTipoLogSeguranca",__$tipoEnum_Snebur_Servicos_EnumTipoLogSeguranca);
	$Reflexao.Tipos.Adicionar("Snebur.Tarefa.EnumStatusTarefa",__$tipoEnum_Snebur_Tarefa_EnumStatusTarefa);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumBotoesAlerta",__$tipoEnum_Snebur_UI_EnumBotoesAlerta);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumResultadoAlerta",__$tipoEnum_Snebur_UI_EnumResultadoAlerta);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumTipoAlerta",__$tipoEnum_Snebur_UI_EnumTipoAlerta);
	$Reflexao.Tipos.Adicionar("Snebur.UI.BaseEnumApresentacao",__$tipoEnum_Snebur_UI_BaseEnumApresentacao);
	$Reflexao.Tipos.Adicionar("Snebur.UI.BaseEnumComprimento",__$tipoEnum_Snebur_UI_BaseEnumComprimento);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumAlinhamentoHorizontal",__$tipoEnum_Snebur_UI_EnumAlinhamentoHorizontal);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumAlinhamentoTexto",__$tipoEnum_Snebur_UI_EnumAlinhamentoTexto);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumAlinhamentoVertical",__$tipoEnum_Snebur_UI_EnumAlinhamentoVertical);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumAltura",__$tipoEnum_Snebur_UI_EnumAltura);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumAlturaLinha",__$tipoEnum_Snebur_UI_EnumAlturaLinha);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumAparencia",__$tipoEnum_Snebur_UI_EnumAparencia);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumBarraRolagem",__$tipoEnum_Snebur_UI_EnumBarraRolagem);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumCor",__$tipoEnum_Snebur_UI_EnumCor);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumDestinoControleFlutuante",__$tipoEnum_Snebur_UI_EnumDestinoControleFlutuante);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumDistanciaMargem",__$tipoEnum_Snebur_UI_EnumDistanciaMargem);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumEstiloBorda",__$tipoEnum_Snebur_UI_EnumEstiloBorda);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumFormatacaoTexto",__$tipoEnum_Snebur_UI_EnumFormatacaoTexto);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumFormatacao",__$tipoEnum_Snebur_UI_EnumFormatacao);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumIcone",__$tipoEnum_Snebur_UI_EnumIcone);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumIconeCategoria",__$tipoEnum_Snebur_UI_EnumIconeCategoria);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumLargura",__$tipoEnum_Snebur_UI_EnumLargura);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumLarguraBloco",__$tipoEnum_Snebur_UI_EnumLarguraBloco);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumMargem",__$tipoEnum_Snebur_UI_EnumMargem);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumMostrar",__$tipoEnum_Snebur_UI_EnumMostrar);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumOpcapBindCssClasse",__$tipoEnum_Snebur_UI_EnumOpcapBindCssClasse);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumPosicao",__$tipoEnum_Snebur_UI_EnumPosicao);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumQuebrar",__$tipoEnum_Snebur_UI_EnumQuebrar);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumTamanhoIcone",__$tipoEnum_Snebur_UI_EnumTamanhoIcone);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumTipoAnimacao",__$tipoEnum_Snebur_UI_EnumTipoAnimacao);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumTipoBotao",__$tipoEnum_Snebur_UI_EnumTipoBotao);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumTipoCaixa",__$tipoEnum_Snebur_UI_EnumTipoCaixa);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumTipoPainelAba",__$tipoEnum_Snebur_UI_EnumTipoPainelAba);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumTipoEntrada",__$tipoEnum_Snebur_UI_EnumTipoEntrada);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumTipografia",__$tipoEnum_Snebur_UI_EnumTipografia);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumPesoFonte",__$tipoEnum_Snebur_UI_EnumPesoFonte);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumFonte",__$tipoEnum_Snebur_UI_EnumFonte);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumTipoPainel",__$tipoEnum_Snebur_UI_EnumTipoPainel);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumTonalidade",__$tipoEnum_Snebur_UI_EnumTonalidade);
	$Reflexao.Tipos.Adicionar("Snebur.UI.EnumVisibilidade",__$tipoEnum_Snebur_UI_EnumVisibilidade);
	$Reflexao.Tipos.Adicionar("Snebur.Utilidade.EnumTipoCaminho",__$tipoEnum_Snebur_Utilidade_EnumTipoCaminho);
	$Reflexao.Tipos.Adicionar("Snebur.Utilidade.OpcoesCompararData",__$tipoEnum_Snebur_Utilidade_OpcoesCompararData);
	$Reflexao.Tipos.Adicionar("Snebur.Utilidade.OpcoesCompararHora",__$tipoEnum_Snebur_Utilidade_OpcoesCompararHora);
	$Reflexao.Tipos.Adicionar("Snebur.Utilidade.QueryType",__$tipoEnum_Snebur_Utilidade_QueryType);
	$Reflexao.Tipos.Adicionar("Snebur.Utilidade.EnumFiltroPropriedadeCampo",__$tipoEnum_Snebur_Utilidade_EnumFiltroPropriedadeCampo);
	$Reflexao.Tipos.Adicionar("Snebur.Utilidade.EnumStatusDiretorio",__$tipoEnum_Snebur_Utilidade_EnumStatusDiretorio);
	$Reflexao.Tipos.Adicionar("Snebur.Utilidade.EnumDivisorDecimal",__$tipoEnum_Snebur_Utilidade_EnumDivisorDecimal);
	$Reflexao.Tipos.Adicionar("Snebur.Utilidade.EnumFormatacaoBytes",__$tipoEnum_Snebur_Utilidade_EnumFormatacaoBytes);
	$Reflexao.Tipos.Adicionar("Snebur.Utilidade.EnumTipoSerializacao",__$tipoEnum_Snebur_Utilidade_EnumTipoSerializacao);
	
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_EnumAmbienteServidor",__$tipoListaEnum_Snebur_EnumAmbienteServidor);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_EnumNivelErro",__$tipoListaEnum_Snebur_EnumNivelErro);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_AcessoDados_EnumOperadorFiltro",__$tipoListaEnum_Snebur_AcessoDados_EnumOperadorFiltro);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_AcessoDados_Seguranca_EnumPermissao",__$tipoListaEnum_Snebur_AcessoDados_Seguranca_EnumPermissao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Arquivo_EnumTipoArquivo",__$tipoListaEnum_Snebur_Arquivo_EnumTipoArquivo);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Arquivo_EnumTipoXFG",__$tipoListaEnum_Snebur_Arquivo_EnumTipoXFG);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Comparer_EnumCompararPropriedade",__$tipoListaEnum_Snebur_Comparer_EnumCompararPropriedade);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dne_EnumUF",__$tipoListaEnum_Snebur_Dne_EnumUF);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumOpcoesAlterarPropriedade",__$tipoListaEnum_Snebur_Dominio_EnumOpcoesAlterarPropriedade);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumTipoValorPadrao",__$tipoListaEnum_Snebur_Dominio_EnumTipoValorPadrao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnunFlagAlteracaoPropriedade",__$tipoListaEnum_Snebur_Dominio_EnunFlagAlteracaoPropriedade);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumTipoDesbloqueio",__$tipoListaEnum_Snebur_Dominio_EnumTipoDesbloqueio);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumSentidoOrdenacao",__$tipoListaEnum_Snebur_Dominio_EnumSentidoOrdenacao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumOrientacao",__$tipoListaEnum_Snebur_Dominio_EnumOrientacao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumTipoJuros",__$tipoListaEnum_Snebur_Dominio_EnumTipoJuros);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumResultadoAutenticacao",__$tipoListaEnum_Snebur_Dominio_EnumResultadoAutenticacao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumResultadoValidacaoCredencial",__$tipoListaEnum_Snebur_Dominio_EnumResultadoValidacaoCredencial);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumStatusCodigoRecuperarSenha",__$tipoListaEnum_Snebur_Dominio_EnumStatusCodigoRecuperarSenha);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumStatusServicoArquivo",__$tipoListaEnum_Snebur_Dominio_EnumStatusServicoArquivo);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumStatusUsuario",__$tipoListaEnum_Snebur_Dominio_EnumStatusUsuario);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumStatusArquivo",__$tipoListaEnum_Snebur_Dominio_EnumStatusArquivo);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumAparenciaFonte",__$tipoListaEnum_Snebur_Dominio_EnumAparenciaFonte);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumEspessuraFonte",__$tipoListaEnum_Snebur_Dominio_EnumEspessuraFonte);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumFormatoArquivoFonte",__$tipoListaEnum_Snebur_Dominio_EnumFormatoArquivoFonte);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumEfeitoImagem",__$tipoListaEnum_Snebur_Dominio_EnumEfeitoImagem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumFiltroImagem",__$tipoListaEnum_Snebur_Dominio_EnumFiltroImagem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumFormatoImagem",__$tipoListaEnum_Snebur_Dominio_EnumFormatoImagem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumRotacaoImagem",__$tipoListaEnum_Snebur_Dominio_EnumRotacaoImagem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumTamanhoImagem",__$tipoListaEnum_Snebur_Dominio_EnumTamanhoImagem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumNavegador",__$tipoListaEnum_Snebur_Dominio_EnumNavegador);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumPlataforma",__$tipoListaEnum_Snebur_Dominio_EnumPlataforma);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumSistemaOperacional",__$tipoListaEnum_Snebur_Dominio_EnumSistemaOperacional);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumStatusSessaoUsuario",__$tipoListaEnum_Snebur_Dominio_EnumStatusSessaoUsuario);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumTipoAplicacao",__$tipoListaEnum_Snebur_Dominio_EnumTipoAplicacao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumTipoPrazo",__$tipoListaEnum_Snebur_Dominio_EnumTipoPrazo);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumMimeType",__$tipoListaEnum_Snebur_Dominio_EnumMimeType);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumPreenchimentoImagem",__$tipoListaEnum_Snebur_Dominio_EnumPreenchimentoImagem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumMes",__$tipoListaEnum_Snebur_Dominio_EnumMes);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumTipoData",__$tipoListaEnum_Snebur_Dominio_EnumTipoData);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_EnumDiaSemana",__$tipoListaEnum_Snebur_Dominio_EnumDiaSemana);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_Atributos_EnumFormatacaoDados",__$tipoListaEnum_Snebur_Dominio_Atributos_EnumFormatacaoDados);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_Atributos_EnumOrdenacaoNovoRegistro",__$tipoListaEnum_Snebur_Dominio_Atributos_EnumOrdenacaoNovoRegistro);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_Atributos_EnumTipoExclusaoRelacao",__$tipoListaEnum_Snebur_Dominio_Atributos_EnumTipoExclusaoRelacao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_Atributos_EnumOpcoesComparacaoAuxiliar",__$tipoListaEnum_Snebur_Dominio_Atributos_EnumOpcoesComparacaoAuxiliar);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Dominio_Interface_Media_EnumFamiliaPerfilIcc",__$tipoListaEnum_Snebur_Dominio_Interface_Media_EnumFamiliaPerfilIcc);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Imagens_EnumDirecaoGradiente",__$tipoListaEnum_Snebur_Imagens_EnumDirecaoGradiente);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Imagens_EnumMixagem",__$tipoListaEnum_Snebur_Imagens_EnumMixagem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Imagens_EnumPosicaoGradiente",__$tipoListaEnum_Snebur_Imagens_EnumPosicaoGradiente);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Imagens_EnumTipoSobrePosicao",__$tipoListaEnum_Snebur_Imagens_EnumTipoSobrePosicao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Imagens_EnumTamanhoGradiente",__$tipoListaEnum_Snebur_Imagens_EnumTamanhoGradiente);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Reflexao_EnumTipoPrimario",__$tipoListaEnum_Snebur_Reflexao_EnumTipoPrimario);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Reflexao_EnumTipoReflexao",__$tipoListaEnum_Snebur_Reflexao_EnumTipoReflexao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Servicos_EnumTipoLogDesempenho",__$tipoListaEnum_Snebur_Servicos_EnumTipoLogDesempenho);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Servicos_EnumTipoLogSeguranca",__$tipoListaEnum_Snebur_Servicos_EnumTipoLogSeguranca);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Tarefa_EnumStatusTarefa",__$tipoListaEnum_Snebur_Tarefa_EnumStatusTarefa);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumBotoesAlerta",__$tipoListaEnum_Snebur_UI_EnumBotoesAlerta);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumResultadoAlerta",__$tipoListaEnum_Snebur_UI_EnumResultadoAlerta);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumTipoAlerta",__$tipoListaEnum_Snebur_UI_EnumTipoAlerta);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_BaseEnumApresentacao",__$tipoListaEnum_Snebur_UI_BaseEnumApresentacao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_BaseEnumComprimento",__$tipoListaEnum_Snebur_UI_BaseEnumComprimento);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumAlinhamentoHorizontal",__$tipoListaEnum_Snebur_UI_EnumAlinhamentoHorizontal);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumAlinhamentoTexto",__$tipoListaEnum_Snebur_UI_EnumAlinhamentoTexto);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumAlinhamentoVertical",__$tipoListaEnum_Snebur_UI_EnumAlinhamentoVertical);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumAltura",__$tipoListaEnum_Snebur_UI_EnumAltura);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumAlturaLinha",__$tipoListaEnum_Snebur_UI_EnumAlturaLinha);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumAparencia",__$tipoListaEnum_Snebur_UI_EnumAparencia);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumBarraRolagem",__$tipoListaEnum_Snebur_UI_EnumBarraRolagem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumCor",__$tipoListaEnum_Snebur_UI_EnumCor);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumDestinoControleFlutuante",__$tipoListaEnum_Snebur_UI_EnumDestinoControleFlutuante);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumDistanciaMargem",__$tipoListaEnum_Snebur_UI_EnumDistanciaMargem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumEstiloBorda",__$tipoListaEnum_Snebur_UI_EnumEstiloBorda);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumFormatacaoTexto",__$tipoListaEnum_Snebur_UI_EnumFormatacaoTexto);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumFormatacao",__$tipoListaEnum_Snebur_UI_EnumFormatacao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumIcone",__$tipoListaEnum_Snebur_UI_EnumIcone);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumIconeCategoria",__$tipoListaEnum_Snebur_UI_EnumIconeCategoria);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumLargura",__$tipoListaEnum_Snebur_UI_EnumLargura);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumLarguraBloco",__$tipoListaEnum_Snebur_UI_EnumLarguraBloco);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumMargem",__$tipoListaEnum_Snebur_UI_EnumMargem);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumMostrar",__$tipoListaEnum_Snebur_UI_EnumMostrar);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumOpcapBindCssClasse",__$tipoListaEnum_Snebur_UI_EnumOpcapBindCssClasse);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumPosicao",__$tipoListaEnum_Snebur_UI_EnumPosicao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumQuebrar",__$tipoListaEnum_Snebur_UI_EnumQuebrar);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumTamanhoIcone",__$tipoListaEnum_Snebur_UI_EnumTamanhoIcone);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumTipoAnimacao",__$tipoListaEnum_Snebur_UI_EnumTipoAnimacao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumTipoBotao",__$tipoListaEnum_Snebur_UI_EnumTipoBotao);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumTipoCaixa",__$tipoListaEnum_Snebur_UI_EnumTipoCaixa);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumTipoPainelAba",__$tipoListaEnum_Snebur_UI_EnumTipoPainelAba);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumTipoEntrada",__$tipoListaEnum_Snebur_UI_EnumTipoEntrada);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumTipografia",__$tipoListaEnum_Snebur_UI_EnumTipografia);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumPesoFonte",__$tipoListaEnum_Snebur_UI_EnumPesoFonte);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumFonte",__$tipoListaEnum_Snebur_UI_EnumFonte);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumTipoPainel",__$tipoListaEnum_Snebur_UI_EnumTipoPainel);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumTonalidade",__$tipoListaEnum_Snebur_UI_EnumTonalidade);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_UI_EnumVisibilidade",__$tipoListaEnum_Snebur_UI_EnumVisibilidade);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Utilidade_EnumTipoCaminho",__$tipoListaEnum_Snebur_Utilidade_EnumTipoCaminho);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Utilidade_OpcoesCompararData",__$tipoListaEnum_Snebur_Utilidade_OpcoesCompararData);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Utilidade_OpcoesCompararHora",__$tipoListaEnum_Snebur_Utilidade_OpcoesCompararHora);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Utilidade_QueryType",__$tipoListaEnum_Snebur_Utilidade_QueryType);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Utilidade_EnumFiltroPropriedadeCampo",__$tipoListaEnum_Snebur_Utilidade_EnumFiltroPropriedadeCampo);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Utilidade_EnumStatusDiretorio",__$tipoListaEnum_Snebur_Utilidade_EnumStatusDiretorio);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Utilidade_EnumDivisorDecimal",__$tipoListaEnum_Snebur_Utilidade_EnumDivisorDecimal);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Utilidade_EnumFormatacaoBytes",__$tipoListaEnum_Snebur_Utilidade_EnumFormatacaoBytes);
	$Reflexao.Tipos.Adicionar("ListaTipoEnum_Snebur_Utilidade_EnumTipoSerializacao",__$tipoListaEnum_Snebur_Utilidade_EnumTipoSerializacao);
	
	//Associar caminhos Emil
	Snebur.EnumAmbienteServidor.__CaminhoTipo = "Snebur.EnumAmbienteServidor";
	Snebur.EnumNivelErro.__CaminhoTipo = "Snebur.EnumNivelErro";
	Snebur.AcessoDados.EnumOperadorFiltro.__CaminhoTipo = "Snebur.AcessoDados.EnumOperadorFiltro";
	Snebur.AcessoDados.Seguranca.EnumPermissao.__CaminhoTipo = "Snebur.AcessoDados.Seguranca.EnumPermissao";
	Snebur.Arquivo.EnumTipoArquivo.__CaminhoTipo = "Snebur.Arquivo.EnumTipoArquivo";
	Snebur.Arquivo.EnumTipoXFG.__CaminhoTipo = "Snebur.Arquivo.EnumTipoXFG";
	Snebur.Comparer.EnumCompararPropriedade.__CaminhoTipo = "Snebur.Comparer.EnumCompararPropriedade";
	Snebur.Dne.EnumUF.__CaminhoTipo = "Snebur.Dne.EnumUF";
	Snebur.Dominio.EnumOpcoesAlterarPropriedade.__CaminhoTipo = "Snebur.Dominio.EnumOpcoesAlterarPropriedade";
	Snebur.Dominio.EnumTipoValorPadrao.__CaminhoTipo = "Snebur.Dominio.EnumTipoValorPadrao";
	Snebur.Dominio.EnunFlagAlteracaoPropriedade.__CaminhoTipo = "Snebur.Dominio.EnunFlagAlteracaoPropriedade";
	Snebur.Dominio.EnumTipoDesbloqueio.__CaminhoTipo = "Snebur.Dominio.EnumTipoDesbloqueio";
	Snebur.Dominio.EnumSentidoOrdenacao.__CaminhoTipo = "Snebur.Dominio.EnumSentidoOrdenacao";
	Snebur.Dominio.EnumOrientacao.__CaminhoTipo = "Snebur.Dominio.EnumOrientacao";
	Snebur.Dominio.EnumTipoJuros.__CaminhoTipo = "Snebur.Dominio.EnumTipoJuros";
	Snebur.Dominio.EnumResultadoAutenticacao.__CaminhoTipo = "Snebur.Dominio.EnumResultadoAutenticacao";
	Snebur.Dominio.EnumResultadoValidacaoCredencial.__CaminhoTipo = "Snebur.Dominio.EnumResultadoValidacaoCredencial";
	Snebur.Dominio.EnumStatusCodigoRecuperarSenha.__CaminhoTipo = "Snebur.Dominio.EnumStatusCodigoRecuperarSenha";
	Snebur.Dominio.EnumStatusServicoArquivo.__CaminhoTipo = "Snebur.Dominio.EnumStatusServicoArquivo";
	Snebur.Dominio.EnumStatusUsuario.__CaminhoTipo = "Snebur.Dominio.EnumStatusUsuario";
	Snebur.Dominio.EnumStatusArquivo.__CaminhoTipo = "Snebur.Dominio.EnumStatusArquivo";
	Snebur.Dominio.EnumAparenciaFonte.__CaminhoTipo = "Snebur.Dominio.EnumAparenciaFonte";
	Snebur.Dominio.EnumEspessuraFonte.__CaminhoTipo = "Snebur.Dominio.EnumEspessuraFonte";
	Snebur.Dominio.EnumFormatoArquivoFonte.__CaminhoTipo = "Snebur.Dominio.EnumFormatoArquivoFonte";
	Snebur.Dominio.EnumEfeitoImagem.__CaminhoTipo = "Snebur.Dominio.EnumEfeitoImagem";
	Snebur.Dominio.EnumFiltroImagem.__CaminhoTipo = "Snebur.Dominio.EnumFiltroImagem";
	Snebur.Dominio.EnumFormatoImagem.__CaminhoTipo = "Snebur.Dominio.EnumFormatoImagem";
	Snebur.Dominio.EnumRotacaoImagem.__CaminhoTipo = "Snebur.Dominio.EnumRotacaoImagem";
	Snebur.Dominio.EnumTamanhoImagem.__CaminhoTipo = "Snebur.Dominio.EnumTamanhoImagem";
	Snebur.Dominio.EnumNavegador.__CaminhoTipo = "Snebur.Dominio.EnumNavegador";
	Snebur.Dominio.EnumPlataforma.__CaminhoTipo = "Snebur.Dominio.EnumPlataforma";
	Snebur.Dominio.EnumSistemaOperacional.__CaminhoTipo = "Snebur.Dominio.EnumSistemaOperacional";
	Snebur.Dominio.EnumStatusSessaoUsuario.__CaminhoTipo = "Snebur.Dominio.EnumStatusSessaoUsuario";
	Snebur.Dominio.EnumTipoAplicacao.__CaminhoTipo = "Snebur.Dominio.EnumTipoAplicacao";
	Snebur.Dominio.EnumTipoPrazo.__CaminhoTipo = "Snebur.Dominio.EnumTipoPrazo";
	Snebur.Dominio.EnumMimeType.__CaminhoTipo = "Snebur.Dominio.EnumMimeType";
	Snebur.Dominio.EnumPreenchimentoImagem.__CaminhoTipo = "Snebur.Dominio.EnumPreenchimentoImagem";
	Snebur.Dominio.EnumMes.__CaminhoTipo = "Snebur.Dominio.EnumMes";
	Snebur.Dominio.EnumTipoData.__CaminhoTipo = "Snebur.Dominio.EnumTipoData";
	Snebur.Dominio.EnumDiaSemana.__CaminhoTipo = "Snebur.Dominio.EnumDiaSemana";
	Snebur.Dominio.Atributos.EnumFormatacaoDados.__CaminhoTipo = "Snebur.Dominio.Atributos.EnumFormatacaoDados";
	Snebur.Dominio.Atributos.EnumOrdenacaoNovoRegistro.__CaminhoTipo = "Snebur.Dominio.Atributos.EnumOrdenacaoNovoRegistro";
	Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao.__CaminhoTipo = "Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao";
	Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar.__CaminhoTipo = "Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar";
	Snebur.Dominio.Interface.Media.EnumFamiliaPerfilIcc.__CaminhoTipo = "Snebur.Dominio.Interface.Media.EnumFamiliaPerfilIcc";
	Snebur.Imagens.EnumDirecaoGradiente.__CaminhoTipo = "Snebur.Imagens.EnumDirecaoGradiente";
	Snebur.Imagens.EnumMixagem.__CaminhoTipo = "Snebur.Imagens.EnumMixagem";
	Snebur.Imagens.EnumPosicaoGradiente.__CaminhoTipo = "Snebur.Imagens.EnumPosicaoGradiente";
	Snebur.Imagens.EnumTipoSobrePosicao.__CaminhoTipo = "Snebur.Imagens.EnumTipoSobrePosicao";
	Snebur.Imagens.EnumTamanhoGradiente.__CaminhoTipo = "Snebur.Imagens.EnumTamanhoGradiente";
	Snebur.Reflexao.EnumTipoPrimario.__CaminhoTipo = "Snebur.Reflexao.EnumTipoPrimario";
	Snebur.Reflexao.EnumTipoReflexao.__CaminhoTipo = "Snebur.Reflexao.EnumTipoReflexao";
	Snebur.Servicos.EnumTipoLogDesempenho.__CaminhoTipo = "Snebur.Servicos.EnumTipoLogDesempenho";
	Snebur.Servicos.EnumTipoLogSeguranca.__CaminhoTipo = "Snebur.Servicos.EnumTipoLogSeguranca";
	Snebur.Tarefa.EnumStatusTarefa.__CaminhoTipo = "Snebur.Tarefa.EnumStatusTarefa";
	Snebur.UI.EnumBotoesAlerta.__CaminhoTipo = "Snebur.UI.EnumBotoesAlerta";
	Snebur.UI.EnumResultadoAlerta.__CaminhoTipo = "Snebur.UI.EnumResultadoAlerta";
	Snebur.UI.EnumTipoAlerta.__CaminhoTipo = "Snebur.UI.EnumTipoAlerta";
	Snebur.UI.BaseEnumApresentacao.__CaminhoTipo = "Snebur.UI.BaseEnumApresentacao";
	Snebur.UI.BaseEnumComprimento.__CaminhoTipo = "Snebur.UI.BaseEnumComprimento";
	Snebur.UI.EnumAlinhamentoHorizontal.__CaminhoTipo = "Snebur.UI.EnumAlinhamentoHorizontal";
	Snebur.UI.EnumAlinhamentoTexto.__CaminhoTipo = "Snebur.UI.EnumAlinhamentoTexto";
	Snebur.UI.EnumAlinhamentoVertical.__CaminhoTipo = "Snebur.UI.EnumAlinhamentoVertical";
	Snebur.UI.EnumAltura.__CaminhoTipo = "Snebur.UI.EnumAltura";
	Snebur.UI.EnumAlturaLinha.__CaminhoTipo = "Snebur.UI.EnumAlturaLinha";
	Snebur.UI.EnumAparencia.__CaminhoTipo = "Snebur.UI.EnumAparencia";
	Snebur.UI.EnumBarraRolagem.__CaminhoTipo = "Snebur.UI.EnumBarraRolagem";
	Snebur.UI.EnumCor.__CaminhoTipo = "Snebur.UI.EnumCor";
	Snebur.UI.EnumDestinoControleFlutuante.__CaminhoTipo = "Snebur.UI.EnumDestinoControleFlutuante";
	Snebur.UI.EnumDistanciaMargem.__CaminhoTipo = "Snebur.UI.EnumDistanciaMargem";
	Snebur.UI.EnumEstiloBorda.__CaminhoTipo = "Snebur.UI.EnumEstiloBorda";
	Snebur.UI.EnumFormatacaoTexto.__CaminhoTipo = "Snebur.UI.EnumFormatacaoTexto";
	Snebur.UI.EnumFormatacao.__CaminhoTipo = "Snebur.UI.EnumFormatacao";
	Snebur.UI.EnumIcone.__CaminhoTipo = "Snebur.UI.EnumIcone";
	Snebur.UI.EnumIconeCategoria.__CaminhoTipo = "Snebur.UI.EnumIconeCategoria";
	Snebur.UI.EnumLargura.__CaminhoTipo = "Snebur.UI.EnumLargura";
	Snebur.UI.EnumLarguraBloco.__CaminhoTipo = "Snebur.UI.EnumLarguraBloco";
	Snebur.UI.EnumMargem.__CaminhoTipo = "Snebur.UI.EnumMargem";
	Snebur.UI.EnumMostrar.__CaminhoTipo = "Snebur.UI.EnumMostrar";
	Snebur.UI.EnumOpcapBindCssClasse.__CaminhoTipo = "Snebur.UI.EnumOpcapBindCssClasse";
	Snebur.UI.EnumPosicao.__CaminhoTipo = "Snebur.UI.EnumPosicao";
	Snebur.UI.EnumQuebrar.__CaminhoTipo = "Snebur.UI.EnumQuebrar";
	Snebur.UI.EnumTamanhoIcone.__CaminhoTipo = "Snebur.UI.EnumTamanhoIcone";
	Snebur.UI.EnumTipoAnimacao.__CaminhoTipo = "Snebur.UI.EnumTipoAnimacao";
	Snebur.UI.EnumTipoBotao.__CaminhoTipo = "Snebur.UI.EnumTipoBotao";
	Snebur.UI.EnumTipoCaixa.__CaminhoTipo = "Snebur.UI.EnumTipoCaixa";
	Snebur.UI.EnumTipoPainelAba.__CaminhoTipo = "Snebur.UI.EnumTipoPainelAba";
	Snebur.UI.EnumTipoEntrada.__CaminhoTipo = "Snebur.UI.EnumTipoEntrada";
	Snebur.UI.EnumTipografia.__CaminhoTipo = "Snebur.UI.EnumTipografia";
	Snebur.UI.EnumPesoFonte.__CaminhoTipo = "Snebur.UI.EnumPesoFonte";
	Snebur.UI.EnumFonte.__CaminhoTipo = "Snebur.UI.EnumFonte";
	Snebur.UI.EnumTipoPainel.__CaminhoTipo = "Snebur.UI.EnumTipoPainel";
	Snebur.UI.EnumTonalidade.__CaminhoTipo = "Snebur.UI.EnumTonalidade";
	Snebur.UI.EnumVisibilidade.__CaminhoTipo = "Snebur.UI.EnumVisibilidade";
	Snebur.Utilidade.EnumTipoCaminho.__CaminhoTipo = "Snebur.Utilidade.EnumTipoCaminho";
	Snebur.Utilidade.OpcoesCompararData.__CaminhoTipo = "Snebur.Utilidade.OpcoesCompararData";
	Snebur.Utilidade.OpcoesCompararHora.__CaminhoTipo = "Snebur.Utilidade.OpcoesCompararHora";
	Snebur.Utilidade.QueryType.__CaminhoTipo = "Snebur.Utilidade.QueryType";
	Snebur.Utilidade.EnumFiltroPropriedadeCampo.__CaminhoTipo = "Snebur.Utilidade.EnumFiltroPropriedadeCampo";
	Snebur.Utilidade.EnumStatusDiretorio.__CaminhoTipo = "Snebur.Utilidade.EnumStatusDiretorio";
	Snebur.Utilidade.EnumDivisorDecimal.__CaminhoTipo = "Snebur.Utilidade.EnumDivisorDecimal";
	Snebur.Utilidade.EnumFormatacaoBytes.__CaminhoTipo = "Snebur.Utilidade.EnumFormatacaoBytes";
	Snebur.Utilidade.EnumTipoSerializacao.__CaminhoTipo = "Snebur.Utilidade.EnumTipoSerializacao";
	
	//BaseDominio
	export const __$tipoBaseDominioSnebur_Dominio_BaseDominio = new Snebur.Reflexao.TipoBaseDominio(Snebur.Dominio.BaseDominio, "BaseDominio", "Snebur.Dominio","Snebur.Dominio.BaseDominio, Snebur",null, true);
	export const __$tipoBaseDominioSnebur_Comunicacao_InfoRequisicao = new Snebur.Reflexao.TipoBaseDominio(Snebur.Comunicacao.InfoRequisicao, "InfoRequisicao", "Snebur.Comunicacao","Snebur.Comunicacao.InfoRequisicao, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, false);
	export const __$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha = new Snebur.Reflexao.TipoBaseDominio(Snebur.Comunicacao.BaseResultadoRecuperarSenha, "BaseResultadoRecuperarSenha", "Snebur.Comunicacao","Snebur.Comunicacao.BaseResultadoRecuperarSenha, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, true);
	export const __$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao = new Snebur.Reflexao.TipoBaseDominio(Snebur.Comunicacao.ResultadoAutenticacao, "ResultadoAutenticacao", "Snebur.Comunicacao","Snebur.Comunicacao.ResultadoAutenticacao, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, false);
	export const __$tipoBaseDominioSnebur_Comunicacao_ResultadoExisteIdentificadoUsuario = new Snebur.Reflexao.TipoBaseDominio(Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario, "ResultadoExisteIdentificadoUsuario", "Snebur.Comunicacao","Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, false);
	export const __$tipoBaseDominioSnebur_Comunicacao_ResultadoAlterarSenha = new Snebur.Reflexao.TipoBaseDominio(Snebur.Comunicacao.ResultadoAlterarSenha, "ResultadoAlterarSenha", "Snebur.Comunicacao","Snebur.Comunicacao.ResultadoAlterarSenha, Snebur",__$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha, false);
	export const __$tipoBaseDominioSnebur_Comunicacao_ResultadoEnviarCodigoRecuperarSenha = new Snebur.Reflexao.TipoBaseDominio(Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha, "ResultadoEnviarCodigoRecuperarSenha", "Snebur.Comunicacao","Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha, Snebur",__$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha, false);
	export const __$tipoBaseDominioSnebur_Comunicacao_ResultadoRecuperarSenha = new Snebur.Reflexao.TipoBaseDominio(Snebur.Comunicacao.ResultadoRecuperarSenha, "ResultadoRecuperarSenha", "Snebur.Comunicacao","Snebur.Comunicacao.ResultadoRecuperarSenha, Snebur",__$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha, false);
	export const __$tipoBaseDominioSnebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha = new Snebur.Reflexao.TipoBaseDominio(Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha, "ResultadoValidarCodigoRecuperarSenha", "Snebur.Comunicacao","Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha, Snebur",__$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha, false);
	export const __$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada = new Snebur.Reflexao.TipoBaseDominio(Snebur.Dominio.PropriedadeAlterada, "PropriedadeAlterada", "Snebur.Dominio","Snebur.Dominio.PropriedadeAlterada, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, false);
	export const __$tipoBaseDominioSnebur_Dominio_InformacaoSessao = new Snebur.Reflexao.TipoBaseDominio(Snebur.Dominio.InformacaoSessao, "InformacaoSessao", "Snebur.Dominio","Snebur.Dominio.InformacaoSessao, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, false);
	export const __$tipoBaseDominioSnebur_Dominio_BaseViewModel = new Snebur.Reflexao.TipoBaseDominio(Snebur.Dominio.BaseViewModel, "BaseViewModel", "Snebur.Dominio","Snebur.Dominio.BaseViewModel, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, true);
	export const __$tipoBaseDominioSnebur_Dominio_NovoUsuario = new Snebur.Reflexao.TipoBaseDominio(Snebur.Dominio.NovoUsuario, "NovoUsuario", "Snebur.Dominio","Snebur.Dominio.NovoUsuario, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, false);
	export const __$tipoBaseDominioSnebur_Dominio_DadosIPInformacao = new Snebur.Reflexao.TipoBaseDominio(Snebur.Dominio.DadosIPInformacao, "DadosIPInformacao", "Snebur.Dominio","Snebur.Dominio.DadosIPInformacao, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, false);
	export const __$tipoBaseDominioSnebur_Dominio_ErroValidacao = new Snebur.Reflexao.TipoBaseDominio(Snebur.Dominio.ErroValidacao, "ErroValidacao", "Snebur.Dominio","Snebur.Dominio.ErroValidacao, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, false);
	export const __$tipoBaseDominioSnebur_Dominio_PropriedadeAlteradaTipoComplexo = new Snebur.Reflexao.TipoBaseDominio(Snebur.Dominio.PropriedadeAlteradaTipoComplexo, "PropriedadeAlteradaTipoComplexo", "Snebur.Dominio","Snebur.Dominio.PropriedadeAlteradaTipoComplexo, Snebur",__$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada, false);
	export const __$tipoBaseDominioSnebur_Dominio_InformacaoSessaoUsuario = new Snebur.Reflexao.TipoBaseDominio(Snebur.Dominio.InformacaoSessaoUsuario, "InformacaoSessaoUsuario", "Snebur.Dominio","Snebur.Dominio.InformacaoSessaoUsuario, Snebur",__$tipoBaseDominioSnebur_Dominio_InformacaoSessao, false);
	export const __$tipoBaseDominioSnebur_Seguranca_Credencial = new Snebur.Reflexao.TipoBaseDominio(Snebur.Seguranca.Credencial, "Credencial", "Snebur.Seguranca","Snebur.Seguranca.Credencial, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, true);
	export const __$tipoBaseDominioSnebur_Seguranca_CredencialServico = new Snebur.Reflexao.TipoBaseDominio(Snebur.Seguranca.CredencialServico, "CredencialServico", "Snebur.Seguranca","Snebur.Seguranca.CredencialServico, Snebur",__$tipoBaseDominioSnebur_Seguranca_Credencial, false);
	export const __$tipoBaseDominioSnebur_Seguranca_CredencialUsuario = new Snebur.Reflexao.TipoBaseDominio(Snebur.Seguranca.CredencialUsuario, "CredencialUsuario", "Snebur.Seguranca","Snebur.Seguranca.CredencialUsuario, Snebur",__$tipoBaseDominioSnebur_Seguranca_Credencial, false);
	export const __$tipoBaseDominioSnebur_Servicos_BaseInformacaoAdicionalServicoCompartilhado = new Snebur.Reflexao.TipoBaseDominio(Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado, "BaseInformacaoAdicionalServicoCompartilhado", "Snebur.Servicos","Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, true);
	
	//ListaBaseDominio
	export const __$tipoListaBaseDominio_Snebur_Dominio_BaseDominio = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_BaseDominio", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.BaseDominio, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_BaseDominio);
	export const __$tipoListaBaseDominio_Snebur_Comunicacao_InfoRequisicao = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_InfoRequisicao", "Snebur.Comunicacao", "System.Collections.Generic.List`1[[Snebur.Comunicacao.InfoRequisicao, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Comunicacao_InfoRequisicao);
	export const __$tipoListaBaseDominio_Snebur_Comunicacao_BaseResultadoRecuperarSenha = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_BaseResultadoRecuperarSenha", "Snebur.Comunicacao", "System.Collections.Generic.List`1[[Snebur.Comunicacao.BaseResultadoRecuperarSenha, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha);
	export const __$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoAutenticacao = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_ResultadoAutenticacao", "Snebur.Comunicacao", "System.Collections.Generic.List`1[[Snebur.Comunicacao.ResultadoAutenticacao, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao);
	export const __$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoExisteIdentificadoUsuario = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_ResultadoExisteIdentificadoUsuario", "Snebur.Comunicacao", "System.Collections.Generic.List`1[[Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Comunicacao_ResultadoExisteIdentificadoUsuario);
	export const __$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoAlterarSenha = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_ResultadoAlterarSenha", "Snebur.Comunicacao", "System.Collections.Generic.List`1[[Snebur.Comunicacao.ResultadoAlterarSenha, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Comunicacao_ResultadoAlterarSenha);
	export const __$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoEnviarCodigoRecuperarSenha = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_ResultadoEnviarCodigoRecuperarSenha", "Snebur.Comunicacao", "System.Collections.Generic.List`1[[Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Comunicacao_ResultadoEnviarCodigoRecuperarSenha);
	export const __$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoRecuperarSenha = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_ResultadoRecuperarSenha", "Snebur.Comunicacao", "System.Collections.Generic.List`1[[Snebur.Comunicacao.ResultadoRecuperarSenha, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Comunicacao_ResultadoRecuperarSenha);
	export const __$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_ResultadoValidarCodigoRecuperarSenha", "Snebur.Comunicacao", "System.Collections.Generic.List`1[[Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha);
	export const __$tipoListaBaseDominio_Snebur_Dominio_PropriedadeAlterada = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_PropriedadeAlterada", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.PropriedadeAlterada, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada);
	export const __$tipoListaBaseDominio_Snebur_Dominio_InformacaoSessao = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_InformacaoSessao", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.InformacaoSessao, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_InformacaoSessao);
	export const __$tipoListaBaseDominio_Snebur_Dominio_BaseViewModel = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_BaseViewModel", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.BaseViewModel, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_BaseViewModel);
	export const __$tipoListaBaseDominio_Snebur_Dominio_NovoUsuario = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_NovoUsuario", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.NovoUsuario, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_NovoUsuario);
	export const __$tipoListaBaseDominio_Snebur_Dominio_DadosIPInformacao = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_DadosIPInformacao", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.DadosIPInformacao, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao);
	export const __$tipoListaBaseDominio_Snebur_Dominio_ErroValidacao = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_ErroValidacao", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.ErroValidacao, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_ErroValidacao);
	export const __$tipoListaBaseDominio_Snebur_Dominio_PropriedadeAlteradaTipoComplexo = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_PropriedadeAlteradaTipoComplexo", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.PropriedadeAlteradaTipoComplexo, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_PropriedadeAlteradaTipoComplexo);
	export const __$tipoListaBaseDominio_Snebur_Dominio_InformacaoSessaoUsuario = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_InformacaoSessaoUsuario", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.InformacaoSessaoUsuario, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_InformacaoSessaoUsuario);
	export const __$tipoListaBaseDominio_Snebur_Seguranca_Credencial = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Credencial", "Snebur.Seguranca", "System.Collections.Generic.List`1[[Snebur.Seguranca.Credencial, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Seguranca_Credencial);
	export const __$tipoListaBaseDominio_Snebur_Seguranca_CredencialServico = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_CredencialServico", "Snebur.Seguranca", "System.Collections.Generic.List`1[[Snebur.Seguranca.CredencialServico, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Seguranca_CredencialServico);
	export const __$tipoListaBaseDominio_Snebur_Seguranca_CredencialUsuario = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_CredencialUsuario", "Snebur.Seguranca", "System.Collections.Generic.List`1[[Snebur.Seguranca.CredencialUsuario, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Seguranca_CredencialUsuario);
	export const __$tipoListaBaseDominio_Snebur_Servicos_BaseInformacaoAdicionalServicoCompartilhado = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_BaseInformacaoAdicionalServicoCompartilhado", "Snebur.Servicos", "System.Collections.Generic.List`1[[Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Servicos_BaseInformacaoAdicionalServicoCompartilhado);
	
	//Adicionar BasesDominio
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.BaseDominio",__$tipoBaseDominioSnebur_Dominio_BaseDominio);
	$Reflexao.Tipos.Adicionar("Snebur.Comunicacao.InfoRequisicao",__$tipoBaseDominioSnebur_Comunicacao_InfoRequisicao);
	$Reflexao.Tipos.Adicionar("Snebur.Comunicacao.BaseResultadoRecuperarSenha",__$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha);
	$Reflexao.Tipos.Adicionar("Snebur.Comunicacao.ResultadoAutenticacao",__$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao);
	$Reflexao.Tipos.Adicionar("Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario",__$tipoBaseDominioSnebur_Comunicacao_ResultadoExisteIdentificadoUsuario);
	$Reflexao.Tipos.Adicionar("Snebur.Comunicacao.ResultadoAlterarSenha",__$tipoBaseDominioSnebur_Comunicacao_ResultadoAlterarSenha);
	$Reflexao.Tipos.Adicionar("Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha",__$tipoBaseDominioSnebur_Comunicacao_ResultadoEnviarCodigoRecuperarSenha);
	$Reflexao.Tipos.Adicionar("Snebur.Comunicacao.ResultadoRecuperarSenha",__$tipoBaseDominioSnebur_Comunicacao_ResultadoRecuperarSenha);
	$Reflexao.Tipos.Adicionar("Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha",__$tipoBaseDominioSnebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.PropriedadeAlterada",__$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.InformacaoSessao",__$tipoBaseDominioSnebur_Dominio_InformacaoSessao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.BaseViewModel",__$tipoBaseDominioSnebur_Dominio_BaseViewModel);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.NovoUsuario",__$tipoBaseDominioSnebur_Dominio_NovoUsuario);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.DadosIPInformacao",__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.ErroValidacao",__$tipoBaseDominioSnebur_Dominio_ErroValidacao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.PropriedadeAlteradaTipoComplexo",__$tipoBaseDominioSnebur_Dominio_PropriedadeAlteradaTipoComplexo);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.InformacaoSessaoUsuario",__$tipoBaseDominioSnebur_Dominio_InformacaoSessaoUsuario);
	$Reflexao.Tipos.Adicionar("Snebur.Seguranca.Credencial",__$tipoBaseDominioSnebur_Seguranca_Credencial);
	$Reflexao.Tipos.Adicionar("Snebur.Seguranca.CredencialServico",__$tipoBaseDominioSnebur_Seguranca_CredencialServico);
	$Reflexao.Tipos.Adicionar("Snebur.Seguranca.CredencialUsuario",__$tipoBaseDominioSnebur_Seguranca_CredencialUsuario);
	$Reflexao.Tipos.Adicionar("Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado",__$tipoBaseDominioSnebur_Servicos_BaseInformacaoAdicionalServicoCompartilhado);
	
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.BaseDominio",__$tipoListaBaseDominio_Snebur_Dominio_BaseDominio);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Comunicacao.InfoRequisicao",__$tipoListaBaseDominio_Snebur_Comunicacao_InfoRequisicao);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Comunicacao.BaseResultadoRecuperarSenha",__$tipoListaBaseDominio_Snebur_Comunicacao_BaseResultadoRecuperarSenha);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Comunicacao.ResultadoAutenticacao",__$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoAutenticacao);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario",__$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoExisteIdentificadoUsuario);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Comunicacao.ResultadoAlterarSenha",__$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoAlterarSenha);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha",__$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoEnviarCodigoRecuperarSenha);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Comunicacao.ResultadoRecuperarSenha",__$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoRecuperarSenha);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha",__$tipoListaBaseDominio_Snebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.PropriedadeAlterada",__$tipoListaBaseDominio_Snebur_Dominio_PropriedadeAlterada);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.InformacaoSessao",__$tipoListaBaseDominio_Snebur_Dominio_InformacaoSessao);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.BaseViewModel",__$tipoListaBaseDominio_Snebur_Dominio_BaseViewModel);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.NovoUsuario",__$tipoListaBaseDominio_Snebur_Dominio_NovoUsuario);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.DadosIPInformacao",__$tipoListaBaseDominio_Snebur_Dominio_DadosIPInformacao);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.ErroValidacao",__$tipoListaBaseDominio_Snebur_Dominio_ErroValidacao);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.PropriedadeAlteradaTipoComplexo",__$tipoListaBaseDominio_Snebur_Dominio_PropriedadeAlteradaTipoComplexo);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.InformacaoSessaoUsuario",__$tipoListaBaseDominio_Snebur_Dominio_InformacaoSessaoUsuario);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Seguranca.Credencial",__$tipoListaBaseDominio_Snebur_Seguranca_Credencial);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Seguranca.CredencialServico",__$tipoListaBaseDominio_Snebur_Seguranca_CredencialServico);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Seguranca.CredencialUsuario",__$tipoListaBaseDominio_Snebur_Seguranca_CredencialUsuario);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado",__$tipoListaBaseDominio_Snebur_Servicos_BaseInformacaoAdicionalServicoCompartilhado);
	
	//Associar caminhos BaseDominio
	
	Snebur.Dominio.BaseDominio.__CaminhoTipo = "Snebur.Dominio.BaseDominio";
	Snebur.Comunicacao.InfoRequisicao.__CaminhoTipo = "Snebur.Comunicacao.InfoRequisicao";
	Snebur.Comunicacao.BaseResultadoRecuperarSenha.__CaminhoTipo = "Snebur.Comunicacao.BaseResultadoRecuperarSenha";
	Snebur.Comunicacao.ResultadoAutenticacao.__CaminhoTipo = "Snebur.Comunicacao.ResultadoAutenticacao";
	Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario.__CaminhoTipo = "Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario";
	Snebur.Comunicacao.ResultadoAlterarSenha.__CaminhoTipo = "Snebur.Comunicacao.ResultadoAlterarSenha";
	Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha.__CaminhoTipo = "Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha";
	Snebur.Comunicacao.ResultadoRecuperarSenha.__CaminhoTipo = "Snebur.Comunicacao.ResultadoRecuperarSenha";
	Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha.__CaminhoTipo = "Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha";
	Snebur.Dominio.PropriedadeAlterada.__CaminhoTipo = "Snebur.Dominio.PropriedadeAlterada";
	Snebur.Dominio.InformacaoSessao.__CaminhoTipo = "Snebur.Dominio.InformacaoSessao";
	Snebur.Dominio.BaseViewModel.__CaminhoTipo = "Snebur.Dominio.BaseViewModel";
	Snebur.Dominio.NovoUsuario.__CaminhoTipo = "Snebur.Dominio.NovoUsuario";
	Snebur.Dominio.DadosIPInformacao.__CaminhoTipo = "Snebur.Dominio.DadosIPInformacao";
	Snebur.Dominio.ErroValidacao.__CaminhoTipo = "Snebur.Dominio.ErroValidacao";
	Snebur.Dominio.PropriedadeAlteradaTipoComplexo.__CaminhoTipo = "Snebur.Dominio.PropriedadeAlteradaTipoComplexo";
	Snebur.Dominio.InformacaoSessaoUsuario.__CaminhoTipo = "Snebur.Dominio.InformacaoSessaoUsuario";
	Snebur.Seguranca.Credencial.__CaminhoTipo = "Snebur.Seguranca.Credencial";
	Snebur.Seguranca.CredencialServico.__CaminhoTipo = "Snebur.Seguranca.CredencialServico";
	Snebur.Seguranca.CredencialUsuario.__CaminhoTipo = "Snebur.Seguranca.CredencialUsuario";
	Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado.__CaminhoTipo = "Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado";
	
	//Atributos
	
	//TiposComplexos
	export const __$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.BaseTipoComplexo, "BaseTipoComplexo", "Snebur.Dominio","Snebur.Dominio.BaseTipoComplexo, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, true);
	export const __$tipoBaseDominioSnebur_Dominio_Cor = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.Cor, "Cor", "Snebur.Dominio","Snebur.Dominio.Cor, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_FiltroImagem = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.FiltroImagem, "FiltroImagem", "Snebur.Dominio","Snebur.Dominio.FiltroImagem, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_BaseListaTipoComplexo = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.BaseListaTipoComplexo, "BaseListaTipoComplexo", "Snebur.Dominio","Snebur.Dominio.BaseListaTipoComplexo`1, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo, true);
	export const __$tipoBaseDominioSnebur_Dominio_Localizacao = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.Localizacao, "Localizacao", "Snebur.Dominio","Snebur.Dominio.Localizacao, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_BaseMedidaTipoComplexo = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.BaseMedidaTipoComplexo, "BaseMedidaTipoComplexo", "Snebur.Dominio","Snebur.Dominio.BaseMedidaTipoComplexo, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo, true);
	export const __$tipoBaseDominioSnebur_Dominio_Navegador = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.Navegador, "Navegador", "Snebur.Dominio","Snebur.Dominio.Navegador, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_PrazoTempo = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.PrazoTempo, "PrazoTempo", "Snebur.Dominio","Snebur.Dominio.PrazoTempo, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_RedeSociais = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.RedeSociais, "RedeSociais", "Snebur.Dominio","Snebur.Dominio.RedeSociais, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_SistemaOperacional = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.SistemaOperacional, "SistemaOperacional", "Snebur.Dominio","Snebur.Dominio.SistemaOperacional, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_ListaDouble = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.ListaDouble, "ListaDouble", "Snebur.Dominio","Snebur.Dominio.ListaDouble, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseListaTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_ListaInt32 = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.ListaInt32, "ListaInt32", "Snebur.Dominio","Snebur.Dominio.ListaInt32, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseListaTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_ListaString = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.ListaString, "ListaString", "Snebur.Dominio","Snebur.Dominio.ListaString, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseListaTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_Area = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.Area, "Area", "Snebur.Dominio","Snebur.Dominio.Area, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseMedidaTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_Borda = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.Borda, "Borda", "Snebur.Dominio","Snebur.Dominio.Borda, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseMedidaTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_Dimensao = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.Dimensao, "Dimensao", "Snebur.Dominio","Snebur.Dominio.Dimensao, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseMedidaTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_Margem = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.Margem, "Margem", "Snebur.Dominio","Snebur.Dominio.Margem, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseMedidaTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_Posicao = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.Posicao, "Posicao", "Snebur.Dominio","Snebur.Dominio.Posicao, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseMedidaTipoComplexo, false);
	export const __$tipoBaseDominioSnebur_Dominio_Regiao = new Snebur.Reflexao.TipoComplexo(Snebur.Dominio.Regiao, "Regiao", "Snebur.Dominio","Snebur.Dominio.Regiao, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseMedidaTipoComplexo, false);
	
	//ListaBaseDominio TipoComplexo
	export const __$tipoListaBaseDominio_Snebur_Dominio_BaseTipoComplexo = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_BaseTipoComplexo", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.BaseTipoComplexo, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo);
	export const __$tipoListaBaseDominio_Snebur_Dominio_Cor = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Cor", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.Cor, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_Cor);
	export const __$tipoListaBaseDominio_Snebur_Dominio_FiltroImagem = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_FiltroImagem", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.FiltroImagem, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_FiltroImagem);
	export const __$tipoListaBaseDominio_Snebur_Dominio_Localizacao = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Localizacao", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.Localizacao, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_Localizacao);
	export const __$tipoListaBaseDominio_Snebur_Dominio_BaseMedidaTipoComplexo = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_BaseMedidaTipoComplexo", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.BaseMedidaTipoComplexo, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_BaseMedidaTipoComplexo);
	export const __$tipoListaBaseDominio_Snebur_Dominio_Navegador = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Navegador", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.Navegador, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_Navegador);
	export const __$tipoListaBaseDominio_Snebur_Dominio_PrazoTempo = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_PrazoTempo", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.PrazoTempo, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_PrazoTempo);
	export const __$tipoListaBaseDominio_Snebur_Dominio_RedeSociais = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_RedeSociais", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.RedeSociais, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_RedeSociais);
	export const __$tipoListaBaseDominio_Snebur_Dominio_SistemaOperacional = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_SistemaOperacional", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.SistemaOperacional, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_SistemaOperacional);
	export const __$tipoListaBaseDominio_Snebur_Dominio_ListaDouble = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_ListaDouble", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.ListaDouble, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_ListaDouble);
	export const __$tipoListaBaseDominio_Snebur_Dominio_ListaInt32 = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_ListaInt32", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.ListaInt32, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_ListaInt32);
	export const __$tipoListaBaseDominio_Snebur_Dominio_ListaString = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_ListaString", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.ListaString, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_ListaString);
	export const __$tipoListaBaseDominio_Snebur_Dominio_Area = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Area", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.Area, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_Area);
	export const __$tipoListaBaseDominio_Snebur_Dominio_Borda = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Borda", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.Borda, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_Borda);
	export const __$tipoListaBaseDominio_Snebur_Dominio_Dimensao = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Dimensao", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.Dimensao, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_Dimensao);
	export const __$tipoListaBaseDominio_Snebur_Dominio_Margem = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Margem", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.Margem, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_Margem);
	export const __$tipoListaBaseDominio_Snebur_Dominio_Posicao = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Posicao", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.Posicao, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_Posicao);
	export const __$tipoListaBaseDominio_Snebur_Dominio_Regiao = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Regiao", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.Regiao, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_Regiao);
	
	//Adicionar TiposComplexos
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.BaseTipoComplexo",__$tipoBaseDominioSnebur_Dominio_BaseTipoComplexo);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Cor",__$tipoBaseDominioSnebur_Dominio_Cor);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.FiltroImagem",__$tipoBaseDominioSnebur_Dominio_FiltroImagem);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.BaseListaTipoComplexo",__$tipoBaseDominioSnebur_Dominio_BaseListaTipoComplexo);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Localizacao",__$tipoBaseDominioSnebur_Dominio_Localizacao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.BaseMedidaTipoComplexo",__$tipoBaseDominioSnebur_Dominio_BaseMedidaTipoComplexo);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Navegador",__$tipoBaseDominioSnebur_Dominio_Navegador);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.PrazoTempo",__$tipoBaseDominioSnebur_Dominio_PrazoTempo);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.RedeSociais",__$tipoBaseDominioSnebur_Dominio_RedeSociais);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.SistemaOperacional",__$tipoBaseDominioSnebur_Dominio_SistemaOperacional);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.ListaDouble",__$tipoBaseDominioSnebur_Dominio_ListaDouble);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.ListaInt32",__$tipoBaseDominioSnebur_Dominio_ListaInt32);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.ListaString",__$tipoBaseDominioSnebur_Dominio_ListaString);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Area",__$tipoBaseDominioSnebur_Dominio_Area);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Borda",__$tipoBaseDominioSnebur_Dominio_Borda);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Dimensao",__$tipoBaseDominioSnebur_Dominio_Dimensao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Margem",__$tipoBaseDominioSnebur_Dominio_Margem);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Posicao",__$tipoBaseDominioSnebur_Dominio_Posicao);
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Regiao",__$tipoBaseDominioSnebur_Dominio_Regiao);
	
	//Adicionar ListaBaseDominio TiposComplexos
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.BaseTipoComplexo",__$tipoListaBaseDominio_Snebur_Dominio_BaseTipoComplexo);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.Cor",__$tipoListaBaseDominio_Snebur_Dominio_Cor);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.FiltroImagem",__$tipoListaBaseDominio_Snebur_Dominio_FiltroImagem);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.Localizacao",__$tipoListaBaseDominio_Snebur_Dominio_Localizacao);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.BaseMedidaTipoComplexo",__$tipoListaBaseDominio_Snebur_Dominio_BaseMedidaTipoComplexo);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.Navegador",__$tipoListaBaseDominio_Snebur_Dominio_Navegador);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.PrazoTempo",__$tipoListaBaseDominio_Snebur_Dominio_PrazoTempo);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.RedeSociais",__$tipoListaBaseDominio_Snebur_Dominio_RedeSociais);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.SistemaOperacional",__$tipoListaBaseDominio_Snebur_Dominio_SistemaOperacional);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.ListaDouble",__$tipoListaBaseDominio_Snebur_Dominio_ListaDouble);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.ListaInt32",__$tipoListaBaseDominio_Snebur_Dominio_ListaInt32);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.ListaString",__$tipoListaBaseDominio_Snebur_Dominio_ListaString);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.Area",__$tipoListaBaseDominio_Snebur_Dominio_Area);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.Borda",__$tipoListaBaseDominio_Snebur_Dominio_Borda);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.Dimensao",__$tipoListaBaseDominio_Snebur_Dominio_Dimensao);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.Margem",__$tipoListaBaseDominio_Snebur_Dominio_Margem);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.Posicao",__$tipoListaBaseDominio_Snebur_Dominio_Posicao);
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.Regiao",__$tipoListaBaseDominio_Snebur_Dominio_Regiao);
	
	//Associar caminhos TiposComplexos
	
	Snebur.Dominio.BaseTipoComplexo.__CaminhoTipo = "Snebur.Dominio.BaseTipoComplexo";
	Snebur.Dominio.Cor.__CaminhoTipo = "Snebur.Dominio.Cor";
	Snebur.Dominio.FiltroImagem.__CaminhoTipo = "Snebur.Dominio.FiltroImagem";
	Snebur.Dominio.BaseListaTipoComplexo.__CaminhoTipo = "Snebur.Dominio.BaseListaTipoComplexo";
	Snebur.Dominio.Localizacao.__CaminhoTipo = "Snebur.Dominio.Localizacao";
	Snebur.Dominio.BaseMedidaTipoComplexo.__CaminhoTipo = "Snebur.Dominio.BaseMedidaTipoComplexo";
	Snebur.Dominio.Navegador.__CaminhoTipo = "Snebur.Dominio.Navegador";
	Snebur.Dominio.PrazoTempo.__CaminhoTipo = "Snebur.Dominio.PrazoTempo";
	Snebur.Dominio.RedeSociais.__CaminhoTipo = "Snebur.Dominio.RedeSociais";
	Snebur.Dominio.SistemaOperacional.__CaminhoTipo = "Snebur.Dominio.SistemaOperacional";
	Snebur.Dominio.ListaDouble.__CaminhoTipo = "Snebur.Dominio.ListaDouble";
	Snebur.Dominio.ListaInt32.__CaminhoTipo = "Snebur.Dominio.ListaInt32";
	Snebur.Dominio.ListaString.__CaminhoTipo = "Snebur.Dominio.ListaString";
	Snebur.Dominio.Area.__CaminhoTipo = "Snebur.Dominio.Area";
	Snebur.Dominio.Borda.__CaminhoTipo = "Snebur.Dominio.Borda";
	Snebur.Dominio.Dimensao.__CaminhoTipo = "Snebur.Dominio.Dimensao";
	Snebur.Dominio.Margem.__CaminhoTipo = "Snebur.Dominio.Margem";
	Snebur.Dominio.Posicao.__CaminhoTipo = "Snebur.Dominio.Posicao";
	Snebur.Dominio.Regiao.__CaminhoTipo = "Snebur.Dominio.Regiao";
	
	//Atributos TiposComplexos
	
	//BaseEntidades
	export const __$tipoBaseDominioSnebur_Dominio_Entidade = new Snebur.Reflexao.TipoEntidade(Snebur.Dominio.Entidade, "Entidade", "Snebur.Dominio","Snebur.Dominio.Entidade, Snebur",__$tipoBaseDominioSnebur_Dominio_BaseDominio, true, false, false);
	
	//ListaBaseDominio TipoEntidade
	export const __$tipoListaBaseDominio_Snebur_Dominio_Entidade = new Snebur.Reflexao.TipoListaBaseDominio("ListaTipoBaseDominio_Entidade", "Snebur.Dominio", "System.Collections.Generic.List`1[[Snebur.Dominio.Entidade, Snebur]], mscorlib",__$tipoBaseDominioSnebur_Dominio_Entidade);
	
	//ListaBaseEntidades
	export const __$tipoListaEntidade_Snebur_Dominio_Entidade = new Snebur.Reflexao.TipoListaEntidade("ListaTipoEntidade_Entidade", "Snebur.Dominio", "Snebur.Dominio.ListaEntidades`1[[Snebur.Dominio.Entidade, Snebur]], Snebur",__$tipoBaseDominioSnebur_Dominio_Entidade);
	
	//Adicionar BaseEntidades
	$Reflexao.Tipos.Adicionar("Snebur.Dominio.Entidade",__$tipoBaseDominioSnebur_Dominio_Entidade);
	
	//Adicionar ListaBaseDominio TipoEntidade
	$Reflexao.Tipos.Adicionar("ListaTipoBaseDominio_Snebur.Dominio.Entidade",__$tipoListaBaseDominio_Snebur_Dominio_Entidade);
	
	//Adicionar ListaBaseEntidades
	$Reflexao.Tipos.Adicionar("ListaTipoEntidade_Snebur.Dominio.Entidade",__$tipoListaEntidade_Snebur_Dominio_Entidade);
	
	//Associar caminhos BaseEntidades
	
	Snebur.Dominio.Entidade.__CaminhoTipo = "Snebur.Dominio.Entidade";
	
	//Atributos TipoEntidade
	
	Snebur.Dominio.Atributos.ValidacaoCredencialAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoCredencialAttribute";
	Snebur.Dominio.Atributos.ValidacaoIdenticadorUsuarioAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoIdenticadorUsuarioAttribute";
	Snebur.Dominio.Atributos.ValidacaoUnicoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoUnicoAttribute";
	Snebur.Dominio.Atributos.ValidacaoUnicoCompostaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoUnicoCompostaAttribute";
	Snebur.Dominio.Atributos.BaseAtributoValidacao.__CaminhoTipo = "Snebur.Dominio.Atributos.BaseAtributoValidacao";
	Snebur.Dominio.Atributos.ValidacaoBase36Attribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoBase36Attribute";
	Snebur.Dominio.Atributos.ValidacaoCepAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoCepAttribute";
	Snebur.Dominio.Atributos.ValidacaoCnpjAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoCnpjAttribute";
	Snebur.Dominio.Atributos.ValidacaoComparacaoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoComparacaoAttribute";
	Snebur.Dominio.Atributos.ValidacaoConfirmacaoSenhaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoConfirmacaoSenhaAttribute";
	Snebur.Dominio.Atributos.ValidacaoCpfAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoCpfAttribute";
	Snebur.Dominio.Atributos.ValidacaoCpfOuCnpjAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoCpfOuCnpjAttribute";
	Snebur.Dominio.Atributos.ValidacaoDataAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoDataAttribute";
	Snebur.Dominio.Atributos.ValidacaoDataExpiracaoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoDataExpiracaoAttribute";
	Snebur.Dominio.Atributos.ValidacaoDataNascimentoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoDataNascimentoAttribute";
	Snebur.Dominio.Atributos.ValidacaoDataPublicacaoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoDataPublicacaoAttribute";
	Snebur.Dominio.Atributos.ValidacaoDominioAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoDominioAttribute";
	Snebur.Dominio.Atributos.ValidacaoDominioDNSAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoDominioDNSAttribute";
	Snebur.Dominio.Atributos.ValidacaoEmailAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoEmailAttribute";
	Snebur.Dominio.Atributos.ValidacaoEmailOuTelefoneAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoEmailOuTelefoneAttribute";
	Snebur.Dominio.Atributos.ValidacaoExpressaoRegularAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoExpressaoRegularAttribute";
	Snebur.Dominio.Atributos.ValidacaoFlagsEnumRequeridoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoFlagsEnumRequeridoAttribute";
	Snebur.Dominio.Atributos.ValidacaoGuidAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoGuidAttribute";
	Snebur.Dominio.Atributos.ValidacaoIndentificador.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoIndentificador";
	Snebur.Dominio.Atributos.ValidacaoInteiroAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoInteiroAttribute";
	Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute";
	Snebur.Dominio.Atributos.ValidacaoIPAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoIPAttribute";
	Snebur.Dominio.Atributos.ValidacaoLongoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoLongoAttribute";
	Snebur.Dominio.Atributos.ValidacaoMdr5Attribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoMdr5Attribute";
	Snebur.Dominio.Atributos.ValidacaoMoedaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoMoedaAttribute";
	Snebur.Dominio.Atributos.ValidacaoNomeCompletoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoNomeCompletoAttribute";
	Snebur.Dominio.Atributos.ValidacaoPalavraTamanhoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoPalavraTamanhoAttribute";
	Snebur.Dominio.Atributos.ValidacaoPrimeiroNomeAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoPrimeiroNomeAttribute";
	Snebur.Dominio.Atributos.ValidacaoRequeridoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoRequeridoAttribute";
	Snebur.Dominio.Atributos.ValidacaoRequeridoDebugAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoRequeridoDebugAttribute";
	Snebur.Dominio.Atributos.ValidacaoRotaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoRotaAttribute";
	Snebur.Dominio.Atributos.ValidacaoSenhaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoSenhaAttribute";
	Snebur.Dominio.Atributos.ValidacaoSubDominio.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoSubDominio";
	Snebur.Dominio.Atributos.ValidacaoTelefoneAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoTelefoneAttribute";
	Snebur.Dominio.Atributos.ValidacaoTextoSomentoNumerosAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoTextoSomentoNumerosAttribute";
	Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute";
	Snebur.Dominio.Atributos.ValidacaoUFAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoUFAttribute";
	Snebur.Dominio.Atributos.ValidacaoUrlAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoUrlAttribute";
	Snebur.Dominio.Atributos.ValidacaoVersaoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValidacaoVersaoAttribute";
	Snebur.Dominio.Atributos.BaseValidacaoEntidadeAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.BaseValidacaoEntidadeAttribute";
	Snebur.Dominio.Atributos.ChaveEstrangeiraExternaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ChaveEstrangeiraExternaAttribute";
	Snebur.Dominio.Atributos.ChaveEstrangeiraRelacaoUmUmAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ChaveEstrangeiraRelacaoUmUmAttribute";
	Snebur.Dominio.Atributos.ChavePrimariaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ChavePrimariaAttribute";
	Snebur.Dominio.Atributos.IgnorarValidacaoTipoComplexo.__CaminhoTipo = "Snebur.Dominio.Atributos.IgnorarValidacaoTipoComplexo";
	Snebur.Dominio.Atributos.NotificarAlteracaoPropriedadeAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.NotificarAlteracaoPropriedadeAttribute";
	Snebur.Dominio.Atributos.NotificarAlteracaoPropriedadeGenericaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.NotificarAlteracaoPropriedadeGenericaAttribute";
	Snebur.Dominio.Atributos.NotificarTodasAlteracoesPropriedadeGenericaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.NotificarTodasAlteracoesPropriedadeGenericaAttribute";
	Snebur.Dominio.Atributos.BasePropriedadeComputadaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.BasePropriedadeComputadaAttribute";
	Snebur.Dominio.Atributos.PropriedadeComputadaBancoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.PropriedadeComputadaBancoAttribute";
	Snebur.Dominio.Atributos.SomenteLeituraAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.SomenteLeituraAttribute";
	Snebur.Dominio.Atributos.PropriedadeDescricaoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.PropriedadeDescricaoAttribute";
	Snebur.Dominio.Atributos.PropriedadeIdentificadorProprietarioAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.PropriedadeIdentificadorProprietarioAttribute";
	Snebur.Dominio.Atributos.RotuloAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.RotuloAttribute";
	Snebur.Dominio.Atributos.EnumTSString.__CaminhoTipo = "Snebur.Dominio.Atributos.EnumTSString";
	Snebur.Dominio.Atributos.PropriedadeTSEspecializadaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.PropriedadeTSEspecializadaAttribute";
	Snebur.Dominio.Atributos.ValorEnumStringAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValorEnumStringAttribute";
	Snebur.Dominio.Atributos.BaseRelacaoAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.BaseRelacaoAttribute";
	Snebur.Dominio.Atributos.ValorPadraoDataHoraServidorAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValorPadraoDataHoraServidorAttribute";
	Snebur.Dominio.Atributos.ValorPadraoIPAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ValorPadraoIPAttribute";
	Snebur.Dominio.Atributos.RelacaoChaveEstrangeiraAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.RelacaoChaveEstrangeiraAttribute";
	Snebur.Dominio.Atributos.RelacaoFilhosAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.RelacaoFilhosAttribute";
	Snebur.Dominio.Atributos.RelacaoNnAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.RelacaoNnAttribute";
	Snebur.Dominio.Atributos.RelacaoPaiAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.RelacaoPaiAttribute";
	Snebur.Dominio.Atributos.RelacaoUmUmAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.RelacaoUmUmAttribute";
	Snebur.Dominio.Atributos.RelacaoUmUmReversaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.RelacaoUmUmReversaAttribute";
	Snebur.Dominio.Atributos.ChaveEstrangeiraAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.ChaveEstrangeiraAttribute";
	Snebur.Dominio.Atributos.OcultarColunaAttribute.__CaminhoTipo = "Snebur.Dominio.Atributos.OcultarColunaAttribute";
	
	export const __$propriedade_Snebur_Dominio_BaseDominio___PropriedadesAlteradas = new Snebur.Reflexao.Propriedade("__PropriedadesAlteradas",  new Snebur.Reflexao.TipoDicionario(__$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada), __$tipoBaseDominioSnebur_Dominio_BaseDominio, true);
	__$propriedade_Snebur_Dominio_BaseDominio___PropriedadesAlteradas.Atributos.Add(new Snebur.Dominio.Atributos.OcultarColunaAttribute());
	__$propriedade_Snebur_Dominio_BaseDominio___PropriedadesAlteradas.Atributos.Add(new Snebur.Dominio.Atributos.SomenteLeituraAttribute());
	
	__$tipoBaseDominioSnebur_Dominio_BaseDominio.Propriedades.Add(__$propriedade_Snebur_Dominio_BaseDominio___PropriedadesAlteradas);
	
	export const __$propriedade_Snebur_Comunicacao_InfoRequisicao_UserAgent = new Snebur.Reflexao.Propriedade("UserAgent", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Comunicacao_InfoRequisicao, true);
	
	export const __$propriedade_Snebur_Comunicacao_InfoRequisicao_IpRequisicao = new Snebur.Reflexao.Propriedade("IpRequisicao", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Comunicacao_InfoRequisicao, true);
	
	export const __$propriedade_Snebur_Comunicacao_InfoRequisicao_CredencialUsuario = new Snebur.Reflexao.Propriedade("CredencialUsuario", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Comunicacao_InfoRequisicao, true);
	
	__$tipoBaseDominioSnebur_Comunicacao_InfoRequisicao.Propriedades.Add(__$propriedade_Snebur_Comunicacao_InfoRequisicao_UserAgent);
	__$tipoBaseDominioSnebur_Comunicacao_InfoRequisicao.Propriedades.Add(__$propriedade_Snebur_Comunicacao_InfoRequisicao_IpRequisicao);
	__$tipoBaseDominioSnebur_Comunicacao_InfoRequisicao.Propriedades.Add(__$propriedade_Snebur_Comunicacao_InfoRequisicao_CredencialUsuario);
	
	export const __$propriedade_Snebur_Comunicacao_BaseResultadoRecuperarSenha_IsSucesso = new Snebur.Reflexao.Propriedade("IsSucesso", __$tipoTipoPrimario_Boolean, __$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha, false);
	
	export const __$propriedade_Snebur_Comunicacao_BaseResultadoRecuperarSenha_LimiteTentantivaAtingido = new Snebur.Reflexao.Propriedade("LimiteTentantivaAtingido", __$tipoTipoPrimario_Integer, __$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha, false);
	
	export const __$propriedade_Snebur_Comunicacao_BaseResultadoRecuperarSenha_TempoRestante = new Snebur.Reflexao.Propriedade("TempoRestante", __$tipoTipoPrimario_Integer, __$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha, false);
	
	export const __$propriedade_Snebur_Comunicacao_BaseResultadoRecuperarSenha_MensagemErro = new Snebur.Reflexao.Propriedade("MensagemErro", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha, true);
	
	__$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha.Propriedades.Add(__$propriedade_Snebur_Comunicacao_BaseResultadoRecuperarSenha_IsSucesso);
	__$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha.Propriedades.Add(__$propriedade_Snebur_Comunicacao_BaseResultadoRecuperarSenha_LimiteTentantivaAtingido);
	__$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha.Propriedades.Add(__$propriedade_Snebur_Comunicacao_BaseResultadoRecuperarSenha_TempoRestante);
	__$tipoBaseDominioSnebur_Comunicacao_BaseResultadoRecuperarSenha.Propriedades.Add(__$propriedade_Snebur_Comunicacao_BaseResultadoRecuperarSenha_MensagemErro);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoAutenticacao_IsSucesso = new Snebur.Reflexao.Propriedade("IsSucesso", __$tipoTipoPrimario_Boolean, __$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao, false);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoAutenticacao_Resultado = new Snebur.Reflexao.Propriedade("Resultado", __$tipoEnum_Snebur_Dominio_EnumResultadoAutenticacao, __$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao, false);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoAutenticacao_IsAlterarSenhaProximoAcesso = new Snebur.Reflexao.Propriedade("IsAlterarSenhaProximoAcesso", __$tipoTipoPrimario_Boolean, __$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao, false);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoAutenticacao_TempoEsperar = new Snebur.Reflexao.Propriedade("TempoEsperar", __$tipoTipoPrimario_Integer, __$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao, false);
	
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoAutenticacao_IsSucesso);
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoAutenticacao_Resultado);
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoAutenticacao_IsAlterarSenhaProximoAcesso);
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoAutenticacao.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoAutenticacao_TempoEsperar);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoExisteIdentificadoUsuario_Nome = new Snebur.Reflexao.Propriedade("Nome", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Comunicacao_ResultadoExisteIdentificadoUsuario, true);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoExisteIdentificadoUsuario_IsExiste = new Snebur.Reflexao.Propriedade("IsExiste", __$tipoTipoPrimario_Boolean, __$tipoBaseDominioSnebur_Comunicacao_ResultadoExisteIdentificadoUsuario, false);
	
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoExisteIdentificadoUsuario.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoExisteIdentificadoUsuario_Nome);
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoExisteIdentificadoUsuario.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoExisteIdentificadoUsuario_IsExiste);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoRecuperarSenha_IsUsuarioEncontrado = new Snebur.Reflexao.Propriedade("IsUsuarioEncontrado", __$tipoTipoPrimario_Boolean, __$tipoBaseDominioSnebur_Comunicacao_ResultadoRecuperarSenha, false);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoRecuperarSenha_Status = new Snebur.Reflexao.Propriedade("Status", __$tipoEnum_Snebur_Dominio_EnumStatusCodigoRecuperarSenha, __$tipoBaseDominioSnebur_Comunicacao_ResultadoRecuperarSenha, false);
	
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoRecuperarSenha.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoRecuperarSenha_IsUsuarioEncontrado);
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoRecuperarSenha.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoRecuperarSenha_Status);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha_IsUsuarioEncontrado = new Snebur.Reflexao.Propriedade("IsUsuarioEncontrado", __$tipoTipoPrimario_Boolean, __$tipoBaseDominioSnebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha, false);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha_Status = new Snebur.Reflexao.Propriedade("Status", __$tipoEnum_Snebur_Dominio_EnumStatusCodigoRecuperarSenha, __$tipoBaseDominioSnebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha, false);
	
	export const __$propriedade_Snebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha_TempoEsperar = new Snebur.Reflexao.Propriedade("TempoEsperar", __$tipoTipoPrimario_Integer, __$tipoBaseDominioSnebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha, false);
	
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha_IsUsuarioEncontrado);
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha_Status);
	__$tipoBaseDominioSnebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha.Propriedades.Add(__$propriedade_Snebur_Comunicacao_ResultadoValidarCodigoRecuperarSenha_TempoEsperar);
	
	export const __$propriedade_Snebur_Dominio_Entidade_Id = new Snebur.Reflexao.Propriedade("Id", __$tipoTipoPrimario_Long, __$tipoBaseDominioSnebur_Dominio_Entidade, false);
	__$propriedade_Snebur_Dominio_Entidade_Id.Atributos.Add(new Snebur.Dominio.Atributos.OcultarColunaAttribute());
	
	export const __$propriedade_Snebur_Dominio_Entidade___NomeTipoEntidade = new Snebur.Reflexao.Propriedade("__NomeTipoEntidade", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_Entidade, true);
	__$propriedade_Snebur_Dominio_Entidade___NomeTipoEntidade.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	__$propriedade_Snebur_Dominio_Entidade___NomeTipoEntidade.Atributos.Add(new Snebur.Dominio.Atributos.OcultarColunaAttribute());
	__$propriedade_Snebur_Dominio_Entidade___NomeTipoEntidade.Atributos.Add(new Snebur.Dominio.Atributos.SomenteLeituraAttribute());
	
	__$tipoBaseDominioSnebur_Dominio_Entidade.PropriedadeChavePrimaria = __$propriedade_Snebur_Dominio_Entidade_Id;
	
	__$tipoBaseDominioSnebur_Dominio_Entidade.Propriedades.Add(__$propriedade_Snebur_Dominio_Entidade_Id);
	__$tipoBaseDominioSnebur_Dominio_Entidade.Propriedades.Add(__$propriedade_Snebur_Dominio_Entidade___NomeTipoEntidade);
	
	export const __$propriedade_Snebur_Dominio_PropriedadeAlterada_NomePropriedade = new Snebur.Reflexao.Propriedade("NomePropriedade", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada, true);
	
	export const __$propriedade_Snebur_Dominio_PropriedadeAlterada_AntigoValor = new Snebur.Reflexao.Propriedade("AntigoValor", __$tipoTipoPrimario_Object, __$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada, true);
	
	export const __$propriedade_Snebur_Dominio_PropriedadeAlterada_NovoValor = new Snebur.Reflexao.Propriedade("NovoValor", __$tipoTipoPrimario_Object, __$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada, true);
	
	__$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada.Propriedades.Add(__$propriedade_Snebur_Dominio_PropriedadeAlterada_NomePropriedade);
	__$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada.Propriedades.Add(__$propriedade_Snebur_Dominio_PropriedadeAlterada_AntigoValor);
	__$tipoBaseDominioSnebur_Dominio_PropriedadeAlterada.Propriedades.Add(__$propriedade_Snebur_Dominio_PropriedadeAlterada_NovoValor);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_IdentificadorAplicacaoGuid = new Snebur.Reflexao.Propriedade("IdentificadorAplicacaoGuid", __$tipoTipoPrimario_Guid, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, false);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_IdentificadorAplicacao = new Snebur.Reflexao.Propriedade("IdentificadorAplicacao", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, true);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_Cultura = new Snebur.Reflexao.Propriedade("Cultura", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, true);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_Idioma = new Snebur.Reflexao.Propriedade("Idioma", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, true);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_Plataforma = new Snebur.Reflexao.Propriedade("Plataforma", __$tipoEnum_Snebur_Dominio_EnumPlataforma, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, false);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_TipoAplicacao = new Snebur.Reflexao.Propriedade("TipoAplicacao", __$tipoEnum_Snebur_Dominio_EnumTipoAplicacao, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, false);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_Resolucao = new Snebur.Reflexao.Propriedade("Resolucao", __$tipoBaseDominioSnebur_Dominio_Dimensao, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, true);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_UserAgent = new Snebur.Reflexao.Propriedade("UserAgent", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, true);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_Navegador = new Snebur.Reflexao.Propriedade("Navegador", __$tipoBaseDominioSnebur_Dominio_Navegador, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, true);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_SistemaOperacional = new Snebur.Reflexao.Propriedade("SistemaOperacional", __$tipoBaseDominioSnebur_Dominio_SistemaOperacional, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, true);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_VersaoAplicacao = new Snebur.Reflexao.Propriedade("VersaoAplicacao", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, true);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessao_NomeComputador = new Snebur.Reflexao.Propriedade("NomeComputador", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_InformacaoSessao, true);
	
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_IdentificadorAplicacaoGuid);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_IdentificadorAplicacao);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_Cultura);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_Idioma);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_Plataforma);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_TipoAplicacao);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_Resolucao);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_UserAgent);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_Navegador);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_SistemaOperacional);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_VersaoAplicacao);
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessao.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessao_NomeComputador);
	
	export const __$propriedade_Snebur_Dominio_NovoUsuario_Nome = new Snebur.Reflexao.Propriedade("Nome", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_NovoUsuario, true);
	__$propriedade_Snebur_Dominio_NovoUsuario_Nome.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoRequeridoAttribute(null,null,false,null));
	__$propriedade_Snebur_Dominio_NovoUsuario_Nome.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_NovoUsuario_Email = new Snebur.Reflexao.Propriedade("Email", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_NovoUsuario, true);
	__$propriedade_Snebur_Dominio_NovoUsuario_Email.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoRequeridoAttribute(null,null,false,null));
	__$propriedade_Snebur_Dominio_NovoUsuario_Email.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoEmailAttribute());
	
	export const __$propriedade_Snebur_Dominio_NovoUsuario_Telefone = new Snebur.Reflexao.Propriedade("Telefone", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_NovoUsuario, true);
	__$propriedade_Snebur_Dominio_NovoUsuario_Telefone.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoRequeridoAttribute(null,null,false,null));
	__$propriedade_Snebur_Dominio_NovoUsuario_Telefone.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTelefoneAttribute());
	
	export const __$propriedade_Snebur_Dominio_NovoUsuario_Senha = new Snebur.Reflexao.Propriedade("Senha", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_NovoUsuario, true);
	__$propriedade_Snebur_Dominio_NovoUsuario_Senha.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoRequeridoAttribute(null,null,false,null));
	__$propriedade_Snebur_Dominio_NovoUsuario_Senha.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoSenhaAttribute(4,36));
	
	__$tipoBaseDominioSnebur_Dominio_NovoUsuario.Propriedades.Add(__$propriedade_Snebur_Dominio_NovoUsuario_Nome);
	__$tipoBaseDominioSnebur_Dominio_NovoUsuario.Propriedades.Add(__$propriedade_Snebur_Dominio_NovoUsuario_Email);
	__$tipoBaseDominioSnebur_Dominio_NovoUsuario.Propriedades.Add(__$propriedade_Snebur_Dominio_NovoUsuario_Telefone);
	__$tipoBaseDominioSnebur_Dominio_NovoUsuario.Propriedades.Add(__$propriedade_Snebur_Dominio_NovoUsuario_Senha);
	
	export const __$propriedade_Snebur_Dominio_DadosIPInformacao_IP = new Snebur.Reflexao.Propriedade("IP", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_DadosIPInformacao, true);
	
	export const __$propriedade_Snebur_Dominio_DadosIPInformacao_MascaraIp4 = new Snebur.Reflexao.Propriedade("MascaraIp4", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_DadosIPInformacao, true);
	
	export const __$propriedade_Snebur_Dominio_DadosIPInformacao_Cidade = new Snebur.Reflexao.Propriedade("Cidade", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_DadosIPInformacao, true);
	
	export const __$propriedade_Snebur_Dominio_DadosIPInformacao_CodigoPostal = new Snebur.Reflexao.Propriedade("CodigoPostal", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_DadosIPInformacao, true);
	
	export const __$propriedade_Snebur_Dominio_DadosIPInformacao_Hostname = new Snebur.Reflexao.Propriedade("Hostname", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_DadosIPInformacao, true);
	
	export const __$propriedade_Snebur_Dominio_DadosIPInformacao_Localizacao = new Snebur.Reflexao.Propriedade("Localizacao", __$tipoBaseDominioSnebur_Dominio_Localizacao, __$tipoBaseDominioSnebur_Dominio_DadosIPInformacao, true);
	
	export const __$propriedade_Snebur_Dominio_DadosIPInformacao_Pais = new Snebur.Reflexao.Propriedade("Pais", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_DadosIPInformacao, true);
	
	export const __$propriedade_Snebur_Dominio_DadosIPInformacao_ProvedorInternet = new Snebur.Reflexao.Propriedade("ProvedorInternet", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_DadosIPInformacao, true);
	
	export const __$propriedade_Snebur_Dominio_DadosIPInformacao_Regiao = new Snebur.Reflexao.Propriedade("Regiao", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_DadosIPInformacao, true);
	
	__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao.Propriedades.Add(__$propriedade_Snebur_Dominio_DadosIPInformacao_IP);
	__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao.Propriedades.Add(__$propriedade_Snebur_Dominio_DadosIPInformacao_MascaraIp4);
	__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao.Propriedades.Add(__$propriedade_Snebur_Dominio_DadosIPInformacao_Cidade);
	__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao.Propriedades.Add(__$propriedade_Snebur_Dominio_DadosIPInformacao_CodigoPostal);
	__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao.Propriedades.Add(__$propriedade_Snebur_Dominio_DadosIPInformacao_Hostname);
	__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao.Propriedades.Add(__$propriedade_Snebur_Dominio_DadosIPInformacao_Localizacao);
	__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao.Propriedades.Add(__$propriedade_Snebur_Dominio_DadosIPInformacao_Pais);
	__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao.Propriedades.Add(__$propriedade_Snebur_Dominio_DadosIPInformacao_ProvedorInternet);
	__$tipoBaseDominioSnebur_Dominio_DadosIPInformacao.Propriedades.Add(__$propriedade_Snebur_Dominio_DadosIPInformacao_Regiao);
	
	export const __$propriedade_Snebur_Dominio_ErroValidacao_NomeTipoEntidade = new Snebur.Reflexao.Propriedade("NomeTipoEntidade", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_ErroValidacao, true);
	
	export const __$propriedade_Snebur_Dominio_ErroValidacao_NomePropriedade = new Snebur.Reflexao.Propriedade("NomePropriedade", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_ErroValidacao, true);
	
	export const __$propriedade_Snebur_Dominio_ErroValidacao_NomeTipoValidacao = new Snebur.Reflexao.Propriedade("NomeTipoValidacao", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_ErroValidacao, true);
	
	export const __$propriedade_Snebur_Dominio_ErroValidacao_Mensagem = new Snebur.Reflexao.Propriedade("Mensagem", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_ErroValidacao, true);
	
	__$tipoBaseDominioSnebur_Dominio_ErroValidacao.Propriedades.Add(__$propriedade_Snebur_Dominio_ErroValidacao_NomeTipoEntidade);
	__$tipoBaseDominioSnebur_Dominio_ErroValidacao.Propriedades.Add(__$propriedade_Snebur_Dominio_ErroValidacao_NomePropriedade);
	__$tipoBaseDominioSnebur_Dominio_ErroValidacao.Propriedades.Add(__$propriedade_Snebur_Dominio_ErroValidacao_NomeTipoValidacao);
	__$tipoBaseDominioSnebur_Dominio_ErroValidacao.Propriedades.Add(__$propriedade_Snebur_Dominio_ErroValidacao_Mensagem);
	
	export const __$propriedade_Snebur_Dominio_Cor_Rgba = new Snebur.Reflexao.Propriedade("Rgba", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_Cor, true);
	__$propriedade_Snebur_Dominio_Cor_Rgba.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,32));
	
	__$tipoBaseDominioSnebur_Dominio_Cor.Propriedades.Add(__$propriedade_Snebur_Dominio_Cor_Rgba);
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Exposicao = new Snebur.Reflexao.Propriedade("Exposicao", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Exposicao.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(-100,100));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Magenta = new Snebur.Reflexao.Propriedade("Magenta", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Magenta.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(-100,100));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Ciano = new Snebur.Reflexao.Propriedade("Ciano", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Ciano.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(-100,100));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Amarelo = new Snebur.Reflexao.Propriedade("Amarelo", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Amarelo.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(-100,100));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Contraste = new Snebur.Reflexao.Propriedade("Contraste", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Contraste.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(0,200));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Brilho = new Snebur.Reflexao.Propriedade("Brilho", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Brilho.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(0,200));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Sepia = new Snebur.Reflexao.Propriedade("Sepia", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Sepia.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(0,100));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Saturacao = new Snebur.Reflexao.Propriedade("Saturacao", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Saturacao.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(0,200));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_PretoBranco = new Snebur.Reflexao.Propriedade("PretoBranco", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_PretoBranco.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(0,100));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Inverter = new Snebur.Reflexao.Propriedade("Inverter", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Inverter.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(0,100));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Matriz = new Snebur.Reflexao.Propriedade("Matriz", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Matriz.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(0,360));
	
	export const __$propriedade_Snebur_Dominio_FiltroImagem_Desfoque = new Snebur.Reflexao.Propriedade("Desfoque", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_FiltroImagem, true);
	__$propriedade_Snebur_Dominio_FiltroImagem_Desfoque.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoIntervaloAttribute(0,10));
	
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Exposicao);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Magenta);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Ciano);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Amarelo);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Contraste);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Brilho);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Sepia);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Saturacao);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_PretoBranco);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Inverter);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Matriz);
	__$tipoBaseDominioSnebur_Dominio_FiltroImagem.Propriedades.Add(__$propriedade_Snebur_Dominio_FiltroImagem_Desfoque);
	
	export const __$propriedade_Snebur_Dominio_BaseListaTipoComplexo_Json = new Snebur.Reflexao.Propriedade("Json", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_BaseListaTipoComplexo, true);
	__$propriedade_Snebur_Dominio_BaseListaTipoComplexo_Json.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,32767));
	
	__$tipoBaseDominioSnebur_Dominio_BaseListaTipoComplexo.Propriedades.Add(__$propriedade_Snebur_Dominio_BaseListaTipoComplexo_Json);
	
	export const __$propriedade_Snebur_Dominio_Localizacao_Latitude = new Snebur.Reflexao.Propriedade("Latitude", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Localizacao, false);
	
	export const __$propriedade_Snebur_Dominio_Localizacao_Longitude = new Snebur.Reflexao.Propriedade("Longitude", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Localizacao, false);
	
	__$tipoBaseDominioSnebur_Dominio_Localizacao.Propriedades.Add(__$propriedade_Snebur_Dominio_Localizacao_Latitude);
	__$tipoBaseDominioSnebur_Dominio_Localizacao.Propriedades.Add(__$propriedade_Snebur_Dominio_Localizacao_Longitude);
	
	export const __$propriedade_Snebur_Dominio_Navegador_NavegadorEnum = new Snebur.Reflexao.Propriedade("NavegadorEnum", __$tipoEnum_Snebur_Dominio_EnumNavegador, __$tipoBaseDominioSnebur_Dominio_Navegador, false);
	
	export const __$propriedade_Snebur_Dominio_Navegador_Nome = new Snebur.Reflexao.Propriedade("Nome", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_Navegador, true);
	__$propriedade_Snebur_Dominio_Navegador_Nome.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_Navegador_Codenome = new Snebur.Reflexao.Propriedade("Codenome", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_Navegador, true);
	__$propriedade_Snebur_Dominio_Navegador_Codenome.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_Navegador_Versao = new Snebur.Reflexao.Propriedade("Versao", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_Navegador, true);
	__$propriedade_Snebur_Dominio_Navegador_Versao.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	__$tipoBaseDominioSnebur_Dominio_Navegador.Propriedades.Add(__$propriedade_Snebur_Dominio_Navegador_NavegadorEnum);
	__$tipoBaseDominioSnebur_Dominio_Navegador.Propriedades.Add(__$propriedade_Snebur_Dominio_Navegador_Nome);
	__$tipoBaseDominioSnebur_Dominio_Navegador.Propriedades.Add(__$propriedade_Snebur_Dominio_Navegador_Codenome);
	__$tipoBaseDominioSnebur_Dominio_Navegador.Propriedades.Add(__$propriedade_Snebur_Dominio_Navegador_Versao);
	
	export const __$propriedade_Snebur_Dominio_PrazoTempo_Prazo = new Snebur.Reflexao.Propriedade("Prazo", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_PrazoTempo, false);
	
	export const __$propriedade_Snebur_Dominio_PrazoTempo_TipoPrazo = new Snebur.Reflexao.Propriedade("TipoPrazo", __$tipoEnum_Snebur_Dominio_EnumTipoPrazo, __$tipoBaseDominioSnebur_Dominio_PrazoTempo, false);
	
	__$tipoBaseDominioSnebur_Dominio_PrazoTempo.Propriedades.Add(__$propriedade_Snebur_Dominio_PrazoTempo_Prazo);
	__$tipoBaseDominioSnebur_Dominio_PrazoTempo.Propriedades.Add(__$propriedade_Snebur_Dominio_PrazoTempo_TipoPrazo);
	
	export const __$propriedade_Snebur_Dominio_RedeSociais_Facebook = new Snebur.Reflexao.Propriedade("Facebook", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_RedeSociais, true);
	__$propriedade_Snebur_Dominio_RedeSociais_Facebook.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_RedeSociais_Instagram = new Snebur.Reflexao.Propriedade("Instagram", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_RedeSociais, true);
	__$propriedade_Snebur_Dominio_RedeSociais_Instagram.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_RedeSociais_Twitter = new Snebur.Reflexao.Propriedade("Twitter", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_RedeSociais, true);
	__$propriedade_Snebur_Dominio_RedeSociais_Twitter.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_RedeSociais_WhatsApp = new Snebur.Reflexao.Propriedade("WhatsApp", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_RedeSociais, true);
	__$propriedade_Snebur_Dominio_RedeSociais_WhatsApp.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_RedeSociais_LinkedIn = new Snebur.Reflexao.Propriedade("LinkedIn", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_RedeSociais, true);
	__$propriedade_Snebur_Dominio_RedeSociais_LinkedIn.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_RedeSociais_Youtube = new Snebur.Reflexao.Propriedade("Youtube", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_RedeSociais, true);
	__$propriedade_Snebur_Dominio_RedeSociais_Youtube.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_RedeSociais_Github = new Snebur.Reflexao.Propriedade("Github", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_RedeSociais, true);
	__$propriedade_Snebur_Dominio_RedeSociais_Github.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	__$tipoBaseDominioSnebur_Dominio_RedeSociais.Propriedades.Add(__$propriedade_Snebur_Dominio_RedeSociais_Facebook);
	__$tipoBaseDominioSnebur_Dominio_RedeSociais.Propriedades.Add(__$propriedade_Snebur_Dominio_RedeSociais_Instagram);
	__$tipoBaseDominioSnebur_Dominio_RedeSociais.Propriedades.Add(__$propriedade_Snebur_Dominio_RedeSociais_Twitter);
	__$tipoBaseDominioSnebur_Dominio_RedeSociais.Propriedades.Add(__$propriedade_Snebur_Dominio_RedeSociais_WhatsApp);
	__$tipoBaseDominioSnebur_Dominio_RedeSociais.Propriedades.Add(__$propriedade_Snebur_Dominio_RedeSociais_LinkedIn);
	__$tipoBaseDominioSnebur_Dominio_RedeSociais.Propriedades.Add(__$propriedade_Snebur_Dominio_RedeSociais_Youtube);
	__$tipoBaseDominioSnebur_Dominio_RedeSociais.Propriedades.Add(__$propriedade_Snebur_Dominio_RedeSociais_Github);
	
	export const __$propriedade_Snebur_Dominio_SistemaOperacional_SistemaOperacionalEnum = new Snebur.Reflexao.Propriedade("SistemaOperacionalEnum", __$tipoEnum_Snebur_Dominio_EnumSistemaOperacional, __$tipoBaseDominioSnebur_Dominio_SistemaOperacional, false);
	
	export const __$propriedade_Snebur_Dominio_SistemaOperacional_Nome = new Snebur.Reflexao.Propriedade("Nome", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_SistemaOperacional, true);
	__$propriedade_Snebur_Dominio_SistemaOperacional_Nome.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_SistemaOperacional_Codenome = new Snebur.Reflexao.Propriedade("Codenome", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_SistemaOperacional, true);
	__$propriedade_Snebur_Dominio_SistemaOperacional_Codenome.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	export const __$propriedade_Snebur_Dominio_SistemaOperacional_Versao = new Snebur.Reflexao.Propriedade("Versao", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_SistemaOperacional, true);
	__$propriedade_Snebur_Dominio_SistemaOperacional_Versao.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,255));
	
	__$tipoBaseDominioSnebur_Dominio_SistemaOperacional.Propriedades.Add(__$propriedade_Snebur_Dominio_SistemaOperacional_SistemaOperacionalEnum);
	__$tipoBaseDominioSnebur_Dominio_SistemaOperacional.Propriedades.Add(__$propriedade_Snebur_Dominio_SistemaOperacional_Nome);
	__$tipoBaseDominioSnebur_Dominio_SistemaOperacional.Propriedades.Add(__$propriedade_Snebur_Dominio_SistemaOperacional_Codenome);
	__$tipoBaseDominioSnebur_Dominio_SistemaOperacional.Propriedades.Add(__$propriedade_Snebur_Dominio_SistemaOperacional_Versao);
	
	export const __$propriedade_Snebur_Dominio_Area_Esquerda = new Snebur.Reflexao.Propriedade("Esquerda", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Area, true);
	
	export const __$propriedade_Snebur_Dominio_Area_Superior = new Snebur.Reflexao.Propriedade("Superior", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Area, true);
	
	export const __$propriedade_Snebur_Dominio_Area_Direita = new Snebur.Reflexao.Propriedade("Direita", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Area, true);
	
	export const __$propriedade_Snebur_Dominio_Area_Inferior = new Snebur.Reflexao.Propriedade("Inferior", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Area, true);
	
	export const __$propriedade_Snebur_Dominio_Area_Largura = new Snebur.Reflexao.Propriedade("Largura", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Area, false);
	
	export const __$propriedade_Snebur_Dominio_Area_Altura = new Snebur.Reflexao.Propriedade("Altura", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Area, false);
	
	__$tipoBaseDominioSnebur_Dominio_Area.Propriedades.Add(__$propriedade_Snebur_Dominio_Area_Esquerda);
	__$tipoBaseDominioSnebur_Dominio_Area.Propriedades.Add(__$propriedade_Snebur_Dominio_Area_Superior);
	__$tipoBaseDominioSnebur_Dominio_Area.Propriedades.Add(__$propriedade_Snebur_Dominio_Area_Direita);
	__$tipoBaseDominioSnebur_Dominio_Area.Propriedades.Add(__$propriedade_Snebur_Dominio_Area_Inferior);
	__$tipoBaseDominioSnebur_Dominio_Area.Propriedades.Add(__$propriedade_Snebur_Dominio_Area_Largura);
	__$tipoBaseDominioSnebur_Dominio_Area.Propriedades.Add(__$propriedade_Snebur_Dominio_Area_Altura);
	
	export const __$propriedade_Snebur_Dominio_Borda_CorRgba = new Snebur.Reflexao.Propriedade("CorRgba", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_Borda, true);
	__$propriedade_Snebur_Dominio_Borda_CorRgba.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoTextoTamanhoAttribute(0,32));
	
	export const __$propriedade_Snebur_Dominio_Borda_IsInterna = new Snebur.Reflexao.Propriedade("IsInterna", __$tipoTipoPrimario_Boolean, __$tipoBaseDominioSnebur_Dominio_Borda, false);
	
	export const __$propriedade_Snebur_Dominio_Borda_Afastamento = new Snebur.Reflexao.Propriedade("Afastamento", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Borda, false);
	
	export const __$propriedade_Snebur_Dominio_Borda_Espessura = new Snebur.Reflexao.Propriedade("Espessura", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Borda, false);
	
	export const __$propriedade_Snebur_Dominio_Borda_Arredondamento = new Snebur.Reflexao.Propriedade("Arredondamento", __$tipoTipoPrimario_Integer, __$tipoBaseDominioSnebur_Dominio_Borda, false);
	
	__$tipoBaseDominioSnebur_Dominio_Borda.Propriedades.Add(__$propriedade_Snebur_Dominio_Borda_CorRgba);
	__$tipoBaseDominioSnebur_Dominio_Borda.Propriedades.Add(__$propriedade_Snebur_Dominio_Borda_IsInterna);
	__$tipoBaseDominioSnebur_Dominio_Borda.Propriedades.Add(__$propriedade_Snebur_Dominio_Borda_Afastamento);
	__$tipoBaseDominioSnebur_Dominio_Borda.Propriedades.Add(__$propriedade_Snebur_Dominio_Borda_Espessura);
	__$tipoBaseDominioSnebur_Dominio_Borda.Propriedades.Add(__$propriedade_Snebur_Dominio_Borda_Arredondamento);
	
	export const __$propriedade_Snebur_Dominio_Dimensao_Largura = new Snebur.Reflexao.Propriedade("Largura", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Dimensao, false);
	__$propriedade_Snebur_Dominio_Dimensao_Largura.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoRequeridoAttribute(null,null,false,null));
	
	export const __$propriedade_Snebur_Dominio_Dimensao_Altura = new Snebur.Reflexao.Propriedade("Altura", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Dimensao, false);
	__$propriedade_Snebur_Dominio_Dimensao_Altura.Atributos.Add(new Snebur.Dominio.Atributos.ValidacaoRequeridoAttribute(null,null,false,null));
	
	__$tipoBaseDominioSnebur_Dominio_Dimensao.Propriedades.Add(__$propriedade_Snebur_Dominio_Dimensao_Largura);
	__$tipoBaseDominioSnebur_Dominio_Dimensao.Propriedades.Add(__$propriedade_Snebur_Dominio_Dimensao_Altura);
	
	export const __$propriedade_Snebur_Dominio_Margem_Esquerda = new Snebur.Reflexao.Propriedade("Esquerda", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Margem, true);
	
	export const __$propriedade_Snebur_Dominio_Margem_Superior = new Snebur.Reflexao.Propriedade("Superior", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Margem, true);
	
	export const __$propriedade_Snebur_Dominio_Margem_Direita = new Snebur.Reflexao.Propriedade("Direita", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Margem, true);
	
	export const __$propriedade_Snebur_Dominio_Margem_Inferior = new Snebur.Reflexao.Propriedade("Inferior", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Margem, true);
	
	__$tipoBaseDominioSnebur_Dominio_Margem.Propriedades.Add(__$propriedade_Snebur_Dominio_Margem_Esquerda);
	__$tipoBaseDominioSnebur_Dominio_Margem.Propriedades.Add(__$propriedade_Snebur_Dominio_Margem_Superior);
	__$tipoBaseDominioSnebur_Dominio_Margem.Propriedades.Add(__$propriedade_Snebur_Dominio_Margem_Direita);
	__$tipoBaseDominioSnebur_Dominio_Margem.Propriedades.Add(__$propriedade_Snebur_Dominio_Margem_Inferior);
	
	export const __$propriedade_Snebur_Dominio_Posicao_X = new Snebur.Reflexao.Propriedade("X", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Posicao, false);
	
	export const __$propriedade_Snebur_Dominio_Posicao_Y = new Snebur.Reflexao.Propriedade("Y", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Posicao, false);
	
	__$tipoBaseDominioSnebur_Dominio_Posicao.Propriedades.Add(__$propriedade_Snebur_Dominio_Posicao_X);
	__$tipoBaseDominioSnebur_Dominio_Posicao.Propriedades.Add(__$propriedade_Snebur_Dominio_Posicao_Y);
	
	export const __$propriedade_Snebur_Dominio_Regiao_X = new Snebur.Reflexao.Propriedade("X", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Regiao, false);
	
	export const __$propriedade_Snebur_Dominio_Regiao_Y = new Snebur.Reflexao.Propriedade("Y", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Regiao, false);
	
	export const __$propriedade_Snebur_Dominio_Regiao_Largura = new Snebur.Reflexao.Propriedade("Largura", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Regiao, false);
	
	export const __$propriedade_Snebur_Dominio_Regiao_Altura = new Snebur.Reflexao.Propriedade("Altura", __$tipoTipoPrimario_Double, __$tipoBaseDominioSnebur_Dominio_Regiao, false);
	
	__$tipoBaseDominioSnebur_Dominio_Regiao.Propriedades.Add(__$propriedade_Snebur_Dominio_Regiao_X);
	__$tipoBaseDominioSnebur_Dominio_Regiao.Propriedades.Add(__$propriedade_Snebur_Dominio_Regiao_Y);
	__$tipoBaseDominioSnebur_Dominio_Regiao.Propriedades.Add(__$propriedade_Snebur_Dominio_Regiao_Largura);
	__$tipoBaseDominioSnebur_Dominio_Regiao.Propriedades.Add(__$propriedade_Snebur_Dominio_Regiao_Altura);
	
	export const __$propriedade_Snebur_Dominio_PropriedadeAlteradaTipoComplexo_NomePropriedadeEntidade = new Snebur.Reflexao.Propriedade("NomePropriedadeEntidade", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_PropriedadeAlteradaTipoComplexo, true);
	
	export const __$propriedade_Snebur_Dominio_PropriedadeAlteradaTipoComplexo_NomePropriedadeTipoComplexo = new Snebur.Reflexao.Propriedade("NomePropriedadeTipoComplexo", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Dominio_PropriedadeAlteradaTipoComplexo, true);
	
	__$tipoBaseDominioSnebur_Dominio_PropriedadeAlteradaTipoComplexo.Propriedades.Add(__$propriedade_Snebur_Dominio_PropriedadeAlteradaTipoComplexo_NomePropriedadeEntidade);
	__$tipoBaseDominioSnebur_Dominio_PropriedadeAlteradaTipoComplexo.Propriedades.Add(__$propriedade_Snebur_Dominio_PropriedadeAlteradaTipoComplexo_NomePropriedadeTipoComplexo);
	
	export const __$propriedade_Snebur_Dominio_InformacaoSessaoUsuario_IdentificadorSessaoUsuario = new Snebur.Reflexao.Propriedade("IdentificadorSessaoUsuario", __$tipoTipoPrimario_Guid, __$tipoBaseDominioSnebur_Dominio_InformacaoSessaoUsuario, false);
	
	__$tipoBaseDominioSnebur_Dominio_InformacaoSessaoUsuario.Propriedades.Add(__$propriedade_Snebur_Dominio_InformacaoSessaoUsuario_IdentificadorSessaoUsuario);
	
	export const __$propriedade_Snebur_Seguranca_Credencial_IdentificadorUsuario = new Snebur.Reflexao.Propriedade("IdentificadorUsuario", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Seguranca_Credencial, true);
	
	export const __$propriedade_Snebur_Seguranca_Credencial_Senha = new Snebur.Reflexao.Propriedade("Senha", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Seguranca_Credencial, true);
	
	__$tipoBaseDominioSnebur_Seguranca_Credencial.Propriedades.Add(__$propriedade_Snebur_Seguranca_Credencial_IdentificadorUsuario);
	__$tipoBaseDominioSnebur_Seguranca_Credencial.Propriedades.Add(__$propriedade_Snebur_Seguranca_Credencial_Senha);
	
	export const __$propriedade_Snebur_Seguranca_CredencialUsuario_Nome = new Snebur.Reflexao.Propriedade("Nome", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Seguranca_CredencialUsuario, true);
	
	export const __$propriedade_Snebur_Seguranca_CredencialUsuario_IdentificadorAmigavel = new Snebur.Reflexao.Propriedade("IdentificadorAmigavel", __$tipoTipoPrimario_String, __$tipoBaseDominioSnebur_Seguranca_CredencialUsuario, true);
	
	__$tipoBaseDominioSnebur_Seguranca_CredencialUsuario.Propriedades.Add(__$propriedade_Snebur_Seguranca_CredencialUsuario_Nome);
	__$tipoBaseDominioSnebur_Seguranca_CredencialUsuario.Propriedades.Add(__$propriedade_Snebur_Seguranca_CredencialUsuario_IdentificadorAmigavel);
	
}