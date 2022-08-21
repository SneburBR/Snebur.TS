interface Object extends Snebur.Nativo.IObject
{

}

interface ObjectConstructor extends Snebur.Nativo.IObjectConstructor
{
    keysBase: (obj: object) => string[];
}

namespace Snebur.Nativo
{
    export interface IObject<TTipo extends Snebur.Reflexao.BaseTipo = Snebur.Reflexao.BaseTipo> extends ITipo<TTipo>, ICaminhoTipo, IEquals
    {
         
    }

    export interface IObjectConstructor extends ITipo<Snebur.Reflexao.BaseTipo>, ICaminhoTipo
    {
        assign(target: any, ...sources: any[]): void;
     }
}