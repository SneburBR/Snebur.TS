namespace Snebur.Comunicacao
{
    export class BaseResultadoChamadaErroCliente extends ResultadoChamadaErro
    {
        public readonly Requisicao: BaseRequisicao;

        public constructor(requisicao: BaseRequisicao, init: Partial<ResultadoChamadaErroCliente>)
        {
            super(init);
            this.Requisicao = requisicao;
        }

    }
    export class ResultadoChamadaErroCliente extends BaseResultadoChamadaErroCliente
    {
        public constructor(requisicao: BaseRequisicao, init?: Partial<ResultadoChamadaErroCliente>)
        {
            super(requisicao,init);
        }
    }

    export class ResultadoChamadaTimeoutCliente extends BaseResultadoChamadaErroCliente
    {
        public constructor(requisicao: BaseRequisicao, init?: Partial<ResultadoChamadaTimeoutCliente>)
        {
            super(requisicao, init);
        }
    }
}
