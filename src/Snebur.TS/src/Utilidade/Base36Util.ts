namespace Snebur.Utilidade
{
	export class Base36Util
    {
        public static IsBase36(valor: string, isPermitirEspaco: boolean, isIgnorarCase: boolean, caracteresExtra:string): boolean
        {
            if (String.IsNullOrWhiteSpace(valor))
            {
                return false;
            }

            if (isIgnorarCase)
            {
                valor = valor.toUpperCase();
            }

            if (caracteresExtra == null)
            {
                caracteresExtra = "";
            }

            if (isPermitirEspaco)
            {
                caracteresExtra = `${caracteresExtra} `;
            }

            const regex = `^[0-9A-Z${caracteresExtra}]+$`;
            const padrao = new RegExp(regex);
            return padrao.test(valor);
        }

        public static Converter(valor: number, minimoLetras:number=0): string
        {
            const base = 36;
            const letras = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let resultado = "";
            while (valor > 0)
            {
                const resto = valor % base;
                resultado = letras[resto] + resultado;
                valor = Math.floor(valor / base);
            }

            if (resultado.length < minimoLetras)
            {
                return "0".repeat(minimoLetras - resultado.length) + resultado;
            }
            return resultado;
        }

        public static RetornarId(base36: string): number
        {
            const base = 36;
            const letras = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let resultado = 0;
            for (let i = 0; i < base36.length; i++)
            {
                const letra = base36[i];
                const valor = letras.indexOf(letra);
                resultado = (resultado * base) + valor;
            }
            return resultado;
        }
               
	}
}
