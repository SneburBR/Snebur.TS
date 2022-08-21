namespace Snebur.Utilidade
{
	export class EnderecoUtil
	{
        public static IsCepIgual(cep1: string, cep2: string)
        {
            if (u.ValidacaoUtil.IsCep(cep1) && u.ValidacaoUtil.IsCep(cep2))
            {
                const cepNumeros1 = TextoUtil.RetornarSomenteNumeros(cep1);
                const cepNumeros2 = TextoUtil.RetornarSomenteNumeros(cep2);
                return cepNumeros1 === cepNumeros2;
            }
            return cep1 === cep2;
        }
    }
}
