﻿namespace Snebur.Imagens
{
    export class AbrirImagemImpressaoCanvas extends BaseAbrirImagemLocalCanvas
    {
        protected override readonly   QualidadePica: number  = 3;
        private static readonly TIMEOUT = 90 * 1000;
        private IdTimeout: number;
        private readonly DimensaoImpressao: d.Dimensao;

        public constructor(
            origemImagemLocal: sa.OrigemImagemLocal,
            dimensaoImpressao: d.Dimensao)
        {
            super(origemImagemLocal.ArquivoLocal);
            this.DimensaoImpressao = dimensaoImpressao;
        }

        public async RetornarArrayBufferAsync(): Promise<ArrayBuffer>
        {
            const t = Stopwatch.StartNew();

            const imagem = await ImagemLocalUtil.RetornarElementoImagemAsync(this.ArquivoLocal, true);
            if (imagem == null)
            {
                return null;
            }

            const dimensao = this.NormalizarDimensao(imagem, this.DimensaoImpressao);
            const canvas = await this.RetornarCanvasAsync(imagem, dimensao);

            const mimeType = this.RetornarMimeType();
            const blob = await this.RetornarBlobAsync(canvas, u.ImagemUtil.QUALIDADE_IMPRESSAO_CANVAS / 100, mimeType);
            if (blob != null)
            {
                console.warn(`Processado Canvas  : Arquivo: ${this.ArquivoLocal.name} - t ${t.TotalSeconds} `);
                if (window.__IS_SALVAR_ARQUIVOS__IMPRESSAO__)
                {
                    const extensao = mimeType.substring(mimeType.indexOf("/") + 1);
                    Salvar.SalvarComo(blob, `CANVAS-IMPRESSAO-${this.ArquivoLocal.NameWithOutExtension}-t-${t.ElapsedMilliseconds}.${extensao}`);
                }

                const bytes = await u.ArquivoUtil.RetornarBufferArrayAsync(blob, true);
                return bytes;
            }
            return null;
        }

        private NormalizarDimensao(imagem: HTMLImageElement, dimensao: d.Dimensao): d.Dimensao 
        {
            if (dimensao === null)
            {
                return new Dimensao(imagem.naturalWidth, imagem.naturalHeight);
            }
            return dimensao;
        }

        private RetornarArrayButter(bytes: Uint8Array | ArrayBuffer | null): ArrayBuffer | null
        {
            if (bytes instanceof Uint8Array)
            {
                return bytes.buffer;
            }

            if (bytes instanceof ArrayBuffer)
            {
                return bytes;
            }
            return null;
        }

        public override Dispose(): void
        {
            super.Dispose();
            //this.ImagensCarregadas.Clear();
            //delete this.ImagensCarregadas;
        }


    }

}