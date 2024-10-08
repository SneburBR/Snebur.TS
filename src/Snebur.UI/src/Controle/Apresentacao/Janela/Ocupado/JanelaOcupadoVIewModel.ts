﻿namespace Snebur.UI
{
    export class JanelaOcupadoViewModel extends Snebur.Dominio.BaseViewModel
    {
        public static readonly TITULO_PADRAO: string = "Aguarde!";
        public static readonly MENSAGEM_PADRAO: String = "Carregando...";

        public Titulo: string;
        public Mensagem: String;
        public Progresso: number = 0;

        public constructor(titulo: string, mensagem: string)
        {
            super();

            this.DeclararPropriedade(x => x.Titulo, String);
            this.DeclararPropriedade(x => x.Mensagem, String);
            this.DeclararPropriedade(x => x.Progresso, Number);

            this.Titulo = titulo ?? JanelaOcupadoViewModel.TITULO_PADRAO;
            this.Mensagem = mensagem ?? JanelaOcupadoViewModel.MENSAGEM_PADRAO;
        }
    }
}