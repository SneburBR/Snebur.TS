namespace Snebur.Utilidade
{
    export class ConverterUtil
    {
        private static readonly REG_DATA_JSON_MS = /\/Date\(-*[0-9]+\)\//
        /*/^\/Date\([-|0-9][0-9]+\)\/$/;*/

        public static Para(valor: any, tipo: r.BaseTipo, ignorarErro?: boolean): any
        {
            if (tipo instanceof r.TipoPrimario)
            {
                return ConverterUtil.ParaTipoPrimario(valor, tipo.TipoPrimarioEnum);
            }
            if (tipo instanceof r.TipoEnum)
            {
                return ConverterUtil.ParaInteiro(valor);
            }

            if (ignorarErro)
            {
                return valor;
            }

            throw new ErroNaoSuportado(`O tipo não é suportado ${tipo.Nome}`, this);
        }

        public static ParaTipoPrimario(valor: any, tipoPrimarioEnum: r.EnumTipoPrimario): any
        {
            switch (tipoPrimarioEnum)
            {
                case (r.EnumTipoPrimario.Object):
                case (r.EnumTipoPrimario.Guid):
                case (r.EnumTipoPrimario.String):

                    return ConverterUtil.ParaString(valor);

                case (r.EnumTipoPrimario.Boolean):

                    return ConverterUtil.ParaBoolean(valor);

                case (r.EnumTipoPrimario.EnumValor):
                case (r.EnumTipoPrimario.Byte):
                case (r.EnumTipoPrimario.Long):
                case (r.EnumTipoPrimario.Integer):

                    return ConverterUtil.ParaInteiro(valor);

                case (r.EnumTipoPrimario.Double):

                    return ConverterUtil.ParaDouble(valor);

                case (r.EnumTipoPrimario.Decimal):

                    return ConverterUtil.ParaDecimal(valor);

                case (r.EnumTipoPrimario.DateTime):

                    return ConverterUtil.ParaDataHora(valor);

                case (r.EnumTipoPrimario.TimeSpan):

                    return ConverterUtil.ParaTimeSpan(valor);

                default:

                    throw new ErroNaoSuportado(`O tipoPrimarioEnum ${u.EnumUtil.RetornarDescricao(r.EnumTipoPrimario, tipoPrimarioEnum)} não é suportado`, this);
            }
        }

        public static RetornarValorNuloPadrao(tipo: r.BaseTipo): any
        {
            if (tipo instanceof r.TipoPrimario)
            {
                const tipoPrimarioEnum = (tipo as r.TipoPrimario).TipoPrimarioEnum;
                return ConverterUtil.RetornarValorNuloPadraoTipoPrimario(tipoPrimarioEnum);
            }
            if (tipo instanceof r.TipoBaseDominio)
            {
                return null;
            }
            if (tipo instanceof r.BaseTipoLista)
            {
                if (tipo instanceof r.TipoListaEntidade)
                {
                    return new ListaEntidades<any>();
                }
                return [];
                //return new ListaObservacao<any>();

            }
            if (tipo instanceof r.TipoEnum)
            {
                return null;
            }
            throw new ErroNaoImplementado(this);
        }

        public static RetornarValorNuloPadraoTipoPrimario(tipoPrimarioEnum: r.EnumTipoPrimario): any
        {
            switch (tipoPrimarioEnum)
            {
                case (r.EnumTipoPrimario.String):

                    return String.Empty;

                case (r.EnumTipoPrimario.Boolean):

                    return false;

                case (r.EnumTipoPrimario.Integer):
                case (r.EnumTipoPrimario.Double):
                case (r.EnumTipoPrimario.Single):
                case (r.EnumTipoPrimario.Long):

                    return 0;

                case (r.EnumTipoPrimario.Guid):

                    return GuidUtil.GuidVazio;

                case (r.EnumTipoPrimario.DateTime):

                    return new Date();

                case (r.EnumTipoPrimario.TimeSpan):

                    return TimeSpan.FromMinutes(0);

                default: {
                    const descricao = EnumUtil.RetornarDescricao((r.EnumTipoPrimario), tipoPrimarioEnum);
                    throw new ErroNaoSuportado(`O tipo ${descricao} não é suportado`, this);
                }
            }
        }

        public static ParaString(valor: any): string
        {
            if (ValidacaoUtil.IsString(valor))
            {
                return valor;
            }
            if (!ValidacaoUtil.IsDefinido(valor))
            {
                return String.Empty;
            }
            return valor.toString();
        }

        public static ParaNumero(valor: number | string | boolean, inteiro?: boolean): number
        {
            inteiro = u.ConverterUtil.ParaBoolean(inteiro);
            if (typeof valor === "number" && !isNaN(valor))
            {
                if (inteiro)
                {
                    return parseInt(u.ConverterUtil.ParaString(valor));
                }
                return valor;
            }

            if (!u.ValidacaoUtil.IsDefinido(valor))
            {
                return 0;
            }

            if (u.ValidacaoUtil.IsString(valor))
            {
                if (String.IsNullOrWhiteSpace(valor))
                {
                    return 0;
                }

                valor = TextoUtil.RetornarSomenteNumeros(valor, false, true);
                valor = this.NormalizarPontosVirgula(valor);
                valor = parseFloat(valor);
            }

            if (typeof valor === "boolean")
            {
                return valor ? 1 : 0;
            }

            let resultado: number;
            if (inteiro)
            {
                resultado = parseInt(this.ParaString(valor));

            } else
            {
                resultado = parseFloat(this.ParaString(valor));
            }
            if (isNaN(resultado))
            {
                return 0;
            }
            return resultado;
        }

        public static ParaNumeroValidarIntervalo(valor: any, minimo: number = 0, maximo: number = 100)
        {
            let valorNumero = u.ConverterUtil.ParaNumero(valor);
            if (valorNumero < 0) valorNumero = 0;
            if (valorNumero > 100) valorNumero = 100;
            return valorNumero;
        }

        public static ParaInteiro(valor: any, isNaNRetornarNull: boolean = false): number | null
        {
            if (typeof valor === "number" && !isNaN(valor)) 
            {
                return Math.round(valor);
            }

            if (typeof valor === "boolean")
            {
                return valor ? 1 : 0;
            }

            valor = parseInt(valor);

            if (isNaN(valor))
            {
                if (isNaNRetornarNull)
                {
                    return null;
                }
                return 0;
            }
            return valor;
        }

        public static ParaDouble(valor: any): number
        {
            return ConverterUtil.ParaNumero(valor, false);
        }

        public static ParaDecimal(valor: any): number
        {
            const valorTipado = ConverterUtil.ParaNumero(valor, false);
            return Math.round(valorTipado * 100) / 100;
        }

        public static ParaDecimal1(valor: any): number
        {
            const valorTipado = ConverterUtil.ParaNumero(valor, false);
            return Math.round(valorTipado * 10) / 10;
        }

        public static ParaDecimal3(valor: any): number
        {
            const valorTipado = ConverterUtil.ParaNumero(valor, false);
            return Math.round(valorTipado * 1000) / 1000;
        }

        /*private static readonly EXPRESSAO_FALSO = /^(?:f(?:alse)?|no?|0+)$/i;*/

        public static ParaBoolean(valor: any): boolean
        {
            if (typeof valor === "boolean")
            {
                return valor;
            }
            if (typeof valor === "number")
            {
                return valor > 0;
            }

            if (valor == null ||
                valor instanceof Error ||
                valor instanceof ProgressEvent)
            {
                return false;
            }

            if (typeof valor === "string")
            {
                valor = valor.trim().toLocaleLowerCase();

                if (valor === "false" ||
                    valor === "" ||
                    valor === "0" ||
                    valor === "-1" ||
                    valor === "no" ||
                    valor === "off" ||
                    valor === "nao" ||
                    valor === "não")
                {
                    return false;
                }
            }
            return true;

        }

        public static ParaDataHora(valor: any): Date;
        public static ParaDataHora(valor: any, tipoData: EnumTipoData, isIgnorarErro?: boolean): Date;
        public static ParaDataHora(valor: any, tipoData: EnumTipoData = $Configuracao.TipoData, isIgnorarErro: boolean = false): Date | null
        {
            if (!u.ValidacaoUtil.IsDefinido(valor))
            {
                return null;
                //return ConverterUtil.RetornarValorNuloPadraoTipoPrimario(r.EnumTipoPrimario.DateTime);
            }

            if (valor instanceof Date)
            {
                return valor;
            }

            if (u.ValidacaoUtil.IsString(valor))
            {
                if (String.IsNullOrWhiteSpace(valor))
                {
                    return null;
                }

                let dataString = valor.trim();
                const numeros = u.TextoUtil.RetornarSomenteNumeros(dataString);
                if (String.IsNullOrWhiteSpace(numeros))
                {
                    return null;
                }

                const procurar = "Date(";
                if (dataString.Contains(procurar))
                {
                    const milissegundos = parseInt(dataString.substring(dataString.indexOf("(") + 1, dataString.lastIndexOf(")")));
                    if (ValidacaoUtil.IsNumber(milissegundos))
                    {
                        return new Date(parseInt(milissegundos));
                    }
                    throw new Erro("Não foi possível deserializar a data");
                }

                if (dataString.Contains("PB") || dataString.Contains("G"))
                {
                    const totalMilisegundos = Date.parse(valor);
                    if (totalMilisegundos > 0)
                    {
                        const data = new Date(totalMilisegundos);
                        if (ValidacaoUtil.IsDataValida(data))
                        {
                            return data;
                        }
                    }
                }

                if (!u.ValidacaoUtil.IsDateString(valor))
                {
                    if (isIgnorarErro)
                    {
                        return null;
                    }
                    throw new Erro(`Não foi possível converter a data string ${valor} para o objeto Date`);
                }


                dataString = DataHoraUtil.NormalizarDataHoraString(dataString);


                const partes = dataString.split(" ").Where(x => !String.IsNullOrWhiteSpace(x)).ToList();
                const parteHora = partes.Where(x => x.Contains(":")).FirstOrDefault();

                let parteData = partes.Where(x => x.Contains("/") || x.Contains("-")).FirstOrDefault();

                const [ano, mes, dia] = DataHoraUtil.ExtrairDataString(parteData, false);

                if (String.IsNullOrWhiteSpace(parteData) && String.IsNullOrWhiteSpace(parteHora))
                {
                    parteData = dataString;
                }

                if (parteHora == null)
                {
                    return new Date(ano, mes - 1, dia, 0, 0, 0, 0);
                }

                const [hora, minuto, segundo, milisegundo] = DataHoraUtil.ExtrairHoraString(parteHora);
                if (tipoData === EnumTipoData.Utc)
                {
                    return new Date(Date.UTC(ano, mes - 1, dia, hora, minuto, segundo, 0));
                }

                return new Date(ano, mes - 1, dia, hora, minuto, segundo, milisegundo);
            }

            if (isIgnorarErro)
            {
                return null;
            }
            throw new ErroNaoImplementado(`não foi possível valor ${valor} o argumento para data`);
        }

        public static ParaData(valor: any): Date;
        public static ParaData(valor: any, tipoData: EnumTipoData, isIgnorarErro?: boolean): Date;
        public static ParaData(valor: any, tipoData: EnumTipoData = $Configuracao.TipoData, isIgnorarErro: boolean = false): Date
        {
            if (String.IsNullOrWhiteSpace(valor))
            {
                return null;
            }

            if (u.ValidacaoUtil.IsDate(valor))
            {
                return valor;
            }
            if (u.ValidacaoUtil.IsString(valor))
            {
                return u.ConverterUtil.ParaDataHora(valor, tipoData, isIgnorarErro);
            }

            if (isIgnorarErro)
            {
                return null;
            }
            throw new Erro(`Não foi possível converter o valor ${valor} para o tipo data`);
        }


        public static ParaTimeSpan(valor: TimeSpan | Date | string | number, ignorarErro?: boolean): TimeSpan
        {
            if (String.IsNullOrWhiteSpace(valor as string))
            {
                return null;
            }

            if (valor instanceof TimeSpan)
            {
                return valor;
            }

            if (valor instanceof Date)
            {
                return TimeSpan.FromDate(valor);
            }

            if (typeof valor === "string")
            {
                if (valor.Contains(":"))
                {
                    const partes = valor.split(".");

                    let parteDia: string;
                    let parteHora: string;
                    let parteMilissegundos: string;

                    switch (partes.length)
                    {
                        case 1:

                            parteHora = partes[0];
                            break;

                        case 2:
                            {
                                const parte1 = partes[0].toString();
                                const parte2 = partes[1].toString();

                                if (parte1.split(":").length === 3 || parte1.split(":").length === 2)
                                {
                                    parteHora = parte1;
                                    parteMilissegundos = parte2;

                                } else if (parte2.split(":").length === 3)
                                {
                                    parteDia = parte1;
                                    parteHora = parte2;

                                }
                                else
                                {
                                    throw new ErroNaoSuportado("A parte hora do timespan não foi encontrada", this);
                                }
                                break;
                            }

                        case 3:

                            parteDia = partes[0];
                            parteHora = partes[1];
                            parteMilissegundos = partes[2];
                            break;

                        default:

                            throw new ErroNaoSuportado(`O formato do TimeSpan não é suportado ${valor}`, this);
                    }

                    const dias = u.ConverterUtil.ParaInteiro(parteDia);
                    const milissegundos = ConverterUtil.ParaInteiro(u.ConverterUtil.ParaInteiro(parteMilissegundos) / TimeSpan.TicksMilesegundo);
                    const partesHora = parteHora.split(":");

                    if (partesHora.length === 3 || partesHora.length === 2)
                    {
                        const horas = u.ConverterUtil.ParaInteiro(partesHora[0]);
                        const minutos = u.ConverterUtil.ParaInteiro(partesHora[1]);
                        const segundos = u.ConverterUtil.ParaInteiro(partesHora[2]);

                        return new TimeSpan(dias, horas, minutos, segundos, milissegundos);
                    }
                }
            }

            if (ValidacaoUtil.IsNumber(valor, true))
            {
                const valorTipado = parseFloat(valor);
                if (valorTipado <= (4 * 24))
                {
                    return TimeSpan.FromHours(valorTipado);
                }

                if (valorTipado < 500)
                {
                    return TimeSpan.FromMinutes(valorTipado);
                }

                if (valorTipado < 1000)
                {
                    return TimeSpan.FromSeconds(valorTipado);
                }

                return TimeSpan.FromMilliseconds(valorTipado);
            }



            if (ignorarErro)
            {
                return null;
            }

            throw new ErroNaoImplementado(`O valor ${valor} não pode ser convertido para TimeSpan`);
        }

        public static ConverterValorPrimario(valor: any, tipoPrimarioEnum: Snebur.Reflexao.EnumTipoPrimario): any
        {
            switch (tipoPrimarioEnum)
            {
                case r.EnumTipoPrimario.Guid:
                case r.EnumTipoPrimario.String: {

                    return this.ParaString(valor);
                }
                case r.EnumTipoPrimario.Long:
                case r.EnumTipoPrimario.Integer: {

                    return this.ParaInteiro(valor);
                }
                case r.EnumTipoPrimario.Boolean: {

                    return this.ParaBoolean(valor);
                }
                case r.EnumTipoPrimario.Double:
                case r.EnumTipoPrimario.Decimal: {

                    return this.ParaDecimal(valor);
                }
                case r.EnumTipoPrimario.DateTime: {

                    return this.ParaData(valor, $Configuracao.TipoData);
                }
                case r.EnumTipoPrimario.EnumValor: {

                    return ConverterUtil.ParaInteiro(valor);
                }
                default: {
                    throw new ErroConverter("A conversão não é suportada", this);
                }
            }
        }

        public static ParaTipoRecomendado(valor: any): any
        {
            if (ValidacaoUtil.IsNumber(valor, true))
            {
                const valorTipado = parseFloat(valor);
                if (ValidacaoUtil.IsInteger(valorTipado))
                {
                    return ConverterUtil.ParaInteiro(valorTipado);
                }
                else
                {
                    return ConverterUtil.ParaDecimal(valorTipado);
                }
            }
            if (ValidacaoUtil.IsBoolean(valor, true))
            {
                return ConverterUtil.ParaBoolean(valor);
            }
            if (ValidacaoUtil.IsDate(valor, true))
            {
                return ConverterUtil.ParaData(valor);
            }
            if (ValidacaoUtil.IsString(valor))
            {
                if(valor === "null")
                {
                    return null;
                }
                ConverterUtil.ParaString(valor);
            }
            return valor;

        }

        public static StringParaTamanho(valor: any, inteiro: boolean): Snebur.Dominio.Dimensao
        {
            inteiro = this.ParaBoolean(inteiro);
            if (ValidacaoUtil.IsString(valor))
            {
                const valores = this.ParaString(valor).toLowerCase().split("x");

                if (valores.length === 2)
                {
                    const largura = this.ParaNumero(valores[0], inteiro);
                    const altura = this.ParaNumero(valores[1], inteiro);

                    return new Snebur.Dominio.Dimensao(largura, altura);
                }
            }
            return new Snebur.Dominio.Dimensao(0, 0);
        }

        public static StringParaArray(valor: string, separador: string): Array<string>
        {
            const resultado = new Array<string>();
            if (!String.IsNullOrWhiteSpace(valor))
            {
                const partes = valor.split(separador);
                const len = partes.length;
                for (let i = 0; i < len; i++)
                {
                    const parte = partes[i];
                    if (!String.IsNullOrWhiteSpace(parte))
                    {
                        resultado.Add(parte);
                    }
                }
            }
            return resultado;
        }

        public static ParaErro(obj: any): Error
        {
            if (!u.ValidacaoUtil.IsDefinido(obj))
            {
                throw new Erro("O argumento obj não foi definido");
            }
            if (obj instanceof Error)
            {
                return obj;
            }
            return new Erro((obj as object).toString());
        }

        public static BooleanParaNumero(valor: boolean): number
        {
            return (valor) ? 1 : 0;
        }
         
        private static NormalizarPontosVirgula(valor: string): string
        {
            const posicaoPonto = valor.lastIndexOf(".");
            const posicaoVirguala = valor.lastIndexOf(",");
            const posicaoPontoOuVirgula = Math.max(posicaoPonto, posicaoVirguala);
            if (posicaoPontoOuVirgula > 0)
            {
                const isNegativo = (valor.trim().charAt(0) === "-");
                const resultado = TextoUtil.RetornarSomenteNumeros(valor.substring(0, posicaoPontoOuVirgula)) + "." +
                    TextoUtil.RetornarSomenteNumeros(valor.substring(posicaoPontoOuVirgula));
                if (isNegativo)
                {
                    return "-" + resultado;
                }
                return resultado;

            }
            return valor;
        }

        //#region Converter cores

        public static ConverterHexaParaRgba(value: string): string
        {
            if (!String.IsNullOrWhiteSpace(value))
            {
                if (ValidacaoUtil.IsCorHexa(value))
                {
                    return ConverterUtil.ConverterHexaParaRgbaInterno(value);
                }
                if (ValidacaoUtil.IsCorRgbOuRgba)
                {
                    return new Cor(value).Rgba;
                }
                return Cores.Preto.Rgba;
            }
            throw new Erro(`O valor ${value} não ´é uma cor suportada`);
        }

        private static ConverterHexaParaRgbaInterno(corHexa: string): string
        {
            if (corHexa.StartsWith("#"))
            {
                corHexa = corHexa.substring(1);
            }

            if (corHexa.length === 3)
            {
                const r = parseInt(corHexa.substring(0, 1), 16);
                const g = parseInt(corHexa.substring(1, 1), 16);
                const b = parseInt(corHexa.substring(2, 1), 16);
                return ConverterUtil.RetornarRgbaCorInterno(r, g, b, 255);
            }

            const strR = corHexa.substring(0, 2) ?? "00";
            const strG = corHexa.substring(2, 4) ?? "00";
            const strB = corHexa.substring(4, 6) ?? "00";
            const strA = corHexa.length === 8 ? corHexa.substring(6, 8) : "FF";

            const r = parseInt(strR, 16);
            const g = parseInt(strG, 16);
            const b = parseInt(strB, 16);
            const a = parseInt(strA, 16);

            return ConverterUtil.RetornarRgbaCorInterno(r, g, b, a);
        }

        private static RetornarRgbaCorInterno(red: number, green: number, blue: number, alpha: number): string
        {
            red = NormalizacaoUtil.NormalizarByte(red);
            green = NormalizacaoUtil.NormalizarByte(green);
            blue = NormalizacaoUtil.NormalizarByte(blue);
            alpha = NormalizacaoUtil.NormalizarByte(alpha);
            const alphaDecimal = (alpha / Number.Uint8MaxValue).ToDecimal();
            return `rgba(${red},${green}, ${blue}, ${alphaDecimal})`;
        }

        //#endregion

        public static ParaDimensao(dimensaoTexto: string, isIgnorarErro: boolean)
        {
            if (dimensaoTexto != null)
            {
                dimensaoTexto = dimensaoTexto.trim().toLowerCase();
                const separador = dimensaoTexto.toLocaleLowerCase().indexOf("x") ? "x" : ";";
                const partes = dimensaoTexto.split(separador);
                if (partes.length === 2)
                {
                    const largura = ConverterUtil.ParaNumero(partes[0]);
                    const altura = ConverterUtil.ParaNumero(partes[1]);

                    if (largura > 0 && altura > 0)
                    {
                        return new Dimensao(largura, altura);
                    }
                }
            }

            if (!isIgnorarErro)
            {
                throw new Erro(`Não foi possível converter a expressão ${dimensaoTexto} para Dimensão`);
            }
            return null;

        }

        public static ParaMelhorTipo(valor: string): any
        {
            if (typeof valor === "string" &&
                !String.IsNullOrWhiteSpace(valor))
            {
                if (ValidacaoUtil.IsNumber(valor, true))
                {
                    return parseFloat(valor);
                }

                if (ValidacaoUtil.IsBoolean(valor, true))
                {
                    return ConverterUtil.ParaBoolean(valor);
                }

                if (ValidacaoUtil.IsDate(valor, true))
                {
                    const data = ConverterUtil.ParaData(valor, $Configuracao.TipoData, true);
                    if (data != null && ValidacaoUtil.IsDataValida(data))
                    {
                        return data;
                    }
                }
            }
            return valor;
        }
    }
}