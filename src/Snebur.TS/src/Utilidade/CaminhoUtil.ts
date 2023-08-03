namespace Snebur.Utilidade
{
    export class CaminhoUtil
    {
        public static Combinar(...caminhos: Array<string>)
        {
            return CaminhoUtil.CombinarCaminhos(caminhos);
        }

        public static CombinarCaminhos(caminhos: Array<string | number>)
        {
            const caminhosNormalizados = new List<string>();
            for (const caminho of caminhos)
            {
                const caminhoNormalizado = this.NormalizarCaminho(caminho.toString());
                if (!String.IsNullOrEmpty(caminhoNormalizado))
                {
                    caminhosNormalizados.Add(caminhoNormalizado);
                }
            }
            return String.Join("/", caminhosNormalizados);
        }

        private static NormalizarCaminho(caminho: string): string
        {
            if (!String.IsNullOrWhiteSpace(caminho))
            {
                return this.RemoverBarraInicial(this.RemoverBarraFinal(caminho));
            }
            return String.Empty;
        }

        public static RemoverBarraInicial(caminho: string): string
        {
            let temp = caminho.trim();
            while (temp.StartsWith("/") || temp.StartsWith("\\"))
            {
                temp = temp.substring(1);
            }
            return temp;
        }

        public static RemoverBarraFinal(caminho: string): string
        {
            let temp = caminho.trim();
            while (temp.EndsWith("/") || temp.EndsWith("\\"))
            {
                temp = temp.substr(0, temp.length - 1);
            }
            return temp;
        }
    }
}


