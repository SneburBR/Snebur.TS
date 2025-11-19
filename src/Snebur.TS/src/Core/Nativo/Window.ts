namespace Snebur
{
    if (!window.alertBase)
    {
        window.alertBase = window.alert;

        Object.defineProperty(window, "alert", {
            value: function (obj: Window)
            {
                return window.alertBase;
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
    }

}


interface Window
{
    /*@internal*/
    __motor_processamento_imagem__: Snebur.imagens.EnumMotorProcessamentoImagem;
    /*@internal*/
    __is_salvar_arquivos__: boolean;
    /*@internal*/
    __is_log_imagens_sucesso__: boolean;
    /*@internal*/
    __tamanho_maximo_resize_canvas__: number;

}

