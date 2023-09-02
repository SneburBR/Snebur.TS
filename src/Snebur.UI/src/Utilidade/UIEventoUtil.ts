
namespace Snebur.UI
{
    export class UIEventoUtil
    {

        public static RetornarUIEventos(controle: BaseControle): Array<UIEvento>
        {
            const eventos = new Array<UIEvento>();
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.Click, EventoClick));
            /*eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.ClickAsync, EventoClickAsync));*/
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.Enter, EventoEnter));
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.Navegar, EventoNavegar));
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.SelecionarArquivos, EventoSelecionarArquivos));
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.ArrastarArquivos, EventoArrastarArquivos));
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.TextoPesquisa, EventoTextoPesquisa));
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.ItemSelecionadoAlterado, EventoItemSelecionadoAlterado));
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.ValorAlterado, EventoValorAlterado));
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.ValorModificando, EventoValorModificando));
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.LinhaDetalhesExpandida, EventoLinhaDetalhesExpandida));
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.OrdenacaoColunaAlterada, EventoOrdenacaoColunaAlterada));
            eventos.AddRange(UIEventoUtil.RetornarUIEventosAtributo(controle, AtributosHtml.ConteudoExpandido, EventoConteudoExpandido));

            return eventos;
        }

        public static RetornarUIEventosAtributo(controle: BaseControle, atributo: AtributoHtml, construtor: IUIEventoConstrutor): Array<UIEvento>
        {
            const eventos = new Array<UIEvento>();
            const elementos = UIEventoUtil.RetornarElementosFilhosPossuiAtributo(controle.Elemento, atributo, true);
            const len = elementos.length;
            for (let i = 0; i < len; i++)
            {
                const elemento = elementos[i];
                const uiEvento = new construtor(controle, elemento);
                eventos.Add(uiEvento);
            }
            return eventos;
        }

        private static RetornarElementosFilhosPossuiAtributo(elemento: HTMLElement, atributoHtml: AtributoHtml, isElementoPai: boolean)
        {
            const elementos = new Array<HTMLElement>();
            if (isElementoPai || !ElementoControleUtil.IsElementoControle(elemento))
            {
                if (elemento.hasAttribute(atributoHtml.Nome))
                {
                    elementos.Add(elemento);
                }
                const len = elemento.childNodes.length;
                for (let i = 0; i < len; i++)
                {
                    const node = elemento.childNodes[i];
                    if (node instanceof HTMLElement)
                    {
                        elementos.AddRange(UIEventoUtil.RetornarElementosFilhosPossuiAtributo(node, atributoHtml, false));
                    }
                }
            }
            return elementos;
        }
    }
}