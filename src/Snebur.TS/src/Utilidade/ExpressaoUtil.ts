namespace Snebur.Utilidade
{
    export class ExpressaoUtil
    {
        private static readonly PROTEGITO_RETURN = "return";

        public static RetornarExpressaoGrupoE(expressaoFuncao: Function, tipoPrefixo: r.TipoBaseDominio, argumentos: Array<any>): Snebur.Expressao.ExpressaoGrupoE
        {
            const expressaoTexto = this.RetornarExpressaoTexto(expressaoFuncao);
            const prefixo = this.RetornarPrefixoExpressao(expressaoTexto);
            const expressaInterna = this.RetornarExpressaoInterna(expressaoTexto);
            return new Snebur.Expressao.ExpressaoGrupoE(expressaInterna, tipoPrefixo, prefixo, argumentos);
        }

        public static RetornarExpressaoGrupoOU(expressaoFuncao: Function, tipoPrefixo: r.TipoBaseDominio, argumentos: Array<any>): Snebur.Expressao.ExpressaoGrupoE
        {
            const expressaoTexto = this.RetornarExpressaoTexto(expressaoFuncao);
            const prefixo = this.RetornarPrefixoExpressao(expressaoTexto);
            const expressaInterna = this.RetornarExpressaoInterna(expressaoTexto);
            return new Snebur.Expressao.ExpressaoGrupoOu(expressaInterna, tipoPrefixo, prefixo, argumentos);
        }

        public static RetornarCaminhoPropriedade(expressaoFuncao: Function): string
        {
            if (!u.ValidacaoUtil.IsFunction(expressaoFuncao))
            {
                throw new ErroNaoDefinido("A expressão não foi definido ou é invalida", this);
            }
            const expressaoTexto = this.RetornarExpressaoTexto(expressaoFuncao);
            const prefixo = ExpressaoUtil.RetornarPrefixoExpressao(expressaoTexto);
            const expressaoInterna = ExpressaoUtil.RetornarExpressaoInterna(expressaoTexto);

            if (expressaoInterna.Contains(" "))
            {
                throw new ErroOperacaoInvalida(`A expressão propriedade é invalida : ${expressaoTexto}. A expressão não pode conter espaços`, this);
            }

            if (expressaoInterna === prefixo.substring(0, prefixo.length - 1))
            {
                return ".";
            }
            if (!expressaoInterna.StartsWith(prefixo))
            {
                throw new ErroOperacaoInvalida(`A expressão '${expressaoTexto}' da propriedade é invalida, ela precisa começar com prefixo '${prefixo}'. `, this);
            }

            return expressaoInterna.substring(prefixo.length);
        }
        //Prefixo function(x) { return x.Teste } 
        // prefixo: x
        public static RetornarPrefixoExpressao(expressaoTexto: string): string
        {
            if (ExpressaoUtil.IsEs5)
            {
                return ExpressaoUtil.RetornarExpressaoAbreFecha(expressaoTexto, true).trim() + ".";
            }
            return expressaoTexto.substring(0, expressaoTexto.indexOf("=")).trim() + ".";
        }


        public static RetornarExpressaoInterna(expressaoTexto: string): string
        {
            if (ExpressaoUtil.IsEs5)
            {
                let expressaoInterna = ExpressaoUtil.RetornarExpressaoAbreFecha(expressaoTexto, true, "{", "}", false);
                if (expressaoInterna.StartsWith(ExpressaoUtil.PROTEGITO_RETURN))
                {
                    expressaoInterna = expressaoInterna.substring(ExpressaoUtil.PROTEGITO_RETURN.length);
                }
                if (expressaoInterna.charAt(expressaoInterna.length - 1) === ";")
                {
                    expressaoInterna = expressaoInterna.substring(0, expressaoInterna.length - 1).trim();
                }
                return expressaoInterna;
            }
            return expressaoTexto.substr(expressaoTexto.indexOf(">") + 1).trim();
        }

        public static RetornarExpressaoTexto(expressaoFuncao: Function): string
        {

            let expressaoTexto = expressaoFuncao.toString();
            expressaoTexto = expressaoTexto.replace("\n", "");

            const len = ex.OperadorUtil.MetodosOperador.length;
            for (let i = 0; i < len; i++)
            {
                const metodoOperador = ex.OperadorUtil.MetodosOperador[i] + "(";

                while (expressaoTexto.Contains(metodoOperador))
                {
                    const posicaoInicio = expressaoTexto.indexOf(metodoOperador);
                    const posicaoFim = posicaoInicio + expressaoTexto.substring(posicaoInicio).indexOf(")") + 1;

                    let parteSubstituir = expressaoTexto.substring(posicaoInicio, posicaoFim);
                    parteSubstituir = parteSubstituir.replace("(", "[").replace(")", "]");
                    const parteInicio = expressaoTexto.substring(0, posicaoInicio);
                    const parteFim = expressaoTexto.substring(posicaoFim);

                    expressaoTexto = parteInicio + parteSubstituir + parteFim;
                }
            }
            return expressaoTexto;
        }

        public static RetornarNomePropriedade(nomePropriedadeOuExpressao: string | Function): string
        {
            const caminhoPropriedade = this.NormalizarNomePropriedadeInterno(nomePropriedadeOuExpressao);
            const posicao = caminhoPropriedade.lastIndexOf(".");
            if (posicao > 0)
            {
                return this.NormalizarNomePropriedade(caminhoPropriedade.substring(posicao + 1));
            }
            return this.NormalizarNomePropriedade(caminhoPropriedade);
        }

        public static NormalizarNomePropriedade(nomePropriedadeOuExpressao: string | Function): string
        {
            const nomePropriedade = this.NormalizarNomePropriedadeInterno(nomePropriedadeOuExpressao);
            ValidacaoUtil.ValidarArgumentoDefinido({ nomePropriedadeOuExpressao });

            if (nomePropriedade.Contains("."))
            {
                throw new Erro(`"O caminho '${nomePropriedade}' com mais de um nível não é suportado`);

            }
            if (nomePropriedade.EndsWith("?"))
            {
                return nomePropriedade.substring(0, nomePropriedade.length - 1);
            }
            return nomePropriedade;
        }

        private static NormalizarNomePropriedadeInterno(nomePropriedadeOuExpressao: string | Function): string
        {
            if (typeof nomePropriedadeOuExpressao === "function")
            {
                return ExpressaoUtil.RetornarCaminhoPropriedade(nomePropriedadeOuExpressao).trim();
            }

            if (typeof nomePropriedadeOuExpressao === "string")
            {
                return nomePropriedadeOuExpressao.trim();
            }

            throw new Erro("Não foi possível normalizar o nome da propriedade " + ConverterUtil.ParaString(nomePropriedadeOuExpressao));
        }


        public static RetornarExpressaoAbreFecha(expressao: string): string
        public static RetornarExpressaoAbreFecha(expressao: string, removerAbreFecha: boolean): string
        public static RetornarExpressaoAbreFecha(expressao: string, removerAbreFecha: boolean, abre: string, fecha: string, ignorarErro: boolean): string
        public static RetornarExpressaoAbreFecha(expressao: StringReader): string
        public static RetornarExpressaoAbreFecha(expressao: StringReader, removerAbreFecha: boolean): string
        public static RetornarExpressaoAbreFecha(expressao: StringReader, removerAbreFecha: boolean, abre: string, fecha: string, ignorarErro: boolean): string
        public static RetornarExpressaoAbreFecha(expressaoOuExpressao: string | StringReader, removerAbreFecha: boolean = true, abre: string = "(", fecha: string = ")", ignorarErro: boolean = false): string
        {
            if (abre === fecha)
            {
                throw new Erro("A carácter abre deve ser diferente do fecha");
            }

            const leitor: StringReader = (expressaoOuExpressao instanceof StringReader) ? expressaoOuExpressao : new StringReader(ConverterUtil.ParaString(expressaoOuExpressao));
            const sb = new StringBuilder();
            let aberto = false;
            let contatorParentesAbre = 0;

            while (leitor.CanRead)
            {
                const caracter = leitor.Read();
                if (caracter === abre)
                {
                    if (!aberto)
                    {
                        aberto = true;
                    }
                    contatorParentesAbre += 1;
                }

                if (aberto)
                {
                    sb.Append(caracter);

                    if (caracter === fecha)
                    {
                        contatorParentesAbre -= 1;
                        if (contatorParentesAbre === 0)
                        {
                            const resultado = sb.ToString();
                            if (removerAbreFecha)
                            {
                                return resultado.substr(1, resultado.length - 2).trim();
                            }
                            return resultado;
                        }
                    }
                }
            }

            if (!ignorarErro)
            {
                throw new Erro(`Não foram encontrados na expressão  ${expressaoOuExpressao}, abre = '${abre}' e fecha = '${fecha}'`);
            }
            return String.Empty;
        }

        public static RetornarExpressaoAbreFecha2(expressao: string): ResultadoAbreFecha
        public static RetornarExpressaoAbreFecha2(expressao: string, removerAbreFecha: boolean): ResultadoAbreFecha
        public static RetornarExpressaoAbreFecha2(expressao: string, removerAbreFecha: boolean, abre: string, fecha: string, ignorarErro: boolean): ResultadoAbreFecha
        public static RetornarExpressaoAbreFecha2(expressao: StringReader): ResultadoAbreFecha
        public static RetornarExpressaoAbreFecha2(expressao: StringReader, removerAbreFecha: boolean): ResultadoAbreFecha
        public static RetornarExpressaoAbreFecha2(expressao: StringReader, removerAbreFecha: boolean, abre: string, fecha: string, ignorarErro: boolean): ResultadoAbreFecha
        public static RetornarExpressaoAbreFecha2(expressaoOuExpressao: string | StringReader, removerAbreFecha: boolean = true, abre: string = "(", fecha: string = ")", ignorarErro: boolean = false): ResultadoAbreFecha
        {
            const leitor: StringReader = (expressaoOuExpressao instanceof StringReader) ? expressaoOuExpressao : new StringReader(ConverterUtil.ParaString(expressaoOuExpressao));
            const sb = new StringBuilder();
            const sbAteAbrir = new StringBuilder();
            let aberto = false;
            let contatorParentesAbre = 0;

            while (leitor.CanRead)
            {
                const caracter = leitor.Read();
                if (caracter === abre)
                {
                    if (!aberto)
                    {
                        aberto = true;
                    }
                    contatorParentesAbre += 1;
                }

                if (aberto)
                {
                    sb.Append(caracter);

                    if (caracter === fecha)
                    {
                        contatorParentesAbre -= 1;
                        if (contatorParentesAbre === 0)
                        {
                            let resultado = sb.ToString();
                            const arteAbrir = sbAteAbrir.ToString();
                            if (removerAbreFecha)
                            {
                                resultado = resultado.substr(1, resultado.length - 2).trim();
                            }
                            return new ResultadoAbreFecha(arteAbrir, resultado);
                        }
                    }
                }
                else
                {
                    sbAteAbrir.Append(caracter);
                }
            }

            if (!ignorarErro)
            {
                throw new Erro(`Não foram encontrados na expressão  ${expressaoOuExpressao}, abre = '${abre}' e fecha = '${fecha}'`);
            }
            return new ResultadoAbreFecha(sbAteAbrir.ToString(), "");
        }


        public static RetornarAtributosElemento(elementoTexto: string): DicionarioSimples<string>
        {
            // Regex to pick out start tag from start of element's HTML.
            const re_start_tag = /^<\w+\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[\w\-.:]+))?)*\s*\/?>/;
            let start_tag = elementoTexto.match(re_start_tag) as any;
            start_tag = start_tag ? start_tag[0] : "";
            // Regex to pick out attribute name and (optional) value from start tag.
            const re_attribs = /\s+([\w\-.:]+)(\s*=\s*(?:"([^"]*)"|'([^']*)'|([\w\-.:]+)))?/g;
            const attribs = {} as any;   // Store attribute name=value pairs in object.
            let match = re_attribs.exec(start_tag);
            while (match != null)
            {
                const attrib = match[1];  // Attribute name in $1.
                let value = match[1];  // Assume no value specified.
                if (match[2])
                { // If match[2] is set, then attribute has a value.
                    value = match[3] ? match[3] : // Attribute value is in $3, $4 or $5.
                        match[4] ? match[4] : match[5];
                }
                attribs[attrib] = value;
                match = re_attribs.exec(start_tag);
            }
            return new DicionarioSimples<string>(attribs);
        }

        public static RetornarConteudoEntre(conteudo: string, caracterEntre: string)
        {
            if (!String.IsNullOrWhiteSpace(conteudo))
            {
                const inicio = Math.max(conteudo.indexOf(caracterEntre), 0);
                const fim = Math.max(conteudo.lastIndexOf(caracterEntre), 0);
                if (inicio >= 0 && fim > 0 && fim > inicio)
                {
                    return conteudo.substring(inicio + 1, fim);
                }
                return conteudo;
            }
            return String.Empty;
        }

        private static _isEs5: boolean;
        public static get IsEs5(): boolean
        {
            if (ExpressaoUtil._isEs5 === undefined)
            {
                ExpressaoUtil._isEs5 = ExpressaoUtil.EsExpression === EnumES.ES5;
            }
            return ExpressaoUtil._isEs5;
        }

        private static get EsExpression(): EnumES
        {
            const tempExpression = ExpressaoUtil.GetTempExpressionInternal<IImagem>((x) => x.Id > 0);
            const expressionString = tempExpression.toString();

            if (/^\(?function\s*\([a-zA-Z0-9]*\)/.test(expressionString))
            {
                return EnumES.ES5;
            }
            if (/^\(?[a-zA-Z0-0]*\)?\s*=\s*>/.test(expressionString))
            {
                return EnumES.ES6Plus;
            }
            throw new Error("Não foi possível detectar a versão do Ecma Script");
        }

        private static GetTempExpressionInternal<T>(expressao: (value: T) => boolean): Function
        {
            return expressao;
        }
    }

    export class ResultadoAbreFecha
    {
        public readonly AteaAbrir: string;
        public readonly Entre: string;

        public constructor(ateAbrir: string, entre: string)
        {
            this.AteaAbrir = ateAbrir;
            this.Entre = entre;
        }
    }

    enum EnumES
    {
        ES5,
        ES6Plus
    }

}
