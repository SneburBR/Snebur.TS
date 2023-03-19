namespace Snebur.Serializacao
{
    export class JsonDeserializar extends BaseJsonSerializacao implements IDisposable
    {
        private BasesDominioDeserializadas: DicionarioSimples<d.BaseDominio>;

        public constructor()
        {
            super();
            this.BasesDominioDeserializadas = new DicionarioSimples<d.BaseDominio>();
        }

        public Deserializar<TResultado>(json: string, tipo: r.BaseTipo): TResultado
        {
            const objetoJson = JSON.parse(json);
            const objetoTippado = this.DeserializarObjeto(objetoJson, tipo);

            const normalizar = new NormalizarDeserializacao(json, objetoTippado);
            try
            {
                normalizar.Normalizar();
                return objetoTippado as TResultado;
            }
            catch (ex)
            {
                LogUtil.Erro(ex);
                throw ex;
            }
            finally
            {
                normalizar.Dispose();
            }


            //normalizar.Normalizar();

        }

        private DeserializarObjeto(objetoJson: any, tipo: r.BaseTipo): any
        {
            if (objetoJson == null)
            {
                return null;
            }

            //if (objetoJson instanceof d.BaseDominio)
            //{
            //    if (this.BasesDominioDeserializadas.ContainsKey((objetoJson as d.BaseDominio).GetHashCode()))
            //    {
            //        throw new ErroOperacaoInvalida("Possivel referencia circular", this);
            //    }
            //}
            return this.RetornarValorObjetoTipado(objetoJson, tipo);
        }

        private RetornarValorObjetoTipado(valorObjeto: any, tipo: r.BaseTipo): any
        {
            if (tipo instanceof r.TipoPrimario)
            {
                return u.ConverterUtil.ParaTipoPrimario(valorObjeto, (tipo as r.TipoPrimario).TipoPrimarioEnum);
            }
            if (tipo instanceof r.TipoEnum)
            {
                return u.ConverterUtil.ParaInteiro(valorObjeto);
            }
            if (tipo instanceof r.TipoBaseDominio)
            {
                return this.RetornarValorBaseDominioTipado(valorObjeto, tipo);
            }
            if (tipo instanceof r.TipoDicionario)
            {
                return this.RetornarDicionarioSimples(valorObjeto, tipo);
            }
            if (tipo instanceof r.BaseTipoLista)
            {
                return this.RetornarListaObjetosTipado(valorObjeto as Array<any>, tipo);
            }

            throw new ErroNaoSuportado("O tipo do objeto não é suportado para deserialização", this);
        }

        private RetornarValorBaseDominioTipado(objeto: IBaseDominioReferencia, tipo: r.TipoBaseDominio)
        {
            if (!u.ValidacaoUtil.IsDefinido(objeto))
            {
                return null;
            }
            const caminhoTipo = (objeto as ICaminhoTipo).__CaminhoTipo;
            if (String.IsNullOrWhiteSpace(caminhoTipo))
            {
                throw new ErroNaoDefinido("O caminho do tipo não está definido", this);
            }
            const tipoEspecializado: r.TipoBaseDominio = $Reflexao.Tipos.Item(caminhoTipo) as r.TipoBaseDominio;
            if (!(tipoEspecializado instanceof r.TipoBaseDominio))
            {
                throw new ErroNaoSuportado("O tipo não suportado", this);
            }
            const baseDominio: d.BaseDominio = new (tipoEspecializado.Construtor as any);
            (baseDominio as any as IObjetoControladorPropriedade).DesativarNotificacaoPropriedadeAlterada();

            if ((objeto as IBaseDominioReferencia).__IdentificadorUnico != null)
            {
                (baseDominio as any as IBaseDominioReferencia).__IdentificadorUnico = objeto.__IdentificadorUnico;
            }

            if (objeto.__IsBaseDominioReferencia)
            {
                (baseDominio as any as IBaseDominioReferencia).__IdentificadorReferencia = objeto.__IdentificadorReferencia;
                (baseDominio as any as IBaseDominioReferencia).__IsBaseDominioReferencia = true;
            }

            //this.BasesDominioDeserializadas.Add(baseDominio.__IdentificadorUnico, baseDominio);
            //if (u.ValidacaoUtil.IsGuidNaoVazio((objeto as IBaseDominioReferencia).__IdentificadorReferencia))
            //{
            //    baseDominio.AlterarIdentificadorReferencia((objeto as IBaseDominioReferencia).__IdentificadorReferencia);
            //}

            const propriedades = tipoEspecializado.RetornarPropriedades();
            for (const propriedade of propriedades)
            {
                if (!___PropriedadesMetodosProtegidos[propriedade.Nome])
                {
                    const valorPropriedade = (objeto as any)[propriedade.Nome];
                    const valorPropriedadeTipado = this.RetornarValorPropriedade(valorPropriedade, propriedade);
                    if (valorPropriedadeTipado != null)
                    {
                        (baseDominio as any)[propriedade.Nome] = valorPropriedadeTipado;
                    }
                }
            }
            if ((baseDominio as any as d.IImagem).InicializarImagem)
            {
                (baseDominio as any as d.IImagem).InicializarImagem(null, null);
            }
            (baseDominio as any as IObjetoControladorPropriedade).AtivarNotificacaoPropriedadeAlterada();
            return baseDominio;
        }

        private RetornarValorPropriedade(valorPropriedade: any, propriedade: r.Propriedade ): any
        {
            if (!u.ValidacaoUtil.IsDefinido(valorPropriedade))
            {
                if (propriedade.AceitaNulo)
                {
                    return null;
                }
                else
                {
                    return u.ConverterUtil.RetornarValorNuloPadrao(propriedade.Tipo);
                }
            }
            else
            {
                return this.RetornarValorObjetoTipado(valorPropriedade, propriedade.Tipo);
            }
        }

        private RetornarListaObjetosTipado(lista: Array<any>, tipo: r.BaseTipoLista): ListaObservacao<any>
        {
            const novaLista = this.RetornarNovaLista(tipo);
            const tipoItemLista = tipo.RetornarTipoItemLista();

            if (u.ValidacaoUtil.IsDefinido(lista) && lista.length > 0)
            {
                if (!(tipoItemLista instanceof r.BaseTipo))
                {
                    throw new ErroOperacaoInvalida("Tipo do item da lista é invalido", this);
                }

                const len = lista.length;
                for (let i = 0; i < len; i++)
                {
                    const itemLista = lista[i];
                    novaLista.push(this.RetornarValorObjetoTipado(itemLista, tipoItemLista));
                }
            }
            return novaLista;
        }

        private RetornarNovaLista(tipo: r.BaseTipoLista): ListaObservacao<any>
        {
            if (tipo instanceof r.TipoListaEntidade)
            {
                return new ListaEntidades<d.Entidade>() as ListaObservacao<any>;
            }
            return new ListaObservacao<any>();
        }

        private RetornarDicionarioSimples(obj: any, tipo: r.TipoDicionario): DicionarioSimples<any>
        {
            const dicionario = new DicionarioSimples();
            const tipoItem = tipo.TipoItemLista;

            const chaves = Object.keys(obj);
            for (const chave of chaves)
            {
                /*eslint-disable*/
                if (obj.hasOwnProperty(chave))
                {
                    let valor = obj[chave];
                    if (valor != null)
                    {
                        let valorTipado = this.RetornarValorObjetoTipado(valor, tipoItem);
                        dicionario.Add(chave, valorTipado);
                    }
                }
            }
            return dicionario;
        }


        public Dispose(): void
        {
        }
    }
}