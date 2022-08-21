
namespace Snebur
{
    export class Objeto implements Object, IEquals 
    {
        static ___ContadorHashCode: number = 1;

        //suportado  2015 or >
        //readonly #camposPrivado = {} as ObjetoCamposPrivados;
        private readonly __camposPrivados = {} as ObjetoCamposPrivados;
        private __tipo__: r.BaseTipo;

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
            this.__camposPrivados.__hashCode = Objeto.RetornarNovoHashCode();
        }

        public toString(args?: string): string
        {
            return this.___NomeConstrutor + "_" + this.GetHashCode();
        }

        public GetType(): r.BaseTipo
        {
            if (this.__tipo__ == null || $Reflexao.IsBaseTipoGenerico(this.__tipo__.CaminhoTipo))
            {
                this.__tipo__ = this.__RetornarTipo();
            }
            return this.__tipo__;
        }

        public GetHashCode(): number
        {
            return this.__camposPrivados.__hashCode;
        }

        public DispensarObjeto<TThis extends this>(expressaoObjeto: (value: TThis) => HTMLElement | Objeto): void
        {
            const nomePropriedade = ExpressaoUtil.RetornarCaminhoPropriedade(expressaoObjeto);
            const valorObjeto = (this as any)[nomePropriedade];
            if (u.ValidacaoUtil.IsDefinido(valorObjeto))
            {
                const objetoIDisposable = valorObjeto as IDisposable;
                if (typeof objetoIDisposable.Dispose === "function")
                {
                    objetoIDisposable.Dispose();
                }

                if (objetoIDisposable instanceof HTMLElement)
                {
                    objetoIDisposable.remove();
                }

                (this as any)[nomePropriedade] = undefined;
                delete (this as any)[nomePropriedade];
            }
        }

        //#region Timeouts 



        protected SetTimeout(acao: Function, timeout: number = 0): number
        {
            if (!this.__camposPrivados.__IdentificadoresTimeout)
            {
                this.__camposPrivados.__IdentificadoresTimeout = new List<number>();
            }

            const identificador = window.setTimeout(acao.bind(this), timeout);
            this.__camposPrivados.__IdentificadoresTimeout.Add(identificador);
            return identificador;
        }

        protected SetInterval(acao: Function, timeout: number = 0): number
        {
            if (!this.__camposPrivados.__IdentificadoresInterval)
            {
                this.__camposPrivados.__IdentificadoresInterval = new List<number>();
            }

            const identificador = window.setInterval(acao.bind(this), timeout);
            this.__camposPrivados.__IdentificadoresInterval.Add(identificador);
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
            const texto = this.toString();
            if (!String.IsNullOrEmpty(formatacao))
            {
                return u.FormatacaoUtil.Formatar(texto, formatacao);
            }
            return texto;
        }

        public Equals(obj: object): boolean
        {
            /*eslint-disable*/
            return this == obj;
            /*eslint-enable*/
        }


        public Dispose(): void
        {
            if (this.__camposPrivados.__IdentificadoresTimeout instanceof Array)
            {
                for (const identificadorTimeout of this.__camposPrivados.__IdentificadoresTimeout)
                {
                    window.clearTimeout(identificadorTimeout);
                }
                this.__camposPrivados.__IdentificadoresTimeout.Clear();
            }

            if (this.__camposPrivados.__IdentificadoresInterval instanceof Array)
            {
                for (const identificadorInterval of this.__camposPrivados.__IdentificadoresInterval)
                {
                    window.clearTimeout(identificadorInterval);
                }
                this.__camposPrivados.__IdentificadoresInterval.Clear();
            }

            this.__camposPrivados.__IdentificadoresTimeout = undefined;
            this.__camposPrivados.__IdentificadoresTimeout = undefined;
        }

        public static RetornarNovoHashCode(): number
        {
            Objeto.___ContadorHashCode += 1;
            return Objeto.___ContadorHashCode;
        }
    }

    interface ObjetoCamposPrivados
    {
        __hashCode: number
        __IdentificadoresTimeout: List<number>;
        __IdentificadoresInterval: List<number>;
    }
}
