namespace Snebur.Expressao
{
    export abstract class ExpressaoGrupo extends Expressao
    {
        public static OPERADOR_GRUPO_E: string = "&&";
        public static OPERADOR_GRUPO_OU: string = "||"
        public static OPERADOR_GRUPO_NAO: string = "!"
        //public static OPERADOR_NAO: string = "!("

        public abstract OPERADOR_GRUPO: string;

        public get OperadorGrupo(): string
        {
            return this.OPERADOR_GRUPO;
        }
        //{
        //    if (this instanceof ExpressaoGrupoE)
        //    {
        //        return ExpressaoGrupo.OPERADOR_GRUPO_E;
        //    }

        //    if ((this as any) instanceof ExpressaoGrupoOu)
        //    {
        //        return ExpressaoGrupo.OPERADOR_GRUPO_OU;
        //    }

        //    if (this instanceof ExpressaoGrupoNao)
        //    {
        //        return ExpressaoGrupo.OPERADOR_GRUPO_NAO;
        //    }

        //    throw new ErroNaoSuportado("A expressão grupo não é suportado", this);
        //}

        public ExpressoesFilho: Array<Expressao>;

        public constructor(expressaoTexto: string, tipoPrefixo: r.TipoBaseDominio, prefixo: string, argumentos: Array<any>)
        {
            super(expressaoTexto, tipoPrefixo, prefixo, argumentos);

            if (this.OperadorGrupo === ExpressaoGrupo.OPERADOR_GRUPO_NAO)
            {
                this.ExpressoesFilho = new Array<Expressao>();
                this.ExpressoesFilho.Add(this.RetornarNovoGrupo(this.ExpressaoTexto, ExpressaoGrupo.OPERADOR_GRUPO_E));
            }
            else
            {
                this.ExpressoesFilho = this.RetornarExpressaoFilhos(this.ExpressaoTexto);
            }
        }

        private RetornarExpressaoFilhos(expressaoTexto: string): Array<Expressao>
        {
            if (this.ExisteGrupos(expressaoTexto))
            {
                return this.RetornarExpressoesGrupos(expressaoTexto);

            } else
            {
                return this.RetornarExpresoes(expressaoTexto);
            }
        }

        private ExisteGrupos(expressaoTexto: string): boolean
        {
            const posicaoInicioParanetes = expressaoTexto.indexOf("(");
            const posicaoFimParanetes = expressaoTexto.lastIndexOf(")");
            if (posicaoInicioParanetes >= 0 && posicaoFimParanetes >= 0)
            {
                //let expressaoEntreParanetes = expressaoTexto.substring(posicaoInicioParanetes, posicaoFimParanetes);
                const expressaoEntreParanetes = u.ExpressaoUtil.RetornarExpressaoAbreFecha(expressaoTexto);

                //if (expressaoEntreParanetes.Contains("(") || expressaoEntreParanetes.Contains(")")) {
                //    if (!u.ExpressaoUtil.ExpressaoParentesValida(expressaoEntreParanetes))
                //    {

                //    }
                //}
                const partesInternas = expressaoEntreParanetes.split(" ");
                return partesInternas.Count > 1;
            }
            return false;
        }

