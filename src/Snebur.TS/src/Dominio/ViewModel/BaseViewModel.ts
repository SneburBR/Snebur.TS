namespace Snebur.Dominio
{
    export abstract class BaseViewModel extends Snebur.Dominio.BaseDominio implements IDisposable
    {
        //#region Construtor

        public override get __IsMontarValorAntigoInicial(): boolean
        {
            return true;
        }

        public constructor(inicializador?: Partial<BaseViewModel>) 
        {
            super(inicializador);
            this.Inicializar();
            setTimeout(this.__InicializarInternoAsync__.bind(this), 0);
        }

        protected override Inicializar(isDepensar?: boolean): void
        {
            if (this.__InicializarPropriedades !== undefined)
            {
                this.__MapearPropriedades(this.__InicializarPropriedades, true);
                if (isDispensar)
                {
                    delete this.__InicializarPropriedades;
                }
            }
        }

        protected async __InicializarInternoAsync__()
        {
            this.Inicializar(false);
            this.__PropriedadesAlteradas.Clear();
        }

        public override Dispose(): void
        {
            super.Dispose();
        }
    }
}

