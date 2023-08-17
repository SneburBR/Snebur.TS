namespace Snebur.Utilidade
{
    export class GlobalizacaoUil
    {
        public static RetornarMensagem(identificador: string, mensagemPadrao: string, ...argumentosFormatar: string[]): string
        {
            if ($Configuracao.IsGlobalizar)
            {
                throw new ErroNaoImplementado(this);
            }
            return String.Format(mensagemPadrao, ...argumentosFormatar);
        }

        public static RetornarRotuloPropriedade(propriedade: r.Propriedade): string
        {
            if (propriedade == null)
            {
                return String.Empty;
            }
            if ($Configuracao.IsGlobalizar)
            {
                throw new ErroNaoImplementado(this);
            }
            const atributoRotulo = propriedade.Atributos.OfType<d.Atributos.RotuloAttribute>(d.Atributos.RotuloAttribute).SingleOrDefault();
            if (atributoRotulo == null)
            {
                return propriedade.Nome;
            }
            const rotulo = atributoRotulo.Rotulo;
            return rotulo;
        }

        public static RetornarRotuloTipo(tipo: r.TipoBaseDominio): string
        public static RetornarRotuloTipo(tipo: r.TipoBaseDominio, plural: boolean): string
        public static RetornarRotuloTipo(tipo: r.TipoBaseDominio, plural?: boolean): string
        {
            if ($Configuracao.IsGlobalizar)
            {
                throw new ErroNaoImplementado(this);
            }
            const atributoRotulo = tipo.Atributos.OfType<d.Atributos.RotuloAttribute>(d.Atributos.RotuloAttribute).SingleOrDefault();
            if (atributoRotulo != null)
            {
                if (plural && !String.IsNullOrWhiteSpace(atributoRotulo.RotuloPlural))
                {
                    return atributoRotulo.RotuloPlural;
                }
                if (!String.IsNullOrWhiteSpace(atributoRotulo.Rotulo))
                {
                    return atributoRotulo.Rotulo;
                }
            }
            return tipo.Nome;
        }

        public static RetornarMensagemValidacao(atributo: d.Atributos.BaseAtributoValidacaoAsync, identificador: string, ...argumentosFormatar: Array<string>): string;
        public static RetornarMensagemValidacao(atributo: d.Atributos.BaseAtributoDominio, identificador: string, ...argumentosFormatar: Array<string>): string;
        public static RetornarMensagemValidacao(atributo: any, identificador: string, ...argumentosFormatar: Array<string>): string
        {
            if ($Configuracao.IsGlobalizar)
            {
                throw new ErroNaoImplementado(this);
            }
            const mensagem = atributo.constructor[identificador];
            return String.Format(mensagem, ...argumentosFormatar);
        }
    }
}