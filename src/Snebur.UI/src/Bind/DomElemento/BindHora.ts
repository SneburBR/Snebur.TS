
namespace Snebur.UI
{
    export class BindHora extends BindTexto
    {
        private readonly IsHorasDia: boolean;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, valorAtributo);

            if (!(controlePai instanceof CaixaHora))
            {
                throw new Erro("O controle não é suportado");
            }
            this.IsHorasDia = this.RetornarValorAtributoBoolean(AtributosHtml.IsHorasDia, false);
        }

        public override RetornarValorConvertidoParaDom(valorPropriedade: any): string
        {
            return u.FormatacaoUtil.FormatarHora(valorPropriedade);
        }

        public override RetornarValorConvertidoParaPropriedade(valorDom: string): TimeSpan | Date
        {
            if (u.ValidacaoUtil.IsHora(valorDom))
            {
                const timeSpan = u.ConverterUtil.ParaTimeSpan(valorDom);
                if (this.PropriedadeLigacao instanceof r.Propriedade &&
                    this.PropriedadeLigacao.Tipo === u.ReflexaoUtil.RetornarTipo(Date))
                {
                    let dataReferencia = this.ValorPropriedade as Date;
                    if (!(dataReferencia instanceof Date))
                    {
                        dataReferencia = new Date();
                    }
                    return new Date(dataReferencia.Year, dataReferencia.Month, dataReferencia.Day, timeSpan.Hours, timeSpan.Milliseconds, timeSpan.Seconds, timeSpan.Milliseconds);
                }
                //if (this.PropriedadeLigacao instanceof r.Propriedade && this.PropriedadeLigacao.Tipo == u.ReflexaoUtil.RetornarTipo(Number))
                //{
                //    return timeSpan.TotalMilliseconds;
                //}

                if (this.IsHorasDia)
                {
                    if (timeSpan.TotalHours > u.DataHoraUtil.HORAS_DIA)
                    {
                        const totalHoras = Math.floor(timeSpan.TotalHours / u.DataHoraUtil.HORAS_DIA);
                         timeSpan.SubtractHours(totalHoras * u.DataHoraUtil.HORAS_DIA);
                    }
                }
                return timeSpan;
            }
            return null;
        }
    }
}