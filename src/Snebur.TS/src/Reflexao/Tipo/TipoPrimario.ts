
namespace Snebur.Reflexao
{
    export class TipoPrimario extends BaseTipo
    {
        public TipoPrimarioEnum: EnumTipoPrimario;

        public constructor(nome: string, tipoPrimarioEnum: number)
        {
            super(nome, "", `System.${TipoPrimario.NormalizarTipoDotNet(tipoPrimarioEnum, nome)}, mscorlib`, null, false);
            this.TipoPrimarioEnum = tipoPrimarioEnum;
            this.TipoReflexao = EnumTipoReflexao.TipoPrimario;
        }

        public static NormalizarTipoDotNet(tipoPrimarioEnum: EnumTipoPrimario, nome: string): string
        {
            switch (tipoPrimarioEnum)
            {
                case EnumTipoPrimario.Integer:

                    return "Int32";

                case EnumTipoPrimario.Long:

                    return "Int64";

                default:

                    return nome;

            }
        }
    }
}