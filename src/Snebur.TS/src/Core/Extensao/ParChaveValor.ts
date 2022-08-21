
namespace Snebur
{
    export abstract class BaseParChaveValorSimples<TChave, TValor>
    {
        public Chave: TChave;
        public Valor: TValor;

        public constructor(chave: TChave, valor: TValor)
        {
            this.Chave = chave;
            this.Valor = valor;
        }
    }

    export class ParChaveValorSimples<TValor> extends BaseParChaveValorSimples<string, TValor>
    {
        public constructor(chave: string, valor: TValor)
        {
            super(chave, valor);
        }
    }

    export class ParChaveValorTipada<TChave, TValor> extends BaseParChaveValorSimples<TChave, TValor>
    {
        public constructor(chave: TChave, valor: TValor)
        {
            super(chave, valor);
        }
    }


}