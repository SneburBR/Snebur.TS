namespace Snebur.Serializacao
{
    export class JsonSerializar extends BaseJsonSerializacao implements IDisposable
    {
        //private ObjsetosAnalisados: c.Dicionario<any>;
        private __ObjsetosSerializados: any = {};

        private static NOME_PROPRIEDADE_PROTEGIDA_ENTIDADES_REMOVIDAS: string = "$EntidadesRemovidas";

        private readonly Separador: string;
        private readonly IsIdentar: boolean;

        public constructor(isIdentar?: boolean)
        {
            super();
            this.IsIdentar = isIdentar ?? $Configuracao.IsDebug;
            this.Separador = this.IsIdentar ? ",\r\n" : ",";

        }

        public Serializar(objeto: any): string
        {
            if (!u.ValidacaoUtil.IsDefinido(objeto))
            {
                return "null";
            }
            if (!(objeto instanceof d.BaseDominio))
            {
                throw new ErroNaoDefinido("Somente objetos tipo base domínio pode ser serializados", this);
            }

            const preparar = new PrapararSerializacao(objeto);
            try
            {

                preparar.Preparar();
                return this.RetornarObjsetoSerializado(objeto);
            }
            catch (ex)
            {
                LogUtil.Erro(ex, "Falha na serialização");
                throw ex;

            }
            finally
            {
                preparar.Normalizar();
                preparar.Dispose();
            }
        }

        private RetornarObjsetoSerializado(objeto: any): string
        {
            if (objeto == null)
            {
                return "null";
            }

            const tipo = objeto.GetType();
            switch (true)
            {
                case (tipo instanceof r.TipoBaseDominio):

                    return this.RetornarBaseDominioSerializada(objeto);

                case (tipo instanceof r.BaseTipoLista):

                    throw new ErroNaoSuportado("Não suporte, precisa obter o tipo genérico da lista para conversar com servidor.", this);
                //return this.RetornarListaSerializada(objeto as Array<any>);

                case (tipo instanceof r.TipoPrimario):

                    if ((tipo as r.TipoPrimario).TipoPrimarioEnum === r.EnumTipoPrimario.Object)
                    {
                        throw new ErroNaoSuportado("O tipo primário Object não é suportado na serialização", this);
                    }
                    return this.RetornarValorObjetoTipoPrimarioSerializado(objeto);

                case (tipo instanceof r.TipoEnum):

                    return this.RetornarValorEnumSerializado(objeto);

                default:
                    throw new ErroNaoSuportado("O tipo do objeto não é suportado", this);
            }
        }

        private NivelIdentacao: number = 0;
        private get TAB(): string
        {
            if (this.IsIdentar)
            {
                return "    ".repeat(this.NivelIdentacao);
            }
            return String.Empty;
        }

        private RetornarBaseDominioSerializada(objeto: IBaseDominioReferencia): string
        {
            this.NivelIdentacao += 1;

            const tipoObjeto = objeto.__RetornarTipo();

            //if (!(objeto instanceof d.BaseTipoComplexo))
            //{
            if (this.__ObjsetosSerializados[objeto.__IdentificadorUnico])
            {
                throw new ErroSerializacao("O objeto já serializado, possível referencia circular", this);
            }
            this.__ObjsetosSerializados[objeto.__IdentificadorUnico] = true;
            //}

            const tab = this.TAB;
            const sb = new StringBuilder();
            sb.Append(`${tab}"$type": "${tipoObjeto.AssemblyQualifiedName}"`);

            //if (objeto.__IsReferenciado)
            //{
            sb.Append(`${tab}"__IdentificadorUnico": "${objeto.__IdentificadorUnico}"`);
            //}

            if (objeto.__IsBaseDominioReferencia)
            {
                sb.Append(`${tab}"__IdentificadorReferencia": "${objeto.__IdentificadorReferencia}"`);
                sb.Append(`${tab}"__IsBaseDominioReferencia": true`);
            }


            const propriedades = tipoObjeto.RetornarPropriedades();
            const len = propriedades.length;
            if (len > 0)
            {
                for (let i = 0; i < len; i++)
                {
                    const propriedade: r.Propriedade = propriedades[i];
                    const valorPropriedade = (objeto as any)[propriedade.Nome];
                    if (this.IsSerializarPropriedade(objeto, propriedade, valorPropriedade))
                    {
                        sb.Append(`${tab}"${propriedade.Nome}": ${this.RetornarValorPropriedadeSerializado(valorPropriedade, propriedade)}`);
                    }
                }
            }
            this.NivelIdentacao -= 1;

            const jsonBaseDominio = sb.ToString(this.Separador);
            sb.Dispose();
            if (this.IsIdentar)
            {
                return `{\r\n${jsonBaseDominio}\r\n${this.TAB}}`;
            }
            return `{${jsonBaseDominio}}`;

        }

        private IsSerializarPropriedade(objeto: object, propriedade: r.Propriedade, valorPropriedade: any): boolean
        {
            if (valorPropriedade != null)
            {
                if (propriedade.Nome === "__PropriedadesAlteradas")
                {
                    if (objeto instanceof d.Entidade && objeto.Id > 0)
                    {
                        return valorPropriedade.Count > 0;
                    }
                    return false;
                }

                if (valorPropriedade instanceof Array || Array.isArray(valorPropriedade))
                {
                    return valorPropriedade.length > 0 ||
                        ((valorPropriedade as any as IListaEntidades).EntidadesRemovida != null &&
                            (valorPropriedade as any as IListaEntidades).EntidadesRemovida.Count > 0);
                }
                return true;
            }
            return false;
        }

        private RetornarValorPropriedadeSerializado(valorPropriedade: any, propriedade: Snebur.Reflexao.Propriedade): string
        {
            if (valorPropriedade == null)
            {
                return this.RetornarValorPropriedadeNuloSerializado(valorPropriedade, propriedade);
            }
            const tipoPropriedade = propriedade.Tipo;
            switch (true)
            {
                case (tipoPropriedade instanceof r.BaseTipoLista):

                    return this.RetornarListaSerializada(valorPropriedade as Array<any>, tipoPropriedade as r.BaseTipoLista);

                case (tipoPropriedade instanceof r.TipoPrimario): {

                    const tipoPrimario = tipoPropriedade as r.TipoPrimario;
                    return JsonSerializar.RetornarValorTipoPrimarioSerializado(valorPropriedade as Array<any>, tipoPrimario.TipoPrimarioEnum);
                }
                case (tipoPropriedade instanceof r.TipoBaseDominio):

                    return this.RetornarBaseDominioSerializada(valorPropriedade);

                case (tipoPropriedade instanceof r.TipoEnum):

                    return this.RetornarValorEnumSerializado(valorPropriedade);

                default:
                    throw new ErroNaoSuportado("O tipo da propriedade não é suportado {0}", propriedade.Nome);
            }
        }

        private RetornarValorPropriedadeNuloSerializado(valorPropriedade: any, propriedade: r.Propriedade): string
        {
            if (propriedade.AceitaNulo)
            {
                return "null";
            } else
            {
                const valorNuloPadrao = u.ConverterUtil.RetornarValorNuloPadrao(propriedade.Tipo);
                if (!u.ValidacaoUtil.IsDefinido(propriedade))
                {
                    throw new ErroNaoSuportado("O valor nulo do tipo  não é suportado", this);
                }
                return this.RetornarValorPropriedadeSerializado(valorNuloPadrao, propriedade);
            }
        }



        private RetornarListaSerializada(lista: Array<any>, tipoLista: r.BaseTipoLista): string
        {

            this.NivelIdentacao += 1;
            const tab = this.TAB;

            const sb = new StringBuilder();

            sb.Append(`${tab}"$type": "${tipoLista.AssemblyQualifiedName}"`);

            if (tipoLista instanceof r.TipoDicionario)
            {
                const dicionario = (lista as any) as DicionarioSimples<any>;
                if (dicionario.Count > 0)
                {
                    sb.Append(",", this.IsIdentar);
                    sb.Append(this.RetornarValoresDicionarioSerializado(dicionario, tipoLista));
                }
            }
            else
            {
                sb.Append(",", this.IsIdentar);
                sb.Append(`${tab}"$values" : ${this.RetornarValoresListaSerializado(lista)}`);

                if (tipoLista instanceof r.TipoListaEntidade)
                {
                    const entidadesRemovidas = ((lista as any) as IListaEntidades).EntidadesRemovida?.Where(x => x.Id > 0);
                    if (entidadesRemovidas?.length > 0)
                    {
                        const tiposEntidade = String.Join(", ", entidadesRemovidas.Select(x => x.GetType().Nome).Distinct());

                        console.error(` BUG CONHECIDO: as Relações NN possui um bug quando uma ou mais entidade é removida o sistema salvando está alteração. 
                                        A correção desse BUG depende de uma modificação na biblioteca Newtonsoft.Json alterando o código fonte original
                                        Tipos da entidades: ${tiposEntidade}`);
                        //sb.Append(",", this.IsIdentar);
                        //sb.Append(`${tab}"${JsonSerializar.NOME_PROPRIEDADE_PROTEGIDA_ENTIDADES_REMOVIDAS}" : ${this.RetornarValoresListaSerializado(entidadesRemovidas)}`);
                    }
                }
            }

            this.NivelIdentacao -= 1;

            const jsonLista = sb.ToString();
            sb.Dispose();
            if (this.IsIdentar)
            {
                return `{\r\n${jsonLista}\r\n${this.TAB}}`;
            }
            return `{${jsonLista}}`;
        }

        private RetornarValoresListaSerializado(lista: Array<any>): string
        {
            this.NivelIdentacao += 1;

            const tab = this.TAB;
            const sb = new StringBuilder();
            const len = lista.length;

            if (len > 0)
            {
                for (let i = 0; i < len; i++)
                {
                    const item = lista[i];
                    sb.Append(`${tab}${this.RetornarObjsetoSerializado(item)}`);
                }
            }


            const jsonValores = sb.ToString(this.Separador);
            sb.Dispose();
            this.NivelIdentacao -= 1;
            if (this.IsIdentar)
            {
                return `[\r\n${jsonValores}\r\n${this.TAB}]`;
            }
            return `[${jsonValores}]`;
        }

        private RetornarValoresDicionarioSerializado(dicionario: DicionarioSimples<any>, tipo: r.TipoDicionario): string
        {
            this.NivelIdentacao += 1;
            const sb = new StringBuilder();
            const chaves = dicionario.Chaves;
            const len = chaves.Count;
            const tab = this.TAB;

            for (let i = 0; i < len; i++)
            {
                const chave = chaves[i];
                const itemValor = dicionario.Item(chave);
                const valor = this.RetornarObjsetoSerializado(itemValor);
                sb.Append(`${tab}"${chave}" : ${valor}`);
            }
            const jsonDicionario = sb.ToString(this.Separador);
            this.NivelIdentacao -= 1;
            sb.Dispose();
            return jsonDicionario;
        }

        private RetornarValorObjetoTipoPrimarioSerializado(objeto: any): string
        {
            if (!u.ValidacaoUtil.IsDefinido(objeto))
            {
                return "null";
            }
            const tipo = objeto.GetType();
            if (!(tipo instanceof r.TipoPrimario))
            {
                throw new ErroNaoSuportado("O tipo do objeto não é suportado", this);
            }
            return JsonSerializar.RetornarValorTipoPrimarioSerializado(objeto, (tipo as r.TipoPrimario).TipoPrimarioEnum);
        }

        public static RetornarValorTipoPrimarioSerializado(valorPrimario: any, tipoPrimarioEnum: r.EnumTipoPrimario): string
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
                        return JsonSerializar.RetornarValorTipoPrimarioSerializado(valorPrimario, tipo.TipoPrimarioEnum);
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

        private RetornarValorEnumSerializado(objeto: any): string
        {
            return u.ConverterUtil.ParaInteiro(objeto).ToString();
        }

        public Dispose()
        {
            delete this.__ObjsetosSerializados;
        }
    }
}