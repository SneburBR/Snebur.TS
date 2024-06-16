namespace Snebur.Utilidade
{
    export class CartaoCreditoUtil
    {
        private static readonly CabalBins = ["6035", "6042", "6043", "6044"];
        private static readonly BASE_URL_BANDEIRA = "/resources/Imagens/pagamentos/";

        private static get Outro()
        {
            return new ResultadoIdentificacaoCartaoCredito({

                Bandeira: EnumBandeira.Outro,
                Nome: "Outro",
                EspacosFormatacao: [4, 8, 12],
                MaximoDigitos: 19,
                TotalDigitosCodigoSeguranca: 4
            });
        }

        private static get Aura()
        {
            return new ResultadoIdentificacaoCartaoCredito({

                Bandeira: EnumBandeira.Aura,
                Nome: "Aura",
                EspacosFormatacao: [4, 12],
                MaximoDigitos: 16,
                TotalDigitosCodigoSeguranca: 3
            });
        }

        private static get Cabal()
        {
            return new ResultadoIdentificacaoCartaoCredito({

                Bandeira: EnumBandeira.Cabal,
                Nome: "Cabal",
                EspacosFormatacao: [4, 12],
                MaximoDigitos: 16,
                TotalDigitosCodigoSeguranca: 3
            });
        }

        private static get FortBrasil()
        {
            return new ResultadoIdentificacaoCartaoCredito({

                Bandeira: EnumBandeira.Aura,
                Nome: "Fort Brasil",
                EspacosFormatacao: [4, 12],
                MaximoDigitos: 16,
                TotalDigitosCodigoSeguranca: 3
            });
        }

        private static get GrandCard()
        {
            return new ResultadoIdentificacaoCartaoCredito({

                Bandeira: EnumBandeira.GrandCard,
                Nome: "Grand card",
                EspacosFormatacao: [4, 12],
                MaximoDigitos: 16,
                TotalDigitosCodigoSeguranca: 3
            });
        }

        public static RetornarUrlImagemBandeira(enumBandeira: EnumBandeira): string
        {
            return `${CartaoCreditoUtil.BASE_URL_BANDEIRA}${enumBandeira}.png`;

        }

        public static Identificar(numeroCartao: string): ResultadoIdentificacaoCartaoCredito
        {
            const numeros = TextoUtil.RetornarSomenteNumeros(numeroCartao);
            const resultados = $creditCardType(numeros);
            if (resultados.length === 1)
            {
                const resultado = resultados[0];
                const maximoDigitos = resultado.lengths.Max();
                return new ResultadoIdentificacaoCartaoCredito({

                    Bandeira: resultado.type,
                    Nome: resultado.niceType,
                    EspacosFormatacao: resultado.gaps,
                    MaximoDigitos: maximoDigitos,
                    TotalDigitosCodigoSeguranca: 4
                });
            }

            if (resultados.length === 0)
            {
                const bandeiraConhecida = CartaoCreditoUtil.RetornarBandeiraConhecida(numeros);
                switch (bandeiraConhecida)
                {
                    case EnumBandeira.Aura:
                        return CartaoCreditoUtil.Aura;
                    case EnumBandeira.Cabal:
                        return CartaoCreditoUtil.Cabal;
                    case EnumBandeira.FortBrasil:
                        return CartaoCreditoUtil.FortBrasil;
                }


            }
            return CartaoCreditoUtil.Outro;


        }
        private static RetornarBandeiraConhecida(numeros: string): EnumBandeira
        {
            if (CartaoCreditoUtil.IsAura(numeros))
            {
                return EnumBandeira.Aura;
            }
            if (CartaoCreditoUtil.IsCabal(numeros))
            {
                return EnumBandeira.Cabal;
            }
            if (CartaoCreditoUtil.IsFortBrasil(numeros))
            {
                return EnumBandeira.FortBrasil;
            }

            if (CartaoCreditoUtil.IsGrandCard(numeros))
            {
                return EnumBandeira.GrandCard;
            }
            if (CartaoCreditoUtil.IsPersonalCard(numeros))
            {
                return EnumBandeira.PersonalCard;
            }
            if (CartaoCreditoUtil.IsSorocred(numeros))
            {
                return EnumBandeira.Sorocred;
            }
            if (CartaoCreditoUtil.IsValeCard(numeros))
            {
                return EnumBandeira.ValeCard;
            }
            return EnumBandeira.Outro;
        }


        private static IsAura(numeros: string): boolean
        {
            return numeros.StartsWith("50");
        }

        private static IsCabal(numeros: string): boolean
        {
            return this.CabalBins.Any(x => numeros.StartsWith(x));
        }

        private static IsFortBrasil(numeros: string): boolean
        {
            return numeros.StartsWith("628167");
        }

        private static IsGrandCard(numeros: string): boolean
        {
            return numeros.StartsWith("605032");
        }

        private static IsPersonalCard(numeros: string): boolean
        {
            return numeros.StartsWith("636085");
        }

        private static IsSorocred(numeros: string): boolean
        {
            return numeros.StartsWith("627892") ||
                numeros.StartsWith("636414");
        }

        private static IsValeCard(numeros: string): boolean
        {
            return numeros.StartsWith("606444") ||
                numeros.StartsWith("606458") ||
                numeros.StartsWith("606482");
        }

    }

    export class ResultadoIdentificacaoCartaoCredito
    {
        public readonly Bandeira: EnumBandeira;
        public readonly EspacosFormatacao: number[];
        public readonly MaximoDigitos: number;
        public readonly TotalDigitosCodigoSeguranca: number;
        public readonly Nome: string;

        public constructor(init: Partial<ResultadoIdentificacaoCartaoCredito>)
        {
            Object.assign(this, init);
        }
    }


    export enum EnumBandeira
    {
        Aura = "aura",
        AmericaExpress = "american-express",
        Cabal = "cabal",
        DinersClub = "diners-club",
        Discover = "discover",
        Elo = "elo",
        FortBrasil = "fortbrasil",
        GrandCard = "grandcard",
        Hiper = "hiper",
        HiperCard = "hipercard",
        Jcb = "jcb",
        MasterCard = "mastercard",
        Mir = "mir",
        PersonalCard = "personalcard",
        Sorocred = "sorocred",
        Unionpay = "unionpay",
        ValeCard = "valecard",
        Visa = "visa",
        Outro = "outro"
    }

    enum EnumCreditCardTypeCardBrandNiceType
    {
        AmericaExpress = "American Express",
        DinersClub = "Diners Club",
        Discover = "Discover",
        Elo = "Elo",
        Hiper = "Hiper",
        HiperCard = "Hipercard",
        Jcb = "JCB",
        Maestro = "Maestro",
        MasterCard = "Mastercard",
        Mir = "Mir",
        Unionpay = "UnionPay",
        Visa = "Visa"
    }

    enum EnumCreditCardTypeSecurityCodeLabel
    {
        CVV = "CVV",
        CVC = "CVC",
        CID = "CID",
        CVN = "CVN",
        CVE = "CVE",
        CVP2 = "CVP2"
    }



    interface ResultadoCartaoCredito
    {
        niceType: EnumCreditCardTypeCardBrandNiceType;
        type: EnumBandeira;
        gaps: number[];
        lengths: number[];
        code: any;
    }

    declare const $creditCardType: (cartao: string) => ResultadoCartaoCredito[];
    //declare const $getTypeInfo: any;
    //declare const $CardType: any;
}



