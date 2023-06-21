/*eslint-disable*/
namespace Snebur
{
    export interface IGrupoChaveValores<TChave extends Objeto | string | number | boolean, TItem>
    {
        Chave: TChave;
        Itens: Array<TItem>;
    }

    export class GrupoChaveValores<TChave extends Objeto | string | number | boolean, TItem> implements IGrupoChaveValores<TChave, TItem>
    {
        private _chave: TChave;
        private _itens: Array<TItem>

        public get Chave(): TChave { return this._chave; }
        public get Itens(): Array<TItem> { return this._itens; }

        public constructor(chave: TChave, itens: Array<TItem>)
        {
            this._chave = chave;
            this._itens = itens;
        }
    }

    Object.defineProperty(Array.prototype, "GetHashCode", {
        value: function (): number
        {
            if (!this.__hashCode)
            {
                this.__hashCode = Objeto.RetornarNovoHashCode();
            }
            return this.__hashCode;
        }
    });

    Object.defineProperty(Array.prototype, "TipoLista", {
        get: function (): EnumTipoLista
        {
            if (typeof this._tipoLista === "number")
            {
                return this._tipoLista;
            }
            return EnumTipoLista.Array;
        }
    });

    Object.defineProperty(Array.prototype, "Length", {
        get: function (this: Array<any>,): number
        {
            return this.length;
        }
    });

    Array.prototype.Cast = function (this: Array<any>,)
    {
        return this;
    };

    Array.prototype.OfType = function (this: Array<any>, construtor: IConstrutor<any>): any
    {
        const len = this.length;
        const resultado = Array<any>();
        for (let i = 0; i < len; i++)
        {
            const objeto = this[i];
            if (objeto instanceof construtor)
            {
                resultado.push(objeto);
            }
        }
        /*  resultado.__isQuery = true;*/
        return resultado;
    };

    Array.prototype.ToList = function (this: Array<any>, isCopiar: boolean = false)
    {
        if (isCopiar)
        {
            return [...this]
        }
        else
        {
            //caso seja implementa o enumerable "Generators" interctor (YELD) typecript 2.5.
            //https://basarat.gitbooks.io/typescript/docs/generators.html
            return this;
        }
    }

    Array.prototype.ToTupleItemIndex = function (this: Array<any>,)
    {
        let retorno = new Array<[any, number]>();
        let len = this.length;
        for (let i = 0; i < len; i++)
        {
            retorno.Add([this[i], i]);
        }
        return retorno;
    }

    Array.prototype.ToTupleItemProgresso = function (this: Array<any>, isContarPrimeiro: boolean = false)
    {
        let retorno = new Array<[any, number]>();
        let len = this.length;
        let primeiro = (isContarPrimeiro) ? 1 : 0;
        for (let i = 0; i < len; i++)
        {
            let p = ((i + primeiro) / len) * 100;
            retorno.Add([this[i], p]);
        }
        return retorno;
    };

    Array.prototype.Except = function (this: Array<any>, listaRemover: Array<any>)
    {
        let retorno = new Array<any>();
        for (let item of this)
        {
            if (!listaRemover.Contains(item))
            {
                retorno.Add(item);
            }
        }
        /* retorno.__isQuery = true;*/
        return retorno;
    }


    Array.prototype.Intersect = function (this: Array<any>, listaRemover: Array<any>)
    {
        let retorno = new Array<any>();
        for (let item of this)
        {
            if (listaRemover.Contains(item))
            {
                retorno.Add(item);
            }
        }
        /*retorno.__isQuery = true;*/
        return retorno;
    }

    Array.prototype.Union = function (this: Array<any>, lista: Array<any>)
    {
        let retorno = this.ToList(true);
        for (let item of lista)
        {
            if (!this.Contains(item))
            {
                retorno.Add(item);
            }
        }
        /*retorno.__isQuery = true;*/
        return retorno;
    };

    Array.prototype.ToListaObservacao = function (this: Array<any>)
    {
        let lista = new ListaObservacao<any>();
        let len = this.length;
        for (let i = 0; i < len; i++)
        {
            let item = this[i];
            lista.push(item);
        }
        return lista;
    };


    Array.prototype.Select = function (this: Array<any>, funcaoMapear: any)
    {
        let retorno = this.map(funcaoMapear) as Array<any>;
        /*retorno.__isQuery = true;*/
        return retorno;
    };

    Array.prototype.Zip = function (this: Array<any>, lista: Array<any>)
    {
        const retorno = new Array<[any, any]>();
        for (let i = 0; i < this.length; i++)
        {
            retorno.Add([this[i], lista[i] ?? null]);
        }
        return retorno;
    };

