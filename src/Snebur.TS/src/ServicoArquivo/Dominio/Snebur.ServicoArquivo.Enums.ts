/*eslint-disable*/
//@Project: Snebur.ServicoArquivo 
//@Artifact: Enums
//@PrioridadeDominio: 2
//@DataHora: 2025-09-26 14:24:42
//@Dominios: []

namespace Snebur.ServicoArquivo.Dominio
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
    }
    (EnumTipoErroServicoArquivo as any).Rotulos = {};
    (EnumTipoErroServicoArquivo as any).Rotulos["ChecksumArquivoDiferente"] = "Checksum do arquivo diferentes";
    (EnumTipoErroServicoArquivo as any).Rotulos["ChecksumPacoteDiferente"] = "Checksum do pacote diferentes";
    (EnumTipoErroServicoArquivo as any).Rotulos["TotalBytesDiferente"] = "Total de bytes diferente";
    (EnumTipoErroServicoArquivo as any).Rotulos["ArquivoTempEmUso"] = "Arquivo temp em uso";
    (EnumTipoErroServicoArquivo as any).Rotulos["Desconhecido"] = "Desconhecido";
    (EnumTipoErroServicoArquivo as any).Rotulos["ArquivoNaoEncontrado"] = "ArquivoNaoEncontrado";
    (EnumTipoErroServicoArquivo as any).Rotulos["IdArquivoNaoExiste"] = "IdArquivoNaoExiste";
}