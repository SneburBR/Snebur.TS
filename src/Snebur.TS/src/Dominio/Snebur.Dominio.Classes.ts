/*eslint-disable*/
//Data : sábado, 29 de abril de 2023
//Hora : 19:56:45
//@Namespace: Snebur.Dominio
//@PrioridadeDominio: 0
//@Globalizar: False
//@Dominios dependentes: []

namespace Snebur.Comunicacao
{
    export abstract class BaseResultadoRecuperarSenha extends Snebur.Dominio.BaseDominio
    {
        //#region Propriedades
    
        private _isSucesso : boolean = false;
        private _limiteTentantivaAtingido : number = 0;
        private _tempoRestante : number = 0;
        private _mensagemErro : string = null;
    
        public get IsSucesso(): boolean 
        {
            return this._isSucesso;
        }

        public set IsSucesso(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsSucesso", this._isSucesso, this._isSucesso = value);
        }
    
        public get LimiteTentantivaAtingido(): number 
        {
            return this._limiteTentantivaAtingido;
        }

        public set LimiteTentantivaAtingido(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("LimiteTentantivaAtingido", this._limiteTentantivaAtingido, this._limiteTentantivaAtingido = value);
        }
    
        public get TempoRestante(): number 
        {
            return this._tempoRestante;
        }

        public set TempoRestante(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("TempoRestante", this._tempoRestante, this._tempoRestante = value);
        }
    
        public get MensagemErro(): string 
        {
            return this._mensagemErro;
        }

        public set MensagemErro(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("MensagemErro", this._mensagemErro, this._mensagemErro = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<BaseResultadoRecuperarSenha>) 
        {
            super(inicializador);
        }
        //#endregion
    }
    export class ResultadoAutenticacao extends Snebur.Dominio.BaseDominio
    {
        //#region Propriedades
    
        private _isSucesso : boolean = false;
        private _resultado : Snebur.Dominio.EnumResultadoAutenticacao = 0;
        private _isAlterarSenhaProximoAcesso : boolean = false;
        private _tempoEsperar : number = 0;
    
        public get IsSucesso(): boolean 
        {
            return this._isSucesso;
        }

        public set IsSucesso(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsSucesso", this._isSucesso, this._isSucesso = value);
        }
    
        public get Resultado(): Snebur.Dominio.EnumResultadoAutenticacao 
        {
            return this._resultado;
        }

        public set Resultado(value: Snebur.Dominio.EnumResultadoAutenticacao) 
        {
            this.NotificarValorPropriedadeAlterada("Resultado", this._resultado, this._resultado = value);
        }
    
        public get IsAlterarSenhaProximoAcesso(): boolean 
        {
            return this._isAlterarSenhaProximoAcesso;
        }

        public set IsAlterarSenhaProximoAcesso(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsAlterarSenhaProximoAcesso", this._isAlterarSenhaProximoAcesso, this._isAlterarSenhaProximoAcesso = value);
        }
    
        public get TempoEsperar(): number 
        {
            return this._tempoEsperar;
        }

