namespace Snebur.Utilidade
{
    export class InterfaceUtil
    {
        public static IsIDisposable(obj: any): obj is IDisposable
        {
            return typeof (obj as IDisposable).Dispose === "function";
        }

        public static IsIEquals(obj: any): obj is IEquals
        {
            return typeof (obj as IEquals).Equals === "function";
        }

        public static IsIDeletado(obj: any): obj is IDeletado
        {
            return typeof (obj as IDeletado).IsDeletado === "function";
        }

        public static IsIOrdenacao(obj: any): obj is IOrdenacao
        {
            return typeof (obj as IOrdenacao).Ordenacao === "function";
        }

        public static IsInicializavel(obj: any): obj is IInicializacaoAsync
        {
            return typeof (obj as IInicializacaoAsync).InicializarAsync === "function";
        }

        public static IsCancelavelAsync(obj: any): obj is ICancelavelAsync
        {
            return typeof (obj as ICancelavelAsync).CancelarAsync === "function";
        }

        public static IsIEntidade(obj: any): obj is IEntidade
        {
            return typeof obj.Id === "number";
        }
    }
}