        private RetornarExpressoesGrupos(expressaoTexto: string): Array<Expressao>
        {
            expressaoTexto = expressaoTexto.trim();
            const expressoes = new Array<Expressao>();
            const leitor = new StringReader(expressaoTexto);

            let operadorGrupoEntreParentes = ExpressaoGrupo.OPERADOR_GRUPO_E;
            if (leitor.Peek() === ExpressaoGrupo.OPERADOR_GRUPO_NAO)
            {
                leitor.Read();
                operadorGrupoEntreParentes = ExpressaoGrupo.OPERADOR_GRUPO_NAO;
            }


            const sbInicio = new StringBuilder();
            let caracter: string;
            /*eslint-disable*/
            while (true)
            {
                if (leitor.Peek() === "(" || (caracter = leitor.Read()) == null)
                {
                    break;
                }
                sbInicio.Append(caracter);
            }
            /*eslint-enable*/
            const parteInicial = sbInicio.ToString();
            if (!String.IsNullOrWhiteSpace(parteInicial))
            {
                operadorGrupoEntreParentes = this.RetornarUltimoOperadorGrupo(parteInicial);
                const posicaoOperadorGrupo = parteInicial.lastIndexOf(operadorGrupoEntreParentes);
                const expressaoInicio = parteInicial.substring(0, posicaoOperadorGrupo);
                expressoes.AddRange(this.RetornarExpresoes(expressaoInicio));
            }
             
            const expressaoEntreParaentes = u.ExpressaoUtil.RetornarExpressaoAbreFecha(leitor, true);
            const parteFinal = leitor.ReadToEnd();
            expressoes.Add(this.RetornarNovoGrupo(expressaoEntreParaentes, operadorGrupoEntreParentes));

            if (!String.IsNullOrWhiteSpace(parteFinal))
            {
                const operadorExpressaoFim = this.RetornarPrimeiroOperadorGrupo(parteFinal);
                const posicaoOperadorExpressaoFim = parteFinal.indexOf(operadorExpressaoFim) + 2;
                const expressaoFim = parteFinal.substring(posicaoOperadorExpressaoFim);
                expressoes.Add(this.RetornarNovoGrupo(expressaoFim, operadorExpressaoFim));
            }
            return expressoes;
        }

        private RetornarExpressoesGruposObsoleto(expressaoTexto: string): Array<Expressao>
        {
            expressaoTexto = expressaoTexto.trim();

            const expressoes = new Array<Expressao>();

            const posicaoInicioParanetes = expressaoTexto.indexOf("(");
            let operadorGrupoEntreParentes = ExpressaoGrupo.OPERADOR_GRUPO_E;
            if (posicaoInicioParanetes > 0)
            {
                const parteExpressaoInicio = expressaoTexto.substring(0, posicaoInicioParanetes).trim();

                //if (OperadorUtil.ExpressaoMetodoOperador(parteExpressaoInicio))
                //{
                //    let fimTemp = posicaoInicioParanetes + expressaoTexto.substring(posicaoInicioParanetes).indexOf(")") + 1;
                //    parteExpressaoInicio = expressaoTexto.substring(0, fimTemp);
                //}

                if (parteExpressaoInicio === ExpressaoGrupo.OPERADOR_GRUPO_NAO)
                {
                    operadorGrupoEntreParentes = ExpressaoGrupo.OPERADOR_GRUPO_NAO;
                    expressaoTexto = expressaoTexto.substring(operadorGrupoEntreParentes.length).trim();
                }
                else
                {
                    operadorGrupoEntreParentes = this.RetornarUltimoOperadorGrupo(parteExpressaoInicio);
                    const posicaoOperadorGrupo = parteExpressaoInicio.lastIndexOf(operadorGrupoEntreParentes);
                    const expressaoInicio = parteExpressaoInicio.substring(0, posicaoOperadorGrupo);
                    expressoes.AddRange(this.RetornarExpresoes(expressaoInicio));
                    expressaoTexto = expressaoTexto.substring(posicaoOperadorGrupo + operadorGrupoEntreParentes.length).trim();
                }
            }
            const posicaoFimParanetes = expressaoTexto.lastIndexOf(")");
            const expressaoEntreParentes = expressaoTexto.substring(1, posicaoFimParanetes);

            expressoes.Add(this.RetornarNovoGrupo(expressaoEntreParentes, operadorGrupoEntreParentes));

            const parteExpressaoFim = expressaoTexto.substring(posicaoFimParanetes + 1).trim();
            if (!String.IsNullOrWhiteSpace(parteExpressaoFim))
            {
                const operadorExpressaoFim = this.RetornarPrimeiroOperadorGrupo(parteExpressaoFim);
                const posicaoOperadorExpressaoFim = parteExpressaoFim.indexOf(operadorExpressaoFim) + 2;
                const expressaoFim = parteExpressaoFim.substring(posicaoOperadorExpressaoFim);
                expressoes.Add(this.RetornarNovoGrupo(expressaoFim, operadorExpressaoFim));
            }
            return expressoes;
        }

