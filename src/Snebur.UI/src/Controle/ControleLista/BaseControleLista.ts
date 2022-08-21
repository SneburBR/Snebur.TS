//namespace Snebur.UI
//{
//    export abstract class BaseControleLista extends BaseControleLista<any>
//    {

//        protected Cabecalho: Cabecalho;
//        protected Rodape: Rodape;

//        public constructor(controlePai: BaseControle, elemento: HTMLElement)
//        {
//            super(controlePai, elemento);
//        }

//        protected override Inicializar(): void
//        {
//            super.Inicializar();

//            this.Cabecalho = this.ControlesFilho.OfType<Cabecalho>(Cabecalho).SingleOrDefault();
//            this.Rodape = this.ControlesFilho.OfType<Rodape>(Rodape).SingleOrDefault();
//        }
//    }
//}