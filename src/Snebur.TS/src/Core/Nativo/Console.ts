

interface Console
{
    baseLog(...data: any[]): void;
    baseInfo(...data: any[]): void;
    baseError(...data: any[]): void;
    baseWarm(...data: any[]): void;
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

    const CallBase = function (this: Window, tipo: EnumTipoLog, base: (...data: any[]) => void, ...data: any[])
    {
        if (tipo === EnumTipoLog.Erro || ($Configuracao == null || $Configuracao.IsDebug || $Configuracao.IsTeste))
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
                const mensagem = String.Join("\r\n", data);
                alert(mensagem);
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

    console.log = CallBase.bind(console, EnumTipoLog.Log, console.baseLog);
    console.info = CallBase.bind(console, EnumTipoLog.Info, console.baseInfo);
    console.warn = CallBase.bind(console, EnumTipoLog.Alerta, console.baseWarm);
    console.error = CallBase.bind(console, EnumTipoLog.Erro, console.baseError);

}

