
//namespace Snebur.UI
//{
//    export class MaterialDesignerUtil
//    {

//        private readonly ExecutarDepois = new ExecutarDepois(this.Atualizar_Depois.bind(this), 300);

//        private constructor()
//        {

//        }

//        private Atualizar(): void
//        {
//            this.ExecutarDepois.Executar();
//        }
//        private Atualizar_Depois()
//        {
//            componentHandler.upgradeAllRegistered();
            
//        }

//        //#region Static 


//        private static _instancia: MaterialDesignerUtil;


//        private static get Instancia(): MaterialDesignerUtil
//        {
//            if (!MaterialDesignerUtil._instancia)
//            {
//                MaterialDesignerUtil._instancia = new MaterialDesignerUtil();
//            }
//            return MaterialDesignerUtil._instancia;
//        }

//        public static AtualizarComponentes(): void
//        {
//            if ($Configuracao.ModeloLayout == EnumModeloLayout.MaterialDesigner)
//            {
//                MaterialDesignerUtil.Instancia.Atualizar();
//            }
//        }

//        //#endregion
//    }
//}