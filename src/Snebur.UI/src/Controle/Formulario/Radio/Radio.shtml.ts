namespace Snebur.UI
{
    export class Radio extends BaseControleFormulario<boolean> implements ISelecionado
    {
        private _grupo: string;
        private _isSelecioando: boolean;

        public override get Valor(): any
        {
            return this.DataSource;
        }

        public override set Valor(value: any)
        {
            this.DataSource = value;
            this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs(value));
        }

        public get IsSelecionado(): boolean
        {
            if (this.IsControleInicializado)
            {
                return (ElementoUtil.RetornarElemento(this.ElementoInput) as HTMLInputElement).checked;
            }
            return this._isSelecioando;
        }
        public set IsSelecionado(value: boolean)
        {
            value = u.ConverterUtil.ParaBoolean(value);
            /*eslint-disable*/
            if (this._isSelecioando != value || this.ElementoInput.checked !== value)
            {
                this._isSelecioando = value;
                this.ElementoInput.checked = this._isSelecioando;
                this.DeselecionarGrupoOutros();
                this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs(this._isSelecioando));
            }
            /*eslint-enable*/
            //this.NotificarPropriedadeAlterada(x => x.IsSelecionado);
        }

        public get Grupo(): string
        {
            return this._grupo;
        }
        public set Grupo(value: string)
        {
            this._grupo = value;
            this.ElementoInput.name = value;
        }

        //#region Propriedades

        private get ElementoRadio(): HTMLInputElement
        {
            return (this.ElementoInput as HTMLInputElement);
        }
        //#endregion

        //#region Construtor

        public constructor(controlePai: Snebur.UI.BaseControle, elemento: HTMLElement) 
        {
            super(controlePai, elemento);

            this.CssClasseControle = "sn-radio";
        }
        //#endregion

        //#region Métodos Sobreescritos

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            if (!String.IsNullOrWhiteSpace(this.CaminhoBind))
            {
                ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindTexto, this.CaminhoBind);
            }
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.Grupo = this.RetornarGrupoRadio();
            this.IsSelecionado = this.RetornarValorAtributoBoolean(AtributosHtml.Selecionado, false);
        }

        protected override AtualizarRotulo(): void
        {
            super.AtualizarRotulo();
        }

        //#endregion

        //#region Métodos Privados

        private RetornarGrupoRadio(): string
        {
            const valorAtributoGrupoRadio = this.RetornarValorAtributo(AtributosHtml.Grupo);
            if (!String.IsNullOrWhiteSpace(valorAtributoGrupoRadio))
            {
                return valorAtributoGrupoRadio;
            }
            return this.ControleApresentacao.GetType().Nome + "_" + this.ControleApresentacao.GetHashCode().toString();
        }

        private DeselecionarGrupoOutros(): void
        {
            //throw new Error("Method not implemented.");
        }

        //#endregion
    }
}