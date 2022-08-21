namespace Snebur.UI
{
    export class CaixaData extends BaseCaixaTexto<Date>
    {
        public Mascara: string;

        private _caixaCalendario: CaixaCalendario
        private _tipoData: d.EnumTipoData;

        public get CaixaCalendario(): CaixaCalendario | null
        {
            return this._caixaCalendario;
        }

        public get TipoData(): d.EnumTipoData
        {
            return this._tipoData;
        }

        public override get Valor(): Date
        {
            return ConverterUtil.ParaData(this.ElementoInput.value);
        }

        public override set Valor(value: Date)
        {
            if (!this.Valor?.Equals(value, u.OpcoesCompararData.Data, u.OpcoesCompararHora.HoraMinutoSegundo))
            {
                this.ElementoInput.value = FormatacaoUtil.FormatarData(value);
                this.ElementoInput.dispatchEvent(new Event("change"));
            }
        }

        //#region Construtor

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar()
        {
            super.Inicializar();

            this.AdicionarEventoDom(EnumEventoDom.Focus, this.ElementoInput_Focus, this.ElementoInput);
            this._tipoData = this.RetornarValorAtributoEnum(d.EnumTipoData, AtributosHtml.TipoData, d.EnumTipoData.Normal);
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            this.Mascara = this.RetornarMascara();

            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindData, this.CaminhoBind);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Mascara, this.Mascara);
           /* ElementoUtil.AdicionarAtributo(this.Elemento, AtributosHtml.Mascara, this.Mascara);*/
        }

        private AdicionarCaixaCalendario(): void
        {
            if ($Configuracao.IsDebug)
            {
                if (this._caixaCalendario != null)
                {
                    this._caixaCalendario.Dispose();
                    this._caixaCalendario = null;
                }
            }

            if (this._caixaCalendario == null)
            {
                this._caixaCalendario = new CaixaCalendario(this);
                this.ControlesFilho.Add(this._caixaCalendario);
                this._caixaCalendario.InicializarControle();
            }
        }
        //#endregion

        private RetornarMascara(): string
        {
            const mascara = this.RetornarValorAtributo(AtributosHtml.Mascara);
            if (!String.IsNullOrWhiteSpace(mascara))
            {
                return mascara;
            }
            return "Data";
        }
        //#endregion

        private async BtnAbrirCalendario_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            this.AdicionarCaixaCalendario();
            const dataSelecionada = await this.CaixaCalendario.MostrarAsync(this.Valor ?? new Date());
            if (dataSelecionada != null)
            {
                this.Valor = dataSelecionada;
            }
        }

        //#region IDisposable

        public override Dispose(): void
        {
            if (!this.IsDispensado)
            {
                this.CaixaCalendario?.Dispose();
                super.Dispose();
            }
        }
        //#endregion
    }

	//#region Elementos da apresenta��o - c�digo gerado automaticamente #

	export interface CaixaData
	{
	}

	//#endregion

}