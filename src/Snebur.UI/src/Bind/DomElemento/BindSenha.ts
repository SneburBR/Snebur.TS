namespace Snebur.UI
{
    export class BindSenha extends BindDomElemento
    {

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo:string)
        {
            super(controlePai, elemento, AtributosHtml.BindSenha, valorAtributo);
        }

        protected override RetornarValorConvertidoParaPropriedade(valorDom: any): any
        {
            const valorNormal = valorDom.trim();
            const nomePropriedadeValorNormal = u.SenhaUtil.RetornarNomePropriedadeValorNormal(this.PropriedadeLigacao);
            (this.PaiPropriedadeLigacao as any)[nomePropriedadeValorNormal] = valorNormal;
            if (!String.IsNullOrWhiteSpace(valorNormal))
            {
                return u.Md5Util.RetornarHash(valorNormal);
            }
            return String.Empty;
        }

        protected override RetornarValorConvertidoParaDom(valorPropriedade: any): string
        {
            valorPropriedade = u.ConverterUtil.ParaString(valorPropriedade);

            if (u.ValidacaoUtil.IsDefinido(this.PaiPropriedadeLigacao) && u.ValidacaoUtil.IsDefinido(this.PropriedadeLigacao))
            {
                const nomePropriedadeValorNormal = u.SenhaUtil.RetornarNomePropriedadeValorNormal(this.PropriedadeLigacao);
                const valorNormal = u.ConverterUtil.ParaString((this.PaiPropriedadeLigacao as any)[nomePropriedadeValorNormal]);
                if (!String.IsNullOrWhiteSpace(valorNormal))
                {
                    return valorNormal;
                }
            }
            let senha = "";
            if (!String.IsNullOrWhiteSpace(valorPropriedade))
            {
                for (let i = 0; i < valorPropriedade.length; i++)
                {
                    senha += "*";
                }
            }
            return senha;
        }
    }
}