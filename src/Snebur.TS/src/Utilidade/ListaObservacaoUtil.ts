namespace Snebur.Utilidade
{
	export class ListaObservacaoUtil
	{
		public static Criar<T>(itens: T[]): ListaObservacao<T>
		{
			const retorno = new ListaObservacao<T>();
			retorno.AddRange(itens);
            return retorno;
		}
	}
}
