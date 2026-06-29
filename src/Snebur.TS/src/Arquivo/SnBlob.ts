namespace Snebur
{
    export class SnBlob extends Snebur.SneburObject
    {
        private _nomeArquivo: string | null = null;
        private _informacaoImagem: IInformacaoImagem | null = null;
        private _name: string | null = null;
        private _isDispensado: boolean = false;
        private _urlBlob: string | null = null;
        private _checksum: string | Error | null = null;
        private _blob: Blob;
        private _buffer: ArrayBuffer | null = null;
        private _size: number | null = null;
        private _type: string | null = null;

        public get IsHeic(): boolean
        {
            return this._informacaoImagem?.IsHeic;
        }

        public get IsFormatoImagemSuportado(): boolean
        {
            return true;
        }

        public get Blob(): Blob
        {
            this.ValidarSeDispensado();
            return this._blob;
        }

        public get Name(): string
        {
            if (this._name == null)
            {
                this._name = this.RetornarNomeArquivo();
            }
            return this._name;
        }


        public get NameWithOutExtension(): string
        {
            return ArquivoUtil.RetornarNomeArquivoSemExtensao(this.Name);
        }

        public get Size(): number
        {
            if (this._size == null)
            {
                this.ValidarSeDispensado();
                this._size = this._blob.size;
            }
            return this._size;
        }

        public get UrlBlob(): string
        {
            if (this._urlBlob == null)
            {
                this.ValidarSeDispensado();
                this._urlBlob = window.URL.createObjectURL(this._blob);
            }
            return this._urlBlob;
        }

        public get UrlIcone(): string
        {
            return $Configuracao.UrlIcone + this.Extensao;
        }

        public get Type(): string
        {
            if (this._type == null)
            {
                this.ValidarSeDispensado();
                this._type = this._blob.type;
            }
            return this._type;
        }

        public get Extensao(): string
        {
            return ArquivoUtil.RetornarExtensaoArquivo(this.Name);
        }

        public get MimeType(): EnumMimeType
        {
            return ArquivoUtil.RetornarMineTypeEnum(this.Name);
        }

        public get InfoImagemInterno(): IInformacaoImagem
        {
            return this._informacaoImagem;
        }

        public constructor(blob: Blob, nomeArquivo: string = null)
        {
            super();
            if (!(blob instanceof Blob))
            {
                throw new Erro("O argumento blob não foi definido");
            }
            this._blob = blob;
            this._nomeArquivo = nomeArquivo;
        }

        public Slice(start?: number, end?: number, contentType?: string): SnBlob
        {
            this.ValidarSeDispensado();
            return new SnBlob(this._blob.slice(start, end, contentType));
        }

        public async ArrayBuffer(): Promise<ArrayBuffer>
        {
            this.ValidarSeDispensado();
            if (this._buffer == null)
            {
                this._buffer = await this._blob.arrayBuffer();
            }
            return this._buffer;
        }

        public get Stream(): ReadableStream
        {
            this.ValidarSeDispensado();
            return this._blob.stream();
        }

        public async TextoAsync(): Promise<string>
        {
            this.ValidarSeDispensado();
            return this._blob.text();
        }

        private ValidarSeDispensado(): void
        {
            if (this._isDispensado)
            {
                DebugUtil.Break(`O ${this.constructor.name} ${this._type ?? ""} ${this._name ?? ""} objeto já foi dispensado`);
                throw new Erro(`O ${this.constructor.name} objeto já foi dispensado`);
            }
        }

        public async ChecksumAsync(): Promise<string | Error>
        {
            if (this._checksum == null)
            {
                const checksum = await w.Checksum.RetornarChecksumAsync(this._blob);
                if (typeof checksum === "string" && u.Md5Util.IsMd5(checksum))
                {
                    this._checksum = checksum;
                }
                return checksum;
            }
            return this._checksum;
        }

        public override Equals(obj: SnBlob): boolean
        {
            if (obj instanceof SnBlob)
            {
                return this._blob === obj._blob;
            }
            return false;
        }

        public async RetornarInfoImagemAsync(): Promise<IInformacaoImagem>
        {
            if (this._informacaoImagem == null)
            {
                this._informacaoImagem = await this.RetornarInfoImagemInternoAsync();
            }
            return this._informacaoImagem;
        }

        private async RetornarInfoImagemInternoAsync(): Promise<IInformacaoImagem>
        {
            const informacaoImagem = await w.InformacaoImagemWorker.RetornarInformacaoImagemAsync(this);
            const checksum = await this.ChecksumAsync();
            if (typeof checksum === "string")
            {
                informacaoImagem.ChecksumArquivoLocal = checksum;
            }
            return informacaoImagem;
        }

        public SalvarComo(nomeArquivo: string)
        {
            Salvar.SalvarComo(this.Blob, nomeArquivo);
        }

        public AtribuirInformacaoImagem(informacaoImagem: IInformacaoImagem)
        {
            this._informacaoImagem = informacaoImagem;
        }

        //#region nativa blob

        public get name(): string
        {
            return this.Name;
        }


        public get size(): number
        {
            return this.Size;
        }

        public get type(): string
        {
            return this.Type;
        }

        public arrayBuffer(): Promise<ArrayBuffer>
        {
            return this.ArrayBuffer();
        }

        public slice(start?: number, end?: number, contentType?: string): Blob
        {
            this.ValidarSeDispensado();
            return this.Blob.slice(start, end, contentType);
        }

        public stream(): ReadableStream
        {
            this.ValidarSeDispensado();
            return this.Blob.stream();
        }

        public text(): Promise<string>
        {
            this.ValidarSeDispensado();
            return this.Blob.text();
        }

        public override toString(): string
        {
            if (this._isDispensado)
            {
                return `SnBlob-${this._name}-${this._size}b`;
            }
            return `SnBlob-${this.Name}-${this.Size}b`;
        }
        //#endregion

        public RevokeUrlBlob()
        {
            if (this._urlBlob != null)
            {
                DebugUtil.Break("SnBlob.RevokeUrlBlob");
                window.URL.revokeObjectURL(this._urlBlob);
            }
            this._urlBlob = null;
            delete this._urlBlob;
        }

        private RetornarNomeArquivo(): any
        {
            this.ValidarSeDispensado();
            if (this._blob instanceof File)
            {
                return this._blob.name;
            }
            return this._nomeArquivo ?? this.RetornarNomeGenerico();
        }

        private RetornarNomeGenerico(): string
        {
            if (this.IsHeic)
            {
                return `[blob]-${(this.size)}.jpeg`;
            }
            const extensao = ArquivoUtil.RetornarExtensaoArquivo(this._blob.type);
            return `[blob]-${(this.size)} ${extensao}`;
        }

        public override Dispose(): void
        {
            if (!this._isDispensado)
            {
                console.warn(`SnBlob.Dispose: ${this._name ?? ""} - ${this._size ?? ""}b`);

                this.RevokeUrlBlob();
                delete this._blob;
                delete this._buffer;
                this._isDispensado = true;
            }
        }
    }
}

//interface Blob
//{
//   readonly IsHeic?: boolean;
//}