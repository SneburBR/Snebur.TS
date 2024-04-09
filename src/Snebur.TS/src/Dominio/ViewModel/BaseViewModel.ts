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
            setTimeout(this.__InicializarInternoAsync__.bind(this), 0);
        }

        private async __InicializarInternoAsync__()
        {
            this.Inicializar();
            this.__PropriedadesAlteradas.Clear();
        }
         
        public override Dispose(): void
        {
            super.Dispose();
        }
    }
}

