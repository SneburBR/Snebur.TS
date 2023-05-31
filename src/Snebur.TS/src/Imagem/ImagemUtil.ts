namespace Snebur.Utilidade
{
    export class ImagemUtil
    {
        private static _tamnhoImagensApresentacao: List<d.EnumTamanhoImagem>;
        public static readonly QUALIDADE_APRESENTACAO_CANVAS = 85;
        public static readonly QUALIDADE_APRESENTACAO_MAGICK = 55;
        public static readonly QUALIDADE_IMPRESSAO_CANVAS = 92;

        public static get ImagemVaziaBase64(): string { return i.ImagemMemoria.UrlImagemVazia; }

        public static get DimensaoIcone(): Dimensao
        {
            return new Dimensao(
                imagens.ConstantesImagemApresentacao.LARGURA_ICONE,
                imagens.ConstantesImagemApresentacao.ALTURA_ICONE);
        }

        public static get UrlImagemCarregando(): string
        {
            if (u.ValidacaoUtil.IsUrl($Configuracao.UrlImagemCarregando))
            {
                return $Configuracao.UrlImagemCarregando;
            }
            return i.ImagemMemoria.UrlImagemCarregando;
        }

        public static get UrlImagemSemImagem(): string
        {
            if (u.ValidacaoUtil.IsUrl($Configuracao.UrlImagemSemImagem))
            {
                return $Configuracao.UrlImagemSemImagem;
            }
            return i.ImagemMemoria.UrlImagemSemImagem;
        }

        public static get UrlImagemPendente(): string
        {
            if (u.ValidacaoUtil.IsUrl($Configuracao.UrlImagemPendente))
            {
                return $Configuracao.UrlImagemPendente;
            }
            return i.ImagemMemoria.UrlImagemPendente;
        }

        public static get UrlImagemErro(): string
        {
            if (u.ValidacaoUtil.IsUrl($Configuracao.UrlImagemErro))
            {
                return $Configuracao.UrlImagemErro;
            }
            return i.ImagemMemoria.UrlImagemPendente;
        }

        public static get TamanhosImagemApresentacao(): List<d.EnumTamanhoImagem>
        {
            if (!ImagemUtil._tamnhoImagensApresentacao)
            {
                ImagemUtil._tamnhoImagensApresentacao = new List<d.EnumTamanhoImagem>();
                ImagemUtil._tamnhoImagensApresentacao.Add(d.EnumTamanhoImagem.Miniatura);
                ImagemUtil._tamnhoImagensApresentacao.Add(d.EnumTamanhoImagem.Pequena);
                ImagemUtil._tamnhoImagensApresentacao.Add(d.EnumTamanhoImagem.Media);
                ImagemUtil._tamnhoImagensApresentacao.Add(d.EnumTamanhoImagem.Grande);
            }
            return ImagemUtil._tamnhoImagensApresentacao;
        }
        //public static readonly ImagemVaziaBase64: string = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        //public static readonly ImagemCarregandoBase64: string = "data:image/gif;base64,R0lGODlhHgAeAPf2AP7+/v39/fDw8O/v7/z8/PHx8e7u7vv7++Xl5fr6+vn5+ebm5gAAAPX19fT09Pb29vPz8/f39/j4+Ofn5/Ly8tTU1O3t7dXV1cnJyezs7Ojo6Orq6uTk5OPj476+vuvr69nZ2cjIyNbW1unp6crKytjY2MvLy9zc3LOzs7KyssfHx+Hh4b+/v9/f3+Li4tPT097e3sDAwNfX193d3dra2sHBwYmJidvb2+Dg4L29vby8vM/Pz7e3t9LS0sTExNDQ0LS0tIiIiLW1tcbGxszMzLi4uLq6uoyMjHBwcMPDw8XFxVhYWLGxsXFxccLCws7Ozra2trCwsG9vb42Njbm5uc3NzXNzc4qKilpaWtHR0bu7u3JycpKSkjs7O3Z2dq+vr66urj09PVlZWaioqKSkpISEhIKCgpqaml5eXnR0dJGRkSIiIltbW2lpaaWlpYaGhouLi1NTUz4+PqmpqXh4eI6OjpWVlZCQkJSUlJ6enpiYmJycnKqqqmpqakNDQ4eHh6Kiop+fn6ysrCUlJW5ubklJSa2trVRUVIODg4WFhUBAQCAgIKGhoV9fX0FBQYGBgaamppaWlmxsbFxcXGBgYFdXV5OTk5mZmTY2NiQkJB8fH21tbXl5eVBQUDw8PHt7ez8/P11dXX9/fzU1NSgoKJubm2dnZzQ0NDMzM52dnVFRUWtra5eXlyoqKk5OTiMjI1VVVQoKCmRkZE1NTaurq0ZGRjk5OTc3N35+fo+Pj0VFRX19fSEhISkpKURERBsbGywsLCcnJ6enpxgYGB4eHmJiYlJSUhoaGk9PT3V1dWFhYR0dHUdHRwUFBQcHBzg4OICAgCsrK6CgoFZWVi4uLmNjY3x8fGhoaGZmZkJCQkhISBYWFmVlZTo6OkxMTBISEnp6eqOjoxUVFS0tLQsLCxwcHBcXFzIyMhkZGRERERMTEzExMQ8PDw4ODiYmJgICAnd3d0pKSgQEBDAwMA0NDf///////wbcd67c6d-c5b4-45d4-b490-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";
        //public static readonly ImagemPendenteBase64: string = "data:image/gif;base64,R0lGODlhMAAwAPYAAPVAM/VBNPVCNPVDNvVEN/VGOfZJPPZLPvZMQPZOQfZOQvZPQ/ZQRPZUSPZVSvZWSvZXS/ZYTfZZTfZaT/ddUfdeU/diWPdkWfdpXvdrYfdsYvdtYvdtY/hwZvh0avh2bPh3bvh5cPh6cfh7cvh8c/h9dPh+dfh/dviBePmFfPmGfvmIf/mLg/mNhfmRivmSi/mTi/mTjPmVjfqWj/qYkfqblPqfmfqhmvqinPqjnPqmoPuoovuqpPuwq/uyrfuzrfu0rvu4s/y9ufzAvPzEwPzFwfzGwvzHw/zIxPzMyfzOyv3Qzf3Sz/3U0f3X1f3Z1v3Z1/3b2P3b2f3g3v3h3/7l4/7n5v7q6P7q6f7v7f7v7v7w7/7x8P7y8f7z8v719f/39//4+P/5+f/7+v/8/P/9/f/+/gbcd67c6d-c5b4-45d4-b490-95dc06bae458bcd67c6d-c5b4-45d4-b490-95dc06bae458bcd67c6d-c5b4-45d4-b490-95dc06bae458AAACH5BAEAAGcALAAAAAAwADAAAAf+gGeCg4SFhoeIiYqLjI2OjF4vEhIvXo+XilgSAJwAEliYoYRlGZ2dGmWioj6mpj6qmF4MrZ0MlrCOMrSmMriNVAS7nQRUvosgwqYgxolIya1IzIZjFc+mFWPShDzJA7Q82oJaCKYDCD5YWEDkpgha4S2tA06EUMGmLdpR3qYnhifyojAr04FWDkM5aHVI5WvILhqGaOwS4mvMJlohDIXYJSEbrIS7IBiqtuugKiwHkt0SNIYfrQOgRKV4xoRQlGcqRDWx9mqQEGtNMJXBYC0GIRvWMDB0FMSlMA+EUFgDEOQRmFnWHhC6YG0AAzCOJE4dAPZMmZRTazSyUmAqp2K2Z7S4BVDACiOAc5MIujmXxKIkczmBePFiY2C9iMhYCMy41YWlhXo0fsCCxYPGPQ55WcCYhccxKhgjWDnoBWNso0jOfVGIitOpEAvVYFxACiFkjG8YusF4wDJBRhoD0GBIw+upRsyqZqyDkA7hACqUCQ4dQIcdOwpWNxKjuvdWMUJ/H6/i+fjvOrxcPg/9gSUrIY53Oz8ghN1BW5gY2T9kv//+/BkB4H8BClhggUxsEc6CDDa4YCAAOw==";

        //#region Partial

        public static InicializarImagem(imagem: d.IImagem, arquivo: SnBlob, info: IInformacaoImagem): void
        {
            if (arquivo instanceof SnBlob)
            {
                imagem.NomeArquivo = arquivo.name;
                imagem.CaminhoArquivo = arquivo.name;
                imagem.TotalBytesLocal = arquivo.size;

                imagem.Status = d.EnumStatusArquivo.Novo;
                imagem.IsIcone = false;
                imagem.FormatoImagem = EnumFormatoImagem.Desconhecido;
                imagem.OrigemImagem = sa.OrigemImagemLocalUtil.RetornarNovaOrigemImagemLocal(imagem, arquivo);

                if (info != null)
                {
                    const isIcone = !ImagemUtil.IsFormatoImagemSuportado(info.FormatoImagem);
                    const mimeType = this.RetornarMimeTypeEnum(info, arquivo);
                    const dimensao = isIcone ? ImagemUtil.DimensaoIcone : info.Dimensao;

                    imagem.FormatoImagem = isIcone ? EnumFormatoImagem.PNG : info.FormatoImagem;
                    imagem.DimensaoImagemLocal = new Dimensao(info.Dimensao);
                    imagem.DimensaoImagemMiniatura = new Dimensao(u.ImagemUtil.RetornarDimensaoImagemApresentacao(dimensao, d.EnumTamanhoImagem.Miniatura));
                    imagem.DimensaoImagemPequena = new Dimensao(u.ImagemUtil.RetornarDimensaoImagemApresentacao(dimensao, d.EnumTamanhoImagem.Pequena));
                    imagem.DimensaoImagemMedia = new Dimensao(u.ImagemUtil.RetornarDimensaoImagemApresentacao(dimensao, d.EnumTamanhoImagem.Media));
                    imagem.DimensaoImagemGrande = new Dimensao(u.ImagemUtil.RetornarDimensaoImagemApresentacao(dimensao, d.EnumTamanhoImagem.Grande));


                    imagem.MimeType = mimeType;
                    imagem.ChecksumArquivoLocal = info.ChecksumArquivoLocal;
                }

            }
            else
            {
                if (!imagem.IsExisteArquivo && !imagem.OrigemArquivo)
                {
                    imagem.OrigemImagem = sa.OrigemImagemLocalUtil.RetornarOrigemImagemLocal(imagem);
                }
            }
        }


        public static RetornarIdenticadorArquivoImagem(imagem: d.IImagem): string;
        public static RetornarIdenticadorArquivoImagem(arquivo: SnBlob): string;
        public static RetornarIdenticadorArquivoImagem(argumento: d.IImagem | SnBlob): string
        {
            if (argumento instanceof SnBlob)
            {
                return argumento.name + "_" + argumento.size;
            }
            return argumento.NomeArquivo + "_" + argumento.TotalBytesLocal;
        }


        public static RetornarUrlImagem(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem): string
        public static RetornarUrlImagem(imagem: d.IImagem, dimensaoRecipiente: d.Dimensao, tamanhoImagemDimensaoVazia?: EnumTamanhoImagem): string
        public static RetornarUrlImagem(imagem: d.IImagem, tamanhoImagemOuDimensao: d.EnumTamanhoImagem | d.Dimensao, tamanhoImagemDimensaoVazia?: EnumTamanhoImagem): string
        public static RetornarUrlImagem(imagem: d.IImagem, tamanhoImagemOuDimensao: d.EnumTamanhoImagem | d.Dimensao, tamanhoImagemDimensaoVazia?: EnumTamanhoImagem): string
        {
            const tamanhoImagem = tamanhoImagemOuDimensao instanceof d.Dimensao ?
                ImagemUtil.RetornarTamanhoImagemAutomatico(imagem, tamanhoImagemOuDimensao, tamanhoImagemDimensaoVazia) :
                tamanhoImagemOuDimensao;

            const existeServidor = ImagemUtil.ExisteImagemServidor(imagem, tamanhoImagem);
            if (existeServidor)
            {
                return ImagemUtil.RetornarUrlImagemServidor(imagem, tamanhoImagem);
            }
            else
            {
                return ImagemUtil.RetornarUrlImagemLocal(imagem, tamanhoImagem);
            }
        }

        public static RetornarMimeTypeString(formato: d.EnumFormatoImagem): EnumMimeTypeImagemString
        {
            switch (formato)
            {
                case d.EnumFormatoImagem.BMP:
                    return EnumMimeTypeImagemString.Bmp;
                case d.EnumFormatoImagem.GIF:
                    return EnumMimeTypeImagemString.Gif;
                case d.EnumFormatoImagem.HEIC:
                    return EnumMimeTypeImagemString.Heic;
                case d.EnumFormatoImagem.ICO:
                    return EnumMimeTypeImagemString.Ico;
                case d.EnumFormatoImagem.JPEG:
                    return EnumMimeTypeImagemString.Jpeg;
                case d.EnumFormatoImagem.PNG:
                    return EnumMimeTypeImagemString.Png;
                case d.EnumFormatoImagem.TIFF:
                    return EnumMimeTypeImagemString.Tiff;
                case d.EnumFormatoImagem.Desconhecido:
                    return EnumMimeTypeImagemString.Png;
                default:
                    throw new Erro("Formato da imagem não suportado");
            }
        }

        public static RetornarUrlImagemServidor(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem): string
        {
            const servicoArquivo = $Aplicacao.RetornarServicoArquivo((imagem as any).GetType());
            const urlVisualizar = UrlUtil.Combinar(servicoArquivo.URLServico, sa.ConstantesServicoImagem.NOME_ARQUIVO_VIZUALIZAR_IMAGEM);
            const parametros = new Array<ParChaveValorSimples<string>>();
            const nomeTipoImagem = imagem.GetType().Nome;
            parametros.Add(new ParChaveValorSimples(sa.ConstantesServicoImagem.ID_IMAGEM, imagem.Id.toString()));
            parametros.Add(new ParChaveValorSimples(sa.ConstantesServicoImagem.TAMANHO_IMAGEM, tamanhoImagem.toString()));
            parametros.Add(new ParChaveValorSimples(sa.ConstantesServicoArquivo.NOME_TIPO_ARQUIVO, nomeTipoImagem));

            const url = UrlUtil.RetornarURL(urlVisualizar, parametros);
            return url + "&" + u.EnumUtil.RetornarDescricao(d.EnumTamanhoImagem, tamanhoImagem);
        }

        private static RetornarUrlImagemLocal(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem): string
        {
            if (!imagem.OrigemImagem)
            {
                imagem.OrigemImagem = sa.OrigemImagemLocalUtil.RetornarOrigemImagemLocal(imagem);
            }

            if (imagem.OrigemImagem instanceof sa.OrigemImagemLocal && imagem.OrigemImagem.IsImagemLocalCarregada)
            {
                return imagem.OrigemImagem.RetornarUrlImagemCarregada(tamanhoImagem);
            }
            return i.ImagemMemoria.UrlImagemPendente;
        }


        //#endregion
        public static RetornarTamanhoImagemAutomatico(imagem: d.IImagem, dimensaoRecipiente: d.Dimensao, tamanhoDimensaoVazia?: EnumTamanhoImagem): d.EnumTamanhoImagem
        {
            if (dimensaoRecipiente.IsEmpty || dimensaoRecipiente.Largura <= 0)
            {
                if (tamanhoDimensaoVazia != null)
                {
                    return tamanhoDimensaoVazia;
                }
                throw new Erro("A dimensão não foi definida ou é invalida");
            }
            if (dimensaoRecipiente.Altura <= 0)
            {
                dimensaoRecipiente.Altura = dimensaoRecipiente.Largura;
            }

            const tolerancia = 1.2;
            const largura = dimensaoRecipiente.Largura * tolerancia;
            const altura = dimensaoRecipiente.Altura * tolerancia;

            if (largura < imagem.DimensaoImagemMiniatura.Largura &&
                altura < imagem.DimensaoImagemMiniatura.Altura)
            {
                return d.EnumTamanhoImagem.Miniatura;
            }

            if (largura < imagem.DimensaoImagemPequena.Largura &&
                altura < imagem.DimensaoImagemPequena.Altura)
            {
                return d.EnumTamanhoImagem.Pequena;
            }

            if (largura < imagem.DimensaoImagemMedia.Largura &&
                altura < imagem.DimensaoImagemMedia.Altura)
            {
                return d.EnumTamanhoImagem.Media;
            }

            return d.EnumTamanhoImagem.Grande;
        }

        public static ExisteImagem(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem): boolean
        {
            if (ImagemUtil.ExisteImagemServidor(imagem, tamanhoImagem))
            {
                return true;
            }
            return ImagemUtil.ExisteImagemLocal(imagem, tamanhoImagem);
        }

        public static ExisteImagemServidor(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem): boolean
        {
            switch (tamanhoImagem)
            {
                case d.EnumTamanhoImagem.Miniatura:

                    return imagem.IsExisteMiniatura;

                case d.EnumTamanhoImagem.Pequena:

                    return imagem.IsExistePequena;

                case d.EnumTamanhoImagem.Media:

                    return imagem.IsExisteMedia;

                case d.EnumTamanhoImagem.Grande:

                    return imagem.IsExisteGrande;

                case d.EnumTamanhoImagem.Impressao:

                    return imagem.IsExisteArquivo;

                default:

                    throw new ErroNaoSuportado("Tamanho da imagem não suportado");
            }
        }

        public static ExisteImagemLocal(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem): boolean
        {
            if (imagem.OrigemImagem instanceof sa.OrigemImagemLocal)
            {
                return imagem.OrigemImagem.IsImagemLocalCarregada;
            }
            return false;
        }

        public static RetornarDimensaoImagemApresentacao(dimensao: IDimensao, tamanahoImagem: d.EnumTamanhoImagem): Dimensao
        {
            return ImagemUtil.RetornarDimensaoUniformeApresentacao(dimensao.Largura, dimensao.Altura, tamanahoImagem);
        }

        public static RetornarDimensaoUniformeApresentacao(larguraImagem: number, alturaImagem: number, tamanahoImagem: d.EnumTamanhoImagem): Dimensao
        {
            switch (tamanahoImagem)
            {
                case d.EnumTamanhoImagem.Miniatura:

                    return u.ImagemUtil.RetornarDimencaoUniformeDentro(larguraImagem, alturaImagem, imagens.ConstantesImagemApresentacao.LARGURA_IMAGEM_MINIATURA, imagens.ConstantesImagemApresentacao.ALTURA_IMAGEM_MINIATURA);

                case d.EnumTamanhoImagem.Pequena:

                    return u.ImagemUtil.RetornarDimencaoUniformeDentro(larguraImagem, alturaImagem, imagens.ConstantesImagemApresentacao.LARGURA_IMAGEM_PEQUENA, imagens.ConstantesImagemApresentacao.ALTURA_IMAGEM_PEQUENA);

                case d.EnumTamanhoImagem.Media:

                    return u.ImagemUtil.RetornarDimencaoUniformeDentro(larguraImagem, alturaImagem, imagens.ConstantesImagemApresentacao.LARGURA_IMAGEM_MEDIA, imagens.ConstantesImagemApresentacao.ALTURA_IMAGEM_MEDIA);

                case d.EnumTamanhoImagem.Grande:

                    return u.ImagemUtil.RetornarDimencaoUniformeDentro(larguraImagem, alturaImagem, imagens.ConstantesImagemApresentacao.LARGURA_IMAGEM_GRANDE, imagens.ConstantesImagemApresentacao.ALTURA_IMAGEM_GRANDE);

                case d.EnumTamanhoImagem.Impressao:

                    throw new ErroOperacaoInvalida("O tamanho da impressão não é suportado pelo método");
                //return new d.Dimensao(larguraImagem, alturaImagem);

                default:

                    throw new ErroNaoSuportado("Tamanho da imagem não suportado");
            }
        }

        public static RetornarDimensaoApresentacao( tamanahoImagem: d.EnumTamanhoImagem): IDimensao
        {
            switch (tamanahoImagem)
            {
                case d.EnumTamanhoImagem.Miniatura:

                    return {
                        Largura: imagens.ConstantesImagemApresentacao.LARGURA_IMAGEM_MINIATURA,
                        Altura: imagens.ConstantesImagemApresentacao.ALTURA_IMAGEM_MINIATURA
                    };

                case d.EnumTamanhoImagem.Pequena:

                    return {
                        Largura: imagens.ConstantesImagemApresentacao.LARGURA_IMAGEM_PEQUENA,
                        Altura: imagens.ConstantesImagemApresentacao.ALTURA_IMAGEM_PEQUENA
                    };

                case d.EnumTamanhoImagem.Media:

                    return {
                        Largura: imagens.ConstantesImagemApresentacao.LARGURA_IMAGEM_MEDIA,
                        Altura: imagens.ConstantesImagemApresentacao.ALTURA_IMAGEM_MEDIA
                    };

                case d.EnumTamanhoImagem.Grande:

                    return {
                        Largura: imagens.ConstantesImagemApresentacao.LARGURA_IMAGEM_GRANDE,
                        Altura: imagens.ConstantesImagemApresentacao.ALTURA_IMAGEM_GRANDE
                    };

                case d.EnumTamanhoImagem.Impressao:

                    throw new ErroOperacaoInvalida("O tamanho da impressão não é suportado pelo método");

                default:

                    throw new ErroNaoSuportado("Tamanho da imagem não suportado");
            }
        }


        public static RetornarDimencaoUniformeFora(larguraImagem: number, alturaImagem: number, larguraMinima: number, alturaMinima: number, isDecimal: boolean): Dimensao
        {
            return u.DimensaoUtil.RetornarDimencaoUniformeFora(larguraImagem, alturaImagem, larguraMinima, alturaMinima, isDecimal);
        }

        public static RetornarDimencaoUniformeDentro(larguraImagem: number, alturaImagem: number, larguraMaxima: number, alturaMaxima: number, isDecimal: boolean = true, aumentar: boolean = true): Dimensao
        {
            return u.DimensaoUtil.RetornarDimencaoUniformeDentro(larguraImagem, alturaImagem, larguraMaxima, alturaMaxima, isDecimal, aumentar);
        }

        public static RetornarRegiaoCentroFora(largura: number, altura: number, larguraRecipiente: number, alturaRecipente: number): IRegiao
        {
            return u.DimensaoUtil.RetornarRegiaoCentroFora(largura, altura, larguraRecipiente, alturaRecipente);
        }

        public static RetornarPosicaoCentroDentro(largura: number, altura: number, larguraRecipiente: number, alturaRecipente: number): IRegiao
        {
            return u.DimensaoUtil.RetornarRegiaoCentroDentro(largura, altura, larguraRecipiente, alturaRecipente);
        }

        public static RetornarDimensaoUniformeAltura(largura: number, altura: number, alturaRecipiente: number): Dimensao
        {
            return u.DimensaoUtil.RetornarDimensaoUniformeAltura(largura, altura, alturaRecipiente);
        }

        public static RetornarDimensaoUniformeLargura(largura: number, altura: number, novaLargura: number): Dimensao
        {
            return u.DimensaoUtil.RetornarDimensaoUniformeLargura(largura, altura, novaLargura);
        }

        public static LimparElementoImagem(elementoImagem: HTMLImageElement)
        {
            elementoImagem.onload = null;
            elementoImagem.onerror = null;
            elementoImagem.src = ImagemUtil.ImagemVaziaBase64;
        }

        public static DefinirOrigemImagem(imagem: d.IImagem, arquivo: SnBlob): void
        {
            imagem.NomeArquivo = arquivo.name;
            imagem.CaminhoArquivo = arquivo.name;
            imagem.TotalBytesLocal = arquivo.size;
        }


        public static LimarCanvas(canvas: HTMLCanvasElement)
        {
            const contexto = canvas.getContext("2d");

            contexto.clearRect(0, 0, canvas.width, canvas.height);

            canvas.width = 1;
            canvas.height = 1;

            contexto.save();
            contexto.setTransform(1, 0, 0, 1, 0, 0);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            //contexto.restore();
        }

        public static RetornarFormatoImagem(arquivoOuPath: string | SnBlob | Blob): d.EnumFormatoImagem
        {
            if ((arquivoOuPath instanceof Blob || arquivoOuPath instanceof SnBlob))
            {
                switch (arquivoOuPath.type)
                {
                    case "image/jpg":
                    case "image/jpeg":
                        return d.EnumFormatoImagem.JPEG;
                    case "image/png":
                        return d.EnumFormatoImagem.PNG;
                    case "image/ico":
                        return d.EnumFormatoImagem.ICO;
                    case "image/gif":
                        return d.EnumFormatoImagem.GIF;
                    case "image/bmp":
                        return d.EnumFormatoImagem.BMP;
                    case "image/tif":
                    case "image/tiff":
                        return d.EnumFormatoImagem.TIFF;
                    case "image/heic":
                        return d.EnumFormatoImagem.HEIC;
                    case "image/webp":
                        return d.EnumFormatoImagem.WEBP;
                    case "image/svg+xml":
                        return d.EnumFormatoImagem.SVG;
                    case "image/avif":
                        return d.EnumFormatoImagem.AVIF;
                    case "image/apng":
                        return d.EnumFormatoImagem.APNG;
                }
            }

            const nomeOuTipoArquivo = (arquivoOuPath instanceof Blob || arquivoOuPath instanceof SnBlob) ?
                ArquivoUtil.RetornarNomeOuTipoArquivo(arquivoOuPath) : arquivoOuPath;

            const extensao = ArquivoUtil.RetornarExtensaoArquivo(nomeOuTipoArquivo, true);
            switch (extensao.toLowerCase())
            {
                case "bmp":
                    return d.EnumFormatoImagem.BMP;
                case "ico":
                    return d.EnumFormatoImagem.ICO;
                case "gif":
                    return d.EnumFormatoImagem.GIF;
                case "jpg":
                case "jpeg":
                    return d.EnumFormatoImagem.JPEG;
                case "png":
                case "pneg":
                    return d.EnumFormatoImagem.PNG;
                case "tif":
                case "tiff":
                    return d.EnumFormatoImagem.TIFF;
                case "heic":
                    return d.EnumFormatoImagem.HEIC;
                default:
                    return d.EnumFormatoImagem.Desconhecido;
            }
        }

        public static EnviarImagemApresentacaoAsync(imagem: d.IImagem, callbackProgresso: Action1<ProgressoEventArgs>): Promise<void>
        {
            return $Aplicacao.GerenciadorServioArquivoPadrao.EnviarImagemApresentacaoAsync(imagem, callbackProgresso);
        }

        public static EnviarImagemImpressaoAsync(imagem: d.IImagem, dimensaoImpressao: Dimensao, callbackProgresso: Action1<ProgressoEventArgs>): Promise<void>
        {
            return $Aplicacao.GerenciadorServioArquivoPadrao.EnviarImagemImpressaoAsync(imagem, dimensaoImpressao, true, callbackProgresso);
        }

        //public static RetornarInfoImagemAsync(arquivo: SnBlob): Promise<IInformacaoImagem> | IInformacaoImagem
        //{
        //    return arquivo.InfoImagemAsync();
        //}

        private static RetornarMimeTypeEnum(infoImagem: IInformacaoImagem, arquivo: SnBlob): EnumMimeType
        {
            if (!infoImagem.IsImagem)
            {
                return arquivo.MimeType;
            }

            const formataImagem = infoImagem.FormatoImagem;
            switch (formataImagem)
            {
                case d.EnumFormatoImagem.JPEG:

                    return EnumMimeType.Jpeg;

                case d.EnumFormatoImagem.BMP:

                    return EnumMimeType.Bmp;

                case d.EnumFormatoImagem.PNG:

                    return EnumMimeType.Png;

                case d.EnumFormatoImagem.ICO:

                    return EnumMimeType.Ico;

                case d.EnumFormatoImagem.GIF:

                    return EnumMimeType.Gif;

                case d.EnumFormatoImagem.TIFF:

                    return EnumMimeType.Tiff;

                case d.EnumFormatoImagem.WEBP:

                    return EnumMimeType.Webp;

                case d.EnumFormatoImagem.SVG:

                    return EnumMimeType.Svg;

                case d.EnumFormatoImagem.AVIF:

                    return EnumMimeType.Avif;

                case d.EnumFormatoImagem.APNG:

                    return EnumMimeType.Apng;


                case d.EnumFormatoImagem.Desconhecido:

                    console.error("Formato do imagem não suportado " + arquivo.name);

                    return arquivo.MimeType;
                /*return arquivo.MimeType;*/

                default:

                    throw new Erro("Formato do imagem não suportado");
            }
        }

        public static IsFormatoArquivoSuportado(arquivoOuPath: string | SnBlob | Blob): boolean
        {
            const formato = ImagemUtil.RetornarFormatoImagem(arquivoOuPath);
            switch (formato)
            {
                case EnumFormatoImagem.JPEG:
                case EnumFormatoImagem.PNG:
                case EnumFormatoImagem.BMP:
                case EnumFormatoImagem.TIFF:
                    return true;
                default:
                    return false;
            }
        }


        public static IsFormatoImagemSuportado(formatoImagem: EnumFormatoImagem): boolean
        {
            switch (formatoImagem)
            {
                case EnumFormatoImagem.GIF:
                case EnumFormatoImagem.JPEG:
                case EnumFormatoImagem.PNG:
                case EnumFormatoImagem.BMP:
                case EnumFormatoImagem.TIFF:
                case EnumFormatoImagem.HEIC:
                case EnumFormatoImagem.WEBP:
                case EnumFormatoImagem.SVG:
                    return true;
                default:
                    return false;
            }
        }

        public static IsJpeg(arquivoOuPath: string | SnBlob | Blob): boolean
        {
            return ImagemUtil.RetornarFormatoImagem(arquivoOuPath) === EnumFormatoImagem.JPEG;
        }

        public static AtualizarDimensao(imagem: d.IImagem, dimensao: IDimensao, tamanhoImagem: d.EnumTamanhoImagem): boolean
        {
            switch (tamanhoImagem)
            {
                case d.EnumTamanhoImagem.Miniatura:
                    return imagem.DimensaoImagemMiniatura.Atualizar(dimensao);
                case d.EnumTamanhoImagem.Pequena:
                    return imagem.DimensaoImagemPequena.Atualizar(dimensao);
                case d.EnumTamanhoImagem.Media:
                    return imagem.DimensaoImagemMedia.Atualizar(dimensao);
                case d.EnumTamanhoImagem.Grande:
                    return imagem.DimensaoImagemGrande.Atualizar(dimensao);
                case d.EnumTamanhoImagem.Impressao:
                    return imagem.DimensaoImagemImpressao.Atualizar(dimensao);
                default:
                    throw new Erro("Tamanho da imagem não suportado");
            }
        }

        public static AtualizarDimensaLocal(imagem: d.IImagem,
            dimensao: IDimensao,
            formatoImagem: EnumFormatoImagem,
            mimeType: EnumMimeType,
            isIcone: boolean): boolean
        {
            let isAtualizou = false;
            if (imagem.DimensaoImagemLocal.Atualizar(dimensao))
            {
                isAtualizou = true;
            }


            if (imagem.FormatoImagem !== formatoImagem)
            {
                imagem.FormatoImagem = formatoImagem;
                isAtualizou = true;
            }
            if (imagem.MimeType !== mimeType)
            {
                imagem.MimeType = mimeType;
                isAtualizou = true;
            }

            if (isIcone && !imagem.IsIcone)
            {
                imagem.IsIcone = true;

                const dimensao = ImagemUtil.DimensaoIcone;
                imagem.FormatoImagem = EnumFormatoImagem.PNG;
                imagem.DimensaoImagemLocal = new Dimensao(dimensao);
                imagem.DimensaoImagemMiniatura = new Dimensao(u.ImagemUtil.RetornarDimensaoImagemApresentacao(dimensao, d.EnumTamanhoImagem.Miniatura));
                imagem.DimensaoImagemPequena = new Dimensao(u.ImagemUtil.RetornarDimensaoImagemApresentacao(dimensao, d.EnumTamanhoImagem.Pequena));
                imagem.DimensaoImagemMedia = new Dimensao(u.ImagemUtil.RetornarDimensaoImagemApresentacao(dimensao, d.EnumTamanhoImagem.Media));
                imagem.DimensaoImagemGrande = new Dimensao(u.ImagemUtil.RetornarDimensaoImagemApresentacao(dimensao, d.EnumTamanhoImagem.Grande));
                isAtualizou = true;
            }
            return isAtualizou;
        }

    }
}
