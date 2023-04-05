//namespace Snebur.Comunicacao
//{
//    export class ChamadaServico extends BaseChamadaServico implements IDisposable
//    {
//        private readonly Conteudo: string;

//        public constructor(url: string, nomeManipuador: string, conteudo: string, credencial: Snebur.Seguranca.CredencialServico)
//        {
//            super(url,
//                nomeManipuador,
//                conteudo,
//                credencial, false,
//                String.Empty);
//            this.Conteudo = conteudo;

//            throw new Erro("Obsoleto");
//        }

//        public Chamar(): ResultadoChamada
//        {
//            if ($Configuracao.IsDebug)
//            {
//                const pacoteCompactado = PacoteUtil.CompactarPacote(this.Conteudo);
//                this.XmlHttp.send(pacoteCompactado);

//                if (this.XmlHttp.status === 200)
//                {
//                    return this.RetornarResultadoChamada(this.XmlHttp.responseText);
//                }
//                else
//                {
//                    throw new Erro(u.AjaxUtil.RetornarDescricaoCodigoErro(this.XmlHttp.status), this);
//                }
//            }
//            else
//            {
//                let resultadoChamada: ResultadoChamada;
//                try
//                {
//                    const conteudoCompactado = PacoteUtil.CompactarPacote(this.Conteudo);
//                    this.XmlHttp.send(conteudoCompactado);

//                    if (this.XmlHttp.status === 200)
//                    {
//                        resultadoChamada = this.RetornarResultadoChamada(this.XmlHttp.response);
//                    } else
//                    {
//                        const mensagem = u.AjaxUtil.RetornarDescricaoCodigoErro(this.XmlHttp.status);
//                        throw new Erro("A chamada não foi concluída " + mensagem);
//                    }
//                }
//                catch (err)
//                {
//                    const mensagem = u.ErroUtil.RetornarMensagemErro(err);
//                    const erro = new ErroComunicacao(mensagem, this.Url, this.XmlHttp.status, this, err);
//                    resultadoChamada = this.RetornarResultadoChamadaErro(erro);
//                }
//                this.Dispose();
//                return resultadoChamada;
//            }
//        }

//        private RetornarBytes(str: string): Uint8Array
//        {
//            const buffer = new ArrayBuffer(str.length);
//            const bytes = new Uint8Array(buffer);

//            for (let i = 0, strLen = str.length; i < strLen; i++)
//            {
//                bytes[i] = str.charCodeAt(i);
//            }
//            return bytes;
//        }

//        public override Dispose()
//        {
//            super.Dispose();
//            (this as any).Conteudo = null;
//            (this as any).XmlHttp = null;
//        }
//    }

   
//}