﻿// Type definitions for ua-parser-js v0.7.10
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Viktor Miroshnikov <https://github.com/superduper>, Lucas Woo <https://github.com/legendecas>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace IUAParser
{
    export interface IBrowser
    {
        /**
         * Possible values :
         * Amaya, Android Browser, Arora, Avant, Baidu, Blazer, Bolt, Camino, Chimera, Chrome,
         * Chromium, Comodo Dragon, Conkeror, Dillo, Dolphin, Doris, Edge, Epiphany, Fennec,
         * Firebird, Firefox, Flock, GoBrowser, iCab, ICE Browser, IceApe, IceCat, IceDragon,
         * Iceweasel, IE [Mobile], Iron, Jasmine, K-Meleon, Konqueror, Kindle, Links,
         * Lunascape, Lynx, Maemo, Maxthon, Midori, Minimo, MIUI Browser, [Mobile] Safari,
         * Mosaic, Mozilla, Netfront, Netscape, NetSurf, Nokia, OmniWeb, Opera [Mini/Mobi/Tablet],
         * Phoenix, Polaris, QQBrowser, RockMelt, Silk, Skyfire, SeaMonkey, SlimBrowser, Swiftfox,
         * Tizen, UCBrowser, Vivaldi, w3m, Yandex
         *
         */
        name: string;

        /**
         * Determined dynamically
         */
        version: string;

        /**
         * Determined dynamically
         * @deprecated
         */
        major: string;
    }
    export interface IDevice
    {
        /**
         * Determined dynamically
         */
        model: string;

        /**
         * Possible type:
         * console, mobile, tablet, smarttv, wearable, embedded
         */
        type: string;

        /**
         * Possible vendor:
         * Acer, Alcatel, Amazon, Apple, Archos, Asus, BenQ, BlackBerry, Dell, GeeksPhone,
         * Google, HP, HTC, Huawei, Jolla, Lenovo, LG, Meizu, Microsoft, Motorola, Nexian,
         * Nintendo, Nokia, Nvidia, Ouya, Palm, Panasonic, Polytron, RIM, Samsung, Sharp,
         * Siemens, Sony-Ericsson, Sprint, Xbox, ZTE
         */
        vendor: string;
    }
    export interface IEngine
    {
        /**
         * Possible name:
         * Amaya, EdgeHTML, Gecko, iCab, KHTML, Links, Lynx, NetFront, NetSurf, Presto,
         * Tasman, Trident, w3m, WebKit
         */
        name: string;
        /**
         * Determined dynamically
         */
        version: string;
    }
    export interface IOS
    {
        /**
         * Possible 'os.name'
         * AIX, Amiga OS, Android, Arch, Bada, BeOS, BlackBerry, CentOS, Chromium OS, Contiki,
         * Fedora, Firefox OS, FreeBSD, Debian, DragonFly, Gentoo, GNU, Haiku, Hurd, iOS,
         * Joli, Linpus, Linux, Mac OS, Mageia, Mandriva, MeeGo, Minix, Mint, Morph OS, NetBSD,
         * Nintendo, OpenBSD, OpenVMS, OS/2, Palm, PCLinuxOS, Plan9, Playstation, QNX, RedHat,
         * RIM Tablet OS, RISC OS, Sailfish, Series40, Slackware, Solaris, SUSE, Symbian, Tizen,
         * Ubuntu, UNIX, VectorLinux, WebOS, Windows [Phone/Mobile], Zenwalk
         */
        name: string;
        /**
         * Determined dynamically
         */
        version: string;
    }
    export interface ICPU
    {
        /**
         * Possible architecture:
         *  68k, amd64, arm, arm64, avr, ia32, ia64, irix, irix64, mips, mips64, pa-risc,
         *  ppc, sparc, sparc64
         */
        architecture: string;
    }
    export interface IResult
    {
        ua: string;
        browser: IBrowser;
        device: IDevice;
        engine: IEngine;
        os: IOS;
        cpu: ICPU;
    }
    export interface BROWSER
    {
        NAME: string;
        /**
         * @deprecated
         */
        MAJOR: string;
        VERSION: string;
    }
    export interface CPU
    {
        ARCHITECTURE: string;
    }
    export interface DEVICE
    {
        MODEL: string;
        VENDOR: string;
        TYPE: string;
        CONSOLE: string;
        MOBILE: string;
        SMARTTV: string;
        TABLET: string;
        WEARABLE: string;
        EMBEDDED: string;
    }
    export interface ENGINE
    {
        NAME: string;
        VERSION: string;
    }
    export interface OS
    {
        NAME: string;
        VERSION: string;
    }
}
interface UAParser
{
    VERSION: string;
    BROWSER: IUAParser.BROWSER;
    CPU: IUAParser.CPU;
    DEVICE: IUAParser.DEVICE;
    ENGINE: IUAParser.ENGINE;
    OS: IUAParser.OS;

    /**
     *  Returns browser information
     */
    getBrowser(): IUAParser.IBrowser;

    /**
     *  Returns OS information
     */
    getOS(): IUAParser.IOS;

    /**
     *  Returns browsers engine information
     */
    getEngine(): IUAParser.IEngine;

    /**
     *  Returns device information
     */
    getDevice(): IUAParser.IDevice;

    /**
     *  Returns parsed CPU information
     */
    getCPU(): IUAParser.ICPU;

    /**
     *  Returns UA string of current instance
     */
    getUA(): string;

    /**
     *  Set & parse UA string
     */
    setUA(uastring: string): UAParser;

    /**
     *  Returns parse result
     */
    getResult(): IUAParser.IResult;
}
interface UAParserConstructor
{
    (): UAParser;
    new (): UAParser;
    prototype: UAParser;
}
declare let UAParser: UAParserConstructor;
