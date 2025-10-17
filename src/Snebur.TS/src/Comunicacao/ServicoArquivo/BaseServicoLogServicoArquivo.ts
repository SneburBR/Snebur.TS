/*eslint-disable*/
namespace Snebur.Comunicacao
{
    export abstract class BaseServicoLogServicoArquivo extends BaseComunicacaoCliente implements IServicoLogServicoArquivo
    {
        //#region Automático
        public NotificarInicioEnvioAsync(totalArquivos: number, totalBytes: number) : Promise<string>
        {
            return new Promise<string>((resolver, reject) =>
            {
                this.ChamarServicoAsync("NotificarInicioEnvioAsync", [totalArquivos, totalBytes], resolver, reject);
            });
        }
        public NotificarProgressoEnvioArquivoAsync(identificadorLog: string, progresso: number, bytesEnvidos: number) : Promise<boolean>
        {
            return new Promise<boolean>((resolver, reject) =>
            {
                this.ChamarServicoAsync("NotificarProgressoEnvioArquivoAsync", [identificadorLog, progresso, bytesEnvidos], resolver, reject);
            });
        }
        public NotificarFimEnvioAsync(identificadorLog: string, totalBytesEnviado: number) : Promise<boolean>
        {
            return new Promise<boolean>((resolver, reject) =>
            {
                this.ChamarServicoAsync("NotificarFimEnvioAsync", [identificadorLog, totalBytesEnviado], resolver, reject);
            });
        }
        //#endregion

        public constructor(urlServico: string, urlServicoDebug?: string)
        {
            super(urlServico, urlServicoDebug);
        }


    }
}