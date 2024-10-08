﻿namespace Snebur.Utilidade
{
    export class TextoUtil
    {
        public static FormatarRota(texto: string)
        {
            let rota = TextoUtil.RetornarSomentesLetrasNumeros(texto.trim(), true);
            rota = rota.Replace(" ", "-").toLowerCase();

            while (rota.Contains(" "))
            {
                rota = rota.replace(" ", "-");
            }

            while (rota.Contains("--"))
            {
                rota = rota.replace("--", "-");
            }

            if (String.IsNullOrWhiteSpace(rota))
            {
                return "sem-nome";
            }
            return UrlUtil.AjustarBarraInicialFinal(rota);
        }

        public static IsIniciaComNumero(texto: string): boolean
        {
            if (u.ValidacaoUtil.IsString(texto) && texto.length > 0)
            {
                const primeiroCaracter = texto.charAt(0);
                return this.IsDigito(primeiroCaracter);
            }
            return false;
        }

        public static RemoverParte(texto: string, inicio: number, fim: number): string
        {
            if (inicio < 0) inicio = 0;
            if (inicio === fim)
            {
                fim += 1;
            }
            if (fim > texto.length) fim = texto.length;

            const parteInicio = texto.substring(0, inicio);
            const parteFim = texto.substring(fim, texto.length);
            return parteInicio + parteFim;
        }

        public static RetornarSomenteNumeros(texto: string): string;
        public static RetornarSomenteNumeros(texto: string, isPermitirEspacoEmBranco: boolean): string;
        public static RetornarSomenteNumeros(texto: string, isPermitirEspacoEmBranco: boolean, isPerimitirPontoSinais: boolean): string;
        public static RetornarSomenteNumeros(texto: string, isPermitirEspacoEmBranco: boolean = false, isPerimitirPontoSinais: boolean = false): string
        {
            if (isPerimitirPontoSinais)
            {
                return TextoUtil.RetornarTextoCaracteresPermitidoInterno(texto, TextoUtilConstantes.NumerosPontoSinaisObjetos, isPermitirEspacoEmBranco);
            }

            return TextoUtil.RetornarTextoCaracteresPermitidoInterno(texto, TextoUtilConstantes.NumerosObjetos, isPermitirEspacoEmBranco);
        }

        public static RetornarSomenteLetras(texto: string): string;
        public static RetornarSomenteLetras(texto: string, isPermitirEspacoEmBranco: boolean): string;
        public static RetornarSomenteLetras(texto: string, isPermitirEspacoEmBranco: boolean = false): string
        {
            return TextoUtil.RetornarTextoCaracteresPermitidoInterno(texto, TextoUtilConstantes.LetrasObjetos, isPermitirEspacoEmBranco);
        }

        public static RetornarSomentesLetrasNumeros(texto: string): string;
        public static RetornarSomentesLetrasNumeros(texto: string, isPermitirEspacoEmBranco: boolean): string;
        public static RetornarSomentesLetrasNumeros(texto: string, isPermitirEspacoEmBranco: boolean = false): string
        {
            return TextoUtil.RetornarTextoCaracteresPermitidoInterno(texto, TextoUtilConstantes.LetrasNumerosObjetos, isPermitirEspacoEmBranco);
        }

        public static RetornarTextoCaracteresPermitido(texto: string, caracteresPermitidos: string): string;
        public static RetornarTextoCaracteresPermitido(texto: string, caracteresPermitidos: string, isPermitirEspacoEmBranco: boolean, substituir: string): string;
        public static RetornarTextoCaracteresPermitido(texto: string, caracteresPermitidos: string, isPermitirEspacoEmBranco: boolean = false, substituir: string = null): string
        {
            const caracteresPermitidoObjetos = TextoUtilConstantes.TextoParaObjetos(caracteresPermitidos);
            return TextoUtil.RetornarTextoCaracteresPermitidoInterno(texto, caracteresPermitidoObjetos, isPermitirEspacoEmBranco, substituir);
        }

        private static RetornarTextoCaracteresPermitidoInterno(texto: string, caractesObjets: any, isPermitirEspacoEmBranco: boolean, substituir: string = null): string
        {
            if (String.IsNullOrEmpty(texto))
            {
                return String.Empty;
            }

            texto = ConverterUtil.ParaString(texto);
            const sb = new StringBuilder();
            if (ValidacaoUtil.IsString(texto))
            {
                for (let i = 0; i < texto.length; i++)
                {
                    const caracter = texto.charAt(i);
                    if (caractesObjets[caracter] === caracter)
                    {
                        sb.Append(caracter);
                    }
                    else if (isPermitirEspacoEmBranco && TextoUtil.IsCaraterEspacoBranco(caracter))
                    {
                        sb.Append(caracter);
                    }
                    else
                    {
                        if (substituir != null)
                        {
                            sb.Append(substituir);
                        }
                    }
                }
            }
            return sb.ToString();
        }

        public static FormatarPrimeiraLetraMinuscula(texto: string): string
        {
            if (String.IsNullOrEmpty(texto))
            {
                return String.Empty;
            }
            const indicePrimeiraLetra = texto.search(/\S/);
            if (!String.IsNullOrWhiteSpace(texto))
            {
                return `${texto.substring(0, indicePrimeiraLetra)}${texto.substring(indicePrimeiraLetra, indicePrimeiraLetra + 1).toLowerCase()}${texto.substring(indicePrimeiraLetra + 1)}`;
            }
            return String.Empty;
        }

        public static FormatarPrimeiraLetraMaiuscula(texto: string): string
        {
            if (String.IsNullOrEmpty(texto))
            {
                return String.Empty;
            }

            const indicePrimeiraLetra = texto.search(/\S/);
            if (!String.IsNullOrWhiteSpace(texto))
            {
                return `${texto.substring(0, indicePrimeiraLetra)}${texto.substring(indicePrimeiraLetra, indicePrimeiraLetra + 1).toUpperCase()}${texto.substring(indicePrimeiraLetra + 1)}`;
            }
            return String.Empty;
        }

        public static RetornarSomentePrimeiraLetraMaiuscula(texto: string): string
        {
            if (String.IsNullOrWhiteSpace(texto))
            {
                return String.Empty;
            }
            return texto.trim()[0].toUpperCase();
        }

        public static RemoverAcentos(texto: string): string
        {
            texto = ConverterUtil.ParaString(texto);
            const sb = new StringBuilder();
            const len = texto.length;
            for (let i = 0; i < len; i++)
            {
                const caracter = texto.charAt(i);
                const caracterMepado = TextoUtilConstantes.AcentosMapeadoObjetos[caracter];
                if (caracterMepado !== undefined)
                {
                    sb.Append(caracterMepado);
                }
                else
                {
                    sb.Append(caracter);
                }
            }
            return sb.ToString();
        }

        public static RemoverPontosSinais(texto: string): string
        {
            if (String.IsNullOrWhiteSpace(texto))
            {
                return texto;
            }
            return TextoUtil.RetornarTextoCaracteresPermitidoInterno(texto, TextoUtilConstantes.PontosSinais, true);
        }

        public static RemoverCaracteresEspecial(texto: string, substituir?: string, isPermitirEspacoEmBranco: boolean = true): string
        {
            if (String.IsNullOrWhiteSpace(texto))
            {
                return "";
            }
            return TextoUtil.RetornarTextoCaracteresPermitidoInterno(texto, TextoUtilConstantes.CaracteresPadrao, isPermitirEspacoEmBranco, substituir);
        }

        public static RemoverCaracteresEspecialPontosSinais(texto: string, substituir?: string): string
        {
            if (String.IsNullOrWhiteSpace(texto))
            {
                return texto;
            }
            return TextoUtil.RetornarTextoCaracteresPermitidoInterno(texto, TextoUtilConstantes.CaracteresPadraoSemPontosSinais, true, substituir);
        }

        public static RemoverEspacosEmBranco(texto: string): string
        {
            if (String.IsNullOrWhiteSpace(texto))
            {
                return texto;
            }

            texto = ConverterUtil.ParaString(texto);
            const sb = new StringBuilder();
            if (ValidacaoUtil.IsString(texto))
            {
                for (let i = 0; i < texto.length; i++)
                {
                    const caracter = texto.charAt(i);
                    if (!TextoUtil.IsCaraterEspacoBranco(caracter))
                    {
                        sb.Append(caracter);
                    }
                }
            }
            return sb.ToString();
        }

        public static RetornarNumeroLinhas(texto: string): number
        {
            return texto.split(/\r\n|\r|\n/).length;
        }

        public static RetornarLinhas(texto: string): List<string>
        {
            if (String.IsNullOrWhiteSpace( texto ))
            {
                return [];
            }

            return texto.split(/\r\n|\r|\n/);
        }

        public static CountCharOcorrences(text: string, char: string): number
        {
            return TextoUtil.RetornarOcorrenciasParteTexto(text, char);
        }

        public static RetornarOcorrenciasParteTexto(texto: string, letra: string): number
        {
            let cont = 0;
            let quant = 0;
            let pos = -1;
            let pos_ant = -1;

            while (cont < texto.length)
            {
                pos = texto.indexOf(letra, cont);
                if (pos !== pos_ant && pos !== -1)
                {
                    quant += 1;
                }
                cont += 1;
                pos_ant = pos;
            }
            return quant;
        }

        public static IsCaraterEspacoBranco(caracter: string): boolean
        {
            if (caracter == null)
            {
                return false;
            }
            return TextoUtilConstantes.CaracteresEmBrancoObjetos[caracter] === caracter;
        }

        public static IsDigito(caracter: string | number): boolean
        {
            if (typeof caracter === "number")
            {
                caracter = caracter.toString();
            }
            if (caracter.length > 1)
            {
                console.warn("Validação somente para carácter ou algarismo");
            }
            if (caracter == null)
            {
                return false;
            }
            return TextoUtilConstantes.NumerosObjetos[caracter] === caracter;
        }

        public static IsLetra(caracter: string): boolean
        {
            if (caracter == null)
            {
                return false;
            }
            return TextoUtilConstantes.LetrasObjetos[caracter] === caracter;
        }

        public static IsLetraOuNumero(caracter: string): boolean
        {
            if (caracter == null)
            {
                return false;
            }
            return TextoUtilConstantes.LetrasNumerosObjetos[caracter] === caracter;
        }

        public static IsSomenteNumerosPontosSinais(texto: string): boolean
        {
            return TextoUtil.IsTextoValidoInterno(texto,
                TextoUtilConstantes.NumerosPontoSinaisObjetos);
        }

        public static IsSomenteNumerosPontosSinaisSimbolos(texto: string): boolean
        {
            return TextoUtil.IsTextoValidoInterno(texto,
                TextoUtilConstantes.NumerosPontoSinaisSimbolosObjetos);
        }

        public static IsSomenteNumeros(texto: string): boolean
        {
            return TextoUtil.IsTextoValidoInterno(texto, TextoUtilConstantes.NumerosObjetos);
        }

        public static IsSomenteLetras(texto: string): boolean
        {
            return TextoUtil.IsTextoValidoInterno(texto, TextoUtilConstantes.LetrasObjetos);
        }

        public static IsSomenteLetrasNumeros(texto: string): boolean
        {
            return TextoUtil.IsTextoValidoInterno(texto, TextoUtilConstantes.LetrasNumerosObjetos);
        }

        public static IsSomenteLetrasNumerosPontos(texto: string): boolean
        {
            return TextoUtil.IsTextoValidoInterno(texto, TextoUtilConstantes.LetrasNumerosObjetosPontos);
        }

        //public static IsSomenteLetrasNumerosPontosSinais(texto: string): boolean
        //{
        //    return TextoUtil.IsTextoValidoInterno(texto,
        //        TextoUtilConstantes.NumerosPontoSinaisObjetos);
        //}

        public static IsCaixaAlta(texto: string): boolean
        {
            return TextoUtil.IsTextoValidoInterno(texto, TextoUtilConstantes.CaixasAltaObjetos);
        }

        public static IsTextoContem(texto: string, caracteres: string)
        {
            return TextoUtil.IsTextoValidoInterno(texto, caracteres);
        }

        public static IsEspacoEmBranco(texto: string): boolean
        {
            texto = ConverterUtil.ParaString(texto);
            return texto.trim().length === 0;
        }

        private static IsTextoValidoInterno(texto: string, caracteresPermitidoObjetos: string | any): boolean
        {
            texto = ConverterUtil.ParaString(texto);
            if (typeof caracteresPermitidoObjetos === "string")
            {
                for (let i = 0; i < texto.length; i++)
                {
                    if (caracteresPermitidoObjetos.indexOf(texto.charAt(i)) === -1)
                    {
                        return false;
                    }
                }
                return true;
            }

            for (let i = 0; i < texto.length; i++)
            {
                if (caracteresPermitidoObjetos[texto.charAt(i)] === undefined)
                {
                    return false;
                }
            }
            return true;
        }

        /**
        * Remover conteúdo do inicio do texto, os espaços são ignorados
        * @param texto
        * @param remover conteúdo para ser removido
        * @param isRecursivo o conteúdo ser removido enquanto for encontrado
        * @param isIgnorarCasoSenssivel ignorar letras maiúscula  e  minuscula
        */
        public static RemoverInicio(texto: string, remover: string, isRecursivo: boolean = false, isIgnorarCasoSenssivel: boolean = false): string
        {
            texto = texto.trim();
            while (texto.StartsWith(remover, isIgnorarCasoSenssivel))
            {
                if (!isRecursivo)
                {
                    break;
                }
                texto = texto.substring(remover.length).trim();
            }
            return texto;
        }

        /**
      * Remover conteúdo do fim  texto, os espaços são ignorados
      * @param texto
      * @param remover conteúdo para ser removido
      * @param isRecursivo o conteúdo ser removido enquanto for encontrado
      * @param isIgnorarCasoSenssivel ignorar letras maiúscula  e  minuscula
      */
        public static RemoverFim(texto: string, remover: string, isRecursivo: boolean = false, isIgnorarCasoSenssivel: boolean = false): string
        {
            texto = texto.trim();
            while (texto.EndsWith(remover, isIgnorarCasoSenssivel))
            {
                if (!isRecursivo)
                {
                    break;
                }
                texto = texto.substring(0, texto.length - remover.length).trim();
            }
            return texto;
        }

        public static FormatarPequisa(texto: string): string
        {
            if (String.IsNullOrWhiteSpace(texto))
            {
                return String.Empty;
            }
            return TextoUtil.RemoverCaracteresEspecialPontosSinais(TextoUtil.RemoverAcentos(texto), " ").trim().toLowerCase();
        }

        public static RetornarPartesPequisa(pesquisa: string): List<string>
        {
            if (String.IsNullOrWhiteSpace(pesquisa))
            {
                return [];
            }

            return pesquisa.split(",").
                SelectMany(x => x.split(" ")).
                Select(x => u.TextoUtil.FormatarPequisa(x)).
                Where(x => !String.IsNullOrWhiteSpace(x));
        }

        public static Concatenar(partes: string[]): string;
        public static Concatenar(partes: string[], separador: string): string;
        /**
         * 
         * @param partes
         * @param separadores separador e separador da ultima parte
         * Ex. TextoUtil.Concatenar(["Feijão, "Arroz", "Carne"], ", ", " e ") => "Feijão, Arroz e Carne
         */
        public static Concatenar(partes: string[], separadores: [string, string]): string;
        public static Concatenar(partes: string[], separadorOuSeparadores?: [string, string] | string): string
        {
            if (separadorOuSeparadores != null)
            {
                if (typeof separadorOuSeparadores === "string")
                {
                    return String.Join(separadorOuSeparadores, partes);
                }
                if (Array.isArray(separadorOuSeparadores) && separadorOuSeparadores.length === 2)
                {
                    const [separador, separadorUltimaParte] = separadorOuSeparadores;
                    if (partes.length > 1)
                    {
                        const ultimaParte = partes.pop();
                        return `${String.Join(separador, partes)}${separadorUltimaParte}${ultimaParte}`;
                    }
                    return String.Join(separador, partes);
                }

                throw new Erro(`O argumento separadorOuSeparadores: '${separadorOuSeparadores}' não é suportado`);
            }
            return String.Join(String.Empty, partes);
        }

        public static NormalizarPlural(quantidade: number, singular: string, plural?: string)
        {
            const descricao = (quantidade === 1) ?
                singular :
                plural ?? `${singular}s`;
            return String.Format(descricao, quantidade);
        }

        public static AdicionarEspacoSeTextoSemEspaco(texto: string, maximoSemEspecao: number): string
        {
            if (!(maximoSemEspecao > 0))
            {
                throw new Erro("O valor de maximoSemEspecao deve ser maior que zero");
            }

            const retorno = new StringBuilder();
            let contador = 0;
            for (const char of texto)
            {
                if (TextoUtil.IsCaraterEspacoBranco(char))
                {
                    contador = 0;
                }
                else
                {
                    contador += 1;
                }

                if (contador > maximoSemEspecao)
                {
                    retorno.Append(" ");
                    contador = 0;
                }
                retorno.Append(char);
            }
            return retorno.ToString();
        }

        public static FormatarTitulio(titulo: string): string
        {
            if (String.IsNullOrWhiteSpace(titulo))
            {
                return "";
            }
            const partes = titulo.Split(" ", true);
            const sb = new StringBuilder();
            for (const parte of partes)
            {
                if (parte in TextoUtilConstantes.PALAVRAS_NAO_CAPITALIZAR)
                {
                    sb.Append(parte);
                }
                else
                {
                    sb.Append(TextoUtil.FormatarPrimeiraLetraMaiuscula(parte));
                }
            }
            return sb.ToString(" ");
        }

        public static RetornarUltimosCaracteres(texto: string, quantidade: number): string
        {
            if (String.IsNullOrWhiteSpace(texto))
            {
                return "";
            }
            return texto.substring(Math.max( texto.length - quantidade, 0));
        }
    }

    class TextoUtilConstantes
    {
        private static readonly ESPACO_BRANCO: string = " \n\r\t";
        private static readonly NUMEROS: string = "0123456789";
        private static readonly LETRAS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhgijklmnopqrstuvwxyz";
        private static readonly CAIXA_ALTA: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static readonly PONTOS: string = ".;:;?!|";
        private static readonly PONTOS_SINAIS: string = "+-_.,()[]{}";
        private static readonly CARACTERES_PADRAO = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÀÁÂÃÈÉÊÌÍÎÒÓÔÕÚÛÜÇÑàáâãäèéêëìíîòóôõùúûüçñ ";
        private static readonly SINAIS_PADRAO = "_.@,()+=;:~^`´&!|{}?!";
        private static readonly PONTOS_SINAIS_SIMBOLOS = ",.;:?!|+-_.,@~^`´&$#*/\\§%|(){}[]<>";
        private static readonly ACENTOS: string = "ÀÁÂÃÈÉÊÌÍÎÒÓÔÕÚÛÜÇÑàáâãäèéêëìíîòóôõùúûüçñ´~^¨`";
        private static readonly ACENTOS_MAPEADOS: string = "AAAAEEEIIIOOOOUUUCNaaaaaeeeeiiioooouuuucn     ";

        public static readonly PALAVRAS_NAO_CAPITALIZAR  = {
            de: true,
            da: true,
            do: true,
            dos: true,
            das: true,
            e: true,
            ou: true,
            a: true,
            o: true,
            as: true,
            os: true,
            com: true,
            sem: true,
            //por: true,
            //para: true,
            em: true,
            no: true,
            na: true,
            nos: true,
            nas: true,
            pelo: true,
            pela: true,
            pelos: true,
            um: true,
            uma: true,
            uns: true,
            umas: true,
            se: true,
        };


        private static _caracteresEspacoEmBranco: string = null;
        private static _caracteresPadrao: string = null;
        private static _caracteresPadraoSemPontosSinais: string = null;
        private static _pontosSinais: string = null;
        private static _numerosObjectos: string = null;
        private static _letrasObjetos: string = null;
        private static _letrasNumerosObjetos: string = null;
        private static _letrasNumerosObjetosPontos: string = null;
        private static _CaixaAltaObjetos: string = null;
        private static _acentosMapeadoObjetos: string = null;
        private static _numerosPontoSinaisObjetos: string = null;
        private static _numerosPontoSinaisSimbolosObjetos: string = null;

        public static get CaracteresEmBrancoObjetos(): any
        {
            if (TextoUtilConstantes._caracteresEspacoEmBranco == null)
            {
                TextoUtilConstantes._caracteresEspacoEmBranco = TextoUtilConstantes.TextoParaObjetos(TextoUtilConstantes.ESPACO_BRANCO);
            }
            return TextoUtilConstantes._caracteresEspacoEmBranco;
        }

        public static get CaracteresPadrao(): any
        {
            if (TextoUtilConstantes._caracteresPadrao == null)
            {
                TextoUtilConstantes._caracteresPadrao = TextoUtilConstantes.TextoParaObjetos(
                    TextoUtilConstantes.CARACTERES_PADRAO + TextoUtilConstantes.SINAIS_PADRAO);


            }
            return TextoUtilConstantes._caracteresPadrao;
        }

        public static get CaracteresPadraoSemPontosSinais(): any
        {
            if (TextoUtilConstantes._caracteresPadraoSemPontosSinais == null)
            {
                TextoUtilConstantes._caracteresPadraoSemPontosSinais = TextoUtilConstantes.TextoParaObjetos(TextoUtilConstantes.CARACTERES_PADRAO);
            }
            return TextoUtilConstantes._caracteresPadraoSemPontosSinais;
        }



        public static get PontosSinais(): any
        {
            if (TextoUtilConstantes._pontosSinais == null)
            {
                TextoUtilConstantes._pontosSinais = TextoUtilConstantes.TextoParaObjetos(TextoUtilConstantes.PONTOS_SINAIS);
            }
            return TextoUtilConstantes._pontosSinais;
        }

        public static get NumerosObjetos(): any
        {
            if (TextoUtilConstantes._numerosObjectos == null)
            {
                TextoUtilConstantes._numerosObjectos = TextoUtilConstantes.TextoParaObjetos(TextoUtilConstantes.NUMEROS);
            }
            return TextoUtilConstantes._numerosObjectos;
        }

        public static get NumerosPontoSinaisObjetos(): any
        {
            if (TextoUtilConstantes._numerosPontoSinaisObjetos == null)
            {
                TextoUtilConstantes._numerosPontoSinaisObjetos = TextoUtilConstantes.TextoParaObjetos(TextoUtilConstantes.NUMEROS + TextoUtilConstantes.PONTOS_SINAIS);
            }
            return TextoUtilConstantes._numerosPontoSinaisObjetos;
        }

        public static get NumerosPontoSinaisSimbolosObjetos(): any
        {
            if (TextoUtilConstantes._numerosPontoSinaisSimbolosObjetos == null)
            {
                TextoUtilConstantes._numerosPontoSinaisSimbolosObjetos = TextoUtilConstantes.TextoParaObjetos(TextoUtilConstantes.NUMEROS + TextoUtilConstantes.PONTOS_SINAIS_SIMBOLOS);
            }
            return TextoUtilConstantes._numerosPontoSinaisSimbolosObjetos;
        }

        public static get LetrasObjetos(): any
        {
            if (TextoUtilConstantes._letrasObjetos == null)
            {
                TextoUtilConstantes._letrasObjetos = TextoUtilConstantes.TextoParaObjetos(TextoUtilConstantes.LETRAS);
            }
            return TextoUtilConstantes._letrasObjetos;
        }

        public static get LetrasNumerosObjetos(): any
        {
            if (TextoUtilConstantes._letrasNumerosObjetos == null)
            {
                TextoUtilConstantes._letrasNumerosObjetos = TextoUtilConstantes.TextoParaObjetos(TextoUtilConstantes.LETRAS + TextoUtilConstantes.NUMEROS);
            }
            return TextoUtilConstantes._letrasNumerosObjetos;
        }

        public static get LetrasNumerosObjetosPontos(): any
        {
            if (TextoUtilConstantes._letrasNumerosObjetosPontos == null)
            {
                TextoUtilConstantes._letrasNumerosObjetosPontos = TextoUtilConstantes.TextoParaObjetos(TextoUtilConstantes.LETRAS + TextoUtilConstantes.NUMEROS + TextoUtilConstantes.PONTOS);
            }
            return TextoUtilConstantes._letrasNumerosObjetosPontos;
        }

        public static get CaixasAltaObjetos(): any
        {
            if (TextoUtilConstantes._CaixaAltaObjetos == null)
            {
                TextoUtilConstantes._CaixaAltaObjetos = TextoUtilConstantes.TextoParaObjetos(TextoUtilConstantes.CAIXA_ALTA);
            }
            return TextoUtilConstantes._CaixaAltaObjetos;
        }

        public static get AcentosMapeadoObjetos(): any
        {
            if (TextoUtilConstantes._acentosMapeadoObjetos == null)
            {
                TextoUtilConstantes._acentosMapeadoObjetos = TextoUtilConstantes.TextoMapeamentoObjetos(TextoUtilConstantes.ACENTOS, TextoUtilConstantes.ACENTOS_MAPEADOS);
            }
            return TextoUtilConstantes._acentosMapeadoObjetos;
        }

        public static TextoParaObjetos(texto: string)
        {
            const objetos = {} as any;
            const len = texto.length;
            for (let i = 0; i < len; i++)
            {
                const char = texto.charAt(i);
                objetos[char] = char;
            }
            return objetos;
        }

        public static TextoMapeamentoObjetos(texto: string, textoMapemento: string)
        {
            if (texto.length !== textoMapemento.length)
            {
                throw new Erro("Não é possível mapear texto com numero de letras diferentes");
            }

            const objetos = {} as any;
            const len = texto.length;
            for (let i = 0; i < len; i++)
            {
                const caracter = texto.charAt(i);
                const caracterMapeado = textoMapemento.charAt(i);
                objetos[caracter] = caracterMapeado;
            }
            return objetos;
        }

        public static ParaUTF8(texto: string): Uint8Array
        {
            return BytesUtil.ToUTF8ArrayBytes(texto);
        }


    }
}