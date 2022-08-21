//namespace Snebur.UI
//{
//    export class CorMdlUtil
//    {
//        public static RetornarEnumCoresNaoSistema(): Array<ui.EnumCor>
//        {
//            let cores = u.EnumUtil.RetornarValoresEnum<ui.EnumCor>(ui.EnumCor);
//            return cores.Where(x => !u.EnumUtil.RetornarDescricao(ui.EnumCor, x).StartsWith("Sistema")).ToList();
//        }

//        public static RetornarClasseCssCorTexto(cor: EnumCor): string
//        public static RetornarClasseCssCorTexto(cor: EnumCor, tonalidade: EnumTonalidade): string
//        public static RetornarClasseCssCorTexto(cor: EnumCor, tonalidade?: EnumTonalidade)
//        {
//            switch (cor)
//            {
//                case EnumCor.SistemaAlerta:

//                    return "mdl-color-text--orange-700";

//                case EnumCor.SistemaCancelar:

//                    return "mdl-color-text--red-700";

//                case EnumCor.SistemaConfirmacao:

//                    return "mdl-color-text--green-700";

//                case EnumCor.SistemaEditar:

//                    //return "mdl-color-text--yellow-700";
//                    return "mdl-color-text--blue-700";

//                case EnumCor.SistemaExcluir:

//                    return "mdl-color-text--red-700";

//                case EnumCor.SistemaNovo:

//                    return "mdl-color-text--green-700";

//                case EnumCor.SistemaPadrao:

//                    return "mdl-color-text--green-700";

//                case EnumCor.SistemaPrimaria:

//                    return "mdl-color-text--primary";

//                case EnumCor.SistemaSalvar:

//                    return "mdl-color-text--green-700";

//                case EnumCor.SistemaSecundaria:

//                    return "mdl-color-text--accent";

//                case EnumCor.Preto:

//                    return "mdl-color-text--black";

//                default:

//                    return CorMdlUtil.RetornarClasseCssCorTextoInterno(cor, tonalidade);
//            }
//        }


//        public static RetornarClasseCssCor(cor: EnumCor): string
//        public static RetornarClasseCssCor(cor: EnumCor, tonalidade: EnumTonalidade): string
//        public static RetornarClasseCssCor(cor: EnumCor, tonalidade?: EnumTonalidade): string
//        {
//            switch (cor)
//            {
//                case EnumCor.SistemaAlerta:

//                    return "mdl-color--orange-700";

//                case EnumCor.SistemaCancelar:

//                    return "mdl-color--red-700";

//                case EnumCor.SistemaConfirmacao:

//                    return "mdl-color--green-700";

//                case EnumCor.SistemaEditar:

//                    return "mdl-color--blue-700";
//                //return "mdl-color--yellow-700";

//                case EnumCor.SistemaExcluir:

//                    return "mdl-color--red-700";

//                case EnumCor.SistemaNovo:

//                    return "mdl-color--green-700";

//                case EnumCor.SistemaPadrao:

//                    return String.Empty;

//                case EnumCor.SistemaPrimaria:

//                    return "mdl-color--primary";

//                case EnumCor.SistemaSalvar:

//                    return "mdl-color--green-700";

//                case EnumCor.SistemaSecundaria:

//                    return "mdl-color--accent";

//                default:

//                    return CorMdlUtil.RetornarClasseCssCorInterno(cor, tonalidade);
//            }
//        }

//        private static RetornarClasseCssCorTextoInterno(cor: EnumCor): string
//        private static RetornarClasseCssCorTextoInterno(cor: EnumCor, tonalidade: EnumTonalidade): string
//        private static RetornarClasseCssCorTextoInterno(cor: EnumCor, tonalidade?: EnumTonalidade): string
//        {
//            let nomeCor = CorMdlUtil.RetornarNomeCorOriginal(cor);
//            let nomeTonalidade = CorMdlUtil.RetornarNomeTonalidadeCor(tonalidade);
//            let cssCor = "mdl-color-text--" + nomeCor;
//            if (!String.IsNullOrWhiteSpace(nomeTonalidade))
//            {
//                cssCor += "-" + nomeTonalidade;
//            }
//            return cssCor;
//        }

//        private static RetornarClasseCssCorInterno(cor: EnumCor, tonalidade: EnumTonalidade)
//        {
//            let nomeCor = CorMdlUtil.RetornarNomeCorOriginal(cor);
//            let nomeTonalidade = CorMdlUtil.RetornarNomeTonalidadeCor(tonalidade);
//            let cssCor = "mdl-color--" + nomeCor;
//            if (!String.IsNullOrWhiteSpace(nomeTonalidade))
//            {
//                cssCor += "-" + nomeTonalidade;
//            }
//            return cssCor;
//        }

//        public static RetornarNomeCorOriginal(cor: EnumCor): string
//        {
//            switch (cor)
//            {
//                case EnumCor.Amarelo:

//                    return "yellow";

//                case EnumCor.AmareloMostarda:

//                    return "amber";

//                case EnumCor.Azul:

//                    return "blue";
//                case EnumCor.AzulClaro:

//                    return "light-blue";

//                case EnumCor.AzulTurquesa:

//                    return "teal";

//                case EnumCor.Branco:

//                    return "white";

//                case EnumCor.Cinza:

//                    return "grey";

//                case EnumCor.CinzaAzulado:

//                    return "blue-grey";

//                case EnumCor.Ciano:

//                    return "cyan";

//                case EnumCor.Indigo:

//                    return "indigo";

//                case EnumCor.Laranja:

//                    return "orange";

//                case EnumCor.LaranjaEscuro:

//                    return "deep-orange";

//                case EnumCor.Marron:

//                    return "brown";

//                case EnumCor.Roxo:

//                    return "purple";

//                case EnumCor.RoxoEscuro:

//                    return "deep-purple";

//                case EnumCor.Roza:

//                    return "pink";

//                case EnumCor.Verde:

//                    return "green";

//                case EnumCor.VerdeClaro:

//                    return "light-green";

//                case EnumCor.VerdeLima:

//                    return "lime";

//                case EnumCor.Vermelho:

//                    return "red";

//                case EnumCor.Preto:

//                    return "black";

//                default:

//                    let descricao = u.EnumUtil.RetornarDescricao(EnumCor, cor);
//                    throw new ErroNaoSuportado(String.Format("A cor {0} não é suportada", descricao), this);
//            }
//        }

//        private static RetornarNomeTonalidadeCor(tonalidade: EnumTonalidade)
//        {
//            if ((!u.EnumUtil.IsDefindo(EnumTonalidade, tonalidade)) || tonalidade == EnumTonalidade.Padrao)
//            {
//                return String.Empty;
//            }
//            return u.EnumUtil.RetornarDescricao(EnumTonalidade, tonalidade);
//        }
//    }
//}