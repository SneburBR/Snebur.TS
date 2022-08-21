namespace Snebur.Utilidade
{
    export class CharUtil
    {

        public static IsLower(char: string): boolean
        {
            return char.toLowerCase() === char;
            //TODO procurar melhor implementação
        }

        public static IsUpper(char: string): boolean
        {
            //TODO procurar melhor implementação
            return char.toUpperCase() === char;
        }
    }
}