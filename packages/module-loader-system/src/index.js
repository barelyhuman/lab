import glob from 'tiny-glob'
import { existsSync } from 'fs'
import path from 'path'

export async function loadModules(directory, options = {}) {
  if (!existsSync(path.resolve(directory))) {
    return []
  }

  options.pattern = options.pattern || './**/*.{js,ts}'

  const files = await glob(options.pattern, {
    filesOnly: true,
    cwd: path.resolve(directory),
    absolute: true,
  })

  const modules = []

  for (let filePath of files) {
    const mod = normalizeImport(await import(filePath))
    modules.push(mod)
  }

  return modules
}

// Dual checks the imported module since
// a few bundlers create a double nest when the
// module is exporting something as `default` and
// bundling to cjs
function normalizeImport(mod) {
  let _mod = 'default' in mod ? mod.default : mod
  _mod = 'default' in _mod ? _mod.default : _mod
  return _mod
}
