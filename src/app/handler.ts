import fs from 'fs'
import { dirname } from 'path'

export class Handler {

    public static load(path: string, callback: (files: string[]) =>  void) {
        callback(
            fs.readdirSync(dirname(path) + "/dist/" + path)
        )
    }

}