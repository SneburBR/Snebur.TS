namespace Snebur
{
    export class PropriedadeValidacoes extends Snebur.Objeto
    {

        public readonly NomePropriedade: string;
        public readonly Propriedade: r.Propriedade;
        public readonly Validacoes = new List<IBaseValidacao>();

        public constructor(nomePropriedade: string, propriedade: r.Propriedade)
        {
            super();

            this.NomePropriedade = nomePropriedade;
            this.Propriedade = propriedade;

            if (propriedade instanceof r.Propriedade)
            {
                //let atributosValidacao = propriedade.Atributos.OfType<d.Atributos.BaseAtributoValidacao>(d.Atributos.BaseAtributoValidacao).ToList();
                //let atributosValidacaoAsync = propriedade.Atributos.OfType<d.Atributos.BaseAtributoValidacaoAsync>(d.Atributos.BaseAtributoValidacaoAsync).ToList();
                



                //this.Validacoes.AddRange(atributosValidacao);
                //this.Validacoes.AddRange(atributosValidacaoAsync);

                const atributosValidacao = propriedade.Atributos.Where(x => this.IsAtributoValidaca(x)).ToList<IBaseValidacao>();
                this.Validacoes.AddRange(atributosValidacao.ToList());
                
            }
            else
            {
                this.Propriedade = new r.Propriedade(nomePropriedade, $Reflexao.TipoDesconhecido, null, true);
            }
        }

        private IsAtributoValidaca(atributo: at.BaseAtributoDominio): boolean
        {
            if (atributo instanceof at.BaseAtributoValidacao ||
                atributo instanceof at.BaseAtributoValidacaoAsync )
            {
                return true;
            }
            const atributoValidacao = atributo as any as IValidacao;
            if (typeof atributoValidacao.RetornarMensagemValidacao === "function" &&
                (typeof atributoValidacao.IsValido === "function" ||
                typeof atributoValidacao.IsValidoAsync === "function"))
            {
                return true;
            }
            return false;
        }



    }
}
