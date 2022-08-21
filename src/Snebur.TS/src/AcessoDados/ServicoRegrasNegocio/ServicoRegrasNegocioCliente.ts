namespace Snebur.AcessoDados
{
    export abstract class ServicoRegrasNegocioCliente extends Snebur.Comunicacao.BaseComunicacaoCliente implements IServicoRegrasNegocio 
    {

        public constructor(urlServico: string, urlServicoDebug?:string)
        {
            super(urlServico, urlServicoDebug);
        }
         
        public ChamarRegraAsync(chamadaRegraNegocio: c.ChamadaRegraNegocio, ...parametros: Array<IParametroRegraNegocio | Function>): void
        {
            /*eslint-disable*/
            this.ChamarServicoAsync("ChamarRegraAsync", arguments);
            /*eslint-enable*/
        }

        protected override RetornarParametros(
            nomeMetoedo: string,
            metodo: Function,
            valoresArgumentos: IArguments,
            isAsync = true): Array<ParChaveValorSimples<any>>
        {

            const parametros = Array<ParChaveValorSimples<any>>();

            const argumentos = u.Util.CopiarArray(valoresArgumentos);
            const chamadaRegraNegocio = argumentos.FirstOrDefault();
            const callback = argumentos.LastOrDefault();

            if (!(chamadaRegraNegocio instanceof c.ChamadaRegraNegocio))
            {
                throw new Erro("O primeiro parâmetro deve ser do tipo ChamadaRegraNegocio");
            }

            if (!(typeof callback === "function"))
            {
                throw new Erro("O ultimo parâmetro deve ser um callback");
            }

            // o primeiro parâmetro é do ChamadaRegraNegocio,  e ultimo é o callback da chamada async
            argumentos.pop();
            argumentos.shift();

            parametros.Add(new ParChaveValorSimples<any>("chamadaRegraNegocio", chamadaRegraNegocio));

            const parametrosRegraNegocio = this.RetornarParametrosRegrasNegocio(argumentos);
            for (const prametroRegraNegocio of parametrosRegraNegocio)
            {
                const nomeParametro = prametroRegraNegocio.NomeParametro;
                let valorParametro = prametroRegraNegocio.ValorParametro;
                valorParametro = this.NormalizarValorParametro(valorParametro);
                parametros.Add(new ParChaveValorSimples<any>(nomeParametro, valorParametro));
            }
            return parametros;

        }

        private RetornarParametrosRegrasNegocio(argumentos: Array<any>): Array<IParametroRegraNegocio>
        {
            const retorno = new Array<IParametroRegraNegocio>();
            for (const parametroRegraNegocio of argumentos)
            {
                if (!u.ValidacaoUtil.IsDefinido(parametroRegraNegocio))
                {
                    throw new Erro("O parâmetro da regra de negocio não foi definido");
                }
                if (String.IsNullOrWhiteSpace(parametroRegraNegocio.NomeParametro))
                {
                    throw new Erro("O nome do parâmetro da regra de negocio não foi definido");
                }
                if (parametroRegraNegocio.ValorParametro === undefined)
                {
                    throw new Erro("O valor do parâmetro da regra de negocio não foi definido");
                }
                retorno.Add(parametroRegraNegocio);
            }
            return retorno;
        }

        protected override NormalizarValorParametro(valorParametro: any): any
        {
            if (valorParametro instanceof d.Entidade)
            {
                return valorParametro.Clonar(EnumOpcaoClonarEntidade.ChavesEstrangeira |
                    EnumOpcaoClonarEntidade.PropriedadesAlteradas);

            }
            return valorParametro;
        }
    }

    export interface IParametroRegraNegocio
    {
        NomeParametro: string;
        ValorParametro: any;
    }
}