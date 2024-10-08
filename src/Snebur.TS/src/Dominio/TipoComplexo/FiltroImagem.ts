﻿namespace Snebur.Dominio
{
    export class FiltroImagem extends BaseTipoComplexo
    {
        public static readonly EXPOSICAO_PADRAO: number = 0;
        public static readonly CIANO_PADRAO: number = 0;
        public static readonly MAGENTA_PADRAO: number = 0;
        public static readonly AMARELO_PADRAO: number = 0;

        public static readonly CONTRASTE_PADRAO: number = 100;
        public static readonly BRILHO_PADRAO: number = 100;
        public static readonly SATURACAO_PADRAO: number = 100;
        public static readonly SEPIA_PADRAO: number = 0;
        public static readonly PRETO_BRANCO_PADRAO: number = 0;
        public static readonly INVERTER_PADRAO: number = 0;
        public static readonly MATRIZ_PADRAO: number = 0;
        public static readonly DESFOQUE_PADRAO: number = 0;

        private _exposicao: number | null = null;
        private _ciano: number | null = null;
        private _magenta: number | null = null;
        private _amarelo: number | null = null;
        private _contraste: number | null = null;
        private _brilho: number | null = null;
        private _sepia: number | null = null;
        private _saturacao: number | null = null;
        private _pretoBranco: number | null = null;
        private _inverter: number | null = null;
        private _matriz: number | null = null;
        private _desfoque: number | null = null;

        private IsNullRetornarPadraoPadrao: boolean = false;

        public get Exposicao(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._exposicao === null)
            {
                return FiltroImagem.EXPOSICAO_PADRAO;
            }
            return this._exposicao;
        }

        public set Exposicao(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, -100, 100, "Exposicao");
            }
            const antigoValor = this._exposicao;
            this.NotificarValorPropriedadeAlterada("Exposicao", this._exposicao, this._exposicao = (value === FiltroImagem.EXPOSICAO_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Exposicao, antigoValor, value);
        }

        public get Ciano(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._ciano === null)
            {
                return FiltroImagem.CIANO_PADRAO;
            }
            return this._ciano;
        }

        public set Ciano(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, -100, 100, "Ciano");
            }

            const antigoValor = this._ciano;
            this.NotificarValorPropriedadeAlterada("Ciano", this._ciano, this._ciano = (value === FiltroImagem.CIANO_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Ciano, antigoValor, value);
        }

        public get Magenta(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._magenta === null)
            {
                return FiltroImagem.MAGENTA_PADRAO;
            }
            return this._magenta;
        }

        public set Magenta(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, -100, 100, "Magenta");
            }
            const antigoValor = this._magenta;
            this.NotificarValorPropriedadeAlterada("Magenta", this._magenta, this._magenta = (value === FiltroImagem.MAGENTA_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Magenta, antigoValor, value);
        }

        public get Amarelo(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._amarelo === null)
            {
                return FiltroImagem.AMARELO_PADRAO;
            }
            return this._amarelo;
        }

        public set Amarelo(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, -100, 100, "Amarelo");
            }
            const antigoValor = this._amarelo;
            this.NotificarValorPropriedadeAlterada("Amarelo", this._amarelo, this._amarelo = (value === FiltroImagem.MAGENTA_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Amarelo, antigoValor, value);
        }

        public get Contraste(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._contraste === null)
            {
                return FiltroImagem.CONTRASTE_PADRAO;
            }
            return this._contraste;
        }

        public set Contraste(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, 0, 200, "Contraste");
            }
            const antigoValor = this._contraste;
            this.NotificarValorPropriedadeAlterada("Contraste", this._contraste, this._contraste = (value === FiltroImagem.CONTRASTE_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Contraste, antigoValor, value);
        }

        public get Brilho(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._brilho === null)
            {
                return FiltroImagem.BRILHO_PADRAO;
            }
            return this._brilho;
        }

        public set Brilho(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, 0, 200, "Brilho");
            }
            const antigoValor = this._brilho;
            this.NotificarValorPropriedadeAlterada("Brilho", this._brilho, this._brilho = (value === FiltroImagem.BRILHO_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Brilho, antigoValor, value);
        }

        public get Sepia(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._sepia === null)
            {
                return FiltroImagem.SEPIA_PADRAO;
            }
            return this._sepia;
        }

        public set Sepia(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, 0, 100, "Sepia");
            }
            const antigoValor = this._sepia;
            this.NotificarValorPropriedadeAlterada("Sepia", this._sepia, this._sepia = (value === FiltroImagem.SEPIA_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Sepia, antigoValor, value);
        }

        public get Saturacao(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._saturacao === null)
            {
                return FiltroImagem.SATURACAO_PADRAO;
            }
            return this._saturacao;
        }

        public set Saturacao(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, 0, 200, "Saturacao");
            }
            const antigoValor = this._saturacao;
            this.NotificarValorPropriedadeAlterada("Saturacao", this._saturacao, this._saturacao = (value === FiltroImagem.SATURACAO_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Saturacao, antigoValor, value);
        }

        public get PretoBranco(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._pretoBranco === null)
            {
                return FiltroImagem.PRETO_BRANCO_PADRAO;
            }
            return this._pretoBranco;
        }

        public set PretoBranco(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, 0, 100, "PretoBranco");
            }
            const antigoValor = this._pretoBranco;
            this.NotificarValorPropriedadeAlterada("PretoBranco", this._pretoBranco, this._pretoBranco = (value === FiltroImagem.PRETO_BRANCO_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.PretoBranco, antigoValor, value);
        }

        public get Inverter(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._inverter === null)
            {
                return FiltroImagem.INVERTER_PADRAO;
            }
            return this._inverter;
        }

        public set Inverter(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, 0, 100, "Inverter");
            }
            const antigoValor = this._inverter;
            this.NotificarValorPropriedadeAlterada("Inverter", this._inverter, this._inverter = (value === FiltroImagem.INVERTER_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Inverter, antigoValor, value);
        }

        public get Matriz(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._matriz === null)
            {
                return FiltroImagem.MATRIZ_PADRAO;
            }
            return this._matriz;
        }

        public set Matriz(value: number)
        {
            if (value !== null) u.ValidacaoUtil.ValidarIntervalo(value, -360, 360, "Matriz");
            const antigoValor = this._matriz;
            this.NotificarValorPropriedadeAlterada("Matriz", this._matriz, this._matriz = (value === FiltroImagem.MATRIZ_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Matriz, antigoValor, value);
        }

        public get Desfoque(): number
        {
            if (this.IsNullRetornarPadraoPadrao && this._desfoque === null)
            {
                return FiltroImagem.DESFOQUE_PADRAO;
            }
            return this._desfoque;
        }

        public set Desfoque(value: number)
        {
            if (value !== null)
            {
                u.ValidacaoUtil.ValidarIntervalo(value, 0, 10, "Desfoque");
            }
            const antigoValor = this._desfoque;
            this.NotificarValorPropriedadeAlterada("Desfoque", this._desfoque, this._desfoque = (value === FiltroImagem.DESFOQUE_PADRAO) ? null : value);
            this.NotificarAjusteAlterado(EnumFiltroImagem.Desfoque, antigoValor, value);
        }

        public get IsExisteFiltro()
        {
            const isNotDefault = function (valor: any, valorPadrao: any)
            {
                return valor != null && valor !== valorPadrao;
            };

            return isNotDefault(this._exposicao, FiltroImagem.EXPOSICAO_PADRAO) ||
                isNotDefault(this._magenta, FiltroImagem.MAGENTA_PADRAO) ||
                isNotDefault(this._ciano, FiltroImagem.CIANO_PADRAO) ||
                isNotDefault(this._amarelo, FiltroImagem.AMARELO_PADRAO) ||
                isNotDefault(this._contraste, FiltroImagem.CONTRASTE_PADRAO) ||
                isNotDefault(this._brilho, FiltroImagem.BRILHO_PADRAO) ||
                isNotDefault(this._saturacao, FiltroImagem.SATURACAO_PADRAO) ||
                isNotDefault(this._sepia, FiltroImagem.SEPIA_PADRAO) ||
                isNotDefault(this._pretoBranco, FiltroImagem.PRETO_BRANCO_PADRAO) ||
                isNotDefault(this._inverter, FiltroImagem.INVERTER_PADRAO) ||
                isNotDefault(this._matriz, FiltroImagem.MATRIZ_PADRAO) ||
                isNotDefault(this._desfoque, FiltroImagem.DESFOQUE_PADRAO);
        }

        public readonly EventoAjusteAlterado = new Evento<AjusteEventArgs>(this);
        public readonly EventoAjusteModificando = new Evento<AjusteEventArgs>(this);

        public constructor()
        public constructor(inicializar: Partial<FiltroImagem>)
        public constructor(inicializar?: Partial<FiltroImagem>)
        {
            super();

            if (inicializar)
            {
                Object.assign(this, inicializar);
            }
        }

        public Clone(isTipar?: boolean): FiltroImagem
        public Clone(isTipar: false): IFiltroImagem
        public Clone(isTipar: boolean = true): IFiltroImagem | FiltroImagem
        {
            const filtroImagem: IFiltroImagem = {
                Exposicao: this._exposicao,
                Magenta: this._magenta,
                Ciano: this._ciano,
                Amarelo: this._amarelo,
                Contraste: this._contraste,
                Brilho: this._brilho,
                Saturacao: this._saturacao,
                Sepia: this._sepia,
                PretoBranco: this._pretoBranco,
                Inverter: this._inverter,
                Matriz: this._matriz,
                Desfoque: this._desfoque
            };

            if (isTipar)
            {
                return new FiltroImagem(filtroImagem);
            }

            if (this.IsExisteFiltro)
            {
                u.ReflexaoUtil.DeletarPropriedadesNulas(filtroImagem);
                return filtroImagem;
            }
            return null;
        }


        public Equals(filtroImagem: FiltroImagem): boolean
        {
            if (filtroImagem instanceof FiltroImagem)
            {
                return this._exposicao === filtroImagem._exposicao &&
                    this._magenta === filtroImagem._magenta &&
                    this._ciano === filtroImagem._ciano &&
                    this._amarelo === filtroImagem._amarelo &&
                    this._contraste === filtroImagem._contraste &&
                    this._brilho === filtroImagem._brilho &&
                    this._saturacao === filtroImagem._saturacao &&
                    this._sepia === filtroImagem._sepia &&
                    this._pretoBranco === filtroImagem._pretoBranco &&
                    this._inverter === filtroImagem._inverter &&
                    this._matriz === filtroImagem._matriz &&
                    this._desfoque === filtroImagem._desfoque;
            }
            return false;
        }

        private NotificarAjusteAlterado(filtro: d.EnumFiltroImagem, antigoValor: number, novoValor: number)
        {
            const args = new AjusteEventArgs(filtro, antigoValor, novoValor);
            this.EventoAjusteAlterado.Notificar(this, args);
        }
         
        public Serializar(): string | null
        {
            if (this.IsExisteFiltro)
            {
                return JSON.stringify(this.PartialFiltroImagem);
            }
            return null;
        }

        public get PartialFiltroImagem(): Partial<d.FiltroImagem>
        {
            const filtro = {} as Partial<d.FiltroImagem>;
            const setValor = function (destino: any, expressaoPropriedade: (value: d.FiltroImagem) => any, valor: any, valorPadrao: any)
            {
                if (valor != null && valor !== valorPadrao)
                {
                    const propriedade = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoPropriedade);
                    destino[propriedade] = valor;
                }
            };

            setValor(filtro, x => x.Exposicao, this._exposicao, FiltroImagem.EXPOSICAO_PADRAO);
            setValor(filtro, x => x.Magenta, this._magenta, FiltroImagem.MAGENTA_PADRAO);
            setValor(filtro, x => x.Ciano, this._ciano, FiltroImagem.CIANO_PADRAO);
            setValor(filtro, x => x.Amarelo, this._amarelo, FiltroImagem.AMARELO_PADRAO);
            setValor(filtro, x => x.Contraste, this._contraste, FiltroImagem.CONTRASTE_PADRAO);
            setValor(filtro, x => x.Brilho, this._brilho, FiltroImagem.BRILHO_PADRAO);
            setValor(filtro, x => x.Saturacao, this._saturacao, FiltroImagem.SATURACAO_PADRAO);
            setValor(filtro, x => x.Sepia, this._sepia, FiltroImagem.SEPIA_PADRAO);
            setValor(filtro, x => x.PretoBranco, this._pretoBranco, FiltroImagem.PRETO_BRANCO_PADRAO);
            setValor(filtro, x => x.Inverter, this._inverter, FiltroImagem.INVERTER_PADRAO);
            setValor(filtro, x => x.Matriz, this._matriz, FiltroImagem.MATRIZ_PADRAO);
            setValor(filtro, x => x.Desfoque, this._desfoque, FiltroImagem.DESFOQUE_PADRAO);

            return filtro;
        }

        public override toString()
        {
            const filtroInterno = this.PartialFiltroImagem;
            const sb = new StringBuilder();
            for (const key in filtroInterno)
            {
                sb.Append(`${key}: ${(filtroInterno as any)[key]}`);
            }
            return sb.ToString(";");
        }

        public RetornarFormatacao(filtro: d.EnumFiltroImagem): EnumFormatacao
        {
            switch (filtro)
            {
                case  d.EnumFiltroImagem.Exposicao :
                case d.EnumFiltroImagem.Ciano :
                case d.EnumFiltroImagem.Magenta: 
                case d.EnumFiltroImagem.Amarelo: 
                case d.EnumFiltroImagem.Contraste: 
                case d.EnumFiltroImagem.Brilho: 
                case d.EnumFiltroImagem.Sepia: 
                case d.EnumFiltroImagem.Saturacao: 
                case d.EnumFiltroImagem.PretoBranco: 
                case d.EnumFiltroImagem.Inverter: 
                case d.EnumFiltroImagem.Desfoque:
                    return EnumFormatacao.Porcentagem;
                case d.EnumFiltroImagem.Matriz:
                    return EnumFormatacao.Grau;
                default:
                    throw new Erro("filtro imagem não suportado: "  + filtro);
            }
        }
        
    }

    export class AjusteEventArgs extends EventArgs
    {
        public constructor(
            public readonly Filtro: EnumFiltroImagem,
            public readonly AntigooValor: number,
            public readonly NovoValor: number
        )
        {
            super();
        }
    }

    //export enum EnumFiltroImagem {
    //    Exposicao,
    //    Ciano,
    //    Magenta,
    //    Amarelo,
    //    Contraste,
    //    Brilho,
    //    Sepia,
    //    Saturacao,
    //    PretoBranco,
    //    Inverter,
    //    Matriz,
    //    Desfoque
    //}
}