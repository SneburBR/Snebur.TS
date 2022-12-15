namespace Snebur.Reflexao
{
    export class Propriedade
    {
        private _isSomenteLeitura: boolean;
        private _isChaveEstrangeira: boolean;
        private _propriedadeRelacaoChaveEstrangeira: r.Propriedade;

        public Nome: string;

        public AceitaNulo: boolean;

        public Tipo: BaseTipo;

        public TipoDeclarado: BaseTipo;

        public readonly Atributos: Array<Snebur.Dominio.Atributos.BaseAtributoDominio>;

        public get IsTipoString(): boolean
        {
            return (this.Tipo instanceof r.TipoPrimario) &&
                this.Tipo.TipoPrimarioEnum === EnumTipoPrimario.String;
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

        public constructor(nome: string, tipo: BaseTipo, tipoDeclarado: BaseTipo, aceitaNulo: boolean)
        {
            this.Nome = nome;
            this.Tipo = tipo;
            this.TipoDeclarado = tipoDeclarado;
            this.AceitaNulo = aceitaNulo;

            this.Atributos = new Array<Snebur.Dominio.Atributos.BaseAtributoDominio>();
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

        public toString(): string
        {
            return "Propriedade - " + this.TipoDeclarado.Nome + "- " + this.Nome;
        }
    }
}