        public set TempoEsperar(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("TempoEsperar", this._tempoEsperar, this._tempoEsperar = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ResultadoAutenticacao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ResultadoExisteIdentificadoUsuario extends Snebur.Dominio.BaseDominio
    {
        //#region Propriedades
    
        private _nome : string = null;
        private _isExiste : boolean = false;
    
        public get Nome(): string 
        {
            return this._nome;
        }

        public set Nome(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Nome", this._nome, this._nome = value);
        }
    
        public get IsExiste(): boolean 
        {
            return this._isExiste;
        }

        public set IsExiste(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsExiste", this._isExiste, this._isExiste = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ResultadoExisteIdentificadoUsuario>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ResultadoAlterarSenha extends Snebur.Comunicacao.BaseResultadoRecuperarSenha
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<ResultadoAlterarSenha>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ResultadoEnviarCodigoRecuperarSenha extends Snebur.Comunicacao.BaseResultadoRecuperarSenha
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<ResultadoEnviarCodigoRecuperarSenha>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ResultadoRecuperarSenha extends Snebur.Comunicacao.BaseResultadoRecuperarSenha
    {
        //#region Propriedades
    
        private _isUsuarioEncontrado : boolean = false;
        private _status : Snebur.Dominio.EnumStatusCodigoRecuperarSenha = 0;
    
        public get IsUsuarioEncontrado(): boolean 
        {
            return this._isUsuarioEncontrado;
        }

        public set IsUsuarioEncontrado(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsUsuarioEncontrado", this._isUsuarioEncontrado, this._isUsuarioEncontrado = value);
        }
    
        public get Status(): Snebur.Dominio.EnumStatusCodigoRecuperarSenha 
        {
            return this._status;
        }

        public set Status(value: Snebur.Dominio.EnumStatusCodigoRecuperarSenha) 
        {
            this.NotificarValorPropriedadeAlterada("Status", this._status, this._status = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ResultadoRecuperarSenha>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ResultadoValidarCodigoRecuperarSenha extends Snebur.Comunicacao.BaseResultadoRecuperarSenha
    {
        //#region Propriedades
    
        private _isUsuarioEncontrado : boolean = false;
        private _status : Snebur.Dominio.EnumStatusCodigoRecuperarSenha = 0;
        private _tempoEsperar : number = 0;
    
        public get IsUsuarioEncontrado(): boolean 
        {
            return this._isUsuarioEncontrado;
        }

        public set IsUsuarioEncontrado(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsUsuarioEncontrado", this._isUsuarioEncontrado, this._isUsuarioEncontrado = value);
        }
    
        public get Status(): Snebur.Dominio.EnumStatusCodigoRecuperarSenha 
        {
            return this._status;
        }

        public set Status(value: Snebur.Dominio.EnumStatusCodigoRecuperarSenha) 
        {
            this.NotificarValorPropriedadeAlterada("Status", this._status, this._status = value);
        }
    
        public get TempoEsperar(): number 
        {
            return this._tempoEsperar;
        }

        public set TempoEsperar(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("TempoEsperar", this._tempoEsperar, this._tempoEsperar = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ResultadoValidarCodigoRecuperarSenha>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
}
namespace Snebur.Dominio
{
    export class InformacaoSessao extends Snebur.Dominio.BaseDominio implements Snebur.Dominio.IInformacaoSessao, Snebur.Dominio.IIdentificadorAplicacao 
    {
        //#region Propriedades
    
        private _identificadorAplicacaoGuid : string = "00000000-0000-0000-0000-000000000000";
        private _identificadorAplicacao : string = null;
        private _cultura : string = null;
        private _idioma : string = null;
        private _plataforma : Snebur.Dominio.EnumPlataforma = 0;
        private _tipoAplicacao : Snebur.Dominio.EnumTipoAplicacao = 0;
        private _resolucao : Snebur.Dominio.Dimensao =  new Snebur.Dominio.Dimensao();
        private _userAgent : string = null;
        private _navegador : Snebur.Dominio.Navegador =  new Snebur.Dominio.Navegador();
        private _sistemaOperacional : Snebur.Dominio.SistemaOperacional =  new Snebur.Dominio.SistemaOperacional();
        private _versaoAplicacao : string = null;
        private _nomeComputador : string = null;
    
        public get IdentificadorAplicacaoGuid(): string 
        {
            return this._identificadorAplicacaoGuid;
        }

        public set IdentificadorAplicacaoGuid(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("IdentificadorAplicacaoGuid", this._identificadorAplicacaoGuid, this._identificadorAplicacaoGuid = value);
        }
    
        public get IdentificadorAplicacao(): string 
        {
            return this._identificadorAplicacao;
        }

        public set IdentificadorAplicacao(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("IdentificadorAplicacao", this._identificadorAplicacao, this._identificadorAplicacao = value);
        }
    
        public get Cultura(): string 
        {
            return this._cultura;
        }

        public set Cultura(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Cultura", this._cultura, this._cultura = value);
        }
    
        public get Idioma(): string 
        {
            return this._idioma;
        }

        public set Idioma(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Idioma", this._idioma, this._idioma = value);
        }
    
        public get Plataforma(): Snebur.Dominio.EnumPlataforma 
        {
            return this._plataforma;
        }

        public set Plataforma(value: Snebur.Dominio.EnumPlataforma) 
        {
            this.NotificarValorPropriedadeAlterada("Plataforma", this._plataforma, this._plataforma = value);
        }
    
        public get TipoAplicacao(): Snebur.Dominio.EnumTipoAplicacao 
        {
            return this._tipoAplicacao;
        }

        public set TipoAplicacao(value: Snebur.Dominio.EnumTipoAplicacao) 
        {
            this.NotificarValorPropriedadeAlterada("TipoAplicacao", this._tipoAplicacao, this._tipoAplicacao = value);
        }
    
        public get Resolucao(): Snebur.Dominio.Dimensao 
        {
            return this._resolucao;
        }

        public set Resolucao(value: Snebur.Dominio.Dimensao) 
        {
            this.NotificarValorPropriedadeAlteradaTipoCompleto("Resolucao", this._resolucao, this._resolucao = value.Clone());
        }
    
        public get UserAgent(): string 
        {
            return this._userAgent;
        }

        public set UserAgent(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("UserAgent", this._userAgent, this._userAgent = value);
        }
    
        public get Navegador(): Snebur.Dominio.Navegador 
        {
            return this._navegador;
        }

        public set Navegador(value: Snebur.Dominio.Navegador) 
        {
            this.NotificarValorPropriedadeAlteradaTipoCompleto("Navegador", this._navegador, this._navegador = value.Clone());
        }
    
        public get SistemaOperacional(): Snebur.Dominio.SistemaOperacional 
        {
            return this._sistemaOperacional;
        }

        public set SistemaOperacional(value: Snebur.Dominio.SistemaOperacional) 
        {
            this.NotificarValorPropriedadeAlteradaTipoCompleto("SistemaOperacional", this._sistemaOperacional, this._sistemaOperacional = value.Clone());
        }
    
        public get VersaoAplicacao(): string 
        {
            return this._versaoAplicacao;
        }

        public set VersaoAplicacao(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("VersaoAplicacao", this._versaoAplicacao, this._versaoAplicacao = value);
        }
    
        public get NomeComputador(): string 
        {
            return this._nomeComputador;
        }

        public set NomeComputador(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomeComputador", this._nomeComputador, this._nomeComputador = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<InformacaoSessao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class NovoUsuario extends Snebur.Dominio.BaseDominio
    {
        //#region Propriedades
    
        private _nome : string = null;
        private _email : string = null;
        private _telefone : string = null;
        private _senha : string = null;
    
        public get Nome(): string 
        {
            return this._nome;
        }

        public set Nome(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Nome", this._nome, this._nome = value);
        }
    
        public get Email(): string 
        {
            return this._email;
        }

        public set Email(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Email", this._email, this._email = value);
        }
    
        public get Telefone(): string 
        {
            return this._telefone;
        }

        public set Telefone(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Telefone", this._telefone, this._telefone = value);
        }
    
        public get Senha(): string 
        {
            return this._senha;
        }

        public set Senha(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Senha", this._senha, this._senha = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<NovoUsuario>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class DadosIPInformacao extends Snebur.Dominio.BaseDominio implements Snebur.Dominio.IIPInformacao 
    {
        //#region Propriedades
    
        private _ip : string = null;
        private _mascaraIp4 : string = null;
        private _cidade : string = null;
        private _codigoPostal : string = null;
        private _hostname : string = null;
        private _localizacao : Snebur.Dominio.Localizacao =  new Snebur.Dominio.Localizacao(0, 0);
        private _pais : string = null;
        private _provedorInternet : string = null;
        private _regiao : string = null;
    
        public get IP(): string 
        {
            return this._ip;
        }

        public set IP(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("IP", this._ip, this._ip = value);
        }
    
        public get MascaraIp4(): string 
        {
            return this._mascaraIp4;
        }

        public set MascaraIp4(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("MascaraIp4", this._mascaraIp4, this._mascaraIp4 = value);
        }
    
        public get Cidade(): string 
        {
            return this._cidade;
        }

        public set Cidade(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Cidade", this._cidade, this._cidade = value);
        }
    
        public get CodigoPostal(): string 
        {
            return this._codigoPostal;
        }

        public set CodigoPostal(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("CodigoPostal", this._codigoPostal, this._codigoPostal = value);
        }
    
        public get Hostname(): string 
        {
            return this._hostname;
        }

        public set Hostname(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Hostname", this._hostname, this._hostname = value);
        }
    
        public get Localizacao(): Snebur.Dominio.Localizacao 
        {
            return this._localizacao;
        }

        public set Localizacao(value: Snebur.Dominio.Localizacao) 
        {
            this.NotificarValorPropriedadeAlteradaTipoCompleto("Localizacao", this._localizacao, this._localizacao = value.Clone());
        }
    
        public get Pais(): string 
        {
            return this._pais;
        }

        public set Pais(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Pais", this._pais, this._pais = value);
        }
    
        public get ProvedorInternet(): string 
        {
            return this._provedorInternet;
        }

        public set ProvedorInternet(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("ProvedorInternet", this._provedorInternet, this._provedorInternet = value);
        }
    
        public get Regiao(): string 
        {
            return this._regiao;
        }

        public set Regiao(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Regiao", this._regiao, this._regiao = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<DadosIPInformacao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ErroValidacao extends Snebur.Dominio.BaseDominio
    {
        //#region Propriedades
    
        private _nomeTipoEntidade : string = null;
        private _nomePropriedade : string = null;
        private _nomeTipoValidacao : string = null;
        private _mensagem : string = null;
    
        public get NomeTipoEntidade(): string 
        {
            return this._nomeTipoEntidade;
        }

        public set NomeTipoEntidade(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomeTipoEntidade", this._nomeTipoEntidade, this._nomeTipoEntidade = value);
        }
    
        public get NomePropriedade(): string 
        {
            return this._nomePropriedade;
        }

        public set NomePropriedade(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
    
        public get NomeTipoValidacao(): string 
        {
            return this._nomeTipoValidacao;
        }

        public set NomeTipoValidacao(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomeTipoValidacao", this._nomeTipoValidacao, this._nomeTipoValidacao = value);
        }
    
        public get Mensagem(): string 
        {
            return this._mensagem;
        }

        public set Mensagem(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Mensagem", this._mensagem, this._mensagem = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ErroValidacao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class InformacaoSessaoUsuario extends Snebur.Dominio.InformacaoSessao implements Snebur.Dominio.IIdentificadorSessaoUsuario 
    {
        //#region Propriedades
    
        private _identificadorSessaoUsuario : string = "00000000-0000-0000-0000-000000000000";
    
        public get IdentificadorSessaoUsuario(): string 
        {
            return this._identificadorSessaoUsuario;
        }

        public set IdentificadorSessaoUsuario(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("IdentificadorSessaoUsuario", this._identificadorSessaoUsuario, this._identificadorSessaoUsuario = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
}
namespace Snebur.Seguranca
{
    export abstract class Credencial extends Snebur.Dominio.BaseDominio implements Snebur.Dominio.ICredencial 
    {
        //#region Propriedades
    
        private _identificadorUsuario : string = null;
        private _senha : string = null;
    
        public get IdentificadorUsuario(): string 
        {
            return this._identificadorUsuario;
        }

        public set IdentificadorUsuario(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("IdentificadorUsuario", this._identificadorUsuario, this._identificadorUsuario = value);
        }
    
        public get Senha(): string 
        {
            return this._senha;
        }

        public set Senha(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Senha", this._senha, this._senha = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<Credencial>) 
        {
            super(inicializador);
        }
        //#endregion
    }
    export class CredencialServico extends Snebur.Seguranca.Credencial
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<CredencialServico>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class CredencialUsuario extends Snebur.Seguranca.Credencial
    {
        //#region Propriedades
    
        private _nome : string = null;
        private _identificadorAmigavel : string = null;
    
        public get Nome(): string 
        {
            return this._nome;
        }

        public set Nome(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Nome", this._nome, this._nome = value);
        }
    
        public get IdentificadorAmigavel(): string 
        {
            return this._identificadorAmigavel;
        }

        public set IdentificadorAmigavel(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("IdentificadorAmigavel", this._identificadorAmigavel, this._identificadorAmigavel = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<CredencialUsuario>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
}
namespace Snebur.Servicos
{
    export abstract class BaseInformacaoAdicionalServicoCompartilhado extends Snebur.Dominio.BaseDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<BaseInformacaoAdicionalServicoCompartilhado>) 
        {
            super(inicializador);
        }
        //#endregion
    }
}