namespace Snebur.ServicoArquivo
{
    export abstract class TarefaEnviarImagem extends BaseTarefaEnviarArquivo
    {
        public readonly TamanhoImagem: d.EnumTamanhoImagem;

        public readonly OrigemImagem: sa.OrigemImagemLocal

        private readonly NomeTipoImagem: string;

        public IsReenviar: boolean = false;

        public get Imagem(): d.IImagem
        {
            return this.EntidadeArquivo as d.IImagem;
        }

        public abstract readonly DimensaoSaida: d.Dimensao;


        public constructor(gerenciador: GerenciadorEnvioArquivo, imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem)
        {
            super(gerenciador, imagem);

            if (!(imagem.OrigemImagem instanceof sa.OrigemImagemLocal))
            {
                throw new Erro("A somente OrigemImagemLocal é suportada");
            }

            this.OrigemImagem = imagem.OrigemImagem;
            this.TamanhoImagem = tamanhoImagem;
            this.NomeTipoImagem = imagem.GetType().Nome;
        }

        protected override   IniciarEnvioAsync(): Promise<void>
        {
            if (!u.ImagemUtil.ExisteImagemServidor(this.Imagem, this.TamanhoImagem) || this.IsReenviar)
            {
                return super.IniciarEnvioAsync();
            }
            else
            {
                return this.FinalizarEnviadoSucessoAsync();
                //throw new Erro("O imagem já existe no servidor");
            }
        }

        //#region Métodos protegidos 

        protected override RetornarParametros(checcksumPacote: string): Array<ParChaveValorSimples<string>>
        {
            const parametros = super.RetornarParametros(checcksumPacote);
            parametros.Add(new ParChaveValorSimples(ConstantesServicoImagem.TAMANHO_IMAGEM, this.TamanhoImagem.toString()));
            parametros.Add(new ParChaveValorSimples(ConstantesServicoImagem.FORMATO_IMAGEM, this.Imagem.FormatoImagem.toString()));
            return parametros;
        }

        protected override RetornarUrlEnviarArquivo(): string
        {
            const servicoArquivo = $Aplicacao.RetornarServicoArquivo((this.EntidadeArquivo as any).GetType());
            return u.UrlUtil.Combinar(servicoArquivo.URLServico, ConstantesServicoImagem.NOME_ARQUIVO_ENVIAR_IMAGEM);
        }
        //#endregion


        protected override async FinalizarEnviadoSucessoAsync(): Promise<void>
        {
            await super.FinalizarEnviadoSucessoAsync();
            this.SinalizarExisteImagemServidor();
        }

        private SinalizarExisteImagemServidor(): void
        {
            //evitando notificação da propriedade para as mesma não serem atualizadas no servidor
            const imagem = this.Imagem as any;
            const nomePropriedade = this.RetornarNomePropriedadeExisteImagem();
            if (!(typeof imagem[nomePropriedade] === "boolean"))
            {
                throw new Erro(`A propriedade ${nomePropriedade} da imagem não foi definida,`);
            }
            imagem[nomePropriedade] = true;
        }

        private RetornarNomePropriedadeExisteImagem(): string
        {
            switch (this.TamanhoImagem)
            {
                case (d.EnumTamanhoImagem.Miniatura):
                    return "_isExisteMiniatura";
                case (d.EnumTamanhoImagem.Pequena):
                    return "_isExistePequena";
                case (d.EnumTamanhoImagem.Media):
                    return "_isExisteMedia";
                case (d.EnumTamanhoImagem.Grande):
                    return "_isExisteGrande";
                case (d.EnumTamanhoImagem.Impressao):
                    return "_isExisteArquivo";
                default:
                    throw new Erro("Tamanho imagem não suportado");
            }
        }


        public override toString(): string
        {
            return "Tarefa envio imagem " + this.Imagem.Id + " - " +
                u.EnumUtil.RetornarDescricao(EnumTamanhoImagem, this.TamanhoImagem);
        }
    }
}
