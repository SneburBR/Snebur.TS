interface Console
{
    baseLog(...data: any[]): void;
    baseInfo(...data: any[]): void;
    baseError(...data: any[]): void;
    baseWarm(...data: any[]): void;

    LogDebug(...data: any[]): void;
    InfoDebug(...data: any[]): void;
    ErrorDebug(...data: any[]): void;
    WarmDebug(...data: any[]): void;

    EventoLog: Snebur.Evento<Snebur.ConsoleLogArgs>;
}

namespace Snebur
{
    export enum EnumTipoLog
    {
        Log = 1,
        Alerta = 2,
        Info = 3,
        Erro = 4
    }

    (function ()
    {
        let __contadorAlertasErro = 0;
        let __identificadorTimeoutAlertaErro: number = -1;

        const LogInternal = function (
            this: Console,
            isDebug: boolean,
            tipo: EnumTipoLog,
            base: (...data: any[]) => void, ...data: any[]): void
        {
            if (isDebug)
            {
                if (Snebur.$Configuracao != null &&
                    Snebur.$Configuracao.IsDebugOuTeste !== true)
                {
                    return;
                }
            }

            if (tipo === EnumTipoLog.Erro || (Snebur.$Configuracao == null || Snebur.$Configuracao.IsDebug || Snebur.$Configuracao.IsTeste))
            {
                let mensagemOriginal = data[0] as string;
                if (Array.isArray(data) && data.length > 1)
                {
                    mensagemOriginal = String.Join("", data);
                }

                if (data?.length > 1 || typeof data[0] === "object")
                {
                    base.apply(this, data);
                    return;
                }


                const hora = FormatacaoUtil?.FormatarHora(new Date(), false, true) ?? "";
                const mensagem = `${hora}: ${mensagemOriginal}`;
                base.bind(this)(mensagem);

                if ($Configuracao != null && $Configuracao.IsDebug &&
                    tipo === EnumTipoLog.Erro && !$Configuracao.IsNaoAlertarErro)
                {
                    __contadorAlertasErro += 1;

                    clearTimeout(__identificadorTimeoutAlertaErro);
                    __identificadorTimeoutAlertaErro = setTimeout(() => __contadorAlertasErro = 0, 5 * 1000);

                    if (console.EventoLog != null)
                    {
                        const args = new ConsoleLogArgs(tipo, mensagem);
                        typeof console.EventoLog.Notificar(console, args);
                    }
                    else
                    {
                        if (__contadorAlertasErro > 100)
                        {
                            const mensagem = String.Join("\r\n", data);
                            alert(mensagem);
                        }
                    }
                }
            }
        };

        const ErrorInternal = function (
            this: Console,
            isDebug: boolean,
            tipo: EnumTipoLog,
            base: (...data: any[]) => void,
            ...data: any[]): void
        {
            DebugUtil.Break();
            LogInternal.bind(this)(isDebug, tipo, base, ...data);
        };
         
        console.baseLog = console.log;
        console.baseInfo = console.info;
        console.baseError = console.error;
        console.baseWarm = console.warn;

        console.log = LogInternal.bind(console, false, EnumTipoLog.Log, console.baseLog);
        console.info = LogInternal.bind(console, false, EnumTipoLog.Info, console.baseInfo);
        console.warn = LogInternal.bind(console, false, EnumTipoLog.Alerta, console.baseWarm);
        console.error = ErrorInternal.bind(console, false, EnumTipoLog.Erro, console.baseError);

        console.LogDebug = LogInternal.bind(console, true, EnumTipoLog.Log, console.baseLog);
        console.InfoDebug = LogInternal.bind(console, true, EnumTipoLog.Info, console.baseInfo);
        console.WarmDebug = LogInternal.bind(console, true, EnumTipoLog.Alerta, console.baseWarm);
        console.ErrorDebug = LogInternal.bind(console, true, EnumTipoLog.Erro, console.baseError);
    })();

}

