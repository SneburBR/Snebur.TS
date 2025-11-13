namespace Snebur.Comunicacao
{
    export class RequisicaoUtil
    {
        public static RetornarUrlRequisicao(urlWebService: string, servico: string, operacao: string): string
        {
            /*const nomeArquivo = u.Md5Util.RetornarHash(token);*/
            //urlRequisicao = u.UrlUtil.RetornarURL(urlRequisicao, [new ParChaveValorSimples<string>("State", u.RandomUtil.RetornarRandom().toString())]);
            //return urlRequisicao;
            operacao = operacao.Replace("Async", String.Empty);
            return u.UrlUtil.Combinar(urlWebService, u.CodigoUtil.PascalToKebabCase(servico), u.CodigoUtil.PascalToKebabCase(operacao));
        }
    }
}
