namespace Snebur
{
    export class ErroNaoImplementado extends Snebur.Erro
    {
        public constructor(mensagemOrObj: string | any = "Não implementado", origem: any = null)
        {
            super(ErroNaoImplementado.NormalizarMensagem(mensagemOrObj), origem, null);
        }

        private static NormalizarMensagem(mensagemOrObj: any): string
        {
            if (typeof mensagemOrObj === "string" && mensagemOrObj.trim().length > 0)
            {
                return mensagemOrObj;
            }
            if (typeof mensagemOrObj === "object")
            {
                return `Não implementado em ${mensagemOrObj.constructor?.name}"`;
            }
            return `Não implementado`;
        }
    }
}
