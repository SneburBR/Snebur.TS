declare const $0: any;
declare const $1: any;
declare const $2: any;
declare const $3: any;
declare const $4: any;
declare const $5: any;
declare const $6: any;
declare const $7: any;
declare const $8: any;
declare const $9: any;
declare const $10: any;

namespace Snebur
{
    export declare const $Aplicacao: Snebur.Aplicacao.BaseAplicacao;
    /*eslint-disable*/
    export let VersaoScript: string;

    export let $Configuracao: Snebur.Aplicacao.ConfiguracaoAplicacao;

    //export let $Global: Window;


    //importados no arquivo Reflexao.ts
    //export import r = Snebur.Reflexao;
    //export import u = Snebur.Utilidade;

    export import a = Snebur.AcessoDados;
    export import ex = Snebur.Expressao;
    export import i = Snebur.Imagens;

    export import d = Snebur.Dominio;
    export import s = Snebur.Seguranca;
    export import c = Snebur.Comunicacao;
    export import g = Snebur.Globalizacao;
    export import t = Snebur.Tarefa;
    export import sa = Snebur.ServicoArquivo;

    export import at = Snebur.Dominio.Atributos;
    export import ap = Snebur.Aplicacao;
    export import w = Snebur.WebWorker;
    export import imagens = Snebur.Imagens;
    export import im = Snebur.Imagens;

    export import Entidade = Snebur.Dominio.Entidade;
    export import IEntidade = Snebur.Dominio.IEntidade;
    export import IEntidadeClonada = Snebur.Dominio.IEntidadeClonada;

    export import BaseViewModel = Snebur.Dominio.BaseViewModel;
    export import ViewModelGenerico = Snebur.Dominio.ViewModelGenerico;

    //Tipos Complexos
    export import Dimensao = Snebur.Dominio.Dimensao;
    export import Margem = Snebur.Dominio.Margem;
    export import Posicao = Snebur.Dominio.Posicao;
    export import PrazoTempo = Snebur.Dominio.PrazoTempo;
    export import Area = Snebur.Dominio.Area;
    export import Regiao = Snebur.Dominio.Regiao;
    export import Cor = Snebur.Dominio.Cor;

    //utilidades  
    export import Util = Snebur.Utilidade.Util;
    export import EnumUtil = Snebur.Utilidade.EnumUtil;
    export import ValidacaoUtil = Snebur.Utilidade.ValidacaoUtil;
    export import FormatacaoUtil = Snebur.Utilidade.FormatacaoUtil;
    export import TextoUtil = Snebur.Utilidade.TextoUtil;
    export import GuidUtil = Snebur.Utilidade.GuidUtil;
    export import ConverterUtil = Snebur.Utilidade.ConverterUtil;
    export import MedidaUtil = Snebur.Utilidade.MedidaUtil;
    export import ThreadUtil = Snebur.Utilidade.ThreadUtil;
    export import JsonUtil = Snebur.Utilidade.JsonUtil;
    export import LogUtil = Snebur.Utilidade.LogUtil;
    export import NormalizacaoUtil = Snebur.Utilidade.NormalizacaoUtil;
    export import FuncaoUtil = Snebur.Utilidade.FuncaoUtil;
    export import GlobalizacaoUil = Snebur.Utilidade.GlobalizacaoUil;
    export import DataHoraUtil = Snebur.Utilidade.DataHoraUtil;
    export import ExpressaoUtil = Snebur.Utilidade.ExpressaoUtil;
    export import DimensaoUtil = Snebur.Utilidade.DimensaoUtil;
    export import SistemaUtil = Snebur.Utilidade.SistemaUtil;
    export import BytesUtil = Snebur.Utilidade.BytesUtil;
    export import UrlUtil = Snebur.Utilidade.UrlUtil;
    export import ImagemUtil = Snebur.Utilidade.ImagemUtil;
    export import ListaUtil = Snebur.Utilidade.ListaUtil;
    export import DebugUtil = Snebur.Utilidade.DebugUtil;

    export import ArquivoUtil = Snebur.Utilidade.ArquivoUtil;
    export import CaminhoUtil = Snebur.Utilidade.CaminhoUtil;
    export import AjaxUtil = Snebur.Utilidade.AjaxUtil;
    export import MimeTypeUtil = Snebur.Utilidade.MimeTypeUtil;

    //enumeradores
    export import EnumFormatoImagem = Snebur.Dominio.EnumFormatoImagem;
    export import EnumTamanhoImagem = Snebur.Dominio.EnumTamanhoImagem;
    export import EnumRotacaoImagem = Snebur.Dominio.EnumRotacaoImagem;
    export import EnumPreenchimentoImagem = Snebur.Dominio.EnumPreenchimentoImagem;
    export import EnumEfeitoImagem = Snebur.Dominio.EnumEfeitoImagem;
    export import EnumOrientacao = Snebur.Dominio.EnumOrientacao;
    export import EnumTipoPrazo = Snebur.Dominio.EnumTipoPrazo;
    export import EnumSentidoOrdenacao = Snebur.Dominio.EnumSentidoOrdenacao;
    export import EnumAparencia = Snebur.UI.EnumAparencia;
    export import EnumNavegador = Snebur.Dominio.EnumNavegador;

    export import EnumFormatacao = Snebur.UI.EnumFormatacao;
    export import EnumStatusArquivo = Snebur.Dominio.EnumStatusArquivo;
    export import EnumMimeType = Snebur.Dominio.EnumMimeType;
    export import EnumMimetypeString = Snebur.Utilidade.EnumMimetypeString;

    export import EnumUF = Snebur.Dne.EnumUF;
    export import EnumUFSigla = Snebur.Dne.EnumUFSigla;

    //acesso a dados
    export import IConsultaEntidade = Snebur.AcessoDados.IConsultaEntidade;
    export import ConsultaEntidade = Snebur.AcessoDados.ConsultaEntidade;
    export import IConsultaEntidades = Snebur.AcessoDados.IConsultaEntidade;

    //interfaces
    export import IDeletado = Snebur.Dominio.IDeletado;
    export import IAtivo = Snebur.Dominio.IAtivo;
    export import ISelecionado = Snebur.Dominio.ISelecionado;
    export import IUsuario = Snebur.Dominio.IUsuario;
    export import ISessaoUsuario = Snebur.Dominio.ISessaoUsuario;
    export import IOrdenacao = Snebur.Dominio.IOrdenacao;
    export import IOrdenacaoEntidade = Snebur.Dominio.IOrdenacaoEntidade;
    export import IImagem = Snebur.Dominio.IImagem;

    export import IDimensao = Snebur.Dominio.IDimensao;
    export import IPosicao = Snebur.Dominio.IPosicao;
    export import IArea = Snebur.Dominio.IArea;
    export import IRegiao = Snebur.Dominio.IRegiao;

    (function ()
    {
        /* eslint-disable*/
        class __PropriedadesProtegidas extends Entidade
        {
        }

        const origem = new __PropriedadesProtegidas();
        let destino = Object(___PropriedadesMetodosProtegidosEntidades);
        for (let p in origem)
        {
            destino[p] = true;
        }
        Object.freeze(___PropriedadesMetodosProtegidos);
        Object.freeze(___PropriedadesMetodosProtegidosEntidades);
    })();

    Object.defineProperty(Snebur, "$Aplicacao", {
        get: function ()
        {
            return Snebur.Aplicacao.BaseAplicacao.Instancia;
        },
        configurable: false,
        enumerable: false
    });
}

namespace Snebur.Dominio.Atributos
{
    export import ChavePrimaria = Snebur.Dominio.Atributos.ChavePrimariaAttribute;
}

