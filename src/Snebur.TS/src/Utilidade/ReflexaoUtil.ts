namespace Snebur.Utilidade
{
    export class ReflexaoUtil
    {
        public static CAMINHO_TIPO: string = "__CaminhoTipo";

        private static PREFIXO_LISTA_TIPO_PRIMARIO: string = "ListaTipoPrimario_";
        private static PREFIXO_LISTA_TIPO_ENUM: string = "ListaTipoEnum_";
        private static PREFIXO_LISTA_TIPO_BASEDOMINIO: string = "ListaTipoBaseDominio_";
        private static PREFIXO_LISTA_TIPO_ENTIDADE: string = "ListaTipoEntidade_";
        private static METODO_LIGACAO_COLECAO: string = "Incluir()";

        public static RetornarTipo(construtor: Function): r.BaseTipo
        public static RetornarTipo(caminhoTipo: string): r.BaseTipo
        public static RetornarTipo(caminhoTipoOuConstrutor: string | Function): r.BaseTipo
        {
            let tipo: r.BaseTipo;
            if (typeof caminhoTipoOuConstrutor === "function" &&
                u.ValidacaoUtil.IsFunction(caminhoTipoOuConstrutor.GetType) &&
                (tipo = caminhoTipoOuConstrutor.GetType()) instanceof r.BaseTipo)
            {
                return tipo;
            }

            if (typeof caminhoTipoOuConstrutor === "string")
            {
                if ($Reflexao.Tipos.ContainsKey(caminhoTipoOuConstrutor))
                {
                    return $Reflexao.Tipos.Item(caminhoTipoOuConstrutor);
                }

                const instancia = r.ReflexaoNamespaceUtil.RetornarObjetoOuConstrutor(caminhoTipoOuConstrutor);
                if (instancia instanceof r.BaseTipo)
                {
                    return instancia;
                }
                if (instancia.GetType() instanceof r.BaseTipo)
                {
                    return instancia.GetType();
                }

                if ($Reflexao.Tipos.ContainsKey(instancia.__CaminhoTipo))
                {
                    return $Reflexao.Tipos.Item(instancia.__CaminhoTipo);
                }
            }

            throw new Erro("O caminho do tipo {0} não foi encontrado", this);
        }

        public static RetornarTipoObjetoCaminhoNaoDefinido(obj: any): Snebur.Reflexao.BaseTipo
        {
            if (ValidacaoUtil.IsString(obj))
            {
                if (ValidacaoUtil.IsGuid(obj))
                {
                    return ReflexaoUtil.RetornarTipoPrimario(Snebur.Reflexao.EnumTipoPrimario.Guid);
                } else
                {
                    return ReflexaoUtil.RetornarTipoPrimario(Snebur.Reflexao.EnumTipoPrimario.String);
                }
            }

            if (ValidacaoUtil.IsNumber(obj))
            {
                if (ValidacaoUtil.IsInteger(obj))
                {
                    return ReflexaoUtil.RetornarTipoPrimario(Snebur.Reflexao.EnumTipoPrimario.Long);
                }
                else
                {
                    return ReflexaoUtil.RetornarTipoPrimario(Snebur.Reflexao.EnumTipoPrimario.Decimal);
                }
            }

            if (ValidacaoUtil.IsDate(obj))
            {
                return ReflexaoUtil.RetornarTipoPrimario(Snebur.Reflexao.EnumTipoPrimario.DateTime);
            }

            if (ValidacaoUtil.IsBoolean(obj))
            {
                return ReflexaoUtil.RetornarTipoPrimario(Snebur.Reflexao.EnumTipoPrimario.Boolean);
            }

            if (Array.isArray(obj))
            {
                if (obj.length > 0)
                {
                    const item = obj[0];
                    if (item instanceof d.BaseDominio)
                    {
                        return ReflexaoUtil.RetornarTipoLista(item.GetType() as r.TipoBaseDominio);
                    }

                    return $Reflexao.TipoListaItemDesconhecido;

                }
                return $Reflexao.TipoListaVazia;
            }

            if (ValidacaoUtil.IsObject(obj))
            {
                return ReflexaoUtil.RetornarTipoPrimario(Snebur.Reflexao.EnumTipoPrimario.Object);
            }
            //throw new Erro("Tipo objeto não suportado");
            return $Reflexao.TipoDesconhecido;

        }

        public static RetornarTipoPrimario(tipoPrimarioEnum: Snebur.Reflexao.EnumTipoPrimario): Snebur.Reflexao.TipoPrimario
        {
            const descricaoEnum = EnumUtil.RetornarDescricao(Snebur.Reflexao.EnumTipoPrimario, tipoPrimarioEnum);
            return $Reflexao.Tipos.Item(descricaoEnum) as r.TipoPrimario;
        }

        public static RetornarCaminhoTipoLista(tipo: Snebur.Reflexao.BaseTipo): string
        {
            if (tipo instanceof r.BaseTipoLista)
            {
                throw new ErroNaoSuportado("O tipo base lista não é suportado", this);
            }

            const caminhoTipo = tipo.__CaminhoTipo;
            if (tipo instanceof r.TipoPrimario || tipo instanceof r.TipoSistema)
            {
                return `${ReflexaoUtil.PREFIXO_LISTA_TIPO_PRIMARIO}${caminhoTipo}`;
            }
            if (tipo instanceof r.TipoEnum)
            {
                return `${ReflexaoUtil.PREFIXO_LISTA_TIPO_ENUM}${caminhoTipo}`;
            }

            if (tipo instanceof r.TipoBaseViewModel)
            {
                const caminhoBaseDominio = Snebur.Dominio.BaseViewModel.GetType().__CaminhoTipo;
                return `${ReflexaoUtil.PREFIXO_LISTA_TIPO_BASEDOMINIO}${caminhoBaseDominio}`;
            }

            if (tipo instanceof r.TipoBaseDominio)
            {
                return `${ReflexaoUtil.PREFIXO_LISTA_TIPO_BASEDOMINIO}${caminhoTipo}`;
            }
            throw new Erro("O tipo não suportado");
        }

        public static RetornarTipoLista(tipo: Snebur.Reflexao.TipoBaseDominio): Snebur.Reflexao.TipoListaBaseDominio
        {
            const caminho = this.RetornarCaminhoTipoLista(tipo);
            return $Reflexao.Tipos.Item(caminho) as Snebur.Reflexao.TipoListaBaseDominio;
        }

        public static RetornarTipoListaEntidade(tipo: Snebur.Reflexao.TipoBaseDominio): Snebur.Reflexao.TipoListaEntidade
        {
            const caminho = `${ReflexaoUtil.PREFIXO_LISTA_TIPO_ENTIDADE}${tipo.__CaminhoTipo}`;
            return $Reflexao.Tipos.Item(caminho) as Snebur.Reflexao.TipoListaEntidade;
        }

        public static RetornarCaminhoPropriedade<T>(expressao: (value: T, index: number, array: T[]) => void, thisArg?: any): string
        {
            return u.ExpressaoUtil.RetornarCaminhoPropriedade(expressao);
        }

        public static RetornarPropriedadeCaminho(tipo: Snebur.Reflexao.BaseTipo, caminhoPropriedade: string, ignorarErro: boolean = false, aceitarColecao: boolean = true): r.Propriedade
        {
            const propriedades = ReflexaoUtil.RetornarPropriedadesCaminho(tipo, caminhoPropriedade, ignorarErro, aceitarColecao);
            return propriedades.LastOrDefault();
        }

        public static RetornarPropriedadesCaminho(tipo: Snebur.Reflexao.BaseTipo, caminhoPropriedade: string, ignorarErro: boolean = false, aceitarColecao: boolean = true): Array<r.Propriedade>
        {
            const resultado = new Array<r.Propriedade>();
            const nomesPropriedade = caminhoPropriedade.split(".");
            let tipoAtual: r.BaseTipo = tipo;
            while (nomesPropriedade.Count > 0)
            {
                const nomePropriedade = nomesPropriedade.shift();
                if (nomePropriedade === ReflexaoUtil.METODO_LIGACAO_COLECAO)
                {
                    continue;
                }
                const todasPropriedades = tipoAtual.RetornarPropriedades();
                const propriedadesPesquisa = todasPropriedades.Where(x => x.Nome === nomePropriedade).ToList();
                if (propriedadesPesquisa.Count !== 1)
                {
                    if (!ignorarErro)
                    {
                        throw new Erro(`Não foi encontrado a propriedade ${nomePropriedade}, ocorrências ${propriedadesPesquisa.Count.ToString()}`, this);
                    }
                    return resultado;
                }
                const propriedade = propriedadesPesquisa.Single();
                resultado.Add(propriedade);

                if (propriedade.Tipo instanceof r.BaseTipoLista)
                {
                    if (!aceitarColecao)
                    {
                        if (!ignorarErro)
                        {
                            throw new Erro(`A propriedade coleção ${propriedade.Nome} ${propriedade.Tipo.Nome} não é suportada`, this);
                        }
                        return null;
                    }
                    tipoAtual = (propriedade.Tipo as r.BaseTipoLista).RetornarTipoItemLista();
                }
                else
                {
                    tipoAtual = propriedade.Tipo;
                }
            }
            return resultado;
        }

        public static RetornarValorPropriedade(obj: any, propriedade: Snebur.Reflexao.Propriedade): any
        public static RetornarValorPropriedade(obj: any, propriedade: Snebur.Reflexao.Propriedade, ignorarValorNaoEncontrado: boolean): any
        public static RetornarValorPropriedade(obj: any, caminhoPropriedade: string): any
        public static RetornarValorPropriedade(obj: any, caminhoPropriedade: string, ignorarValorNaoEncontrado: boolean): any
        public static RetornarValorPropriedade(obj: any, caminhoPropriedade: string, ignorarValorNaoEncontrado: boolean, permitirFuncao: boolean): any
        public static RetornarValorPropriedade(obj: any, refPropriedade: any, ignorarValorNaoEncontrado: boolean = false, permitirFuncao: boolean = false): any
        {
            const caminhoPropriedade: string = (refPropriedade instanceof r.Propriedade) ? (refPropriedade as r.Propriedade).Nome : refPropriedade;
            const partes = caminhoPropriedade.split(".");
            const primeiraParte = partes.First().trim();
            let valorPropriedade = ReflexaoUtil.NormalizarPrimeiraParte(obj, primeiraParte);
            if (valorPropriedade === undefined)
            {
                if ($Configuracao.IsDebug && !ignorarValorNaoEncontrado)
                {
                    valorPropriedade = ReflexaoUtil.NormalizarPrimeiraParte(obj, primeiraParte);
                }
            }
            partes.shift();


            while (ValidacaoUtil.IsDefinido(valorPropriedade) && partes.length > 0)
            {
                const parte = partes.shift().trim();
                const valorTemporario = valorPropriedade[parte];

                if (ValidacaoUtil.IsFunction(valorPropriedade) && !permitirFuncao)
                {
                    //valorPropriedade = valorTemporario();
                    throw new ErroNaoSuportado(`Não suportado função não caminho da propriedade ${caminhoPropriedade}`);
                }
                valorPropriedade = valorTemporario;
            }


            const encontrado = ((partes.length === 0) && (!(valorPropriedade === undefined)));
            if (!encontrado && !ignorarValorNaoEncontrado)
            {
                if ($Configuracao.IsDebug)
                {
                    valorPropriedade = ReflexaoUtil.NormalizarPrimeiraParte(obj, primeiraParte);
                }
                throw new Erro(`Não foi encontrada o valor da propriedade ${caminhoPropriedade}`, this);
            }
            return valorPropriedade;
        }

        private static NormalizarPrimeiraParte(obj: any, primeiraParte: string): any
        {
            if ((obj as any)[primeiraParte] !== undefined)
            {
                return (obj as any)[primeiraParte];
            }

            if (primeiraParte === "Snebur")
            {
                return Snebur;
            }
            if ((Snebur as any)[primeiraParte] != null)
            {
                return (Snebur as any)[primeiraParte];
            }
            return (Snebur.$Global as any)[primeiraParte];
        }

        public static AtribuirValorPropriedade(obj: any, propriedade: Snebur.Reflexao.Propriedade, novoValor: any): void
        public static AtribuirValorPropriedade(obj: any, propriedade: Snebur.Reflexao.Propriedade, novoValor: any, ignorarValorNaoAtribuido: boolean): void
        public static AtribuirValorPropriedade(obj: any, caminhoPropriedade: string, novoValor: any): void
        public static AtribuirValorPropriedade(obj: any, caminhoPropriedade: string, novoValor: any, ignorarValorNaoAtribuido: boolean): void
        public static AtribuirValorPropriedade(obj: any, refPropriedade: any, novoValor: any, ignorarValorNaoAtribuido?: boolean): void
        {
            if (novoValor === undefined) novoValor = null;

            ignorarValorNaoAtribuido = u.ConverterUtil.ParaBoolean(ignorarValorNaoAtribuido);

            const caminhoPropriedade: string = (refPropriedade instanceof r.Propriedade) ? (refPropriedade as r.Propriedade).Nome : refPropriedade;
            const paiPropriedade = ReflexaoUtil.RetornarValorPaiPropriedade(obj, caminhoPropriedade, ignorarValorNaoAtribuido);
            let valorAtribuido = false;
            if (ValidacaoUtil.IsDefinido(paiPropriedade))
            {
                const partes = caminhoPropriedade.toString().split(".");
                const propriedade = partes.Last();

                if (!(typeof paiPropriedade[propriedade] === "undefined"))
                {
                    paiPropriedade[propriedade] = novoValor;
                    valorAtribuido = true;
                }
            }
            if (!valorAtribuido)
            {
                if (!ignorarValorNaoAtribuido)
                {
                    console.error(`Não foi possível atribuir valor para propriedade ${caminhoPropriedade} pois ela não está definida em ${obj?.GetType().Nome}`, this);
                }
            }
        }

        public static RetornarValorPaiPropriedade(obj: any, caminhoPropriedade: string, ignorarValorNaoEncontrado: boolean): any
        {
            if (obj !== undefined)
            {
                if (caminhoPropriedade === ".")
                {
                    return obj;
                }

                const partes = caminhoPropriedade.toString().split(".");
                const propriedade = partes.Last();
                let valorPai = obj;
                if (partes.length > 1)
                {
                    partes.Remove(propriedade);
                    caminhoPropriedade = partes.join(".");
                    valorPai = ReflexaoUtil.RetornarValorPropriedade(obj, caminhoPropriedade, ignorarValorNaoEncontrado);
                }
                if (typeof valorPai !== "undefined")
                {
                    return valorPai;
                }
            }
            if (!ignorarValorNaoEncontrado)
            {
                throw new Erro(`Não foi encontrado o pai da propriedade ${caminhoPropriedade}`, this);
            }
            return null;
        }
        //#region Tipo

        public static TipoRetornarTipoPrimario(tipo: r.BaseTipo): boolean
        {
            return (tipo instanceof r.TipoPrimario);
        }

        public static TipoRetronarTipoNumerico(tipo: r.BaseTipo): boolean
        {
            if (ReflexaoUtil.TipoRetornarTipoPrimario(tipo))
            {
                const tipoPrimarioEnum = (tipo as r.TipoPrimario).TipoPrimarioEnum;
                switch (tipoPrimarioEnum)
                {
                    case (r.EnumTipoPrimario.Integer):
                    case (r.EnumTipoPrimario.Long):
                    case (r.EnumTipoPrimario.Decimal):
                    case (r.EnumTipoPrimario.Double):

                        return true;
                }
            }
            return false;
        }
        //#endregion

        //#region Construtor

        public static RetornarConstrutorEntidade(nomeTipoEntidade: string): IConstrutor<Entidade>
        {
            return r.ReflexaoNamespaceUtil.RetornarConstrutorEntidade(nomeTipoEntidade);
        }

        public static RetornarConstrutorEnum(tipo: r.BaseTipo): object
        public static RetornarConstrutorEnum(caminhoTipo: string): object;
        public static RetornarConstrutorEnum(tipoOrCaminho: string | r.BaseTipo): object
        {
            const construtor = (tipoOrCaminho instanceof r.BaseTipo) ?
                tipoOrCaminho.Construtor :
                r.ReflexaoNamespaceUtil.RetornarObjeto(tipoOrCaminho);

            if (u.ValidacaoUtil.IsConstrutorEnum(construtor))
            {
                return construtor as object;
            }
            throw new Erro(`Não foi encontrado o construtor enum ${tipoOrCaminho}`);
        }

        //#endregion

        public static RetornarTipoItemLista(lista: Array<any>): Snebur.Reflexao.BaseTipoLista
        {
            if (lista.Count === 0)
            {
                return $Reflexao.TipoListaVazia;
            }
            const tipos = lista.Select(x => x.GetType()).Distinct() as Array<r.BaseTipo>;
            if (tipos.Count === 1)
            {
                return ReflexaoUtil.RetornarTipoItemListaInterno(tipos.Single());
            }
            if (tipos.All(x => x instanceof r.BaseTipo))
            {
                const primeiro = tipos.First();
                let tipoAtual = primeiro;
                while (tipoAtual instanceof r.BaseTipo)
                {
                    if (tipos.All(x => x.IsSubTipoIgual(tipoAtual)))
                    {
                        return ReflexaoUtil.RetornarTipoItemListaInterno(tipoAtual);
                    }
                    tipoAtual = tipoAtual.TipoBase;
                }
            }
            throw new Erro("O tipo de lista não é suportado,  pois os tipos não são compatíveis", this);
        }

        private static RetornarTipoItemListaInterno(tipo: r.BaseTipo): Snebur.Reflexao.BaseTipoLista
        {
            const caminhoTipoLista = u.ReflexaoUtil.RetornarCaminhoTipoLista(tipo);
            if ($Reflexao.Tipos.ContainsKey(caminhoTipoLista))
            {
                return $Reflexao.Tipos.Item(caminhoTipoLista) as Snebur.Reflexao.BaseTipoLista;
            }
            return $Reflexao.TipoListaItemDesconhecido;
        }

        public static RetornarNomeTipo(obj: Function | SneburObject | string | any, isIgnorarErro: boolean = true): string
        {
            if (obj === undefined)
            {
                return "undefined";
            }

            if (obj === null)
            {
                return "null";
            }

            if (typeof obj === "string")
            {
                if (obj.Contains("."))
                {
                    return obj.substring(obj.indexOf(".") + 1);
                }
                return obj;
            }

            if (typeof obj.GetType === "function")
            {
                const tipo = obj.GetType();
                if (tipo instanceof r.BaseTipo)
                {
                    return tipo.Nome;
                }
            }

            if (typeof obj.constructor?.name === "string")
            {
                return obj.constructor.name;
            }

            const nomeConstrutor = this.RetornarNomeConstrutor(obj);
            if (!String.IsNullOrEmpty(nomeConstrutor))
            {
                return nomeConstrutor;
            }

            if (isIgnorarErro)
            {
                return "Desconhecido";
            }
            throw new Erro("Não é possível retornar o nome do tipo");
        }

        private static RetornarNomeConstrutor(obj: any): string
        {
            const regexNomeConstrutor = /function (.{1,})\(/;
            const resultado = (regexNomeConstrutor).exec((obj).constructor.toString());
            return (resultado && resultado.length > 1) ? resultado[1] : "";
        }

        public static RetornarTipoPrimarioEnum(valorPropriedade: any): r.EnumTipoPrimario
        {
            if (ValidacaoUtil.IsDefinido(valorPropriedade))
            {
                const tipo = valorPropriedade.GetType();
                if (tipo instanceof r.TipoPrimario)
                {
                    return tipo.TipoPrimarioEnum;
                }
                throw new Error(`O tipo '${tipo.Nome}' não  é um tipo primário`);
            }
            throw new Error("O valor de propriedade não foi definido");
        }

        public static Estender(destino: any, origem: any)
        {
            for (const chave of Object.keys(origem))
            {
                if (destino[chave] == null && destino[chave] !== origem[chave])
                {
                    destino[chave] = origem[chave];
                }
            }
        }


        public static DeletarPropriedadesNulas(obj: any): void
        {
            for (const p in obj)
            {
                if (obj[p] == null)
                {
                    delete obj[p];
                }
            }
        }



    }
}