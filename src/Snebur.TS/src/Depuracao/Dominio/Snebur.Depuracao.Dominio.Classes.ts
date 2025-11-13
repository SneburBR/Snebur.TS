// Auto-generated file. Classes - Snebur.Depuracao. Do not modify directly. 
//@Project: Snebur.Depuracao
//@DataHora: 2025-11-13 14:51:28
//@Artifact: Classes
//@Namespace: Snebur.Depuracao.Dominio 
//@PrioridadeDominio: 4
//@Globalizar: False 
//@Dominios dependentes: []
/*eslint-disable*/
// Ignore Spelling: *

namespace Snebur.Depuracao
{
    export class Contrato  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        private _mensagem: Snebur.Depuracao.Mensagem | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<Contrato>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get Mensagem(): Snebur.Depuracao.Mensagem | null
        {
            return this._mensagem;
        }
        public set Mensagem(value: Snebur.Depuracao.Mensagem | null) 
        {
            this.SetProperty("Mensagem", this._mensagem, this._mensagem = value);
        }
    }
    export abstract class Mensagem  extends Snebur.Dominio.BaseDominio
    {
        
        public constructor(inicializador?: Partial<Mensagem>) 
        {
            super(inicializador);
        }
    }
    export class MensagemControleAlterado  extends Snebur.Depuracao.Mensagem
    {
        //#region Private Fields
        private _isScript: boolean  = false;
        private _urlScriptRuntime: string  = "";
        private _caminhoConstrutor: string  = "";
        private _nomeControle: string  = "";
        //#endregion
        
        public constructor(inicializador?: Partial<MensagemControleAlterado>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IsScript(): boolean
        {
            return this._isScript;
        }
        public set IsScript(value: boolean) 
        {
            this.SetProperty("IsScript", this._isScript, this._isScript = value);
        }
        
        public get UrlScriptRuntime(): string
        {
            return this._urlScriptRuntime;
        }
        public set UrlScriptRuntime(value: string) 
        {
            this.SetProperty("UrlScriptRuntime", this._urlScriptRuntime, this._urlScriptRuntime = value);
        }
        
        public get CaminhoConstrutor(): string
        {
            return this._caminhoConstrutor;
        }
        public set CaminhoConstrutor(value: string) 
        {
            this.SetProperty("CaminhoConstrutor", this._caminhoConstrutor, this._caminhoConstrutor = value);
        }
        
        public get NomeControle(): string
        {
            return this._nomeControle;
        }
        public set NomeControle(value: string) 
        {
            this.SetProperty("NomeControle", this._nomeControle, this._nomeControle = value);
        }
    }
    export class MensagemEstiloCssAlterado  extends Snebur.Depuracao.Mensagem
    {
        //#region Private Fields
        private _nomeArquivo: string  = "";
        //#endregion
        
        public constructor(inicializador?: Partial<MensagemEstiloCssAlterado>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeArquivo(): string
        {
            return this._nomeArquivo;
        }
        public set NomeArquivo(value: string) 
        {
            this.SetProperty("NomeArquivo", this._nomeArquivo, this._nomeArquivo = value);
        }
    }
    export class MensagemIrParaCodigo  extends Snebur.Depuracao.Mensagem
    {
        //#region Private Fields
        private _nomeControle: string  = "";
        private _searchElementPattern: string  = "";
        private _tagElemento: string  = "";
        private _namespace: string  = "";
        //#endregion
        
        public constructor(inicializador?: Partial<MensagemIrParaCodigo>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeControle(): string
        {
            return this._nomeControle;
        }
        public set NomeControle(value: string) 
        {
            this.SetProperty("NomeControle", this._nomeControle, this._nomeControle = value);
        }
        
        public get SearchElementPattern(): string
        {
            return this._searchElementPattern;
        }
        public set SearchElementPattern(value: string) 
        {
            this.SetProperty("SearchElementPattern", this._searchElementPattern, this._searchElementPattern = value);
        }
        
        public get TagElemento(): string
        {
            return this._tagElemento;
        }
        public set TagElemento(value: string) 
        {
            this.SetProperty("TagElemento", this._tagElemento, this._tagElemento = value);
        }
        
        public get Namespace(): string
        {
            return this._namespace;
        }
        public set Namespace(value: string) 
        {
            this.SetProperty("Namespace", this._namespace, this._namespace = value);
        }
    }
    export class MensagemLog  extends Snebur.Depuracao.Mensagem
    {
        //#region Private Fields
        private _tipoLog: Snebur.Depuracao.EnumTipoLog  = Snebur.Depuracao.EnumTipoLog.Undefined;
        private _mensagem: string  = "";
        //#endregion
        
        public constructor(inicializador?: Partial<MensagemLog>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get TipoLog(): Snebur.Depuracao.EnumTipoLog
        {
            return this._tipoLog;
        }
        public set TipoLog(value: Snebur.Depuracao.EnumTipoLog) 
        {
            this.SetProperty("TipoLog", this._tipoLog, this._tipoLog = value);
        }
        
        public get Mensagem(): string
        {
            return this._mensagem;
        }
        public set Mensagem(value: string) 
        {
            this.SetProperty("Mensagem", this._mensagem, this._mensagem = value);
        }
    }
    export class MensagemPing  extends Snebur.Depuracao.Mensagem
    {
        //#region Private Fields
        private _ping: boolean  = false;
        private _dataHora: Date  = new Date('0001-01-01T00:00:00.000Z');
        //#endregion
        
        public constructor(inicializador?: Partial<MensagemPing>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get Ping(): boolean
        {
            return this._ping;
        }
        public set Ping(value: boolean) 
        {
            this.SetProperty("Ping", this._ping, this._ping = value);
        }
        
        public get DataHora(): Date
        {
            return this._dataHora;
        }
        public set DataHora(value: Date) 
        {
            this.SetProperty("DataHora", this._dataHora, this._dataHora = value);
        }
    }
    export class MensagemScriptAlterado  extends Snebur.Depuracao.Mensagem
    {
        //#region Private Fields
        private _nomeArquivo: string  = "";
        //#endregion
        
        public constructor(inicializador?: Partial<MensagemScriptAlterado>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get NomeArquivo(): string
        {
            return this._nomeArquivo;
        }
        public set NomeArquivo(value: string) 
        {
            this.SetProperty("NomeArquivo", this._nomeArquivo, this._nomeArquivo = value);
        }
    }
}