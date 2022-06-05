const fs = require('fs')
const path = require('path')
const cp = require('child_process')

if (process.argv.length < 4) {
    console.log('Not enough args.')
    process.exit(1);
}

const [_, __, from, to] = process.argv;

console.log({
    from, to
})

const fsp = require('fs/promises')
const { promisify } = require('util')
const execAsync = promisify(cp.exec)

async function convertFile(file, toFile) {
    const cmd = `npx ts2fable ${file} ${toFile}`;
    console.log(`$ ${cmd}`)
    await execAsync(cmd);

    let content = await fsp.readFile(toFile, { encoding: 'utf-8' }).then(r => r.toString())
    const regexp = /type (.*) = __\.(.*)/g

    for (const match of content.matchAll(regexp)) {
        const typeName = match[1];
        content = content.replace(match[0], `open ${typeName}`)
    }

    const regexp2 = /type (.*) = __(.*)\.(.*)/g

    for (const match of content.matchAll(regexp2)) {
        const typeName = match[1];
        content = content.replace(match[0], `open ${typeName}`)
    }

    await fsp.writeFile(toFile, content, { encoding: 'utf-8' });
}

async function handleDir(fromDir, toDir) {
    const files = await fsp.readdir(fromDir);

    const handleFile = async file => {
        const filePath = path.join(fromDir, file);
        const stat = await fsp.stat(filePath)

        if (stat.isFile() && file.endsWith('.ts')) {
            const toFilePath = path.join(toDir, file + '.fs')

            await fsp.mkdir(toDir, {
                recursive: true
            });

            await convertFile(filePath, toFilePath);
        } else if (stat.isDirectory()) {
            await handleDir(filePath, path.join(toDir, file))
        }
    }

    await Promise.all(files.map(handleFile))
}

handleDir(path.join(__dirname, from), path.join(__dirname, to))