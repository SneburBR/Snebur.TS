namespace Snebur.UI
{
    export declare type TipoComprimento = BaseEnumComprimento | number | string;

    export abstract class BasePropriedadeComprimento extends PropriedadeApresentacao<UnidadeComprimento>
    {
        public readonly abstract ProprieadesEstiloDom: string[];

        public constructor(atributoComprimento: AtributoHtml)
        {
            super(atributoComprimento);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, unidadeComprimento: UnidadeComprimento): string
        {
            if (unidadeComprimento === undefined || unidadeComprimento == null)
            {
                return String.Empty;
            }
            return unidadeComprimento.ValorFormatado as string;
        }

        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): UnidadeComprimento
        {
            if (valorDom === undefined || valorDom == null)
            {
                return UnidadeComprimento.Vazio;
            }
            return new UnidadeComprimento(valorDom);
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao,
            unidadeComprimento: UnidadeComprimento,
            isAtualizarElementoApresentacao: boolean = false): void
        {
            const elementosDimensao = this.RetornarElementosDimensao(componenteApresentacao,
                isAtualizarElementoApresentacao);

            const valorDomCalculado = this.RetornarValorDomCalculado(componenteApresentacao, unidadeComprimento);
            if (String.IsNullOrWhiteSpace(valorDomCalculado) /*&& componenteApresentacao instanceof ControleFlutuante*/)
            {
                return;
            }

            for (const elementoDimensao of elementosDimensao)
            {
                for (const propriedadeEstiloDom of this.ProprieadesEstiloDom)
                {
                    (elementoDimensao.style as any)[propriedadeEstiloDom] = valorDomCalculado;
                }
            }
        }

        protected RetornarElementosDimensao(componenteApresentacao: ComponenteApresentacao,
            isAtualizarElementoApresentacao: boolean):HTMLElement[]
        {
            if (isAtualizarElementoApresentacao)
            {
                return [componenteApresentacao.ElementoDimensao,
                componenteApresentacao.ElementoApresentacao];
            }
            return [componenteApresentacao.ElementoDimensao];
        }

        protected abstract RetornarValorDomCalculado(componenteApresentacao: ComponenteApresentacao, unidadeComprimento: UnidadeComprimento): string;
    }
}



//namespace Snebur.UI
//{
//    export declare type TipoComprimento = BaseEnumComprimento | number | string;

//    export abstract class BaseProvedorComprimento extends ProvedorPropriedadeApresentacao<TipoComprimento>
//    {
//        public readonly abstract NomePropriedadeEstiloDom: string;

//        public constructor(atributoComprimento: AtributoHtml)
//        {
//            super(atributoComprimento);
//        }


//        protected RetornarValorParaAtributo(valorApresentacao: TipoComprimento): string
//        {
//            if (valorApresentacao == undefined || valorApresentacao == null)
//            {
//                throw new Erro("Não implementado");
//            }
//            return new UnidadeComprimento(valorApresentacao).ValorFormatado as string;
//        }

//        protected RetornarValorParaComponente(valorDom: string): TipoComprimento
//        {
//            if (valorDom == undefined || valorDom == null)
//            {
//                return BaseEnumComprimento.Vazio;
//            }
//            return new UnidadeComprimento(valorDom).ValorFormatado as string;
//        }

//        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, valorApresentacao: TipoComprimento): void
//        {
//            (componenteApresentacao.Elemento.style as any)[this.NomePropriedadeEstiloDom] = this.RetornarValorPropriedadeEstiloDom(componenteApresentacao, valorApresentacao);
//        }


//        protected RetornarValorPropriedadeEstiloDom(componenteApresentacao: ComponenteApresentacao, valorApresentacao: TipoComprimento): string
//        {
//            if (valorApresentacao == BaseEnumApresentacao.Vazio)
//            {
//                return String.Empty;
//            }
//            else
//            {
//                let unidadeComprimento = new UnidadeComprimento(valorApresentacao);
//                return unidadeComprimento.ValorFormatado as string;
//            }
//        }
//    }
//}

