﻿// Type definitions for CryptoJS 3.1.2
// Project: https://code.google.com/p/crypto-js/
// Definitions by: Gia Bảo @ Sân Đình <https://github.com/giabao>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

 
declare namespace ZCryptoJSNamaspcace
{
    namespace lib
    {
        interface Base
        {
            extend(overrides: Object): Object
            init(...args: any[]): void
            //arguments of create() is same as init(). This is true for all subclasses
            create(...args: any[]): Base
            mixIn(properties: Object): void
            clone(): Base
        }

        interface WordArray extends Base
        {
            words: number[]
            sigBytes: number
            init(words?: number[], sigBytes?: number): void
            create(words?: number[], sigBytes?: number): WordArray

            init(typedArray: ArrayBuffer): void
            init(typedArray: Int8Array): void

            //Because TypeScript uses a structural type system then we don't need (& can't)
            //declare oveload function init, create for the following type (same as Int8Array):
            //then Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array
            //Note also: Uint8ClampedArray is not defined in lib.d.ts & not supported in IE
            //@see http://compatibility.shwups-cms.ch/en/home?&property=Uint8ClampedArray

            create(typedArray: ArrayBuffer): WordArray
            create(typedArray: Int8Array): WordArray

            toString(encoder?: enc.IEncoder): string
            concat(wordArray: WordArray): WordArray
            clamp(): void
            clone(): WordArray
            random(nBytes: number): WordArray
        }
        interface BufferedBlockAlgorithm extends Base
        {
            reset(): void
            clone(): BufferedBlockAlgorithm
        }
        //tparam C - Configuration type
        interface IHasher<C> extends BufferedBlockAlgorithm
        {
            cfg: C
            init(cfg?: C): void
            create(cfg?: C): IHasher<C>

            update(messageUpdate: string): Hasher
            update(messageUpdate: WordArray): Hasher

            finalize(messageUpdate?: string): WordArray
            finalize(messageUpdate?: WordArray): WordArray

            blockSize: number

            _createHelper(hasher: Hasher): IHasherHelper<C>
            _createHmacHelper(hasher: Hasher): IHasherHmacHelper

            clone(): IHasher<C>
        }
        interface Hasher extends IHasher<Object> { }

        //tparam C - Configuration type
        interface IHasherHelper<C>
        {
            (message: string, cfg?: C): WordArray
            (message: WordArray, cfg?: C): WordArray
        }
        interface HasherHelper extends IHasherHelper<Object> { }

        interface IHasherHmacHelper
        {
            (message: string, key: string): WordArray
            (message: string, key: WordArray): WordArray
            (message: WordArray, key: string): WordArray
            (message: WordArray, key: WordArray): WordArray
        }
        //tparam C - Configuration type
        interface ICipher<C> extends BufferedBlockAlgorithm
        {
            cfg: C
            createEncryptor(key: WordArray, cfg?: C): ICipher<C>
            createDecryptor(key: WordArray, cfg?: C): ICipher<C>

            create(xformMode?: number, key?: WordArray, cfg?: C): ICipher<C>
            init(xformMode?: number, key?: WordArray, cfg?: C): void

            process(dataUpdate: string): WordArray
            process(dataUpdate: WordArray): WordArray

            finalize(dataUpdate?: string): WordArray
            finalize(dataUpdate?: WordArray): WordArray

            keySize: number
            ivSize: number

            _createHelper(cipher: Cipher): ICipherHelper<C>

            clone(): ICipher<C>
        }
        interface Cipher extends ICipher<Object> { }

        interface IStreamCipher<C> extends ICipher<C>
        {
            drop?: number;

            createEncryptor(key: WordArray, cfg?: C): IStreamCipher<C>
            createDecryptor(key: WordArray, cfg?: C): IStreamCipher<C>

            create(xformMode?: number, key?: WordArray, cfg?: C): IStreamCipher<C>

            blockSize: number
        }
        interface StreamCipher extends IStreamCipher<Object> { }

        interface BlockCipherMode extends Base
        {
            createEncryptor(cipher: Cipher, iv: number[]): mode.IBlockCipherEncryptor
            createDecryptor(cipher: Cipher, iv: number[]): mode.IBlockCipherDecryptor
            init(cipher?: Cipher, iv?: number[]): void
            create(cipher?: Cipher, iv?: number[]): BlockCipherMode
        }
        //BlockCipher has interface same as IStreamCipher
        interface BlockCipher extends IStreamCipher<IBlockCipherCfg> { }

