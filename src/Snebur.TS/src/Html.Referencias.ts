namespace Snebur.Reflexao
{

	//#region Declarações dos tipo UI

	Snebur.Dominio.ViewModelGenerico.__CaminhoTipo = "Snebur.Dominio.ViewModelGenerico";
	Snebur.Dominio.EntidadeViewModel.__CaminhoTipo = "Snebur.Dominio.EntidadeViewModel";
	Snebur.Dominio.BaseListaObservacaoViewModel.__CaminhoTipo = "Snebur.Dominio.BaseListaObservacaoViewModel";
	Snebur.Tarefa.BaseTarefa.__CaminhoTipo = "Snebur.Tarefa.BaseTarefa";
	Snebur.ServicoArquivo.BaseTarefaEnviarArquivo.__CaminhoTipo = "Snebur.ServicoArquivo.BaseTarefaEnviarArquivo";
	Snebur.ServicoArquivo.TarefaEnviarImagem.__CaminhoTipo = "Snebur.ServicoArquivo.TarefaEnviarImagem";
	Snebur.ServicoArquivo.TarefaEnviarArquivo.__CaminhoTipo = "Snebur.ServicoArquivo.TarefaEnviarArquivo";
	Snebur.ServicoArquivo.TarefaEnviarImagemApresentacao.__CaminhoTipo = "Snebur.ServicoArquivo.TarefaEnviarImagemApresentacao";
	Snebur.ServicoArquivo.TarefaEnviarImagemImpressao.__CaminhoTipo = "Snebur.ServicoArquivo.TarefaEnviarImagemImpressao";
	Snebur.Tarefa.GerenciadorTarefa.__CaminhoTipo = "Snebur.Tarefa.GerenciadorTarefa";
	Snebur.ServicoArquivo.GerenciadorEnvioArquivo.__CaminhoTipo = "Snebur.ServicoArquivo.GerenciadorEnvioArquivo";
	$Reflexao.Tipos.Add(Snebur.Dominio.ViewModelGenerico.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("ViewModelGenerico", "Snebur.Dominio",Snebur.Dominio.BaseViewModel.__CaminhoTipo, false));
	$Reflexao.Tipos.Add(Snebur.Dominio.EntidadeViewModel.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("EntidadeViewModel", "Snebur.Dominio",Snebur.Dominio.BaseViewModel.__CaminhoTipo, false));
	$Reflexao.Tipos.Add(Snebur.Dominio.BaseListaObservacaoViewModel.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("BaseListaObservacaoViewModel", "Snebur.Dominio",Snebur.Dominio.BaseViewModel.__CaminhoTipo, true));
	$Reflexao.Tipos.Add(Snebur.Tarefa.BaseTarefa.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("BaseTarefa", "Snebur.Tarefa",Snebur.Dominio.BaseViewModel.__CaminhoTipo, true));
	$Reflexao.Tipos.Add(Snebur.ServicoArquivo.BaseTarefaEnviarArquivo.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("BaseTarefaEnviarArquivo", "Snebur.ServicoArquivo",Snebur.Tarefa.BaseTarefa.__CaminhoTipo, true));
	$Reflexao.Tipos.Add(Snebur.ServicoArquivo.TarefaEnviarImagem.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("TarefaEnviarImagem", "Snebur.ServicoArquivo",Snebur.ServicoArquivo.BaseTarefaEnviarArquivo.__CaminhoTipo, true));
	$Reflexao.Tipos.Add(Snebur.ServicoArquivo.TarefaEnviarArquivo.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("TarefaEnviarArquivo", "Snebur.ServicoArquivo",Snebur.ServicoArquivo.BaseTarefaEnviarArquivo.__CaminhoTipo, false));
	$Reflexao.Tipos.Add(Snebur.ServicoArquivo.TarefaEnviarImagemApresentacao.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("TarefaEnviarImagemApresentacao", "Snebur.ServicoArquivo",Snebur.ServicoArquivo.TarefaEnviarImagem.__CaminhoTipo, false));
	$Reflexao.Tipos.Add(Snebur.ServicoArquivo.TarefaEnviarImagemImpressao.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("TarefaEnviarImagemImpressao", "Snebur.ServicoArquivo",Snebur.ServicoArquivo.TarefaEnviarImagem.__CaminhoTipo, false));
	$Reflexao.Tipos.Add(Snebur.Tarefa.GerenciadorTarefa.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("GerenciadorTarefa", "Snebur.Tarefa",Snebur.Tarefa.BaseTarefa.__CaminhoTipo, false));
	$Reflexao.Tipos.Add(Snebur.ServicoArquivo.GerenciadorEnvioArquivo.__CaminhoTipo, new Snebur.Reflexao.TipoBaseViewModel("GerenciadorEnvioArquivo", "Snebur.ServicoArquivo",Snebur.Tarefa.GerenciadorTarefa.__CaminhoTipo, false));

	//#endregion


	//#region Html referencias



	//#endregion

}
