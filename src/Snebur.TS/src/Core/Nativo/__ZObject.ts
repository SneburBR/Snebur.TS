
namespace Snebur
{
    Object.__CaminhoTipo = "object";

    //Function.__CaminhoTipo = "Function";

    (function ()
    {
        const tipobases = [Object,
            Function,
            Object.prototype,
            Function.prototype];

        for (const tipobase of tipobases)
        {
            DefiniarGetType(tipobase, true);
            DefniarRetornarTipo(tipobase, true);
        }

        const prototiposNativo = [

            Number.prototype,
            Boolean.prototype,
            String.prototype,
            Date.prototype];

        DefiniarCaminhoTipoPrototipo(String.prototype);
        DefiniarCaminhoTipoPrototipo(Number.prototype);
        DefiniarCaminhoTipoPrototipo(Boolean.prototype);
        DefiniarCaminhoTipoPrototipo(Date.prototype);

        for (const tipoNativo of prototiposNativo)
        {
            DefniarRetornarTipo(tipoNativo);
            DefiniarGetType(tipoNativo);

            Object.defineProperty(tipoNativo, "ToString", {

                value: function (formatacao?: any)
                {
                    const texto = this.toString();
                    if (!String.IsNullOrEmpty(formatacao))
                    {
                        return u.FormatacaoUtil.Formatar(texto, formatacao);
                    }
                    return texto;
                },
                writable: false,
                configurable: false,
                enumerable: false

            });

            Object.defineProperty(tipoNativo, "Formatar", {

                value: function (formatacao: EnumFormatacao)
                {
                    const texto = this.toString();
                    return u.FormatacaoUtil.Formatar(texto, formatacao);
                },
                writable: false,
                configurable: false,
                enumerable: false
            });

        }

        function DefiniarCaminhoTipoPrototipo(prototipo: any)
        {
            Object.defineProperty(prototipo, "__CaminhoTipo", {

                get: function ()
                {
                    const caminho = this.constructor?.__CaminhoTipo as string;
                    if (typeof caminho === "string")
                    {
                        return caminho;
                    }
                    return typeof this;
                },
                configurable: false,
                enumerable: false
            });
        }

        function DefniarRetornarTipo(objeto: any, isSobreEscrever = false)
        {
            Object.defineProperty(objeto, "__RetornarTipo", {

                value: function ()
                {
                    let caminhoTipo: string = this.__CaminhoTipo;
                    if (caminhoTipo == null)
                    {
                        caminhoTipo = typeof this;
                    }

                    if (!String.IsNullOrEmpty(caminhoTipo))
                    {
                        if (this instanceof r.BaseTipo)
                        {
                            return this;
                        }

                        if (!$Reflexao.Tipos.ContainsKey(caminhoTipo))
                        {
                            if ($Reflexao.IsCriarNovoTipoGenerico(caminhoTipo, this))
                            {
                                $Reflexao.AdicionarNovoTipoGenerico(caminhoTipo, this);
                                caminhoTipo = this.__CaminhoTipo;
                            }
                        }
                         
                        if ($Reflexao.Tipos.ContainsKey(caminhoTipo))
                        {
                            return $Reflexao.Tipos.Item(caminhoTipo);
                        }
                        

                        throw new Erro(`O tipo não foi encontrado ${caminhoTipo}`);
                    }
                    return u.ReflexaoUtil.RetornarTipoObjetoCaminhoNaoDefinido(this);
                },
                writable: true,
                configurable: false,
                enumerable: false

            });
        }

        function DefiniarGetType(objeto: any, isSobreEscrever = false)
        {
            Object.defineProperty(objeto, "GetType", {

                value: function ()
                {
                    return this.__RetornarTipo();
                },
                writable: true,
                configurable: false,
                enumerable: false
            });
        }

    })();

    export const ___PropriedadesMetodosProtegidos: any =
    {
        "GetType": true,
        "__CaminhoTipo": true,
        "__hashCode": true,
        "__nomeConstrutor": true,
        "__IdentificadorUnico": true,
        "__PropriedadesAlteradas" : true,
        "ToString": true,
        "Equals": true,
        "_identificadorUnico": true,
        "null": true
    };

    export const ___PropriedadesMetodosProtegidosEntidades: any =
    {
        "GetType": true,
        "__CaminhoTipo": true,
        "__hashCode": true,
        "__nomeConstrutor": true,
        "__IdentificadorUnico": true,
        "ToString": true,
        "Equals": true,
        "_identificadorUnico": true,
        "null": true
    };
 
    Object.defineProperty(Object, "assign", {
        value: function assign(destino: any, origens: any)
        {
            if (typeof destino !== "object")
            {
                throw new TypeError("Somente objeto podem ser assinados");
            }

            const objectoDestino = Object(destino);
            for (let index = 1; index < arguments.length; index++)
            {
                /*eslint-disable*/
                let proximaOrigem = arguments[index];
                /*eslint-enable*/
                if (typeof proximaOrigem === "object")
                {
                    for (const proprieade in proximaOrigem)
                    {
                        if (!___PropriedadesMetodosProtegidosEntidades[proprieade])
                        {
                            if (Object.prototype.hasOwnProperty.call(proximaOrigem, proprieade))
                            {
                                const valor = proximaOrigem[proprieade];
                                if ((typeof valor !== "function"))
                                {
                                    objectoDestino[proprieade] = valor;
                                }
                            }
                        }
                    }
                }
            }
            return objectoDestino;
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });


    Object.keysBase = Object.keys;

    Object.defineProperty(Object, "keys", {
        value: function (obj: object)
        {
            if (obj == null)
            {
                return [];
            }
            const chaves = Object.keysBase(obj);
            return chaves.Where(x => !___PropriedadesMetodosProtegidos[x]);
        },
        writable: false,
        configurable: false,
        enumerable: false
    });

    Object.defineProperty(Object, "isKey", {
        value: function (chave: string)
        {
            return !___PropriedadesMetodosProtegidos[chave];
        },
        writable: false,
        configurable: false,
        enumerable: false
    });
}

