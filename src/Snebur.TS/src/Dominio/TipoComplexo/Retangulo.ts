//namespace Snebur.Dominio
//{
//    export class Retangulo extends Snebur.Dominio.BaseTipoComplexo implements
//        Snebur.Dominio.IBaseDominio,
//        Snebur.Dominio.ICaminhoTipo, Snebur.Dominio.IIdentificadorUnico 
//    {
//        //#region Propriedades

//        private _x: number = 0;
//        private _y: number = 0;
//        private _largura: number = 0;
//        private _altura: number = 0;

//        public get X(): number 
//        {
//            return this._x;
//        }

//        public set X(value: number)  
//        {
//            this.NotificarPropriedadeAlterada("X", this._x, this._x = value);
//        };

//        public get Posicao(): d.Posicao
//        {
//            return new d.Posicao(this.X, this.Y);
//        }

//        public get Dimensao(): d.Dimensao
//        {
//            return new d.Dimensao(this.Largura, this.Altura);
//        }

//        public get Y(): number 
//        {
//            return this._y;
//        }

//        public set Y(value: number)  
//        {
//            this.NotificarPropriedadeAlterada("Y", this._y, this._y = value);
//        };

//        public get Largura(): number 
//        {
//            return this._largura;
//        }

//        public set Largura(value: number)  
//        {
//            this.NotificarPropriedadeAlterada("Largura", this._largura, this._largura = value);
//        };

//        public get Altura(): number 
//        {
//            return this._altura;
//        }

//        public set Altura(value: number)  
//        {
//            this.NotificarPropriedadeAlterada("Altura", this._altura, this._altura = value);
//        };
//        //#endregion

//        //#region Construtor

//        public constructor(posicao: d.Posicao, dimensao: d.Dimensao)
//        public constructor(x: number, y: number, largura: number, altura: number)
//        public constructor(p1: any, p2: any, largura?: number, altura?: number) 
//        {
//            super();

//            if (p1 instanceof d.Posicao && p2 instanceof d.Dimensao)
//            {
//                this._x = p1.X;
//                this._y = p1.Y;
//                this._largura = p2.Largura;
//                this._altura = p2.Altura;
//            }
//            else
//            {
//                this._x = u.ConverterUtil.ParaNumero(p1);
//                this._y = u.ConverterUtil.ParaNumero(p2);
//                this._largura = u.ConverterUtil.ParaNumero(largura);
//                this._altura = u.ConverterUtil.ParaNumero(altura);
//            }
//        }

//        //#endregion

//        public Clone(): Retangulo
//        {
//            return new Retangulo(this.X, this.Y, this.Largura, this.Altura);
//        }

//        public Equals(retangulo: Retangulo): boolean
//        {
//            if (retangulo instanceof Retangulo)
//            {
//                return this.X === retangulo.X &&
//                    this.Y === retangulo.Y &&
//                    this.Largura === retangulo.Largura &&
//                    this.Altura === retangulo.Altura;
//            }
//            return false;
//        }
//    }
//}