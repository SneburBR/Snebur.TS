namespace Snebur.Dominio
{
    export class SistemaOperacional extends Snebur.Dominio.BaseTipoComplexo implements Snebur.Dominio.ICaminhoTipo 
    {
        //#region Propriedades

        private _sistemaOperacionalEnum: Snebur.Dominio.EnumSistemaOperacional = 0;
        private _nome: string = null;
        private _codenome: string = null;
        private _versao: string = null;

        public get SistemaOperacionalEnum(): Snebur.Dominio.EnumSistemaOperacional 
        {
            return this._sistemaOperacionalEnum;
        }

        public set SistemaOperacionalEnum(value: Snebur.Dominio.EnumSistemaOperacional)  
        {
            const antigoValor = this._sistemaOperacionalEnum;
            this._sistemaOperacionalEnum = value;
            this.NotificarPropriedadeAlterada("SistemaOperacionalEnum", antigoValor, value);
        }

        public get Nome(): string 
        {
            return this._nome;
        }

        public set Nome(value: string)  
        {
            const antigoValor = this._nome;
            this._nome = value;
            this.NotificarPropriedadeAlterada("Nome", antigoValor, value);
        }

        public get Codenome(): string 
        {
            return this._codenome;
        }

        public set Codenome(value: string)  
        {
            const antigoValor = this._codenome;
            this._codenome = value;
            this.NotificarPropriedadeAlterada("Codenome", antigoValor, value);
        }

        public get Versao(): string 
        {
            return this._versao;
        }

        public set Versao(value: string)  
        {
            const antigoValor = this._versao;
            this._versao = value;
            this.NotificarPropriedadeAlterada("Versao", antigoValor, value);
        }

        public get VersaoPrincipal(): number
        {
            const posicao = this._versao.indexOf(".");
            if (posicao > 0)
            {
                return ConverterUtil.ParaInteiro(this._versao.substring(0, posicao));
            }
            return ConverterUtil.ParaInteiro(this._versao);

        }

        public get Descricao(): string
        {
            if (String.IsNullOrWhiteSpace(this.Codenome))
            {
                return this.Nome + " " + this.Versao;
            }
            return this.Nome + " (" + this.Codenome + ") " + this.VersaoPrincipal;
        }

        //#endregion

        //#region Construtor



        public constructor()
        public constructor(sistemaOpercionalEnum: d.EnumSistemaOperacional, nome: string, codeNome: string, versao: string)
        public constructor(sistemaOpercionalEnum: d.EnumSistemaOperacional = d.EnumSistemaOperacional.Desconhecido,
            nome: string = null, codeNome: string = null, versao: string = null) 
        {
            super();

            this._sistemaOperacionalEnum = sistemaOpercionalEnum;
            this._nome = nome;
            this._codenome = codeNome;
            this._versao = versao;
        }
        //#endregion

        public Clone(): SistemaOperacional
        {
            return new SistemaOperacional(this.SistemaOperacionalEnum, this.Nome, this.Codenome, this.Versao);
        }

        public Equals(sistemaOperacional: SistemaOperacional): boolean
        {
            if (sistemaOperacional instanceof SistemaOperacional)
            {
                return this.SistemaOperacionalEnum === sistemaOperacional.SistemaOperacionalEnum;
            }
            return false;
        }
    }
}