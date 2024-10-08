﻿namespace Snebur.UI
{
    export class JanelaAbrirImagemViewModel extends Snebur.Dominio.BaseViewModel
    {
        private _progresso: number = 0;
        private _totalImagens: number = 0;
        private _imagensCarregadas: number = 0;
        private _status: string = String.Empty;
        private _imagemAtual: d.IImagem;

        public get Progresso(): number
        {
            return this._progresso;
        }

        public set Progresso(value: number)
        {
            this._progresso = value;
            this.NotificarPropriedadeAlterada("Progresso", value);
        }

        public get TotalImagens(): number
        {
            return this._totalImagens;
        }

        public set TotalImagens(value: number)
        {
            this._totalImagens = value;
            this.NotificarPropriedadeAlterada("TotalImagens", value);
        }

        public get ImagensCarregada(): number
        {
            return this._imagensCarregadas;
        }

        public set ImagensCarregada(value: number)
        {
            this._imagensCarregadas = value;
            this.NotificarPropriedadeAlterada("ImagensCarregada", value);
        }

        public get Status(): string
        {
            return this._status;
        }

        public set Status(value: string)
        {
            this._status = value;
            this.NotificarPropriedadeAlterada("Status", value);
        }

        public get ImagemAtual() : d.IImagem
        {
            return this._imagemAtual;
        }

        public set ImagemAtual(value: d.IImagem)
        {
            this._imagemAtual = value;
            this.NotificarPropriedadeAlterada("ImagemAtual", value);
        }

        public constructor()
        {
            super();
        }
    }
}