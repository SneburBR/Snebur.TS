// Auto-generated file. Classes - Snebur.ServicoArquivo. Do not modify directly. 
//@Project: Snebur.ServicoArquivo
//@DataHora: 2025-10-16 14:31:37
//@Artifact: Classes
//@Namespace: Snebur.ServicoArquivo.Dominio 
//@PrioridadeDominio: 2
//@Globalizar: False 
//@Dominios dependentes: []
/*eslint-disable*/
// Ignore Spelling: *

namespace Snebur.ServicoArquivo
{
    export class ResultadoServicoArquivo  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        private _id: number  = 0;
        private _isSucesso: boolean  = false;
        private _tipoErroServicoArquivo: Snebur.ServicoArquivo.EnumTipoErroServicoArquivo  = Snebur.ServicoArquivo.EnumTipoErroServicoArquivo.Undefined;
        private _mensagemErro: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoServicoArquivo>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get Id(): number
        {
            return this._id;
        }
        public set Id(value: number) 
        {
            this.SetProperty("Id", this._id, this._id = value);
        }
        
        public get IsSucesso(): boolean
        {
            return this._isSucesso;
        }
        public set IsSucesso(value: boolean) 
        {
            this.SetProperty("IsSucesso", this._isSucesso, this._isSucesso = value);
        }
        
        public get TipoErroServicoArquivo(): Snebur.ServicoArquivo.EnumTipoErroServicoArquivo
        {
            return this._tipoErroServicoArquivo;
        }
        public set TipoErroServicoArquivo(value: Snebur.ServicoArquivo.EnumTipoErroServicoArquivo) 
        {
            this.SetProperty("TipoErroServicoArquivo", this._tipoErroServicoArquivo, this._tipoErroServicoArquivo = value);
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
}