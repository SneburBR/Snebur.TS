namespace Snebur.UI
{
    export class Bloco extends BasePainel
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }
    }

    export class BlocoItem extends BasePainel
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        protected override InicializarPropriedadesApresentacao(): void
        {
            super.InicializarPropriedadesApresentacao();
          
        }
    }

    export class BlocoCabecalho extends BasePainel
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

    }

    export class BlocoListaVazia extends BasePainel
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }
    }

    export class BlocoListaCarregando extends BasePainel
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }
    }

}