    Array.prototype.SelectMany = function (this: Array<any>, caminhoColecao: Function)
    {
        let retorno = new Array<any>();
        for (let item of this)
        {
            let colecao = caminhoColecao(item) as Array<any>;

            //let caminhoProrpiedade = u.ReflexaoUtil.RetornarCaminhoPropriedade<any>(caminhoColecao as any);
            //let colecao = u.ReflexaoUtil.RetornarValorPropriedade(item, caminhoProrpiedade) as Array<any>;

            if (u.ValidacaoUtil.IsDefinido(colecao))
            {
                if (!(u.ValidacaoUtil.IsArray(colecao)))
                {
                    throw new ErroOperacaoInvalida("A coleção {0} é invalida", caminhoColecao.toString())
                }
                retorno.AddRange(colecao);
            }
        }
        /*retorno.__isQuery = true;*/
        return retorno as any;
    };

    Array.prototype.Where = function (this: Array<any>, funcaoFiltrar)
    {
        let retorno = this.filter(funcaoFiltrar) as Array<any>;
        /*retorno.__isQuery = true;*/
        return retorno;
    };

    //http://www.javascriptkit.com/javatutors/arraysort2.shtml
    Array.prototype.OrderBy = (function (this: Array<any>, funcaoOrdenacao)
    {
        let ordenacaoCrenscente = function (a: any, b: any)
        {
            //var valorA = ReflectionUtils.RetornarValorPropriedade(a, caminhoPropriedade);
            //var valorB = ReflectionUtils.RetornarValorPropriedade(b, caminhoPropriedade);
            let valorA = funcaoOrdenacao(a);
            let valorB = funcaoOrdenacao(b);

            // Os nulo vem antes
            if (valorA == null)
            {
                return valorB == null ? 0 : -1;
            }

            if (valorB == null)
            {
                return -1;
            }

            // String
            if (typeof valorA === "string" && typeof valorB === "string")
            {
                valorA = valorA.toLowerCase();
                valorB = valorB.toLowerCase();

                if (valorA < valorB)
                {
                    return -1;
                }
                if (valorA > valorB)
                {
                    return 1;
                }
                return 0;
            }

            if (typeof valorA === "number" && typeof valorB === "number")
            {
                return valorA - valorB;
            }

            if (valorA instanceof Date && valorB instanceof Date)
            {
                return valorA.getTime() - valorB.getTime();
            }

            if (valorA instanceof TimeSpan && valorB instanceof TimeSpan)
            {
                return valorA.TotalMilliseconds - valorB.TotalMilliseconds
            }

            throw new Erro(' A valor do propriedade para ordenação não é suportado');
        };

        return [...this].sort(ordenacaoCrenscente) as Array<any>;
    });

    Array.prototype.OrderByDescending = function (this: Array<any>, funcaoOrdenacao)
    {
        if (this.length == 0)
        {
            return this;
        }

        let ordenacaoDecrenscente = function (a: any, b: any)
        {
            let valorA = funcaoOrdenacao(a);
            let valorB = funcaoOrdenacao(b);

            // Os nulo vem antes
            if (valorA == null)
            {
                return (valorB == null) ? 0 : 1;
            }

            if (valorB == null)
            {
                return 1;
            }

            // String
            if (typeof valorA === "string" && typeof valorB === "string")
            {
                valorA = valorA.toLowerCase();
                valorB = valorB.toLowerCase();

                if (valorA > valorB)
                {
                    return -1;
                }
                if (valorA < valorB)
                {
                    return 1;
                }
                return 0;
            }

            if (typeof valorA === "number" && typeof valorB === "number")
            {
                return valorB - valorA;
            }

            if (valorA instanceof Date && valorB instanceof Date)
            {
                return valorB.getTime() - valorA.getTime();
            }

            if (valorA instanceof TimeSpan && valorB instanceof TimeSpan)
            {
                return valorB.TotalMilliseconds - valorA.TotalMilliseconds
            }

            throw new ErroNaoSuportado(" A valor do propriedade para ordenação não é suportado");
        };
        return [...this].sort(ordenacaoDecrenscente) as Array<any>;
    };

    Array.prototype.NaturalOrderBy = (function (this: Array<any>, funcaoOrdenacao)
    {
        const retorno = this.ToList(true).sort((a, b) =>
        {
            let valorA = funcaoOrdenacao(a);
            let valorB = funcaoOrdenacao(b);
            return naturalSort(valorA, valorB);
        });
        /*retorno.__isQuery = true;*/
        return retorno;
    });

