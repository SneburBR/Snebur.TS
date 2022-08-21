
//namespace Snebur
//{

//    Object.prototype.__CaminhoTipo = null;

//    Object.prototype.RetornarTipo = function (): Snebur.Reflexao.BaseTipo
//    {
//        let caminhoTipo: string;
//        if (!String.IsNullOrEmpty(this.__CaminhoTipo))
//        {
//            caminhoTipo = this.__CaminhoTipo;
//        }
//        else if (!String.IsNullOrEmpty(this.constructor.__CaminhoTipo))
//        {
//            caminhoTipo = this.constructor.__CaminhoTipo;
//        }
//        if (!String.IsNullOrEmpty(caminhoTipo))
//        {
//            return $Reflexao.Tipos.Item(caminhoTipo);
//        }
//        else
//        {
//            return u.ReflexaoUtil.RetornarTipoObjetoCaminhoNaoDefinido(this);
//        }
//    };
     
//    Object.prototype.GetType = function (): Snebur.Reflexao.BaseTipo
//    {
//        if (this instanceof Snebur.Objeto)
//        {
//            if (!this.__tipo)
//            {
//                this.__tipo__ = this.RetornarTipo();
//            }
//            return this.__tipo__;
//        }
//        return this.RetornarTipo();
//    }

//    Object.prototype.ToString = function (formatacao?: any)
//    {
//        let texto = this.toString();
//        if (!String.IsNullOrEmpty(formatacao))
//        {
//            return u.FormatacaoUtil.Formatar(texto, formatacao);
//        }
//        return texto;
//    }

//    Object.prototype.Equals = function (obj: any): boolean
//    {
//        return this == obj;
//    }
   
//    export const ___PropriedadesMetodosProtegidas: any =
//    {
//        "GetType": true,
//        "__CaminhoTipo": true,
//        "__hashCode": true,
//        "__nomeConstrutor": true,
//        "__IdentificadorUnico": true,
//        "ToString": true,
//        "Equals": true,
//        "_identificadorUnico": true
//    };



//    Object.defineProperty(Object, "assign", {
//        value: function assign(destino: any, origens: any)
//        {
//            if (typeof destino != "object")
//            {
//                throw new TypeError("Somente objeto podem ser assinados");
//            }

//            let objectoDestino = Object(destino);

//            for (var index = 1; index < arguments.length; index++)
//            {
//                let proximaOrigem = arguments[index];
//                if (typeof proximaOrigem === "object")
//                {
//                    for (var proprieade in proximaOrigem)
//                    {
//                        if (!___PropriedadesMetodosProtegidas[proprieade])
//                        {
//                            if (Object.prototype.hasOwnProperty.call(proximaOrigem, proprieade))
//                            {
//                                let valor = proximaOrigem[proprieade];
//                                if ((typeof valor !== "function"))
//                                {
//                                    objectoDestino[proprieade] = valor;
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//            return objectoDestino;
//        },
//        writable: false,
//        configurable: false,
//        enumerable: false,
//    });
     

//    Object.keysBase = Object.keys;

//    Object.defineProperty(Object, "keys", {
//        value: function (obj: object)
//        {
//            let chaves = Object.keysBase(obj);
//            return chaves.Where(x => !___PropriedadesMetodosProtegidas[x]);
//        },
//        writable: false,
//        configurable: false,
//        enumerable: false
//    });

//    //Object.defineProperty(Object, "keysIn", {
//    //    value: function (obj: object)
//    //    {
//    //        let chaves = new Array<string>();
//    //        for (let chave in obj)
//    //        {
//    //            if (!___PropriedadesMetodosProtegidas[chave])
//    //            {
//    //                chaves.Add(chave);
//    //            }
//    //        }
//    //        return chaves;
//    //    },
//    //    writable: false,
//    //    configurable: false,
//    //    enumerable: false
//    //});

//    Object.defineProperty(Object, "isKey", {
//        value: function (chave: string)
//        {
//            return !___PropriedadesMetodosProtegidas[chave];
//        },
//        writable: false,
//        configurable: false,
//        enumerable: false
//    });
//}

