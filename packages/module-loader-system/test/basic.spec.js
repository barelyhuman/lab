import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { loadModules } from '../src/index.js'
import path from 'node:path'
import testModule from './modules/example.js'
import testModule2 from './modules/example2.js'
import { fileURLToPath } from 'node:url'
chai.use(chaiAsPromised)

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe('basic loader', function () {
  it('should load the modules in the folder', async function () {
    const modules = await loadModules(path.join(__dirname, './modules'))
    expect(modules[0]).to.be.equal(testModule)
    expect(modules[1]).to.be.equal(testModule2)
  })
})
