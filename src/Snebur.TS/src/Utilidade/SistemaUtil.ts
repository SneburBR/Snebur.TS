namespace Snebur.Utilidade
{
    export class SistemaUtil
    {
        //Todos os useragents
        //http://www.useragentstring.com/pages/useragentstring.php
        //https://github.com/faisalman/ua-parser-js/blob/master/src/ua-parser.js

        private static Parser: UAParser = new UAParser();
        private static Resultado = SistemaUtil.Parser.getResult();

        private static _navegador: d.Navegador;
        private static _resolucao: d.Dimensao;
        private static _plataforma: d.EnumPlataforma;
        private static _sistemaOperacional: d.SistemaOperacional;
        private static _idioma: string;
        private static _tipoAplicacao: d.EnumTipoAplicacao;

        public static get IsCookieAtivo(): boolean
        {
            return CookieUtil.IsCookieAtivo;
        }

        public static get Resolucao(): d.Dimensao
        {
            if (!(SistemaUtil._resolucao instanceof d.Dimensao))
            {
                SistemaUtil._resolucao = SistemaUtil.RetornarResolucao();
            }
            return SistemaUtil._resolucao;
        }

        public static get IsAndroid(): boolean
        {
            return SistemaUtil.SistemaOperacionalEnum === d.EnumSistemaOperacional.Android;
        }

        public static get IsiOS(): boolean
        {
            return SistemaUtil.SistemaOperacionalEnum === d.EnumSistemaOperacional.iOS;
        }

        public static get IsMacOS_X(): boolean
        {
            return SistemaUtil.SistemaOperacionalEnum === d.EnumSistemaOperacional.MacOS_X;
        }

        public static get IsAndroidOrIOS(): boolean
        {
            return SistemaUtil.SistemaOperacionalEnum === d.EnumSistemaOperacional.Android ||
                SistemaUtil.SistemaOperacionalEnum === d.EnumSistemaOperacional.iOS;
        }

        public static get IsInternetExplorer11(): boolean
        {
            const navegadorEnum = SistemaUtil.NavegadorEnum;
            if (navegadorEnum === d.EnumNavegador.InternetExplorer)
            {
                return SistemaUtil.Navegador.Versao.Contains("11");
            }
            return false;
        }

        public static get Navegador(): d.Navegador
        {
            if (!(SistemaUtil._navegador instanceof d.Navegador))
            {
                SistemaUtil._navegador = SistemaUtil.RetornarNavegador();
            }
            return SistemaUtil._navegador;
        }

        public static get NavegadorEnum(): d.EnumNavegador
        {
            return SistemaUtil.Navegador.NavegadorEnum;
        }

        public static get Plataforma(): d.EnumPlataforma
        {
            if (!u.ValidacaoUtil.IsDefinido(SistemaUtil._plataforma))
            {
                SistemaUtil._plataforma = SistemaUtil.RetornarPlataforma();
            }
            return SistemaUtil._plataforma;
        }

        public static get SistemaOperacional(): d.SistemaOperacional
        {
            if (!(SistemaUtil._sistemaOperacional instanceof d.SistemaOperacional))
            {
                SistemaUtil._sistemaOperacional = SistemaUtil.RetornarSistemaOperacional();
            }
            return SistemaUtil._sistemaOperacional;
        }

        public static get SistemaOperacionalEnum(): d.EnumSistemaOperacional
        {
            return SistemaUtil.SistemaOperacional.SistemaOperacionalEnum;
        }

        public static get Idioma(): string
        {
            if (!u.ValidacaoUtil.IsDefinido(SistemaUtil._idioma))
            {
                SistemaUtil._idioma = SistemaUtil.RetornarIdioma();
            }
            return SistemaUtil._idioma;
        }

        public static get TipoAplicacao(): d.EnumTipoAplicacao
        {
            if (!u.ValidacaoUtil.IsDefinido(SistemaUtil._tipoAplicacao))
            {
                SistemaUtil._tipoAplicacao = SistemaUtil.RetornarTipoAplicacao();
            }
            return SistemaUtil._tipoAplicacao;
        }

        public static get Localizacao(): d.Localizacao
        {
            return this.RetornarLocalizacao();
        }

        private static RetornarResolucao(): Snebur.Dominio.Dimensao
        {
            if (typeof screen !== "undefined")
            {
                if (u.ValidacaoUtil.IsDefinido(screen.width))
                {
                    const largura = screen.width;
                    const altura = screen.height;
                    return new Snebur.Dominio.Dimensao(largura, altura);
                }
            }
            return new Snebur.Dominio.Dimensao(0, 0);
        }

        private static RetornarPlataforma(): Snebur.Dominio.EnumPlataforma
        {
            if (typeof navigator !== "undefined")
            {
                const celular = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion);
                return (celular) ? Snebur.Dominio.EnumPlataforma.Celular : Snebur.Dominio.EnumPlataforma.PC;
            }
            return Snebur.Dominio.EnumPlataforma.Desconhecido;
        }

        private static RetornarTipoAplicacao(): Snebur.Dominio.EnumTipoAplicacao
        {
            if (typeof document !== "undefined")
            {
                const url = document.URL;
                const appCordova = (url.indexOf("http://") === -1) && (url.indexOf("https://") === -1);
                return (appCordova) ? Snebur.Dominio.EnumTipoAplicacao.ApacheCordova : Snebur.Dominio.EnumTipoAplicacao.Web;
            }
            return Snebur.Dominio.EnumTipoAplicacao.Desconhecido;
        }

        private static RetornarIdioma(): string
        {
            if (typeof window !== "undefined")
            {
                if (u.ValidacaoUtil.IsDecimal(window.navigator))
                {
                    return u.ConverterUtil.ParaString(window.navigator.language);
                }
            }
            return String.Empty;
        }

        private static RetornarSistemaOperacional(): Snebur.Dominio.SistemaOperacional
        {
            if (typeof navigator !== "undefined")
            {
                const sistemaOpercionalEnum = SistemaUtil.RetornarSistemaOperacionalEnum(this.Resultado.os.name);
                return new Snebur.Dominio.SistemaOperacional(sistemaOpercionalEnum, this.Resultado.os.name, this.Resultado.os.version,
                    this.Resultado.os.version);
            }
            return null;
        }

        private static RetornarNavegador(): Snebur.Dominio.Navegador
        {
            const navegadorEnum = this.RetornarNavegadorEnum(this.Resultado.browser.name);

            return new d.Navegador(navegadorEnum, this.Resultado.browser.name, this.Resultado.browser.version, this.Resultado.browser.major);

        }

        private static RetornarLocalizacao(): Snebur.Dominio.Localizacao
        {
            return new Snebur.Dominio.Localizacao(0, 0);
        }

        private static RetornarSistemaOperacionalEnum(nomeOS: string): Snebur.Dominio.EnumSistemaOperacional
        {
            const nomeSistemaOperacional = nomeOS.trim().toLowerCase();
            switch (nomeSistemaOperacional)
            {
                case "windows":
                    return Snebur.Dominio.EnumSistemaOperacional.Windows;
                case "linux":
                    return Snebur.Dominio.EnumSistemaOperacional.Linux;
                case "mac os x":
                    return Snebur.Dominio.EnumSistemaOperacional.MacOS_X;
                case "android":
                    return Snebur.Dominio.EnumSistemaOperacional.Android;
                case "ios":
                    return Snebur.Dominio.EnumSistemaOperacional.iOS;
                case "windows phone":
                    return Snebur.Dominio.EnumSistemaOperacional.WindowsPhone;
                default:

            }

            if (nomeSistemaOperacional.Contains("windows phone"))
            {
                return Snebur.Dominio.EnumSistemaOperacional.WindowsPhone;
            }

            if (nomeSistemaOperacional.Contains("windows"))
            {
                return Snebur.Dominio.EnumSistemaOperacional.Windows;
            }

            if (nomeSistemaOperacional.Contains("android"))
            {
                return Snebur.Dominio.EnumSistemaOperacional.Android;
            }

            if (nomeSistemaOperacional.Contains("ios"))
            {
                return Snebur.Dominio.EnumSistemaOperacional.iOS;
            }

            if (nomeSistemaOperacional.Contains("mac"))
            {
                return Snebur.Dominio.EnumSistemaOperacional.MacOS_X;
            }

            if (nomeSistemaOperacional.Contains("linux"))
            {
                return Snebur.Dominio.EnumSistemaOperacional.Linux;
            }

            return Snebur.Dominio.EnumSistemaOperacional.Desconhecido;
        }

        private static RetornarNavegadorEnum(nomeNavegador: string): Snebur.Dominio.EnumNavegador
        {
            const agent = window.navigator.userAgent.toLowerCase();
            const _window = window as any;

            switch (true)
            {
                case agent.indexOf("instagram") > -1:

                    return d.EnumNavegador.Desconhecido;

                case agent.indexOf("edge") > -1:

                    return d.EnumNavegador.Edge;

                case agent.indexOf("edg") > -1:

                    return d.EnumNavegador.EdgeChromium;

                case agent.indexOf("opr") > -1 && !!_window.opr:

                    return d.EnumNavegador.Opera;

                case agent.indexOf("chrome") > -1 && !!_window.chrome:

                    return d.EnumNavegador.Chrome;

                case agent.indexOf("trident") > -1:

                    return d.EnumNavegador.InternetExplorer;

                case agent.indexOf("firefox") > -1:

                    return d.EnumNavegador.Firefox;

                case agent.indexOf("safari") > -1:

                    return d.EnumNavegador.Safari;
                default:

                    return d.EnumNavegador.Desconhecido;
            }
        }

        public static get IsWebView(): boolean
        {
            if (u.SistemaUtil.IsiOS)
            {
                if ((window.navigator as any).standalone)
                {
                    return true;
                }
                return false;
            }

            if (u.SistemaUtil.IsAndroid)
            {
                const userAgent = window.navigator.userAgent.toLowerCase();
                return (userAgent as any)?.includes("wv");

            }
            return false;
        }

        public static get IsDarkTheme(): boolean
        {
            return window?.matchMedia("(prefers-color-scheme: dark)").matches ?? false;
        }

        public static ECMAVersion(): EnumECMAVersion
        {
            if (typeof BigInt === "function")
            {
                return EnumECMAVersion.ES2020;
            }

            if (typeof Object.fromEntries === "function" && typeof String.prototype.trimStart === "function")
            {
                return EnumECMAVersion.ES2019;
            }

            if (typeof Promise !== "undefined" && typeof Promise.prototype.finally === "function")
            {
                return EnumECMAVersion.ES2018;
            }

            if (typeof Object.entries === "function")
            {
                return EnumECMAVersion.ES2017;
            }

            if (typeof Array.prototype.includes === "function")
            {
                return EnumECMAVersion.ES2016;
            }

            if (typeof Array.prototype.find === "function" && typeof Array.prototype.findIndex === "function")
            {
                return EnumECMAVersion.ES2015;
            }
            return EnumECMAVersion.ES5;
        }
    }

    export enum EnumECMAVersion
    {
        ES5,
        ES2015,
        ES2016,
        ES2017,
        ES2018,
        ES2019,
        ES2020
    }
}

 