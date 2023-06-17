import { app } from './app.js'
import http from 'node:http'

app.use(async (req, res, next) => {
  req.modifiedValue = 1
  await next()
})

app.use(async (req, res) => {
  if (req.url === '/ping') {
    return res.status(200).send({
      value: 1,
    })
  }
  return res.status(404).end()
})

const server = http.createServer(app.createHandler())
server.listen(3000, () => {
  console.log('Listening on http://localhost:3000')
})
