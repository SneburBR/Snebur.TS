namespace Snebur.UI
{
    export class Progresso extends BaseControle implements IProgresso
    {
        private _progresso: number;

        public get Progresso(): number
        {
            return this._progresso;
        }

        public set Progresso(value: number)
        {
            this._progresso = value;
            this.AtualizarProgresso(value);
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            const estilo = new Estilo();
            estilo.display = "block";
            EstiloUtil.AtualizarEstilo(this.IDElemento, estilo);
        }

        private AtualizarProgresso(progresso: number): void
        {
            if (this.IsControleInicializado)
            {
                const estilo = new Estilo();
                estilo.width = `${u.ConverterUtil.ParaInteiro(progresso).toString()}%`;
                EstiloUtil.AtualizarEstilo(this.DivProgresso, estilo);
            }
        }
    }

	//#region Elementos da apresenta��o - c�digo gerado automaticamente #

	export interface Progresso
	{
		readonly DivProgresso: HTMLDivElement;
	}

	//#endregion

}