namespace Snebur.UI
{
    export class Fila<T>
    {
        private _fila = new Array<T>();

        public constructor()
        {

        }
         
        public Add(item: T): void
        {
            this._fila.Add(item);
        }

        public AddRange(items: T[]): void
        {
            this._fila.AddRange(items);
        }
         
        public Clear(): void
        {
            this._fila.Clear();
        }

        public get Count(): number
        {
            return this._fila.Count;
        }

        public Contains(item: T): boolean
        {
            return this._fila.Contains(item);
        }

        public Dequeue(): T
        {
            return this._fila.shift();
        }

        public Enqueue(item: T): void
        {
            this._fila.push(item);
        }

        public Peek(): T
        {
            return this._fila[this._fila.length - 1];
        }

        public Remove(item: T): boolean
        {
            return this._fila.Remove(item);
        }

        public ToArray(): T[]
        {
            return this._fila.ToList(true);
        }
    }
}