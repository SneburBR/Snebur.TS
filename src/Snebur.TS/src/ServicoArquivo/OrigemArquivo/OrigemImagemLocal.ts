﻿namespace Snebur.ServicoArquivo
{
    export class OrigemImagemLocal extends OrigemImagem
    {
        private _isImagemLocalCarregada: boolean = false;

        private readonly ImagensLocalCarregadas = new DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>();
        private readonly ImagensServidorCarregadas = new DicionarioSimples<i.ImagemServidorCarregada, d.EnumTamanhoImagem>();


        public readonly Imagem: d.IImagem;
        public readonly ArquivoLocal: SnBlob;
        public readonly FormatoImagem: d.EnumFormatoImagem;

        private FileReader: FileReader;
        private UrlBlobGrande: string;
        private UrlBlobMedia: string;
        private UrlBlobPequena: string;
        private UrlBlobMiniatura: string;
        private IsDispensado: boolean = false;

        private IsAbrindoImagem: boolean = false;
        private ListaResolverAsync = new List<(resultado: boolean) => void>();

        public ErroAbrirImagem: Erro;

        public get IsImagemLocalCarregada(): boolean
        {
            return this._isImagemLocalCarregada;
        }


        public IsExisteImagemServidor(tamanhoImagem: EnumTamanhoImagem): boolean
        {
            return u.ImagemUtil.ExisteImagemServidor(this.Imagem, tamanhoImagem) ||
                this.ImagensServidorCarregadas.ContainsKey(tamanhoImagem);
        }

        public constructor(imagem: d.IImagem, arquivoLocal: SnBlob, informacaoImagem: IInformacaoImagem)
        {
            super();

            this.Imagem = imagem;
            this.ArquivoLocal = arquivoLocal;
            this.FormatoImagem = informacaoImagem.FormatoImagem;
        }

        public RetornarUrlImagemCarregada(tamanhoImagem: d.EnumTamanhoImagem)
        {
            if (!this.IsImagemLocalCarregada)
            {
                throw new Erro("as imagem locais não foram carregada");
            }

            if (this.ImagensServidorCarregadas.ContainsKey(tamanhoImagem))
            {
                return this.ImagensServidorCarregadas.Item(tamanhoImagem).UrlServidor;
            }

            if (this.ImagensLocalCarregadas.ContainsKey(tamanhoImagem))
            {
                return this.ImagensLocalCarregadas.Item(tamanhoImagem).UrlLocal;
            }
             
            u.ImagemUtil.ExisteImagemServidor(this.Imagem, tamanhoImagem);
            throw new Erro(`O tamanho ${tamanhoImagem} não foi carregado`);

        }

        public RetornarArrayBufferImagemCarregadaAsync(tamanhoImagem: d.EnumTamanhoImagem): Promise<ArrayBuffer>
        {
            if (!this.ImagensLocalCarregadas.ContainsKey(tamanhoImagem))
            {
                throw new Erro(`A imagem '${this.Imagem.Id} - ${this.Imagem.NomeArquivo}' não foi carregada no tamanho '${EnumUtil.RetornarDescricao(EnumTamanhoImagem, tamanhoImagem)}'
                                Utilize o gerenciador de abrir imagem local para carrega-la`);
            }
            const imagemCarregada = this.ImagensLocalCarregadas.Item(tamanhoImagem);
            return u.ArquivoUtil.RetornarBufferArrayAsync(imagemCarregada.Blob);
        }

        public NotificarImagemServidorCarregada(tamanhoImagem: EnumTamanhoImagem): void
        {
            if (!this.ImagensServidorCarregadas.ContainsKey(tamanhoImagem))
            {
                this.ImagensServidorCarregadas.Add(tamanhoImagem, new i.ImagemServidorCarregada(this.Imagem, tamanhoImagem));
            }

            const imagemCarregada = this.ImagensLocalCarregadas.TryItem(tamanhoImagem);
            if (imagemCarregada instanceof i.ImagemLocalCarregada)
            {
                imagemCarregada.Dispose();
                this.ImagensLocalCarregadas.Remove(tamanhoImagem);
            }

        }

        //#region Imagem Carregando

        public CarregarImagemAsync(): Promise<boolean>
        {
            if (this.IsImagemLocalCarregada)
            {
                return new Promise<boolean>(function (resolver) { resolver(true); });
            }
            return new Promise<boolean>(this.CarregarImagem_Promise.bind(this));
        }

        private CarregarImagem_Promise(resolver: (resultado: boolean) => void): void
        {
            this.ListaResolverAsync.Add(resolver);
            if (!this.IsAbrindoImagem)
            {
                this.IsAbrindoImagem = true;
                this.AbrirImagemAsync();
            }
        }

        private async AbrirImagemAsync()
        {
            try
            {
                //let tamanhosImagemApresentacao = this.RetornarTamanhosImagensApresentacaoPendente();
                const tamanhosImagemApresentacao = u.ImagemUtil.TamanhosImagemApresentacao;
                const abrirImagem = new i.AbrirImagemLocal(this, tamanhosImagemApresentacao);
                const resultado = await abrirImagem.CarergarImagemAsync();

                for (const tamanhoImagem of tamanhosImagemApresentacao)
                {
                    if (!resultado.ContainsKey(tamanhoImagem))
                    {
                        throw new Erro(`O tamanho imagem ${tamanhoImagem} não foi carregado`);
                    }
                    const cacheImagemLocal = resultado.Item(tamanhoImagem);
                    this.ImagensLocalCarregadas.Add(tamanhoImagem, cacheImagemLocal);
                }
                this._isImagemLocalCarregada = true;

                abrirImagem.Dispose();
            }
            catch (erro)
            {
                throw new Erro("Não foi possível abrir imagem");
            }
            finally
            {
                this.NotificarResolverAsync();
            }
        }

        private NotificarResolverAsync(): void
        {
            for (const resolverAsync of this.ListaResolverAsync)
            {
                resolverAsync(true);
            }
        }

        //private RetornarTamanhosImagensApresentacaoPendente(): List<d.EnumTamanhoImagem>
        //{
        //    let tamanhosImagemPendente = u.ImagemUtil.TamanhosImagemApresentacao;
        //    for (var tamanhoImagem of tamanhosImagemPendente.ToList(true))
        //    {
        //        if (u.ImagemUtil.ExisteImagemServidor(this.Imagem, tamanhoImagem))
        //        {
        //            tamanhosImagemPendente.Remove(tamanhoImagem);
        //            //var urlServidor = imagem.RetornarUrlImagem(tamanhoImagem);
        //            //this.ImagensCarregadas.Add(tamanhoImagem, urlServidor);
        //            break;
        //        }
        //    }
        //    return tamanhosImagemPendente;
        //}

        //private IniciarEnvioImagensLocal(): void
        //{
        //    throw new Erro("Não implementado");
        //}
        //#endregion

        //#region IDisposable

        private DipensarImagensCarregadas(): void
        {
            const caches = this.ImagensLocalCarregadas.Valores;
            for (const imagemCarregada of caches)
            {
                imagemCarregada.Dispose();
            }
            this.ImagensLocalCarregadas.Limpar();
        }

        public override Dispose(): void
        {
            //this._isImagemCarregada = false;
            this.IsDispensado = true;
            this.DipensarImagensCarregadas();

            this.FileReader.onload = null;
            this.FileReader.onerror = null;
            this.FileReader.onabort = null;
            delete this.FileReader;
            //super.Dispose();
        }
        //#endregion

        //#region Estático

    }

    //#endregion
}

