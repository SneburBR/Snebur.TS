
namespace Snebur
{

    // fromEntries (ES2019)
    if (typeof Object.fromEntries !== "function")
    {
        Object.fromEntries = function (entries: any)
        {
            if (entries == null)
            {
                throw new TypeError("Object.fromEntries requires a non-nullish argument");
            }

            const obj: any = {};
            for (const [key, value] of entries)
            {
                obj[key] = value;
            }
            return obj;
        };
    }

    //entries
    if (typeof Object.entries !== "function")
    {
        Object.entries = function (obj: any): any[]
        {
            if (obj == null)
            {
                throw new TypeError("Object.fromEntries requires a non-nullish argument");
            }
 

            const res = [];
            for (const key in obj)
            {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                {
                    res.push([key, obj[key]]);
                }
            }
            return res;
        };
    }

    //getOwnPropertyDescriptors
    if (typeof Object.getOwnPropertyDescriptors !== "function")
    {
        Object.getOwnPropertyDescriptors = function (obj: any): any
        {
            if (obj == null)
            {
                throw new TypeError("Cannot convert undefined or null to object");
            }

            const res: any = {};
            const propertySymbols: any[] = typeof Object.getOwnPropertySymbols === "function"
                ? Object.getOwnPropertySymbols(obj)
                : [];

            const keys = Object.getOwnPropertyNames(obj).concat(propertySymbols);

            for (let i = 0; i < keys.length; i++)
            {
                res[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
            }
            return res;
        };
    }

}
