namespace Snebur
{
    export class StringBuilder implements IDisposable
    {
        private Partes: Array<string>;

        public constructor()
        {
            this.Partes = new Array<string>();
        }

        public Append(texto: string, isQuebrarLinha?: boolean): void
        {
            if (isQuebrarLinha)
            {
                texto = texto + "\r\n";
            }
            this.Partes.Add(texto);
        }

        //public AppendFormat(texto: string, ...args: string[]): void
        //{
        //    this.Partes.Add(String.Format(texto, ...args));
        //}

        public AppendLine(texto?: string)
        {
            this.Partes.Add(`${texto ?? ""}\r\n`);
        }

        //public AppendLineFormat(texto: string, ...args: string[])
        //{
        //    this.Partes.Add(String.Format(texto, ...args) + "\r\n");
        //}

        public ToString(separador: string = ""): string
        {
            return this.Partes.join(separador);
        }

        public ToHtml(): string
        {
            const partes = this.Partes.Select(x => FormatacaoUtil.FormatarEspacosHtml(x));
            return partes.join("<br />");
        }

        public Dispose()
        {
            this.Partes.Clear();
            this.Partes = null;
        }
    }
}
