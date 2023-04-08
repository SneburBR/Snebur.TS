namespace Snebur
{
    export class LazyValue<T = any>
    {
        private _value: T;
        private _isValorAtribuido: boolean = false;

        public get Value(): T
        {
            if (!this._isValorAtribuido)
            {
                this._value = this.ObjBind != null ?
                    this.FuncRetornarValor.bind(this.ObjBind)() :
                    this.FuncRetornarValor();

                this._isValorAtribuido = true;
            }
            return this._value;
        }

        public constructor(
            private readonly FuncRetornarValor: () => T,
            private readonly ObjBind?: any)
        {

        }
    }
}
