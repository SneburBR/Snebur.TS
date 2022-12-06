    
namespace Snebur.Dominio
{
    export interface IImagem extends IArquivo
    {
        readonly EventoImagemLocalCarregada: Evento<ImagemLocalCarregadaEventArgs>;
        readonly EventoImagemLocalCarregando: Evento<EventArgs>;
        readonly EventoImagemServidorCarregada: Evento<ImagemServidorCarregadaEventArgs>;

        readonly IsExisteApresentacao: boolean;

        OrigemImagem: sa.OrigemImagem;
        RetornarUrlImagem(dimensaoRecipiente: d.Dimensao): string;
        RetornarUrlImagem(tamanhoImagem: d.EnumTamanhoImagem): string;
        //InicializarImagem(): void;
        InicializarImagem(arquivo: SnBlob, informacaoImagem: IInformacaoImagem): void;
        ExisteImagem(tamanhoImagem: d.EnumTamanhoImagem): boolean;


    }
    export interface IImagemConstrutor
    {
        new(arquivo: SnBlob, informacaoImagem: IInformacaoImagem): d.IImagem;
    }

}

namespace Snebur
{
    export class ImagemLocalCarregadaEventArgs extends EventArgs
    {
        public readonly Imagem: d.IImagem;
        public readonly TamanhosImagem = new List<d.EnumTamanhoImagem>();
        public readonly Erro: Error;

        public get TamanhoImagem(): EnumTamanhoImagem
        {
            return this.TamanhosImagem.LastOrDefault();
        }


        public constructor(imagem: d.IImagem, erro: Error)
        {
            super();

            this.Imagem = imagem;
            this.Erro = erro;
        }
    }

    export class ImagemServidorCarregadaEventArgs extends EventArgs
    {
        public readonly Imagem: d.IImagem;
        public readonly Erro: Error;
        public readonly TamanhoImagem: EnumTamanhoImagem

        public constructor(imagem: d.IImagem, tamanhoImagem: EnumTamanhoImagem, erro: Error)
        {
            super();

            this.Imagem = imagem;
            this.Erro = erro;
            this.TamanhoImagem = tamanhoImagem;
        }
    }
}