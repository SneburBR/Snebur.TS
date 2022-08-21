namespace Snebur.ServicoArquivo
{
    //import OrigemImagemLocal = Snebur.ServicoArquivo.OrigemImagemLocal;

	export class OrigemImagemLocalUtil
	{

        private static readonly DicionarioArquivoLocal = new DicionarioSimples<List<OrigemImagemLocal>, string>();

        public static RetornarNovaOrigemImagemLocal(imagem: d.IImagem, informacaoImagem: IInformacaoImagem, arquivo: SnBlob): OrigemImagemLocal
        {
            const chave = this.RetornarChave(imagem);
            if (!OrigemImagemLocalUtil.DicionarioArquivoLocal.ContainsKey(chave))
            {
                OrigemImagemLocalUtil.DicionarioArquivoLocal.Add(chave, new List<OrigemImagemLocal>());
            }

            const lista = OrigemImagemLocalUtil.DicionarioArquivoLocal.Item(chave);
            const origemImagemLocal = lista.Where(x => x.Imagem.__IdentificadorEntidade === imagem.__IdentificadorEntidade).SingleOrDefault();
            if (origemImagemLocal instanceof OrigemImagemLocal)
            {
                return origemImagemLocal;
            }

            const origemLocal = new OrigemImagemLocal(imagem, arquivo, informacaoImagem);
            lista.Add(origemLocal);
            return origemLocal;
        }

        public static RetornarOrigemImagemLocal(imagem: d.IImagem): OrigemImagemLocal
        {
            const chave = OrigemImagemLocalUtil.RetornarChave(imagem);
            if (OrigemImagemLocalUtil.DicionarioArquivoLocal.ContainsKey(chave))
            {
                const lista = OrigemImagemLocalUtil.DicionarioArquivoLocal.Item(chave);
                const origemImagemLocal = lista.Where(x => x.Imagem.__IdentificadorEntidade === imagem.__IdentificadorEntidade).SingleOrDefault();
                if (origemImagemLocal instanceof OrigemImagemLocal)
                {
                    return origemImagemLocal;
                }
            }
            return null;
        }

        public static ExisteOrigemImagemLocal(imagem: d.IImagem): boolean
        {
            const chave = OrigemImagemLocalUtil.RetornarChave(imagem);
            return OrigemImagemLocalUtil.DicionarioArquivoLocal.ContainsKey(chave);
        }

        public static RetornarChave(imagem: d.IImagem): string
        {
            return imagem.TotalBytesLocal.ToString() + "-" + imagem.NomeArquivo;

        }
	}
}
