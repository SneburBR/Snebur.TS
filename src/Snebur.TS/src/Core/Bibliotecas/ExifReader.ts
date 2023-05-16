//https://github.com/devongovett/exif-reader
/*
MIT License

Copyright (c) 2015 Devon Govett and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
namespace Exif
{
    class ExifTags
    {
        public readonly exif = {
            0x0001: "InteropIndex",
            0x0002: "InteropVersion",
            0x000B: "ProcessingSoftware",
            0x00FE: "SubfileType",
            0x00FF: "OldSubfileType",
            0x0100: "ImageWidth",
            0x0101: "ImageHeight",
            0x0102: "BitsPerSample",
            0x0103: "Compression",
            0x0106: "PhotometricInterpretation",
            0x0107: "Thresholding",
            0x0108: "CellWidth",
            0x0109: "CellLength",
            0x010A: "FillOrder",
            0x010D: "DocumentName",
            0x010E: "ImageDescription",
            0x010F: "Make",
            0x0110: "Model",
            0x0111: "StripOffsets",
            0x0112: "Orientation",
            0x0115: "SamplesPerPixel",
            0x0116: "RowsPerStrip",
            0x0117: "StripByteCounts",
            0x0118: "MinSampleValue",
            0x0119: "MaxSampleValue",
            0x011A: "XResolution",
            0x011B: "YResolution",
            0x011C: "PlanarConfiguration",
            0x011D: "PageName",
            0x011E: "XPosition",
            0x011F: "YPosition",
            0x0120: "FreeOffsets",
            0x0121: "FreeByteCounts",
            0x0122: "GrayResponseUnit",
            0x0123: "GrayResponseCurve",
            0x0124: "T4Options",
            0x0125: "T6Options",
            0x0128: "ResolutionUnit",
            0x0129: "PageNumber",
            0x012C: "ColorResponseUnit",
            0x012D: "TransferFunction",
            0x0131: "Software",
            0x0132: "ModifyDate",
            0x013B: "Artist",
            0x013C: "HostComputer",
            0x013D: "Predictor",
            0x013E: "WhitePoint",
            0x013F: "PrimaryChromaticities",
            0x0140: "ColorMap",
            0x0141: "HalftoneHints",
            0x0142: "TileWidth",
            0x0143: "TileLength",
            0x0144: "TileOffsets",
            0x0145: "TileByteCounts",
            0x0146: "BadFaxLines",
            0x0147: "CleanFaxData",
            0x0148: "ConsecutiveBadFaxLines",
            0x014A: "SubIFD",
            0x014C: "InkSet",
            0x014D: "InkNames",
            0x014E: "NumberofInks",
            0x0150: "DotRange",
            0x0151: "TargetPrinter",
            0x0152: "ExtraSamples",
            0x0153: "SampleFormat",
            0x0154: "SMinSampleValue",
            0x0155: "SMaxSampleValue",
            0x0156: "TransferRange",
            0x0157: "ClipPath",
            0x0158: "XClipPathUnits",
            0x0159: "YClipPathUnits",
            0x015A: "Indexed",
            0x015B: "JPEGTables",
            0x015F: "OPIProxy",
            0x0190: "GlobalParametersIFD",
            0x0191: "ProfileType",
            0x0192: "FaxProfile",
            0x0193: "CodingMethods",
            0x0194: "VersionYear",
            0x0195: "ModeNumber",
            0x01B1: "Decode",
            0x01B2: "DefaultImageColor",
            0x01B3: "T82Options",
            0x01B5: "JPEGTables",
            0x0200: "JPEGProc",
            0x0201: "ThumbnailOffset",
            0x0202: "ThumbnailLength",
            0x0203: "JPEGRestartInterval",
            0x0205: "JPEGLosslessPredictors",
            0x0206: "JPEGPointTransforms",
            0x0207: "JPEGQTables",
            0x0208: "JPEGDCTables",
            0x0209: "JPEGACTables",
            0x0211: "YCbCrCoefficients",
            0x0212: "YCbCrSubSampling",
            0x0213: "YCbCrPositioning",
            0x0214: "ReferenceBlackWhite",
            0x022F: "StripRowCounts",
            0x02BC: "ApplicationNotes",
            0x03E7: "USPTOMiscellaneous",
            0x1000: "RelatedImageFileFormat",
            0x1001: "RelatedImageWidth",
            0x1002: "RelatedImageHeight",
            0x4746: "Rating",
            0x4747: "XP_DIP_XML",
            0x4748: "StitchInfo",
            0x4749: "RatingPercent",
            0x800D: "ImageID",
            0x80A3: "WangTag1",
            0x80A4: "WangAnnotation",
            0x80A5: "WangTag3",
            0x80A6: "WangTag4",
            0x80E3: "Matteing",
            0x80E4: "DataType",
            0x80E5: "ImageDepth",
            0x80E6: "TileDepth",
            0x827D: "Model2",
            0x828D: "CFARepeatPatternDim",
            0x828E: "CFAPattern2",
            0x828F: "BatteryLevel",
            0x8290: "KodakIFD",
            0x8298: "Copyright",
            0x829A: "ExposureTime",
            0x829D: "FNumber",
            0x82A5: "MDFileTag",
            0x82A6: "MDScalePixel",
            0x82A7: "MDColorTable",
            0x82A8: "MDLabName",
            0x82A9: "MDSampleInfo",
            0x82AA: "MDPrepDate",
            0x82AB: "MDPrepTime",
            0x82AC: "MDFileUnits",
            0x830E: "PixelScale",
            0x8335: "AdventScale",
            0x8336: "AdventRevision",
            0x835C: "UIC1Tag",
            0x835D: "UIC2Tag",
            0x835E: "UIC3Tag",
            0x835F: "UIC4Tag",
            0x83BB: "IPTC-NAA",
            0x847E: "IntergraphPacketData",
            0x847F: "IntergraphFlagRegisters",
            0x8480: "IntergraphMatrix",
            0x8481: "INGRReserved",
            0x8482: "ModelTiePoint",
            0x84E0: "Site",
            0x84E1: "ColorSequence",
            0x84E2: "IT8Header",
            0x84E3: "RasterPadding",
            0x84E4: "BitsPerRunLength",
            0x84E5: "BitsPerExtendedRunLength",
            0x84E6: "ColorTable",
            0x84E7: "ImageColorIndicator",
            0x84E8: "BackgroundColorIndicator",
            0x84E9: "ImageColorValue",
            0x84EA: "BackgroundColorValue",
            0x84EB: "PixelIntensityRange",
            0x84EC: "TransparencyIndicator",
            0x84ED: "ColorCharacterization",
            0x84EE: "HCUsage",
            0x84EF: "TrapIndicator",
            0x84F0: "CMYKEquivalent",
            0x8546: "SEMInfo",
            0x8568: "AFCP_IPTC",
            0x85B8: "PixelMagicJBIGOptions",
            0x85D8: "ModelTransform",
            0x8602: "WB_GRGBLevels",
            0x8606: "LeafData",
            0x8649: "PhotoshopSettings",
            0x8769: "ExifOffset",
            0x8773: "ICC_Profile",
            0x877F: "TIFF_FXExtensions",
            0x8780: "MultiProfiles",
            0x8781: "SharedData",
            0x8782: "T88Options",
            0x87AC: "ImageLayer",
            0x87AF: "GeoTiffDirectory",
            0x87B0: "GeoTiffDoubleParams",
            0x87B1: "GeoTiffAsciiParams",
            0x8822: "ExposureProgram",
            0x8824: "SpectralSensitivity",
            0x8825: "GPSInfo",
            0x8827: "ISO",
            0x8828: "Opto-ElectricConvFactor",
            0x8829: "Interlace",
            0x882A: "TimeZoneOffset",
            0x882B: "SelfTimerMode",
            0x8830: "SensitivityType",
            0x8831: "StandardOutputSensitivity",
            0x8832: "RecommendedExposureIndex",
            0x8833: "ISOSpeed",
            0x8834: "ISOSpeedLatitudeyyy",
            0x8835: "ISOSpeedLatitudezzz",
            0x885C: "FaxRecvParams",
            0x885D: "FaxSubAddress",
            0x885E: "FaxRecvTime",
            0x888A: "LeafSubIFD",
            0x9000: "ExifVersion",
            0x9003: "DateTimeOriginal",
            0x9004: "DateTimeDigitized",
            0x9101: "ComponentsConfiguration",
            0x9102: "CompressedBitsPerPixel",
            0x9201: "ShutterSpeedValue",
            0x9202: "ApertureValue",
            0x9203: "BrightnessValue",
            0x9204: "ExposureBiasValue",
            0x9205: "MaxApertureValue",
            0x9206: "SubjectDistance",
            0x9207: "MeteringMode",
            0x9208: "LightSource",
            0x9209: "Flash",
            0x920A: "FocalLength",
            0x920B: "FlashEnergy",
            0x920C: "SpatialFrequencyResponse",
            0x920D: "Noise",
            0x920E: "FocalPlaneXResolution",
            0x920F: "FocalPlaneYResolution",
            0x9210: "FocalPlaneResolutionUnit",
            0x9211: "ImageNumber",
            0x9212: "SecurityClassification",
            0x9213: "ImageHistory",
            0x9214: "SubjectArea",
            0x9215: "ExposureIndex",
            0x9216: "TIFF-EPStandardID",
            0x9217: "SensingMethod",
            0x923A: "CIP3DataFile",
            0x923B: "CIP3Sheet",
            0x923C: "CIP3Side",
            0x923F: "StoNits",
            0x927C: "MakerNote",
            0x9286: "UserComment",
            0x9290: "SubSecTime",
            0x9291: "SubSecTimeOriginal",
            0x9292: "SubSecTimeDigitized",
            0x932F: "MSDocumentText",
            0x9330: "MSPropertySetStorage",
            0x9331: "MSDocumentTextPosition",
            0x935C: "ImageSourceData",
            0x9C9B: "XPTitle",
            0x9C9C: "XPComment",
            0x9C9D: "XPAuthor",
            0x9C9E: "XPKeywords",
            0x9C9F: "XPSubject",
            0xA000: "FlashpixVersion",
            0xA001: "ColorSpace",
            0xA002: "PixelXDimension",
            0xA003: "PixelYDimension",
            0xA004: "RelatedSoundFile",
            0xA005: "InteropOffset",
            0xA20B: "FlashEnergy",
            0xA20C: "SpatialFrequencyResponse",
            0xA20D: "Noise",
            0xA20E: "FocalPlaneXResolution",
            0xA20F: "FocalPlaneYResolution",
            0xA210: "FocalPlaneResolutionUnit",
            0xA211: "ImageNumber",
            0xA212: "SecurityClassification",
            0xA213: "ImageHistory",
            0xA214: "SubjectLocation",
            0xA215: "ExposureIndex",
            0xA216: "TIFF-EPStandardID",
            0xA217: "SensingMethod",
            0xA300: "FileSource",
            0xA301: "SceneType",
            0xA302: "CFAPattern",
            0xA401: "CustomRendered",
            0xA402: "ExposureMode",
            0xA403: "WhiteBalance",
            0xA404: "DigitalZoomRatio",
            0xA405: "FocalLengthIn35mmFormat",
            0xA406: "SceneCaptureType",
            0xA407: "GainControl",
            0xA408: "Contrast",
            0xA409: "Saturation",
            0xA40A: "Sharpness",
            0xA40B: "DeviceSettingDescription",
            0xA40C: "SubjectDistanceRange",
            0xA420: "ImageUniqueID",
            0xA430: "CameraOwnerName",
            0xA431: "BodySerialNumber",
            0xA432: "LensSpecification",
            0xA433: "LensMake",
            0xA434: "LensModel",
            0xA435: "LensSerialNumber",
            0xA480: "GDALMetadata",
            0xA481: "GDALNoData",
            0xA500: "Gamma",
            0xAFC0: "ExpandSoftware",
            0xAFC1: "ExpandLens",
            0xAFC2: "ExpandFilm",
            0xAFC3: "ExpandFilterLens",
            0xAFC4: "ExpandScanner",
            0xAFC5: "ExpandFlashLamp",
            0xBC01: "PixelFormat",
            0xBC02: "Transformation",
            0xBC03: "Uncompressed",
            0xBC04: "ImageType",
            0xBC80: "ImageWidth",
            0xBC81: "ImageHeight",
            0xBC82: "WidthResolution",
            0xBC83: "HeightResolution",
            0xBCC0: "ImageOffset",
            0xBCC1: "ImageByteCount",
            0xBCC2: "AlphaOffset",
            0xBCC3: "AlphaByteCount",
            0xBCC4: "ImageDataDiscard",
            0xBCC5: "AlphaDataDiscard",
            0xC427: "OceScanjobDesc",
            0xC428: "OceApplicationSelector",
            0xC429: "OceIDNumber",
            0xC42A: "OceImageLogic",
            0xC44F: "Annotations",
            0xC4A5: "PrintIM",
            0xC580: "USPTOOriginalContentType",
            0xC612: "DNGVersion",
            0xC613: "DNGBackwardVersion",
            0xC614: "UniqueCameraModel",
            0xC615: "LocalizedCameraModel",
            0xC616: "CFAPlaneColor",
            0xC617: "CFALayout",
            0xC618: "LinearizationTable",
            0xC619: "BlackLevelRepeatDim",
            0xC61A: "BlackLevel",
            0xC61B: "BlackLevelDeltaH",
            0xC61C: "BlackLevelDeltaV",
            0xC61D: "WhiteLevel",
            0xC61E: "DefaultScale",
            0xC61F: "DefaultCropOrigin",
            0xC620: "DefaultCropSize",
            0xC621: "ColorMatrix1",
            0xC622: "ColorMatrix2",
            0xC623: "CameraCalibration1",
            0xC624: "CameraCalibration2",
            0xC625: "ReductionMatrix1",
            0xC626: "ReductionMatrix2",
            0xC627: "AnalogBalance",
            0xC628: "AsShotNeutral",
            0xC629: "AsShotWhiteXY",
            0xC62A: "BaselineExposure",
            0xC62B: "BaselineNoise",
            0xC62C: "BaselineSharpness",
            0xC62D: "BayerGreenSplit",
            0xC62E: "LinearResponseLimit",
            0xC62F: "CameraSerialNumber",
            0xC630: "DNGLensInfo",
            0xC631: "ChromaBlurRadius",
            0xC632: "AntiAliasStrength",
            0xC633: "ShadowScale",
            0xC634: "DNGPrivateData",
            0xC635: "MakerNoteSafety",
            0xC640: "RawImageSegmentation",
            0xC65A: "CalibrationIlluminant1",
            0xC65B: "CalibrationIlluminant2",
            0xC65C: "BestQualityScale",
            0xC65D: "RawDataUniqueID",
            0xC660: "AliasLayerMetadata",
            0xC68B: "OriginalRawFileName",
            0xC68C: "OriginalRawFileData",
            0xC68D: "ActiveArea",
            0xC68E: "MaskedAreas",
            0xC68F: "AsShotICCProfile",
            0xC690: "AsShotPreProfileMatrix",
            0xC691: "CurrentICCProfile",
            0xC692: "CurrentPreProfileMatrix",
            0xC6BF: "ColorimetricReference",
            0xC6D2: "PanasonicTitle",
            0xC6D3: "PanasonicTitle2",
            0xC6F3: "CameraCalibrationSig",
            0xC6F4: "ProfileCalibrationSig",
            0xC6F5: "ProfileIFD",
            0xC6F6: "AsShotProfileName",
            0xC6F7: "NoiseReductionApplied",
            0xC6F8: "ProfileName",
            0xC6F9: "ProfileHueSatMapDims",
            0xC6FA: "ProfileHueSatMapData1",
            0xC6FB: "ProfileHueSatMapData2",
            0xC6FC: "ProfileToneCurve",
            0xC6FD: "ProfileEmbedPolicy",
            0xC6FE: "ProfileCopyright",
            0xC714: "ForwardMatrix1",
            0xC715: "ForwardMatrix2",
            0xC716: "PreviewApplicationName",
            0xC717: "PreviewApplicationVersion",
            0xC718: "PreviewSettingsName",
            0xC719: "PreviewSettingsDigest",
            0xC71A: "PreviewColorSpace",
            0xC71B: "PreviewDateTime",
            0xC71C: "RawImageDigest",
            0xC71D: "OriginalRawFileDigest",
            0xC71E: "SubTileBlockSize",
            0xC71F: "RowInterleaveFactor",
            0xC725: "ProfileLookTableDims",
            0xC726: "ProfileLookTableData",
            0xC740: "OpcodeList1",
            0xC741: "OpcodeList2",
            0xC74E: "OpcodeList3",
            0xC761: "NoiseProfile",
            0xC763: "TimeCodes",
            0xC764: "FrameRate",
            0xC772: "TStop",
            0xC789: "ReelName",
            0xC791: "OriginalDefaultFinalSize",
            0xC792: "OriginalBestQualitySize",
            0xC793: "OriginalDefaultCropSize",
            0xC7A1: "CameraLabel",
            0xC7A3: "ProfileHueSatMapEncoding",
            0xC7A4: "ProfileLookTableEncoding",
            0xC7A5: "BaselineExposureOffset",
            0xC7A6: "DefaultBlackRender",
            0xC7A7: "NewRawImageDigest",
            0xC7A8: "RawToPreviewGain",
            0xC7B5: "DefaultUserCrop",
            0xEA1C: "Padding",
            0xEA1D: "OffsetSchema",
            0xFDE8: "OwnerName",
            0xFDE9: "SerialNumber",
            0xFDEA: "Lens",
            0xFE00: "KDC_IFD",
            0xFE4C: "RawFile",
            0xFE4D: "Converter",
            0xFE4E: "WhiteBalance",
            0xFE51: "Exposure",
            0xFE52: "Shadows",
            0xFE53: "Brightness",
            0xFE54: "Contrast",
            0xFE55: "Saturation",
            0xFE56: "Sharpness",
            0xFE57: "Smoothness",
            0xFE58: "MoireFilter"
        };

        public readonly gps = {
            0x0000: "GPSVersionID",
            0x0001: "GPSLatitudeRef",
            0x0002: "GPSLatitude",
            0x0003: "GPSLongitudeRef",
            0x0004: "GPSLongitude",
            0x0005: "GPSAltitudeRef",
            0x0006: "GPSAltitude",
            0x0007: "GPSTimeStamp",
            0x0008: "GPSSatellites",
            0x0009: "GPSStatus",
            0x000A: "GPSMeasureMode",
            0x000B: "GPSDOP",
            0x000C: "GPSSpeedRef",
            0x000D: "GPSSpeed",
            0x000E: "GPSTrackRef",
            0x000F: "GPSTrack",
            0x0010: "GPSImgDirectionRef",
            0x0011: "GPSImgDirection",
            0x0012: "GPSMapDatum",
            0x0013: "GPSDestLatitudeRef",
            0x0014: "GPSDestLatitude",
            0x0015: "GPSDestLongitudeRef",
            0x0016: "GPSDestLongitude",
            0x0017: "GPSDestBearingRef",
            0x0018: "GPSDestBearing",
            0x0019: "GPSDestDistanceRef",
            0x001A: "GPSDestDistance",
            0x001B: "GPSProcessingMethod",
            0x001C: "GPSAreaInformation",
            0x001D: "GPSDateStamp",
            0x001E: "GPSDifferential",
            0x001F: "GPSHPositioningError"
        };

        private constructor()
        {

        }

        private static _instance: ExifTags;

        public static get Instance()
        {
            if (this._instance == null)
            {
                this._instance = new ExifTags();
            }
            return this._instance;
        }
    }

    export class ExifReader
    {
        private readonly tags = ExifTags.Instance;
        private readonly SIZE_LOOKUP = [1, 1, 2, 4, 8, 1, 1, 2, 4, 8];

        private readonly DATE_KEYS = {
            DateTimeOriginal: true,
            DateTimeDigitized: true,
            ModifyDate: true
        };

        public readonly result: ExifReaderResult;

        public constructor(buffer: Buffer)
        {
            let startingOffset = 0;

            const inicio3char = buffer.toString("ascii", 0, 3);

            if (inicio3char !== "MM\0" && inicio3char !== "II\0")
            {
                startingOffset = 6;
                const inicio5char = buffer.toString("ascii", 0, 5);
                if (inicio5char !== "Exif\0")
                {
                    throw new Error(`Invalid EXIF data: buffer should start with "Exif", "MM" or "II".`);
                }
            }

            let bigEndian: boolean = null;
            if (buffer[startingOffset] === 0x49 && buffer[startingOffset + 1] === 0x49)
            {
                bigEndian = false;
            }
            else if (buffer[startingOffset] === 0x4d && buffer[startingOffset + 1] === 0x4d)
            {
                bigEndian = true;
            }
            else
            {
                throw new Error("Invalid EXIF data: expected byte order marker.");
            }

            if (buffer.length < startingOffset + 4 || this.readUInt16(buffer, startingOffset + 2, bigEndian) !== 0x002A)
            {
                throw new Error("Invalid EXIF data: expected 0x002A.");
            }

            if (buffer.length <= startingOffset + 8)
            {
                throw new Error("Invalid EXIF data: Ends before ifdOffset");
            }

            let ifdOffset = this.readUInt32(buffer, startingOffset + 4, bigEndian) + startingOffset;
            if (ifdOffset < 8)
            {
                throw new Error("Invalid EXIF data: ifdOffset < 8");
            }

            const result: ExifReaderResult = {
                bigEndian
            };

            const ifd0 = this.readTags(buffer, ifdOffset, bigEndian, this.tags.exif, startingOffset);
            result.image = ifd0;

            if (buffer.length >= ifdOffset + 2)
            {
                const numEntries = this.readUInt16(buffer, ifdOffset, bigEndian);
                if (buffer.length >= ifdOffset + 2 + numEntries * 12 + 4)
                {
                    ifdOffset = this.readUInt32(buffer, ifdOffset + 2 + numEntries * 12, bigEndian);
                    if (ifdOffset !== 0)
                    {
                        result.thumbnail = this.readTags(buffer, ifdOffset + startingOffset, bigEndian, this.tags.exif, startingOffset);
                    }
                }
            }

            if (ifd0)
            {
                if (this.isPositiveInteger(ifd0.ExifOffset))
                {
                    result.exif = this.readTags(buffer, ifd0.ExifOffset + startingOffset, bigEndian, this.tags.exif, startingOffset);
                }

                if (this.isPositiveInteger(ifd0.GPSInfo))
                {
                    result.gps = this.readTags(buffer, ifd0.GPSInfo + startingOffset, bigEndian, this.tags.gps, startingOffset);
                }

                if (this.isPositiveInteger(ifd0.InteropOffset))
                {
                    result.interop = this.readTags(buffer, ifd0.InteropOffset + startingOffset, bigEndian, this.tags.exif, startingOffset);
                }
            }
            this.result = result;
        }

        private readTags(buffer: Buffer, offset: number, bigEndian: boolean, tags: any, startingOffset: number): any
        {
            if (buffer.length < offset + 2)
            {
                return null;
            }
            const numEntries = this.readUInt16(buffer, offset, bigEndian);
            offset += 2;

            const res: any = {};
            let tag: number;

            for (let i = 0; i < numEntries; i++)
            {
                if (buffer.length >= offset + 2)
                {
                    tag = this.readUInt16(buffer, offset, bigEndian);
                }
                else
                {
                    return null;
                }
                offset += 2;

                const key = tags[tag] || tag;
                let val: any = this.readTag(buffer, offset, bigEndian, startingOffset);

                if (key in this.DATE_KEYS)
                {
                    val = this.parseDate(val);
                }
                res[key] = val;
                offset += 10;
            }

            return res;
        }

        private readTag(buffer: Buffer, offset: number, bigEndian: boolean, startingOffset: number)
        {
            if (buffer.length < offset + 7)
            {
                return null;
            }

            const type = this.readUInt16(buffer, offset, bigEndian);

            // Exit early in case of unknown or bogus type
            if (!type || type > this.SIZE_LOOKUP.length) return null;

            const numValues = this.readUInt32(buffer, offset + 2, bigEndian);
            const valueSize = this.SIZE_LOOKUP[type - 1];
            let valueOffset;
            if (valueSize * numValues <= 4)
            {
                valueOffset = offset + 6;
            }
            else
            {
                if (buffer.length >= offset + 10)
                {
                    valueOffset = this.readUInt32(buffer, offset + 6, bigEndian) + startingOffset;
                } else
                {
                    return null;
                }
            }

            // Special case for ascii strings
            if (type === 2)
            {
                const asciiSlice = buffer.slice(valueOffset, valueOffset + numValues);
                if (asciiSlice.some(x => x >> 7 > 0))
                {
                    return asciiSlice;
                }

                let string = asciiSlice.toString("ascii");
                if (string[string.length - 1] === "\0")
                {
                    // remove null terminator{}
                    string = string.slice(0, -1);
                }
                return string;
            }

            // Special case for buffers
            if (type === 7)
            {
                return buffer.slice(valueOffset, valueOffset + numValues);
            }

            if (numValues === 1)
            {
                return this.readValue(buffer, valueOffset, bigEndian, type);
            }


            const res = [];
            for (let i = 0; i < numValues && valueOffset < buffer.length; i++)
            {
                res.push(this.readValue(buffer, valueOffset, bigEndian, type));
                valueOffset += valueSize;
            }
            return res;
        }

        private readValue(buffer: Buffer, offset: number, bigEndian: boolean, type: number)
        {
            switch (type)
            {
                case 1: // uint8
                    if (buffer.length < offset + 1)
                    {
                        return null;
                    }
                    return buffer[offset];

                case 3: // uint16
                    if (buffer.length < offset + 2)
                    {
                        return null;
                    }
                    return this.readUInt16(buffer, offset, bigEndian);

                case 4: // uint32
                    if (buffer.length < offset + 4)
                    {
                        return null;
                    }
                    return this.readUInt32(buffer, offset, bigEndian);

                case 5: // unsigned rational
                    if (buffer.length < offset + 8)
                    {
                        return null;
                    }
                    return this.readUInt32(buffer, offset, bigEndian) / this.readUInt32(buffer, offset + 4, bigEndian);

                case 6: // int8
                    if (buffer.length < offset + 1)
                    {
                        return null;
                    }
                    return buffer.readInt8(offset);

                case 8: // int16
                    if (buffer.length < offset + 2)
                    {
                        return null;
                    }
                    return this.readInt16(buffer, offset, bigEndian);

                case 9: // int32
                    if (buffer.length < offset + 4)
                    {
                        return null;
                    }
                    return this.readInt32(buffer, offset, bigEndian);

                case 10: // signed rational
                    if (buffer.length < offset + 8)
                    {
                        return null;
                    }
                    return this.readInt32(buffer, offset, bigEndian) / this.readInt32(buffer, offset + 4, bigEndian);
            }
            return null;
        }

        private parseDate(string: string)
        {
            if (typeof string !== "string")
                return null;

            const match = string.match(/^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
            if (!match)
            {
                return null;
            }

            return new Date(Date.UTC(
                parseInt(match[1]),
                parseInt(match[2]) - 1,
                parseInt(match[3]),
                parseInt(match[4]),
                parseInt(match[5]),
                parseInt(match[6]),
                0
            ));
        }

        private isPositiveInteger(value: number)
        {
            return typeof value === "number" && Math.floor(value) === value && value > 0;
        }

        // Buffer reading helpers to help switching between endianness
        private readUInt16(buffer: Buffer, offset: number, bigEndian: boolean)
        {
            if (bigEndian)
            {
                return buffer.readUInt16BE(offset);
            }
            return buffer.readUInt16LE(offset);
        }

        private readUInt32(buffer: Buffer, offset: number, bigEndian: boolean)
        {
            if (bigEndian)
            {
                return buffer.readUInt32BE(offset);
            }
            return buffer.readUInt32LE(offset);
        }

        private readInt16(buffer: Buffer, offset: number, bigEndian: boolean)
        {
            if (bigEndian)
            {
                return buffer.readInt16BE(offset);
            }
            return buffer.readInt16LE(offset);
        }

        private readInt32(buffer: Buffer, offset: number, bigEndian: boolean)
        {
            if (bigEndian)
            {
                return buffer.readInt32BE(offset);
            }
            return buffer.readInt32LE(offset);
        }
    }

    export interface ExifReaderResult
    {
        bigEndian: boolean;
        image?: any;
        thumbnail?: any;
        exif?: any
        gps?: any
        interop?: any
    }
}
