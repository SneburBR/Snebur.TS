namespace Snebur.UI
{
    export class MensagemUtil
    {
        public static get IsAberta(): boolean
        {
            return JanelaMensagem.IsAberta;
        }

        public static MensagemExcluirEntidadeAsync(
            controlePai: BaseControle,
            entidade: IEntidade,
            mensagem: string = null): Promise<ResultadoJanelaMensagemArgs>
        {
            const rotuloEntidade = u.GlobalizacaoUil.RetornarRotuloTipo(entidade.GetType() as r.TipoBaseDominio);
            const descricao = u.EntidadeUtil.RetornarDescricaoEntidade(entidade);

            if (String.IsNullOrWhiteSpace(mensagem))
            {
                mensagem = `Tem certeza de que deseja excluir ${rotuloEntidade.toLowerCase()}:<br />
                           '${descricao}'`;
            }

            const titulo = `Excluir ${rotuloEntidade.toLowerCase()}`;

            return MensagemUtil.MostrarMensagemPersonalizadaAsync(controlePai,
                titulo, mensagem,
                EnumResultadoOpcaoMensagem.Cancelar,
                [EnumResultadoOpcaoMensagem.Sim, "Sim, excluir"]);

        }

        public static async MostrarMensagemOptionsAsync(controlePai: BaseControle, options: OptionsMensagem) 
        {
            throw new ErroNaoImplementado();
            //let resultado = await MensagemUtil.MostrarMensagemAsync(controlePai, titulo, mensagem, opcoes);
            //if (callback instanceof Function)
            //{
            //    callback(resultado);
            //}
        }

        //public static async MostrarMensagemAsync(controlePai: BaseControle,
        //    titulo: string, mensagem: string,
        //    opcoes: EnumBotoesJanelaMensagem = EnumBotoesJanelaMensagem.OKEntendi,
        //    callback: (resultado: ResultadoJanelaMensagemArgs) => void = null)
        //{
        //    await ThreadUtil.QuebrarAsync();

        //    const resultado = await this.MostrarMensagemAsync(controlePai, titulo, mensagem, opcoes);
        //    if (callback instanceof Function)
        //    {
        //        callback(resultado);
        //    }
        //}

        public static async MostrarMensagemErroPadraoAsync( controlePai: BaseControle, ): Promise<ResultadoJanelaMensagemArgs>
        {
            const mensagem = `<br /> Verifique os dados e tente novamente.
                                     Caso o problema persista, entre em contato com o suporte.`;

            await JanelaMensagem.AguardarFecharMensagemAsync();
            const janela = new JanelaMensagem(controlePai, "Oops!! Algo deu erro", mensagem, EnumBotoesJanelaMensagem.Ok);
            return await janela.MostrarAsync();
        }

        public static async MostrarMensagemErroAsync(
            controlePai: BaseControle,
            mensagem: string,
            titulo: string = "Oops!! Algo deu erro"): Promise<ResultadoJanelaMensagemArgs>
        {
            await JanelaMensagem.AguardarFecharMensagemAsync();
            const janela = new JanelaMensagem(controlePai, titulo, mensagem, EnumBotoesJanelaMensagem.Ok);
            return await janela.MostrarAsync();
        }

        public static async MostrarMensagemAsync(controlePai: BaseControle,
            titulo: string, mensagem: string,
            opcoes: EnumBotoesJanelaMensagem = EnumBotoesJanelaMensagem.OkEntendi): Promise<ResultadoJanelaMensagemArgs>
        {
            await JanelaMensagem.AguardarFecharMensagemAsync();

            const janela = new JanelaMensagem(controlePai, titulo, mensagem, opcoes);
            return await janela.MostrarAsync();
        }

        //public static async MostrarMensagemPersonalizadaAsync(controlePai: BaseControle, titulo: string, mensagem: string,
        //    ...resultadosRotuilo: List<[EnumResultadoOpcaoMensagem, string] | EnumResultadoOpcaoMensagem>): Promise<ResultadoJanelaMensagemArgs>
        //{

        //    const botoesViewModel = this.RetornarBotoesMensagemViewModel(resultadosRotuilo);
        //    const janela = new JanelaMensagem(controlePai, titulo, mensagem, botoesViewModel);
        //    const resultado = await janela.MostrarAsync();
        //    return resultado;
        //}

        public static async MostrarMensagemPersonalizadaAsync(controlePai: BaseControle,
            titulo: string, mensagem: string, ...resultadosRotuilo: List<[EnumResultadoOpcaoMensagem, string] | EnumResultadoOpcaoMensagem>): Promise<ResultadoJanelaMensagemArgs>
        {
            await JanelaMensagem.AguardarFecharMensagemAsync();
            const botoesViewModel = this.RetornarBotoesMensagemViewModel(resultadosRotuilo);
            const janela = new JanelaMensagem(controlePai, titulo, mensagem, botoesViewModel);
            return await janela.MostrarAsync();
        }

        public static async MostrarMensagemPersonalizadaComFecharAsync(controlePai: BaseControle,
            titulo: string, mensagem: string, ...resultadosRotuilo: List<[EnumResultadoOpcaoMensagem, string] | EnumResultadoOpcaoMensagem>): Promise<ResultadoJanelaMensagemArgs>
        {
            await JanelaMensagem.AguardarFecharMensagemAsync();
            const botoesViewModel = this.RetornarBotoesMensagemViewModel(resultadosRotuilo);
            const janela = new JanelaMensagem(controlePai, titulo, mensagem, botoesViewModel);
            janela.MostrarBotaoFechar();
            return await janela.MostrarAsync();
        }

        public static RetornarBotoesMensagemViewModel(resultadosRotuilo: List<[EnumResultadoOpcaoMensagem, string] | EnumResultadoOpcaoMensagem>): ListaObservacao<BotaoMensagemViewModel>
        {
            const botoesVM = new ListaObservacao<BotaoMensagemViewModel>();
            for (const argumento of resultadosRotuilo)
            {
                if (argumento != null)
                {
                    const [resultado, rutolo] = this.RetornarResultadoRotulo(argumento);
                    botoesVM.Add(new BotaoMensagemViewModel(rutolo, resultado));
                }
            }
            return botoesVM;
        }

        private static RetornarResultadoRotulo(argumento: EnumResultadoOpcaoMensagem | [EnumResultadoOpcaoMensagem, string]): [any, any]
        {
            if (typeof argumento === "number")
            {
                const rotuloPadrao = this.RetornarRotuloPadrao(argumento as EnumResultadoOpcaoMensagem);
                return [argumento, rotuloPadrao];
            }
            if (Array.isArray(argumento))
            {
                return argumento as [EnumResultadoOpcaoMensagem, string];
            }

            throw new Erro("argumento não suportado");
        }

        private static RetornarRotuloPadrao(resultado: EnumResultadoOpcaoMensagem): string
        {
            switch (resultado)
            {
                case EnumResultadoOpcaoMensagem.Ok:
                    return "OK";
                case EnumResultadoOpcaoMensagem.Nao:
                    return "Não";
                case EnumResultadoOpcaoMensagem.Sim:
                    return "Sim";
                case EnumResultadoOpcaoMensagem.Cancelar:
                    return "Cancelar";
                case EnumResultadoOpcaoMensagem.Botao1:
                    return "Botao1";
                case EnumResultadoOpcaoMensagem.Botao2:
                    return "Botao2";
                case EnumResultadoOpcaoMensagem.Botao3:
                    return "Botao3";
                default:
                    throw new Erro("resultado não suportado");
            }
        }

        public static RetornarBotoes(opcoesEnum: EnumBotoesJanelaMensagem): ListaObservacao<BotaoMensagemViewModel>
        {
            const botoesVM = new ListaObservacao<BotaoMensagemViewModel>();
            switch (opcoesEnum)
            {
                case (EnumBotoesJanelaMensagem.Ok):

                    botoesVM.Add(new BotaoMensagemViewModel("OK", EnumResultadoOpcaoMensagem.Ok));

                    break;

                case (EnumBotoesJanelaMensagem.OkEntendi):

                    botoesVM.Add(new BotaoMensagemViewModel("OK, entendi", EnumResultadoOpcaoMensagem.Ok));
                    break;

                case (EnumBotoesJanelaMensagem.OkCancelar):

                    botoesVM.Add(new BotaoMensagemViewModel("Cancelar", EnumResultadoOpcaoMensagem.Cancelar));
                    botoesVM.Add(new BotaoMensagemViewModel("OK", EnumResultadoOpcaoMensagem.Ok));
                    break;

                case (EnumBotoesJanelaMensagem.SimCancelar):

                    botoesVM.Add(new BotaoMensagemViewModel("Cancelar", EnumResultadoOpcaoMensagem.Cancelar));
                    botoesVM.Add(new BotaoMensagemViewModel("Sim", EnumResultadoOpcaoMensagem.Sim));
                    break;

                case (EnumBotoesJanelaMensagem.SimNao):

                    botoesVM.Add(new BotaoMensagemViewModel("Não", EnumResultadoOpcaoMensagem.Nao));
                    botoesVM.Add(new BotaoMensagemViewModel("Sim", EnumResultadoOpcaoMensagem.Sim));

                    break;

                case (EnumBotoesJanelaMensagem.SimNaoCancelar):

                    botoesVM.Add(new BotaoMensagemViewModel("Cancelar", EnumResultadoOpcaoMensagem.Cancelar));
                    botoesVM.Add(new BotaoMensagemViewModel("Não", EnumResultadoOpcaoMensagem.Nao));
                    botoesVM.Add(new BotaoMensagemViewModel("Sim", EnumResultadoOpcaoMensagem.Sim));
                    break;

                default:

                    throw new ErroNaoSuportado("O opção pra botões da janela mensagem não é suportado", this);

            }
            return botoesVM;
            //return botoes;
        }

        public static RetornarBotoesPersonalizado(...descricoes: [string, EnumResultadoOpcaoMensagem][]): ListaObservacao<BotaoMensagemViewModel>
        public static RetornarBotoesPersonalizado(...descricoes: string[]): ListaObservacao<BotaoMensagemViewModel>
        public static RetornarBotoesPersonalizado(...descricoes: (string | [string, EnumResultadoOpcaoMensagem])[]): ListaObservacao<BotaoMensagemViewModel>
        {
            const botoes = new ListaObservacao<BotaoMensagemViewModel>();

            if (!u.ValidacaoUtil.IsArray(descricoes))
            {
                throw new ErroNaoDefinido("A descrições do botões não foram definidas", this);
            }
            if (descricoes.length === 0)
            {
                throw new ErroNaoDefinido("A lista de descrições está vazia", this);
            }
            if (descricoes.length > 3)
            {
                throw new ErroNaoDefinido("A lista possui mais de 3 descrições", this);
            }

            for (const [descricao, i] of descricoes.ToTupleItemIndex())
            {
                if (typeof descricao === "string")
                {
                    botoes.Add(new BotaoMensagemViewModel(descricao, MensagemUtil.RetornarResultadoJanelaMensagem(i)));
                }
                else
                {
                    const [descricaoBotao, resultadoBotao] = descricao;
                    botoes.Add(new BotaoMensagemViewModel(descricaoBotao, resultadoBotao));
                }
            }
            return botoes;

            //return botoes;
        }

        private static RetornarResultadoJanelaMensagem(posicao: number): EnumResultadoOpcaoMensagem
        {
            switch (posicao)
            {
                case 0:

                    return EnumResultadoOpcaoMensagem.Botao1;

                case 1:

                    return EnumResultadoOpcaoMensagem.Botao2;

                case 2:

                    return EnumResultadoOpcaoMensagem.Botao3;

                default:

                    throw new ErroNaoSuportado(" A posição não é suportada", this);
            }
        }

        public static async MostrarMensagemNaoImplementaoAsync(controlePai: BaseControle = $Aplicacao.DocumentoPrincipal): Promise<boolean>
        {
            await MensagemUtil.MostrarMensagemAsync(controlePai,
                "OPS!",
                "Este recurso não está implementado ou disponível",
                EnumBotoesJanelaMensagem.OkEntendi);

            return true;
        }

        public static async MensagemFalhaAoExcluirEntidadeAsync(controlePai: BaseControle)
        {
            await MensagemUtil.MostrarMensagemAsync(controlePai,
                "OPS!",
                `Não foi possível deletar esse item.
                Tente novamente mais tarde ou entre em contato com o suporte.`);
        }

        public static async NotificarMensagensValidacaoAsync(mensagens: string[]): Promise<void>
        {
            const mensagensValidacao = mensagens.join("\n");
            await ui.MensagemUtil.MostrarMensagemErroAsync(
                $Aplicacao.DocumentoPrincipal,
                mensagensValidacao);
        }
    }
}
