namespace Snebur
{
    export class GerenciadorRequisicaoUtil
    {
        public static get Instancia(): c.GerenciadorRequiscao
        {
            return Snebur.Comunicacao.GerenciadorRequiscao.Instancia;
        }

        public static get IsExisteRequisicoesAtivas(): boolean
        {
            return Snebur.Comunicacao.GerenciadorRequiscao.Instancia.IsExisteRequisicoesAtivas;
        }

        public static get TotalRequisicoesFila():number
        {
            return Snebur.Comunicacao.GerenciadorRequiscao.Instancia.TotalRequisicoesFila;
        }

        public get IsExisteFalhaRequisicao(): boolean
        {
            return GerenciadorRequisicaoUtil.Instancia.IsExisteFalhaRequisicao;
        }

        public static ExecutarAsync(requisicao: c.Requisicao): Promise<any>
        {
            return GerenciadorRequisicaoUtil.Instancia.ExecutarAsync(requisicao);
        }

        public static SetIsExiteFalhaRequisicao(isFalha:boolean  ): void
        {
            GerenciadorRequisicaoUtil.Instancia.SetIsExiteFalhaRequisicao(isFalha);
        }

        public static async AguardarFilaRequisicoesAsync(progressHandler?: (e: ProgressoEventArgs) => void): Promise<void>
        {
            return GerenciadorRequisicaoUtil.Instancia.AguardarFilaRequisicoesAsync(progressHandler);
        }

        
    }
}
