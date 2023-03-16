namespace Snebur.Utilidade
{
    export class LogUtil
    {
        public static Erro(mensagem: string): void
        public static Erro(erro: Error | ProgressEvent, mensagem?: string): void
        public static Erro(args: Error | ProgressEvent | string, mesagemComplementar?: string): void
        {
            if (args instanceof Error)
            {
                if (args.IsNotificado)
                {
                    return;
                }
                args.IsNotificado = true;
            }

            let mensagem = LogUtil.RetornarMensagemErro(args);
            if (!String.IsNullOrEmpty(mesagemComplementar))
            {
                mensagem = `${mesagemComplementar}\r\n ${mensagem}`;
            }
            console.error(mensagem);

            try
            {
                if (Snebur.$Configuracao && Snebur.$Configuracao.IsDebug)
                {
                    if (Snebur.$Aplicacao && Snebur.$Aplicacao.IsConectadoServicoDepuracao)
                    {
                        const mensagemLog = new Depuracao.MensagemLog();
                        mensagemLog.Mensagem = mensagem;
                        mensagemLog.TipoLog = Depuracao.EnumTipoLog.Erro;
                        $Aplicacao.ServicoDepuracao.EnviarMensagem(mensagemLog);
                    }
                }
            }
            catch (ex)
            {
                console.baseError(ex);
            }
        }

        public static Depuracao(mensagem: string): void
        {
            if (Snebur.$Aplicacao && Snebur.$Aplicacao.IsConectadoServicoDepuracao)
            {
                const mensagemLog = new Depuracao.MensagemLog();
                mensagemLog.Mensagem = mensagem;
                mensagemLog.TipoLog = Depuracao.EnumTipoLog.Acao;
                $Aplicacao.ServicoDepuracao.EnviarMensagem(mensagemLog);
            }
        }

        public static Desempenho(mensagem: string, tempo: Stopwatch): void
        public static Desempenho(mensagem: string, totalMilesegundos: number): void
        public static Desempenho(mensagem: string, tempo: Stopwatch | number): void
        {
            // throw new Erro("Não implementado");
        }

        private static RetornarMensagemErro(args: Error | ProgressEvent | string): string
        {
            if (args instanceof Error)
            {
                const sb = new StringBuilder();
                sb.AppendLine(`Tipo do erro ${args.constructor.name}`);
                sb.AppendLine(args.message);

                const stack = (args as Erro).Stack ?? args.stack;
                if (stack)
                {
                    sb.AppendLine(stack);
                }
                return sb.ToString();
            }

            if (args instanceof ProgressEvent)
            {
                return `Erro de conexão ${args.target}`;

            }
            return ConverterUtil.ParaString(args);
        }

        public static ThrowIfDebugOrTest(mensagem: string)
        {
            if ($Configuracao.IsDebug || $Configuracao.IsTeste)
            {
                throw mensagem;
            }
            console.error(mensagem);
        }
    }
}
