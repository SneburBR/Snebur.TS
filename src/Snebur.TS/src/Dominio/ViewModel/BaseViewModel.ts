namespace Snebur.Dominio
{
    export abstract class BaseViewModel extends Snebur.Dominio.BaseDominio implements IDisposable
    {
        //#region Construtor

        public constructor(inicializador?: Partial<BaseViewModel>) 
        {
            super(inicializador);
            this.Inicializar();
        }
  

        public override Dispose(): void
        {
            super.Dispose();
        }
    }

  
}

 