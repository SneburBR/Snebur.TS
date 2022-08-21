
namespace Snebur.UI
{
    export class SelecionarArquivosEventoArgs extends EventArgs
    {
        public readonly Arquivos: Array<SnBlob>;
        public get Arquivo(): SnBlob
        {
            return this.Arquivos.SingleOrDefault();
        }

        public constructor(/*elemento: HTMLElement, parametros: DicionarioSimples<any>, domEvent: UIEvent,*/ arquivos: SnBlob[])
        {
            super();

            this.Arquivos = arquivos;
            //this.Arquivos = new Array<SnBlob>();
            //for (let i = 0; i < arquivos.length; i++)
            //{
            //    this.Arquivos.Add(new SnBlob(arquivos[i]));
            //}
        }
    }
}