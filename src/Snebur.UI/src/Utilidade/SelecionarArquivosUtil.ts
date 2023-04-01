namespace Snebur.UI
{
    export class SelecionarArquivosUtil
    {
        private static _elementoSelecionarArquivo: HTMLInputElement;

        public static SelecionarArquivoAsync(
            isMultiSelecao: boolean,
            accept: EnumAccept | string): Promise<SnBlob[]>
        {
            return new Promise<SnBlob[]>(resolver =>
            {
                SelecionarArquivosUtil._elementoSelecionarArquivo?.remove();

                let isSeleconado = false;
                const elementoSelecionarArquivo = document.createElement("input");
                const _resolver = () =>
                {
                    if (!isSeleconado)
                    {
                        isSeleconado = true;

                        const resultado = SelecionarArquivosUtil.RetornarSnBlobs(elementoSelecionarArquivo.files);
                        elementoSelecionarArquivo.removeEventListener("change", _resolver);
                        elementoSelecionarArquivo.remove();
                        SelecionarArquivosUtil._elementoSelecionarArquivo = null;
                        resolver(resultado);
                    }
                };

                elementoSelecionarArquivo.style.position = "absolute";
                elementoSelecionarArquivo.style.top = "-300px";
                elementoSelecionarArquivo.style.left = "-300px";
                elementoSelecionarArquivo.style.opacity = "0";
                elementoSelecionarArquivo.multiple = isMultiSelecao;
                elementoSelecionarArquivo.accept = accept;
                elementoSelecionarArquivo.type = "file";
                elementoSelecionarArquivo.value = "";
                document.body.appendChild(elementoSelecionarArquivo);
                elementoSelecionarArquivo.focus();
                elementoSelecionarArquivo.addEventListener("change", _resolver);
                /*elementoSelecionarArquivo.addEventListener("blur", _resolver);*/
                elementoSelecionarArquivo.click();
                SelecionarArquivosUtil._elementoSelecionarArquivo = elementoSelecionarArquivo;

            });
        }

        public static RetornarSnBlobs(arquivos: FileList): SnBlob[]
        {
            const resultado = new Array<SnBlob>();
            for (let i = 0; i < arquivos.length; i++)
            {
                resultado.Add(new SnBlob(arquivos[i]));
            }
            return resultado;
        }
    }

    export enum EnumAccept
    {
        Audio = "audio/*",
        Video = "video/*",
        Image = "image/*",
    }
}