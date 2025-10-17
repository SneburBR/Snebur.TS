namespace Snebur
{
    export class XMLHttpRequestFactory
    {
        public static Create(
            url: string,
            method: "POST" | "GET",
            async = true): XMLHttpRequest
        {
            const http = new XMLHttpRequest();
            http.open(method, url, async);
            return http;

        }
    }
}
