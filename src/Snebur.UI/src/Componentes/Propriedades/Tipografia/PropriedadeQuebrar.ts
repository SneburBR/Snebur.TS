namespace Snebur.UI
{
    export class PropriedadeQuebrar extends PropriedadeEnumCssClasse<EnumQuebrar>
    {
        protected override readonly PREFIXO_CSS_CLASSE: string = "ap-quebrar--";
        protected override readonly ConstrutorEnum: any = EnumQuebrar;
        protected override readonly ValorPadraoVazio: EnumQuebrar = EnumQuebrar.Vazio;

        public constructor()
        {
            super(AtributosHtml.Quebrar);
            this.IsAplicarElementoApresentacao = false;
        }

        protected RetornarSufixoCssClasseEnum(quebrar: EnumQuebrar): string
        {
            switch (quebrar)
            {
                case EnumQuebrar.Vazio:

                    return String.Empty;

                case EnumQuebrar.Quebrar:

                    return "quebrar";

                case EnumQuebrar.NaoQuebrar:

                    return "nao-quebrar";

                case EnumQuebrar.NaoQuebrarSemEllipsis:

                    return "nao-quebrar-sem-ellipsis";

                default:

                    throw new Erro("EnumQuebrar não definido ou não suportado " + quebrar);

            }
        }
    }
}
