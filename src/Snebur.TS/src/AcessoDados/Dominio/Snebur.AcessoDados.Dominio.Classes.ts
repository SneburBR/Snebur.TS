/*eslint-disable*/
//@Artifact: Classes
//@Project: Snebur.AcessoDados 
//@Namespace: Snebur.AcessoDados.Dominio 
//@PrioridadeDominio: 2
//@Globalizar: False 
//@Dominios dependentes: []
//@DataHora: 2025-10-06 17:01:42

namespace Snebur.AcessoDados
{
    export abstract class BaseAcessoDados  extends Snebur.Dominio.BaseDominio
    {
        //#region Private Fields
        protected _falhaAutenticacao: boolean  = false;
        protected _mensagemErro: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<BaseAcessoDados>) 
        {
            super(inicializador);
        }
        
        public get FalhaAutenticacao(): boolean
        {
            return this._falhaAutenticacao;
        }
        public set FalhaAutenticacao(value: boolean) 
        {
            this.SetProperty("FalhaAutenticacao", this._falhaAutenticacao, this._falhaAutenticacao = value);
        }
        
        public get MensagemErro(): string | null
        {
            return this._mensagemErro;
        }
        public set MensagemErro(value: string | null) 
        {
            this.SetProperty("MensagemErro", this._mensagemErro, this._mensagemErro = value);
        }
        public readonly Comandos = new Array<string>();
    }
    export abstract class BaseFiltro  extends Snebur.AcessoDados.BaseAcessoDados
    {
        
        public constructor(inicializador?: Partial<BaseFiltro>) 
        {
            super(inicializador);
        }
    }
    export abstract class BaseRelacaoAberta  extends Snebur.AcessoDados.BaseAcessoDados
    {
        //#region Private Fields
        protected _caminhoPropriedade: string | null  = null;
        protected _nomeTipoEntidade: string | null  = null;
        protected _nomeTipoDeclarado: string | null  = null;
        protected _tipoEntidadeAssemblyQualifiedName: string | null  = null;
        protected _tipoDeclaradoAssemblyQualifiedName: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<BaseRelacaoAberta>) 
        {
            super(inicializador);
        }
        
        public get CaminhoPropriedade(): string | null
        {
            return this._caminhoPropriedade;
        }
        public set CaminhoPropriedade(value: string | null) 
        {
            this.SetProperty("CaminhoPropriedade", this._caminhoPropriedade, this._caminhoPropriedade = value);
        }
        
        public get NomeTipoEntidade(): string | null
        {
            return this._nomeTipoEntidade;
        }
        public set NomeTipoEntidade(value: string | null) 
        {
            this.SetProperty("NomeTipoEntidade", this._nomeTipoEntidade, this._nomeTipoEntidade = value);
        }
        
        public get NomeTipoDeclarado(): string | null
        {
            return this._nomeTipoDeclarado;
        }
        public set NomeTipoDeclarado(value: string | null) 
        {
            this.SetProperty("NomeTipoDeclarado", this._nomeTipoDeclarado, this._nomeTipoDeclarado = value);
        }
        
        public get TipoEntidadeAssemblyQualifiedName(): string | null
        {
            return this._tipoEntidadeAssemblyQualifiedName;
        }
        public set TipoEntidadeAssemblyQualifiedName(value: string | null) 
        {
            this.SetProperty("TipoEntidadeAssemblyQualifiedName", this._tipoEntidadeAssemblyQualifiedName, this._tipoEntidadeAssemblyQualifiedName = value);
        }
        
        public get TipoDeclaradoAssemblyQualifiedName(): string | null
        {
            return this._tipoDeclaradoAssemblyQualifiedName;
        }
        public set TipoDeclaradoAssemblyQualifiedName(value: string | null) 
        {
            this.SetProperty("TipoDeclaradoAssemblyQualifiedName", this._tipoDeclaradoAssemblyQualifiedName, this._tipoDeclaradoAssemblyQualifiedName = value);
        }
        public readonly PropriedadesAbertas = new HashSet<string>();
    }
    export class ConsultaFiltroColecao  extends Snebur.AcessoDados.BaseAcessoDados
    {
        //#region Private Fields
        private _relacao: string | null  = null;
        private _estruturaConsulta: Snebur.AcessoDados.EstruturaConsulta | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<ConsultaFiltroColecao>) 
        {
            super(inicializador);
        }
        
        public get Relacao(): string | null
        {
            return this._relacao;
        }
        public set Relacao(value: string | null) 
        {
            this.SetProperty("Relacao", this._relacao, this._relacao = value);
        }
        
        public get EstruturaConsulta(): Snebur.AcessoDados.EstruturaConsulta | null
        {
            return this._estruturaConsulta;
        }
        public set EstruturaConsulta(value: Snebur.AcessoDados.EstruturaConsulta | null) 
        {
            this.SetProperty("EstruturaConsulta", this._estruturaConsulta, this._estruturaConsulta = value);
        }
    }
    export class EntidadeSalvaInfo  extends Snebur.AcessoDados.BaseAcessoDados
    {
        //#region Private Fields
        private _id: number  = 0;
        private _identificadorUnicoEntidade: string  = "00000000-0000-0000-0000-000000000000";
        private _caminhoTipoEntidadeSalva: string  = "";
        //#endregion
        
        public constructor(inicializador?: Partial<EntidadeSalvaInfo>) 
        {
            super(inicializador);
        }
        
        public get Id(): number
        {
            return this._id;
        }
        public set Id(value: number) 
        {
            this.SetProperty("Id", this._id, this._id = value);
        }
        
        public get IdentificadorUnicoEntidade(): string
        {
            return this._identificadorUnicoEntidade;
        }
        public set IdentificadorUnicoEntidade(value: string) 
        {
            this.SetProperty("IdentificadorUnicoEntidade", this._identificadorUnicoEntidade, this._identificadorUnicoEntidade = value);
        }
        
        public get CaminhoTipoEntidadeSalva(): string
        {
            return this._caminhoTipoEntidadeSalva;
        }
        public set CaminhoTipoEntidadeSalva(value: string) 
        {
            this.SetProperty("CaminhoTipoEntidadeSalva", this._caminhoTipoEntidadeSalva, this._caminhoTipoEntidadeSalva = value);
        }
        public readonly PropriedadesComputada = new Array<Snebur.AcessoDados.PropriedadeComputada>();
    }
    export class EstruturaConsulta  extends Snebur.AcessoDados.BaseAcessoDados  implements Snebur.AcessoDados.Seguranca.IEstruturaConsultaSeguranca
    {
        //#region Private Fields
        private _isIncluirDeletados: boolean  = false;
        private _isIncluirInativos: boolean  = false;
        private _isDesativarOrdenacao: boolean  = false;
        private _take: number  = 0;
        private _skip: number  = 0;
        private _paginaAtual: number  = 0;
        private _tipoFuncaoEnum: Snebur.AcessoDados.EnumTipoFuncao  = Snebur.AcessoDados.EnumTipoFuncao.Undefined;
        private _contarRegistros: boolean  = false;
        private _nomeTipoEntidade: string | null  = null;
        private _tipoEntidadeAssemblyQualifiedName: string | null  = null;
        private _caminhoPropriedadeFuncao: string | null  = null;
        private _filtroGrupoE: Snebur.AcessoDados.FiltroGrupoE  = new Snebur.AcessoDados.FiltroGrupoE();
        private _filtroGrupoOU: Snebur.AcessoDados.FiltroGrupoOU  = new Snebur.AcessoDados.FiltroGrupoOU();
        //#endregion
        
        public constructor(inicializador?: Partial<EstruturaConsulta>) 
        {
            super(inicializador);
        }
        
        public get IsIncluirDeletados(): boolean
        {
            return this._isIncluirDeletados;
        }
        public set IsIncluirDeletados(value: boolean) 
        {
            this.SetProperty("IsIncluirDeletados", this._isIncluirDeletados, this._isIncluirDeletados = value);
        }
        
        public get IsIncluirInativos(): boolean
        {
            return this._isIncluirInativos;
        }
        public set IsIncluirInativos(value: boolean) 
        {
            this.SetProperty("IsIncluirInativos", this._isIncluirInativos, this._isIncluirInativos = value);
        }
        
        public get IsDesativarOrdenacao(): boolean
        {
            return this._isDesativarOrdenacao;
        }
        public set IsDesativarOrdenacao(value: boolean) 
        {
            this.SetProperty("IsDesativarOrdenacao", this._isDesativarOrdenacao, this._isDesativarOrdenacao = value);
        }
        
        public get Take(): number
        {
            return this._take;
        }
        public set Take(value: number) 
        {
            this.SetProperty("Take", this._take, this._take = value);
        }
        
        public get Skip(): number
        {
            return this._skip;
        }
        public set Skip(value: number) 
        {
            this.SetProperty("Skip", this._skip, this._skip = value);
        }
        
        public get PaginaAtual(): number
        {
            return this._paginaAtual;
        }
        public set PaginaAtual(value: number) 
        {
            this.SetProperty("PaginaAtual", this._paginaAtual, this._paginaAtual = value);
        }
        
        public get TipoFuncaoEnum(): Snebur.AcessoDados.EnumTipoFuncao
        {
            return this._tipoFuncaoEnum;
        }
        public set TipoFuncaoEnum(value: Snebur.AcessoDados.EnumTipoFuncao) 
        {
            this.SetProperty("TipoFuncaoEnum", this._tipoFuncaoEnum, this._tipoFuncaoEnum = value);
        }
        
        public get ContarRegistros(): boolean
        {
            return this._contarRegistros;
        }
        public set ContarRegistros(value: boolean) 
        {
            this.SetProperty("ContarRegistros", this._contarRegistros, this._contarRegistros = value);
        }
        
        public get NomeTipoEntidade(): string | null
        {
            return this._nomeTipoEntidade;
        }
        public set NomeTipoEntidade(value: string | null) 
        {
            this.SetProperty("NomeTipoEntidade", this._nomeTipoEntidade, this._nomeTipoEntidade = value);
        }
        
        public get TipoEntidadeAssemblyQualifiedName(): string | null
        {
            return this._tipoEntidadeAssemblyQualifiedName;
        }
        public set TipoEntidadeAssemblyQualifiedName(value: string | null) 
        {
            this.SetProperty("TipoEntidadeAssemblyQualifiedName", this._tipoEntidadeAssemblyQualifiedName, this._tipoEntidadeAssemblyQualifiedName = value);
        }
        
        public get CaminhoPropriedadeFuncao(): string | null
        {
            return this._caminhoPropriedadeFuncao;
        }
        public set CaminhoPropriedadeFuncao(value: string | null) 
        {
            this.SetProperty("CaminhoPropriedadeFuncao", this._caminhoPropriedadeFuncao, this._caminhoPropriedadeFuncao = value);
        }
        
        public get FiltroGrupoE(): Snebur.AcessoDados.FiltroGrupoE
        {
            return this._filtroGrupoE;
        }
        public set FiltroGrupoE(value: Snebur.AcessoDados.FiltroGrupoE) 
        {
            this.SetProperty("FiltroGrupoE", this._filtroGrupoE, this._filtroGrupoE = value);
        }
        
        public get FiltroGrupoOU(): Snebur.AcessoDados.FiltroGrupoOU
        {
            return this._filtroGrupoOU;
        }
        public set FiltroGrupoOU(value: Snebur.AcessoDados.FiltroGrupoOU) 
        {
            this.SetProperty("FiltroGrupoOU", this._filtroGrupoOU, this._filtroGrupoOU = value);
        }
        public readonly PropriedadesAbertas = new Array<string>();
        public readonly Ordenacoes = new DicionarioSimples<Snebur.AcessoDados.Ordenacao, string>();
        public readonly RelacoesAbertaFiltro = new DicionarioSimples<Snebur.AcessoDados.RelacaoAbertaEntidade, string>();
        public readonly RelacoesAberta = new DicionarioSimples<Snebur.AcessoDados.RelacaoAbertaEntidade, string>();
        public readonly ColecoesAberta = new DicionarioSimples<Snebur.AcessoDados.RelacaoAbertaColecao, string>();
    }
    export class Ordenacao  extends Snebur.AcessoDados.BaseAcessoDados
    {
        //#region Private Fields
        private _sentidoOrdenacaoEnum: Snebur.Dominio.EnumSentidoOrdenacao  = Snebur.Dominio.EnumSentidoOrdenacao.Undefined;
        private _caminhoPropriedade: string | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<Ordenacao>) 
        {
            super(inicializador);
        }
        
        public get SentidoOrdenacaoEnum(): Snebur.Dominio.EnumSentidoOrdenacao
        {
            return this._sentidoOrdenacaoEnum;
        }
        public set SentidoOrdenacaoEnum(value: Snebur.Dominio.EnumSentidoOrdenacao) 
        {
            this.SetProperty("SentidoOrdenacaoEnum", this._sentidoOrdenacaoEnum, this._sentidoOrdenacaoEnum = value);
        }
        
        public get CaminhoPropriedade(): string | null
        {
            return this._caminhoPropriedade;
        }
        public set CaminhoPropriedade(value: string | null) 
        {
            this.SetProperty("CaminhoPropriedade", this._caminhoPropriedade, this._caminhoPropriedade = value);
        }
    }
    export class PropriedadeComputada  extends Snebur.AcessoDados.BaseAcessoDados
    {
        //#region Private Fields
        private _nomePropriedade: string  = "";
        private _valor: any | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<PropriedadeComputada>) 
        {
            super(inicializador);
        }
        
        public get NomePropriedade(): string
        {
            return this._nomePropriedade;
        }
        public set NomePropriedade(value: string) 
        {
            this.SetProperty("NomePropriedade", this._nomePropriedade, this._nomePropriedade = value);
        }
        
        public get Valor(): any | null
        {
            return this._valor;
        }
        public set Valor(value: any | null) 
        {
            this.SetProperty("Valor", this._valor, this._valor = value);
        }
    }
    export abstract class Resultado  extends Snebur.AcessoDados.BaseAcessoDados
    {
        //#region Private Fields
        protected _isSucesso: boolean  = false;
        protected _permissao: Snebur.AcessoDados.Seguranca.EnumPermissao  = Snebur.AcessoDados.Seguranca.EnumPermissao.Undefined;
        //#endregion
        
        public constructor(inicializador?: Partial<Resultado>) 
        {
            super(inicializador);
        }
        
        public get IsSucesso(): boolean
        {
            return this._isSucesso;
        }
        public set IsSucesso(value: boolean) 
        {
            this.SetProperty("IsSucesso", this._isSucesso, this._isSucesso = value);
        }
        
        public get Permissao(): Snebur.AcessoDados.Seguranca.EnumPermissao
        {
            return this._permissao;
        }
        public set Permissao(value: Snebur.AcessoDados.Seguranca.EnumPermissao) 
        {
            this.SetProperty("Permissao", this._permissao, this._permissao = value);
        }
    }
    export abstract class BaseFiltroGrupo  extends Snebur.AcessoDados.BaseFiltro
    {
        
        public constructor(inicializador?: Partial<BaseFiltroGrupo>) 
        {
            super(inicializador);
        }
        public readonly Filtros = new Array<Snebur.AcessoDados.BaseFiltro>();
    }
    export class FiltroIds  extends Snebur.AcessoDados.BaseFiltro
    {
        
        public constructor(ids: Array<number>) 
        {
            super();
            Guard.NotNull( ids, "The argument ids cannot be null.");
            this.Ids.AddRange(ids);
        }
        
        public readonly Ids = new Array<number>();
    }
    export class FiltroPropriedade  extends Snebur.AcessoDados.BaseFiltro
    {
        //#region Private Fields
        private _tipoPrimarioEnum: Snebur.Reflexao.EnumTipoPrimario  = Snebur.Reflexao.EnumTipoPrimario.Undefined;
        private _operador: Snebur.AcessoDados.EnumOperadorFiltro  = Snebur.AcessoDados.EnumOperadorFiltro.Undefined;
        private _caminhoPropriedade: string | null  = null;
        private _valor: any | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<FiltroPropriedade>) 
        {
            super(inicializador);
        }
        
        public get TipoPrimarioEnum(): Snebur.Reflexao.EnumTipoPrimario
        {
            return this._tipoPrimarioEnum;
        }
        public set TipoPrimarioEnum(value: Snebur.Reflexao.EnumTipoPrimario) 
        {
            this.SetProperty("TipoPrimarioEnum", this._tipoPrimarioEnum, this._tipoPrimarioEnum = value);
        }
        
        public get Operador(): Snebur.AcessoDados.EnumOperadorFiltro
        {
            return this._operador;
        }
        public set Operador(value: Snebur.AcessoDados.EnumOperadorFiltro) 
        {
            this.SetProperty("Operador", this._operador, this._operador = value);
        }
        
        public get CaminhoPropriedade(): string | null
        {
            return this._caminhoPropriedade;
        }
        public set CaminhoPropriedade(value: string | null) 
        {
            this.SetProperty("CaminhoPropriedade", this._caminhoPropriedade, this._caminhoPropriedade = value);
        }
        
        public get Valor(): any | null
        {
            return this._valor;
        }
        public set Valor(value: any | null) 
        {
            this.SetProperty("Valor", this._valor, this._valor = value);
        }
    }
    export class FiltroPropriedadeIn  extends Snebur.AcessoDados.BaseFiltro
    {
        //#region Private Fields
        private _caminhoPropriedade: string | null  = null;
        //#endregion
        
        public constructor(caminhoPropriedade: string, lista: Array<string>) 
        {
            super();
            Guard.NotNull( caminhoPropriedade, "The argument caminhoPropriedade cannot be null.");
            Guard.NotNull( lista, "The argument lista cannot be null.");
            this._caminhoPropriedade = caminhoPropriedade;
            this.Lista.AddRange(lista);
        }
        
        
        public get CaminhoPropriedade(): string | null
        {
            return this._caminhoPropriedade;
        }
        public set CaminhoPropriedade(value: string | null) 
        {
            this.SetProperty("CaminhoPropriedade", this._caminhoPropriedade, this._caminhoPropriedade = value);
        }
        public readonly Lista = new Array<string>();
    }
    export class RelacaoAbertaColecao  extends Snebur.AcessoDados.BaseRelacaoAberta
    {
        //#region Private Fields
        private _estruturaConsulta: Snebur.AcessoDados.EstruturaConsulta | null  = null;
        //#endregion
        
        public constructor(inicializador?: Partial<RelacaoAbertaColecao>) 
        {
            super(inicializador);
        }
        
        public get EstruturaConsulta(): Snebur.AcessoDados.EstruturaConsulta | null
        {
            return this._estruturaConsulta;
        }
        public set EstruturaConsulta(value: Snebur.AcessoDados.EstruturaConsulta | null) 
        {
            this.SetProperty("EstruturaConsulta", this._estruturaConsulta, this._estruturaConsulta = value);
        }
    }
    export class RelacaoAbertaEntidade  extends Snebur.AcessoDados.BaseRelacaoAberta
    {
        
        public constructor(inicializador?: Partial<RelacaoAbertaEntidade>) 
        {
            super(inicializador);
        }
    }
    export class ResultadoConsulta  extends Snebur.AcessoDados.Resultado
    {
        //#region Private Fields
        private _totalRegistros: number  = 0;
        //#endregion
        
        public constructor(inicializador?: Partial<ResultadoConsulta>) 
        {
            super(inicializador);
        }
        
        public get TotalRegistros(): number
        {
            return this._totalRegistros;
        }
        public set TotalRegistros(value: number) 
        {
            this.SetProperty("TotalRegistros", this._totalRegistros, this._totalRegistros = value);
        }
        public readonly Entidades = new ListaEntidades<Snebur.Dominio.IEntidade>();
    }
    export class ResultadoDeletar  extends Snebur.AcessoDados.Resultado
    {
        
        public constructor(inicializador?: Partial<ResultadoDeletar>) 
        {
            super(inicializador);
        }
    }
    export class ResultadoSalvar  extends Snebur.AcessoDados.Resultado
    {
        
        public constructor(inicializador?: Partial<ResultadoSalvar>) 
        {
            super(inicializador);
        }
        public readonly EntidadesSalvas = new Array<Snebur.AcessoDados.EntidadeSalvaInfo>();
        public readonly ErrosValidacao = new Array<Snebur.Dominio.ErroValidacaoInfo>();
    }
    export class FiltroGrupoE  extends Snebur.AcessoDados.BaseFiltroGrupo
    {
        
        public constructor(inicializador?: Partial<FiltroGrupoE>) 
        {
            super(inicializador);
        }
    }
    export class FiltroGrupoNAO  extends Snebur.AcessoDados.BaseFiltroGrupo
    {
        
        public constructor(inicializador?: Partial<FiltroGrupoNAO>) 
        {
            super(inicializador);
        }
    }
    export class FiltroGrupoOU  extends Snebur.AcessoDados.BaseFiltroGrupo
    {
        
        public constructor(inicializador?: Partial<FiltroGrupoOU>) 
        {
            super(inicializador);
        }
    }
}