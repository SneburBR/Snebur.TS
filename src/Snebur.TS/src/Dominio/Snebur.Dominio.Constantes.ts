﻿/*eslint-disable*/
//Data : terça-feira, 16 de agosto de 2022
//Hora : 13:36:03
//@Namespace: Snebur.Dominio
//@PrioridadeDominio: 0
//@Globalizar: False
//@Dominios dependentes: []

namespace Snebur
{
    export class ConstantesDominioSuperior
    {
        public static readonly DOMIMIO_SUPERIOR_LOCALHOST : string = ".localhost";
        public static readonly DOMIMIO_SUPERIOR_INTERNO : string = ".int";
        public static readonly DOMIMIO_SUPERIOR_TESTE : string = ".tmp.br";
        public static readonly DOMIMIO_SUPERIOR_PRODUCAO : string = ".com.br";
    }
    export class ConstantesCabecalho
    {
        public static readonly IDENTIFICADOR_USUARIO : string = "IdentificadorUsuario";
        public static readonly SENHA : string = "Senha";
        public static readonly IDENTIFICADOR_PROPRIETARIO : string = "IdentificadorProprietario";
        public static readonly NOME_ASSEMBLY_APLICACAO : string = "NomeAssemblyAplicacao";
        public static readonly IDENTIFICADOR_SESSAO_USUARIO : string = "IdentificadorSessaoUsuario";
        public static readonly ORIGIN : string = "Origin";
    }
}
namespace Snebur.Imagem
{
    export class ConstantesImagemApresentacao
    {
        public static readonly ALTURA_IMAGEM_MINIATURA : number = 90;
        public static readonly LARGURA_IMAGEM_MINIATURA : number = 90;
        public static readonly ALTURA_IMAGEM_PEQUENA : number = 290;
        public static readonly LARGURA_IMAGEM_PEQUENA : number = 290;
        public static readonly ALTURA_IMAGEM_MEDIA : number = 800;
        public static readonly LARGURA_IMAGEM_MEDIA : number = 800;
        public static readonly ALTURA_IMAGEM_GRANDE : number = 1080;
        public static readonly LARGURA_IMAGEM_GRANDE : number = 1920;
        public static readonly QUALIDADE_PADRAO : number = 87;
        public static readonly QUALIDADE_PADRAO_THUMBNAIL : number = 70;
        public static readonly QUALIDADE_PADRAO_IMAGEM_REDIMENSIONADA : number = 70;
    }
}