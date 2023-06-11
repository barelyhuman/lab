import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { createHook } from '../src/index.js'
chai.use(chaiAsPromised)

describe('hook', function () {
  it('should hook onto the listener', function () {
    const hook = createHook()
    let called = false
    hook.hook('example:key', () => {
      console.log('called')
      called = true
    })
    hook.call('example:key')
    expect(called).to.be.true
  })

  it('should hook onto the multiple listeners', function () {
    const hook = createHook()
    let listeners = 0
    hook.hook('example:key', () => {
      listeners += 1
    })

    hook.hook('example:key', () => {
      listeners += 1
    })

    hook.call('example:key')

    expect(listeners).to.be.equal(2)
  })

  it('should also get the hook data to the listener', function () {
    const hook = createHook()
    let data = undefined
    hook.hook('example:key', d => {
      data = d
    })
    const passedData = 'hello'
    hook.call('example:key', passedData)
    expect(data).to.be.equal(passedData)
  })
})