    Array.prototype.NaturalOrderByDescending = (function (this: Array<any>, funcaoOrdenacao)
    {
        return this.NaturalOrderBy(funcaoOrdenacao).reverse();

    });

    Array.prototype.Sum = (function (this: Array<any>, expressao?: Function)
    {
        if (!(expressao instanceof Function))
        {
            expressao = function (x: any) { return x; };
        }

        let len = this.length;
        let resultado = 0;
        for (let i = 0; i < len; i++)
        {
            let objeto = this[i];
            let valorPropriedade = expressao(objeto);

            if ($Configuracao.IsDebug)
            {
                if (!u.ValidacaoUtil.IsNumber(valorPropriedade))
                {
                    throw new ErroNaoSuportado("A sum suporte apenas o tipo number", this);
                }
            }

            resultado += valorPropriedade;
        }
        return resultado;

    });

    Array.prototype.Average = (function (this: Array<any>, expressao?: Function)
    {
        let lista = this as Array<any>;
        return lista.Sum(expressao as any) / lista.Count;
    });

    Array.prototype.MaxObjeto = (function (this: Array<any>, expressao?: Function)
    {
        if (!(expressao instanceof Function))
        {
            expressao = function (x: any) { return x; }
        }

        let len = this.length;
        let maior = undefined;
        let maiorObjeto: any = null;
        for (let i = 0; i < len; i++)
        {
            let objeto = this[i];
            let valorPropriedade = expressao(objeto);

            if (maior === undefined)
            {
                maior = valorPropriedade;
                maiorObjeto = objeto;
            }

            if ($Configuracao.IsDebug)
            {
                if (!(u.ValidacaoUtil.IsNumber(valorPropriedade) ||
                    u.ValidacaoUtil.IsDate(valorPropriedade) ||
                    valorPropriedade instanceof TimeSpan))
                {
                    let mensagem = `O tipo não é suportado. Expressão '${expressao.toString()}', Tipo: '${u.ReflexaoUtil.RetornarNomeTipo(valorPropriedade)}'`;
                    throw new ErroNaoSuportado(mensagem, this);
                }
            }

            //if (maior == null)
            //{
            //    maior = valorPropriedade;
            //    maiorObjeto = objeto;
            //}
            if (valorPropriedade > maior)
            {
                maior = valorPropriedade;
                maiorObjeto = objeto;
            }
        }
        return maiorObjeto;

    });

    Array.prototype.Max = (function (expressao?: (value: any) => number | Date)
    {
        let _lista = this as Array<any>;
        if (_lista.Count > 0)
        {
            if (!(expressao instanceof Function))
            {
                expressao = function (x: any) { return x; };
            }
            let objeto = _lista.MaxObjeto(expressao);
            return expressao(objeto);
        }
        return null;

    });

    Array.prototype.MinObjeto = (function (this: Array<any>, expressao?: Function)
    {
        if (!(expressao instanceof Function))
        {
            expressao = function (x: any) { return x; }
        }

        let len = this.length;
        let menor: any = undefined;
        let menorObjeto: any = null;
        for (let i = 0; i < len; i++)
        {
            let objeto = this[i];
            let valorPropriedade = expressao(objeto);

            if (menor === undefined)
            {
                menor = valorPropriedade;
                menorObjeto = objeto;
            }

            if (valorPropriedade < menor)
            {
                menor = valorPropriedade;
                menorObjeto = objeto;
            }
        }
        return menorObjeto;

    });

    Array.prototype.Min = (function (expressao?: (value: number | Date) => number | Date)
    {
        let _lista = this as Array<any>;
        if (_lista.Count > 0)
        {
            if (!(expressao instanceof Function))
            {
                expressao = function (x: any) { return x; };
            }
            let objeto = _lista.MinObjeto(expressao);
            return expressao(objeto);
        }
        return null;
    });

    Array.prototype.All = (function (funcaoAll)
    {
        if (u.ValidacaoUtil.IsFunction(funcaoAll))
        {
            let len = this.length;
            for (let i = 0; i < len; i++)
            {
                let item = this[i];
                if (!funcaoAll(item))
                {
                    return false;
                }
            }
        }
        return true;
    });

    Array.prototype.Any = function (this: Array<any>, funcaoAny)
    {
        if (u.ValidacaoUtil.IsFunction(funcaoAny))
        {
            let len = this.length;
            for (let i = 0; i < len; i++)
            {
                let item = this[i];
                if (funcaoAny(item))
                {
                    return true;
                }
            }
        }
        return false;
    };

    //Array.prototype.Count = function ()
    //{
    //    return this.length;
    //}

    Object.defineProperty(Array.prototype, "Count", {

        get: function ()
        {
            return this.length;
        }
    });

