namespace Snebur.UI
{
    export class Icone extends ComponenteApresentacao  
    {
        //private static PREFIXO_CSS_CLASSE_TAMANHO_ICONE = "sn-tamanho-icone--";
        //private _icone: EnumIcone;
        //private _tamanhoIcone: EnumTamanhoIcone | string;

        public Icone: EnumIcone;
        public TamanhoIcone: EnumTamanhoIcone;
        public IconeCategoria: EnumIconeCategoria;
         
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        protected override Inicializar(): void
        {
            //const categoria = this.RetornarValorAtributoEnum(EnumIconeCategoria, AtributosHtml.IconeCategoria, null);
            //if (categoria != null)
            //{
            //    const xxx = "";
            //}
            super.Inicializar();
        }

        //protected RetornarValorAtributoPaiRecursivo(atributo: AtributoHtml, ignorarErro: boolean = false): string
        //{
        //    let compoenenteAtual = this;
        //    while (compoenenteAtual != null)
        //    {
        //        if (compoenenteAtual.IsDispensado ||
        //            !(compoenenteAtual.Elemento instanceof HTMLElement))
        //        {
        //            return null;
        //        }

        //        const valorAtributo = compoenenteAtual.RetornarValorAtributo(atributo, null);
        //        if (!String.IsNullOrEmpty(valorAtributo))
        //        {
        //            return valorAtributo;
        //        }
        //        compoenenteAtual = compoenenteAtual.ControlePai as any;
        //    }

        //    if (!ignorarErro)
        //    {
        //        throw new Erro(`O atributo ${atributo.Nome} não foi encontrado`);
        //    }
        //    return null;
        //}

        //private RetornarIcone(): EnumIcone
        //{
        //    const valorAtributoIcone = this.RetornarValorAtributoPaiRecursivo(AtributosHtml.Icone);
        //    if (!String.IsNullOrEmpty(valorAtributoIcone))
        //    {
        //        const valor = EnumUtil.RetornarValor(EnumIcone, valorAtributoIcone);
        //        if (EnumUtil.IsDefindo(EnumIcone, valor))
        //        {
        //            return valor;
        //        }
        //        return IconeUtil.RetornarIconeEnum(valorAtributoIcone);
        //    }

        //    return EnumIcone.Vazio;
        //}

        //private RetornarTamanhoIcone(): EnumTamanhoIcone 
        //{
        //    const valorAtributoTamanhoIcone = this.RetornarValorAtributoPaiRecursivo(AtributosHtml.TamanhoIcone);
        //    if (!String.IsNullOrEmpty(valorAtributoTamanhoIcone))
        //    {
        //        if (EnumUtil.IsDefindo(EnumTamanhoIcone, valorAtributoTamanhoIcone))
        //        {
        //            return EnumUtil.RetornarValor(EnumTamanhoIcone, valorAtributoTamanhoIcone);
        //        }

        //        throw new Erro("O tamanho do ícone não é suportado");
        //        //return IconeUtil.RetornarIconeEnum(valorAtributoTamanhoIcone);
        //        //return valorAtributoTamanhoIcone;
        //    }
        //    return EnumTamanhoIcone.Vazio;
        //}

        //private RetornarNomeIcone(): string
        //{
        //    return IconeUtil.RetornarIconeDomMaterial(this.Icone);
        //}

        //private AtualizarIcone(): void
        //{
        //    this.Elemento.innerHTML = this.RetornarNomeIcone();
        //}

        
        //private RetornarCssClasseTamanhoIcone(tamanhoIcone: EnumTamanhoIcone): string
        //{
        //    const sufixo = this.RetornarSufixoTamanhoIcone(tamanhoIcone);
        //    return Icone.PREFIXO_CSS_CLASSE_TAMANHO_ICONE + sufixo;
        //}

        //private RetornarSufixoTamanhoIcone(tamanhoIcone: EnumTamanhoIcone): string
        //{
        //    switch (tamanhoIcone)
        //    {
        //        case EnumTamanhoIcone.Padrao:

        //            return "padrao";

        //        case EnumTamanhoIcone.Pequeno:

        //            return "pequeno";

        //        case EnumTamanhoIcone.Medio:

        //            return "medio";

        //        case EnumTamanhoIcone.Grande:

        //            return "grande";

        //        default:

        //            throw new Erro("O tamanho do icone não  é suportado");
        //    }

        //}
    }
}
