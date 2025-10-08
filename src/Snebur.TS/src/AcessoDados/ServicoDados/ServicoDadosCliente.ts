/*eslint-disable*/

namespace Snebur.AcessoDados
{
    export class ServicoDadosCliente extends Snebur.Comunicacao.BaseComunicacaoCliente implements IServicoDados 
    {
        //#region Automático
        public RetornarValorScalarAsync(estruturaConsulta: Snebur.AcessoDados.EstruturaConsulta) : Promise<any | null>
        {
            return new Promise<any | null>( (resolver, reject) =>
            {
                this.ChamarServicoAsync("RetornarValorScalarAsync", [estruturaConsulta], resolver, reject);
            });
        }
        public RetornarResultadoConsultaAsync(estruturaConsulta: Snebur.AcessoDados.EstruturaConsulta) : Promise<Snebur.AcessoDados.ResultadoConsulta>
        {
            return new Promise<Snebur.AcessoDados.ResultadoConsulta>( (resolver, reject) =>
            {
                this.ChamarServicoAsync("RetornarResultadoConsultaAsync", [estruturaConsulta], resolver, reject);
            });
        }
        public SalvarAsync(entidades: Array<Snebur.Dominio.IEntidade>) : Promise<Snebur.AcessoDados.ResultadoSalvar>
        {
            return new Promise<Snebur.AcessoDados.ResultadoSalvar>( (resolver, reject) =>
            {
                this.ChamarServicoAsync("SalvarAsync", [entidades], resolver, reject);
            });
        }
        public DeletarAsync(entidades: Array<Snebur.Dominio.IEntidade>, relacoesEmCascata: string) : Promise<Snebur.AcessoDados.ResultadoDeletar>
        {
            return new Promise<Snebur.AcessoDados.ResultadoDeletar>( (resolver, reject) =>
            {
                this.ChamarServicoAsync("DeletarAsync", [entidades, relacoesEmCascata], resolver, reject);
            });
        }
        public RetornarDataHoraAsync() : Promise<Date>
        {
            return new Promise<Date>( (resolver, reject) =>
            {
                this.ChamarServicoAsync("RetornarDataHoraAsync", [], resolver, reject);
            });
        }
        public RetornarDataHoraUTCAsync() : Promise<Date>
        {
            return new Promise<Date>( (resolver, reject) =>
            {
                this.ChamarServicoAsync("RetornarDataHoraUTCAsync", [], resolver, reject);
            });
        }
        //#endregion

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