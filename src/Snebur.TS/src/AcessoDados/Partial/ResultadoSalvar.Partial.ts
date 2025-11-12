namespace Snebur.AcessoDados
{
    export interface ResultadoSalvar
    {
        RetornarMensagemErroFormatada(): string;
    }

    Object.defineProperty(ResultadoSalvar.prototype, "RetornarMensagemErroFormatada", {
        value: function (this: ResultadoSalvar): string
        {
            if (this.IsSucesso)
            {
                console.error(` ResultadoSalvar: IsSucesso true, mas RetornarMensagemErroFormatada foi chamado.`);
                return "Salvo com sucesso";
            }

            if (this.ErrosValidacao?.length > 0)
            {
                return this.ErrosValidacao.Take(5).map(e => e.Mensagem).join("<br />");
            }
            if (!String.IsNullOrWhiteSpace(this.MensagemErro))
            {
                return this.MensagemErro.substring(0, 500);
            }
            return "Ocorreu um erro desconhecido ao salvar os dados.";
        }
    });

}

