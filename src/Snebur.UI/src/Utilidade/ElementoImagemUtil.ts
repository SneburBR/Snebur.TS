namespace Snebur.UI
{
    export class ElementoImagemUtil
    {
        public static CarregarImagemAsync(elemento: HTMLImageElement, urlImagem: string): Promise<void>
        public static CarregarImagemAsync(elemento: HTMLImageElement, urlImagem: string, igorarErro: false): Promise<void>
        public static CarregarImagemAsync(elemento: HTMLImageElement, urlImagem: string, igorarErro: true): Promise<void | Error>
        public static CarregarImagemAsync(elemento: HTMLImageElement, urlImagem: string, igorarErro: boolean): Promise<void | Error>
        public static CarregarImagemAsync(elemento: HTMLImageElement, urlImagem: string, igorarErro: boolean = false): Promise<void | Error>
        {
            return new Promise<void | Error>((resolver, rejeitar) =>
            {
                elemento.onload = () => resolver();
                elemento.onerror = () =>
                {
                    const error = new Error(`Falha ao carregar imagem: ${urlImagem}`);
                    igorarErro
                        ? resolver(error)
                        : rejeitar(error);

                };
                elemento.UrlImagem = urlImagem;
            });
        }
    }
}
