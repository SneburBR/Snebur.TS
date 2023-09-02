namespace Snebur.Utilidade
{
    export class EnumUtil
    {
        public static RetornarValores<TEnum>(construtorEnum: TEnum): Array<TEnum[keyof TEnum]>
        {
            return EnumUtil.RetornarValoresEnum(construtorEnum);
        }

        public static RetornarValoresEnum<TEnum>(construtorEnum: TEnum): Array<TEnum[keyof TEnum]>
        {
            const valores = Object.values(construtorEnum as any);
            const valoresNumeros = valores.Where(x => typeof x === "number");
            if (valoresNumeros.Count > 0)
            {
                return valoresNumeros;
            }
            return valores;
        }

        public static RetornarDescricoes(construtorEnum: any): Array<string>
        {
            const keys = Object.keys(construtorEnum);
            const keysNumbers = keys.Where(x => u.ValidacaoUtil.IsNumber(x, true));
            if (keysNumbers.Count > 0)
            {
                return keysNumbers.Select(x => construtorEnum[x]);
            }
            return keys;
        }

        public static RetornarDescricao(construtorEnum: any, valor: number | string | any, isIngorarErro: boolean = false): string
        {
            if (construtorEnum != null && valor != null)
            {
                if (typeof construtorEnum[valor] === "number")
                {
                    const descricao = construtorEnum[construtorEnum[valor]];
                    if (typeof descricao === "string")
                    {
                        return descricao;
                    }
                }

                const descricao = construtorEnum[valor];
                if (typeof descricao === "string" &&
                    typeof construtorEnum[descricao] === "number")
                {
                    return descricao;
                }

                if (valor in construtorEnum &&
                    typeof construtorEnum[valor] === "string")
                {
                    return valor;
                }

                const index = Object.values(construtorEnum).indexOf(valor);
                if (index !== -1)
                {
                    const key = Object.keys(construtorEnum)[index];
                    if (typeof key === "string")
                    {
                        return key;
                    }
                }
            }

            if (isIngorarErro)
            {
                return "";
            }
            
            console.error(`Não foi possível encontrar o descrição  de '${valor}'  no enum  ${construtorEnum.constructor.name}`);
            return valor?.toString() ?? "";
        }

        public static RetornarRotulo<TEnum>(construtorEnum: TEnum, valor: TEnum[keyof TEnum], isIgnorarErro?:boolean): string
        public static RetornarRotulo(construtorEnum: any, valor: number, isIgnorarErro?: boolean): string
        public static RetornarRotulo(construtorEnum: any, valor: number, isIgnorarErro:boolean = false): string
        {
            //pegar o valor do atributo description na globalização
            if (construtorEnum == null)
            {
                return null;
            }

            const descricao = EnumUtil.RetornarDescricao(construtorEnum, valor, isIgnorarErro);
            if (construtorEnum?.Rotulos != null)
            {
                const rotulo = construtorEnum.Rotulos[descricao];
                if (typeof rotulo === "string")
                {
                    return rotulo;
                }
            }
            return descricao?.toString();
        }

        public static RetornarValor<TEnum>(
            construtorEnum: TEnum,
            descricao: string | number,
            isIgnorarErro: boolean = true): TEnum[keyof TEnum] | null
        {
            const valor = EnumUtil.RetornarValorInterno(construtorEnum, descricao, isIgnorarErro);
            if (valor != null)
            {
                return valor;
            }

            if (isIgnorarErro)
            {
                if (typeof descricao === "string")
                {
                    const descricoes = EnumUtil.RetornarDescricoes(construtorEnum);
                    const descricaoSensivel = descricoes.Where(x => x.toLowerCase().trim() === descricao).SingleOrDefault();
                    if (descricaoSensivel != null)
                    {
                        const valor = EnumUtil.RetornarValorInterno(construtorEnum, descricaoSensivel, isIgnorarErro);
                        if (valor != null)
                        {
                            console.warn(`Foi encontrado o descrição ${descricao} = '${descricaoSensivel}' usando case insensitive`);
                            return valor;
                        }
                    }
                }
                return null;
            }

            throw new Erro(`Não foi possível encontrar o valor '${valor}'  no enum  ${construtorEnum.constructor.name}`);
        }

        private static RetornarValorInterno(construtorEnum: any, descricao: string | number, isIngorarErro: boolean): any
        {
            if (construtorEnum != null && descricao != null)
            {
                const objectoEnum = (construtorEnum as any);
                const valor = objectoEnum[descricao];
                if (valor == null)
                {
                    const descricaoTemp = EnumUtil.RetornarDescricao(construtorEnum, descricao, isIngorarErro);
                    if (typeof descricaoTemp === "string" &&
                        typeof objectoEnum[descricaoTemp] === "string")
                    {
                        return objectoEnum[descricaoTemp];
                    }
                }

                if (valor != null)
                {
                    if (typeof valor === "string" &&
                        typeof objectoEnum[valor] === "number")
                    {
                        return objectoEnum[valor];
                    }

                    if (typeof valor === "number" &&
                        typeof objectoEnum[valor] === "string")
                    {
                        return valor;
                    }

                    if (typeof valor === "string" &&
                        typeof descricao === "string")
                    {
                        if (valor in construtorEnum)
                        {
                            return construtorEnum[valor];
                        }

                        const valores = Object.values(construtorEnum);
                        const index = valores.indexOf(valor);
                        if (index !== -1)
                        {
                            const key = Object.keys(construtorEnum)[index];
                            if (typeof key === "string")
                            {
                                return construtorEnum[key];
                            }
                        }
                    }
                }
            }

            if (isIngorarErro)
            {
                return null;
            }
            throw new Erro(`Não foi possível encontrar o valor '${descricao}'  no enum  ${construtorEnum.constructor.name}`);
        }

        //public static RetornarFlags<T>(construtorEnum: any, valor: number): Array<T>
        //public static RetornarFlags(construtorEnum: any, valor: number): Array<number>
        //public static RetornarFlags<T =number>(construtorEnum: any, soma: number): Array<T>
        public static RetornarFlags<TEnum>(construtorEnum: TEnum, soma: number): Array<TEnum[keyof TEnum]>
        {
            const flags = new Array<TEnum[keyof TEnum]>();
            const valores = EnumUtil.RetornarValoresEnum(construtorEnum);

            for (const valor of valores)
            {
                const valorNumber: number = valor as any;
                if (valorNumber !== 0)
                {
                    if ((soma & valorNumber) === valorNumber)
                    {
                        flags.Add(valor);
                    }
                }
            }
            return flags;
        }

        public static IsDefindo<TEnum>(construtorEnum: TEnum, descricao: string): boolean
        public static IsDefindo<TEnum>(construtorEnum: TEnum, valor: number): boolean
        public static IsDefindo<TEnum>(construtorEnum: TEnum, valor: TEnum[keyof TEnum]): valor is TEnum[keyof TEnum]
        public static IsDefindo<TEnum>(construtorEnum: TEnum, valor: TEnum[keyof TEnum] | string | number): valor is TEnum[keyof TEnum]
        public static IsDefindo<TEnum extends object>(construtorEnum: TEnum, chave: string | number | any): chave is TEnum[keyof TEnum]
        {
            if (typeof chave === "number" || typeof chave === "string")
            {
                const valor = (construtorEnum as any)[chave];
                if (valor === undefined)
                {
                    const isString = typeof chave === "string";
                    const chaves = Object.keys(construtorEnum);
                    for (const itemChave of chaves)
                    {
                        const itemValor = (construtorEnum as any)[itemChave];
                        if (itemValor === chave)
                        {
                            return true;
                        }
                        if (isString && typeof itemValor === "string" &&
                            itemValor.toLowerCase() === (chave as string).toLowerCase())
                        {
                            return true;
                        }
                    }
                }
                return u.ValidacaoUtil.IsDefinido(valor);
            }
            return false;
        }

        //private static RetornarItemsEnum(construtorEnum: any): any[]
        //{
        //    const keys = Object.keys(construtorEnum); 
        //    if (keys.Any(x => construtorEnum[x] == construtorEnum[construtorEnum[x]]))
        //    {
        //        return Object.keys(construtorEnum).Select(x => construtorEnum[x]);
        //    }
        //    return keys;
        //}
    }
}