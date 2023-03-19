namespace Snebur
{
    export enum EnumOpcaoClonarEntidade
    {
        NaoClonarId = 1,
        SomenteId = 2,
        PropriedadesAlteradas = 4,
        ChavesEstrangeira = 8,
        PropriedadesTiposPrimario = 32,
        PropriedadesTiposComplexo = 60,
        IdentificadorUnico = 60,
        Tudo = 60 + 32 + 16 + 8 + 4
    }
}
