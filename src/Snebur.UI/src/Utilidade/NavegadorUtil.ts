namespace Snebur.UI
{
    export class NavegadorUtil
    {
        public static RetornarConstrutorPaginaInicial(controlePai: BaseControle, caminho:string): IPaginaConstrutor
        {
            return NavegadorUtil.RetornarConstrutorPagina(controlePai, caminho);
        }
         
        public static RetornarConstrutorPagina(
            controlePai: BaseControle,
            caminho: string): IPaginaConstrutor
        {

            if (!String.IsNullOrWhiteSpace(caminho))
            {
                if (caminho.StartsWith(BaseBind.THIS))
                {
                    const metodo = controlePai.RetornarMetodo(caminho);
                    if (metodo == null)
                    {
                        throw new Erro(`Não foi possível retornar pagina inicial do navegador, o método ${caminho} não foi encontrado em ${controlePai.ControleApresentacao.___NomeConstrutor}`);
                    }

                    if (typeof metodo !== "function")
                    {
                        throw new Erro(`Não foi possível retornar pagina inicial do navegador, o método ${caminho} não é uma função em ${controlePai.ControleApresentacao.___NomeConstrutor}`);
                    }

                    const construtorOuNome = metodo();

                    switch (typeof construtorOuNome)
                    {
                        case "function":
                            return construtorOuNome;
                        case "string":
                            return this.RetornarConstrutorPaginaInterno(controlePai, construtorOuNome, caminho);
                        default:
                            throw new Erro(`Não foi possível retornar pagina inicial do navegador, o método ${caminho} não foi encontrado em ${controlePai.ControleApresentacao.___NomeConstrutor}`);
                    }
                }
                return this.RetornarConstrutorPaginaInterno(controlePai, caminho, caminho);
            }
            return null;
        }

        private static RetornarConstrutorPaginaInterno(controlePai: BaseControle, construtorOuNome: string, caminho: string): IPaginaConstrutor<Pagina>
        {
            const construtor = ControleUtil.RetornarConstrutorControle(controlePai, construtorOuNome, true) as IPaginaConstrutor;
            if (construtor == null)
            {
                if (construtorOuNome !== caminho)
                {
                    caminho += ` result ${construtorOuNome}`;
                }
                throw new Erro(`Não foi possível retornar pagina inicial do navegador, sn-pagina-inciial=${caminho} não foi encontrado em ${controlePai.ControleApresentacao.___NomeConstrutor}`);
            }
            return construtor;
        }

        //public static RetornarConstrutorPagina(controlePai: BaseControle, caminho: string, isIgnorarErro: boolean = false): IPaginaConstrutor
        //{
        //    return ControleUtil.RetornarConstrutorControle(controlePai, caminho, isIgnorarErro) as IPaginaConstrutor;
        //}
    }
}