    Array.prototype.First = (function (expressaoFiltro?: Function | any)
    {
        if (this.length === 0)
        {
            throw new Erro("A coleção não contem elementos", this);
        }
        if (!u.ValidacaoUtil.IsDefinido(expressaoFiltro))
        {
            return this[0];
        }
        else
        {
            let primeiro = this.FirstOrDefault(expressaoFiltro);
            if (primeiro == null)
            {
                throw new Erro("A expressão não encontrou itens", this);
            }
            return primeiro;
        }
    });

    Array.prototype.FirstOrDefault = (function (this: Array<any>, expressaoFiltro?: Function)
    {
        if (this.length === 0)
        {
            return null;
        }
        if (!u.ValidacaoUtil.IsDefinido(expressaoFiltro))
        {
            return this[0];
        }
        else
        {
            let len = this.length;
            for (let i = 0; i < len; i++)
            {
                let item = this[i];
                if (expressaoFiltro(item))
                {
                    return item;
                }
            }
            return null;
        }
    });

    Array.prototype.Last = (function ()
    {
        if (this.length === 0)
        {
            throw new Erro("A coleção não contem elementos", this);
        }
        return this[this.length - 1];
    });

    Array.prototype.LastOrDefault = (function (this: Array<any>)
    {
        if (this.length === 0)
        {
            return null;
        }
        return this[this.length - 1];
    });

    Array.prototype.Single = (function (this: Array<any>, mensagens?: () => Snebur.MensagemErroArraySingle)
    {
        if (this.length === 0)
        {
            let mensagem = "A coleção não contem elementos" + mensagens?.call(null).Vazia;
            throw new Erro(mensagem, this);
        }
        if (this.length > 1)
        {
            let mensagem = "A coleção contem mais de um elemento. " + mensagens?.call(null).MaisDeUm;
            throw new Erro(mensagem, this);
        }
        return this[0];
    });

    Array.prototype.SingleOrDefault = (function (this: Array<any>, mensagens?: () => MensagemErroArraySingle)
    {
        if (this.length === 0)
        {
            return null;
        }
        if (this.length > 1)
        {
            let mensagem = "A coleção contem mais de um elemento. " + mensagens?.call(null).MaisDeUm;
            throw new Erro(mensagem, this);
        }
        return this[0];
    });

    Array.prototype.Random = (function (this: Array<any>,)
    {
        if (this.length === 0)
        {
            throw new Erro("A coleção não contem elementos", this);
        }
        let indiceRando = parseInt(u.RandomUtil.RetornarRandom(0, (this.length - 1)));
        return this[indiceRando];
    });

    Array.prototype.RandomOrDefault = (function (this: Array<any>,)
    {
        if (this.length === 0)
        {
            return null;
        }
        return this.Random();
    });

    Array.prototype.Take = function (this: Array<any>, quantidade: number)
    {
        let final = (quantidade > this.length) ? (this.length) : (quantidade);
        return this.slice(0, final);
    };

    Array.prototype.Skip = function (this: Array<any>, quantidade: number)
    {
        if (quantidade > this.length)
        {
            return [];
        } else
        {
            //var final = (this.length - quantidade);
            return this.slice(quantidade, this.length);
        }
    };

    Array.prototype.Distinct = (function (this: Array<any>,)
    {
        function ___Unico(valor: any, index: any, lista: any[])
        {
            return lista.indexOf(valor) === index;
        }
        let resultado = this.filter(___Unico) as Array<any>;
        /*resultado.__isQuery = true;*/
        return resultado;
    });


    Array.prototype.indexOfBase = Array.prototype.indexOf;

    Array.prototype.indexOf = (function (this: Array<any>, obj: any, argumento?: any)
    {
        return this.IndexOf(obj, argumento);
    });

    Array.prototype.IndexOf = function (this: Array<any>, obj: any, comprador?: IEqualityComparer)
    {
        let isComparar = comprador && typeof comprador.Equals === "function";
        let isEquals = obj && typeof ((obj as IEquals).Equals) === "function";
        if (!isEquals && !isComparar)
        {
            return this.indexOfBase(obj);
        }
        else
        {
            for (let i = 0; i < this.length; i++)
            {
                let item = this[i];
                if (obj === item)
                {
                    return i;
                }

                if (isComparar)
                {
                    if (comprador.Equals(obj, item))
                    {
                        return i;
                    }
                }
                else if (isEquals)
                {
                    if ((obj as IEquals).Equals(item))
                    {
                        return i;
                    }
                }
            }
        }
        return -1;
    };

