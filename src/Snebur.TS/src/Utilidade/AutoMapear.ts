
namespace Snebur.Utilidade
{
    export class AutoMapearUtil
    {
        public static readonly PropriedadesIgnorar = ["Id", "__CaminhoTipo", "__IdentificadorUnico", ]

        public static Mapear(origem: d.BaseDominio, destino: d.BaseDominio): void
        {
            const proproiedadesIgnorar = d.Entidade.GetType().RetornarPropriedades();
            const tipoOrigem = origem.GetType() as r.TipoBaseDominio;
            const tipoDestino = destino.GetType() as r.TipoBaseDominio;
            const todasPropriedadeOrigem = tipoOrigem.RetornarPropriedades(false);
            const todasPropruiedadeDestino = tipoDestino.RetornarPropriedades(false);

            for (const p of proproiedadesIgnorar)
            {
                todasPropriedadeOrigem.Remove(p);
                todasPropruiedadeDestino.Remove(p);
            }

            for (const propriedadeDestino of todasPropruiedadeDestino)
            {
                const propriedadeOrigem = todasPropriedadeOrigem.Where(x => x.Nome === propriedadeDestino.Nome).SingleOrDefault();
                if (propriedadeOrigem instanceof r.Propriedade)
                {
                    let valorOrigem = u.ReflexaoUtil.RetornarValorPropriedade(origem, propriedadeOrigem);
                    if (valorOrigem instanceof d.BaseTipoComplexo)
                    {
                        valorOrigem = valorOrigem.Clone();
                    }
                    u.ReflexaoUtil.AtribuirValorPropriedade(destino, propriedadeDestino, valorOrigem);
                }
            }

        }
    }
}