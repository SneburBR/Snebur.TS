
namespace Snebur.UI
{
    export class AtributoHtml
    {
        public readonly Nome: string;
        public readonly Tipo: any;

        public constructor(nome: string, tipo: any)
        {
            this.Nome = nome;
            this.Tipo = tipo;
        }

        public toString(): string
        {
            return this.Nome;
        }

        public ToString(): string
        {
            return this.toString();
        }
    }
}