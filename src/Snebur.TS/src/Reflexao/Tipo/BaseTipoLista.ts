namespace Snebur.Reflexao
{
    export abstract class BaseTipoLista extends BaseTipo
    {
        public get TipoItemLista(): Snebur.Reflexao.BaseTipo
        {
            return this.RetornarTipoItemLista();
        }

        public constructor(nome: string, _namespace: string, assemblyQualifiedName: string)
        {
            super(nome, _namespace, assemblyQualifiedName, null, false);
            if (__$tipoTipoPrimario_Integer != null)
            {
                this.Propriedades.Add(new Propriedade("Count", __$tipoTipoPrimario_Integer, null, false));
            }
        }


        public abstract RetornarTipoItemLista(): BaseTipo;
    }
}