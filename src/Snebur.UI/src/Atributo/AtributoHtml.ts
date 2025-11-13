
namespace Snebur.UI
{
    export class AtributoHtml
    {
        public readonly Nome: string;
        public readonly Tipo: any;

        public readonly IsEvent: boolean;
        public readonly IsBind: boolean;

        public constructor(nome: string, tipo: any)
        {
            this.Nome = nome;
            this.Tipo = tipo;
            this.IsEvent = tipo === Event;
            this.IsBind = nome.startsWith("sn-bind-");
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