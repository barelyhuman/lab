export const appMixin = {
  handlers: [],
}

appMixin.registerHandler = function registerHandler(handler, options = {}) {
  if (options.order) {
    appMixin.handlers = [
      ...appMixin.handlers.slice(0, options.order),
      handler,
      ...appMixin.handlers.slice(options.order),
    ]
  } else {
    appMixin.handlers.push(handler)
  }
}

appMixin.createHandler = function createHandler() {
  return async (req, res) => {
    for (let handler of appMixin.handlers) {
      await handler.handle(req, res)
    }
    return
  }
}
