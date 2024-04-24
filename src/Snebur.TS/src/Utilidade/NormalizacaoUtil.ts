namespace Snebur.Utilidade
{
    export class NormalizacaoUtil
    {

        private static readonly THIS: string = "this.";

        public static NormalizarAngulo(angulo: number): number
        {
            if (angulo > -360 && angulo < 360)
            {
                return angulo;
            }
            if (angulo === 360 || angulo === -360)
            {
                return 0;
            }
            return angulo % 360;
        }

        public static NormalizarNomeMetodo(nome: string): string
        {
            if (typeof nome === "string" && nome.StartsWith(NormalizacaoUtil.THIS))
            {
                return nome.substring(NormalizacaoUtil.THIS.length);
            }
            return nome;
        }

        public static NormalizarProgresso(progresso: number): number
        {
            return this.NormalizarIntervalo(progresso, 0, 100);
        }

        public static NormalizarByte(valor: number): number
        {
            return this.NormalizarIntervalo(valor, Number.Uint8MinValue, Number.Uint8MaxValue);
        }

        public static NormalizarInt8(valor: number): number
        {
            return this.NormalizarIntervalo(valor, Number.Int8MinValue, Number.Int8MaxValue);
        }
        public static NormalizarInt16(valor: number): number
        {
            return this.NormalizarIntervalo(valor, Number.Int16MinValue, Number.Int16MaxValue);
        }

        public static NormalizarInt32(valor: number): number
        {
            return this.NormalizarIntervalo(valor, Number.Int32MinValue, Number.Int32MaxValue);
        }

        public static NormalizarInt64(valor: number): number
        {
            return this.NormalizarIntervalo(valor, Number.Int64MinValue, Number.Int64MaxValue);
        }

        public static NormalizarIntervalo(valor: number, minimo: number, maximo: number): number
        {
            if (valor < minimo)
            {
                return minimo;
            }
            if (valor > maximo)
            {
                return maximo;
            }
            return valor;
        }

        public static NormalizarDimensao(dimensao: Dimensao,
            larguraOuAlturaMinima: number = Number.UInt32MinValue,
            larguraOuAlturaMaxima: number = Number.Int32MaxValue): Dimensao
        {
            if (!u.ValidacaoUtil.IsIntervaloValido(dimensao.Largura, larguraOuAlturaMinima, larguraOuAlturaMaxima) ||
                !u.ValidacaoUtil.IsIntervaloValido(dimensao.Altura, larguraOuAlturaMinima, larguraOuAlturaMaxima))
            {
                const largura = NormalizacaoUtil.NormalizarIntervalo(dimensao.Largura, larguraOuAlturaMinima, larguraOuAlturaMaxima);
                const altura = NormalizacaoUtil.NormalizarIntervalo(dimensao.Altura, larguraOuAlturaMinima, larguraOuAlturaMaxima);
                return new Dimensao(largura, altura);
            }
            return dimensao;

        }

        public static NormalizarTelefone(valor: string): any
        {
            if (!String.IsNullOrEmpty(valor))
            {
                let somenteNumeros = TextoUtil.RetornarSomenteNumeros(valor);
                if (somenteNumeros.StartsWith("0"))
                {
                    somenteNumeros = somenteNumeros.substring(1);
                }
                if (somenteNumeros.length === 8 || somenteNumeros.length === 9)
                {
                    return "00" + valor;
                }
                if (somenteNumeros.length > 10 && valor.StartsWith("0"))
                {
                    return somenteNumeros;
                }

            }
            return valor;
        }

        public static NormalizarCpfCnpj(valor: string): any
        {
            if (!String.IsNullOrEmpty(valor))
            {
                const somenteNumeros = TextoUtil.RetornarSomenteNumeros(valor);

                return somenteNumeros;

            }
            return valor;
        }

        public static NormalizarPasso(valor: number, passo: number, opcoes: EnumOpcoesNormalizarPasso = EnumOpcoesNormalizarPasso.Media)
        {
            if ((valor % passo) !== 0)
            {

                if (ValidacaoUtil.IsDecimal(passo))
                {
                    return this.NormalizarPassoDecimal(valor, passo, opcoes);
                }

                switch (opcoes)
                {
                    case EnumOpcoesNormalizarPasso.Media:
                        return Math.round(valor / passo) * passo;
                    case EnumOpcoesNormalizarPasso.ParaBaixo:
                        return Math.floor(valor / passo) * passo;
                    case EnumOpcoesNormalizarPasso.ParaCima:
                        return Math.ceil(valor / passo) * passo;
                    default:
                        throw new Erro("Opções não suportada");
                }
            }
            return valor;
        }

        private static NormalizarPassoDecimal(valor: number, passo: number, opcoes: EnumOpcoesNormalizarPasso = EnumOpcoesNormalizarPasso.Media): number
        {
            throw new Erro(" Testar normalizar decimal");

            //let digitos = passo.toString().Contains(".") ? passo.toString().split(".").Last().length : 0;
            //let multiplicador = 1;
            //if (passo < 1)
            //{
            //    multiplicador = digitos * 10;
            //}

            //let resultado = (Math.round((valor * multiplicador) / (valor * multiplicador)) * valor).toFixed(digitos);
            //return parseFloat(resultado);
        }

        public static NormalizarRotacaoImagem(rotacao: EnumRotacaoImagem): EnumRotacaoImagem
        {
            switch (rotacao)
            {
                case EnumRotacaoImagem.Normal:
                case EnumRotacaoImagem.Rotacao90:
                case EnumRotacaoImagem.Rotacao180:
                case EnumRotacaoImagem.Rotacao270:
                    return rotacao;
                case EnumRotacaoImagem.Rotacao360:
                case EnumRotacaoImagem.Rotacao360AntiHorario:
                    return EnumRotacaoImagem.Normal;
                case EnumRotacaoImagem.Rotacao90AntiHorario:
                    return EnumRotacaoImagem.Rotacao270;
                case EnumRotacaoImagem.Rotacao180AntiHorario:
                    return EnumRotacaoImagem.Rotacao180;
                case EnumRotacaoImagem.Rotacao270AntiHorario:
                    return EnumRotacaoImagem.Rotacao90;
                default:
                    throw new Erro("Ratação da imagem  não suportada: " + rotacao);
            }
        }

        public static NormalizarDecimalToInvariantCulture(valor: string): string
        {
            const lastIndexPonto = valor.lastIndexOf(".");
            const lastIndexVirgula = valor.lastIndexOf(",");

            if (lastIndexPonto > 0 && lastIndexVirgula > 0)
            {
                valor = valor.Replace(".", "");
                valor = valor.Replace(",", ".");
                return valor;
            }

            if (lastIndexVirgula > 0)
            {
                return valor.Replace(",", ".");
            }
            return valor;
        }

        public static NormalizarVisibilidade(visibibilidade: UI.EnumVisibilidade | boolean | number)
        {
            if (typeof visibibilidade === "number")
            {
                if (EnumUtil.IsDefindo(UI.EnumVisibilidade, visibibilidade))
                {
                    return visibibilidade;
                }
                if (visibibilidade === 1)
                {
                    return UI.EnumVisibilidade.Visivel;
                }
                if (visibibilidade === 0 || visibibilidade === -1)
                {
                    return UI.EnumVisibilidade.Oculto;
                }
            }

            if (typeof visibibilidade === "boolean")
            {
                return visibibilidade
                    ? UI.EnumVisibilidade.Visivel
                    : UI.EnumVisibilidade.Oculto;
            }
            return visibibilidade;
        }

    }

    export enum EnumOpcoesNormalizarPasso
    {
        Media,
        ParaCima,
        ParaBaixo
    }
}