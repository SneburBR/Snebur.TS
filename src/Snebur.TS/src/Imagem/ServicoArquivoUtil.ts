namespace Snebur
{
    export class ServicoArquivoUtil
    {
        public static RetornarUrlBaixarVersao(arquivoVersao: d.IArquivo): string
        {
            const tipoArquivo = arquivoVersao.GetType() as r.TipoEntidade;
            const servicoArquivo = $Aplicacao.RetornarServicoArquivo(tipoArquivo);
            const urlBaixarBaixar = u.UrlUtil.Combinar(servicoArquivo.URLServico, sa.ConstantesServicoArquivo.NOME_ARQUIVO_BAIXAR_VERSAO);
            const parametros = new Array<ParChaveValorSimples<string>>();
            const nomeTipoArquivo = tipoArquivo.Nome;
            parametros.Add(new ParChaveValorSimples(sa.ConstantesServicoArquivo.ID_ARQUIVO, arquivoVersao.Id.toString()));
            parametros.Add(new ParChaveValorSimples(sa.ConstantesServicoArquivo.NOME_TIPO_ARQUIVO, nomeTipoArquivo));
            return UrlUtil.RetornarURL(urlBaixarBaixar, parametros);
        }
    }
}
