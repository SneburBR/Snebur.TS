//namespace Snebur.Comunicacao.Serializacao
//{
//    export class PrepararSerializacao implements IDisposable
//    {
//        //private ObjsetosAnalisados: Dicionario<any>;
//        private BasesDominio: DicionarioSimples<d.BaseDominio>;

//        public constructor()
//        {
//            this.BasesDominio = new DicionarioSimples<any>();
//        }

//        public Preparar(obj: any)
//        {
//            this.PrepararParaSerializacao(obj);
//        }

//        private PrepararLista(lista: Array<any>)
//        {
//            for (var item of lista)
//            {
//                if ((item instanceof d.BaseDominio) &&
//                    this.BasesDominio.Existe((item as d.BaseDominio).__IdentificadorUnico))
//                {
//                    let posicao = lista.indexOf(item);
//                    lista[posicao] = this.RetornarBaseDominioReferencia(item as d.BaseDominio);

//                } else
//                {
//                    this.PrepararParaSerializacao(item);
//                }
//            }
//        }

//        private PrepararDicionario(dicionario : DicionarioSimples<any>): void
//        {
//            for (var chave of dicionario.Chaves)
//            {
//                let item = dicionario.Item(chave);
//                if ((item instanceof d.BaseDominio) &&
//                    this.BasesDominio.Existe((item as d.BaseDominio).__IdentificadorUnico))
//                {
//                    dicionario.AtribuirItem(chave, this.RetornarBaseDominioReferencia(item as d.BaseDominio));

//                } else
//                {
//                    this.PrepararParaSerializacao(item);
//                }
//            }
//        }

//        private PrepararParaSerializacao(obj: any): void
//        {
//            if (u.ValidacaoUtil.IsArray(obj))
//            {
//                this.PrepararLista(obj);

//            }
//            else if (obj instanceof DicionarioSimples)
//            {
//                this.PrepararDicionario(obj);
//            }
//            else
//            {
//                if (obj instanceof d.BaseDominio)
//                {
//                    let baseDominio: d.BaseDominio = obj as d.BaseDominio;
//                    if (this.BasesDominio.Existe(baseDominio.__IdentificadorUnico))
//                    {
//                        throw new ErroOperacaoInvalida("Referencia circular", this);
//                    }
//                    this.BasesDominio.Adicionar(baseDominio.__IdentificadorUnico, baseDominio);

//                    let tipo = baseDominio.__RetornarTipo();
//                    let propriedades = tipo.RetornarPropriedades();
//                    let len = propriedades.length;

//                    for (var i = 0; i < len; i++)
//                    {
//                        let propriedade = propriedades[i];
//                        let valorPropriedade = (baseDominio as any)[propriedade.Nome];
//                        if (u.ValidacaoUtil.IsDefinido(valorPropriedade))
//                        {
//                            if ((valorPropriedade instanceof d.BaseDominio) &&
//                                this.BasesDominio.Existe((valorPropriedade as d.BaseDominio).__IdentificadorUnico))
//                            {
//                                // let valorPropriedadeBaseDominio: d.BaseDominio = valorPropriedade as d.BaseDominio;
//                                baseDominio.DesativarNotificacaoPropriedadeAlterada();
//                                (baseDominio as any)[propriedade.Nome] = this.RetornarBaseDominioReferencia(valorPropriedade);
//                                // obj[nomePropriedade] = this.RetornarBaseNegocioReferencia(valorPropriedade);
//                                (baseDominio as any as IObjetoControladorPropriedade).AtivarNotificacaoPropriedadeAlterada();
//                            } else
//                            {
//                                this.PrepararParaSerializacao(valorPropriedade);
//                            }
//                        }
//                    }
//                }
//            }
//        };

//        private RetornarBaseDominioReferencia(baseDominio: d.BaseDominio): d.BaseDominio
//        {
//            let tipoReferencia = baseDominio.__RetornarTipo() as r.TipoBaseDominio;
//            let instanciaReferencia = new tipoReferencia.Construtor();
//            instanciaReferencia.__BaseDominioReferencia = true;
//            instanciaReferencia.AlterarIdentificadorReferencia(baseDominio.RetornarIdentifidcadorReferencia());
//            //entidadeReferencia.$CaminhoReferencia = baseDominio.__CaminhoTipo;
//            return instanciaReferencia;
//        }
//        //#region IDisposable

//        public Dispose(): void
//        {
//            //this.ObjsetosAnalisados.Clear();
//            this.BasesDominio.Clear();
//        }
//        //#endregion
//    }
//}