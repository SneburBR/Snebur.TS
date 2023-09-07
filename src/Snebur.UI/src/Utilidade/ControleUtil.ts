namespace Snebur.UI
{
    export class ControleUtil 
    {
        public static RetornarConstrutorControle(
            controlePai: BaseControle,
            caminho: string,
            isIgnorarErro: boolean = false): IControleConstrutor
        {
            const construtor = r.ReflexaoNamespaceUtil.RetornarConstrutor(caminho,
                isIgnorarErro,
                (construtores) =>
                {
                    const mensagemErro = `Ambiguidade, Existem mais um construtor para o caminho '${caminho}' em: ${controlePai.ControleApresentacao.___NomeConstrutor}, 
                                           Utilizar o caminho do namespace para evitar essa mensagem <br />
                                           Construtores: ${construtores.Select(x => x.GetType().__CaminhoTipo)}`;
                    if ($Configuracao.IsDebug)
                    {
                        throw new Erro(mensagemErro);
                    }
                    console.error(mensagemErro);

                });

            if (!u.ValidacaoUtil.IsConstrutor(construtor))
            {
                if (isIgnorarErro)
                {
                    return null;
                }

                throw new Erro(`Não foi encontrado o construtor para o caminho ${caminho}, em ${controlePai.ControleApresentacao.___NomeConstrutor}`, this);
            }
            return construtor as IControleConstrutor;
        }

        public static IsElementoControle(elemento: Element): boolean
        public static IsElementoControle(idElemento: string): boolean
        public static IsElementoControle(refElemento: any): boolean
        {
            const elemento = ElementoUtil.RetornarElemento(refElemento);
            return ElementoControleUtil.IsElementoControle(elemento);
        }

        public static RetornarLinhaOuItemBloco(controle: BaseControle): Linha | ItemBloco
        {
            let controleAtual = controle;
            while (controleAtual instanceof BaseControle)
            {
                if (controleAtual instanceof Linha || controleAtual instanceof ItemBloco)
                {
                    return controleAtual;
                }

                if ((controleAtual instanceof BaseControleLista || controleAtual instanceof ControleApresentacao) && (!(controleAtual instanceof BotaoMenu)))
                {
                    return null;
                }
                controleAtual = controleAtual.ControlePai;
            }
            return null;
        }

        public static IsControleFlutuante(controle: BaseControle): boolean
        {
            if (controle instanceof ControleFlutuante)
            {
                return true;
            }

            const controlePai = controle.RetornarControlePai(ControleFlutuante);
            if (controlePai instanceof ControleFlutuante && !(controle instanceof Janela))
            {
                return true;
            }
            return false;
        }

        public static RetornarElementoDestinoFlutuante(controle: BaseControle): HTMLElement
        {
            let temp = controle;
            while (temp != null)
            {
                if (temp instanceof Janela)
                {
                    return temp.Elemento;
                }
                temp = temp.ControlePai;
            }
            return $Aplicacao.DocumentoPrincipal.Elemento;

        }


    }
}