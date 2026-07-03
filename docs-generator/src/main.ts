import * as path from 'path';
import * as fs from 'fs';
import { MetadataBuilder, BuilderConfig } from './extractors/MetadataBuilder';
import { DocumentWriter } from './generators/DocumentWriter';

async function main() {
  try {
    const args = process.argv.slice(2);
    let sneburPath = '../'; // Snebur.TS repo root, relative to docs-generator
    let sigiPath = '../../../Zyoncore/Sigi'; // Sigi repo root
    let outputPath = '../docs';
    let metadataOnly = false;
    let includeUsage = true;

    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--snebur-path') sneburPath = args[++i];
      if (args[i] === '--sigi-path') sigiPath = args[++i];
      if (args[i] === '--output') outputPath = args[++i];
      if (args[i] === '--metadata-only') metadataOnly = true;
      if (args[i] === '--no-usage') includeUsage = false;
    }

    const generatorRoot = path.resolve(__dirname, '..');
    const sneburRoot = path.resolve(generatorRoot, sneburPath);
    const sneburSourceRoot = path.join(sneburRoot, 'src/Snebur.UI');
    const controlRegistryPath = path.join(
      sneburSourceRoot,
      'src/Controle/ElementoControle/ElementoControle.Registrar.ts',
    );
    const componentRegistryPath = path.join(
      sneburSourceRoot,
      'src/Componentes/Registrar/ComponentesApresentacao.Registrar.ts',
    );
    const attributesPath = path.join(sneburSourceRoot, 'src/Atributo/AtributosHtml.Statica.ts');
    const enumFiles = [
      path.join(sneburRoot, 'src/Snebur.TS/src/Dominio/Snebur.Dominio.Enums.ts'),
      path.join(sneburRoot, 'src/Snebur.TS/src/Formatacao/EnumFormatacao.ts'),
    ];
    const sigiFrontendRoot = path.resolve(generatorRoot, sigiPath, 'src/frontend');
    const outputDir = path.resolve(generatorRoot, outputPath);

    console.log('='.repeat(70));
    console.log('SNEBUR.UI DOCUMENTATION GENERATOR');
    console.log('='.repeat(70));
    console.log(`\nConfiguration:`);
    console.log(`  Snebur.UI source: ${sneburSourceRoot}`);
    console.log(`  Sigi frontend:    ${includeUsage ? sigiFrontendRoot : '(usage mining disabled)'}`);
    console.log(`  Output:           ${outputDir}`);
    console.log();

    for (const [label, p] of [
      ['Control registry', controlRegistryPath],
      ['Component registry', componentRegistryPath],
      ['Attributes file', attributesPath],
      ['Enums file', enumFiles[0]],
    ] as const) {
      if (!fs.existsSync(p)) {
        throw new Error(`${label} not found: ${p}`);
      }
    }

    const useUsage = includeUsage && fs.existsSync(sigiFrontendRoot);
    if (includeUsage && !useUsage) {
      console.warn(`[main] Sigi frontend not found at ${sigiFrontendRoot} — skipping usage mining`);
    }

    const config: BuilderConfig = {
      sneburSourceRoot,
      controlRegistryPath,
      componentRegistryPath,
      attributesPath,
      enumFiles,
      sigiFrontendRoot: useUsage ? sigiFrontendRoot : undefined,
      outputPath: outputDir,
    };

    const bundle = await new MetadataBuilder(config).build();

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const metadataPath = path.join(outputDir, 'snebur-components-metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(bundle, replacer, 2), 'utf-8');
    console.log(`[main] Metadata saved to ${metadataPath}\n`);

    if (!metadataOnly) {
      new DocumentWriter(outputDir).writeDocumentation(bundle);
    }

    console.log('='.repeat(70));
    console.log(`Documentation generation complete! Output: ${outputDir}`);
    console.log('='.repeat(70));
  } catch (error) {
    console.error('\n[ERROR]', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

/** Serializes Maps/Sets that may appear in the bundle. */
function replacer(_key: string, value: unknown): unknown {
  if (value instanceof Map) return Object.fromEntries(value);
  if (value instanceof Set) return Array.from(value);
  return value;
}

main();
