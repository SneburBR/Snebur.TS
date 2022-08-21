namespace Snebur.Reflexao
{
    export class PropriedadeRelacao extends Propriedade
    {
        public Relacao: Relacao;

        public constructor(nome: string, tipo: BaseTipo, tipoDeclarado: BaseTipo, aceitaNulo: boolean)
        {
            super(nome, tipo, tipoDeclarado, aceitaNulo);
        }
    }
}