        interface IBlockCipherCfg
        {
            iv?: WordArray;
            mode?: mode.IBlockCipherModeImpl //default CBC
            padding?: pad.IPaddingImpl //default Pkcs7
        }
        interface CipherParamsData
        {
            ciphertext?: lib.WordArray
            key?: lib.WordArray
            iv?: lib.WordArray
            salt?: lib.WordArray
            algorithm?: Cipher
            mode?: mode.IBlockCipherModeImpl
            padding?: pad.IPaddingImpl
            blockSize?: number
            formatter?: format.IFormatter
        }
        interface CipherParams extends Base, CipherParamsData
        {
            init(cipherParams?: CipherParamsData): void
            create(cipherParams?: CipherParamsData): CipherParams
            toString(formatter?: format.IFormatter): string
        }
        //tparam C - Configuration type
        interface ISerializableCipher<C extends ISerializableCipherCfg> extends Base
        {
            cfg: C
            encrypt(cipher: Cipher, message: WordArray, key: WordArray, cfg?: C): CipherParams
            encrypt(cipher: Cipher, message: string, key: WordArray, cfg?: C): CipherParams

            decrypt(cipher: Cipher, ciphertext: CipherParamsData, key: WordArray, cfg?: C): WordArray
            decrypt(cipher: Cipher, ciphertext: string, key: WordArray, cfg?: C): WordArray
        }
        interface SerializableCipher extends ISerializableCipher<ISerializableCipherCfg> { }
        interface ISerializableCipherCfg
        {
            format?: format.IFormatter //default OpenSSLFormatter
            iv?: WordArray;
            mode?: mode.IBlockCipherModeImpl;
            padding?: pad.IPaddingImpl;
        }
        interface IPasswordBasedCipher<C extends IPasswordBasedCipherCfg> extends Base
        {
            cfg: C
            encrypt(cipher: Cipher, message: WordArray, password: string, cfg?: C): CipherParams
            encrypt(cipher: Cipher, message: string, password: string, cfg?: C): CipherParams

            decrypt(cipher: Cipher, ciphertext: CipherParamsData, password: string, cfg?: C): WordArray
            decrypt(cipher: Cipher, ciphertext: string, password: string, cfg?: C): WordArray
        }
        interface PasswordBasedCipher extends IPasswordBasedCipher<IPasswordBasedCipherCfg> { }
        interface IPasswordBasedCipherCfg extends ISerializableCipherCfg
        {
            kdf?: kdf.IKdfImpl //default OpenSSLKdf
            mode?: mode.IBlockCipherModeImpl;
            padding?: pad.IPaddingImpl;
        }
        /** see Cipher._createHelper */
        interface ICipherHelper<C>
        {
            encrypt(message: string, password: string, cfg?: C): CipherParams
            encrypt(message: string, key: WordArray, cfg?: C): CipherParams
            encrypt(message: WordArray, password: string, cfg?: C): CipherParams
            encrypt(message: WordArray, key: WordArray, cfg?: C): CipherParams

            decrypt(ciphertext: string, password: string, cfg?: C): WordArray
            decrypt(ciphertext: string, key: WordArray, cfg?: C): WordArray
            decrypt(ciphertext: CipherParamsData, password: string, cfg?: C): WordArray
            decrypt(ciphertext: CipherParamsData, key: WordArray, cfg?: C): WordArray
        }
        interface CipherHelper extends ICipherHelper<Object> { }
        interface LibStatic
        {
            Base: lib.Base
            WordArray: lib.WordArray
            CipherParams: lib.CipherParams
            SerializableCipher: lib.SerializableCipher
            PasswordBasedCipher: lib.PasswordBasedCipher
        }
    }
    namespace enc
    {
        interface IEncoder
        {
            stringify(wordArray: lib.WordArray): string
        }
        interface IDecoder
        {
            parse(s: string): lib.WordArray
        }
        interface ICoder extends IEncoder, IDecoder { }

        interface EncStatic
        {
            Hex: ICoder
            Latin1: ICoder
            Utf8: ICoder
            Base64: ICoder
            Utf16: ICoder
            Utf16BE: ICoder
            Utf16LE: ICoder
        }
    }
    namespace kdf
    {
        interface KdfStatic
        {
            OpenSSL: IKdfImpl
        }
        interface IKdfImpl
        {
            execute(password: string, keySize: number, ivSize: number, salt?: string): lib.CipherParams
            execute(password: string, keySize: number, ivSize: number, salt?: lib.WordArray): lib.CipherParams
        }
    }
    namespace format
    {
        interface FormatStatic
        {
            OpenSSL: IFormatter
            Hex: IFormatter
        }
        interface IFormatter
        {
            stringify(cipherParams: lib.CipherParamsData): string
            parse(s: string): lib.CipherParams
        }
    }
    namespace algo
    {
        interface AlgoStatic
        {
            AES: algo.AES
            DES: algo.DES
            TripleDES: algo.TripleDES

