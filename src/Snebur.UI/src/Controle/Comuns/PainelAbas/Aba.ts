﻿namespace Snebur.UI
{
    export class Aba extends ControleRotulo
    {
        private _parametros: DicionarioSimples<any, string>;
        private static readonly TipograficaPadrao = EnumUtil.RetornarDescricao(EnumTipografia, EnumTipografia.SubTitulo2);
        private static readonly CSS_CLASSE_SELECIONADA = "sn-is-aba-selecionada";

        public static readonly TAG_ABA: string = "sn-aba";

        public ConstrutorPagina: IPaginaConstrutor;
       
        /* public Rotulo: string;*/

        public override get Rotulo(): string
        {
            return super.Rotulo;
        }
        public override set Rotulo(value:string)
        {
            super.Rotulo = value;
        }

        public get PainelAbasHorizontal(): PainelAbasHorizontal
        {
            return this.ControlePai as PainelAbasHorizontal;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        public override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            //this.Rotulo = this.RetornarValorAtributo(AtributosHtml.Rotulo);
            //if (!String.IsNullOrEmpty(this.Rotulo))
            //{
            //    this.ElementoApresentacao.innerHTML = this.Rotulo;
            //}
            //else
            //{
            //    this.Rotulo = this.ElementoApresentacao.innerHTML;
            //}

            if (!this.Elemento.hasAttribute(AtributosHtml.Tipografia.Nome))
            {
                this.Elemento.setAttribute(AtributosHtml.Tipografia.Nome, Aba.TipograficaPadrao);
            }

            this.ConstrutorPagina = this.RetornarConstrutorPagina();
            if (this.ConstrutorPagina instanceof Function)
            {
                this.Elemento.setAttribute(AtributosHtml.Click.Nome, "BtnAba_Click");
                this.Elemento.removeAttribute(AtributosHtml.Navegar.Nome);
            }
        }

        public override Inicializar(): void
        {
            super.Inicializar();
            this._parametros = this.RetornarParametros();
        }

       public Filter(construtorPagina: Pagina | IPaginaConstrutor<Pagina> | typeof Pagina, parametros: DicionarioSimples<any, string>): boolean
       {
           if (this.ConstrutorPagina === construtorPagina)
           {
               return Util.IsIgual(this._parametros, parametros);
           }
           return false;
        }

        protected RetornarElementoRotulo(): HTMLElement
        {
            return this.ElementoApresentacao;
        }

        private RetornarConstrutorPagina(): IPaginaConstrutor
        {
            const caminhoPagina = this.RetornarValorAtributo(AtributosHtml.Navegar, null);
            if (!String.IsNullOrEmpty(caminhoPagina))
            {
                return NavegadorUtil.RetornarConstrutorPagina(this, caminhoPagina);
            }
            return null;
        }

        private async BtnAba_Click(provedor: any, e: UIEventArgs)
        {
            const isPodeNavegar = await this.IsPodeNavegagarAsync(e.Parametros);
            if (isPodeNavegar)
            {
                this.PainelAbasHorizontal.Navegar(this, e.Parametros);
            }

        }
        private IsPodeNavegagarAsync( parametros: DicionarioSimples<any, string>) :Promise<boolean> | boolean
        {
            if (typeof this.PainelAbasHorizontal.FuncaoIsPodeNavegar === "function")
            {
                return this.PainelAbasHorizontal.FuncaoIsPodeNavegar(this.ConstrutorPagina, parametros);
            }
            return true;
        }

        public Selecinonar(): void
        {
            this.Elemento.classList.add(Aba.CSS_CLASSE_SELECIONADA);
        }

        public Deselecionar(): void
        {
            this.Elemento.classList.remove(Aba.CSS_CLASSE_SELECIONADA);
        }
    }
}
