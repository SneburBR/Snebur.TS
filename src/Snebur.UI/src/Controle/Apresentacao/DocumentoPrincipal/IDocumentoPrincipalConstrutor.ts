
namespace Snebur.UI
{
    export interface IDocumentoPrincipalConstrutor<TDocumentoPrincipal extends DocumentoPrincipal = DocumentoPrincipal> 
    {
        new(): TDocumentoPrincipal;
    }

    export interface IDocumentoPrincipal
    {
        __NavegadorPrincipal: Navegador;
        __JanelaOcupado: JanelaOcupado;
        __IsSistemaOcupado: boolean;
        BarraEnvioArquivos: BarraEnvioArquivos;
        DesfocarTudo(): void;
    }
}
