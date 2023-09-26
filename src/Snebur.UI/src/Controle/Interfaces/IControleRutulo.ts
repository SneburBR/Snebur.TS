namespace Snebur.UI
{
    export interface IControleRotulo extends Snebur.IRotulo, Snebur.UI.ComponenteApresentacaoConteudo
    {
        readonly ElementoRotulo: HTMLElement;
        /*@internal*/
         BindRotulo: BindPropriedadeComum;
        /*@internal*/
         IsExisteBindRotulo: boolean;
        /*@internal*/
         IsRotuloVazio: boolean ;
        /*@internal*/
         IsRotuloHtmlInterno: boolean ;
        
         RotuloApresentacao: string;
          Rotulo: string;
        
        RetornarRotulo(): string;
        RetornarRotuloInterno(): string;
    }

    export class ControleRotuloUtil
    {
        public static InicializarBindRotulo(controleRotulo: IControleRotulo): void
        {
            const caminhoBind = controleRotulo.RetornarValorAtributo(AtributosHtml.BindRotulo, null, true);
            if (BindUtil.IsCaminhoBind(caminhoBind))
            {
                controleRotulo.IsExisteBindRotulo = true;
                if (controleRotulo.BindRotulo == null)
                {
                    const nomePropriedadeRotulo = controleRotulo.RetornarNomePropriedade(x => x.Rotulo);
                    controleRotulo.BindRotulo = new BindPropriedadeComum(controleRotulo.ControlePai, controleRotulo.Elemento, caminhoBind, nomePropriedadeRotulo);
                    controleRotulo.BindRotulo.InicializarBind();

                    if (controleRotulo instanceof ControleRotulo)
                    {
                        controleRotulo.Binds.Add(controleRotulo.BindRotulo);
                    }
                    else if (controleRotulo instanceof ComponenteApresentacaoRotulo)
                    {
                        controleRotulo.ControleApresentacao.Binds.Add(controleRotulo.BindRotulo);
                    }
                    else
                    {
                        throw new Error("Tipo de controle não suportado");
                    }
                    
                }
            }
        }

        public static AtualizarRotulo(controleRotulo: IControleRotulo, isInicializando: boolean = false): void
        {
            const elementoRotulo = controleRotulo.ElementoRotulo;
            controleRotulo.IsRotuloVazio = u.ConverterUtil.ParaBoolean(controleRotulo.RetornarValorAtributo(AtributosHtml.IsRotuloVazio));
            if (controleRotulo.IsRotuloVazio)
            {
                elementoRotulo.OcultarElemento();
            }
            else
            {
                const rotulo = controleRotulo.RetornarRotulo();
                if (!controleRotulo.IsExisteBindRotulo || isInicializando)
                {
                    elementoRotulo.innerHTML = rotulo;
                }
            }
        }

        public static RetornarRotulo(controleRotulo: IControleRotulo): string
        {
            const isRotuloVazio = controleRotulo.RetornarValorAtributoBoolean(AtributosHtml.IsRotuloVazio);
            if (isRotuloVazio)
            {
                return String.Empty;
            }
            const valorAtributoRotulo = controleRotulo.RetornarRotuloInterno();
            if (u.ValidacaoUtil.IsBind(valorAtributoRotulo))
            {
                controleRotulo.IsExisteBindRotulo = true;
                return valorAtributoRotulo;
            }

            if (String.IsNullOrEmpty(valorAtributoRotulo) &&
                !String.IsNullOrWhiteSpace(controleRotulo.Rotulo))
            {
                return controleRotulo.Rotulo;
            }
            return valorAtributoRotulo;
        }

        public static RetornarRotuloInterno(controleRotulo: IControleRotulo): string
        {
            const valorAtributoRotulo = controleRotulo.RetornarValorAtributo(AtributosHtml.Rotulo, null, true);
            if (controleRotulo.IsRotuloHtmlInterno && String.IsNullOrEmpty(valorAtributoRotulo))
            {
                return (controleRotulo as any).HtmlInternoInicial.trim();
            }
            if (!ValidacaoUtil.IsDefinido(valorAtributoRotulo))
            {
                return String.Empty;
            }
            return valorAtributoRotulo.toString().trim();
        }

        public static AtualizarRotuloApresentacao(controleRotulo: IControleRotulo): void
        {
            const propriedadeRorutloApresetancao = controleRotulo.MapeamentoPropriedadeApresentacao.DicionarioPropriedades.TryItem(controleRotulo.RetornarNomePropriedade(x => x.RotuloApresentacao));
            if (!(propriedadeRorutloApresetancao instanceof PropriedadeRotuloApresentacao))
            {
                throw new Erro(`A propriedade rotulo apresentação não foi mapeada para o tipo ${this.GetType().Nome}`);
            }
            propriedadeRorutloApresetancao.Atualizar(controleRotulo);
        }
  
    }
}
