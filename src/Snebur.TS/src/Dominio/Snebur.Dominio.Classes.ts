// Auto-generated file. Classes - Snebur. Do not modify directly. 
//@Project: Snebur
//@DataHora: 2026-06-17 12:16:05
//@Artifact: Classes
//@Namespace: Snebur.Dominio 
//@PrioridadeDominio: 0
//@Globalizar: False 
//@Dominios dependentes: []
/*eslint-disable*/
// Ignore Spelling: *

namespace Snebur.Comunicacao
{
    export abstract class BaseResultadoRecuperarSenha  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        protected _isSucesso: boolean  = false;
        protected _limiteTentantivaAtingido: number  = 0;
        protected _tempoRestante: number  = 0;
        protected _mensagemErro: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<BaseResultadoRecuperarSenha>) 
        {
            super(inicializador);
        }
        
        public get IsSucesso(): boolean
        {
            return this._isSucesso;
        }
        public set IsSucesso(value: boolean) 
        {
            this.SetProperty("IsSucesso", this._isSucesso, this._isSucesso = value);
        }
        
        public get LimiteTentantivaAtingido(): number
        {
            return this._limiteTentantivaAtingido;
        }
        public set LimiteTentantivaAtingido(value: number) 
        {
            this.SetProperty("LimiteTentantivaAtingido", this._limiteTentantivaAtingido, this._limiteTentantivaAtingido = value);
        }
        
        public get TempoRestante(): number
        {
            return this._tempoRestante;
        }
        public set TempoRestante(value: number) 
        {
            this.SetProperty("TempoRestante", this._tempoRestante, this._tempoRestante = value);
        }
        
        public get MensagemErro(): string | null
        {
            return this._mensagemErro;
        }
        public set MensagemErro(value: string | null) 
        {
            this.SetProperty("MensagemErro", this._mensagemErro, this._mensagemErro = value);
        }
    }
    export class InfoRequisicao  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        private _userAgent: string | null  = null;
        private _ipRequisicao: string | null  = null;
        private _credencialUsuario: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<InfoRequisicao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get UserAgent(): string | null
        {
            return this._userAgent;
        }
        public set UserAgent(value: string | null) 
        {
            this.SetProperty("UserAgent", this._userAgent, this._userAgent = value);
        }
        
        public get IpRequisicao(): string | null
        {
            return this._ipRequisicao;
        }
        public set IpRequisicao(value: string | null) 
        {
            this.SetProperty("IpRequisicao", this._ipRequisicao, this._ipRequisicao = value);
        }
        
        public get CredencialUsuario(): string | null
        {
            return this._credencialUsuario;
        }
        public set CredencialUsuario(value: string | null) 
        {
            this.SetProperty("CredencialUsuario", this._credencialUsuario, this._credencialUsuario = value);
        }
    }
    export class ResultadoAutenticacao  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        private _isSucesso: boolean  = false;
        private _resultado: Snebur.Dominio.EnumResultadoAutenticacao  = Snebur.Dominio.EnumResultadoAutenticacao.Undefined;
        private _isAlterarSenhaProximoAcesso: boolean  = false;
        private _tempoEsperar: number  = 0;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoAutenticacao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IsSucesso(): boolean
        {
            return this._isSucesso;
        }
        public set IsSucesso(value: boolean) 
        {
            this.SetProperty("IsSucesso", this._isSucesso, this._isSucesso = value);
        }
        
        public get Resultado(): Snebur.Dominio.EnumResultadoAutenticacao
        {
            return this._resultado;
        }
        public set Resultado(value: Snebur.Dominio.EnumResultadoAutenticacao) 
        {
            this.SetProperty("Resultado", this._resultado, this._resultado = value);
        }
        
        public get IsAlterarSenhaProximoAcesso(): boolean
        {
            return this._isAlterarSenhaProximoAcesso;
        }
        public set IsAlterarSenhaProximoAcesso(value: boolean) 
        {
            this.SetProperty("IsAlterarSenhaProximoAcesso", this._isAlterarSenhaProximoAcesso, this._isAlterarSenhaProximoAcesso = value);
        }
        
        public get TempoEsperar(): number
        {
            return this._tempoEsperar;
        }
        public set TempoEsperar(value: number) 
        {
            this.SetProperty("TempoEsperar", this._tempoEsperar, this._tempoEsperar = value);
        }
    }
    export class ResultadoExisteIdentificadoUsuario  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        private _isExiste: boolean  = false;
        private _nome: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoExisteIdentificadoUsuario>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IsExiste(): boolean
        {
            return this._isExiste;
        }
        public set IsExiste(value: boolean) 
        {
            this.SetProperty("IsExiste", this._isExiste, this._isExiste = value);
        }
        
        public get Nome(): string | null
        {
            return this._nome;
        }
        public set Nome(value: string | null) 
        {
            this.SetProperty("Nome", this._nome, this._nome = value);
        }
    }
    export class ResultadoAlterarSenha  extends Snebur.Comunicacao.BaseResultadoRecuperarSenha
    {
        
        public constructor(inicializador?: Partial<ResultadoAlterarSenha>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class ResultadoEnviarCodigoRecuperarSenha  extends Snebur.Comunicacao.BaseResultadoRecuperarSenha
    {
        
        public constructor(inicializador?: Partial<ResultadoEnviarCodigoRecuperarSenha>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class ResultadoRecuperarSenha  extends Snebur.Comunicacao.BaseResultadoRecuperarSenha
    {
        //#region Private Fields
        private _isUsuarioEncontrado: boolean  = false;
        private _status: Snebur.Dominio.EnumStatusCodigoRecuperarSenha  = Snebur.Dominio.EnumStatusCodigoRecuperarSenha.Undefined;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoRecuperarSenha>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IsUsuarioEncontrado(): boolean
        {
            return this._isUsuarioEncontrado;
        }
        public set IsUsuarioEncontrado(value: boolean) 
        {
            this.SetProperty("IsUsuarioEncontrado", this._isUsuarioEncontrado, this._isUsuarioEncontrado = value);
        }
        
        public get Status(): Snebur.Dominio.EnumStatusCodigoRecuperarSenha
        {
            return this._status;
        }
        public set Status(value: Snebur.Dominio.EnumStatusCodigoRecuperarSenha) 
        {
            this.SetProperty("Status", this._status, this._status = value);
        }
    }
    export class ResultadoValidarCodigoRecuperarSenha  extends Snebur.Comunicacao.BaseResultadoRecuperarSenha
    {
        //#region Private Fields
        private _isUsuarioEncontrado: boolean  = false;
        private _status: Snebur.Dominio.EnumStatusCodigoRecuperarSenha  = Snebur.Dominio.EnumStatusCodigoRecuperarSenha.Undefined;
        private _tempoEsperar: number  = 0;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoValidarCodigoRecuperarSenha>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IsUsuarioEncontrado(): boolean
        {
            return this._isUsuarioEncontrado;
        }
        public set IsUsuarioEncontrado(value: boolean) 
        {
            this.SetProperty("IsUsuarioEncontrado", this._isUsuarioEncontrado, this._isUsuarioEncontrado = value);
        }
        
        public get Status(): Snebur.Dominio.EnumStatusCodigoRecuperarSenha
        {
            return this._status;
        }
        public set Status(value: Snebur.Dominio.EnumStatusCodigoRecuperarSenha) 
        {
            this.SetProperty("Status", this._status, this._status = value);
        }
        
        public get TempoEsperar(): number
        {
            return this._tempoEsperar;
        }
        public set TempoEsperar(value: number) 
        {
            this.SetProperty("TempoEsperar", this._tempoEsperar, this._tempoEsperar = value);
        }
    }
}
namespace Snebur.Dominio
{
    export class DadosIPInformacao  extends Snebur.Dominio.BaseDominio  implements Snebur.Dominio.IIPInformacao
    {
        //#region Private Fields
        private _ip: string  = "";
        private _mascaraIp4: string  = "";
        private _cidade: string | null  = null;
        private _codigoPostal: string | null  = null;
        private _hostname: string | null  = null;
        private _pais: string | null  = null;
        private _provedorInternet: string | null  = null;
        private _regiao: string | null  = null;
        private _localizacao: Snebur.Dominio.Localizacao  = new Snebur.Dominio.Localizacao(0, 0);
        //#endregion
        
        public constructor(inicializador?: Partial<DadosIPInformacao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IP(): string
        {
            return this._ip;
        }
        public set IP(value: string) 
        {
            this.SetProperty("IP", this._ip, this._ip = value);
        }
        
        public get MascaraIp4(): string
        {
            return this._mascaraIp4;
        }
        public set MascaraIp4(value: string) 
        {
            this.SetProperty("MascaraIp4", this._mascaraIp4, this._mascaraIp4 = value);
        }
        
        public get Cidade(): string | null
        {
            return this._cidade;
        }
        public set Cidade(value: string | null) 
        {
            this.SetProperty("Cidade", this._cidade, this._cidade = value);
        }
        
        public get CodigoPostal(): string | null
        {
            return this._codigoPostal;
        }
        public set CodigoPostal(value: string | null) 
        {
            this.SetProperty("CodigoPostal", this._codigoPostal, this._codigoPostal = value);
        }
        
        public get Hostname(): string | null
        {
            return this._hostname;
        }
        public set Hostname(value: string | null) 
        {
            this.SetProperty("Hostname", this._hostname, this._hostname = value);
        }
        
        public get Pais(): string | null
        {
            return this._pais;
        }
        public set Pais(value: string | null) 
        {
            this.SetProperty("Pais", this._pais, this._pais = value);
        }
        
        public get ProvedorInternet(): string | null
        {
            return this._provedorInternet;
        }
        public set ProvedorInternet(value: string | null) 
        {
            this.SetProperty("ProvedorInternet", this._provedorInternet, this._provedorInternet = value);
        }
        
        public get Regiao(): string | null
        {
            return this._regiao;
        }
        public set Regiao(value: string | null) 
        {
            this.SetProperty("Regiao", this._regiao, this._regiao = value);
        }
        
        public get Localizacao(): Snebur.Dominio.Localizacao
        {
            return this._localizacao;
        }
        public set Localizacao(value: Snebur.Dominio.Localizacao) 
        {
            Snebur.Guard.NotNull(value, "Localizacao");
            this.SetComplexTypeProperty("Localizacao", this._localizacao, this._localizacao = value.Clone());
        }
    }
    export class ErroValidacaoInfo  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        private _nomeTipoEntidade: string  = "";
        private _nomePropriedade: string  = "";
        private _nomeTipoValidacao: string  = "";
        private _mensagem: string  = "";
        private _valorPropriedade: any | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ErroValidacaoInfo>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeTipoEntidade(): string
        {
            return this._nomeTipoEntidade;
        }
        public set NomeTipoEntidade(value: string) 
        {
            this.SetProperty("NomeTipoEntidade", this._nomeTipoEntidade, this._nomeTipoEntidade = value);
        }
        
        public get NomePropriedade(): string
        {
            return this._nomePropriedade;
        }
        public set NomePropriedade(value: string) 
        {
            this.SetProperty("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
        
        public get NomeTipoValidacao(): string
        {
            return this._nomeTipoValidacao;
        }
        public set NomeTipoValidacao(value: string) 
        {
            this.SetProperty("NomeTipoValidacao", this._nomeTipoValidacao, this._nomeTipoValidacao = value);
        }
        
        public get Mensagem(): string
        {
            return this._mensagem;
        }
        public set Mensagem(value: string) 
        {
            this.SetProperty("Mensagem", this._mensagem, this._mensagem = value);
        }
        
        public get ValorPropriedade(): any | null
        {
            return this._valorPropriedade;
        }
        public set ValorPropriedade(value: any | null) 
        {
            this.SetProperty("ValorPropriedade", this._valorPropriedade, this._valorPropriedade = value);
        }
    }
    export class InformacaoAmbienteSessaoCliente  extends Snebur.Dominio.BaseDominio  implements Snebur.Dominio.IIdentificadorAplicacao, Snebur.Dominio.IInformacaoAmbienteSessaoCliente
    {
        //#region Private Fields
        private _identificadorAplicacaoGuid: string  = "00000000-0000-0000-0000-000000000000";
        private _plataforma: Snebur.Dominio.EnumPlataforma  = Snebur.Dominio.EnumPlataforma.Undefined;
        private _tipoAplicacao: Snebur.Dominio.EnumTipoAplicacao  = Snebur.Dominio.EnumTipoAplicacao.Undefined;
        private _identificadorAplicacao: string  = "";
        private _cultura: string | null  = null;
        private _idioma: string | null  = null;
        private _userAgent: string | null  = null;
        private _versaoAplicacao: string  = "";
        private _nomeComputador: string | null  = null;
        private _resolucao: Snebur.Dominio.Dimensao  = new Snebur.Dominio.Dimensao( 0, 0);
        private _navegador: Snebur.Dominio.Navegador  = new Snebur.Dominio.Navegador(Snebur.Dominio.EnumNavegador.Undefined, "", "");
        private _sistemaOperacional: Snebur.Dominio.SistemaOperacional  = new Snebur.Dominio.SistemaOperacional(Snebur.Dominio.EnumSistemaOperacional.Undefined, "", "", "");
        //#endregion
        
        public constructor(inicializador?: Partial<InformacaoAmbienteSessaoCliente>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IdentificadorAplicacaoGuid(): string
        {
            return this._identificadorAplicacaoGuid;
        }
        public set IdentificadorAplicacaoGuid(value: string) 
        {
            this.SetProperty("IdentificadorAplicacaoGuid", this._identificadorAplicacaoGuid, this._identificadorAplicacaoGuid = value);
        }
        
        public get Plataforma(): Snebur.Dominio.EnumPlataforma
        {
            return this._plataforma;
        }
        public set Plataforma(value: Snebur.Dominio.EnumPlataforma) 
        {
            this.SetProperty("Plataforma", this._plataforma, this._plataforma = value);
        }
        
        public get TipoAplicacao(): Snebur.Dominio.EnumTipoAplicacao
        {
            return this._tipoAplicacao;
        }
        public set TipoAplicacao(value: Snebur.Dominio.EnumTipoAplicacao) 
        {
            this.SetProperty("TipoAplicacao", this._tipoAplicacao, this._tipoAplicacao = value);
        }
        
        public get IdentificadorAplicacao(): string
        {
            return this._identificadorAplicacao;
        }
        public set IdentificadorAplicacao(value: string) 
        {
            this.SetProperty("IdentificadorAplicacao", this._identificadorAplicacao, this._identificadorAplicacao = value);
        }
        
        public get Cultura(): string | null
        {
            return this._cultura;
        }
        public set Cultura(value: string | null) 
        {
            this.SetProperty("Cultura", this._cultura, this._cultura = value);
        }
        
        public get Idioma(): string | null
        {
            return this._idioma;
        }
        public set Idioma(value: string | null) 
        {
            this.SetProperty("Idioma", this._idioma, this._idioma = value);
        }
        
        public get UserAgent(): string | null
        {
            return this._userAgent;
        }
        public set UserAgent(value: string | null) 
        {
            this.SetProperty("UserAgent", this._userAgent, this._userAgent = value);
        }
        
        public get VersaoAplicacao(): string
        {
            return this._versaoAplicacao;
        }
        public set VersaoAplicacao(value: string) 
        {
            this.SetProperty("VersaoAplicacao", this._versaoAplicacao, this._versaoAplicacao = value);
        }
        
        public get NomeComputador(): string | null
        {
            return this._nomeComputador;
        }
        public set NomeComputador(value: string | null) 
        {
            this.SetProperty("NomeComputador", this._nomeComputador, this._nomeComputador = value);
        }
        
        public get Resolucao(): Snebur.Dominio.Dimensao
        {
            return this._resolucao;
        }
        public set Resolucao(value: Snebur.Dominio.Dimensao) 
        {
            Snebur.Guard.NotNull(value, "Resolucao");
            this.SetComplexTypeProperty("Resolucao", this._resolucao, this._resolucao = value.Clone());
        }
        
        public get Navegador(): Snebur.Dominio.Navegador
        {
            return this._navegador;
        }
        public set Navegador(value: Snebur.Dominio.Navegador) 
        {
            Snebur.Guard.NotNull(value, "Navegador");
            this.SetComplexTypeProperty("Navegador", this._navegador, this._navegador = value.Clone());
        }
        
        public get SistemaOperacional(): Snebur.Dominio.SistemaOperacional
        {
            return this._sistemaOperacional;
        }
        public set SistemaOperacional(value: Snebur.Dominio.SistemaOperacional) 
        {
            Snebur.Guard.NotNull(value, "SistemaOperacional");
            this.SetComplexTypeProperty("SistemaOperacional", this._sistemaOperacional, this._sistemaOperacional = value.Clone());
        }
    }
    export abstract class NovoUsuario  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        protected _isValido: boolean  = false;
        protected _nome: string | null  = null;
        protected _email: string | null  = null;
        protected _telefone: string | null  = null;
        protected _senha: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<NovoUsuario>) 
        {
            super(inicializador);
        }
        
        public get IsValido(): boolean
        {
            return this._isValido;
        }
        
        public get Nome(): string | null
        {
            return this._nome;
        }
        public set Nome(value: string | null) 
        {
            this.SetProperty("Nome", this._nome, this._nome = value);
        }
        
        public get Email(): string | null
        {
            return this._email;
        }
        public set Email(value: string | null) 
        {
            this.SetProperty("Email", this._email, this._email = value);
        }
        
        public get Telefone(): string | null
        {
            return this._telefone;
        }
        public set Telefone(value: string | null) 
        {
            this.SetProperty("Telefone", this._telefone, this._telefone = value);
        }
        
        public get Senha(): string | null
        {
            return this._senha;
        }
        public set Senha(value: string | null) 
        {
            this.SetProperty("Senha", this._senha, this._senha = value);
        }
    }
}
namespace Snebur.Seguranca
{
    export abstract class Credencial  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        protected _isValido: boolean  = false;
        protected _identificadorUsuario: string | null  = null;
        protected _identificadorAmigavel: string | null  = null;
        protected _senha: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<Credencial>) 
        {
            super(inicializador);
        }
        
        public get IsValido(): boolean
        {
            return this._isValido;
        }
        
        public get IdentificadorUsuario(): string | null
        {
            return this._identificadorUsuario;
        }
        public set IdentificadorUsuario(value: string | null) 
        {
            this.SetProperty("IdentificadorUsuario", this._identificadorUsuario, this._identificadorUsuario = value);
        }
        
        public get IdentificadorAmigavel(): string | null
        {
            return this._identificadorAmigavel;
        }
        public set IdentificadorAmigavel(value: string | null) 
        {
            this.SetProperty("IdentificadorAmigavel", this._identificadorAmigavel, this._identificadorAmigavel = value);
        }
        
        public get Senha(): string | null
        {
            return this._senha;
        }
        public set Senha(value: string | null) 
        {
            this.SetProperty("Senha", this._senha, this._senha = value);
        }
    }
    export class CredencialServico  extends Snebur.Seguranca.Credencial
    {
        
        public constructor(inicializador?: Partial<CredencialServico>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class CredencialUsuario  extends Snebur.Seguranca.Credencial
    {
        //#region Private Fields
        private _nome: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<CredencialUsuario>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get Nome(): string | null
        {
            return this._nome;
        }
        public set Nome(value: string | null) 
        {
            this.SetProperty("Nome", this._nome, this._nome = value);
        }
    }
}
namespace Snebur.Servicos
{
    export abstract class BaseInformacaoAdicionalServicoCompartilhado  extends Snebur.Dominio.BaseDominio
    {
        
        public constructor(inicializador?: Partial<BaseInformacaoAdicionalServicoCompartilhado>) 
        {
            super(inicializador);
        }
    }
}