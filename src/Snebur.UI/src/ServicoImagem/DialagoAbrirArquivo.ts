namespace Snebur.UI
{
    export class DialagoAbrirArquivo implements IDisposable
    {
        private IDElementoInput: string;

        private __Input_Change: EventListener;
        private MultiSelecao: boolean;
        private TipoArquivo: EnumTipoArquivo;
        private Extensoes: Array<string>;
        private Callback: CallbackResultado<ResultadoDialagoAbrirArquivo>;

        public constructor(multiSelecao: boolean, tipoArquivo: EnumTipoArquivo)
        public constructor(multiSelecao: boolean, tipoArquivo: EnumTipoArquivo, extensoes: Array<string>)
        public constructor(multiSelecao: boolean, tipoArquivo: EnumTipoArquivo, extensoes: Array<string> = null)
        {
            this.MultiSelecao = multiSelecao;
            this.TipoArquivo = tipoArquivo;
            this.Extensoes = extensoes;
            this.IDElementoInput = ElementoUtil.RetornarNovoIDElemento($Aplicacao.DocumentoPrincipal, "abrir_arquivos");

            this.__Input_Change = this.Input_Change.bind(this);
            this.AdicionarElemento();
            this.AdicionarEventosDom();
        }

        public Mostrar(callback: CallbackResultado<ResultadoDialagoAbrirArquivo>): void
        {
            this.Callback = callback;

            const elementoInput = ElementoUtil.RetornarElemento(this.IDElementoInput) as HTMLInputElement;
            elementoInput.click();
        }
        //#region Métodos privados

        private AdicionarElemento(): void
        {
            const elementoInput = document.createElement("input") as HTMLInputElement;
            elementoInput.type = "file";
            elementoInput.id = this.IDElementoInput;
            elementoInput.accept = this.RetornarAccept();
            elementoInput.multiple = this.MultiSelecao;
            ElementoUtil.AdicionarElemento(document.body, elementoInput);
        }

        private AdicionarEventosDom(): void
        {
            const elementoInput = ElementoUtil.RetornarElemento(this.IDElementoInput);
            elementoInput.addEventListener("change", this.__Input_Change);
            ///delete (elementoInput as any);
        }

        private RemoverEventosDom(): void
        {
            const elementoInput = ElementoUtil.RetornarElemento(this.IDElementoInput);
            elementoInput.removeEventListener("change", this.__Input_Change);
            //delete (elementoInput as any);
        }

        private Input_Change(e: Event): void
        {
            const elementoInput = ElementoUtil.RetornarElemento(this.IDElementoInput) as HTMLInputElement;
            const arquivos = elementoInput.files;
            if (arquivos.length > 0)
            {
                const callback = this.Callback;
                if (u.ValidacaoUtil.IsCallback(callback))
                {
                    this.Callback = null;
                    const resultado = new ResultadoDialagoAbrirArquivo(arquivos);
                    callback(resultado);
                }
            }
        }

        private RetornarAccept(): string
        {
            switch (this.TipoArquivo)
            {
                case (EnumTipoArquivo.Imagem):

                    return "image/*";

                case (EnumTipoArquivo.Audio):

                    return "audio/*";

                case (EnumTipoArquivo.Video):

                    return "video/*";

                case (EnumTipoArquivo.Extensao):

                    if (!u.ValidacaoUtil.IsDefinido(this.Extensoes))
                    {
                        throw new ErroNaoDefinido("As extensões não foram definido", this);
                    }
                    return null;

                default:

                    throw new ErroNaoSuportado("O tipo do arquivo não é suportado", this);
            }
        }
        //#endregion

        //#region IDisposable

        public Dispose(): void
        {
            this.RemoverEventosDom();
            ElementoUtil.RemoverElemento(document.body, this.IDElementoInput);
        }
        //#endregion
    }
}