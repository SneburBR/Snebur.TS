/*eslint-disable*/
//Data : sábado, 13 de agosto de 2022
//Hora : 20:17:54
//@Namespace: Snebur.Globalizacao
//@PrioridadeDominio: 1
//@Globalizar: False
//@Dominios dependentes: []

namespace Snebur.Globalizacao
{
    export class BaseGlobalizacao extends Snebur.Dominio.BaseDominio
    {
        //#region Construtor
    
        public constructor(inicializador?: Partial<BaseGlobalizacao>) 
        {
            super(inicializador);
            this.Inicializar();
        }
        //#endregion
    }
    export class Cultura extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _codigo : string = null;
        private _codigoIdioma : string = null;
        private _idioma : Snebur.Globalizacao.Idioma = null;
        private _formatacaoMoeda : Snebur.Globalizacao.FormatacaoMoeda = null;
        private _formatacaoDataHora : Snebur.Globalizacao.FormatacaoDataHora = null;
        private _formatacaoTelefone : Snebur.Globalizacao.FormatacaoTelefone = null;
        private _formatacaoEndereco : Snebur.Globalizacao.FormatacaoEndereco = null;
        private _formatacaoFiscal : Snebur.Globalizacao.FormatacaoFiscal = null;
        private _pais : Snebur.Globalizacao.Pais = null;
    
        public get Codigo(): string 
        {
            return this._codigo;
        }

        public set Codigo(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Codigo", this._codigo, this._codigo = value);
        }
    
        public get CodigoIdioma(): string 
        {
            return this._codigoIdioma;
        }

        public set CodigoIdioma(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("CodigoIdioma", this._codigoIdioma, this._codigoIdioma = value);
        }
    
        public get Idioma(): Snebur.Globalizacao.Idioma 
        {
            return this._idioma;
        }

        public set Idioma(value: Snebur.Globalizacao.Idioma)  
        {
            this.NotificarValorPropriedadeAlterada("Idioma", this._idioma, this._idioma = value);
        }
    
        public get FormatacaoMoeda(): Snebur.Globalizacao.FormatacaoMoeda 
        {
            return this._formatacaoMoeda;
        }

        public set FormatacaoMoeda(value: Snebur.Globalizacao.FormatacaoMoeda)  
        {
            this.NotificarValorPropriedadeAlterada("FormatacaoMoeda", this._formatacaoMoeda, this._formatacaoMoeda = value);
        }
    
        public get FormatacaoDataHora(): Snebur.Globalizacao.FormatacaoDataHora 
        {
            return this._formatacaoDataHora;
        }

        public set FormatacaoDataHora(value: Snebur.Globalizacao.FormatacaoDataHora)  
        {
            this.NotificarValorPropriedadeAlterada("FormatacaoDataHora", this._formatacaoDataHora, this._formatacaoDataHora = value);
        }
    
        public get FormatacaoTelefone(): Snebur.Globalizacao.FormatacaoTelefone 
        {
            return this._formatacaoTelefone;
        }

        public set FormatacaoTelefone(value: Snebur.Globalizacao.FormatacaoTelefone)  
        {
            this.NotificarValorPropriedadeAlterada("FormatacaoTelefone", this._formatacaoTelefone, this._formatacaoTelefone = value);
        }
    
        public get FormatacaoEndereco(): Snebur.Globalizacao.FormatacaoEndereco 
        {
            return this._formatacaoEndereco;
        }

        public set FormatacaoEndereco(value: Snebur.Globalizacao.FormatacaoEndereco)  
        {
            this.NotificarValorPropriedadeAlterada("FormatacaoEndereco", this._formatacaoEndereco, this._formatacaoEndereco = value);
        }
    
        public get FormatacaoFiscal(): Snebur.Globalizacao.FormatacaoFiscal 
        {
            return this._formatacaoFiscal;
        }

        public set FormatacaoFiscal(value: Snebur.Globalizacao.FormatacaoFiscal)  
        {
            this.NotificarValorPropriedadeAlterada("FormatacaoFiscal", this._formatacaoFiscal, this._formatacaoFiscal = value);
        }
    
        public get Pais(): Snebur.Globalizacao.Pais 
        {
            return this._pais;
        }

