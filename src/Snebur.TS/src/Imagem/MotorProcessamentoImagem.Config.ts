namespace Snebur.Imagens
{
    export enum EnumMotorProcessamentoImagem
    {
        MagickMainThread,
        MagickWorker,
        PicaJS,
        Canvas,
    }
}

const __localGlobalThis = globalThis as unknown as Window;
__localGlobalThis.__motor_processamento_imagem__ = Snebur.Imagens.EnumMotorProcessamentoImagem.MagickWorker;
__localGlobalThis.__is_salvar_arquivos__ = false;
__localGlobalThis.__is_log_imagens_sucesso__ = false;
__localGlobalThis.__tamanho_maximo_resize_canvas__ = 16383;

interface Window
{
    readonly MOTOR_PROCESSAMENTO_IMAGEM: Snebur.Imagens.EnumMotorProcessamentoImagem;
    readonly IS_SALVAR_ARQUIVOS: boolean;
    readonly TAMANHO_MAXIMO_RESIZE_CANVAS: number;
    readonly IS_LOG_IMAGENS_SUCESSO: boolean;

    SetMotorProcessamentoImagem(motor: Snebur.Imagens.EnumMotorProcessamentoImagem): void;
    SetIsSalvarArquivosDEBUG(isSalvarArquivos: boolean): void;
    SetIsLogImagensSucessoDEBUG(isLogImagensSucesso: boolean): void;
    SetTamanhoMaximoResizeCanvasDEBUG(tamanhoMaximo: number): void;
}


if (typeof Window !== "undefined")
{
    console.error(" Não foi implementado ainda para o ambiente Node or Worker ");
}

const globalThisPrototype = typeof Window !== "undefined" ?
    Window.prototype :
    Object.getPrototypeOf(globalThis);

Object.defineProperty(globalThisPrototype, "MOTOR_PROCESSAMENTO_IMAGEM", {
    get: function (this: Window)
    {
        return this.__motor_processamento_imagem__;
    }
});


Object.defineProperty(globalThisPrototype, "IS_LOG_IMAGENS_SUCESSO", {
    get: function (this: Window)
    {
        return this.__is_log_imagens_sucesso__;
    }
});

Object.defineProperty(globalThisPrototype, "TAMANHO_MAXIMO_RESIZE_CANVAS", {
    get: function (this: Window)
    {
        return this.__tamanho_maximo_resize_canvas__;
    }
});

// SETTERS DEBUG

__localGlobalThis.SetMotorProcessamentoImagem = function (this: Window, motor: Snebur.Imagens.EnumMotorProcessamentoImagem): void
{
    Snebur.Guard.EnumDefined(Snebur.Imagens.EnumMotorProcessamentoImagem, motor);
    if (this.__motor_processamento_imagem__ !== motor)
    {
        const de = Snebur.Imagens.EnumMotorProcessamentoImagem[this.__motor_processamento_imagem__];
        const para = Snebur.Imagens.EnumMotorProcessamentoImagem[motor];
        console.warn(`SetMotorProcessamentoImagem: Alterando motor de processamento de imagem De ${de} Para ${para}`);
        this.__motor_processamento_imagem__ = motor;
    }
};

__localGlobalThis.SetIsSalvarArquivosDEBUG = function (this: Window, value: boolean): void
{
    if (this.__is_salvar_arquivos__ !== value)
    {
        const de = this.__is_salvar_arquivos__ ? "TRUE" : "FALSE";
        const para = value ? "TRUE" : "FALSE";
        console.warn(`SetIsSalvarArquivosDEBUG: Alterando IsSalvarArquivos De ${de} Para ${para}`);
        this.__is_salvar_arquivos__ = value;
    }
};

__localGlobalThis.SetIsLogImagensSucessoDEBUG = function (this: Window, value: boolean): void
{
    if (this.__is_log_imagens_sucesso__ !== value)
    {
        const de = this.__is_log_imagens_sucesso__ ? "TRUE" : "FALSE";
        const para = value ? "TRUE" : "FALSE";
        console.warn(`SetIsLogImagensSucessoDEBUG: Alterando IsLogImagensSucesso De ${de} Para ${para}`);

    }
};

__localGlobalThis.SetTamanhoMaximoResizeCanvasDEBUG = function (this: Window, value: number): void
{
    if (this.__tamanho_maximo_resize_canvas__ !== value)
    {
        const de = this.__tamanho_maximo_resize_canvas__;
        const para = value;
        console.warn(`SetTamanhoMaximoResizeCanvasDEBUG: Alterando TamanhoMaximoResizeCanvas De ${de} Para ${para}`);
    }
};
