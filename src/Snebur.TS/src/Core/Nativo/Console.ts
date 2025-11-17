interface Console
{

    success(...data: any[]): void;
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
        Erro = 4,
        Sucesso = 5,
    }

    (function ()
    {
        const SUCESS_STYLE = "color: green; font-weight: bold;";

        const isMostrarLog = (tipo: EnumTipoLog): boolean =>
        {
            return tipo === EnumTipoLog.Erro
                || tipo === EnumTipoLog.Sucesso
                || Snebur.$Configuracao == null
                || Snebur.$Configuracao.IsDebug
                || Snebur.$Configuracao.IsTeste;
        };
       
        const __logInternal = function (
            this: Console,
            isDebug: boolean,
            tipo: EnumTipoLog,
            base: (...data: any[]) => void, ...data: any[]): void
        {
            if (isDebug)
            {
                if (Snebur.$Configuracao != null && Snebur.$Configuracao.IsDebugOuTeste !== true)
                {
                    return;
                }
            }
            if (!isMostrarLog(tipo))
            {
                return;
            }

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

            if (tipo === EnumTipoLog.Sucesso)
            {
                base.bind(this)(`%c${mensagem}`, SUCESS_STYLE);
            }
            else
            {
                base.bind(this)(mensagem);
            }

            if ($Configuracao != null &&
                ($Configuracao.IsDebugOuTeste) &&
                (tipo === EnumTipoLog.Erro || tipo === EnumTipoLog.Alerta || tipo === EnumTipoLog.Sucesso))
            {
                if (console.EventoLog == null)
                {
                    if (Snebur.$Aplicacao.IsAplicacaoInicializada)
                        console.baseError(`console.EventoLog não inicializado.`);
                    return;
                }
                const args = new ConsoleLogArgs(tipo, mensagem);
                console.EventoLog.Notificar(console, args);
            }
        };

        const logInternal = function (
            this: Console,
            isDebug: boolean,
            tipo: EnumTipoLog,
            base: (...data: any[]) => void, ...data: any[]): void
        {
            try
            {
                __logInternal.bind(this)(isDebug, tipo, base, ...data);
            }
            catch (e)
            {
                console.baseError(`Erro ao registrar log: ${e}`);
            }
        };

        const ErrorInternal = function (
            this: Console,
            isDebug: boolean,
            tipo: EnumTipoLog,
            base: (...data: any[]) => void,
            ...data: any[]): void
        {
            DebugUtil.Break(data[0] as string ?? "sem mensagem");
            logInternal.bind(this)(isDebug, tipo, base, ...data);
        };

        console.baseLog = console.log;
        console.baseInfo = console.info;
        console.baseError = console.error;
        console.baseWarm = console.warn;

        console.log = logInternal.bind(console, false, EnumTipoLog.Log, console.baseLog);
        console.info = logInternal.bind(console, false, EnumTipoLog.Info, console.baseInfo);
        console.warn = logInternal.bind(console, false, EnumTipoLog.Alerta, console.baseWarm);
        console.error = ErrorInternal.bind(console, false, EnumTipoLog.Erro, console.baseError);
        console.success = logInternal.bind(console, false, EnumTipoLog.Sucesso, console.baseLog);

        console.LogDebug = logInternal.bind(console, true, EnumTipoLog.Log, console.baseLog);
        console.InfoDebug = logInternal.bind(console, true, EnumTipoLog.Info, console.baseInfo);
        console.WarmDebug = logInternal.bind(console, true, EnumTipoLog.Alerta, console.baseWarm);
        console.ErrorDebug = logInternal.bind(console, true, EnumTipoLog.Erro, console.baseError);
    })();

}

