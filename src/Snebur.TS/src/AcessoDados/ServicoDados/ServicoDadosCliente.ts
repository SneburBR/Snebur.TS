/*eslint-disable*/

namespace Snebur.AcessoDados
{
    export class ServicoDadosCliente extends Snebur.Comunicacao.BaseComunicacaoCliente implements IServicoDados 
    {
        private readonly CredencialServicoInterno: s.CredencialServico | null;
        private readonly NomeServicoDados: string;

        public constructor(
            urlServicoDados: string,
            urlServicoDebug: string = null,
            credencialServico: s.CredencialServico | null = null,
            nomeServicoDados: string = null)
        {
            super(urlServicoDados, urlServicoDebug);
            this.CredencialServicoInterno = credencialServico;
            this.NomeServicoDados = nomeServicoDados;
        }

        protected override NormalizarValorParametro(valorParametro: any): any
        {
            return valorParametro;
        }

        //#region IServicoDadosAsync

        public RetornarDataHoraAsync(): Promise<Date>
        {
            return new Promise(resolver =>
            {
                this.__RetornarDataHoraAsync(resolver);
            });
        }

        private __RetornarDataHoraAsync(callback: CallbackResultado<any>): void
        {
            this.ChamarServicoAsync("RetornarDataHoraAsync", arguments);
        }

        public RetornarDataHoraUTCAsync(): Promise<Date>
        {
            return new Promise(resolver =>
            {
                this.__RetornarDataHoraUTCAsync(resolver);
            });
        }

        private __RetornarDataHoraUTCAsync(callback: CallbackResultado<any>): void
        {
            this.ChamarServicoAsync("RetornarDataHoraUTCAsync", arguments);
        }

        public RetornarValorScalarAsync(estruturaConsulta: EstruturaConsulta): Promise<any>
        {
            return new Promise(resolver =>
            {
                this.__RetornarValorScalarInternoAsync(estruturaConsulta, resolver);
            });
        }

        private __RetornarValorScalarInternoAsync(estruturaConsulta: EstruturaConsulta, callback: CallbackResultado<any>): void
        {
            this.ChamarServicoAsync("RetornarValorScalarAsync", arguments);
        }

        public RetornarResultadoConsultaAsync(estruturaConsulta: EstruturaConsulta): Promise<ResultadoConsulta>
        {
            return new Promise(resolver =>
            {
                this.__RetornarResultadoConsultaInternoAsync(estruturaConsulta, resolver);
            });
        }

        private __RetornarResultadoConsultaInternoAsync(estruturaConsulta: EstruturaConsulta, callback: CallbackResultado<ResultadoConsulta> | null): void
        {
            this.ChamarServicoAsync("RetornarResultadoConsultaAsync", arguments);
        }

        public SalvarAsync(entidades: Array<d.Entidade>): Promise<ResultadoSalvar>
        {
            return new Promise(resolver =>
            {
                this.__SalvarInternoAsync(entidades, (resultado) =>
                {
                    if (!resultado.IsSucesso)
                    {
                        console.error("Falha ao salvar entidade" + resultado.MensagemErro);
                    }
                    resolver(resultado);
                });
            });
        }

        private __SalvarInternoAsync(entidades: Array<d.Entidade>, callback: CallbackResultado<ResultadoSalvar>): void
        {
            return this.ChamarServicoAsync("SalvarAsync", arguments);
        }

        public DeletarAsync(entidades: Array<d.Entidade>, relacoesEmCascata: string): Promise<ResultadoDeletar> 
        {
            return new Promise(resolver =>
            {
                this.__DeletarInternoAsync(entidades, relacoesEmCascata, resolver);
            });
        }

        private __DeletarInternoAsync(entidades: Array<d.Entidade>, relacoesEmCascata: string, callback: CallbackResultado<ResultadoDeletar>): void
        {
            return this.ChamarServicoAsync("DeletarAsync", arguments);
        }

        //#endregion 

        //#region Credencial 

        protected RetornarCredencialServico(): Snebur.Seguranca.CredencialServico
        {
            return this.CredencialServicoInterno;
        }

        protected override RetornarNomeManipulador(): string
        {
            return this.NomeServicoDados ?? "ServicoDados";
        }
        //#endregion
    }
}