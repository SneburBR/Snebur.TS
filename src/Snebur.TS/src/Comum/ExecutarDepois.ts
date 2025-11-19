namespace Snebur
{
    export class ExecutarDepois<TAcao extends Function = Function> implements IDisposable
    {
        private readonly _acao: TAcao

        private _isDisposed: boolean = false;
        private _isExistePedencia: boolean = false;
        private _isNuncaExecutado: boolean = true;
        private _identificadorTimeout: number = null;
        private _isNaoValidarArgumentoDiferentes: boolean = false;
        //private _identificadorInterval: number = null;
        //private _identificadorLimparInterval: number = null;
        /*private _totalMilesegundosLimparIntervalo: number;*/

        private _timeout: number;
        private _interval: number;
        private _ultimosArgmentos: Array<any> = undefined;

        public get IsExistePedencia(): boolean
        {
            return this._isExistePedencia;
        }
        public get IsNuncaExecutado(): boolean
        {
            return this._isNuncaExecutado;
        }

        public get Timeout(): number
        {
            return this._timeout;
        }
        public get Interval(): number | null
        {
            return this._interval;
        }

        //public constructor(acao: TAcao, timeout: number, interval: number)
        //public constructor(acao: TAcao, timeout: TimeSpan, interval: TimeSpan)
        public constructor(acao: TAcao, timeout?: number, isNaoValidarArgumentoDiferentes?: boolean)
        public constructor(acao: TAcao, timeout?: TimeSpan, isNaoValidarArgumentoDiferentes?: boolean)
        public constructor(acao: TAcao, timeout?: number | TimeSpan, isNaoValidarArgumentoDiferentes?: boolean)
        {
            if (!(acao instanceof Function))
            {
                throw new Erro("A ação não foi definida ou não é suportada");
            }

            this._acao = acao;
            this._timeout = this.RetornarTotalMilesegundos(timeout);
            this._isNaoValidarArgumentoDiferentes = isNaoValidarArgumentoDiferentes;

            //if (typeof interval === "number" && interval > 0)
            //{
            //    this._interval = this.RetornarTotalMilesegundos(interval);
            //    this._totalMilesegundosLimparIntervalo = this._totalMilesegundosIntervalo * 3;
            //}
        }

        public async Executar(...argumentos: Array<any>): Promise<void>
        {
            window.clearTimeout(this._identificadorTimeout);
            this.CheckIsDisposed();
            if (argumentos?.length > 0)
            {
                const copiaArgumentos = [...argumentos];
                if (this.IsExecutarIntervaloPendente(copiaArgumentos))
                {
                    console.warn(`Aguarmento ${this._ultimosArgmentos} <> ${copiaArgumentos}`);
                    console.warn(`ExecutarDepois: A execução anterior está pendente e será executada imediatamente pois o argumento é diferente do último.`);
                    await this.ExecutarIntervalo();
                }
                if (copiaArgumentos.length !== argumentos.length)
                {
                    DebugUtil.Break("");
                }
            }

            this._ultimosArgmentos = argumentos ?? null;
            this._isExistePedencia = true;
            this._identificadorTimeout = window.setTimeout(this.ExecutarInterno.bind(this, argumentos), this._timeout);
        }

        private IsExecutarIntervaloPendente(parametros: any[])
        {
            if (this._isNaoValidarArgumentoDiferentes)
            {
                return false;
            }
            if (this._ultimosArgmentos === undefined)
                return false;

            if ((this._ultimosArgmentos?.length ?? 0) === 0 &&
                (parametros?.length ?? 0) === 0)
            {
                return false;
            }

            if ((this._ultimosArgmentos?.length ?? 0) !== (parametros?.length ?? 0))
            {
                return true;
            }
            return !Util.IsArrayIgual(this._ultimosArgmentos, parametros);
        }

        public ExecutarAgoara(...parametros: Array<any>): Promise<any>
        {
            this.CheckIsDisposed();
            return this.ExecutarInterno(parametros);
        }

        private async ExecutarIntervalo(): Promise<void>
        {
            if (this.IsExistePedencia)
            {
                await this.ExecutarInterno(this._ultimosArgmentos);
                this._ultimosArgmentos = undefined;
                this._isExistePedencia = false;
            }
        }

        private async ExecutarInterno(parametros: Array<any>): Promise<any>
        {
            try
            {
                const result = await this.Invokar(parametros);
                this._isNuncaExecutado = false;
                return result;
            }
            catch (erro)
            {
                console.error(`Falha ao executar ação em ExecutarDepois: ${erro}`);
            }


        }
        private Invokar(parametros: any[]): any
        {
            if (parametros instanceof Array)
            {
                return this._acao.apply(null, parametros);
            }
            else
            {
                return this._acao.call(null);
            }
        }

        private RetornarTotalMilesegundos(tempoOuTotalMilesegundos: number | TimeSpan): number
        {
            if (tempoOuTotalMilesegundos instanceof TimeSpan)
            {
                return tempoOuTotalMilesegundos.TotalMilliseconds;
            }
            else if (typeof tempoOuTotalMilesegundos === "number")
            {
                return tempoOuTotalMilesegundos;
            }
            else
            {
                throw new Erro("O tempo ou total de milissegundos não foi definido ou não é suportado");
            }
        }

        public Cancelar(): void
        {
            window.clearTimeout(this._identificadorTimeout);
            //window.clearInterval(this.IdentificadorIntervalo);
        }

        public async AguardarPedenciasAsync(): Promise<void>
        {
            while (this._isExistePedencia)
            {
                await ThreadUtil.EsperarAsync(50);
            }
        }
        private CheckIsDisposed(): void
        {
            if (this._isDisposed)
            {
                console.error(`ExecutarDepois já foi descartado e não pode mais ser utilizado.`);
            }
        }

        public Dispose(): void
        {
            if (this.IsExistePedencia)
            {
                const baseControleFormularioConstrutor = u.ReflexaoUtil.RetornarConstrutor(Snebur, "UI.BaseControleFormulario");
                if (baseControleFormularioConstrutor != null && !(this._acao?.BoundThis instanceof baseControleFormularioConstrutor))
                {
                    console.WarmDebug(
                        `ExecutarDepois está sendo descartado com pendências de execução.\r\n
                         Chamar o método 'AguardarPedenciasAsync' antes de descartar para evitar este problema.`);
                }
            }
            window.clearTimeout(this._identificadorTimeout);
            this._isDisposed = true;
            //window.clearInterval(this._identificadorIntervalo);
            //window.clearInterval(this.IdentificadorLimparIntervalo);
            /*delete this._acao;*/
        }
    }
}