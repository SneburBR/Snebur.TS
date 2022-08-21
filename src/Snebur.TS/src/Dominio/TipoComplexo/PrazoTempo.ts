﻿namespace Snebur.Dominio
{
    export class PrazoTempo extends Snebur.Dominio.BaseTipoComplexo implements Snebur.Dominio.ICaminhoTipo 
    {
        //#region Propriedades

        private _tipoPrazo: EnumTipoPrazo = EnumTipoPrazo.DiasUteis;
        private _prazo: number = 0;
        //private _prazoMinimo: number = 0;

        public get Prazo(): number
        {
            return this._prazo;
        }
        public set Prazo(value: number)
        {
            this.NotificarPropriedadeAlterada(x => x.Prazo, this._prazo, this._prazo = value);
            this.NotificarPropriedadeAlterada(x => x.Descricao);
            this.NotificarPropriedadeAlterada(x => x.Tempo);
        }

        public get IsExistePrazo(): boolean
        {
            return this.Prazo > 0 && EnumUtil.IsDefindo(EnumTipoPrazo, this.TipoPrazo);
        }
 

        public get TipoPrazo(): EnumTipoPrazo
        {
            return this._tipoPrazo;
        }
        public set TipoPrazo(value: EnumTipoPrazo)
        {
            if (this._tipoPrazo === EnumTipoPrazo.Horas &&
                value !== EnumTipoPrazo.Horas &&
                this.Prazo > 30)
            {
                this.Prazo = 0;
            }
            this.NotificarPropriedadeAlterada(x => x.TipoPrazo, this._tipoPrazo, this._tipoPrazo = value);
            this.NotificarPropriedadeAlterada(x => x.Descricao);
            this.NotificarPropriedadeAlterada(x => x.Tempo);
        }

        public get Tempo(): TimeSpan
        {
            switch (this.TipoPrazo)
            {
                case EnumTipoPrazo.DiasUteis:
                case EnumTipoPrazo.DiasCorrido:

                    return TimeSpan.FromDays(this.Prazo);

                case EnumTipoPrazo.Horas:

                    return TimeSpan.FromMilliseconds(this.Prazo);

                default:
                    throw new Erro("o tipo de prazo não é suportado");
            }
        }

        public set Tempo(value: TimeSpan)
        {
            if (value instanceof TimeSpan)
            {
                switch (this.TipoPrazo)
                {
                    case EnumTipoPrazo.DiasUteis:
                    case EnumTipoPrazo.DiasCorrido:

                        this.Prazo = value.TotalDays;
                        break;

                    case EnumTipoPrazo.Horas:

                        this.Prazo = value.TotalMilliseconds;
                        break;

                    default:
                        throw new Erro("o tipo de prazo não é suportado");
                }
            }
        }

        public get Descricao(): string
        {
            switch (this.TipoPrazo)
            {
                case EnumTipoPrazo.DiasUteis: {

                    const diasUtil = parseInt(this.Prazo);
                    if (diasUtil === 1)
                    {
                        return diasUtil.toFixed(0) + " dia útil";
                    }
                    return diasUtil.toFixed(0) + " dias úteis";
                }
                case EnumTipoPrazo.DiasCorrido: {

                    const diasCorrido = parseInt(this.Prazo);
                    if (diasCorrido === 1)
                    {
                        return diasCorrido.toFixed(0) + " dia";
                    }
                    return diasCorrido.toFixed(0) + " dias";
                }
                case EnumTipoPrazo.Horas:

                    return u.FormatacaoUtil.FormatarHoraDescricaoMin(this.Tempo);

                default:

                    throw new Erro("O tipo do prazo não é suportado");
            }
        }

        public RetornarDataPrevista(dataInicio: Date): Date
        {
            const dataFim = dataInicio.AddMilliseconds(this.Tempo.TotalMilliseconds);
            if (this.TipoPrazo === EnumTipoPrazo.DiasUteis)
            {
                const diasInuteis = u.DataHoraUtil.RetornarTotalDiasNaoUtieis(dataInicio, dataFim);
                return dataFim.AddDays(diasInuteis);
            }
            return dataFim;

        }

        //#endregion

        //#region Construtor

        public constructor(prazo: number = 0, tipoPrazo: EnumTipoPrazo = EnumTipoPrazo.DiasUteis, prazoMinimo: number | null = null) 
        {
            super();

            this.Prazo = prazo;
            this.TipoPrazo = tipoPrazo;
            //this.PrazoMinimo = prazoMinimo;
        }

        //#endregion

        public Clone(): PrazoTempo
        {
            return new PrazoTempo(this.Prazo, this.TipoPrazo/*, this.PrazoMinimo*/);
        }

        public Equals(prazoTempo: PrazoTempo): boolean
        {
            if (prazoTempo instanceof PrazoTempo)
            {
                return this.Prazo === prazoTempo.Prazo &&
                    this.TipoPrazo === prazoTempo.TipoPrazo /* &&
                    this.PrazoMinimo == prazoTempo.PrazoMinimo */;
            }
            return false;
        }
    }

}