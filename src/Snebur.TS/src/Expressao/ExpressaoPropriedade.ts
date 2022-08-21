namespace Snebur.Expressao
{
    export abstract class ExpressaoPropriedade extends Expressao
    {
        public CaminhoPropriedade: string;
        public Propriedade: r.Propriedade;
        public Operador: EnumOperadorPropriedade;
        public Valor: any;
        public DicionariosVariaveis: any;

        public constructor(expressaoTexto: string, tipoPrefixo: r.TipoBaseDominio, prefixo: string, argumentos: Array<any>)
        {
            super(expressaoTexto, tipoPrefixo, prefixo, argumentos);

            if (argumentos.Count > 0 && typeof argumentos.Last() === "object")
            {
                this.DicionariosVariaveis = argumentos.Last();
            }
        }

        protected RetornarCaminhoPropriedade(expressaoTexto: string): string
        {
            if (expressaoTexto.StartsWith("!"))
            {
                expressaoTexto = expressaoTexto.substring(1, expressaoTexto.length);
            }
            return expressaoTexto.substring(this.Prefixo.length);
        }

        protected RetornarPropriedade(caminhoPropriedade: string): r.Propriedade
        {
            const propriedades = u.ReflexaoUtil.RetornarPropriedadesCaminho(this.TipoPrefixo, caminhoPropriedade, false, false);
            if (propriedades.Count === 0)
            {
                throw new Erro(`O caminho propriedade ${caminhoPropriedade} não foi encontrada`, this);
            }
            const propriedade = propriedades.Last();
            if (!((propriedade.Tipo instanceof r.TipoPrimario) || (propriedade.Tipo instanceof r.TipoEnum)))
            {
                throw new ErroNaoSuportado(`O tipo da propriedade não é suportado ${this.ExpressaoTexto}`, this);
            }
            return propriedade;
        }

        protected RetornarValor(expressaoValor: string): any
        {
            if (expressaoValor.StartsWith("$") || expressaoValor.StartsWith("Snebur.$"))
            {
                const posicaoArgumento = expressaoValor.substring(1);
                if (String.IsNullOrWhiteSpace(posicaoArgumento))
                {
                    throw new ErroOperacaoInvalida(" A posição do expressão argumento é invalida " + this.ExpressaoTexto, this);
                }
                const posicao = u.ConverterUtil.ParaInteiro(posicaoArgumento);
                if (posicao > this.Argumentos.Count)
                {
                    throw new ErroOperacaoInvalida(`A posição do argumento não foi encontrado ${this.ExpressaoTexto}`, this);
                }
                const valor = this.Argumentos[posicao];
                if (typeof valor === "undefined")
                {
                    throw new Erro(`O argumento não foi definido ${expressaoValor}`, this);
                }
                return valor;
            }

            if (u.ValidacaoUtil.IsNumber(expressaoValor))
            {
                return u.ConverterUtil.ParaNumero(expressaoValor, false);
            }

            const primeiraLetra = expressaoValor.charAt(0);
            const ultimaLetra = expressaoValor.charAt(expressaoValor.length - 1);

            if ((primeiraLetra === "\"" && ultimaLetra === "\"") ||
                (primeiraLetra === "'" && ultimaLetra === "'"))
            {
                expressaoValor = expressaoValor.substring(1, expressaoValor.length - 1);

                if (u.ValidacaoUtil.IsDate(expressaoValor))
                {
                    return u.ConverterUtil.ParaData(expressaoValor);
                }
                return u.ConverterUtil.ParaString(expressaoValor);
            }

            if (u.ValidacaoUtil.IsBoolean(expressaoValor))
            {
                return u.ConverterUtil.ParaBoolean(expressaoValor);
            }

            if (this.DicionariosVariaveis)
            {
                const valorVariavel = this.RetornarValorVariavel(expressaoValor);
                if (typeof valorVariavel !== "undefined")
                {
                    return valorVariavel;
                }
            }

            throw new ErroNaoSuportado(`A valor '${u.ConverterUtil.ParaString(expressaoValor)}' da expressão ${this.ExpressaoTexto} não foi encontrado, talvez o projeto não esteja normalizado`, this);
        }

        private RetornarValorVariavel(nomeVariavel: string): any
        {
            const chaveVariavel = this.RetornarChaveVariavel(nomeVariavel);
            return this.DicionariosVariaveis[chaveVariavel];
        }

        private RetornarChaveVariavel(nomeVariavel: string): string
        {
            const len = nomeVariavel.length;
            const sb = new StringBuilder();
            sb.Append("$");
            sb.Append("_");

            for (let i = 0; i < len; i++)
            {
                const caracter = nomeVariavel[i];
                if (!TextoUtil.IsLetraOuNumero(caracter))
                {
                    sb.Append("_");
                }
                else
                {
                    sb.Append(caracter);
                }
            }
            return sb.ToString();
        }
    }
}