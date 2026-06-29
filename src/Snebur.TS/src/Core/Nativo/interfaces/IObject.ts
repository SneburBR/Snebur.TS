interface Object extends Snebur.Nativo.IObject
{

}


interface ObjectConstructor extends Snebur.Nativo.IObjectConstructor
{
    assignBase: (obj: object) => string[];
    keysBase: (obj: object) => string[];
    values(o: {}): any[];
    valuesBase(o: {}): any[];
    isKey(key: string): boolean;

    /**
    * Returns an object created by key-value entries for properties and methods
    * @param entries An iterable object that contains key-value entries for properties and methods.
    */
    fromEntries<T = any>(entries: Iterable<readonly [PropertyKey, T]>): { [k: string]: T; };

    /**
     * Returns an object created by key-value entries for properties and methods
     * @param entries An iterable object that contains key-value entries for properties and methods.
     */
    fromEntries(entries: Iterable<readonly any[]>): any;

    /**
    * Returns an array of values of the enumerable own properties of an object
    * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
    */
    values<T>(o: { [s: string]: T; } | ArrayLike<T>): T[];

    /**
     * Returns an array of values of the enumerable own properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    values(o: {}): any[];

    /**
     * Returns an array of key/values of the enumerable own properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    entries<T>(o: { [s: string]: T; } | ArrayLike<T>): [string, T][];

    /**
     * Returns an array of key/values of the enumerable own properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    entries(o: {}): [string, any][];

    /**
     * Returns an object containing all own property descriptors of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    getOwnPropertyDescriptors<T>(o: T): { [P in keyof T]: TypedPropertyDescriptor<T[P]>; } & { [x: string]: PropertyDescriptor; };
}

namespace Snebur.Nativo
{
    export interface IObject<TTipo extends Snebur.Reflexao.BaseTipo = Snebur.Reflexao.BaseTipo> extends ITipo<TTipo>, ICaminhoTipo, IEquals
    {
   
    }

    export interface IObjectConstructor extends ITipo<Snebur.Reflexao.BaseTipo>, ICaminhoTipo
    {
        assign(target: any, ...sources: any[]): void;
    }
}