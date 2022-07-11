import { load } from 'js-yaml'
import fs from 'fs';
import path from 'path';

export async function config(name: string) {
    const file: any[] = load(
        fs.readFileSync(path.join(process.cwd(), 'config.yaml'), 'utf-8')
    ) as any[]

    return file[name as any]
}