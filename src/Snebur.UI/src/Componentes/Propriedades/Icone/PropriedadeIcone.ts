namespace Snebur.UI
{
    export class PropriedadeIcone extends PropriedadeApresentacao<EnumIcone>
    {
        public readonly IsElementoInterno: boolean = false;
        public static readonly TAG_COMPONENTE_ICONE: string = "AP-ICONE";

        public constructor(isElementoInterno: boolean)
        {
            super(AtributosHtml.Icone);
            this.IsElementoInterno = isElementoInterno;
        }

        public override Atualizar(componenteApresentacao: ComponenteApresentacao): void
        {
            super.Atualizar(componenteApresentacao);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, valorApresentacao: EnumIcone): string
        {
            if (valorApresentacao === EnumIcone.Vazio)
            {
                return String.Empty;
            }
            return EnumUtil.RetornarDescricao(EnumIcone, valorApresentacao);
        }

        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): EnumIcone
        {
            if (!String.IsNullOrWhiteSpace(valorDom))
            {
                if (EnumUtil.IsDefindo(EnumIcone, valorDom))
                {
                    return IconeUtil.RetornarIconeEnum(valorDom);
                }
                console.error(`O ícone ${valorDom} não foi encontrado em ${compronenteApresentacao.ControleApresentacao.___NomeConstrutor}`);
                return EnumIcone.Warning;
            }
            return EnumIcone.Vazio;
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, icone: EnumIcone): void
        {
            const atributosBin = componenteApresentacao.__atributosBindsPropriedadeApresetencao__[this.NomePropriedade];
            if (atributosBin?._isBind_)
            {
                return;
            }

            const elementoIcone = this.RetornarElementoIcone(componenteApresentacao);
            elementoIcone.innerHTML = this.RetornaarConteudoIcone(icone);

            if (icone === EnumIcone.Vazio && this.IsElementoInterno &&
                componenteApresentacao.Elemento !== elementoIcone)
            {
                elementoIcone.remove();
            }
        }
        private RetornarElementoIcone(componenteApresentacao: ComponenteApresentacao): HTMLElement
        {
            if (componenteApresentacao instanceof Botao &&
                componenteApresentacao.ElementoIcone != null)
            {
                return componenteApresentacao.ElementoIcone;
            }

            const elementoRecipienteIcone = this.RetornarElementoRecipienteIcone(componenteApresentacao);
            if (this.IsElementoInterno)
            {
                return ElementoIconeUtil.RetornarElementoIcone(elementoRecipienteIcone, componenteApresentacao);
            }
            return elementoRecipienteIcone;
        }

        private RetornarElementoRecipienteIcone(componenteApresentacao: ComponenteApresentacao): HTMLElement
        {
            const elementoRecipienteIcone = ((componenteApresentacao as any) as IComponenteApresentacaoIcone).ElementoRecipienteIcone;
            if (elementoRecipienteIcone instanceof HTMLElement)
            {
                return elementoRecipienteIcone;
            }
            return componenteApresentacao.ElementoApresentacao;
        }

        private RetornaarConteudoIcone(icone: EnumIcone): string
        {
            return IconeUtil.RetornarIconeDomMaterial(icone);
        }
    }



}
