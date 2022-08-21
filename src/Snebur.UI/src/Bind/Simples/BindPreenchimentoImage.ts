namespace Snebur.UI
{
    export class BindPreenchimentoImage extends BaseBind
    {
        public readonly Controle: BaseControleImagem;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.CorFundo, valorAtributo);

            this.Controle = this.ControlePai.ControlesFilho.Where(x => x instanceof BaseControleImagem && x.IDElemento === this.IDElemento).SingleOrDefault() as BaseControleImagem;

            if (!(this.Controle instanceof BaseControleImagem))
            {
                throw new Erro("O controle não é suportado pelo bind imagem");
            }
        }

        public ValorPropriedadeAlterado(antigoValor: EnumPreenchimentoImagem | string, novoValor: EnumPreenchimentoImagem | string): void
        {
            this.Controle.PreenchimentoImagem = this.RetornarPreenchimentoImagem(novoValor);
        }

        private RetornarPreenchimentoImagem(novoValor: EnumPreenchimentoImagem | string): EnumPreenchimentoImagem
        {
            const valorString = novoValor.toString();
            if (u.EnumUtil.IsDefindo(EnumPreenchimentoImagem, valorString))
            {
                return u.EnumUtil.RetornarValor(EnumPreenchimentoImagem, novoValor as string);
            }
            return EnumPreenchimentoImagem.UniformeDentro;
        }

        //((this.Controle as any) as IProgresso)[this.CaminhoPropriedadeControle] = u.ConverterUtil.ParaNumero(novoValor);
    }
}
