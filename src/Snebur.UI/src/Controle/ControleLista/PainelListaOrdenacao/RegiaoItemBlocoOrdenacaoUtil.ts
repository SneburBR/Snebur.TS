namespace Snebur.UI
{
    export class RegiaoItemBlocoOrdenacaoUtil
    {
        public static RetornarRegicoesBlocoInicioOuFinal(
            orientacaoPainel: EnumOrientacao,
            regiaoElementoClone: DOMRect,
            regiaoInicio: RegiaoBlocoOrdenacao,
            regiaoFinal: RegiaoBlocoOrdenacao): RegiaoBlocoOrdenacao
        {
            if (orientacaoPainel === EnumOrientacao.Vertical)
            {
                if (regiaoElementoClone.y < regiaoInicio.RegiaoOrigem.y)
                {
                    return regiaoInicio;
                }

                if (regiaoElementoClone.y > regiaoFinal.RegiaoOrigem.y)
                {
                    return regiaoFinal;
                }
                return null;
            }
            if (orientacaoPainel === EnumOrientacao.Horizontal)
            {
                if (regiaoElementoClone.x < regiaoInicio.RegiaoOrigem.x)
                {
                    return regiaoInicio;
                }

                if  (regiaoElementoClone.x > regiaoFinal.RegiaoOrigem.x)
                {
                    return regiaoFinal;
                }
                return null;
            }

            if (orientacaoPainel === EnumOrientacao.Quadrado)
            {
                if (regiaoElementoClone.x < regiaoInicio.RegiaoOrigem.x ||
                    regiaoElementoClone.y < regiaoInicio.RegiaoOrigem.y)
                {
                    return regiaoInicio;
                }

                if (regiaoElementoClone.x > regiaoFinal.RegiaoOrigem.x ||
                    regiaoElementoClone.y > regiaoFinal.RegiaoOrigem.y)
                {
                    return regiaoFinal;
                }
                return null;
            }
            throw new Error("orientacaoPainel do painel não suportada");
        }
    }
}
