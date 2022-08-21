namespace Snebur
{
    //Acoes -- callbacks

    export declare type Action = () => void;

    export declare type Action1<T1,> = (arg1: T1) => void;

    export declare type Action2<T1, T2> = (arg1: T1, arg2: T2) => void;

    export declare type Action3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => void;

    export declare type Action4<T1, T2, T3, T4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void;

    //Funções

    export declare type Func<TResultado> = () => TResultado;

    export declare type Func1<T1, TResultado> = (arg1: T1) => TResultado;

    export declare type Func2<T1, T2, TResultado> = (arg1: T1, arg2: T2) => TResultado;

    export declare type Func3<T1, T2, T3, TResultado> = (arg1: T1, arg2: T2, arg3: T3) => TResultado;

    export declare type Func4<T1, T2, T3, T4, TResultado> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => TResultado;

    //depreciado

    export declare type Callback = () => void;

    export declare type CallbackT<T> = (argumento: T) => void;

    export declare type CallbackTT<T1, T2> = (argumento: T1, argumento2: T2) => void;

    export declare type CallbackResultado<TResultado> = (resultado: TResultado) => void;
    
    export declare type FuncaoConsulta = (pesquisa: string) => a.IConsultaEntidade<d.IEntidade>;

    export declare type FuncaoConsultaAsync = (pesquisa: string) => Promise<a.ResultadoConsulta>;

}


