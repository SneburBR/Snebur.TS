namespace Snebur.UI
{
    const SEPARADOR_RESPOSIVIDADE = "--";
    const SUFIXO_CELULAR = "celular";
    const SUFIXO_TABLET = "tablet";
    const SUFIXO_NOTEBOOK = "notebook";
    const SUFIXO_DESKTOP = "desktop";

    const SUFIXO_ALTURA_SUPER__PEQUENA = "super-pequena-v";
    const SUFIXO_ALTURA_PEQUENA = "pequena-v";
    const SUFIXO_ALTURA_MEDIA = "media-v";
    const SUFIXO_ALTURA_GRANDE = "grande-v";

    //const PREFIXO_DEBUG = "debug";

    export class NomesAtributoApresentacaoResponsivo
    {
        public Atributo: AtributoHtml;

        public readonly NomeAtributo: string;
        public readonly NomeAtributoCelular: string;
        public readonly NomeAtributoTablet: string;
        public readonly NomeAtributoNotebook: string;
        public readonly NomeAtributoDesktop: string;

        public readonly NomeAtributoAlturaSuperPequena: string;
        public readonly NomeAtributoAlturaPequena: string;
        public readonly NomeAtributoAlturaMedia: string;
        public readonly NomeAtributoAlturaGrande: string;

        public get TodosAtributos(): string[]
        {
            const telas = EnumUtil.RetornarValoresEnum(EnumTela);
            const atributos = telas.Select(x => this.RetornarNomeAtributo(x));
            atributos.Add(this.Atributo.Nome);
            return atributos;
        }
        

        public constructor(atributo: AtributoHtml)
        {
            this.Atributo = atributo;

            const nomeAtributo = atributo.Nome;
          
            this.NomeAtributo = nomeAtributo;
            this.NomeAtributoCelular = nomeAtributo +  SEPARADOR_RESPOSIVIDADE + SUFIXO_CELULAR;
            this.NomeAtributoTablet = nomeAtributo + SEPARADOR_RESPOSIVIDADE + SUFIXO_TABLET;
            this.NomeAtributoNotebook = nomeAtributo + SEPARADOR_RESPOSIVIDADE + SUFIXO_NOTEBOOK;
            this.NomeAtributoDesktop = nomeAtributo + SEPARADOR_RESPOSIVIDADE + SUFIXO_DESKTOP;

            this.NomeAtributoAlturaSuperPequena = nomeAtributo + SEPARADOR_RESPOSIVIDADE + SUFIXO_ALTURA_SUPER__PEQUENA;
            this.NomeAtributoAlturaPequena = nomeAtributo + SEPARADOR_RESPOSIVIDADE+ SUFIXO_ALTURA_PEQUENA;
            this.NomeAtributoAlturaMedia = nomeAtributo + SEPARADOR_RESPOSIVIDADE+ SUFIXO_ALTURA_MEDIA;
            this.NomeAtributoAlturaGrande = nomeAtributo + SEPARADOR_RESPOSIVIDADE + SUFIXO_ALTURA_GRANDE;

        }

        public RetornarNomeAtributo(tela: EnumTela | null): string
        {
            if (tela)
            {
                switch (tela)
                {
                    case EnumTela.Celular:

                        return this.NomeAtributoCelular;

                    case EnumTela.Tablet:

                        return this.NomeAtributoTablet;

                    case EnumTela.Notebook:

                        return this.NomeAtributoNotebook;

                    case EnumTela.Desktop:

                        return this.NomeAtributoDesktop;

                    default:
                }
            }
            return this.NomeAtributo;
        }

        public RetornarNomeAtributoAltura(telaAltura: EnumTelaAltura): string
        {
            switch (telaAltura)
            {
                case EnumTelaAltura.SuperPequena:

                    return this.NomeAtributoAlturaSuperPequena;

                case EnumTelaAltura.Pequena:

                    return this.NomeAtributoAlturaPequena;

                case EnumTelaAltura.Media:

                    return this.NomeAtributoAlturaMedia;

                case EnumTelaAltura.Grande:

                    return this.NomeAtributoAlturaGrande;

                default:

                    throw new Erro("A tela altura não é suportada");
            }
        }
    }
}
