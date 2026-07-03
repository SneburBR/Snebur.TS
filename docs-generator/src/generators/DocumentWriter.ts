import * as fs from 'fs';
import * as path from 'path';
import { DocumentationBundle } from '../models/ComponentMetadata';
import { MarkdownGenerator } from './MarkdownGenerator';

export class DocumentWriter {
  constructor(private outputDir: string) {}

  writeDocumentation(bundle: DocumentationBundle): void {
    console.log(`[DocumentWriter] Writing documentation to ${this.outputDir}\n`);
    const generator = new MarkdownGenerator(bundle);

    this.ensureDir(this.outputDir);
    this.resetDir(path.join(this.outputDir, 'controls'));
    this.resetDir(path.join(this.outputDir, 'components'));

    for (const control of bundle.controls) {
      const filePath = path.join(this.outputDir, 'controls', `${generator.tagToFilename(control.tag)}.md`);
      fs.writeFileSync(filePath, generator.generateComponentMarkdown(control), 'utf-8');
    }
    console.log(`  ✓ ${bundle.controls.length} control pages (controls/)`);

    for (const component of bundle.components) {
      const filePath = path.join(this.outputDir, 'components', `${generator.tagToFilename(component.tag)}.md`);
      fs.writeFileSync(filePath, generator.generateComponentMarkdown(component), 'utf-8');
    }
    console.log(`  ✓ ${bundle.components.length} component pages (components/)`);

    fs.writeFileSync(path.join(this.outputDir, 'ATTRIBUTES.md'), generator.generateAttributesMarkdown(), 'utf-8');
    console.log('  ✓ ATTRIBUTES.md');

    fs.writeFileSync(path.join(this.outputDir, 'ENUMS.md'), generator.generateEnumsMarkdown(), 'utf-8');
    console.log('  ✓ ENUMS.md');

    fs.writeFileSync(path.join(this.outputDir, 'README.md'), generator.generateIndexMarkdown(), 'utf-8');
    console.log('  ✓ README.md');

    console.log('\n[DocumentWriter] Documentation written successfully!\n');
  }

  private ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /** Recreates a generated subfolder so removed components leave no stale pages. */
  private resetDir(dirPath: string): void {
    this.ensureDir(dirPath);
    for (const file of fs.readdirSync(dirPath)) {
      if (file.endsWith('.md')) {
        fs.unlinkSync(path.join(dirPath, file));
      }
    }
  }
}
