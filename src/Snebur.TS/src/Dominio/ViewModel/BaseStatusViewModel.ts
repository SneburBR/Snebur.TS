namespace Snebur
{
    export abstract class BaseStatusViewModel extends Snebur.Dominio.BaseDominio implements IDisposable
    {
        private __status: EnumStatusViewModel = EnumStatusViewModel.Novo;

        public get __Status(): EnumStatusViewModel
        {
            return this.__status;
        }

        public constructor(inicializador?: Partial<BaseViewModel>) 
        {
            super(inicializador);
            /*this.DeclararPropriedade(x => x.__Status, EnumStatusViewModel, this.StatusViewModel_Alterado);*/
            this.Inicializar();
        }

        //Inicializador das BaseDominio, é diferente não interfere nos estados da ViewModel

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        public async InicializarAsync(): Promise<void>
        {
            await ThreadUtil.BloquearAsync(this, () => this.__Status === EnumStatusViewModel.Inicializando);

            if (this.__Status !== EnumStatusViewModel.Novo)
            {
                return;
            }

            if (this.__Status === EnumStatusViewModel.Novo)
            {
                this.__status = EnumStatusViewModel.Inicializando;
                try
                {
                    await this.InicializarInternoAsync();
                    this.__status = EnumStatusViewModel.Inicializado;
                }
                catch
                {
                    LogUtil.Erro(`Falha ao inicializar o view model ${this.___NomeConstrutor}`);
                    this.__status = EnumStatusViewModel.Erro;
                }
            }
        }

        protected abstract InicializarInternoAsync(): Promise<void>

        public override Dispose(): void
        {
            this.__status = EnumStatusViewModel.Dispensado;
            super.Dispose();
        }
    }

    export enum EnumStatusViewModel
    {
        Novo = 1,
        Inicializando = 2,
        Inicializado = 3,
        Dispensado = 5,
        Erro = 99,
    }
}
