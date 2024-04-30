namespace Snebur
{
	export class Queue<T>
	{
		private _items = new LinkedList<T>();
		public get Count(): number
		{
			return this._items.Count;
		}

		public Enqueue(item: T): void
		{
            this._items.Add(item);
		}

		public Contains(item: T): boolean
		{
			return this._items.Contains(item);
		}

		public Remove(item: T):boolean
		{
			return this._items.Remove(item);
		}

		public Dequeue(): T | undefined
        {
            if (this.Count === 0)
            {
                return undefined;
			}

            const item = this._items.Head!.Value;
            this._items.Remove(item);
            return item;
		}

		public Peek(): T | undefined
		{
			return this._items.Head?.Value;
		}

		public Clear(): void
		{
			return this._items.Clear();
		}
	}

	
	
}
