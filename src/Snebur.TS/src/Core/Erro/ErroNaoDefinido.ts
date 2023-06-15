﻿namespace Snebur
{
    export class ErroNaoDefinido extends Erro
    {
        public constructor(mensagem: string, erroInterno?: Error)
        public constructor(mensagem: string, origem?: any, erroInterno?: Error)
        public constructor(mensagem: string, argumento1?: any, argumento2?: any)
        {
            super(mensagem, argumento1, argumento2);
        }
    }
}