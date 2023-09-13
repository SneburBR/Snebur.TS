namespace Snebur.UI
{
    export class BindUtil
    {
        private static readonly PalavrasProtegidas: any = {
            "false": true,
            "true": true,
            "count": true,
            "length": true,
            "function": true,
            "null": true,
        };

        /*eslint-disable*/
        private static readonly REGEX_PROPRIEDADES = /[a-zA-Z_][a-zA-Z0-9_.\?]+/g;
        private static readonly REGEX_TEXTO = [/"([^\"]*)"/g, /'([^\']*)'/g];
        /*eslint-enable*/

        public static RetornarNomePropriedade(caminhoPropriedade: string): string
        {
            if (caminhoPropriedade.Contains("."))
            {
                return caminhoPropriedade.split(".").Last();
            }
            return caminhoPropriedade;
        }

        public static RetornarCaminhoPropriedade(expressaoBind: string, isExpressao: boolean): string
        {
            const caminhos = BindUtil.RetornarCaminhosPropriedade(expressaoBind, isExpressao);
            if (caminhos.length > 1)
            {
                throw new Erro("Não implementado, refatorar criar uma classe EstruturaBind");
            }
            return caminhos[0];
        }

        public static RetornarCaminhosPropriedade(conteudoBind: string, isExpressao: boolean): string[]
        {
            let expressaoBind = isExpressao ? conteudoBind :
                BindUtil.RetornarExpressaoBind(conteudoBind);

            if (BindExpressaoUtil.IsExpressao(expressaoBind))
            {
                for (const expressao of BindUtil.REGEX_TEXTO)
                {
                    expressaoBind = expressaoBind.ReplaceAll(expressao, () =>
                    {
                        return String.Empty;
                    });
                }

                return expressaoBind.match(BindUtil.REGEX_PROPRIEDADES).
                    Where(x => BindUtil.PalavrasProtegidas[x] === undefined && !x.Contains("Enum")).
                    Distinct();
            }
            return [expressaoBind];
        }

        public static RetornarExpressaoBind(textoBind: string): string | null
        {
            if (textoBind !== null)
            {
                const inicio = textoBind.indexOf("{{");
                let fim = textoBind.lastIndexOf("}}");
                const fimOpcao = textoBind.indexOf(",");
                if (fimOpcao > 0)
                {
                    fim = Math.min(fim, fimOpcao);
                }
                return textoBind.substring(inicio + 2, fim);
            }
            return null;
        }

        public static RetornarCaminhoBind(caminhoProprieade: string): string
        {
            if (BindUtil.IsCaminhoBind(caminhoProprieade))
            {
                return caminhoProprieade;
            }
            return "{{" + caminhoProprieade.trim() + "}}";
        }

        public static IsCaminhoBind(caminho: string): boolean
        {
            return u.ValidacaoUtil.IsBind(caminho);
        }
        public static NormalizarValorAtributo(valorAtributo: string): string
        {
            if (!valorAtributo.StartsWith("{{"))
            {
                valorAtributo = "{{" + valorAtributo;
            }
            if (!valorAtributo.EndsWith("}}"))
            {
                valorAtributo = valorAtributo + "}}";
            }
            return valorAtributo;
        }
    }

    export class BindOpcoesUtil
    {
        public static RetornarConteudoOpcao(opcoes: string, opcao: EnumBindOpcao): string
        {
            if (opcoes !== null)
            {
                const procurar = opcao + "=";
                const posicaoOpcao = opcoes.indexOf(procurar);
                if (posicaoOpcao >= 0)
                {
                    const conteudoRecurso = opcoes.substring(posicaoOpcao + procurar.length).Split(",").First().trim();
                    if (conteudoRecurso.length > 0)
                    {
                        return conteudoRecurso.trim();
                    }
                }
            }
            return null;
        }

        public static RetornarOrigem(opcoes: string, controlePai: BaseControle): any
        {
            const caminhoOrigem = BindOpcoesUtil.RetornarConteudoOpcao(opcoes, EnumBindOpcao.OPCAO_ORIGEM);
            if (!String.IsNullOrEmpty(caminhoOrigem))
            {
                if (caminhoOrigem === "this")
                {
                    return controlePai.ControleApresentacao;
                }

                if (caminhoOrigem.StartsWith(BaseBind.THIS))
                {
                    const controleApresentacao = (controlePai as BaseControle).RetornarControlePai<ControleApresentacao>(ControleApresentacao);
                    const caminhoPropriedade = caminhoOrigem.substring(BaseBind.THIS.length);

                    const origem = u.ReflexaoUtil.RetornarValorPropriedade(controleApresentacao, caminhoPropriedade, true);
                    if (u.ValidacaoUtil.IsDefinido(origem))
                    {
                        return origem;
                    }
                }

                //thisform foi uma alternativa para o bind origem THIS no controles formulário (ex. caixa-area-texto), um vez o this assume o controle apresentação.
                if (caminhoOrigem === "thisform")
                {
                    if (controlePai instanceof BaseControleFormulario)
                    {
                        return controlePai;
                    }
                }

                const origem = r.ReflexaoNamespaceUtil.RetornarObjetoOuConstrutor(caminhoOrigem, true);
                if (u.ValidacaoUtil.IsDefinido(origem))
                {
                    return origem;
                }

                throw new Erro(`A origem '${caminhoOrigem}' não foi encontrado. Controle '${controlePai.ControleApresentacao.___NomeConstrutor}' ${controlePai.Elemento.tagName} `);
            }
            return null;
        }

        public static RetornarOpcoes(textoBind: string): string
        {
            const fim = textoBind.lastIndexOf("}}");
            const fimOpcao = textoBind.indexOf(",");
            if (fimOpcao > 0)
            {
                if (fimOpcao > fim)
                {
                    return textoBind.substring(fimOpcao + 1);
                }
                return textoBind.substring(fimOpcao, fim);
            }
            return null;
        }
    }

    export class BindExpressaoUtil
    {
        private static _contador = 0;
        /*private static readonly RegexIsExpressao = /[a-zA-Z0-9\.]/;*/

        public static get Contador(): number
        {
            BindExpressaoUtil._contador += 1;
            return BindExpressaoUtil._contador;
        }

        public static IsExpressao(expressaoBind: string): boolean
        {
            return !TextoUtil.IsSomenteLetrasNumerosPontos(expressaoBind);
        }

        public static RetornarFuncaoExpresao(expressaoBind: string, caminhosPropriedade: string[]): FuncaoBindExpressao
        {
            const [expressao, isDataSource, isThis] = BindExpressaoUtil.RetornarExpressaoInterna(expressaoBind, caminhosPropriedade);

            const nomeExpressao = `__bindExpressao_${BindExpressaoUtil.Contador}`;
            const funcaoString = `window.__ExpressoesBind.${nomeExpressao} =  (function(x, _this) { return ${expressao} });` +
                `window.__ExpressoesBind.${nomeExpressao}.Options = {IsDataSource: ${isDataSource}, IsThis : ${isThis}, NomeExpressao : "${nomeExpressao}" }`;

            try
            {
                eval(funcaoString);
            }
            catch(ex)
            {
                console.error(`Falha ao executar a expressão do bind ${expressao}, expressão: ${funcaoString.toString()}.
                               Erro: ${ex} `);
                throw ex;
            }
            

            if (typeof window.__ExpressoesBind[nomeExpressao] !== "function")
            {
                if ($Configuracao.IsDebug)
                {
                    throw new Erro("Falha na declaração do método estático");
                }

                const script = document.createElement("script");
                script.id = nomeExpressao;
                script.innerHTML = funcaoString;
                document.body.appendChild(script);
            }
            return window.__ExpressoesBind[nomeExpressao];
        }

        private static RetornarExpressaoInterna(expressaoBind: string, caminhosPropriedade: string[]): [string, boolean, boolean]
        {
            let retorno = ` ${expressaoBind} `;
            let isDataSource: boolean = false;
            let isThis: boolean = false;

            for (const caminhoPropriedade of caminhosPropriedade)
            {
                const expressao = caminhoPropriedade.ReplaceAll("?", "\\?");
                const regex = new RegExp(`[^._]${expressao}\\W`);
                const tempIsThis = caminhoPropriedade.StartsWith("this.");
                const prefixo = tempIsThis ? "_" : "x.";

                retorno = retorno.ReplaceAll(regex, (resultado) =>
                {
                    return `${resultado[0]}${prefixo}${caminhoPropriedade}${resultado[resultado.length - 1]}`;
                });

                isThis = isThis || tempIsThis;
                isDataSource = isDataSource || !tempIsThis;

            }
            return [retorno, isDataSource, isThis];
        }
    }

    export enum EnumBindOpcao
    {
        OPCAO_ORIGEM = "Origem",
        OPCAO_CONVERTER = "Converter",
        OPCAO_FORMATAR = "Formatar",
        OPCAO_MAXIMO_CARACTERES = "MaximoCaracteres",
        OPCAO_PADRAO = "Padrao",
        OPCAO_URL_SEM_IMAGEM = "UrlSemImagem",
    }

    export interface FuncaoBindExpressao
    {
        (dataSource: any, _this: ControleApresentacao): any;
        readonly Options: OpcoesBinExpressao;
    }

    export interface OpcoesBinExpressao
    {
        readonly IsDataSource: boolean;
        readonly IsThis: boolean;
        readonly NomeExpressao: string;
    }
}



//const obj = {
//    quantity: 5,
//    price: 10,
//    name: "Teste"
//};

////https://github.com/vuejs/core/blob/e7d5a41758013966c3d9ce47c01f13da7d8c395a/packages/compiler-core/src/validateExpression.ts#L43
//const code = "Math.round(quantity * price) * 0.1";  // dynamic code
//function extractVariableNames(code: string)
//{
//    // Regular expression to match variable names
//    const variableRegex = /[a-zA-Z_][a-zA-Z0-9_]*(?=\s*[\\[({]|$)/g;
//    // Extract variable names from the code using the regular expression
//    const variableNames = code.match(variableRegex);
//    return variableNames || [];
//}

//function evaluateCode(obj: any, code: string)
//{
//    try
//    {
//        const variableNames = extractVariableNames(code);
//        const variableValues = variableNames.map(name => obj[name]);

//        const evaluator = new Function(...variableNames, "return " + code);
//        const result = evaluator(...variableValues);

//        return result;
//    } catch (error)
//    {
//        console.error("Error while evaluating code:", error);
//        return null;
//    }
//}

//const result = evaluateCode(obj, code);
//console.log("Result:", result);