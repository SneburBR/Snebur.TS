namespace Snebur.UI
{
    export class MargemUnidadeComprimento
    {

        public Esquerda: UnidadeComprimento;
        public Superior: UnidadeComprimento;
        public Direita: UnidadeComprimento;
        public Inferior: UnidadeComprimento;

        public get MargemFormatada(): string
        {
            const partes = [this.Esquerda.ValorFormatado,
            this.Superior.ValorFormatado,
            this.Direita.ValorFormatado,
            this.Inferior.ValorFormatado];

            return String.Join(" ", partes);
        }

        public get ExisteMargem(): boolean
        {
            return !this.Esquerda.IsVazio ||
                !this.Superior.IsVazio ||
                !this.Direita.IsVazio ||
                !this.Inferior.IsVazio;
        }


        public constructor();
        public constructor(margem: string)
        public constructor(margem: Margem)
        public constructor(esquerda: number, superior: number, direita: number, inferior: number)
        public constructor(margem: string | Margem | number = String.Empty, argSuperior?: number, argDireita?: number, argInferior?: number)
        {
            const [esquerda, superior, direita, inferior] = this.RetornarValoresMargem(margem, argSuperior, argDireita, argInferior);

            this.Esquerda = new UnidadeComprimento(esquerda);
            this.Superior = new UnidadeComprimento(superior);
            this.Direita = new UnidadeComprimento(direita);
            this.Inferior = new UnidadeComprimento(inferior);
        }

        public RetornarValoresMargem(margem: string | Margem | number, argSuperior?: number, argDireita?: number, argInferior?: number): [string, string, string, string]
        {
            if (typeof margem === "string")
            {
                return this.RetornarValoresMargemString(margem);
            }

            if (margem instanceof Margem)
            {
                return [margem.Esquerda.ToPixels(),
                margem.Superior.ToPixels(),
                margem.Direita.ToPixels(),
                margem.Inferior.ToPixels()];
            }

            if (typeof margem === "number" &&
                typeof argSuperior === "number" &&
                typeof argDireita === "number" &&
                typeof argInferior === "number")
            {
                return [margem.ToPixels(),
                argSuperior.ToPixels(),
                argDireita.ToPixels(),
                argInferior.ToPixels()];
            }

            throw new Erro("Margem não suportada");
        }

        private RetornarValoresMargemString(margem: string): [string, string, string, string]
        {
            const partes = margem.split(" ");
            const totalPartes = partes.length;
            switch (totalPartes)
            {

                case 0:
                case 1: {
                    const geral = partes[0];
                    return [geral, geral, geral, geral];
                }
                case 2: {
                    const horizontal = partes[0];
                    const vertical = partes[1];
                    return [horizontal, vertical, horizontal, vertical];
                }
                case 3: {
                    const esquerda3 = partes[0];
                    const superior3 = partes[1];
                    const direita3 = partes[2];
                    const inferior3 = "0px";
                    return [esquerda3, superior3, direita3, inferior3];
                }
                default: {
                    if (totalPartes !== 4)
                    {
                        LogUtil.Erro(`A assinatura da margem é invalida ${margem}`);
                    }

                    const esquerda = partes[0];
                    const superior = partes[1];
                    const direita = partes[2];
                    const inferior = partes[3];
                    return [esquerda, superior, direita, inferior];
                }
            }
        }

        public RetornarUnidadeComprimento(margem: EnumMargem): UnidadeComprimento
        {
            switch (margem)
            {
                case EnumMargem.Esquerda:

                    return this.Esquerda;

                case EnumMargem.Superior:

                    return this.Superior;

                case EnumMargem.Direita:

                    return this.Direita;

                case EnumMargem.Inferior:

                    return this.Inferior;

                default:

                    throw new Erro("Margem não suportada");
            }
        }
    }
}
