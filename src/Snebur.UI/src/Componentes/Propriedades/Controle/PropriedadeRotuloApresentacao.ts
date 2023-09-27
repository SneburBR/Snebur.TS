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
            if ($Configuracao.IsDebugOuTeste)
            {
                if (!(componenteApresentacao instanceof ControleRotulo ||
                    componenteApresentacao instanceof ComponenteApresentacaoRotulo ||
                    componenteApresentacao instanceof Coluna))
                {
                    throw new ErroNaoSuportado(` o componente não é suportado pelo atributo ${AtributosHtml.RotuloApresentacao}`);
                }
            }
            
            if (!String.IsNullOrWhiteSpace(rotulo))
            {
                (componenteApresentacao as IControleRotulo).Rotulo = rotulo === "$vazio$" ? "" : rotulo;
            }
        }
    }
}
