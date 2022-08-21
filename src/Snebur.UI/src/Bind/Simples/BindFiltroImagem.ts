namespace Snebur.UI
{
    export class BindFiltroImagem extends BaseBind
    {
        public readonly Controle: BaseControleImagem;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.FiltroImagem, valorAtributo);

            this.Controle = this.ControlePai.ControlesFilho.Where(x => x instanceof BaseControleImagem && x.IDElemento === this.IDElemento).SingleOrDefault() as BaseControleImagem;

            if (!(this.Controle instanceof BaseControleImagem))
            {
                throw new Erro("O controle não é suportado pelo bind imagem");
            }
        }

        public ValorPropriedadeAlterado(antigoValor: EnumEfeitoImagem | string, novoValor: EnumEfeitoImagem | string): void
        {
            this.Controle.FiltroImagem = this.RetornarFiltroImagem(novoValor);
        }

        private RetornarFiltroImagem(novoValor: EnumEfeitoImagem | string): EnumEfeitoImagem
        {
            const valorString = novoValor.toString();
            if (u.EnumUtil.IsDefindo(EnumEfeitoImagem, valorString) && novoValor !== EnumEfeitoImagem.Desconhecido)
            {
                return u.EnumUtil.RetornarValor(EnumEfeitoImagem, novoValor as string);
            }
            return EnumEfeitoImagem.Nenhum;
        }

        //((this.Controle as any) as IProgresso)[this.CaminhoPropriedadeControle] = u.ConverterUtil.ParaNumero(novoValor);
    }
}
