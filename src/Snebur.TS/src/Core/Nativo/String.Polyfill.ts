
if (typeof String.prototype.repeat === "undefined")
{
    String.prototype.repeat = function (this: string, count)
    {
        if (this == null)
        {
            throw new TypeError("não é possível converter " + this + " para um objeto");
        }
        const str = "" + this;
        count = +count;
        if (count !== count)
        {
            count = 0;
        }
        if (count < 0)
        {
            throw new RangeError("o núm. de repetições não pode ser negativo");
        }
        if (count === Infinity)
        {
            throw new RangeError("o núm. de repetições deve ser menor que infinito");
        }
        count = Math.floor(count);
        if (str.length === 0 || count === 0)
        {
            return String.Empty;
        }

        // Ao Garantir que count seja um inteiro de 31 bits nos dá uma grande otimização
        // na parte principal. Porém, navegadores atuais (de agosto de 2014 pra cá)
        // não conseguem mais manipular strings de 1 << 28 chars ou maiores, então:
        if (str.length * count >= 1 << 28)
        {
            throw new RangeError("o núm. de repetições não deve estourar o tamanho máx. de uma string");
        }
        let rpt = String.Empty;
        for (let i = 0; i < count; i++)
        {
            rpt += str;
        }
        return rpt;
    };
}

if (typeof String.prototype.trimStart === "undefined")
{
    String.prototype.trimStart = function (this: string)
    {
        return this.replace(/^\s+/, "");
    };
}

if (typeof String.prototype.trimEnd === "undefined")
{
    String.prototype.trimEnd = function (this: string)
    {
        return this.replace(/\s+$/g, "");
    };
}

if (typeof String.prototype.padEnd === "undefined")
{
    String.prototype.padEnd = function (this: string, targetLength: number, padString: string)
    {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        if (this.length > targetLength)
        {
            return String(this);
        }
        else
        {
            padString = String((typeof padString !== "undefined" ? padString : " "));
            targetLength = targetLength - this.length;
            if (targetLength > padString.length)
            {
                padString += padString.repeat(targetLength / padString.length);
            }
            return String(this) + padString.slice(0, targetLength);
        }
    };
}

if (typeof String.prototype.padStart === "undefined")
{
    String.prototype.padStart = function (this: string, targetLength: number, padString: string)
    {
        targetLength = targetLength >> 0;  
        
        if (this.length > targetLength)
        {
            return String(this);
        }
        else
        {
            padString = String((typeof padString === "undefined" ? padString : " "));
            targetLength = targetLength - this.length;
            if (targetLength > padString.length)
            {
                padString += padString.repeat(targetLength / padString.length); 
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

if (typeof String.prototype.matchAll !== "function")
{
    String.prototype.matchAll = function (regex: RegExp): IterableIterator<RegExpMatchArray>
    {
        if (regex == null)
        {
            throw new TypeError("Arguments to matchAll must not be null or undefined");
        }
        if (regex instanceof RegExp && !regex.global)
        {
            throw new TypeError(".matchAll called with a non-global RegExp argument");
        }

        const flags = regex.flags === undefined ? "" : regex.flags;
        const matcher = new RegExp(regex.source, flags.includes("g") ? flags : flags + "g");
        matcher.lastIndex = regex.lastIndex;

        const str = String(this);
        const results : any = [];
        let match;

        while ((match = matcher.exec(str)) !== null)
        {
            results.push(match);
        }

        // Return a basic ES6 iterator
        let index = 0;
        return {
            next: function ()
            {
                return index < results.length
                    ? { value: results[index++], done: false }
                    : { value: undefined, done: true };
            },
            [Symbol.iterator]: function() { return this; }
        };
    };
}