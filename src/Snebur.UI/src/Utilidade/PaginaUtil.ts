namespace Snebur.UI
{
    export class PaginaUtil
    {
        public static RetornarParametros(valorAtributoParametros: string, controlePai: BaseControle): DicionarioSimples<any, string>
        {
            const parametros = u.UrlUtil.RetornarParametrosQuery(valorAtributoParametros);
            const chaves = parametros.Chaves;
            const len = chaves.length;

            for (let i = 0; i < len; i++)
            {
                const chave = chaves[i];
                const valor = parametros.Item(chave);

                if (u.ValidacaoUtil.IsBind(valor))
                {
                    const caminhoPropriedadeBind = BindUtil.RetornarExpressaoBind(valor);

                    const opcoes = BindOpcoesUtil.RetornarOpcoes(valor);
                    const dataSource = BindOpcoesUtil.RetornarOrigem(opcoes, controlePai) ??
                        controlePai.DataSource ?? controlePai.ControleApresentacao;

                    const valorBind = PaginaUtil.RetornarValorBind(caminhoPropriedadeBind, dataSource);

                    if (!u.ValidacaoUtil.IsDefinido(valorBind) && $Configuracao.IsDebug)
                    {
                        if ($Configuracao.IsDebug)
                        {
                            console.error(`O valor  para bind ${valor} no atributo sn-parametros='${valorAtributoParametros}' não foi encontrado declarado em ${controlePai.ControleApresentacao.___NomeConstrutor}`);
                        }
                    }

                    parametros.AtribuirItem(chave, valorBind);
                }
                else
                {
                    const valorTipado = ConverterUtil.ParaMelhorTipo(valor);
                    parametros.AtribuirItem(chave, valorTipado);
                }

            }
            return parametros;
        }

        private static RetornarValorBind(caminhoPropriedade: string, dataSource: any): any
        {
            const global = "global.";
            //let dataSource = this.ControlePai.DataSource;
            if (caminhoPropriedade === ".")
            {
                return dataSource;
            }
            else if (caminhoPropriedade.StartsWith(global))
            {
                caminhoPropriedade = caminhoPropriedade.substring(global.length);
                return u.ReflexaoUtil.RetornarValorPropriedade(window, caminhoPropriedade, true);
            }
            else
            {
                return u.ReflexaoUtil.RetornarValorPropriedade(dataSource, caminhoPropriedade, true);
            }
        }

      
         
        public static IsMesmoTipo(pagina: Pagina,
            refPagina: Pagina | IPaginaConstrutor<Pagina> | typeof Pagina,
            expressoesParametrosOuChave: Function | DicionarioSimples | string | List<ITupleParametroPagina> | Partial<Pagina>): boolean
        {
            if (pagina instanceof Pagina)
            {
                if (refPagina instanceof Pagina)
                {
                    return pagina.Equals(refPagina);
                }
                if (typeof refPagina === "function")
                {
                    return pagina.IsMesmoContrustor(refPagina, expressoesParametrosOuChave);
                }
            }
            return false;
        }

        public static IsParametrosIgual(obj1: any, obj2: any): boolean
        {
            if (Util.IsIgual(obj1, obj2))
            {
                return true;
            }

            if (typeof obj1 === "object" &&
                typeof obj2 === "object")
            {
                const propriedades1 = Object.keys(obj1);
                const propriedades2 = Object.keys(obj2);

                if (propriedades1.length === 0 && propriedades2.length === 0)
                {
                    return true;
                }

                if (propriedades1.length > 0 && propriedades2.length > 0)
                {
                    const propriedades = propriedades1.length < propriedades2.length ?
                        propriedades1 : propriedades2;

                    if (propriedades.All(x => x in obj1 && x in obj2))
                    {
                        for (const propriedade of propriedades)
                        {
                            const valor1 = obj1[propriedade];
                            const valor2 = obj2[propriedade];
                            if (Util.IsDiferente(valor1, valor2))
                            {
                                return false;
                            }
                        }
                        return true;
                    }
                }
            }
            return false;
        }
    }
}