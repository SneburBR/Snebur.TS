namespace Snebur.Utilidade
{
    export class HashCodeUtil
    {
        public static GetHashCodeFromString(str: string): number
        {
            let hash = 0;
            if (str.length === 0)
            {
                return hash;
            }

            for (let i = 0; i < str.length; i++)
            {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash |= 0;
            }
            return hash;
        }

        public static RetronarHashCode(...ids: number[]): number
        {
            let hash = 0;
            for (let i = 0; i < ids.length; i++)
            {
                const id = ids[i];
                hash = ((hash << 5) - hash) + id;
                hash = hash & hash;
            }
            return hash;
        }

        public static get HashDataHora()
        {
            const d = new Date();
            return Md5Util.RetornarHash((d.getDate() + d.getMonth() + d.getHours()).toString());
        }
    }

     
}
