namespace Snebur
{
    export class SnBlob extends Snebur.Objeto
    {
        private _informacaoImagem: IInformacaoImagem;
        private _isDispensado: boolean = false;
        private _urlBlob: string = null;
        private _checksum: string | Error = null;
        private _blob: Blob;

        public get IsHeic(): boolean
        {
            return this._informacaoImagem?.IsHeic;
        }

        public get Blob(): Blob
        {
            this.ValidarSeDispensado();
            return this._blob;
        }

        public get Name(): string
        {
            this.ValidarSeDispensado();
            if (this._blob instanceof File)
            {
                if (this.IsHeic)
                {
                    return ArquivoUtil.TrocarExtensao(this._blob.name, ".jpeg");
                }

                return this._blob.name;
            }
            if (this.IsHeic)
            {
                return `[blob]-${(this.size)}.jpeg`;
            }
            const extensao = ArquivoUtil.RetornarExtensaoArquivo(this._blob.type);
            return `[blob]-${(this.size)} ${extensao}`;
        }

        public get Size(): number
        {
            this.ValidarSeDispensado();
            return this._blob.size;
        }

        public get UrlBlob(): string
        {
            this.ValidarSeDispensado();
            if (this._urlBlob == null)
            {
                this._urlBlob = window.URL.createObjectURL(this._blob);
            }
            return this._urlBlob;
        }

        public get Type(): string
        {
            this.ValidarSeDispensado();
            return this._blob.type;
        }

        public constructor(blob: Blob)
        {
            super();
            if (!(blob instanceof Blob))
            {
                throw new Erro("O argumento blob não foi definido");

            }
            this._blob = blob;
        }

        public Slice(start?: number, end?: number, contentType?: string): SnBlob
        {
            this.ValidarSeDispensado();
            return new SnBlob(this._blob.slice(start, end, contentType));
        }

        public ArrayBuffer(): Promise<ArrayBuffer>
        {
            this.ValidarSeDispensado();
            return this._blob.arrayBuffer();
        }

        public get Stream(): ReadableStream
        {
            this.ValidarSeDispensado();
            return this._blob.stream();
        }

        private TextoAsync(): Promise<string>
        {
            this.ValidarSeDispensado();
            return this._blob.text();
        }

        private ValidarSeDispensado(): void
        {
            if (this._isDispensado)
            {
                throw new Erro("O objeto já foi dispensado");
            }
        }

        public async ChecksumAsync(): Promise<string | Error>  
        {
            if (this._checksum != null)
            {
                return this._checksum;

            }

            const checksum = await w.Checksum.RetornarChecksumAsync(this._blob);
            if (typeof checksum === "string" && u.Md5Util.IsMd5(checksum))
            {
                this._checksum = checksum;
            }
            return checksum;
        }

        public RevogarUrlBlob(): void
        {
            if (this._urlBlob != null)
            {
                window.URL.revokeObjectURL(this._urlBlob);
                this._urlBlob = null;
            }
        }

        public override Equals(obj: SnBlob): boolean
        {
            if (obj instanceof SnBlob)
            {
                return this._blob === obj._blob;
            }
            return false;
        }

        public InfoImagemAsync(): Promise<IInformacaoImagem> | IInformacaoImagem
        {
            if (this._informacaoImagem != null)
            {
                return this._informacaoImagem;
            }
            return this.RetornarInfoImagemInternoAsync();
        }

        private async RetornarInfoImagemInternoAsync(): Promise<IInformacaoImagem>  
        {
            this._informacaoImagem = await w.InformacaoImagemWorker.RetornarInformacaoImagemAsync(this);
            return this._informacaoImagem;
        }

        public SalvarComo(nomeArquivo: string)
        {
            Salvar.SalvarComo(this.Blob, nomeArquivo);
        }

        public AtribuirInformacaoImagem(informacaoImagem: IInformacaoImagem)
        {
            this._informacaoImagem = informacaoImagem;
            //(this._blob as any).IsHeic = informacaoImagem.IsHeic;
        }

        //#region nativa blob

        public get name(): string
        {
            if (this.Blob instanceof File)
            {
                return this.Blob.name;
            }
            return this.Name;
        }


        public get size(): number
        {
            return this.Blob.size;
        }

        public get type(): string
        {
            return this.Blob.type;
        }

        public get arrayBuffer(): Promise<ArrayBuffer>
        {
            return this.Blob.arrayBuffer();
        }

        public slice(start?: number, end?: number, contentType?: string): Blob
        {
            return this.Blob.slice(start, end, contentType);
        }

        public stream(): ReadableStream
        {
            return this.Blob.stream();
        }
        public text(): Promise<string>
        {
            return this.Blob.text();
        }

        public override toString(): string
        {
            return `SnBlob-${this.name}-${this.size}b`;
        }
        //#endregion

        public override Dispose(): void
        {

            if (!this._isDispensado)
            {
                if (this._urlBlob != null)
                {
                    window.URL.revokeObjectURL(this._urlBlob);
                }
                delete this._urlBlob;
                delete this._blob;
                this._isDispensado = true;
            }
        }
    }
}

//interface Blob
//{
//   readonly IsHeic?: boolean;
//}