namespace Snebur
{
    export class ServicoArquivoUtil
    {
        public static RetornarUrlBaixarArquivo(arquivo: d.IArquivo): string
        {
            return ServicoArquivoUtil.RetornarUrlBaixarArquivoInterno(arquivo, sa.ConstantesServicoArquivo.NOME_ARQUIVO_BAIXAR_ARQUIVO);
        }

        public static RetornarUrlBaixarVersao(arquivoVersao: d.IArquivo): string
        {
            return ServicoArquivoUtil.RetornarUrlBaixarArquivoInterno(arquivoVersao, sa.ConstantesServicoArquivo.NOME_ARQUIVO_BAIXAR_VERSAO);
        }

        private static RetornarUrlBaixarArquivoInterno(arquivo: d.IArquivo, nomeManipulador: string): string
        {
            const tipoArquivo = arquivo.GetType() as r.TipoEntidade;
            const servicoArquivo = $Aplicacao.RetornarServicoArquivo(tipoArquivo);
            const urlBaixarBaixar = u.UrlUtil.Combinar(servicoArquivo.UrlServico, nomeManipulador);
            const parametros = new Array<ParChaveValorSimples<string>>();
            const nomeTipoArquivo = tipoArquivo.Nome;
            parametros.Add(new ParChaveValorSimples(sa.ConstantesServicoArquivo.ID_ARQUIVO, arquivo.Id.toString()));
            parametros.Add(new ParChaveValorSimples(sa.ConstantesServicoArquivo.NOME_TIPO_ARQUIVO, nomeTipoArquivo));
            return UrlUtil.RetornarURL(urlBaixarBaixar, parametros);
        }

        public static async RetornarBlobArquivoAsync(
            arquivo: d.IArquivo,
            timeout: number,
            identificadorProprietario: string,
            callbackProgresso: (e: ProgressoEventArgs) => void): Promise<Blob>
        {
            const buffer = await ServicoArquivoUtil.RetornarBufferAsync(
                arquivo,
                timeout,
                identificadorProprietario,
                callbackProgresso);
            return new Blob([buffer]);
        }

        public static async RetornarBufferAsync(
            arquivo: d.IArquivo,
            timeout: number,
            identificadorProprietario: string,
            callbackProgresso: (e: ProgressoEventArgs) => void): Promise<ArrayBuffer>
        {
            const urlBaixarArquivo = ServicoArquivoUtil.RetornarUrlBaixarArquivo(arquivo);
            const nomeAssembly = $Configuracao.IdentificadorAplicacao;
            const credencialUsuario = $Aplicacao.CredencialUsuario;
            const identificadorSessao = $Aplicacao.IdentificadorSessaoUsuario;

            const cabecalho = new DicionarioSimples<string, string>();
            const token = await Snebur.Seguranca.Token.RetornarTokenAsync();

            const tipo = arquivo.GetType();

            cabecalho.Add(sa.ConstantesServicoArquivo.ID_ARQUIVO, arquivo.Id.ToString());
            cabecalho.Add(sa.ConstantesServicoArquivo.ASEMMBLY_QUALIFIED_NAME, tipo.AssemblyQualifiedName);
            cabecalho.Add(sa.ConstantesServicoArquivo.NOME_TIPO_ARQUIVO, tipo.Nome);
            cabecalho.Add(ConstantesCabecalho.NOME_ASSEMBLY_APLICACAO, nomeAssembly);
            cabecalho.Add(ConstantesCabecalho.IDENTIFICADOR_USUARIO, credencialUsuario.IdentificadorUsuario);
            cabecalho.Add(ConstantesCabecalho.SENHA, credencialUsuario.Senha);
            cabecalho.Add(ConstantesCabecalho.IDENTIFICADOR_SESSAO_USUARIO, identificadorSessao);
            cabecalho.Add(ConstantesCabecalho.IDENTIFICADOR_PROPRIETARIO, identificadorProprietario);

            cabecalho.Chaves.ForEach((chave) =>
            {
                cabecalho.AtribuirItem(chave, encodeURIComponent(u.Base64Util.Encode(cabecalho.Item(chave))));
            });

            cabecalho.Add(ConstantesCabecalho.TOKEN, encodeURIComponent(token));

            return await AjaxUtil.RetornarBufferArrayAsync(
                u.EnumHttpMethod.POST,
                urlBaixarArquivo,
                null,
                timeout,
                cabecalho,
                callbackProgresso);
        }
    }
}
