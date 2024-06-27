namespace Snebur.Serializacao
{
    export class NormalizarDeserializacao implements IDisposable
    {
        private static readonly MAXIMO = 100000000;
        private Contador = 1;

        private readonly Json: string;
        private readonly Objeto: any;

        private readonly ObjetosAnalisados = new HashSet<number>();
        private readonly ObjetosBaseDominioAnalisados = new HashSet<string>();

        private BasesDominioOrigem = new DicionarioSimples<IBaseDominioReferencia>();
        private BasesDominioReferenciadas = new List<BaseDominioRefenciada>();

        public constructor(json: string, objeto: any)
        {
            this.Json = json;
            this.Objeto = objeto;
        }

        public Normalizar(): void
        {
            this.PopularReferencias();

            for (const baseNegocioRefernciada of this.BasesDominioReferenciadas)
            {
                if (!this.BasesDominioOrigem.ContainsKey(baseNegocioRefernciada.IdentificadorReferencia))
                {
                    throw new ErroSerializacao(this.Json, new Erro("A base de origem não foi encontrada na deserialização"));
                }
                const baseOrigem = this.BasesDominioOrigem.Item(baseNegocioRefernciada.IdentificadorReferencia);
                this.SubstiuirReferencia(baseNegocioRefernciada.Referencia, baseOrigem);
            }

        }

        private SubstiuirReferencia(referencia: Referencia, baseDominio: IBaseDominioReferencia): void
        {
            if (referencia instanceof ReferenciaPropriedade)
            {
                //var objetoPai = this.NormalizarObjetoPai(referencia.ObjetoPai);
                const objetoPai = referencia.ObjetoPai;
                (objetoPai as any as IObjetoControladorPropriedade).DesativarObservadorPropriedadeAlterada();
                referencia.Propriedade.AtribuirValor(objetoPai, baseDominio);
                (objetoPai as any as IObjetoControladorPropriedade).AtivarObservadorPropriedadeAlterada();
                return;
            }

            if (referencia instanceof ReferenciaColecao)
            {
                referencia.Colecao[referencia.Posicao] = baseDominio;
                return;
            }

            if (referencia instanceof ReferenciaDicionario)
            {
                referencia.Dicionario.AtribuirItem(referencia.Chave, baseDominio);
                return;
            }

            if (referencia instanceof ReferenciaRaiz)
            {
                throw new Erro("Referencia do tipo Raiz não pode ser referenciada");
            }
            throw new Erro("Referencia não suportada");

        }

        //private NormalizarObjetoPai(objeto: any): any
        //{
        //    if (this.IsBaseDominio(objeto))
        //    {
        //        var identificadorReferencia = objeto.RetornarIdentificadorReferencia();
        //        if (this.BasesDominioOrigem.ContainsKey(identificadorReferencia))
        //        {
        //            return this.BasesDominioOrigem.Item(identificadorReferencia);
        //        }
        //    }
        //    return objeto;
        //}

        private PopularReferencias(): void
        {
            if (this.Objeto instanceof d.BaseDominio)
            {
                this.AdicioanrReferenciaRaiz(this.Objeto as any);
            }
            this.VarrerObjeto(this.Objeto);
        }

        private VarrerObjeto(objeto: any): void
        {
            this.Contador += 1;

            if (this.Contador > NormalizarDeserializacao.MAXIMO)
            {
                throw new Erro("Falha ao preparar objeto para serialização, o numero máximo de analise foi atingido");
            }

            if (objeto == null)
            {
                return;
            }
            const tipo = objeto.GetType();
            if (tipo instanceof r.TipoPrimario || this.IsObjetoAnalisado(objeto))
            {
                return;
            }

            this.AdicionarObjetoAnalizado(objeto);
            if (objeto instanceof Array || Array.isArray(objeto))
            {
                const colecao = objeto;
                if (colecao.Count > 0)
                {

                    const tipoItem = colecao[0].GetType();
                    if (tipoItem instanceof r.TipoPrimario)
                    {
                        return;
                    }

                    for (let posicao = 0; posicao < colecao.Count; posicao++)
                    {
                        const item = colecao[posicao];
                        if (this.IsBaseDominio(item))
                        {
                            this.AdicioanrReferenciaColecao(item as any, colecao, posicao);
                        }
                        this.VarrerObjeto(item);
                    }
                }

            }
            else if (objeto instanceof DicionarioSimples)
            {
                for (const chave of objeto.Chaves)
                {
                    const item = objeto.Item(chave);
                    if (this.IsBaseDominio(item))
                    {
                        this.AdicioanrReferenciaDicionario(item as any, objeto, chave);
                    }
                    else
                    {
                        break;
                    }
                    this.VarrerObjeto(item);
                }
            }
            else
            {
                const propriedades = JsonUtil.RetornarPropriedadesSerializavel(tipo, false);
                for (const proprieade of propriedades)
                {
                    if (proprieade.IsTipoPrimario)
                    {
                        continue;
                    }

                    const item = proprieade.RetornarValor(objeto);
                    if (this.IsBaseDominio(item))
                    {
                        this.AdicioanrReferenciaPropriedade(item as any, objeto, proprieade);
                    }
                    this.VarrerObjeto(item);
                }
            }
        }



        private AdicioanrReferenciaRaiz(baseDominio: IBaseDominioReferencia): void
        {
            this.AdicioanrReferencia(baseDominio, new ReferenciaRaiz());
        }

        private AdicioanrReferenciaPropriedade(baseDominio: IBaseDominioReferencia, objeto: any, proprieade: r.Propriedade): void
        {
            const referenciaPropriedade = new ReferenciaPropriedade({
                ObjetoPai: objeto,
                Propriedade: proprieade,
            });
            this.AdicioanrReferencia(baseDominio, referenciaPropriedade);
        }

        private AdicioanrReferenciaDicionario(baseDominio: IBaseDominioReferencia, dicionario: DicionarioSimples, chave: string): void
        {
            const referenciaColecao = new ReferenciaDicionario({
                Dicionario: dicionario,
                Chave: chave
            });
            this.AdicioanrReferencia(baseDominio, referenciaColecao);
        }


        private AdicioanrReferenciaColecao(baseDominio: IBaseDominioReferencia, colecao: any[], posicao: number): void
        {
            const referenciaColecao = new ReferenciaColecao({
                Colecao: colecao,
                Posicao: posicao
            });
            this.AdicioanrReferencia(baseDominio, referenciaColecao);
        }


        private AdicioanrReferencia(baseDominio: IBaseDominioReferencia, referencia: Referencia): void
        {

            if (baseDominio.__IsBaseDominioReferencia)
            {
                this.BasesDominioReferenciadas.Add(new BaseDominioRefenciada({
                    BaseDominio: baseDominio,
                    IdentificadorReferencia: baseDominio.__IdentificadorReferencia,
                    Referencia: referencia
                }));
            }
            else
            {
                if (baseDominio.__IdentificadorUnico)
                {
                    if (!this.BasesDominioOrigem.ContainsKey(baseDominio.__IdentificadorUnico))
                    {
                        this.BasesDominioOrigem.Add(baseDominio.__IdentificadorUnico, baseDominio);
                    }
                }
            }

        }

        private IsObjetoAnalisado(objeto: any): boolean
        {
            if (this.IsBaseDominio(objeto))
            {
                return this.ObjetosBaseDominioAnalisados.Contains((objeto as any as IBaseDominioReferencia).__IdentificadorUnico);

            }
            return this.ObjetosAnalisados.Contains(objeto.GetHashCode());
        }

        private AdicionarObjetoAnalizado(objeto: any): void
        {
            if (this.IsBaseDominio(objeto))
            {
                this.ObjetosBaseDominioAnalisados.Add((objeto as any as IBaseDominioReferencia).__IdentificadorUnico);
            }
            this.ObjetosAnalisados.Add(objeto.GetHashCode());
        }

        private IsBaseDominio(item: any): item is d.BaseDominio
        {
            return item instanceof d.BaseDominio;
            //throw new Error("Method not implemented.");
        }

        public Dispose(): void
        {
            this.ObjetosAnalisados.Clear();
            this.BasesDominioOrigem.Clear();
            this.BasesDominioReferenciadas.Clear();

            (this as any).Objeto = null;
            (this as any).Json = null;

            this.BasesDominioOrigem = null;
            this.BasesDominioReferenciadas = null;

            delete (this as any).Objeto;
            delete (this as any).ObjetosAnalisados;
            delete (this as any).BasesDominioOrigem;
            delete (this as any).BasesDominioReferenciadas;
        }
    }
}
