namespace Snebur
{
    export class SnRandom
    {
        private _seed: number;

        public get Seed(): number
        {
            return this._seed;
        }

        public constructor()
        public constructor(seed: number)
        public constructor(seed?: number)
        {
            this._seed = seed || new Date().Millisecond;
        }
         
        public Next(maximo: number): number
        public Next(minimo: number, maximo: number): number
        public Next(minimo: number, maximo: number = Number.NaN): number
        {
            if (isNaN(maximo))
            {
                maximo = minimo;
                minimo = 0;
            }
            if (minimo < 0 || maximo < 0 || minimo > maximo)
            {
                throw new ErroOperacaoInvalida("Argumentos invalido, requerido números positivo e minimo > máximo");
            }

            this._seed += 1;

            const sin = Math.sin(this.Seed) * (maximo - minimo);
            const resultado = Math.abs(Math.floor(sin));
             
            return resultado > minimo ? Math.min(resultado, maximo) :
                Math.max(resultado, minimo);
        }
    }
}
