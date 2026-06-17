namespace Snebur
{
    export class LibraryDependencyCheckerUtil
    {
        private static readonly dependencies: string[] = [
            "UAParser",
            "Base64Binary",
            "md5",
            "saveAs",
            "JSZip",
            "ZCryptoJS",
            "pica",
            "Buffer",
            "exifr",
            "Chart",
            "QRCode"
        ];

        public static Check(): void
        {
            for (const libName of this.dependencies)
            {
                if ((window as any)[libName] === undefined)
                {
                    console.error(`The depedency '${libName}' is not loaded`);
                }
            }
        }
    }
}