            RabbitLegacy: algo.RabbitLegacy
            Rabbit: algo.Rabbit
            RC4: algo.RC4

            MD5: algo.MD5
            RIPEMD160: algo.RIPEMD160
            SHA1: algo.SHA1
            SHA256: algo.SHA256
            SHA224: algo.SHA224
            SHA384: algo.SHA384
            SHA512: algo.SHA512

            SHA3: algo.SHA3

            HMAC: algo.HMAC

            EvpKDF: algo.EvpKDF
            PBKDF2: algo.PBKDF2

            RC4Drop: algo.RC4Drop
        }
        interface IBlockCipherImpl extends lib.BlockCipher
        {
            encryptBlock(M: number[], offset: number): void
            decryptBlock(M: number[], offset: number): void

            createEncryptor(key: lib.WordArray, cfg?: lib.CipherParamsData): IBlockCipherImpl
            createDecryptor(key: lib.WordArray, cfg?: lib.CipherParamsData): IBlockCipherImpl

            create(xformMode?: number, key?: lib.WordArray, cfg?: lib.IBlockCipherCfg): IBlockCipherImpl
        }
        interface AES extends IBlockCipherImpl { }
        interface DES extends IBlockCipherImpl { }
        interface TripleDES extends IBlockCipherImpl { }

        interface RabbitLegacy extends lib.StreamCipher { }
        interface Rabbit extends lib.StreamCipher { }
        interface RC4 extends lib.StreamCipher { }

        interface MD5 extends lib.Hasher { }
        interface RIPEMD160 extends lib.Hasher { }
        interface SHA1 extends lib.Hasher { }
        interface SHA256 extends lib.Hasher { }
        interface SHA224 extends lib.Hasher { }
        interface SHA384 extends lib.Hasher { }
        interface SHA512 extends lib.Hasher { }

        interface SHA3 extends lib.IHasher<ISHA3Cfg> { }
        interface ISHA3Cfg
        {
            outputLength?: number //default 512
        }
        interface HMAC extends lib.Base
        {
            init(hasher?: lib.Hasher, key?: string): void
            init(hasher?: lib.Hasher, key?: lib.WordArray): void
            create(hasher?: lib.Hasher, key?: string): HMAC
            create(hasher?: lib.Hasher, key?: lib.WordArray): HMAC

            update(messageUpdate: string): HMAC
            update(messageUpdate: lib.WordArray): HMAC

            finalize(messageUpdate?: string): lib.WordArray
            finalize(messageUpdate?: lib.WordArray): lib.WordArray
        }
        interface EvpKDF extends lib.Base
        {
            cfg: IEvpKDFCfg
            init(cfg?: IEvpKDFCfg): void
            create(cfg?: IEvpKDFCfg): EvpKDF
            compute(password: string, salt: string): lib.WordArray
            compute(password: string, salt: lib.WordArray): lib.WordArray
            compute(password: lib.WordArray, salt: string): lib.WordArray
            compute(password: lib.WordArray, salt: lib.WordArray): lib.WordArray
        }
        interface IEvpKDFCfg
        {
            keySize?: number //default 128/32
            hasher?: lib.Hasher //default MD5, or SHA1 with PBKDF2
            iterations?: number //default 1
        }
        interface IEvpKDFHelper
        {
            (password: string, salt: string, cfg?: IEvpKDFCfg): lib.WordArray
            (password: string, salt: lib.WordArray, cfg?: IEvpKDFCfg): lib.WordArray
            (password: lib.WordArray, salt: string, cfg?: IEvpKDFCfg): lib.WordArray
            (password: lib.WordArray, salt: lib.WordArray, cfg?: IEvpKDFCfg): lib.WordArray
        }
        interface PBKDF2 extends EvpKDF { } //PBKDF2 is same as EvpKDF