        private RetornarUltimoOperadorGrupo(expressaoTexto: string): string
        {
            const posicaoE = expressaoTexto.lastIndexOf(ExpressaoGrupo.OPERADOR_GRUPO_E);
            const posicaoOU = expressaoTexto.lastIndexOf(ExpressaoGrupo.OPERADOR_GRUPO_OU);
            const posicaoUltimoOperador = Math.max(posicaoE, posicaoOU);
            if (posicaoUltimoOperador === -1)
            {
                throw new ErroOperacaoInvalida("O ultimo operador da expressão não foi encontrado", this);
            }
            const operador = expressaoTexto.substring(posicaoUltimoOperador);
            return operador.trim();
        }

        private RetornarPrimeiroOperadorGrupo(expressaoTexto: string): string
        {
            const posicaoE = expressaoTexto.indexOf(ExpressaoGrupo.OPERADOR_GRUPO_E);
            const posicaoOU = expressaoTexto.indexOf(ExpressaoGrupo.OPERADOR_GRUPO_OU);

            if (posicaoE === -1 && posicaoOU === -1)
            {
                throw new ErroOperacaoInvalida("O primeiro operador da expressão não foi encontrado", this);
            }
            let posicaoPrimeiroOperador: number;
            if (posicaoE === -1)
            {
                posicaoPrimeiroOperador = posicaoOU;
            }
            else if (posicaoOU === -1)
            {
                posicaoPrimeiroOperador = posicaoE;
            }
            else
            {
                posicaoPrimeiroOperador = Math.min(posicaoE, posicaoOU);
            }
            const operador = expressaoTexto.substring(0, posicaoPrimeiroOperador + 2);
            return operador.trim();
        }

        private RetornarExpresoes(expressaoTexto: string): Array<Expressao>
        {
            const expressoes = new Array<Expressao>();
            if (this.ExisteOperadorExpressaoPropriedade(expressaoTexto))
            {
                const operadorGrupoOutro = (this.OPERADOR_GRUPO === ExpressaoGrupo.OPERADOR_GRUPO_E) ? ExpressaoGrupo.OPERADOR_GRUPO_OU : ExpressaoGrupo.OPERADOR_GRUPO_E;
                const expressaoPartes = expressaoTexto.split(this.OPERADOR_GRUPO);

                for (let i = 0; i < expressaoPartes.Count; i++)
                {
                    const expressaoParte = expressaoPartes[i];
                    if (expressaoParte.Contains(operadorGrupoOutro))
                    {
                        expressoes.Add(this.RetornarNovoGrupo(expressaoParte, operadorGrupoOutro));
                    } else
                    {
                        expressoes.Add(this.RetornarExpressaoPropriedade(expressaoParte));
                    }
                }
            } else
            {
                expressoes.Add(this.RetornarExpressaoPropriedade(expressaoTexto));
            }
            return expressoes;
        }
        //#region Grupos 

        private ExisteOperadorExpressaoPropriedade(expressaoTexto: string): boolean
        {
            if (expressaoTexto.Contains(ExpressaoGrupo.OPERADOR_GRUPO_E))
            {
                return true;
            }
            if (expressaoTexto.Contains(ExpressaoGrupo.OPERADOR_GRUPO_OU))
            {
                return true;
            }
            return false;
        }

