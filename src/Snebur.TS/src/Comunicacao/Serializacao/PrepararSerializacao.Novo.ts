
namespace Snebur.Serializacao
{
    export class PrapararSerializacao implements IDisposable
    {
        private static readonly MAXIMO = 100000000;
        private Objeto: any;
        private Contador = 1;

        private readonly ObjetosAnalisados = new HashSet<number>();
        private readonly ObjetosBaseDominioAnalisados = new HashSet<string>();

        private readonly BasesDominioOrigem = new DicionarioSimples<BaseDominioOrigem>();
        private readonly BasesDominioReferenciadas = new DicionarioSimples<List<BaseDominioRefenciada>>();

        public constructor(objeto: any)
        {
            this.Objeto = objeto;
        }

        public Preparar(): void
        {
            this.PopularReferencias();
            this.ReferenciarObjetos();
        }

        public Normalizar(): void
        {
            for (const identificadorReferencia of this.BasesDominioReferenciadas.Chaves)
            {
                const basesNegocioRefernciada = this.BasesDominioReferenciadas.Item(identificadorReferencia);
                const baseOrigem = this.BasesDominioOrigem.Item(identificadorReferencia).BaseDominio;

                for (const baseNegocioRefernciada of basesNegocioRefernciada)
                {
                    this.SubstiuirReferencia(baseNegocioRefernciada.Referencia, baseOrigem);
                }

            }
            for (const baseOrigem of this.BasesDominioOrigem.Valores)
            {
                baseOrigem.BaseDominio.IsSerializando = false;
            }
        }

        private ReferenciarObjetos(): void
        {
            for (const basesDominioOrigem of this.BasesDominioOrigem.Valores)
            {
                const baseDominio = basesDominioOrigem.BaseDominio;
                const referencias = basesDominioOrigem.Referencias;

                if (referencias.Count > 1)
                {
                    const refenciaOrigem = referencias.OfType<ReferenciaRaiz>(ReferenciaRaiz).FirstOrDefault() ?? referencias.First();

                    basesDominioOrigem.ReferenciaOrigem = refenciaOrigem;
                    referencias.Remove(refenciaOrigem);

                    for (const referencia of referencias)
                    {
                        this.Referenciar(baseDominio as any, referencia);
                    }
                }
            }
        }

        private Referenciar(baseDominio: d.BaseDominio, referencia: Referencia): void
        {
            const baseDominioReferencia = this.RetornarNovaBaseDominioReferencia(baseDominio, referencia);
            const identificadorReferencia = baseDominioReferencia.IdentificadorReferencia;
            if (!this.BasesDominioReferenciadas.ContainsKey(identificadorReferencia))
            {
                this.BasesDominioReferenciadas.Add(identificadorReferencia, new List<BaseDominioRefenciada>());
            }
            this.BasesDominioReferenciadas.Item(identificadorReferencia).Add(baseDominioReferencia);
            this.SubstiuirReferencia(referencia, baseDominioReferencia.BaseDominio);
        }

        private RetornarNovaBaseDominioReferencia(baseDominio: d.BaseDominio, referencia: Referencia): BaseDominioRefenciada
        {
            const identificadorReferencia = baseDominio.RetornarIdentificadorReferencia();
            const baseDominioRerefencia = new BaseDominioReferencia(baseDominio) as any as IBaseDominioReferencia;

            (baseDominio as any).__IsReferenciado = true;
            return new BaseDominioRefenciada({
                BaseDominio: baseDominioRerefencia,
                Referencia: referencia,
                IdentificadorReferencia: identificadorReferencia
            });
        }

        private PopularReferencias(): void
        {
            if (this.Objeto instanceof d.BaseDominio)
            {
                this.AdicioanrReferenciaRaiz(this.Objeto);
            }
            this.VarrerObjeto(this.Objeto);
        }

