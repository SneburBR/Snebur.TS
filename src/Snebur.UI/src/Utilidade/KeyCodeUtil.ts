namespace Snebur.UI
{
    export class KeyCodeUtil
    {

        public static IsCopiar(e: KeyboardEvent): boolean
        {
            return e.ctrlKey && e.keyCode === EnumKeyCode.C;
        }

        public static IsRecortar(e: KeyboardEvent): boolean
        {
            return e.ctrlKey && e.keyCode === EnumKeyCode.R;
        }

        public static IsColar(e: KeyboardEvent): boolean
        {
            return e.ctrlKey && e.keyCode === EnumKeyCode.V;
        }


        public static IsDesfazer(e: KeyboardEvent): boolean
        {
            return e.ctrlKey && e.keyCode === EnumKeyCode.Z;
        }

        public static IsRefazer(e: KeyboardEvent): boolean
        {
            return e.ctrlKey && e.keyCode === EnumKeyCode.Y;
        }

        public static IsDeselecionar(e: KeyboardEvent): boolean
        {
            return e.ctrlKey && e.keyCode === EnumKeyCode.D;
        }

        public static RetornarNumero(keycode: number): number 
        {
            if (keycode > 47 && keycode < 58)
            {
                const resultado = keycode - 48;
                return resultado;
            }
            if (keycode > 95 && keycode < 112)
            {
                const resultado = keycode - 96;
                return resultado;
            }
            return -1;
        }

        public static IsKeyCodeLetra(keycode: number): boolean 
        {
            return (keycode > 64 && keycode < 91);   // letra keys
        }

        public static IsKeyCodeEspaco(keycode: number): boolean 
        {
            return keycode === 32 || keycode === 13;
        }

        public static IsKeyCodeNumero(keycode: number): boolean 
        {
            //(event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105);
            return (keycode > 47 && keycode < 58) || // numeros key
                (keycode > 95 && keycode < 106);  // numero - teclado direita
        }

        public static IsKeyCodeLetraNumero(keycode: number): boolean 
        {
            return KeyCodeUtil.IsKeyCodeLetra(keycode) || KeyCodeUtil.IsKeyCodeNumero(keycode);
        }

        public static IsKeyCodeSeparadorMascara(keycode: number): boolean 
        {
            // ;=,-./`  [\]'  seperados das mascaras
            return (keycode > 185 && keycode < 193) || (keycode > 218 && keycode < 223);
        }

        public static IsKeyCodeEnter(keycode: number): boolean 
        {
            return (keycode === EnumKeyCode.ENTER) ||
                (keycode === EnumKeyCode.NUMPAD_ENTER);
        }

        public static IsKeyCodeTab(keycode: number): boolean
        {
            return (keycode === EnumKeyCode.TAB);
        }

        public static IsKeyCodeEsc(keycode: number): boolean 
        {
            return (keycode === EnumKeyCode.ESC);
        }

        public static IsKeyCodeDelete(keycode: number): boolean 
        {
            return (keycode === EnumKeyCode.DELETE);
        }

        public static IsKeyCodeShift(keycode: number): boolean 
        {
            return (keycode === EnumKeyCode.SHIFT);
        }

        public static IsKeyCodeControl(keycode: number): boolean 
        {
            return (keycode === EnumKeyCode.CONTROL);
        }

        public static IsKeyCodeDoisPontos(keycode: number): boolean
        {
            return (keycode === EnumKeyCode.DOIS_PONTOS);
        }

        public static IsBackSpace(keycode: number): boolean
        {
            return (keycode === EnumKeyCode.BACKSPACE);
        }

        public static IsDelete(keycode: number): boolean
        {
            return (keycode === EnumKeyCode.DELETE);
        }


        public static IsKeyCodeTraco(keycode: number): boolean
        {
            return (keycode === EnumKeyCode.TRACO) ||
                (keycode === EnumKeyCode.NUMPAD_TRACO);
        }

        public static IsKeyCodeAbreParemtes(keycode: number): boolean
        {
            return (keycode === EnumKeyCode.ABRE_PARENTES);
        }

        public static IsKeyCodeFechaParantes(keycode: number): boolean
        {
            return (keycode === EnumKeyCode.FECHA_PARENTES);
        }


        public static IsKeyCodeZero(keyCode: number): boolean
        {
            return (keyCode === EnumKeyCode.ZERO) ||
                (keyCode === EnumKeyCode.NUMPAD_ZERO);
        }

        public static IsKeyCodeParaCima(e: KeyboardEvent): boolean
        {
            const keyCode = e.keyCode;
            const isNumLockDesativado = !e.getModifierState("NumLock");
            return (keyCode === EnumKeyCode.SUBIR) ||
                (isNumLockDesativado && keyCode === EnumKeyCode.NUMPAD_SUBIR);
        }


        public static IsKeyCodeParaBaixo(e: KeyboardEvent): boolean
        {
            const keyCode = e.keyCode;
            const isNumLockDesativado = !e.getModifierState("NumLock");
            return (keyCode === EnumKeyCode.DESCER) ||
                (isNumLockDesativado && keyCode === EnumKeyCode.NUMPAD_DESCER);
        }

        
    }

    /*eslint-disable*/
    export enum EnumKeyCode
    {
        ESC = 27,
        ENTER = 13,

        DIREITA = 39,
        ESQUERDA = 37,
        SUBIR = 38,
        DESCER = 40,

        DELETE = 46,
        DELETE_TECLADO_NUMERICO = -1,
        SHIFT = 16,
        CONTROL = 17,

        ALT = 18,
        BACKSPACE = 8,
        CAPS_LOCK = 20,
        COMMA = 188,
        COMMAND = 91,
        COMMAND_LEFT = 91,
        COMMAND_RIGHT = 93,

        END = 35,
        ESCAPE = 27,
        HOME = 36,
        INSERT = 45,
        LEFT = 37,
        MENU = 93,

        NUMPAD_ADD = 107,
        NUMPAD_DECIMAL = 110,
        NUMPAD_DIVIDE = 111,
        NUMPAD_ENTER = 108,
        NUMPAD_MULTIPLY = 106,
        NUMPAD_SUBTRACT = 109,

        NUMPAD_SUBIR = 104,
        NUMPAD_DESCER = 98,

        PAGE_DOWN = 34,
        PAGE_UP = 33,
        PERIOD = 190,
        RIGHT = 39,
        SPACE = 32,
        TAB = 9,

        WINDOWS = 91,

        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,

        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,

        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,

        PONTO = 190,
        DOIS_PONTOS = 191,
        PONTO_VIRGUALA = 191,
        VIRGULA = 188,

        TRACO = 189,
        NUMPAD_TRACO = 109,
        ABRE_PARENTES = 57,
        FECHA_PARENTES = 48,

        ZERO = 48,
        NUMPAD_ZERO = 96,

        F5 = 116
    }
}