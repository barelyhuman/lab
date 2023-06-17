export const middlewareMixin = {
  middleware: [],
}

middlewareMixin.use = function (fn) {
  middlewareMixin.middleware.push(fn)
}

function* createMiddlewareIterator(middlewares, req, res) {
  let currMiddl
  let offset = 0
  while ((currMiddl = middlewares[offset])) {
    const result = yield currMiddl
    if (result instanceof Error) {
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500
      res.write(
        JSON.stringify({
          message: result.message,
        })
      )
      res.end()
      break
    }
    offset += 1
  }
  return
}

middlewareMixin.handle = async function handle(req, res) {
  let iterator = createMiddlewareIterator(middlewareMixin.middleware)
  let handler = iterator.next()
  await handler.value(req, res, next)
  async function next(error) {
    handler = iterator.next(error)
    if (handler.done) {
      handler = null
      return
    }
    if (handler?.value) {
      await handler.value(req, res, next)
    }
  }
}
