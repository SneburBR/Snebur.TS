namespace Snebur.Utilidade
{
    export class Util
    {
        private static _globalThis: any = typeof globalThis === "object" ? globalThis : typeof window === "object" ? window : typeof self === "object" ? self : typeof global === "object" ? global : undefined;

        public static RetornarArray<T>(item: T): Array<T>
        {
            const array = new Array<T>();
            array.push(item);
            return array;
        }

        public static RetornarRelacaoAberta<T>(expressao: (value: T) => any): string
        {
            const caminho = u.ReflexaoUtil.RetornarCaminhoPropriedade(expressao);
            return caminho.Replace("Incluir().", String.Empty);
        }
        public static RetornarRelacoesAbertas<T>(...expressoes: Array<(value: T) => any>): string
        {
            const relacoes = new List<string>();
            for (const expressao of expressoes)
            {
                const relacao = Util.RetornarRelacaoAberta(expressao);
                relacoes.Add(relacao);
            }
            return String.Join(",", relacoes);
        }

        public static IsIgual(valor1: any, valor2: any)
        {
            if (valor1 === valor2)
            {
                return true;
            }
            if (valor1 instanceof d.Entidade && valor2 instanceof d.Entidade)
            {
                return valor1.__IdentificadorEntidade === valor2.__IdentificadorEntidade;
            }

            if (valor1 && typeof (valor1 as IEquals).Equals === "function")
            {
                return valor1.Equals(valor2);
            }
            return false;
        }

        public static IsDiferente(valor1: any, valor2: any)
        {
            return !this.IsIgual(valor1, valor2);
        }

        public static IsArrayIgual(array1: List<any>, array2: List<any>): boolean
        {
            if (array1.length === array2.length)
            {
                const len = array1.length;
                for (let i = 0; i < len; i++)
                {
                    const item1 = array1[i];
                    const item2 = array2[i];
                    if (item1 !== item2)
                    {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

        public static IsMaior(valorPropriedadeAuxiliar: any, valorPropriedade: any): boolean
        {
            if (valorPropriedade == null && valorPropriedadeAuxiliar != null)
            {
                return true;
            }
            return valorPropriedadeAuxiliar > valorPropriedade;
        }

        public static IsMaiorOuIgual(valorPropriedadeAuxiliar: any, valorPropriedade: any): boolean
        {
            if (valorPropriedade == null && valorPropriedadeAuxiliar != null)
            {
                return true;
            }
            return valorPropriedadeAuxiliar >= valorPropriedade;
        }

        public static IsMenor(valorPropriedadeAuxiliar: any, valorPropriedade: any): boolean
        {
            if (valorPropriedadeAuxiliar == null && valorPropriedade != null)
            {
                return true;
            }
            return valorPropriedadeAuxiliar < valorPropriedade;
        }

        public static IsMenorOuIgual(valorPropriedadeAuxiliar: any, valorPropriedade: any): boolean
        {
            if (valorPropriedadeAuxiliar == null && valorPropriedade != null)
            {
                return true;
            }
            return valorPropriedadeAuxiliar <= valorPropriedade;
        }

        public static CopiarArray(atributos: NamedNodeMap): Array<Attr>
        public static CopiarArray(nodeList: NodeList): Array<Node>
        public static CopiarArray(nodeList: NodeListOf<ChildNode>): Array<Node>
        public static CopiarArray(fileList: FileList): Array<File>
        public static CopiarArray<T>(array: Array<T>): Array<T>
        public static CopiarArray<T>(domToeknLit: DOMTokenList): Array<T>
        public static CopiarArray<T>(domToeknLit: IArguments): Array<T>
        public static CopiarArray(elementList: HTMLCollectionOf<Element>): Array<HTMLElement>
        public static CopiarArray<TElement extends HTMLElement>(elementList: HTMLCollectionOf<TElement>): Array<TElement>
        public static CopiarArray<T>(array: any): Array<T>
        {
            const len = array.length;
            const copia = new Array<T>();
            for (let i = 0; i < len; i++)
            {
                if (array instanceof DOMTokenList)
                {
                    copia.push(array.item(i) as any);
                }
                else
                {
                    copia.push(array[i]);
                }
            }
            return copia;
        }

        public static IgualSensivel(valor1: number, valor2: number, sensibilidade: number): boolean
        {
            if (sensibilidade === 0)
            {
                return valor1 === valor2;
            }
            const minimo = valor2 - sensibilidade;
            const maximo = valor2 + sensibilidade;
            return valor1 >= minimo && valor1 <= maximo;
        }

        public static Maior(valor1: number, valor2: number): boolean
        {
            return valor1 > valor2;
        }

        public static Menor(valor1: number, valor2: number): boolean
        {
            return valor1 < valor2;
        }

        public static IsDefinido(valor: any): boolean
        {
            return u.ValidacaoUtil.IsDefinido(valor);
        }

        public static RetornarTodosObjetoTipo<T>(objeto: any, construtor: IConstrutor<T>): T[]
        {
            const objetos = new HashSet<any>();
            const objetosAnalisados = new HashSet<object>();
            Util.VarrerObjeto(objeto, objetos, objetosAnalisados, construtor);
            return objetos.ToList();
        }

        private static VarrerObjeto(objeto: any, objetos: HashSet<any>, objetosAnalisados: HashSet<any>, construtor: Function)
        {
            if (objeto == null)
            {
                return;
            }

            if (objetosAnalisados.Contains(objeto))
            {
                return;
            }
            objetosAnalisados.Add(objeto);

            if (objeto instanceof construtor)
            {
                objetos.Add(objeto);
            }

            if (objeto instanceof Array || Array.isArray(objeto))
            {
                for (const item of objeto)
                {
                    Util.VarrerObjeto(item, objetos, objetosAnalisados, construtor);
                }
            }
            else
            {
                if (objeto instanceof d.BaseTipoComplexo)
                {
                    return;
                }

                for (const propriedade of Object.keys(objeto))
                {
                    /*eslint-disable*/
                    if (objeto.hasOwnProperty(propriedade))
                    {
                        let valor = objeto[propriedade];
                        Util.VarrerObjeto(valor, objetos, objetosAnalisados, construtor);
                    }
                }
            }
        }

        public static RetornarNomePropriedade<T>(expressaoPropriedade: (value: T) => any): string
        {
            if (typeof expressaoPropriedade === "function")
            {
                return u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoPropriedade);
            }

            throw new Erro("A expressaoPropriedade é invalida ");

        }

        public static Concatenar(partes: string[]): string
        public static Concatenar(partes: string[], separador: string): string
        public static Concatenar(partes: string[], separadores: [string, string]): string
        public static Concatenar(partes: string[], separador?: [string, string] | string): string
        {
            return TextoUtil.Concatenar(partes, separador as any);
        }

        public static StringIgual(str1: string, str2: string, comparacao: EnumStringComparacao)
        {
            if (str1 == null && str2 == null)
            {
                return true;
            }
            if (str1 == null || str2 == null)
            {
                return false;
            }

            switch (comparacao)
            {
                case EnumStringComparacao.Normal:
                    return str1 == str2;
                case EnumStringComparacao.IgnorarCaso:
                    return str1.toLocaleLowerCase() === str2.toLocaleLowerCase();
                case EnumStringComparacao.IgnorarAcentos:
                    return TextoUtil.RemoverAcentos(str1) == TextoUtil.RemoverAcentos(str2);
                case EnumStringComparacao.IgnorarCasoAcentos:
                    return TextoUtil.RemoverAcentos(str1.toLocaleLowerCase()) ==
                        TextoUtil.RemoverAcentos(str2.toLocaleLowerCase());
                case EnumStringComparacao.IgnorarCasoTrim:
                    return str1.trim().toLocaleLowerCase() === str2.trim().toLocaleLowerCase();
                case EnumStringComparacao.IgnorarAcentosTrim:
                    return TextoUtil.RemoverAcentos(str1.trim()) == TextoUtil.RemoverAcentos(str2.trim());
                case EnumStringComparacao.IgnorarCasoAcentosTrim:
                    return TextoUtil.RemoverAcentos(str1.trim().toLocaleLowerCase()) ==
                        TextoUtil.RemoverAcentos(str2.trim().toLocaleLowerCase());
                default:
                    throw new Erro("comparacao não suportado");
            }
        }

        public static RetornarValor<T>(obj: any, construtor: IConstrutor<T>): T
        {
            if (obj instanceof construtor)
            {
                return obj;
            }
            return null;
        }

        public static get SafeGlobalThis(): any
        {
            return Util._globalThis
        }
    }
    declare var global: any;
}


interface SalvarInterno
{
    SalvarComo(blob: Blob, nomeArquivo: string): void;
}

declare let Salvar: SalvarInterno;



