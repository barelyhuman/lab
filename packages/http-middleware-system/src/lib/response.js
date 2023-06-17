export const responseMixin = {}

responseMixin.handle = (req, res) => {
  res.status = function (code) {
    res.statusCode = code
    return res
  }
  res.send = function (data) {
    let body = String(data)
    if (typeof data === 'object') {
      res.setHeader('content-type', 'application/json')
      body = JSON.stringify(data)
    }
    res.end(body)
  }
}
