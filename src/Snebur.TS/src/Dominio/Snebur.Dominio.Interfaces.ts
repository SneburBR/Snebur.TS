/*eslint-disable*/
//Data : segunda-feira, 8 de maio de 2023
//Hora : 18:16:11
//@Namespace: Snebur.Dominio
//@PrioridadeDominio: 0
//@Globalizar: False
//@Dominios dependentes: []

namespace Snebur.Comunicacao
{
    export interface IBaseServico
    {
        PingAsync() : Promise<boolean>;
    }
    export interface IServicoUsuario extends Snebur.Comunicacao.IBaseServico 
    {
        IsExisteInformacaoIpAsync() : Promise<boolean>;
        AtualizarInformacaoIpAsync(ipInformacao : Snebur.Dominio.DadosIPInformacao) : Promise<void>;
        ExisteIdentificadorUsuarioAsync(identificadorUsuario : string) : Promise<Snebur.Comunicacao.ResultadoExisteIdentificadoUsuario>;
        ValidarCredencialAsync(credencial : Snebur.Seguranca.CredencialUsuario) : Promise<Snebur.Dominio.EnumResultadoValidacaoCredencial>;
        SessaoUsuarioAtivaAsync(credencial : Snebur.Seguranca.CredencialUsuario,identificadorSessaoUsuario : string) : Promise<boolean>;
        RetornarUsuarioAsync(credencial : Snebur.Seguranca.CredencialUsuario) : Promise<Snebur.Dominio.IUsuario>;
        AutenticarAsync(credencial : Snebur.Seguranca.CredencialUsuario) : Promise<Snebur.Comunicacao.ResultadoAutenticacao>;
        RetornarSessaoUsuarioAsync(identificadorSessaoUsuario : string) : Promise<Snebur.Dominio.ISessaoUsuario>;
        CadastrarNovoUsuarioAsync(novoUsuario : Snebur.Dominio.NovoUsuario,isAlterarSenhaProximoAcesso : boolean) : Promise<Snebur.Dominio.IUsuario>;
        EnviarCodigoRecuperarSenhaAsync(identificadorAmigavel : string) : Promise<Snebur.Comunicacao.ResultadoEnviarCodigoRecuperarSenha>;
        ValidarCodigRecuperarSenhaAsync(identificadorAmigavel : string,codigoRecuperarSenha : string) : Promise<Snebur.Comunicacao.ResultadoValidarCodigoRecuperarSenha>;
        RecuperarSenhaAsync(identificadorAmigavel : string,codigoRecuperarSenha : string,novaSenha : string) : Promise<Snebur.Comunicacao.ResultadoRecuperarSenha>;
        AlterarSenhaAsync(credencial : Snebur.Seguranca.CredencialUsuario,novaSenha : string) : Promise<Snebur.Comunicacao.ResultadoAlterarSenha>;
        FinalizarSessaoUsuarioAsync(identificadorSessaoUsuario : string) : Promise<void>;
    }
}
namespace Snebur.Dominio
{
    export interface IPropriedadesDesbloqueada
    {
        NomeEntidade : string;
        NomeProprieade : string;
        EnumTipoDesbloqueio : Snebur.Dominio.EnumTipoDesbloqueio;
    }
    export interface IDpiVisualizacao
    {
    }
    export interface IHistoricoManutencao extends Snebur.Dominio.IEntidade 
    {
        MigrationId : string;
        Prioridade : number;
        NomeTipoManutencao : string;
        DataHoraExecucao? : Date;
        DataHoraUltimaExecucao? : Date;
        IsSucesso : boolean;
        MensagemErro : string;
        NumeroTentativa : number;
    }
    export interface IAlteracaoPropriedade extends Snebur.Dominio.IAtividadeUsuario,Snebur.Dominio.IEntidade 
    {
        DataHoraFimAlteracao? : Date;
    }
    export interface IAlteracaoPropriedadeGenerica extends Snebur.Dominio.IAtividadeUsuario,Snebur.Dominio.IEntidade 
    {
        IdEntidade : number;
        NomeTipoEntidade : string;
        NomePropriedade : string;
        TipoPrimario? : Snebur.Reflexao.EnumTipoPrimario | null;
        IsTipoComplexo : boolean;
        ValorPropriedadeAntigo : string;
        ValorPropriedadeAlterada : string;
        DataHoraFimAlteracao? : Date;
    }
    export interface IAtivo extends Snebur.Dominio.IEntidade 
    {
        IsAtivo : boolean;
    }
    export interface ICongelado extends Snebur.Dominio.IEntidade 
    {
        IsCongelado : boolean;
    }
    export interface IDeletado extends Snebur.Dominio.IEntidade 
    {
        IsDeletado : boolean;
        DataHoraDeletado? : Date;
        SessaoUsuarioDeletado_Id? : number;
        SessaoUsuarioDeletado : Snebur.Dominio.ISessaoUsuario;
    }
    export interface IEntidade
    {
        Id : number;
        readonly __NomeTipoEntidade : string;
        readonly __IdentificadorEntidade : string;
        readonly __PropriedadesAlteradas : DicionarioSimples<Snebur.Dominio.PropriedadeAlterada>;
        RetornarIdentificadorReferencia() : string;
    }
    export interface IEntidadeIdentificadorProprietario extends Snebur.Dominio.IEntidade,Snebur.Dominio.IIdentificadorProprietario 
    {
    }
    export interface IIdentificadorProprietario
    {
        IdentificadorProprietario : string;
    }
    export interface INormalizarIdentificadorProprietario
    {
    }
    export interface IOrdenacao
    {
        Ordenacao? : number;
    }
    export interface IOrdenacaoEntidade extends Snebur.Dominio.IEntidade,Snebur.Dominio.IOrdenacao 
    {
    }
    export interface ISelecionado
    {
        IsSelecionado : boolean;
    }
    export interface IArrastar
    {
        Posicao : Snebur.Dominio.Posicao;
    }
    export interface ICaminhoTipo
    {
        readonly __CaminhoTipo : string;
    }
    export interface ICredencial
    {
        IdentificadorUsuario : string;
        Senha : string;
    }
    export interface ICredencialUsuario extends Snebur.Dominio.ICredencial 
    {
        Nome : string;
        IdentificadorAmigavel : string;
    }
    export interface IIdentificador
    {
        readonly Identificador : string;
    }
    export interface IIdentificadorAplicacao
    {
        IdentificadorAplicacao : string;
    }
    export interface IIPInformacao
    {
        IP : string;
        MascaraIp4 : string;
        Hostname : string;
        Cidade : string;
        Regiao : string;
        Pais : string;
        CodigoPostal : string;
        Localizacao : Snebur.Dominio.Localizacao;
        ProvedorInternet : string;
    }
    export interface IIPInformacaoEntidade extends Snebur.Dominio.IIPInformacao,Snebur.Dominio.IEntidade 
    {
    }
    export interface INomeTipoEntidade
    {
        readonly __NomeTipoEntidade : string;
    }
    export interface IPropriedadeAlterada
    {
        NomePropriedade : string;
        AntigoValor : any;
        NovoValor : any;
    }
    export interface IArquivo extends Snebur.Dominio.IEntidade 
    {
        NomeArquivo : string;
        CaminhoArquivo : string;
        Checksum : string;
        TotalBytesLocal : number;
        TotalBytes : number;
        IsExisteArquivo : boolean;
        DataHoraCadastro? : Date;
        DataHoraInicioEnvio? : Date;
        DataHoraFimEnvio? : Date;
        DataHoraArquivoDeletado? : Date;
        Status : Snebur.Dominio.EnumStatusArquivo;
        Progresso : number;
        SessaoUsuario : Snebur.Dominio.ISessaoUsuario;
        MimeType : Snebur.Dominio.EnumMimeType;
    }
    export interface IAudio extends Snebur.Dominio.IMedia,Snebur.Dominio.IArquivo,Snebur.Dominio.IEntidade 
    {
    }
    export interface IDocumento extends Snebur.Dominio.IArquivo,Snebur.Dominio.IEntidade 
    {
    }
    export interface IImagem extends Snebur.Dominio.IMedia,Snebur.Dominio.IArquivo,Snebur.Dominio.IEntidade 
    {
        ChecksumArquivoLocal : string;
        IsExisteMiniatura : boolean;
        IsExistePequena : boolean;
        IsExisteMedia : boolean;
        IsExisteGrande : boolean;
        TotalBytesMiniatura : number;
        TotalBytesPequena : number;
        TotalBytesMedia : number;
        TotalBytesGrande : number;
        IsIcone : boolean;
        DimensaoImagemMiniatura : Snebur.Dominio.Dimensao;
        DimensaoImagemPequena : Snebur.Dominio.Dimensao;
        DimensaoImagemMedia : Snebur.Dominio.Dimensao;
        DimensaoImagemGrande : Snebur.Dominio.Dimensao;
        DimensaoImagemOrigem : Snebur.Dominio.Dimensao;
        DimensaoImagemLocal : Snebur.Dominio.Dimensao;
        DimensaoImagemImpressao : Snebur.Dominio.Dimensao;
        FormatoImagem : Snebur.Dominio.EnumFormatoImagem;
    }
    export interface IArquivoDeletada
    {
        Imagem_Id : number;
        DataHoraCadastro : Date;
        DataHoraArquivoDeletado : Date;
    }
    export interface IMedia extends Snebur.Dominio.IArquivo,Snebur.Dominio.IEntidade 
    {
    }
    export interface IPerfilIcc
    {
        Nome : string;
        Checksum : string;
        DataHoraCadastro? : Date;
        TotalBytes : number;
    }
    export interface IVideo extends Snebur.Dominio.IMedia,Snebur.Dominio.IArquivo,Snebur.Dominio.IEntidade 
    {
    }
    export interface ILogServicoArquivo extends Snebur.Dominio.IEntidade 
    {
        StatusServicoArquivo : Snebur.Dominio.EnumStatusServicoArquivo;
        IndetificadorLog : string;
        SessaoUsuario : Snebur.Dominio.ISessaoUsuario;
        DataHoraInicio? : Date;
        DataHoraUltimaAtividade? : Date;
        DataHoraFim? : Date;
        TotalBytesEnviado : number;
        TotalArquivosLocal : number;
        TotalArquivosEnviado : number;
        ProgressoEnvioArquivo : number;
        VelocidadeEnvio : number;
    }
    export interface IEntidadeSeguranca extends Snebur.Dominio.IEntidade 
    {
    }
    export interface IAtividadeUsuario extends Snebur.Dominio.IEntidade 
    {
        DataHora? : Date;
        Usuario : Snebur.Dominio.IUsuario;
        UsuarioNotificacao : Snebur.Dominio.IUsuario;
        IP : string;
        SessaoUsuario_Id : number;
        SessaoUsuario : Snebur.Dominio.ISessaoUsuario;
    }
    export interface IIdentificadorSessaoUsuario
    {
        IdentificadorSessaoUsuario : string;
    }
    export interface IInformacaoSessao extends Snebur.Dominio.IIdentificadorAplicacao 
    {
        Cultura : string;
        Idioma : string;
        Plataforma : Snebur.Dominio.EnumPlataforma;
        TipoAplicacao : Snebur.Dominio.EnumTipoAplicacao;
        Resolucao : Snebur.Dominio.Dimensao;
        UserAgent : string;
        Navegador : Snebur.Dominio.Navegador;
        SistemaOperacional : Snebur.Dominio.SistemaOperacional;
        VersaoAplicacao : string;
        NomeComputador : string;
    }
    export interface ISessaoUsuario extends Snebur.Dominio.IEntidade,Snebur.Dominio.IInformacaoSessao,Snebur.Dominio.IIdentificadorAplicacao,Snebur.Dominio.IIdentificadorSessaoUsuario,Snebur.Dominio.IIdentificadorProprietario 
    {
        Usuario : Snebur.Dominio.IUsuario;
        Usuario_Id : number;
        IP : string;
        IPInformacao : Snebur.Dominio.IIPInformacao;
        Status : Snebur.Dominio.EnumStatusSessaoUsuario;
        StatusServicoArquivo : Snebur.Dominio.EnumStatusServicoArquivo;
        MotivoBloqueio : string;
        DataHoraExpiracaoBloqueio? : Date;
        DataHoraInicio? : Date;
        DataHoraUltimoAcesso? : Date;
        DataHoraFim? : Date;
        Duracao? : TimeSpan;
    }
    export interface IUsuario extends Snebur.Dominio.IEntidadeSeguranca,Snebur.Dominio.IEntidade,Snebur.Dominio.IIdentificador,Snebur.Dominio.ICredencial 
    {
        Nome : string;
        DataHoraUltimoAcesso? : Date;
        IsDesativado : boolean;
        IsAlterarSenhaProximoAcesso : boolean;
        readonly Status : Snebur.Dominio.EnumStatusUsuario;
    }
    export interface IFiltroImagem
    {
        Exposicao? : number;
        Magenta? : number;
        Ciano? : number;
        Amarelo? : number;
        Contraste? : number;
        Brilho? : number;
        Sepia? : number;
        Saturacao? : number;
        PretoBranco? : number;
        Inverter? : number;
        Matriz? : number;
        Desfoque? : number;
    }
    export interface IArea extends Snebur.Dominio.IMargem,Snebur.Dominio.IDimensao 
    {
        Margem? : Snebur.Dominio.Margem;
        Dimensao? : Snebur.Dominio.Dimensao;
        CalcularRegiao?(dimensaoRecipiente : Snebur.Dominio.Dimensao) : Snebur.Dominio.Regiao;
    }
    export interface IBorda
    {
        Cor : Snebur.Dominio.Cor;
        CorRgba : string;
        IsInterna : boolean;
        Afastamento : number;
        Espessura : number;
        Arredondamento : number;
    }
    export interface ICor
    {
        readonly Red : number;
        readonly Green : number;
        readonly Blue : number;
        readonly AlphaDecimal : number;
        Rgba : string;
    }
    export interface IDimensao
    {
        Largura : number;
        Altura : number;
    }
    export interface IMargem
    {
        Esquerda? : number;
        Superior? : number;
        Direita? : number;
        Inferior? : number;
    }
    export interface IPosicao
    {
        X : number;
        Y : number;
    }
    export interface IPrecoTempo
    {
        Prazo : number;
        TipoPrazo : Snebur.Dominio.EnumTipoPrazo;
    }
    export interface IRegiao extends Snebur.Dominio.IPosicao,Snebur.Dominio.IDimensao 
    {
        readonly Posicao? : Snebur.Dominio.Posicao;
        readonly Dimensao? : Snebur.Dominio.Dimensao;
    }
    export interface ITipoComplexo
    {
    }
}
namespace Snebur.Dominio.Atributos
{
    export interface IChaveEstrangeiraAttribute
    {
        readonly NomePropriedade : string;
    }
    export interface IBaseValorPadrao
    {
        readonly IsTipoNullableRequerido : boolean;
        readonly IsValorPadraoOnUpdate : boolean;
    }
    export interface IIgnorarAlerta
    {
        readonly IgnorarAlerta : boolean;
    }
    export interface IValidacaoCondicional
    {
    }
}
namespace Snebur.IO
{
    export interface IAcessoDiretorio
    {
        readonly Caminho : string;
        readonly IsAutenticar : boolean;
        readonly IsRede : boolean;
        readonly Dominio : string;
        readonly Usuario : string;
        readonly Senha : string;
    }
}
namespace Snebur.Serializacao
{
    export interface IBaseDominio
    {
    }
    export interface IBaseDominioControladorPropriedade extends Snebur.Serializacao.IBaseDominio 
    {
        DestivarControladorPropriedadeAlterada() : void;
        AtivarControladorPropriedadeAlterada() : void;
    }
}
namespace Snebur.Servicos
{
    export interface IServicoLogErro
    {
        NotificarErro(nomeTipoErro : string,mensagem : string,statkTrace : string,descricaoCompleta : string,nivelErro : Snebur.EnumNivelErro,informacaoAdicional : Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado) : string;
        CapturarPrimeiroErro() : boolean;
    }
    export interface IServicoLogAplicacao
    {
        NotificarLogAplicacao(mensagem : string,informacaoAdicional : Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado) : string;
        NotificarAplicacaoAtiva(informacaoAdicional : Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado) : void;
        AtivarLogServicoOnline(informacaoAdicional : Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado) : boolean;
    }
    export interface IServicoLogDesempenho
    {
        NotificarLogDesempenho(mensagem : string,stackTrace : string,tipoLogDesempenho : Snebur.Servicos.EnumTipoLogDesempenho,informacaoAdicional : Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado) : string;
    }
    export interface IServicoLogSeguranca
    {
        NotificarLogSeguranca(mensagem : string,stackTrace : string,tipoLogSeguranca : Snebur.Servicos.EnumTipoLogSeguranca,informacaoAdicional : Snebur.Servicos.BaseInformacaoAdicionalServicoCompartilhado) : string;
    }
}