﻿

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

        const CallBase = function (
            this: Window,
            isDebug: boolean,
            tipo: EnumTipoLog,
            base: (...data: any[]) => void, ...data: any[])
        {
            if (  isDebug )
            {
                if (Snebur.$Configuracao != null &&
                    Snebur.$Configuracao.IsDebug !== true)
                {
                    return;
                }
            }

            if (tipo === EnumTipoLog.Erro || (Snebur.$Configuracao == null || Snebur.$Configuracao.IsDebug || Snebur.$Configuracao.IsTeste))
            {
                let mensagemOriginal = data[0] as string;
                if (data.length > 2)
                {
                    mensagemOriginal = String.Join("", data);
                }

                const hora = FormatacaoUtil?.FormatarHora(new Date()) ?? "";
                const mensagem = `${hora}: ${mensagemOriginal}`;

                if (data?.length > 1)
                {
                    base.bind(this)(mensagem, data[1]);
                }
                else  
                {
                    base.bind(this)(mensagem);
                }


                if ($Configuracao != null && $Configuracao.IsDebug &&
                    tipo === EnumTipoLog.Erro && !$Configuracao.IsNaoAlertarErro)
                {
                    __contadorAlertasErro += 1;
                    if (__contadorAlertasErro > 5)
                    {
                        clearTimeout(__identificadorTimeoutAlertaErro);
                        __identificadorTimeoutAlertaErro = setTimeout(() => __contadorAlertasErro = 0, 30 * 1000);
                    }
                    else
                    {
                        const mensagem = String.Join("\r\n", data);
                        alert(mensagem);
                    }

                }

                if (console.EventoLog != null)
                {
                    const args = new ConsoleLogArgs(tipo, mensagem);
                    typeof console.EventoLog.Notificar(console, args);
                }
            }
        };

       

        console.baseLog = console.log;
        console.baseInfo = console.info;
        console.baseError = console.error;
        console.baseWarm = console.warn;

        console.log = CallBase.bind(console, false, EnumTipoLog.Log, console.baseLog);
        console.info = CallBase.bind(console, false, EnumTipoLog.Info, console.baseInfo);
        console.warn = CallBase.bind(console, false, EnumTipoLog.Alerta, console.baseWarm);
        console.error = CallBase.bind(console, false, EnumTipoLog.Erro, console.baseError);

        console.LogDebug = CallBase.bind(console, true, EnumTipoLog.Log, console.baseLog);
        console.InfoDebug = CallBase.bind(console, true, EnumTipoLog.Info, console.baseInfo);
        console.WarmDebug = CallBase.bind(console, true, EnumTipoLog.Alerta, console.baseWarm);
        console.ErrorDebug = CallBase.bind(console, true, EnumTipoLog.Erro, console.baseError);



    })();


}

