namespace Snebur.UI
{
    export class BotaoMensagemViewModel extends Snebur.Dominio.BaseViewModel
    {

        private _descricao: string;
        private _resultado: EnumResultadoOpcaoMensagem;

        public get Descricao(): string
        {
            return this._descricao;
        }

        public set Descricao(value: string)
        {
            this._descricao = value;
            this.NotificarPropriedadeAlterada("Descricao", value);
        }

        public get Resultado(): EnumResultadoOpcaoMensagem
        {
            return this._resultado;
        }

        public get TipoBotao(): EnumTipoBotao
        {
            switch (this.Resultado)
            {
                case EnumResultadoOpcaoMensagem.Nao:
                case EnumResultadoOpcaoMensagem.Cancelar:

                    return EnumTipoBotao.Flat;

                default:

                    return EnumTipoBotao.Normal;
            }
        }

        public get CorTexto(): EnumCor
        {
            switch (this.Resultado)
            {
                case EnumResultadoOpcaoMensagem.Nao:
                case EnumResultadoOpcaoMensagem.Cancelar:

                    return EnumCor.SistemaPrincipal;

                default:

                    return EnumCor.Branca;
            }
        }

        public get CorFundo(): EnumCor
        {
            switch (this.Resultado)
            {
                case EnumResultadoOpcaoMensagem.Nao:
                case EnumResultadoOpcaoMensagem.Cancelar:

                    return EnumCor.Vazio;
                default:

                    return EnumCor.SistemaPrincipal;
            }
        }
         
        public constructor(descricao: string, resultado: EnumResultadoOpcaoMensagem)
        {
            super();

            this.Descricao = descricao;
            this._resultado = resultado;
        }
    }
}