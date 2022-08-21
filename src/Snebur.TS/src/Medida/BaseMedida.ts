namespace Snebur
{
    export abstract class BaseMedida  
    {
        public DpiVisualizacao: number;
        
        public constructor(dpiVisualizacao : number)
        {
            this.DpiVisualizacao = dpiVisualizacao;
        }
    }
}