    Array.prototype.CopyTo = (function (this: Array<any>, lista: Array<any>)
    {
        for (let i = 0; i < this.length; i++)
        {
            lista.Add(this[i]);
        }
    });

    Array.prototype.ToDicionario = (function (this: Array<any>, expressaoChave: Function, expressaoItem?: Function): DicionarioSimples<any, any>
    {
        let retorno = new DicionarioSimples<any>();
        let expressaItemInterno = u.ValidacaoUtil.IsFunction(expressaoItem) ? expressaoItem : (x: any) => x;
        for (let _item of this)
        {
            let chave = expressaoChave(_item);
            let item = expressaItemInterno(_item);

            if (!u.ValidacaoUtil.IsDefinido(chave))
            {
                throw new Erro("A chave não foi encontrada na expressão");
            }
            retorno.Add(chave, item);
        }
        return retorno;
    });

    Array.prototype.ToDicionarioTipado = (function (this: Array<any>, expressaoChave: (value: any) => TipoItemLista, expressaoItem: (value: any) => any): any
    {
        let retorno = new DicionarioTipado<TipoItemLista, any>();
        let caminhoPropriedadeChave = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoChave);
        let caminhoPropriedadeItem = u.ValidacaoUtil.IsFunction(expressaoItem) ? u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoItem) : null;
        for (let _item of this)
        {
            let chave = u.ReflexaoUtil.RetornarValorPropriedade(_item, caminhoPropriedadeChave) as string;
            let item = (caminhoPropriedadeItem == null) ? _item : u.ReflexaoUtil.RetornarValorPropriedade(_item, caminhoPropriedadeItem);
            retorno.Add(chave, item);
        }
        return retorno as any;
    });

    Array.prototype.GroupBy = function (this: Array<any>, expressaoChave: Function): Array<GrupoChaveValores<any, any>>
    {
        let lista = this as Array<any>;
        let gruposChaveValores = new Array<GrupoChaveValores<any, any>>();
        let dicionarioGrupo = lista.DicionarioGroupBy(expressaoChave as any);

        for (let chave of dicionarioGrupo.Chaves)
        {
            gruposChaveValores.Add(new GrupoChaveValores(chave, dicionarioGrupo.Item(chave)));
        }
        return gruposChaveValores;
    }

    Array.prototype.DicionarioGroupBy = (function (this: Array<any>, expressaoChave: Function): DicionarioTipado<any, Array<any>>
    {
        let dicionario = new DicionarioTipado<any, Array<any>>();
        let lista = this as Array<any>;
        let len = lista.length;
        for (let i = 0; i < len; i++)
        {
            let item = lista[i];
            let chave = expressaoChave(item);
            if (!dicionario.ContainsKey(chave))
            {
                dicionario.Add(chave, new Array<any>());
            }
            dicionario.Item(chave).Add(item);
        }
        return dicionario;
    });


    Array.prototype.OrderByRandow = function (this: Array<any>): Array<any>
    {
        let lista = (this as Array<any>).ToList(true);
        let contador = lista.length;
        let temp: any;
        while (contador > 0)
        {
            let posicaoAleatoria = Math.floor(Math.random() * contador);
            contador--;
            temp = lista[contador];
            lista[contador] = lista[posicaoAleatoria];
            lista[posicaoAleatoria] = temp;
        }
        /*lista.__isQuery = true;*/
        return lista;
    }

    Array.prototype.Reverse = function (this: Array<any>)
    {
        let retorno = (this as Array<any>).reverse();
        /*retorno.__isQuery = true;*/
        return retorno;
    };

    Array.prototype.ForEach = function (this: Array<any>, f: (value: any, index: number, array: any[]) => void, thisArg?: any)
    {
        return this.forEach(f);
    };

    Array.prototype.ToObject = function (this: Array<any>, isValueAsKey: boolean = false)
    {
        const obj: { [x: string | number]: any } = {};
        if (isValueAsKey)
        {
            for (let i = 0; i < this.length; ++i)
            {
                obj[this[i]] = undefined;
            }
            return obj;
        }

        for (let i = 0; i < this.length; ++i)
        {
            obj[i] = this[i];
        }
        return obj;
    }

    Object.defineProperty(Array.prototype, "IsListaNova", {
        get: function ()
        {
            return this.__isListaNova ||
                this.__isLimpandoListaNova;
        }
    });

    Array.isArrayBase = Array.isArray;

    Object.defineProperty(Array, "isArray", {
        value: function (this: Array<any>, obj: any): obj is any[]
        {
            if (obj instanceof HashSet)
            {
                return false;
            }
            return Array.isArrayBase(obj);
        }
    });
}

interface Array<T> 
{
    /*__isQuery?: boolean;*/
}