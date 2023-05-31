namespace Snebur.Utilidade
{
    export class JsonUtil
    {
        public static Serializar(obj: any, isIdentar?: boolean): string
        {
            const serializador = new Snebur.Serializacao.JsonSerializar(isIdentar);
            const json = serializador.Serializar(obj);
            serializador.Dispose();
            return json;
        }

        //public static Deserializar<T extends d.BaseDominio>(json: any, tipo: d.BaseDominioConstrutor<T>): T
        public static Deserializar<T extends d.BaseDominio>(json: string, construtor: IConstrutor<T>): T
        public static Deserializar<T>(json: string, tipo: r.BaseTipo): T
        public static Deserializar<T extends d.BaseDominio>(json: any, tipoOuConstrutor: r.BaseTipo | IConstrutor<T>): T
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
            return Serializacao.JsonSerializar.RetornarValorTipoPrimarioSerializado(data, r.EnumTipoPrimario.DateTime);
        }

        public static DeserializarData(dataString: string): Date
        {
            return ConverterUtil.ParaDataHora(JSON.parse(dataString));
        }

        public static RetornarPropriedadesSerializavel(tipo: r.BaseTipo, arg1: boolean): r.Propriedade[]
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
    }
}