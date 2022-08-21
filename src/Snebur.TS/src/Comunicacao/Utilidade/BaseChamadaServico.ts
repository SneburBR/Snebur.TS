namespace Snebur.Comunicacao
{

    export abstract class BaseChamadaServico extends Snebur.Objeto
    {
        protected Tk: string;

        protected readonly Url: string;
        protected readonly XmlHttp: XMLHttpRequest;
        protected readonly Credencial: Snebur.Seguranca.CredencialServico;

        //protected abstract RetornarNomeManipulador(): string;

        public constructor(url: string,
            nomeManipulador: string,
            conteudo: string,
            credencial: Snebur.Seguranca.CredencialServico,
            isAsync: boolean,
            token: string)
        {
            super();

            if (!u.ValidacaoUtil.IsDefinido(url))
            {
                throw new ErroNaoDefinido("A url não foi definida", this);
            }
            if (!u.ValidacaoUtil.IsDefinido(conteudo))
            {
                throw new ErroNaoDefinido("A conteudo não foi definido", this);
            }
            if (!u.ValidacaoUtil.IsDefinido(credencial))
            {
                throw new ErroNaoDefinido("A credencial não foi definida", this);
            }

            const urlRequisicao = this.RetornarUrlRequisicao(url, token);

            this.Url = urlRequisicao;
            //this.Conteudo = conteudo;
            this.Credencial = credencial;
            this.Tk = token;

            this.XmlHttp = this.RetornarXmlHttp(nomeManipulador,
                token,
                isAsync);
        }

        protected RetornarXmlHttp(nomeManipulador: string,
            token: string,
            isAsync: boolean): XMLHttpRequest
        {

            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", this.Url, isAsync);

            xmlHttp.setRequestHeader("Usuario", u.Base64Util.Encode(this.Credencial.IdentificadorUsuario));
            xmlHttp.setRequestHeader("Senha", u.Base64Util.Encode(this.Credencial.Senha));

            xmlHttp.setRequestHeader(ParametrosComunicacao.MANIPULADOR, nomeManipulador);
            xmlHttp.setRequestHeader(ParametrosComunicacao.TOKEN, encodeURIComponent(token));
            xmlHttp.setRequestHeader(ParametrosComunicacao.NOME_APLICACAO_WEB, $Configuracao.IdentificadorAplicacao);

            if (typeof $Aplicacao?.FuncaoNormalizarRequisicao === "function")
            {
                $Aplicacao?.FuncaoNormalizarRequisicao(xmlHttp);

            }
            return xmlHttp;
        }

        protected RetornarResultadoChamada(conteudo: string): ResultadoChamada
        protected RetornarResultadoChamada(conteudo: Uint8Array): ResultadoChamada
        protected RetornarResultadoChamada(conteudo: any): ResultadoChamada
        {
            if (conteudo instanceof ArrayBuffer)
            {
                conteudo = PacoteUtil.DecompactarPacote(new Uint8Array(conteudo));
            }

            if ($Configuracao.IsDebug)
            {
                return u.JsonUtil.Deserializar<ResultadoChamada>(conteudo, ResultadoChamada.GetType());
            }
            else
            {
                let resultadoChamada: ResultadoChamada;
                try
                {
                    //var json = PacoteUtil.DecompactarPacote(conteudo);
                    resultadoChamada = u.JsonUtil.Deserializar<ResultadoChamada>(conteudo, ResultadoChamada.GetType());

                }
                catch (erro)
                {
                    const erroTipado = u.ConverterUtil.ParaErro(erro);
                    const mensagem = `Não foi possivel retornar o resultado chamada: ${erroTipado.message}`;
                    resultadoChamada = this.RetornarResultadoChamadaErro(new ErroComunicacao(mensagem, this.Url, this.XmlHttp.status, this, erroTipado));
                }
                return resultadoChamada;
            }
        }

        protected RetornarResultadoChamadaErro(erro: Error): ResultadoChamadaErro
        {
            const resultadoErro = new ResultadoChamadaErroCliente();
            resultadoErro.Erro = erro;
            resultadoErro.MensagemErro = `Erro chamar o servido Status ${this.XmlHttp.status} \n Url:${this.Url}`;
            return resultadoErro;
        }

        private RetornarUrlRequisicao(url: string, token: string): string
        {
            const nomeArquivo = u.Md5Util.RetornarHash(token);
            let urlRequisicao = u.UrlUtil.Combinar(url, nomeArquivo);
            urlRequisicao = u.UrlUtil.RetornarURL(urlRequisicao, [new ParChaveValorSimples<string>("State", u.RandomUtil.RetornarRandom().toString())]);

            return urlRequisicao;
        }
    }


}