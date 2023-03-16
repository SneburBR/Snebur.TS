namespace Snebur
{
    export class ItemEventArgs<T = any> extends EventArgs
    {

        public readonly Item: T;

        public constructor(item: T)
        {
            super();
            this.Item = item;
        }
    }

    export class ItemAlteradoEventArgs<T = any> extends EventArgs
    {
        public readonly Item: T;
        public readonly AcaoItemAlterado: EnumAcaoItemAlterado;
        public readonly Posicao: number;

        public constructor(item: T, acaoItemAlterado: EnumAcaoItemAlterado, posicao?: number)
        {
            super();
            this.Item = item;
            this.AcaoItemAlterado = acaoItemAlterado;
            this.Posicao = posicao;
        }
    }

    export class ItemDicionarioAlteradoEventArgs<T = any> extends ItemAlteradoEventArgs
    {
        public constructor(
            public readonly Chave: any,
            item: T,
            acaoItemAlterado: EnumAcaoItemAlterado,
            posicao?: number)
        {
            super(item, acaoItemAlterado, posicao);
        }
    }

    export enum EnumAcaoItemAlterado
    {
        Adicionado = 1,
        Removido = 2,
        Inserido

    }


}
