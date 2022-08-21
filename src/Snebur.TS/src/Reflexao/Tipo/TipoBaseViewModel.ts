namespace Snebur.Reflexao
{

    //tipo baseview model interno
    export class TipoBaseViewModel extends BaseTipo
    {
        public constructor(nome: string, _namespace: string, caminhoTipoBase: string, isAbstrato: boolean)
        {
            super(nome, _namespace, null, caminhoTipoBase, isAbstrato);
        }
    }
}