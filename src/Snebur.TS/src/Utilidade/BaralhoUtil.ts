
namespace Snebur.Seguranca
{
    export class BaralhoUtil
    {
        private static readonly CHAVE_PADRADO = 17003812;

        /*eslint-disable*/
        public static Embaralhar(texto: string): string
        public static Embaralhar(texto: string, chave: number): string;
        public static Embaralhar<T>(conteudo: Array<T>): Array<T>
        public static Embaralhar<T>(conteudo: Array<T>, chave: number): Array<T>;
        public static Embaralhar<T>(conteudo: Uint8Array): Uint8Array
        public static Embaralhar<T>(conteudo: Uint8Array, chave: number): Uint8Array
        public static Embaralhar<T>(origem: string | Array<T> | Uint8Array, chave: number = BaralhoUtil.CHAVE_PADRADO): string | Array<T> | Uint8Array
        /*eslint-disable*/
        {
            if (origem == null || origem.length === 0)
            {
                return origem;
            }

            const tamanho = origem.length;
            const conteudo = BaralhoUtil.RetornarArray(origem);
            const combinacoes = this.RetornarCombinacao(tamanho, chave);
            for (let i = tamanho - 1; i > 0; i--)
            {
                const n = combinacoes[tamanho - 1 - i];
                const tmp = conteudo[i];
                conteudo[i] = conteudo[n];
                conteudo[n] = tmp;
            }
            return this.RetornarConteudo(origem, conteudo);
        }

        /*eslint-disable*/
        public static Desembaralhar(texto: string): string
        public static Desembaralhar(texto: string, chave: number): string;
        public static Desembaralhar<T>(conteudo: Array<T>): Array<T>
        public static Desembaralhar<T>(conteudo: Array<T>, chave: number): Array<T>;
        public static Desembaralhar<T>(conteudo: Uint8Array): Uint8Array
        public static Desembaralhar<T>(conteudo: Uint8Array, chave: number): Uint8Array
        public static Desembaralhar<T>(origem: string | Array<T> | Uint8Array, chave: number = BaralhoUtil.CHAVE_PADRADO): string | Array<T> | Uint8Array
        /*eslint-disable*/
        {
            if (origem == null || origem.length === 0)
            {
                return origem;
            }

            const tamanho = origem.length;
            const conteudo = BaralhoUtil.RetornarArray(origem);
            const exchanges = this.RetornarCombinacao(tamanho, chave);
            for (let i = 1; i < tamanho; i++)
            {
                const n = exchanges[tamanho - i - 1];
                const tmp = conteudo[i];
                conteudo[i] = conteudo[n];
                conteudo[n] = tmp;
            }
            return this.RetornarConteudo(origem, conteudo);
        }

        private static RetornarCombinacao(tamanho: number, chave: number): number[]
        {
            const retorno = new Array<number>(tamanho - 1);
            const random = new SnRandom(chave);
            for (let i = tamanho - 1; i > 0; i--)
            {
                const trocar = random.Next(i + 1);
                retorno[tamanho - 1 - i] = trocar;
            }
            return retorno;
        }

        private static RetornarArray<T>(arrayOuTexto: string | Array<T> | Uint8Array): Array<T | string> | Uint8Array
        {
            if (typeof arrayOuTexto === "string")
            {
                const retorno = new Array<string>();
                for (let i = 0; i < arrayOuTexto.length; i++)
                {
                    retorno[i] = arrayOuTexto[i];
                }
                return retorno;
            }

            if (Array.isArray(arrayOuTexto))
            {
                return arrayOuTexto;
            }
            if (arrayOuTexto instanceof Uint8Array)
            {
                return arrayOuTexto;

            }
            throw new Error("Conteudo não suportado");

        }

        private static RetornarConteudo<T>(origem: string | T[] | Uint8Array, conteudo: Uint8Array | (T | string)[]): string | T[] | Uint8Array
        {
            if (typeof origem === "string")
            {
                return String.Join("", conteudo as string[]);
            }

            if (conteudo instanceof Uint8Array)
            {
                return conteudo;
            }


            if (Array.isArray(conteudo))
            {
                return conteudo as Array<T>;
            }


            throw new Error("Method not implemented.");
        }
    }
}
