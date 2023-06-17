export const requestMixin = {}

requestMixin.handle = async (req, res) => {
  return new Promise(resolve => {
    const st = req.body
    if (st) {
      let b = ''
      st.on('data', chunk => {
        b += chunk
      })
      st.on('end', () => {
        req.rawBody = Buffer.from(b).toString()
        resolve(true)
      })
      return
    }

    return resolve()
  })
}
