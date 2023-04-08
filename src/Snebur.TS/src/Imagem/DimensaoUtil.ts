﻿namespace Snebur.Utilidade
{
    export class DimensaoUtil
    {
        public static RetornarRegiaoCentroFora(largura: number, altura: number, larguraRecipiente: number, alturaRecipente: number): d.Regiao
        {
            const dimensao = DimensaoUtil.RetornarDimencaoUniformeFora(largura, altura, larguraRecipiente, alturaRecipente);
            const x = (larguraRecipiente - dimensao.Largura) / 2;
            const y = (alturaRecipente - dimensao.Altura) / 2;
            return new d.Regiao(x, y, dimensao.Largura, dimensao.Altura);
        }

        public static RetornarRegiaoCentroDentro(
            largura: number,
            altura: number,
            larguraRecipiente: number,
            alturaRecipente: number): d.Regiao
        {
            const dimensao = DimensaoUtil.RetornarDimencaoUniformeDentro(
                largura,
                altura,
                larguraRecipiente,
                alturaRecipente);

            const x = (larguraRecipiente - dimensao.Largura) / 2;
            const y = (alturaRecipente - dimensao.Altura) / 2;
            return new d.Regiao(x, y, dimensao.Largura, dimensao.Altura);
        }

        public static RetornarDimensaoUniformeAltura(
            largura: number,
            altura: number,
            alturaRecipiente: number): Dimensao
        {
            const novaAltura = alturaRecipiente;
            const novaLargura = largura * alturaRecipiente / altura;
            return new d.Dimensao(novaLargura, novaAltura);
        }

        public static RetornarDimensaoUniformeLargura(
            largura: number,
            altura: number,
            larguraRecipiente: number): Dimensao
        {
            const novaLargura = larguraRecipiente;
            const novaAltura = (altura * novaLargura) / largura;

            return new d.Dimensao(
                novaLargura,
                novaAltura);
        }

        public static RetornarDimencaoUniformeFora(
            largura: number,
            altura: number,
            larguraRecipiente: number, alturaRecipiente: number,
            valorDecimal: boolean = true): Dimensao
        {
            let novaLargura = 0;
            let novaAltura = 0;

            if (largura > altura)
            {
                novaLargura = larguraRecipiente;
                novaAltura = altura * novaLargura / largura;
                if (novaAltura < alturaRecipiente)
                {
                    novaAltura = alturaRecipiente;
                    novaLargura = largura * novaAltura / altura;
                }
            }
            else if (altura > largura)
            {
                novaAltura = alturaRecipiente;
                novaLargura = largura * novaAltura / altura;

                if (novaLargura < larguraRecipiente)
                {
                    novaLargura = larguraRecipiente;
                    novaAltura = altura * novaLargura / largura;
                }
            }
            else if (largura === altura)
            {
                novaLargura = Math.max(larguraRecipiente, alturaRecipiente);
                novaAltura = novaLargura;
            }
            if (!valorDecimal)
            {
                novaLargura = u.ConverterUtil.ParaInteiro(novaLargura);
                novaAltura = u.ConverterUtil.ParaInteiro(novaAltura);
            }

            novaLargura = Math.max(novaLargura, 0);
            novaAltura = Math.max(novaAltura, 0);

            return new d.Dimensao(
                novaLargura,
                novaAltura);
        }

        public static RetornarDimencaoUniformeDentro(largura: number,
            altura: number, larguraRecipiente: number,
            alturaRecipente: number, valorDecimal: boolean = true,
            aumentar: boolean = true): d.Dimensao
        {
            let novaLargura = 0;
            let novaAltura = 0;

            if (largura > altura)
            {
                //IMAGEM NA HORIZONTAL
                novaLargura = larguraRecipiente;
                novaAltura = altura * novaLargura / largura;
                if (novaAltura > alturaRecipente)
                {
                    novaAltura = alturaRecipente;
                    novaLargura = largura * novaAltura / altura;
                }
            }
            else if (altura > largura)
            {
                //IMAGEM NA VERTICAL
                novaAltura = alturaRecipente;
                novaLargura = largura * novaAltura / altura;

                if (novaLargura > larguraRecipiente)
                {
                    novaLargura = larguraRecipiente;
                    novaAltura = altura * novaLargura / largura;
                }
            }
            else if (largura === altura)
            {
                //IMAGEM QUADRADA ' SELECIONAR O MENOR LADO
                novaLargura = Math.min(alturaRecipente, larguraRecipiente);
                novaAltura = novaLargura;
            }

            if (!aumentar && (largura < novaLargura || altura < novaAltura))
            {
                return new d.Dimensao(largura, altura);
            }
            if (!valorDecimal)
            {
                novaLargura = u.ConverterUtil.ParaInteiro(novaLargura);
                novaAltura = u.ConverterUtil.ParaInteiro(novaAltura);
            }

            novaLargura = Math.max(novaLargura, 0);
            novaAltura = Math.max(novaAltura, 0);

            return new d.Dimensao(novaLargura, novaAltura);
        }

        public static RetornarOrientacao(dimensao: IDimensao): EnumOrientacao
        {
            if (dimensao.Largura.ToDecimal() === dimensao.Altura.ToDecimal())
            {
                return EnumOrientacao.Quadrado;
            }
            if (dimensao.Largura > dimensao.Altura)
            {
                return EnumOrientacao.Horizontal;
            }
            return EnumOrientacao.Vertical;
        }

        public static NormalizarDimensao(dimensao: IDimensao, dimensaoOuOrientacao: IDimensao | EnumOrientacao): IDimensao
        public static NormalizarDimensao(dimensao: IDimensao, dimensaoOuOrientacao: IDimensao | EnumOrientacao, isTipar: true): Dimensao
        public static NormalizarDimensao(dimensao: IDimensao, dimensaoOuOrientacao: IDimensao | EnumOrientacao, isTipar: false): IDimensao
        public static NormalizarDimensao(dimensao: IDimensao, dimensaoOuOrientacao: IDimensao | EnumOrientacao, isTipar?: boolean): Dimensao | IDimensao
        {
            const orientacao = DimensaoUtil.RetornarNormalizarOrientacao(dimensaoOuOrientacao);

            const ladoMenor = Math.min(dimensao.Largura, dimensao.Altura);
            const ladoMaior = Math.max(dimensao.Largura, dimensao.Altura);

            switch (orientacao)
            {
                case EnumOrientacao.Horizontal:
                case EnumOrientacao.Quadrado:

                    if (isTipar)
                    {
                        return new Dimensao(ladoMaior, ladoMenor);
                    }

                    return {
                        Largura: ladoMaior,
                        Altura: ladoMenor,
                    };

                case EnumOrientacao.Vertical:

                    if (isTipar)
                    {
                        return new Dimensao(ladoMenor, ladoMaior);
                    }

                    return {
                        Largura: ladoMenor,
                        Altura: ladoMaior,
                    };

                default:

                    throw new Erro("Orientação não suportada");
            }

        }

        private static RetornarNormalizarOrientacao(dimensaoOuOrientacao: d.IDimensao | d.EnumOrientacao)
        {
            if (typeof dimensaoOuOrientacao === "number")
            {
                if (EnumUtil.IsDefindo(EnumOrientacao, dimensaoOuOrientacao))
                {
                    return dimensaoOuOrientacao;
                }
            }
            if (DimensaoUtil.IsDimensao(dimensaoOuOrientacao))
            {
                return DimensaoUtil.RetornarOrientacao(dimensaoOuOrientacao);
            }
            throw new Erro(`A (dimensão ou orientação) não foi definida ou é invalida`);
        }

        public static IsDimensao(obj: any): obj is d.IDimensao
        {
            if (obj != null)
            {
                return ValidacaoUtil.IsNumber(obj.Largura) &&
                    ValidacaoUtil.IsNumber(obj.Altura);
            }
            return false;
        }

        public static IsDimensaoIgual(dimensao1: IDimensao, dimensao2: IDimensao): boolean
        {
            if (dimensao1 != null && dimensao2 != null)
            {
                return dimensao1.Largura === dimensao2.Largura &&
                    dimensao1.Altura === dimensao2.Altura;
            }
            /*eslint-disable*/
            return dimensao1 == dimensao2;
            /*eslint-enable*/
        }

        public static IsDimensaoDiferente(dimensao1: IDimensao, dimensao2: IDimensao): boolean
        {
            return !DimensaoUtil.IsDimensaoIgual(dimensao1, dimensao2);
        }

     
        public static ProporcaoSimplificada(largura: number, altura: number): IDimensao
        {
            // Encontrar o maior divisor comum usando o algoritmo de Euclides
            function mdc(a: number, b: number): number
            {
                return b === 0 ? a : mdc(b, a % b);
            }
            const divisorComum = mdc(largura, altura);
            const proporcaoLargura = largura / divisorComum;
            const proporcaoAltura = altura / divisorComum;
            return {
                Largura: proporcaoLargura,
                Altura: proporcaoAltura
            };
        }
    }
}