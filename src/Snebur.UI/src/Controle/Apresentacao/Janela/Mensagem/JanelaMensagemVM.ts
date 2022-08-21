namespace Snebur.UI
{
    export class JanelaMensagemVM extends Snebur.Dominio.BaseViewModel
    {
        private _titulo: string;
        private _mensagem: string;

        public readonly Botoes = new ListaObservacao<BotaoMensagemViewModel>();

        public get Titulo(): string
        {
            return this._titulo;
        }

        public set Titulo(value: string)
        {
            this._titulo = value;
            this.NotificarPropriedadeAlterada(x => x.Titulo, this._titulo, this._titulo = value);
        }

        public get Mensagem(): string
        {
            return this._mensagem;
        }

        public set Mensagem(value: string)
        {
            this._mensagem = value;
            this.NotificarPropriedadeAlterada(x => x.Mensagem, this._mensagem, this._mensagem = value);
        }

        public constructor()
        {
            super();

        }

        //public constructor(titulo: string = String.Empty, mensagem: string = String.Empty, botoes: ListaObservacao<BotaoJanelaMensagemVM> = null)
        //{
        //    super();

        //    this.Titulo = titulo;
        //    this.Mensagem = mensagem;

        //    if (botoes instanceof Array)
        //    {
        //        this.Botoes.AddRange(botoes);
        //    }
        //}
    }
}