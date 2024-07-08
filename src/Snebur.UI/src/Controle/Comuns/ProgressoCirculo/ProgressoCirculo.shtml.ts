
namespace Snebur.UI
{
    export class ProgressoCirculo extends BaseControle implements IProgresso
    {
        private static PREFIXO_CSS_PROGRESSO = "progresso-";
        private static NOME_CLASSE_CSS_PROGRESSO_METADE = "over50";

        private readonly ElementoProgressoCirculo: HTMLElement;
        private readonly SpanProgresso: HTMLSpanElement;
        private _progresso: number = 0;

        public get Progresso(): number
        {
            return this._progresso;
        }
        public set Progresso(value: number)
        {
            this.NotificarPropriedadeAlterada(x => x.Progresso, this._progresso, this._progresso = value);
            this.AtualizarProgressoInterno();
        }


        public constructor(controlePai: Snebur.UI.BaseControle, elemento: HTMLElement);
        public constructor(controlePai: Snebur.UI.BaseControle, idElemento: string);
        public constructor(controlePai: Snebur.UI.BaseControle, refElemento: any) 
        {
            super(controlePai, refElemento);
            this.EventoCarregado.AddHandler(this.Controle_Carregado, this);
        }

        private Controle_Carregado(provedor: any, e: EventArgs) 
        {
            //controle carregada
        }


        private AtualizarProgressoInterno(): void
        {
            if (this.IsControleInicializado)
            {
                this.SpanProgresso.innerHTML = u.FormatacaoUtil.FormatarPorcentagem(this.Progresso);
            }

            if (this.Progresso > 50)
            {
                this.ElementoProgressoCirculo.classList.add(ProgressoCirculo.NOME_CLASSE_CSS_PROGRESSO_METADE);
            }
            else
            {
                this.ElementoProgressoCirculo.classList.remove(ProgressoCirculo.NOME_CLASSE_CSS_PROGRESSO_METADE);
            }

            ui.CssClassUtil.RemoverClssClasseComecaCom(this.ElementoProgressoCirculo, ProgressoCirculo.PREFIXO_CSS_PROGRESSO);
            const classeProgresso = ProgressoCirculo.PREFIXO_CSS_PROGRESSO + this.Progresso.toFixed(0);
            this.ElementoProgressoCirculo.classList.add(classeProgresso);
        }

    }
}