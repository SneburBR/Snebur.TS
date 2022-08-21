interface Base64Binary
{
    decode(base64string: any, arrayBuffer: any): Uint8Array;

    decodeArrayBuffer(base64string: string): ArrayBuffer;
}
declare let Base64Binary: Base64Binary;
