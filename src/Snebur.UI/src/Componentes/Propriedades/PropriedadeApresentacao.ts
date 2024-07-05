namespace Snebur.UI
{

    export abstract class PropriedadeApresentacao<TValor> extends Snebur.SneburObject implements IPropriedadeApresentacao<TValor>
    {
        public static readonly VAZIO = "Vazio";

        //o nome da propriedade é definido no momento do mapeamento
        public NomePropriedade: string
        // é definido no momento do mapeamento
        public IsRedundante: boolean

        public readonly Atributo: AtributoHtml;
        public readonly AtributosOpcionais = new List<AtributoHtml>();
        public readonly DicionarioNomesAtributoResponsivo = new DicionarioSimples<NomesAtributoApresentacaoResponsivo>();

        public get NomesAtributo(): NomesAtributoApresentacaoResponsivo
        {
            return this.DicionarioNomesAtributoResponsivo.Item(this.Atributo.Nome);
        }

        public constructor(atributo: AtributoHtml, ...atributosOpcional: AtributoHtml[])
        {
            super();

            this.Atributo = atributo;

            this.DicionarioNomesAtributoResponsivo.Add(this.Atributo.Nome, new NomesAtributoApresentacaoResponsivo(this.Atributo));
            this.AtributosOpcionais.AddRange(atributosOpcional);

            for (const atributoOpcional of atributosOpcional)
            {
                this.DicionarioNomesAtributoResponsivo.Add(atributoOpcional.Nome, new NomesAtributoApresentacaoResponsivo(atributoOpcional));
            }
        }

        //#region IProvedor

        public Atualizar(componenteApresentacao: ComponenteApresentacao): void
        {
            const valor = this.RetornarValor(componenteApresentacao);
            this.AtualizarApresentacao(componenteApresentacao, valor);
            //this.c(componenteApresentacao, valor);
        }

        public RetornarValor(componenteApresentacao: ComponenteApresentacao): TValor
        {
            let valorDom = this.RetornarValorAtributoDom(componenteApresentacao);
            valorDom = this.NormalizarValorDom(componenteApresentacao, valorDom);
            return this.RetornarValorParaComponente(componenteApresentacao, valorDom);
        }

        private NormalizarValorDom(componenteApresentacao: ComponenteApresentacao, valorDom: string): string
        {
            if (BindUtil.IsCaminhoBind(valorDom))
            {
                const propriedadeApresentacao = componenteApresentacao.__atributosBindsPropriedadeApresetencao__;
                propriedadeApresentacao[this.NomePropriedade] = {
                    _isBind_: true,
                    _caminhoBind_: valorDom
                };
                return String.Empty;
            }
            return valorDom;
        }

        public AtribuirValor(componenteApresentacao: ComponenteApresentacao, valor: TValor): void
        {
            this.AtribuirValorInterno(componenteApresentacao, valor, this.Atributo);
            this.AtualizarApresentacao(componenteApresentacao, valor);
        }

        //#endregion

        //#region Retornar valor do atributo do com

        protected AtribuirValorInterno(componenteApresentacao: ComponenteApresentacao, valor: TValor, atributo: AtributoHtml): void
        {
            const telaAtual = TelaUtil.TelaAtual;
            const nomeAtributo = this.RetornarNomeAtributo(componenteApresentacao, atributo, telaAtual);
            const elemento = componenteApresentacao.Elemento;
            const valorDom = this.RetornarValorParaAtributo(componenteApresentacao, valor);

            if (!String.IsNullOrEmpty(valorDom))
            {
                elemento.setAttribute(nomeAtributo, valorDom);
            }
            else
            {
                elemento.removeAttribute(nomeAtributo);
            }
        }

        protected RetornarValorAtributoDom(componenteApresentacao: ComponenteApresentacao): string
        protected RetornarValorAtributoDom(componenteApresentacao: ComponenteApresentacao, atributo: AtributoHtml): string
        protected RetornarValorAtributoDom(componenteApresentacao: ComponenteApresentacao, atributo: AtributoHtml = this.Atributo): string
        {
            const elemento = componenteApresentacao.Elemento;
            const nomesAtributo = this.RetornarNomesAtributo(componenteApresentacao, atributo);

            for (const nomeAtributo of nomesAtributo)
            {
                if (elemento.hasAttribute(nomeAtributo))
                {
                    return elemento.getAttribute(nomeAtributo);
                }
            }
            return null;
        }

        protected RetornarValorAtributoEnum<TEnum>(
            construtorEnum: TEnum,
            componenteApresentacao: ComponenteApresentacao,
            atributo: AtributoHtml,
            valorPadrao: TEnum[keyof TEnum] = null): TEnum[keyof TEnum] | null
        {
            const valorAtributoIcone = this.RetornarValorAtributoDom(componenteApresentacao, atributo);
            if (!String.IsNullOrEmpty(valorAtributoIcone))
            {
                const valor = EnumUtil.RetornarValor(construtorEnum, valorAtributoIcone);
                if (EnumUtil.IsDefindo(construtorEnum, valor))
                {
                    return valor;
                }
            }
            return valorPadrao;
        }

        private RetornarNomesAtributo(componenteApresentacao: ComponenteApresentacao, atributo: AtributoHtml): List<string>
        {
            const nomesAtributos = new List<string>();
            const telaAtual = TelaUtil.TelaAtual;
            const telaAtualAtual = TelaUtil.TelaAlturaAtual;

            //if (componenteApresentacao.IsDebugApresentacao)
            //{
            //    let nomeAtributoTelaAtualDebug = this.RetornarNomeAtributo(componenteApresentacao, atributo, true, telaAtual);
            //    let nomeAtributoDebug = this.RetornarNomeAtributo(componenteApresentacao, atributo, true, null);
            //    nomesAtributos.Add(nomeAtributoTelaAtualDebug);
            //    nomesAtributos.Add(nomeAtributoDebug);
            //}

            const nomeAtributoTelaAlturaAtual = this.RetornarNomeAtributoAltura(componenteApresentacao, atributo, telaAtualAtual);
            const nomeAtributoTelaAtual = this.RetornarNomeAtributo(componenteApresentacao, atributo, telaAtual);
            const nomeAtributo = this.RetornarNomeAtributo(componenteApresentacao, atributo, null);

            nomesAtributos.Add(nomeAtributoTelaAlturaAtual);
            nomesAtributos.Add(nomeAtributoTelaAtual);
            nomesAtributos.Add(nomeAtributo);
            return nomesAtributos;
        }

        private RetornarNomeAtributo(componenteApresentacao: ComponenteApresentacao, atributoHtml: AtributoHtml, tela: EnumTela | null): string
        {
            const nomesAtributo = this.DicionarioNomesAtributoResponsivo.Item(atributoHtml.Nome);
            return nomesAtributo.RetornarNomeAtributo(tela);
        }

        private RetornarNomeAtributoAltura(componenteApresentacao: ComponenteApresentacao, atributoHtml: AtributoHtml, telaAlturaAtual: EnumTelaAltura | null): string
        {
            const nomesAtributo = this.DicionarioNomesAtributoResponsivo.Item(atributoHtml.Nome);
            return nomesAtributo.RetornarNomeAtributoAltura(telaAlturaAtual);
        }

        //#endregion

        protected abstract RetornarValorParaAtributo(componenteApresentacao: ComponenteApresentacao, valorApresentacao: TValor): string;

        protected abstract RetornarValorParaComponente(componenteApresentacao: ComponenteApresentacao, valorDom: string): TValor;

        protected abstract AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, valorApresentacao: TValor): void;

        public override toString(args?: any): string
        {
            return this.___NomeConstrutor + "_" + this.Atributo.Nome;
        }

    }

    /*@internal*/
    export class AtributosBindPropriedadeApresentacao
    {
        _isBind_: boolean;
        _caminhoBind_: string;
    }
}