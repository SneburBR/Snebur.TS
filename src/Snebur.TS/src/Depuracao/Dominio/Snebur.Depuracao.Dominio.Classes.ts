/*eslint-disable*/
//Data : terça-feira, 16 de agosto de 2022
//Hora : 13:36:03
//@Namespace: Snebur.Depuracao
//@PrioridadeDominio: 4
//@Globalizar: False
//@Dominios dependentes: []

namespace Snebur.Depuracao
{
    export class Contrato extends Snebur.Dominio.BaseDominio
    {
        //#region Propriedades
    
        private _mensagem : Snebur.Depuracao.Mensagem = null;
    
        public get Mensagem(): Snebur.Depuracao.Mensagem 
        {
            return this._mensagem;
        }

        public set Mensagem(value: Snebur.Depuracao.Mensagem)  
        {
            this.NotificarValorPropriedadeAlterada("Mensagem", this._mensagem, this._mensagem = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( mensagem : Snebur.Depuracao.Mensagem ) 
        {
            super();
            this.Inicializar();
            this._mensagem = mensagem;
        }
        //#endregion
    }
    export abstract class Mensagem extends Snebur.Dominio.BaseDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<Mensagem>) 
        {
            super(inicializador);
        }
        //#endregion
    }
    export class MensagemScriptAlterado extends Snebur.Depuracao.Mensagem
    {
        //#region Propriedades
    
        private _nomeArquivo : string = null;
    
        public get NomeArquivo(): string 
        {
            return this._nomeArquivo;
        }

        public set NomeArquivo(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("NomeArquivo", this._nomeArquivo, this._nomeArquivo = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<MensagemScriptAlterado>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class MensagemControleAlterado extends Snebur.Depuracao.Mensagem
    {
        //#region Propriedades
    
        private _isScript : boolean = false;
        private _urlScriptRuntime : string = null;
        private _caminhoConstrutor : string = null;
        private _nomeControle : string = null;
    
        public get IsScript(): boolean 
        {
            return this._isScript;
        }

        public set IsScript(value: boolean)  
        {
            this.NotificarValorPropriedadeAlterada("IsScript", this._isScript, this._isScript = value);
        }
    
        public get UrlScriptRuntime(): string 
        {
            return this._urlScriptRuntime;
        }

        public set UrlScriptRuntime(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("UrlScriptRuntime", this._urlScriptRuntime, this._urlScriptRuntime = value);
        }
    
        public get CaminhoConstrutor(): string 
        {
            return this._caminhoConstrutor;
        }

        public set CaminhoConstrutor(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("CaminhoConstrutor", this._caminhoConstrutor, this._caminhoConstrutor = value);
        }
    
        public get NomeControle(): string 
        {
            return this._nomeControle;
        }

        public set NomeControle(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("NomeControle", this._nomeControle, this._nomeControle = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<MensagemControleAlterado>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class MensagemEstiloCssAlterado extends Snebur.Depuracao.Mensagem
    {
        //#region Propriedades
    
        private _nomeArquivo : string = null;
    
        public get NomeArquivo(): string 
        {
            return this._nomeArquivo;
        }

        public set NomeArquivo(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("NomeArquivo", this._nomeArquivo, this._nomeArquivo = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<MensagemEstiloCssAlterado>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class MensagemLog extends Snebur.Depuracao.Mensagem
    {
        //#region Propriedades
    
        private _mensagem : string = null;
        private _tipoLog : Snebur.Depuracao.EnumTipoLog = 0;
    
        public get Mensagem(): string 
        {
            return this._mensagem;
        }

        public set Mensagem(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Mensagem", this._mensagem, this._mensagem = value);
        }
    
        public get TipoLog(): Snebur.Depuracao.EnumTipoLog 
        {
            return this._tipoLog;
        }

        public set TipoLog(value: Snebur.Depuracao.EnumTipoLog)  
        {
            this.NotificarValorPropriedadeAlterada("TipoLog", this._tipoLog, this._tipoLog = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<MensagemLog>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class MensagemPing extends Snebur.Depuracao.Mensagem
    {
        //#region Propriedades
    
        private _ping : boolean = false;
        private _dataHora : Date =  new Date();
    
        public get Ping(): boolean 
        {
            return this._ping;
        }

        public set Ping(value: boolean)  
        {
            this.NotificarValorPropriedadeAlterada("Ping", this._ping, this._ping = value);
        }
    
        public get DataHora(): Date 
        {
            return this._dataHora;
        }

        public set DataHora(value: Date)  
        {
            this.NotificarValorPropriedadeAlterada("DataHora", this._dataHora, this._dataHora = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<MensagemPing>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
}