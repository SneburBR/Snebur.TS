namespace Snebur.Utilidade
{
    export class InternetUtil
    {
        public static get IsOnline(): boolean
        {
            return navigator.onLine;
        }

        public static async AguardarConexaoInternerAsync(): Promise<void>
        {
            while (!navigator.onLine)
            {
                await u.ThreadUtil.EsperarAsync(1000);
            }
        }
    }
}
