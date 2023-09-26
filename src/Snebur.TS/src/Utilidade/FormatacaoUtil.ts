namespace Snebur.Utilidade
{
    export class FormatacaoUtil
    {
        public static readonly MASCARA_CARTAO_CREDITO_PADRAO = "#### #### #### #######";

        public static readonly FORMATACAO_TELEFONE: string = "(##) ####-####";
        public static readonly FORMATACAO_CELULAR: string = "(##) #####-####";
        public static readonly FORMATACAO_DATA: string = "##/##/####";
        public static readonly FORMATACAO_HORA: string = "##:##";
        public static readonly FORMATACAO_DATA_HORA: string = "##/##/#### ##:##";
        public static readonly FORMATACAO_CPF: string = "###.###.###-##";
        public static readonly FORMATACAO_CEP: string = "##.###-###";
        public static readonly FORMATACAO_CNPJ: string = "##.###.###/####-##";

        // #region Formatar

        public static Formatar(valor: any, formatacao: EnumFormatacao | string, isCompletar: boolean = false, isNaoFormatarValorVazio: boolean = false): string
        {
            if (isNaoFormatarValorVazio &&
                String.IsNullOrWhiteSpace(valor))
            {
                return String.Empty;
            }

            if (String.IsNullOrWhiteSpace(formatacao))
            {
                return valor;
            }

            formatacao = formatacao.trim().toLowerCase();
            switch (formatacao)
            {
                case EnumFormatacao.Nenhuma:

                    return valor;

                case EnumFormatacao.Bytes:

                    return FormatarByteUtil.Formatar(valor);

                case EnumFormatacao.Cep:

                    return FormatacaoUtil.FormatarMascara(valor, this.FORMATACAO_CEP);

                case EnumFormatacao.Cpf:

                    return FormatacaoUtil.FormatarMascara(valor, this.FORMATACAO_CPF);

                case EnumFormatacao.Cnpj:

                    return FormatacaoUtil.FormatarMascara(valor, this.FORMATACAO_CNPJ);

                case EnumFormatacao.CpfCnpj:

                    return FormatacaoUtil.FormatarCpfCnpj(valor);

                case EnumFormatacao.Moeda:

                    return FormatacaoUtil.FormatarMoeda(valor);

                case EnumFormatacao.MoedaComSinal:

                    return FormatacaoUtil.FormatarMoeda(valor, true);

                case EnumFormatacao.MoedaIgnorarSemValor:

                    return FormatacaoUtil.FormatarMoedaIgnorarSemValor(valor);

                case EnumFormatacao.Inteiro:

                    return FormatacaoUtil.FormatarInteiro(valor);

                case EnumFormatacao.Decimal1:

                    return FormatacaoUtil.FormatarDecimal(valor, false, false, 1);

                case EnumFormatacao.Decimal:

                    return FormatacaoUtil.FormatarDecimal(valor, false, false);

                case EnumFormatacao.Decimal3:

                    return FormatacaoUtil.FormatarDecimal(valor, false, false, 3);

                case EnumFormatacao.Telefone:

                    return FormatacaoUtil.FormatarTelefone(valor);

                case EnumFormatacao.Data:

                    return FormatacaoUtil.FormatarData(valor);

                case EnumFormatacao.Hora:

                    return FormatacaoUtil.FormatarHora(valor);

                case EnumFormatacao.HoraDescricao:

                    return FormatacaoUtil.FormatarHoraDescricao(valor);

                case EnumFormatacao.HoraDescricaoMin:

                    return FormatacaoUtil.FormatarHoraDescricaoMin(valor);

                case EnumFormatacao.DataHora:

                    return FormatacaoUtil.FormatarDataHora(valor, this.FORMATACAO_DATA_HORA);

                case EnumFormatacao.DataHoraSemantica:

                    return FormatacaoUtil.FormatarDataHoraSemantica(valor);
                case "datahorasemantico":

                    console.warn("datahorasemantico obsoleto, usar " + EnumFormatacao.DataHoraSemantica);
                    return FormatacaoUtil.FormatarDataHoraSemantica(valor);
                case EnumFormatacao.DataSemantica:

                    return FormatacaoUtil.FormatarDataSemantica(valor);

                case EnumFormatacao.DataSemanticaHora:

                    return FormatacaoUtil.FormatarDataSemanticaHora(valor);

                case EnumFormatacao.Tempo:

                    if (!u.ValidacaoUtil.IsDefinido(valor))
                    {
                        return String.Empty;
                    }
                    return FormatacaoUtil.FormatarTempo(ConverterUtil.ParaTimeSpan(valor));

                case EnumFormatacao.SimNao:

                    return FormatacaoUtil.FormatarSimNao(valor);

                case EnumFormatacao.Trim:

                    return valor?.toString().trim() ?? String.Empty;

                case EnumFormatacao.TamanhoArquivo:

                    return FormatacaoUtil.FormatarTamanhoArquivo(valor);

                case EnumFormatacao.Porcentagem:

                    return FormatacaoUtil.FormatarPorcentagem(valor);

                case EnumFormatacao.Porcentagem1:

                    return FormatacaoUtil.FormatarPorcentagem(valor, 1);

                case EnumFormatacao.Porcentagem2:

                    return FormatacaoUtil.FormatarPorcentagem(valor, 2);

                case EnumFormatacao.NaoQuebrar:

                    return FormatacaoUtil.FormatarNaoQuebra(valor);

                case EnumFormatacao.Pixel:

                    return FormatacaoUtil.FormatarPixel(valor);

                case EnumFormatacao.Milimetro:

                    return FormatacaoUtil.FormatarMilimetro(valor);

                case EnumFormatacao.Centimetro:

                    return FormatacaoUtil.FormatarCentimetro(valor);

                case EnumFormatacao.Grau:

                    return FormatacaoUtil.FormatarGrau(valor);

                case EnumFormatacao.Grau1:

                    return FormatacaoUtil.FormatarGrau2(valor);

                case EnumFormatacao.Grau2:

                    return FormatacaoUtil.FormatarGrau2(valor);

                case EnumFormatacao.PrimeiraLetraMaiuscula:

                    return FormatacaoUtil.FormatarPrimeiraLetraMaiuscula(valor);

                case EnumFormatacao.CaixaAlta:

                    return ConverterUtil.ParaString(valor).toUpperCase();

                case EnumFormatacao.CaixaBaixa:

                    return ConverterUtil.ParaString(valor).toLowerCase();

                case EnumFormatacao.Dimensao:

                    return FormatacaoUtil.FormatarDimensao(valor);

                case EnumFormatacao.DimensaoCm:

                    return FormatacaoUtil.FormatarDimensao(valor, true);

                case EnumFormatacao.DimensaoPixels:

                    return FormatacaoUtil.FormatarDimensaoPixels(valor);

                case EnumFormatacao.Margem:

                    return FormatacaoUtil.FormatarMargem(valor);

                case EnumFormatacao.Nome:

                    return FormatacaoUtil.FormatarNome(valor);

                case EnumFormatacao.CartaoCredito:

                    return FormatacaoUtil.FormatarCartaoCredito(valor);

                case EnumFormatacao.PositivoNegativo:

                    return FormatacaoUtil.FormatarPosivoNegativo(valor, 0);

                case EnumFormatacao.PositivoNegativoDecimal:

                    return FormatacaoUtil.FormatarPosivoNegativo(valor, 1);

                case EnumFormatacao.PorcentagemPositovoNegativo:

                    return FormatacaoUtil.FormatarPorcentagem(valor, 0, true);

                case EnumFormatacao.Porcentagem1PositovoNegativo:

                    return FormatacaoUtil.FormatarPorcentagem(valor, 1, true);

                case EnumFormatacao.Absoluto:

                    return FormatacaoUtil.FormatarAbsoluto(valor);

                case EnumFormatacao.EntreParentes:

                    return FormatacaoUtil.FormatarEntreParentes(valor);

                case EnumFormatacao.QuebrarLinhasHtml:

                    return FormatacaoUtil.QuebrarLinhasHtml(valor);

                case EnumFormatacao.Peso:

                    return FormatacaoUtil.FormatarPeso(valor);

                case EnumFormatacao.Prazo:

                    return FormatacaoUtil.FormatarPrazo(valor);

                case EnumFormatacao.DoisPontosFinal:

                    return FormatacaoUtil.FormatarDoisPontosFinal(valor);


                default:

                    if (FormatacaoUtil.IsMascara(formatacao))
                    {
                        return this.FormatarMascara(valor, formatacao, isCompletar);
                    }

                    if (FormatacaoUtil.IsFormatarNumero(formatacao))
                    {
                        return this.FormatarNumero(valor, formatacao);
                    }

                    console.error(`Formatado ${formatacao} para formatação não é suportado`);
                    return valor;

            }
        }

        public static FormatarPrimeiraLetraMaiuscula(valor: string): string
        {
            return TextoUtil.FormatarPrimeiraLetraMaiuscula(ConverterUtil.ParaString(valor));
        }

        //#region Mascaras

        public static FormatarTelefone(valor: string): string
        {
            const telefone = NormalizacaoUtil.NormalizarTelefone(valor);
            if (ValidacaoUtil.IsCelular(telefone))
            {
                return FormatacaoUtil.FormatarMascara(telefone, FormatacaoUtil.FORMATACAO_CELULAR);
            }
            return FormatacaoUtil.FormatarMascara(telefone, FormatacaoUtil.FORMATACAO_TELEFONE);
        }

        public static FormatarCpf(cpf: string): string
        {
            return FormatacaoUtil.FormatarMascara(cpf, FormatacaoUtil.FORMATACAO_CPF);
        }

        public static FormatarCnpj(cnpj: string): string
        {
            return FormatacaoUtil.FormatarMascara(cnpj, FormatacaoUtil.FORMATACAO_CPF);
        }

        public static FormatarCpfCnpj(valor: string): string
        {
            const cpfCnpj = NormalizacaoUtil.NormalizarCpfCnpj(valor);
            if (ValidacaoUtil.IsCnpj(cpfCnpj))
            {
                return FormatacaoUtil.FormatarMascara(cpfCnpj, FormatacaoUtil.FORMATACAO_CNPJ);
            }
            return FormatacaoUtil.FormatarMascara(cpfCnpj, FormatacaoUtil.FORMATACAO_CPF);
        }

        public static FormatarCep(valor: string): string
        {
            return FormatacaoUtil.FormatarMascara(valor, FormatacaoUtil.FORMATACAO_CEP);
        }

        public static FormatarMascara(valor: string, mascara: string, isCompletar: boolean = false): string
        {
            valor = u.ConverterUtil.ParaString(valor).trim();

            let somenteNumeros = TextoUtil.RetornarSomenteNumeros(valor);
            if (somenteNumeros.length === 0 && !isCompletar)
            {
                return String.Empty;
            }

            const totalNumero = TextoUtil.RetornarTextoCaracteresPermitido(mascara, "#").length;

            if (somenteNumeros.length > totalNumero)
            {
                somenteNumeros = somenteNumeros.substring(0, totalNumero);
            }


            let indiceNumero = 0;
            let processados = valor.length;

            let mascaraFormatada = "";

            for (let i = 0; i < mascara.length; i++)
            {

                const caracterMascara = mascara.charAt(i);
                if (caracterMascara === "#")
                {
                    if (indiceNumero < somenteNumeros.length)
                    {
                        const numero = somenteNumeros.charAt(indiceNumero);
                        mascaraFormatada += numero;
                        indiceNumero += 1;
                    }
                    else
                    {
                        if (!isCompletar)
                        {
                            break;
                        }
                        mascaraFormatada += "0";
                    }
                }
                else
                {
                    if (!isCompletar)
                    {
                        if (indiceNumero === somenteNumeros.length &&
                            processados === 0)
                        {
                            break;
                        }
                    }
                    mascaraFormatada += caracterMascara;
                }

                processados -= 1;
            }
            return mascaraFormatada;
        }

        //#endregion

        //#region Cartão de credito

        public static FormatarCartaoCredito(cartao: string): string
        {
            const numeros = TextoUtil.RetornarSomenteNumeros(cartao);
            if (numeros.length >= 2)
            {
                const mascara = FormatacaoUtil.RetornarMascaraCartaoCredito(numeros);
                return FormatacaoUtil.FormatarMascara(numeros, mascara);
            }
            return numeros;
        }


        public static RetornarMascaraCartaoCredito(resultadoOrCartao: string | ResultadoIdentificacaoCartaoCredito): string
        {
            const resultado = FormatacaoUtil.RetornarResultadoCartaoCredito(resultadoOrCartao);

            const espacos = resultado.EspacosFormatacao;
            const comprimento = resultado.MaximoDigitos;
            const sb = new StringBuilder();
            for (let i = 0; i < comprimento; i++)
            {
                sb.Append("#");
                if (espacos.Contains(i + 1))
                {
                    sb.Append(" ");
                }
            }
            return sb.ToString();
        }

        private static RetornarResultadoCartaoCredito(resultadoOrCartao: string | ResultadoIdentificacaoCartaoCredito): ResultadoIdentificacaoCartaoCredito
        {
            if (resultadoOrCartao instanceof ResultadoIdentificacaoCartaoCredito)
            {
                return resultadoOrCartao;
            }
            return CartaoCreditoUtil.Identificar(resultadoOrCartao);
        }

        //#endregion

        // #region Data -  Hora - TempoSemantico

        public static FormatarData(valor: any): string
        {
            if (ValidacaoUtil.IsDate(valor))
            {
                const data = ConverterUtil.ParaData(valor);
                const dia = FormatacaoUtil.FormatarNumero(data.getDate(), "00");
                const mes = FormatacaoUtil.FormatarNumero(parseInt(data.getMonth().toString()) + 1, "00");
                const ano = FormatacaoUtil.FormatarNumero(data.getFullYear(), "0000");

                valor = dia + "/" + mes;

                if (parseInt(ano) > 1900)
                {
                    valor += "/" + ano;
                }
            }
            //return this.FormatarMascara(valor, this.FORMATACAO_DATA);
            return this.FormatarMascaraData(valor);
        }

        public static FormatarMascaraData(valor: string): string
        {
            //let retornarDivisorData = function (strData: string)
            //{
            //    if (strData.Contains("/"))
            //    {
            //        return "/";
            //    }
            //    if (valor.Contains("-"))
            //    {
            //        return "-";
            //    }
            //    throw new Erro("Não foi possível encontrar um divisor para ");
            //}

            valor = u.ConverterUtil.ParaString(valor).trim();

            if (!String.IsNullOrWhiteSpace(valor))
            {
                const dataStirng = DataHoraUtil.NormalizarDataHoraString(valor);
                const [ano, mes, dia] = DataHoraUtil.ExtrairDataString(dataStirng, true);

                let strAno = ano.toString(),
                    strMes = mes.toString(),
                    strDia = dia.toString();

                if (dia < 10)
                {
                    strDia = `0${strDia}`;
                }

                if (mes < 10)
                {
                    strMes = `0${strMes}`;
                }

                if (strAno.length < 4)
                {
                    if (strAno.length === 2 && strAno.ToNumber() > 40)
                    {
                        strAno = `19${strAno}`;
                    } else
                    {
                        strAno = new Date().getFullYear().toString();
                    }
                }

                valor = `${strDia}/${strMes}/${strAno}`;
            }

            const mascara = this.FORMATACAO_DATA;
            const totalNumero = TextoUtil.RetornarTextoCaracteresPermitido(mascara, "#").length;

            let somenteNumeros = TextoUtil.RetornarSomenteNumeros(valor);
            if (somenteNumeros.length > totalNumero)
            {
                somenteNumeros = somenteNumeros.substring(0, totalNumero);
            }
            let indiceNumero = 0;
            let mascaraFormatada = "";
            for (let i = 0; i < mascara.length; i++)
            {
                if (somenteNumeros.length < totalNumero)
                {
                    if (valor.length === i)
                    {
                        break;
                    }
                }

                const caracterMascara = mascara.charAt(i);
                if (caracterMascara === "#")
                {
                    if (indiceNumero < somenteNumeros.length)
                    {
                        const numero = somenteNumeros.charAt(indiceNumero);
                        mascaraFormatada += numero;
                        indiceNumero += 1;
                    }
                    else
                    {
                        break;
                    }

                }
                else
                {
                    mascaraFormatada += caracterMascara;
                }
            }
            return mascaraFormatada;
        }

        public static FormatarDataHora(valor: Date | string, mascara: string = FormatacaoUtil.FORMATACAO_DATA_HORA): string
        {
            if (valor == null)
            {
                return String.Empty;
            }

            const dataHora = ConverterUtil.ParaData(valor);
            const dia = FormatacaoUtil.FormatarNumero(dataHora.getDate(), "00");
            const mes = FormatacaoUtil.FormatarNumero(dataHora.getMonth() + 1, "00");
            const ano = FormatacaoUtil.FormatarNumero(dataHora.getFullYear(), "0000");

            const hora = FormatacaoUtil.FormatarNumero(dataHora.getHours(), "00");
            const minuto = FormatacaoUtil.FormatarNumero(dataHora.getMinutes(), "00");
            const segundo = FormatacaoUtil.FormatarNumero(dataHora.getSeconds(), "00");
            const milesegundos = dataHora.getMilliseconds().toString();
            const dataHoraString = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}.${milesegundos}`;

            return this.FormatarMascara(dataHoraString, mascara);
        }

        public static FormatarDataHoraSemantica(argumentoDataHora: Date | string, tipoData: EnumTipoData = $Configuracao.TipoData): string
        {
            if (argumentoDataHora == null)
            {
                return String.Empty;
            }

            const dataHora = ConverterUtil.ParaData(argumentoDataHora);
            let agora = new Date();

            if (tipoData === EnumTipoData.Utc)
            {
                agora = agora.Utc;
            }

            const horas = this.FormatarNumero(dataHora.getHours(), "00");
            const minutos = this.FormatarNumero(dataHora.getMinutes(), "00");
            const horario = `${horas}:${minutos}`;

            const tempo = TimeSpan.FromDates(agora, dataHora, true);
            if (tempo.TotalDays < 2)
            {
                const futuro = (dataHora > agora);
                const prefixo = (futuro) ? "daqui " : "há ";

                if (tempo.TotalSeconds < 15)
                {
                    return " agora mesmo";
                }
                if (tempo.TotalSeconds < 60)
                {
                    return " alguns segundos";
                }

                const minutos = Math.round(tempo.TotalMinutes);
                if (tempo.TotalMinutes < 60)
                {
                    if (minutos === 1)
                    {
                        return prefixo + " 1 minuto";
                    }
                    return prefixo + minutos + " minutos";
                }

                if ((tempo.TotalHours < 12) || (agora.getDate() === dataHora.getDate()))
                {
                    const horas = Math.round(tempo.TotalHours);
                    if (horas === 1)
                    {
                        //return prefixo + ' ± 1 hora';
                        return prefixo + " 1 hora";
                    }
                    return prefixo + horas + " horas";
                }
            }

            const dataSemantica = u.FormatacaoUtil.FormatarDataSemantica(dataHora);
            return `${dataSemantica} às ${horario}`;
            //return `${dataHora.getDate().toString()} de ${this.FormatarMes(dataHora.getMonth() + 1)} ${horario}`;
        }

        public static FormatarDataSemanticaHora(argumentoDataHora: Date | string): string
        {
            if (argumentoDataHora == null)
            {
                return String.Empty;
            }

            const dataHora = ConverterUtil.ParaData(argumentoDataHora);
            const horas = this.FormatarNumero(dataHora.Hour, "00");
            const minutos = this.FormatarNumero(dataHora.Minute, "00");
            const dataSemantica = u.FormatacaoUtil.FormatarDataSemantica(dataHora, EnumTipoFormatacaoDiaSemana.Parcial);
            const horario = `${horas}:${minutos}`;
            return `${dataSemantica} às ${horario}`;
        }

        public static FormatarDataSemantica(argumentoDataHora: Date | string, formatacao: EnumTipoFormatacaoDiaSemana = EnumTipoFormatacaoDiaSemana.Normal): string
        {
            if (argumentoDataHora == null)
            {
                return String.Empty;
            }

            const data = ConverterUtil.ParaData(argumentoDataHora);
            if (!ValidacaoUtil.IsDataValida(data))
            {
                return String.Empty;
            }

            const hoje = new Date().DataZeroHora;
            const tempo = TimeSpan.FromDates(hoje, data, true);
            if (tempo.TotalDays < 7)
            {
                if (data.Day === hoje.Day)
                {
                    return "hoje";
                }

                if (data.Day === hoje.AddDays(1).Day)
                {
                    return "amanhã";
                }

                if (data.Day === hoje.AddDays(-1).Day)
                {
                    return "ontem";
                }
            }

            if (data.Year !== hoje.Year)
            {
                if (tempo.TotalDays > 30)
                {
                    return `${data.Day}, ${this.FormatarMes(data.Month).toLowerCase()} de ${data.Year}`;
                }
            }
            return `${data.Day} de ${this.FormatarMes(data.Month).toLowerCase()}`;
        }

        public static FormatarHora(tempoOuData: Date | TimeSpan): string
        public static FormatarHora(tempoOuData: Date, isHoraDia: false, isSegundos?: boolean): string
        public static FormatarHora(tempoOuData: TimeSpan, isHoraDia: boolean, isSegundos?: boolean): string
        public static FormatarHora(tempoOuData: TimeSpan | Date, isHoraDia: boolean = false, isSegundos: boolean = false): string
        {
            if (tempoOuData instanceof Date)
            {
                const hora = FormatacaoUtil.FormatarNumero(tempoOuData.getHours(), "00");
                const minutos = FormatacaoUtil.FormatarNumero(tempoOuData.getMinutes(), "00");
                if (isSegundos)
                {
                    const segundos = FormatacaoUtil.FormatarNumero(tempoOuData.getSeconds(), "00");
                    return `${hora}:${minutos}:${segundos}`;
                }
                return `${hora}:${minutos}`;
            }

            if (tempoOuData instanceof TimeSpan)
            {
                let totalHoras = tempoOuData.TotalHours;
                if (isHoraDia)
                {
                    if (totalHoras === DataHoraUtil.HORAS_DIA)
                    {
                        tempoOuData.AddMinutes(-1);
                        totalHoras = tempoOuData.TotalHours;
                    }
                    else if (totalHoras > DataHoraUtil.HORAS_DIA)
                    {
                        totalHoras = totalHoras % DataHoraUtil.HORAS_DIA;
                    }
                }

                const hora = this.FormatarNumero(totalHoras, "00");
                const minutos = this.FormatarNumero(tempoOuData.Minutes, "00");
                if (isSegundos)
                {
                    const segundos = FormatacaoUtil.FormatarNumero(tempoOuData.Seconds, "00");
                    return `${hora}:${minutos}:${segundos}`;
                }
                return `${hora}:${minutos}`;
            }
            return "00:00";
        }

        public static FormatarHoraDescricao(tempoOuData: TimeSpan | Date | number | string): string
        {
            const tempo = ConverterUtil.ParaTimeSpan(tempoOuData);
            const descHora = tempo.Hours === 1 ? "hora" : "horas";
            const descMinutos = tempo.Minutes === 1 ? "minuto" : "minutos";
            const descSegundos = tempo.Seconds === 1 ? "segundo" : "segundos";

            return this.FormatarDataDescricaoInterno(tempo, descHora, descMinutos, descSegundos, false);
        }

        public static FormatarHoraDescricaoMin(tempoOuData: TimeSpan | Date | number): string
        {
            const tempo = ConverterUtil.ParaTimeSpan(tempoOuData);
            const descHora = "h";
            const descMinutos = "min";
            const descSegundos = "s";
            return this.FormatarDataDescricaoInterno(tempo, descHora, descMinutos, descSegundos, true);
        }

        private static NormalizarDescricaoHoraEspacoMin(tempo: TimeSpan, descricaoHora: string): [string, string]
        {
            if (tempo.Minutes === 0 &&
                tempo.Seconds === 0)
            {
                descricaoHora = tempo.TotalHours === 1 ? "hora" : "horas";
                return [descricaoHora, " "];
            }
            return [descricaoHora, String.Empty];
        }

        private static FormatarDataDescricaoInterno(tempo: TimeSpan, descricaoHora: string, descricaoMinuto: string, descricaoSegundo: string, isMin: boolean): string
        {
            let espaco = " ";
            if (isMin)
            {
                [descricaoHora, espaco] = FormatacaoUtil.NormalizarDescricaoHoraEspacoMin(tempo, descricaoHora);
            }

            const partes = new List<string>();
            if (tempo.TotalHours > 0)
            {
                partes.Add(`${Math.floor(tempo.TotalHours)}${espaco}${descricaoHora}`);
            }
            if (tempo.Minutes > 0)
            {
                partes.Add(`${tempo.Minutes}${espaco}${descricaoMinuto}`);
            }
            if (tempo.Seconds > 0 && tempo.TotalHours < 1)
            {
                partes.Add(`${tempo.Seconds}${espaco}${descricaoSegundo}`);
            }
            if (partes.Count > 0)
            {
                return String.Join(" ", partes);
            }

            return `0${espaco}${descricaoHora}`;
        }

        public static FormatarTempo(tempo: TimeSpan, isSegundos: boolean = true): string
        {
            if (tempo instanceof TimeSpan)
            {
                const partes = new List<string>();

                if (tempo.TotalDays > 1)
                {
                    const formatacaoDias = tempo.Days === 1 ? "1 dia" : `${tempo.Days} dias`;
                    partes.Add(formatacaoDias);
                }

                if (tempo.TotalHours > 1)
                {
                    const formatacaoHoras = tempo.Hours === 1 ? "1 hora" : `${tempo.Hours} horas`;
                    partes.Add(formatacaoHoras);
                }

                if (tempo.TotalMinutes > 1 && tempo.Minutes > 0)
                {
                    const formatacaoMinutos = tempo.Minutes === 1 ? "1 minuto" : `${tempo.Minutes} minutos`;
                    partes.Add(formatacaoMinutos);
                }

                if (isSegundos && tempo.TotalSeconds > 0 && tempo.Seconds > 0)
                {
                    const formatacaoSegundos = tempo.Minutes === 1 ? "1 segundo" : `${tempo.Seconds} segundos`;
                    partes.Add(formatacaoSegundos);
                }

                return TextoUtil.Concatenar(partes, [" ", " e "]);

            }
            return String.Empty;
        }

        public static FormatarMes(mes: d.EnumMes, isAbreviado: boolean = false): string
        {
            const descricao = FormatacaoUtil.FormatarNomeMesInterno(mes);
            if (isAbreviado)
            {
                return descricao.substring(0, 3);
            }
            return descricao;
        }

        private static FormatarNomeMesInterno(mes: d.EnumMes): string
        {
            if (EnumUtil.IsDefindo(d.EnumMes, mes))
            {
                return EnumUtil.RetornarRotulo(d.EnumMes, mes);
            }

            throw new ErroOperacaoInvalida("O més não está definido", this);
            //switch (mes)
            //{
            //    case 1:
            //        return "janeiro";
            //    case 2:
            //        return "fevereiro";
            //    case 3:
            //        return "março";
            //    case 4:
            //        return "abril";
            //    case 5:
            //        return "maio";
            //    case 6:
            //        return "junho";
            //    case 7:
            //        return "julho";
            //    case 8:
            //        return "agosto";
            //    case 9:
            //        return "setembro";
            //    case 10:
            //        return "outubro";
            //    case 11:
            //        return "novembro";
            //    case 12:
            //        return "dezembro";
            //    default:
            //        throw new ErroOperacaoInvalida("O mes não é invalido", this);
            //}
        }

        public static FormatarDiaSemana(
            diaSemana: d.EnumDiaSemana,
            tipoFormatacao: EnumTipoFormatacaoDiaSemana = EnumTipoFormatacaoDiaSemana.Normal,
            isPlural: boolean = false): string
        {
            const descricao = FormatacaoUtil.FormatarDiaSemanaInterno(diaSemana);
            if (isPlural)
            {
                //implementação rápida, porem não globalizada
                const descricao = FormatacaoUtil.FormatarDiaSemana(diaSemana, tipoFormatacao, false);
                switch (tipoFormatacao)
                {
                    case EnumTipoFormatacaoDiaSemana.Parcial:

                        return descricao + "s";

                    case EnumTipoFormatacaoDiaSemana.Normal:
                        {
                            const partes = descricao.split("-");
                            if (partes.Count === 2)
                            {
                                return `${partes[0]}s-${partes[1]}`;
                            }
                            return `${partes[0]}s`;
                        }
                    default:

                        return descricao;
                }

            }
            switch (tipoFormatacao)
            {
                case EnumTipoFormatacaoDiaSemana.Normal:
                    return descricao;
                case EnumTipoFormatacaoDiaSemana.Parcial:
                    return descricao.split("-").First();
                case EnumTipoFormatacaoDiaSemana.Abreviado:
                    return descricao.substring(0, 3);
                case EnumTipoFormatacaoDiaSemana.Letra:
                    return descricao[0];
                default:
                    throw new Erro("Tipo da fotocarta do dia não é suportado");
            }
        }

        private static FormatarDiaSemanaInterno(diaSemana: d.EnumDiaSemana): string
        {
            if (EnumUtil.IsDefindo(d.EnumDiaSemana, diaSemana))
            {
                return EnumUtil.RetornarRotulo(d.EnumDiaSemana, diaSemana);
            }

            throw new ErroOperacaoInvalida("O dia da semana não está definido", this);
            //switch (diaSemana)
            //{
            //    case 1:
            //        return "Domingo";
            //    case 2:
            //        return "Segunda-feira";
            //    case 3:
            //        return "Terça-feira";
            //    case 4:
            //        return "Quarta-feira";
            //    case 5:
            //        return "Quinta-feira";
            //    case 6:
            //        return "Sexta-feira";
            //    case 7:
            //        return "Sábado";

            //    default:
            //        throw new ErroOperacaoInvalida("O dia da semana não é invalido", this);
            //}
        }

        //#endregion

        // #region Retornar Valores

        public static FormatarDecimalSeNecessario(refValor: number | string, isUsarPonto: boolean = false, isFormatarParteInteira: boolean = false, casasDecimal: number = 2): string
        {
            const valor = typeof refValor === "number" ? refValor : parseFloat(refValor);
            if (ValidacaoUtil.IsInteger(refValor))
            {
                return valor.toString();
            }
            return this.FormatarDecimal(valor, isUsarPonto, isFormatarParteInteira, casasDecimal);
        }

        public static FormatarDecimal(valor: number | string,
            isUsarPonto: boolean = false,
            isFormatarParteInteira: boolean = false,
            casasDecimal: number = 2): string
        {
            if (valor == null)
            {
                valor = 0;
            }

            if (typeof valor === "string")
            {
                valor = parseFloat(valor);
            }

            if (!ValidacaoUtil.IsNumber(valor))
            {
                console.error(`Falha FormatarDecimal valor ${valor} é invalido`);
                valor = 0;
            }

            if (!isFormatarParteInteira)
            {
                const resultado = valor.toFixed(casasDecimal);
                if (isUsarPonto)
                {
                    return resultado;
                }
                return resultado.replace(".", ",");
            }

            if (casasDecimal > 0)
            {
                const partes = valor.toFixed(casasDecimal).split(".");
                if (partes.length === 2)
                {
                    const parteInteira = partes[0];
                    const decimal = partes[1];
                    const parteInteiraFormatada = FormatacaoUtil.FormatarParteInterira(parteInteira, !isUsarPonto);
                    const ponteiro = (isUsarPonto) ? "." : ",";
                    const resultado = `${parteInteiraFormatada}${ponteiro}${decimal}`;
                    if (valor < 0)
                    {
                        return "-" + resultado;
                    }
                    return resultado;
                }
            }

            const parteInteira = Math.round(valor).ToString();
            return FormatacaoUtil.FormatarParteInterira(parteInteira, !isUsarPonto);
        }

        private static FormatarParteInterira(parteInteira: string, isUsarPonto: boolean): string
        {
            const ponteiroParteInteira = (isUsarPonto) ? "." : ",";
            let parteInteiraFormatada = "";
            let contador = 0;
            for (let i = parteInteira.length - 1; i >= 0; i--)
            {
                contador += 1;
                parteInteiraFormatada = parteInteira.charAt(i) + parteInteiraFormatada;
                if (contador === 3 && i > 0)
                {
                    contador = 0;
                    parteInteiraFormatada = ponteiroParteInteira + parteInteiraFormatada;
                }
            }
            return parteInteiraFormatada;
        }

        //private static RetornarParteInteiraDecimal(valor: number, casasDecimal: number): [string, string, boolean]
        //{
        //    if (typeof valor === "number" && !isNaN(valor))
        //    {


        //        const valorString = valor.toFixed(casasDecimal);
        //        const partes = valorString.split(".");
        //        let inteira = partes[]
        //        let decimal = valor - inteira;

        //        inteira = Math.abs(inteira);
        //        decimal = Math.abs(decimal);

        //        const parteDecimalFormatada = FormatacaoUtil.FormatarParteDecimal(decimal, casasDecimal);
        //        const isNegativo = valor < 0;
        //        return [inteira.toString(), parteDecimalFormatada, isNegativo];
        //    }


        //    const valor = u.ConverterUtil.ParaString(valor);
        //    const isNegativo = (valor.trim().charAt(0) === "-");
        //    let posicaoUltimoPonto = Math.max(valor.lastIndexOf("."), valor.lastIndexOf(","));

        //    if (posicaoUltimoPonto === -1)
        //    {
        //        posicaoUltimoPonto = valor.length;
        //    }

        //    let parteInteira = TextoUtil.RetornarSomenteNumeros(valor.substring(0, posicaoUltimoPonto));
        //    let parteDecimal = TextoUtil.RetornarSomenteNumeros(valor.substring(posicaoUltimoPonto, valor.length));

        //    if (String.IsNullOrEmpty(parteInteira))
        //    {
        //        parteInteira = "0";
        //    }

        //    if (String.IsNullOrEmpty(parteDecimal))
        //    {
        //        parteDecimal = "0";
        //    }

        //    const temp = parseFloat(`1.${parteDecimal}`).ToDecimal(casasDecimal);
        //    const decimal = (temp - Math.floor(temp));

        //    const decimalFormatado = FormatacaoUtil.FormatarParteDecimal(decimal, casasDecimal);
        //    return [parteInteira, decimalFormatado, isNegativo];


        //}

        private static FormatarParteDecimal(decimal: number, casasDecimal: number): string
        {
            const retornarZerosIniciais = function (valor: number)
            {
                if (valor < 0.01)
                {
                    if (valor > 0.005)
                    {
                        return "01";
                    }
                    return "00";
                }

                if (valor < 0.1)
                {
                    return "0";
                }
                return "";
            };

            const formatacao = FormatacaoUtil.RetornarFormatoNumeroDecimal(casasDecimal);
            const multiplicador = parseInt("1" + formatacao);
            const parteInteira = parseInt(Math.round(decimal * multiplicador));
            const zerosIniciais = retornarZerosIniciais(decimal);

            const retorno = FormatacaoUtil.FormatarParteDecimalInterno(`${zerosIniciais}${parteInteira}`, formatacao);
            return retorno;
        }

        public static FormatarParteDecimalInterno(numero: any, formatacao: string): string
        {
            let numeroString = u.ConverterUtil.ParaString(numero);
            const lenNumero = numeroString.length;
            if (lenNumero > formatacao.length)
            {
                return numeroString.substring(0, formatacao.length);
            }
            const diferenca = formatacao.length - lenNumero;
            for (let i = 0; i < diferenca; i++)
            {
                numeroString += "0";
            }
            return numeroString;
        }

        public static FormatarMoeda(valor: number, isSinal?: boolean, isNaoFormatarValorNullo: boolean = false): string
        {
            if (valor == null)
            {
                if (isNaoFormatarValorNullo)
                {
                    return String.Empty;
                }
                valor = 0;
            }

            if (typeof valor === "string")
            {
                valor = parseFloat(valor);
            }

            if (!ValidacaoUtil.IsNumber(valor))
            {
                console.error(`Erro FormatarMoeda. O valor ${valor} não é suportado`);
                valor = 0;
            }
            return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

            //let formatacaoDecimal = this.FormatarDecimal(valor, false, true);
            //const negativo = (formatacaoDecimal.trim().charAt(0) === "-");
            //if (negativo)
            //{
            //    formatacaoDecimal = formatacaoDecimal.substring(1, formatacaoDecimal.length);
            //}

            //const sinal = (negativo) ? "-" : isSinal ? "+" : "";
            //return `${sinal}R$ ${formatacaoDecimal}`;
        }

        public static FormatarMoedaIgnorarSemValor(valor: any): string
        {
            if (!String.IsNullOrWhiteSpace(valor?.toString()) &&
                parseFloat(valor) !== 0)
            {
                return FormatacaoUtil.FormatarMoeda(valor);
            }
            return String.Empty;
        }

        public static FormatarSimNao(valor: string): string
        {
            const sim = ConverterUtil.ParaBoolean(valor);
            if (sim)
            {
                return "Sim";
            }
            else
            {
                return "Não";
            }
        }

        public static RetornarDecimal(valor: any)
        {
            return ConverterUtil.ParaDecimal(valor);
        }

        public static RetornarData(valor: string): Date
        {
            return ConverterUtil.ParaData(valor);
        }

        public static RetornarDataHora(valor: string): Date
        {
            return ConverterUtil.ParaDataHora(valor);
        }

        public static FormatarInteiro(valor: any): string
        {
            return u.ConverterUtil.ParaInteiro(valor).toFixed(0);
        }

        public static FormatarNumero(numero: any, formatacao: string): string
        {
            const numeroString = u.ConverterUtil.ParaNumero(numero).toString();
            const lenNumero = numeroString.length;
            const resultado: string = parseInt(numero).toString();

            if (numeroString.length < formatacao.length)
            {
                const diferenca = (formatacao.length - lenNumero);
                const adicionar = formatacao.substring(0, diferenca);
                return adicionar + numeroString.toString();
            }
            return resultado;
        }

        public static FormatarTamanhoArquivo(totalBytes: number): string
        {
            return FormatarByteUtil.Formatar(totalBytes);
        }

        public static FormatarGrau(valor: number | string): string
        {
            return FormatacaoUtil.FormatarGrauInterno(valor, 0);
        }

        public static FormatarGrau1(valor: number | string): string
        {
            return FormatacaoUtil.FormatarGrauInterno(valor, 1);
        }

        public static FormatarGrau2(valor: number | string): string
        {
            return FormatacaoUtil.FormatarGrauInterno(valor, 2);
        }

        private static FormatarGrauInterno(valor: any, casasDecimais: number): string
        {
            const valorNumero = u.ConverterUtil.ParaNumero(valor);
            return `${valorNumero.toFixed(casasDecimais)} &deg;`;
        }

        public static FormatarPixel(valor: any): string
        {
            const valorNumero = u.ConverterUtil.ParaNumero(valor);
            return valorNumero.toString() + "px";
        }

        public static FormatarMilimetro(valor: any, isFormatarInteiro: boolean = false): string
        {
            const valorNumero = u.ConverterUtil.ParaNumero(valor);
            if (!isFormatarInteiro && ValidacaoUtil.IsInteger(valorNumero))
            {
                return valorNumero.toFixed(0) + "mm";
            }
            return valorNumero.ToDecimal(1).toFixed(1) + "mm";
        }

        public static FormatarCentimetro(valor: any, isFormatarInteiro: boolean = false): string
        {
            const valorNumero = u.ConverterUtil.ParaNumero(valor);
            if (!isFormatarInteiro && ValidacaoUtil.IsInteger(valorNumero))
            {
                return valorNumero.toFixed(0) + "cm";
            }
            return valorNumero.ToDecimal(1).toFixed(1) + "cm";
        }

        public static FormatarPasso(valor: number | string, passo: number | string): string;
        public static FormatarPasso(valor: number | string, passo: number | string, formatarString: true): string;
        public static FormatarPasso(valor: number | string, passo: number | string, formatarString: false): number;
        public static FormatarPasso(valor: number | string, passo: number | string, formatarString: boolean = true): number | string
        {
            const valorTipado = u.ConverterUtil.ParaNumero(valor);
            const passoTipado = u.ConverterUtil.ParaNumero(passo);

            const digitos = passo.toString().Contains(".") ? passo.toString().split(".").Last().length : 0;
            let multiplicador = 1;
            if (passoTipado < 1)
            {
                multiplicador = digitos * 10;
            }

            const resultado = (Math.round((valorTipado * multiplicador) / (passoTipado * multiplicador)) * passoTipado).toFixed(digitos);
            if (formatarString)
            {
                return resultado;
            }
            return parseFloat(resultado);
        }

        public static FormatarDimensao(valor: IDimensao, isCm: boolean = false): string
        {
            const cmd = isCm ? "cm" : "";
            if (valor != null &&
                ValidacaoUtil.IsNumber(valor.Largura) &&
                ValidacaoUtil.IsNumber(valor.Altura))
            {
                if (ValidacaoUtil.IsInteger(valor.Largura) &&
                    ValidacaoUtil.IsInteger(valor.Altura))
                {
                    return `${valor.Largura.toFixed(0)}x${valor.Altura.toFixed(0)}${cmd}`;
                }
                return `${valor.Largura.toFixed(1)}x${valor.Altura.toFixed(1)}${cmd}`;
            }
            return `0x0 ${cmd}`;
        }

        public static FormatarDimensaoPixels(valor: IDimensao)
        {
            if (valor != null)
            {
                return `${valor.Largura?.toFixed(0)} x ${valor.Altura?.toFixed(0)} px`;
            }
            return "0 x 0 px";
        }

        public static FormatarMargem(margem: d.IMargem)
        {
            return `${margem.Esquerda.toFixed(1)},${margem.Superior.toFixed(1)},${margem.Direita.toFixed(1)},${margem.Inferior.toFixed(1)}`;
        }

        public static FormatarBytes(totalBytes: number): string;
        public static FormatarBytes(totalBytes: number, formato: EnumFormatoByte): string;
        public static FormatarBytes(totalBytes: number, formato?: EnumFormatoByte): string
        {
            return FormatarByteUtil.Formatar(totalBytes, formato);
        }

        public static FormatarPorcentagem(valor: number | string, casasDecimais: number = 0, isFormatarPositivoNegativo: boolean = false): string
        {
            let valorTipado = u.ConverterUtil.ParaNumero(valor);
            if (casasDecimais === 0)
            {
                valorTipado = Math.round(valorTipado);
            }

            if (isFormatarPositivoNegativo)
            {
                const prefixo = valorTipado > 0 ? "+ " :
                    (valorTipado < 0 ? "- " : "");

                valorTipado = Math.abs(valorTipado);
                return `${prefixo}${valorTipado.toFixed(casasDecimais)}%`;
            }
            return `${valorTipado.toFixed(casasDecimais)}%`;

        }

        public static FormatarPosivoNegativo(valor: string | number, casasDecimais: number = 0): string
        {
            let valorTipado = ConverterUtil.ParaNumero(valor);
            const prefixo = valorTipado > 0 ? "+ " :
                (valorTipado < 0 ? "- " : "");

            if (casasDecimais === 0)
            {
                valorTipado = Math.round(valorTipado);
            }

            valorTipado = Math.abs(valorTipado);
            return `${prefixo}${valorTipado.toFixed(casasDecimais)}`;
        }

        public static FormatarAbsoluto(valor: string | number)
        {
            return Math.abs(ConverterUtil.ParaNumero(valor)).ToString();
        }

        public static FormatarEntreParentes(valor: string | number)
        {
            return `(${valor})`;
        }

        //#endregion

        //#region Outros

        public static FormatarEspacosHtml(texto: string)
        {
            if (String.IsNullOrEmpty(texto))
            {
                return String.Empty;
            }
            return texto.replace(" ", "&nbsp;").
                replace("\t", "&nbsp;".repeat(4));
        }

        public static QuebrarLinhasHtml(texto: string, isFormatarEspaco: boolean = false)
        {
            if (!String.IsNullOrEmpty(texto))
            {
                const regExistElementoBR = /<br\s*\/?>/gi;
                if (regExistElementoBR.test(texto))
                {
                    return texto;
                }
                
                const linhas = TextoUtil.RetornarLinhas(texto);
                if (isFormatarEspaco)
                {
                    return String.Join("<br/>", linhas.Select(x => `<span> ${FormatacaoUtil.FormatarEspacosHtml(x)} </span>`));
                }
                return String.Join("<br/>", linhas.Select(x => `<span> ${x} </span>`));
            }
            return String.Empty;

        }

        public static FormatarHtml(texto: string)
        {
            if (!String.IsNullOrEmpty(texto))
            {
                const tab = "&nbsp; ".repeat(4);
                texto = texto.ReplaceAll("<", "&lt;");
                texto = texto.ReplaceAll(">", "&gt;");
                texto = texto.ReplaceAll('"', "&quot;");
                texto = texto.ReplaceAll("'", "&apos;");
                texto = texto.ReplaceAll(" ", "&nbsp;");
                texto = texto.ReplaceAll("\t", tab);
                texto = texto.ReplaceAll("	", tab);

                const linhas = TextoUtil.RetornarLinhas(texto);

                return String.Join("<br/>", linhas.Select(x => `<span> ${x} </span>`));
            }
            return String.Empty;

        }

        public static FormatarNaoQuebra(value: string)
        {
            if (typeof value === "string")
            {
                return value.replace("<br>", String.Empty);
            }
            return String.Empty;
        }

        public static FormatarNome(nome: string): string
        {
            if (String.IsNullOrWhiteSpace(nome))
            {
                return String.Empty;
            }
            return FormatacaoNomeUtil.FormatarNome(nome);
        }

        public static FormatarNomeArquivo(nomeArquivo: string)
        {
            return ArquivoUtil.FormatarNomeArquivo(nomeArquivo);
        }

        //#endregion

        //#region Prazo e peso

        public static FormatarPrazo(prazo: PrazoTempo): string
        {
            return prazo?.Descricao ?? String.Empty;
        }

        public static FormatarPeso(pesoEmGramas: number): string
        {
            if (ValidacaoUtil.IsNumber(pesoEmGramas, true))
            {
                if (pesoEmGramas > 1000)
                {
                    return `${FormatacaoUtil.FormatarDecimal(pesoEmGramas, false, true, 1)} kg`;
                }
                return `${parseInt(pesoEmGramas)} g`;
            }
            return String.Empty;
        }

        //#endregion

        //#region Métodos privados



        private static RetornarFormatoNumeroDecimal(casesDecimal: number): string
        {
            let formato: string = String.Empty;
            for (let i = 0; i < casesDecimal; i++)
            {
                formato += "0";
            }
            return formato;
        }

        private static IsMascara(formato: string): boolean
        {
            return TextoUtil.IsTextoContem(formato, "#-,.");
        }

        private static IsFormatarNumero(formato: string): boolean
        {
            return TextoUtil.IsTextoContem(formato, "0");
        }

        //#endregion

        ///#region Ocultações

        public static OcultarEmail(email: string): string
        {
            const partesEmail = email.Split("@");
            const primeiraParteEmail = partesEmail[0].substring(0, 2);
            return `${primeiraParteEmail}********@${partesEmail[1]}`;
        }

        //#endregion

        public static FormatarDoisPontosFinal(value: string): string
        {
            if (String.IsNullOrWhiteSpace(value))
            {
                return String.Empty;
            }
            value = value.trim();
            return value.endsWith(":") ? value : `${value}:`;
        }
    }

    export enum EnumTipoFormatacaoDiaSemana
    {
        Normal,
        Parcial,
        Abreviado,
        Letra
    }

}