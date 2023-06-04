namespace Snebur.UI
{
    export class RotaUtil
    {
        public static NormalizarCaminho(caminho: string, isAdicionarBarraFinal:boolean = false): string
        {
            if (caminho == null)
            {
                return "/";
            }

            if (u.UrlUtil.IsPathHasFileName(caminho))
            {
                caminho = u.UrlUtil.RetornarUrlSemNomeArquivo(caminho);
            }

            caminho = caminho.ReplaceAll("\\", "/").ReplaceAll("//", "/");
            caminho = u.UrlUtil.RemoverBarraInicial(caminho);
            caminho = u.UrlUtil.RemoverBarraFinal(caminho);
            
            if (String.IsNullOrWhiteSpace(caminho))
            {
                return "/";
            }

            if (isAdicionarBarraFinal)
            {
                return `/${caminho.trim().toLowerCase()}/`;
            }
            return `/${caminho.trim().toLowerCase()}`;
        }

        public static ValidarCaminho(caminho: string): void
        {
            if (String.IsNullOrWhiteSpace(caminho))
            {
                throw new Erro(`O caminho da rota não foi definido`);
            }

            if (!caminho.startsWith("/"))
            {
                throw new Erro(`O caminho da rota deve inciar com '/' `);
            }
        }

        public static IsRota(caminho: string): boolean
        {
            return typeof caminho === "string" &&
                caminho.startsWith("/");
        }

    }


}