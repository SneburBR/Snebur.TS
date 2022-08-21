/*eslint-disable*/

namespace Snebur.AcessoDados
{
    export class ServicoDadosCliente extends Snebur.Comunicacao.BaseComunicacaoCliente implements IServicoDados 
    {
        private readonly CredencialServicoInterno: s.CredencialServico | null;

        public constructor(urlServicoDados: string, urlServicoDebug?: string)
        public constructor(urlServicoDados: string, urlServicoDebug?: string, credencialServico?: s.CredencialServico)
        public constructor(urlServicoDados: string, urlServicoDebug: string = null, credencialServico: s.CredencialServico | null = null)
        {
            super(urlServicoDados, urlServicoDebug);
            this.CredencialServicoInterno = credencialServico;
        }

        protected override NormalizarValorParametro(valorParametro: any): any
        {
            return valorParametro;
        }

        //#region IServicoDados


        //public RetornarDataHora(): Date
        //{
        //    return this.ChamarServico<Date>("RetornarDataHora", arguments);
        //}

        //public RetornarDataHoraUTC(): Date
        //{
        //    return this.ChamarServico<Date>("RetornarDataHora", arguments);
        //}

        //public RetornarValorScalar(estruturaConsulta: EstruturaConsulta): any
        //{
        //    return this.ChamarServico<any>("RetornarValorScalar", arguments);
        //}

        //public RetornarResultadoConsulta(estruturaConsulta: EstruturaConsulta): ResultadoConsulta
        //{
        //    return this.ChamarServico<ResultadoConsulta>("RetornarResultadoConsulta", arguments);
        //}

        //public Salvar(entidades: Array<d.Entidade>): ResultadoSalvar
        //{
        //    return this.ChamarServico<ResultadoSalvar>("Salvar", arguments);
        //}

        //public Excluir(entidades: Array<Snebur.Dominio.Entidade>, relacoesEmCascata: string = ""): Snebur.AcessoDados.ResultadoExcluir
        //{
        //    return this.ChamarServico<ResultadoExcluir>("Excluir", arguments);
        //}

        //#endregion

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

        public ExcluirAsync(entidades: Array<d.Entidade>, relacoesEmCascata: string): Promise<ResultadoExcluir> 
        {
            return new Promise(resolver =>
            {
                this.__ExcluirInternoAsync(entidades, relacoesEmCascata, resolver);
            });
        }

        private __ExcluirInternoAsync(entidades: Array<d.Entidade>, relacoesEmCascata: string, callback: CallbackResultado<ResultadoExcluir>): void
        {
            return this.ChamarServicoAsync("ExcluirAsync", arguments);
        }

        //#endregion 

        //#region Credencial 

        protected RetornarCredencialServico(): Snebur.Seguranca.CredencialServico
        {
            return this.CredencialServicoInterno;
        }

        protected override RetornarNomeManipulador(): string
        {
            return "ServicoDados";
        }
        //#endregion
    }
}