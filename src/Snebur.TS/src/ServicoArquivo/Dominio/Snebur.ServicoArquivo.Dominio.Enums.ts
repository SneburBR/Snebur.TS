// Auto-generated file. Enums - Snebur.ServicoArquivo. Do not modify directly. 
//@Project: Snebur.ServicoArquivo
//@DataHora: 2025-10-10 09:31:54
//@Artifact: Enums
//@Namespace: Snebur.ServicoArquivo.Dominio 
//@PrioridadeDominio: 2
//@Globalizar: False 
//@Dominios dependentes: []
/*eslint-disable*/
// Ignore Spelling: *

namespace Snebur.ServicoArquivo
{
    export enum EnumTipoErroServicoArquivo
    {
        Undefined = -1,
        ChecksumArquivoDiferente = 1,
        ChecksumPacoteDiferente = 2,
        TotalBytesDiferente = 3,
        ArquivoTempEmUso = 4,
        Desconhecido = 5,
        ArquivoNaoEncontrado = 6,
        IdArquivoNaoExiste = 7
        , TEMP_Undefined = 0
    }
    (EnumTipoErroServicoArquivo as any).Rotulos = {};
    (EnumTipoErroServicoArquivo as any).Rotulos["Undefined"] = "Undefined";
    (EnumTipoErroServicoArquivo as any).Rotulos["ChecksumArquivoDiferente"] = "Checksum do arquivo diferentes";
    (EnumTipoErroServicoArquivo as any).Rotulos["ChecksumPacoteDiferente"] = "Checksum do pacote diferentes";
    (EnumTipoErroServicoArquivo as any).Rotulos["TotalBytesDiferente"] = "Total de bytes diferente";
    (EnumTipoErroServicoArquivo as any).Rotulos["ArquivoTempEmUso"] = "Arquivo temp em uso";
    (EnumTipoErroServicoArquivo as any).Rotulos["Desconhecido"] = "Desconhecido";
    (EnumTipoErroServicoArquivo as any).Rotulos["ArquivoNaoEncontrado"] = "ArquivoNaoEncontrado";
    (EnumTipoErroServicoArquivo as any).Rotulos["IdArquivoNaoExiste"] = "IdArquivoNaoExiste";
}