        private RetornarNovoGrupo(expressaoTexto: string, operador: string): ExpressaoGrupo
        {
            operador = operador.trim();
            if (operador.length > 2 && operador.EndsWith("!"))
            {
                expressaoTexto = `!(${expressaoTexto})`;
                operador = operador.substring(0, operador.length - 1).trim();
            }
            if (operador === ExpressaoGrupo.OPERADOR_GRUPO_E)
            {
                return new ExpressaoGrupoE(expressaoTexto, this.TipoPrefixo, this.Prefixo, this.Argumentos);
            }
            if (operador === ExpressaoGrupo.OPERADOR_GRUPO_OU)
            {
                return new ExpressaoGrupoOu(expressaoTexto, this.TipoPrefixo, this.Prefixo, this.Argumentos);
            }
            if (operador === ExpressaoGrupo.OPERADOR_GRUPO_NAO)
            {
                return new ExpressaoGrupoNao(expressaoTexto, this.TipoPrefixo, this.Prefixo, this.Argumentos);
            }
            throw new ErroNaoSuportado(`O operador não é suportado ${operador}`, this);
        }
        //#endregion

        //#region Propriedade

        private RetornarExpressaoPropriedade(expressaoTexto: string): ExpressaoPropriedade
        {
            expressaoTexto = expressaoTexto.trim();
            if (!expressaoTexto.Contains(this.Prefixo))
            {
                throw new Erro(`A expressão não é suportado ${expressaoTexto}`, this);
            }
            //Temporário -- usar expressão regular
            let expressaValidar = expressaoTexto;
            if (expressaValidar.Contains("\""))
            {
                const inicio = expressaValidar.indexOf("\"");
                const fim = expressaValidar.lastIndexOf("\"");
                const parteTexto = expressaValidar.substring(inicio, fim);
                const parteTextoSemEspaco = parteTexto.ReplaceAll(" ", "_");
                expressaValidar = expressaValidar.Replace(parteTexto, parteTextoSemEspaco);
            }

            const partes = expressaValidar.split(" ");
            switch (partes.Count)
            {
                case 1:

                    if (this.ExisteExpressaoPropriedadeMetodo(expressaoTexto))
                    {
                        return new ExpressaoPropriedadeMetodo(expressaoTexto, this.TipoPrefixo, this.Prefixo, this.Argumentos);
                    }
                    if (this.ExisteExpressaoPropriedadeLogico(expressaoTexto))
                    {
                        return new ExpressaoPropriedadeLogico(expressaoTexto, this.TipoPrefixo, this.Prefixo, this.Argumentos);
                    }
                    throw new Erro(`A expressão não é suportado ${expressaoTexto}`, this);

                case 3:

                    return new ExpressaoPropriedadeComparar(expressaoTexto, this.TipoPrefixo, this.Prefixo, this.Argumentos);

                default:

                    throw new Erro(`A expressão não é suportado ${expressaoTexto}`, this);
            }
        }

        public ExisteExpressaoPropriedadeMetodo(expressaoTexto: string): boolean
        {
            const metodos = u.EnumUtil.RetornarListaDescricao(EnumOperadorMetodo);
            for (const metodo of metodos)
            {
                if (expressaoTexto.Contains(metodo + "["))
                {
                    return true;
                }
            }
            return false;
        }

        public ExisteExpressaoPropriedadeLogico(expressaoTexto: string): boolean
        {
            if (expressaoTexto.StartsWith("!"))
            {
                expressaoTexto = expressaoTexto.substring(1, expressaoTexto.length);
            }
            //let caminhoPropriedade = expressaoTexto.substring(this.Prefixo.length + 1);
            const caminhoPropriedade = expressaoTexto.substring(this.Prefixo.length);
            const propriedades = u.ReflexaoUtil.RetornarPropriedadesCaminho(this.TipoPrefixo, caminhoPropriedade, true, false);
            if (propriedades.Count > 0)
            {
                const propriedade = propriedades.Last();
                const tipoBoolean = u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.Boolean);
                return tipoBoolean === propriedade.Tipo;
            }
            return false;
        }
        //#endregion
    }
}