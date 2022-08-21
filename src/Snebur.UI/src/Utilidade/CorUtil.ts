namespace Snebur.UI
{
    export class CorUtil
    {
        public static readonly COR_TRANSPARENTE = "rgba(0,0,0,0)";

        private static _coresSistema: Array<ui.EnumCor>;
        private static _cores: Array<ui.EnumCor>;
        private static _todasCores: Array<ui.EnumCor>;
        private static _dicionarioCoresSufixo: DicionarioSimples<string, number>;

        public static get CoresSistema(): Array<ui.EnumCor>
        {
            if (!CorUtil._coresSistema)
            {
                CorUtil._coresSistema = [
                    EnumCor.SistemaPadrao,
                    EnumCor.SistemaPrincipal,
                    EnumCor.SistemaSucesso,
                    EnumCor.SistemaFalha,
                    EnumCor.SistemaAlerta,
                    EnumCor.SistemaInformacao,
                    EnumCor.SistemaNovo,
                    EnumCor.SistemaSalvar,
                    EnumCor.SistemaEditar];
            }
            return CorUtil._coresSistema;
        }

        public static get Cores(): Array<ui.EnumCor>
        {
            if (!CorUtil._cores)
            {
                CorUtil._cores = new List<EnumCor>();
                CorUtil._cores = CorUtil.TodasCores.Except(CorUtil.CoresSistema);
            }
            return CorUtil._cores;
        }

        public static get TodasCores(): Array<ui.EnumCor>
        {
            if (!CorUtil._todasCores)
            {
                CorUtil._todasCores = u.EnumUtil.RetornarValoresEnum(ui.EnumCor);
            }
            return CorUtil._todasCores;
        }
        public static RetornarEnumCoresNaoSistema(): Array<ui.EnumCor>
        {
            const cores = u.EnumUtil.RetornarValoresEnum(ui.EnumCor);
            return cores.Where(x => !u.EnumUtil.RetornarDescricao(ui.EnumCor, x).StartsWith("Sistema")).ToList();
        }

        private static get DicionarioCoresSufixo(): DicionarioSimples<string, number>
        {
            if (!CorUtil._dicionarioCoresSufixo)
            {
                const dicionario = CorUtil.TodasCores.ToDicionario(x => x, x => u.EnumUtil.RetornarDescricao(EnumCor, x).trim().toLowerCase().replace("sistema", ""));
                dicionario.AtribuirItem(EnumCor.AmareloMostarda, "amarelo-mostarda");
                dicionario.AtribuirItem(EnumCor.CinzaAzulado, "cinza-azulado");
                dicionario.AtribuirItem(EnumCor.LaranjaEscuro, "laranja-escuro");
                dicionario.AtribuirItem(EnumCor.RoxoEscuro, "roxo-escuro");
                dicionario.AtribuirItem(EnumCor.RoxoClaro, "roxo-claro");
                dicionario.AtribuirItem(EnumCor.VerdeClaro, "verde-claro");
                dicionario.AtribuirItem(EnumCor.VerdeLima, "verde-lima");
                dicionario.AtribuirItem(EnumCor.AzulClaro, "azul-claro");
                CorUtil._dicionarioCoresSufixo = dicionario;
            }
            return CorUtil._dicionarioCoresSufixo;
        }

        public static RetornarNomeCor(cor: EnumCor): string
        public static RetornarNomeCor(cor: EnumCor, tonalidade: EnumTonalidade): string
        public static RetornarNomeCor(cor: EnumCor, tonalidade: EnumTonalidade = EnumTonalidade.Padrao): string
        {
            return CorUtil.RetornarNomeCorInterno(cor, tonalidade);
        }

        public static RetornarClasseCssCor(prefixo: EnumPrefixoCor, cor: EnumCor): string
        public static RetornarClasseCssCor(prefixo: EnumPrefixoCor, cor: EnumCor, tonalidade: EnumTonalidade): string
        public static RetornarClasseCssCor(prefixo: EnumPrefixoCor, cor: EnumCor, tonalidade: EnumTonalidade = EnumTonalidade.Padrao): string
        {
            return CorUtil.RetornarClasseCorInterna(prefixo, cor, tonalidade);
        }

        public static RetornarClasseCssCorFundo(cor: EnumCor): string
        public static RetornarClasseCssCorFundo(cor: EnumCor, tonalidade: EnumTonalidade): string
        public static RetornarClasseCssCorFundo(cor: EnumCor, tonalidade: EnumTonalidade = EnumTonalidade.Padrao): string
        {
            return CorUtil.RetornarClasseCorInterna(EnumPrefixoCor.CorFundo, cor, tonalidade);
        }

        public static RetornarClasseCssCorTexto(cor: EnumCor): string
        public static RetornarClasseCssCorTexto(cor: EnumCor, tonalidade: EnumTonalidade): string
        public static RetornarClasseCssCorTexto(cor: EnumCor, tonalidade: EnumTonalidade = EnumTonalidade.Padrao): string
        {
            if (cor === EnumCor.Transparente)
            {
                return EnumPrefixoCor.CorTexto + "transparente";
            }
            return CorUtil.RetornarClasseCorInterna(EnumPrefixoCor.CorTexto, cor, tonalidade);
        }

        public static RetornarClasseCssCorBorda(cor: EnumCor): string
        public static RetornarClasseCssCorBorda(cor: EnumCor, posicao: EnumPosicao, tonalidade: EnumTonalidade): string
        public static RetornarClasseCssCorBorda(cor: EnumCor, posicao: EnumPosicao = EnumPosicao.Tudo, tonalidade: EnumTonalidade = EnumTonalidade.Padrao): string
        {

            const prefixo = EnumPrefixoCor.CorBorda;
            if (posicao !== EnumPosicao.Tudo)
            {
                throw new Erro("a posição da borda não foi implementada");
            }
            if (cor === EnumCor.Transparente)
            {
                return posicao + "transparente";
            }
            return CorUtil.RetornarClasseCorInterna(prefixo, cor, tonalidade);
        }

        public static RetornarClasseCssCorIcone(cor: EnumCor): string
        public static RetornarClasseCssCorIcone(cor: EnumCor, tonalidade: EnumTonalidade): string
        public static RetornarClasseCssCorIcone(cor: EnumCor, tonalidade?: EnumTonalidade): string
        {
            if (cor === EnumCor.Transparente)
            {
                return EnumPrefixoCor.CorIcone + "transparente";
            }
            return CorUtil.RetornarClasseCorInterna(EnumPrefixoCor.CorIcone, cor, tonalidade);
        }

        public static RetornarCorHtml(cor: EnumCor): string
        public static RetornarCorHtml(cor: EnumCor, tonalidade: EnumTonalidade): string
        public static RetornarCorHtml(cor: EnumCor, tonalidade?: EnumTonalidade): string
        {
            if (cor === EnumCor.Transparente ||
                cor === EnumCor.Vazio)
            {
                return CorUtil.COR_TRANSPARENTE;
            }

            let nomeCor = this.RetornarNomeCorInterno(cor, tonalidade);
            nomeCor = nomeCor.ReplaceAll("-", "_");
            const corHtml = this.ObjetoTodasCores[nomeCor];
            if (String.IsNullOrEmpty(corHtml))
            {
                throw new Erro(`A cor ${corHtml} não foi encontrado no objeto todas as cores`);
            }
            return corHtml;
        }

        private static RetornarClasseCorInterna(prefixo: EnumPrefixoCor, cor: EnumCor, tonalidade: EnumTonalidade): string
        {
            const nomeCor = this.RetornarNomeCorInterno(cor, tonalidade);
            return prefixo + nomeCor;
        }

        private static RetornarNomeCorInterno(cor: EnumCor): string
        private static RetornarNomeCorInterno(cor: EnumCor, tonalidade: EnumTonalidade): string
        private static RetornarNomeCorInterno(cor: EnumCor, tonalidade?: EnumTonalidade): string
        {
            const sufixoCor = CorUtil.DicionarioCoresSufixo.Item(cor);
            const sufixoTonalidade = CorUtil.RetornarSufixoTonalidade(tonalidade);
            return sufixoCor + sufixoTonalidade;
        }

        private static RetornarSufixoTonalidade(tonalidade: EnumTonalidade): string
        private static RetornarSufixoTonalidade(tonalidade: EnumTonalidade = EnumTonalidade.Padrao): string
        {
            if (tonalidade === EnumTonalidade.Padrao || tonalidade == null)
            {
                return String.Empty;
            }
            if (tonalidade < 100)
            {
                return "-alpha-" + tonalidade.toString();
            }
            return "-" + tonalidade.toString();
        }

        private static readonly ObjetoTodasCores: any = {
            cinza: "#9e9e9e",
            cinza_100: "#f8f8f8",
            cinza_200: "#e9e9e9",
            cinza_300: "#dedede",
            cinza_400: "#cccccc",
            cinza_500: "#aaa",
            cinza_600: "#999",
            cinza_700: "#666",
            cinza_800: "#444",
            cinza_900: "#222",
            cinza_alpha_10: "rgba(158, 158, 158, 0.1)",
            cinza_alpha_20: "rgba(158, 158, 158, 0.2)",
            cinza_alpha_30: "rgba(158, 158, 158, 0.3)",
            cinza_alpha_40: "rgba(158, 158, 158, 0.4)",
            cinza_alpha_50: "rgba(158, 158, 158, 0.5)",
            cinza_alpha_60: "rgba(158, 158, 158, 0.6)",
            cinza_alpha_70: "rgba(158, 158, 158, 0.7)",
            cinza_alpha_80: "rgba(158, 158, 158, 0.8)",
            cinza_alpha_90: "rgba(158, 158, 158, 0.9)",
            padrao: "#e9e9e9",
            padrao_100: "#f7f7f7",
            padrao_200: "#f4f4f4",
            padrao_300: "#f0f0f0",
            padrao_400: "#ededed",
            padrao_500: "#e9e9e9",
            padrao_600: "#c4c4c4",
            padrao_700: "#9e9e9e",
            padrao_800: "#797979",
            padrao_900: "#545454",
            padrao_alpha_10: "rgba(233, 233, 233, 0.1)",
            padrao_alpha_20: "rgba(233, 233, 233, 0.2)",
            padrao_alpha_30: "rgba(233, 233, 233, 0.3)",
            padrao_alpha_40: "rgba(233, 233, 233, 0.4)",
            padrao_alpha_50: "rgba(233, 233, 233, 0.5)",
            padrao_alpha_60: "rgba(233, 233, 233, 0.6)",
            padrao_alpha_70: "rgba(233, 233, 233, 0.7)",
            padrao_alpha_80: "rgba(233, 233, 233, 0.8)",
            padrao_alpha_90: "rgba(233, 233, 233, 0.9)",
            principal: "#673ab7",
            principal_100: "#c8b8e5",
            principal_200: "#b099da",
            principal_300: "#9879ce",
            principal_400: "#7f5ac3",
            principal_500: "#673ab7",
            principal_600: "#57319a",
            principal_700: "#46277c",
            principal_800: "#361e5f",
            principal_900: "#251542",
            principal_alpha_10: "rgba(103, 58, 183, 0.1)",
            principal_alpha_20: "rgba(103, 58, 183, 0.2)",
            principal_alpha_30: "rgba(103, 58, 183, 0.3)",
            principal_alpha_40: "rgba(103, 58, 183, 0.4)",
            principal_alpha_50: "rgba(103, 58, 183, 0.5)",
            principal_alpha_60: "rgba(103, 58, 183, 0.6)",
            principal_alpha_70: "rgba(103, 58, 183, 0.7)",
            principal_alpha_80: "rgba(103, 58, 183, 0.8)",
            principal_alpha_90: "rgba(103, 58, 183, 0.9)",
            secundaria: "#009688",
            secundaria_100: "#a3d9d4",
            secundaria_200: "#7ac8c1",
            secundaria_300: "#52b8ae",
            secundaria_400: "#29a79b",
            secundaria_500: "#009688",
            secundaria_600: "#007e72",
            secundaria_700: "#00665c",
            secundaria_800: "#004e47",
            secundaria_900: "#003631",
            secundaria_alpha_10: "rgba(0, 150, 136, 0.1)",
            secundaria_alpha_20: "rgba(0, 150, 136, 0.2)",
            secundaria_alpha_30: "rgba(0, 150, 136, 0.3)",
            secundaria_alpha_40: "rgba(0, 150, 136, 0.4)",
            secundaria_alpha_50: "rgba(0, 150, 136, 0.5)",
            secundaria_alpha_60: "rgba(0, 150, 136, 0.6)",
            secundaria_alpha_70: "rgba(0, 150, 136, 0.7)",
            secundaria_alpha_80: "rgba(0, 150, 136, 0.8)",
            secundaria_alpha_90: "rgba(0, 150, 136, 0.9)",
            sucesso: "#4caf50",
            sucesso_100: "#bfe2c0",
            sucesso_200: "#a2d5a4",
            sucesso_300: "#85c988",
            sucesso_400: "#69bc6c",
            sucesso_500: "#4caf50",
            sucesso_600: "#409343",
            sucesso_700: "#347736",
            sucesso_800: "#285b2a",
            sucesso_900: "#1b3f1d",
            sucesso_alpha_10: "rgba(76, 175, 80, 0.1)",
            sucesso_alpha_20: "rgba(76, 175, 80, 0.2)",
            sucesso_alpha_30: "rgba(76, 175, 80, 0.3)",
            sucesso_alpha_40: "rgba(76, 175, 80, 0.4)",
            sucesso_alpha_50: "rgba(76, 175, 80, 0.5)",
            sucesso_alpha_60: "rgba(76, 175, 80, 0.6)",
            sucesso_alpha_70: "rgba(76, 175, 80, 0.7)",
            sucesso_alpha_80: "rgba(76, 175, 80, 0.8)",
            sucesso_alpha_90: "rgba(76, 175, 80, 0.9)",
            falha: "#e53935",
            falha_100: "#f6b8b6",
            falha_200: "#f19896",
            falha_300: "#ed7876",
            falha_400: "#e95955",
            falha_500: "#e53935",
            falha_600: "#c0302d",
            falha_700: "#9c2724",
            falha_800: "#771e1c",
            falha_900: "#521513",
            falha_alpha_10: "rgba(229, 57, 53, 0.1)",
            falha_alpha_20: "rgba(229, 57, 53, 0.2)",
            falha_alpha_30: "rgba(229, 57, 53, 0.3)",
            falha_alpha_40: "rgba(229, 57, 53, 0.4)",
            falha_alpha_50: "rgba(229, 57, 53, 0.5)",
            falha_alpha_60: "rgba(229, 57, 53, 0.6)",
            falha_alpha_70: "rgba(229, 57, 53, 0.7)",
            falha_alpha_80: "rgba(229, 57, 53, 0.8)",
            falha_alpha_90: "rgba(229, 57, 53, 0.9)",
            alerta: "#ff9800",
            alerta_100: "#ffdaa3",
            alerta_200: "#ffc97a",
            alerta_300: "#ffb952",
            alerta_400: "#ffa829",
            alerta_500: "#ff9800",
            alerta_600: "#d68000",
            alerta_700: "#ad6700",
            alerta_800: "#854f00",
            alerta_900: "#5c3700",
            alerta_alpha_10: "rgba(255, 152, 0, 0.1)",
            alerta_alpha_20: "rgba(255, 152, 0, 0.2)",
            alerta_alpha_30: "rgba(255, 152, 0, 0.3)",
            alerta_alpha_40: "rgba(255, 152, 0, 0.4)",
            alerta_alpha_50: "rgba(255, 152, 0, 0.5)",
            alerta_alpha_60: "rgba(255, 152, 0, 0.6)",
            alerta_alpha_70: "rgba(255, 152, 0, 0.7)",
            alerta_alpha_80: "rgba(255, 152, 0, 0.8)",
            alerta_alpha_90: "rgba(255, 152, 0, 0.9)",
            informacao: "#00bcd4",
            informacao_100: "#a3e7f0",
            informacao_200: "#7adce9",
            informacao_300: "#52d1e2",
            informacao_400: "#29c7db",
            informacao_500: "#00bcd4",
            informacao_600: "#009eb2",
            informacao_700: "#008090",
            informacao_800: "#00626e",
            informacao_900: "#00444c",
            informacao_alpha_10: "rgba(0, 188, 212, 0.1)",
            informacao_alpha_20: "rgba(0, 188, 212, 0.2)",
            informacao_alpha_30: "rgba(0, 188, 212, 0.3)",
            informacao_alpha_40: "rgba(0, 188, 212, 0.4)",
            informacao_alpha_50: "rgba(0, 188, 212, 0.5)",
            informacao_alpha_60: "rgba(0, 188, 212, 0.6)",
            informacao_alpha_70: "rgba(0, 188, 212, 0.7)",
            informacao_alpha_80: "rgba(0, 188, 212, 0.8)",
            informacao_alpha_90: "rgba(0, 188, 212, 0.9)",
            editar: "#3f51b5",
            editar_100: "#bac0e4",
            editar_200: "#9ba5d9",
            editar_300: "#7c89cd",
            editar_400: "#5e6dc1",
            editar_500: "#3f51b5",
            editar_600: "#354498",
            editar_700: "#2b377b",
            editar_800: "#212a5e",
            editar_900: "#171d41",
            editar_alpha_10: "rgba(63, 81, 181, 0.1)",
            editar_alpha_20: "rgba(63, 81, 181, 0.2)",
            editar_alpha_30: "rgba(63, 81, 181, 0.3)",
            editar_alpha_40: "rgba(63, 81, 181, 0.4)",
            editar_alpha_50: "rgba(63, 81, 181, 0.5)",
            editar_alpha_60: "rgba(63, 81, 181, 0.6)",
            editar_alpha_70: "rgba(63, 81, 181, 0.7)",
            editar_alpha_80: "rgba(63, 81, 181, 0.8)",
            editar_alpha_90: "rgba(63, 81, 181, 0.9)",
            novo: "#4caf50",
            novo_100: "#bfe2c0",
            novo_200: "#a2d5a4",
            novo_300: "#85c988",
            novo_400: "#69bc6c",
            novo_500: "#4caf50",
            novo_600: "#409343",
            novo_700: "#347736",
            novo_800: "#285b2a",
            novo_900: "#1b3f1d",
            novo_alpha_10: "rgba(76, 175, 80, 0.1)",
            novo_alpha_20: "rgba(76, 175, 80, 0.2)",
            novo_alpha_30: "rgba(76, 175, 80, 0.3)",
            novo_alpha_40: "rgba(76, 175, 80, 0.4)",
            novo_alpha_50: "rgba(76, 175, 80, 0.5)",
            novo_alpha_60: "rgba(76, 175, 80, 0.6)",
            novo_alpha_70: "rgba(76, 175, 80, 0.7)",
            novo_alpha_80: "rgba(76, 175, 80, 0.8)",
            novo_alpha_90: "rgba(76, 175, 80, 0.9)",
            excluir: "#e53935",
            excluir_100: "#f6b8b6",
            excluir_200: "#f19896",
            excluir_300: "#ed7876",
            excluir_400: "#e95955",
            excluir_500: "#e53935",
            excluir_600: "#c0302d",
            excluir_700: "#9c2724",
            excluir_800: "#771e1c",
            excluir_900: "#521513",
            excluir_alpha_10: "rgba(229, 57, 53, 0.1)",
            excluir_alpha_20: "rgba(229, 57, 53, 0.2)",
            excluir_alpha_30: "rgba(229, 57, 53, 0.3)",
            excluir_alpha_40: "rgba(229, 57, 53, 0.4)",
            excluir_alpha_50: "rgba(229, 57, 53, 0.5)",
            excluir_alpha_60: "rgba(229, 57, 53, 0.6)",
            excluir_alpha_70: "rgba(229, 57, 53, 0.7)",
            excluir_alpha_80: "rgba(229, 57, 53, 0.8)",
            excluir_alpha_90: "rgba(229, 57, 53, 0.9)",
            cancelar: "#e53935",
            cancelar_100: "#f6b8b6",
            cancelar_200: "#f19896",
            cancelar_300: "#ed7876",
            cancelar_400: "#e95955",
            cancelar_500: "#e53935",
            cancelar_600: "#c0302d",
            cancelar_700: "#9c2724",
            cancelar_800: "#771e1c",
            cancelar_900: "#521513",
            cancelar_alpha_10: "rgba(229, 57, 53, 0.1)",
            cancelar_alpha_20: "rgba(229, 57, 53, 0.2)",
            cancelar_alpha_30: "rgba(229, 57, 53, 0.3)",
            cancelar_alpha_40: "rgba(229, 57, 53, 0.4)",
            cancelar_alpha_50: "rgba(229, 57, 53, 0.5)",
            cancelar_alpha_60: "rgba(229, 57, 53, 0.6)",
            cancelar_alpha_70: "rgba(229, 57, 53, 0.7)",
            cancelar_alpha_80: "rgba(229, 57, 53, 0.8)",
            cancelar_alpha_90: "rgba(229, 57, 53, 0.9)",
            salvar: "#4caf50",
            salvar_100: "#bfe2c0",
            salvar_200: "#a2d5a4",
            salvar_300: "#85c988",
            salvar_400: "#69bc6c",
            salvar_500: "#4caf50",
            salvar_600: "#409343",
            salvar_700: "#347736",
            salvar_800: "#285b2a",
            salvar_900: "#1b3f1d",
            salvar_alpha_10: "rgba(76, 175, 80, 0.1)",
            salvar_alpha_20: "rgba(76, 175, 80, 0.2)",
            salvar_alpha_30: "rgba(76, 175, 80, 0.3)",
            salvar_alpha_40: "rgba(76, 175, 80, 0.4)",
            salvar_alpha_50: "rgba(76, 175, 80, 0.5)",
            salvar_alpha_60: "rgba(76, 175, 80, 0.6)",
            salvar_alpha_70: "rgba(76, 175, 80, 0.7)",
            salvar_alpha_80: "rgba(76, 175, 80, 0.8)",
            salvar_alpha_90: "rgba(76, 175, 80, 0.9)",
            branca: "#ffffff",
            branca_100: "white",
            branca_200: "white",
            branca_300: "white",
            branca_400: "white",
            branca_500: "white",
            branca_600: "#d6d6d6",
            branca_700: "#adadad",
            branca_800: "#858585",
            branca_900: "#5c5c5c",
            branca_alpha_10: "rgba(255, 255, 255, 0.1)",
            branca_alpha_20: "rgba(255, 255, 255, 0.2)",
            branca_alpha_30: "rgba(255, 255, 255, 0.3)",
            branca_alpha_40: "rgba(255, 255, 255, 0.4)",
            branca_alpha_50: "rgba(255, 255, 255, 0.5)",
            branca_alpha_60: "rgba(255, 255, 255, 0.6)",
            branca_alpha_70: "rgba(255, 255, 255, 0.7)",
            branca_alpha_80: "rgba(255, 255, 255, 0.8)",
            branca_alpha_90: "rgba(255, 255, 255, 0.9)",
            preta: "#000000",
            preta_100: "#a3a3a3",
            preta_200: "#7a7a7a",
            preta_300: "#525252",
            preta_400: "#292929",
            preta_500: "black",
            preta_600: "black",
            preta_700: "black",
            preta_800: "black",
            preta_900: "black",
            preta_alpha_10: "rgba(0, 0, 0, 0.1)",
            preta_alpha_20: "rgba(0, 0, 0, 0.2)",
            preta_alpha_30: "rgba(0, 0, 0, 0.3)",
            preta_alpha_40: "rgba(0, 0, 0, 0.4)",
            preta_alpha_50: "rgba(0, 0, 0, 0.5)",
            preta_alpha_60: "rgba(0, 0, 0, 0.6)",
            preta_alpha_70: "rgba(0, 0, 0, 0.7)",
            preta_alpha_80: "rgba(0, 0, 0, 0.8)",
            preta_alpha_90: "rgba(0, 0, 0, 0.9)",
            vermelha: "#e53935",
            vermelha_100: "#f6b8b6",
            vermelha_200: "#f19896",
            vermelha_300: "#ed7876",
            vermelha_400: "#e95955",
            vermelha_500: "#e53935",
            vermelha_600: "#c0302d",
            vermelha_700: "#9c2724",
            vermelha_800: "#771e1c",
            vermelha_900: "#521513",
            vermelha_alpha_10: "rgba(229, 57, 53, 0.1)",
            vermelha_alpha_20: "rgba(229, 57, 53, 0.2)",
            vermelha_alpha_30: "rgba(229, 57, 53, 0.3)",
            vermelha_alpha_40: "rgba(229, 57, 53, 0.4)",
            vermelha_alpha_50: "rgba(229, 57, 53, 0.5)",
            vermelha_alpha_60: "rgba(229, 57, 53, 0.6)",
            vermelha_alpha_70: "rgba(229, 57, 53, 0.7)",
            vermelha_alpha_80: "rgba(229, 57, 53, 0.8)",
            vermelha_alpha_90: "rgba(229, 57, 53, 0.9)",
            vermelho_clara: "#e53935",
            vermelho_clara_100: "#f6b8b6",
            vermelho_clara_200: "#f19896",
            vermelho_clara_300: "#ed7876",
            vermelho_clara_400: "#e95955",
            vermelho_clara_500: "#e53935",
            vermelho_clara_600: "#c0302d",
            vermelho_clara_700: "#9c2724",
            vermelho_clara_800: "#771e1c",
            vermelho_clara_900: "#521513",
            vermelho_clara_alpha_10: "rgba(229, 57, 53, 0.1)",
            vermelho_clara_alpha_20: "rgba(229, 57, 53, 0.2)",
            vermelho_clara_alpha_30: "rgba(229, 57, 53, 0.3)",
            vermelho_clara_alpha_40: "rgba(229, 57, 53, 0.4)",
            vermelho_clara_alpha_50: "rgba(229, 57, 53, 0.5)",
            vermelho_clara_alpha_60: "rgba(229, 57, 53, 0.6)",
            vermelho_clara_alpha_70: "rgba(229, 57, 53, 0.7)",
            vermelho_clara_alpha_80: "rgba(229, 57, 53, 0.8)",
            vermelho_clara_alpha_90: "rgba(229, 57, 53, 0.9)",
            vermelho_escuro: "#e53935",
            vermelho_escuro_100: "#f6b8b6",
            vermelho_escuro_200: "#f19896",
            vermelho_escuro_300: "#ed7876",
            vermelho_escuro_400: "#e95955",
            vermelho_escuro_500: "#e53935",
            vermelho_escuro_600: "#c0302d",
            vermelho_escuro_700: "#9c2724",
            vermelho_escuro_800: "#771e1c",
            vermelho_escuro_900: "#521513",
            vermelho_escuro_alpha_10: "rgba(229, 57, 53, 0.1)",
            vermelho_escuro_alpha_20: "rgba(229, 57, 53, 0.2)",
            vermelho_escuro_alpha_30: "rgba(229, 57, 53, 0.3)",
            vermelho_escuro_alpha_40: "rgba(229, 57, 53, 0.4)",
            vermelho_escuro_alpha_50: "rgba(229, 57, 53, 0.5)",
            vermelho_escuro_alpha_60: "rgba(229, 57, 53, 0.6)",
            vermelho_escuro_alpha_70: "rgba(229, 57, 53, 0.7)",
            vermelho_escuro_alpha_80: "rgba(229, 57, 53, 0.8)",
            vermelho_escuro_alpha_90: "rgba(229, 57, 53, 0.9)",
            rosa: "#e91e63",
            rosa_100: "#f7aec7",
            rosa_200: "#f48aae",
            rosa_300: "#f06695",
            rosa_400: "#ed427c",
            rosa_500: "#e91e63",
            rosa_600: "#c41953",
            rosa_700: "#9e1443",
            rosa_800: "#791033",
            rosa_900: "#540b24",
            rosa_alpha_10: "rgba(233, 30, 99, 0.1)",
            rosa_alpha_20: "rgba(233, 30, 99, 0.2)",
            rosa_alpha_30: "rgba(233, 30, 99, 0.3)",
            rosa_alpha_40: "rgba(233, 30, 99, 0.4)",
            rosa_alpha_50: "rgba(233, 30, 99, 0.5)",
            rosa_alpha_60: "rgba(233, 30, 99, 0.6)",
            rosa_alpha_70: "rgba(233, 30, 99, 0.7)",
            rosa_alpha_80: "rgba(233, 30, 99, 0.8)",
            rosa_alpha_90: "rgba(233, 30, 99, 0.9)",
            roxo: "#9c27b0",
            roxo_100: "#dbb1e3",
            roxo_200: "#cc8fd6",
            roxo_300: "#bc6cc9",
            roxo_400: "#ac4abd",
            roxo_500: "#9c27b0",
            roxo_600: "#832194",
            roxo_700: "#6a1b78",
            roxo_800: "#51145c",
            roxo_900: "#380e3f",
            roxo_alpha_10: "rgba(156, 39, 176, 0.1)",
            roxo_alpha_20: "rgba(156, 39, 176, 0.2)",
            roxo_alpha_30: "rgba(156, 39, 176, 0.3)",
            roxo_alpha_40: "rgba(156, 39, 176, 0.4)",
            roxo_alpha_50: "rgba(156, 39, 176, 0.5)",
            roxo_alpha_60: "rgba(156, 39, 176, 0.6)",
            roxo_alpha_70: "rgba(156, 39, 176, 0.7)",
            roxo_alpha_80: "rgba(156, 39, 176, 0.8)",
            roxo_alpha_90: "rgba(156, 39, 176, 0.9)",
            roxo_escuro: "#673ab7",
            roxo_escuro_100: "#c8b8e5",
            roxo_escuro_200: "#b099da",
            roxo_escuro_300: "#9879ce",
            roxo_escuro_400: "#7f5ac3",
            roxo_escuro_500: "#673ab7",
            roxo_escuro_600: "#57319a",
            roxo_escuro_700: "#46277c",
            roxo_escuro_800: "#361e5f",
            roxo_escuro_900: "#251542",
            roxo_escuro_alpha_10: "rgba(103, 58, 183, 0.1)",
            roxo_escuro_alpha_20: "rgba(103, 58, 183, 0.2)",
            roxo_escuro_alpha_30: "rgba(103, 58, 183, 0.3)",
            roxo_escuro_alpha_40: "rgba(103, 58, 183, 0.4)",
            roxo_escuro_alpha_50: "rgba(103, 58, 183, 0.5)",
            roxo_escuro_alpha_60: "rgba(103, 58, 183, 0.6)",
            roxo_escuro_alpha_70: "rgba(103, 58, 183, 0.7)",
            roxo_escuro_alpha_80: "rgba(103, 58, 183, 0.8)",
            roxo_escuro_alpha_90: "rgba(103, 58, 183, 0.9)",
            roxo_claro: "#ba69c8",
            roxo_claro_100: "#e6c9eb",
            roxo_claro_200: "#dbb1e2",
            roxo_claro_300: "#d099da",
            roxo_claro_400: "#c581d1",
            roxo_claro_500: "#ba69c8",
            roxo_claro_600: "#9c58a8",
            roxo_claro_700: "#7e4788",
            roxo_claro_800: "#613768",
            roxo_claro_900: "#432648",
            roxo_claro_alpha_10: "rgba(186, 105, 200, 0.1)",
            roxo_claro_alpha_20: "rgba(186, 105, 200, 0.2)",
            roxo_claro_alpha_30: "rgba(186, 105, 200, 0.3)",
            roxo_claro_alpha_40: "rgba(186, 105, 200, 0.4)",
            roxo_claro_alpha_50: "rgba(186, 105, 200, 0.5)",
            roxo_claro_alpha_60: "rgba(186, 105, 200, 0.6)",
            roxo_claro_alpha_70: "rgba(186, 105, 200, 0.7)",
            roxo_claro_alpha_80: "rgba(186, 105, 200, 0.8)",
            roxo_claro_alpha_90: "rgba(186, 105, 200, 0.9)",
            indigo: "#3f51b5",
            indigo_100: "#bac0e4",
            indigo_200: "#9ba5d9",
            indigo_300: "#7c89cd",
            indigo_400: "#5e6dc1",
            indigo_500: "#3f51b5",
            indigo_600: "#354498",
            indigo_700: "#2b377b",
            indigo_800: "#212a5e",
            indigo_900: "#171d41",
            indigo_alpha_10: "rgba(63, 81, 181, 0.1)",
            indigo_alpha_20: "rgba(63, 81, 181, 0.2)",
            indigo_alpha_30: "rgba(63, 81, 181, 0.3)",
            indigo_alpha_40: "rgba(63, 81, 181, 0.4)",
            indigo_alpha_50: "rgba(63, 81, 181, 0.5)",
            indigo_alpha_60: "rgba(63, 81, 181, 0.6)",
            indigo_alpha_70: "rgba(63, 81, 181, 0.7)",
            indigo_alpha_80: "rgba(63, 81, 181, 0.8)",
            indigo_alpha_90: "rgba(63, 81, 181, 0.9)",
            indigo_claro: "#7986cc",
            indigo_claro_100: "#cfd3ed",
            indigo_claro_200: "#b9c0e4",
            indigo_claro_300: "#a4addc",
            indigo_claro_400: "#8e99d4",
            indigo_claro_500: "#7986cc",
            indigo_claro_600: "#6671ab",
            indigo_claro_700: "#525b8b",
            indigo_claro_800: "#3f466a",
            indigo_claro_900: "#2c3049",
            indigo_claro_alpha_10: "rgba(121, 134, 204, 0.1)",
            indigo_claro_alpha_20: "rgba(121, 134, 204, 0.2)",
            indigo_claro_alpha_30: "rgba(121, 134, 204, 0.3)",
            indigo_claro_alpha_40: "rgba(121, 134, 204, 0.4)",
            indigo_claro_alpha_50: "rgba(121, 134, 204, 0.5)",
            indigo_claro_alpha_60: "rgba(121, 134, 204, 0.6)",
            indigo_claro_alpha_70: "rgba(121, 134, 204, 0.7)",
            indigo_claro_alpha_80: "rgba(121, 134, 204, 0.8)",
            indigo_claro_alpha_90: "rgba(121, 134, 204, 0.9)",
            indigo_escuro: "#5b6499",
            indigo_escuro_100: "#c4c7da",
            indigo_escuro_200: "#aaaeca",
            indigo_escuro_300: "#8f96ba",
            indigo_escuro_400: "#757da9",
            indigo_escuro_500: "#5b6499",
            indigo_escuro_600: "#4c5481",
            indigo_escuro_700: "#3e4468",
            indigo_escuro_800: "#2f3450",
            indigo_escuro_900: "#212437",
            indigo_escuro_alpha_10: "rgba(91, 100, 153, 0.1)",
            indigo_escuro_alpha_20: "rgba(91, 100, 153, 0.2)",
            indigo_escuro_alpha_30: "rgba(91, 100, 153, 0.3)",
            indigo_escuro_alpha_40: "rgba(91, 100, 153, 0.4)",
            indigo_escuro_alpha_50: "rgba(91, 100, 153, 0.5)",
            indigo_escuro_alpha_60: "rgba(91, 100, 153, 0.6)",
            indigo_escuro_alpha_70: "rgba(91, 100, 153, 0.7)",
            indigo_escuro_alpha_80: "rgba(91, 100, 153, 0.8)",
            indigo_escuro_alpha_90: "rgba(91, 100, 153, 0.9)",
            azul: "#2196f3",
            azul_100: "#afd9fb",
            azul_200: "#8cc8f9",
            azul_300: "#68b8f7",
            azul_400: "#45a7f5",
            azul_500: "#2196f3",
            azul_600: "#1c7ecc",
            azul_700: "#1666a5",
            azul_800: "#114e7e",
            azul_900: "#0c3657",
            azul_alpha_10: "rgba(33, 150, 243, 0.1)",
            azul_alpha_20: "rgba(33, 150, 243, 0.2)",
            azul_alpha_30: "rgba(33, 150, 243, 0.3)",
            azul_alpha_40: "rgba(33, 150, 243, 0.4)",
            azul_alpha_50: "rgba(33, 150, 243, 0.5)",
            azul_alpha_60: "rgba(33, 150, 243, 0.6)",
            azul_alpha_70: "rgba(33, 150, 243, 0.7)",
            azul_alpha_80: "rgba(33, 150, 243, 0.8)",
            azul_alpha_90: "rgba(33, 150, 243, 0.9)",
            azul_claro: "#03a9f4",
            azul_claro_100: "#a4e0fb",
            azul_claro_200: "#7cd2f9",
            azul_claro_300: "#54c5f8",
            azul_claro_400: "#2bb7f6",
            azul_claro_500: "#03a9f4",
            azul_claro_600: "#038ecd",
            azul_claro_700: "#0273a6",
            azul_claro_800: "#02587f",
            azul_claro_900: "#013d58",
            azul_claro_alpha_10: "rgba(3, 169, 244, 0.1)",
            azul_claro_alpha_20: "rgba(3, 169, 244, 0.2)",
            azul_claro_alpha_30: "rgba(3, 169, 244, 0.3)",
            azul_claro_alpha_40: "rgba(3, 169, 244, 0.4)",
            azul_claro_alpha_50: "rgba(3, 169, 244, 0.5)",
            azul_claro_alpha_60: "rgba(3, 169, 244, 0.6)",
            azul_claro_alpha_70: "rgba(3, 169, 244, 0.7)",
            azul_claro_alpha_80: "rgba(3, 169, 244, 0.8)",
            azul_claro_alpha_90: "rgba(3, 169, 244, 0.9)",
            ciano: "#00bcd4",
            ciano_100: "#a3e7f0",
            ciano_200: "#7adce9",
            ciano_300: "#52d1e2",
            ciano_400: "#29c7db",
            ciano_500: "#00bcd4",
            ciano_600: "#009eb2",
            ciano_700: "#008090",
            ciano_800: "#00626e",
            ciano_900: "#00444c",
            ciano_alpha_10: "rgba(0, 188, 212, 0.1)",
            ciano_alpha_20: "rgba(0, 188, 212, 0.2)",
            ciano_alpha_30: "rgba(0, 188, 212, 0.3)",
            ciano_alpha_40: "rgba(0, 188, 212, 0.4)",
            ciano_alpha_50: "rgba(0, 188, 212, 0.5)",
            ciano_alpha_60: "rgba(0, 188, 212, 0.6)",
            ciano_alpha_70: "rgba(0, 188, 212, 0.7)",
            ciano_alpha_80: "rgba(0, 188, 212, 0.8)",
            ciano_alpha_90: "rgba(0, 188, 212, 0.9)",
            turquesa: "#009688",
            turquesa_100: "#a3d9d4",
            turquesa_200: "#7ac8c1",
            turquesa_300: "#52b8ae",
            turquesa_400: "#29a79b",
            turquesa_500: "#009688",
            turquesa_600: "#007e72",
            turquesa_700: "#00665c",
            turquesa_800: "#004e47",
            turquesa_900: "#003631",
            turquesa_alpha_10: "rgba(0, 150, 136, 0.1)",
            turquesa_alpha_20: "rgba(0, 150, 136, 0.2)",
            turquesa_alpha_30: "rgba(0, 150, 136, 0.3)",
            turquesa_alpha_40: "rgba(0, 150, 136, 0.4)",
            turquesa_alpha_50: "rgba(0, 150, 136, 0.5)",
            turquesa_alpha_60: "rgba(0, 150, 136, 0.6)",
            turquesa_alpha_70: "rgba(0, 150, 136, 0.7)",
            turquesa_alpha_80: "rgba(0, 150, 136, 0.8)",
            turquesa_alpha_90: "rgba(0, 150, 136, 0.9)",
            verde: "#4caf50",
            verde_100: "#bfe2c0",
            verde_200: "#a2d5a4",
            verde_300: "#85c988",
            verde_400: "#69bc6c",
            verde_500: "#4caf50",
            verde_600: "#409343",
            verde_700: "#347736",
            verde_800: "#285b2a",
            verde_900: "#1b3f1d",
            verde_alpha_10: "rgba(76, 175, 80, 0.1)",
            verde_alpha_20: "rgba(76, 175, 80, 0.2)",
            verde_alpha_30: "rgba(76, 175, 80, 0.3)",
            verde_alpha_40: "rgba(76, 175, 80, 0.4)",
            verde_alpha_50: "rgba(76, 175, 80, 0.5)",
            verde_alpha_60: "rgba(76, 175, 80, 0.6)",
            verde_alpha_70: "rgba(76, 175, 80, 0.7)",
            verde_alpha_80: "rgba(76, 175, 80, 0.8)",
            verde_alpha_90: "rgba(76, 175, 80, 0.9)",
            verde_claro: "#8bc34a",
            verde_claro_100: "#d5e9be",
            verde_claro_200: "#c3e0a1",
            verde_claro_300: "#b0d684",
            verde_claro_400: "#9ecd67",
            verde_claro_500: "#8bc34a",
            verde_claro_600: "#75a43e",
            verde_claro_700: "#5f8532",
            verde_claro_800: "#486526",
            verde_claro_900: "#32461b",
            verde_claro_alpha_10: "rgba(139, 195, 74, 0.1)",
            verde_claro_alpha_20: "rgba(139, 195, 74, 0.2)",
            verde_claro_alpha_30: "rgba(139, 195, 74, 0.3)",
            verde_claro_alpha_40: "rgba(139, 195, 74, 0.4)",
            verde_claro_alpha_50: "rgba(139, 195, 74, 0.5)",
            verde_claro_alpha_60: "rgba(139, 195, 74, 0.6)",
            verde_claro_alpha_70: "rgba(139, 195, 74, 0.7)",
            verde_claro_alpha_80: "rgba(139, 195, 74, 0.8)",
            verde_claro_alpha_90: "rgba(139, 195, 74, 0.9)",
            verde_lima: "#cddc39",
            verde_lima_100: "#edf2b8",
            verde_lima_200: "#e5ed98",
            verde_lima_300: "#dde778",
            verde_lima_400: "#d5e259",
            verde_lima_500: "#cddc39",
            verde_lima_600: "#acb930",
            verde_lima_700: "#8b9627",
            verde_lima_800: "#6b721e",
            verde_lima_900: "#4a4f15",
            verde_lima_alpha_10: "rgba(205, 220, 57, 0.1)",
            verde_lima_alpha_20: "rgba(205, 220, 57, 0.2)",
            verde_lima_alpha_30: "rgba(205, 220, 57, 0.3)",
            verde_lima_alpha_40: "rgba(205, 220, 57, 0.4)",
            verde_lima_alpha_50: "rgba(205, 220, 57, 0.5)",
            verde_lima_alpha_60: "rgba(205, 220, 57, 0.6)",
            verde_lima_alpha_70: "rgba(205, 220, 57, 0.7)",
            verde_lima_alpha_80: "rgba(205, 220, 57, 0.8)",
            verde_lima_alpha_90: "rgba(205, 220, 57, 0.9)",
            amarelo: "#ffeb3b",
            amarelo_100: "#fff8b8",
            amarelo_200: "#fff599",
            amarelo_300: "#fff17a",
            amarelo_400: "#ffee5a",
            amarelo_500: "#ffeb3b",
            amarelo_600: "#d6c532",
            amarelo_700: "#ada028",
            amarelo_800: "#857a1f",
            amarelo_900: "#5c5515",
            amarelo_alpha_10: "rgba(255, 235, 59, 0.1)",
            amarelo_alpha_20: "rgba(255, 235, 59, 0.2)",
            amarelo_alpha_30: "rgba(255, 235, 59, 0.3)",
            amarelo_alpha_40: "rgba(255, 235, 59, 0.4)",
            amarelo_alpha_50: "rgba(255, 235, 59, 0.5)",
            amarelo_alpha_60: "rgba(255, 235, 59, 0.6)",
            amarelo_alpha_70: "rgba(255, 235, 59, 0.7)",
            amarelo_alpha_80: "rgba(255, 235, 59, 0.8)",
            amarelo_alpha_90: "rgba(255, 235, 59, 0.9)",
            amarelo_mostarda: "#e6ad02",
            amarelo_mostarda_100: "#f6e1a4",
            amarelo_mostarda_200: "#f2d47b",
            amarelo_mostarda_300: "#eec753",
            amarelo_mostarda_400: "#eaba2a",
            amarelo_mostarda_500: "#e6ad02",
            amarelo_mostarda_600: "#c19102",
            amarelo_mostarda_700: "#9c7601",
            amarelo_mostarda_800: "#785a01",
            amarelo_mostarda_900: "#533e01",
            amarelo_mostarda_alpha_10: "rgba(230, 173, 2, 0.1)",
            amarelo_mostarda_alpha_20: "rgba(230, 173, 2, 0.2)",
            amarelo_mostarda_alpha_30: "rgba(230, 173, 2, 0.3)",
            amarelo_mostarda_alpha_40: "rgba(230, 173, 2, 0.4)",
            amarelo_mostarda_alpha_50: "rgba(230, 173, 2, 0.5)",
            amarelo_mostarda_alpha_60: "rgba(230, 173, 2, 0.6)",
            amarelo_mostarda_alpha_70: "rgba(230, 173, 2, 0.7)",
            amarelo_mostarda_alpha_80: "rgba(230, 173, 2, 0.8)",
            amarelo_mostarda_alpha_90: "rgba(230, 173, 2, 0.9)",
            amarelo_mostarda_escuro: "#AC8201",
            amarelo_mostarda_escuro_100: "#e1d2a4",
            amarelo_mostarda_escuro_200: "#d4be7b",
            amarelo_mostarda_escuro_300: "#c7aa52",
            amarelo_mostarda_escuro_400: "#b9962a",
            amarelo_mostarda_escuro_500: "#ac8201",
            amarelo_mostarda_escuro_600: "#906d01",
            amarelo_mostarda_escuro_700: "#755801",
            amarelo_mostarda_escuro_800: "#594401",
            amarelo_mostarda_escuro_900: "#3e2f00",
            amarelo_mostarda_escuro_alpha_10: "rgba(172, 130, 1, 0.1)",
            amarelo_mostarda_escuro_alpha_20: "rgba(172, 130, 1, 0.2)",
            amarelo_mostarda_escuro_alpha_30: "rgba(172, 130, 1, 0.3)",
            amarelo_mostarda_escuro_alpha_40: "rgba(172, 130, 1, 0.4)",
            amarelo_mostarda_escuro_alpha_50: "rgba(172, 130, 1, 0.5)",
            amarelo_mostarda_escuro_alpha_60: "rgba(172, 130, 1, 0.6)",
            amarelo_mostarda_escuro_alpha_70: "rgba(172, 130, 1, 0.7)",
            amarelo_mostarda_escuro_alpha_80: "rgba(172, 130, 1, 0.8)",
            amarelo_mostarda_escuro_alpha_90: "rgba(172, 130, 1, 0.9)",
            laranja: "#ff9800",
            laranja_100: "#ffdaa3",
            laranja_200: "#ffc97a",
            laranja_300: "#ffb952",
            laranja_400: "#ffa829",
            laranja_500: "#ff9800",
            laranja_600: "#d68000",
            laranja_700: "#ad6700",
            laranja_800: "#854f00",
            laranja_900: "#5c3700",
            laranja_alpha_10: "rgba(255, 152, 0, 0.1)",
            laranja_alpha_20: "rgba(255, 152, 0, 0.2)",
            laranja_alpha_30: "rgba(255, 152, 0, 0.3)",
            laranja_alpha_40: "rgba(255, 152, 0, 0.4)",
            laranja_alpha_50: "rgba(255, 152, 0, 0.5)",
            laranja_alpha_60: "rgba(255, 152, 0, 0.6)",
            laranja_alpha_70: "rgba(255, 152, 0, 0.7)",
            laranja_alpha_80: "rgba(255, 152, 0, 0.8)",
            laranja_alpha_90: "rgba(255, 152, 0, 0.9)",
            laranja_escuro: "#ff5722",
            laranja_escuro_100: "#ffc3af",
            laranja_escuro_200: "#ffa88c",
            laranja_escuro_300: "#ff8d69",
            laranja_escuro_400: "#ff7245",
            laranja_escuro_500: "#ff5722",
            laranja_escuro_600: "#d6491d",
            laranja_escuro_700: "#ad3b17",
            laranja_escuro_800: "#852d12",
            laranja_escuro_900: "#5c1f0c",
            laranja_escuro_alpha_10: "rgba(255, 87, 34, 0.1)",
            laranja_escuro_alpha_20: "rgba(255, 87, 34, 0.2)",
            laranja_escuro_alpha_30: "rgba(255, 87, 34, 0.3)",
            laranja_escuro_alpha_40: "rgba(255, 87, 34, 0.4)",
            laranja_escuro_alpha_50: "rgba(255, 87, 34, 0.5)",
            laranja_escuro_alpha_60: "rgba(255, 87, 34, 0.6)",
            laranja_escuro_alpha_70: "rgba(255, 87, 34, 0.7)",
            laranja_escuro_alpha_80: "rgba(255, 87, 34, 0.8)",
            laranja_escuro_alpha_90: "rgba(255, 87, 34, 0.9)",
            marron: "#795548",
            marron_100: "#cfc2bd",
            marron_200: "#b9a7a0",
            marron_300: "#a48b83",
            marron_400: "#8e7065",
            marron_500: "#795548",
            marron_600: "#66473c",
            marron_700: "#523a31",
            marron_800: "#3f2c25",
            marron_900: "#2c1f1a",
            marron_alpha_10: "rgba(121, 85, 72, 0.1)",
            marron_alpha_20: "rgba(121, 85, 72, 0.2)",
            marron_alpha_30: "rgba(121, 85, 72, 0.3)",
            marron_alpha_40: "rgba(121, 85, 72, 0.4)",
            marron_alpha_50: "rgba(121, 85, 72, 0.5)",
            marron_alpha_60: "rgba(121, 85, 72, 0.6)",
            marron_alpha_70: "rgba(121, 85, 72, 0.7)",
            marron_alpha_80: "rgba(121, 85, 72, 0.8)",
            marron_alpha_90: "rgba(121, 85, 72, 0.9)",
            cinza_azulado: "#b0bec5",
            cinza_azulado_100: "#e3e8ea",
            cinza_azulado_200: "#d6dde1",
            cinza_azulado_300: "#c9d3d8",
            cinza_azulado_400: "#bdc8ce",
            cinza_azulado_500: "#b0bec5",
            cinza_azulado_600: "#94a0a5",
            cinza_azulado_700: "#788186",
            cinza_azulado_800: "#5c6366",
            cinza_azulado_900: "#3f4447",
            cinza_azulado_alpha_10: "rgba(176, 190, 197, 0.1)",
            cinza_azulado_alpha_20: "rgba(176, 190, 197, 0.2)",
            cinza_azulado_alpha_30: "rgba(176, 190, 197, 0.3)",
            cinza_azulado_alpha_40: "rgba(176, 190, 197, 0.4)",
            cinza_azulado_alpha_50: "rgba(176, 190, 197, 0.5)",
            cinza_azulado_alpha_60: "rgba(176, 190, 197, 0.6)",
            cinza_azulado_alpha_70: "rgba(176, 190, 197, 0.7)",
            cinza_azulado_alpha_80: "rgba(176, 190, 197, 0.8)",
            cinza_azulado_alpha_90: "rgba(176, 190, 197, 0.9)",

        };

        public static IsArrayCor(cores: any): cores is Cor[]
        {
            return Array.isArray(cores) && cores.All(x => x instanceof d.Cor);
        }

    }

    export enum EnumPrefixoCor
    {
        CorFundo = "sn-cor-fundo--",
        CorTexto = "sn-cor-texto--",
        CorIcone = "sn-cor-icone--",
        CorBorda = "sn-cor-borda--",
    }

    export enum EnumEstiloCor
    {
        CorFundo = "background-color",
        CorTexto = "color",
        CorIcone = "color",
        CorBorda = "border-color"
    }

}