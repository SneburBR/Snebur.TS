namespace Snebur.UI
{
    export class BindUrlImagem extends BindDomElemento
    {
        private readonly TamanhoImagem: d.EnumTamanhoImagem;
        private readonly ElementoImageem: HTMLImageElement;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindUrlImagem, valorAtributo);
            this.TamanhoImagem = this.RetornarTamanhoImagem();

            if (elemento instanceof HTMLImageElement)
            {
                this.AdicionarEventoDom(EnumEventoDom.Error, this.ElementoImagem_Error, elemento);
                this.ElementoImageem = elemento as HTMLImageElement;
            }
        }

        private ElementoImagem_Error(): void
        {
            if (this.ElementoImageem != null && ValidacaoUtil.IsUrl(Snebur.$Configuracao.UrlImagemSemImagem))
            {
                this.ElementoImageem.src = Snebur.$Configuracao.UrlImagemSemImagem;
            }
        }

        private RetornarTamanhoImagem(): d.EnumTamanhoImagem
        {
            const valorAtributoTamanhoImagem = this.RetornarValorAtributo(AtributosHtml.TamanhoImagem);
            if (String.IsNullOrWhiteSpace(valorAtributoTamanhoImagem))
            {
                return d.EnumTamanhoImagem.Automatico;
            }
            else
            {
                return u.EnumUtil.RetornarValor(d.EnumTamanhoImagem, valorAtributoTamanhoImagem);
            }
        }

        public override RetornarValorConvertidoParaDom(valorPropriedade: any): string
        {
            if (u.ValidacaoUtil.IsDefinido(valorPropriedade))
            {
                if (valorPropriedade instanceof d.Entidade)
                {
                    const imagem = (valorPropriedade as any) as d.IImagem;

                    const tamanhoImagem = (this.TamanhoImagem === d.EnumTamanhoImagem.Automatico) ? this.RetornarTamanhoImagemAuto(imagem) : this.TamanhoImagem;
                    u.ImagemUtil.RetornarUrlImagem(imagem, tamanhoImagem);
                }
                if (typeof valorPropriedade === "string")
                {
                    return valorPropriedade;
                }

                throw new ErroNaoSuportado("O valor da propriedade não é suportado pelo BinUrlImagem", this);
            }

            return u.ImagemUtil.ImagemVaziaBase64;
            //return String.Empty;

        }

        protected override AtribuirValorDom(valorPropriedade: any): void
        {
            super.AtribuirValorDom(valorPropriedade);
        }

        private RetornarTamanhoImagemAuto(imagem: d.IImagem): d.EnumTamanhoImagem
        {
            const largura = (this.Elemento.clientWidth) * 1.1;
            const altura = (this.Elemento.clientHeight) * 1.1;

            if (imagem.IsExisteGrande && ((largura >= im.ConstantesImagemApresentacao.LARGURA_IMAGEM_GRANDE) || (altura > im.ConstantesImagemApresentacao.ALTURA_IMAGEM_GRANDE)))
            {
                return d.EnumTamanhoImagem.Grande;
            }
            if (imagem.IsExisteMedia && ((largura >= im.ConstantesImagemApresentacao.LARGURA_IMAGEM_MEDIA) || (altura > im.ConstantesImagemApresentacao.ALTURA_IMAGEM_MEDIA)))
            {
                return d.EnumTamanhoImagem.Media;
            }
            if (imagem.IsExistePequena && ((largura >= im.ConstantesImagemApresentacao.LARGURA_IMAGEM_PEQUENA) || (altura > im.ConstantesImagemApresentacao.ALTURA_IMAGEM_PEQUENA)))
            {
                return d.EnumTamanhoImagem.Pequena;
            }
            if (imagem.IsExisteMiniatura && ((largura >= im.ConstantesImagemApresentacao.LARGURA_IMAGEM_MINIATURA) || (altura > im.ConstantesImagemApresentacao.ALTURA_IMAGEM_MINIATURA)))
            {
                return d.EnumTamanhoImagem.Miniatura;
            }
            return d.EnumTamanhoImagem.Pequena;
        }
    }
}