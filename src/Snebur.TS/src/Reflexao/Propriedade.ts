namespace Snebur.Reflexao
{
    export class Propriedade
    {
        private readonly _atributos = new Array<at.BaseAtributoDominio>();
        private _isSomenteLeitura: boolean;
        private _isChaveEstrangeira: boolean;
        private _propriedadeRelacaoChaveEstrangeira: r.Propriedade;

        public readonly Nome: string;
        public readonly IsNullable: boolean;
        public readonly IsPrimaryKey: boolean;
        public readonly Tipo: BaseTipo;
        public readonly TipoDeclarado: BaseTipo;

        public get Atributos(): ReadonlyArray<at.BaseAtributoDominio>
        {
            return this._atributos;
        }

        public get IsTipoString(): boolean
        {
            return (this.Tipo instanceof r.TipoPrimario) &&
                this.Tipo.TipoPrimarioEnum === EnumTipoPrimario.String;
        }

        public get IsTipoPrimario(): boolean
        {
            return (this.Tipo instanceof r.TipoPrimario);
        }

        public get IsSomenteLeitura(): boolean
        {
            if (typeof this._isSomenteLeitura === "undefined")
            {
                this._isSomenteLeitura = this.Atributos.OfType<at.SomenteLeituraAttribute>(at.SomenteLeituraAttribute).Count > 0;
            }
            return this._isSomenteLeitura;
        }

        public get IsIdentificadorProprietario(): boolean
        {
            return this.Atributos.OfType<d.Atributos.PropriedadeIdentificadorProprietarioAttribute>(d.Atributos.PropriedadeIdentificadorProprietarioAttribute).Count > 0;
        }

        public constructor(
            nome: string,
            tipo: BaseTipo,
            tipoDeclarado: BaseTipo,
            isNullable: boolean,
            isPrimaryKey: boolean)
        {
            this.Nome = nome;
            this.Tipo = tipo;
            this.TipoDeclarado = tipoDeclarado;
            this.IsNullable = isNullable;
            this.IsPrimaryKey = isPrimaryKey;
        }

        public RetornarValor(objeto: any)
        {
            //u.ReflexaoUtil.RetornarValorPropriedade(objeto, this);
            return objeto[this.Nome];

        }

        public AtribuirValor(objeto: any, novoValor: any): void
        {
            //u.ReflexaoUtil.AtribuirValorPropriedade(objeto, this, novoValor);
            objeto[this.Nome] = novoValor;
        }

        public AdicionarAtributo(attributo: at.BaseAtributoDominio)
        {
            this._atributos.Add(attributo);
        }

        public AdicionarAtributos(attributos: at.BaseAtributoDominio[])
        {
            this._atributos.AddRange(attributos);
        }

        public toString(): string
        {
            return "Propriedade - " + this.TipoDeclarado.Nome + "- " + this.Nome;
        }
    }
}