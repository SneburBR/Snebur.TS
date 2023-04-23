namespace Snebur.Utilidade
{
    export class ScriptUtil
    {
        public static CarregarScriptAsync( urlScript: string, isAsync: boolean = true): Promise<boolean>
        {
            const script = document.createElement("script");
            script.charset = "utf-8";
            script.type = "text/javascript";
            script.async = isAsync;

            return new Promise(resolver =>
            {
                script.onerror = function ()
                {
                    console.error(`Falha ao carregar o script: ${urlScript} `);
                    resolver(false);
                };
                script.onload = function ()
                {
                    resolver(true);
                };
                script.src = urlScript;
                document.body.appendChild(script);
            });
        }
         
    }
}