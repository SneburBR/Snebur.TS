namespace Snebur.UI
{
    export class MapeamentoPropriedadeApresentacaoUtil
    {
        public static RetornarMapemento(tipo: r.BaseTipo): MapeamentoPropriedadeApresentacao
        {
            //let tipo = constrotorComponenteApresentacao.GetType();
            let tipoAtual = tipo;
            while (tipoAtual != null)
            {
                const mapeamento = Snebur.UI.$MapeamentosPropriedades.TryItem(tipoAtual.Nome);
                if (mapeamento instanceof MapeamentoPropriedadeApresentacao)
                {
                    return mapeamento;
                }
                tipoAtual = (tipoAtual !== tipoAtual.TipoBase) ? tipoAtual.TipoBase : null;
            }

            throw new Erro("Não foi encontrado o mapeamento dos provedores para o tipo {0}", tipo.Nome);
        }
    }
}
