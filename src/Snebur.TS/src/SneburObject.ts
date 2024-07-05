
namespace Snebur
{
    export class SneburObject implements Object, IEquals 
    {
        static ___ContadorHashCode: number = 1;

        private readonly __privateFields = {} as PrivateFieldsObject;
        private __type__: r.BaseTipo;

        /**
         * Propriedades de uso para nome do classe do em mensagem de erro, futuramente poderá ter uma referencia mais completo para o mesmo
         */
        public get ___NomeConstrutor(): string
        {
            return this.constructor.name;
        }

        public get __CaminhoTipo(): string
        {
            return this.constructor.__CaminhoTipo;
        }

        public constructor()
        {
            this.__privateFields.__hashCode = SneburObject.RetornarNovoHashCode();
        }

        public toString(args?: string): string
        {
            return this.___NomeConstrutor + "_" + this.GetHashCode();
        }

        public GetType(): r.BaseTipo
        {
            if (this.__type__ == null || $Reflexao.IsBaseTipoGenerico(this.__type__.CaminhoTipo))
            {
                this.__type__ = this.__RetornarTipo();
            }
            return this.__type__;
        }

        public GetHashCode(): number
        {
            return this.__privateFields.__hashCode;
        }

        public DisposeObject<TThis extends this>(expressaoObjeto: (value: TThis) => HTMLElement | SneburObject | Array<any>): void
        {
            const propertyName = ExpressaoUtil.RetornarCaminhoPropriedade(expressaoObjeto);
            const propertyValue = (this as any)[propertyName];

            if (u.ValidacaoUtil.IsDefinido(propertyValue))
            {
                const disposableObject = propertyValue as IDisposable;
                if (typeof disposableObject.Dispose === "function")
                {
                    disposableObject.Dispose();
                }

                if (disposableObject instanceof HTMLElement)
                {
                    disposableObject.remove();
                }

                if (Array.isArray(disposableObject))
                {
                    disposableObject.Clear();
                }
                (this as any)[propertyName] = undefined;
                delete (this as any)[propertyName];
            }
        }


        //#region Timeouts 

        protected SetTimeout(acao: Function, timeout: number = 0): number
        {
            if (!this.__privateFields.__timeoutIdentifiers)
            {
                this.__privateFields.__timeoutIdentifiers = new List<number>();
            }

            const identificador = window.setTimeout(acao.bind(this), timeout);
            this.__privateFields.__timeoutIdentifiers.Add(identificador);
            return identificador;
        }

        protected SetInterval(acao: Function, timeout: number = 0): number
        {
            if (!this.__privateFields.__intervalIdentifiers)
            {
                this.__privateFields.__intervalIdentifiers = new List<number>();
            }

            const identificador = window.setInterval(acao.bind(this), timeout);
            this.__privateFields.__intervalIdentifiers.Add(identificador);
            return identificador;
        }

        //#endregion

        /*@internal */
        public __RetornarTipo(): Snebur.Reflexao.BaseTipo
        {
            let caminhoTipo: string;
            if (!String.IsNullOrEmpty(this.__CaminhoTipo))
            {
                caminhoTipo = this.__CaminhoTipo;
            }
            else if (!String.IsNullOrEmpty(this.constructor.__CaminhoTipo))
            {
                caminhoTipo = this.constructor.__CaminhoTipo;
            }

            if (!String.IsNullOrEmpty(caminhoTipo))
            {
                if ($Reflexao.Tipos.ContainsKey(caminhoTipo))
                {
                    return $Reflexao.Tipos.Item(caminhoTipo);
                }
            }
            return u.ReflexaoUtil.RetornarTipoObjetoCaminhoNaoDefinido(this);
        }

        public ToString(formatacao?: string): string
        {
            const text = this.toString();
            if (!String.IsNullOrEmpty(formatacao))
            {
                return u.FormatacaoUtil.Formatar(text, formatacao);
            }
            return text;
        }

        public Equals(obj: object): boolean
        {
            /*eslint-disable*/
            return this == obj;
            /*eslint-enable*/
        }


        public Dispose(): void
        {
            if (this.__privateFields.__timeoutIdentifiers instanceof Array)
            {
                for (const identificadorTimeout of this.__privateFields.__timeoutIdentifiers)
                {
                    window.clearTimeout(identificadorTimeout);
                }
                this.__privateFields.__timeoutIdentifiers.Clear();
            }

            if (this.__privateFields.__intervalIdentifiers instanceof Array)
            {
                for (const identificadorInterval of this.__privateFields.__intervalIdentifiers)
                {
                    window.clearTimeout(identificadorInterval);
                }
                this.__privateFields.__intervalIdentifiers.Clear();
            }

            this.__privateFields.__timeoutIdentifiers = undefined;
            this.__privateFields.__timeoutIdentifiers = undefined;
        }

        public static RetornarNovoHashCode(): number
        {
            SneburObject.___ContadorHashCode += 1;
            return SneburObject.___ContadorHashCode;
        }
    }

    interface PrivateFieldsObject 
    {
        __hashCode: number
        __timeoutIdentifiers: List<number>;
        __intervalIdentifiers: List<number>;
    }
}
