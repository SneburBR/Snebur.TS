namespace Snebur.Utilidade
{
    export class EntidadeUtil
    {
        public static IsAlterouPropriedade(entidade: d.Entidade, nomePropriedade:string): boolean
        {
            if (entidade.__PropriedadesAlteradas.ContainsKey(nomePropriedade))
            {
                return true;
            }

            const propriedade = entidade.GetType().RetornarPropriedade(nomePropriedade);
            if (propriedade?.Tipo.IsTipoCompleto )
            {
                return propriedade.Tipo.Propriedades.Any(x => entidade.__PropriedadesAlteradas.ContainsKey(`${nomePropriedade}_${x.Nome}`));
            }
            return false;
        }

        public static RetornarDescricaoEntidade(entidade: IEntidade): string
        {
            const tipoEntidade = entidade.GetType() as r.TipoEntidade;
            const propriedadeDescricao = tipoEntidade.RetornarPropriedadeDescricao(true);
            if (propriedadeDescricao != null)
            {
                return u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeDescricao);
            }
            return `${entidade.GetType()} (${entidade.Id})`;
        }

        public static RetornarPropriedadeChaveEstrangeira(
            tipoEntidade: r.TipoEntidade,
            propriedadeRelacao: r.Propriedade,
            isIgnorarErro: boolean = false): r.Propriedade
        {
            const atributoChaveEstrangeira = EntidadeUtil.RetornarAtributoChaveEstrangeira(propriedadeRelacao, isIgnorarErro);
            return tipoEntidade.RetornarPropriedade(atributoChaveEstrangeira.NomePropriedade);
        }

        public static RetornarAtributoChaveEstrangeira(propriedade: r.Propriedade, ignorarErro = false): d.Atributos.IChaveEstrangeiraAttribute
        {
            const atributoChaveEstrangeira = propriedade.Atributos.OfType(Snebur.Dominio.Atributos.ChaveEstrangeiraAttribute).SingleOrDefault();
            if (atributoChaveEstrangeira != null)
            {
                return atributoChaveEstrangeira;
            }

            const atributoChaveEstrangeiraRelacaoUmUm = propriedade.Atributos.OfType(Snebur.Dominio.Atributos.ChaveEstrangeiraRelacaoUmUmAttribute).SingleOrDefault();
            if (atributoChaveEstrangeiraRelacaoUmUm != null)
            {
                return atributoChaveEstrangeiraRelacaoUmUm;
            }

            const atributoChaveEstrangeiraExterna = propriedade.Atributos.OfType(Snebur.Dominio.Atributos.ChaveEstrangeiraExternaAttribute).SingleOrDefault();
            if (atributoChaveEstrangeiraExterna != null)
            {
                return atributoChaveEstrangeiraExterna;
            }

            if (!ignorarErro)
            {
                throw new ErroNaoDefinido(`O atributo  ChaveEstrangeira não foi encontrado na propriedade ${propriedade.Nome}  na entidade ${propriedade.TipoDeclarado.Nome}`, this);
            }
            return null;
        }

        public static RetornarIdChaveEstrangeira(entidade: d.Entidade, propriedadeRelacao: r.Propriedade): number
        {
            const valorEntidade = u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeRelacao);
            if (valorEntidade instanceof d.Entidade)
            {
                return (valorEntidade as d.Entidade).Id;
            }
            else
            {
                const propriedadeChaveEstrangeira = EntidadeUtil.RetornarPropriedadeChaveEstrangeira(entidade.GetType() as r.TipoEntidade, propriedadeRelacao);
                return u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeChaveEstrangeira);
            }
        }

        public static RetornarPropriedadeRelacao(
            tipoEntidade: r.TipoEntidade,
            propriedadeChaveEstrangeira: r.Propriedade,
            isIgnorarErro: boolean = false): r.Propriedade
        {
            const propriedades = tipoEntidade.RetornarPropriedades();
            for (const propriedade of propriedades)
            {
                if (propriedade.Tipo instanceof r.TipoEntidade)
                {
                    const atributoChaveEstrageira = propriedade.Atributos.OfType(at.ChaveEstrangeiraAttribute).SingleOrDefault();
                    if (atributoChaveEstrageira?.NomePropriedade === propriedadeChaveEstrangeira.Nome)
                    {
                        return propriedade;
                    }
                }
            }
            if (isIgnorarErro)
            {
                return null;
            }
            throw new Erro(`A propriedade relação da chave estrangeira ${propriedadeChaveEstrangeira.Nome} na entidade ${tipoEntidade.Nome} não foi encontrada`);
        }

        public static RetornarDicionario(entidades: Array<d.Entidade>): DicionarioSimples<d.Entidade>
        {
            const dicionario = new DicionarioSimples<d.Entidade>();
            const len = entidades.length;
            for (let i = 0; i < len; i++)
            {
                const entidade = entidades[i];
                u.EntidadeUtil.VarrerEntidadeInterno(dicionario, entidade);
            }
            return dicionario;
        }

        private static VarrerEntidadeInterno(dicionario: DicionarioSimples<d.Entidade>, entidade: d.Entidade): void
        {
            if (dicionario.ContainsKey(entidade.RetornarIdentificadorReferencia()))
            {
                return;
            }
            dicionario.Add(entidade.RetornarIdentificadorReferencia(), entidade);

            const propriedades = entidade.GetType().RetornarPropriedades();
            const propriedadesEntidade = propriedades.Where(x => x.Tipo instanceof r.TipoEntidade).ToList();
            for (const propriedadeEntidade of propriedadesEntidade)
            {
                const entidadeRelacao = u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeEntidade.Nome);
                if (entidadeRelacao instanceof d.Entidade)
                {
                    u.EntidadeUtil.VarrerEntidadeInterno(dicionario, entidadeRelacao);
                }
            }

            const propriedadesListaEntidades = propriedades.Where(x => x.Tipo instanceof r.TipoListaEntidade).ToList();
            for (const propriedadeTipoListaEntidade of propriedadesListaEntidades)
            {
                const entidadesRelacaoFilho = u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeTipoListaEntidade.Nome);
                for (const entidadeFilho of entidadesRelacaoFilho)
                {
                    if (entidadeFilho instanceof d.Entidade)
                    {
                        u.EntidadeUtil.VarrerEntidadeInterno(dicionario, entidadeFilho);
                    }
                }
            }
        }

        public static IsImagem(imagem: d.IImagem): boolean
        {
            return imagem instanceof Entidade &&
                imagem.DimensaoImagemMiniatura instanceof d.Dimensao &&
                typeof imagem.TotalBytesMiniatura === "number";
        }

        public static IsImplementaIDeletado(entidade: IEntidade): entidade is IDeletado
        {
            return (entidade?.GetType() as r.TipoEntidade).IsImplementaIDeletado;
        }
    }
}