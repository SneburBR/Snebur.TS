namespace Snebur.Serializacao
{

    export interface IBaseDominioReferencia extends ICaminhoTipo
    {
        __IdentificadorUnico?: string;
        IsSerializando: boolean;
        __IdentificadorReferencia?: string;
        __IsBaseDominioReferencia?: boolean;
        __IsReferenciado?: boolean;
        RetornarIdentificadorReferencia?(): string;
        //LimparRefencia?(): void;
        GetHashCode(): number;
    }

}
