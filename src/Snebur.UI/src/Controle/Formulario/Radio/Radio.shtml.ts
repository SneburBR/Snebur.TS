namespace Snebur.UI
{
    export class Radio<TValor = any> extends BaseControleFormulario<TValor> implements ISelecionado
    {
        private _valor: TValor;
        private _grupo: string;
        private _isSelecioando: boolean;

        public override get Valor(): TValor
        {
            return this._valor;
        }

        public override set Valor(value: TValor)
        {
            this._valor = value;
            this.NotificarPropriedadeAlterada(x => x.Valor, this._valor, this._valor = value);
            this.EventoValorAlterado.Notificar(this, new ValorSelecionadoAlteradoEventArgs(value, this.IsSelecionado));
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
                this.EventoValorAlterado.Notificar(this, new ValorSelecionadoAlteradoEventArgs<TValor>(this.Valor, this.IsSelecionado));
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
            this.Valor = this.RetornarValor();
            this.Grupo = this.RetornarGrupoRadio();
            this.IsSelecionado = this.RetornarValorAtributoBoolean(AtributosHtml.Selecionado, false);
        }

        private RetornarValor(): TValor
        {
            const valor = this.RetornarValorAtributo(AtributosHtml.Valor, null, false);
            if (typeof valor === "string")
            {
                const valorReflexao = r.ReflexaoNamespaceUtil.RetornarObjetoOuConstrutor(valor, true);
                if (valorReflexao != null)
                {
                    return valorReflexao;
                }
            }
            return ConverterUtil.ParaMelhorTipo(valor);
        }

        protected override ElementoInput_Change(e:Event)
        {
            super.ElementoInput_Change(e);
            if (this._isSelecioando !== this.ElementoInput.checked)
            {
                this.IsSelecionado = this.ElementoInput.checked;
            }
        }

        protected override ElementoInput_Click(e: Event)
        {
            super.ElementoInput_Click(e);
            this.IsSelecionado = this.ElementoInput.checked;
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