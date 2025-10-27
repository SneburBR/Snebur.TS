namespace Snebur.Utilidade
{
    export class JsonUtil
    {
        private static __isSerializado: boolean = false
        

        public static get IsSerializado(): boolean
        {
            return JsonUtil.__isSerializado;
        }

        public static Serializar(obj: any, isIdentar?: boolean): string
        {
            if (JsonUtil.IsSerializado)
            {
                throw new Erro("Já existe um precesso serialização ou desserializado em andamento.");
            }
            try
            {
                JsonUtil.__isSerializado = true;
                return JsonUtil.SerializarInterno(obj, isIdentar);
            }
            catch (erro)
            {
                throw new Erro(`Falha ao serializar objeto: ${obj} - ${ErroUtil.RetornarErro(erro)}`);
            }
            finally
            {
                JsonUtil.__isSerializado = false;
            }
        }
        private static SerializarInterno(obj: any, isIdentar?: boolean): string
        {
            const serializador = new Snebur.Serializacao.JsonSerializar(isIdentar);
            const json = serializador.Serializar(obj);
            serializador.Dispose();
            return json;
        }

        public static Deserializar<T extends d.BaseDominio>(
            json: string,
            tipoOuConstrutor: r.BaseTipo | IConstrutor<T>): T
        {
            if (JsonUtil.IsSerializado)
            {
                throw new Erro("Já existe um precesso serialização ou desserializado em andamento.");
            }
            try
            {
                JsonUtil.__isSerializado = true;
                return JsonUtil.DeserializarInterno(json, tipoOuConstrutor);
            }
            catch (erro)
            {
                throw new Erro(`Falha ao desserializar json: ${json.substring(0, 1000)} - ${ErroUtil.RetornarErro(erro)}`);
            }
            finally
            {
                JsonUtil.__isSerializado = false;
            }

        }
        //public static Deserializar<T extends d.BaseDominio>(json: any, tipo: d.BaseDominioConstrutor<T>): T

        public static DeserializarInterno<T extends d.BaseDominio>(
            json: string,
            tipoOuConstrutor: r.BaseTipo | IConstrutor<T>): T
        {
            const tipo = tipoOuConstrutor instanceof r.BaseTipo ? tipoOuConstrutor : tipoOuConstrutor.GetType();
            const deserializador = new Snebur.Serializacao.JsonDeserializar();
            const objetoTipado = deserializador.Deserializar(json, tipo);
            deserializador.Dispose();
            return objetoTipado as T;
        }

        public static IsJson(conteudo: string)
        {
            if (typeof conteudo === "string" &&
                !String.IsNullOrWhiteSpace(conteudo))
            {
                conteudo = conteudo.trim();
                return ((conteudo.StartsWith("{") && conteudo.EndsWith("}")) ||
                    (conteudo.StartsWith("[") && conteudo.EndsWith("]")));
            }
            return false;
        }

        public static SerializarData(data: Date): string
        {
            return JsonUtil.SerializarValorTipoPrimario(data, r.EnumTipoPrimario.DateTime);
        }

        public static DeserializarData(dataString: string): Date
        {
            return ConverterUtil.ParaDataHora(JSON.parse(dataString));
        }

        public static RetornarPropriedadesSerializavel(tipo: r.BaseTipo, arg1: boolean): ReadonlyArray<r.Propriedade>
        {
            return tipo.RetornarPropriedades(false);
        }

        public static TrySerializar(obj: any): string | null
        {
            try
            {
                return JSON.stringify(obj);
            }
            catch (erro)
            {
                console.error(`Falha ao serializar objeto: ${obj} - ${ErroUtil.RetornarErro(erro)}`);
                return null;
            }
        }

        public static SerializarValorTipoPrimario(valorPrimario: any, tipoPrimarioEnum: r.EnumTipoPrimario): string
        {
            switch (tipoPrimarioEnum)
            {
                case (r.EnumTipoPrimario.Object): {

                    const tipo: r.TipoPrimario = valorPrimario.GetType();
                    if (tipo.TipoPrimarioEnum === r.EnumTipoPrimario.Object)
                    {
                        throw new Erro("O tipo primeiro não pode ser serializado");
                    }

                    if (tipo instanceof r.TipoPrimario)
                    {
                        return JsonUtil.SerializarValorTipoPrimario(valorPrimario, tipo.TipoPrimarioEnum);
                    }
                    throw new ErroNaoSuportado("O tipo object não é suportado", this);
                }
                case (r.EnumTipoPrimario.String):
                case (r.EnumTipoPrimario.Guid):
                case (r.EnumTipoPrimario.Char):

                    return JSON.stringify(u.ConverterUtil.ParaString(valorPrimario));

                case (r.EnumTipoPrimario.Boolean):

                    return u.ConverterUtil.ParaBoolean(valorPrimario).ToString().toLowerCase();

                case (r.EnumTipoPrimario.Byte):
                case (r.EnumTipoPrimario.Integer):
                case (r.EnumTipoPrimario.Long):
                case (r.EnumTipoPrimario.EnumValor):

                    return u.ConverterUtil.ParaInteiro(valorPrimario).ToString();

                case (r.EnumTipoPrimario.Decimal):

                    return u.ConverterUtil.ParaDecimal(valorPrimario).ToString();

                case (r.EnumTipoPrimario.Double):

                    return valorPrimario.ToString();

                case (r.EnumTipoPrimario.TimeSpan): {

                    const timeSpam = u.ConverterUtil.ParaTimeSpan(valorPrimario);
                    const ticksMilisegundos = timeSpam.Milliseconds * TimeSpan.TicksMilesegundo;
                    const jsonTimeSpan = `"${timeSpam.Days}.${timeSpam.Hours}:${timeSpam.Minutes}:${timeSpam.Seconds}.${ticksMilisegundos}"`;
                    return jsonTimeSpan;
                }
                case (r.EnumTipoPrimario.DateTime): {

                    const data = u.ConverterUtil.ParaDataHora(valorPrimario);
                    const milesegundos = parseInt(data.getTime().ToString(), 10);
                    const dataSerializada = '"\\/Date(' + milesegundos + ')\\/"';
                    return dataSerializada;
                }
                default:

                    throw new ErroNaoSuportado("O tipo primário não é suportado", this);
            }
        }

    }
}