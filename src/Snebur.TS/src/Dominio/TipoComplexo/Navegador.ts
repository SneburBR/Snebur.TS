namespace Snebur.Dominio
{
    export class Navegador extends Snebur.Dominio.BaseTipoComplexo implements Snebur.Dominio.ICaminhoTipo 
    {
        //#region Propriedades

        private _navegadorEnum: Snebur.Dominio.EnumNavegador = 0;
        private _nome: string = null;
        private _codenome: string = null;
        private _versao: string = null;

        public get NavegadorEnum(): Snebur.Dominio.EnumNavegador 
        {
            return this._navegadorEnum;
        }

        public set NavegadorEnum(value: Snebur.Dominio.EnumNavegador)  
        {
            const antigoValor = this._navegadorEnum;
            this._navegadorEnum = value;
            this.NotificarPropriedadeAlterada("NavegadorEnum", antigoValor, value);
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

        public get IsInternetExplorer(): boolean
        {
            return this.NavegadorEnum === d.EnumNavegador.InternetExplorer;
        }

        public get IsSuporteWebKit(): boolean
        {
            return this.NavegadorEnum === d.EnumNavegador.Chrome ||
                this.NavegadorEnum === d.EnumNavegador.Safari ||
                this.NavegadorEnum === d.EnumNavegador.Opera;
        }

        //#endregion

        //#region Construtor

        public constructor()
        public constructor(navegadorEnum: d.EnumNavegador, nome: string, codeNome: string, versao: string)
        public constructor(navegadorEnum: d.EnumNavegador = d.EnumNavegador.Desconhecido,
            nome: string = null, codeNome: string = null, versao: string = null) 
        {
            super();

            this._navegadorEnum = navegadorEnum;
            this._nome = nome;
            this._codenome = codeNome;
            this._versao = versao;
        }
        //#endregion

        public Clone(): Navegador
        {
            return new Navegador(this.NavegadorEnum, this.Nome, this.Codenome, this.Versao);
        }

        public Equals(navegador: Navegador): boolean
        {
            if (navegador instanceof Navegador)
            {
                return this.NavegadorEnum === navegador.NavegadorEnum;
            }
            return false;
        }
    }
}
