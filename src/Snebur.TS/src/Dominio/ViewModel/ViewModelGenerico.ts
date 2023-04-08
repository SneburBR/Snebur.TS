namespace Snebur.Dominio
{
    export class ViewModelGenerico extends Snebur.Dominio.BaseViewModel
    {
        public constructor(init: any)
        {
            super();
            this.DeclararPropriedades(init);
        }

        private DeclararPropriedades(init: any)
        {
            const propriedades = Object.keys(init);
            for (const propriedade of propriedades)
            {
                /*eslint-disable*/
                if (init.hasOwnProperty(propriedade) && !propriedade.startsWith("_"))
                {
                    /*eslint-enable*/
                    const valorPropriedade = init[propriedade];
                    const _this: any = this;
                    if (valorPropriedade != null)
                    {
                        const valorPropriedaeNormalizado = ViewModelUtil.RetornarValorProriedade(valorPropriedade);
                        if (!Array.isArray(valorPropriedade))
                        {
                            this.DeclararPropriedade(propriedade, valorPropriedade.constructor, this.Propriedade_Alterada);
                        }
                        _this[propriedade] = valorPropriedaeNormalizado;
                    }
                }
            }
        }

        private Propriedade_Alterada()
        {

        }
    }

}
namespace Snebur
{
    export class ViewModelUtil
    {
        public static NormalizarViewModel(valorPropriedade: any)
        {
            if (valorPropriedade != null)
            {
                return ViewModelUtil.RetornarValorProriedade(valorPropriedade);
            }
            return valorPropriedade;
        }

        public static RetornarValorProriedade(valorPropriedade: any)
        {
            if (Array.isArray(valorPropriedade))
            {
                return ViewModelUtil.RetornarListaObservacao(valorPropriedade);
            }

            if (valorPropriedade instanceof Snebur.ObjetoControladorPropriedade)
            {
                return valorPropriedade;
            }

            if (ValidacaoUtil.IsTipoPrimario(valorPropriedade))
            {
                return valorPropriedade;
            }

            const nomeConstrutor = valorPropriedade.constructor?.name as string;
            if (nomeConstrutor?.toLowerCase().EndsWith("viewmodel"))
            {
                throw new Erro(`O construtor ${nomeConstrutor} não está herdando de Snebur.Dominio.BaseViewModel`);
            }

            return new ViewModelGenerico(valorPropriedade);
        }

        private static RetornarListaObservacao(valorPropriedade: any[]): ListaObservacao<any>
        {
            if (Snebur.Utilidade.ListaUtil.IsListaObservacao(valorPropriedade))
            {
                return valorPropriedade;
            }

            const novaLista = new ListaObservacao();
            for (const item of valorPropriedade)
            {
                const valorItem = ViewModelUtil.RetornarValorProriedade(item);
                novaLista.Add(valorItem);
            }
            return novaLista;
        }
    }
}