        interface RC4Drop extends RC4 { }
    }
    namespace mode
    {
        interface ModeStatic
        {
            CBC: mode.CBC
            CFB: mode.CFB
            CTR: mode.CTR
            CTRGladman: mode.CTRGladman
            ECB: mode.ECB
            OFB: mode.OFB
        }
        interface IBlockCipherEncryptor extends lib.BlockCipherMode
        {
            processBlock(words: number[], offset: number): void
        }
        interface IBlockCipherDecryptor extends lib.BlockCipherMode
        { //exactly as IBlockCipherEncryptor
            processBlock(words: number[], offset: number): void
        }
        interface IBlockCipherModeImpl extends lib.BlockCipherMode
        {
            Encryptor: IBlockCipherEncryptor
            Decryptor: IBlockCipherDecryptor
        }
        interface CBC extends IBlockCipherModeImpl { }
        interface CFB extends IBlockCipherModeImpl { }
        interface CTR extends IBlockCipherModeImpl { }
        interface CTRGladman extends IBlockCipherModeImpl { }
        interface ECB extends IBlockCipherModeImpl { }
        interface OFB extends IBlockCipherModeImpl { }
    }
    namespace pad
    {
        interface PadStatic
        {
            Pkcs7: pad.Pkcs7
            AnsiX923: pad.AnsiX923
            Iso10126: pad.Iso10126
            Iso97971: pad.Iso97971
            ZeroPadding: pad.ZeroPadding
            NoPadding: pad.NoPadding
        }
        interface IPaddingImpl
        {
            pad(data: lib.WordArray, blockSize: number): void
            unpad(data: lib.WordArray): void
        }
        interface Pkcs7 extends IPaddingImpl { }
        interface AnsiX923 extends IPaddingImpl { }
        interface Iso10126 extends IPaddingImpl { }
        interface Iso97971 extends IPaddingImpl { }
        interface ZeroPadding extends IPaddingImpl { }
        interface NoPadding extends IPaddingImpl { }
    }
    namespace x64
    {
        interface X64Static
        {
            Word: x64.Word
            WordArray: x64.WordArray
        }
        interface Word extends lib.Base
        {
            high: number
            low: number

            init(high?: number, low?: number): void
            create(high?: number, low?: number): Word
        }
        interface WordArray extends lib.Base
        {
            words: Word[]
            sigBytes: number

            init(words?: Word[], sigBytes?: number): void
            create(words?: Word[], sigBytes?: number): WordArray
            toX32(): lib.WordArray
            clone(): WordArray
        }
    }
    export interface CryptoJSStatic
    {
        lib: lib.LibStatic
        enc: enc.EncStatic
        kdf: kdf.KdfStatic
        format: format.FormatStatic
        algo: algo.AlgoStatic
        mode: mode.ModeStatic
        pad: pad.PadStatic
        x64: x64.X64Static

        AES: ZCryptoJSNamaspcace.lib.ICipherHelper<ZCryptoJSNamaspcace.lib.IBlockCipherCfg>
        DES: ZCryptoJSNamaspcace.lib.ICipherHelper<ZCryptoJSNamaspcace.lib.IBlockCipherCfg>
        TripleDES: ZCryptoJSNamaspcace.lib.ICipherHelper<ZCryptoJSNamaspcace.lib.IBlockCipherCfg>

        RabbitLegacy: ZCryptoJSNamaspcace.lib.CipherHelper
        Rabbit: ZCryptoJSNamaspcace.lib.CipherHelper
        RC4: ZCryptoJSNamaspcace.lib.CipherHelper
        RC4Drop: ZCryptoJSNamaspcace.lib.ICipherHelper<Object>

        MD5: ZCryptoJSNamaspcace.lib.HasherHelper
        HmacMD5: ZCryptoJSNamaspcace.lib.IHasherHmacHelper
        RIPEMD160: ZCryptoJSNamaspcace.lib.HasherHelper
        HmacRIPEMD160: ZCryptoJSNamaspcace.lib.IHasherHmacHelper
        SHA1: ZCryptoJSNamaspcace.lib.HasherHelper
        HmacSHA1: ZCryptoJSNamaspcace.lib.IHasherHmacHelper
        SHA256: ZCryptoJSNamaspcace.lib.HasherHelper
        HmacSHA256: ZCryptoJSNamaspcace.lib.IHasherHmacHelper
        SHA224: ZCryptoJSNamaspcace.lib.HasherHelper
        HmacSHA224: ZCryptoJSNamaspcace.lib.IHasherHmacHelper
        SHA512: ZCryptoJSNamaspcace.lib.HasherHelper
        HmacSHA512: ZCryptoJSNamaspcace.lib.IHasherHmacHelper
        SHA384: ZCryptoJSNamaspcace.lib.HasherHelper
        HmacSHA384: ZCryptoJSNamaspcace.lib.IHasherHmacHelper

        SHA3: ZCryptoJSNamaspcace.lib.IHasherHelper<ZCryptoJSNamaspcace.algo.ISHA3Cfg>
        HmacSHA3: ZCryptoJSNamaspcace.lib.IHasherHmacHelper

        EvpKDF: ZCryptoJSNamaspcace.algo.IEvpKDFHelper
        PBKDF2: ZCryptoJSNamaspcace.algo.IEvpKDFHelper //PBKDF2 is same as EvpKDF
    }
}

declare let ZCryptoJS: ZCryptoJSNamaspcace.CryptoJSStatic;