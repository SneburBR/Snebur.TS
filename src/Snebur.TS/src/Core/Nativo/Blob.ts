namespace Snebur
{
    if(Blob.prototype.arrayBuffer === undefined)
    {
        console.warn(`O nevagador atual não tem suporte ao método Blob.prototype.arrayBuffer, adicionando polyfill`);
        Blob.prototype.arrayBuffer = function(): Promise<ArrayBuffer>
        {
            return new Promise((resolve, reject) =>
            {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as ArrayBuffer);
                reader.onerror = () => reject(reader.error);
                reader.readAsArrayBuffer(this);
            });
        };
    }
}