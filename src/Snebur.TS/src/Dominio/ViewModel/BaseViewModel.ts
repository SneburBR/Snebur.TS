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
            this.__PropriedadesAlteradas.Clear();
        }
  

        public override Dispose(): void
        {
            super.Dispose();
        }
    }

  
}

 