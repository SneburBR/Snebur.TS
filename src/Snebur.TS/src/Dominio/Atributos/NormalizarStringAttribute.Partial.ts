namespace Snebur.Dominio.Atributos
{
    export interface NormalizarStringAttribute
    {
        Normalizar(valor: string | null): string | null;
        Normalizar(valor: string): string;
    }

    NormalizarStringAttribute.prototype.Normalizar = function Normalizar(valor: string | null): string | null
    {
        throw new Error("This method must be implemented in the overriding class.");
    };

    RemoverEspacosLateraisAttribute.prototype.Normalizar = function Normalizar(valor: string | null): string | null
    {
        return valor?.trim() ?? null;
    };

    RemoverMascaraAttribute.prototype.Normalizar = function Normalizar(valor: string | null): string | null
    {
        if (valor == null)
            return null;

        return TextoUtil.RetornarSomenteNumeros(valor, false);
    };

}
