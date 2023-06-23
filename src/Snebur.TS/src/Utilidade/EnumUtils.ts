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
            const valores = EnumUtil.RetornarItemsEnum(construtorEnum).Where(x => u.ValidacaoUtil.IsNumber(x));
            return valores as Array<TEnum[keyof TEnum]>;
        }

        public static RetornarValoresEnumString<TEnum>(construtorEnum: TEnum): Array<TEnum[keyof TEnum]>
        {
            const valores = EnumUtil.RetornarItemsEnum(construtorEnum).Where(x => u.ValidacaoUtil.IsString(x));
            return valores as Array<TEnum[keyof TEnum]>;
        }

        public static RetornarDescricoes(construtorEnum: any): Array<string>
        {
            return EnumUtil.RetornarItemsEnum(construtorEnum).Where(x => u.ValidacaoUtil.IsString(x));
        }

        public static RetornarDescricao(construtorEnum: any, valor: number | string | any): string
        {
            //if ($Configuracao.IsDebug)
            //{
            //    u.ValidacaoUtil.ValidarArgumentoDefinido({ valor });
            //    u.ValidacaoUtil.ValidarArgumentoDefinido({ construtorEnum });
            //}

            if (typeof construtorEnum[valor] === "number")
            {
                return valor as string;
            }

            const descricao = construtorEnum[valor];
            if (String.IsNullOrWhiteSpace(descricao))
            {
                return valor as string;
            }
            return descricao;
        }

        public static RetornarRotulo<TEnum>(construtorEnum: TEnum, valor: TEnum[keyof TEnum]): string
        public static RetornarRotulo(construtorEnum: any, valor: number): string
        public static RetornarRotulo(construtorEnum: any, valor: number): string
        {
            //pegar o valor do atributo description na globalização
            const descricao = EnumUtil.RetornarDescricao(construtorEnum, valor);
            if (construtorEnum.Rotulos != null)
            {
                const rotulo = construtorEnum.Rotulos[descricao];
                if (!String.IsNullOrWhiteSpace(rotulo))
                {
                    return rotulo;
                }
            }
            return descricao.toString();
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
                    const descricaoSensivel = EnumUtil.RetornarDescricoes(construtorEnum).Where(x => x.toLowerCase().trim() === descricao).SingleOrDefault();
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
            const objectoEnum = (construtorEnum as any);
            const valor = objectoEnum[descricao];
            if (valor != null)
            {
                if (typeof valor === "number" && isFinite(valor))
                {
                    return valor;
                }
                if (typeof objectoEnum[valor] === "number" && isFinite(objectoEnum[valor]))
                {
                    return objectoEnum[valor];
                }
            }

            if (isIngorarErro)
            {
                return null;
            }

            throw new Erro(`Não foi possível encontrar o valor '${descricao}'  no enum  ${construtorEnum.constructor.name}`);
        }

        public static RetornarListaDescricao(construtorEnum: any): Array<string>
        {
            return EnumUtil.RetornarItemsEnum(construtorEnum).Where(x => u.ValidacaoUtil.IsString(x)) as Array<string>;
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

        private static RetornarItemsEnum(construtorEnum: any): any[]
        {
            return Object.keys(construtorEnum).Select(x => construtorEnum[x]);
        }
    }
}