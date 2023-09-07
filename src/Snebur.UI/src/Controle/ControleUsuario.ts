namespace Snebur.UI
{
    export class ControleUsuario extends ControleApresentacao
    { 
        public constructor(controlePai: BaseControle, refElemento?: string | HTMLElement)
        {
            super(controlePai, refElemento);
            this.IsFocarPrimeiraCaixaTexto = false;
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "SN-CONTROLE-USUARIO";
        }
    }
}