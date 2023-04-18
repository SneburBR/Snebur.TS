namespace Snebur.UI
{
    export class UnidadeComprimento
    {
        private static readonly DIVISOR_PORCENTAGEM: number = 100000;

        private static readonly AUTO = "Auto";
        private static readonly DIVISOR_PIXELS_PARA_REM = 16;

        public static get Vazio(): UnidadeComprimento
        {
            return new UnidadeComprimento(null);
        }
          
        public readonly Comprimento: TipoComprimento;
        public readonly Valor: number;
        public readonly ValorFormatado: string;
        public readonly TipoUnidade: EnumTipoUnidade;

        public get IsVazio(): boolean
        {
            return this.TipoUnidade === EnumTipoUnidade.Vazio;
        }

        public constructor(comprimento: TipoComprimento)
        {
            this.Comprimento = comprimento;

            const valorNormalizado = this.RetornarValorNormalizado(comprimento);
            this.TipoUnidade = this.RetornarUnidade(valorNormalizado);
            this.Valor = this.RetornarValorNumerico(valorNormalizado);
            this.ValorFormatado = this.RetornarValorFormatado();
        }

        private RetornarValorNormalizado(comprimento: TipoComprimento): string
        {
            if (comprimento === null || comprimento === undefined || comprimento === BaseEnumApresentacao.Vazio)
            {
                return String.Empty;
            }

            let temp: string;

            if (typeof comprimento === "string")
            {
                if (comprimento.StartsWith("calc"))
                {
                    return comprimento;
                }

                if (comprimento.EndsWith("%") && (Snebur.ui.BaseEnumComprimento as any).RotulosVSIntelliSense &&
                    (temp = (BaseEnumComprimento as any).RotulosVSIntelliSense[comprimento]) != null)
                {
                    const descricao = (BaseEnumComprimento as any)[temp];
                    const valorPorcentagemConhecida = (BaseEnumComprimento as any)[descricao];
                    return (parseFloat(valorPorcentagemConhecida) / UnidadeComprimento.DIVISOR_PORCENTAGEM) + "%";
                }

                if (comprimento.EndsWith("P"))
                {
                    const valorPorcentagemConhecida = (BaseEnumComprimento as any)[temp];
                    return (parseFloat(valorPorcentagemConhecida) / UnidadeComprimento.DIVISOR_PORCENTAGEM) + "%";
                }
            }

            if (typeof comprimento === "number")
            {
                return comprimento.ToPixels();
            }

            return comprimento.toString();
        }


        private RetornarUnidade(valorNormalizado: string): EnumTipoUnidade
        {
            if (String.IsNullOrEmpty(valorNormalizado))
            {
                return EnumTipoUnidade.Vazio;
            }

            if (valorNormalizado === "Auto" ||
                valorNormalizado === "auto")
            {
                return EnumTipoUnidade.Auto;
            }

            if (valorNormalizado.StartsWith("calc"))
            {
                return EnumTipoUnidade.DiferencaCalculado;
            }

            if (valorNormalizado.EndsWith(UnidadeUtil.SUFIXO_PIXEL) || ValidacaoUtil.IsNumber(valorNormalizado))
            {
                return EnumTipoUnidade.Pixel;
            }

            if (valorNormalizado.EndsWith(UnidadeUtil.SUFIXO_PORCENTAGEM))
            {
                return EnumTipoUnidade.Porcentagem;
            }

            if (valorNormalizado.EndsWith("P"))
            {
                return EnumTipoUnidade.Porcentagem;
            }

            if (valorNormalizado.EndsWith(UnidadeUtil.SUFIXO_REM))
            {
                return EnumTipoUnidade.Rem;
            }

            if (valorNormalizado.EndsWith(UnidadeUtil.SUFIXO_EM))
            {
                return EnumTipoUnidade.Em;
            }

            console.warn(`A medida ${valorNormalizado} não é suportada. Ex formatação 'px'' faltando`);
            return EnumTipoUnidade.Pixel;
        }

        private RetornarValorNumerico(descricao: string): number
        {
            return ConverterUtil.ParaNumero(TextoUtil.RetornarSomenteNumeros(descricao, false, true));
        }

        private RetornarValorFormatado(): string
        {
            if (this.TipoUnidade !== EnumTipoUnidade.Vazio)
            {
                //let sufixo = UnidadeComprimento.Sufixos.Item(this.TipoUnidade);
                switch (this.TipoUnidade)
                {
                    case EnumTipoUnidade.Auto:

                        return "auto";

                    case EnumTipoUnidade.Porcentagem:

                        return this.Valor.toString() + UnidadeUtil.SUFIXO_PORCENTAGEM;

                    case EnumTipoUnidade.Pixel:

                        return (this.Valor / UnidadeComprimento.DIVISOR_PIXELS_PARA_REM) + UnidadeUtil.SUFIXO_REM;

                    case EnumTipoUnidade.Rem:

                        return this.Valor.toString() + UnidadeUtil.SUFIXO_REM;

                    case EnumTipoUnidade.Em:

                        return this.Valor.toString() + UnidadeUtil.SUFIXO_EM;

                    case EnumTipoUnidade.DiferencaCalculado:

                        return this.Comprimento as string;
                    

                    default:

                        throw new Erro("O tipo da unidade não é suportado");
                }
            }
            return String.Empty;
        }
    }

    export enum EnumTipoUnidade
    {
        Vazio = BaseEnumApresentacao.Vazio,
        Auto = 0,
        Porcentagem = 1,
        Pixel = 2,
        Rem = 3,
        DiferencaCalculado = 4,
        Em = 5,

    }
}