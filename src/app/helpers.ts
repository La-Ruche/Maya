import { load } from 'js-yaml'
import fs from 'fs';
import path from 'path';
import { Command, CommandMessageType, SlashType } from './command';

export async function config(name: string) {
    const file: any[] = load(
        fs.readFileSync(path.join(process.cwd(), 'config.yaml'), 'utf-8')
    ) as any[]

    return file[name as any]
}

export async function subs(name: string) {
    let file = await import(path.join(process.cwd(), 'dist', 'commands', 'subs', `${name}.js`))

    return file.default as Command<keyof CommandMessageType, SlashType>
}