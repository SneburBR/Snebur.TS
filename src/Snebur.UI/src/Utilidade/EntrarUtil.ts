namespace Snebur.Utilidade
{
    export class AutenticacaoUtil
    {
        public static ConstrutorJanelaEntrar: { new(): Snebur.UI.JanelaAutenticacao; };

        //public static async EntrarAsync(callback: CallbackResultado<boolean>)
        //{
        //    if ($Aplicacao.IsUsuarioLogado)
        //    {
        //        callback(true);
        //        return;
        //    }

        //    if (!u.ValidacaoUtil.IsConstrutor(this.ConstrutorJanelaEntrar))
        //    {
        //        throw new Error("O construtor da janela entrar não foi definido");
        //    }

        //    const janela = new this.ConstrutorJanelaEntrar();
        //    await janela.MostrarAsync();
        //    callback($Aplicacao.IsUsuarioLogado);
        //}

        public static async EntrarAsync(): Promise<boolean>
        {

            if (!$Aplicacao.IsUsuarioLogado)
            {
                if (typeof this.ConstrutorJanelaEntrar === "function")
                {
                    const janela = new this.ConstrutorJanelaEntrar();
                    await janela.MostrarAsync();
                }
                /*throw new Erro("Não implementado");*/

            }
            return $Aplicacao.IsUsuarioLogado;
        }
    }
}