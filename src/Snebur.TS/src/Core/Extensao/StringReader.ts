
namespace Snebur
{
    export class StringReader implements IDisposable
    {
        private Conteudo: string;
        private Tamanho: number;
        public PosicaoAtual: number = 0;

        //public get IsFinalizado(): boolean
        //{
        //    return this.PosicaoAtual >= this.Tamanho;
        //}

        public constructor(conteudo: string)
        {
            this.Conteudo = conteudo;
            this.Tamanho = conteudo.length;
        }

        public Peek(): string
        {
            return this.Conteudo.charAt(this.PosicaoAtual);
        }

        public get CanRead()
        {
            return this.PosicaoAtual < this.Tamanho;
        }

        public Read(): string
        {
            if (this.CanRead)
            {
                return this.Conteudo.charAt(this.PosicaoAtual++);
            }
            return null;
        }

        public ReadToEnd(): string
        {
            if (this.PosicaoAtual === 0)
            {
                return this.Conteudo;
            }
            if (this.CanRead)
            {
                return this.Conteudo.substring(this.PosicaoAtual);
            }
            return null;
            
        }

        public ReadLine(): string
        {
            let posicao = this.PosicaoAtual;
            while (posicao < this.Tamanho)
            {
                const char = this.Conteudo.charAt(posicao);
                if (char === "\r" || char === "\n")
                {
                    const linha = this.Conteudo.substr(this.PosicaoAtual, posicao - this.PosicaoAtual);
                    this.PosicaoAtual = posicao + 1;
                    if (char === "\r" && this.PosicaoAtual < this.Tamanho && this.Peek() === "\n")
                    {
                        this.PosicaoAtual++;
                    }
                    return linha;
                }
                posicao++;
            }
            return null;
        }

        public Dispose(): void
        {
            delete this.Conteudo;
            delete this.PosicaoAtual;
            delete this.Tamanho;
        }
    }
}