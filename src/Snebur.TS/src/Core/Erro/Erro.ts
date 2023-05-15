namespace Snebur
{
    export class Erro extends Error
    {
        public readonly ErroInterno: Error;
        public readonly Stack: string;

        public constructor(mensagem: string)
        public constructor(mensagem: string, erroInterno: Error)
        public constructor(mensagem: string, erroInterno: Error, infoErro: InfoErro)
        public constructor(mensagem: string, origem: any, erroInterno?: Error)
        public constructor(mensagem: string, argumento1?: any, argumento2?: any)
        {
            super(`mensagem ${mensagem} ${Erro.MensagemTeste}`);

            const argumentoErro = (argumento2 instanceof Error) ? argumento2 : argumento1;
            const erroInterno = (argumentoErro instanceof Error) ? argumentoErro : null;

            this.Stack = this.TentarRetornarStack();
            this.message = mensagem;
            this.ErroInterno = erroInterno;
            LogUtil.Erro(this);
        }

        private TentarRetornarStack(): string
        {
            try
            {
                return window?.Error()?.stack ?? String.Empty;
            }
            catch
            {
                return String.Empty;
            }
        }

        private static get MensagemTeste()
        {
            if ($Configuracao == null || $Configuracao.IsTeste)
            {
                return `\r\nObs: Tente simular novamente, anote todos os passos, tire um print do console, e depois passe para  o desenvolvimento. :) `;
            }
            return ``;
        }
    }

    export class InfoErro
    {
        public readonly Namespace: string;
        public readonly NomeClasse: string;
        public readonly Linha: number;
    }

}

interface Error
{
    IsNotificado?: boolean;
}

