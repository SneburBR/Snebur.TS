namespace Snebur.Reflexao
{
    export class PropriedadeRelacao extends Propriedade
    {
        public readonly Relacao: Relacao;

        public constructor(
            nome: string,
            tipo: BaseTipo,
            tipoDeclarado: BaseTipo,
            isNullable: boolean)
        {
            super(nome, tipo, tipoDeclarado, isNullable, false);
        }
    }
}