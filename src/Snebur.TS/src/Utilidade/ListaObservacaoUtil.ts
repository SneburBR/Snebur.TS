namespace Snebur.Utilidade
{
	export class ListaObservacaoUtilfa
	{
		public static Criar<T>(itens: T[]): ListaObservacao<T>
		{
			const retorno = new ListaObservacao<T>();
			retorno.AddRange(itens);
            return retorno;
		}
	}
}
