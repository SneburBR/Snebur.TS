// Auto-generated file. Classes - Snebur.Comunicacao. Do not modify directly. 
//@Project: Snebur.Comunicacao
//@DataHora: 2026-06-17 12:16:05
//@Artifact: Classes
//@Namespace: Snebur.Comunicacao.Dominio 
//@PrioridadeDominio: 1
//@Globalizar: False 
//@Dominios dependentes: []
/*eslint-disable*/
// Ignore Spelling: *

namespace Snebur.Comunicacao
{
    export abstract class BaseComunicao  extends Snebur.Dominio.BaseDominio
    {
        
        public constructor(inicializador?: Partial<BaseComunicao>) 
        {
            super(inicializador);
        }
    }
    export class ContratoMensageiro  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        private _nomeRecurso: string | null  = null;
        private _remetente: Snebur.Dominio.BaseDominio | null  = null;
        private _destinatario: Snebur.Dominio.BaseDominio | null  = null;
        private _valorParametro: Snebur.Dominio.BaseDominio | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ContratoMensageiro>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeRecurso(): string | null
        {
            return this._nomeRecurso;
        }
        public set NomeRecurso(value: string | null) 
        {
            this.SetProperty("NomeRecurso", this._nomeRecurso, this._nomeRecurso = value);
        }
        
        public get Remetente(): Snebur.Dominio.BaseDominio | null
        {
            return this._remetente;
        }
        public set Remetente(value: Snebur.Dominio.BaseDominio | null) 
        {
            this.SetProperty("Remetente", this._remetente, this._remetente = value);
        }
        
        public get Destinatario(): Snebur.Dominio.BaseDominio | null
        {
            return this._destinatario;
        }
        public set Destinatario(value: Snebur.Dominio.BaseDominio | null) 
        {
            this.SetProperty("Destinatario", this._destinatario, this._destinatario = value);
        }
        
