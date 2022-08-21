
interface Boolean extends Snebur.Nativo.IBoolean
{

}

interface BooleanConstructor extends Snebur.Nativo.IBooleanConstructor
{
}

namespace Snebur.Nativo
{
    export interface IBoolean extends IObject<Snebur.Reflexao.TipoPrimario>
    {
        Formatar(formado: EnumFormatacao): string;
        ToString(args?: any): string;
        ToString(formacao: EnumFormatacao): string;
    }

    export interface IBooleanConstructor extends ITipo<Snebur.Reflexao.TipoPrimario>, ICaminhoTipo, IParse<boolean>
    {
    }
}
