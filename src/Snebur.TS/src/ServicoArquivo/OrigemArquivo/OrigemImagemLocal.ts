namespace Snebur.ServicoArquivo
{
    export class OrigemImagemLocal extends OrigemImagem
    {
        private _isImagemLocalCarregada: boolean = false;

        private readonly ImagensLocalCarregadas = new DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>();
        private readonly ImagensServidorCarregadas = new DicionarioSimples<i.ImagemServidorCarregada, d.EnumTamanhoImagem>();

        public readonly Imagem: d.IImagem;
        public readonly ArquivoLocal: SnBlob;
        

        private FileReader: FileReader;
        //private UrlBlobGrande: string;
        //private UrlBlobMedia: string;
        //private UrlBlobPequena: string;
        //private UrlBlobMiniatura: string;
        private IsDispensado: boolean = false;

        private IsAbrindoImagem: boolean = false;
        private ListaResolverAsync = new List<(resultado: boolean) => void>();

        public ErroAbrirImagem: Erro;

        public get IsImagemLocalCarregada(): boolean
        {
            return this._isImagemLocalCarregada;
        }

        public get FormatoImagem(): d.EnumFormatoImagem
        {
            return this.Imagem.FormatoImagem;
        }

        public IsExisteImagemServidor(tamanhoImagem: EnumTamanhoImagem): boolean
        {
            return u.ImagemUtil.ExisteImagemServidor(this.Imagem, tamanhoImagem) ||
                this.ImagensServidorCarregadas.ContainsKey(tamanhoImagem);
        }

        public constructor(imagem: d.IImagem, arquivoLocal: SnBlob)
        {
            super();

            this.Imagem = imagem;
            this.ArquivoLocal = arquivoLocal;
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

        public RetornarRetornarImagemCarregada(tamanhoImagem: d.EnumTamanhoImagem): i.ImagemLocalCarregada
        {
            if (!this.ImagensLocalCarregadas.ContainsKey(tamanhoImagem))
            {
                throw new Erro(`A imagem '${this.Imagem.Id} - ${this.Imagem.NomeArquivo}' não foi carregada no tamanho '${EnumUtil.RetornarDescricao(EnumTamanhoImagem, tamanhoImagem)}'
                                Utilize o gerenciador de abrir imagem local para carrega-la`);
            }
            return this.ImagensLocalCarregadas.Item(tamanhoImagem);
            /*return u.ArquivoUtil.RetornarBufferArrayAsync(imagemCarregada.ArquivoBlob);*/
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
                const resultado = await this.AbrirImagemInternoAsync();
                for (const tamanhoImagem of u.ImagemUtil.TamanhosImagemApresentacao)
                {
                    if (!resultado.ContainsKey(tamanhoImagem))
                    {
                        throw new Erro(`O tamanho imagem ${tamanhoImagem} não foi carregado`);
                    }
                    const cacheImagemLocal = resultado.Item(tamanhoImagem);
                    this.ImagensLocalCarregadas.Add(tamanhoImagem, cacheImagemLocal);
                }
                this._isImagemLocalCarregada = true;


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

        private async AbrirImagemInternoAsync(): Promise<DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>>
        {
            if (u.MagickInitUtil.IsInicializado  && !window.__IS_USAR_CANVAS__ )
            {
                try
                {
                    const resultado = await this.AbrirImagemMagickAsync();
                    if (resultado instanceof DicionarioSimples &&
                        resultado.Count > 0 &&
                        resultado.Valores.All(x=> x.IsSucesso))
                    {
                        return resultado;
                    }
                }
                catch (erro)
                {
                    console.error(erro);
                }
            }
            return await this.AbrirImagemCanvasAsync();
        }

        private async AbrirImagemCanvasAsync(): Promise<DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>>
        {
            const stopWatch = Stopwatch.StartNew();
            const abrirImagem = new i.AbrirImagemLocalCanvas(this, u.ImagemUtil.TamanhosImagemApresentacao);
            const resultado = await abrirImagem.CarergarImagemAsync();
            abrirImagem.Dispose();
            console.warn(`Tempo abrir imagem Canvas: ${this.ArquivoLocal.name}- ${stopWatch.TotalSeconds}s`);
            return resultado;
        }

        private async AbrirImagemMagickAsync(): Promise<DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>>
        {
            const stopWatch = Stopwatch.StartNew();
            const abrirImagem = new i.AbrirImagemLocalMagick(this, u.ImagemUtil.TamanhosImagemApresentacao);
            const resultado = await abrirImagem.CarergarImagemAsync();
            abrirImagem.Dispose();
            console.warn(`Tempo abrir imagem Magick: ${this.ArquivoLocal.name}- ${stopWatch.TotalSeconds}s`);
            return resultado;
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


interface Window
{
    __IS_USAR_CANVAS__: boolean;
}
window.__IS_USAR_CANVAS__ = false;