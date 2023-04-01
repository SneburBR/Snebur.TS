namespace Snebur.UI
{
    export class Converter
    {
        //#region Visibilidade

        public static DefinidoParaVisibilidade(valor: any): EnumVisibilidade
        {
            if (u.ValidacaoUtil.IsDefinido(valor, true))
            {
                const tipo = valor.GetType();
                if (!(tipo instanceof r.TipoPrimario) ||
                    u.ValidacaoUtil.IsTipoPrimarioDefinido(valor, tipo.TipoPrimarioEnum))
                {
                    return EnumVisibilidade.Visivel;
                }
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Oculto;
        }

        public static NaoDefinidoParaVisibilidade(valor: any): EnumVisibilidade
        {
            if (u.ValidacaoUtil.IsDefinido(valor))
            {
                const tipo = valor.GetType();
                if (tipo instanceof r.TipoPrimario && !u.ValidacaoUtil.IsTipoPrimarioDefinido(valor, tipo.TipoPrimarioEnum))
                {
                    return EnumVisibilidade.Visivel;
                }
                return EnumVisibilidade.Oculto;
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Visivel;
        }

        public static BooleanParaVisibilidade(valor: any): EnumVisibilidade
        {
            if (typeof valor === "boolean" && !valor)
            {
                return EnumVisibilidade.Oculto;
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Visivel;
        }

        public static VerdadeiroParaVisibilidade(valor: any): EnumVisibilidade
        {
            if (typeof valor === "boolean" && valor)
            {
                return EnumVisibilidade.Visivel;
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Oculto;
        }

        public static FalsoParaVisibilidade(valor: any): EnumVisibilidade
        {
            if (typeof valor === "boolean" && valor)
            {
                return EnumVisibilidade.Oculto;
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Visivel;
        }

        public static DefinidoParaMostrar(valor: any): EnumVisibilidade
        {
            if (u.ValidacaoUtil.IsDefinido(valor, true))
            {
                const tipo = valor.GetType();
                if (!(tipo instanceof r.TipoPrimario) ||
                    u.ValidacaoUtil.IsTipoPrimarioDefinido(valor, tipo.TipoPrimarioEnum))
                {
                    return EnumVisibilidade.Visivel;
                }
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Invisivel;
        }

        public static VerdadeiroParaMostrar(valor: any): EnumVisibilidade
        {
            if (typeof valor === "boolean" && !valor)
            {
                return EnumVisibilidade.Invisivel;
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Visivel;
        }

        public static FalsoParaMostrar(valor: any): EnumVisibilidade
        {
            if (typeof valor === "boolean" && valor)
            {
                return EnumVisibilidade.Invisivel;
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Visivel;
        }

        public static MaiorZeroParaVisibilidade(valor: number): EnumVisibilidade
        {
            if (u.ValidacaoUtil.IsNumber(valor))
            {
                if (valor > 0)
                {
                    return EnumVisibilidade.Visivel;
                }
            }
            return EnumVisibilidade.Oculto;
        }

        public static MaiorZeroParaMostrar(valor: number): EnumVisibilidade
        {
            if (u.ValidacaoUtil.IsNumber(valor))
            {
                if (valor > 0)
                {
                    return EnumVisibilidade.Visivel;
                }
            }
            return EnumVisibilidade.Invisivel;
        }

        public static ZeroParaVisibilidade(valor: number): EnumVisibilidade
        {
            if (u.ValidacaoUtil.IsNumber(valor))
            {
                if (valor === 0)
                {
                    return EnumVisibilidade.Visivel;
                }
            }
            return EnumVisibilidade.Oculto;
        }

        public static DiferenteZeroParaVisibilidade(valor: number): EnumVisibilidade
        {
            if (u.ValidacaoUtil.IsNumber(valor))
            {
                if (valor === 0)
                {
                    return EnumVisibilidade.Oculto;
                }
            }
            return EnumVisibilidade.Visivel;
        }

        public static NuloParaVisibilidade(valor: any): EnumVisibilidade
        {

            if (u.ValidacaoUtil.IsDefinido(valor))
            {
                return EnumVisibilidade.Oculto;
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Visivel;
        }

        public static NaoNuloParaVisibilidade(valor: any): EnumVisibilidade
        {
            if (!u.ValidacaoUtil.IsDefinido(valor))
            {
                return EnumVisibilidade.Oculto;
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Visivel;
        }

        public static StringVaziaOuNullParaVisibilidade(valor: any): EnumVisibilidade
        {
            if (!u.ValidacaoUtil.IsStringVaziaOuNull(valor))
            {
                return EnumVisibilidade.Oculto;
            }
            if (Converter.IsVisibidade(valor))
            {
                return valor;
            }
            return EnumVisibilidade.Visivel;
        }

        public static ExisteItensParaVisibilidade(lista: Array<any> | any): EnumVisibilidade
        {
            if (Array.isArray(lista) && lista.Count === 0)
            {
                return EnumVisibilidade.Oculto;
            }
            if (Converter.IsVisibidade(lista))
            {
                return lista;
            }
            return EnumVisibilidade.Visivel;
        }

        public static ExisteItensParaMostrar(lista: Array<any> | any): EnumVisibilidade
        {
            if (Array.isArray(lista) && lista.Count === 0)
            {
                return EnumVisibilidade.Invisivel;
            }

            if (Converter.IsVisibidade(lista))
            {
                return lista;
            }
            return EnumVisibilidade.Visivel;
        }

        public static NaoExisteItensParaVisibilidade(lista: Array<any> | any): EnumVisibilidade
        {
            if (Array.isArray(lista) && lista.Count === 0)
            {
                return EnumVisibilidade.Visivel;
            }

            if (Converter.IsVisibidade(lista))
            {
                return lista;
            }
            return EnumVisibilidade.Oculto;
        }

        public static ExistePrazoParaVisiblidade(prazo: PrazoTempo): EnumVisibilidade
        {
            if (prazo instanceof PrazoTempo && prazo.IsExistePrazo)
            {
                return EnumVisibilidade.Visivel;
            }
            if (Converter.IsVisibidade(prazo))
            {
                return prazo;
            }
            return EnumVisibilidade.Oculto;
        }

        private static IsVisibidade(valor: any): valor is EnumVisibilidade
        {
            if (typeof valor === "number")
            {
                return EnumUtil.IsDefindo(EnumVisibilidade, valor);
                //switch (valor)
                //{
                //    case EnumVisibilidade.Visivel:
                //    case EnumVisibilidade.Invisivel:
                //    case EnumVisibilidade.Oculto:
        
                //        return true;
                //}
            }
            return false;
        }


        //#endregion

        //#region Logico

        public static ZeroParaVerdadeiro(valor: number): boolean
        {
            if (typeof valor === "number" && valor === 0)
            {
                return true;
            }
            return false;
        }

        public static ZeroParaFalso(valor: number): boolean
        {
            if (typeof valor === "number" && valor === 0)
            {
                return false;
            }
            return true;
        }

        public static NotBoolean(valor: boolean): boolean
        {
            return Converter.LogicoInverso(valor);
        }

        public static LogicoInverso(valor: boolean): boolean
        {
            if (typeof valor === "boolean")
            {
                return !valor;
            }
            return false;
        }

        public static DefidoParaBoolean(valor: boolean)
        {
            return Converter.DefinidoParaVerdadeiro(valor);
        }

        public static NaoDefidoParaBoolean(valor: boolean)
        {
            return Converter.NaoDefidoParaVerdeiro(valor);
        }

        public static DefinidoParaVerdadeiro(valor: boolean)
        {
            return ValidacaoUtil.IsDefinido(valor);
        }

        public static DefinidoParaFalso(valor: boolean)
        {
            return !ValidacaoUtil.IsDefinido(valor);
        }

        public static NaoDefidoParaVerdeiro(valor: boolean)
        {
            return !ValidacaoUtil.IsDefinido(valor);
        }
        //#endregion

        public static QuebrarLinhasHtml(texto: string): string
        {
            if (!String.IsNullOrEmpty(texto))
            {
                return FormatacaoUtil.QuebrarLinhasHtml(texto);
            }
            return String.Empty;
        }
        //#region Math

        public static ValorAbsoluto(valor: number): number
        {
            if (ValidacaoUtil.IsNumber(valor))
            {
                return Math.abs(valor);
            }
            return null;
        }
        //#endregion

        //#region String

        public static StringVazia(valor: string): boolean
        {
            return String.IsNullOrWhiteSpace(valor);
        }

        public static StringNaoVazia(valor: string): boolean
        {
            return !String.IsNullOrWhiteSpace(valor);
        }
        //#endregion

        //#region CssClasse

        public static CssClasseCorPositivoNegativo(valor: number): string
        {
            if (ValidacaoUtil.IsNumber(valor))
            {
                const cor = (valor > 0) ?
                    EnumCor.SistemaSucesso :
                    EnumCor.SistemaFalha;

                return CorUtil.RetornarClasseCssCor(EnumPrefixoCor.CorTexto, cor);
            }
            return String.Empty;
        }
        //#end
    }
}