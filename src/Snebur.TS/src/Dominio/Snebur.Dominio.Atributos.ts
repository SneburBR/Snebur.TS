/*eslint-disable*/
//@Namespace: Snebur.Dominio
//@PrioridadeDominio: 0
//@Globalizar: False
//@Dominios dependentes: []

namespace Snebur.Dominio.Atributos
{
    export abstract class BaseValidacaoEntidadeAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<BaseValidacaoEntidadeAttribute>) 
        {
            super(inicializador);
        }
        //#endregion
    }
    export class ChaveEstrangeiraExternaAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio implements Snebur.Dominio.Atributos.IChaveEstrangeiraAttribute 
    {
        //#region Propriedades
    
        private _nomePropriedade : string = null;
        private _name : string = null;
    
        public get NomePropriedade(): string 
        {
            return this._nomePropriedade;
        }

        public set NomePropriedade(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
    
        public get Name(): string 
        {
            return this._name;
        }

        public set Name(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Name", this._name, this._name = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( nomePropriedade : string ) 
        {
            super();
            this.Inicializar();
            this._nomePropriedade = nomePropriedade;
        }
        //#endregion
    }
    export class ChaveEstrangeiraRelacaoUmUmAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio implements Snebur.Dominio.Atributos.IChaveEstrangeiraAttribute 
    {
        //#region Propriedades
    
        private _nomePropriedade : string = null;
        private _name : string = null;
    
        public get NomePropriedade(): string 
        {
            return this._nomePropriedade;
        }

        public set NomePropriedade(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
    
        public get Name(): string 
        {
            return this._name;
        }

        public set Name(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Name", this._name, this._name = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( nomePropriedade : string ) 
        {
            super();
            this.Inicializar();
            this._nomePropriedade = nomePropriedade;
        }
        //#endregion
    }
    export class ChavePrimariaAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<ChavePrimariaAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class IgnorarValidacaoTipoComplexo extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<IgnorarValidacaoTipoComplexo>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class NotificarAlteracaoPropriedadeAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Propriedades
    
        private _tipoEntidadeAlteracaoPropriedade : r.BaseTipo | string = null;
        private _nomePropriedadeAlterada : string = null;
        private _nomePropriedadeRelacao : string = null;
        private _propriedadeRelacao : r.Propriedade | string = null;
        private _propriedadeValorAlterado : r.Propriedade | string = null;
        private _propriedadeValorAntigo : r.Propriedade | string = null;
        private _opcoes : Snebur.Dominio.EnumOpcoesAlterarPropriedade = 0;
    
        public get TipoEntidadeAlteracaoPropriedade(): r.BaseTipo | string 
        {
            return this._tipoEntidadeAlteracaoPropriedade;
        }

        public set TipoEntidadeAlteracaoPropriedade(value: r.BaseTipo | string) 
        {
            this.NotificarValorPropriedadeAlterada("TipoEntidadeAlteracaoPropriedade", this._tipoEntidadeAlteracaoPropriedade, this._tipoEntidadeAlteracaoPropriedade = value);
        }
    
        public get NomePropriedadeAlterada(): string 
        {
            return this._nomePropriedadeAlterada;
        }

        public set NomePropriedadeAlterada(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedadeAlterada", this._nomePropriedadeAlterada, this._nomePropriedadeAlterada = value);
        }
    
        public get NomePropriedadeRelacao(): string 
        {
            return this._nomePropriedadeRelacao;
        }

        public set NomePropriedadeRelacao(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedadeRelacao", this._nomePropriedadeRelacao, this._nomePropriedadeRelacao = value);
        }
    
        public get PropriedadeRelacao(): r.Propriedade | string 
        {
            return this._propriedadeRelacao;
        }

        public set PropriedadeRelacao(value: r.Propriedade | string) 
        {
            this.NotificarValorPropriedadeAlterada("PropriedadeRelacao", this._propriedadeRelacao, this._propriedadeRelacao = value);
        }
    
        public get PropriedadeValorAlterado(): r.Propriedade | string 
        {
            return this._propriedadeValorAlterado;
        }

        public set PropriedadeValorAlterado(value: r.Propriedade | string) 
        {
            this.NotificarValorPropriedadeAlterada("PropriedadeValorAlterado", this._propriedadeValorAlterado, this._propriedadeValorAlterado = value);
        }
    
        public get PropriedadeValorAntigo(): r.Propriedade | string 
        {
            return this._propriedadeValorAntigo;
        }

        public set PropriedadeValorAntigo(value: r.Propriedade | string) 
        {
            this.NotificarValorPropriedadeAlterada("PropriedadeValorAntigo", this._propriedadeValorAntigo, this._propriedadeValorAntigo = value);
        }
    
        public get Opcoes(): Snebur.Dominio.EnumOpcoesAlterarPropriedade 
        {
            return this._opcoes;
        }

        public set Opcoes(value: Snebur.Dominio.EnumOpcoesAlterarPropriedade) 
        {
            this.NotificarValorPropriedadeAlterada("Opcoes", this._opcoes, this._opcoes = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( tipoEntidadeAlteracaoPropriedade : r.BaseTipo | string ,  nomePropriedadeRelacao : string ,  nomePropriedadeAlterada : string ,  opcoes : Snebur.Dominio.EnumOpcoesAlterarPropriedade ) 
        {
            super();
            this.Inicializar();
            this._tipoEntidadeAlteracaoPropriedade = tipoEntidadeAlteracaoPropriedade;
            this._nomePropriedadeRelacao = nomePropriedadeRelacao;
            this._nomePropriedadeAlterada = nomePropriedadeAlterada;
            this._opcoes = opcoes;
        }
        //#endregion
    }
    export class NotificarAlteracaoPropriedadeGenericaAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Propriedades
    
        private _opcoes : Snebur.Dominio.EnumOpcoesAlterarPropriedade = 0;
        private _formatacao : string = null;
        private _tipoPropriedadeRelacao : r.BaseTipo | string = null;
        private _caminhoTipoPropriedadeRelacao : string = null;
        private _isEnum : boolean = false;
    
        public get Opcoes(): Snebur.Dominio.EnumOpcoesAlterarPropriedade 
        {
            return this._opcoes;
        }

        public set Opcoes(value: Snebur.Dominio.EnumOpcoesAlterarPropriedade) 
        {
            this.NotificarValorPropriedadeAlterada("Opcoes", this._opcoes, this._opcoes = value);
        }
    
        public get Formatacao(): string 
        {
            return this._formatacao;
        }

        public set Formatacao(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Formatacao", this._formatacao, this._formatacao = value);
        }
    
        public get TipoPropriedadeRelacao(): r.BaseTipo | string 
        {
            return this._tipoPropriedadeRelacao;
        }

        public set TipoPropriedadeRelacao(value: r.BaseTipo | string) 
        {
            this.NotificarValorPropriedadeAlterada("TipoPropriedadeRelacao", this._tipoPropriedadeRelacao, this._tipoPropriedadeRelacao = value);
        }
    
        public get CaminhoTipoPropriedadeRelacao(): string 
        {
            return this._caminhoTipoPropriedadeRelacao;
        }

        public set CaminhoTipoPropriedadeRelacao(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("CaminhoTipoPropriedadeRelacao", this._caminhoTipoPropriedadeRelacao, this._caminhoTipoPropriedadeRelacao = value);
        }
    
        public get IsEnum(): boolean 
        {
            return this._isEnum;
        }

        public set IsEnum(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsEnum", this._isEnum, this._isEnum = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( formatacao : string ,  tipoPropriedadeRelacao : r.BaseTipo | string ,  caminhoTipoPropriedadeRelacao : string ,  opcoes : Snebur.Dominio.EnumOpcoesAlterarPropriedade ) 
        {
            super();
            this.Inicializar();
            this._formatacao = formatacao;
            this._tipoPropriedadeRelacao = tipoPropriedadeRelacao;
            this._caminhoTipoPropriedadeRelacao = caminhoTipoPropriedadeRelacao;
            this._opcoes = opcoes;
        }
        //#endregion
    }
    export class NotificarTodasAlteracoesPropriedadeGenericaAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Propriedades
    
        private _opcoes : Snebur.Dominio.EnumOpcoesAlterarPropriedade = 0;
    
        public get Opcoes(): Snebur.Dominio.EnumOpcoesAlterarPropriedade 
        {
            return this._opcoes;
        }

        public set Opcoes(value: Snebur.Dominio.EnumOpcoesAlterarPropriedade) 
        {
            this.NotificarValorPropriedadeAlterada("Opcoes", this._opcoes, this._opcoes = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<NotificarTodasAlteracoesPropriedadeGenericaAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export abstract class BasePropriedadeComputadaAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<BasePropriedadeComputadaAttribute>) 
        {
            super(inicializador);
        }
        //#endregion
    }
    export class PropriedadeComputadaBancoAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<PropriedadeComputadaBancoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class SomenteLeituraAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<SomenteLeituraAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class PropriedadeDescricaoAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Propriedades
    
        private _nomePropriedade : string = null;
    
        public get NomePropriedade(): string 
        {
            return this._nomePropriedade;
        }

        public set NomePropriedade(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( nomePropriedade : string ) 
        {
            super();
            this.Inicializar();
            this._nomePropriedade = nomePropriedade;
        }
        //#endregion
    }
    export class PropriedadeIdentificadorProprietarioAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio implements Snebur.Dominio.Atributos.IBaseValorPadrao 
    {
        //#region Propriedades
    
        private _isTipoNullableRequerido : boolean = false;
        private _isValorPadraoOnUpdate : boolean = false;
        private _isPermitirValorGlboal : boolean = false;
        private _valorGlobal : string = null;
    
        public get IsTipoNullableRequerido(): boolean 
        {
            return this._isTipoNullableRequerido;
        }

        public set IsTipoNullableRequerido(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsTipoNullableRequerido", this._isTipoNullableRequerido, this._isTipoNullableRequerido = value);
        }
    
        public get IsValorPadraoOnUpdate(): boolean 
        {
            return this._isValorPadraoOnUpdate;
        }

        public set IsValorPadraoOnUpdate(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsValorPadraoOnUpdate", this._isValorPadraoOnUpdate, this._isValorPadraoOnUpdate = value);
        }
    
        public get IsPermitirValorGlboal(): boolean 
        {
            return this._isPermitirValorGlboal;
        }

        public set IsPermitirValorGlboal(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsPermitirValorGlboal", this._isPermitirValorGlboal, this._isPermitirValorGlboal = value);
        }
    
        public get ValorGlobal(): string 
        {
            return this._valorGlobal;
        }

        public set ValorGlobal(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("ValorGlobal", this._valorGlobal, this._valorGlobal = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<PropriedadeIdentificadorProprietarioAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class RotuloAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Propriedades
    
        private _rotulo : string = null;
        private _rotuloPlural : string = null;
    
        public get Rotulo(): string 
        {
            return this._rotulo;
        }

        public set Rotulo(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Rotulo", this._rotulo, this._rotulo = value);
        }
    
        public get RotuloPlural(): string 
        {
            return this._rotuloPlural;
        }

        public set RotuloPlural(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("RotuloPlural", this._rotuloPlural, this._rotuloPlural = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( rotulo : string ,  rotuloPlural? : string ) 
        {
            super();
            this.Inicializar();
            this._rotulo = rotulo;
            this._rotuloPlural = rotuloPlural;
        }
        //#endregion
    }
    export class EnumTSString extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<EnumTSString>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class PropriedadeTSEspecializadaAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Propriedades
    
        private _nomePropriedade : string = null;
    
        public get NomePropriedade(): string 
        {
            return this._nomePropriedade;
        }

        public set NomePropriedade(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( nomePropriedade : string ) 
        {
            super();
            this.Inicializar();
            this._nomePropriedade = nomePropriedade;
        }
        //#endregion
    }
    export class ValorEnumStringAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Propriedades
    
        private _valor : string = null;
    
        public get Valor(): string 
        {
            return this._valor;
        }

        public set Valor(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("Valor", this._valor, this._valor = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( valor : string ) 
        {
            super();
            this.Inicializar();
            this._valor = valor;
        }
        //#endregion
    }
    export class BaseRelacaoAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<BaseRelacaoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValorPadraoDataHoraServidorAttribute extends Snebur.Dominio.Atributos.SomenteLeituraAttribute implements Snebur.Dominio.Atributos.IBaseValorPadrao 
    {
        //#region Propriedades
    
        private _isDataHoraUTC : boolean = false;
        private _isAceitarAtualizacao : boolean = false;
        private _isValorPadraoOnUpdate : boolean = false;
        private _isTipoNullableRequerido : boolean = false;
    
        public get IsDataHoraUTC(): boolean 
        {
            return this._isDataHoraUTC;
        }

        public set IsDataHoraUTC(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsDataHoraUTC", this._isDataHoraUTC, this._isDataHoraUTC = value);
        }
    
        public get IsAceitarAtualizacao(): boolean 
        {
            return this._isAceitarAtualizacao;
        }

        public set IsAceitarAtualizacao(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsAceitarAtualizacao", this._isAceitarAtualizacao, this._isAceitarAtualizacao = value);
        }
    
        public get IsValorPadraoOnUpdate(): boolean 
        {
            return this._isValorPadraoOnUpdate;
        }

        public set IsValorPadraoOnUpdate(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsValorPadraoOnUpdate", this._isValorPadraoOnUpdate, this._isValorPadraoOnUpdate = value);
        }
    
        public get IsTipoNullableRequerido(): boolean 
        {
            return this._isTipoNullableRequerido;
        }

        public set IsTipoNullableRequerido(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsTipoNullableRequerido", this._isTipoNullableRequerido, this._isTipoNullableRequerido = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class ValorPadraoIPAttribute extends Snebur.Dominio.Atributos.SomenteLeituraAttribute implements Snebur.Dominio.Atributos.IBaseValorPadrao 
    {
        //#region Propriedades
    
        private _isValorPadraoOnUpdate : boolean = false;
        private _isTipoNullableRequerido : boolean = false;
    
        public get IsValorPadraoOnUpdate(): boolean 
        {
            return this._isValorPadraoOnUpdate;
        }

        public set IsValorPadraoOnUpdate(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsValorPadraoOnUpdate", this._isValorPadraoOnUpdate, this._isValorPadraoOnUpdate = value);
        }
    
        public get IsTipoNullableRequerido(): boolean 
        {
            return this._isTipoNullableRequerido;
        }

        public set IsTipoNullableRequerido(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsTipoNullableRequerido", this._isTipoNullableRequerido, this._isTipoNullableRequerido = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export abstract class RelacaoChaveEstrangeiraAttribute extends Snebur.Dominio.Atributos.BaseRelacaoAttribute
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<RelacaoChaveEstrangeiraAttribute>) 
        {
            super(inicializador);
        }
        //#endregion
    }
    export class RelacaoFilhosAttribute extends Snebur.Dominio.Atributos.BaseRelacaoAttribute
    {
        //#region Propriedades
    
        private _nomePropriedadeChaveEstrangeira : string = null;
    
        public get NomePropriedadeChaveEstrangeira(): string 
        {
            return this._nomePropriedadeChaveEstrangeira;
        }

        public set NomePropriedadeChaveEstrangeira(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedadeChaveEstrangeira", this._nomePropriedadeChaveEstrangeira, this._nomePropriedadeChaveEstrangeira = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( nomePropriedadeChaveEstrangeira : string ) 
        {
            super();
            this._nomePropriedadeChaveEstrangeira = nomePropriedadeChaveEstrangeira;
        }
        //#endregion
    }
    export class RelacaoNnAttribute extends Snebur.Dominio.Atributos.BaseRelacaoAttribute
    {
        //#region Propriedades
    
        private _nomeTipoEntidadeRelacao : string = null;
    
        public get NomeTipoEntidadeRelacao(): string 
        {
            return this._nomeTipoEntidadeRelacao;
        }

        public set NomeTipoEntidadeRelacao(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomeTipoEntidadeRelacao", this._nomeTipoEntidadeRelacao, this._nomeTipoEntidadeRelacao = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( nomeTipoEntidadeRelacao : string ) 
        {
            super();
            this._nomeTipoEntidadeRelacao = nomeTipoEntidadeRelacao;
        }
        //#endregion
    }
    export class RelacaoUmUmReversaAttribute extends Snebur.Dominio.Atributos.BaseRelacaoAttribute
    {
        //#region Propriedades
    
        private _nomePropriedadeChaveEstrangeiraReversa : string = null;
    
        public get NomePropriedadeChaveEstrangeiraReversa(): string 
        {
            return this._nomePropriedadeChaveEstrangeiraReversa;
        }

        public set NomePropriedadeChaveEstrangeiraReversa(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedadeChaveEstrangeiraReversa", this._nomePropriedadeChaveEstrangeiraReversa, this._nomePropriedadeChaveEstrangeiraReversa = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( nomePropriedadeChaveEstrangeiraReversa : string ) 
        {
            super();
            this._nomePropriedadeChaveEstrangeiraReversa = nomePropriedadeChaveEstrangeiraReversa;
        }
        //#endregion
    }
    export class RelacaoPaiAttribute extends Snebur.Dominio.Atributos.RelacaoChaveEstrangeiraAttribute implements Snebur.Dominio.Atributos.IIgnorarAlerta 
    {
        //#region Propriedades
    
        private _ignorarAlerta : boolean = false;
        private _tipoExclusao : Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao = 0;
    
        public get IgnorarAlerta(): boolean 
        {
            return this._ignorarAlerta;
        }

        public set IgnorarAlerta(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IgnorarAlerta", this._ignorarAlerta, this._ignorarAlerta = value);
        }
    
        public get TipoExclusao(): Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao 
        {
            return this._tipoExclusao;
        }

        public set TipoExclusao(value: Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao) 
        {
            this.NotificarValorPropriedadeAlterada("TipoExclusao", this._tipoExclusao, this._tipoExclusao = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( tipoExclusao : Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao ) 
        {
            super();
            this.Inicializar();
            this._tipoExclusao = tipoExclusao;
        }
        //#endregion
    }
    export class RelacaoUmUmAttribute extends Snebur.Dominio.Atributos.RelacaoChaveEstrangeiraAttribute implements Snebur.Dominio.Atributos.IIgnorarAlerta 
    {
        //#region Propriedades
    
        private _ignorarAlerta : boolean = false;
        private _tipoExclusao : Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao = 0;
    
        public get IgnorarAlerta(): boolean 
        {
            return this._ignorarAlerta;
        }

        public set IgnorarAlerta(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IgnorarAlerta", this._ignorarAlerta, this._ignorarAlerta = value);
        }
    
        public get TipoExclusao(): Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao 
        {
            return this._tipoExclusao;
        }

        public set TipoExclusao(value: Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao) 
        {
            this.NotificarValorPropriedadeAlterada("TipoExclusao", this._tipoExclusao, this._tipoExclusao = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<RelacaoUmUmAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoCredencialAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacaoAsync
    {
        //#region Propriedades
    
        private _nomePropriedadeIdentificador : string = null;
    
        public get NomePropriedadeIdentificador(): string 
        {
            return this._nomePropriedadeIdentificador;
        }

        public set NomePropriedadeIdentificador(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedadeIdentificador", this._nomePropriedadeIdentificador, this._nomePropriedadeIdentificador = value);
        }
    
        public static MensagemValidacaoSenhaIncorreta : string = "Senha incorreta. "; 
    
        public static MensagemValidacaoUsuarioNaoExiste : string = "O {0} '{1}' não existe."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_SENHA_INCORRETA : string = "MensagemValidacaoSenhaIncorreta"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_USUARIO_NAO_EXISTE : string = "MensagemValidacaoUsuarioNaoExiste"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( nomePropriedadeIdentificador : string ) 
        {
            super();
            this.Inicializar();
            this._nomePropriedadeIdentificador = nomePropriedadeIdentificador;
        }
        //#endregion
    }
    export class ValidacaoIdenticadorUsuarioAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacaoAsync
    {
        //#region Propriedades
    
        private _isNovoIdentificador : boolean = false;
    
        public get IsNovoIdentificador(): boolean 
        {
            return this._isNovoIdentificador;
        }

        public set IsNovoIdentificador(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsNovoIdentificador", this._isNovoIdentificador, this._isNovoIdentificador = value);
        }
    
        public static MensagemValidacaoIdentificador : string = "O {0} '{1}' não existe."; 
    
        public static MensagemValidacaoNovoIdentificador : string = "O {0} '{1}' já existe."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_IDENTIFICADOR : string = "MensagemValidacaoIdentificador"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_NOVO_IDENTIFICADOR : string = "MensagemValidacaoNovoIdentificador"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( isNovoIdentificador : boolean ) 
        {
            super();
            this.Inicializar();
            this._isNovoIdentificador = isNovoIdentificador;
        }
        //#endregion
    }
    export class ValidacaoUnicoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacaoAsync
    {
        //#region Propriedades
    
        private _isAceitaNulo : boolean = false;
    
        public get IsAceitaNulo(): boolean 
        {
            return this._isAceitaNulo;
        }

        public set IsAceitaNulo(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsAceitaNulo", this._isAceitaNulo, this._isAceitaNulo = value);
        }
    
        public static MensagemValidacao : string = "O {0} '{1}' já existe."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( isAceitaNulo : boolean ) 
        {
            super();
            this.Inicializar();
            this._isAceitaNulo = isAceitaNulo;
        }
        //#endregion
    }
    export class ValidacaoUnicoCompostaAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacaoAsync
    {
        //#region Propriedades
    
        private _tipoEntidade : r.BaseTipo | string = null;
        private _nomesPropriedadeOuFiltro : Array<string> =  new Array<string>();
        private _isCriarIndicesNomeBanco : boolean = false;
    
        public get TipoEntidade(): r.BaseTipo | string 
        {
            return this._tipoEntidade;
        }

        public set TipoEntidade(value: r.BaseTipo | string) 
        {
            this.NotificarValorPropriedadeAlterada("TipoEntidade", this._tipoEntidade, this._tipoEntidade = value);
        }
    
        public get NomesPropriedadeOuFiltro(): Array<string> 
        {
            return this._nomesPropriedadeOuFiltro;
        }

        public set NomesPropriedadeOuFiltro(value: Array<string>) 
        {
            this.NotificarValorPropriedadeAlterada("NomesPropriedadeOuFiltro", this._nomesPropriedadeOuFiltro, this._nomesPropriedadeOuFiltro = value);
        }
    
        public get IsCriarIndicesNomeBanco(): boolean 
        {
            return this._isCriarIndicesNomeBanco;
        }

        public set IsCriarIndicesNomeBanco(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsCriarIndicesNomeBanco", this._isCriarIndicesNomeBanco, this._isCriarIndicesNomeBanco = value);
        }
    
        public static MensagemValidacao : string = "O {0} '{1}' já existe."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( tipoEntidade : r.BaseTipo | string ,  nomesPropriedadeOuFiltro : Array<string> ) 
        {
            super();
            this.Inicializar();
            this._tipoEntidade = tipoEntidade;
            this._nomesPropriedadeOuFiltro = nomesPropriedadeOuFiltro;
        }
        //#endregion
    }
    export class ValidacaoCepAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoCepAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoCnpjAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoCnpjAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoComparacaoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _valor : any = null;
        private _operador : Snebur.Dominio.Atributos.EnumOperadorComparacao = 0;
    
        public get Valor(): any 
        {
            return this._valor;
        }

        public set Valor(value: any) 
        {
            this.NotificarValorPropriedadeAlterada("Valor", this._valor, this._valor = value);
        }
    
        public get Operador(): Snebur.Dominio.Atributos.EnumOperadorComparacao 
        {
            return this._operador;
        }

        public set Operador(value: Snebur.Dominio.Atributos.EnumOperadorComparacao) 
        {
            this.NotificarValorPropriedadeAlterada("Operador", this._operador, this._operador = value);
        }
    
        public static MensagemValidacao : string = "O {0} deve ser {1} à '{2}' "; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( valor : any ,  operador : Snebur.Dominio.Atributos.EnumOperadorComparacao ) 
        {
            super();
            this.Inicializar();
            this._valor = valor;
            this._operador = operador;
        }
        //#endregion
    }
    export class ValidacaoConfirmacaoSenhaAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _nomePropriedadeSenha : string = null;
    
        public get NomePropriedadeSenha(): string 
        {
            return this._nomePropriedadeSenha;
        }

        public set NomePropriedadeSenha(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedadeSenha", this._nomePropriedadeSenha, this._nomePropriedadeSenha = value);
        }
    
        public static MensagemValidacao : string = "A {0} é invalida."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( nomePropriedadeSenha : string ) 
        {
            super();
            this.Inicializar();
            this._nomePropriedadeSenha = nomePropriedadeSenha;
        }
        //#endregion
    }
    export class ValidacaoCpfAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoCpfAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoCpfOuCnpjAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoCpfOuCnpjAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoDataAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _dataMaxima : Date = null;
        private _dataMinima : Date = null;
        private _tipoData : Snebur.Dominio.EnumTipoData = 0;
        private _isPrimeiraHoraDoDia : boolean = false;
        private _isUltimaHoraDoDia : boolean = false;
        private _isHoraFimD : boolean = false;
    
        public get DataMaxima(): Date 
        {
            return this._dataMaxima;
        }

        public set DataMaxima(value: Date) 
        {
            this.NotificarValorPropriedadeAlterada("DataMaxima", this._dataMaxima, this._dataMaxima = value);
        }
    
        public get DataMinima(): Date 
        {
            return this._dataMinima;
        }

        public set DataMinima(value: Date) 
        {
            this.NotificarValorPropriedadeAlterada("DataMinima", this._dataMinima, this._dataMinima = value);
        }
    
        public get TipoData(): Snebur.Dominio.EnumTipoData 
        {
            return this._tipoData;
        }

        public set TipoData(value: Snebur.Dominio.EnumTipoData) 
        {
            this.NotificarValorPropriedadeAlterada("TipoData", this._tipoData, this._tipoData = value);
        }
    
        public get IsPrimeiraHoraDoDia(): boolean 
        {
            return this._isPrimeiraHoraDoDia;
        }

        public set IsPrimeiraHoraDoDia(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsPrimeiraHoraDoDia", this._isPrimeiraHoraDoDia, this._isPrimeiraHoraDoDia = value);
        }
    
        public get IsUltimaHoraDoDia(): boolean 
        {
            return this._isUltimaHoraDoDia;
        }

        public set IsUltimaHoraDoDia(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsUltimaHoraDoDia", this._isUltimaHoraDoDia, this._isUltimaHoraDoDia = value);
        }
    
        public get IsHoraFimD(): boolean 
        {
            return this._isHoraFimD;
        }

        public set IsHoraFimD(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsHoraFimD", this._isHoraFimD, this._isHoraFimD = value);
        }
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( tipoData : Snebur.Dominio.EnumTipoData ,  dataMinima? : Date ,  dataMaxima? : Date ) 
        {
            super();
            this.Inicializar();
            this._tipoData = tipoData;
            this._dataMinima = dataMinima;
            this._dataMaxima = dataMaxima;
        }
        //#endregion
    }
    export class ValidacaoDataExpiracaoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _nomePropriedadeDataPublicacao : string = null;
    
        public get NomePropriedadeDataPublicacao(): string 
        {
            return this._nomePropriedadeDataPublicacao;
        }

        public set NomePropriedadeDataPublicacao(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedadeDataPublicacao", this._nomePropriedadeDataPublicacao, this._nomePropriedadeDataPublicacao = value);
        }
    
        public static MensagemValidacao : string = "A data '{0}' de ser inferior a data de publicação."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( nomePropriedadeDataPublicacao : string ) 
        {
            super();
            this.Inicializar();
            this._nomePropriedadeDataPublicacao = nomePropriedadeDataPublicacao;
        }
        //#endregion
    }
    export class ValidacaoDataNascimentoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoDataNascimentoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoDataPublicacaoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "A data {0} não pode ser no passado."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoDataPublicacaoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoDominioAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoDominioAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoEmailAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoEmailAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoEmailOuTelefoneAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoEmailOuTelefoneAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoGuidAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoGuidAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoIndentificador extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoIndentificador>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoInteiroAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoInteiroAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoIPAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O ip {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoIPAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoLongoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoLongoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoMdr5Attribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoMdr5Attribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoMoedaAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _aceitarNegativo : boolean = false;
        private _aceitarNulo : boolean = false;
        private _valorMaximo : number = 0;
        private _valorMinimo : number = 0;
    
        public get AceitarNegativo(): boolean 
        {
            return this._aceitarNegativo;
        }

        public set AceitarNegativo(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("AceitarNegativo", this._aceitarNegativo, this._aceitarNegativo = value);
        }
    
        public get AceitarNulo(): boolean 
        {
            return this._aceitarNulo;
        }

        public set AceitarNulo(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("AceitarNulo", this._aceitarNulo, this._aceitarNulo = value);
        }
    
        public get ValorMaximo(): number 
        {
            return this._valorMaximo;
        }

        public set ValorMaximo(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("ValorMaximo", this._valorMaximo, this._valorMaximo = value);
        }
    
        public get ValorMinimo(): number 
        {
            return this._valorMinimo;
        }

        public set ValorMinimo(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("ValorMinimo", this._valorMinimo, this._valorMinimo = value);
        }
    
        public static MensagemValidacaoPadrao : string = "O valor campo {0} é invalido."; 
    
        public static MensagemValidacaoNegativa : string = "O valor do campo {0} não pode ser negativo"; 
    
        public static MensagemValidacaoNaoNulo : string = "O  valor do campo {0} não pode ser zero"; 
    
        public static MensagemValidacaoValorMaximo : string = "O  valor do campo {0} não pode ser superior a {1}"; 
    
        public static MensagemValidacaoValorMinimo : string = "O  valor do campo {0} não pode ser inferior a {1}"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_NEGATIVA : string = "MensagemValidacaoNegativa"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_NAO_NULO : string = "MensagemValidacaoNaoNulo"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_VALOR_MAXIMO : string = "MensagemValidacaoValorMaximo"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_VALOR_MINIMO : string = "MensagemValidacaoValorMinimo"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( aceitarNulo : boolean ,  aceitarNegativo : boolean ,  valorMinimo : number ,  valorMaximo : number ) 
        {
            super();
            this.Inicializar();
            this._aceitarNulo = aceitarNulo;
            this._aceitarNegativo = aceitarNegativo;
            this._valorMinimo = valorMinimo;
            this._valorMaximo = valorMaximo;
        }
        //#endregion
    }
    export class ValidacaoNomeCompletoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "Informe seu nome completo"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoNomeCompletoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoPalavraTamanhoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _tamanhoMinimo : number = 0;
        private _tamanhoMaximo : number = 0;
    
        public get TamanhoMinimo(): number 
        {
            return this._tamanhoMinimo;
        }

        public set TamanhoMinimo(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("TamanhoMinimo", this._tamanhoMinimo, this._tamanhoMinimo = value);
        }
    
        public get TamanhoMaximo(): number 
        {
            return this._tamanhoMaximo;
        }

        public set TamanhoMaximo(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("TamanhoMaximo", this._tamanhoMaximo, this._tamanhoMaximo = value);
        }
    
        public static MensagemValidacaoMaximo : string = "A palavra '{0}' deve ter no máximo {1} caracteres."; 
    
        public static MensagemValidacaoMinimo : string = "A palavra '{0}' deve ter no mínimo {1} caracteres."; 
    
        public static MensagemValidacaoIntervalo : string = "O campo '{0}' deve ter entre {1} e {2} caracteres."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_MAXIMO : string = "MensagemValidacaoMaximo"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_MINIMO : string = "MensagemValidacaoMinimo"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_INTERVALO : string = "MensagemValidacaoIntervalo"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( tamanhoMinimo : number ,  tamanhoMaximo : number ) 
        {
            super();
            this.Inicializar();
            this._tamanhoMinimo = tamanhoMinimo;
            this._tamanhoMaximo = tamanhoMaximo;
        }
        //#endregion
    }
    export class ValidacaoPrimeiroNomeAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "Informe seu nome"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoPrimeiroNomeAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoRotaAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "Rota invalida"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoRotaAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoSenhaAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _tamanhoMinimo : number = 0;
        private _tamanhoMaximo : number = 0;
    
        public get TamanhoMinimo(): number 
        {
            return this._tamanhoMinimo;
        }

        public set TamanhoMinimo(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("TamanhoMinimo", this._tamanhoMinimo, this._tamanhoMinimo = value);
        }
    
        public get TamanhoMaximo(): number 
        {
            return this._tamanhoMaximo;
        }

        public set TamanhoMaximo(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("TamanhoMaximo", this._tamanhoMaximo, this._tamanhoMaximo = value);
        }
    
        public static MensagemValidacaoMaximo : string = "O campo '{0}' deve ter no máximo {1} caracteres."; 
    
        public static MensagemValidacaoMinimo : string = "O campo '{0}' deve ter no mínimo {1} caracteres."; 
    
        public static MensagemValidacaoIntervalo : string = "O campo '{0}' deve ter entre {1} e {2} caracteres."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_MAXIMO : string = "MensagemValidacaoMaximo"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_MINIMO : string = "MensagemValidacaoMinimo"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_INTERVALO : string = "MensagemValidacaoIntervalo"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( tamanhoMinimo : number ,  tamanhoMaximo : number ) 
        {
            super();
            this.Inicializar();
            this._tamanhoMinimo = tamanhoMinimo;
            this._tamanhoMaximo = tamanhoMaximo;
        }
        //#endregion
    }
    export class ValidacaoSubDominio extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoSubDominio>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoTelefoneAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoTelefoneAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoTextoSomentoNumerosAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "A campo {0} é invalido (somente números)."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoTextoSomentoNumerosAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoUFAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoUFAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoUrlAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "A url {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoUrlAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoVersaoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor(inicializador?: Partial<ValidacaoVersaoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class ValidacaoDominioDNSAttribute extends Snebur.Dominio.Atributos.ValidacaoDominioAttribute
    {
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class ValidacaoIntervaloAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _minimo : number = 0;
        private _maximo : number = 0;
    
        public get Minimo(): number 
        {
            return this._minimo;
        }

        public set Minimo(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("Minimo", this._minimo, this._minimo = value);
        }
    
        public get Maximo(): number 
        {
            return this._maximo;
        }

        public set Maximo(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("Maximo", this._maximo, this._maximo = value);
        }
    
        public static MensagemValidacao : string = "O campo {0} deve estar entre {1} e {2}."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( minimo : number ,  maximo : number ) 
        {
            super();
            this._minimo = minimo;
            this._maximo = maximo;
        }
        //#endregion
    }
    export class ValidacaoExpressaoRegularAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _expressaoRegular : string = null;
    
        public get ExpressaoRegular(): string 
        {
            return this._expressaoRegular;
        }

        public set ExpressaoRegular(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("ExpressaoRegular", this._expressaoRegular, this._expressaoRegular = value);
        }
    
        public static MensagemValidacao : string = "O campo {0} é invalido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( expressaoRegular : string ) 
        {
            super();
            this._expressaoRegular = expressaoRegular;
        }
        //#endregion
    }
    export class ValidacaoFlagsEnumRequeridoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} deve ser preenchido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class ValidacaoRequeridoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _opcoesComparacaoAuxiliar : Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar | null = null;
        private _nomePropridadeAuxiliar : string = null;
        private _isValidoSeAuxiliarInvalido : boolean = false;
        private _valorComparar : any = null;
    
        public get OpcoesComparacaoAuxiliar(): Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar | null 
        {
            return this._opcoesComparacaoAuxiliar;
        }

        public set OpcoesComparacaoAuxiliar(value: Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar | null) 
        {
            this.NotificarValorPropriedadeAlterada("OpcoesComparacaoAuxiliar", this._opcoesComparacaoAuxiliar, this._opcoesComparacaoAuxiliar = value);
        }
    
        public get NomePropridadeAuxiliar(): string 
        {
            return this._nomePropridadeAuxiliar;
        }

        public set NomePropridadeAuxiliar(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropridadeAuxiliar", this._nomePropridadeAuxiliar, this._nomePropridadeAuxiliar = value);
        }
    
        public get IsValidoSeAuxiliarInvalido(): boolean 
        {
            return this._isValidoSeAuxiliarInvalido;
        }

        public set IsValidoSeAuxiliarInvalido(value: boolean) 
        {
            this.NotificarValorPropriedadeAlterada("IsValidoSeAuxiliarInvalido", this._isValidoSeAuxiliarInvalido, this._isValidoSeAuxiliarInvalido = value);
        }
    
        public get ValorComparar(): any 
        {
            return this._valorComparar;
        }

        public set ValorComparar(value: any) 
        {
            this.NotificarValorPropriedadeAlterada("ValorComparar", this._valorComparar, this._valorComparar = value);
        }
    
        public static MensagemValidacao : string = "O campo {0} deve ser preenchido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( opcoesComparacaoAuxiliar? : Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar ,  nomePropridadeAuxiliar? : string ,  isValidoSeAuxiliarInvalido? : boolean ,  valorComparar? : any ) 
        {
            super();
            this._opcoesComparacaoAuxiliar = opcoesComparacaoAuxiliar;
            this._nomePropridadeAuxiliar = nomePropridadeAuxiliar;
            this._isValidoSeAuxiliarInvalido = isValidoSeAuxiliarInvalido;
            this._valorComparar = valorComparar;
        }
        //#endregion
    }
    export class ValidacaoRequeridoDebugAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        public static MensagemValidacao : string = "O campo {0} deve ser preenchido."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO : string = "MensagemValidacao"; 
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class ValidacaoTextoTamanhoAttribute extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Propriedades
    
        private _tamanhoMinimo : number = 0;
        private _tamanhoMaximo : number = 0;
    
        public get TamanhoMinimo(): number 
        {
            return this._tamanhoMinimo;
        }

        public set TamanhoMinimo(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("TamanhoMinimo", this._tamanhoMinimo, this._tamanhoMinimo = value);
        }
    
        public get TamanhoMaximo(): number 
        {
            return this._tamanhoMaximo;
        }

        public set TamanhoMaximo(value: number) 
        {
            this.NotificarValorPropriedadeAlterada("TamanhoMaximo", this._tamanhoMaximo, this._tamanhoMaximo = value);
        }
    
        public static MensagemValidacaoMaximo : string = "O campo '{0}' deve ter no máximo {1} caracteres."; 
    
        public static MensagemValidacaoMinimo : string = "O campo '{0}' deve ter no mínimo {1} caracteres."; 
    
        public static MensagemValidacaoIntervalo : string = "O campo '{0}' deve ter entre {1} e {2} caracteres."; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_MAXIMO : string = "MensagemValidacaoMaximo"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_MINIMO : string = "MensagemValidacaoMinimo"; 
    
        public static IDENTIFICADOR_MENSAGEM_VALIDACAO_INTERVALO : string = "MensagemValidacaoIntervalo"; 
        //#endregion
    
        //#region Construtor
    
        public constructor( tamanhoMinimo : number ,  tamanhoMaximo : number ) 
        {
            super();
            this._tamanhoMinimo = tamanhoMinimo;
            this._tamanhoMaximo = tamanhoMaximo;
        }
        //#endregion
    }
    export class ChaveEstrangeiraAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio implements Snebur.Dominio.Atributos.IChaveEstrangeiraAttribute 
    {
        //#region Propriedades
    
        private _nomePropriedade : string = null;
    
        public get NomePropriedade(): string 
        {
            return this._nomePropriedade;
        }

        public set NomePropriedade(value: string) 
        {
            this.NotificarValorPropriedadeAlterada("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor( nomePropriedade : string ) 
        {
            super();
            this._nomePropriedade = nomePropriedade;
        }
        //#endregion
    }
    export class OcultarColunaAttribute extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
}