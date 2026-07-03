import * as fs from 'fs';
import { EnumMetadata, EnumMember } from '../models/ComponentMetadata';

const INTERNAL_MEMBERS = new Set(['Undefined', 'Vazio']);

/**
 * Extracts enum definitions from the generated TypeScript domain files
 * (e.g. Snebur.TS/src/Snebur.TS/src/Dominio/Snebur.Dominio.Enums.ts).
 * These are the enums referenced as attribute types in AtributosHtml.
 */
export class EnumExtractor {
  extractFromFiles(filePaths: string[]): Map<string, EnumMetadata> {
    const result = new Map<string, EnumMetadata>();

    for (const filePath of filePaths) {
      if (!fs.existsSync(filePath)) {
        console.warn(`[EnumExtractor] File not found: ${filePath}`);
        continue;
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      const enumPattern = /export enum ([A-Za-z0-9_]+)\s*\{([^}]*)\}/g;

      let match: RegExpExecArray | null;
      while ((match = enumPattern.exec(content)) !== null) {
        const name = match[1];
        if (result.has(name)) continue;

        const body = match[2]
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\/\/[^\n]*/g, '');

        const members: EnumMember[] = [];
        const memberPattern = /([A-Za-z0-9_]+)\s*=\s*(-?\d+|"[^"]*")/g;
        let m: RegExpExecArray | null;
        while ((m = memberPattern.exec(body)) !== null) {
          members.push({
            name: m[1],
            value: m[2].replace(/"/g, ''),
            internal: INTERNAL_MEMBERS.has(m[1]) || undefined,
          });
        }

        if (members.length > 0) {
          result.set(name, { name, members, usedByAttributes: [] });
        }
      }
    }

    console.log(`[EnumExtractor] Extracted ${result.size} enums`);
    return result;
  }
}
