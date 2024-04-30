namespace Snebur
{
    export class LinkedList<T>
    {
        private _count: number = 0;
        private _head: LinkedListNode<T> | null = null;
        private _tail: LinkedListNode<T> | null = null;

        public get Head(): LinkedListNode<T> | null
        {
            return this._head;
        }

        public get Tail(): LinkedListNode<T> | null
        {
            return this._tail;
        }

        public get Count(): number
        {
            return this._count;
        }

        public Add(value: T): void
        {
            const node = new LinkedListNode(value);
            if (this._head === null)
            {
                this._head = node;
                this._tail = node;
            }
            else
            {
                this._tail!.Next = node;
                this._tail = node;
            }
            this._count++;
        }

        public Contains(value: T): boolean
        {
            let current = this._head;
            while (current !== null)
            {
                if (current.Value === value)
                {
                    return true;
                }
                current = current.Next;
            }
            return false;
        }

        public Remove(value: T): boolean
        {
            let current = this._head;
            let previous: LinkedListNode<T> | null = null;

            while (current !== null)
            {
                if (current.Value === value)
                {
                    if (previous === null)
                    {
                        this._head = current.Next;
                    }
                    else
                    {
                        previous.Next = current.Next;
                    }
                    this._count--;
                    return true;
                }
                previous = current;
                current = current.Next;
            }
            return false;
        }

        public Clear(): void
        {
            this._head = null;
            this._tail = null;
            this._count = 0;
        }
    }

    export class LinkedListNode<T>
    {
        public Next: LinkedListNode<T> | null = null;
        public constructor(
            public readonly Value: T)
        {

        }
    }
}
