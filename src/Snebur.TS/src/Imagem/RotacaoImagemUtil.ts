namespace Snebur.Utilidade
{
    export class RotacaoImagemUtil
    {
        private static readonly SENSIBILIDADE: number = 45;

        public static NormalizarRotacao(rotacao: EnumRotacaoImagem): EnumRotacaoImagem
        {
            switch (rotacao)
            {
                case EnumRotacaoImagem.Rotacao90AntiHorario:
                    return EnumRotacaoImagem.Rotacao270;
                case EnumRotacaoImagem.Rotacao180AntiHorario:
                    return EnumRotacaoImagem.Rotacao180;
                case EnumRotacaoImagem.Rotacao360:
                    return EnumRotacaoImagem.Normal;
                default:
                    return rotacao;
            }
        }

        public static NormalizarDimensao(dimensao: d.Dimensao, rotacao: EnumRotacaoImagem)
        {
            if (RotacaoImagemUtil.IsRotacionou(rotacao))
            {
                return dimensao.Inverter();
            }
            return dimensao;
        }

        public static IsRotacionou(rotacao: EnumRotacaoImagem): boolean
        {
            return rotacao === EnumRotacaoImagem.Rotacao90 ||
                rotacao === EnumRotacaoImagem.Rotacao90AntiHorario ||
                rotacao === EnumRotacaoImagem.Rotacao270;
        }

        public static RetornarRotacao(angulo: number): EnumRotacaoImagem
        {
            const rotacoes = u.EnumUtil.RetornarValoresEnum(EnumRotacaoImagem);
            if (angulo < 0)
            {
                angulo = (360 - Math.abs(angulo));
            }
            for (const rotacao of rotacoes)
            {
                if (u.Util.IgualSensivel(angulo, rotacao, RotacaoImagemUtil.SENSIBILIDADE))
                {
                    return rotacao;
                }
            }

            throw new ErroOperacaoInvalida("Angulo invalido");
        }


    }
}