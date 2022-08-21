namespace Snebur.UI
{
    export class BarraEnvioArquivosViewModel extends Snebur.Dominio.BaseViewModel
    {
        private _progresso: number = 0;
        private _totalArquivos: number;
        private _arquivosEnviados: number;

        public get Progresso(): number
        {
            return this._progresso;
        }

        public set Progresso(value: number)
        {
            this._progresso = value;
            this.NotificarValorPropriedadeAlterada("Progresso", value);
        }

        public constructor()
        {
            super();
        }
    }
}