        private VarrerObjeto(objeto: any): void
        {
            this.Contador += 1;

            if (this.Contador > PrapararSerializacao.MAXIMO)
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
                const colecao = objeto as Array<any>;
                if (colecao.Count > 0)
                {
                    if (colecao[0] != null)
                    {
                        const tipoItem = colecao[0].GetType();
                        if (tipoItem instanceof r.TipoPrimario)
                        {
                            return;
                        }
                    }

                    for (let posicao = 0; posicao < colecao.Count; posicao++)
                    {
                        const item = colecao[posicao];
                        if (item instanceof d.BaseDominio)
                        {
                            this.AdicioanrReferenciaColecao(item, colecao, posicao);
                        }
                        this.VarrerObjeto(item);
                    }

                }

            }
            else
            {
                const propriedades = JsonUtil.RetornarPropriedadesSerializavel(tipo, false);
                for (const propriedade of propriedades)
                {
                    const item = objeto[propriedade.Nome];
                    if (item instanceof d.BaseDominio)
                    {
                        this.AdicioanrReferenciaPropriedade(item, objeto, propriedade);
                    }
                    this.VarrerObjeto(item);
                }
            }
        }

        private AdicioanrReferenciaRaiz(baseDominio: d.BaseDominio): void
        {
            this.AdicionarReferenciarBaseOrigem(baseDominio, new ReferenciaRaiz());
        }

        private AdicioanrReferenciaPropriedade(baseDominio: d.BaseDominio, objeto: any, proprieade: r.Propriedade): void
        {
            const referenciaPropriedade = new ReferenciaPropriedade({
                ObjetoPai: objeto,
                Propriedade: proprieade,
            });
            this.AdicionarReferenciarBaseOrigem(baseDominio, referenciaPropriedade);
        }

        private AdicioanrReferenciaColecao(baseDominio: d.BaseDominio, colecao: Array<any>, posicao: number)
        {
            const referenciaColecao = new ReferenciaColecao({
                Colecao: colecao,
                Posicao: posicao
            });
            this.AdicionarReferenciarBaseOrigem(baseDominio, referenciaColecao);
        }

        private AdicionarReferenciarBaseOrigem(baseDominio: d.BaseDominio, referencia: Referencia): void
        {
            (baseDominio as any as IBaseDominioReferencia).IsSerializando = true;

            const identificadorReferencia = baseDominio.RetornarIdentificadorReferencia();
            if (!this.BasesDominioOrigem.ContainsKey(identificadorReferencia))
            {
                this.BasesDominioOrigem.Add(identificadorReferencia, new BaseDominioOrigem(baseDominio as any));
            }
            this.BasesDominioOrigem.Item(identificadorReferencia).Referencias.Add(referencia);
        }



        private SubstiuirReferencia(referencia: Referencia, baseDominio: IBaseDominioReferencia)
        {
            if (referencia instanceof ReferenciaPropriedade)
            {
                //let objetoPai = this.NormalizarObjetoPai(referencia.ObjetoPai);
                const objetoPai = referencia.ObjetoPai;
                referencia.Propriedade.AtribuirValor(objetoPai, baseDominio);
                return;
            }

            if (referencia instanceof ReferenciaColecao)
            {
                referencia.Colecao[referencia.Posicao] = baseDominio;
                return;
            }

            throw new Erro("Referencia do tipo Raiz não pode ser referenciada");
        }


        //private NormalizarObjetoPai(objeto: any): any
        //{
        //    if (objeto instanceof d.BaseDominio)
        //    {
        //        let identificadorReferencia = objeto.RetornarIdentificadorReferencia();
        //        if (this.BasesDominioOrigem.ContainsKey(identificadorReferencia))
        //        {
        //            return this.BasesDominioOrigem.Item(identificadorReferencia).BaseDominio;
        //        }
        //    }
        //    return objeto;
        //}

        private IsObjetoAnalisado(objeto: any): boolean
        {
            if (objeto instanceof d.BaseDominio)
            {
                return this.ObjetosBaseDominioAnalisados.Contains((objeto as any as IBaseDominioReferencia).__IdentificadorUnico);

            }
            return this.ObjetosAnalisados.Contains(objeto.GetHashCode());
        }

        private AdicionarObjetoAnalizado(objeto: any): void
        {
            if (objeto instanceof d.BaseDominio)
            {
                this.ObjetosBaseDominioAnalisados.Add((objeto as any as IBaseDominioReferencia).__IdentificadorUnico);
            }
            this.ObjetosAnalisados.Add(objeto.GetHashCode());
        }

        public Dispose(): void
        {
            this.ObjetosAnalisados.Clear();
            this.BasesDominioOrigem.Clear();
            this.BasesDominioReferenciadas.Clear();

            delete (this as any).Objeto;
            delete (this as any).ObjetosAnalisados;
            delete (this as any).BasesDominioOrigem;
            delete (this as any).BasesDominioReferenciadas;
        }


    }


}