        public set Pais(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Pais", this._pais, this._pais = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class FormatacaoDataHora extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _data : string = null;
        private _hora : string = null;
        private _horaCompleta : string = null;
    
        public get Data(): string 
        {
            return this._data;
        }

        public set Data(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Data", this._data, this._data = value);
        }
    
        public get Hora(): string 
        {
            return this._hora;
        }

        public set Hora(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Hora", this._hora, this._hora = value);
        }
    
        public get HoraCompleta(): string 
        {
            return this._horaCompleta;
        }

        public set HoraCompleta(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("HoraCompleta", this._horaCompleta, this._horaCompleta = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class FormatacaoEndereco extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _codigoPostal : string = null;
    
        public get CodigoPostal(): string 
        {
            return this._codigoPostal;
        }

        public set CodigoPostal(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("CodigoPostal", this._codigoPostal, this._codigoPostal = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class FormatacaoFiscal extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _codigoFiscal : string = null;
        private _codigoFiscalEmpresa : string = null;
    
        public get CodigoFiscal(): string 
        {
            return this._codigoFiscal;
        }

        public set CodigoFiscal(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("CodigoFiscal", this._codigoFiscal, this._codigoFiscal = value);
        }
    
        public get CodigoFiscalEmpresa(): string 
        {
            return this._codigoFiscalEmpresa;
        }

        public set CodigoFiscalEmpresa(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("CodigoFiscalEmpresa", this._codigoFiscalEmpresa, this._codigoFiscalEmpresa = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class FormatacaoMoeda extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _descricao : string = null;
        private _formato : string = null;
        private _simbolo : string = null;
    
        public get Descricao(): string 
        {
            return this._descricao;
        }

        public set Descricao(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Descricao", this._descricao, this._descricao = value);
        }
    
        public get Formato(): string 
        {
            return this._formato;
        }

        public set Formato(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Formato", this._formato, this._formato = value);
        }
    
        public get Simbolo(): string 
        {
            return this._simbolo;
        }

        public set Simbolo(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Simbolo", this._simbolo, this._simbolo = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class FormatacaoTelefone extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _formatacao : string = null;
        private _formatacao2 : string = null;
    
        public get Formatacao(): string 
        {
            return this._formatacao;
        }

        public set Formatacao(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Formatacao", this._formatacao, this._formatacao = value);
        }
    
        public get Formatacao2(): string 
        {
            return this._formatacao2;
        }

        public set Formatacao2(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Formatacao2", this._formatacao2, this._formatacao2 = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class Cor extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _nome : string = null;
        private _identificador : string = null;
        private _hexa : string = null;
        private _rgb : string = null;
    
        public get Nome(): string 
        {
            return this._nome;
        }

        public set Nome(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Nome", this._nome, this._nome = value);
        }
    
        public get Identificador(): string 
        {
            return this._identificador;
        }

        public set Identificador(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Identificador", this._identificador, this._identificador = value);
        }
    
        public get Hexa(): string 
        {
            return this._hexa;
        }

        public set Hexa(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Hexa", this._hexa, this._hexa = value);
        }
    
        public get Rgb(): string 
        {
            return this._rgb;
        }

        public set Rgb(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Rgb", this._rgb, this._rgb = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class Cores extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _indigo : Snebur.Globalizacao.Cor = null;
        private _azul : Snebur.Globalizacao.Cor = null;
        private _azulClaro : Snebur.Globalizacao.Cor = null;
        private _ciano : Snebur.Globalizacao.Cor = null;
        private _cerceta : Snebur.Globalizacao.Cor = null;
        private _verde : Snebur.Globalizacao.Cor = null;
        private _verdeClaro : Snebur.Globalizacao.Cor = null;
        private _lima : Snebur.Globalizacao.Cor = null;
        private _amarelo : Snebur.Globalizacao.Cor = null;
        private _ambar : Snebur.Globalizacao.Cor = null;
        private _laranja : Snebur.Globalizacao.Cor = null;
        private _laranjaEscuro : Snebur.Globalizacao.Cor = null;
        private _vermelho : Snebur.Globalizacao.Cor = null;
        private _rosa : Snebur.Globalizacao.Cor = null;
        private _roxo : Snebur.Globalizacao.Cor = null;
        private _roxoEscuro : Snebur.Globalizacao.Cor = null;
        private _marron : Snebur.Globalizacao.Cor = null;
        private _cinzaAzulado : Snebur.Globalizacao.Cor = null;
        private _cinza : Snebur.Globalizacao.Cor = null;
    
        public get Indigo(): Snebur.Globalizacao.Cor 
        {
            return this._indigo;
        }

        public set Indigo(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Indigo", this._indigo, this._indigo = value);
        }
    
        public get Azul(): Snebur.Globalizacao.Cor 
        {
            return this._azul;
        }

        public set Azul(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Azul", this._azul, this._azul = value);
        }
    
        public get AzulClaro(): Snebur.Globalizacao.Cor 
        {
            return this._azulClaro;
        }

        public set AzulClaro(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("AzulClaro", this._azulClaro, this._azulClaro = value);
        }
    
        public get Ciano(): Snebur.Globalizacao.Cor 
        {
            return this._ciano;
        }

        public set Ciano(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Ciano", this._ciano, this._ciano = value);
        }
    
        public get Cerceta(): Snebur.Globalizacao.Cor 
        {
            return this._cerceta;
        }

        public set Cerceta(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Cerceta", this._cerceta, this._cerceta = value);
        }
    
        public get Verde(): Snebur.Globalizacao.Cor 
        {
            return this._verde;
        }

        public set Verde(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Verde", this._verde, this._verde = value);
        }
    
        public get VerdeClaro(): Snebur.Globalizacao.Cor 
        {
            return this._verdeClaro;
        }

        public set VerdeClaro(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("VerdeClaro", this._verdeClaro, this._verdeClaro = value);
        }
    
        public get Lima(): Snebur.Globalizacao.Cor 
        {
            return this._lima;
        }

        public set Lima(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Lima", this._lima, this._lima = value);
        }
    
        public get Amarelo(): Snebur.Globalizacao.Cor 
        {
            return this._amarelo;
        }

        public set Amarelo(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Amarelo", this._amarelo, this._amarelo = value);
        }
    
        public get Ambar(): Snebur.Globalizacao.Cor 
        {
            return this._ambar;
        }

        public set Ambar(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Ambar", this._ambar, this._ambar = value);
        }
    
        public get Laranja(): Snebur.Globalizacao.Cor 
        {
            return this._laranja;
        }

        public set Laranja(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Laranja", this._laranja, this._laranja = value);
        }
    
        public get LaranjaEscuro(): Snebur.Globalizacao.Cor 
        {
            return this._laranjaEscuro;
        }

        public set LaranjaEscuro(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("LaranjaEscuro", this._laranjaEscuro, this._laranjaEscuro = value);
        }
    
        public get Vermelho(): Snebur.Globalizacao.Cor 
        {
            return this._vermelho;
        }

        public set Vermelho(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Vermelho", this._vermelho, this._vermelho = value);
        }
    
        public get Rosa(): Snebur.Globalizacao.Cor 
        {
            return this._rosa;
        }

        public set Rosa(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Rosa", this._rosa, this._rosa = value);
        }
    
        public get Roxo(): Snebur.Globalizacao.Cor 
        {
            return this._roxo;
        }

        public set Roxo(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Roxo", this._roxo, this._roxo = value);
        }
    
        public get RoxoEscuro(): Snebur.Globalizacao.Cor 
        {
            return this._roxoEscuro;
        }

        public set RoxoEscuro(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("RoxoEscuro", this._roxoEscuro, this._roxoEscuro = value);
        }
    
        public get Marron(): Snebur.Globalizacao.Cor 
        {
            return this._marron;
        }

        public set Marron(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Marron", this._marron, this._marron = value);
        }
    
        public get CinzaAzulado(): Snebur.Globalizacao.Cor 
        {
            return this._cinzaAzulado;
        }

        public set CinzaAzulado(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("CinzaAzulado", this._cinzaAzulado, this._cinzaAzulado = value);
        }
    
        public get Cinza(): Snebur.Globalizacao.Cor 
        {
            return this._cinza;
        }

        public set Cinza(value: Snebur.Globalizacao.Cor)  
        {
            this.NotificarValorPropriedadeAlterada("Cinza", this._cinza, this._cinza = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class DiaSemana extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _posicao : number = 0;
        private _abreviatura : string = null;
        private _nome : string = null;
    
        public get Posicao(): number 
        {
            return this._posicao;
        }

        public set Posicao(value: number)  
        {
            this.NotificarValorPropriedadeAlterada("Posicao", this._posicao, this._posicao = value);
        }
    
        public get Abreviatura(): string 
        {
            return this._abreviatura;
        }

        public set Abreviatura(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Abreviatura", this._abreviatura, this._abreviatura = value);
        }
    
        public get Nome(): string 
        {
            return this._nome;
        }

        public set Nome(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Nome", this._nome, this._nome = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class DiasSemana extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _domingo : Snebur.Globalizacao.DiaSemana = null;
        private _segunda : Snebur.Globalizacao.DiaSemana = null;
        private _tarça : Snebur.Globalizacao.DiaSemana = null;
        private _quarta : Snebur.Globalizacao.DiaSemana = null;
        private _quinta : Snebur.Globalizacao.DiaSemana = null;
        private _sexta : Snebur.Globalizacao.DiaSemana = null;
        private _sabado : Snebur.Globalizacao.DiaSemana = null;
    
        public get Domingo(): Snebur.Globalizacao.DiaSemana 
        {
            return this._domingo;
        }

        public set Domingo(value: Snebur.Globalizacao.DiaSemana)  
        {
            this.NotificarValorPropriedadeAlterada("Domingo", this._domingo, this._domingo = value);
        }
    
        public get Segunda(): Snebur.Globalizacao.DiaSemana 
        {
            return this._segunda;
        }

        public set Segunda(value: Snebur.Globalizacao.DiaSemana)  
        {
            this.NotificarValorPropriedadeAlterada("Segunda", this._segunda, this._segunda = value);
        }
    
        public get Tarça(): Snebur.Globalizacao.DiaSemana 
        {
            return this._tarça;
        }

        public set Tarça(value: Snebur.Globalizacao.DiaSemana)  
        {
            this.NotificarValorPropriedadeAlterada("Tarça", this._tarça, this._tarça = value);
        }
    
        public get Quarta(): Snebur.Globalizacao.DiaSemana 
        {
            return this._quarta;
        }

        public set Quarta(value: Snebur.Globalizacao.DiaSemana)  
        {
            this.NotificarValorPropriedadeAlterada("Quarta", this._quarta, this._quarta = value);
        }
    
        public get Quinta(): Snebur.Globalizacao.DiaSemana 
        {
            return this._quinta;
        }

        public set Quinta(value: Snebur.Globalizacao.DiaSemana)  
        {
            this.NotificarValorPropriedadeAlterada("Quinta", this._quinta, this._quinta = value);
        }
    
        public get Sexta(): Snebur.Globalizacao.DiaSemana 
        {
            return this._sexta;
        }

        public set Sexta(value: Snebur.Globalizacao.DiaSemana)  
        {
            this.NotificarValorPropriedadeAlterada("Sexta", this._sexta, this._sexta = value);
        }
    
        public get Sabado(): Snebur.Globalizacao.DiaSemana 
        {
            return this._sabado;
        }

        public set Sabado(value: Snebur.Globalizacao.DiaSemana)  
        {
            this.NotificarValorPropriedadeAlterada("Sabado", this._sabado, this._sabado = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class Idioma extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _codigo : string = null;
        private _nome : string = null;
        private _nomeNativo : string = null;
        private _diasSemana : Snebur.Globalizacao.DiasSemana = null;
        private _meses : Snebur.Globalizacao.Meses = null;
        private _paises : Snebur.Globalizacao.Paises = null;
        private _tempoSemantico : Snebur.Globalizacao.TempoSemantico = null;
        private _cores : Snebur.Globalizacao.Cores = null;
    
        public get Codigo(): string 
        {
            return this._codigo;
        }

        public set Codigo(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Codigo", this._codigo, this._codigo = value);
        }
    
        public get Nome(): string 
        {
            return this._nome;
        }

        public set Nome(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Nome", this._nome, this._nome = value);
        }
    
        public get NomeNativo(): string 
        {
            return this._nomeNativo;
        }

        public set NomeNativo(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("NomeNativo", this._nomeNativo, this._nomeNativo = value);
        }
    
        public get DiasSemana(): Snebur.Globalizacao.DiasSemana 
        {
            return this._diasSemana;
        }

        public set DiasSemana(value: Snebur.Globalizacao.DiasSemana)  
        {
            this.NotificarValorPropriedadeAlterada("DiasSemana", this._diasSemana, this._diasSemana = value);
        }
    
        public get Meses(): Snebur.Globalizacao.Meses 
        {
            return this._meses;
        }

        public set Meses(value: Snebur.Globalizacao.Meses)  
        {
            this.NotificarValorPropriedadeAlterada("Meses", this._meses, this._meses = value);
        }
    
        public get Paises(): Snebur.Globalizacao.Paises 
        {
            return this._paises;
        }

        public set Paises(value: Snebur.Globalizacao.Paises)  
        {
            this.NotificarValorPropriedadeAlterada("Paises", this._paises, this._paises = value);
        }
    
        public get TempoSemantico(): Snebur.Globalizacao.TempoSemantico 
        {
            return this._tempoSemantico;
        }

        public set TempoSemantico(value: Snebur.Globalizacao.TempoSemantico)  
        {
            this.NotificarValorPropriedadeAlterada("TempoSemantico", this._tempoSemantico, this._tempoSemantico = value);
        }
    
        public get Cores(): Snebur.Globalizacao.Cores 
        {
            return this._cores;
        }

        public set Cores(value: Snebur.Globalizacao.Cores)  
        {
            this.NotificarValorPropriedadeAlterada("Cores", this._cores, this._cores = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class Mes extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _posicao : number = 0;
        private _abreviatura : string = null;
        private _nome : string = null;
    
        public get Posicao(): number 
        {
            return this._posicao;
        }

        public set Posicao(value: number)  
        {
            this.NotificarValorPropriedadeAlterada("Posicao", this._posicao, this._posicao = value);
        }
    
        public get Abreviatura(): string 
        {
            return this._abreviatura;
        }

        public set Abreviatura(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Abreviatura", this._abreviatura, this._abreviatura = value);
        }
    
        public get Nome(): string 
        {
            return this._nome;
        }

        public set Nome(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Nome", this._nome, this._nome = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class Meses extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _janeiro : Snebur.Globalizacao.Mes = null;
        private _fevereiro : Snebur.Globalizacao.Mes = null;
        private _marco : Snebur.Globalizacao.Mes = null;
        private _abril : Snebur.Globalizacao.Mes = null;
        private _maio : Snebur.Globalizacao.Mes = null;
        private _junho : Snebur.Globalizacao.Mes = null;
        private _julho : Snebur.Globalizacao.Mes = null;
        private _agosto : Snebur.Globalizacao.Mes = null;
        private _setembro : Snebur.Globalizacao.Mes = null;
        private _outubro : Snebur.Globalizacao.Mes = null;
        private _novembro : Snebur.Globalizacao.Mes = null;
        private _dezembro : Snebur.Globalizacao.Mes = null;
    
        public get Janeiro(): Snebur.Globalizacao.Mes 
        {
            return this._janeiro;
        }

        public set Janeiro(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Janeiro", this._janeiro, this._janeiro = value);
        }
    
        public get Fevereiro(): Snebur.Globalizacao.Mes 
        {
            return this._fevereiro;
        }

        public set Fevereiro(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Fevereiro", this._fevereiro, this._fevereiro = value);
        }
    
        public get Marco(): Snebur.Globalizacao.Mes 
        {
            return this._marco;
        }

        public set Marco(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Marco", this._marco, this._marco = value);
        }
    
        public get Abril(): Snebur.Globalizacao.Mes 
        {
            return this._abril;
        }

        public set Abril(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Abril", this._abril, this._abril = value);
        }
    
        public get Maio(): Snebur.Globalizacao.Mes 
        {
            return this._maio;
        }

        public set Maio(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Maio", this._maio, this._maio = value);
        }
    
        public get Junho(): Snebur.Globalizacao.Mes 
        {
            return this._junho;
        }

        public set Junho(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Junho", this._junho, this._junho = value);
        }
    
        public get Julho(): Snebur.Globalizacao.Mes 
        {
            return this._julho;
        }

        public set Julho(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Julho", this._julho, this._julho = value);
        }
    
        public get Agosto(): Snebur.Globalizacao.Mes 
        {
            return this._agosto;
        }

        public set Agosto(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Agosto", this._agosto, this._agosto = value);
        }
    
        public get Setembro(): Snebur.Globalizacao.Mes 
        {
            return this._setembro;
        }

        public set Setembro(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Setembro", this._setembro, this._setembro = value);
        }
    
        public get Outubro(): Snebur.Globalizacao.Mes 
        {
            return this._outubro;
        }

        public set Outubro(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Outubro", this._outubro, this._outubro = value);
        }
    
        public get Novembro(): Snebur.Globalizacao.Mes 
        {
            return this._novembro;
        }

        public set Novembro(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Novembro", this._novembro, this._novembro = value);
        }
    
        public get Dezembro(): Snebur.Globalizacao.Mes 
        {
            return this._dezembro;
        }

        public set Dezembro(value: Snebur.Globalizacao.Mes)  
        {
            this.NotificarValorPropriedadeAlterada("Dezembro", this._dezembro, this._dezembro = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class Pais extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _sigla : string = null;
        private _sigla3 : string = null;
        private _nome : string = null;
        private _ddI : string = null;
        private _idioma : string = null;
        private _cultura : string = null;
    
        public get Sigla(): string 
        {
            return this._sigla;
        }

        public set Sigla(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Sigla", this._sigla, this._sigla = value);
        }
    
        public get Sigla3(): string 
        {
            return this._sigla3;
        }

        public set Sigla3(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Sigla3", this._sigla3, this._sigla3 = value);
        }
    
        public get Nome(): string 
        {
            return this._nome;
        }

        public set Nome(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Nome", this._nome, this._nome = value);
        }
    
        public get DDI(): string 
        {
            return this._ddI;
        }

        public set DDI(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("DDI", this._ddI, this._ddI = value);
        }
    
        public get Idioma(): string 
        {
            return this._idioma;
        }

        public set Idioma(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Idioma", this._idioma, this._idioma = value);
        }
    
        public get Cultura(): string 
        {
            return this._cultura;
        }

        public set Cultura(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Cultura", this._cultura, this._cultura = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class Paises extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _brasil : Snebur.Globalizacao.Pais = null;
        private _estadosUnidos : Snebur.Globalizacao.Pais = null;
        private _canadaFR : Snebur.Globalizacao.Pais = null;
        private _canadaEN : Snebur.Globalizacao.Pais = null;
        private _mexico : Snebur.Globalizacao.Pais = null;
        private _argentina : Snebur.Globalizacao.Pais = null;
        private _paraguai : Snebur.Globalizacao.Pais = null;
        private _peru : Snebur.Globalizacao.Pais = null;
        private _bolivia : Snebur.Globalizacao.Pais = null;
        private _chile : Snebur.Globalizacao.Pais = null;
        private _venezuela : Snebur.Globalizacao.Pais = null;
        private _colombia : Snebur.Globalizacao.Pais = null;
        private _equador : Snebur.Globalizacao.Pais = null;
        private _alemanha : Snebur.Globalizacao.Pais = null;
        private _frança : Snebur.Globalizacao.Pais = null;
        private _reinoUnido : Snebur.Globalizacao.Pais = null;
        private _italia : Snebur.Globalizacao.Pais = null;
        private _espanha : Snebur.Globalizacao.Pais = null;
        private _portugual : Snebur.Globalizacao.Pais = null;
    
        public get Brasil(): Snebur.Globalizacao.Pais 
        {
            return this._brasil;
        }

        public set Brasil(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Brasil", this._brasil, this._brasil = value);
        }
    
        public get EstadosUnidos(): Snebur.Globalizacao.Pais 
        {
            return this._estadosUnidos;
        }

        public set EstadosUnidos(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("EstadosUnidos", this._estadosUnidos, this._estadosUnidos = value);
        }
    
        public get CanadaFR(): Snebur.Globalizacao.Pais 
        {
            return this._canadaFR;
        }

        public set CanadaFR(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("CanadaFR", this._canadaFR, this._canadaFR = value);
        }
    
        public get CanadaEN(): Snebur.Globalizacao.Pais 
        {
            return this._canadaEN;
        }

        public set CanadaEN(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("CanadaEN", this._canadaEN, this._canadaEN = value);
        }
    
        public get Mexico(): Snebur.Globalizacao.Pais 
        {
            return this._mexico;
        }

        public set Mexico(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Mexico", this._mexico, this._mexico = value);
        }
    
        public get Argentina(): Snebur.Globalizacao.Pais 
        {
            return this._argentina;
        }

        public set Argentina(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Argentina", this._argentina, this._argentina = value);
        }
    
        public get Paraguai(): Snebur.Globalizacao.Pais 
        {
            return this._paraguai;
        }

        public set Paraguai(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Paraguai", this._paraguai, this._paraguai = value);
        }
    
        public get Peru(): Snebur.Globalizacao.Pais 
        {
            return this._peru;
        }

        public set Peru(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Peru", this._peru, this._peru = value);
        }
    
        public get Bolivia(): Snebur.Globalizacao.Pais 
        {
            return this._bolivia;
        }

        public set Bolivia(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Bolivia", this._bolivia, this._bolivia = value);
        }
    
        public get Chile(): Snebur.Globalizacao.Pais 
        {
            return this._chile;
        }

        public set Chile(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Chile", this._chile, this._chile = value);
        }
    
        public get Venezuela(): Snebur.Globalizacao.Pais 
        {
            return this._venezuela;
        }

        public set Venezuela(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Venezuela", this._venezuela, this._venezuela = value);
        }
    
        public get Colombia(): Snebur.Globalizacao.Pais 
        {
            return this._colombia;
        }

        public set Colombia(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Colombia", this._colombia, this._colombia = value);
        }
    
        public get Equador(): Snebur.Globalizacao.Pais 
        {
            return this._equador;
        }

        public set Equador(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Equador", this._equador, this._equador = value);
        }
    
        public get Alemanha(): Snebur.Globalizacao.Pais 
        {
            return this._alemanha;
        }

        public set Alemanha(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Alemanha", this._alemanha, this._alemanha = value);
        }
    
        public get França(): Snebur.Globalizacao.Pais 
        {
            return this._frança;
        }

        public set França(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("França", this._frança, this._frança = value);
        }
    
        public get ReinoUnido(): Snebur.Globalizacao.Pais 
        {
            return this._reinoUnido;
        }

        public set ReinoUnido(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("ReinoUnido", this._reinoUnido, this._reinoUnido = value);
        }
    
        public get Italia(): Snebur.Globalizacao.Pais 
        {
            return this._italia;
        }

        public set Italia(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Italia", this._italia, this._italia = value);
        }
    
        public get Espanha(): Snebur.Globalizacao.Pais 
        {
            return this._espanha;
        }

        public set Espanha(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Espanha", this._espanha, this._espanha = value);
        }
    
        public get Portugual(): Snebur.Globalizacao.Pais 
        {
            return this._portugual;
        }

        public set Portugual(value: Snebur.Globalizacao.Pais)  
        {
            this.NotificarValorPropriedadeAlterada("Portugual", this._portugual, this._portugual = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
    export class TempoSemantico extends Snebur.Globalizacao.BaseGlobalizacao
    {
        //#region Propriedades
    
        private _agoraMesmmo : string = null;
        private _minuto : string = null;
        private _minutos : string = null;
        private _hora : string = null;
        private _horas : string = null;
        private _dia : string = null;
        private _dias : string = null;
        private _ontem : string = null;
        private _amanha : string = null;
    
        public get AgoraMesmmo(): string 
        {
            return this._agoraMesmmo;
        }

        public set AgoraMesmmo(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("AgoraMesmmo", this._agoraMesmmo, this._agoraMesmmo = value);
        }
    
        public get Minuto(): string 
        {
            return this._minuto;
        }

        public set Minuto(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Minuto", this._minuto, this._minuto = value);
        }
    
        public get Minutos(): string 
        {
            return this._minutos;
        }

        public set Minutos(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Minutos", this._minutos, this._minutos = value);
        }
    
        public get Hora(): string 
        {
            return this._hora;
        }

        public set Hora(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Hora", this._hora, this._hora = value);
        }
    
        public get Horas(): string 
        {
            return this._horas;
        }

        public set Horas(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Horas", this._horas, this._horas = value);
        }
    
        public get Dia(): string 
        {
            return this._dia;
        }

        public set Dia(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Dia", this._dia, this._dia = value);
        }
    
        public get Dias(): string 
        {
            return this._dias;
        }

        public set Dias(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Dias", this._dias, this._dias = value);
        }
    
        public get Ontem(): string 
        {
            return this._ontem;
        }

        public set Ontem(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Ontem", this._ontem, this._ontem = value);
        }
    
        public get Amanha(): string 
        {
            return this._amanha;
        }

        public set Amanha(value: string)  
        {
            this.NotificarValorPropriedadeAlterada("Amanha", this._amanha, this._amanha = value);
        }
        //#endregion
    
        //#region Construtor
    
        public constructor() 
        {
            super();
        }
        //#endregion
    }
}