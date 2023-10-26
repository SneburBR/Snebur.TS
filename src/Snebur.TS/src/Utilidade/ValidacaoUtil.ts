namespace Snebur.Utilidade
{
    export class ValidacaoUtil
    {
        public static IsImageData(argumento: ImageData | Partial<ImageData>): argumento is ImageData
        {
            if (argumento instanceof ImageData)
            {
                return true;
            }

            return (argumento.data &&
                ValidacaoUtil.IsNumber(argumento.data.length) &&
                ValidacaoUtil.IsNumber(argumento.width) &&
                ValidacaoUtil.IsNumber(argumento.height));
        }

        //#region Tipos

        public static IsDefinido(obj: any): boolean;
        public static IsDefinido(obj: any, isValidarStringVazia: boolean): boolean;
        public static IsDefinido(obj: any, isValidarStringVazia = false): boolean
        {
            const isDefinido = obj !== null && obj !== undefined;
            if (isDefinido && isValidarStringVazia && typeof obj === "string")
            {
                return !String.IsNullOrWhiteSpace(obj);
            }
            return isDefinido;
            //return ((obj != null) && (!(typeof obj == "undefined")));
        }

        public static IsString(obj: any): obj is string
        {
            return typeof obj === "string";
        }

        public static IsStringNaoVazia(obj: any): obj is string
        {
            return typeof obj === "string" &&
                !this.IsStringVaziaOuNull(obj);
        }

        public static IsStringVaziaOuNull(obj: string): boolean
        {
            return (!(String.IsNullOrWhiteSpace(obj)));
        }

        public static IsFunction(obj: any): obj is Function
        {
            return typeof obj === "function";
        }

        public static IsCallback(obj: any): obj is Function
        {
            return ValidacaoUtil.IsFunction(obj);
        }

        public static IsConstrutor(obj: any): obj is Function
        {
            return ValidacaoUtil.IsFunction(obj);
        }

        public static IsConstrutorEnum(obj: any): boolean
        {
            return ValidacaoUtil.IsObject(obj);
        }

        public static IsObject(obj: any): boolean
        {
            return ((obj != null) && (typeof obj === "object"));
        }

        public static IsArray(obj: any): obj is any[]
        {
            if (obj instanceof Array)
            {
                return true;
            }
            if (Array.isArray(obj))
            {
                return true;
            }
            if (ValidacaoUtil.IsDefinido(obj) && typeof obj !== "string")
            {
                const valorLength = obj["length"];
                if (typeof valorLength === "number")
                {
                    return u.ValidacaoUtil.IsPositivo(valorLength);
                }
            }
            return false;
        }

        /**
         * Valida se tipo do objeto é do tipo number
         * @param obj
         * @param isAceitarString
         */
        public static IsNumber(obj: number | string | any): obj is number;
        public static IsNumber(obj: number | string, isAceitarString: false): obj is number;
        public static IsNumber(obj: number | string, isAceitarString: true): obj is number | string;
        public static IsNumber(obj: number | string, isAceitarString: boolean): obj is number | string
        public static IsNumber(obj: number | string, isAceitarString: boolean = false): boolean
        {
            if (typeof obj === "number")
            {
                return !isNaN(obj) && isFinite(obj);
            }

            if (isAceitarString && ValidacaoUtil.IsString(obj))
            {
                obj = obj.trim();

                if (String.IsNullOrWhiteSpace(obj))
                {
                    return false;
                }
                obj = Number(obj);
                return (!isNaN(obj) && isFinite(obj));
            }
            return false;
        }

        public static IsInteger(obj: any): obj is number
        {
            if (ValidacaoUtil.IsNumber(obj, false))
            {
                return obj % 1 === 0;
            }
            return false;
        }

        public static IsDecimal(obj: any): obj is number
        {
            if (ValidacaoUtil.IsNumber(obj, false))
            {
                return obj % 1 !== 0;
            }
            return false;
        }

        public static IsBoolean(obj: any): obj is boolean;
        public static IsBoolean(obj: any, isAceitarString: false): obj is boolean;
        public static IsBoolean(obj: any, isAceitarString: true): boolean;
        public static IsBoolean(obj: any, isAceitarString: boolean = true): boolean
        {
            if (typeof obj === "boolean")
            {
                return true;
            }

            if (isAceitarString)
            {
                if (ValidacaoUtil.IsNumber(obj))
                {
                    return ((parseInt(obj) === 1) || (parseInt(obj) === 0));
                }
                if (ValidacaoUtil.IsString(obj))
                {
                    obj = obj.toLowerCase();
                    return ((obj === "false") || (obj === "true"));
                }
            }

            return false;
        }

        public static IsDate(obj: Date | string | any): obj is Date;
        public static IsDate(obj: Date | string, isAceitarString: false): obj is Date;
        public static IsDate(obj: Date | string, isAceitarString: boolean): boolean;
        public static IsDate(obj: Date | string, isAceitarString: boolean = false): boolean
        {
            if (obj instanceof Date)
            {
                return true;
            }

            if (isAceitarString)
            {
                return ValidacaoUtil.IsDateString(obj);
            }
            return false;
        }

        public static IsDateString(obj: string): boolean
        {
            if (typeof obj === "string")
            {
                const dataString = DataHoraUtil.NormalizarDataHoraString(obj);
                const partes = dataString.trim().split(" ").Where(x => !String.IsNullOrWhiteSpace(x)).ToList();
                const parteData = partes.Where(x => x.Contains("/")).FirstOrDefault();
                if (parteData !== null)
                {
                    const [ano, mes, dia] = DataHoraUtil.ExtrairDataString(parteData, true);
                    if (ano > 0 && mes > 0 && dia)
                    {
                        const isDiaValido = (dia <= 31 && dia <= 31);
                        const isMesValido = (mes > 0 && mes <= 12);
                        const isAnoValido = ano >= ValidacaoUtil.DataInicio.Year && ano <= ValidacaoUtil.DataFim.Year;
                        return isDiaValido && isMesValido && isAnoValido;
                    }
                    return false;
                }
            }
            return false;
        }

        public static IsTimeSpan(obj: TimeSpan | string, isAceitarString: boolean = false): boolean
        {
            if (isAceitarString && typeof obj === "string")
            {
                return ValidacaoUtil.IsNumber(obj, true);
            }
            return obj instanceof TimeSpan || typeof obj === "number";
            //throw new ErroNaoImplementado(this);
        }

        public static IsGuid(valor: any): boolean
        {
            if (ValidacaoUtil.IsString(valor))
            {
                const exp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
                return exp.test(valor);
            }
            return false;
        }

        public static IsMd5(valor: any): boolean
        {
            if (ValidacaoUtil.IsString(valor))
            {
                const exp = /^[a-f0-9]{32}$/;
                return exp.test(valor);
            }
            return false;
        }

        public static IsGuidNaoVazio(obj: string): boolean
        {
            if (ValidacaoUtil.IsGuid(obj))
            {
                return obj !== GuidUtil.GuidVazio;
            }
            return false;
        }
        // #endregion

        // #region Texto

        public static IsPrimeiraLetraNumero(texto: string): boolean
        {
            if (texto != null)
            {
                if (texto.length === 0)
                {
                    return false;
                }
                const primeiraLetra = texto.charAt(0);
                return ValidacaoUtil.IsSomenteNumeros(primeiraLetra);
            }
            return false;
        }

        public static IsPrimeiraLetraCaixaAlta(texto: string): boolean
        {
            if (!String.IsNullOrWhiteSpace(texto))
            {
                if (texto.length === 0)
                {
                    return false;
                }
                const primeiraLetra = texto.charAt(0);
                return ValidacaoUtil.IsCaixaAlta(primeiraLetra);
            }
            return false;
        }

        public static IsSomenteNumeros(texto: string): boolean
        {
            return TextoUtil.IsSomenteNumeros(texto);
        }

        public static IsSomenteLetras(texto: string): boolean
        {
            return TextoUtil.IsSomenteLetras(texto);
        }

        public static IsSomenteLetrasNumeros(texto: string): boolean
        {
            return TextoUtil.IsSomenteLetrasNumeros(texto);
        }

        public static IsCaixaAlta(texto: string): boolean
        {
            return TextoUtil.IsCaixaAlta(texto);
        }

        public static IsEspacoEmBranco(texto: string): boolean
        {
            return TextoUtil.IsEspacoEmBranco(texto);
        }

        public static IsPropriedadeRequerida(propriedade: r.Propriedade): boolean
        {
            return propriedade.Atributos.OfType(d.Atributos.ValidacaoRequeridoAttribute).Count > 0;
        }
        // #endregion

        // #region  DOM HTML
        /**
         * Valida se é uma instancia de um elemento ou ele pertencem janela pai
         * @param obj
         */
        public static IsElementoHtml(obj: any): boolean
        {
            //no caso de elemento da window.partent  a expressão (obj instanceof HTMLElement) retorna falso]
            //então validamos apenas propriedades algumas propriedades
            return obj instanceof HTMLElement ||
                obj && typeof obj.tagName === "string" &&
                typeof obj.innerHTML === "string";

        }
        // #endregion

        // #region Validar Campos

        public static IsEmail(str: string): boolean
        {
            if (ValidacaoUtil.IsString(str))
            {
                const re = /^[a-zA-Z0-9][a-zA-Z0-9._-]+@([a-zA-Z0-9._-]+\.)[a-zA-Z-0-9]{2}/;
                if (re.test(str))
                {
                    const partes = str.split("@");
                    if (partes.length === 2)
                    {
                        return ValidacaoUtil.IsDominio(partes[1]);
                    }
                    return false;
                }
                return re.test(str);
            }
            return false;
        }

        public static IsDominio(dominio: string): boolean
        {
            if (ValidacaoUtil.IsString(dominio))
            {
                if (dominio.length > 3)
                {
                    const rgex = /^[\w\-_]+((\.[\w\-_]+)+([a-z]))?$/;
                    if (rgex.test(dominio))
                    {
                        return true;
                    }
                    const re = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
                    return re.test(dominio);
                }
            }
            return false;
        }

        public static IsSubDominio(subDominio: string): boolean
        {
            return ValidacaoUtil.IsSomenteLetrasNumeros(subDominio);
        }

        public static IsUrl(url: string): boolean
        {
            if (ValidacaoUtil.IsString(url))
            {
                return ValidacaoUtil.IsUrlHttp(url) ||
                    ValidacaoUtil.IsUrlBlob(url);
            }
            return false;
        }

        public static IsUrlHttp(url: string): boolean
        {
            if (ValidacaoUtil.IsString(url))
            {
                return url.StartsWith("http://") ||
                    url.StartsWith("https://") ||
                    url.StartsWith("//");
            }
            return false;
        }


        public static IsUrlBlob(url: any): url is string
        public static IsUrlBlob(url: string): boolean
        {
            if (ValidacaoUtil.IsString(url))
            {
                return url.StartsWith("blob:");
            }
            return false;
        }

        public static IsTelefone(telefone: string): boolean
        {
            if (u.ValidacaoUtil.IsString(telefone))
            {
                const letras = TextoUtil.RetornarSomenteLetras(telefone);
                const numeros = TextoUtil.RetornarSomenteNumeros(telefone);
                const isValido = letras.length === 0 && (numeros.length === 10 || numeros.length === 11);
                if (isValido)
                {
                    const ddd = parseInt(numeros.substring(0, 2));
                    return TelefoneUtil.DicionariosDDD.ContainsKey(ddd);
                }
                return false;
            }
            return false;
            //Aqui 
            //return true;
        }

        public static IsVersao(versao: string): boolean
        {
            if (u.ValidacaoUtil.IsString(versao))
            {
                const letras = TextoUtil.RetornarSomenteLetras(versao);
                const partes = versao.split(".");
                const isValido = letras.length === 0 && partes.length === 4;
                return isValido;
            }
            return false;
            //Aqui 
            //return true;
        }

        public static IsCpfOuCnpj(cpfOuCnpj: string): boolean
        {
            const somenteNumeros = TextoUtil.RetornarSomenteNumeros(cpfOuCnpj);
            if (somenteNumeros.length === 11)
            {
                return this.IsCpf(cpfOuCnpj);
            }
            return this.IsCnpj(cpfOuCnpj);

        }
        public static IsCpf(cpf: string): boolean
        {
            if (!u.ValidacaoUtil.IsString(cpf))
            {
                return false;
            }
            if (String.IsNullOrWhiteSpace(cpf))
            {
                return false;
            }
            cpf = TextoUtil.RetornarSomenteNumeros(cpf);
            if (cpf.length !== 11)
            {
                return false;
            }
            const primeiroNumero = cpf.substring(0, 1);
            if (cpf.All(x => x === primeiroNumero))
            {
                return false;
            }
            let soma: number = 0;
            let resto: number;

            for (let i: number = 1; i <= 9; i++)
            {
                soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }
            resto = (soma * 10) % 11;

            if ((resto === 10) || (resto === 11))
            {
                resto = 0;
            }
            if (resto !== parseInt(cpf.substring(9, 10)))
            {
                return false;
            }
            soma = 0;
            for (let i = 1; i <= 10; i++)
            {
                soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }
            resto = (soma * 10) % 11;

            if ((resto === 10) || (resto === 11))
            {
                resto = 0;
            }
            if (resto !== parseInt(cpf.substring(10, 11)))
            {
                return false;
            }
            return true;
        }

        public static IsCnpj(cnpj: string): boolean
        {
            cnpj = u.TextoUtil.RetornarSomenteNumeros(cnpj);

            if (cnpj.length !== 14)
            {
                return false;
            }

            const primeiroNumero = cnpj.substring(0, 1);
            if (cnpj.All(x => x === primeiroNumero))
            {
                return false;
            }

            let tamanho = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            const digitos = cnpj.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--)
            {
                soma += parseInt(numeros.charAt(tamanho - i)) * pos--;

                if (pos < 2)
                {
                    pos = 9;
                }
            }

            let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== parseInt(digitos.charAt(0)))
            {
                return false;
            }

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--)
            {
                soma += parseInt(numeros.charAt(tamanho - i)) * pos--;

                if (pos < 2)
                {
                    pos = 9;
                }
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== parseInt(digitos.charAt(1)))
            {
                return false;
            }

            return true;

        }

        private static IsCnpjAntigo(cnpj: string): boolean
        {
            if (!u.ValidacaoUtil.IsString(cnpj))
            {
                return false;
            }

            if (String.IsNullOrWhiteSpace(cnpj))
            {
                return false;
            }

            cnpj = TextoUtil.RetornarSomenteNumeros(cnpj);

            if (cnpj.length !== 14)
            {
                return false;
            }

            if (cnpj === "00000000000000" || cnpj === "11111111111111" || cnpj === "22222222222222" || cnpj === "33333333333333" || cnpj === "44444444444444" || cnpj === "55555555555555"
                || cnpj === "66666666666666" || cnpj === "77777777777777" || cnpj === "88888888888888" || cnpj === "99999999999999")
            {
                return false;
            }

            let tamanho = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            const digitos = cnpj.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--)
            {
                soma += parseInt(numeros.charAt(tamanho - i)) * pos--;

                if (pos < 2)
                {
                    pos = 9;
                }
            }

            let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== parseInt(digitos.charAt(0)))
            {
                return false;
            }

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--)
            {
                soma += parseInt(numeros.charAt(tamanho - i)) * pos--;

                if (pos < 2)
                {
                    pos = 9;
                }
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== parseInt(digitos.charAt(1)))
            {
                return false;
            }

            return true;
        }

        public static IsCep(cep: string): boolean
        {
            if (u.ValidacaoUtil.IsString(cep))
            {
                const letras = TextoUtil.RetornarSomenteLetras(cep);
                const numeros = TextoUtil.RetornarSomenteNumeros(cep);
                return letras.length === 0 && (numeros.length === 5 || numeros.length === 8);
            }
            return false;
        }

        public static IsCepLogradouro(cep: string): boolean
        {
            if (u.ValidacaoUtil.IsString(cep))
            {
                const letras = TextoUtil.RetornarSomenteLetras(cep);
                const numeros = TextoUtil.RetornarSomenteNumeros(cep);
                return letras.length === 0 && (numeros.length === 8);
            }
            return false;

        }
        public static IsIntervaloValido(valor: number, inicio: number, fim: number): boolean
        {
            //if (u.ValidacaoUtil.IsNumber(valor))
            //{
            return (valor >= inicio && valor <= fim);
            //}
            //return false;
        }
        // #endregion

        // #region Serviço

        public static IsUrlServico(url: string): boolean
        {
            if (ValidacaoUtil.IsUrlHttp(url))
            {
                //var nomeArquivo = UrlUtil.RetornarNomeArquivoUrl(url).toLowerCase();
                //return nomeArquivo.EndsWith('ashx');

                return url.EndsWith("/");
            }
            return false;
        }

        public static IsCorString(cor: string, aceitarCorTransparente: boolean = false): boolean
        {
            return this.IsCorRgbOuRgba(cor, aceitarCorTransparente) || this.IsCorHexa(cor);

        }
        public static IsCorRgbOuRgba(cor: string, aceitarCorTransparente: boolean = false): boolean
        {
            if (typeof cor === "string")
            {
                const rgbRegex = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/;
                const resultado = rgbRegex.exec(cor);
                return resultado != null;
                //const isCor = cor.trim().StartsWith("rgb");
                //return isCor && (aceitarCorTransparente || cor !== d.Cor.COR_TRANSPARENTE);
            }
            return false;
        }

        public static IsCorHexa(corHexa: string)
        {
            const regex = /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{8})$/;
            const resultado = regex.exec(corHexa);
            return (resultado != null);
        }

        // #endregion

        //#region Bind

        public static IsBind(caminho: string): boolean;
        public static IsBind(caminho: any): boolean;
        public static IsBind(caminho: any): boolean
        {
            if (typeof caminho === "string" && caminho.length > 0)
            {
                const inicio = caminho.indexOf("{{");
                const fim = caminho.lastIndexOf("}}");
                return inicio >= 0 && fim >= 0;
            }
            return false;
        }

        //#endregion

        public static IsUint8(valor: number)
        {
            return ValidacaoUtil.IsInteger(valor) && valor >= Number.Uint8MinValue && valor <= Number.Uint8MaxValue;

        }

        public static IsInt16(valor: number): boolean
        {
            return ValidacaoUtil.IsInteger(valor) && valor >= Number.Int16MinValue && valor <= Number.Int16MaxValue;
        }

        public static IsInt32(valor: number): boolean
        {
            return ValidacaoUtil.IsInteger(valor) && valor >= Number.Int32MinValue && valor <= Number.Int32MaxValue;
        }
        public static IsInt64(valor: number): boolean
        {
            return ValidacaoUtil.IsInteger(valor) && valor >= Number.Int64MinValue && valor <= Number.Int64MaxValue;
        }

        public static IsPositivo(valor: number): boolean
        {
            return ValidacaoUtil.IsNumber(valor) && valor >= 0;
        }


        public static ValidarByte(valor: number): void
        {
            if (!ValidacaoUtil.IsByte(valor))
            {
                throw new Erro("O valor não é um byte");
            }
        }

        public static ValidarInt16(valor: number): void
        {
            if (!ValidacaoUtil.IsInt16(valor))
            {
                throw new Erro("O valor não é um byte");
            }
        }

        public static ValidarInt32(valor: number): void
        {
            if (!ValidacaoUtil.IsInt32(valor))
            {
                throw new Erro("O valor não é um byte");
            }
        }

        public static ValidarPositivo(valor: number): void
        {
            if (!ValidacaoUtil.IsPositivo(valor))
            {
                throw new Erro("O valor não é um positivo");
            }
        }

        public static ValidarIntervalo(valor: number, inicio: number, fim: number, nomeArgumento?: string): void
        {
            if (!ValidacaoUtil.IsIntervaloValido(valor, inicio, fim))
            {
                let mensagem = `O valor está fora do intervalo ${inicio} e ${fim}`;
                if (typeof nomeArgumento === "string")
                {
                    mensagem += "Argumento: " + nomeArgumento;
                }
                throw new Erro(mensagem);
            }
        }

        /**
         * Validar se um argumento (parâmetro ou variável) está definida,o argumento ser passada como objeto;
         * @param objetoArgumento objeto do argumento. Ex:
         * let temp: 
         * string; ValidarVariavel({temp});
         */
        public static ValidarArgumentoDefinido(objetoArgumento: Partial<object>)
        {
            const nomeArgumento = this.RetornarNomeArgumento(objetoArgumento);
            const valorArgumento = (objetoArgumento as any)[nomeArgumento];
            if (typeof valorArgumento === "string")
            {
                if (String.IsNullOrWhiteSpace(valorArgumento))
                {
                    throw new ErroNaoDefinido(`O argumento '${nomeArgumento}' não foi definido`);
                }
                return;
            }

            if (!u.ValidacaoUtil.IsDefinido(valorArgumento))
            {
                throw new ErroNaoDefinido(`O argumento '${nomeArgumento}' não foi definido`);
            }
        }

        public static ValidarArgumentoUndefined(objetoArgumento: Partial<object>)
        {
            const nomeArgumento = this.RetornarNomeArgumento(objetoArgumento);
            const valorArgumento = (objetoArgumento as any)[nomeArgumento];
            if (valorArgumento === undefined)
            {
                throw new ErroNaoDefinido(`O argumento '${nomeArgumento}' não foi definido`);
            }
        }

        /**
        * Validar se um argumento (parâmetro ou variável) está definida e se é tipo da instancia do construtor, o argumento ser passada como objeto;
        * @param objetoArgumento objeto da variável. Ex:
        * let temp: 
        * string; ValidarVariavel({temp});
        */
        public static ValidarArgumentoInstanciaDe(objetoArgumento: Partial<object>, construtor: Function)
        {

            if (typeof construtor !== "function")
            {
                throw new Erro("O argumento  'construtor' não é do tipo function");
            }

            if (objetoArgumento instanceof construtor)
            {
                return;
            }

            this.ValidarArgumentoDefinido(objetoArgumento);

            const nomeArgumento = this.RetornarNomeArgumento(objetoArgumento);
            const valorArgumento = (objetoArgumento as any)[nomeArgumento];
            if (valorArgumento instanceof construtor)
            {
                return;
            }

            if (Array.isArray(valorArgumento) && construtor === Array)
            {
                return;
            }

            if (typeof valorArgumento.GetType === "function")
            {
                const tipoConstrutor = u.ReflexaoUtil.RetornarTipo(construtor);
                const tipoArgumento = valorArgumento.GetType();
                if (tipoConstrutor === tipoArgumento)
                {
                    return;
                }
            }

            const nomeTipo = u.ReflexaoUtil.RetornarNomeTipo(construtor);
            throw new Erro(`O argumento '${nomeArgumento}' não é do tipo '${nomeTipo}' o argumento deve ser objeto {argumento} `);

        }

        private static RetornarNomeArgumento(objetoArgumento: any): string
        {
            for (const nomeArgumento in objetoArgumento)
            {
                /*eslint-disable*/
                if (objetoArgumento.hasOwnProperty(nomeArgumento))
                {
                    return nomeArgumento;
                }
            }
            throw new Erro("Não foi possível retornar o nome do argumento");
        }

        public static IsByte(valor: number)
        {
            return ValidacaoUtil.IsUint8(valor);
        }

        public static CredencialValida(credencial1: s.Credencial, credencial2: s.Credencial)
        {
            return credencial1.IdentificadorUsuario === credencial2.IdentificadorUsuario &&
                credencial1.Senha === credencial2.Senha;
        }

        public static IsHora(horaString: string): boolean
        {
            if (!String.IsNullOrEmpty(horaString) && horaString.Contains(":"))
            {
                let ocorrencias = TextoUtil.RetornarOcorrenciasParteTexto(horaString, ':');
                return ocorrencias === 1 || ocorrencias === 2;
            }
            return false;
        }

        private static get DataInicio(): Date
        {
            return new Date().AddYears(-100);
        }

        private static get DataFim(): Date
        {
            return new Date().AddYears(50);
        }

        public static IsDataValida(data: any): boolean
        {
            if (this.IsDate(data) && !isNaN(data.getTime()))
            {
                return data > this.DataInicio && data < this.DataFim;
            }
            return false;
        }

        public static IsDataNascimento(data: Date): boolean
        {
            if (this.IsDate(data))
            {
                return data > new Date().AddYears(-120) && data < new Date();

            }
            return false;
        }

        public static IsCelular(valor: string): boolean
        {
            if (!String.IsNullOrEmpty(valor))
            {
                let somentesNumero = TextoUtil.RetornarSomenteNumeros(valor);
                return somentesNumero.length === 11;
            }
            return false;
        }

        public static IsTipoPrimario(valor: any): boolean
        {
            if (valor != null && u.ValidacaoUtil.IsFunction(valor.GetType))
            {
                let tipo = valor.GetType();
                return tipo instanceof r.TipoPrimario;
            }
            return false;
        }

        public static IsConstrutorEntidade(construtor: IConstrutor<Entidade> | Function): boolean
        {
            if (u.ValidacaoUtil.IsDefinido(construtor) && u.ValidacaoUtil.IsFunction(construtor.GetType))
            {
                let tipo = construtor.GetType();
                return tipo instanceof r.TipoEntidade;
            }
            return false;
        }

        public static IsFlagsEnumDefinida<TEnum>(construtorEnum: TEnum, soma: number): boolean
        {
            let flags = EnumUtil.RetornarFlags(construtorEnum, soma);
            if (flags.Count > 0)
            {
                return flags.Sum() === soma;
            }
            return false;
        }

        public static IsValorConstrutorValor(valor: any, construtor: Function): boolean
        {
            if (ValidacaoUtil.IsDefinido(valor))
            {
                if (valor instanceof construtor)
                {
                    return true;
                }

                let tipoConstrtuor = construtor.GetType();
                if (tipoConstrtuor === valor.GetType())
                {
                    return true;
                }

                let nomeTipo = tipoConstrtuor.Nome.toLowerCase();
                if (typeof valor === nomeTipo)
                {
                    return true;
                }
            }
            return false;
        }

        public static IsTipoPrimarioDefinido(valorPropriedade: any, tipoPrimario?: r.EnumTipoPrimario, isAceitarString: boolean = false): boolean
        {
            if (u.ValidacaoUtil.IsDefinido(valorPropriedade))
            {
                tipoPrimario = EnumUtil.IsDefindo(r.EnumTipoPrimario, tipoPrimario) ? tipoPrimario :
                    ReflexaoUtil.RetornarTipoPrimarioEnum(valorPropriedade);

                switch (tipoPrimario)
                {
                    case (r.EnumTipoPrimario.Boolean):

                        return ValidacaoUtil.IsBoolean(valorPropriedade, true);

                    case (r.EnumTipoPrimario.String):

                        return !String.IsNullOrWhiteSpace(valorPropriedade);

                    case (r.EnumTipoPrimario.Integer):
                    case (r.EnumTipoPrimario.Long):
                    case (r.EnumTipoPrimario.Decimal):
                    case (r.EnumTipoPrimario.Double):

                        if (ValidacaoUtil.IsNumber(valorPropriedade, isAceitarString))
                        {
                            return (u.ConverterUtil.ParaNumero(valorPropriedade, false) > 0);
                        }
                        return false;

                    case (r.EnumTipoPrimario.DateTime):

                        return u.ValidacaoUtil.IsDate(valorPropriedade, isAceitarString);

                    case (r.EnumTipoPrimario.Guid):

                        return u.ValidacaoUtil.IsGuid(valorPropriedade);

                    case (r.EnumTipoPrimario.TimeSpan):

                        return u.ValidacaoUtil.IsTimeSpan(valorPropriedade, isAceitarString);

                    default:

                        throw new ErroNaoSuportado(`O tipo primário não é suportado ${u.EnumUtil.RetornarDescricao(r.EnumTipoPrimario, tipoPrimario)}`, this);
                }
            }

            return false;
        }

        //#region Texto

        public static IsCaraterEspacoBranco(caracter: string): boolean
        {
            return TextoUtil.IsCaraterEspacoBranco(caracter);
        }


        /**
         * Valida se o carácter é um numero
         * @param caracter
         */
        public static IsDigito(caracter: string | number): boolean
        {
            if (typeof caracter === "number")
            {
                caracter = caracter.toString();
            }
            return TextoUtil.IsDigito(caracter);
        }

        public static IsLetra(caracter: string): boolean
        {
            return TextoUtil.IsLetra(caracter);
        }

        public static IsLetraOuNumero(caracter: string): boolean
        {
            return TextoUtil.IsLetraOuNumero(caracter);
        }

        public static IsSomenteNumerosPontosSinais(texto: string): boolean
        {
            return TextoUtil.IsSomenteNumerosPontosSinais(texto);
        }

        public static IsSomenteNumerosPontosSinaisSimbolos(texto: string): boolean
        {
            return TextoUtil.IsSomenteNumerosPontosSinaisSimbolos(texto);
        }


        public static IsUF(valorPropriedade: string): boolean
        {
            let uf = valorPropriedade?.toUpperCase().trim();
            return EnumUtil.IsDefindo(EnumUF, uf);
        }

        public static IsJson(json: string): boolean
        {
            return JsonUtil.IsJson(json);
        }

        //#endregion

        //#region Nome

        public static IsNomeCompleto(nomeCompleto: string): boolean
        {
            if (nomeCompleto != null)
            {
                let [nome, sobrenome] = FormatacaoNomeUtil.FormatarNomeSobrenome(nomeCompleto);

                return !String.IsNullOrEmpty(nome) &&
                    !String.IsNullOrEmpty(sobrenome);

                //var partes = valorPropriedade.Trim().Split(' ');
                //return partes.Count() >= 1 && partes.Where(x => x.Length >= 2).Count() >= 2;
            }
            return false;
        }

        public static IsPossuiSobrenome(nomeCompleto: string): boolean
        {
            let [nome, sobrenome] = FormatacaoNomeUtil.FormatarNomeSobrenome(nomeCompleto);
            return !String.IsNullOrEmpty(sobrenome);
        }

        public static IsPossuiPrimeiroNome(nomeCompleto: string)
        {
            let [nome, sobrenome] = FormatacaoNomeUtil.FormatarNomeSobrenome(nomeCompleto);
            let letras = TextoUtil.RetornarSomenteLetras(nome);
            return letras.length >= 2;
        }

        //#endregion

        //#region Medidas

        public static IsDimensaoValida(dimensao: IDimensao)
        {
            if (dimensao != null)
            {
                return dimensao.Largura > 0 && dimensao.Altura > 0 &&
                    !isNaN(dimensao.Largura) && !isNaN(dimensao.Largura);
            }
            return false;
        }

        public static IsPosicaoValida(posicao: IPosicao)
        {
            if (posicao != null)
            {
                return posicao.X != null && !isNaN(posicao.X) &&
                    posicao.Y != null && !isNaN(posicao.Y);

            }
            return posicao;
        }

        //#endregion

        public static ValidarTimeout(descricao: string, timeout: number, isSomenteDebug: boolean = false)
        {
            return window.setTimeout(function ()
            {
                if (!isSomenteDebug && ($Configuracao.IsDebug || $Configuracao.IsTeste))
                {
                    throw new Erro(`O time limite para a operação ${descricao} foi atingido`)
                }
            }, timeout);
        }

        public static ValidarPalavraTamanho(texto: string, tamanhoMinimo: number, tamanhoMaximo: number): boolean
        {
            if (!String.IsNullOrWhiteSpace(texto))
            {
                const partes = texto.split(/\s+/);
                if (partes.Any(x => !ValidacaoUtil.ValidarTextoTamanho(x, tamanhoMinimo, tamanhoMaximo)))
                {
                    return false;
                }
            }
            return true;
        }

        public static ValidarTextoTamanho(texto: string, tamanhoMinimo: number, tamanhoMaximo: number): boolean
        {
            if (tamanhoMinimo > 0 && texto.length <= tamanhoMinimo)
            {
                return false;
            }
            if (tamanhoMaximo > 0 && texto.length >= tamanhoMaximo)
            {
                return false;
            }
            return true;
        }

        public static ValidarAngulo(angulo: number): boolean
        {
            if (ValidacaoUtil.IsNumber(angulo))
            {
                return angulo >= -360 && angulo <= 360;
            }
            return false;
        }

        public static IsIP(ipString: string): boolean
        {
            if (!String.IsNullOrWhiteSpace(ipString))
            {
                const partes = ipString.split(".");
                if (partes.length === 4)
                {
                    return partes.All(x => ValidacaoUtil.IsNumber(x, true) && ValidacaoUtil.IsByte(parseInt(x)));
                }
            }
            return false;
        }

        public static IsValorProgressoValido(valor: number): boolean
        {
            return ValidacaoUtil.IsNumber(valor) &&
                valor >= 0 && valor <= 100;
        }

        public static ValidarEnumDefinido<T, TEnum>(obj: T, expressaoPropriedade: (value: T) => TEnum[keyof TEnum], construtorEnum: TEnum): void
        {
            const nomePropriedade = ExpressaoUtil.RetornarNomePropriedade(expressaoPropriedade);
            const valor = (obj as any)[nomePropriedade];

            if (!EnumUtil.IsDefindo(construtorEnum, valor))
            {
                throw new Erro(`O propriedade ${nomePropriedade} do tipo enum ${u.ReflexaoUtil.RetornarNomeTipo(construtorEnum)} não está definida no objecto ${obj?.GetType().Nome} '${obj}`);
            }
        }
    }

    export enum EnumUF
    {
        Acre = "AC",
        Alagoas = "AL",
        Amapa = "AP",
        Amazonas = "AM",
        Bahia = "BA",
        Ceara = "CE",
        DistritoFederal = "DF",
        EspiritoSanto = "ES",
        Goias = "GO",
        Maranhão = "MA",
        MatoGrosso = "MT",
        MatoGrossoDoSul = "MS",
        MinasGerais = "MG",
        Para = "PA",
        Paraiba = "PB",
        Parana = "PR",
        Pernambuco = "PE",
        Piaui = "PI",
        RioDeJaneiro = "RJ",
        RioGrandeDoNorte = "RN",
        RioGrandeDoSul = "RS",
        Rondonia = "RO",
        Roraima = "RR",
        SantaCatarina = "SC",
        SaoPaulo = "SP",
        Sergipe = "SE",
        Tocantins = "TO"
    }
}