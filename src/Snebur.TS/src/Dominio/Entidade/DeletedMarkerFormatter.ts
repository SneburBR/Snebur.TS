namespace Snebur
{
    /*@internal*/
    export class DeletedMarkerFormatter
    {
        private static readonly DELETADO_MARK = "deletado";
        //private static readonly DELETADO_SPAN_TAG_REGEX =
        //    /<span[^>]*>\s*-\s*\(?\s*Deletado\s*\)?\s*<\/span>/gi;

        private static readonly DELETADO_SPAN_TAG_REGEX =
            /<span[^>]*>\s*-?\s*\(?\s*Deletado\s*\)?\s*<\/span>/gi;

        public static AppendDeletedMarker(value: string | null): string | null
        {
            if (value == null)
                return value;

            if (value.toLowerCase().includes(DeletedMarkerFormatter.DELETADO_MARK))
            {
                return value;
            }
            return `${value}  <span class='sn-cor-texto--falha'> - (Deletado) </span>`;
        }

        public static RemoveDeletedMarker(value: string | null): string | null
        {
            if (value == null)
                return value;

            if (value.toLowerCase().lastIndexOf(DeletedMarkerFormatter.DELETADO_MARK) === -1)
                return value;

            const cleaned = value.replace(DeletedMarkerFormatter.DELETADO_SPAN_TAG_REGEX, "");
            return cleaned === value
                ? value
                : cleaned.trim().replace(/[\s-]+$/, "");
        }
    }
}
