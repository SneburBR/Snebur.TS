namespace Snebur.UI
{

    export class ComponenteApresentacaoMapeamento<TComponente extends ComponenteApresentacao = ComponenteApresentacao> extends MapeamentoPropriedadeApresentacao<TComponente>
    {
        protected override Inicializar(): void
        {

            this.Mapear(x => x.VisibilidadeApresentacao, new PropriedadeVisibilidade());

            //this.Mapear(x => x.LarguraApresentacao, new ProvedorLargura());
            //this.Mapear(x => x.AlturaApresentacao, new ProvedorAltura());
            this.Mapear(x => x.CorFundoApresentacao, new PropriedadeCorFundo());
            this.Mapear(x => x.CorTextoApresentacao, new PropriedadeCorTexto());
            this.Mapear(x => x.TonalidadeCorFundo, new PropriedadeCorFundo(), true);
            this.Mapear(x => x.TonalidadeCorTexto, new PropriedadeCorTexto(), true);

            this.Mapear(x => x.Margem, new PropriedadeMargem());
            this.Mapear(x => x.MargemInterna, new PropriedadeMargemInterna());

            this.Mapear(x => x.BordaApresentacao, new PropriedadeBorda());
            this.Mapear(x => x.CorBordaApresentacao, new PropriedadeCorBorda());
            this.Mapear(x => x.TonalidadeCorBorda, new PropriedadeCorBorda(), true);

            this.Mapear(x => x.LarguraApresentacao, new PropriedadeLargura());
            this.Mapear(x => x.LarguraMinimaApresentacao, new PropriedadeLarguraMinima());
            this.Mapear(x => x.LarguraMaximaApresentacao, new PropriedadeLarguraMaxima());

            this.Mapear(x => x.AlturaApresentacao, new PropriedadeAltura());
            this.Mapear(x => x.AlturaMinimaApresentacao, new PropriedadeAlturaMinima());
            this.Mapear(x => x.AlturaMaximaApresentacao, new PropriedadeAlturaMaxima());


            this.Mapear(x => x.AlinhamentoVertical, new PropriedadeAlinhamentoVertical());
            this.Mapear(x => x.AlinhamentoHorizontal, new PropriedadeAlinhamentoHorizontal());
            /*this.Mapear(x => x.AlinhamentoTexto, new PropriedadeAlinhamentoHorizontal());*/
         
            this.Mapear(x => x.BarraRolagem, new PropriedadeBarraRolagem());
            this.Mapear(x => x.BarraRolagemHorizontal, new PropriedadeBarraRolagemHorizontal());
            this.Mapear(x => x.BarraRolagemVertical, new PropriedadeBarraRolagemVertical());


            //this.Mapear<Painel>(x => x.TipoPainel, new PropriedadeTipoPainel());

            this.Mapear(x => x.Tipografia, new PropriedadeTipografia());
            this.Mapear(x => x.PesoFonte, new PropriedadePesoFonte());
            this.Mapear(x => x.Fonte, new PropriedadeFonte());
            this.Mapear(x => x.Quebrar, new PropriedadeQuebrar());

            this.Mapear(x => x.AlturaLinhaApresentacao, new ProprieadeAlturaLinha());
            this.Mapear(x => x.AlinhamentoTexto, new PropriedadeAlinhamentoTexto());
        }
    }

    export class ComponenteApresentacaoRotuloMapeamento<TCompomenteRotulo extends ComponenteApresentacaoRotulo = ComponenteApresentacaoRotulo> extends ComponenteApresentacaoMapeamento<TCompomenteRotulo>
    {
        protected override Inicializar(): void
        {
            super.Inicializar();
            this.Mapear(x => x.RotuloApresentacao, new PropriedadeRotuloApresentacao());
        }
    }

    export class TextoMapeamento extends ComponenteApresentacaoRotuloMapeamento<ComponenteTexto>
    {
        protected override Inicializar(): void
        {
            super.Inicializar();
            /*this.Mapear(x => x.AlinhamentoTexto, new PropriedadeAlinhamentoTexto());*/
        }
    }

    type ComponenteTexto = Texto | Paragrafo;
}


