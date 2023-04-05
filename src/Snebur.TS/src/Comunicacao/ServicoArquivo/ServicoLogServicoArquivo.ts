/*eslint-disable*/
namespace Snebur.Comunicacao
{
    export abstract class BaseServicoLogServicoArquivo extends BaseComunicacaoCliente implements IServicoLogServicoArquivo
    {
        public constructor(urlServico: string, urlServicoDebug?: string)
        {
            super(urlServico, urlServicoDebug);
        }

        //#region IServicoUsuario

        //public NotificarInicioEnvio(
        //    totalArquivos: number,
        //    totalBytes: number): string
        //{
        //    return this.ChamarServico<string>("NotificarInicioEnvio", arguments);
        //}

        //public NotificarProgressoEnvioArquivo(identificadorLog: string, progresso: number, bytesEnvidos: number): boolean
        //{
        //    return this.ChamarServico<boolean>("NotificarProgressoEnvioArquivo", arguments);
        //}

        //public NotificarFimEnvio(identificadorLog: string, totalBytesEnviado: number): boolean
        //{
        //    return this.ChamarServico<boolean>("NotificarProgressoEnvioArquivo", arguments);
        //}

        //Async

        private __NotificarInicioEnvioInternoAsync(totalArquivos: number, totalBytes: number, callback: CallbackResultado<string>): void
        {
            this.ChamarServicoAsync("NotificarInicioEnvioAsync", arguments);
        }

        private __NotificarProgressoEnvioArquivoInternoAsync(identificadorLog: string, progresso: number, bytesEnvidos: number, callback: CallbackResultado<boolean>): void
        {
            this.ChamarServicoAsync("NotificarProgressoEnvioArquivoAsync", arguments);
        }

        private __NotificarFimEnvioInternoAsync(identificadorLog: string, totalBytesEnviado: number, callback: CallbackResultado<boolean>): void
        {
            this.ChamarServicoAsync("NotificarFimEnvioAsync", arguments);
        }

        //Async

        public NotificarInicioEnvioAsync(totalArquivos: number, totalBytes: number): Promise<string>
        {
            return new Promise<string>(resolver =>
            {
                this.__NotificarInicioEnvioInternoAsync(totalArquivos, totalBytes, (resultado: string) =>
                {
                    resolver(resultado);
                });
            });
        }

        public NotificarProgressoEnvioArquivoAsync(identificadorLog: string, progresso: number, bytesEnvidos: number): Promise<boolean>
        {
            return new Promise<boolean>(resolver =>
            {
                this.__NotificarProgressoEnvioArquivoInternoAsync(identificadorLog, progresso, bytesEnvidos, (resultado: boolean) =>
                {
                    resolver(resultado);
                });
            });
        }

        public NotificarFimEnvioAsync(identificadorLog: string, totalBytesEnviado: number): Promise<boolean>
        {
            return new Promise<boolean>(resolver =>
            {
                this.__NotificarFimEnvioInternoAsync(identificadorLog, totalBytesEnviado, (resultado: boolean) =>
                {
                    resolver(resultado);
                });
            });
        }



        //#endregion

    }
}