        public get ValorParametro(): Snebur.Dominio.BaseDominio | null
        {
            return this._valorParametro;
        }
        public set ValorParametro(value: Snebur.Dominio.BaseDominio | null) 
        {
            this.SetProperty("ValorParametro", this._valorParametro, this._valorParametro = value);
        }
    }
    export class Remetente  extends Snebur.Dominio.BaseDominio
    {
        
        public constructor(inicializador?: Partial<Remetente>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class Cabecalho  extends Snebur.Comunicacao.BaseComunicao
    {
        //#region Private Fields
        private _identificadorProprietario: string | null  = null;
        private _urlOrigem: string | null  = null;
        private _credencialServico: Snebur.Seguranca.CredencialServico | null  = null;
        private _credencialUsuario: Snebur.Seguranca.CredencialUsuario | null  = null;
        private _credencialAvalista: Snebur.Seguranca.CredencialUsuario | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<Cabecalho>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IdentificadorProprietario(): string | null
        {
            return this._identificadorProprietario;
        }
        public set IdentificadorProprietario(value: string | null) 
        {
            this.SetProperty("IdentificadorProprietario", this._identificadorProprietario, this._identificadorProprietario = value);
        }
        
        public get UrlOrigem(): string | null
        {
            return this._urlOrigem;
        }
        public set UrlOrigem(value: string | null) 
        {
            this.SetProperty("UrlOrigem", this._urlOrigem, this._urlOrigem = value);
        }
        
        public get CredencialServico(): Snebur.Seguranca.CredencialServico | null
        {
            return this._credencialServico;
        }
        public set CredencialServico(value: Snebur.Seguranca.CredencialServico | null) 
        {
            this.SetProperty("CredencialServico", this._credencialServico, this._credencialServico = value);
        }
        
        public get CredencialUsuario(): Snebur.Seguranca.CredencialUsuario | null
        {
            return this._credencialUsuario;
        }
        public set CredencialUsuario(value: Snebur.Seguranca.CredencialUsuario | null) 
        {
            this.SetProperty("CredencialUsuario", this._credencialUsuario, this._credencialUsuario = value);
        }
        
        public get CredencialAvalista(): Snebur.Seguranca.CredencialUsuario | null
        {
            return this._credencialAvalista;
        }
        public set CredencialAvalista(value: Snebur.Seguranca.CredencialUsuario | null) 
        {
            this.SetProperty("CredencialAvalista", this._credencialAvalista, this._credencialAvalista = value);
        }
    }
    export class ChamadaRegraNegocio  extends Snebur.Comunicacao.BaseComunicao
    {
        //#region Private Fields
        private _assemblyQualifiedName: string | null  = null;
        private _nomeMetodo: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ChamadaRegraNegocio>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get AssemblyQualifiedName(): string | null
        {
            return this._assemblyQualifiedName;
        }
        public set AssemblyQualifiedName(value: string | null) 
        {
            this.SetProperty("AssemblyQualifiedName", this._assemblyQualifiedName, this._assemblyQualifiedName = value);
        }
        
        public get NomeMetodo(): string | null
        {
            return this._nomeMetodo;
        }
        public set NomeMetodo(value: string | null) 
        {
            this.SetProperty("NomeMetodo", this._nomeMetodo, this._nomeMetodo = value);
        }
    }
    export class ConfiguracaoServicoImagem  extends Snebur.Comunicacao.BaseComunicao
    {
        //#region Private Fields
        private _urlVisualizarImagem: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ConfiguracaoServicoImagem>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get UrlVisualizarImagem(): string | null
        {
            return this._urlVisualizarImagem;
        }
        public set UrlVisualizarImagem(value: string | null) 
        {
            this.SetProperty("UrlVisualizarImagem", this._urlVisualizarImagem, this._urlVisualizarImagem = value);
        }
    }
    export class ContratoChamada  extends Snebur.Comunicacao.BaseComunicao
    {
        //#region Private Fields
        private _identificadorSessaoUsuario: string  = "00000000-0000-0000-0000-000000000000";
        private _dataHora: Date  = new Date('0001-01-01T00:00:00.000Z');
        private _async: boolean  = false;
        private _operacao: string | null  = null;
        private _cabecalho: Snebur.Comunicacao.Cabecalho | null  = null;
        private _informacaoSessao: Snebur.Dominio.InformacaoAmbienteSessaoCliente | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ContratoChamada>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IdentificadorSessaoUsuario(): string
        {
            return this._identificadorSessaoUsuario;
        }
        public set IdentificadorSessaoUsuario(value: string) 
        {
            this.SetProperty("IdentificadorSessaoUsuario", this._identificadorSessaoUsuario, this._identificadorSessaoUsuario = value);
        }
        
        public get DataHora(): Date
        {
            return this._dataHora;
        }
        public set DataHora(value: Date) 
        {
            this.SetProperty("DataHora", this._dataHora, this._dataHora = value);
        }
        
        public get Async(): boolean
        {
            return this._async;
        }
        public set Async(value: boolean) 
        {
            this.SetProperty("Async", this._async, this._async = value);
        }
        
        public get Operacao(): string | null
        {
            return this._operacao;
        }
        public set Operacao(value: string | null) 
        {
            this.SetProperty("Operacao", this._operacao, this._operacao = value);
        }
        
        public get Cabecalho(): Snebur.Comunicacao.Cabecalho | null
        {
            return this._cabecalho;
        }
        public set Cabecalho(value: Snebur.Comunicacao.Cabecalho | null) 
        {
            this.SetProperty("Cabecalho", this._cabecalho, this._cabecalho = value);
        }
        
        public get InformacaoSessao(): Snebur.Dominio.InformacaoAmbienteSessaoCliente | null
        {
            return this._informacaoSessao;
        }
        public set InformacaoSessao(value: Snebur.Dominio.InformacaoAmbienteSessaoCliente | null) 
        {
            this.SetProperty("InformacaoSessao", this._informacaoSessao, this._informacaoSessao = value);
        }
        public readonly Parametros = new Array<Snebur.Comunicacao.ParametroChamada>();
    }
    export class DominioGlobalizacao  extends Snebur.Dominio.BaseViewModel
    {
        //#region Private Fields
        private _namespaceGlobalizacao: string | null  = null;
        private _jsonBase54: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<DominioGlobalizacao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NamespaceGlobalizacao(): string | null
        {
            return this._namespaceGlobalizacao;
        }
        public set NamespaceGlobalizacao(value: string | null) 
        {
            this.SetProperty("NamespaceGlobalizacao", this._namespaceGlobalizacao, this._namespaceGlobalizacao = value);
        }
        
        public get JsonBase54(): string | null
        {
            return this._jsonBase54;
        }
        public set JsonBase54(value: string | null) 
        {
            this.SetProperty("JsonBase54", this._jsonBase54, this._jsonBase54 = value);
        }
    }
    export abstract class ParametroChamada  extends Snebur.Comunicacao.BaseComunicao
    {
        //#region Private Fields
        protected _nome: string | null  = null;
        protected _nomeTipoParametro: string | null  = null;
        protected _assemblyQualifiedName: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ParametroChamada>) 
        {
            super(inicializador);
        }
        
        public get Nome(): string | null
        {
            return this._nome;
        }
        public set Nome(value: string | null) 
        {
            this.SetProperty("Nome", this._nome, this._nome = value);
        }
        
        public get NomeTipoParametro(): string | null
        {
            return this._nomeTipoParametro;
        }
        public set NomeTipoParametro(value: string | null) 
        {
            this.SetProperty("NomeTipoParametro", this._nomeTipoParametro, this._nomeTipoParametro = value);
        }
        
        public get AssemblyQualifiedName(): string | null
        {
            return this._assemblyQualifiedName;
        }
        public set AssemblyQualifiedName(value: string | null) 
        {
            this.SetProperty("AssemblyQualifiedName", this._assemblyQualifiedName, this._assemblyQualifiedName = value);
        }
    }
    export abstract class ResultadoChamada  extends Snebur.Comunicacao.BaseComunicao
    {
        //#region Private Fields
        protected _dataHora: Date  = new Date('0001-01-01T00:00:00.000Z');
        protected _nomeServico: string | null  = null;
        protected _operacao: string | null  = null;
        protected _extraOpcional: Snebur.Dominio.BaseDominio | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoChamada>) 
        {
            super(inicializador);
        }
        
        public get DataHora(): Date
        {
            return this._dataHora;
        }
        public set DataHora(value: Date) 
        {
            this.SetProperty("DataHora", this._dataHora, this._dataHora = value);
        }
        
        public get NomeServico(): string | null
        {
            return this._nomeServico;
        }
        public set NomeServico(value: string | null) 
        {
            this.SetProperty("NomeServico", this._nomeServico, this._nomeServico = value);
        }
        
        public get Operacao(): string | null
        {
            return this._operacao;
        }
        public set Operacao(value: string | null) 
        {
            this.SetProperty("Operacao", this._operacao, this._operacao = value);
        }
        
        public get ExtraOpcional(): Snebur.Dominio.BaseDominio | null
        {
            return this._extraOpcional;
        }
        public set ExtraOpcional(value: Snebur.Dominio.BaseDominio | null) 
        {
            this.SetProperty("ExtraOpcional", this._extraOpcional, this._extraOpcional = value);
        }
    }
    export class ResultadoGlobalizacao  extends Snebur.Dominio.BaseViewModel
    {
        //#region Private Fields
        private _jsonIdiomaBase64: string | null  = null;
        private _jsonCulturaBase64: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoGlobalizacao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get JsonIdiomaBase64(): string | null
        {
            return this._jsonIdiomaBase64;
        }
        public set JsonIdiomaBase64(value: string | null) 
        {
            this.SetProperty("JsonIdiomaBase64", this._jsonIdiomaBase64, this._jsonIdiomaBase64 = value);
        }
        
        public get JsonCulturaBase64(): string | null
        {
            return this._jsonCulturaBase64;
        }
        public set JsonCulturaBase64(value: string | null) 
        {
            this.SetProperty("JsonCulturaBase64", this._jsonCulturaBase64, this._jsonCulturaBase64 = value);
        }
        public readonly Dominios = new Array<Snebur.Comunicacao.DominioGlobalizacao>();
        public readonly Telas = new Array<Snebur.Comunicacao.TelaGlobalizacao>();
    }
    export class TelaGlobalizacao  extends Snebur.Dominio.BaseViewModel
    {
        //#region Private Fields
        private _namespaceGlobalizacao: string | null  = null;
        private _jsonBase54: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<TelaGlobalizacao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NamespaceGlobalizacao(): string | null
        {
            return this._namespaceGlobalizacao;
        }
        public set NamespaceGlobalizacao(value: string | null) 
        {
            this.SetProperty("NamespaceGlobalizacao", this._namespaceGlobalizacao, this._namespaceGlobalizacao = value);
        }
        
        public get JsonBase54(): string | null
        {
            return this._jsonBase54;
        }
        public set JsonBase54(value: string | null) 
        {
            this.SetProperty("JsonBase54", this._jsonBase54, this._jsonBase54 = value);
        }
    }
    export class ParametroChamadaBaseDominio  extends Snebur.Comunicacao.ParametroChamada
    {
        //#region Private Fields
        private _baseDominio: Snebur.Dominio.BaseDominio | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ParametroChamadaBaseDominio>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get BaseDominio(): Snebur.Dominio.BaseDominio | null
        {
            return this._baseDominio;
        }
        public set BaseDominio(value: Snebur.Dominio.BaseDominio | null) 
        {
            this.SetProperty("BaseDominio", this._baseDominio, this._baseDominio = value);
        }
    }
    export class ParametroChamadaEnum  extends Snebur.Comunicacao.ParametroChamada
    {
        //#region Private Fields
        private _valor: number  = 0;
        private _nomeTipoEnum: string | null  = null;
        private _namespaceEnum: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ParametroChamadaEnum>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get Valor(): number
        {
            return this._valor;
        }
        public set Valor(value: number) 
        {
            this.SetProperty("Valor", this._valor, this._valor = value);
        }
        
        public get NomeTipoEnum(): string | null
        {
            return this._nomeTipoEnum;
        }
        public set NomeTipoEnum(value: string | null) 
        {
            this.SetProperty("NomeTipoEnum", this._nomeTipoEnum, this._nomeTipoEnum = value);
        }
        
        public get NamespaceEnum(): string | null
        {
            return this._namespaceEnum;
        }
        public set NamespaceEnum(value: string | null) 
        {
            this.SetProperty("NamespaceEnum", this._namespaceEnum, this._namespaceEnum = value);
        }
    }
    export abstract class ParametroChamadaLista  extends Snebur.Comunicacao.ParametroChamada
    {
        
        public constructor(inicializador?: Partial<ParametroChamadaLista>) 
        {
            super(inicializador);
        }
    }
    export class ParametroChamadaNulo  extends Snebur.Comunicacao.ParametroChamada
    {
        
        public constructor(inicializador?: Partial<ParametroChamadaNulo>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class ParametroChamadaTipoPrimario  extends Snebur.Comunicacao.ParametroChamada
    {
        //#region Private Fields
        private _tipoPrimarioEnum: Snebur.Reflexao.EnumTipoPrimario  = Snebur.Reflexao.EnumTipoPrimario.Undefined;
        private _valor: any | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ParametroChamadaTipoPrimario>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get TipoPrimarioEnum(): Snebur.Reflexao.EnumTipoPrimario
        {
            return this._tipoPrimarioEnum;
        }
        public set TipoPrimarioEnum(value: Snebur.Reflexao.EnumTipoPrimario) 
        {
            this.SetProperty("TipoPrimarioEnum", this._tipoPrimarioEnum, this._tipoPrimarioEnum = value);
        }
        
        public get Valor(): any | null
        {
            return this._valor;
        }
        public set Valor(value: any | null) 
        {
            this.SetProperty("Valor", this._valor, this._valor = value);
        }
    }
    export class ResultadoChamadaBaseDominio  extends Snebur.Comunicacao.ResultadoChamada
    {
        //#region Private Fields
        private _baseDominio: Snebur.Dominio.BaseDominio | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoChamadaBaseDominio>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get BaseDominio(): Snebur.Dominio.BaseDominio | null
        {
            return this._baseDominio;
        }
        public set BaseDominio(value: Snebur.Dominio.BaseDominio | null) 
        {
            this.SetProperty("BaseDominio", this._baseDominio, this._baseDominio = value);
        }
    }
    export class ResultadoChamadaEnum  extends Snebur.Comunicacao.ResultadoChamada
    {
        //#region Private Fields
        private _valor: number  = 0;
        private _nomeTipoEnum: string | null  = null;
        private _namespaceEnum: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoChamadaEnum>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get Valor(): number
        {
            return this._valor;
        }
        public set Valor(value: number) 
        {
            this.SetProperty("Valor", this._valor, this._valor = value);
        }
        
        public get NomeTipoEnum(): string | null
        {
            return this._nomeTipoEnum;
        }
        public set NomeTipoEnum(value: string | null) 
        {
            this.SetProperty("NomeTipoEnum", this._nomeTipoEnum, this._nomeTipoEnum = value);
        }
        
        public get NamespaceEnum(): string | null
        {
            return this._namespaceEnum;
        }
        public set NamespaceEnum(value: string | null) 
        {
            this.SetProperty("NamespaceEnum", this._namespaceEnum, this._namespaceEnum = value);
        }
    }
    export abstract class ResultadoChamadaErro  extends Snebur.Comunicacao.ResultadoChamada
    {
        //#region Private Fields
        protected _statusCode: number  = 0;
        protected _mensagemErro: string | null  = null;
        protected _erro: any | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoChamadaErro>) 
        {
            super(inicializador);
        }
        
        public get StatusCode(): number
        {
            return this._statusCode;
        }
        public set StatusCode(value: number) 
        {
            this.SetProperty("StatusCode", this._statusCode, this._statusCode = value);
        }
        
        public get MensagemErro(): string | null
        {
            return this._mensagemErro;
        }
        public set MensagemErro(value: string | null) 
        {
            this.SetProperty("MensagemErro", this._mensagemErro, this._mensagemErro = value);
        }
        
        public get Erro(): any | null
        {
            return this._erro;
        }
        public set Erro(value: any | null) 
        {
            this.SetProperty("Erro", this._erro, this._erro = value);
        }
    }
    export abstract class ResultadoChamadaLista  extends Snebur.Comunicacao.ResultadoChamada
    {
        //#region Private Fields
        protected _assemblyQualifiedName: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoChamadaLista>) 
        {
            super(inicializador);
        }
        
        public get AssemblyQualifiedName(): string | null
        {
            return this._assemblyQualifiedName;
        }
        public set AssemblyQualifiedName(value: string | null) 
        {
            this.SetProperty("AssemblyQualifiedName", this._assemblyQualifiedName, this._assemblyQualifiedName = value);
        }
    }
    export class ResultadoChamadaTipoPrimario  extends Snebur.Comunicacao.ResultadoChamada
    {
        //#region Private Fields
        private _tipoPrimarioEnum: Snebur.Reflexao.EnumTipoPrimario  = Snebur.Reflexao.EnumTipoPrimario.Undefined;
        private _valor: any | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoChamadaTipoPrimario>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get TipoPrimarioEnum(): Snebur.Reflexao.EnumTipoPrimario
        {
            return this._tipoPrimarioEnum;
        }
        public set TipoPrimarioEnum(value: Snebur.Reflexao.EnumTipoPrimario) 
        {
            this.SetProperty("TipoPrimarioEnum", this._tipoPrimarioEnum, this._tipoPrimarioEnum = value);
        }
        
        public get Valor(): any | null
        {
            return this._valor;
        }
        public set Valor(value: any | null) 
        {
            this.SetProperty("Valor", this._valor, this._valor = value);
        }
    }
    export class ResultadoChamadaVazio  extends Snebur.Comunicacao.ResultadoChamada
    {
        
        public constructor(inicializador?: Partial<ResultadoChamadaVazio>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class ParametroChamadaListaBaseDominio  extends Snebur.Comunicacao.ParametroChamadaLista
    {
        //#region Private Fields
        private _nomeTipoBaseDominio: string | null  = null;
        private _nomeNamespaceTipoBaseDominio: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ParametroChamadaListaBaseDominio>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeTipoBaseDominio(): string | null
        {
            return this._nomeTipoBaseDominio;
        }
        public set NomeTipoBaseDominio(value: string | null) 
        {
            this.SetProperty("NomeTipoBaseDominio", this._nomeTipoBaseDominio, this._nomeTipoBaseDominio = value);
        }
        
        public get NomeNamespaceTipoBaseDominio(): string | null
        {
            return this._nomeNamespaceTipoBaseDominio;
        }
        public set NomeNamespaceTipoBaseDominio(value: string | null) 
        {
            this.SetProperty("NomeNamespaceTipoBaseDominio", this._nomeNamespaceTipoBaseDominio, this._nomeNamespaceTipoBaseDominio = value);
        }
        public readonly BasesDominio: Array<Snebur.Dominio.BaseDominio | null> = new Array<Snebur.Dominio.BaseDominio>();
    }
    export class ParametroChamadaListaEntidades  extends Snebur.Comunicacao.ParametroChamadaLista
    {
        //#region Private Fields
        private _nomeTipoEntidade: string | null  = null;
        private _nomeNamespaceNomeTipoEntidade: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ParametroChamadaListaEntidades>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeTipoEntidade(): string | null
        {
            return this._nomeTipoEntidade;
        }
        public set NomeTipoEntidade(value: string | null) 
        {
            this.SetProperty("NomeTipoEntidade", this._nomeTipoEntidade, this._nomeTipoEntidade = value);
        }
        
        public get NomeNamespaceNomeTipoEntidade(): string | null
        {
            return this._nomeNamespaceNomeTipoEntidade;
        }
        public set NomeNamespaceNomeTipoEntidade(value: string | null) 
        {
            this.SetProperty("NomeNamespaceNomeTipoEntidade", this._nomeNamespaceNomeTipoEntidade, this._nomeNamespaceNomeTipoEntidade = value);
        }
        public readonly Entidades: Array<Snebur.Dominio.Entidade | null> = new Array<Snebur.Dominio.Entidade>();
    }
    export class ParametroChamadaListaEnum  extends Snebur.Comunicacao.ParametroChamadaLista
    {
        //#region Private Fields
        private _nomeTipoEnum: string | null  = null;
        private _namespaceEnum: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ParametroChamadaListaEnum>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeTipoEnum(): string | null
        {
            return this._nomeTipoEnum;
        }
        public set NomeTipoEnum(value: string | null) 
        {
            this.SetProperty("NomeTipoEnum", this._nomeTipoEnum, this._nomeTipoEnum = value);
        }
        
        public get NamespaceEnum(): string | null
        {
            return this._namespaceEnum;
        }
        public set NamespaceEnum(value: string | null) 
        {
            this.SetProperty("NamespaceEnum", this._namespaceEnum, this._namespaceEnum = value);
        }
        public readonly Valores = new Array<number>();
    }
    export class ParametroChamadaListaTipoComplexo  extends Snebur.Comunicacao.ParametroChamadaLista
    {
        //#region Private Fields
        private _nomeTipoComplexo: string | null  = null;
        private _nomeNamespaceTipoComplexo: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ParametroChamadaListaTipoComplexo>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeTipoComplexo(): string | null
        {
            return this._nomeTipoComplexo;
        }
        public set NomeTipoComplexo(value: string | null) 
        {
            this.SetProperty("NomeTipoComplexo", this._nomeTipoComplexo, this._nomeTipoComplexo = value);
        }
        
        public get NomeNamespaceTipoComplexo(): string | null
        {
            return this._nomeNamespaceTipoComplexo;
        }
        public set NomeNamespaceTipoComplexo(value: string | null) 
        {
            this.SetProperty("NomeNamespaceTipoComplexo", this._nomeNamespaceTipoComplexo, this._nomeNamespaceTipoComplexo = value);
        }
        public readonly TiposComplexo: Array<Snebur.Dominio.BaseTipoComplexo | null> = new Array<Snebur.Dominio.BaseTipoComplexo>();
    }
    export class ParametroChamadaListaTipoPrimario  extends Snebur.Comunicacao.ParametroChamadaLista
    {
        //#region Private Fields
        private _tipoPrimarioEnum: Snebur.Reflexao.EnumTipoPrimario  = Snebur.Reflexao.EnumTipoPrimario.Undefined;
        //#endregion
        
        public constructor(inicializador?: Partial<ParametroChamadaListaTipoPrimario>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get TipoPrimarioEnum(): Snebur.Reflexao.EnumTipoPrimario
        {
            return this._tipoPrimarioEnum;
        }
        public set TipoPrimarioEnum(value: Snebur.Reflexao.EnumTipoPrimario) 
        {
            this.SetProperty("TipoPrimarioEnum", this._tipoPrimarioEnum, this._tipoPrimarioEnum = value);
        }
        public readonly Lista: Array<any | null> = new Array<any>();
    }
    export class ResultadoChamadaErroInternoServidor  extends Snebur.Comunicacao.ResultadoChamadaErro
    {
        
        public constructor(inicializador?: Partial<ResultadoChamadaErroInternoServidor>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class ResultadoChamadaListaBaseDominio  extends Snebur.Comunicacao.ResultadoChamadaLista
    {
        //#region Private Fields
        private _nomeTipoBaseDominio: string | null  = null;
        private _nomeNamespaceTipoBaseDominio: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoChamadaListaBaseDominio>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeTipoBaseDominio(): string | null
        {
            return this._nomeTipoBaseDominio;
        }
        public set NomeTipoBaseDominio(value: string | null) 
        {
            this.SetProperty("NomeTipoBaseDominio", this._nomeTipoBaseDominio, this._nomeTipoBaseDominio = value);
        }
        
        public get NomeNamespaceTipoBaseDominio(): string | null
        {
            return this._nomeNamespaceTipoBaseDominio;
        }
        public set NomeNamespaceTipoBaseDominio(value: string | null) 
        {
            this.SetProperty("NomeNamespaceTipoBaseDominio", this._nomeNamespaceTipoBaseDominio, this._nomeNamespaceTipoBaseDominio = value);
        }
        public readonly BasesDominio = new Array<Snebur.Dominio.BaseDominio>();
    }
    export class ResultadoChamadaListaEnum  extends Snebur.Comunicacao.ResultadoChamadaLista
    {
        //#region Private Fields
        private _nomeTipoEnum: string | null  = null;
        private _namespaceEnum: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoChamadaListaEnum>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeTipoEnum(): string | null
        {
            return this._nomeTipoEnum;
        }
        public set NomeTipoEnum(value: string | null) 
        {
            this.SetProperty("NomeTipoEnum", this._nomeTipoEnum, this._nomeTipoEnum = value);
        }
        
        public get NamespaceEnum(): string | null
        {
            return this._namespaceEnum;
        }
        public set NamespaceEnum(value: string | null) 
        {
            this.SetProperty("NamespaceEnum", this._namespaceEnum, this._namespaceEnum = value);
        }
        public readonly Valores = new Array<number>();
    }
    export class ResultadoChamadaListaTipoPrimario  extends Snebur.Comunicacao.ResultadoChamadaLista
    {
        //#region Private Fields
        private _tipoPrimarioEnum: Snebur.Reflexao.EnumTipoPrimario  = Snebur.Reflexao.EnumTipoPrimario.Undefined;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoChamadaListaTipoPrimario>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get TipoPrimarioEnum(): Snebur.Reflexao.EnumTipoPrimario
        {
            return this._tipoPrimarioEnum;
        }
        public set TipoPrimarioEnum(value: Snebur.Reflexao.EnumTipoPrimario) 
        {
            this.SetProperty("TipoPrimarioEnum", this._tipoPrimarioEnum, this._tipoPrimarioEnum = value);
        }
        public readonly Valores = new Array<any>();
    }
    export class ResultadoSessaoUsuarioInvalida  extends Snebur.Comunicacao.ResultadoChamadaErro
    {
        //#region Private Fields
        private _statusSessaoUsuario: Snebur.Dominio.EnumStatusSessaoUsuario  = Snebur.Dominio.EnumStatusSessaoUsuario.Undefined;
        private _identificadorSessaoUsuario: string | null  = null;
        //#endregion
        
        public constructor(statusSessaoUsuario: Snebur.Dominio.EnumStatusSessaoUsuario, identificadorSessaoUsuario: string | null, mensagemErro: string) 
        {
            super();
            if (!Snebur.u.JsonUtil.IsSerializado)
            {
                Snebur.Guard.NotNull(statusSessaoUsuario, "statusSessaoUsuario");
            }
            this._statusSessaoUsuario = statusSessaoUsuario;
            this._identificadorSessaoUsuario = identificadorSessaoUsuario;
            this._mensagemErro = mensagemErro;
        }
        
        
        public get StatusSessaoUsuario(): Snebur.Dominio.EnumStatusSessaoUsuario
        {
            return this._statusSessaoUsuario;
        }
        public set StatusSessaoUsuario(value: Snebur.Dominio.EnumStatusSessaoUsuario) 
        {
            this.SetProperty("StatusSessaoUsuario", this._statusSessaoUsuario, this._statusSessaoUsuario = value);
        }
        
        public get IdentificadorSessaoUsuario(): string | null
        {
            return this._identificadorSessaoUsuario;
        }
        public set IdentificadorSessaoUsuario(value: string | null) 
        {
            this.SetProperty("IdentificadorSessaoUsuario", this._identificadorSessaoUsuario, this._identificadorSessaoUsuario = value);
        }
    }
}