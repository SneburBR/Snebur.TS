namespace Snebur.UI
{
    export class ControleUsuario extends ControleApresentacao
    { 

        public constructor(controlePai: BaseControle);
        public constructor(controlePai: BaseControle, elemento: HTMLElement);
        public constructor(controlePai: BaseControle, idElemento: string);
        public constructor(controlePai: BaseControle, refElemento: string | HTMLElement);
        public constructor(controlePai: BaseControle, refElemento?: string | HTMLElement)
        {
            super(controlePai, refElemento);
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "SN-CONTROLE-USUARIO";
        }
    }
}