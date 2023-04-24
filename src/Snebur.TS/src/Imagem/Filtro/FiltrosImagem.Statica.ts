namespace Snebur.Imagens
{
    import EnumFiltroImagem = Snebur.Dominio.EnumEfeitoImagem;

    export class EfeitosImagem 
    {
        private static _efeitos: DicionarioSimples<EfeitoImagem, d.EnumEfeitoImagem>;

        private static _normal: EfeitoImagem;
        private static _pretoBranco: EfeitoImagem;
        private static _sepia: EfeitoImagem;
        private static _cancum: EfeitoImagem;
        private static _moscou: EfeitoImagem;
        private static _dubai: EfeitoImagem;
        private static _paris: EfeitoImagem;
        private static _chicago: EfeitoImagem;
        private static _veneza: EfeitoImagem;
        private static _cairo: EfeitoImagem;
        private static _acapulco: EfeitoImagem;
        private static _fortaleza: EfeitoImagem;
        private static _pequim: EfeitoImagem;
        private static _atenas: EfeitoImagem;
        private static _manaus: EfeitoImagem;
        private static _rio: EfeitoImagem;
        private static _sydney: EfeitoImagem;
        private static _vancouver: EfeitoImagem;
        private static _saoPaulo: EfeitoImagem;
        private static _jaipur: EfeitoImagem;
        private static _medellin: EfeitoImagem;
        private static _londres: EfeitoImagem;

        public static get Efeitos(): DicionarioSimples<EfeitoImagem, EnumFiltroImagem>
        {
            if (!EfeitosImagem._efeitos)
            {
                const efeitos = new DicionarioSimples<EfeitoImagem, EnumFiltroImagem>();
                efeitos.Add(EnumFiltroImagem.Nenhum, EfeitosImagem.Normal);
                efeitos.Add(EnumFiltroImagem.PretoBranco, EfeitosImagem.PretoBranco);
                efeitos.Add(EnumFiltroImagem.Sepia, EfeitosImagem.Sepia);
                efeitos.Add(EnumFiltroImagem.Cancum, EfeitosImagem.Cancum);
                efeitos.Add(EnumFiltroImagem.Moscou, EfeitosImagem.Moscou);
                efeitos.Add(EnumFiltroImagem.Dubai, EfeitosImagem.Dubai);
                efeitos.Add(EnumFiltroImagem.Paris, EfeitosImagem.Paris);
                efeitos.Add(EnumFiltroImagem.Chicago, EfeitosImagem.Chicago);
                efeitos.Add(EnumFiltroImagem.Veneza, EfeitosImagem.Veneza);
                efeitos.Add(EnumFiltroImagem.Cairo, EfeitosImagem.Cairo);
                efeitos.Add(EnumFiltroImagem.Acapulco, EfeitosImagem.Acapulco);
                efeitos.Add(EnumFiltroImagem.Fortaleza, EfeitosImagem.Fortaleza);
                efeitos.Add(EnumFiltroImagem.Pequim, EfeitosImagem.Pequim);
                efeitos.Add(EnumFiltroImagem.Atenas, EfeitosImagem.Atenas);
                efeitos.Add(EnumFiltroImagem.Manaus, EfeitosImagem.Manaus);
                efeitos.Add(EnumFiltroImagem.Rio, EfeitosImagem.Rio);
                efeitos.Add(EnumFiltroImagem.Sydney, EfeitosImagem.Sydney);
                efeitos.Add(EnumFiltroImagem.Vancouver, EfeitosImagem.Vancouver);
                efeitos.Add(EnumFiltroImagem.SaoPaulo, EfeitosImagem.SaoPaulo);
                efeitos.Add(EnumFiltroImagem.Jaipur, EfeitosImagem.Jaipur);
                efeitos.Add(EnumFiltroImagem.Medellin, EfeitosImagem.Medellin);
                efeitos.Add(EnumFiltroImagem.Londres, EfeitosImagem.Londres);

                EfeitosImagem._efeitos = efeitos;
            }
            return EfeitosImagem._efeitos;
        }


        public static get Normal(): EfeitoImagem
        {
            if (!EfeitosImagem._normal)
            {
                EfeitosImagem._normal = new EfeitoImagem(EnumFiltroImagem.Nenhum, {});
            }
            return EfeitosImagem._normal;
        }

        public static get PretoBranco(): EfeitoImagem
        {
            if (!EfeitosImagem._pretoBranco)
            {
                EfeitosImagem._pretoBranco = new EfeitoImagem(EnumFiltroImagem.PretoBranco, {
                    PretoBranco: 100
                }, null);
            }
            return EfeitosImagem._pretoBranco;
        }

        public static get Sepia(): EfeitoImagem
        {
            if (!EfeitosImagem._sepia)
            {
                EfeitosImagem._sepia = new EfeitoImagem(EnumFiltroImagem.Sepia, {
                    Sepia: 100
                });
            }
            return EfeitosImagem._sepia;
        }

        //1977
        public static get Cancum(): EfeitoImagem
        {
            if (!EfeitosImagem._cancum)
            {
                const sobrePosicao = new SobrePosicaoSolida({
                    Cor: "rgba(243,106,188, 1)",
                    Mixagem: EnumMixagem.SoftLight,
                });

                EfeitosImagem._cancum = new EfeitoImagem(EnumFiltroImagem.Cancum, {
                    Contraste: 110,
                    Brilho: 110,
                    Saturacao: 130
                }, sobrePosicao);
            }
            return EfeitosImagem._cancum;
        }

        //Aden
        public static get Moscou(): EfeitoImagem
        {
            if (!EfeitosImagem._moscou)
            {
                const sobreposicao = new SobrePosicaoGradienteLinear({
                    Cor1: "rgba(66, 10,14,1)",
                    Cor2: "rgba(255,255,255,1)",
                    LimiteCor1: 0,
                    LimiteCor2: 100,
                    Direcao: EnumDirecaoGradiente.ToRight,
                    Mixagem: EnumMixagem.SoftLight
                });

                EfeitosImagem._moscou = new EfeitoImagem(EnumFiltroImagem.Moscou,
                    {
                        Contraste: 90,
                        Brilho: 120,
                        Saturacao: 85,
                        Matriz: 20,
                    }, sobreposicao);
            }
            return EfeitosImagem._moscou;
        }

        //Amaro
        public static get Dubai(): EfeitoImagem
        {
            if (!EfeitosImagem._dubai)
            {
                EfeitosImagem._dubai = new EfeitoImagem(EnumFiltroImagem.Dubai,
                    {
                        Contraste: 90,
                        Brilho: 110,
                        Saturacao: 150,
                        Matriz: 350
                    }, null);
            }
            return EfeitosImagem._dubai;
        }

        //Brannan
        public static get Paris(): EfeitoImagem
        {
            if (!EfeitosImagem._paris)
            {
                const sobrePosicao = new SobrePosicaoSolida({
                    Cor: "rgba(161,44,199,1)",
                    Mixagem: EnumMixagem.SoftLight,

                });

                EfeitosImagem._paris = new EfeitoImagem(EnumFiltroImagem.Paris,
                    {
                        Contraste: 140,
                        Sepia: 50,
                    }, sobrePosicao);
            }
            return EfeitosImagem._paris;
        }

        //Brooklyn
        public static get Chicago(): EfeitoImagem
        {
            if (!EfeitosImagem._chicago)
            {
                const sobrePosicao = new SobrePosicaoGradienteLinear({
                    Cor1: "rgba(168,223,193,1)",
                    Cor2: "rgba(183,196,200,1)",
                    LimiteCor1: 0,
                    LimiteCor2: 100,
                    Direcao: EnumDirecaoGradiente.ToRight,
                    Mixagem: EnumMixagem.SoftLight,
                });

                EfeitosImagem._chicago = new EfeitoImagem(EnumFiltroImagem.Chicago, {
                    Contraste: 90,
                    Brilho: 110,
                }, sobrePosicao);
            }
            return EfeitosImagem._chicago;
        }

        //Clarendon
        public static get Veneza(): EfeitoImagem
        {
            if (!EfeitosImagem._veneza)
            {
                const sobrePosicao = new SobrePosicaoSolida({
                    Cor: "rgba(127,187,227,1)",
                    Mixagem: EnumMixagem.SoftLight,
                });

                EfeitosImagem._veneza = new EfeitoImagem(EnumFiltroImagem.Veneza, {
                    Contraste: 120,
                    Saturacao: 125
                }, sobrePosicao);
            }
            return EfeitosImagem._veneza;
        }

        //Earlybird
        public static get Cairo(): EfeitoImagem
        {
            if (!EfeitosImagem._cairo)
            {

                const sobrePosicao = new SobrePosicaoGradienteLinear({
                    Cor1: "rgba(208,186,142,1)",
                    Cor2: "rgba(29,2,16,1)",
                    LimiteCor1: 0,
                    LimiteCor2: 100,
                    Direcao: EnumDirecaoGradiente.ToRight,
                    Mixagem: EnumMixagem.SoftLight,
                });


                EfeitosImagem._cairo = new EfeitoImagem(EnumFiltroImagem.Cairo, {
                    Contraste: 90,
                    Sepia: 20,
                }, sobrePosicao);
            }
            return EfeitosImagem._cairo;
        }

        //Gingham
        public static get Acapulco(): EfeitoImagem
        {
            if (!EfeitosImagem._acapulco)
            {
                const sobreposicao = new SobrePosicaoGradienteLinear({
                    Cor1: "rgba(66, 10,14,1)",
                    Cor2: "rgba(255, 255, 255, 1)",
                    LimiteCor1: 0,
                    LimiteCor2: 100,
                    Direcao: EnumDirecaoGradiente.ToRight,
                    Mixagem: EnumMixagem.SoftLight
                });

                EfeitosImagem._acapulco = new EfeitoImagem(EnumFiltroImagem.Acapulco,
                    {
                        Brilho: 105,
                        Matriz: 350,
                    }, sobreposicao);
            }
            return EfeitosImagem._acapulco;
        }

        //Hudson
        public static get Fortaleza(): EfeitoImagem
        {
            if (!EfeitosImagem._fortaleza)
            {

                const sobrePosicao = new SobrePosicaoGradienteLinear({
                    Cor1: "rgba(255,177,166,1)",
                    Cor2: "rgba(52,33,52,1)",
                    LimiteCor1: 0,
                    LimiteCor2: 100,
                    Direcao: EnumDirecaoGradiente.ToRight,
                    Mixagem: EnumMixagem.SoftLight,
                });

                EfeitosImagem._fortaleza = new EfeitoImagem(EnumFiltroImagem.Fortaleza, {
                    Contraste: 90,
                    Brilho: 120,
                    Saturacao: 110,
                }, sobrePosicao);
            }
            return EfeitosImagem._fortaleza;
        }

        //InkWell
        public static get Pequim(): EfeitoImagem
        {
            if (!EfeitosImagem._pequim)
            {

                //let sobrePosicao = new SobrePosicaoSolida({
                //    Cor: "rgba(0,0,0,0)",
                //    Opacidade: 100,
                //    Mixagem: EnumMixagem.SoftLight,

                //});

                EfeitosImagem._pequim = new EfeitoImagem(EnumFiltroImagem.Pequim,
                    {
                        Brilho: 110,
                        Contraste: 110,
                        Sepia: 30
                    });
            }
            return EfeitosImagem._pequim;
        }

        //lofi
        public static get Atenas(): EfeitoImagem
        {
            if (!EfeitosImagem._atenas)
            {
                const sobrePosicao = new SobrePosicaoGradienteLinear({
                    Cor1: "rgba(255,255,255,1)",
                    Cor2: "rgba(34,34,34,1)",
                    LimiteCor1: 0,
                    LimiteCor2: 100,
                    Direcao: EnumDirecaoGradiente.ToRight,
                    Mixagem: EnumMixagem.SoftLight,
                });

                EfeitosImagem._atenas = new EfeitoImagem(EnumFiltroImagem.Atenas, {
                    Contraste: 150,
                    Saturacao: 110,
                }, sobrePosicao);
            }
            return EfeitosImagem._atenas;
        }

        //Maven
        public static get Manaus(): EfeitoImagem
        {
            if (!EfeitosImagem._manaus)
            {
                const sobrePosicao = new SobrePosicaoSolida({
                    Cor: "rgba(3,230,26,1)",
                    Mixagem: EnumMixagem.SoftLight,

                });

                EfeitosImagem._manaus = new EfeitoImagem(EnumFiltroImagem.Manaus,
                    {
                        Contraste: 95,
                        Brilho: 95,
                        Saturacao: 150,
                        Sepia: 25,
                    }, sobrePosicao);
            }
            return EfeitosImagem._manaus;
        }

        //Perpetua
        public static get Rio(): EfeitoImagem
        {
            if (!EfeitosImagem._rio)
            {
                const sobreposicao = new SobrePosicaoGradienteLinear({
                    Cor1: "rgba(0, 91,154,1)",
                    Cor2: "rgba(255, 255,255, 1)",
                    LimiteCor1: 0,
                    LimiteCor2: 100,
                    Direcao: EnumDirecaoGradiente.ToBottom,
                    Mixagem: EnumMixagem.SoftLight
                });

                EfeitosImagem._rio = new EfeitoImagem(EnumFiltroImagem.Rio, {}, sobreposicao);
            }
            return EfeitosImagem._rio;
        }

        //Reyes
        public static get Sydney(): EfeitoImagem
        {
            if (!EfeitosImagem._sydney)
            {
                //kkk nao faz sentido
                const sobrePosicao = new SobrePosicaoSolida({
                    Cor: "rgba(173, 205, 239, 1)",
                    Mixagem: EnumMixagem.SoftLight,

                });

                EfeitosImagem._sydney = new EfeitoImagem(EnumFiltroImagem.Sydney,
                    {
                        Contraste: 85,
                        Brilho: 110,
                        Saturacao: 75,
                        Sepia: 22
                    }, sobrePosicao);
            }
            return EfeitosImagem._sydney;
        }

        //Stinson
        public static get Vancouver(): EfeitoImagem
        {
            if (!EfeitosImagem._vancouver)
            {
                //kkk nao faz sentido
                const sobrePosicao = new SobrePosicaoSolida({
                    Cor: "rgba(240, 149, 128, 1)",
                    Mixagem: EnumMixagem.SoftLight,

                });

                EfeitosImagem._vancouver = new EfeitoImagem(EnumFiltroImagem.Vancouver,
                    {
                        Contraste: 75,
                        Brilho: 115,
                        Saturacao: 85,
                    }, sobrePosicao);
            }
            return EfeitosImagem._vancouver;
        }


        //Toaster
        public static get SaoPaulo(): EfeitoImagem
        {
            if (!EfeitosImagem._saoPaulo)
            {
                const sobreposicao = new SobrePosicaoGradienteLinear({
                    Cor1: "rgba(15, 78, 128, 1)",
                    Cor2: "rgba(59, 0, 59, 1)",
                    LimiteCor1: 0,
                    LimiteCor2: 100,
                    Direcao: EnumDirecaoGradiente.ToRight,
                    Mixagem: EnumMixagem.SoftLight
                });

                EfeitosImagem._saoPaulo = new EfeitoImagem(EnumFiltroImagem.SaoPaulo, {
                    Contraste: 150,
                    Brilho: 90
                }, sobreposicao);
            }
            return EfeitosImagem._saoPaulo;
        }

        //Walden
        public static get Jaipur(): EfeitoImagem
        {
            if (!EfeitosImagem._jaipur)
            {
                const sobrePosicao = new SobrePosicaoSolida({
                    Cor: "rgba(204, 68, 0, 1)",
                    Mixagem: EnumMixagem.SoftLight,

                });

                EfeitosImagem._jaipur = new EfeitoImagem(EnumFiltroImagem.Jaipur,
                    {
                        Brilho: 110,
                        Saturacao: 160,
                        Sepia: 30,
                        Matriz: 350
                    }, sobrePosicao);
            }
            return EfeitosImagem._jaipur;
        }

        //Valencia
        public static get Medellin(): EfeitoImagem
        {
            if (!EfeitosImagem._medellin)
            {
                const sobrePosicao = new SobrePosicaoSolida({
                    Cor: "rgba(58, 3, 57, 1)",
                    Mixagem: EnumMixagem.SoftLight,

                });

                EfeitosImagem._medellin = new EfeitoImagem(EnumFiltroImagem.Medellin,
                    {
                        Contraste: 108,
                        Brilho: 108,
                        Sepia: 8
                    }, sobrePosicao);
            }
            return EfeitosImagem._medellin;
        }

        //XPro2
        public static get Londres(): EfeitoImagem
        {
            if (!EfeitosImagem._londres)
            {
                const sobreposicao = new SobrePosicaoGradienteLinear({
                    Cor1: "rgba(224, 231, 230, 1)",
                    Cor2: "rgba(43, 42, 161, 1)",
                    LimiteCor1: 0,
                    LimiteCor2: 100,
                    Direcao: EnumDirecaoGradiente.ToRight,
                    Mixagem: EnumMixagem.SoftLight
                });

                EfeitosImagem._londres = new EfeitoImagem(EnumFiltroImagem.Londres, {
                    Sepia: 30
                }, sobreposicao);
            }
            return EfeitosImagem._londres;
        }


        /*
        public static get Temp(): FiltroImagem
        {
            if (!FiltrosImagem._temp)
            {
                let sobrePosicao = null;

                let sobrePosicao = new SobrePosicaoSolida({
                    Cor: "rgba(161,44,199,0.31)",
                    Opacidade: 100,
                    Mixagem: EnumMixagem.Lighten,

                });

                let sobreposicao = new SobrePosicaoGradienteLinear({
                    Cor1: "rgba(66, 10,14,0.2)",
                    Cor2: "rgba(66, 10,14,0)",
                    LimiteCor1: 1,
                    LimiteCor2: 100,
                    Opacidade: 100,
                    Direcao: EnumDirecaoGradiente.ToRight,
                    Mixagem: EnumMixagem.Darken
                });

                let sobrePosicao = new SobrePosicaoGradienteRadial({
                    Cor1: "rgba(168,223,193,0.4)",
                    Cor2: "rgba(183,196,200,0.2)",
                    LimiteCor1: 1,
                    LimiteCor2: 2,
                    Posicao: EnumPosicaoGradiente.CenterCenter,
                    Tamanho: EnumTamanhoGradiente.ClosestCorner,
                    Mixagem: EnumMixagem.Overlay,
                    Opacidade: 100
                });

                FiltrosImagem._temp = new FiltroImagemConhecido(EnumFiltroImagem. {
                    Contraste: 100,
                    Brilho: 100,
                    Saturacao: 100,
                    Sepia: 0,
                    PretoBranco: 0,
                    Inverter: 0,
                    Matriz: 0,
                    Desfoque: 0
                }, sobrePosicao);
            }
            return FiltrosImagem._temp;
        }

        */
    }


}

