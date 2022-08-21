namespace Snebur.UI
{
    /**
     * @description sintaxe  Propridade={{CaminhoBind}}. a propriedade deve está definida ou null, caso se  não pode ser undefined, um erro será lançado
     */
    export class BindPropriedade extends BindControle
    {
        public CaminhoPropriedadeControle: string;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindPropriedade, valorAtributo);
            
            const partes = valorAtributo.split("=");
            if (partes.length !== 2)
            {
                throw new ErroOperacaoInvalida("a valor do atributo é invalido esperado NomeProrpeidade={{CaminhoBind}}", this);
            }
            this.CaminhoPropriedadeControle = partes.First();
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            u.ReflexaoUtil.AtribuirValorPropriedade(this.Controle, this.CaminhoPropriedadeControle, novoValor);
            //((this.Controle as any) as IProgresso)[this.CaminhoPropriedadeControle] = u.ConverterUtil.ParaNumero(novoValor);
        }

         
    }
}