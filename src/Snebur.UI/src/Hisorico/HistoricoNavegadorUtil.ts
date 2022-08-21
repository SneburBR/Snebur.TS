namespace Snebur.UI
{
    export class HistoricoNavegadorUtil
    {
        private static _parametrosProtegidos: HashSet<string> = null;

        private static get IsProteger(): boolean
        {
            return $Configuracao.IsProtegerUrl;
        }

        private static readonly PREFIXO_CHAVE_ENTIDADE_HISTORICO = "[e]";
        private static readonly PREFIXO_CHAVE_TIPO_PRIMARIO_FORMATAR = "[t-{0}]";
        private static readonly PREFIXO_CHAVE_TIPO_PRIMARIO = "[t-";

        public static readonly PARAMETRO_PAGINA: string = "Pagina";
        public static readonly PARAMETRO_ID_SESSAO: string = "sid";
        public static readonly PARAMETRO_JANELA: string = "janela"
        public static readonly PARAMETRO_GUID: string = "GUID"
        public static readonly PARAMETRO_STATE: string = "State"

        public static get ChavesParametroTipoPrimarioProtegidos(): HashSet<string>
        {
            if (this._parametrosProtegidos === null)
            {
                this._parametrosProtegidos = new HashSet<string>();
                this._parametrosProtegidos.Add(this.PARAMETRO_PAGINA);
                this._parametrosProtegidos.Add(this.PARAMETRO_ID_SESSAO);
                this._parametrosProtegidos.Add(this.PARAMETRO_JANELA);
                this._parametrosProtegidos.Add(this.PARAMETRO_GUID);
                this._parametrosProtegidos.Add(this.PARAMETRO_STATE);
            }
            return this._parametrosProtegidos;
        }

        //#region Histórico

        public static RetornarUrlHistorico(parametros: DicionarioSimples<String>, urlBase?: string)
        {
            const fragmentos = this.RetornarFragmentosHistoricoInterno(parametros);
            let url = urlBase ?? document.location.href.split("#")[0];
            url += "#" + fragmentos;
            return url;
        }

        private static RetornarFragmentosHistoricoInterno(parametros: DicionarioSimples<String>)
        {
            const parametrosValidos = parametros.ToArrayChaveValor().Where(x => x.Valor instanceof Entidade || ValidacaoUtil.IsTipoPrimario(x.Valor));
            const parametrosUncode = parametrosValidos.Select(x => this.RetornarChave(x.Chave) + "=" + u.UrlUtil.Encode(this.RetornarValorParametroNormalizado(x.Chave, x.Valor)));
            const fragmentosHistorico = String.Join("&", parametrosUncode);
            if (this.IsProteger)
            {
                const base64 = u.Base64Util.Encode(fragmentosHistorico);
                return window.encodeURIComponent(u.CriptografiaUtil.Criptografar(base64));
            }
            return fragmentosHistorico;
        }

        private static RetornarChave(chave: string): string
        {
            if (!u.ValidacaoUtil.IsDefinido(chave) || String.IsNullOrWhiteSpace(chave))
            {
                throw new Erro("A chave do parâmetro do histórico não foi definida");
            }
            if (!u.ValidacaoUtil.IsString(chave))
            {
                throw new Erro("O tipo da chave não é suportado");
            }
            return chave.trim();
        }

        private static RetornarValorParametroNormalizado(chave: string, valor: any): string
        {
            if (!u.ValidacaoUtil.IsDefinido(valor))
            {
                return "null";
            }

            if (this.ChavesParametroTipoPrimarioProtegidos.Contains(chave))
            {
                return valor;
            }

            if (typeof valor.GetType === "function")
            {
                const tipo = valor.GetType();
                if (tipo instanceof r.TipoPrimario)
                {
                    if (tipo.TipoPrimarioEnum === r.EnumTipoPrimario.Object)
                    {
                        throw new Erro("Parâmetro não suportado");
                    }

                    const valorSerializado = Serializacao.JsonSerializar.RetornarValorTipoPrimarioSerializado(valor, tipo.TipoPrimarioEnum);
                    const prefixo = String.Format(this.PREFIXO_CHAVE_TIPO_PRIMARIO_FORMATAR, tipo.TipoPrimarioEnum);
                    return `${prefixo}${valorSerializado}`;
                }

                if (tipo instanceof r.TipoEntidade && valor instanceof Entidade)
                {
                    if (valor instanceof Entidade)
                    {
                        if (!(valor.Id > 0))
                        {
                            throw new Erro("E entidade '{0}' recebida como parâmetro não possui um Id, salvar antes de utiliza-la");
                        }
                        return `${this.PREFIXO_CHAVE_ENTIDADE_HISTORICO}${valor.__NomeTipoEntidade}(${valor.Id})`;
                    }
                }
            }

            const nomeTipo = u.ReflexaoUtil.RetornarNomeTipo(valor);
            console.warn(`O tipo '${nomeTipo}' não é suportado como parâmetro de histórico`);
            return "null";
        }

        //#endregion

        //#region Parâmetros

        public static RetornarChavesParametros(): List<string>
        {
            const fragmentosHistorico = this.RetornarFragmentosHistorico();
            const partes = fragmentosHistorico.split("&");
            return partes.Select(x => x.split("=").First());
        }

        private static RetornarFragmentosHistorico(): string
        {
            const url = document.location.href;
            const posicao = url.indexOf("#");
            if (posicao > 0)
            {
                const fragmentosHistorico = url.substring(posicao + 1);
                if (this.IsProteger)
                {
                    const descriptografado = u.CriptografiaUtil.Descriptografar(window.decodeURIComponent(fragmentosHistorico));
                    return u.Base64Util.Decode(descriptografado);
                }
                return fragmentosHistorico;
            }
            return String.Empty;

        }

        public static RetornarParametrosHistorico(): DicionarioSimples<string>
        {
            const fragmentosHistorico = this.RetornarFragmentosHistorico();
            const parametros = new DicionarioSimples<string>();
            if (!String.IsNullOrWhiteSpace(fragmentosHistorico))
            {
                const paresChaveValor = fragmentosHistorico.trim().split("&");
                for (const parChaveValor of paresChaveValor)
                {
                    const partes = parChaveValor.split("=", 2);
                    const chave = partes[0];
                    const valor = (partes.length === 1) ? String.Empty : partes[1];
                    parametros.Add(chave, valor);
                }
            }
            return parametros;
        }

        public static RetornarParametrosHistoricoTipoPrimario(): DicionarioSimples<string>
        {
            const fragmentosHistorico = this.RetornarFragmentosHistorico();
            const parametros = new DicionarioSimples<string>();
            if (!String.IsNullOrWhiteSpace(fragmentosHistorico))
            {
                const paresChaveValor = fragmentosHistorico.trim().split("&");
                for (const parChaveValor of paresChaveValor)
                {
                    const partes = parChaveValor.split("=", 2);
                    const chave = partes[0];
                    const valor = (partes.length === 1) ? String.Empty : partes[1];

                    if (this.IsValorParametroTipoPrimario(chave, valor))
                    {
                        const valorTipado = this.RetornarValorTipoPrimariaTipado(chave, valor);
                        parametros.Add(chave, valorTipado);
                    }
                }
            }
            return parametros;
        }

        public static async RetornarParametrosHistoricoAsync(): Promise<DicionarioSimples<string>>
        {
            const fragmentosHistorico = this.RetornarFragmentosHistorico();
            const parametros = new DicionarioSimples<string>();
            if (!String.IsNullOrWhiteSpace(fragmentosHistorico))
            {
                const paresChaveValor = fragmentosHistorico.trim().split("&");

                for (const parChaveValor of paresChaveValor)
                {
                    const partes = parChaveValor.split("=", 2);
                    const chave = partes[0];
                    let valor = (partes.length === 1) ? String.Empty : partes[1];
                    valor = decodeURIComponent(valor);

                    const valorTipado = await this.RetornarValorTipadoParametroAsync(chave, valor);
                    parametros.Add(chave, valorTipado);
                }
            }
            return parametros;
        }

        private static async RetornarValorTipadoParametroAsync(chave: string, valor: string): Promise<any>
        {
            if (this.IsValorParametroTipoPrimario(chave, valor))
            {
                const valorTipoPrimarioTipado = this.RetornarValorTipoPrimariaTipado(chave, valor);
                return valorTipoPrimarioTipado;
            }

            if (valor.StartsWith(this.PREFIXO_CHAVE_ENTIDADE_HISTORICO))
            {
                const entidade = await this.RetornarValorParametroEntidadeAsync(valor);
                return entidade;
            }

            if ($Configuracao.IsDebug)
            {
                console.error(`A chave '${chave}', valor do parâmetro ${ConverterUtil.ParaString(valor)}, histórico não é suportado`);
            }
            return valor;
        }

        private static IsValorParametroTipoPrimario(chave: string, valor: string)
        {
            if (this.ChavesParametroTipoPrimarioProtegidos.Contains(chave))
            {
                return true;
            }
            return valor.StartsWith(this.PREFIXO_CHAVE_TIPO_PRIMARIO);
        }

        private static RetornarValorTipoPrimariaTipado(chave: string, valor: string): any
        {
            if (this.ChavesParametroTipoPrimarioProtegidos.Contains(chave))
            {
                return valor;
            }

            const posicao = valor.indexOf("]");
            const prefixoTipoPrimario = valor.substr(0, posicao);
            const tipoPrimarioEnum = parseInt(TextoUtil.RetornarSomenteNumeros(prefixoTipoPrimario));
            const valorSerializado = valor.substr(posicao + 1);
            const valorDeserializado = JSON.parse(valorSerializado);
            return ConverterUtil.ParaTipoPrimario(valorDeserializado, tipoPrimarioEnum);
        }

        private static async RetornarValorParametroEntidadeAsync(valor: string): Promise<d.IEntidade>
        {
            const [idEntidade, nomeTipoEntidade] = this.RetornarIDEntidadeNomeTipoEntidade(valor);
            const construtor = u.ReflexaoUtil.RetornarConstrutorEntidade(nomeTipoEntidade);
            const tipoEntidade = construtor.GetType() as r.TipoEntidade;
            const contexto = $Aplicacao.RetornarContextoDados(tipoEntidade);
            const consulta = contexto.RetornarConsulta(tipoEntidade).Where(x => x.Id === idEntidade);
            const entidade = await consulta.SingleAsync();
            return entidade;
        }

        private static RetornarIDEntidadeNomeTipoEntidade(valor: string): [number, string]
        {
            const inicio = valor.indexOf(this.PREFIXO_CHAVE_ENTIDADE_HISTORICO) + this.PREFIXO_CHAVE_ENTIDADE_HISTORICO.length;
            const fim = valor.indexOf("(");
            const nomeTipoEntidade = valor.substring(inicio, fim);
            const idString = ExpressaoUtil.RetornarExpressaoAbreFecha(valor, true, "(", ")", false);
            const id = parseInt(idString);
            if (id > 0)
            {
                return [id, nomeTipoEntidade];
            }

            throw new Erro(`Não foi possível retornar o nomeTipoEntidade e o id da expressão ${valor}`);
        }

        //#endregion
    }
}

/*
function processAjaxData(response, urlPath)
{
    document.getElementById("content").innerHTML = response.html;
    document.title = response.pageTitle;
    window.history.pushState({ "html": response.html, "pageTitle": response.pageTitle }, "", urlPath);
}

window.onpopstate = function (e)
{
    if (e.state)
    {
        document.getElementById("content").innerHTML = e.state.html;
        document.title = e.state.pageTitle;
    }
};
*/
