namespace Snebur.UI
{
    export class PropriedadeRotuloApresentacao extends PropriedadeApresentacao<string>
    {
        public constructor()
        {
            super(AtributosHtml.RotuloApresentacao);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, rotulo: string): string
        {
            return rotulo;
        }

        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, rotuloDom: string): string
        {
            return rotuloDom;
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, rotulo: string): void
        {
            if (!(componenteApresentacao instanceof ControleRotulo ||
                 componenteApresentacao instanceof ComponenteApresentacaoRotulo ))
            {
                throw new ErroNaoSuportado(` o componente não é suportado pelo atributo ${AtributosHtml.RotuloApresentacao}`);
            }
            if (!String.IsNullOrWhiteSpace(rotulo))
            {
                componenteApresentacao.Rotulo = rotulo === "$vazio$" ? "" : rotulo;
            }
        }
    }
}
