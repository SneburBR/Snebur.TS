namespace Snebur
{
    export class Guard
    {
        public static NotNull<T>(value: T | null | undefined, argumentName: string = "value"): asserts value is T
        {
            if (value == null)
            {
                throw new Error(`The ${argumentName} cannot be null or undefined`);
            }
        }

        public static NotNullOrEmpty(value: string | null | undefined, argumentName: string = "value"): asserts value is string
        {
            if (value == null || value.trimEnd().length === 0)
            {
                throw new Error(`The ${argumentName} cannot be null or empty`);
            }
        }

        public static ArrayNotEmpty<T>(value: Array<T> | null | undefined, argumentName: string = "value"): asserts value is Array<T>
        {
            if (!Array.isArray(value))
            {
                throw new Error(`The ${argumentName} is not an array`);
            }

            if (value.length === 0)
            {
                throw new Error(`The ${argumentName} cannot be an empty array`);
            }
        }

        public static MustBeArray(value: any, argumentName: string = "value"): asserts value is Array<any>
        {
            if (!Array.isArray(value))
            {
                throw new Error(`The ${argumentName} must be an array`);
            }
        }

        public static MustBeBaseDomain(value: any, argumentName: string = "value"): asserts value is d.BaseDominio
        {
            if (!(value instanceof d.BaseDominio))
            {
                throw new Error(`The ${argumentName} must be an instance of BaseDominio`);
            }
        }
        public static MustBeEntidfade(value: any, argumentName: string = "value"): asserts value is d.BaseDominio
        {
            if (!(value instanceof d.Entidade))
            {
                throw new Error(`The ${argumentName} must be an instance of Entidade`);
            }
        }
        public static MustBeNumber(value: any, argumentName: string = "value"): asserts value is number
        {
            if (typeof value !== "number")
            {
                throw new Error(`The ${argumentName} must be a number`);
            }
        }

        public static MustBePrimaryValue(value: any, argumentName: string = "value")
        {
            const type = value.GetType();
            if (!(type instanceof r.TipoPrimario))
            {
                throw new Error(`The ${argumentName} must be of a primary type. Value ${value}, ${type}`);
            }
        }

        public static ThrowNotInitialized = function (argumentName: any): never
        {
            DebugUtil.Break();
            throw new Error(`O argument ${argumentName} is not initialized.`);
        };

        public static ValidUri(value: string | null | undefined, argumentName: string = "value"): asserts value is string
        {
            if (value == null)
            {
                throw new Error(`The ${argumentName} cannot be null or undefined`);
            }
            if (!ValidacaoUtil.IsUrl(value))
            {
                throw new Error(`The ${argumentName} is not a valid URI`);
            }
        }

        public static MustBeEmail(
            value: string | null | undefined,
            argumentName: string = "value"): asserts value is string
        {
            if (value == null)
                throw new Error(`The email cannot be null or undefined`);

            if (!ValidacaoUtil.IsEmail(value))
                throw new Error(`The ${argumentName} is not a valid email`);
        }

        public static EnumDefined<TEnum>(
            construtorEnum: TEnum,
            value: TEnum[keyof TEnum],
            argumentName: string = "value"): asserts value is TEnum[keyof TEnum]
        {
            if (!EnumUtil.IsDefindo(construtorEnum, value))
            {
                throw new Error(`The ${argumentName} is not a valid value of ${construtorEnum?.constructor.name}`);
            }
        }
    }
}
