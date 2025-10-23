// Auto-generated file. Atributos - Snebur. Do not modify directly. 
//@Project: Snebur
//@DataHora: 2025-10-23 17:46:39
//@Artifact: Atributos
//@Namespace: Snebur.Dominio 
//@PrioridadeDominio: 0
//@Globalizar: False 
//@Dominios dependentes: []
/*eslint-disable*/
// Ignore Spelling: *

namespace Snebur.Dominio.Atributos
{
    export abstract class BasePropriedadeComputadaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        
        public constructor(inicializador?: Partial<BasePropriedadeComputadaAttribute>) 
        {
            super(inicializador);
        }
    }
    export class BaseRelacaoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        
        public constructor(inicializador?: Partial<BaseRelacaoAttribute>) 
        {
            super(inicializador);
        }
    }
    export abstract class BaseValidacaoEntidadeAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        
        public constructor(inicializador?: Partial<BaseValidacaoEntidadeAttribute>) 
        {
            super(inicializador);
        }
    }
    export class ChaveEstrangeiraAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio  implements Snebur.Dominio.Atributos.IChaveEstrangeiraAttribute
    {
        //#region Private Fields
        private _nomePropriedade: string  = "";
        //#endregion
        
        public constructor(nomePropriedade: string) 
        {
            super();
            Guard.NotNull( nomePropriedade, "The argument nomePropriedade cannot be null.");
            this._nomePropriedade = nomePropriedade;
        }
        
        
        public get NomePropriedade(): string
        {
            return this._nomePropriedade;
        }
        public set NomePropriedade(value: string) 
        {
            this.SetProperty("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
    }
    export class ChaveEstrangeiraExternaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio  implements Snebur.Dominio.Atributos.IChaveEstrangeiraAttribute
    {
        //#region Private Fields
        private _nomePropriedade: string  = "";
        private _name: string  = "";
        //#endregion
        
        public constructor(nomePropriedade: string) 
        {
            super();
            Guard.NotNull( nomePropriedade, "The argument nomePropriedade cannot be null.");
            this._nomePropriedade = nomePropriedade;
        }
        
        
        public get NomePropriedade(): string
        {
            return this._nomePropriedade;
        }
        public set NomePropriedade(value: string) 
        {
            this.SetProperty("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
        
        public get Name(): string
        {
            return this._name;
        }
    }
    export class ChaveEstrangeiraRelacaoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio  implements Snebur.Dominio.Atributos.IChaveEstrangeiraAttribute
    {
        //#region Private Fields
        private _nomePropriedade: string  = "";
        //#endregion
        
        public constructor(nomePropriedade: string) 
        {
            super();
            Guard.NotNull( nomePropriedade, "The argument nomePropriedade cannot be null.");
            this._nomePropriedade = nomePropriedade;
        }
        
        
        public get NomePropriedade(): string
        {
            return this._nomePropriedade;
        }
        public set NomePropriedade(value: string) 
        {
            this.SetProperty("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
    }
    export class ChavePrimariaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Private Fields
        private _isIdentity: boolean  = false;
        //#endregion
        
        public constructor(isIdentity: boolean) 
        {
            super();
            Guard.NotNull( isIdentity, "The argument isIdentity cannot be null.");
            this._isIdentity = isIdentity;
        }
        
        
        public get IsIdentity(): boolean
        {
            return this._isIdentity;
        }
    }
    export class EnumTSStringAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Private Fields
        private _tsValue: string  = "";
        //#endregion
        
        public constructor(tsValue: string) 
        {
            super();
            Guard.NotNull( tsValue, "The argument tsValue cannot be null.");
            this._tsValue = tsValue;
        }
        
        
        public get TSValue(): string
        {
            return this._tsValue;
        }
    }
    export class IgnorarValidacaoTipoComplexo  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        
        public constructor(inicializador?: Partial<IgnorarValidacaoTipoComplexo>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export abstract class NormalizarStringAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio  implements Snebur.Dominio.INormalizarString
    {
        
        public constructor(inicializador?: Partial<NormalizarStringAttribute>) 
        {
            super(inicializador);
        }
    }
    export class NotificarAlteracaoPropriedadeAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Private Fields
        private _opcoes: Snebur.Dominio.EnumOpcoesAlterarPropriedade  = Snebur.Dominio.EnumOpcoesAlterarPropriedade.Undefined;
        private _nomePropriedadeAlterada: string  = "";
        private _nomePropriedadeRelacao: string  = "";
        private _tipoEntidadeAlteracaoPropriedade: r.BaseTipo | string  = "";
        private _propriedadeRelacao: r.Propriedade | string  = "";
        private _propriedadeValorAlterado: r.Propriedade | string  = "";
        private _propriedadeValorAntigo: r.Propriedade | string  = "";
        //#endregion
        
        public constructor(tipoEntidadeAlteracaoPropriedade: r.BaseTipo | string, nomePropriedadeRelacao: string, nomePropriedadeAlterada: string, opcoes: Snebur.Dominio.EnumOpcoesAlterarPropriedade) 
        {
            super();
            Guard.NotNull( tipoEntidadeAlteracaoPropriedade, "The argument tipoEntidadeAlteracaoPropriedade cannot be null.");
            Guard.NotNull( nomePropriedadeRelacao, "The argument nomePropriedadeRelacao cannot be null.");
            Guard.NotNull( nomePropriedadeAlterada, "The argument nomePropriedadeAlterada cannot be null.");
            Guard.NotNull( opcoes, "The argument opcoes cannot be null.");
            this._tipoEntidadeAlteracaoPropriedade = tipoEntidadeAlteracaoPropriedade;
            this._nomePropriedadeRelacao = nomePropriedadeRelacao;
            this._nomePropriedadeAlterada = nomePropriedadeAlterada;
            this._opcoes = opcoes;
        }
        
        
        public get Opcoes(): Snebur.Dominio.EnumOpcoesAlterarPropriedade
        {
            return this._opcoes;
        }
        
        public get NomePropriedadeAlterada(): string
        {
            return this._nomePropriedadeAlterada;
        }
        
        public get NomePropriedadeRelacao(): string
        {
            return this._nomePropriedadeRelacao;
        }
        
        public get TipoEntidadeAlteracaoPropriedade(): r.BaseTipo | string
        {
            return this._tipoEntidadeAlteracaoPropriedade;
        }
        
        public get PropriedadeRelacao(): r.Propriedade | string
        {
            return this._propriedadeRelacao;
        }
        
        public get PropriedadeValorAlterado(): r.Propriedade | string
        {
            return this._propriedadeValorAlterado;
        }
        
        public get PropriedadeValorAntigo(): r.Propriedade | string
        {
            return this._propriedadeValorAntigo;
        }
    }
    export class NotificarAlteracaoPropriedadeGenericaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Private Fields
        private _opcoes: Snebur.Dominio.EnumOpcoesAlterarPropriedade  = Snebur.Dominio.EnumOpcoesAlterarPropriedade.Undefined;
        private _isEnum: boolean  = false;
        private _formatacaoPersonalizada: string | null  = null;
        private _formatacao: string  = "";
        private _caminhoTipoPropriedadeRelacao: string | null  = null;
        private _tipoPropriedadeRelacao: r.BaseTipo | string | null  = null;
        //#endregion
        
        public constructor(formatacao: string, tipoPropriedadeRelacao: r.BaseTipo | string, caminhoTipoPropriedadeRelacao: string, opcoes: Snebur.Dominio.EnumOpcoesAlterarPropriedade) 
        {
            super();
            Guard.NotNull( formatacao, "The argument formatacao cannot be null.");
            Guard.NotNull( opcoes, "The argument opcoes cannot be null.");
            this._formatacao = formatacao;
            this._tipoPropriedadeRelacao = tipoPropriedadeRelacao;
            this._caminhoTipoPropriedadeRelacao = caminhoTipoPropriedadeRelacao;
            this._opcoes = opcoes;
        }
        
        
        public get Opcoes(): Snebur.Dominio.EnumOpcoesAlterarPropriedade
        {
            return this._opcoes;
        }
        
        public get IsEnum(): boolean
        {
            return this._isEnum;
        }
        public set IsEnum(value: boolean) 
        {
            this.SetProperty("IsEnum", this._isEnum, this._isEnum = value);
        }
        
        public get FormatacaoPersonalizada(): string | null
        {
            return this._formatacaoPersonalizada;
        }
        public set FormatacaoPersonalizada(value: string | null) 
        {
            this.SetProperty("FormatacaoPersonalizada", this._formatacaoPersonalizada, this._formatacaoPersonalizada = value);
        }
        
        public get Formatacao(): string
        {
            return this._formatacao;
        }
        public set Formatacao(value: string) 
        {
            this.SetProperty("Formatacao", this._formatacao, this._formatacao = value);
        }
        
        public get CaminhoTipoPropriedadeRelacao(): string | null
        {
            return this._caminhoTipoPropriedadeRelacao;
        }
        public set CaminhoTipoPropriedadeRelacao(value: string | null) 
        {
            this.SetProperty("CaminhoTipoPropriedadeRelacao", this._caminhoTipoPropriedadeRelacao, this._caminhoTipoPropriedadeRelacao = value);
        }
        
        public get TipoPropriedadeRelacao(): r.BaseTipo | string | null
        {
            return this._tipoPropriedadeRelacao;
        }
        public set TipoPropriedadeRelacao(value: r.BaseTipo | string | null) 
        {
            this.SetProperty("TipoPropriedadeRelacao", this._tipoPropriedadeRelacao, this._tipoPropriedadeRelacao = value);
        }
    }
    export class NotificarTodasAlteracoesPropriedadeGenericaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Private Fields
        private _opcoes: Snebur.Dominio.EnumOpcoesAlterarPropriedade  = Snebur.Dominio.EnumOpcoesAlterarPropriedade.Undefined;
        //#endregion
        
        public constructor(inicializador?: Partial<NotificarTodasAlteracoesPropriedadeGenericaAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get Opcoes(): Snebur.Dominio.EnumOpcoesAlterarPropriedade
        {
            return this._opcoes;
        }
    }
    export class OcultarColunaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        
        public constructor(inicializador?: Partial<OcultarColunaAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class PropriedadeComputadaBancoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        
        public constructor(inicializador?: Partial<PropriedadeComputadaBancoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class PropriedadeDescricaoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Private Fields
        private _nomePropriedade: string  = "";
        //#endregion
        
        public constructor(nomePropriedade: string) 
        {
            super();
            Guard.NotNull( nomePropriedade, "The argument nomePropriedade cannot be null.");
            this._nomePropriedade = nomePropriedade;
        }
        
        
        public get NomePropriedade(): string
        {
            return this._nomePropriedade;
        }
        public set NomePropriedade(value: string) 
        {
            this.SetProperty("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
    }
    export class PropriedadeIdentificadorProprietarioAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio  implements Snebur.Dominio.Atributos.IBaseValorPadrao
    {
        //#region Private Fields
        private _isTipoNullableRequerido: boolean  = false;
        private _isValorPadraoOnUpdate: boolean  = false;
        private _isPermitirValorGlboal: boolean  = false;
        private _valorGlobal: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<PropriedadeIdentificadorProprietarioAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IsTipoNullableRequerido(): boolean
        {
            return this._isTipoNullableRequerido;
        }
        
        public get IsValorPadraoOnUpdate(): boolean
        {
            return this._isValorPadraoOnUpdate;
        }
        
        public get IsPermitirValorGlboal(): boolean
        {
            return this._isPermitirValorGlboal;
        }
        public set IsPermitirValorGlboal(value: boolean) 
        {
            this.SetProperty("IsPermitirValorGlboal", this._isPermitirValorGlboal, this._isPermitirValorGlboal = value);
        }
        
        public get ValorGlobal(): string | null
        {
            return this._valorGlobal;
        }
        public set ValorGlobal(value: string | null) 
        {
            this.SetProperty("ValorGlobal", this._valorGlobal, this._valorGlobal = value);
        }
    }
    export class PropriedadeTSEspecializadaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Private Fields
        private _nomePropriedade: string  = "";
        //#endregion
        
        public constructor(nomePropriedade: string) 
        {
            super();
            Guard.NotNull( nomePropriedade, "The argument nomePropriedade cannot be null.");
            this._nomePropriedade = nomePropriedade;
        }
        
        
        public get NomePropriedade(): string
        {
            return this._nomePropriedade;
        }
        public set NomePropriedade(value: string) 
        {
            this.SetProperty("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
    }
    export class RotuloAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Private Fields
        private _rotulo: string  = "";
        private _rotuloPlural: string  = "";
        //#endregion
        
        public constructor(rotulo: string, rotuloPlural?: string) 
        {
            super();
            Guard.NotNull( rotulo, "The argument rotulo cannot be null.");
            this._rotulo = rotulo;
            this._rotuloPlural = rotuloPlural;
        }
        
        
        public get Rotulo(): string
        {
            return this._rotulo;
        }
        
        public get RotuloPlural(): string
        {
            return this._rotuloPlural;
        }
        public set RotuloPlural(value: string) 
        {
            this.SetProperty("RotuloPlural", this._rotuloPlural, this._rotuloPlural = value);
        }
    }
    export class SomenteLeituraAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        
        public constructor(inicializador?: Partial<SomenteLeituraAttribute>) 
        {
            super(inicializador);
        }
    }
    export class UndefinedEnumValueAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        
        public constructor(inicializador?: Partial<UndefinedEnumValueAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class ValorEnumStringAttribute  extends Snebur.Dominio.Atributos.BaseAtributoDominio
    {
        //#region Private Fields
        private _valor: string  = "";
        //#endregion
        
        public constructor(valor: string) 
        {
            super();
            Guard.NotNull( valor, "The argument valor cannot be null.");
            this._valor = valor;
        }
        
        
        public get Valor(): string
        {
            return this._valor;
        }
    }
    export abstract class RelacaoChaveEstrangeiraAttribute  extends Snebur.Dominio.Atributos.BaseRelacaoAttribute
    {
        
        public constructor(inicializador?: Partial<RelacaoChaveEstrangeiraAttribute>) 
        {
            super(inicializador);
        }
    }
    export class RelacaoFilhosAttribute  extends Snebur.Dominio.Atributos.BaseRelacaoAttribute
    {
        //#region Private Fields
        private _nomePropriedadeChaveEstrangeira: string | null  = null;
        //#endregion
        
        public constructor(nomePropriedadeChaveEstrangeira?: string) 
        {
            super();
            this._nomePropriedadeChaveEstrangeira = nomePropriedadeChaveEstrangeira;
        }
        
        
        public get NomePropriedadeChaveEstrangeira(): string | null
        {
            return this._nomePropriedadeChaveEstrangeira;
        }
        public set NomePropriedadeChaveEstrangeira(value: string | null) 
        {
            this.SetProperty("NomePropriedadeChaveEstrangeira", this._nomePropriedadeChaveEstrangeira, this._nomePropriedadeChaveEstrangeira = value);
        }
    }
    export class RelacaoNnAttribute  extends Snebur.Dominio.Atributos.BaseRelacaoAttribute
    {
        //#region Private Fields
        private _nomeTipoEntidadeRelacao: string  = "";
        //#endregion
        
        public constructor(nomeTipoEntidadeRelacao: string) 
        {
            super();
            Guard.NotNull( nomeTipoEntidadeRelacao, "The argument nomeTipoEntidadeRelacao cannot be null.");
            this._nomeTipoEntidadeRelacao = nomeTipoEntidadeRelacao;
        }
        
        
        public get NomeTipoEntidadeRelacao(): string
        {
            return this._nomeTipoEntidadeRelacao;
        }
        public set NomeTipoEntidadeRelacao(value: string) 
        {
            this.SetProperty("NomeTipoEntidadeRelacao", this._nomeTipoEntidadeRelacao, this._nomeTipoEntidadeRelacao = value);
        }
    }
    export class RelacaoUmUmReversaAttribute  extends Snebur.Dominio.Atributos.BaseRelacaoAttribute
    {
        //#region Private Fields
        private _nomePropriedadeChaveEstrangeiraReversa: string  = "";
        //#endregion
        
        public constructor(nomePropriedadeChaveEstrangeiraReversa: string) 
        {
            super();
            Guard.NotNull( nomePropriedadeChaveEstrangeiraReversa, "The argument nomePropriedadeChaveEstrangeiraReversa cannot be null.");
            this._nomePropriedadeChaveEstrangeiraReversa = nomePropriedadeChaveEstrangeiraReversa;
        }
        
        
        public get NomePropriedadeChaveEstrangeiraReversa(): string
        {
            return this._nomePropriedadeChaveEstrangeiraReversa;
        }
    }
    export class RemoverEspacosLateraisAttribute  extends Snebur.Dominio.Atributos.NormalizarStringAttribute
    {
        
        public constructor(inicializador?: Partial<RemoverEspacosLateraisAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class RemoverMascaraAttribute  extends Snebur.Dominio.Atributos.NormalizarStringAttribute
    {
        
        public constructor(inicializador?: Partial<RemoverMascaraAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class ValidacaoBase36Attribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _isPermitirEspaco: boolean  = false;
        private _isIgnorarCase: boolean  = false;
        private _caracteresExtra: string | null  = null;
        //#endregion
        
        public constructor(isPermitirEspaco: boolean, isIgnorarCase: boolean, caracteresExtra: string | null) 
        {
            super();
            Guard.NotNull( isPermitirEspaco, "The argument isPermitirEspaco cannot be null.");
            Guard.NotNull( isIgnorarCase, "The argument isIgnorarCase cannot be null.");
            this._isPermitirEspaco = isPermitirEspaco;
            this._isIgnorarCase = isIgnorarCase;
            this._caracteresExtra = caracteresExtra;
        }
        
        
        public get IsPermitirEspaco(): boolean
        {
            return this._isPermitirEspaco;
        }
        public set IsPermitirEspaco(value: boolean) 
        {
            this.SetProperty("IsPermitirEspaco", this._isPermitirEspaco, this._isPermitirEspaco = value);
        }
        
        public get IsIgnorarCase(): boolean
        {
            return this._isIgnorarCase;
        }
        public set IsIgnorarCase(value: boolean) 
        {
            this.SetProperty("IsIgnorarCase", this._isIgnorarCase, this._isIgnorarCase = value);
        }
        
        public get CaracteresExtra(): string | null
        {
            return this._caracteresExtra;
        }
        public set CaracteresExtra(value: string | null) 
        {
            this.SetProperty("CaracteresExtra", this._caracteresExtra, this._caracteresExtra = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} deve conter apenas letras de A a Z e números de 0 a 9.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoCepAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoCepAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoCnpjAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoCnpjAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoComparacaoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _operador: Snebur.Dominio.Atributos.EnumOperadorComparacao  = Snebur.Dominio.Atributos.EnumOperadorComparacao.Undefined;
        private _valor: any | null  = null;
        //#endregion
        
        public constructor(valor: any | null, operador: Snebur.Dominio.Atributos.EnumOperadorComparacao) 
        {
            super();
            Guard.NotNull( operador, "The argument operador cannot be null.");
            this._valor = valor;
            this._operador = operador;
        }
        
        
        public get Operador(): Snebur.Dominio.Atributos.EnumOperadorComparacao
        {
            return this._operador;
        }
        public set Operador(value: Snebur.Dominio.Atributos.EnumOperadorComparacao) 
        {
            this.SetProperty("Operador", this._operador, this._operador = value);
        }
        
        public get Valor(): any | null
        {
            return this._valor;
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O {0} deve ser {1} à '{2}' ";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoConfirmacaoSenhaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _nomePropriedadeSenha: string  = "";
        //#endregion
        
        public constructor(nomePropriedadeSenha: string) 
        {
            super();
            Guard.NotNull( nomePropriedadeSenha, "The argument nomePropriedadeSenha cannot be null.");
            this._nomePropriedadeSenha = nomePropriedadeSenha;
        }
        
        
        public get NomePropriedadeSenha(): string
        {
            return this._nomePropriedadeSenha;
        }
        public set NomePropriedadeSenha(value: string) 
        {
            this.SetProperty("NomePropriedadeSenha", this._nomePropriedadeSenha, this._nomePropriedadeSenha = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "A {0} é invalida.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoCpfAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoCpfAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoCpfOuCnpjAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoCpfOuCnpjAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoCredencialAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacaoAsync
    {
        //#region Private Fields
        private _nomePropriedadeIdentificador: string  = "";
        //#endregion
        
        public constructor(nomePropriedadeIdentificador: string) 
        {
            super();
            Guard.NotNull( nomePropriedadeIdentificador, "The argument nomePropriedadeIdentificador cannot be null.");
            this._nomePropriedadeIdentificador = nomePropriedadeIdentificador;
        }
        
        
        public get NomePropriedadeIdentificador(): string
        {
            return this._nomePropriedadeIdentificador;
        }
        public set NomePropriedadeIdentificador(value: string) 
        {
            this.SetProperty("NomePropriedadeIdentificador", this._nomePropriedadeIdentificador, this._nomePropriedadeIdentificador = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacaoSenhaIncorreta: string = "Senha incorreta. ";
        public static readonly MensagemValidacaoUsuarioNaoExiste: string = "O {0} '{1}' não existe.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_SENHA_INCORRETA: string = "MensagemValidacaoSenhaIncorreta";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_USUARIO_NAO_EXISTE: string = "MensagemValidacaoUsuarioNaoExiste";
        //#endregion
    }
    export class ValidacaoDataAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _dataMaxima: Date | null  = null;
        private _dataMinima: Date | null  = null;
        private _tipoData: Snebur.Dominio.EnumTipoData  = Snebur.Dominio.EnumTipoData.Undefined;
        private _isPrimeiraHoraDoDia: boolean  = false;
        private _isUltimaHoraDoDia: boolean  = false;
        private _isHoraFimD: boolean  = false;
        //#endregion
        
        public constructor(tipoData: Snebur.Dominio.EnumTipoData, dataMinima?: Date | null, dataMaxima?: Date | null) 
        {
            super();
            Guard.NotNull( tipoData, "The argument tipoData cannot be null.");
            this._tipoData = tipoData;
            this._dataMinima = dataMinima;
            this._dataMaxima = dataMaxima;
        }
        
        
        public get DataMaxima(): Date | null
        {
            return this._dataMaxima;
        }
        public set DataMaxima(value: Date | null) 
        {
            this.SetProperty("DataMaxima", this._dataMaxima, this._dataMaxima = value);
        }
        
        public get DataMinima(): Date | null
        {
            return this._dataMinima;
        }
        public set DataMinima(value: Date | null) 
        {
            this.SetProperty("DataMinima", this._dataMinima, this._dataMinima = value);
        }
        
        public get TipoData(): Snebur.Dominio.EnumTipoData
        {
            return this._tipoData;
        }
        public set TipoData(value: Snebur.Dominio.EnumTipoData) 
        {
            this.SetProperty("TipoData", this._tipoData, this._tipoData = value);
        }
        
        public get IsPrimeiraHoraDoDia(): boolean
        {
            return this._isPrimeiraHoraDoDia;
        }
        public set IsPrimeiraHoraDoDia(value: boolean) 
        {
            this.SetProperty("IsPrimeiraHoraDoDia", this._isPrimeiraHoraDoDia, this._isPrimeiraHoraDoDia = value);
        }
        
        public get IsUltimaHoraDoDia(): boolean
        {
            return this._isUltimaHoraDoDia;
        }
        public set IsUltimaHoraDoDia(value: boolean) 
        {
            this.SetProperty("IsUltimaHoraDoDia", this._isUltimaHoraDoDia, this._isUltimaHoraDoDia = value);
        }
        
        public get IsHoraFimD(): boolean
        {
            return this._isHoraFimD;
        }
        public set IsHoraFimD(value: boolean) 
        {
            this.SetProperty("IsHoraFimD", this._isHoraFimD, this._isHoraFimD = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoDataExpiracaoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _nomePropriedadeDataPublicacao: string  = "";
        //#endregion
        
        public constructor(nomePropriedadeDataPublicacao: string) 
        {
            super();
            Guard.NotNull( nomePropriedadeDataPublicacao, "The argument nomePropriedadeDataPublicacao cannot be null.");
            this._nomePropriedadeDataPublicacao = nomePropriedadeDataPublicacao;
        }
        
        
        public get NomePropriedadeDataPublicacao(): string
        {
            return this._nomePropriedadeDataPublicacao;
        }
        public set NomePropriedadeDataPublicacao(value: string) 
        {
            this.SetProperty("NomePropriedadeDataPublicacao", this._nomePropriedadeDataPublicacao, this._nomePropriedadeDataPublicacao = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "A '{0}' deve ser superior a data de publicação.";
        public static readonly MensagemValidacaoComposta: string = "A '{0}' deve ser superior à '{1}'.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_COMPOSTA: string = "MensagemValidacaoComposta";
        //#endregion
    }
    export class ValidacaoDataNascimentoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoDataNascimentoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoDataPublicacaoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoDataPublicacaoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "A '{0}' deve ser superior ou igual à data de hoje.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoDominioAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoDominioAttribute>) 
        {
            super(inicializador);
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoEmailAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoEmailAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoEmailOuTelefoneAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoEmailOuTelefoneAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoExpressaoRegularAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _expressaoRegular: string  = "";
        //#endregion
        
        public constructor(expressaoRegular: string) 
        {
            super();
            Guard.NotNull( expressaoRegular, "The argument expressaoRegular cannot be null.");
            this._expressaoRegular = expressaoRegular;
        }
        
        
        public get ExpressaoRegular(): string
        {
            return this._expressaoRegular;
        }
        public set ExpressaoRegular(value: string) 
        {
            this.SetProperty("ExpressaoRegular", this._expressaoRegular, this._expressaoRegular = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoFlagsEnumRequeridoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoFlagsEnumRequeridoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} deve ser preenchido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoGuidAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoGuidAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoIdenticadorUsuarioAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacaoAsync
    {
        //#region Private Fields
        private _isNovoIdentificador: boolean  = false;
        //#endregion
        
        public constructor(isNovoIdentificador: boolean) 
        {
            super();
            Guard.NotNull( isNovoIdentificador, "The argument isNovoIdentificador cannot be null.");
            this._isNovoIdentificador = isNovoIdentificador;
        }
        
        
        public get IsNovoIdentificador(): boolean
        {
            return this._isNovoIdentificador;
        }
        public set IsNovoIdentificador(value: boolean) 
        {
            this.SetProperty("IsNovoIdentificador", this._isNovoIdentificador, this._isNovoIdentificador = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacaoIdentificador: string = "O {0} '{1}' não existe.";
        public static readonly MensagemValidacaoNovoIdentificador: string = "O {0} '{1}' já existe.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_IDENTIFICADOR: string = "MensagemValidacaoIdentificador";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_NOVO_IDENTIFICADOR: string = "MensagemValidacaoNovoIdentificador";
        //#endregion
    }
    export class ValidacaoIndentificador  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoIndentificador>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoInteiroAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoInteiroAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoIntervaloAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _minimo: number  = 0;
        private _maximo: number  = 0;
        //#endregion
        
        public constructor(minimo: number, maximo: number) 
        {
            super();
            Guard.NotNull( minimo, "The argument minimo cannot be null.");
            Guard.NotNull( maximo, "The argument maximo cannot be null.");
            this._minimo = minimo;
            this._maximo = maximo;
        }
        
        
        public get Minimo(): number
        {
            return this._minimo;
        }
        public set Minimo(value: number) 
        {
            this.SetProperty("Minimo", this._minimo, this._minimo = value);
        }
        
        public get Maximo(): number
        {
            return this._maximo;
        }
        public set Maximo(value: number) 
        {
            this.SetProperty("Maximo", this._maximo, this._maximo = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} deve estar entre {1} e {2}.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoIPAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoIPAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O ip {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoLongAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoLongAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoMdr5Attribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoMdr5Attribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoMoedaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _aceitarNegativo: boolean  = false;
        private _aceitarNulo: boolean  = false;
        private _valorMaximo: number  = 0;
        private _valorMinimo: number  = 0;
        //#endregion
        
        public constructor(aceitarNulo: boolean, aceitarNegativo: boolean, valorMinimo: number, valorMaximo: number) 
        {
            super();
            Guard.NotNull( aceitarNulo, "The argument aceitarNulo cannot be null.");
            Guard.NotNull( aceitarNegativo, "The argument aceitarNegativo cannot be null.");
            Guard.NotNull( valorMinimo, "The argument valorMinimo cannot be null.");
            Guard.NotNull( valorMaximo, "The argument valorMaximo cannot be null.");
            this._aceitarNulo = aceitarNulo;
            this._aceitarNegativo = aceitarNegativo;
            this._valorMinimo = valorMinimo;
            this._valorMaximo = valorMaximo;
        }
        
        
        public get AceitarNegativo(): boolean
        {
            return this._aceitarNegativo;
        }
        public set AceitarNegativo(value: boolean) 
        {
            this.SetProperty("AceitarNegativo", this._aceitarNegativo, this._aceitarNegativo = value);
        }
        
        public get AceitarNulo(): boolean
        {
            return this._aceitarNulo;
        }
        public set AceitarNulo(value: boolean) 
        {
            this.SetProperty("AceitarNulo", this._aceitarNulo, this._aceitarNulo = value);
        }
        
        public get ValorMaximo(): number
        {
            return this._valorMaximo;
        }
        public set ValorMaximo(value: number) 
        {
            this.SetProperty("ValorMaximo", this._valorMaximo, this._valorMaximo = value);
        }
        
        public get ValorMinimo(): number
        {
            return this._valorMinimo;
        }
        public set ValorMinimo(value: number) 
        {
            this.SetProperty("ValorMinimo", this._valorMinimo, this._valorMinimo = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacaoPadrao: string = "O valor campo {0} é invalido.";
        public static readonly MensagemValidacaoNegativa: string = "O valor do campo {0} não pode ser negativo";
        public static readonly MensagemValidacaoNaoNulo: string = "O  valor do campo {0} não pode ser zero";
        public static readonly MensagemValidacaoValorMaximo: string = "O  valor do campo {0} não pode ser superior a {1}";
        public static readonly MensagemValidacaoValorMinimo: string = "O  valor do campo {0} não pode ser inferior a {1}";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_NEGATIVA: string = "MensagemValidacaoNegativa";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_NAO_NULO: string = "MensagemValidacaoNaoNulo";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_VALOR_MAXIMO: string = "MensagemValidacaoValorMaximo";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_VALOR_MINIMO: string = "MensagemValidacaoValorMinimo";
        //#endregion
    }
    export class ValidacaoNomeCompletoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoNomeCompletoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "Informe seu nome completo";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoPalavraTamanhoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _tamanhoMinimo: number  = 0;
        private _tamanhoMaximo: number  = 0;
        //#endregion
        
        public constructor(tamanhoMinimo: number, tamanhoMaximo: number) 
        {
            super();
            Guard.NotNull( tamanhoMinimo, "The argument tamanhoMinimo cannot be null.");
            Guard.NotNull( tamanhoMaximo, "The argument tamanhoMaximo cannot be null.");
            this._tamanhoMinimo = tamanhoMinimo;
            this._tamanhoMaximo = tamanhoMaximo;
        }
        
        
        public get TamanhoMinimo(): number
        {
            return this._tamanhoMinimo;
        }
        public set TamanhoMinimo(value: number) 
        {
            this.SetProperty("TamanhoMinimo", this._tamanhoMinimo, this._tamanhoMinimo = value);
        }
        
        public get TamanhoMaximo(): number
        {
            return this._tamanhoMaximo;
        }
        public set TamanhoMaximo(value: number) 
        {
            this.SetProperty("TamanhoMaximo", this._tamanhoMaximo, this._tamanhoMaximo = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacaoMaximo: string = "A palavra '{0}' deve ter no máximo {1} caracteres.";
        public static readonly MensagemValidacaoMinimo: string = "A palavra '{0}' deve ter no mínimo {1} caracteres.";
        public static readonly MensagemValidacaoIntervalo: string = "O campo '{0}' deve ter entre {1} e {2} caracteres.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_MAXIMO: string = "MensagemValidacaoMaximo";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_MINIMO: string = "MensagemValidacaoMinimo";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_INTERVALO: string = "MensagemValidacaoIntervalo";
        //#endregion
    }
    export class ValidacaoPrimeiroNomeAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoPrimeiroNomeAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "Informe seu nome";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoQuantidadeAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoQuantidadeAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo '{0}' deve ser um número não negativo.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoRequeridoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _opcoesComparacaoAuxiliar: Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar | null  = null;
        private _isIgnorarValidacaoSeAuxiliarInvalido: boolean  = false;
        private _nomePropridadeAuxiliar: string | null  = null;
        private _valorComparar: any | null  = null;
        //#endregion
        
        public constructor(opcoesComparacaoAuxiliar?: Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar, nomePropridadeAuxiliar?: string, isIgnorarValidacaoSeAuxiliarInvalido?: boolean, valorComparar?: any | null) 
        {
            super();
            this._opcoesComparacaoAuxiliar = opcoesComparacaoAuxiliar;
            this._nomePropridadeAuxiliar = nomePropridadeAuxiliar;
            this._isIgnorarValidacaoSeAuxiliarInvalido = isIgnorarValidacaoSeAuxiliarInvalido;
            this._valorComparar = valorComparar;
        }
        
        
        public get OpcoesComparacaoAuxiliar(): Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar | null
        {
            return this._opcoesComparacaoAuxiliar;
        }
        public set OpcoesComparacaoAuxiliar(value: Snebur.Dominio.Atributos.EnumOpcoesComparacaoAuxiliar | null) 
        {
            this.SetProperty("OpcoesComparacaoAuxiliar", this._opcoesComparacaoAuxiliar, this._opcoesComparacaoAuxiliar = value);
        }
        
        public get IsIgnorarValidacaoSeAuxiliarInvalido(): boolean
        {
            return this._isIgnorarValidacaoSeAuxiliarInvalido;
        }
        public set IsIgnorarValidacaoSeAuxiliarInvalido(value: boolean) 
        {
            this.SetProperty("IsIgnorarValidacaoSeAuxiliarInvalido", this._isIgnorarValidacaoSeAuxiliarInvalido, this._isIgnorarValidacaoSeAuxiliarInvalido = value);
        }
        
        public get NomePropridadeAuxiliar(): string | null
        {
            return this._nomePropridadeAuxiliar;
        }
        public set NomePropridadeAuxiliar(value: string | null) 
        {
            this.SetProperty("NomePropridadeAuxiliar", this._nomePropridadeAuxiliar, this._nomePropridadeAuxiliar = value);
        }
        
        public get ValorComparar(): any | null
        {
            return this._valorComparar;
        }
        public set ValorComparar(value: any | null) 
        {
            this.SetProperty("ValorComparar", this._valorComparar, this._valorComparar = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} deve ser preenchido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoRequeridoDebugAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoRequeridoDebugAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} deve ser preenchido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoRotaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoRotaAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "Rota invalida";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoSenhaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _tamanhoMinimo: number  = 0;
        private _tamanhoMaximo: number  = 0;
        //#endregion
        
        public constructor(tamanhoMinimo: number, tamanhoMaximo: number) 
        {
            super();
            Guard.NotNull( tamanhoMinimo, "The argument tamanhoMinimo cannot be null.");
            Guard.NotNull( tamanhoMaximo, "The argument tamanhoMaximo cannot be null.");
            this._tamanhoMinimo = tamanhoMinimo;
            this._tamanhoMaximo = tamanhoMaximo;
        }
        
        
        public get TamanhoMinimo(): number
        {
            return this._tamanhoMinimo;
        }
        public set TamanhoMinimo(value: number) 
        {
            this.SetProperty("TamanhoMinimo", this._tamanhoMinimo, this._tamanhoMinimo = value);
        }
        
        public get TamanhoMaximo(): number
        {
            return this._tamanhoMaximo;
        }
        public set TamanhoMaximo(value: number) 
        {
            this.SetProperty("TamanhoMaximo", this._tamanhoMaximo, this._tamanhoMaximo = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacaoMaximo: string = "O campo '{0}' deve ter no máximo {1} caracteres.";
        public static readonly MensagemValidacaoMinimo: string = "O campo '{0}' deve ter no mínimo {1} caracteres.";
        public static readonly MensagemValidacaoIntervalo: string = "O campo '{0}' deve ter entre {1} e {2} caracteres.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_MAXIMO: string = "MensagemValidacaoMaximo";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_MINIMO: string = "MensagemValidacaoMinimo";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_INTERVALO: string = "MensagemValidacaoIntervalo";
        //#endregion
    }
    export class ValidacaoSubDominio  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoSubDominio>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoTelefoneAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoTelefoneAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoTextoSomentoNumerosAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _isAceitarPontosSinais: boolean  = false;
        //#endregion
        
        public constructor(isAceitarPontosSinais?: boolean) 
        {
            super();
            this._isAceitarPontosSinais = isAceitarPontosSinais;
        }
        
        
        public get IsAceitarPontosSinais(): boolean
        {
            return this._isAceitarPontosSinais;
        }
        public set IsAceitarPontosSinais(value: boolean) 
        {
            this.SetProperty("IsAceitarPontosSinais", this._isAceitarPontosSinais, this._isAceitarPontosSinais = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "A campo {0} é invalido (somente números).";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoTextoTamanhoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        //#region Private Fields
        private _tamanhoMinimo: number  = 0;
        private _tamanhoMaximo: number  = 0;
        //#endregion
        
        public constructor(tamanhoMinimo: number, tamanhoMaximo: number) 
        {
            super();
            Guard.NotNull( tamanhoMinimo, "The argument tamanhoMinimo cannot be null.");
            Guard.NotNull( tamanhoMaximo, "The argument tamanhoMaximo cannot be null.");
            this._tamanhoMinimo = tamanhoMinimo;
            this._tamanhoMaximo = tamanhoMaximo;
        }
        
        
        public get TamanhoMinimo(): number
        {
            return this._tamanhoMinimo;
        }
        public set TamanhoMinimo(value: number) 
        {
            this.SetProperty("TamanhoMinimo", this._tamanhoMinimo, this._tamanhoMinimo = value);
        }
        
        public get TamanhoMaximo(): number
        {
            return this._tamanhoMaximo;
        }
        public set TamanhoMaximo(value: number) 
        {
            this.SetProperty("TamanhoMaximo", this._tamanhoMaximo, this._tamanhoMaximo = value);
        }
        //#region Static Properties
        public static readonly MensagemValidacaoMaximo: string = "O campo '{0}' deve ter no máximo {1} caracteres.";
        public static readonly MensagemValidacaoMinimo: string = "O campo '{0}' deve ter no mínimo {1} caracteres.";
        public static readonly MensagemValidacaoIntervalo: string = "O campo '{0}' deve ter entre {1} e {2} caracteres.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_MAXIMO: string = "MensagemValidacaoMaximo";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_MINIMO: string = "MensagemValidacaoMinimo";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO_INTERVALO: string = "MensagemValidacaoIntervalo";
        //#endregion
    }
    export class ValidacaoUFAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoUFAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoUnicoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacaoAsync
    {
        //#region Private Fields
        private _isIgnorarNulo: boolean  = false;
        private _isIgnorarZero: boolean  = false;
        private _operadorFiltro: Snebur.Dominio.Atributos.EnumOperadorComparacao  = Snebur.Dominio.Atributos.EnumOperadorComparacao.Undefined;
        private _isUnique: boolean  = false;
        private _nomePropriedadeFiltro: string | null  = null;
        private _valorPropriedadeFiltro: any | null  = null;
        private _tipoEntidade: r.BaseTipo | string | null  = null;
        //#endregion
        
        public constructor(tipoEntidade: r.BaseTipo | string, isIgnorarNulo: boolean, isIgnorarZero: boolean, nomePropriedadeFiltro: string, valorPropriedadeFiltro: any, operadorFiltro: Snebur.Dominio.Atributos.EnumOperadorComparacao) 
        {
            super();
            Guard.NotNull( isIgnorarNulo, "The argument isIgnorarNulo cannot be null.");
            Guard.NotNull( isIgnorarZero, "The argument isIgnorarZero cannot be null.");
            Guard.NotNull( operadorFiltro, "The argument operadorFiltro cannot be null.");
            this._tipoEntidade = tipoEntidade;
            this._isIgnorarNulo = isIgnorarNulo;
            this._isIgnorarZero = isIgnorarZero;
            this._nomePropriedadeFiltro = nomePropriedadeFiltro;
            this._valorPropriedadeFiltro = valorPropriedadeFiltro;
            this._operadorFiltro = operadorFiltro;
        }
        
        
        public get IsIgnorarNulo(): boolean
        {
            return this._isIgnorarNulo;
        }
        public set IsIgnorarNulo(value: boolean) 
        {
            this.SetProperty("IsIgnorarNulo", this._isIgnorarNulo, this._isIgnorarNulo = value);
        }
        
        public get IsIgnorarZero(): boolean
        {
            return this._isIgnorarZero;
        }
        public set IsIgnorarZero(value: boolean) 
        {
            this.SetProperty("IsIgnorarZero", this._isIgnorarZero, this._isIgnorarZero = value);
        }
        
        public get OperadorFiltro(): Snebur.Dominio.Atributos.EnumOperadorComparacao
        {
            return this._operadorFiltro;
        }
        
        public get IsUnique(): boolean
        {
            return this._isUnique;
        }
        
        public get NomePropriedadeFiltro(): string | null
        {
            return this._nomePropriedadeFiltro;
        }
        
        public get ValorPropriedadeFiltro(): any | null
        {
            return this._valorPropriedadeFiltro;
        }
        
        public get TipoEntidade(): r.BaseTipo | string | null
        {
            return this._tipoEntidade;
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O {0} '{1}' já existe.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoUnicoCompostaAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacaoAsync
    {
        //#region Private Fields
        private _isCriarIndicesNomeBanco: boolean  = false;
        private _isUnique: boolean  = false;
        private _tipoEntidade: r.BaseTipo | string  = "";
        //#endregion
        
        public constructor(tipoEntidade: r.BaseTipo | string, expressoesPropriedadeFiltro: Array<string>) 
        {
            super();
            Guard.NotNull( tipoEntidade, "The argument tipoEntidade cannot be null.");
            Guard.NotNull( expressoesPropriedadeFiltro, "The argument expressoesPropriedadeFiltro cannot be null.");
            this._tipoEntidade = tipoEntidade;
            this.ExpressoesPropriedadeFiltro.AddRange(expressoesPropriedadeFiltro);
        }
        
        
        public get IsCriarIndicesNomeBanco(): boolean
        {
            return this._isCriarIndicesNomeBanco;
        }
        public set IsCriarIndicesNomeBanco(value: boolean) 
        {
            this.SetProperty("IsCriarIndicesNomeBanco", this._isCriarIndicesNomeBanco, this._isCriarIndicesNomeBanco = value);
        }
        
        public get IsUnique(): boolean
        {
            return this._isUnique;
        }
        
        public get TipoEntidade(): r.BaseTipo | string
        {
            return this._tipoEntidade;
        }
        public readonly ExpressoesPropriedadeFiltro = new Array<string>();
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O {0} '{1}' já existe.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoUrlAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoUrlAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "A url {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValidacaoVersaoAttribute  extends Snebur.Dominio.Atributos.BaseAtributoValidacao
    {
        
        public constructor(inicializador?: Partial<ValidacaoVersaoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#region Static Properties
        public static readonly MensagemValidacao: string = "O campo {0} é invalido.";
        public static readonly IDENTIFICADOR_MENSAGEM_VALIDACAO: string = "MensagemValidacao";
        //#endregion
    }
    export class ValorPadraoDataHoraServidorAttribute  extends Snebur.Dominio.Atributos.SomenteLeituraAttribute  implements Snebur.Dominio.Atributos.IBaseValorPadrao
    {
        //#region Private Fields
        private _isDataHoraUTC: boolean  = false;
        private _isAceitarAtualizacao: boolean  = false;
        private _isValorPadraoOnUpdate: boolean  = false;
        private _isTipoNullableRequerido: boolean  = false;
        //#endregion
        
        public constructor(inicializador?: Partial<ValorPadraoDataHoraServidorAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IsDataHoraUTC(): boolean
        {
            return this._isDataHoraUTC;
        }
        public set IsDataHoraUTC(value: boolean) 
        {
            this.SetProperty("IsDataHoraUTC", this._isDataHoraUTC, this._isDataHoraUTC = value);
        }
        
        public get IsAceitarAtualizacao(): boolean
        {
            return this._isAceitarAtualizacao;
        }
        public set IsAceitarAtualizacao(value: boolean) 
        {
            this.SetProperty("IsAceitarAtualizacao", this._isAceitarAtualizacao, this._isAceitarAtualizacao = value);
        }
        
        public get IsValorPadraoOnUpdate(): boolean
        {
            return this._isValorPadraoOnUpdate;
        }
        public set IsValorPadraoOnUpdate(value: boolean) 
        {
            this.SetProperty("IsValorPadraoOnUpdate", this._isValorPadraoOnUpdate, this._isValorPadraoOnUpdate = value);
        }
        
        public get IsTipoNullableRequerido(): boolean
        {
            return this._isTipoNullableRequerido;
        }
    }
    export class ValorPadraoIPAttribute  extends Snebur.Dominio.Atributos.SomenteLeituraAttribute  implements Snebur.Dominio.Atributos.IBaseValorPadrao
    {
        //#region Private Fields
        private _isValorPadraoOnUpdate: boolean  = false;
        private _isTipoNullableRequerido: boolean  = false;
        //#endregion
        
        public constructor(inicializador?: Partial<ValorPadraoIPAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        
        public get IsValorPadraoOnUpdate(): boolean
        {
            return this._isValorPadraoOnUpdate;
        }
        public set IsValorPadraoOnUpdate(value: boolean) 
        {
            this.SetProperty("IsValorPadraoOnUpdate", this._isValorPadraoOnUpdate, this._isValorPadraoOnUpdate = value);
        }
        
        public get IsTipoNullableRequerido(): boolean
        {
            return this._isTipoNullableRequerido;
        }
    }
    export abstract class BaseRelacaoPaiAttribute  extends Snebur.Dominio.Atributos.RelacaoChaveEstrangeiraAttribute  implements Snebur.Dominio.Atributos.IIgnorarAlerta
    {
        //#region Private Fields
        protected _ignorarAlerta: boolean  = false;
        //#endregion
        
        public constructor(inicializador?: Partial<BaseRelacaoPaiAttribute>) 
        {
            super(inicializador);
        }
        
        public get IgnorarAlerta(): boolean
        {
            return this._ignorarAlerta;
        }
        public set IgnorarAlerta(value: boolean) 
        {
            this.SetProperty("IgnorarAlerta", this._ignorarAlerta, this._ignorarAlerta = value);
        }
    }
    export class ValidacaoDominioDNSAttribute  extends Snebur.Dominio.Atributos.ValidacaoDominioAttribute
    {
        
        public constructor(inicializador?: Partial<ValidacaoDominioDNSAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class RelacaoPaiAttribute  extends Snebur.Dominio.Atributos.BaseRelacaoPaiAttribute
    {
        //#region Private Fields
        private _tipoExclusao: Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao  = Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao.Undefined;
        private _nomePropriedadeLinkNavegacao: string | null  = null;
        //#endregion
        
        public constructor(nomePropriedadeLinkNavegacao?: string | null, tipoExclusao?: Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao) 
        {
            super();
            this._nomePropriedadeLinkNavegacao = nomePropriedadeLinkNavegacao;
            this._tipoExclusao = tipoExclusao;
        }
        
        
        public get TipoExclusao(): Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao
        {
            return this._tipoExclusao;
        }
        public set TipoExclusao(value: Snebur.Dominio.Atributos.EnumTipoExclusaoRelacao) 
        {
            this.SetProperty("TipoExclusao", this._tipoExclusao, this._tipoExclusao = value);
        }
        
        public get NomePropriedadeLinkNavegacao(): string | null
        {
            return this._nomePropriedadeLinkNavegacao;
        }
        public set NomePropriedadeLinkNavegacao(value: string | null) 
        {
            this.SetProperty("NomePropriedadeLinkNavegacao", this._nomePropriedadeLinkNavegacao, this._nomePropriedadeLinkNavegacao = value);
        }
    }
    export class RelacaoUmUmFilhoAttribute  extends Snebur.Dominio.Atributos.BaseRelacaoPaiAttribute
    {
        
        public constructor(inicializador?: Partial<RelacaoUmUmFilhoAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
    export class RelacaoUmUmPaiAttribute  extends Snebur.Dominio.Atributos.BaseRelacaoPaiAttribute
    {
        
        public constructor(inicializador?: Partial<RelacaoUmUmPaiAttribute>) 
        {
            super(inicializador);
            this.Inicializar();
        }
    }
}