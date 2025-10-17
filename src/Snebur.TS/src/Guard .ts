namespace Snebur
{
    export class Guard
    {
        public static NotNull<T>(value: T | null | undefined, message?: string): asserts value is T
        {
            if (value == null)
            {
                throw new Error(message ?? "Value cannot be null or undefined");
            }
        }

        public static NotNullOrEmpty(value: string | null | undefined, message?: string): asserts value is string
        {
            if (value == null || value.trimEnd().length === 0)
            {
                throw new Error(message ?? "Value cannot be null or undefined");
            }
        }
    }
}
