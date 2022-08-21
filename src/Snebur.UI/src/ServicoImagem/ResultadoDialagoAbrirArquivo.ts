namespace Snebur.UI
{
    export class ResultadoDialagoAbrirArquivo
    {
        public Arquivos: Array<SnBlob>;

        public constructor(arquivos: FileList)
        {
            this.Arquivos = new Array<SnBlob>();

            const len = arquivos.length;
            for (let i = 0; i < len; i++)
            {
                const arquivo = arquivos[i];
                this.Arquivos.Add(new SnBlob(arquivo));
            }
        }
    }
}