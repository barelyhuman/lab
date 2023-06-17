import { appMixin } from './lib/app.js'
import { middlewareMixin } from './lib/middleware.js'
import { requestMixin } from './lib/request.js'
import { responseMixin } from './lib/response.js'

export const app = Object.assign({}, appMixin, middlewareMixin)

app.registerHandler(requestMixin)
app.registerHandler(responseMixin)
app.registerHandler(middlewareMixin)
