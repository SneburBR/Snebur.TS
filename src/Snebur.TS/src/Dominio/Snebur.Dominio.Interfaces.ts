// Auto-generated file. Interfaces - Snebur. Do not modify directly. 
//@Project: Snebur
//@DataHora: 2025-10-16 15:09:38
//@Artifact: Interfaces
//@Namespace: Snebur.Dominio 
//@PrioridadeDominio: 0
//@Globalizar: False 
//@Dominios dependentes: []
/*eslint-disable*/
// Ignore Spelling: *

namespace Snebur.Comunicacao
{
    export interface IBaseNegocio
    {
    }
    export interface IBaseServico
    {
        PingAsync(): Promise<boolean>;
    }
    export interface IServicoUsuario  extends Snebur.Comunicacao.IBaseServico
    {
        IsExisteInformacaoIpAsync(): Promise<boolean>;
        AtualizarInformacaoIpAsync(ipInformacao: Snebur.Dominio.DadosIPInformacao): Promise<void>;
        ExisteIdentificadorUsuarioAsync(identificadorUsuario: string): Promise<Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario>;
        ValidarCredencialAsync(credencial: Snebur.Seguranca.CredencialUsuario): Promise<Snebur.Dominio.EnumResultadoValidacaoCredencial>;
        SessaoUsuarioAtivaAsync(credencial: Snebur.Seguranca.CredencialUsuario, identificadorSessaoUsuario: string): Promise<boolean>;
        RetornarUsuarioAsync(credencial: Snebur.Seguranca.CredencialUsuario): Promise<Snebur.Dominio.IUsuario | null>;
        AutenticarAsync(credencial: Snebur.Seguranca.CredencialUsuario): Promise<Snebur.Comunicacao.ResultadoAutenticacao>;
        RetornarSessaoUsuarioAsync(identificadorSessaoUsuario: string): Promise<Snebur.Dominio.ISessaoUsuario | null>;
        CadastrarNovoUsuarioAsync(novoUsuario: Snebur.Dominio.NovoUsuario, isAlterarSenhaProximoAcesso: boolean): Promise<Snebur.Dominio.IUsuario | null>;
        EnviarCodigoRecuperarSenhaAsync(identificadorAmigavel: string): Promise<Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha>;
        ValidarCodigRecuperarSenhaAsync(identificadorAmigavel: string, codigoRecuperarSenha: string): Promise<Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha>;
        RecuperarSenhaAsync(identificadorAmigavel: string, codigoRecuperarSenha: string, novaSenha: string): Promise<Snebur.Comunicacao.ResultadoRecuperarSenha>;
        AlterarSenhaAsync(credencial: Snebur.Seguranca.CredencialUsuario, novaSenha: string): Promise<Snebur.Comunicacao.ResultadoAlterarSenha>;
        FinalizarSessaoUsuarioAsync(identificadorSessaoUsuario: string): Promise<void>;
    }
}
namespace Snebur.Dominio
{
    export interface IAlteracaoPropriedade  extends Snebur.Dominio.IAtividadeUsuario,Snebur.Dominio.IEntidade
    {
        DataHoraFimAlteracao: Date | null;
    }
    export interface IAlteracaoPropriedadeGenerica  extends Snebur.Dominio.IAtividadeUsuario,Snebur.Dominio.IEntidade
    {
        IdEntidade: number;
        IdNamespace: number;
        TipoPrimario: Snebur.Reflexao.EnumTipoPrimario | null;
        IsTipoComplexo: boolean;
        DataHoraFimAlteracao: Date | null;
        NomeTipoEntidade: string;
        NomePropriedade: string;
        ValorPropriedadeAntigo: string | null;
        ValorPropriedadeAlterada: string | null;
    }
    export interface IArea  extends Snebur.Dominio.IMargem,Snebur.Dominio.IDimensao
    {
        Margem?: Snebur.Dominio.Margem;
        Dimensao?: Snebur.Dominio.Dimensao;
        CalcularRegiao?(dimensaoRecipiente: Snebur.Dominio.Dimensao): Snebur.Dominio.Regiao;
    }
    export interface IArquivo  extends Snebur.Dominio.IEntidade
    {
        TotalBytesLocal: number;
        TotalBytes: number;
        IsExisteArquivo: boolean;
        DataHoraCadastro: Date | null;
        DataHoraInicioEnvio: Date | null;
        DataHoraFimEnvio: Date | null;
        DataHoraArquivoDeletado: Date | null;
        Status: Snebur.Dominio.EnumStatusArquivo;
        Progresso: number | null;
        MimeType: Snebur.Dominio.EnumMimeType;
        NomeArquivo: string;
        CaminhoArquivo: string | null;
        Checksum: string | null;
        SessaoUsuario: Snebur.Dominio.ISessaoUsuario | null;
    }
    export interface IArquivoDeletada
    {
        Imagem_Id: number;
        DataHoraCadastro: Date;
        DataHoraArquivoDeletado: Date;
    }
    export interface IArrastar
    {
        Posicao: Snebur.Dominio.Posicao;
    }
    export interface IAtividadeUsuario  extends Snebur.Dominio.IEntidade
    {
        DataHora: Date | null;
        SessaoUsuario_Id: number;
        IP: string;
        Usuario: Snebur.Dominio.IUsuario | null;
        UsuarioNotificacao: Snebur.Dominio.IUsuario | null;
        SessaoUsuario: Snebur.Dominio.ISessaoUsuario | null;
    }
    export interface IAtivo  extends Snebur.Dominio.IEntidade
    {
        IsAtivo: boolean;
    }
    export interface IAudio  extends Snebur.Dominio.IMedia,Snebur.Dominio.IArquivo,Snebur.Dominio.IEntidade
    {
    }
    export interface IBorda
    {
        IsInterna: boolean;
        Afastamento: number;
        Espessura: number;
        Arredondamento: number;
        CorRgba: string;
        Cor: Snebur.Dominio.Cor;
    }
    export interface ICaminhoTipo
    {
        readonly __CaminhoTipo: string;
    }
    export interface ICongelado  extends Snebur.Dominio.IEntidade
    {
        IsCongelado: boolean;
    }
    export interface ICor
    {
        readonly Red: number;
        readonly Green: number;
        readonly Blue: number;
        readonly AlphaDecimal: number;
        Rgba: string;
    }
    export interface ICredencial
    {
        IdentificadorUsuario: string | null;
        Senha: string | null;
    }
    export interface ICredencialUsuario  extends Snebur.Dominio.ICredencial
    {
        Nome: string;
        IdentificadorAmigavel: string;
    }
    export interface IDeletado  extends Snebur.Dominio.IEntidade
    {
        IsDeletado: boolean;
        DataHoraCadastro: Date | null;
        DataHoraDeletado: Date | null;
        SessaoUsuarioDeletado_Id: number | null;
        SessaoUsuarioDeletado: Snebur.Dominio.ISessaoUsuario | null;
    }
    export interface IDimensao
    {
        Largura: number;
        Altura: number;
    }
    export interface IDocumento  extends Snebur.Dominio.IArquivo,Snebur.Dominio.IEntidade
    {
    }
    export interface IDpiVisualizacao
    {
    }
    export interface IEntidade
    {
        Id: number;
        readonly __IsNewEntity: boolean;
        readonly __NomeTipoEntidade: string;
        readonly __IdentificadorEntidade: string;
        readonly __PropriedadesAlteradas: DicionarioSimples<Snebur.Dominio.PropriedadeAlterada, string> | null;
        RetornarIdentificadorReferencia(): string;
    }
    export interface IEntidadeIdentificadorProprietario  extends Snebur.Dominio.IEntidade,Snebur.Dominio.IIdentificadorProprietario
    {
    }
    export interface IEntidadeSeguranca  extends Snebur.Dominio.IEntidade
    {
    }
    export interface IEntityLifecycle  extends Snebur.Dominio.IEntidade
    {
        Creating(): void;
        Saving(): void;
        Saved(): void;
        Deleting(): void;
        Deleted(): void;
    }
    export interface IFiltroImagem
    {
        Exposicao: number | null;
        Magenta: number | null;
        Ciano: number | null;
        Amarelo: number | null;
        Contraste: number | null;
        Brilho: number | null;
        Sepia: number | null;
        Saturacao: number | null;
        PretoBranco: number | null;
        Inverter: number | null;
        Matriz: number | null;
        Desfoque: number | null;
    }
    export interface IHistoricoManutencao  extends Snebur.Dominio.IEntidade
    {
        Prioridade: number;
        DataHoraExecucao: Date | null;
        DataHoraUltimaExecucao: Date | null;
        IsSucesso: boolean;
        NumeroTentativa: number;
        MigrationId: string;
        NomeTipoManutencao: string;
        MensagemErro: string | null;
    }
    export interface IIdentificador
    {
        readonly Identificador: string;
    }
    export interface IIdentificadorAplicacao
    {
        IdentificadorAplicacao: string;
    }
    export interface IIdentificadorProprietario
    {
        IdentificadorProprietario: string;
    }
    export interface IIdentificadorSessaoUsuario
    {
        IdentificadorSessaoUsuario: string;
    }
    export interface IImagem  extends Snebur.Dominio.IMedia,Snebur.Dominio.IArquivo,Snebur.Dominio.IEntidade
    {
        IsExisteMiniatura: boolean;
        IsExistePequena: boolean;
        IsExisteMedia: boolean;
        IsExisteGrande: boolean;
        TotalBytesMiniatura: number | null;
        TotalBytesPequena: number | null;
        TotalBytesMedia: number | null;
        TotalBytesGrande: number | null;
        IsIcone: boolean;
        IsImagemProcessada: boolean;
        FormatoImagem: Snebur.Dominio.EnumFormatoImagem;
        ChecksumArquivoLocal: string | null;
        DimensaoImagemMiniatura: Snebur.Dominio.Dimensao;
        DimensaoImagemPequena: Snebur.Dominio.Dimensao;
        DimensaoImagemMedia: Snebur.Dominio.Dimensao;
        DimensaoImagemGrande: Snebur.Dominio.Dimensao;
        DimensaoImagemOrigem: Snebur.Dominio.Dimensao;
        DimensaoImagemLocal: Snebur.Dominio.Dimensao;
        DimensaoImagemImpressao: Snebur.Dominio.Dimensao;
    }
    export interface IInformacaoSessao  extends Snebur.Dominio.IIdentificadorAplicacao
    {
        Plataforma: Snebur.Dominio.EnumPlataforma;
        TipoAplicacao: Snebur.Dominio.EnumTipoAplicacao;
        Cultura: string | null;
        Idioma: string | null;
        UserAgent: string | null;
        VersaoAplicacao: string;
        NomeComputador: string | null;
        Resolucao: Snebur.Dominio.Dimensao;
        Navegador: Snebur.Dominio.Navegador;
        SistemaOperacional: Snebur.Dominio.SistemaOperacional;
    }
    export interface IIPInformacao
    {
        IP: string;
        MascaraIp4: string;
        Hostname: string | null;
        Cidade: string | null;
        Regiao: string | null;
        Pais: string | null;
        CodigoPostal: string | null;
        ProvedorInternet: string | null;
        Localizacao: Snebur.Dominio.Localizacao;
    }
    export interface IIPInformacaoEntidade  extends Snebur.Dominio.IIPInformacao,Snebur.Dominio.IEntidade
    {
    }
    export interface ILogServicoArquivo  extends Snebur.Dominio.IEntidade
    {
        StatusServicoArquivo: Snebur.Dominio.EnumStatusServicoArquivo;
        IndetificadorLog: string;
        DataHoraInicio: Date | null;
        DataHoraUltimaAtividade: Date | null;
        DataHoraFim: Date | null;
        TotalBytesEnviado: number;
        TotalArquivosLocal: number;
        TotalArquivosEnviado: number;
        ProgressoEnvioArquivo: number;
        VelocidadeEnvio: number;
        SessaoUsuario: Snebur.Dominio.ISessaoUsuario | null;
    }
    export interface IMargem
    {
        Esquerda: number | null;
        Superior: number | null;
        Direita: number | null;
        Inferior: number | null;
    }
    export interface IMedia  extends Snebur.Dominio.IArquivo,Snebur.Dominio.IEntidade
    {
    }
    export interface INomeTipoEntidade
    {
        readonly __NomeTipoEntidade: string | null;
    }
    export interface INormalizarIdentificadorProprietario
    {
    }
    export interface IOrdenacao
    {
        Ordenacao: number | null;
    }
    export interface IOrdenacaoEntidade  extends Snebur.Dominio.IEntidade,Snebur.Dominio.IOrdenacao
    {
    }
    export interface IPerfilIcc
    {
        DataHoraCadastro: Date | null;
        TotalBytes: number;
        Nome: string;
        Checksum: string;
    }
    export interface IPosicao
    {
        X: number;
        Y: number;
    }
    export interface IPrazoTempo
    {
        Prazo: number;
        TipoPrazo: Snebur.Dominio.EnumTipoPrazo;
    }
    export interface IPropriedadeAlterada
    {
        NomePropriedade: string;
        AntigoValor: any | null;
        NovoValor: any | null;
    }
    export interface IPropriedadesDesbloqueada
    {
        EnumTipoDesbloqueio: Snebur.Dominio.EnumTipoDesbloqueio;
        NomeEntidade: string;
        NomeProprieade: string;
    }
    export interface IRegiao  extends Snebur.Dominio.IPosicao,Snebur.Dominio.IDimensao
    {
        readonly Posicao?: Snebur.Dominio.Posicao;
        readonly Dimensao?: Snebur.Dominio.Dimensao;
    }
    export interface ISelecionado
    {
        IsSelecionado: boolean;
    }
    export interface ISessaoUsuario  extends Snebur.Dominio.IEntidade,Snebur.Dominio.IInformacaoSessao,Snebur.Dominio.IIdentificadorAplicacao,Snebur.Dominio.IIdentificadorSessaoUsuario,Snebur.Dominio.IIdentificadorProprietario
    {
        Usuario_Id: number;
        Status: Snebur.Dominio.EnumStatusSessaoUsuario;
        StatusServicoArquivo: Snebur.Dominio.EnumStatusServicoArquivo;
        DataHoraExpiracaoBloqueio: Date | null;
        DataHoraInicio: Date | null;
        DataHoraUltimoAcesso: Date | null;
        DataHoraFim: Date | null;
        Duracao: TimeSpan | null;
        IP: string;
        MotivoBloqueio: string | null;
        Usuario: Snebur.Dominio.IUsuario | null;
        IPInformacao: Snebur.Dominio.IIPInformacao | null;
    }
    export interface ITipoComplexo
    {
    }
    export interface IUsuario  extends Snebur.Dominio.IEntidadeSeguranca,Snebur.Dominio.IEntidade,Snebur.Dominio.IIdentificador,Snebur.Dominio.ICredencial
    {
        DataHoraUltimoAcesso: Date | null;
        IsDesativado: boolean;
        IsAlterarSenhaProximoAcesso: boolean;
        readonly Status: Snebur.Dominio.EnumStatusUsuario;
        Nome: string;
    }
    export interface IVideo  extends Snebur.Dominio.IMedia,Snebur.Dominio.IArquivo,Snebur.Dominio.IEntidade
    {
    }
}
namespace Snebur.Dominio.Atributos
{
    export interface IBaseValorPadrao
    {
        readonly IsTipoNullableRequerido: boolean;
        readonly IsValorPadraoOnUpdate: boolean;
    }
    export interface IChaveEstrangeiraAttribute
    {
        readonly NomePropriedade: string;
    }
    export interface IIgnorarAlerta
    {
        readonly IgnorarAlerta: boolean;
    }
    export interface IValidacaoCondicional
    {
    }
}
namespace Snebur.IO
{
    export interface IAcessoDiretorio
    {
        readonly IsAutenticar: boolean;
        readonly IsRede: boolean;
        readonly Caminho: string | null;
        readonly Dominio: string | null;
        readonly Usuario: string | null;
        readonly Senha: string | null;
    }
}
namespace Snebur.Serializacao
{
    export interface IBaseDominio
    {
    }
    export interface IBaseDominioControladorPropriedade  extends Snebur.Serializacao.IBaseDominio
    {
        DestivarControladorPropriedadeAlterada(): void;
        AtivarControladorPropriedadeAlterada(): void;
    }
}
namespace Snebur.Servicos
{
    export interface IServicoLogAplicacao
    {
        NotificarLogAplicacao(mensagem: string, informacaoAdicional: Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado | null): string;
        NotificarAplicacaoAtiva(informacaoAdicional: Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado | null): void;
        AtivarLogServicoOnline(informacaoAdicional: Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado | null): boolean;
    }
    export interface IServicoLogDesempenho
    {
        NotificarLogDesempenho(mensagem: string, stackTrace: string | null, tipoLogDesempenho: Snebur.Servicos.EnumTipoLogDesempenho, informacaoAdicional: Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado | null): string;
    }
    export interface IServicoLogErro
    {
        NotificarErro(nomeTipoErro: string, mensagem: string, statkTrace: string, descricaoCompleta: string, nivelErro: Snebur.EnumNivelErro, informacaoAdicional: Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado | null): string;
        CapturarPrimeiroErro(): boolean;
    }
    export interface IServicoLogSeguranca
    {
        NotificarLogSeguranca(mensagem: string, stackTrace: string | null, infoRequisicao: Snebur.Comunicacao.InfoRequisicao | null, tipoLogSeguranca: Snebur.Servicos.EnumTipoLogSeguranca, informacaoAdicional: Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado | null): string;
    }
}