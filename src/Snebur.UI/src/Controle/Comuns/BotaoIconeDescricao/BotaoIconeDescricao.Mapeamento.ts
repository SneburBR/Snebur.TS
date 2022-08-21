﻿namespace Snebur.UI
{
    export class BotaoIconeDescricaoMapeamento extends ControleRotuloMapeamento<Botao>
    {
        protected override Inicializar(): void
        {
            super.Inicializar();

            //this.Mapear(x => x.TipoBotao, new PropriedadeTipoBotao());
            this.Mapear(x => x.Icone, new PropriedadeIcone(true));
            this.Mapear(x => x.IconeCategoria, new PropriedadeIconeCategoria(true));
            this.Mapear(x => x.TamanhoIcone, new PropriedadeTamanhoIcone());
        }
    }
}
