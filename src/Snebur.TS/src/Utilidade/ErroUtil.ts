namespace Snebur.Utilidade
{
    export class ErroUtil
    {
        public static NotificarErroGlobal(e: ErrorEvent | PromiseRejectionEvent, erroInterno: Error): void
        {
            if (e.IsNotificado)
            {
                return;
            }
            e.IsNotificado = true;

            const sb = new StringBuilder();
            sb.AppendLine(`Tipo: ${u.ReflexaoUtil.RetornarNomeTipo(erroInterno)}`);
            sb.AppendLine(`Event: ${u.ReflexaoUtil.RetornarNomeTipo(e.constructor)}`);
            sb.AppendLine(`Data: ${FormatacaoUtil.FormatarDataHora(new Date())}`);

            if (e instanceof ErrorEvent)
            {
                if (!String.IsNullOrWhiteSpace(e.filename))
                {
                    const nomeArquivo = UrlUtil.RetornarPagina(e.filename);
                    sb.AppendLine(`Nome Arquivo: ${nomeArquivo}`);
                    sb.AppendLine(`Linha: ${e.lineno}`);
                    sb.AppendLine(`Coluna: ${e.colno}`);
                    sb.AppendLine(`Mensagem: ${e.message}`);
                }
            }

            if (ValidacaoUtil.IsElementoHtml(e.srcElement))
            {
                if (e.srcElement instanceof HTMLScriptElement)
                {
                    sb.AppendLine(`Script:  ${e.srcElement.src} `);

                    if ((String.IsNullOrWhiteSpace(e.message)))
                    {
                        if (e.srcElement instanceof HTMLScriptElement)
                        {
                            sb.AppendLine(" Mensagem: Erro arquivo script não foi encontrado. ");
                        }
                    }
                }
            }

            if (erroInterno)
            {
                if (!String.IsNullOrEmpty(e.message) && e.message !== erroInterno.message)
                {
                    sb.AppendLine(` Mensagem erro: ${e.message}`);
                }
                if (!String.IsNullOrEmpty(erroInterno.stack))
                {
                    sb.AppendLine(` Stack:  ${erroInterno.stack}`);
                }
            }

            console.error(sb.ToString());
            /*throw new ErroGlobal(sb.ToString(), erroInterno);*/
        }

        public static RetornarErro(erro: any): Error
        {
            if (erro instanceof Error)
            {
                return erro;
            }
            const mensagem = ErroUtil.RetornarMensagemErro(erro);
            return new Erro(mensagem);
        }

        public static RetornarMensagemErro(erro: Error | any): string
        {
            if (ValidacaoUtil.IsDefinido(erro))
            {
                if (erro instanceof Error)
                {
                    if (erro.stack != null)
                    {
                        return `${erro.message} -  stack: ${erro.stack}`;
                    }
                    return `${erro.message}`;
                }
                else
                {
                    if (ValidacaoUtil.IsString(erro))
                    {
                        return (erro as any);
                    }
                    if (typeof (erro as any).message !== "undefined")
                    {
                        return u.ConverterUtil.ParaString((erro as any).message);
                    }
                }
            }
            return null;
        }
    }
}

interface ErrorEvent
{
    IsNotificado?: boolean;
}

interface PromiseRejectionEvent
{
    IsNotificado?: boolean;
    error?: Error;
    message?: string;
}
